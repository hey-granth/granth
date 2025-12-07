import { Navbar, Footer } from '../components/layout';
import {
    Hero,
    About,
    Experience,
    Projects,
    Patent,
    Community,
    Contact
} from '../components/sections';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Patent />
                <Community />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
