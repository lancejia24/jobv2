export type ApplicationStatus = 
  | 'pending'
  | 'reviewing'
  | 'assessment'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'offer_pending'
  | 'offer_sent'
  | 'offer_accepted'
  | 'offer_declined'
  | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  resume: string;
  coverLetter?: string;
  assessmentScore?: number;
  assessmentCompleted?: boolean;
  assessmentDueDate?: Date;
  notes?: string[];
  timeline: {
    status: ApplicationStatus;
    timestamp: Date;
    note?: string;
  }[];
  interviews?: {
    id: string;
    scheduledFor: Date;
    type: 'phone' | 'video' | 'onsite';
    with: string;
    location?: string;
    notes?: string;
    feedback?: string;
    completed: boolean;
  }[];
  offer?: {
    salary: number;
    benefits: string[];
    startDate: Date;
    expiresAt: Date;
    accepted?: boolean;
    declinedReason?: string;
  };
}