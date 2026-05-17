import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projekte from '../components/Projekte';
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
            <Projekte setActiveSection={setActiveSection} />
        </div>
    );
}

export default Home;