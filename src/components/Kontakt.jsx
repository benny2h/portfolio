import {useEffect, useState} from 'react';
import useInView from '../hooks/useInView';

function KontaktCard({href, target, rel, emoji, title, text}) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            style={{
                ...styles.card,
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                borderColor: hovered ? '#5dcaa5' : '#e0e0e0',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span style={styles.cardEmoji}>{emoji}</span>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardText}>{text}</p>
        </a>
    );
}

function Kontakt({setActiveSection}) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) setActiveSection('kontakt');
    }, [inView, setActiveSection]);

    const cards = [
        {href: 'mailto:herdtbenny@gmail.com', emoji: '✉️', title: 'E-Mail', text: 'herdtbenny@gmail.com'},
        {
            href: 'https://linkedin.com/in/benny-herdt',
            target: '_blank',
            rel: 'noreferrer',
            emoji: '💼',
            title: 'LinkedIn',
            text: 'linkedin.com/in/benny-herdt'
        },
        {
            href: 'https://github.com/benny2h',
            target: '_blank',
            rel: 'noreferrer',
            emoji: '💻',
            title: 'GitHub',
            text: 'github.com/benny2h'
        },
    ];

    return (
        <section id="kontakt" ref={ref} style={styles.section}>
            <div style={{
                ...styles.content,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <h2 style={styles.title}>Kontakt</h2>
                <p style={styles.subtitle}>Schreibt mir gerne zu Projekten, Jobs oder einfach so :)</p>
                <div style={styles.grid}>
                    {cards.map(card => (
                        <KontaktCard key={card.title} {...card} />
                    ))}
                </div>
                <p style={styles.copy}>© 2026 Benny Herdt</p>
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
    content: {width: '100%'},
    title: {
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '600',
        color: '#111',
        marginBottom: 'clamp(12px, 2vw, 16px)',
    },
    subtitle: {
        fontSize: 'clamp(13px, 3vw, 16px)',
        color: '#888',
        marginBottom: 'clamp(35px, 8vw, 48px)',
        maxWidth: '600px',
        lineHeight: '1.7',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'clamp(16px, 4vw, 24px)',
        marginBottom: 'clamp(40px, 8vw, 64px)',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '24px',
        padding: 'clamp(20px, 5vw, 32px)',
        textDecoration: 'none',
        display: 'block',
        cursor: 'pointer',
    },
    cardEmoji: {
        fontSize: 'clamp(20px, 5vw, 32px)',
        marginBottom: '16px',
        display: 'block'
    },
    cardTitle: {
        fontSize: 'clamp(14px, 3vw, 16px)',
        fontWeight: '600',
        color: '#111',
        marginBottom: '8px',
    },
    cardText: {
        fontSize: 'clamp(12px, 2.5vw, 14px)',
        color: '#888',
        wordBreak: 'break-word',
    },
    copy: {
        fontSize: 'clamp(10px, 2vw, 12px)',
        color: '#bbb',
        textAlign: 'center',
    },
};

export default Kontakt;