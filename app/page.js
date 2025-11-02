import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Target,
  BarChart3,
  Shield,
  Clock,
  Users,
  Award,
  Rocket,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem/Solution Section */}
      <section className="w-full py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">The Career Challenge</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black gradient-title mb-6">
              Landing Your Dream Job Shouldn't Be This Hard
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Traditional job searching is broken. Generic resumes get rejected, 
              cover letters miss the mark, and unprepared interviews lead to missed opportunities. 
              It's time for a smarter approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8 border-2 border-destructive/20 hover:border-destructive/40 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-bold text-xl mb-3">Generic Resumes Fail</h3>
              <p className="text-muted-foreground">
                One-size-fits-all resumes get filtered out by ATS systems before human eyes ever see them.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 border-2 border-destructive/20 hover:border-destructive/40 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-bold text-xl mb-3">Weak Cover Letters</h3>
              <p className="text-muted-foreground">
                Templates fall flat. Employers want authenticity that demonstrates you understand their needs.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 border-2 border-destructive/20 hover:border-destructive/40 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-bold text-xl mb-3">Interview Anxiety</h3>
              <p className="text-muted-foreground">
                Lack of preparation leads to nervousness and missed opportunities to showcase your value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black gradient-title mb-6">
              CareerForge: Your Complete Career Solution
            </h2>
            <p className="text-xl text-muted-foreground">
              Three powerful tools working together to transform your job search
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass border-2 border-primary/30 hover:border-primary/60 transition-all hover:shadow-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"></div>
              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart Resume Builder</h3>
                <p className="text-muted-foreground mb-4">
                  Create ATS-optimized resumes tailored to each job. Our AI analyzes job descriptions 
                  and crafts resumes that get you past the filters and into interviews.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Industry-specific templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Real-time ATS scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Keyword optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-2 border-secondary/30 hover:border-secondary/60 transition-all hover:shadow-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full"></div>
              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Cover Letter Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Generate compelling, personalized cover letters that connect your experience 
                  to employer needs. No more generic templates.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    Personalized to each role
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    Company research integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    Multiple tone options
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-2 border-accent/30 hover:border-accent/60 transition-all hover:shadow-2xl group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full"></div>
              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI Interview Prep</h3>
                <p className="text-muted-foreground mb-4">
                  Practice with AI-powered mock interviews. Get real-time feedback, 
                  track your progress, and build confidence before the real thing.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Role-specific questions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Performance analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Improvement suggestions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black gradient-title mb-4">
              Trusted by Ambitious Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands who've transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: "10K+", label: "Active Users", icon: Users },
              { number: "50K+", label: "Resumes Created", icon: FileText },
              { number: "95%", label: "Success Rate", icon: Award },
              { number: "24/7", label: "AI Support", icon: Clock },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 text-center border-2 border-primary/20 hover:border-primary/50 hover:scale-105 transition-all group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-4xl font-black gradient-title mb-2">{stat.number}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black gradient-title mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-muted-foreground">
              Four simple steps to career transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up and complete your profile in under 2 minutes",
                icon: Users,
              },
              {
                step: "02",
                title: "Choose Your Industry",
                description: "Select your field and let AI tailor everything to your sector",
                icon: Target,
              },
              {
                step: "03",
                title: "Build Your Documents",
                description: "Generate resumes and cover letters optimized for your target roles",
                icon: FileText,
              },
              {
                step: "04",
                title: "Practice & Apply",
                description: "Prepare with AI interviews and confidently apply to dream jobs",
                icon: Rocket,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/50 transition-all relative group"
              >
                <div className="text-6xl font-black text-primary/10 absolute -top-4 -right-2">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black gradient-title mb-4">
              Real Results from Real People
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "CareerForge's resume builder got me past ATS filters for the first time. Landed 5 interviews in two weeks after using it!",
                author: "Alexandra Chen",
                role: "Software Engineer",
                company: "Tech Innovations Inc.",
                highlight: "5 interviews in 2 weeks",
              },
              {
                quote:
                  "The AI interview prep was incredible. I walked into my final round feeling completely prepared and got the offer!",
                author: "Marcus Johnson",
                role: "Product Manager",
                company: "StartUp Labs",
                highlight: "Got the offer",
              },
              {
                quote:
                  "My cover letters finally got responses. The personalization AI suggested made all the difference in my applications.",
                author: "Sofia Martinez",
                role: "Marketing Director",
                company: "Global Brand Co.",
                highlight: "3x response rate",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="glass hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-primary/20"
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-xs font-bold text-primary">{testimonial.highlight}</span>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative pl-4 mb-6">
                        <span className="text-4xl gradient-title absolute -top-2 -left-0 opacity-30">
                          &quot;
                        </span>
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    <div className="border-t border-primary/20 pt-4">
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm font-semibold gradient-title">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-6xl font-black gradient-title mb-4">
              Got Questions?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about CareerForge
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-xl px-6 border-2 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto gradient rounded-3xl shadow-2xl relative overflow-hidden p-12 md:p-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col items-center justify-center space-y-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Rocket className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Ready to Transform Your Career?</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                Start Building Your
                <br />
                <span className="gradient-title bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Dream Career Today
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/90 md:text-xl text-lg">
                Join 10,000+ professionals who've already transformed their job search with CareerForge. 
                Get started in minutes, see results in days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/dashboard" passHref>
                  <Button
                    size="lg"
                    className="h-14 px-10 bg-white text-primary hover:bg-white/90 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg"
                  >
                    Start Building Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/onboarding" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-10 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 opacity-80">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-sm text-white/90">Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="text-sm text-white/90">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm text-white/90">Set up in 2 Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
