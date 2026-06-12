import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, X, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { resumeApi } from '@/lib/api';

export function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setError('');
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      setError('Only PDF and DOCX files are supported.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      const res = await resumeApi.upload(file);
      navigate('/dashboard'); // Go to dashboard or analysis
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload and parse resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">Upload Your Resume</h1>
      <p className="text-muted-foreground text-lg">
        Our AI will parse your resume and extract your experience, skills, and projects.
      </p>
      
      {error && (
        <div className="w-full p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3 text-sm text-destructive text-left">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Card 
        className={`w-full glass-card border-dashed border-2 transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-white/20'
        } mt-8`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-20 relative">
          {!file ? (
            <>
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-medium mb-2">Drag and drop your resume here</p>
              <p className="text-muted-foreground mb-6">Supported formats: PDF, DOCX (Max 5MB)</p>
              <Button 
                onClick={() => inputRef.current?.click()}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                Select File
              </Button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <File className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <p className="text-lg font-medium">{file.name}</p>
                <button 
                  onClick={() => setFile(null)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-48 shadow-[0_0_20px_rgba(170,59,255,0.3)]"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  'Upload & Analyze'
                )}
              </Button>
              
              {isUploading && (
                <p className="text-sm text-muted-foreground mt-4 animate-pulse">
                  Extracting information using Gemini AI...
                </p>
              )}
            </div>
          )}
          
          <input 
            type="file" 
            ref={inputRef}
            className="hidden" 
            accept=".pdf,.docx"
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
