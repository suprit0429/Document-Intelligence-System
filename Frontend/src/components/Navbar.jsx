import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import {
    HiOutlineChatBubbleLeftRight,
    HiOutlineLightBulb,
    HiOutlineCalendarDays,
    HiOutlineSquares2X2,
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineArrowRightOnRectangle,
    HiOutlineSparkles,
} from 'react-icons/hi2';

const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HiOutlineSquares2X2 },
    { name: 'Chat', href: '/chat', icon: HiOutlineChatBubbleLeftRight },
    { name: 'Quiz', href: '/quiz', icon: HiOutlineLightBulb },
    { name: 'Flashcards', href: '/flashcards', icon: HiOutlineSparkles },
    { name: 'Planner', href: '/planner', icon: HiOutlineCalendarDays },
];

export const Navbar = ({ activeLink, setActiveLink }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-transparent text-text-primary select-none">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left Side: Logo */}
                <div className="flex flex-1 justify-start">
                    <a href="/" className="flex items-center gap-3.5 no-underline group">
                        <div className="p-1.5 border-2 border-white bg-primary text-white shadow-[2px_2px_0px_0px_#000]">
                            <HiOutlineAcademicCap className="h-5 w-5 transition-transform duration-100 group-hover:scale-110" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white select-none font-['Press_Start_2P'] uppercase">
                            AI-STUDY-ASSISTANT
                        </span>
                    </a>
                </div>

                {/* Center: Hidden in Desktop since Dock handles navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    {/* Managed by the bottom Dock component */}
                </div>

                <div className="hidden md:flex flex-1 justify-end items-center">
                    <Link
                        to="/login"
                        onClick={() => setActiveLink && setActiveLink('/login')}
                        className="flex items-center gap-2 rounded-none border-2 border-white bg-surface px-3.5 py-1.5 font-['Press_Start_2P'] text-[9px] text-text-secondary
                       hover:text-white hover:bg-surface-lighter hover:border-white transition-all duration-75 shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer uppercase no-underline"
                    >
                        <HiOutlineArrowRightOnRectangle className="h-3 w-3" />
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-8 w-8 items-center justify-center rounded-none border-2 border-white bg-surface text-text-secondary
                       hover:text-white hover:bg-surface-lighter transition-all duration-75 shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
                    >
                        {mobileOpen ? <HiOutlineXMark className="h-4.5 w-4.5" /> : <HiOutlineBars3 className="h-4.5 w-4.5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`
          overflow-hidden bg-surface border-4 border-white transition-all duration-200 ease-in-out md:hidden mx-4 mt-2 mb-4 shadow-[6px_6px_0px_0px_#000]
          ${mobileOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
            >
                <div className="p-3 space-y-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = activeLink === link.href;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveLink(link.href);
                                    setMobileOpen(false);
                                }}
                                className={`
                  flex items-center gap-3 rounded-none border-2 px-3 py-2.5 text-[9px] font-['Press_Start_2P'] no-underline transition-all duration-75 uppercase
                  ${isActive
                                        ? 'bg-primary text-white border-white shadow-[2px_2px_0px_0px_#000]'
                                        : 'bg-surface-light text-text-secondary border-transparent hover:text-white hover:bg-surface-lighter'
                                    }
                `}
                            >
                                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                    <div className="border-t-2 border-white pt-2 mt-2">
                        <button
                            onClick={() => console.log('logout clicked')}
                            className="flex w-full items-center gap-3 rounded-none border-2 border-transparent px-3 py-2 text-[9px] font-['Press_Start_2P'] text-text-secondary bg-transparent text-left
                         hover:bg-surface-lighter hover:text-white transition-all duration-75 cursor-pointer uppercase"
                        >
                            <HiOutlineArrowRightOnRectangle className="h-3.5 w-3.5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
