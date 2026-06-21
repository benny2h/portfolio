import { useEffect, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import logo from '../assets/logo.png';

const FLIGHT_DISTANCE = 260; // px of scroll over which the logo docks into the navbar
const DOCK_THRESHOLD = 0.15;

function Navbar({ scrollTo, activeSection }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pageProgress, setPageProgress] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    const leftLinks = ['hero', 'about'];
    const rightLinks = ['leistungen', 'projects'];
    const labels = { hero: 'Start', about: 'Über mich', leistungen: 'Leistungen', projects: 'Projekte' };

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
    }, []);

    useEffect(() => {
        if (reducedMotion) {
            setProgress(1);
        }
    }, [reducedMotion]);

    useEffect(() => {
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                if (!reducedMotion) {
                    setProgress(Math.min(1, Math.max(0, window.scrollY / FLIGHT_DISTANCE)));
                }
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                setPageProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
                raf = null;
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [reducedMotion]);

    const docked = progress > DOCK_THRESHOLD;
    const logoY = 56 - progress * 42;
    const logoScale = 1.9 - progress * 0.9;

    const handleNavClick = (id) => {
        scrollTo(id);
        setMenuOpen(false);
    };

    const renderLink = (id) => (
        <li key={id}>
            <button
                onClick={() => handleNavClick(id)}
                className={`relative whitespace-nowrap px-1 py-2 font-syne text-base font-semibold tracking-wide transition-all duration-200 ${
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
    );

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-[1000] font-syne transition-all duration-300 ${
                docked
                    ? 'border-b border-cyan-500/10 bg-[#080b0f]/90 backdrop-blur-md'
                    : 'border-b border-transparent bg-transparent'
            }`}
        >
            <div className="relative flex items-center justify-between px-4 py-3.5 sm:px-10 sm:py-5">
                {/* mobile logo, always docked */}
                <div
                    onClick={() => handleNavClick('hero')}
                    className="flex shrink-0 cursor-pointer items-center gap-2.5 sm:hidden"
                >
                    <img src={logo} alt="Webs by Benny" className="h-9 w-auto object-contain" />
                    <span className="text-lg font-extrabold tracking-tight text-white">
                        webs by benny<span className="text-accent">.</span>
                    </span>
                </div>

                {/* desktop nav, grouped tightly around the logo */}
                <div className="hidden flex-1 items-center justify-center gap-10 sm:flex lg:gap-14">
                    <ul className="flex list-none items-center gap-8 lg:gap-10">
                        {leftLinks.map(renderLink)}
                    </ul>
                    <span className="w-16 shrink-0 lg:w-20" aria-hidden="true" />
                    <ul className="flex list-none items-center gap-8 lg:gap-10">
                        {rightLinks.map(renderLink)}
                    </ul>
                </div>

                {/* mobile menu toggle */}
                <button
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
                    aria-expanded={menuOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors duration-200 hover:border-accent hover:text-accent sm:hidden"
                >
                    {menuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
                </button>

                {/* desktop logo, flies from the hero into the docked center slot on scroll */}
                <div
                    className="pointer-events-none absolute left-1/2 top-0 hidden sm:block"
                    style={{ transform: `translate(-50%, ${logoY}px) scale(${logoScale})` }}
                >
                    <img
                        src={logo}
                        alt="Webs by Benny"
                        onClick={() => handleNavClick('hero')}
                        className="pointer-events-auto h-14 w-auto cursor-pointer object-contain drop-shadow-[0_4px_20px_rgba(6,182,212,0.25)]"
                    />
                </div>
            </div>

            {/* scroll progress, shows position within the whole page */}
            <div className="h-0.5 w-full bg-white/5">
                <div
                    className="h-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-[width] duration-150 ease-out"
                    style={{ width: `${pageProgress * 100}%` }}
                />
            </div>

            {/* Mobile dropdown */}
            <div
                className={`overflow-hidden border-t border-cyan-500/10 bg-[#080b0f]/95 backdrop-blur-md transition-all duration-300 ease-out sm:hidden ${
                    menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex list-none flex-col px-4 py-2">
                    {[...leftLinks, ...rightLinks].map((id) => (
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
