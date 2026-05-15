import useInView from '../hooks/useInView';

function About() {
    const [ref, inView] = useInView();

    return (
        <section id="about" ref={ref} style={styles.section}>
            <div style={{ ...styles.content, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
                <h2 style={styles.title}>Über mich</h2>
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>🎓</span>
                        <h3 style={styles.cardTitle}>Studium</h3>
                        <p style={styles.cardText}>Bachelor Wirtschaftsinformatik @ OTH Regensburg</p>
                        <p style={styles.cardSub}>10/2023 – vsl. 09/2027</p>
                    </div>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>💼</span>
                        <h3 style={styles.cardTitle}>Aktuell</h3>
                        <p style={styles.cardText}>Werkstudent Softwareentwicklung @ IMPECT GmbH, Köln</p>
                        <p style={styles.cardSub}>Angular · TypeScript · Agile · seit 02/2026</p>
                    </div>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>⚽</span>
                        <h3 style={styles.cardTitle}>Leidenschaft</h3>
                        <p style={styles.cardText}>Fußball, KI & eigene Softwareprojekte</p>
                        <p style={styles.cardSub}>Ziel: KI Consulting im Sportbereich</p>
                    </div>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>📍</span>
                        <h3 style={styles.cardTitle}>Standort</h3>
                        <p style={styles.cardText}>Pettendorf bei Regensburg, Bayern</p>
                        <p style={styles.cardSub}>Remote-first</p>
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
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
    },
    card: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: '32px',
    },
    cardIcon: { fontSize: '32px', marginBottom: '16px', display: 'block' },
    cardTitle: {
        fontSize: '16px', fontWeight: '600',
        color: '#5dcaa5', marginBottom: '8px',
    },
    cardText: {
        fontSize: '15px', color: '#fff',
        lineHeight: '1.6', marginBottom: '8px',
    },
    cardSub: { fontSize: '13px', color: '#555' },
};

export default About;