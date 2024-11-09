// Add these types to your existing types.ts file

export interface Assessment {
  id: string;
  jobId: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: number;
  passingScore: number;
  skills: string[];
  dueDate?: Date;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  userId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'expired';
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  answers: Record<string, any>;
}

// Update the Job interface
export interface Job {
  // ... existing Job properties ...
  assessmentRequired?: boolean;
  assessment?: Assessment;
}