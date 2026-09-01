import React, { useState, useEffect } from 'react';
import {
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineArrowRight,
    HiOutlineSun,
    HiOutlineMoon,
} from 'react-icons/hi2';

const centerLinks = [

    { name: 'Services', href: '/services' }
    
];

export const Navbar = ({ activeLink, setActiveLink, isLoggedIn, onLogout }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <nav className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur border-b border-border text-text-primary select-none">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); setActiveLink?.('/'); }}
                    className="font-['Dancing_Script'] cursive text-2xl font-bold text-text-primary no-underline"
                >
                    Document-Intelligence-System
                </a>

                {/* Center: Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {centerLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); setActiveLink?.(link.href); }}
                            className={`text-sm font-medium no-underline transition-colors duration-150 cursor-pointer
                                ${activeLink === link.href ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right: Theme + CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center h-9 w-9 rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                        {theme === 'dark'
                            ? <HiOutlineMoon className="h-5 w-5 text-indigo-400" />
                            : <HiOutlineSun className="h-5 w-5 text-amber-400" />}
                    </button>

                    {isLoggedIn ? (
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => setActiveLink?.('/login')}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer"
                        >
                            Get Started <HiOutlineArrowRight className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Mobile: Theme + Hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <button onClick={toggleTheme} className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary cursor-pointer">
                        {theme === 'dark' ? <HiOutlineMoon className="h-4 w-4 text-indigo-400" /> : <HiOutlineSun className="h-4 w-4 text-amber-400" />}
                    </button>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-8 w-8 items-center justify-center text-text-secondary cursor-pointer">
                        {mobileOpen ? <HiOutlineXMark className="h-5 w-5" /> : <HiOutlineBars3 className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-200 ${mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="px-4 pb-4 flex flex-col gap-2 border-t border-border">
                    {centerLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); setActiveLink?.(link.href); setMobileOpen(false); }}
                            className="text-sm text-text-secondary hover:text-text-primary py-2 no-underline cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                    {isLoggedIn ? (
                        <button onClick={() => { onLogout?.(); setMobileOpen(false); }} className="mt-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold cursor-pointer">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => { setActiveLink?.('/login'); setMobileOpen(false); }} className="mt-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold flex items-center gap-2 cursor-pointer">
                            Get Started <HiOutlineArrowRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
