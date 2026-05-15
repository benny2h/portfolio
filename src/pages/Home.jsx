import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projekte from '../components/Projekte';
import Kontakt from '../components/Kontakt';

function Home() {
    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar scrollTo={scrollTo} />
            <Hero />
            <About />
            <Skills />
            <Projekte />
            <Kontakt />
        </div>
    );
}

export default Home;