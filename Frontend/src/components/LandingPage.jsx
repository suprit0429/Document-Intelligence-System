import LiquidEther from './resuableComponent/LiquidEther';


export const LandingPage = ({ setActiveLink }) => {

  return (
    <div className="relative min-h-[calc(100vh-12rem)] w-full flex flex-col justify-center items-center overflow-hidden bg-transparent text-white">

      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC']}
          mouseForce={20}
          cursorSize={80}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={2.5}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 py-8 mx-auto flex flex-col items-center">

        <div className="w-full border-4 border-white bg-surface/90 shadow-[8px_8px_0px_0px_rgba(40,129,205,0.4)] backdrop-blur-md overflow-hidden flex flex-col">

          <div className="bg-primary border-b-4 border-white px-4 py-2 flex items-center justify-between select-none">
            <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-white tracking-widest uppercase">
              ★ AI-STUDY-OS.EXE ★
            </span>
            <div className="flex gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-white/10">-</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-white/10">■</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-red-500 flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white cursor-pointer hover:bg-red-600">X</span>
            </div>
          </div>


          <div className="p-6 sm:p-10 flex flex-col items-center text-center">

            <div className="mb-6 px-3 py-1 border-2 border-primary-light/50 bg-primary/10 text-primary-light font-['Press_Start_2P'] text-[9px] tracking-wide animate-pulse">
              [ SYSTEM STATUS: ONLINE ]
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold tracking-wide mb-6 font-['Press_Start_2P'] text-white leading-normal uppercase select-none">
              Study Smarter <br className="sm:hidden" /> with <br />
              <span className="text-accent block mt-4 text-2xl sm:text-4xl tracking-wider drop-shadow-[0_4px_0_rgba(15,108,189,0.5)]">
                AI-STUDY-ASSISTANT
              </span>
            </h1>


            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 font-['Pixelify_Sans'] tracking-wide max-w-xl text-center">
              Upload textbooks, slides, or study guides to automatically generate detailed summaries, interactive quizzes, customized planner tasks, and active recall flashcards.
            </p>


            <div className="flex items-center gap-2 mb-8 font-['Press_Start_2P'] text-[9px] text-accent/80 select-none">
              <span className="inline-block w-2 h-2.5 bg-accent animate-pulse"></span>
              <span>PRESS START TO ENTER THE WORKSPACE</span>
            </div>


            <button
              onClick={() => setActiveLink('/login')}
              className="font-['Press_Start_2P'] text-xs sm:text-sm px-8 py-4 border-4 border-white bg-primary text-white font-bold transition-all duration-75 shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className='hero-section'>

      </div>
    </div>
  );
};

export default LandingPage;
