import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import bennyImg from "../assets/benny.png";
import './hero.css'

const roles = ["Developer", "Designer", "Student"];

function Hero({ setActiveSection }) {
    const [ref, inView] = useInView();
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout;
        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);

    useEffect(() => {
        if (inView) setActiveSection("hero");
    }, [inView, setActiveSection]);

    return (
        <>
            <section id="hero" ref={ref} className="hero-root">
                <div className="hero-panel" />

                {/* LEFT */}
                <div className="hero-left">
                    <p className="hero-greeting">Hey, mein Name ist</p>
                    <h1 className="hero-name">
                        Benny<br /><span>Herdt</span>
                    </h1>

                    <div className="hero-role-wrap">
                        <span className="hero-role-text">
                            Ich bin {displayed}<span className="hero-cursor" />
                        </span>
                    </div>

                    <p className="hero-contact-label">Kontaktiere mich</p>
                    <div className="hero-contact-btns">
                        <a href="mailto:herdtbenny@gmail.com" className="hero-contact-btn">
                            <span style={{fontSize: 'clamp(18px, 2.5vw, 22px)'}}>@</span>
                            E-Mail
                        </a>
                        <a href="https://github.com/benny2h" target="_blank" rel="noreferrer" className="hero-contact-btn">
                            <FaGithub />
                            GitHub
                        </a>
                        <a href="https://linkedin.com/in/benny-herdt" target="_blank" rel="noreferrer" className="hero-contact-btn">
                            <FaLinkedin />
                            LinkedIn
                        </a>
                    </div>
                </div>

                {/* PHOTO */}
                <div className="hero-photo-wrap">
                    <img src={bennyImg} alt="Benny Herdt" className="hero-photo" />
                </div>
            </section>
        </>
    );
}

export default Hero;