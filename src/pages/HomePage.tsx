import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import MemberStrip from '../components/sections/MemberStrip';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

/** Home page — all sections scrolled together on a single route ("/"). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MemberStrip />
      <Experience />
      <Contact />
    </>
  );
}
