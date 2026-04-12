"use client";

import React, { useEffect } from 'react';

type RoleType = 'visitor' | 'recruiter';

interface AuthRequestBody {
  token: string;
  role?: RoleType;
  username?: string;
}

interface AuthResponse {
  access_token?: string;
  [key: string]: unknown;
}

export default function AuthCallback() {
    useEffect(() => {
    (async () => {
      const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
      const params = new URLSearchParams(hash);
      const idToken = params.get('id_token');

      const rawRole = localStorage.getItem('selected_role');
      const role = rawRole === 'visitor' || rawRole === 'recruiter' ? (rawRole as RoleType) : undefined;

      const action = localStorage.getItem('auth_action') as 'register' | 'signin' | null;

      if (!idToken) {
        console.error('No id_token returned from Google');
        return;
      }

      const body: AuthRequestBody & { action?: string } = { token: idToken };
      if (role && action === 'register') body.role = role;
      const selectedUsername = localStorage.getItem('selected_username');
      if (selectedUsername && action === 'register') body.username = selectedUsername;
      if (action) body.action = action;

      try {
        const res = await fetch('http://localhost:8000/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          if (res.status === 404) {
            window.location.href = '/sign-up?missing=1';
            return;
          }
          const errData = await res.json().catch(() => ({}));
          console.error('Auth failed', errData);
          return;
        }

        const data = (await res.json()) as AuthResponse;
        if (data?.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.removeItem('selected_role');
          localStorage.removeItem('selected_username');
          localStorage.removeItem('auth_action');
          window.location.href = '/';
        } else {
          console.error('Auth failed', JSON.stringify(data));
        }
      } catch (err: unknown) {
        console.error('Fetch error', err);
      }
    })();
  }, []);

  return (
    <main className="h-[70vh] flex justify-center items-center">
      <div className="text-center text-white">Signing you in...</div>
    </main>
  );
}
