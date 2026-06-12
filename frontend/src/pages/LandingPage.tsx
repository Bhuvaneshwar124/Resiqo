import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, FileSearch, TrendingUp, Target, Users, Wand2, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: Star,
      title: 'STAR Analysis',
      description: 'Automatically evaluate bullet points for Situation, Task, Action, and Result completeness.'
    },
    {
      icon: FileSearch,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes Applicant Tracking Systems with keyword and format checks.'
    },
    {
      icon: TrendingUp,
      title: 'Impact Detection',
      description: 'Identify missing metrics and quantify your achievements to stand out to recruiters.'
    },
    {
      icon: Target,
      title: 'Job Matching',
      description: 'Compare your resume against specific job descriptions to find skill gaps instantly.'
    },
    {
      icon: Users,
      title: 'Recruiter Simulation',
      description: 'Get actionable feedback as if a real senior recruiter reviewed your profile.'
    },
    {
      icon: Wand2,
      title: 'AI Rewriter',
      description: 'Transform weak bullet points into high-impact STAR-formatted statements with one click.'
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight gradient-text">Resiqo</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(170,59,255,0.3)]">
              <Link to="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 lg:pt-48 lg:pb-32 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-float" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <Star className="mr-2 h-4 w-4" />
            AI-Powered STAR Resume Analyzer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Transform your resume from <span className="text-muted-foreground">ordinary</span> to{' '}
            <span className="gradient-text">extraordinary</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Elevate your career with AI-driven STAR analysis, ATS optimization, and recruiter simulation. Get hired faster by writing statements that actually prove your impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="h-12 px-8 text-base shadow-[0_0_30px_rgba(170,59,255,0.4)]">
              <Link to="/register">
                Start Analyzing Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base glass-border hover:bg-white/5">
              View Demo Report
            </Button>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to land the interview</h2>
            <p className="text-muted-foreground">Comprehensive analysis tools built by recruiting experts.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(170,59,255,0.15)] group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">10,000+</div>
            <div className="text-muted-foreground">Resumes Analyzed</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">85%</div>
            <div className="text-muted-foreground">Average Score Improvement</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">95%</div>
            <div className="text-muted-foreground">User Satisfaction Rate</div>
          </div>
        </div>
      </section>
      
      <footer className="py-12 text-center text-muted-foreground border-t border-white/5">
        <p>© 2026 Resiqo. All rights reserved.</p>
      </footer>
    </div>
  );
}
