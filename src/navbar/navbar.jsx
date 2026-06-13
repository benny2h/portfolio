import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import logo from '../assets/logo.png';

function Navbar({ scrollTo, activeSection }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const links = ['hero', 'about', 'leistungen', 'projects'];
    const labels = { hero: 'Start', about: 'Über mich', leistungen: 'Leistungen', projects: 'Projekte' };

    const handleNavClick = (id) => {
        scrollTo(id);
        setMenuOpen(false);
    };

    return (
        <nav className="fixed inset-x-0 top-0 z-[1000] border-b border-cyan-500/10 bg-[#080b0f]/90 font-syne backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-10 sm:py-5">
                <div
                    onClick={() => handleNavClick('hero')}
                    className="flex shrink-0 cursor-pointer items-center gap-2.5"
                >
                    <img src={logo} alt="Webs by Benny" className="h-8 w-auto object-contain sm:h-11" />
                    <span className="text-base font-extrabold tracking-tight text-white sm:text-2xl">
                        webs by benny<span className="text-accent">.</span>
                    </span>
                </div>

                {/* Desktop nav */}
                <ul className="hidden list-none items-center gap-6 sm:flex lg:gap-8">
                    {links.map((id) => (
                        <li key={id}>
                            <button
                                onClick={() => handleNavClick(id)}
                                className={`relative whitespace-nowrap px-1 py-2 font-syne text-sm font-semibold tracking-wide transition-all duration-200 ${
                                    activeSection === id
                                        ? '-translate-y-px text-accent [text-shadow:0_0_12px_rgba(6,182,212,0.5)]'
                                        : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                            >
                                {labels[id]}
                                <span
                                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-200 ${
                                        activeSection === id ? 'scale-x-100' : ''
                                    }`}
                                />
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
                    aria-expanded={menuOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors duration-200 hover:border-accent hover:text-accent sm:hidden"
                >
                    {menuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`overflow-hidden border-t border-cyan-500/10 transition-all duration-300 ease-out sm:hidden ${
                    menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex list-none flex-col px-4 py-2">
                    {links.map((id) => (
                        <li key={id}>
                            <button
                                onClick={() => handleNavClick(id)}
                                className={`w-full rounded-lg px-3 py-3 text-left font-syne text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                    activeSection === id
                                        ? 'bg-cyan-500/[0.08] text-accent'
                                        : 'text-neutral-400 hover:bg-white/[0.03] hover:text-neutral-200'
                                }`}
                            >
                                {labels[id]}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;