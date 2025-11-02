"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobQuiz from "./_components/job-quiz";

export default function JobQuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobId = searchParams.get("id");
    if (!jobId) {
      router.push("/interview/jobs");
      return;
    }

    try {
      // Retrieve job data from sessionStorage
      const storedJob = sessionStorage.getItem(`job_${jobId}`);
      if (!storedJob) {
        console.error("Job data not found in session storage");
        router.push("/interview/jobs");
        return;
      }

      const decodedJob = JSON.parse(storedJob);
      setJob(decodedJob);
    } catch (error) {
      console.error("Error parsing job data:", error);
      router.push("/interview/jobs");
    } finally {
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <Link href="/interview/jobs">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Job Listings
          </Button>
        </Link>

        {/* Job Details Card - Always Visible */}
        <Card className="glass border-2 border-primary/30 sticky top-4 z-10">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
              </div>
              {job.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm font-medium">Job Description Preview:</p>
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg max-h-[200px] overflow-y-auto">
                {job.description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Component */}
        <JobQuiz job={job} />
      </div>
    </div>
  );
}

