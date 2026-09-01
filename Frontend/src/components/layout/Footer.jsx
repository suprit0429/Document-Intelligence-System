import React from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export const Footer = ({ setActiveLink }) => {
  const handleNav = (path) => {
    if (setActiveLink) {
      setActiveLink(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-surface text-text-primary border-t border-border pt-16 pb-6 relative overflow-hidden select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          
          {/* Left Side: Brand Logo & Copyright */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-border bg-primary text-white rounded-lg shadow-sm">
                <HiOutlineAcademicCap className="h-6 w-6" />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-text-primary font-['Press_Start_2P'] uppercase">
                DocIntelligence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary font-normal">
              © copyright DocIntelligence 2026. All rights reserved.
            </p>
          </div>

          {/* Right Side: 4 Nav Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: Pages */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
                Pages
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li>
                  <button onClick={() => handleNav('/')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/UploadPdf')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Upload Documents
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/chat')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    AI Chat
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/quiz')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Quiz Builder
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/flashcards')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Flashcards
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Socials */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
                Socials
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li>
                  <a href="#privacy" className="hover:text-text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Register */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
                Register
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li>
                  <button onClick={() => handleNav('/register')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Sign Up
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/login')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/login')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                    Forgot Password
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Massive Edge-to-Edge Background Typography Watermark */}
      <div className="w-full pt-12 pb-0 overflow-hidden flex justify-center items-center pointer-events-none select-none">
        <span className="text-[13vw] sm:text-[14vw] font-black tracking-tighter leading-none text-text-primary/5 dark:text-white/5 uppercase whitespace-nowrap">
          DocIntelligence
        </span>
      </div>
    </footer>
  );
};

export default Footer;
