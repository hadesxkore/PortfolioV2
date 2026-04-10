import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Mail, Download, MapPin, Sparkles } from 'lucide-react';
import { GithubLogo } from '@phosphor-icons/react';
import { profile, socialLinks } from '@/data/portfolio';
import { useTheme } from '@/providers/ThemeProvider';

// ── Image paths ───────────────────────────────────────────────────────────────
const IMG_DARK       = '/images/mypicture.jpg';
const IMG_LIGHT      = '/images/mypicture02.png';
const IMG_SIDE_LEFT  = '/images/sideprofile01.png';
const IMG_SIDE_RIGHT = '/images/SIDEPROFILE02.png';

// ── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Profile Card with deck-of-cards hover ────────────────────────────────────
function ProfileCard() {
  const { isDark } = useTheme();
  const cardRef    = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Current main photo based on theme
  const mainPhoto = isDark ? IMG_DARK : IMG_LIGHT;

  // --- 3D tilt ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left  - rect.width  / 2;
    const y    = e.clientY - rect.top   - rect.height / 2;
    const rotX = (-y / rect.height) * 12;
    const rotY = ( x / rect.width ) * 12;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
      style={{ perspective: '900px', position: 'relative', overflow: 'visible' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', width: '260px', overflow: 'visible' }}
      >

        {/* ── LEFT deck card (sideprofile01) ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="left-card"
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.85 }}
              animate={{ opacity: 1, x: -155, y: 12, rotate: -15, scale: 0.9 }}
              exit={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '260px',
                height: '100%',
                borderRadius: '26px',
                overflow: 'hidden',
                zIndex: 0,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                transformOrigin: 'bottom center',
              }}
            >
              <img
                src={IMG_SIDE_LEFT}
                alt="Side profile left"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '100px',
                background: 'linear-gradient(to top, var(--bg-card), transparent)',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RIGHT deck card (SIDEPROFILE02) ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="right-card"
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.85 }}
              animate={{ opacity: 1, x: 155, y: 12, rotate: 15, scale: 0.9 }}
              exit={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '260px',
                height: '100%',
                borderRadius: '26px',
                overflow: 'hidden',
                zIndex: 0,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                transformOrigin: 'bottom center',
              }}
            >
              <img
                src={IMG_SIDE_RIGHT}
                alt="Side profile right"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '100px',
                background: 'linear-gradient(to top, var(--bg-card), transparent)',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Glow halo ── */}
        <div style={{
          position: 'absolute',
          inset: '-24px',
          borderRadius: '40px',
          background: 'radial-gradient(ellipse, var(--accent-subtle) 0%, transparent 70%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* ── Gradient border ring ── */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, var(--accent), #a78bfa, #c084fc, var(--accent))',
          backgroundSize: '300% 300%',
          animation: 'shimmer 3s ease infinite',
          zIndex: 1,
        }} />

        {/* ── Main card ── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '260px',
            background: 'var(--bg-card)',
            borderRadius: '26px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'transform 0.18s ease-out',
            transformStyle: 'preserve-3d',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Photo area */}
          <div style={{
            width: '100%',
            height: '310px',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(160deg, var(--bg-tertiary), var(--bg-secondary))',
          }}>
            {/* Theme-switching photo with crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={isDark ? 'dark-photo' : 'light-photo'}
                src={mainPhoto}
                alt={profile.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </AnimatePresence>

            {/* Bottom gradient */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '80px',
              background: 'linear-gradient(to top, var(--bg-card), transparent)',
              zIndex: 1,
            }} />

            {/* Available badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16,185,129,0.4)',
                borderRadius: '999px',
                padding: '5px 12px',
                fontSize: '0.7rem', fontWeight: 600, color: '#10b981',
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#10b981', boxShadow: '0 0 6px #10b981',
                animation: 'pulse-dot 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              Available
            </motion.div>

            {/* Hover hint */}
            <AnimatePresence>
              {!hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    position: 'absolute', bottom: '14px', left: 0, right: 0, zIndex: 2,
                    textAlign: 'center', fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em',
                    fontStyle: 'italic',
                  }}
                >
                  hover me ✦
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info area */}
          <div style={{ padding: '1.1rem 1.25rem' }}>
            <h3 style={{
              fontSize: '1rem', fontWeight: 700,
              color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '2px',
            }}>
              {profile.name}
            </h3>
            <p style={{
              fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.65rem',
            }}>
              {profile.role}
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.9rem',
            }}>
              <MapPin size={11} />
              Balanga City, Bataan
            </div>

            {/* Mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { val: '7+',     label: 'Projects' },
                { val: '4',      label: 'Certs'    },
                { val: "Grad '25", label: 'BS IT'  },
              ].map((s) => (
                <div key={s.label} style={{
                  textAlign: 'center',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  padding: '0.45rem 0.2rem',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const typewritten = useTypewriter(profile.taglines);

  const containerVariants: any = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: any = {
    hidden:   { opacity: 0, y: 28 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="hero" style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '5rem',
      paddingBottom: '3rem',
      position: 'relative',
    }}>
      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'center',
          overflow: 'visible',
        }}>

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '600px' }}
          >
            {/* Tag */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag">
                <Sparkles size={12} />
                IT Graduate &amp; Developer
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                fontWeight: 900, lineHeight: 1.08,
                letterSpacing: '-0.04em', color: 'var(--text-primary)',
              }}>
                Hi, I'm{' '}
                <span className="gradient-text">Kobie</span>
                <br />Villanueva
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
                color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>&gt;</span>
                <span>{typewritten}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
                  style={{
                    display: 'inline-block', width: '2px', height: '1.1em',
                    background: 'var(--accent)', borderRadius: '1px',
                    verticalAlign: 'middle', marginLeft: '1px',
                  }}
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: 'var(--text-secondary)', lineHeight: 1.75,
                marginBottom: '2rem', maxWidth: '500px',
              }}
            >
              {profile.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
                  color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', boxShadow: 'var(--shadow-accent)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                View Projects <ArrowDown size={15} />
              </motion.a>

              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                  fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', border: '1px solid var(--border)', cursor: 'pointer',
                }}
              >
                <Mail size={15} /> Contact Me
              </motion.a>
            </motion.div>

            {/* Social + Resume */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.platform !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.82rem', color: 'var(--text-muted)',
                    textDecoration: 'none', transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.icon === 'github' ? <GithubLogo size={16} /> : <Mail size={16} />}
                  {link.platform}
                </a>
              ))}

              <div style={{ width: '1px', height: '14px', background: 'var(--border)' }} />

              <a
                href={profile.resumeUrl}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.82rem', color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Download size={16} /> Resume
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Card ── */}
          <div className="hero-card-wrapper" style={{ display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontSize: '0.65rem', color: 'var(--text-muted)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
            gap: 2.5rem !important;
          }
          .hero-grid > div:first-child {
            max-width: 100% !important;
            align-items: center;
          }
          .hero-grid > div:first-child p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-card-wrapper {
            order: -1;
          }
        }
        @media (max-width: 480px) {
          .hero-card-wrapper > div > div {
            width: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}
