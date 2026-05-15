import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import useInView from '../hooks/useInView';

function Projekte({ setActiveSection }) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection('projekte');
        }
    }, [inView, setActiveSection]);

    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const projekte = [
        {
            title: 'Fussball Scorings',
            desc: 'Live Fussball Tabellen, Spieltage und mehr mit echten Daten von OpenLigaDB',
            route: '/footballScorings',
            emoji: '⚽',
        },
        {
            title: 'Eigener KI Chatbot',
            desc: 'Gemini-powered Chatbot – in Entwicklung',
            route: '/chatbot',
            emoji: '🤖',
        },
    ];

    return (
        <section id="projekte" ref={ref} style={styles.section}>
            <div style={{ ...styles.content, opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}>
                <h2 style={styles.title}>Projekte</h2>
                <p style={styles.subtitle}>Hier probiere ich Sachen aus und versuchen meine Skills zu erweitern ;)</p>

                <div style={styles.grid}>
                    {projekte.map((projekt, i) => {
                        const isHovered = hoveredIndex === i;

                        return (
                            <div
                                key={projekt.title}
                                style={{
                                    ...styles.card,
                                    opacity: inView ? 1 : 0,
                                    transform: inView
                                        ? (isHovered ? 'translateY(0) scale(1.02)' : 'translateY(0)')
                                        : 'translateY(30px)',
                                    borderColor: isHovered ? '#5dcaa5' : '#1a1a2e',
                                    boxShadow: isHovered ? '0 10px 30px rgba(93, 202, 165, 0.1)' : 'none',
                                    transition: isHovered
                                        ? 'all 0.3s ease'
                                        : `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                                }}
                                onClick={() => navigate(projekt.route)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={styles.cardEmoji}>{projekt.emoji}</span>
                                </div>
                                <h3 style={styles.cardTitle}>{projekt.title}</h3>
                                <p style={styles.cardDesc}>{projekt.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '90vh',
        backgroundColor: '#0f0f1a',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 10%)',
    },
    content: { width: '100%' },
    title: {
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '600',
        color: '#fff',
        marginBottom: 'clamp(15px, 3vw, 25px)',
    },
    subtitle: {
        fontSize: 'clamp(14px, 3vw, 16px)',
        color: '#888',
        marginBottom: 'clamp(25px, 5vw, 35px)',
        maxWidth: '600px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 80vw, 400px), 1fr))',
        gap: 'clamp(16px, 4vw, 24px)',
    },
    card: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: 'clamp(20px, 5vw, 32px)',
        cursor: 'pointer',
    },
    cardEmoji: {
        fontSize: 'clamp(24px, 5vw, 32px)',
        marginBottom: '16px',
        display: 'block'
    },
    cardTitle: {
        fontSize: 'clamp(16px, 3vw, 18px)',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '8px',
    },
    cardDesc: {
        fontSize: 'clamp(13px, 2.5vw, 14px)',
        color: '#666',
        lineHeight: '1.7',
        marginBottom: '16px',
    },
    link: {
        color: '#5dcaa5',
        fontWeight: '600',
        fontSize: 'clamp(12px, 2vw, 14px)',
        marginTop: 'auto',
    },
};

export default Projekte;