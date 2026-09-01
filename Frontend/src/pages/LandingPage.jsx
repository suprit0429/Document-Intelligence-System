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

      {/* Main Landing Clean Hero Section */}
      <div className="relative z-10 w-full max-w-6xl px-4 pt-10 sm:pt-16 pb-12 mx-auto flex flex-col items-center text-center">

        {/* Subtle background ambient lighting glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/15 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Hero Content Body */}
        <div className="relative z-10 p-4 sm:p-8 flex flex-col items-center text-center max-w-4xl">




          {/* Giant Gradient Main Title */}
          <h1 className="flex flex-col items-center gap-1 mb-6 select-none">
            <span className="font-['Dancing_Script'] text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary drop-shadow-sm">
              Welcome to
            </span>
            <span className="hero-gradient-text text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] drop-shadow-sm">
              Document Intelligence <span style={{background: 'linear-gradient(90deg, #f97316, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>System</span>
            </span>
          </h1>

          {/* Subtitle Description Tailored to Document Intelligence System */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl text-center font-normal">
            Streamline document processing, extract key academic insights, and boost study performance with our all-in-one RAG platform designed for modern learners.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => setActiveLink('/login')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r bg-black text-gray-800 font-semibold text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span className="group-hover:underline text-white">Get Started</span>
              <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
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
          <div className="mt-14 pt-8 border-t border-border/80 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-['Pixelify_Sans'] text-xs text-text-secondary">
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
