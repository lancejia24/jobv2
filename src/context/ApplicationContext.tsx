import React, { createContext, useContext, useState, useCallback } from 'react';
import { Application, ApplicationStatus } from '../types/application';

interface ApplicationContextType {
  applications: Application[];
  getApplicationById: (id: string) => Application | undefined;
  getApplicationsByUser: (userId: string) => Application[];
  getApplicationsByJob: (jobId: string) => Application[];
  createApplication: (application: Omit<Application, 'id' | 'timeline'>) => Application;
  updateApplicationStatus: (id: string, status: ApplicationStatus, note?: string) => void;
  addInterviewToApplication: (applicationId: string, interview: Application['interviews'][0]) => void;
  updateInterviewStatus: (applicationId: string, interviewId: string, completed: boolean, feedback?: string) => void;
  addOfferToApplication: (applicationId: string, offer: Application['offer']) => void;
  respondToOffer: (applicationId: string, accepted: boolean, declinedReason?: string) => void;
  addNote: (applicationId: string, note: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);

  const getApplicationById = useCallback((id: string) => {
    return applications.find(app => app.id === id);
  }, [applications]);

  const getApplicationsByUser = useCallback((userId: string) => {
    return applications.filter(app => app.userId === userId);
  }, [applications]);

  const getApplicationsByJob = useCallback((jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  }, [applications]);

  const createApplication = useCallback((applicationData: Omit<Application, 'id' | 'timeline'>) => {
    const newApplication: Application = {
      ...applicationData,
      id: Date.now().toString(),
      timeline: [{
        status: applicationData.status,
        timestamp: new Date(),
      }],
    };

    setApplications(prev => [...prev, newApplication]);
    return newApplication;
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: ApplicationStatus, note?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          timeline: [
            ...app.timeline,
            {
              status,
              timestamp: new Date(),
              note,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const addInterviewToApplication = useCallback((applicationId: string, interview: Application['interviews'][0]) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          interviews: [...(app.interviews || []), interview],
          status: 'interview_scheduled',
          timeline: [
            ...app.timeline,
            {
              status: 'interview_scheduled',
              timestamp: new Date(),
              note: `Interview scheduled for ${interview.scheduledFor.toLocaleDateString()}`,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const updateInterviewStatus = useCallback((
    applicationId: string,
    interviewId: string,
    completed: boolean,
    feedback?: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        const updatedInterviews = app.interviews?.map(interview => {
          if (interview.id === interviewId) {
            return { ...interview, completed, feedback };
          }
          return interview;
        });

        return {
          ...app,
          interviews: updatedInterviews,
          status: completed ? 'interview_completed' : app.status,
          timeline: [
            ...app.timeline,
            {
              status: completed ? 'interview_completed' : app.status,
              timestamp: new Date(),
              note: feedback,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const addOfferToApplication = useCallback((applicationId: string, offer: Application['offer']) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          offer,
          status: 'offer_sent',
          timeline: [
            ...app.timeline,
            {
              status: 'offer_sent',
              timestamp: new Date(),
              note: `Offer sent: $${offer.salary} annually`,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const respondToOffer = useCallback((applicationId: string, accepted: boolean, declinedReason?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId && app.offer) {
        return {
          ...app,
          offer: {
            ...app.offer,
            accepted,
            declinedReason,
          },
          status: accepted ? 'offer_accepted' : 'offer_declined',
          timeline: [
            ...app.timeline,
            {
              status: accepted ? 'offer_accepted' : 'offer_declined',
              timestamp: new Date(),
              note: declinedReason,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const addNote = useCallback((applicationId: string, note: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          notes: [...(app.notes || []), note],
          timeline: [
            ...app.timeline,
            {
              status: app.status,
              timestamp: new Date(),
              note,
            },
          ],
        };
      }
      return app;
    }));
  }, []);

  const value = {
    applications,
    getApplicationById,
    getApplicationsByUser,
    getApplicationsByJob,
    createApplication,
    updateApplicationStatus,
    addInterviewToApplication,
    updateInterviewStatus,
    addOfferToApplication,
    respondToOffer,
    addNote,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}