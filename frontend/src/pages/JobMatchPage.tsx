import React from 'react';
import { Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function JobMatchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center max-w-2xl mx-auto space-y-6">
      <Badge variant="secondary" className="px-3 py-1 bg-primary/20 text-primary border-primary/30">
        Coming in Phase 4
      </Badge>
      <div className="h-24 w-24 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
        <Target className="h-12 w-12 text-emerald-500" />
      </div>
      <h1 className="text-4xl font-bold">Job Description Matcher</h1>
      <p className="text-muted-foreground text-lg">
        Compare your resume directly against specific job postings to find exact skill gaps and missing keywords using FAISS vector search.
      </p>
    </div>
  );
}
