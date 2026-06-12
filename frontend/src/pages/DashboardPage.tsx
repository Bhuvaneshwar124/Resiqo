import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { FileText, TrendingUp, BarChart, ArrowUp, Upload, Target, Wand2, Loader2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip } from 'recharts';
import { resumeApi } from '@/lib/api';
import { Resume } from '@/types';

const dummyScoreData = [
  { subject: 'STAR', A: 85, fullMark: 100 },
  { subject: 'ATS', A: 65, fullMark: 100 },
  { subject: 'Impact', A: 90, fullMark: 100 },
  { subject: 'Recruiter', A: 75, fullMark: 100 },
  { subject: 'Job Match', A: 70, fullMark: 100 },
];

export function DashboardPage() {
  const { user } = useAuthStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await resumeApi.list();
        setResumes(res.data.resumes);
      } catch (error) {
        console.error("Failed to fetch resumes", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumes();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-2">Here is an overview of your resume performance.</p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Resumes</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : resumes.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77/100</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Analyses Run</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BarChart className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : resumes.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Score Improvement</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <ArrowUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">+12%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Radar Chart */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle>Score Overview</CardTitle>
            <CardDescription>Visual breakdown of your latest resume analysis.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dummyScoreData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="hsl(250, 70%, 55%)" fill="hsl(250, 70%, 55%)" fillOpacity={0.4} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Resumes & Quick Actions */}
        <div className="space-y-6">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle>Recent Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : resumes.length > 0 ? (
                <div className="space-y-4">
                  {resumes.slice(0, 3).map(r => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <div className="truncate">
                          <p className="text-sm font-medium truncate">{r.filename}</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(r.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/analysis/${r.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm">No resumes uploaded yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5">
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-12 bg-background/50 hover:bg-muted" asChild>
                <Link to="/upload">
                  <Upload className="mr-3 h-4 w-4 text-primary" />
                  Upload New Resume
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 bg-background/50 hover:bg-muted" asChild>
                <Link to="/job-match">
                  <Target className="mr-3 h-4 w-4 text-emerald-500" />
                  Match Job Description
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
