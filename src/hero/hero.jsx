import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import { FaChevronDown } from "react-icons/fa";
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
            className="relative flex min-h-screen flex-col items-end justify-center overflow-hidden px-5 py-24 font-syne sm:px-12 lg:px-20"
        >
            {/* darkens the video so text stays legible */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />

            <div className="relative z-10 flex flex-col items-end gap-3 text-right">
                <h1 className="m-0 text-[15vw] font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl">
                    <RevealLine inView={inView} delay={0}>Benny</RevealLine>
                    <RevealLine inView={inView} delay={120}><span className="bg-gradient-to-r from-amber-300 via-accent to-amber-600 bg-clip-text text-transparent">Herdt</span></RevealLine>
                </h1>

                <div
                    className="inline-flex items-center rounded-lg border-2 border-amber-500/40 bg-amber-500/[0.12] px-4 py-2.5 transition-[opacity,transform] duration-700 ease-out"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(12px)',
                        transitionDelay: '280ms',
                    }}
                >
                    <span className="inline-block overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[2px] text-amber-100 sm:text-lg">
                        {displayed}
                        <span className="ml-1 inline-block h-[1em] w-0.5 animate-blink bg-accent align-middle" />
                    </span>
                </div>
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[3px] text-neutral-400">Scroll</span>
                <FaChevronDown className="animate-bounce text-sm text-amber-500/60" />
            </div>
        </section>
    );
}

export default Hero;
