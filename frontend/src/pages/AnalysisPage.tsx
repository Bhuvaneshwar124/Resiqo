import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AnalysisPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center max-w-2xl mx-auto space-y-6">
      <Badge variant="secondary" className="px-3 py-1 bg-primary/20 text-primary border-primary/30">
        Coming in Phase 3
      </Badge>
      <div className="h-24 w-24 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
        <BarChart3 className="h-12 w-12 text-blue-500" />
      </div>
      <h1 className="text-4xl font-bold">AI Analysis Engine</h1>
      <p className="text-muted-foreground text-lg">
        The core STAR analysis, ATS optimization, and recruiter feedback engine is under construction. It will feature deep Gemini-powered insights.
      </p>
    </div>
  );
}
