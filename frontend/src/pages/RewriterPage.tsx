import React, { useState } from 'react';
import { Wand2, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function RewriterPage() {
  const [input, setInput] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRewrite = () => {
    if (!input) return;
    setIsRewriting(true);
    // Simulate AI Rewrite
    setTimeout(() => {
      setResult("Developed and deployed a scalable React-based web application, reducing page load times by 40% and increasing user retention by 15% over 3 months.");
      setIsRewriting(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
          <Wand2 className="h-8 w-8 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Bullet Point Rewriter</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Transform weak, task-based bullet points into high-impact, results-driven STAR statements instantly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <CardHeader>
            <CardTitle className="text-lg">Original Text</CardTitle>
            <CardDescription>Paste a bullet point from your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="e.g. Built a web app using React and made it faster." 
              className="min-h-[150px] bg-background/50 border-white/10 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" 
              onClick={handleRewrite} 
              disabled={isRewriting || !input}
            >
              {isRewriting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enhancing...</> : <><Sparkles className="mr-2 h-4 w-4" /> Rewrite with AI</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/20 bg-purple-500/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              STAR Optimized
              {result && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 text-purple-400 hover:text-purple-300">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </CardTitle>
            <CardDescription>Ready for your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="p-4 rounded-lg bg-black/40 border border-purple-500/20 text-foreground leading-relaxed animate-fade-in">
                {result}
              </div>
            ) : (
              <div className="h-[150px] flex items-center justify-center border border-dashed border-white/10 rounded-lg text-muted-foreground text-sm">
                AI magic will appear here
              </div>
            )}
            
            {result && (
              <div className="mt-6 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Improvements Made:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">Added Metrics</span>
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-medium">Stronger Verbs</span>
                  <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-500 text-xs font-medium">STAR Format</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
