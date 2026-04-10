import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  Loader, MessageSquare, User, AtSign, FileText,
} from 'lucide-react';
import { GithubLogo } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// ── Contact info data ─────────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon:    Mail,
    label:   'Email',
    value:   profile.email,
    href:    `mailto:${profile.email}`,
    color:   '#6366f1',
    bg:      'rgba(99,102,241,0.08)',
  },
  {
    icon:    Phone,
    label:   'Phone',
    value:   profile.phone,
    href:    `tel:${profile.phone}`,
    color:   '#10b981',
    bg:      'rgba(16,185,129,0.08)',
  },
  {
    icon:    MapPin,
    label:   'Location',
    value:   'Balanga City, Bataan, PH',
    href:    'https://maps.google.com/?q=Balanga+Bataan',
    color:   '#f59e0b',
    bg:      'rgba(245,158,11,0.08)',
  },
  {
    icon:    GithubLogo as any,
    label:   'GitHub',
    value:   'github.com/hadesxkore',
    href:    'https://github.com/hadesxkore',
    color:   '#a78bfa',
    bg:      'rgba(167,139,250,0.08)',
  },
];

// ── Floating Label Input ──────────────────────────────────────────────────────
function FloatInput({
  id, label, type = 'text', multiline = false, icon: Icon,
  value, onChange, required,
}: {
  id: string; label: string; type?: string; multiline?: boolean;
  icon: React.ElementType; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-tertiary)',
    border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
    padding: multiline ? '1.5rem 1rem 0.75rem 3rem' : '1.4rem 1rem 0.5rem 3rem',
    resize: 'none' as const,
    minHeight: multiline ? '140px' : 'auto',
  };

  return (
    <div style={{ position: 'relative', marginBottom: '1.1rem' }}>
      {/* Label */}
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: '3rem', zIndex: 2,
          transition: 'all 0.22s ease',
          pointerEvents: 'none',
          top: active ? '0.45rem' : '50%',
          transform: active ? 'none' : multiline ? 'translateY(0.75rem)' : 'translateY(-50%)',
          fontSize: active ? '0.65rem' : '0.88rem',
          fontWeight: active ? 700 : 500,
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}{required && ' *'}
      </label>

      {/* Icon */}
      <div style={{
        position: 'absolute',
        left: '0.9rem',
        top: multiline ? '1rem' : '50%',
        transform: multiline ? 'none' : 'translateY(-50%)',
        color: focused ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'color 0.25s', zIndex: 2, pointerEvents: 'none',
      }}>
        <Icon size={16} />
      </div>

      {/* Input / Textarea */}
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
          placeholder=""
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
          placeholder=""
        />
      )}
    </div>
  );
}

