import Navbar from '../navbar/navbar';
import Hero from '../hero/hero';
import About from '../about/about';
import Projects from '../projects/projects';
import Contact from '../contact/contact';

function Home() {
    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar scrollTo={scrollTo} />
            <Hero />
            <About />
            <Projects />
            <Contact />
        </div>
    );
}

export default Home;