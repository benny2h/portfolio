function Navbar({ scrollTo }) {
    return (
        <nav style={styles.nav}>
            <div style={styles.links}>
                <button style={styles.link} onClick={() => scrollTo('about')}>About</button>
                <button style={styles.link} onClick={() => scrollTo('skills')}>Skills</button>
                <button style={styles.link} onClick={() => scrollTo('projekte')}>Projekte</button>
                <button style={styles.contact} onClick={() => scrollTo('kontakt')}>Kontakt</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        backgroundColor: '#0f0f1a',
    },
    logo: { color: '#fff', fontWeight: '600', fontSize: '18px' },
    links: { display: 'flex', alignItems: 'center', gap: '32px' },
    link: {
        background: 'none', border: 'none',
        color: '#aaa', fontSize: '14px', cursor: 'pointer',
    },
    contact: {
        backgroundColor: '#fff', color: '#0f0f1a',
        border: 'none', padding: '10px 22px',
        borderRadius: '24px', fontSize: '14px',
        fontWeight: '500', cursor: 'pointer',
    },
};

export default Navbar;