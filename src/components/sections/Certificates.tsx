import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// ── Certificate data ──────────────────────────────────────────────────────────
const CERT_DETAILS = [
  {
    issuer:    'Cisco Networking Academy',
    credUrl:   '#',
    color:     '#6366f1', // indigo
    accentBg:  'rgba(99,102,241,0.08)',
    skills:    ['Threat Detection', 'Network Defense', 'Risk Management', 'Cyber Hygiene'],
  },
  {
    issuer:    'Cisco Networking Academy',
    credUrl:   '#',
    color:     '#06b6d4', // cyan
    accentBg:  'rgba(6,182,212,0.08)',
    skills:    ['Firewall Config', 'VPN', 'IDS/IPS', 'Packet Analysis'],
  },
  {
    issuer:    'Certiport / Pearson VUE',
    credUrl:   '#',
    color:     '#10b981', // emerald
    accentBg:  'rgba(16,185,129,0.08)',
    skills:    ['Network Fundamentals', 'IP Addressing', 'Routing', 'Switching'],
  },
  {
    issuer:    'Certiport / Pearson VUE',
    credUrl:   '#',
    color:     '#f59e0b', // amber
    accentBg:  'rgba(245,158,11,0.08)',
    skills:    ['Device Setup', 'OS Config', 'Remote Management', 'Security Policies'],
  },
];

