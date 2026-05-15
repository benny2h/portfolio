function Hero() {
    return (
        <section style={styles.hero}>
            <div style={styles.left}>
                <div style={styles.leftContent}>
                    <p style={styles.greeting}>Hi, ich bin</p>
                    <h1 style={styles.name}>Benny<br />Herdt</h1>
                    <p style={styles.role}>Frontend Developer / KI-Enthusiast</p>
                    <p style={styles.desc}>
                        Wirtschaftsinformatik Student @ OTH Regensburg.<br />
                        Werkstudent bei IMPECT GmbH – Fußballdatenanalyse mit Angular & TypeScript.
                    </p>
                    <div style={styles.socials}>
                        <a href="mailto:herdtbenny@gmail.com" style={styles.socialBtn}>@</a>
                        <a href="https://github.com/benny2h" target="_blank" rel="noreferrer" style={styles.socialBtn}>GH</a>
                        <a href="https://linkedin.com/in/benny-herdt" target="_blank" rel="noreferrer" style={styles.socialBtn}>in</a>
                    </div>
                </div>
                <p style={styles.copy}>© 2026 Benny Herdt</p>
            </div>
            <div style={styles.right}>
                <div style={styles.circleBig} />
                <div style={styles.circleSmall} />
                <div style={styles.emojiContainer}>
                    <span style={styles.emoji}>👨🏼‍💻</span>
                    <p style={styles.emojiLabel}>based in Regensburg, DE</p>
                </div>
            </div>
        </section>
    );
}

const styles = {
    hero: {
        display: 'flex',
        height: '100vh',
        paddingTop: '72px',
    },
    left: {
        width: '45%',
        backgroundColor: '#f0eeea',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
    },
    leftContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    greeting: { fontSize: '18px', color: '#888', marginBottom: '8px' },
    name: {
        fontSize: '52px', fontWeight: '700',
        color: '#111', lineHeight: '1.05', marginBottom: '12px',
    },
    role: { fontSize: '16px', color: '#5dcaa5', marginBottom: '12px', fontWeight: '500' },
    desc: {
        fontSize: '14px', color: '#888',
        lineHeight: '1.8', marginBottom: '32px',
    },
    socials: { display: 'flex', gap: '12px' },
    socialBtn: {
        width: '44px', height: '44px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#e8e6e2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', color: '#333',
        fontSize: '14px', fontWeight: '500',
    },
    copy: { fontSize: '12px', color: '#bbb' },
    right: {
        width: '55%',
        backgroundColor: '#0f0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    circleBig: {
        position: 'absolute', width: '400px', height: '400px',
        backgroundColor: '#3b2f8f22', borderRadius: '50%',
        top: '-80px', right: '-80px', pointerEvents: 'none',
    },
    circleSmall: {
        position: 'absolute', width: '250px', height: '250px',
        backgroundColor: '#1d9e7511', borderRadius: '50%',
        bottom: '-40px', left: '10%', pointerEvents: 'none',
    },
    emojiContainer: {
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
    },
    emoji: { fontSize: '160px', lineHeight: '1' },
    emojiLabel: { color: '#555', fontSize: '13px', letterSpacing: '1px' },
};

export default Hero;