import useInView from '../hooks/useInView';
import {useEffect} from "react";
import { SiAngular, SiTypescript, SiReact, SiCypress, SiHtml5, SiGitlab, SiSap } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { GrDatabase } from 'react-icons/gr';

function SkillCard({name, icon, index, inView}) {
    return (
        <div
            style={{
                ...styles.card,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 0.08}s`
            }}
        >
            <span style={styles.icon}>{icon}</span>
            <span style={styles.name}>{name}</span>
        </div>
    );
}

function Skills({setActiveSection}) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection('skills');
        }
    }, [inView, setActiveSection]);

    const techSkills = [
        { name: 'Angular', icon: <SiAngular color="#dd0031" /> },
        { name: 'React', icon: <SiReact color="#61dafb" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178c6" /> },
        { name: 'HTML/CSS', icon: <SiHtml5 color="#e34f26" /> },
        { name: 'Java', icon: <FaJava color="#f89820" /> },
        { name: 'C', icon: <VscCode color="#007acc" /> },
        { name: 'SQL', icon: <GrDatabase color="#00758f" /> },
        { name: 'Cypress', icon: <SiCypress color="#17202c" /> },
        { name: 'SAP ABAP', icon: <SiSap color="#008FD3" /> },
    ];

    const competences = [
        { name: 'Datenbanken', icon: <GrDatabase color="#5dcaa5" /> },
        { name: 'Git', icon: <SiGitlab color="#fc6d26" /> },
        { name: 'Algorithmen & Datenstrukturen', icon: <VscCode color="#5dcaa5" /> },
        { name: 'Geschäftsprozessmanagement', icon: '🔄' },
        { name: 'Projektmanagement', icon: '📅' },
        { name: 'Innovationsmanagement', icon: '💡' },
        { name: 'IT-Architekturen', icon: '🏛️' },
        { name: 'UI / UX Design', icon: '🎨' },
    ];

    return (
        <section id="skills" ref={ref} style={styles.section}>
            <div style={{
                ...styles.content,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <h2 style={styles.title}>Skills</h2>
                <div style={styles.container}>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={styles.subtitle}>Tech Stack</h3>
                        <div style={styles.grid}>
                            {techSkills.map((skill, i) => (
                                <SkillCard
                                    key={skill.name}
                                    name={skill.name}
                                    icon={skill.icon}
                                    index={i}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={styles.subtitle}>IT- & Methodenkompetenz</h3>
                        <div style={styles.grid}>
                            {competences.map((competence, i) => (
                                <SkillCard
                                    key={competence.name}
                                    name={competence.name}
                                    icon={competence.icon}
                                    index={i}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '90vh',
        backgroundColor: '#f0eeea',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 10%)',
    },
    content: { width: '100%' },
    title: {
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '600',
        color: '#111',
        marginBottom: 'clamp(25px, 5vw, 40px)',
    },
    container: {
        display: 'block',
        width: '100%',
    },
    subtitle: {
        fontSize: 'clamp(12px, 2.5vw, 14px)',
        fontWeight: '600',
        color: '#5dcaa5',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: 'clamp(16px, 3vw, 24px)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 135px)',
        gap: '16px',
        marginBottom: '40px',
    },
    card: {
        height: '100px',
        width: '120px',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '24px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    },
    icon: {
        fontSize: 'clamp(28px, 6vw, 45px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 'clamp(11px, 2.5vw, 13px)',
        color: '#111',
        fontWeight: '500',
        lineHeight: '1.3',
        wordBreak: 'break-word',
        hyphens: 'auto',
    },
};

export default Skills;