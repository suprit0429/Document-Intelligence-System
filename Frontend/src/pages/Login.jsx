import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import LiquidEther from '../components/resuableComponent/LiquidEther';

export default function Login({ setActiveLink, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('PLEASE FILL IN ALL REQUIRED CREDENTIAL FIELDS.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin();
      if (setActiveLink) setActiveLink('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail?.toUpperCase() || 'LOGIN FAILED. TRY AGAIN.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col justify-center items-center overflow-hidden bg-transparent text-white px-4 py-8">
      {/* Background Liquid Canvas */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC']}
          mouseForce={20}
          cursorSize={80}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={2.5}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Main Retro Card Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="w-full border-4 border-white bg-surface/95 shadow-[8px_8px_0px_0px_rgba(40,129,205,0.4)] backdrop-blur-md overflow-hidden flex flex-col font-['Pixelify_Sans'] tracking-wide">
          
          {/* Retro Window Header */}
          <div className="bg-primary border-b-4 border-white px-4 py-2 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <HiOutlineShieldCheck className="h-4 w-4 text-accent" />
              <span className="font-['Press_Start_2P'] text-[10px] text-white tracking-widest uppercase">
                ★ USER-LOGIN.EXE ★
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-white/10">-</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-not-allowed hover:bg-white/10">■</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-red-500 flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-red-600">X</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 flex flex-col items-center">
            
            {/* Status Tag */}
            <div className="mb-4 px-3 py-1 border-2 border-primary-light/50 bg-primary/10 text-primary-light font-['Press_Start_2P'] text-[9px] tracking-wide animate-pulse">
              [ SECURE ACCESS GATEWAY ]
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-2 font-['Press_Start_2P'] text-white uppercase text-center">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mb-6 font-['Pixelify_Sans'] tracking-wide text-center max-w-xs">
              Log in to access your saved study guides, custom quizzes, and AI tutor features.
            </p>

            {error && (
              <div className="w-full mb-6 p-3 border-2 border-red-500 bg-red-500/10 text-red-400 font-['Press_Start_2P'] text-[9px] leading-relaxed flex items-center gap-2">
                <span>⚠ {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              
              {/* Email Input */}
              <div className="flex flex-col">
                <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase mb-2 flex items-center gap-1.5 select-none">
                  <HiOutlineEnvelope className="h-3.5 w-3.5 text-accent" />
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full px-3.5 py-2.5 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base tracking-wide focus:outline-none focus:border-accent focus:shadow-[3px_3px_0px_0px_rgba(96,205,255,0.5)] transition-all placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase flex items-center gap-1.5 select-none">
                    <HiOutlineLockClosed className="h-3.5 w-3.5 text-accent" />
                    Password
                  </label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base tracking-wide focus:outline-none focus:border-accent focus:shadow-[3px_3px_0px_0px_rgba(96,205,255,0.5)] transition-all placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-text-secondary hover:text-white focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash className="h-4 w-4" />
                    ) : (
                      <HiOutlineEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-['Press_Start_2P'] text-xs px-6 py-3.5 border-4 border-white bg-primary text-white font-bold transition-all duration-75 shadow-[5px_5px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase flex items-center justify-center gap-2.5 mt-2 select-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>Enter Workspace</span>
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer / Switch to Register */}
            <div className="mt-8 pt-6 border-t-2 border-white/10 w-full text-center flex flex-col items-center gap-2">
              <p className="text-xs text-text-secondary font-['Pixelify_Sans'] tracking-wide">
                Don't have an account yet?
              </p>
              <Link
                to="/register"
                onClick={() => setActiveLink && setActiveLink('/register')}
                className="font-['Press_Start_2P'] text-[9px] text-accent hover:text-accent/80 transition-colors uppercase underline tracking-wider select-none flex items-center gap-1.5"
              >
                <HiOutlineSparkles className="h-3.5 w-3.5 inline" /> Create New Account
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
