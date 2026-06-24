import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import bennyImg from "../assets/benny.png";
import RevealLine from "../components/revealLine";

const roles = ["Entwickler", "Webdesigner", "Student"];

function Hero() {
    const [ref, inView] = useInView();
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout;
        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative flex min-h-screen overflow-hidden font-syne"
        >
            {/* dot-grid texture */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_100%)]" />

            {/* cyan glow top-right */}
            <div className="pointer-events-none absolute -right-28 -top-28 z-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            {/* cyan glow bottom-left */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]" />

            <div className="relative z-10 box-border flex max-w-full flex-1 flex-col items-start justify-center px-5 pb-16 pt-16 sm:px-12 sm:pb-24 sm:pt-36 lg:max-w-[62%] lg:px-20 lg:pt-40">
                <p className="m-0 mb-1.5 font-inter text-sm font-medium text-neutral-500 sm:mb-3">
                    <RevealLine inView={inView} delay={0}>Hey, mein Name ist</RevealLine>
                </p>
                <div className="mb-2.5 flex w-full items-center justify-between gap-4 sm:mb-4 lg:block">
                    <h1 className="text-[40px] font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                        <RevealLine inView={inView} delay={120}>Benny</RevealLine>
                        <RevealLine inView={inView} delay={240}><span className="bg-gradient-to-r from-cyan-300 via-accent to-blue-400 bg-clip-text text-transparent">Herdt</span></RevealLine>
                    </h1>

                    {/* PHOTO — mobile/tablet, next to the name */}
                    <div className="relative h-24 w-16 shrink-0 sm:h-32 sm:w-32 lg:hidden">
                        <div className="absolute inset-[-35%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_70%)] blur-2xl sm:blur-3xl" />
                        <div className="h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                            <img
                                src={bennyImg}
                                alt="Benny Herdt"
                                className="h-full w-full scale-90 object-cover object-[110%_-10%] [mask-image:linear-gradient(to_top,transparent_0%,black_18%)] [filter:contrast(1.02)_brightness(1.02)]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5 inline-flex items-center self-start rounded-lg border-2 border-cyan-500/40 bg-cyan-500/[0.12] px-4 py-2.5 sm:mb-12">
                    <span className="inline-block overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[2px] text-cyan-100 sm:text-lg">
                        Ich bin {displayed}
                        <span className="ml-1 inline-block h-[1em] w-0.5 animate-blink bg-accent align-middle" />
                    </span>
                </div>

                <p className="m-0 mb-2 font-inter text-xs font-semibold uppercase tracking-[2px] text-neutral-600 sm:mb-3.5 sm:text-xs">Kontaktiere mich</p>
                <div className="flex w-full flex-row gap-2 sm:w-auto sm:flex-wrap sm:gap-4">
                    <a
                        href="mailto:herdtbenny@gmail.com"
                        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 font-inter text-xs font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:flex-none sm:justify-start sm:px-7 sm:py-4 sm:text-sm"
                    >
                        <span className="text-center text-base sm:text-xl">@</span>
                        E-Mail
                    </a>
                    <a
                        href="https://github.com/benny2h"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 font-inter text-xs font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:flex-none sm:justify-start sm:px-7 sm:py-4 sm:text-sm"
                    >
                        <FaGithub className="text-base sm:text-xl" />
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/benny-herdt"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 font-inter text-xs font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:flex-none sm:justify-start sm:px-7 sm:py-4 sm:text-sm"
                    >
                        <FaLinkedin className="text-base sm:text-xl" />
                        LinkedIn
                    </a>
                </div>
            </div>

            <div className="absolute bottom-0 left-[80%] z-20 hidden h-[85%] -translate-x-1/2 items-end lg:flex">
                <div className="absolute inset-x-[-15%] bottom-0 top-[10%] -z-10 rounded-[50%] bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)] blur-3xl" />
                <img
                    src={bennyImg}
                    alt="Benny Herdt"
                    className="block h-full w-auto max-w-[420px] object-cover object-top [mask-image:linear-gradient(to_top,transparent_0%,black_18%)] [filter:contrast(1.02)_brightness(1.02)]"
                />
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[3px] text-neutral-600">Scroll</span>
                <FaChevronDown className="animate-bounce text-sm text-cyan-500/60" />
            </div>
        </section>
    );
}

export default Hero;
