import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <span style={styles.logo}>Benny Herdt</span>
            <div>
                <Link style={styles.link} to="/">Home</Link>
                <Link style={styles.link} to="/projects">Projekte</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#1a1a2e',
        color: 'white',
    },
    logo: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '24px',
        fontSize: '1rem',
    }
};

export default Navbar;