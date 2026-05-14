const projects = [
    {
        title: 'Bundesliga Dashboard',
        description: 'Live Bundesliga Daten – Tabelle, Ergebnisse und Statistiken.',
        tech: ['React', 'OpenLigaDB API'],
        link: '/bundesliga',
    }
];

function Projects() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Projekte</h1>
            <div style={styles.grid}>
                {projects.map(project => (
                    <div key={project.title} style={styles.card}>
                        <h2 style={styles.cardTitle}>{project.title}</h2>
                        <p style={styles.cardText}>{project.description}</p>
                        <div style={styles.techRow}>
                            {project.tech.map(t => (
                                <span key={t} style={styles.badge}>{t}</span>
                            ))}
                        </div>
                        <a href={project.link} style={styles.link}>→ Öffnen</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '900px',
        margin: '60px auto',
        padding: '0 32px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '32px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
    },
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    cardTitle: {
        fontSize: '1.2rem',
        marginBottom: '8px',
    },
    cardText: {
        color: '#555',
        fontSize: '0.95rem',
        marginBottom: '16px',
    },
    techRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '16px',
    },
    badge: {
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
    },
    link: {
        color: '#1a1a2e',
        fontWeight: 'bold',
        textDecoration: 'none',
    }
};

export default Projects;