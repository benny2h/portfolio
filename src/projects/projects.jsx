import { useNavigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import useFlipRotation from '../hooks/useFlipRotation';
import RevealLine from '../components/revealLine';
import logo from '../assets/logo.png';

/* Mini-Vorschau im Sport-Scorings-Look */
function SportScoringsThumb() {
    const rows = [
        { team: 'FC Bayern', pts: 64 },
        { team: 'Bayer 04', pts: 58 },
        { team: 'RB Leipzig', pts: 51 },
    ];
    return (
        <div className="flex flex-1 flex-col justify-center bg-slate-950 font-mono">
            {rows.map((r, i) => (
                <div key={r.team} className={`flex items-center gap-2.5 border-l-2 px-3 py-1.5 text-[10px] ${i === 0 ? 'border-l-accent' : 'border-l-transparent'} ${i % 2 === 1 ? 'bg-accent/[0.03]' : ''}`}>
                    <span className="w-3 text-slate-500">{i + 1}</span>
                    <span className="flex-1 truncate text-slate-300">{r.team}</span>
                    <span className="font-semibold text-accent">{r.pts}</span>
                </div>
            ))}
        </div>
    );
}

/* gemeinsame Browser-Fenster-Optik (heller Chrome, echte macOS-Ampelfarben) */
function BrowserWindowCard({ as: Tag = 'div', title, children, className = '', ...rest }) {
    return (
        <Tag
            className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white no-underline ring-1 transition-all duration-300 ease-out hover:-translate-y-1 ${className}`}
            {...rest}
        >
            <div className="flex items-center gap-1.5 border-b border-black/5 bg-neutral-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-1.5 truncate font-inter text-[10px] text-neutral-400">{title}</span>
            </div>
            <div className="flex aspect-video w-full flex-1">{children}</div>
        </Tag>
    );
}

function Projects() {
    const [ref, inView] = useInView();
    const rotation = useFlipRotation('projects');
    const navigate = useNavigate();

    return (
        <section
            id="projects"
            ref={ref}
            className="relative box-border min-h-screen overflow-hidden bg-[#000000] px-5 pb-16 pt-28 font-syne sm:px-12 sm:pb-24 sm:pt-32 lg:px-20 lg:pt-36"
            style={{ perspective: '1600px' }}
        >
            <div className="pointer-events-none absolute -right-28 -top-36 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(159,194,232,0.08)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            <div
                className="[backface-visibility:hidden] [transform-style:preserve-3d]"
                style={{ transform: `rotateY(${rotation}deg)` }}
            >
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

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-9">
                    {/* Webs by Benny — eigene Webagentur, im Fokus */}
                    <div
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s',
                        }}
                    >
                        <BrowserWindowCard
                            as="a"
                            href="https://websbybenny.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="websbybenny.de"
                            className="ring-accent/50 shadow-[0_30px_70px_-20px_rgba(159,194,232,0.5)] hover:ring-accent/80"
                        >
                            <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(159,194,232,0.14),transparent_60%)]">
                                <img src={logo} alt="Webs by Benny" className="h-16 w-16 object-contain" />
                            </div>
                        </BrowserWindowCard>
                        <div className="mt-5">
                            <h3 className="m-0 mb-2 text-lg font-bold leading-tight text-white sm:text-xl">Webs by Benny</h3>
                            <p className="m-0 mb-3 font-inter text-sm leading-[1.7] text-neutral-500">
                                Moderne und schnelle Websites für lokale Unternehmen.
                            </p>
                            <a
                                href="https://websbybenny.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-accent"
                            >
                                websbybenny.de ansehen →
                            </a>
                        </div>
                    </div>

                    {/* Sport Scorings */}
                    <div
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s',
                        }}
                    >
                        <BrowserWindowCard
                            as="div"
                            title="Sport Scorings"
                            className="cursor-pointer ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] hover:ring-accent/40"
                            onClick={() => navigate('/sportScorings')}
                        >
                            <SportScoringsThumb />
                        </BrowserWindowCard>
                        <div className="mt-5">
                            <h3 className="m-0 mb-2 text-lg font-bold leading-tight text-white sm:text-xl">Sport Scorings</h3>
                            <p className="m-0 mb-3 font-inter text-sm leading-[1.7] text-neutral-500">
                                Live-Tabellen, Spieltage und Ergebnisse mit der OpenLigaDB API.
                            </p>
                            <button
                                onClick={() => navigate('/sportScorings')}
                                className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-accent"
                            >
                                Projekt ansehen →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Projects;
