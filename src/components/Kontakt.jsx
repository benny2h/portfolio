import useInView from '../hooks/useInView';

function Kontakt() {
    const [ref, inView] = useInView();

    return (
        <section id="kontakt" ref={ref} style={styles.section}>
            <div style={{ ...styles.content, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
                <h2 style={styles.title}>Kontakt</h2>
                <p style={styles.subtitle}>Ich freue mich über Nachrichten – ob Projekt, Job oder einfach Austausch.</p>

                <div style={styles.grid}>
                    <a href="mailto:herdtbenny@gmail.com" style={styles.card}>
                        <span style={styles.cardEmoji}>✉️</span>
                        <h3 style={styles.cardTitle}>E-Mail</h3>
                        <p style={styles.cardText}>herdtbenny@gmail.com</p>
                    </a>
                    <a href="https://linkedin.com/in/benny-herdt" target="_blank" rel="noreferrer" style={styles.card}>
                        <span style={styles.cardEmoji}>💼</span>
                        <h3 style={styles.cardTitle}>LinkedIn</h3>
                        <p style={styles.cardText}>linkedin.com/in/benny-herdt</p>
                    </a>
                    <a href="https://github.com/benny2h" target="_blank" rel="noreferrer" style={styles.card}>
                        <span style={styles.cardEmoji}>💻</span>
                        <h3 style={styles.cardTitle}>GitHub</h3>
                        <p style={styles.cardText}>github.com/benny2h</p>
                    </a>
                    <div style={styles.card}>
                        <span style={styles.cardEmoji}>📍</span>
                        <h3 style={styles.cardTitle}>Standort</h3>
                        <p style={styles.cardText}>Pettendorf bei Regensburg, Bayern</p>
                    </div>
                </div>

                <p style={styles.copy}>© 2026 Benny Herdt · Wirtschaftsinformatik Student · OTH Regensburg</p>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '100vh',
        backgroundColor: '#f0eeea',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 10%',
    },
    content: { width: '100%' },
    title: {
        fontSize: '36px', fontWeight: '600',
        color: '#111', marginBottom: '16px',
    },
    subtitle: {
        fontSize: '16px', color: '#888',
        marginBottom: '48px', maxWidth: '500px', lineHeight: '1.7',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '64px',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        padding: '32px',
        textDecoration: 'none',
        display: 'block',
    },
    cardEmoji: { fontSize: '32px', marginBottom: '16px', display: 'block' },
    cardTitle: {
        fontSize: '16px', fontWeight: '600',
        color: '#111', marginBottom: '8px',
    },
    cardText: { fontSize: '14px', color: '#888' },
    copy: {
        fontSize: '12px', color: '#bbb', textAlign: 'center',
    },
};

export default Kontakt;