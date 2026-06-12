import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resumeApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, TrendingUp, Search, Briefcase, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from 'recharts';

export function AnalysisPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        if (id) {
          const resAnalysis = await resumeApi.get(`${id}/analysis`);
          setReport(resAnalysis.data.report_data);
          const resResume = await resumeApi.get(id);
          setResume(resResume.data);
        }
      } catch (error) {
        console.error("Failed to load analysis", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!report) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Analysis Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the analysis report for this resume.</p>
        <Link to="/dashboard" className="text-primary hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const chartData = [
    { name: 'Overall', uv: report.overall_score, fill: 'hsl(250, 70%, 55%)' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">AI Resume Analysis</h1>
          <p className="text-muted-foreground">Detailed breakdown for {resume?.filename}</p>
        </div>
      </div>

      {/* Top Scores Overview */}
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="glass-card md:col-span-4 border-white/5 flex flex-col items-center justify-center py-8">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">Overall Score</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={chartData} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="uv" cornerRadius={10} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold fill-foreground" style={{ fontSize: '2.5rem' }}>
                  {report.overall_score}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Out of 100</p>
        </Card>

        <div className="md:col-span-8 grid gap-4 md:grid-cols-3">
          <ScoreCard title="STAR Score" score={report.star_score} icon={<TrendingUp />} color="text-emerald-500" bg="bg-emerald-500/10" border="border-emerald-500/20" />
          <ScoreCard title="ATS Score" score={report.ats_score} icon={<Search />} color="text-blue-500" bg="bg-blue-500/10" border="border-blue-500/20" />
          <ScoreCard title="Impact Score" score={report.impact_score} icon={<Briefcase />} color="text-purple-500" bg="bg-purple-500/10" border="border-purple-500/20" />
        </div>
      </div>

      {/* Recruiter Feedback */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
            Senior Recruiter Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{report.recruiter_feedback}</p>
        </CardContent>
      </Card>

      {/* Detailed Bullet Point Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mt-12 mb-6">Bullet Point Evaluation (STAR)</h2>
        <div className="grid gap-6">
          {report.bullet_points.map((bp: any, idx: number) => (
            <Card key={idx} className="glass-card border-white/5 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-lg leading-snug">{bp.bullet_point}</h4>
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-background/50 border border-white/5">
                    <p className="text-sm text-muted-foreground"><strong className="text-primary">AI Suggestion:</strong> {bp.feedback}</p>
                  </div>
                </div>
                <div className="p-6 md:w-1/3 flex flex-col justify-center space-y-4 bg-black/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <Badge variant={bp.score > 75 ? "default" : bp.score > 50 ? "secondary" : "destructive"}>{bp.score}/100</Badge>
                  </div>
                  <div className="space-y-3">
                    <STARIndicator label="Situation" status={bp.situation} />
                    <STARIndicator label="Task" status={bp.task} />
                    <STARIndicator label="Action" status={bp.action} />
                    <STARIndicator label="Result" status={bp.result} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score, icon, color, bg, border }: { title: string, score: number, icon: any, color: string, bg: string, border: string }) {
  return (
    <Card className={`glass-card ${border}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          {title}
          <div className={`p-2 rounded-lg ${bg} ${color}`}>{icon}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{score}<span className="text-lg text-muted-foreground font-normal">/100</span></div>
        <Progress value={score} className="h-2" indicatorColor={color} />
      </CardContent>
    </Card>
  );
}

function STARIndicator({ label, status }: { label: string, status: string }) {
  const isPresent = status.toLowerCase() === 'present';
  const isPartial = status.toLowerCase() === 'partial';
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className={isPresent ? "text-emerald-500" : isPartial ? "text-yellow-500" : "text-destructive"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {isPresent ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : isPartial ? <AlertCircle className="h-4 w-4 text-yellow-500" /> : <XCircle className="h-4 w-4 text-destructive" />}
      </div>
    </div>
  );
}
