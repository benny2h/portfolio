import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';
import RevealLine from '../components/revealLine';

/* Mini-Vorschau im Sport-Scorings-Look (slate-950 + Cyan-Akzente, Mono-Font) */
function SportScoringsPreview() {
    const rows = [
        { team: 'FC Bayern',     pts: 64, accent: 'bg-cyan-400' },
        { team: 'Bayer 04',      pts: 58, accent: 'bg-cyan-400' },
        { team: 'RB Leipzig',    pts: 51, accent: 'bg-slate-600' },
    ];
    return (
        <div className="w-full max-w-[230px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 font-mono shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-[9px] uppercase tracking-wider text-cyan-400">Bundesliga · Tabelle</span>
            </div>
            <div className="flex flex-col">
                {rows.map((r, i) => (
                    <div key={r.team} className={`flex items-center gap-2.5 border-l-2 px-3 py-1.5 text-[10px] ${i === 0 ? 'border-l-cyan-400' : 'border-l-transparent'} ${i % 2 === 1 ? 'bg-cyan-400/[0.03]' : ''}`}>
                        <span className="w-3 text-slate-500">{i + 1}</span>
                        <span className={`h-2 w-2 shrink-0 rounded-full ${r.accent}`} />
                        <span className="flex-1 truncate text-slate-300">{r.team}</span>
                        <span className="font-semibold text-cyan-400">{r.pts}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Projects({ setActiveSection }) {
    const [ref, inView] = useInView();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (inView) {
            setActiveSection('projects');
        }
    }, [inView, setActiveSection]);

    const project = [
        {
            title: 'Sport Scorings',
            desc: 'Live-Tabellen, Spieltage und Ergebnisse mit OpenLigaDB API.',
            route: '/sportScorings',
            emoji: '🏟️',
            preview: <SportScoringsPreview />,
            disabled: false,
        },
        {
            title: 'Eigener KI Chatbot',
            desc: 'Gemini-basierter Chatbot mit eigener UI und Kontextsystem.',
            route: '/chatbot',
            emoji: '🤖',
            disabled: true,
        },
        {
            title: 'Spotify DNA Visualizer',
            desc: 'Genre-Netzwerke, Audio Features und interaktive Mood-Analysen.',
            route: '/spotify-dna-visualizer',
            emoji: '🧬',
            disabled: true,
        },
    ];

    return (
        <section
            id="projects"
            ref={ref}
            className="relative box-border min-h-screen overflow-hidden bg-[#12171e] px-5 pb-16 pt-28 font-syne sm:px-12 sm:pb-24 sm:pt-32 lg:px-20 lg:pt-36"
        >
            <div className="pointer-events-none absolute -right-28 -top-36 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            <div
                className="relative mx-auto w-full max-w-[1200px] transition-all duration-700 ease-out"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                }}
            >
                <p className="m-0 mb-3.5 font-inter text-xs font-semibold uppercase tracking-[3px] text-accent">
                    <RevealLine inView={inView} delay={0}>Eigene Projekte</RevealLine>
                </p>
                <h2 className="m-0 mb-4 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
                    <RevealLine inView={inView} delay={120}>Projekte</RevealLine>
                </h2>
                <p className="m-0 mb-12 max-w-[560px] font-inter text-sm leading-[1.7] text-neutral-500 sm:mb-[72px] sm:text-base">Neue Ideen und Technologien</p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
                    {project.map((projekt, i) => {
                        const isHovered = hoveredIndex === i;
                        const isActive = !projekt.disabled;

                        return (
                            <div
                                key={projekt.title}
                                className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-[26px] border bg-[#0e1117] p-7 transition-all duration-300 ease-out sm:p-8 ${
                                    isActive
                                        ? 'border-white/[0.06] hover:border-cyan-500/35 hover:bg-cyan-500/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]'
                                        : 'border-white/[0.06] opacity-55 grayscale-[0.2]'
                                }`}
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView
                                        ? isHovered && isActive
                                            ? 'translateY(-6px)'
                                            : 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                                    cursor: isActive ? 'pointer' : 'default',
                                }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => {
                                    if (isActive) navigate(projekt.route);
                                }}
                            >
                                {isActive && (
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                )}

                                <div className="relative mb-7 flex items-start justify-between gap-4">
                                    {projekt.preview ?? (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-3xl">
                                            {projekt.emoji}
                                        </div>
                                    )}

                                    {projekt.disabled && (
                                        <span className="shrink-0 rounded-full border border-cyan-500/[0.18] bg-cyan-500/[0.08] px-3 py-1.5 font-inter text-[10px] font-bold uppercase tracking-[1.5px] text-accent">
                                            In Entwicklung
                                        </span>
                                    )}
                                </div>

                                <h3 className="relative m-0 mb-3 text-lg font-bold leading-tight text-white sm:text-xl">
                                    {projekt.title}
                                </h3>

                                <p className="relative m-0 mb-7 font-inter text-sm leading-[1.7] text-neutral-500">
                                    {projekt.desc}
                                </p>

                                <div
                                    className={`relative mt-auto flex items-center gap-2 font-inter text-sm font-semibold text-accent transition-transform duration-300 ${
                                        isActive ? 'group-hover:translate-x-1' : ''
                                    }`}
                                >
                                    {projekt.disabled ? 'Coming soon' : 'Projekt ansehen →'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Projects;
