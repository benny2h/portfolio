import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import { FaChevronDown } from "react-icons/fa";
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
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 py-24 font-syne sm:px-12 lg:px-20"
        >
            {/* light-blue glow top-right */}
            <div className="pointer-events-none absolute -right-28 -top-28 z-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(159,194,232,0.12)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            {/* light-blue glow bottom-left */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(159,194,232,0.08)_0%,transparent_70%)] sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]" />

            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
                {/* TEXT */}
                <div className="flex flex-col items-center text-center lg:col-start-1">
                    <p className="m-0 mb-3 font-inter text-lg font-semibold text-neutral-500 sm:mb-5 sm:text-2xl">
                        <RevealLine inView={inView} delay={0}>Hallo, mein Name ist</RevealLine>
                    </p>
                    <h1 className="m-0 text-[40px] font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl">
                        <RevealLine inView={inView} delay={120}>Benny</RevealLine>
                        <RevealLine inView={inView} delay={240}><span className="bg-gradient-to-r from-blue-300 via-accent to-blue-600 bg-clip-text text-transparent">Herdt</span></RevealLine>
                    </h1>
                </div>

                {/* FOTO, vollständig, nicht beschnitten, wirklich mittig */}
                <div className="relative mt-4 flex w-full max-w-[280px] translate-y-4 items-center justify-self-center lg:col-start-2 lg:mt-0 lg:w-auto lg:max-w-none lg:h-[78vh] lg:translate-y-10">
                    <div className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(159,194,232,0.18)_0%,transparent_70%)] blur-3xl" />
                    <img
                        src={bennyImg}
                        alt="Benny Herdt"
                        className="h-auto max-h-[55vh] w-full object-contain [filter:contrast(1.02)_brightness(1.02)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] lg:h-full lg:max-h-none lg:w-auto"
                    />
                </div>

                {/* dynamisches Rollen-Feld, rechts neben dem Bild */}
                <div className="flex w-full items-center justify-center lg:col-start-3 lg:justify-center">
                    <div className="inline-flex items-center rounded-lg border-2 border-blue-500/40 bg-blue-500/[0.12] px-4 py-2.5">
                        <span className="inline-block overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[2px] text-blue-100 sm:text-lg">
                            {displayed}
                            <span className="ml-1 inline-block h-[1em] w-0.5 animate-blink bg-accent align-middle" />
                        </span>
                    </div>
                </div>
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[3px] text-neutral-600">Scroll</span>
                <FaChevronDown className="animate-bounce text-sm text-blue-500/60" />
            </div>
        </section>
    );
}

export default Hero;
