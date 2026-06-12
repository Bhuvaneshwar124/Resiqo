import React, { useState } from 'react';
import { Target, Search, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

export function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleMatch = () => {
    if (!jobDescription) return;
    setIsAnalyzing(true);
    // Simulate API call for Phase 4
    setTimeout(() => {
      setResult({
        match_percentage: 78,
        matched_skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'API Design'],
        missing_skills: ['AWS', 'Docker', 'GraphQL'],
        recommendations: [
          'Add a bullet point about deploying to AWS or using cloud services.',
          'Quantify your experience with PostgreSQL (e.g. "Optimized queries resulting in 30% speedup").',
          'Mention any containerization experience to cover the Docker gap.'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Description Matcher</h1>
        <p className="text-muted-foreground mt-2">Compare your resume against a specific job posting to find skill gaps.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              Target Job Description
            </CardTitle>
            <CardDescription>Paste the job requirements here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="e.g. We are looking for a Senior Frontend Engineer with 5+ years of React experience..." 
              className="min-h-[300px] bg-background/50 border-white/10 resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleMatch} disabled={isAnalyzing || !jobDescription}>
              {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Match...</> : <><Search className="mr-2 h-4 w-4" /> Calculate Match Score</>}
            </Button>
          </CardContent>
        </Card>

        <div>
          {!result && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-xl glass">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary opacity-50" />
              </div>
              <p className="text-muted-foreground">Paste a job description and click calculate to see your match score and missing keywords.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-xl glass-card">
              <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
              <p className="text-lg font-medium">Scanning with AI Vector Search...</p>
              <p className="text-muted-foreground text-sm mt-2">Extracting required skills and cross-referencing your resume.</p>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="space-y-6 animate-slide-up">
              <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="relative h-24 w-24 flex items-center justify-center shrink-0">
                    <svg className="h-full w-full transform -rotate-90">
                      <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                      <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={283} strokeDashoffset={283 - (283 * result.match_percentage) / 100} className="text-emerald-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-emerald-500">{result.match_percentage}%</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Strong Match</h3>
                    <p className="text-muted-foreground text-sm">Your profile aligns well with this role. Addressing the missing skills will increase your interview chances.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Matched Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Missing Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((r: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
