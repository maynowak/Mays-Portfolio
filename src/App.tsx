import About from './components/About';
import Contact from './components/Contact';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Projects />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
