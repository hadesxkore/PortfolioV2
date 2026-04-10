import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Layers, Star, ArrowUpRight, FolderOpen } from 'lucide-react';
import { GithubLogo } from '@phosphor-icons/react';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

// ── Tech Badge ────────────────────────────────────────────────────────────────
function TechBadge({ name }: { name: string }) {
  const colors: Record<string, { color: string; bg: string }> = {
    'React':      { color: '#61DAFB', bg: 'rgba(97,218,251,0.1)'  },
    'Next.js':    { color: '#a0aec0', bg: 'rgba(160,174,192,0.1)' },
    'Vue.js':     { color: '#4FC08D', bg: 'rgba(79,192,141,0.1)'  },
    'TypeScript': { color: '#3178C6', bg: 'rgba(49,120,198,0.12)' },
    'JavaScript': { color: '#F7DF1E', bg: 'rgba(247,223,30,0.1)'  },
    'Firebase':   { color: '#FFCA28', bg: 'rgba(255,202,40,0.1)'  },
    'Tailwind CSS':{ color: '#06B6D4', bg: 'rgba(6,182,212,0.1)'  },
    'MongoDB':    { color: '#47A248', bg: 'rgba(71,162,72,0.1)'   },
    'Express':    { color: '#68d391', bg: 'rgba(104,211,145,0.1)' },
    'Node.js':    { color: '#339933', bg: 'rgba(51,153,51,0.1)'   },
    'Cloudinary': { color: '#3448C5', bg: 'rgba(52,72,197,0.12)'  },
    'shadcn/ui':  { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  };
  const s = colors[name] ?? { color: 'var(--accent)', bg: 'var(--accent-subtle)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600,
      color: s.color, background: s.bg, border: `1px solid ${s.color}25`, whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
  );
}

// ── Project Modal (image on top, full-width) ──────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setSelectedIdx(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '860px', maxHeight: '92vh', overflowY: 'auto',
          background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── Full-Width Image Carousel ── */}
        <div style={{
          position: 'relative', width: '100%', height: '460px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {/* Embla */}
          <div ref={emblaRef} style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              {project.images.map((src, i) => (
                <div key={i} style={{ flex: '0 0 100%', minWidth: 0, height: '100%', overflow: 'hidden' }}>
                  {imgError[i] ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '0.5rem' }}>
                      <FolderOpen size={36} /><span style={{ fontSize: '0.85rem' }}>Image unavailable</span>
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      onError={() => setImgError((p) => ({ ...p, [i]: true }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gradients */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Close btn */}
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.85)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
          >
            <X size={16} />
          </button>

          {/* Counter */}
          <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>
            🖼 {selectedIdx + 1} / {project.images.length}
          </div>

          {/* Prev / Next */}
          {project.images.length > 1 && (
            <>
              <button onClick={scrollPrev}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
              ><ChevronLeft size={22} /></button>
              <button onClick={scrollNext}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
              ><ChevronRight size={22} /></button>
            </>
          )}

          {/* Dot navigation */}
          <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', padding: '0 4rem' }}>
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                style={{ width: selectedIdx === i ? '22px' : '7px', height: '7px', borderRadius: '999px', background: selectedIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s', boxShadow: selectedIdx === i ? '0 0 8px var(--accent)' : 'none' }}
              />
            ))}
          </div>
        </div>

        {/* ── Details Panel ── */}
        <div style={{ padding: '1.75rem 2rem 2rem', flexShrink: 0 }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', borderRadius: '999px', padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '0.6rem' }}>
                {project.category === 'fullstack' ? 'Full Stack' : project.category}
                {project.featured && <span style={{ marginLeft: '6px' }}>⭐ Featured</span>}
              </span>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                {project.title}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', border: '1px solid var(--border)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-border)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                ><GithubLogo size={15} /> GitHub</a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--accent), #a78bfa)', color: '#fff', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', border: 'none', boxShadow: 'var(--shadow-accent)' }}
                ><ExternalLink size={15} /> Live Demo</a>
              )}
              {!project.github && !project.live && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--accent-subtle)', color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 600, border: '1px solid var(--accent-border)' }}>
                  <FolderOpen size={15} /> Private / Academic
                </div>
              )}
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            {project.longDescription}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Tech Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tech.map((t) => <TechBadge key={t} name={t} />)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0, flexWrap: 'wrap' }}>
              {[
                { label: '📸 Screenshots', val: project.images.length },
                { label: '📂 Type', val: project.featured ? '⭐ Featured' : 'Project' },
              ].map((s) => (
                <div key={s.label} style={{ padding: '0.65rem 1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center', minWidth: '90px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{s.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        transition: 'border-color var(--transition-base), box-shadow var(--transition-base)',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-accent), var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {project.featured && (
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(251,191,36,0.4)', borderRadius: '999px', padding: '4px 10px', fontSize: '0.68rem', fontWeight: 700, color: '#fbbf24' }}>
          <Star size={10} fill="#fbbf24" /> Featured
        </div>
      )}
      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 3, width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <ArrowUpRight size={14} />
      </div>

      {/* Thumbnail */}
      <div style={{ height: '200px', overflow: 'hidden', background: 'var(--bg-tertiary)', position: 'relative' }}>
        {imgError ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <FolderOpen size={28} /><span style={{ fontSize: '0.75rem' }}>Preview unavailable</span>
          </div>
        ) : (
          <>
            <img
              src={project.images[0]}
              alt={project.title}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
          </>
        )}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '3px 10px', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
          🖼 {project.images.length} shots
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {project.category === 'fullstack' ? 'Full Stack' : project.category}
        </span>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginTop: '4px', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
          {project.tech.slice(0, 3).map((t) => <TechBadge key={t} name={t} />)}
          {project.tech.length > 3 && <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>+{project.tech.length - 3} more</span>}
        </div>
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click to view screenshots</span>
          <ArrowUpRight size={14} color="var(--accent)" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Filter Tabs ───────────────────────────────────────────────────────────────
type Filter = 'all' | 'featured' | 'fullstack';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'All Projects' },
  { key: 'featured', label: 'Featured'     },
  { key: 'fullstack',label: 'Full Stack'   },
];

// ── Projects Section ──────────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter]   = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    if (filter === 'all')      return true;
    if (filter === 'featured') return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span className="section-tag"><Layers size={12} /> Portfolio</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginTop: '0.75rem' }}>
            Projects I've Built
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: 1.7 }}>
            Real-world applications built with modern tech stacks — click any card to explore screenshots
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600,
                border: '1px solid', cursor: 'pointer', transition: 'all var(--transition-fast)',
                background: filter === f.key ? 'linear-gradient(135deg, var(--accent), #a78bfa)' : 'var(--bg-secondary)',
                color: filter === f.key ? '#fff' : 'var(--text-secondary)',
                borderColor: filter === f.key ? 'transparent' : 'var(--border)',
                boxShadow: filter === f.key ? 'var(--shadow-accent)' : 'none',
              }}
            >
              {f.label}
              <span style={{ marginLeft: '6px', fontSize: '0.7rem', background: filter === f.key ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)', padding: '1px 7px', borderRadius: '999px' }}>
                {f.key === 'all' ? projects.length : f.key === 'featured' ? projects.filter((p) => p.featured).length : projects.filter((p) => p.category === f.key).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="projects-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No projects found for this filter.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
