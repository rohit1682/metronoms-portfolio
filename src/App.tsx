import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

import Sidebar from './components/Sidebar';
import LogoSplash from './components/LogoSplash';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Members from './components/sections/Members';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';

// Section IDs must match the `id` attributes on each section element
const SECTION_IDS = ['home', 'about', 'experience', 'members', 'gallery', 'contact'];

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Netflix-style logo splash */}
      <AnimatePresence>
        {!splashDone && (
          <LogoSplash onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {/* Audio player — mounts after splash so autoplay has a better chance */}
      {splashDone && <AudioPlayer />}

      {/* Main site — fades in after splash */}
      <motion.div
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Sidebar
          activeSection={activeSection}
          onToggle={setSidebarOpen}
          isOpen={sidebarOpen}
        />

        <main
          className={`main-content${sidebarOpen ? ' sidebar-open' : ''}`}
          style={{ width: '100%' }}
        >
          <Hero />
          <About />
          <Experience />
          <Members />
          <Gallery />
          <Contact />
        </main>
      </motion.div>
    </>
  );
}
