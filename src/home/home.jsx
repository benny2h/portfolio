import Navbar from '../navbar/navbar';
import Hero from '../hero/hero';
import About from '../about/about';
import Leistungen from '../leistungen/leistungen';
import Projects from '../projects/projects';
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
            <Leistungen setActiveSection={setActiveSection} />
            <Projects setActiveSection={setActiveSection} />
        </div>
    );
}

export default Home;