// ── Cert Card ─────────────────────────────────────────────────────────────────
function CertCard({
  cert, detail, index,
}: {
  cert: typeof certifications[0];
  detail: typeof CERT_DETAILS[0];
  index: number;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);

  // GSAP: different animation per card
  useEffect(() => {
    const ctx = gsap.context(() => {
      const card  = cardRef.current;
      const line  = lineRef.current;
      const badge = badgeRef.current;
      const img   = imgRef.current;
      if (!card || !line || !badge || !img) return;

      // ── GSAP Line animation (unique per card) ──
      const lineAnimations = [
        // Card 0: horizontal scan line left to right
        () => gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }),

        // Card 1: vertical drop line top to bottom
        () => gsap.fromTo(line,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 1.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }),

        // Card 2: diagonal wipe
        () => gsap.fromTo(line,
          { opacity: 0, x: -60, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }),

        // Card 3: pulse grow from center
        () => gsap.fromTo(line,
          { scale: 0, transformOrigin: 'center center', opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.6)',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }),
      ];

      lineAnimations[index % 4]();

      // ── Image clip-path reveal ──
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.1,
          delay: 0.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none none' },
        },
      );

      // ── Badge bounce in ──
      gsap.fromTo(badge,
        { scale: 0, rotation: -20, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none none' },
        },
      );

      // ── Whole card slide in ──
      const xFrom = index % 2 === 0 ? -50 : 50;
      gsap.fromTo(card,
        { x: xFrom, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' },
        },
      );
    });

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        gap: '0',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        opacity: 0, // GSAP will reveal
        position: 'relative',
        boxShadow: 'var(--shadow-md)',
      }}
      className="cert-card"
    >
      {/* ── Image side ── */}
      <div
        ref={imgRef}
        style={{
          order: isEven ? 0 : 1,
          position: 'relative',
          overflow: 'hidden',
          background: detail.accentBg,
          minHeight: '300px',
          opacity: 0, // GSAP reveals
        }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          }}
        />

        {/* Color overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${detail.color}20, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        {/* Floating badge */}
        <div
          ref={badgeRef}
          style={{
            position: 'absolute',
            top: isEven ? '16px' : 'auto',
            bottom: isEven ? 'auto' : '16px',
            right: '16px',
            opacity: 0, // GSAP reveals
            zIndex: 2,
          }}
        >
          <div style={{
            width: '72px', height: '72px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(12px)',
            borderRadius: '50%',
            border: `2px solid ${detail.color}60`,
            padding: '4px',
            boxShadow: `0 0 24px ${detail.color}40`,
            overflow: 'hidden',
          }}>
            <img
              src={cert.badge}
              alt={`${cert.title} badge`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Number label */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          fontWeight: 700, color: 'rgba(255,255,255,0.6)',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          borderRadius: '999px', padding: '3px 10px',
          letterSpacing: '0.08em',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(certifications.length).padStart(2, '0')}
        </div>
      </div>

      {/* ── Details side ── */}
      <div style={{
        order: isEven ? 1 : 0,
        padding: '2.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '160px', height: '160px',
          background: `radial-gradient(circle at top right, ${detail.color}15, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* ── GSAP line element (unique per card) ── */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            ...(index % 4 === 0 && {
              // Horizontal line
              top: '0', left: '0', right: '0', height: '2px',
              background: `linear-gradient(90deg, ${detail.color}, transparent)`,
            }),
            ...(index % 4 === 1 && {
              // Vertical line on left
              top: '0', bottom: '0', left: '0', width: '2px',
              background: `linear-gradient(180deg, ${detail.color}, transparent)`,
            }),
            ...(index % 4 === 2 && {
              // Diagonal
              top: '0', left: '0', right: '0', height: '2px', opacity: 0,
              background: `linear-gradient(90deg, transparent, ${detail.color}, transparent)`,
              transform: 'skewY(-3deg)',
            }),
            ...(index % 4 === 3 && {
              // Center dot pulse
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '120px', height: '120px', borderRadius: '50%', opacity: 0,
              background: `radial-gradient(circle, ${detail.color}20, transparent 70%)`,
              filter: 'blur(16px)', scale: 0,
            }),
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Issuer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{
              width: '30px', height: '30px',
              borderRadius: 'var(--radius-md)',
              background: `${detail.color}20`,
              border: `1px solid ${detail.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: detail.color, flexShrink: 0,
            }}>
              <ShieldCheck size={14} />
            </div>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700,
              color: detail.color, textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              {detail.issuer}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.03em', lineHeight: 1.25,
            marginBottom: '0.75rem',
          }}>
            {cert.title}
          </h3>

          {/* Date */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.78rem', color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}>
            <Calendar size={13} />
            {cert.date}
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Covered Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {detail.skills.map((skill) => (
                <span key={skill} style={{
                  fontSize: '0.72rem', fontWeight: 600,
                  color: detail.color,
                  background: `${detail.color}12`,
                  border: `1px solid ${detail.color}25`,
                  borderRadius: '999px',
                  padding: '3px 10px',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Credential link */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={14} color={detail.color} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Verified Certification
              </span>
            </div>
            <a
              href={detail.credUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '0.78rem', fontWeight: 600,
                color: detail.color, textDecoration: 'none',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '8px')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '4px')}
            >
              View Credential <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section Header with GSAP line draw ───────────────────────────────────────
function SectionHeader() {
  const lineRef  = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw SVG path
      const path = lineRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        });
      }

      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%' },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
      <span className="section-tag">
        <Award size={12} />
        Achievements
      </span>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800, color: 'var(--text-primary)',
        letterSpacing: '-0.03em', marginTop: '0.75rem',
      }}>
        Certifications &amp; Badges
      </h2>
      <p style={{
        fontSize: '1rem', color: 'var(--text-secondary)',
        maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: 1.7,
      }}>
        Industry-recognized credentials from Cisco &amp; Certiport
      </p>

      {/* SVG decorative line */}
      <svg
        width="320" height="24" viewBox="0 0 320 24"
        style={{ marginTop: '1.5rem', display: 'block', margin: '1.5rem auto 0' }}
      >
        <path
          ref={lineRef}
          d="M 0 12 Q 80 2, 160 12 Q 240 22, 320 12"
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ── Badge Strip (all 4 badges in a row) ──────────────────────────────────────
function BadgeStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.badge-item',
        { y: 30, scale: 0.7, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: stripRef.current, start: 'top 85%' },
        },
      );

      // Horizontal line behind badges
      gsap.fromTo('.badge-connector-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: stripRef.current, start: 'top 85%' },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={stripRef} style={{ marginTop: '5rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            All Earned Badges
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Digital credentials from each completed course
          </p>
        </motion.div>
      </div>

      {/* Connector line */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="badge-connector-line"
          style={{
            position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent-border), transparent)',
            transform: 'translateY(-50%)',
          }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1.5rem, 6vw, 4rem)',
          position: 'relative', zIndex: 1,
          flexWrap: 'wrap',
        }}>
          {certifications.map((cert, i) => {
            const color = CERT_DETAILS[i].color;
            return (
              <div
                key={cert.id}
                className="badge-item"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', opacity: 0 }}
              >
                <div style={{
                  width: '90px', height: '90px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: `2px solid ${color}40`,
                  padding: '8px',
                  boxShadow: `0 0 30px ${color}25, var(--shadow-md)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <img
                    src={cert.badge}
                    alt={`${cert.title} badge`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  {/* Ring glow */}
                  <div style={{
                    position: 'absolute', inset: '-2px',
                    borderRadius: '50%',
                    background: `conic-gradient(${color} 0deg, transparent 180deg, ${color} 360deg)`,
                    opacity: 0.15,
                    zIndex: -1,
                  }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, maxWidth: '100px', textAlign: 'center' }}>
                    {cert.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color, marginTop: '3px', fontWeight: 600 }}>
                    {cert.date.split(' ').pop()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Certificates Section ──────────────────────────────────────────────────────
export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP: Parallax background orbs
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.certs-orb-1',
        { y: -40, x: -30 },
        { y: 40, x: 30, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        },
      );
      gsap.fromTo('.certs-orb-2',
        { y: 30, x: 40 },
        { y: -30, x: -40, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* GSAP parallax orbs */}
      <div className="certs-orb-1" style={{
        position: 'absolute', top: '10%', left: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="certs-orb-2" style={{
        position: 'absolute', bottom: '10%', right: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header with SVG line draw */}
        <SectionHeader />

        {/* Certificate Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {certifications.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              detail={CERT_DETAILS[i]}
              index={i}
            />
          ))}
        </div>

        {/* Badge strip at bottom */}
        <BadgeStrip />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cert-card {
            grid-template-columns: 1fr !important;
          }
          .cert-card > div:first-child {
            min-height: 220px !important;
            order: 0 !important;
          }
          .cert-card > div:last-child {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
