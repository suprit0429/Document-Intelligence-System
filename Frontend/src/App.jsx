import React, { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import { UploadPdf } from './components/UploadPdf';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => (
  <div className="bg-surface-light/40 border border-border p-6 rounded-xl backdrop-blur-md">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">📊 Dashboard Overview</h2>
    <p className="text-text-secondary text-sm">Welcome back to your workspace. Here you can track your study statistics, overall progress, and AI recommendations.</p>
  </div>
);

const Chat = () => (
  <div className="bg-surface-light/40 border border-border p-6 rounded-xl backdrop-blur-md">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">💬 AI Chat Assistant</h2>
    <p className="text-text-secondary text-sm">Ask questions, explain complex study topics, or upload document extracts to learn with your personalized AI tutor.</p>
  </div>
);

const Quiz = () => (
  <div className="bg-surface-light/40 border border-border p-6 rounded-xl backdrop-blur-md">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">💡 AI Quiz Generator</h2>
    <p className="text-text-secondary text-sm">Generate smart test cases, quizzes, and practice materials directly from your uploaded textbook documents.</p>
  </div>
);

const Flashcards = () => (
  <div className="bg-surface-light/40 border border-border p-6 rounded-xl backdrop-blur-md">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">✨ Active Recall Flashcards</h2>
    <p className="text-text-secondary text-sm">Review vocabulary terms, formulas, and historical events. Use spacing repetition logic for high retention.</p>
  </div>
);

const Planner = () => (
  <div className="bg-surface-light/40 border border-border p-6 rounded-xl backdrop-blur-md">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">📅 Study Schedule & Planner</h2>
    <p className="text-text-secondary text-sm">Organize task timelines, milestones, and set reminders to prepare for upcoming tests and examinations.</p>
  </div>
);

function App() {
  const [activeLink, setActiveLink] = useState('/');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveLink('/');
  };

  const renderContent = () => {
    switch (activeLink) {
      case '/':
        return <LandingPage setActiveLink={setActiveLink} isLoggedIn={isLoggedIn} />;
      case '/uploadPdf':
      case '/UploadPdf':
        return <UploadPdf />;
      case '/chat':
        return <Chat />;
      case '/quiz':
        return <Quiz />;
      case '/flashcards':
        return <Flashcards />;
      case '/planner':
        return <Planner />;
      case '/login':
        return <Login setActiveLink={setActiveLink} onLogin={handleLogin} />;
      case '/register':
        return <Register setActiveLink={setActiveLink} onLogin={handleLogin} />;
      default:
        return <LandingPage setActiveLink={setActiveLink} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <Layout
      activeLink={activeLink}
      setActiveLink={setActiveLink}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  )
}

export default App
