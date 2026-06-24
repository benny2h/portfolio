import useInView from '../hooks/useInView';
import RevealLine from '../components/revealLine';
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
    SiCloudflare, SiFormspree, SiPostman
} from 'react-icons/si';

import {FaJava} from 'react-icons/fa';

function About() {
    const [ref, inView] = useInView();

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

    const skillGroups = [
        {
            label: 'Frontend',
            skills: [
                {name: 'React', icon: <SiReact color="#61dafb"/>},
                {name: 'Angular', icon: <SiAngular color="#dd0031"/>},
                {name: 'TypeScript', icon: <SiTypescript color="#3178c6"/>},
                {name: 'HTML', icon: <SiHtml5 color="#e34f26"/>},
                {name: 'Tailwind', icon: <SiTailwindcss color="#38bdf8"/>},
            ],
        },
        {
            label: 'Backend',
            skills: [
                {name: 'Java', icon: <FaJava color="#f89820"/>},
                {name: 'Node.js', icon: <SiNodedotjs color="#3c873a"/>},
                {name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1"/>},
            ],
        },
        {
            label: 'Tools',
            skills: [
                {name: 'Git', icon: <SiGitlab color="#fc6d26"/>},
                {name: 'Docker', icon: <SiDocker color="#2496ed"/>},
                {name: 'Vercel', icon: <SiVercel color="#ffffff"/>},
                {name: 'Cloudflare', icon: <SiCloudflare color="#f38020"/>},
                {name: 'Formspree', icon: <SiFormspree color="#90fe66"/>},
                {name: 'Cypress', icon: <SiCypress color="#ffffff"/>},
                {name: 'Postman', icon: <SiPostman color="#ff6c37"/>},
            ],
        },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="relative box-border min-h-screen overflow-hidden bg-[#12171e] px-5 pb-16 pt-28 font-syne sm:px-12 sm:pb-24 sm:pt-32 lg:px-20 lg:pt-36"
        >
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />

            <div
                className="relative mx-auto w-full max-w-[1320px] transition-all duration-700 ease-out"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                }}
            >
                <p className="m-0 mb-3.5 font-inter text-xs font-semibold uppercase tracking-[3px] text-accent">
                    <RevealLine inView={inView} delay={0}>Wer bin ich</RevealLine>
                </p>
                <h2 className="m-0 mb-16 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
                    <RevealLine inView={inView} delay={120}>Über mich</RevealLine>
                </h2>

                <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[460px_1fr] lg:gap-7">

                    {/* TIMELINE */}
                    <div className="flex h-full flex-col rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-7 sm:p-10">
                        <p className="mb-7 font-inter text-[11px] font-semibold uppercase tracking-[3px] text-accent">Werdegang</p>
                        {timeline.map((item, i) => (
                            <div
                                key={i}
                                className="relative flex gap-5 pb-8 last:pb-0"
                                style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                                    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                                }}
                            >
                                <div className="flex shrink-0 flex-col items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-cyan-500/30 bg-cyan-500/10 text-base">
                                        {item.icon}
                                    </div>
                                    {i !== timeline.length - 1 && (
                                        <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-500/20 to-transparent" />
                                    )}
                                </div>
                                <div>
                                    <span className="mb-1.5 inline-block font-inter text-[10px] font-bold uppercase tracking-[1.5px] text-neutral-700">{item.tag}</span>
                                    <p className="m-0 mb-1 text-sm font-bold leading-[1.3] text-white sm:text-base">{item.title}</p>
                                    <p className="m-0 mb-1 font-inter text-xs text-neutral-400">{item.place}</p>
                                    {item.detail && <p className="m-0 mb-1.5 font-inter text-[11px] leading-[1.5] text-neutral-600 sm:text-xs">{item.detail}</p>}
                                    <span className="font-inter text-[11px] font-medium text-neutral-700">{item.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SKILLS */}
                    <div className="box-border flex w-full flex-1 flex-col rounded-[20px] border border-white/[0.06] bg-[#0e1117] p-6 sm:p-8">
                        <p className="mb-7 font-inter text-[11px] font-semibold uppercase tracking-[3px] text-accent">Tech Stack</p>

                        <div className="flex flex-col gap-6">
                            {skillGroups.map((group, i) => (
                                <div
                                    key={group.label}
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'translateY(0)' : 'translateY(16px)',
                                        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                                    }}
                                >
                                    <p className="mb-3 font-inter text-[10px] font-bold uppercase tracking-[2px] text-neutral-700">{group.label}</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {group.skills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-cyan-500/35 hover:bg-cyan-500/[0.08]"
                                            >
                                                <span className="flex items-center justify-center text-base leading-none">{skill.icon}</span>
                                                <span className="font-inter text-xs font-medium text-neutral-400 transition-colors duration-200 group-hover:text-white">{skill.name}</span>
                                            </div>
                                        ))}
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
