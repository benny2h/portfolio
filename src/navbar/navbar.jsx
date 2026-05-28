import './navbar.css';

function Navbar({ scrollTo, activeSection }) {
    const links = ['hero', 'about', 'projects'];
    const labels = { hero: 'Start', about: 'Über mich', projects: 'Projekte' };

    return (
        <>
            <nav className="nb-root">
                <span className="nb-logo" onClick={() => scrollTo('hero')}>
                    benny<span>.</span>
                </span>

                <ul className="nb-links">
                    {links.map((id) => (
                        <li key={id}>
                            <button
                                onClick={() => scrollTo(id)}
                                className={activeSection === id ? 'active' : 'inactive'}
                            >
                                {labels[id]}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;