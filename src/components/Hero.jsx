import {useEffect} from "react";
import useInView from "../hooks/useInView";

function Hero({setActiveSection}) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection('hero');
        }
    }, [inView, setActiveSection]);

    return (
        <section style={styles.hero}>
            <div style={styles.container}>
                <div style={styles.row}>
                    <div style={styles.textGroup}>
                        <p style={styles.greeting}>Hi, ich bin</p>
                        <h1 style={styles.name}>Benny Herdt</h1>
                    </div>
                    <div style={styles.emojiContainer}>
                        <span>👨🏼‍💻</span>
                    </div>
                </div>

                <p style={styles.role}>Upcoming Developer / Designer</p>
                <p style={styles.desc}>
                    Wirtschaftsinformatik Student @ OTH Regensburg.<br/>
                    Werkstudent bei IMPECT GmbH – Softwarelösungen für Fußballdatenanalyse
                </p>
                <div style={styles.socials}>
                    <a href="mailto:herdtbenny@gmail.com" style={styles.socialBtn}>@</a>
                    <a href="https://github.com/benny2h" target="_blank" rel="noreferrer" style={styles.socialBtn}>💻</a>
                    <a href="https://linkedin.com/in/benny-herdt" target="_blank" rel="noreferrer"
                       style={styles.socialBtn}>in</a>
                </div>
                <p style={styles.copy}>© 2026 Benny Herdt</p>
            </div>
        </section>
    );
}

const styles = {
    hero: {
        display: 'flex',
        minHeight: '100vh',
        paddingTop: '20px'
    },
    container: {
        width: '100%',
        backgroundColor: '#f0eeea',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 100px)',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '12px',
    },
    textGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    greeting: {
        fontSize: 'clamp(14px, 4vw, 18px)',
        color: '#888',
        marginBottom: '2px',
        fontWeight: '500'
    },
    name: {
        fontSize: 'clamp(32px, 10vw, 52px)',
        fontWeight: '700',
        color: '#111',
        marginBottom: '0px',
    },
    role: {
        fontSize: 'clamp(14px, 4vw, 16px)',
        color: '#5dcaa5',
        marginBottom: '12px',
        fontWeight: '500',
        marginTop: '12px',
    },
    desc: {
        fontSize: 'clamp(12px, 3vw, 14px)',
        color: '#888',
        lineHeight: '1.8',
        marginBottom: 'clamp(20px, 5vw, 32px)',
    },
    socials: {
        display: 'flex',
        gap: 'clamp(8px, 2vw, 12px)',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    socialBtn: {
        width: 'clamp(40px, 8vw, 44px)',
        height: 'clamp(40px, 8vw, 44px)',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#e8e6e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: '#333',
        fontSize: 'clamp(12px, 3vw, 14px)',
        fontWeight: '500',
    },
    copy: {
        fontSize: 'clamp(10px, 2vw, 12px)',
        color: '#bbb'
    },
    emojiContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(60px, 15vw, 120px)',
        marginRight: '400px',
    },
};

export default Hero;