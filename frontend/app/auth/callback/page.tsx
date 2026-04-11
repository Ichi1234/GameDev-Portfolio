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
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');

    const rawRole = localStorage.getItem('selected_role');
    const role = rawRole === 'visitor' || rawRole === 'recruiter' ? (rawRole as RoleType) : undefined;

    if (!idToken) {
      console.error('No id_token returned from Google');
      return;
    }

    const body: AuthRequestBody = { token: idToken };
    if (role) body.role = role;
    const selectedUsername = localStorage.getItem('selected_username');
    if (selectedUsername) body.username = selectedUsername;

    fetch('http://localhost:8000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json() as Promise<AuthResponse>)
      .then((data) => {
        if (data?.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.removeItem('selected_role');
          localStorage.removeItem('selected_username');
          window.location.href = '/';
        } else {
          console.error('Auth failed', JSON.stringify(data));
        }
      })
      .catch((err: unknown) => console.error('Fetch error', err));
  }, []);

  return (
    <main className="h-[70vh] flex justify-center items-center">
      <div className="text-center text-white">Signing you in...</div>
    </main>
  );
}
