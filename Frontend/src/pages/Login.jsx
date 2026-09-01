import React, { useState } from 'react';
import API from '../services/api';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineArrowRight } from 'react-icons/hi2';

export default function Login({ setActiveLink, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin();
      if (setActiveLink) setActiveLink('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 py-10 bg-transparent">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl border border-border">

        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 relative flex-col justify-between p-10 bg-gradient-to-br from-[#6B9FE4] via-[#7B6FBE] to-[#a78bfa] overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute bottom-10 -right-20 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <span
              onClick={() => setActiveLink?.('/')}
              className="font-['Dancing_Script'] text-2xl font-bold text-white cursor-pointer"
            >
              Doc-Intelligence
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-bold text-white leading-snug">
              Welcome back.<br />Good to see you.
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Sign in to access your documents, AI summaries, quizzes and more.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">D</div>
            <div>
              <p className="text-white text-sm font-medium">Doc-Intelligence</p>
              <p className="text-white/60 text-xs">AI-powered document platform</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-surface-light p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Sign in</h1>
          <p className="text-sm text-text-secondary mb-8">Enter your credentials to continue</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Password</label>
                <button
                  type="button"
                  onClick={() => setActiveLink?.('/forgot-password')}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer mt-1"
            >
              {isSubmitting ? 'Signing in...' : <><span>Sign In</span><HiOutlineArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <button
              onClick={() => setActiveLink?.('/register')}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
