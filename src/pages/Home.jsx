function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Hey, ich bin Benny 👋</h1>
            <p style={styles.subtitle}>
                Wirtschaftsinformatik Student @ OTH Regensburg
            </p>
            <p style={styles.text}>
                Ich entwickle Frontend-Anwendungen und interessiere mich für
                KI, Fußballdatenanalyse und eigene Softwareprojekte.
            </p>
            <div style={styles.skills}>
                {['Angular', 'TypeScript', 'React', 'SQL', 'Java', 'GitLab', 'Cypress'].map(skill => (
                    <span key={skill} style={styles.badge}>{skill}</span>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '80px auto',
        padding: '0 32px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '8px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '24px',
    },
    text: {
        fontSize: '1rem',
        lineHeight: '1.8',
        marginBottom: '32px',
    },
    skills: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    badge: {
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.9rem',
    }
};

export default Home;