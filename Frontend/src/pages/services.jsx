import React, { useState } from 'react';
import CardSwap, { Card } from '../components/ui/CardSwap';
import {
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineRectangleGroup,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineCheckBadge,
  HiOutlineArrowTrendingUp,
  HiOutlineCircleStack,
  HiOutlineSquare3Stack3D,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineAcademicCap,
  HiOutlineViewColumns
} from 'react-icons/hi2';

export const Services = ({ setActiveLink }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);


  const serviceCards = [
    {
      id: 'doc-parsing',
      title: 'Document Intelligence Engine',
      badge: 'Vector-RAG',
      category: 'ai',
      icon: HiOutlineDocumentText,
      gradient: 'from-blue-600 to-indigo-900',
      borderColor: 'border-blue-500/50',
      shortDesc: 'Automated OCR, sectioning, and multi-modal semantic extraction for textbooks & PDFs.',
      fullDesc: 'Transform raw textbooks, research PDFs, and lecture slides into structured knowledge graphs. Performs multi-modal parsing, figure extraction, and automatic summary synthesis in seconds.',
      features: [
        'Multi-format support (PDF, DOCX, PPTX)',
        'Optical Character Recognition (OCR)',
        'Structured section & summary extraction',
        'Semantic key-concept indexing'
      ],
      
      route: '/UploadPdf'
    },
    {
      id: 'ai-chat',
      title: 'Chat Assistant',
      badge: 'RAG Powered',
      category: 'ai',
      icon: HiOutlineChatBubbleLeftRight,
      gradient: 'from-purple-600 to-slate-900',
      borderColor: 'border-purple-500/50',
      shortDesc: 'Ask questions and get instant source-grounded answers with line citations.',
      fullDesc: 'Chat directly with your uploaded documents. Powered by Retrieval-Augmented Generation (RAG), the tutor explains complex equations, defines terminology, and provides page citations.',
      features: [
        'Grounding with verbatim page citations',
        'Math & LaTeX formula rendering',
        'Socratic explanation mode',
        'Multi-document cross querying'
      ],
      
      route: '/chat'
    },
    {
      id: 'quiz-gen',
      title: 'Quiz Generator',
      badge: 'Adaptive Evaluation',
      category: 'learning',
      icon: HiOutlineClipboardDocumentCheck,
      gradient: 'from-amber-600 to-slate-900',
      borderColor: 'border-amber-500/50',
      shortDesc: 'Auto-generate mock exams, MCQs, and practice tests from your syllabus.',
      fullDesc: 'Convert dense document chapters into practice tests with configurable difficulty. Get instant grading, detailed rationale for every answer choice, and customized hints.',
      features: [
        'Multiple choice, True/False & Fill-in-blanks',
        'Configurable difficulty (Beginner to Expert)',
        'Step-by-step solution rationales',
        'Weak-spot review recommendations'
      ],
     
      route: '/quiz'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      badge: 'Spaced Repetition',
      category: 'learning',
      icon: HiOutlineRectangleGroup,
      gradient: 'from-emerald-600 to-teal-950',
      borderColor: 'border-emerald-500/50',
      shortDesc: 'Master formulas, definitions, and concepts with automated spaced repetition.',
      fullDesc: 'AI automatically isolates high-yield study facts, key terminology, and formulas to construct interactive digital flashcard decks with spaced repetition timing for 95%+ retention.',
      features: [
        'Automated term & definition extraction',
        'SM-2 Spaced Repetition Algorithm',
        'Audio pronunciation & formula previews',
        'Deck progress & mastery tracking'
      ],
      
      route: '/flashcards'
    },
    {
      id: 'analytics',
      title: 'Analytical Dashboard',
      badge: 'Performance Insights',
      category: 'productivity',
      icon: HiOutlineChartBar,
      gradient: 'from-rose-600 to-slate-900',
      borderColor: 'border-rose-500/50',
      shortDesc: 'Visual performance metrics, mastery charts, and study habit analysis.',
      fullDesc: 'Gain deep visibility into your learning performance. Track retention rates, quiz accuracy across topics, document completion percentages, and targeted area improvements.',
      features: [
        'Topic mastery heatmaps',
        'Quiz performance metrics',
        'Study velocity & streak counter',
        'AI personalized study suggestions'
      ],
   
      route: '/dashboard'
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? serviceCards
    : serviceCards.filter(s => s.category === activeCategory);

  const handleNavigate = (path) => {
    if (setActiveLink) {
      setActiveLink(path);
    }
  };

  return (
    <div className="relative w-full min-h-screen pb-16 text-text-primary select-none">
      
      {/* Background Subtle Gradient Highlights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
  <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-light/40 bg-primary/10 text-text-primary font-['Pixelify_Sans'] text-xs tracking-wide shadow-sm">
            
            <span>Platform Capabilities & Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            Comprehensive Tools Built For{' '}
            <span className="bg-linear-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>

          <p className="text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
            Everything you need to digest complex textbooks, generate targeted practice tests, organize study timelines, and master course materials.
          </p>
        </div>

        {/* HERO FEATURE: React Bits <CardSwap /> Interactive Component Showcase Container */}
        <div className="w-full border border-border bg-surface-light/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl rounded-2xl overflow-hidden p-6 sm:p-10 transition-all duration-300">
          
        {/* Card swipe feature*/}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-5 mb-8 gap-4">
            <div className="flex items-center gap-3">
             
              <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                Features showcase
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-secondary bg-surface px-3 py-1.5 rounded-lg border border-border">
              <HiOutlineViewColumns className="text-accent w-4 h-4" />
              <span> Click to Select</span>
            </div>
          </div>

          {/* Grid Layout: Left Info & Controls, Right CardSwap Animation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
            
            {/* Left 5 cols: Detailed Service Highlight */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full  text-accent">
                    {serviceCards[selectedCardIdx].badge}
                  </span>
                  <span className="text-xs text-text-secondary font-['Pixelify_Sans']">
                    Capability #{selectedCardIdx + 1} of {serviceCards.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-3">
                  {React.createElement(serviceCards[selectedCardIdx].icon, { className: "w-8 h-8 text-accent shrink-0" })}
                  {serviceCards[selectedCardIdx].title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed font-normal">
                  {serviceCards[selectedCardIdx].fullDesc}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 border-t border-b border-border py-4">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Key Capabilities:</p>
                <div className="grid grid-cols-1 gap-2">
                  {serviceCards[selectedCardIdx].features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-text-primary">
                      <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Indicator */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
               

                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  {serviceCards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCardIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        selectedCardIdx === idx ? 'bg-accent scale-125 ring-2 ring-accent/40' : 'bg-border hover:bg-text-secondary'
                      }`}
                      title={`Select item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Right 7 cols: CardSwap Component Container */}
            <div className="lg:col-span-7 relative w-full h-[480px] sm:h-[540px] flex items-center justify-center overflow-visible">
              <div className="relative w-full h-full flex items-center justify-center">
                <CardSwap
                  width={340}
                  height={380}
                  cardDistance={45}
                  verticalDistance={55}
                  delay={4500}
                  pauseOnHover={true}
                  onCardClick={(idx) => setSelectedCardIdx(idx)}
                  skewAmount={5}
                  easing="elastic"
                >
                  {serviceCards.map((card) => {
                    const IconComp = card.icon;
                    return (
                      <Card
                        key={card.id}
                        className={`p-6 bg-gradient-to-br ${card.gradient} border border-white/30 shadow-2xl rounded-2xl flex flex-col justify-between text-white cursor-pointer select-none transition-all hover:scale-[1.02]`}
                      >
                        {/* Top Header */}
                        <div className="flex items-start justify-between">
                          <div className="p-3 bg-surface/80 border border-white/20 rounded-xl shadow-sm">
                            <IconComp className="w-7 h-7 text-accent" />
                          </div>
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-white/20 text-accent uppercase">
                            {card.badge}
                          </span>
                        </div>

                        {/* Middle Content */}
                        <div className="space-y-3 my-4">
                          <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                            {card.title}
                          </h4>
                          <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                            {card.shortDesc}
                          </p>
                        </div>

                        {/* Card Bottom Stats & Prompt */}
                        <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                          <span className="text-accent font-medium flex items-center gap-1">
                            <HiOutlineArrowTrendingUp className="w-3.5 h-3.5" />
                            {card.stats}
                          </span>
                          <span className="text-white/80 group-hover:text-white text-[11px] font-medium flex items-center gap-1">
                            Click card
                            <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Services Grid Catalog */}
        <div className="space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                All Platform Services
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Filter by category to explore all built-in features and study utilities.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'ai', label: 'AI Engine' },
                { id: 'learning', label: 'Learning' },
                { id: 'productivity', label: 'Productivity' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer font-medium ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20 border border-primary-light/50'
                      : 'bg-surface-light text-text-secondary border border-border hover:text-text-primary hover:border-text-secondary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative border border-border bg-surface-light/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-primary-light/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-primary/10 border border-primary-light/30 rounded-xl text-accent">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary uppercase">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                      {service.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-normal">
                      {service.fullDesc}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2 border-t border-border pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                          <HiOutlineCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-medium text-accent">
                      {service.stats}
                    </span>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="border border-border bg-surface-light/80 shadow-2xl backdrop-blur-xl rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">System Architecture</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              How Document Intelligence Works
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              A 4-step automated pipeline built to streamline your learning workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Upload Documents',
                desc: 'Drop your textbook PDFs, slides, or course outlines into our secure processing engine.',
                icon: HiOutlineCircleStack
              },
              {
                step: '02', 
                title: 'RAG Processing',
                desc: 'Multi-modal AI parses text structure, formulas, and builds a vector knowledge base.',
                icon: HiOutlineSquare3Stack3D
              },
              {
                step: '03',
                title: 'Interactive Tools',
                desc: 'Generate quizzes, flashcard decks, study schedules, and interact with the AI tutor.',
                icon: HiOutlineAcademicCap
              },
              {
                step: '04',
                title: 'Master & Retain',
                desc: 'Track mastery analytics, review weak spots with spaced repetition, and ace exams.',
                icon: HiOutlineCheckBadge
              }
            ].map((st, i) => {
              const StepIcon = st.icon;
              return (
                <div key={i} className="border border-border bg-surface rounded-xl p-5 space-y-3 relative shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent bg-surface-lighter px-2.5 py-1 rounded-md border border-border">
                      STEP {st.step}
                    </span>
                    <StepIcon className="w-5 h-5 text-text-secondary" />
                  </div>
                  <h4 className="text-sm font-bold text-text-primary">{st.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Footer Card */}
        <div className="border border-border rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-200 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h3 className=" font-['Caveat'] text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Ready to Elevate Your Study Experience?
          </h3>
          <p className="text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
            Start uploading your course materials today and let our AI document system optimize your retention and performance.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => handleNavigate('/UploadPdf')}
              className="px-8 py-4 rounded-xl border border-white/40 bg-surface text-text-primary font-semibold text-sm shadow-xl hover:bg-surface-lighter transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>Get Started Now</span>
              <HiOutlineArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
