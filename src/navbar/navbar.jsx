import { useEffect, useState } from 'react';

const FLIGHT_DISTANCE = 260;
const DOCK_THRESHOLD = 0.15;
const ACTIVE_SECTION_OFFSET_RATIO = 0.35;

const allLinks = ['hero', 'about', 'projects', 'kontakt'];
const labels = { hero: 'Start', about: 'Über mich', projects: 'Projekte', kontakt: 'Kontakt' };

function Navbar({ scrollTo }) {
    const [progress, setProgress] = useState(0);
    const [pageProgress, setPageProgress] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

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

                const offset = window.innerHeight * ACTIVE_SECTION_OFFSET_RATIO;
                let current = allLinks[0];
                for (const id of allLinks) {
                    const el = document.getElementById(id);
                    if (el && el.getBoundingClientRect().top <= offset) {
                        current = id;
                    }
                }
                setActiveSection(current);

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

    const handleNavClick = (id) => {
        scrollTo(id);
    };

    const renderLink = (id) => (
        <li key={id}>
            <button
                onClick={() => handleNavClick(id)}
                className={`whitespace-nowrap px-1 py-2 font-syne text-xs font-semibold tracking-wide transition-all duration-200 sm:text-base ${
                    activeSection === id
                        ? '-translate-y-px text-accent [text-shadow:0_0_12px_rgba(159,194,232,0.5)]'
                        : 'text-neutral-500 hover:text-neutral-300'
                }`}
            >
                {labels[id]}
            </button>
        </li>
    );

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-[1000] font-syne transition-all duration-300 ${
                docked
                    ? 'bg-[#000000]/90 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="flex items-center justify-center px-4 py-3.5 sm:px-10 sm:py-5">
                <ul className="flex flex-wrap list-none items-center justify-center gap-3 gap-y-1 sm:gap-8 lg:gap-10">
                    {allLinks.map(renderLink)}
                </ul>
            </div>

            {/* scroll progress, shows position within the whole page */}
            <div className="h-0.5 w-full bg-white/5">
                <div
                    className="h-full bg-accent shadow-[0_0_8px_rgba(159,194,232,0.6)] transition-[width] duration-150 ease-out"
                    style={{ width: `${pageProgress * 100}%` }}
                />
            </div>
        </nav>
    );
}

export default Navbar;
