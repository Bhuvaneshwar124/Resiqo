import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Star,
  FileSearch,
  TrendingUp,
  Target,
  Users,
  Wand2,
  Upload,
  Cpu,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Check,
  Github,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/* ============================
   FLOATING SHAPES
   ============================ */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large gradient orbs */}
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-float" />
      <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

      {/* Geometric shapes */}
      <div className="absolute left-[10%] top-[20%] h-3 w-3 rotate-45 rounded-sm bg-primary/30 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute right-[15%] top-[15%] h-4 w-4 rounded-full bg-emerald/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute left-[25%] top-[60%] h-2 w-2 rotate-45 rounded-sm bg-purple-400/25 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute right-[25%] top-[70%] h-3 w-3 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute left-[60%] top-[30%] h-2 w-2 rounded-full bg-violet-400/30 animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute left-[80%] top-[50%] h-4 w-4 rotate-12 rounded-sm bg-primary/15 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}

/* ============================
   FEATURE CARD
   ============================ */
interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  delay: number
  gradient: string
}

function FeatureCard({ icon: Icon, title, description, delay, gradient }: FeatureCardProps) {
  return (
    <div
      className="group relative rounded-2xl glass p-6 hover-lift cursor-default animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/[0.08] to-transparent" />

      <div className={cn('relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl', gradient)}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="relative z-10 mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

/* ============================
   STEP CARD
   ============================ */
interface StepCardProps {
  number: number
  icon: React.ElementType
  title: string
  description: string
  delay: number
}

function StepCard({ number, icon: Icon, title, description, delay }: StepCardProps) {
  return (
    <div
      className="relative flex flex-col items-center text-center animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/25">
          <Icon className="h-9 w-9 text-white" />
        </div>
        <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs font-bold text-white shadow-lg shadow-emerald/30">
          {number}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[240px]">{description}</p>
    </div>
  )
}

/* ============================
   STAT CARD
   ============================ */
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div
      className="text-center animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="text-4xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

/* ============================
   LANDING PAGE
   ============================ */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingShapes />

      {/* ===== NAVBAR ===== */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text text-2xl font-bold tracking-tight">Resiqo</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="gradient-primary border-0 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-6 text-center">
        <Badge className="mb-6 glass border-primary/20 text-primary animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <Sparkles className="mr-1.5 h-3 w-3" />
          AI-Powered Resume Intelligence
        </Badge>

        <h1
          className="mb-6 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl animate-slide-up"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          Transform Your Resume with{' '}
          <span className="gradient-text">AI-Driven STAR</span>{' '}
          Analysis
        </h1>

        <p
          className="mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-slide-up"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          From ordinary to extraordinary — Resiqo analyzes every bullet point using the STAR framework,
          optimizes for ATS systems, simulates recruiter screening, and rewrites weak content with AI.
        </p>

        <div
          className="flex flex-col gap-4 sm:flex-row animate-slide-up"
          style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
          <Link to="/register">
            <Button size="lg" className="gradient-primary border-0 px-8 text-base text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="border-border/50 px-8 text-base hover:bg-white/[0.04] hover:border-primary/30 transition-all">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Hero visual element */}
        <div
          className="mt-16 w-full max-w-3xl animate-slide-up"
          style={{ animationDelay: '800ms', animationFillMode: 'both' }}
        >
          <div className="relative rounded-2xl glass-strong p-1">
            <div className="rounded-xl bg-background/80 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">resume-analysis.ai</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">STAR Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[85%] rounded-full gradient-primary animate-pulse-glow" />
                    </div>
                    <span className="text-sm font-semibold text-primary">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ATS Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[92%] rounded-full bg-emerald" />
                    </div>
                    <span className="text-sm font-semibold text-emerald">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Impact Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[78%] rounded-full bg-purple-500" />
                    </div>
                    <span className="text-sm font-semibold text-purple-400">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recruiter Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[88%] rounded-full bg-violet-500" />
                    </div>
                    <span className="text-sm font-semibold text-violet-400">88%</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Border gradient glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-emerald/10 -z-10 blur-sm" />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs">Scroll to explore</span>
            <div className="h-8 w-5 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1.5">
              <div className="h-1.5 w-1 rounded-full bg-muted-foreground/40 animate-slide-down" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative z-10 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Badge className="mb-4 glass border-primary/20 text-primary">
              Features
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to{' '}
              <span className="gradient-text">Perfect Your Resume</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Six powerful AI-driven tools that analyze, score, and improve every aspect of your resume.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Star}
              title="STAR Analysis"
              description="Deep analysis of every bullet point against the Situation, Task, Action, Result framework. Get specific feedback on what's missing."
              delay={100}
              gradient="bg-gradient-to-br from-primary to-violet-600"
            />
            <FeatureCard
              icon={FileSearch}
              title="ATS Optimization"
              description="Ensure your resume passes Applicant Tracking Systems with keyword optimization and formatting analysis."
              delay={200}
              gradient="bg-gradient-to-br from-emerald to-teal-500"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Impact Detection"
              description="Identify weak bullet points and transform them with quantifiable metrics and power verbs that grab attention."
              delay={300}
              gradient="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={Target}
              title="Job Matching"
              description="Match your resume against specific job descriptions. See skill gaps and get tailored recommendations."
              delay={400}
              gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Users}
              title="Recruiter Simulation"
              description="AI simulates how a recruiter would review your resume in the first 6 seconds. Get the recruiter's perspective."
              delay={500}
              gradient="bg-gradient-to-br from-orange-500 to-amber-500"
            />
            <FeatureCard
              icon={Wand2}
              title="AI Rewriter"
              description="One-click AI rewrites that transform weak bullets into powerful STAR-formatted achievements."
              delay={600}
              gradient="bg-gradient-to-br from-violet-500 to-fuchsia-500"
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <Badge className="mb-4 glass border-emerald/20 text-emerald">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Three Simple Steps to a{' '}
              <span className="gradient-text-emerald">Better Resume</span>
            </h2>
          </div>

          <div className="relative grid gap-12 sm:grid-cols-3 sm:gap-8">
            {/* Connecting line (desktop) */}
            <div className="absolute left-[16.6%] right-[16.6%] top-10 hidden h-0.5 sm:block">
              <div className="h-full w-full bg-gradient-to-r from-primary/40 via-purple-500/40 to-emerald/40" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/60" />
            </div>

            <StepCard
              number={1}
              icon={Upload}
              title="Upload Your Resume"
              description="Upload your PDF or DOCX resume. Our AI processes it in seconds."
              delay={100}
            />
            <StepCard
              number={2}
              icon={Cpu}
              title="AI Analyzes Everything"
              description="Five AI engines analyze STAR format, ATS compatibility, impact metrics, and more."
              delay={300}
            />
            <StepCard
              number={3}
              icon={Lightbulb}
              title="Get Actionable Insights"
              description="Receive detailed scores, suggestions, and AI-rewritten bullet points."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl glass-strong p-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <StatCard value="10,000+" label="Resumes Analyzed" delay={100} />
              <StatCard value="85%" label="Average Score Improvement" delay={200} />
              <StatCard value="95%" label="User Satisfaction" delay={300} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16">
            {/* BG gradient */}
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                Ready to Transform Your Resume?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of job seekers who've improved their resumes with AI-powered STAR analysis.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 text-base font-semibold shadow-xl transition-all hover:scale-105">
                  Start Analyzing for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text text-lg font-bold">Resiqo</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link>
              <Link to="/register" className="hover:text-foreground transition-colors">Get Started</Link>
            </div>
            <p className="text-xs text-muted-foreground/60">
              © 2026 Resiqo. Built with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
