import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Code2, Server, Database, Wrench, Palette, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Skill brand colors & definitions ─────────────────────────────────────────
const ALL_SKILLS = [
  // Frontend
  { name: 'React',       color: '#61DAFB', bg: 'rgba(97,218,251,0.1)',  cat: 'frontend', level: 90 },
  { name: 'Next.js',     color: '#ffffff', bg: 'rgba(255,255,255,0.08)',cat: 'frontend', level: 85 },
  { name: 'Vue.js',      color: '#4FC08D', bg: 'rgba(79,192,141,0.1)',  cat: 'frontend', level: 75 },
  { name: 'TypeScript',  color: '#3178C6', bg: 'rgba(49,120,198,0.12)', cat: 'frontend', level: 82 },
  { name: 'JavaScript',  color: '#F7DF1E', bg: 'rgba(247,223,30,0.1)',  cat: 'frontend', level: 92 },
  { name: 'HTML & CSS',  color: '#E34F26', bg: 'rgba(227,79,38,0.1)',   cat: 'frontend', level: 95 },
  { name: 'Tailwind',    color: '#06B6D4', bg: 'rgba(6,182,212,0.1)',   cat: 'frontend', level: 93 },
  { name: 'shadcn/ui',   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', cat: 'frontend', level: 88 },
  // Backend
  { name: 'Node.js',     color: '#339933', bg: 'rgba(51,153,51,0.1)',   cat: 'backend',  level: 80 },
  { name: 'Express',     color: '#68d391', bg: 'rgba(104,211,145,0.1)', cat: 'backend',  level: 78 },
  { name: 'Firebase',    color: '#FFCA28', bg: 'rgba(255,202,40,0.1)',  cat: 'backend',  level: 85 },
  // Database
  { name: 'MongoDB',     color: '#47A248', bg: 'rgba(71,162,72,0.1)',   cat: 'database', level: 80 },
  { name: 'Cloudinary',  color: '#3448C5', bg: 'rgba(52,72,197,0.12)',  cat: 'database', level: 72 },
  // Tools
  { name: 'Git',         color: '#F05032', bg: 'rgba(240,80,50,0.1)',   cat: 'tools',    level: 85 },
  { name: 'Vercel',      color: '#ffffff', bg: 'rgba(255,255,255,0.08)',cat: 'tools',    level: 88 },
  { name: 'Figma',       color: '#F24E1E', bg: 'rgba(242,78,30,0.1)',   cat: 'design',   level: 78 },
];

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend',  icon: Code2,    color: '#61DAFB', desc: 'Building beautiful, responsive UIs' },
  { key: 'backend',  label: 'Backend',   icon: Server,   color: '#339933', desc: 'APIs, auth & server-side logic'     },
  { key: 'database', label: 'Database',  icon: Database, color: '#47A248', desc: 'Data storage & cloud services'      },
  { key: 'tools',    label: 'DevOps',    icon: Wrench,   color: '#F05032', desc: 'Deployment, version control & CI'   },
  { key: 'design',   label: 'Design',    icon: Palette,  color: '#F24E1E', desc: 'UI/UX prototyping & design systems' },
];

// Marquee row data (all skill names repeated)
const MARQUEE_ITEMS = ALL_SKILLS.map((s) => ({ name: s.name, color: s.color, bg: s.bg }));

// ── Infinite Marquee Row ──────────────────────────────────────────────────────
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      {/* Edge fade masks */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: `linear-gradient(90deg,
          var(--bg-primary) 0%,
          transparent 12%,
          transparent 88%,
          var(--bg-primary) 100%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        gap: '0.75rem',
        width: 'max-content',
        animation: `marquee${reverse ? '-reverse' : ''} 32s linear infinite`,
        willChange: 'transform',
      }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              background: item.bg,
              border: `1px solid ${item.color}30`,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 6px ${item.color}`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: item.color }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color, bg }: { name: string; level: number; color: string; bg: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: color, boxShadow: `0 0 8px ${color}`,
            display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {name}
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>
          {level}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: '6px',
        background: bg,
        borderRadius: '999px',
        overflow: 'hidden',
        border: `1px solid ${color}20`,
      }}>
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            borderRadius: '999px',
            boxShadow: `0 0 10px ${color}60`,
            position: 'relative',
          }}
        >
          {/* Shimmer */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
            borderRadius: 'inherit',
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({
  cat, index,
}: {
  cat: typeof CATEGORIES[0];
  index: number;
}) {
  const skills   = ALL_SKILLS.filter((s) => s.cat === cat.key);
  const Icon     = cat.icon;
  const sectionRef  = useRef<HTMLDivElement>(null);

  // Parallax — each card moves at slightly different rate
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);

  const directions = ['left', 'right', 'up', 'left', 'right'] as const;
  const dir = directions[index % directions.length];

  const initial = {
    opacity: 0,
    x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0,
    y: dir === 'up' ? 50 : 0,
  };

  return (
    <motion.div
      ref={sectionRef}
      style={{ y }}
    >
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          boxShadow: 'var(--shadow-sm)',
          transition: 'border-color var(--transition-base), box-shadow var(--transition-base)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${cat.color}40`;
          e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}15, var(--shadow-md)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
      >
        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '100px', height: '100px',
          background: `radial-gradient(circle at top right, ${cat.color}15, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: 'var(--radius-md)',
            background: `${cat.color}15`,
            border: `1px solid ${cat.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: cat.color, flexShrink: 0,
          }}>
            <Icon size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {cat.label}
            </h3>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
              {cat.desc}
            </p>
          </div>
        </div>

        {/* Skill bars */}
        <div>
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>

        {/* Badge count */}
        <div style={{
          position: 'absolute', bottom: '1rem', right: '1rem',
          fontSize: '0.65rem', fontWeight: 700,
          color: cat.color, fontFamily: 'var(--font-mono)',
          background: `${cat.color}12`,
          border: `1px solid ${cat.color}25`,
          borderRadius: '999px',
          padding: '3px 10px',
        }}>
          {skills.length} skills
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Stats strip ───────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { val: '16+', label: 'Technologies' },
    { val: '5',   label: 'Categories'   },
    { val: '3+',  label: 'Years Coding' },
    { val: '100%', label: 'Self-Driven' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1px',
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '4rem',
    }} className="stats-strip">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, marginBottom: '4px' }}>
            {s.val}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Skills Section ────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP: subtle background gradient shift on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-bg-orb',
        { x: -60, y: -40, scale: 0.8, opacity: 0.3 },
        {
          x: 60,
          y: 40,
          scale: 1.2,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Floating bg orb (GSAP controlled) */}
      <div
        className="skills-bg-orb"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-tag">
            <Layers size={12} />
            Tech Stack
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            marginTop: '0.75rem',
          }}>
            Skills &amp; Technologies
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0.75rem auto 0',
            lineHeight: 1.7,
          }}>
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Marquee Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </motion.div>

        {/* Stats Strip */}
        <StatsStrip />

        {/* Category cards grid */}
        <div style={{
          display: 'grid',
          gap: '1.25rem',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }} className="skills-grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
