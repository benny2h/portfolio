import { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';
import {SiGithub} from "react-icons/si";
import {FaEnvelope, FaLinkedinIn} from "react-icons/fa";

function BigCard({ emoji, title, text1, text2, sub }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            style={{
                ...styles.card,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? '0 10px 30px rgba(93, 202, 165, 0.25)' : '0 6px 20px rgba(0,0,0,0.25)',
                borderColor: hovered ? '#5dcaa5' : '#1a1a2e',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span style={styles.cardIcon}>{emoji}</span>
            <h3 style={styles.cardTitle}>{title}</h3>
            <h4 style={styles.cardText}>{text1}</h4>
            {text2 && <p style={styles.cardText}>{text2}</p>}
            <p style={styles.cardSub}>{sub}</p>
        </div>
    );
}

function KontaktCard({ href, target, rel, icon, title, text }) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            style={{
                ...styles.kontaktCard,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? '0 8px 24px rgba(93, 202, 165, 0.15)' : 'none',
                borderColor: hovered ? '#5dcaa5' : '#1a1a2e',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span style={styles.kontaktIcon}>{icon}</span>
            <div style={styles.kontaktTextWrapper}>
                <p style={styles.kontaktCardTitle}>{title}</p>
                <p style={styles.kontaktCardText}>{text}</p>
            </div>
        </a>
    );
}

function About({ setActiveSection }) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection('about');
        }
    }, [inView, setActiveSection]);

    const kontaktDaten = [
        {
            href: 'mailto:herdtbenny@gmail.com',
            icon: <FaEnvelope color="#888" />,
            title: 'E-Mail',
            text: 'herdtbenny@gmail.com'
        },
        {
            href: 'https://linkedin.com/in/benny-herdt',
            target: '_blank',
            rel: 'noreferrer',
            icon: <FaLinkedinIn color="#0A66C2" />,
            title: 'LinkedIn',
            text: 'linkedin.com/in/benny-herdt'
        },
        {
            href: 'https://github.com/benny2h',
            target: '_blank',
            rel: 'noreferrer',
            icon: <SiGithub color="#fff" />,
            title: 'GitHub',
            text: 'github.com/benny2h'
        },
    ];

    return (
        <section id="about" ref={ref} style={styles.section}>
            <div style={{
                ...styles.content,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>

                <h2 style={styles.title}>Über mich</h2>
                <p style={styles.subtitle}>Frontend, APIs und interaktive User Experiences.</p>

                <div style={styles.mainLayout}>

                    <div style={styles.bigCardsContainer}>
                        <BigCard
                            emoji="🎓"
                            title="Studium"
                            text1="Bachelor of Science Wirtschaftsinformatik"
                            text2="OTH Regensburg"
                            sub="10/2023 – vsl. 09/2027"
                        />
                        <BigCard
                            emoji="👨🏼‍💻"
                            title="Werkstudent Softwareentwicklung"
                            text1="IMPECT GmbH, Köln"
                            text2="Softwarelösungen für Fußballdatenanalyse"
                            sub="seit 02/2026"
                        />
                    </div>

                    <div style={styles.smallCardsContainer}>
                        {kontaktDaten.map(card => (
                            <KontaktCard key={card.title} {...card} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '100vh',
        backgroundColor: '#0f0f1a',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '120px clamp(20px, 5vw, 10%) 80px',
    },
    content: { width: '100%' },
    title: {
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '12px',
    },
    subtitle: {
        fontSize: 'clamp(13px, 3vw, 16px)',
        color: '#888',
        marginBottom: 'clamp(30px, 6vw, 48px)',
        maxWidth: '600px',
        lineHeight: '1.7',
    },
    mainLayout: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'clamp(16px, 4vw, 24px)',
        alignItems: 'stretch',
    },
    bigCardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(16px, 4vw, 24px)',
        flex: '2 1 500px',
    },
    smallCardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: '1 1 300px',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: 'clamp(20px, 4vw, 30px)',
        flex: 1,
        transition: 'all 0.3s ease',
    },
    kontaktCard: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: '16px clamp(16px, 3vw, 24px)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flex: 1,
    },
    cardIcon: {
        fontSize: 'clamp(24px, 5vw, 32px)',
        marginBottom: '12px',
        display: 'block'
    },
    kontaktIcon: {
        fontSize: 'clamp(20px, 4vw, 26px)',
        display: 'block',
    },
    kontaktTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 'clamp(14px, 3vw, 16px)',
        fontWeight: '600',
        color: '#5dcaa5',
        marginBottom: '8px',
    },
    kontaktCardTitle: {
        fontSize: 'clamp(13px, 2.5vw, 15px)',
        marginBottom: '1px',
        fontWeight: '600',
        color: '#fff',
    },
    cardText: {
        fontSize: 'clamp(13px, 2.5vw, 14px)',
        color: '#fff',
        lineHeight: '1.6',
        marginBottom: '4px',
    },
    kontaktCardText: {
        fontSize: 'clamp(11px, 2vw, 13px)',
        color: '#888',
        wordBreak: 'break-word',
    },
    cardSub: {
        fontSize: 'clamp(11px, 2vw, 12px)',
        color: '#555'
    },
    copy: {
        fontSize: 'clamp(10px, 2vw, 12px)',
        color: '#444',
        textAlign: 'center',
        marginTop: 'clamp(40px, 8vw, 64px)',
    },
};

export default About;