import { useEffect } from "react";
import useInView from "../hooks/useInView";

function Hero({ setActiveSection }) {
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setActiveSection("hero");
        }
    }, [inView, setActiveSection]);

    return (
        <section id="hero" ref={ref} style={styles.hero}>
            <div style={styles.container}>
                <p style={styles.greeting}>Hi, ich bin</p>
                <h1 style={styles.name}>
                    Benny <span style={styles.lastName}>Herdt</span>
                </h1>

                <p style={styles.role}>Upcoming Developer / Designer</p>

                <div style={styles.socials}>
                    <a href="mailto:herdtbenny@gmail.com" style={styles.socialBtn}>@</a>
                    <a href="https://github.com/benny2h" target="_blank" rel="noreferrer" style={styles.socialBtn}>💻</a>
                    <a href="https://linkedin.com/in/benny-herdt" target="_blank" rel="noreferrer" style={styles.socialBtn}>in</a>
                </div>

                <p style={styles.copy}>© 2026 Benny Herdt</p>
            </div>
        </section>
    );
}

const styles = {
    hero: {
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0eeea",
    },

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "16px", // 👈 wichtig: kontrollierter Abstand
    },

    greeting: {
        fontSize: "clamp(14px, 4vw, 18px)",
        color: "#888",
        fontWeight: "500",
        margin: 0, // ❌ kein marginTop mehr
    },

    name: {
        fontSize: "clamp(32px, 10vw, 52px)",
        fontWeight: "700",
        color: "#111",
        margin: 0, // ❌
    },

    role: {
        fontSize: "clamp(14px, 4vw, 16px)",
        color: "#5dcaa5",
        fontWeight: "500",
        margin: "8px 0 32px 0",
    },

    lastName: {
        color: "#5dcaa5",
    },

    socials: {
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "20px",
    },

    socialBtn: {
        width: "44px",
        height: "44px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#e8e6e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        color: "#333",
        fontSize: "14px",
        fontWeight: "500",
    },

    copy: {
        fontSize: "12px",
        color: "#bbb",
    },
};

export default Hero;