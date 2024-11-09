import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { JobFilters } from './components/jobs/JobFilters';
import { JobCard } from './components/jobs/JobCard';
import { MessagingPanel } from './components/messaging/MessagingPanel';
import { ForumList } from './components/forums/ForumList';
import { ThreadList } from './components/forums/ThreadList';
import { JobSeekerDashboard } from './components/dashboard/JobSeekerDashboard';
import { EmployerDashboard } from './components/dashboard/EmployerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ProfessionalDirectory } from './components/networking/ProfessionalDirectory';
import { SkillAssessments } from './components/skills/SkillAssessments';
import { ProfileWizard } from './components/profile/ProfileWizard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { MessagingProvider } from './context/MessagingContext';
import { JobProvider } from './context/JobContext';
import { AuthPage } from './components/auth/AuthPage';
import { LandingPage } from './components/landing/LandingPage';
import { LoggedInHome } from './components/home/LoggedInHome';

function JobListings() {
  const [filters, setFilters] = React.useState({
    search: '',
    type: [],
    location: '',
    salaryMin: '',
    salaryMax: '',
    experience: [],
    skills: [],
    remote: false,
    postedWithin: '',
  });

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (jobId: string) => {
    console.log('Applied to job:', jobId);
  };

  const handleSave = (jobId: string) => {
    console.log('Saved job:', jobId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <JobFilters
            filters={filters}
            onChange={handleFilterChange}
          />
        </aside>
        <main className="lg:col-span-3 space-y-6">
          {/* Jobs will be loaded from JobContext */}
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onSearch={() => {}} />
      
      <main className="flex-1">
        <Routes>
          {/* Home Route - Show LandingPage if not logged in, LoggedInHome if logged in */}
          <Route 
            path="/" 
            element={isAuthenticated ? <LoggedInHome /> : <LandingPage />} 
          />

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes - Redirect to auth if not logged in */}
          <Route 
            path="/jobs" 
            element={isAuthenticated ? <JobListings /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/network" 
            element={isAuthenticated ? <ProfessionalDirectory /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/skills" 
            element={isAuthenticated ? <SkillAssessments /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/forums" 
            element={isAuthenticated ? <ForumList /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/forums/:categoryId" 
            element={isAuthenticated ? <ThreadList categoryId="1" categoryName="Career Advice" /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/dashboard/jobseeker" 
            element={isAuthenticated && user?.role === 'jobseeker' ? <JobSeekerDashboard /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/dashboard/employer" 
            element={isAuthenticated && user?.role === 'employer' ? <EmployerDashboard /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/dashboard/admin" 
            element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/profile/setup" 
            element={isAuthenticated ? <ProfileWizard /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </main>

      <Footer onForumClick={() => {}} />
      {isAuthenticated && <MessagingPanel />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <ChatProvider>
            <MessagingProvider>
              <AppContent />
            </MessagingProvider>
          </ChatProvider>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}