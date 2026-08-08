import React from 'react';
import { Navbar } from './Navbar';
import Dock from './Dock';
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineLightBulb,
  HiOutlineCalendarDays,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineHome,
} from 'react-icons/hi2';

export default function Layout({ children, activeLink, setActiveLink, isLoggedIn, onLogout }) {
  const dockItems = [
    {
      icon: <HiOutlineHome size={18} className={activeLink === '/' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'Home',
      onClick: () => setActiveLink('/'),
      className: activeLink === '/' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    },
    {
      icon: <HiOutlineSquares2X2 size={18} className={activeLink === '/UploadPdf' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'UploadPdf',
      onClick: () => setActiveLink('/UploadPdf'),
      className: activeLink === '/UploadPdf' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    },
    {
      icon: <HiOutlineChatBubbleLeftRight size={18} className={activeLink === '/chat' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'Chat',
      onClick: () => setActiveLink('/chat'),
      className: activeLink === '/chat' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    },
    {
      icon: <HiOutlineLightBulb size={18} className={activeLink === '/quiz' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'Quiz',
      onClick: () => setActiveLink('/quiz'),
      className: activeLink === '/quiz' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    },
    {
      icon: <HiOutlineSparkles size={18} className={activeLink === '/flashcards' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'Flashcards',
      onClick: () => setActiveLink('/flashcards'),
      className: activeLink === '/flashcards' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    },
    {
      icon: <HiOutlineCalendarDays size={18} className={activeLink === '/planner' ? "text-primary-light" : "text-text-secondary"} />,
      label: 'Planner',
      onClick: () => setActiveLink('/planner'),
      className: activeLink === '/planner' ? 'border-primary-light/50 bg-surface-lighter text-primary-light' : 'text-text-secondary hover:text-white'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-surface text-text-primary flex flex-col overflow-x-hidden select-none">
      {/* Subtle brand glow in the background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-light/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Header Navbar */}
      <div className="relative z-20">
        <Navbar activeLink={activeLink} setActiveLink={setActiveLink} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </div>

      {/* Main Workspace Body */}
      <main className={activeLink === '/' ? "relative z-10 flex-1 w-full pb-32" : "relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32"}>
        {children}
      </main>

      {/* Bottom Interactive Navigation Dock - Only shown when user is logged in */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-none">
          <div className="pointer-events-auto">
            <Dock
              items={dockItems}
              panelHeight={64}
              baseItemSize={48}
              magnification={64}
            />
          </div>
        </div>
      )}
    </div>
  );
}
