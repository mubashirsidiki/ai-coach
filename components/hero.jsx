"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Sparkles, 
  Rocket, 
  Zap, 
  TrendingUp,
  CheckCircle2,
  ArrowRight 
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-20">
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Powered by Advanced AI Technology
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black gradient-title leading-[1.1] tracking-tight">
              Forge Your Dream
              <br />
              <span className="inline-block mt-2">Career Today</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The ultimate AI-powered platform to build winning resumes, 
              craft compelling cover letters, and ace every interview
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg gradient text-white hover:opacity-90 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 font-bold group"
              >
                Start Building Now
                <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-2 glass hover:bg-accent/50 font-semibold"
              >
                Watch Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI generates personalized content in seconds
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Industry Focused</h3>
              <p className="text-sm text-muted-foreground">
                Tailored to your industry with real-time insights
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center border-2 border-primary/20 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands landing their dream jobs
              </p>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-semibold">10K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm font-semibold">50K+ Resumes Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm font-semibold">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
