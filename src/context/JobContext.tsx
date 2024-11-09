import React, { createContext, useContext, useState, useCallback } from 'react';
import { type Job } from '../types';

// Sample jobs for testing
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    companyId: 'comp1',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Join our team as a Senior Frontend Developer and help build the next generation of web applications.',
    requirements: ['React', 'TypeScript', 'GraphQL', '5+ years experience'],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
    },
    postedAt: new Date('2024-03-01'),
  },
  {
    id: '2',
    title: 'Product Designer',
    companyId: 'comp2',
    company: 'Design Studio Inc',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our creative team as a Product Designer. Create beautiful, intuitive interfaces for our suite of products.',
    requirements: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    salary: {
      min: 90000,
      max: 140000,
      currency: 'USD',
    },
    postedAt: new Date('2024-03-05'),
  },
];

interface JobContextType {
  jobs: Job[];
  createJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
  getJobsByEmployer: (employerId: string) => Job[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const createJob = useCallback((job: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  }, []);

  const updateJob = useCallback((id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  }, []);

  const getJobById = useCallback((id: string) => {
    return jobs.find(job => job.id === id);
  }, [jobs]);

  const getJobsByEmployer = useCallback((employerId: string) => {
    return jobs.filter(job => job.companyId === employerId);
  }, [jobs]);

  return (
    <JobContext.Provider value={{
      jobs,
      createJob,
      updateJob,
      deleteJob,
      getJobById,
      getJobsByEmployer,
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}