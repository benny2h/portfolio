import useInView from '../hooks/useInView';
import {useEffect} from "react";

function About({setActiveSection}) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection('about');
        }
    }, [inView, setActiveSection]);

    return (
        <section id="about" ref={ref} style={styles.section}>
            <div style={{
                ...styles.content,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s ease'
            }}>
                <h2 style={styles.title}>Über mich</h2>
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>🎓</span>
                        <h3 style={styles.cardTitle}>Studium</h3>
                        <h4 style={styles.cardText}>Bachelor of Science Wirtschaftsinformatik</h4>
                        <p style={styles.cardText}>OTH Regensburg</p>
                        <p style={styles.cardSub}>10/2023 – vsl. 09/2027</p>
                    </div>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>💼</span>
                        <h3 style={styles.cardTitle}>Aktuell</h3>
                        <h4 style={styles.cardText}>Werkstudent Softwareentwicklung</h4>
                        <p style={styles.cardText}>IMPECT GmbH, Köln</p>
                        <p style={styles.cardSub}>seit 02/2026</p>
                    </div>
                    <div style={styles.card}>
                        <span style={styles.cardIcon}>📄</span>
                        <h3 style={styles.cardTitle}>Lebenslauf</h3>
                        <p style={styles.cardText}>Downloade meinen Lebenslauf als PDF</p>
                        <a href="/Lebenslauf_Benny_Herdt.pdf"
                           download="Lebenslauf_Benny_Herdt.pdf"
                           style={styles.downloadBtn}
                        >
                            ↓ Download </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '80vh',
        backgroundColor: '#0f0f1a',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 10%)',
    },
    downloadBtn: {
        display: 'inline-block',
        marginTop: '12px',
        backgroundColor: '#5dcaa5',
        color: '#0f0f1a',
        padding: '8px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: 'clamp(12px, 2vw, 14px)',
        fontWeight: '600',
    },
    content: {width: '100%'},
    title: {
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '600',
        color: '#fff',
        marginBottom: 'clamp(30px, 5vw, 48px)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'clamp(16px, 4vw, 24px)',
    },
    card: {
        backgroundColor: '#13131f',
        border: '1px solid #1a1a2e',
        borderRadius: '16px',
        padding: 'clamp(20px, 5vw, 30px)',
    },
    cardIcon: {
        fontSize: 'clamp(24px, 5vw, 32px)',
        marginBottom: '16px',
        display: 'block'
    },
    cardTitle: {
        fontSize: 'clamp(14px, 3vw, 16px)',
        fontWeight: '600',
        color: '#5dcaa5',
        marginBottom: '8px',
    },
    cardText: {
        fontSize: 'clamp(13px, 2.5vw, 15px)',
        color: '#fff',
        lineHeight: '1.6',
        marginBottom: '8px',
    },
    cardSub: {
        fontSize: 'clamp(11px, 2vw, 13px)',
        color: '#555'
    },
};

export default About;