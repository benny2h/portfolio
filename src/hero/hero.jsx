import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import bennyImg from "../assets/benny.png";

const roles = ["Entwickler", "Webdesigner", "Student"];

function Hero({ setActiveSection }) {
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

    useEffect(() => {
        if (inView) setActiveSection("hero");
    }, [inView, setActiveSection]);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative flex min-h-screen overflow-hidden bg-[#12171e] font-syne"
        >
            {/* cyan glow top-right */}
            <div className="pointer-events-none absolute -right-28 -top-28 z-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />

            {/* PHOTO — mobile/tablet, top-right corner */}
            <div className="absolute right-12 top-32 flex h-28 w-28 overflow-hidden rounded-full border-2 border-cyan-500/40 lg:hidden">
                <img
                    src={bennyImg}
                    alt="Benny Herdt"
                    className="h-full w-full object-cover object-top [filter:contrast(1.02)_brightness(1.02)]"
                />
            </div>

            <div className="relative z-10 box-border flex max-w-full flex-1 flex-col items-start justify-center px-5 pb-16 pt-28 sm:px-12 sm:pb-24 sm:pt-36 lg:max-w-[62%] lg:px-20 lg:pt-40">
                <p className="m-0 mb-3 font-inter text-sm font-medium text-neutral-500">Hey, mein Name ist</p>
                <h1 className="m-0 mb-7 text-[40px] font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                    Benny<br /><span className="text-accent">Herdt</span>
                </h1>

                <div className="mb-8 inline-flex items-center self-start rounded-lg border-2 border-cyan-500/40 bg-cyan-500/[0.12] px-4 py-2.5 sm:mb-12">
                    <span className="inline-block overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[2px] text-cyan-100 sm:text-lg">
                        {displayed}
                        <span className="ml-1 inline-block h-[1em] w-0.5 animate-blink bg-accent align-middle" />
                    </span>
                </div>

                <p className="m-0 mb-3.5 font-inter text-xs font-semibold uppercase tracking-[2px] text-neutral-600 sm:text-xs">Kontaktiere mich</p>
                <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                    <a
                        href="mailto:herdtbenny@gmail.com"
                        className="flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-inter text-sm font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:w-auto sm:justify-start sm:px-7 sm:py-4"
                    >
                        <span className="w-5 text-center text-lg sm:w-auto sm:text-xl">@</span>
                        E-Mail
                    </a>
                    <a
                        href="https://github.com/benny2h"
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-inter text-sm font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:w-auto sm:justify-start sm:px-7 sm:py-4"
                    >
                        <FaGithub className="w-5 text-center text-lg sm:w-auto sm:text-xl" />
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/benny-herdt"
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-inter text-sm font-semibold text-neutral-300 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-cyan-500/[0.12] hover:text-accent sm:w-auto sm:justify-start sm:px-7 sm:py-4"
                    >
                        <FaLinkedin className="w-5 text-center text-lg sm:w-auto sm:text-xl" />
                        LinkedIn
                    </a>
                </div>
            </div>

            {/* PHOTO — sits at the border of left/right panels */}
            <div className="absolute bottom-0 left-[80%] z-20 hidden h-[85%] -translate-x-1/2 items-end lg:flex">
                <img
                    src={bennyImg}
                    alt="Benny Herdt"
                    className="block h-full w-auto max-w-[420px] object-cover object-top [mask-image:linear-gradient(to_top,transparent_0%,black_18%)] [filter:contrast(1.02)_brightness(1.02)]"
                />
            </div>
        </section>
    );
}

export default Hero;
