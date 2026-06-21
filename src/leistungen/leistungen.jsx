import { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';
import { FaPalette, FaMobileAlt, FaSearch, FaHeadset } from 'react-icons/fa';
import RevealLine from '../components/revealLine';

function DemoPreview({ src, alt, emoji }) {
    const [broken, setBroken] = useState(false);

    if (broken) {
        return (
            <div className="flex aspect-video w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_60%)] text-4xl">
                {emoji}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setBroken(true)}
            className="aspect-video w-full object-cover object-top"
        />
    );
}

function Leistungen({ setActiveSection }) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) setActiveSection('leistungen');
    }, [inView, setActiveSection]);

    const services = [
        {
            icon: <FaPalette />,
            title: 'Individuelles Webdesign',
            desc: 'Modernes, professionelles Design, das zu deinem Unternehmen und deiner Marke passt.',
        },
        {
            icon: <FaMobileAlt />,
            title: 'Responsive auf jedem Gerät',
            desc: 'Optimale Darstellung auf Smartphone, Tablet und Desktop – für jeden Besucher.',
        },
        {
            icon: <FaSearch />,
            title: 'SEO-Grundlagen inklusive',
            desc: 'Technisch saubere Umsetzung, damit dein Unternehmen bei Google lokal gefunden wird.',
        },
        {
            icon: <FaHeadset />,
            title: 'Betreuung & Hosting',
            desc: 'Von der Domain bis zum laufenden Support – alles aus einer Hand.',
        },
    ];

    const demos = [
        {
            title: 'Gasthof / Restaurant',
            desc: 'Moderne Demo-Website für ein traditionelles Restaurant – Speisekarte, Öffnungszeiten und Reservierung auf einen Blick.',
            url: 'https://adlersberg.websbybenny.de',
            image: '/referenzen/gasthof.jpg',
            emoji: '🍽️',
        },
        {
            title: 'Arztpraxis',
            desc: 'Übersichtlicher Web-Auftritt für eine Arztpraxis mit Leistungsspektrum, Team und Terminvereinbarung.',
            url: 'https://praxis-schabl.websbybenny.de',
            image: '/referenzen/praxis.jpg',
            emoji: '🩺',
        },
    ];

    return (
        <section
            id="leistungen"
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
                    <RevealLine inView={inView} delay={0}>Mein Angebot</RevealLine>
                </p>

                <h2 className="m-0 mb-4 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
                    <RevealLine inView={inView} delay={120}>Leistungen</RevealLine>
                </h2>

                <p className="m-0 mb-12 max-w-[560px] font-inter text-sm leading-[1.7] text-neutral-500 sm:mb-[72px] sm:text-base">
                    Ich entwickle moderne, schnelle Websites für lokale Unternehmen.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:mb-16 lg:grid-cols-4">
                    {services.map((service, i) => (
                        <div
                            key={service.title}
                            className="flex items-start gap-4 rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-6 transition-colors duration-200 ease-out hover:border-cyan-500/35 hover:bg-cyan-500/[0.03] sm:p-7"
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                            }}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-base text-accent">
                                {service.icon}
                            </div>
                            <div>
                                <h3 className="m-0 mb-1.5 text-sm font-bold leading-tight text-white sm:text-base">{service.title}</h3>
                                <p className="m-0 font-inter text-xs leading-[1.6] text-neutral-500">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-12 flex flex-col items-start gap-5 rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mb-16">
                    <div>
                        <h3 className="m-0 mb-1.5 text-base font-bold leading-tight text-white sm:text-lg">Kostenlose Demo-Website</h3>
                        <p className="m-0 max-w-[460px] font-inter text-xs leading-[1.6] text-neutral-500 sm:text-sm">
                            Du hast ein lokales Unternehmen und möchtest sehen, wie deine neue Website aussehen könnte? Ich erstelle dir eine unverbindliche Demo – ganz ohne Risiko.
                        </p>
                    </div>
                    <a
                        href="mailto:websbybenny@gmail.com?subject=Demo-Website%20f%C3%BCr%20mein%20Unternehmen"
                        className="shrink-0 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-inter text-sm font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent"
                    >
                        Demo anfragen →
                    </a>
                </div>

                <p className="mb-7 font-inter text-[11px] font-semibold uppercase tracking-[3px] text-accent">Demo-Websites</p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7">
                    {demos.map((demo, i) => (
                        <a
                            key={demo.title}
                            href={demo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#0e1117] no-underline transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-500/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                            }}
                        >
                            <div className="relative overflow-hidden">
                                <DemoPreview src={demo.image} alt={demo.title} emoji={demo.emoji} />
                            </div>

                            <div className="flex flex-1 flex-col p-7 sm:p-8">
                                <h3 className="m-0 mb-3 text-lg font-bold leading-tight text-white sm:text-xl">
                                    {demo.title}
                                </h3>
                                <p className="m-0 mb-7 font-inter text-sm leading-[1.7] text-neutral-500">
                                    {demo.desc}
                                </p>
                                <div className="mt-auto flex items-center gap-2 font-inter text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                                    Live Demo ansehen →
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leistungen;
