import {useEffect} from 'react';
import useInView from '../hooks/useInView';
import {
    SiAngular,
    SiTypescript,
    SiReact,
    SiCypress,
    SiHtml5,
    SiGitlab,
    SiPostgresql,
    SiTailwindcss,
    SiVercel, SiDocker, SiNodedotjs,
    SiCloudflare, SiNetlify, SiPostman
} from 'react-icons/si';

import {FaJava} from 'react-icons/fa';

function About({setActiveSection}) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) setActiveSection('about');
    }, [inView, setActiveSection]);

    const timeline = [
        {
            period: '10/2023 – vsl. 09/2027',
            title: 'Bachelor Wirtschaftsinformatik',
            place: 'OTH Regensburg',
            icon: '🎓',
            tag: 'Studium',
        },
        {
            period: 'seit 02/2026',
            title: 'Werkstudent Softwareentwicklung',
            place: 'IMPECT GmbH, Köln',
            detail: 'Softwarelösungen für Fußballdatenanalyse',
            icon: '👨🏼‍💻',
            tag: 'Job',
        },
    ];

    const skills = [
        {name: 'React', icon: <SiReact color="#61dafb"/>},
        {name: 'Angular', icon: <SiAngular color="#dd0031"/>},
        {name: 'TypeScript', icon: <SiTypescript color="#3178c6"/>},
        {name: 'Java', icon: <FaJava color="#f89820"/>},
        {name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1"/>},
        {name: 'HTML', icon: <SiHtml5 color="#e34f26"/>},
        {name: 'Tailwind', icon: <SiTailwindcss color="#38bdf8"/>},
        {name: 'Git', icon: <SiGitlab color="#fc6d26"/>},
        {name: 'Node.js', icon: <SiNodedotjs color="#3c873a"/>},
        {name: 'Docker', icon: <SiDocker color="#2496ed"/>},
        {name: 'Vercel', icon: <SiVercel color="#000000"/>},
        {name: 'Cypress', icon: <SiCypress color="#17202c"/>},
        {name: 'Cloudflare', icon: <SiCloudflare color="#f38020"/>},
        {name: 'Netlify', icon: <SiNetlify color="#00c7b7"/>},
        {name: 'Postman', icon: <SiPostman color="#ff6c37"/>},
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="relative box-border min-h-screen overflow-hidden bg-[#12171e] px-5 pb-16 pt-28 font-syne sm:px-12 sm:pb-24 sm:pt-32 lg:px-20 lg:pt-36"
        >
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />

            <div
                className="relative mx-auto w-full max-w-[1100px] transition-all duration-700 ease-out"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                }}
            >
                <p className="m-0 mb-3.5 font-inter text-xs font-semibold uppercase tracking-[3px] text-accent">Wer bin ich</p>
                <h2 className="m-0 mb-4 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">Über mich</h2>
                <p className="m-0 mb-12 max-w-[500px] font-inter text-sm leading-[1.7] text-neutral-500 sm:mb-[72px] sm:text-base">Frontend, APIs und interaktive User Experiences</p>

                <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[460px_1fr] lg:gap-7">

                    {/* TIMELINE */}
                    <div className="flex h-full flex-col rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-7 sm:p-10">
                        <p className="mb-7 font-inter text-[11px] font-semibold uppercase tracking-[3px] text-neutral-700">Werdegang</p>
                        {timeline.map((item, i) => (
                            <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                                <div className="flex shrink-0 flex-col items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-cyan-500/30 bg-cyan-500/10 text-base">
                                        {item.icon}
                                    </div>
                                    {i !== timeline.length - 1 && (
                                        <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-500/20 to-transparent" />
                                    )}
                                </div>
                                <div>
                                    <span className="mb-1.5 inline-block font-inter text-[10px] font-bold uppercase tracking-[1.5px] text-accent">{item.tag}</span>
                                    <p className="m-0 mb-1 text-sm font-bold leading-[1.3] text-white sm:text-base">{item.title}</p>
                                    <p className="m-0 mb-1 font-inter text-xs text-neutral-400">{item.place}</p>
                                    {item.detail && <p className="m-0 mb-1.5 font-inter text-[11px] leading-[1.5] text-neutral-600 sm:text-xs">{item.detail}</p>}
                                    <span className="font-inter text-[11px] font-medium text-neutral-700">{item.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SKILLS */}
                    <div className="box-border w-full flex-1 rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-6 sm:p-8">
                        <p className="mb-6 font-inter text-[11px] font-semibold uppercase tracking-[3px] text-neutral-700">Tech Stack &amp; Skills</p>

                        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-5">
                            {skills.map((skill, i) => (
                                <div
                                    key={i}
                                    className="flex h-[110px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-cyan-500/35 hover:bg-cyan-500/5"
                                >
                                    <div className="flex items-center justify-center text-3xl">
                                        {skill.icon}
                                    </div>
                                    <div className="text-center font-inter text-[11px] leading-[1.3] text-neutral-300">
                                        {skill.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default About;
