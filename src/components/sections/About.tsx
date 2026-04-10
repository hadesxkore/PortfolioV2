import { motion } from 'motion/react';
import { GraduationCap, MapPin, Mail, Phone, Calendar, User, BookOpen, Award } from 'lucide-react';
import { profile, education, seminars } from '@/data/portfolio';

// ── Scroll reveal wrapper ─────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const variants: any = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '0.85rem 1rem',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-subtle)',
      transition: 'border-color var(--transition-fast)',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
    >
      <div style={{
        width: '34px', height: '34px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-subtle)',
        border: '1px solid var(--accent-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ── Education Timeline Item ───────────────────────────────────────────────────
function EduItem({ level, school, course, period, index }: {
  level: string; school: string; course: string; period: string; index: number;
}) {
  return (
    <Reveal delay={index * 0.1} direction="left">
      <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
        {/* Timeline dot + line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'var(--accent-subtle)',
            border: '2px solid var(--accent-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', flexShrink: 0, zIndex: 1,
          }}>
            <GraduationCap size={16} />
          </div>
          {index < 3 && (
            <div style={{
              width: '2px', flex: 1, minHeight: '24px',
              background: 'linear-gradient(to bottom, var(--accent-border), var(--border-subtle))',
              marginTop: '4px',
            }} />
          )}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.1rem',
          marginBottom: '1rem',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-border)';
            e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '4px' }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {level}
            </span>
            <span style={{
              fontSize: '0.72rem', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}>
              {period}
            </span>
          </div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>
            {school}
          </div>
          {course && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{course}</div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        {/* Section header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-tag">
              <User size={12} />
              About Me
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginTop: '0.75rem',
            }}>
              Who I Am
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0.75rem auto 0',
              lineHeight: 1.7,
            }}>
              A passionate developer building modern digital experiences
            </p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* ── Left: Bio + Personal Info ── */}
          <div>
            <Reveal direction="left">
              {/* Bio card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative accent corner */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '80px', height: '80px',
                  background: 'radial-gradient(circle, var(--accent-subtle), transparent)',
                  borderRadius: '0 var(--radius-lg) 0 80px',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.78rem', fontWeight: 600,
                  color: 'var(--accent)', marginBottom: '1rem',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  <BookOpen size={14} />
                  My Story
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  position: 'relative',
                }}>
                  {profile.bio}
                </p>

                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}>
                  {[
                    { val: '7+', label: 'Projects Built' },
                    { val: '4', label: 'Certifications' },
                    { val: '3+', label: 'Years Coding' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Personal details */}
            <Reveal direction="left" delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <InfoRow icon={<User size={15} />} label="Full Name" value={profile.name} />
                <InfoRow icon={<Calendar size={15} />} label="Birthday" value="April 29, 2003" />
                <InfoRow icon={<MapPin size={15} />} label="Location" value={profile.location} />
                <InfoRow icon={<Mail size={15} />} label="Email" value={profile.email} />
                <InfoRow icon={<Phone size={15} />} label="Phone" value={profile.phone} />
              </div>
            </Reveal>
          </div>

          {/* ── Right: Education + Seminars ── */}
          <div>
            {/* Education */}
            <Reveal direction="right">
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  <GraduationCap size={16} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Education
                </h3>
              </div>
            </Reveal>

            <div style={{ marginBottom: '2.5rem' }}>
              {education.map((edu, i) => (
                <EduItem key={edu.id} {...edu} index={i} />
              ))}
            </div>

            {/* Seminars */}
            <Reveal direction="right" delay={0.2}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  <Award size={16} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Seminars & Trainings
                </h3>
              </div>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {seminars.map((sem, i) => (
                <Reveal key={sem.id} direction="right" delay={i * 0.08}>
                  <div style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    padding: '0.9rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'border-color var(--transition-fast)',
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--accent)', marginTop: '7px', flexShrink: 0,
                      boxShadow: '0 0 6px var(--accent)',
                    }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>
                        {sem.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span>{sem.date}</span>
                        <span>·</span>
                        <span>{sem.location}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
