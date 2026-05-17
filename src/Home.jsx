import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projekte from './pages/Projekte';
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