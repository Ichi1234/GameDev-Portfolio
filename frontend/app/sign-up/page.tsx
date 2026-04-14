"use client";

import React, { useState, useEffect } from 'react';

export default function SignUp() {
    const [role, setRole] = useState<'visitor' | 'recruiter' | null>(null);
    const [username, setUsername] = useState<string>('');
    const [missingNotice, setMissingNotice] = useState<boolean>(false);

    const isReady = Boolean(role) && username.trim() !== '';

    // Read URL params only on client after mount to avoid SSR/client markup mismatch
    useEffect(() => {
        try {
            if (typeof window === 'undefined') return;
            const params = new URLSearchParams(window.location.search);
            const missing = params.get('missing') === '1';
            if (missing) {
                setTimeout(() => setMissingNotice(true), 0);
                const clean = window.location.pathname;
                window.history.replaceState({}, document.title, clean);
            }
        } catch (e) {
            // ignore
        }
    }, []);

    const handleGoogleLogin = (action: 'register' | 'signin') => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = "http://localhost:3000/auth/callback";

        localStorage.setItem('auth_action', action);
        if (action === 'register') {
            if (role) localStorage.setItem('selected_role', role);
            if (username) localStorage.setItem('selected_username', username);
        }

        const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(clientId || '')}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=token%20id_token` +
            `&scope=${encodeURIComponent('openid email profile')}` +
            `&nonce=${Math.random().toString(36).slice(2)}`;

        window.location.href = url;
    };

    return (
        <main className="h-[70vh] flex justify-center items-center px-4">
            <form className="w-full max-w-md flex flex-col items-center gap-y-6 mt-auto px-8 py-10 rounded-2xl bg-cardbackground border border-[#332e2b]">
                <div className="flex justify-evenly w-full">
                    <button
                        type="button"
                        onClick={() => setRole('visitor')}
                        className={`w-full text-xl font-title px-6 py-2 border-b-2 ${role === 'visitor' ? 'text-white border-primary/40' : 'text-textsubcolor border-[#332e2b]'}`}
                    >
                        Visitor
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('recruiter')}
                        className={`w-full text-xl font-title px-6 py-2 border-b-2 ${role === 'recruiter' ? 'text-white border-primary/40' : 'text-textsubcolor border-[#332e2b]'}`}
                    >
                        HR
                    </button>

                </div>

                <h2 className="font-title font-bold text-2xl mt-2 text-white">Register</h2>

                {missingNotice && (
                    <div className="w-full px-4 py-2 mt-2 rounded bg-red-900 text-red-200 text-sm">
                        Account not found. Please register first or sign up.
                    </div>
                )}

                <div className="self-start w-full">
                    <label className="block text-textsubcolor mb-1" htmlFor="name">Username</label>
                    <input name="name" autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Type your username here..." className="w-full pb-2 focus:outline-none focus:ring-0 border-b border-primary/40 focus:border-primary" />    
                </div>
                
                <button
                    onClick={() => handleGoogleLogin('register')}
                    type="button"
                    disabled={!isReady}
                    className={`w-full text-sm mt-4 px-6 py-3 bg-primary font-semibold text-black rounded-lg ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Register with Google OAuth
                </button>
                
                <span className="text-sm text-textsubcolor">
                    Already have an account?{' '}
                    <span
                        onClick={() => handleGoogleLogin('signin')}
                        className="text-primary cursor-pointer hover:underline"
                    >
                        Sign in with Google
                    </span>
                </span>            
            </form>
            
        </main>
    );
}