import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { type UserRole } from '../../types';

export function QuickLogin() {
  const { login } = useAuth();

  const roles: { role: UserRole; label: string }[] = [
    { role: 'admin', label: 'Admin' },
    { role: 'jobSeeker', label: 'Job Seeker' },
    { role: 'employer', label: 'Employer' },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Login (Demo)</h3>
      <div className="flex flex-col gap-2">
        {roles.map(({ role, label }) => (
          <button
            key={role}
            onClick={() => login(role)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login as {label}
          </button>
        ))}
      </div>
    </div>
  );
}