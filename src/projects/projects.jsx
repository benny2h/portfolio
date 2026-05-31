import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';
import './projects.css';

function Projects({ setActiveSection }) {
    const [ref, inView] = useInView();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (inView) {
            setActiveSection('projects');
        }
    }, [inView, setActiveSection]);

    const project = [
        {
            title: 'Sport Scorings',
            desc: 'Live-Tabellen, Spieltage und Ergebnisse mit OpenLigaDB API.',
            route: '/sportScorings',
            emoji: '🏟️',
            disabled: false,
        },
        {
            title: 'Eigener KI Chatbot',
            desc: 'Gemini-basierter Chatbot mit eigener UI und Kontextsystem.',
            route: '/chatbot',
            emoji: '🤖',
            disabled: true,
        },
        {
            title: 'Spotify DNA Visualizer',
            desc: 'Genre-Netzwerke, Audio Features und interaktive Mood-Analysen.',
            route: '/spotify-dna-visualizer',
            emoji: '🧬',
            disabled: true,
        },
    ];

    return (
        <>
            <section
                id="projects"
                ref={ref}
                className="projects-root"
            >
                <div
                    className="projects-inner"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView
                            ? 'translateY(0)'
                            : 'translateY(40px)',
                    }}
                >
                    <p className="projects-eyebrow">
                        Eigene Projekte
                    </p>

                    <h2 className="projects-title">
                        Projekte
                    </h2>

                    <p className="projects-subtitle">
                        Hier probiere ich neue Ideen und Technologien aus.
                    </p>

                    <div className="projects-grid">
                        {project.map((projekt, i) => {
                            const isHovered =
                                hoveredIndex === i;

                            return (
                                <div
                                    key={projekt.title}
                                    className={`project-card ${
                                        projekt.disabled
                                            ? 'disabled'
                                            : 'active'
                                    }`}
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView
                                            ? isHovered &&
                                            !projekt.disabled
                                                ? 'translateY(-6px)'
                                                : 'translateY(0)'
                                            : 'translateY(30px)',
                                        transition: `
                                            all 0.6s cubic-bezier(0.16,1,0.3,1)
                                            ${i * 0.12}s
                                        `,
                                        cursor: projekt.disabled
                                            ? 'default'
                                            : 'pointer',
                                    }}
                                    onMouseEnter={() =>
                                        setHoveredIndex(i)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredIndex(null)
                                    }
                                    onClick={() => {
                                        if (!projekt.disabled) {
                                            navigate(projekt.route);
                                        }
                                    }}
                                >
                                    <div className="project-top">
                                        <div className="project-emoji">
                                            {projekt.emoji}
                                        </div>

                                        {projekt.disabled && (
                                            <span className="project-badge">
                                                In Entwicklung
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="project-title">
                                        {projekt.title}
                                    </h3>

                                    <p className="project-desc">
                                        {projekt.desc}
                                    </p>

                                    <div className="project-link">
                                        {projekt.disabled
                                            ? 'Coming soon'
                                            : 'Projekt ansehen →'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Projects;