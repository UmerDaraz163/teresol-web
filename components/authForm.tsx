'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Import your client

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert('Error signing up: ' + error.message);
    } else {
      alert('Check your email for the confirmation link!');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert('Error signing in: ' + error.message);
    } else {
      // For a real app, you would redirect the user upon successful login
      window.location.href = '/'; // Example redirect
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto p-4 border rounded-lg">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border rounded"
      />
      <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
      <button onClick={handleSignUp} className="bg-green-500 text-white p-2 rounded">
        Sign Up
      </button>
    </div>
  );
}