import { User } from '../../types';

type SocialProvider = 'google' | 'github' | 'linkedin';

interface SocialAuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const OAUTH_ENDPOINTS = {
  google: '/api/auth/google',
  github: '/api/auth/github',
  linkedin: '/api/auth/linkedin',
};

export async function initiateSocialAuth(provider: SocialProvider): Promise<void> {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    OAUTH_ENDPOINTS[provider],
    `${provider}Auth`,
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (!popup) {
    throw new Error('Failed to open authentication window. Please allow popups for this site.');
  }

  return new Promise((resolve, reject) => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'social_auth_success') {
        window.removeEventListener('message', handleMessage);
        popup.close();
        resolve();
      }

      if (event.data?.type === 'social_auth_error') {
        window.removeEventListener('message', handleMessage);
        popup.close();
        reject(new Error(event.data.error || 'Authentication failed'));
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up if the popup is closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
        reject(new Error('Authentication window was closed'));
      }
    }, 1000);
  });
}

export async function handleSocialAuthCallback(provider: SocialProvider, code: string): Promise<SocialAuthResponse> {
  const response = await fetch(`${OAUTH_ENDPOINTS[provider]}/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Social authentication failed');
  }

  return response.json();
}