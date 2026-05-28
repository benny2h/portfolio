import Navbar from '../pages/Navbar';
import Hero from '../pages/hero';
import About from '../pages/about';
import Skills from '../pages/skills';
import Projects from '../pages/projects';
import {useState} from "react";

function Home() {
    const [activeSection, setActiveSection] = useState('hero');

    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar scrollTo={scrollTo} activeSection={activeSection} />
            <Hero setActiveSection={setActiveSection}  />
            <About setActiveSection={setActiveSection} />
            <Skills setActiveSection={setActiveSection} />
            <Projects setActiveSection={setActiveSection} />
        </div>
    );
}

export default Home;