function RevealLine({ inView, delay = 0, className = '', children }) {
    return (
        <span className={`block overflow-hidden ${className}`}>
            <span
                className="block transition-transform duration-700 ease-out"
                style={{
                    transform: inView ? 'translateY(0%)' : 'translateY(110%)',
                    transitionDelay: `${delay}ms`,
                }}
            >
                {children}
            </span>
        </span>
    );
}

export default RevealLine;