// ── Info Card ─────────────────────────────────────────────────────────────────
function InfoCard({ card, index }: { card: typeof INFO_CARDS[0]; index: number }) {
  const Icon = card.icon;
  return (
    <motion.a
      href={card.href}
      target={card.href.startsWith('mailto') || card.href.startsWith('tel') ? undefined : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        background: card.bg,
        border: `1px solid ${card.color}25`,
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${card.color}50`;
        e.currentTarget.style.boxShadow = `0 0 20px ${card.color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${card.color}25`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
        background: `${card.color}15`,
        border: `1px solid ${card.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: card.color, flexShrink: 0,
      }}>
        <Icon size={18} />
      </div>
      <div>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: card.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '2px' }}>
          {card.label}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {card.value}
        </div>
      </div>
    </motion.a>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  // Form state
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // GSAP: decorative animated lines
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vertical glow line — left panel
      gsap.fromTo('.contact-line-v',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        },
      );

      // Horizontal accent line — right panel
      gsap.fromTo('.contact-line-h',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        },
      );

      // Floating particles
      gsap.fromTo('.contact-particle',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      // Floating orb pulse
      gsap.to('.contact-orb', {
        scale: 1.15, duration: 3,
        yoyo: true, repeat: -1, ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send (replace with EmailJS or backend call)
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('sent');
    // Reset after 4s
    setTimeout(() => {
      setStatus('idle');
      setName(''); setEmail(''); setSubject(''); setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Background orb */}
      <div className="contact-orb" style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Floating decorative particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="contact-particle" style={{
          position: 'absolute', opacity: 0,
          width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent)',
          top: `${15 + i * 12}%`,
          left: `${5 + i * 15}%`,
          filter: 'blur(1px)',
          animation: `float ${3 + i}s ease-in-out ${i * 0.4}s infinite alternate`,
        }} />
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-tag">
            <MessageSquare size={12} />
            Get In Touch
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            letterSpacing: '-0.03em', marginTop: '0.75rem',
          }}>
            Let's Work Together
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: 1.7,
          }}>
            Have a project in mind or want to connect? Drop me a message and I'll get back to you!
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

          {/* ── Left: Info ── */}
          <div ref={leftRef} style={{ position: 'relative' }}>

            {/* GSAP vertical glow line */}
            <div className="contact-line-v" style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
              background: 'linear-gradient(180deg, var(--accent), rgba(167,139,250,0.5), transparent)',
              borderRadius: '999px',
            }} />

            <div style={{ paddingLeft: '1.25rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '1.75rem' }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Contact Information
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  I'm open to freelance projects, full-time opportunities, and collaborations. Let's build something amazing!
                </p>
              </motion.div>

              {/* Info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {INFO_CARDS.map((card, i) => (
                  <InfoCard key={card.label} card={card} index={i} />
                ))}
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.65rem 1.1rem',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#10b981', boxShadow: '0 0 8px #10b981',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                  display: 'inline-block',
                }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10b981' }}>
                  Available for work
                </span>
              </motion.div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div ref={rightRef} style={{ position: 'relative' }}>

            {/* GSAP horizontal top line */}
            <div className="contact-line-h" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--accent), rgba(167,139,250,0.5), transparent)',
              borderRadius: '999px',
            }} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                paddingTop: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '200px', height: '200px',
                background: 'radial-gradient(circle at top right, var(--accent-subtle), transparent 70%)',
                pointerEvents: 'none',
              }} />

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      textAlign: 'center', padding: '3rem 1rem',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: '1rem',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      style={{
                        width: '72px', height: '72px', borderRadius: '50%',
                        background: 'rgba(16,185,129,0.15)',
                        border: '2px solid rgba(16,185,129,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#10b981',
                        boxShadow: '0 0 30px rgba(16,185,129,0.2)',
                      }}
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Message Sent! 🎉
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6 }}>
                      Thanks for reaching out! I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        Send a Message
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        I'll respond within 24 hours
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }} className="form-row">
                      <FloatInput id="name"    label="Full Name"     icon={User}        value={name}    onChange={setName}    required />
                      <FloatInput id="email"   label="Email Address" icon={AtSign}  type="email" value={email}   onChange={setEmail}   required />
                    </div>

                    <FloatInput id="subject" label="Subject"       icon={FileText}    value={subject} onChange={setSubject} />
                    <FloatInput id="message" label="Your Message"  icon={MessageSquare} multiline value={message} onChange={setMessage} required />

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending' || !name || !email || !message}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%', padding: '0.85rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: (!name || !email || !message)
                          ? 'var(--bg-tertiary)'
                          : 'linear-gradient(135deg, var(--accent), #a78bfa)',
                        color: (!name || !email || !message) ? 'var(--text-muted)' : '#fff',
                        fontWeight: 700, fontSize: '0.9rem',
                        border: 'none', cursor: (!name || !email || !message) ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        boxShadow: (!name || !email || !message) ? 'none' : 'var(--shadow-accent)',
                        transition: 'all 0.25s',
                        marginTop: '0.5rem',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Loader size={16} />
                          </motion.div>
                          Sending…
                        </>
                      ) : (
                        <> <Send size={16} /> Send Message </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0) scale(1); }
          100% { transform: translateY(-12px) scale(1.2); }
        }
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
