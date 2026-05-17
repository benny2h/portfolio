function Navbar({ scrollTo, activeSection }) {
    const links = ['hero', 'about', 'skills', 'projekte'];
    const labels = { hero: 'Start', about: 'Über mich', skills: 'Skills', projekte: 'Projekte' };

    return (
        <nav style={styles.nav}>
            <div style={styles.links}>
                {links.map((id) => {
                    const isActive = activeSection === id;
                    return (
                        <div key={id} style={styles.itemWrapper}>
                            <button
                                onClick={() => scrollTo(id)}
                                style={{
                                    ...styles.link,
                                    color: isActive ? '#5dcaa5' : '#aaa',
                                    fontSize: isActive ? '16px' : '14px',
                                    fontWeight: isActive ? '800' : '600',
                                    textShadow: isActive ? '0 0 12px #5dcaa5aa' : 'none',
                                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {labels[id]}
                            </button>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(12px, 3vw, 20px) clamp(10px, 3vw, 40px)',
        backgroundColor: '#0f0f1a',
        zIndex: 1000,
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 'clamp(6px, 2vw, 12px)',
    },
    itemWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: 'clamp(4px, 1vw, 20px)',
        fontSize: 'clamp(12px, 3vw, 16px)',
    },
};

export default Navbar;