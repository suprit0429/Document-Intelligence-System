import React from 'react';
import {
  HiOutlineArrowRight,
  HiOutlineChevronDown,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineChatBubbleLeftRight,
  HiOutlineRectangleGroup,
  HiOutlineClipboardDocumentCheck
} from 'react-icons/hi2';
import Services from './services';
import Footer from '../components/layout/Footer';

export const LandingPage = ({ setActiveLink }) => {
  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-transparent text-text-primary">

      {/* Main Landing Window Hero */}
      <div className="relative z-10 w-full max-w-5xl px-4 pt-8 sm:pt-14 pb-12 mx-auto flex flex-col items-center">

        {/* Window Container with Glassmorphic Professional Finish */}
        <div className="w-full border border-border bg-surface-light/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300">

          {/* Window Chrome Header Bar */}
          <div className="bg-surface/90 border-b border-border px-5 py-3 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"></span>
              <span className="ml-3 font-['Pixelify_Sans'] text-xs text-text-secondary tracking-wider uppercase font-medium">
                document-intelligence-system
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>

          {/* Hero Content Body */}
          <div className="p-8 sm:p-12 md:p-14 flex flex-col items-center text-center relative overflow-hidden">

            {/* Subtle background highlight behind content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            {/* Badge Pill */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-light/40 bg-primary/10 text-text-primary font-['Pixelify_Sans'] text-xs tracking-wide shadow-sm">
              <span>Document Intelligence & Automated Study Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-text-primary leading-tight max-w-3xl">
              Transform Course Materials Into{' '}
              <span className="font-['Caveat'] text-3xl sm:text-5xl md:text-6xl font-bold italic bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent drop-shadow-sm inline-block px-1">
                Interactive Study Intelligence
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl text-center font-normal">
              Upload textbooks, lecture notes, or research PDFs. Automatically extract key insights, generate precision quizzes, build active recall flashcard decks, and organize custom study plans.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <button
                onClick={() => setActiveLink('/login')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-b from-primary via-primary-light to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border bg-surface-lighter text-text-primary font-medium text-sm hover:bg-surface transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Features</span>
                <HiOutlineChevronDown className="w-4 h-4 text-accent animate-bounce" />
              </button>
            </div>

            {/* Key Platform Highlights Bar */}
            <div className="mt-12 pt-8 border-t border-border w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-['Pixelify_Sans'] text-xs text-text-secondary">
              <div className="flex items-center justify-center gap-2 py-1">
                <HiOutlineDocumentMagnifyingGlass className="w-4 h-4 text-primary shrink-0" />
                <span>Multi-Docs support</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-1">
                <HiOutlineChatBubbleLeftRight className="w-4 h-4 text-amber-500 shrink-0" />
                <span>RAG Based Summaries</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-1">
                <HiOutlineRectangleGroup className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Flashcard Generation</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-1">
                <HiOutlineClipboardDocumentCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Quiz Builder</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div id="services-section" className="relative z-10 w-full pt-6">
        <Services setActiveLink={setActiveLink} />
      </div>

      {/* Footer Component matching DevStudio design */}
      <div className="relative z-10 w-full mt-16">
        <Footer setActiveLink={setActiveLink} />
      </div>

    </div>
  );
};

export default LandingPage;
