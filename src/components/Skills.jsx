import useInView from '../hooks/useInView';

function Skills() {
    const [ref, inView] = useInView();

    const techSkills = [
        { name: 'Angular', level: 80 },
        { name: 'TypeScript', level: 80 },
        { name: 'React', level: 60 },
        { name: 'Java', level: 60 },
        { name: 'SQL', level: 65 },
        { name: 'Cypress', level: 75 },
        { name: 'HTML/CSS', level: 85 },
        { name: 'Git', level: 70 },
    ];

    const softSkills = ['Teamfähigkeit', 'Selbstständigkeit', 'Organisationsfähigkeit'];
    const languages = [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'C1' },
        { name: 'Spanisch', level: 'B1' },
    ];

    return (
        <section id="skills" ref={ref} style={styles.section}>
            <div style={{ ...styles.content, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
                <h2 style={styles.title}>Skills</h2>

                <div style={styles.grid}>
                    <div>
                        <h3 style={styles.subtitle}>Tech Stack</h3>
                        {techSkills.map((skill, i) => (
                            <div key={skill.name} style={styles.skillRow}>
                                <div style={styles.skillHeader}>
                                    <span style={styles.skillName}>{skill.name}</span>
                                    <span style={styles.skillPercent}>{skill.level}%</span>
                                </div>
                                <div style={styles.barBg}>
                                    <div style={{
                                        ...styles.barFill,
                                        width: inView ? `${skill.level}%` : '0%',
                                        transition: `width 1s ease ${i * 0.1}s`,
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 style={styles.subtitle}>Sprachen</h3>
                        {languages.map(lang => (
                            <div key={lang.name} style={styles.langRow}>
                                <span style={styles.langName}>{lang.name}</span>
                                <span style={styles.langLevel}>{lang.level}</span>
                            </div>
                        ))}

                        <h3 style={{ ...styles.subtitle, marginTop: '40px' }}>Soft Skills</h3>
                        <div style={styles.softGrid}>
                            {softSkills.map(skill => (
                                <span key={skill} style={styles.softBadge}>{skill}</span>
                            ))}
                        </div>

                        <h3 style={{ ...styles.subtitle, marginTop: '40px' }}>Hobbys</h3>
                        <div style={styles.softGrid}>
                            {['Vereinsfußball', 'Fitness', 'Ernährung', 'Musik', 'Psychologie'].map(h => (
                                <span key={h} style={styles.hobbyBadge}>{h}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 10%',
    },
    content: { width: '100%' },
    title: {
        fontSize: '36px', fontWeight: '600',
        color: '#111', marginBottom: '48px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
    },
    subtitle: {
        fontSize: '14px', fontWeight: '600',
        color: '#5dcaa5', letterSpacing: '1px',
        textTransform: 'uppercase', marginBottom: '24px',
    },
    skillRow: { marginBottom: '20px' },
    skillHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
    },
    skillName: { fontSize: '14px', color: '#333' },
    skillPercent: { fontSize: '13px', color: '#999' },
    barBg: {
        height: '6px', backgroundColor: '#e0e0e0',
        borderRadius: '4px', overflow: 'hidden',
    },
    barFill: {
        height: '100%', backgroundColor: '#5dcaa5',
        borderRadius: '4px',
    },
    langRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #e0e0e0',
    },
    langName: { fontSize: '15px', color: '#333' },
    langLevel: {
        fontSize: '13px', color: '#5dcaa5',
        fontWeight: '500',
    },
    softGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    softBadge: {
        backgroundColor: '#1a1a2e', color: '#aaa',
        border: '1px solid #2a2a4a',
        padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
    },
    hobbyBadge: {
        backgroundColor: '#f0eeea', color: '#555',
        border: '1px solid #ddd',
        padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
    },
};

export default Skills;