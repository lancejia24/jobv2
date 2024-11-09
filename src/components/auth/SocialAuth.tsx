import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialAuthProps {
  onSocialAuth: (provider: 'google' | 'github' | 'linkedin') => Promise<void>;
  isLoading?: boolean;
}

export function SocialAuth({ onSocialAuth, isLoading }: SocialAuthProps) {
  const handleAuth = async (provider: 'google' | 'github' | 'linkedin') => {
    try {
      await onSocialAuth(provider);
    } catch (error) {
      console.error(`${provider} auth failed:`, error);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => handleAuth('google')}
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <span className="sr-only">Sign in with Google</span>
          <Mail className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleAuth('github')}
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <span className="sr-only">Sign in with GitHub</span>
          <Github className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleAuth('linkedin')}
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <span className="sr-only">Sign in with LinkedIn</span>
          <Linkedin className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}