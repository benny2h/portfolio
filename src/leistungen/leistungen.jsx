import { useEffect } from 'react';
import useInView from '../hooks/useInView';
import { FaPalette, FaMobileAlt, FaSearch, FaHeadset } from 'react-icons/fa';
import logo from '../assets/logo.png';
import RevealLine from '../components/revealLine';

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

    return (
        <section
            id="leistungen"
            ref={ref}
            className="relative box-border min-h-screen overflow-hidden bg-[#12171e] px-5 pb-16 pt-28 font-syne sm:px-12 sm:pb-24 sm:pt-32 lg:px-20 lg:pt-36"
        >
            <div className="pointer-events-none absolute -right-28 -top-36 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            <div
                className="relative mx-auto w-full max-w-[1100px] transition-all duration-700 ease-out"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                }}
            >
                <div className="mb-4 flex items-center gap-4">
                    <img src={logo} alt="Webs by Benny" className="h-14 w-auto object-contain sm:h-20" />
                    <h2 className="m-0 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
                        <RevealLine inView={inView} delay={120}>Leistungen</RevealLine>
                    </h2>
                </div>

                <p className="m-0 mb-12 max-w-[560px] font-inter text-sm leading-[1.7] text-neutral-500 sm:mb-[72px] sm:text-base">
                    Ich entwickle moderne, schnelle Websites für lokale Unternehmen – von der ersten Idee bis zum fertigen Auftritt im Web.
                </p>

                <div className="mb-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    {services.map((service, i) => (
                        <div
                            key={service.title}
                            className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#0e1117] p-6 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-cyan-500/35 hover:bg-cyan-500/[0.03]"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-lg text-accent">
                                {service.icon}
                            </div>
                            <h3 className="m-0 text-base font-bold leading-tight text-white">{service.title}</h3>
                            <p className="m-0 font-inter text-sm leading-[1.7] text-neutral-500">{service.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-start gap-5 rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                    <div>
                        <h3 className="m-0 mb-2 text-lg font-bold leading-tight text-white sm:text-xl">Kostenlose Demo-Website</h3>
                        <p className="m-0 max-w-[460px] font-inter text-sm leading-[1.7] text-neutral-500">
                            Du hast ein lokales Unternehmen und möchtest sehen, wie deine neue Website aussehen könnte? Ich erstelle dir eine unverbindliche Demo – ganz ohne Risiko.
                        </p>
                    </div>
                    <a
                        href="mailto:herdtbenny@gmail.com?subject=Demo-Website%20f%C3%BCr%20mein%20Unternehmen"
                        className="shrink-0 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 font-inter text-sm font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent"
                    >
                        Demo anfragen →
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Leistungen;
