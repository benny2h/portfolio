function Navbar({ scrollTo, activeSection }) {
    const links = ['hero', 'about', 'projects'];
    const labels = { hero: 'Start', about: 'Über mich', projects: 'Projekte' };

    return (
        <nav className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between border-b border-cyan-500/10 bg-[#080b0f]/90 px-4 py-3.5 font-syne backdrop-blur-md sm:px-10 sm:py-5">
            <span
                onClick={() => scrollTo('hero')}
                className="shrink-0 cursor-pointer text-lg font-extrabold tracking-tight text-white sm:text-2xl"
            >
                benny<span className="text-accent">.</span>
            </span>

            <ul className="flex list-none items-center gap-1 sm:gap-8">
                {links.map((id) => (
                    <li key={id}>
                        <button
                            onClick={() => scrollTo(id)}
                            className={`relative whitespace-nowrap px-1 py-2 font-inter text-[11px] font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                                activeSection === id
                                    ? '-translate-y-px text-accent [text-shadow:0_0_12px_rgba(6,182,212,0.5)]'
                                    : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                        >
                            {labels[id]}
                            <span
                                className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-200 ${
                                    activeSection === id ? 'scale-x-100' : ''
                                }`}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
