import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';
import RevealLine from '../components/revealLine';
import logo from '../assets/logo.png';

/* gemeinsamer Browser-/App-Fensterrahmen, füllt die obere Kartenhälfte komplett aus */
function PreviewFrame({ label, children }) {
    return (
        <div className="flex h-full w-full flex-col bg-slate-950 font-mono">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 truncate text-[9px] uppercase tracking-wider text-cyan-400">{label}</span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
                {children}
            </div>
        </div>
    );
}

/* Mini-Vorschau im Sport-Scorings-Look (slate-950 + Cyan-Akzente, Mono-Font) */
function SportScoringsPreview() {
    const rows = [
        { team: 'FC Bayern',     pts: 64, accent: 'bg-cyan-400' },
        { team: 'Bayer 04',      pts: 58, accent: 'bg-cyan-400' },
        { team: 'RB Leipzig',    pts: 51, accent: 'bg-slate-600' },
    ];
    return (
        <PreviewFrame label="Bundesliga · Tabelle">
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
        </PreviewFrame>
    );
}

/* Mini-Vorschau: Chat-Verlauf mit tippenden Punkten */
function ChatBotPreview() {
    return (
        <PreviewFrame label="KI Chat">
            <div className="flex flex-col gap-2 px-3 py-3">
                <div className="max-w-[80%] self-start rounded-lg rounded-bl-none bg-slate-800 px-2.5 py-1.5 text-[10px] text-slate-300">
                    Wie kann ich dir helfen?
                </div>
                <div className="max-w-[80%] self-end rounded-lg rounded-br-none bg-cyan-500/20 px-2.5 py-1.5 text-[10px] text-cyan-100">
                    Erkläre mir React Hooks.
                </div>
                <div className="flex items-center gap-1 self-start px-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 [animation-delay:300ms]" />
                </div>
            </div>
        </PreviewFrame>
    );
}

/* Mini-Vorschau: Login-Session mit rollenbasierten Berechtigungen */
function AuthRolesPreview() {
    const roles = [
        { name: 'Admin', access: 'Vollzugriff', color: 'bg-cyan-400' },
        { name: 'Trainer', access: 'Team verwalten', color: 'bg-emerald-400' },
        { name: 'Spieler', access: 'Nur Ansicht', color: 'bg-slate-600' },
    ];
    return (
        <PreviewFrame label="Auth · Rollen">
            <div className="flex flex-col gap-2 px-3 py-3">
                {roles.map((r) => (
                    <div key={r.name} className="flex items-center gap-2.5 text-[10px]">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${r.color}`} />
                        <span className="w-14 truncate font-semibold text-slate-300">{r.name}</span>
                        <span className="flex-1 truncate text-slate-500">{r.access}</span>
                    </div>
                ))}
                <div className="mt-1 flex items-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-500/[0.06] px-2 py-1.5 text-[9px] text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Eingeloggt als Trainer
                </div>
            </div>
        </PreviewFrame>
    );
}

/* Mini-Vorschau: Budget-Kategorien als Balken */
function FinanceTrackerPreview() {
    const categories = [
        { name: 'Miete', value: 65, color: 'bg-cyan-400' },
        { name: 'Sparen', value: 40, color: 'bg-emerald-400' },
        { name: 'Freizeit', value: 25, color: 'bg-amber-400' },
    ];
    return (
        <PreviewFrame label="Budget · Juni">
            <div className="flex flex-col gap-2 px-3 py-3">
                {categories.map((c) => (
                    <div key={c.name} className="flex items-center gap-2 text-[10px]">
                        <span className="w-14 truncate text-slate-400">{c.name}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                            <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.value}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </PreviewFrame>
    );
}

function Projects() {
    const [ref, inView] = useInView();
    const [hasEntered, setHasEntered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!inView) return;
        const timer = setTimeout(() => setHasEntered(true), 1100);
        return () => clearTimeout(timer);
    }, [inView]);

    const project = [
        {
            title: 'Sport Scorings',
            desc: 'Live-Tabellen, Spieltage und Ergebnisse mit OpenLigaDB API.',
            route: '/sportScorings',
            preview: <SportScoringsPreview />,
        },
        {
            title: 'Eigener KI Chatbot',
            desc: 'Gemini-basierter Chatbot mit eigener UI und Kontextsystem.',
            route: '/chatBot',
            preview: <ChatBotPreview />,
        },
        {
            title: 'Auth & Rollen-System',
            desc: 'Login mit JWT-Auth und rollenbasierten Berechtigungen für Admins, Trainer und Spieler.',
            route: '/auth-rollen-system',
            preview: <AuthRolesPreview />,
        },
        {
            title: 'Finanz Tracker',
            desc: 'Übersichtliches Dashboard zur Verwaltung von Ausgaben, Budgets und Sparzielen.',
            route: '/finance-tracker',
            preview: <FinanceTrackerPreview />,
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
                    <RevealLine inView={inView} delay={0}>Portfolio</RevealLine>
                </p>
                <h2 className="m-0 mb-12 text-3xl font-extrabold leading-none tracking-tight text-white sm:mb-[72px] sm:text-5xl">
                    <RevealLine inView={inView} delay={120}>Projekte</RevealLine>
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-5">
                    {/* Webs by Benny / lokales Webdesign */}
                    <a
                        href="https://websbybenny.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#0e1117] text-center no-underline transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-500/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:col-span-2"
                        style={!hasEntered ? {
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0s',
                        } : undefined}
                    >
                        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[#0b0e13] sm:h-52">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_60%)]" />
                            <img src={logo} alt="Webs by Benny" className="relative h-24 w-24 object-contain sm:h-28 sm:w-28" />
                        </div>

                        <div className="relative flex flex-1 flex-col items-center p-7 sm:p-8">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.10),transparent_55%)]" />

                            <p className="relative m-0 mb-2 font-inter text-[10px] font-bold uppercase tracking-[1.5px] text-accent">
                                Webdesign
                            </p>
                            <h3 className="relative m-0 mb-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                                Webs by Benny
                            </h3>
                            <p className="relative m-0 mb-6 max-w-[360px] font-inter text-sm leading-[1.7] text-neutral-500">
                                Moderne und schnelle Websites für lokale Unternehmen.
                            </p>

                            <span className="relative mt-auto inline-flex items-center gap-2 font-inter text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                websbybenny.de ansehen →
                            </span>
                        </div>
                    </a>

                    {/* Eigene Projekte */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:col-span-3">
                        {project.map((projekt, i) => (
                            <div
                                key={projekt.title}
                                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#0e1117] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-500/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                                style={!hasEntered ? {
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 0.12}s`,
                                } : undefined}
                                onClick={() => navigate(projekt.route)}
                            >
                                <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.08] sm:h-52">
                                    {projekt.preview}
                                </div>

                                <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                                    <h3 className="relative m-0 mb-2.5 text-base font-bold leading-tight text-white sm:text-lg">
                                        {projekt.title}
                                    </h3>

                                    <p className="relative m-0 mb-6 font-inter text-sm leading-[1.7] text-neutral-500">
                                        {projekt.desc}
                                    </p>

                                    <div className="relative mt-auto flex items-center gap-2 font-inter text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                        Projekt ansehen →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;
