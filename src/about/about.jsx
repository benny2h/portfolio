import {useEffect} from 'react';
import useInView from '../hooks/useInView';
import {
    SiAngular,
    SiTypescript,
    SiReact,
    SiCypress,
    SiHtml5,
    SiGitlab,
    SiSap,
    SiPostgresql,
    SiTailwindcss,
    SiVercel
} from 'react-icons/si';
import './about.css';

import {FaJava} from 'react-icons/fa';
import {VscCode} from "react-icons/vsc";

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
        {name: 'Vercel', icon: <SiVercel color="#000000"/>},
        {name: 'REST APIs', icon: '🌐'},
        {name: 'Cypress', icon: <SiCypress color="#17202c"/>},
        {name: 'SAP ABAP', icon: <SiSap color="#008FD3"/>},
        {name: 'C', icon: <VscCode color="#007acc"/>},
        {name: 'Algorithmen & Datenstrukturen', icon: '⚙️'},
        {name: 'UI / UX Design', icon: '🎨'},
    ];


    return (
        <>
            <section id="about" ref={ref} className="about-root">
                <div
                    className="about-inner"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    <p className="about-eyebrow">Wer bin ich</p>
                    <h2 className="about-title">Über mich</h2>
                    <p className="about-subtitle">Enthusiast für Frontend, APIs und interaktive User Experiences</p>

                    <div className="about-grid">

                        {/* TIMELINE */}
                        <div className="about-timeline">
                            <p className="about-tl-label">Werdegang</p>
                            {timeline.map((item, i) => (
                                <div key={i} className="about-tl-item">
                                    <div className="about-tl-line">
                                        <div className="about-tl-dot">{item.icon}</div>
                                        <div className="about-tl-connector"/>
                                    </div>
                                    <div>
                                        <span className="about-tl-tag">{item.tag}</span>
                                        <p className="about-tl-title">{item.title}</p>
                                        <p className="about-tl-place">{item.place}</p>
                                        {item.detail && <p className="about-tl-detail">{item.detail}</p>}
                                        <span className="about-tl-period">{item.period}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SKILLS */}
                        <div className="about-skills">
                            <p className="about-skills-label">Tech Stack & Skills</p>

                            <div className="about-skills-grid">
                                {skills.map((skill, i) => (
                                    <div key={i} className="about-skill">
                                        <div className="about-skill-icon">
                                            {skill.icon}
                                        </div>

                                        <div className="about-skill-name">
                                            {skill.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default About;