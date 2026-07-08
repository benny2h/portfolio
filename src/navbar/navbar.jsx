import { useEffect, useState } from 'react';

const ACTIVE_SECTION_OFFSET_RATIO = 0.35;

const navItems = [
    { label: 'Start', id: 'hero' },
    { label: 'Über mich', id: 'about' },
    { label: 'Projekte', id: 'projects' },
    { label: 'Kontakt', id: 'kontakt' },
];

const glassStyle = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(40px) saturate(160%)',
    WebkitBackdropFilter: 'blur(40px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.10),
    0 8px 32px rgba(0, 0, 0, 0.20)
  `,
};

function Navbar({ scrollTo }) {
    const [mounted, setMounted] = useState(false);
    const [pageProgress, setPageProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                setPageProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);

                const offset = window.innerHeight * ACTIVE_SECTION_OFFSET_RATIO;
                let current = navItems[0].id;
                for (const item of navItems) {
                    const el = document.getElementById(item.id);
                    if (el && el.getBoundingClientRect().top <= offset) {
                        current = item.id;
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
    }, []);

    const navEntranceStyle = {
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-16px)',
        transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
    };

    return (
        <nav className="fixed left-1/2 top-5 z-50 w-auto whitespace-nowrap font-syne" style={navEntranceStyle}>
            <div className="relative flex flex-col overflow-hidden rounded-[2rem]" style={glassStyle}>

                {/* Specular top-edge gloss */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 75%, transparent 100%)' }}
                />

                <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-1 px-2 py-2 sm:gap-1.5 sm:px-3">
                    {navItems.map((item) => {
                        const active = activeSection === item.id;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollTo(item.id)}
                                    className="rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-[color,background,transform] duration-200 ease-out active:scale-[0.95] sm:px-4 sm:text-sm"
                                    style={{
                                        color: active ? '#F2F2F0' : 'rgba(255,255,255,0.45)',
                                        background: active
                                            ? 'linear-gradient(135deg, rgba(242,242,240,0.12), rgba(242,242,240,0.06))'
                                            : 'transparent',
                                    }}
                                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* scroll progress, shows position within the whole page */}
                <div className="h-0.5 w-full bg-white/5">
                    <div
                        className="h-full bg-accent shadow-[0_0_8px_rgba(230,165,88,0.6)] transition-[width] duration-150 ease-out"
                        style={{ width: `${pageProgress * 100}%` }}
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
