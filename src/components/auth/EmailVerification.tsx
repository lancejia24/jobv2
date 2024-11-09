import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Verify code
      console.log('Verifying code:', code);
      setIsVerified(true);
      onVerified();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      // Resend verification code
      console.log('Resending verification code to:', email);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  if (isVerified) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-900">Email Verified</p>
          <p className="mt-2 text-sm text-gray-500">
            Your email has been successfully verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Verify your email</h2>
        <p className="mt-1 text-sm text-gray-500">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter 6-digit code"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify Email
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Resend verification code
          </button>
        </div>
      </form>

      <div className="mt-6">
        <Link
          to="/auth"
          className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}