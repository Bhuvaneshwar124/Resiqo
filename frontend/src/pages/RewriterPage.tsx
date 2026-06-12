import React from 'react';
import { Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function RewriterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center max-w-2xl mx-auto space-y-6">
      <Badge variant="secondary" className="px-3 py-1 bg-primary/20 text-primary border-primary/30">
        Coming in Phase 4
      </Badge>
      <div className="h-24 w-24 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
        <Wand2 className="h-12 w-12 text-purple-500" />
      </div>
      <h1 className="text-4xl font-bold">AI Resume Rewriter</h1>
      <p className="text-muted-foreground text-lg">
        Transform weak bullet points into high-impact STAR statements with quantified metrics instantly.
      </p>
    </div>
  );
}
