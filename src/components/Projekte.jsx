import { useNavigate } from 'react-router-dom';
import useInView from '../hooks/useInView';

function Projekte() {
    const [ref, inView] = useInView();
    const navigate = useNavigate();

    const projekte = [
        {
            title: 'Bundesliga Dashboard',
            desc: 'Live Bundesliga Tabelle mit echten Daten von OpenLigaDB. Gebaut mit React und der kostenlosen OpenLigaDB API.',
            tech: ['React', 'OpenLigaDB API'],
            route: '/bundesliga',
            emoji: '⚽',
        }
    ];

    return (
        <section id="projekte" ref={ref} style={styles.section}>
            <div style={{ ...styles.content, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
                <h2 style={styles.title}>Projekte</h2>
                <div style={styles.grid}>
                    {projekte.map((projekt, i) => (
                        <div
                            key={projekt.title}
                            style={{
                                ...styles.card,
                                transitionDelay: `${i * 0.15}s`,
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                                transition: `all 0.8s ease ${i * 0.15}s`,
                            }}
                            onClick={() => navigate(projekt.route)}
                        >
                            <span style={styles.cardEmoji}>{projekt.emoji}</span>
                            <h3 style={styles.cardTitle}>{projekt.title}</h3>
                            <p style={styles.cardDesc}>{projekt.desc}</p>
                            <div style={styles.techRow}>
                                {projekt.tech.map(t => (
                                    <span key={t} style={styles.techBadge}>{t}</span>
                                ))}
                            </div>
                            <p style={styles.link}>→ Öffnen</p>
                        </div>
                    ))}

                    <div style={{ ...styles.cardEmpty, opacity: inView ? 1 : 0, transition: 'all 0.8s ease 0.3s' }}>
                        <span style={styles.cardEmoji}>🤖</span>
                        <h3 style={styles.cardTitle}>KI Chatbot</h3>
                        <p style={styles.cardDesc}>Gemini-powered Chatbot – in Entwicklung.</p>
                        <span style={styles.comingSoon}>Coming soon</span>
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
        alignItems: 'center',
        padding: '80px 10%',
    },
    content: { width: '100%' },
    title: {
        fontSize: '36px', fontWeight: '600',
        color: '#fff', marginBottom: '48px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
    },
    card: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: '32px',
        cursor: 'pointer',
    },
    cardEmpty: {
        backgroundColor: '#13131f',
        border: '1px dashed #2a2a4a',
        borderRadius: '16px',
        padding: '32px',
    },
    cardEmoji: { fontSize: '32px', marginBottom: '16px', display: 'block' },
    cardTitle: {
        fontSize: '18px', fontWeight: '600',
        color: '#fff', marginBottom: '8px',
    },
    cardDesc: {
        fontSize: '14px', color: '#666',
        lineHeight: '1.7', marginBottom: '16px',
    },
    techRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
    techBadge: {
        backgroundColor: '#1a1a2e', color: '#5dcaa5',
        border: '1px solid #2a2a4a',
        padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    },
    link: {
        color: '#5dcaa5', fontWeight: '600', fontSize: '14px',
    },
    comingSoon: {
        backgroundColor: '#1a1a2e', color: '#555',
        padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    },
};

export default Projekte;