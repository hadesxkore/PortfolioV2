import './index.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useLenis } from '@/hooks/useLenis';
import { useEffect, useRef } from 'react';

// Layout
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';

function AppContent() {
  useLenis();

  // Cursor glow effect
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow opacity-0 md:opacity-100" />

      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Hero gradient */}
      <div className="fixed inset-0 hero-gradient pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
