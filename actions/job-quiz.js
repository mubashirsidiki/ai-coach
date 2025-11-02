"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.0-flash" });

/**
 * Generate 5 MCQs based on a job description
 * @param {string} jobDescription - The job description text
 * @param {string} jobTitle - The job title
 * @param {string} companyName - The company name
 * @returns {Promise<Array>} Array of 5 question objects
 */
export async function generateJobBasedQuiz(jobDescription, jobTitle, companyName) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!jobDescription || !jobTitle) {
    throw new Error("Job description and title are required");
  }

  // Truncate job description if too long (keep first 4000 characters for API efficiency)
  const truncatedDescription = jobDescription.substring(0, 4000);

  const prompt = `
    Generate 5 interview questions based on this job posting:
    
    Job Title: ${jobTitle}
    Company: ${companyName || "Not specified"}
    
    Job Description:
    ${truncatedDescription}
    
    Generate:
    1. TWO theory-based, open-ended questions that require detailed written responses
    2. THREE multiple-choice questions
    
    For theory questions:
    - Should require explanation, demonstration of knowledge, or scenario-based responses
    - Should be directly related to job requirements, skills, or responsibilities
    - Should not have a single "correct" answer, but should test understanding
    
    For MCQ questions:
    - Each should have 4 answer options
    - Include a clear correct answer
    - Include an explanation for the correct answer
    
    Return the response in this JSON format only, no additional text:
    {
      "theoryQuestions": [
        {
          "question": "string",
          "type": "theory"
        }
      ],
      "mcqQuestions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string",
          "type": "mcq"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response from AI");
    }
    
    // Clean up the response - remove markdown code blocks if present
    let cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .replace(/^json\s*/, "")
      .trim();
    
    // Try to extract JSON if it's wrapped in other text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }
    
    let quiz;
    try {
      quiz = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response text:", text);
      throw new Error("Failed to parse AI response. Please try again.");
    }

    // Validate structure
    if (!quiz.theoryQuestions || !Array.isArray(quiz.theoryQuestions)) {
      throw new Error("Invalid response format: missing theory questions");
    }
    
    if (!quiz.mcqQuestions || !Array.isArray(quiz.mcqQuestions)) {
      throw new Error("Invalid response format: missing MCQ questions");
    }
    
    // Ensure we have exactly 2 theory and 3 MCQs
    if (quiz.theoryQuestions.length !== 2) {
      console.warn(`Expected 2 theory questions but received ${quiz.theoryQuestions.length}`);
      if (quiz.theoryQuestions.length === 0) {
        throw new Error("No theory questions generated. Please try again.");
      }
    }
    
    if (quiz.mcqQuestions.length !== 3) {
      console.warn(`Expected 3 MCQ questions but received ${quiz.mcqQuestions.length}`);
      if (quiz.mcqQuestions.length === 0) {
        throw new Error("No MCQ questions generated. Please try again.");
      }
    }

    // Add type markers and combine questions
    const theoryQuestions = quiz.theoryQuestions.map(q => ({ ...q, type: "theory" }));
    const mcqQuestions = quiz.mcqQuestions.map(q => ({ ...q, type: "mcq" }));
    
    // Return combined: 2 theory first, then 3 MCQs
    return [...theoryQuestions, ...mcqQuestions];
  } catch (error) {
    console.error("Error generating job-based quiz:", error);
    
    // Return more specific error messages
    if (error.message.includes("API key")) {
      throw new Error("API configuration error. Please check your Gemini API key.");
    }
    
    if (error.message.includes("parse") || error.message.includes("JSON")) {
      throw new Error("Error processing AI response. Please try again.");
    }
    
    // Return the original error message if it's already user-friendly
    if (error.message && !error.message.includes("Error generating")) {
      throw error;
    }
    
    throw new Error(error.message || "Failed to generate quiz questions. Please try again.");
  }
}

/**
 * Save job-based quiz results to the assessment table
 * @param {Array} questionResults - Array of question results (theory + MCQ)
 * @param {number} score - Overall quiz score
 * @param {string} jobTitle - Job title for context
 * @param {string} jobCompany - Company name for context
 * @returns {Promise<Object>} Saved assessment
 */
export async function saveJobQuizResult(questionResults, score, jobTitle, jobCompany) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Generate improvement tip based on theory reviews and MCQ performance
    let improvementTip = null;
    
    const theoryQuestions = questionResults.filter(q => q.type === "theory" && q.review);
    const mcqQuestions = questionResults.filter(q => q.type === "mcq");
    
    const lowTheoryScores = theoryQuestions.filter(q => q.review && q.review.score < 70);
    const wrongMcqs = mcqQuestions.filter(q => !q.isCorrect);

    if (lowTheoryScores.length > 0 || wrongMcqs.length > 0) {
      const prompt = `
        The user completed a job-based interview quiz for ${jobTitle} at ${jobCompany}.
        
        Theory Questions Performance:
        ${theoryQuestions.map((q, i) => 
          `Question ${i + 1}: Score ${q.review?.score || 0}/100\nFeedback: ${q.review?.feedback || "N/A"}`
        ).join("\n\n")}
        
        MCQ Questions:
        ${wrongMcqs.map((q, i) => 
          `Question: "${q.question}"\nUser Answer: "${q.userAnswer}"\nCorrect Answer: "${q.answer}"`
        ).join("\n\n")}
        
        Provide a concise, encouraging improvement tip (2-3 sentences) focusing on areas to strengthen for similar interviews.
        Don't explicitly mention scores, just focus on what to practice or learn.
      `;

      try {
        const tipResult = await model.generateContent(prompt);
        improvementTip = tipResult.response.text().trim();
      } catch (error) {
        console.error("Error generating improvement tip:", error);
        // Continue without tip if generation fails
      }
    }

    // Format questions for storage (include all data as JSON)
    const formattedQuestions = questionResults.map(q => {
      if (q.type === "theory") {
        return {
          question: q.question,
          type: "theory",
          userAnswer: q.userAnswer,
          review: q.review ? {
            score: q.review.score,
            strengths: q.review.strengths,
            weaknesses: q.review.weaknesses,
            feedback: q.review.feedback,
            suggestions: q.review.suggestions,
          } : null,
        };
      } else {
        return {
          question: q.question,
          type: "mcq",
          answer: q.answer,
          userAnswer: q.userAnswer,
          isCorrect: q.isCorrect,
          explanation: q.explanation,
        };
      }
    });

    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: formattedQuestions,
        category: `Job-Based: ${jobTitle} at ${jobCompany}`,
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving job quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

