// combined.jsx — flat single scope

const { useState, useEffect, useRef, useCallback, useMemo } = React;


// ──────────────────────────────────────────────────
// globals.jsx
// ──────────────────────────────────────────────────

// globals.jsx — shared hooks, utilities, and micro-components


/* ── HOOKS ──────────────────────────────────────────────────── */

function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(100, Math.round((window.scrollY / total) * 100));
      setPct(p);
      localStorage.setItem('guide_scroll_pos', window.scrollY);
      localStorage.setItem('guide_scroll_pct', p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return pct;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ── PROGRESS BAR ────────────────────────────────────────── */
function ProgressBar() {
  const pct = useScrollProgress();
  return (
    <>
      <div id="guide-progress-bar">
        <div id="guide-progress-fill" style={{ width: pct + '%' }} />
      </div>
      <div id="guide-progress-pct">{pct}% הושלם</div>
    </>
  );
}

/* ── DARK MODE TOGGLE ────────────────────────────────────── */
function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('guide_dark') === 'true');
  useEffect(() => {
    document.documentElement.setAttribute('data-dark', dark);
    localStorage.setItem('guide_dark', dark);
  }, [dark]);
  return (
    <button
      className={`dark-mode-toggle${dark ? ' dark' : ''}`}
      onClick={() => setDark(d => !d)}
      title={dark ? 'מצב בהיר' : 'מצב כהה'}
      aria-label="החלף מצב תצוגה"
    >
      <div className="dark-mode-knob" />
    </button>
  );
}

/* ── REVEAL WRAPPER ──────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: delay + 's' }}
    >
      {children}
    </div>
  );
}

/* ── CHAPTER HEADER ──────────────────────────────────────── */
function ChapterHeader({ label, title, desc, color = 'var(--color-accent)' }) {
  return (
    <div className="chapter-header">
      <Reveal>
        <div className="chapter-label">
          <div className="chapter-label-line" style={{ background: color }} />
          {label}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="chapter-title">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.2}>
          <p className="chapter-desc">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ── TOOLTIP ─────────────────────────────────────────────── */
function Tooltip({ term, definition }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="t-wrap" style={{ position: 'relative', display: 'inline' }}>
      <span
        className="tooltip-trigger"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}
      >
        {term}
      </span>
      {open && (
        <span className="tooltip-box">
          <strong style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#E85D75' }}>{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
}

/* ── WHY IMPORTANT ───────────────────────────────────────── */
function WhyImportant({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="why-btn" onClick={() => setOpen(o => !o)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
        למה זה חשוב?
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div className={`why-content${open ? ' open' : ''}`}>{children}</div>
    </div>
  );
}

/* ── PULL QUOTE ──────────────────────────────────────────── */
function PullQuote({ text }) {
  return (
    <Reveal>
      <blockquote className="pull-quote">
        <div className="pull-quote-icon">"</div>
        <p className="pull-quote-text">{text}</p>
      </blockquote>
    </Reveal>
  );
}

/* ── SIDE NOTE ───────────────────────────────────────────── */
function SideNote({ children }) {
  return <div className="side-note">{children}</div>;
}

/* ── BOOKMARK BUTTON ─────────────────────────────────────── */
function BookmarkBtn({ id, label }) {
  const [saved, setSaved] = useState(() => {
    const bm = JSON.parse(localStorage.getItem('guide_bookmarks') || '[]');
    return bm.some(b => b.id === id);
  });

  const toggle = () => {
    let bm = JSON.parse(localStorage.getItem('guide_bookmarks') || '[]');
    if (saved) {
      bm = bm.filter(b => b.id !== id);
    } else {
      bm.push({ id, label });
    }
    localStorage.setItem('guide_bookmarks', JSON.stringify(bm));
    setSaved(!saved);
    window.dispatchEvent(new CustomEvent('bookmarks-changed'));
  };

  return (
    <button className={`bookmark-btn${saved ? ' active' : ''}`} onClick={toggle}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
      {saved ? 'נשמר' : 'שמרי פרק זה'}
    </button>
  );
}

/* ── ACCORDION CARD ──────────────────────────────────────── */
function AccordionCard({ icon, title, teaser, color = '#E85D75', children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-card${open ? ' open' : ''}`}>
      <button className="accordion-header" onClick={() => setOpen(o => !o)}>
        <div className="accordion-icon-wrap" style={{ background: color + '1A' }}>
          <span style={{ fontSize: 22 }}>{icon}</span>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div className="accordion-title">{title}</div>
          {!open && teaser && <div className="accordion-teaser" style={{ display: 'block' }}>{teaser}</div>}
        </div>
        <svg className="accordion-chevron" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div className="accordion-body">
        <div className="accordion-body-inner">{children}</div>
      </div>
    </div>
  );
}

/* ── TABS ────────────────────────────────────────────────── */
function Tabs({ tabs, renderContent }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="tab-bar">
        {tabs.map((t, i) => (
          <button key={i} className={`tab-btn${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}>
            {t}
          </button>
        ))}
      </div>
      <div className="tab-content" key={active}>
        {renderContent(active)}
      </div>
    </div>
  );
}

/* ── EXERCISE ROW ────────────────────────────────────────── */
function ExerciseRow({ name, sets, reps, rest, muscle, technique, tips, mistakes }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`exercise-row${open ? ' open' : ''}`}>
      <button className="exercise-header" onClick={() => setOpen(o => !o)}>
        <span className="exercise-name">{name}</span>
        <span className="exercise-meta">{sets} סטים</span>
        <span className="exercise-meta">{reps} חזרות</span>
        <span className="exercise-meta">{rest}</span>
        <svg className="exercise-expand-icon" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div className="exercise-detail">
        <div className="exercise-detail-inner">
          <div className="exercise-detail-block">
            <div className="exercise-detail-block-title">שריר עיקרי</div>
            <p>{muscle}</p>
          </div>
          <div className="exercise-detail-block">
            <div className="exercise-detail-block-title">ביצוע טכני</div>
            <p>{technique}</p>
          </div>
          <div className="exercise-detail-block">
            <div className="exercise-detail-block-title">טיפים</div>
            <p>{tips}</p>
          </div>
          <div className="exercise-detail-block">
            <div className="exercise-detail-block-title">טעויות נפוצות</div>
            <p style={{ color: 'var(--color-error)' }}>{mistakes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── WAVE LOADER ─────────────────────────────────────────── */
function WaveLoader() {
  return (
    <div className="wave-loader">
      {[12, 16, 20, 14, 18].map((h, i) => (
        <div key={i} className="wave-bar" style={{ height: h, animationDelay: i * 0.1 + 's' }} />
      ))}
    </div>
  );
}

/* ── EXPORT ──────────────────────────────────────────────── */


// ──────────────────────────────────────────────────
// sidebar.jsx
// ──────────────────────────────────────────────────

// sidebar.jsx

const CHAPTERS = [
  { id: 'section-intro',    num: '00', label: 'מבוא' },
  { id: 'section-bloating', num: '01', label: 'סוג הנפיחות שלך' },
  { id: 'chapter-1',        num: '02', label: 'תזונה אנטי-דלקתית' },
  { id: 'chapter-2',        num: '03', label: 'בריאות המעיים' },
  { id: 'chapter-3',        num: '04', label: 'תוכנית אימון' },
  { id: 'chapter-4',        num: '05', label: 'אורח חיים' },
  { id: 'chapter-5',        num: '06', label: 'תוכנית 4 שבועות' },
];

function Sidebar({ activeSection, completedSections }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setBookmarks(JSON.parse(localStorage.getItem('guide_bookmarks') || '[]'));
    };
    load();
    window.addEventListener('bookmarks-changed', load);
    return () => window.removeEventListener('bookmarks-changed', load);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="sidebar-logo">
        <img src="../assets/elice-logo-purple.png" alt="Elice Fit" />
      </div>

      <div className="sidebar-section-title">פרקים</div>

      {CHAPTERS.map(ch => {
        const isActive = activeSection === ch.id;
        const isDone   = completedSections.includes(ch.id);
        return (
          <button
            key={ch.id}
            className={`sidebar-chapter${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
            onClick={() => scrollTo(ch.id)}
          >
            <span className="sidebar-chapter-num">{ch.num}</span>
            <span className="sidebar-chapter-name">{ch.label}</span>
            <div className="sidebar-check">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12l5 5L20 7"/>
              </svg>
            </div>
          </button>
        );
      })}

      {bookmarks.length > 0 && (
        <div className="sidebar-bookmark-list">
          <div className="sidebar-bookmark-title">סימניות</div>
          {bookmarks.map(bm => (
            <div key={bm.id} className="bookmark-item" onClick={() => scrollTo(bm.id)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
              </svg>
              {bm.label}
            </div>
          ))}
        </div>
      )}

      {/* Resume Banner */}
      <ResumeBanner />
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="guide-sidebar">
        <SidebarContent />
      </nav>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 599, backdropFilter: 'blur(4px)'
        }} onClick={() => setMobileOpen(false)} />
      )}
      <nav className={`guide-sidebar${mobileOpen ? ' mobile-open' : ''}`}
        style={{ display: mobileOpen ? 'flex' : undefined }}>
        <SidebarContent />
      </nav>

      {/* Mobile toggle button */}
      <button className="mobile-toc-btn" onClick={() => setMobileOpen(o => !o)}
        aria-label="תפריט פרקים">
        {mobileOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="17" x2="21" y2="17"/>
          </svg>
        )}
      </button>
    </>
  );
}

function ResumeBanner() {
  const [show, setShow] = useState(false);
  const [savedPct, setSavedPct] = useState(0);

  useEffect(() => {
    const pos = parseInt(localStorage.getItem('guide_scroll_pos') || '0');
    const pct = parseInt(localStorage.getItem('guide_scroll_pct') || '0');
    if (pos > 300 && pct > 5) { setShow(true); setSavedPct(pct); }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      margin: '12px 16px',
      padding: '14px 16px',
      background: 'var(--guide-rose-light)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid rgba(232,93,117,0.2)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 6 }}>
        המשיכי מאיפה שהפסקת
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-fg2)', marginBottom: 10 }}>
        השלמת {savedPct}% מהמדריך
      </div>
      <button
        onClick={() => {
          const pos = parseInt(localStorage.getItem('guide_scroll_pos') || '0');
          window.scrollTo({ top: pos, behavior: 'smooth' });
          setShow(false);
        }}
        style={{
          width: '100%', padding: '8px',
          background: 'var(--color-accent)', color: 'white',
          border: 'none', borderRadius: 'var(--radius-lg)',
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
      >
        חזרי לקריאה
      </button>
    </div>
  );
}



// ──────────────────────────────────────────────────
// hero.jsx
// ──────────────────────────────────────────────────

// hero.jsx — with real content from Elice

function HeroSection() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${y * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById('section-intro');
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  return (
    <section className="hero-section" style={{ minHeight: '100vh' }}>
      <div className="hero-bg" />
      <div ref={parallaxRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-grid-overlay" />
        <FloatingParticles />
      </div>

      <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          מדריך דיגיטלי פרימיום
          <span style={{ opacity: 0.6, marginRight: 4 }}>·</span>
          Elice Fit
        </div>

        <h1 className="hero-title">
          בניית הגוף<br />
          <span>מבפנים ומבחוץ</span>
        </h1>

        <p className="hero-subtitle">
          המדריך המלא לנשים: בריאות מעיים,<br />
          תזונה חכמה ובניית שריר
        </p>

        <div className="hero-meta">
          {[
            { icon: '📖', label: 'קריאה של ~45 דקות' },
            { icon: '🔬', label: 'מבוסס מדע אמיתי' },
            { icon: '⚡', label: '5 פרקים + תוכנית' },
          ].map((m, i) => (
            <div key={i} className="hero-meta-item">
              <span>{m.icon}</span>
              {m.label}
            </div>
          ))}
        </div>

        <button className="hero-cta" onClick={scrollToContent}>
          התחילי לקרוא
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </div>

      <div className="scroll-indicator">
        <span>גלילה</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}

function FloatingParticles() {
  const particles = [
    { x: '15%', y: '25%', size: 6, delay: 0, dur: 4 },
    { x: '80%', y: '15%', size: 4, delay: 1, dur: 5 },
    { x: '65%', y: '70%', size: 8, delay: 2, dur: 3.5 },
    { x: '30%', y: '60%', size: 5, delay: 0.5, dur: 4.5 },
    { x: '90%', y: '50%', size: 3, delay: 1.5, dur: 6 },
    { x: '10%', y: '75%', size: 7, delay: 3, dur: 4 },
    { x: '50%', y: '85%', size: 4, delay: 2.5, dur: 5 },
    { x: '75%', y: '40%', size: 5, delay: 0.8, dur: 3.8 },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.x, top: p.y,
          width: p.size, height: p.size, borderRadius: '50%',
          background: i % 2 === 0 ? 'rgba(232,93,117,0.5)' : 'rgba(187,178,238,0.5)',
          animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </>
  );
}

function IntroSection() {
  return (
    <section id="section-intro" className="guide-section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div className="chapter-label">
            <div className="chapter-label-line" />
            ברוכה הבאה
          </div>
          <h2 className="chapter-title" style={{ marginBottom: 20 }}>
            המדריך שהייתי רוצה לתת לעצמי לפני עשר שנים
          </h2>
          <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 16 }}>
            המדריך הזה לא עוד מדריך דיאטה. הוא לא אוסף של "טיפים" שקראת מאה פעם באינסטגרם.
            הוא מפת הדרכים שהייתי רוצה לתת לעצמי לפני עשר שנים, כשהבנתי שהבעיה לא הייתה
            שאני אוכלת יותר מדי — אלא שלא הבנתי איך הגוף שלי באמת עובד.
          </p>
          <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
            הגוף של אישה זה לא גרסה קטנה יותר של גוף של גבר. יש לנו מחזור הורמונלי שמשפיע
            על כל דבר, מהמים שאנחנו אוגרות ועד לכמה כוח יש לנו ביום מסוים בחדר כושר. יש לנו
            מיקרוביום מעיים שמדבר ישירות עם האסטרוגן. יש לנו רגישות מיוחדת לקורטיזול.
          </p>
          <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 28 }}>
            במדריך הזה אני הולכת לפרק לך את כל המערכת. <strong style={{color:'var(--color-fg1)'}}>בואי נתחיל.</strong>
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="tag tag-rose">תזונה</span>
            <span className="tag tag-purple">מעיים</span>
            <span className="tag tag-warm">אימון</span>
            <span className="tag" style={{ background: 'rgba(52,199,89,0.1)', color: '#2D9E47' }}>אורח חיים</span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { num: '5', label: 'פרקים מקיפים', icon: '📚' },
              { num: '4', label: 'שבועות תוכנית', icon: '📅' },
              { num: '5 סוגים', label: 'נפיחות לזיהוי', icon: '🔍' },
              { num: '100%', label: 'מותאם לנשים', icon: '♀️' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px 20px', textAlign: 'center',
                boxShadow: 'var(--shadow-soft)',
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900,
                  background: 'linear-gradient(135deg, #E85D75, #BBB2EE)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', lineHeight: 1.1, marginBottom: 6,
                }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--color-fg3)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16,
            background: 'var(--guide-rose-light)',
            border: '1px solid rgba(232,93,117,0.15)',
            borderRadius: 'var(--radius-xl)', padding: '20px 24px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 8 }}>
              מה תמצאי במדריך
            </div>
            {[
              'קוויז לזיהוי סוג הנפיחות האישי שלך',
              'תפריט יומי מלא עם מתכונים',
              'תוכנית אימון של 4 ימים בשבוע',
              'טבלת מעקב ל-4 שבועות שמירה',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--color-fg2)', marginBottom: 6, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}



// ──────────────────────────────────────────────────
// quiz.jsx
// ──────────────────────────────────────────────────

// quiz.jsx — 5 bloating types with FULL real content

const BLOATING_TYPES = [
  {
    id: 'gas',
    title: 'נפיחות גזים',
    emoji: '🫧',
    color: '#E8A87C',
    signs: [
      'הבטן מתנפחת תוך שעה-שעתיים אחרי ארוחה',
      'קולות קרקור וגזים מרובים, לפעמים עם ריח חזק',
      'לחץ ותחושת מלאות באזור הבטן העליונה או התחתונה',
      'לפעמים כאב שמשתחרר אחרי גז',
      'הנפיחות משתחררת לפנות בוקר — מתעוררת עם בטן שטוחה',
    ],
    cause: 'כשמזון לא מתפרק כמו שצריך במעי הדק, הוא מגיע למעי הגס. שם הוא פוגש את חיידקי המעי שמתחילים לתסוס אותו. התוסס הזה מפיק גזים, בעיקר מימן ומתאן. הסיבות הנפוצות: פחמימות FODMAP (שום, בצל, קטניות, כרובית), חוסר אנזימי עיכול, ו-SIBO — צמיחת יתר של חיידקים במעי הדק.',
    solutions: [
      'להאט את קצב האכילה — לעיסה 20-30 פעם לכל ביס',
      'יומן מזון לשבועיים לזיהוי טריגרים אישיים',
      'תה נענע, ג\'ינג\'ר ושומר אחרי ארוחה — זה לא אגדה, זה עובד',
      'חומץ תפוחים מדולל במים 10 דקות לפני הארוחה (אם אין צרבות)',
      'אם הבעיה חמורה — בדיקת נשיפה ל-SIBO אצל גסטרואנטרולוג',
    ],
  },
  {
    id: 'hormonal',
    title: 'נפיחות הורמונלית',
    emoji: '🌊',
    color: '#BBB2EE',
    signs: [
      'מופיעה 7-10 ימים לפני הווסת, נעלמת ביום 1-2 של הדימום',
      'כאבי שד, תנודות מצב רוח, כאבי ראש',
      'נפיחות לא רק בבטן — גם פנים, אצבעות, קרסוליים',
      'הגוף מרגיש "כבד"',
      'עלייה של קילו עד שלושה בלילה אחד',
    ],
    cause: 'בשבוע לפני הווסת רמות האסטרוגן יורדות והפרוגסטרון עולה. הפרוגסטרון מאט את תנועת המעיים. האסטרוגן גורם לאגירת מים ונתרן. התוצאה: שילוב של נפיחות מים, גזים ותנועה איטית. אצל נשים עם PMS חמור, PCOS או פרימנופאוזה — חזקה במיוחד.',
    solutions: [
      'מעקב אחר המחזור באפליקציה — לדעת מתי לצפות',
      'צמצום נתרן שבוע לפני הווסת (להימנע ממזון מעובד)',
      'הגדלת אשלגן — אבוקדו, בננה, בטטה, תרד, קיווי',
      'לשתות יותר מים (לא פחות!) — גוף ספוג מים לא אוגר',
      'זרעי פשתן טחונים — קושרים אסטרוגן עודף ומסייעים לפינוי',
      'אימון כוח בימים האלה — מפחית דלקת ומשפר פינוי הורמוני',
    ],
  },
  {
    id: 'constipation',
    title: 'נפיחות עצירות',
    emoji: '🪨',
    color: '#E85D75',
    signs: [
      'לא מתרוקנת כל יום — לפעמים יומיים-שלושה ויותר',
      'צואה יבשה וקשה',
      'תחושת מלאות כבדה בבטן התחתונה',
      'הנפיחות מחמירה עם הזמן לאורך היום, לא קשורה לארוחה ספציפית',
      'פריחות בפנים או באזור הסנטר',
    ],
    cause: 'שילוב של: חוסר בסיבים (רוב הנשים על 15 גרם, צריך 25-35), חוסר מים, חוסר תנועה, חוסר מגנזיום, לחץ כרוני, ולפעמים בלוטת תריס איטית. כשאין מספיק נוזלים, הסיבים לא יכולים לעשות את עבודתם.',
    solutions: [
      'שתי כוסות מים גדולות על קיבה ריקה לפני הקפה — כל יום',
      'כף זרעי פשתן טחונים ביום (מוסיפה ליוגורט, שייק, סלט)',
      'מגנזיום ציטראט 300-400 מ"ג בערב — שינוי חיים',
      'הליכה 20 דקות אחרי ארוחת בוקר — מפעילה רפלקס גסטרוקולי',
      'שעת שירותים קבועה בבוקר — המעי לומד הרגל',
      'לבדוק TSH, FT3, FT4 אם הבעיה קיצונית',
    ],
  },
  {
    id: 'sensitivity',
    title: 'נפיחות רגישות מזון',
    emoji: '🥛',
    color: '#34C759',
    signs: [
      'הנפיחות מופיעה בעקבות מזון ספציפי, תוך 20 דקות עד שעתיים',
      'מרגישה מיד שמשהו לא בסדר',
      'לפעמים: פריחה בעור, ערפל מוחי, כאבי ראש, עייפות פתאומית',
      'לפעמים שלשולים, לפעמים עצירות, לפעמים גם וגם',
      'אכלת את אותו מזון שנים ופתאום זה מתחיל',
    ],
    cause: 'זה לא תמיד אלרגיה קלאסית — לרוב רגישות שבה המערכת החיסונית מגיבה בצורה מעודנת. הרגישויות הנפוצות: לקטוז, גלוטן, ביצים, סויה, FODMAP. מעי דולף — כשדופן המעי מאבד שלמות וחלבוני מזון לא שלמים עוברים לדם — הוא גורם מרכזי לרגישויות שמתפתחות בגיל מבוגר.',
    solutions: [
      'דיאטת אלימינציה 3 שבועות — מסירים גלוטן, חלב, ביצים, סויה, סוכר, אלכוהול',
      'אחרי 3 שבועות — מחזירים מזון אחד כל 3 ימים ובודקים',
      'L-גלוטמין, אבץ, שמן דגים, קולוסטרום — לריפוי דופן המעי',
      'להימנע ממזון מעובד לחלוטין',
      'בדיקות דם לרגישויות לרוב לא מדויקות — תהליך אלימינציה עדיף',
    ],
  },
  {
    id: 'stress',
    title: 'נפיחות סטרס וקורטיזול',
    emoji: '😤',
    color: '#FF9500',
    signs: [
      'לא קשורה לשום מזון ספציפי',
      'מופיעה בתקופות לחוצות גם בלי קשר לאכילה',
      'הבטן נראית "קשה", לא "רכה"',
      'שומן נאגר בעיקר סביב הבטן',
      'חשק עז לסוכר ומלוח בשעות אחה"צ-ערב',
      'מתעוררת עייפה גם אחרי 8 שעות שינה',
    ],
    cause: 'קורטיזול אמור לעלות בבוקר ולרדת בערב. בלחץ כרוני — הוא נשאר גבוה כל היום. התוצאה: אגירת נוזלים, האטת עיכול, שיבוש חיידקי המעי, אגירת שומן ויסצרלי (סביב האיברים). שומן זה פעיל הורמונלית ומפריש חומרים דלקתיים שמחזקים את המעגל.',
    solutions: [
      'שינה 7-9 שעות — לא ניתן לפיצוי. זה הבסיס',
      'לא להוסיף HIIT בזמן סטרס — מעלה קורטיזול עוד יותר',
      'נשימת 4-7-8 פעמיים ביום (בוקר + לפני שינה)',
      'בוקר איטי — 20 דקות בלי טלפון ומיילים',
      'אשוואגנדה 600 מ"ג בערב, רודיולה בבוקר',
      'הליכה ביום בלי טלפון — 20 דקות, זה תרופה',
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'מתי הנפיחות בדרך כלל מתגברת?',
    opts: [
      { emoji: '🍽️', label: 'תוך שעה-שעתיים אחרי ארוחה', type: 'gas' },
      { emoji: '📅', label: 'שבוע לפני המחזור', type: 'hormonal' },
      { emoji: '🔄', label: 'לאורך כל היום, לא קשור לאכילה', type: 'constipation' },
      { emoji: '😤', label: 'בתקופות לחץ וסטרס', type: 'stress' },
    ],
  },
  {
    q: 'איך הבטן מרגישה?',
    opts: [
      { emoji: '🫧', label: 'מלאה גזים ורעשים', type: 'gas' },
      { emoji: '💧', label: 'כבדה ונפוחה, גם פנים ואצבעות', type: 'hormonal' },
      { emoji: '🪨', label: 'קשה, תחושת מלאות בתחתית', type: 'constipation' },
      { emoji: '🎈', label: 'מתנפחת אחרי מזון ספציפי', type: 'sensitivity' },
    ],
  },
  {
    q: 'מה מצב התנועתיות שלך?',
    opts: [
      { emoji: '💨', label: 'גזים מרובים, לפעמים עם ריח', type: 'gas' },
      { emoji: '🌊', label: 'שלשולים או רגישות מחזורית', type: 'sensitivity' },
      { emoji: '🐢', label: 'עצירות — יומיים-שלושה בלי יציאה', type: 'constipation' },
      { emoji: '✅', label: 'תקינה, הבעיה היא רק הנפיחות', type: 'stress' },
    ],
  },
  {
    q: 'האם יש תסמינים נוספים?',
    opts: [
      { emoji: '😣', label: 'כאבי בטן שמשתחררים אחרי גז', type: 'gas' },
      { emoji: '😔', label: 'כאבי שד, תנודות מצב רוח', type: 'hormonal' },
      { emoji: '🤯', label: 'ערפל מוחי, עייפות, פריחה בעור', type: 'sensitivity' },
      { emoji: '😓', label: 'עלייה בבטן, חשקים בסוכר', type: 'stress' },
    ],
  },
  {
    q: 'מתי הנפיחות נעלמת?',
    opts: [
      { emoji: '🌅', label: 'בבוקר — מתעוררת עם בטן שטוחה', type: 'gas' },
      { emoji: '🩸', label: 'עם תחילת הווסת', type: 'hormonal' },
      { emoji: '🚽', label: 'אחרי יציאה', type: 'constipation' },
      { emoji: '🧘', label: 'לא ממש נעלמת', type: 'stress' },
    ],
  },
  {
    q: 'מה הכי מחמיר את הנפיחות?',
    opts: [
      { emoji: '🫘', label: 'קטניות, כרוב, שום, בצל', type: 'gas' },
      { emoji: '🧀', label: 'מוצרי חלב', type: 'sensitivity' },
      { emoji: '🍞', label: 'לחם ומוצרי גלוטן', type: 'sensitivity' },
      { emoji: '⚡', label: 'סטרס ולחץ, ללא קשר למזון', type: 'stress' },
    ],
  },
];

function getResultType(answers) {
  const scores = {};
  BLOATING_TYPES.forEach(t => scores[t.id] = 0);
  answers.forEach(a => { if (a) scores[a] = (scores[a] || 0) + 1; });
  return Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
}

function BloatingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const select = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setResult(getResultType(newAnswers));
      }
    }, 300);
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  if (result) {
    const t = BLOATING_TYPES.find(x => x.id === result);
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div style={{ fontSize: 52, marginBottom: 12 }}>{t.emoji}</div>
          <div className="quiz-result-type" style={{ color: t.color }}>{t.title}</div>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            padding: 20, textAlign: 'right', marginTop: 20, marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 12, letterSpacing: '0.08em' }}>
              מה עוזר עבורך
            </div>
            {t.solutions.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
              </div>
            ))}
          </div>
          <button onClick={reset} style={{
            background: 'none', border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)', padding: '8px 20px', cursor: 'pointer',
            fontSize: 13, color: 'var(--color-fg3)', fontFamily: 'var(--font-body)',
          }}>ענה שוב</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz-container">
      <div className="quiz-step-indicator">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} className={'quiz-dot' + (i === step ? ' active' : '') + (i < step ? ' done' : '')} />
        ))}
      </div>
      <div key={step} style={{ animation: 'fade-scale 0.3s var(--anim-ease)' }}>
        <p className="quiz-question">{q.q}</p>
        <div className="quiz-options">
          {q.opts.map(function(opt, i) {
            return (
              <button key={i} className="quiz-option-btn" onClick={function() { select(opt.type); }}>
                <span className="quiz-option-emoji">{opt.emoji}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--color-fg3)' }}>
        שאלה {step + 1} מתוך {QUIZ_QUESTIONS.length}
      </div>
    </div>
  );
}

function BloatingSection() {
  return (
    <section id="section-bloating" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="סקשן פתיחה"
        title='לא כל נפיחות נולדת שווה. תזהי את שלך'
        desc="לפני שמדברות על תזונה, מעיים או אימון, יש שאלה אחת שאני מבקשת ממך לענות עליה. איזה סוג נפיחות יש לך?"
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 32, maxWidth: 700 }}>
          רוב הנשים לא יודעות. הן קוראות לזה "בטן נפוחה" וחושבות שזה דבר אחד. האמת היא שיש לפחות חמישה סוגי נפיחות שונים, ולכל אחד יש גורמים אחרים ופתרונות אחרים.
          מה שעובד לאחת בדיוק לא יעבוד לשנייה.
        </p>
      </Reveal>

      {/* Quiz */}
      <Reveal>
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)', padding: '40px 32px',
          boxShadow: 'var(--shadow-soft)', marginBottom: 60,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            גלי את סוג הנפיחות שלך
          </h3>
          <p style={{ fontSize: 13, color: 'var(--color-fg3)', textAlign: 'center', marginBottom: 28 }}>
            6 שאלות קצרות — תוצאה אישית
          </p>
          <BloatingQuiz />
        </div>
      </Reveal>

      {/* 5 type cards */}
      <Reveal>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--color-fg1)' }}>
          5 סוגי הנפיחות — מדריך מלא
        </h3>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 24 }}>
          קראי את כל הכרטיסיות לאט. סמני את מה שמתאים לך.
        </p>
      </Reveal>

      {BLOATING_TYPES.map(function(t, i) {
        return (
          <Reveal key={t.id} delay={i * 0.07}>
            <AccordionCard icon={t.emoji} title={t.title} teaser={t.signs[0]} color={t.color}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>
                  הסימנים שלך
                </div>
                {t.signs.map(function(s, j) {
                  return (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                      <span style={{ color: t.color, flexShrink: 0 }}>›</span>{s}
                    </div>
                  );
                })}
              </div>

              <div style={{ background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>מה גורם לזה</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{t.cause}</p>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>מה עוזר</div>
                {t.solutions.map(function(s, j) {
                  return (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                      <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                    </div>
                  );
                })}
              </div>
            </AccordionCard>
          </Reveal>
        );
      })}

      <Reveal>
        <div className="side-note" style={{ marginTop: 32 }}>
          <strong>הרבה נשים מזהות יותר מסוג אחד.</strong> זה בסדר ונורמלי. תתחילי מהסוג שהכי דומיננטי אצלך,
          ואחרי חודש-שניים תזהי שרוב הסוגים האחרים נרגעים יחד.
        </div>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        <BookmarkBtn id="section-bloating" label="סוג הנפיחות שלך" />
      </div>
    </section>
  );
}



// ──────────────────────────────────────────────────
// chapter1.jsx
// ──────────────────────────────────────────────────

// chapter1.jsx — תזונה — FULL REAL CONTENT

const PRINCIPLES = [
  {
    num: 1, icon: '🥩', title: 'חלבון בכל ארוחה',
    desc: 'אשה שמתאמנת כוח צריכה 1.5-2 גרם חלבון לקילו משקל גוף ביום. 20-40 גרם חלבון בכל ארוחה. ארוחה של קפה עם לחמנייה היא לא ארוחה — זה חטיף פחמימה.',
    sources: 'ביצים, עוף, הודו, דג (סלמון, טונה, מקרל), יוגורט יווני, קוטג\', טופו, טמפה, עדשים.',
    why: 'חלבון הוא הלבנה. בלעדיו אין בנייה של שריר, אין תחושת שובע, אין איזון הורמונלי. גרם וחצי לקילו = 97 גרם ליום לאישה של 65 ק"ג.',
  },
  {
    num: 2, icon: '🌾', title: 'סיבים בכמות הנכונה',
    desc: 'מטרה: 25-35 גרם סיבים ביום. רוב הנשים על 15 גרם ומטה. הפער הזה הוא הסיבה לעצירות, נפיחות, חשקים בסוכר ולחץ דם לא יציב.',
    sources: 'ירקות, פירות, קטניות, אגוזים, זרעים ודגנים מלאים. 2 כפות ירקות בצהריים ובערב + פרי ביום + זרעים בבוקר.',
    why: 'סיבים מזינים חיידקי מעי טובים, מאזנים סוכר בדם ומסייעים לפינוי אסטרוגן עודף.',
  },
  {
    num: 3, icon: '🫒', title: 'שומנים טובים בלי פחד',
    desc: 'השנים של דיאטת דלת-שומן הרסו את בריאות הנשים. ההורמונים שלך בנויים מכולסטרול. שומן הוא לא אויב.',
    sources: 'שמן זית כתית, אבוקדו, שקדים, אגוזי מלך, טחינה גולמית, זרעים, ביצים שלמות עם חלמון, דגים שומניים.',
    why: 'לא מרגרינה, לא שמנים מזוקקים (שמן תירס, חמניות, קנולה תעשייתי). שומן טוב תומך בהורמונים, מוח, עור ומעי.',
  },
  {
    num: 4, icon: '🍠', title: 'פחמימות מורכבות, לא פשוטות',
    desc: 'פחמימה טובה: תפוח אדמה עם הקליפה, בטטה, קינואה, שיבולת שועל, אורז מלא, כוסמת, לחם מחמצת איכותי.',
    sources: 'לא קמח לבן, לא סוכר לבן, לא מאפים תעשייתיים. ההבדל הוא בקצב שחרור הסוכר לדם.',
    why: 'פחמימות מורכבות שומרות על אנרגיה יציבה ולא יוצרות פיקים וקרסאות — זה מה שגורם לחשקים ולנפיחות.',
  },
  {
    num: 5, icon: '🧘', title: 'אכילה שקטה וסדר ארוחות',
    desc: 'את יכולה לאכול את התפריט המושלם, אבל אם את אוכלת בעצבים, בהסחת דעת או בעמידה — הגוף לא יעכל טוב.',
    sources: 'לשבת. שלוש נשימות לפני. ללעוס 20-30 פעם. להניח סכין ומזלג בין ביסים. לא לגלול.',
    why: 'אכילה מתבצעת במערכת הפרסימפתטית. מתח מעביר למצב "הילחם או ברח" שסוגר את מערכת העיכול.',
  },
];

const WORKDAY_MEALS = [
  { time: '07:00-09:00', name: 'ארוחת בוקר', items: 'חביתה משלוש ביצים עם בצל ירוק ופטרוזיליה + 2 מלפפונים + 2 עגבניות שרי + כף טחינה גולמית + פרוסת לחם מחמצת + חצי אבוקדו. אפשרות 2: קערת יוגורט יווני עם כף זרעי צ\'יה, פירות יער, כף שקדים טחונים, מעט דבש. אפשרות 3: שייק חלבון, חופן תרד, חצי בננה, כף טחינה, כוס חלב שקדים.', protein: '25g', cal: '420' },
  { time: '10:30-11:00', name: 'נשנוש (אופציונלי)', items: 'תפוח עם כף שקדים / יוגורט קטן / 2 תמרים עם 3 אגוזי מלך', protein: '6g', cal: '150' },
  { time: '13:00-14:00', name: 'ארוחת צהריים', items: 'סלט גדול מאוד של עלים, מלפפון, עגבנייה, גזר, פלפל, כרוב, בצל ירוק ונבטים + חזה עוף צרוב 120-150g / דג / טופו + חצי תפוח אדמה אפוי עם קליפה / 3 כפות קינואה + רוטב שמן זית ולימון', protein: '35g', cal: '480' },
  { time: '16:00-17:00', name: 'נשנוש', items: 'שוקולד מריר 70%+ / חופן אגוזים לא קלויים / חומוס עם ירקות / ביצה קשה עם מלפפון', protein: '8g', cal: '180' },
  { time: '19:00-20:00', name: 'ארוחת ערב', items: 'דג סלמון אפוי עם ברוקולי ושעועית ירוקה / סלט גדול עם ביצים + קוטג\' + טחינה / שקשוקה + פרוסת לחם מחמצת / קציצות הודו עם סלט יווני', protein: '30g', cal: '380' },
];

const TRAINING_MEALS = [
  { time: '07:00-09:00', name: 'ארוחת בוקר', items: 'אותו הדבר כמו יום עבודה', protein: '25g', cal: '420' },
  { time: '13:00-14:00', name: 'ארוחת צהריים', items: 'אותו הדבר + עוד חצי כוס פחמימה אם מתאמנת קשה', protein: '35g', cal: '550' },
  { time: '16:30', name: 'לפני אימון (60-90 דקות לפני)', items: 'תפוח עם כף חמאת שקדים / יוגורט עם גרנולה ביתית / פרוסת לחם מחמצת עם ביצה / קפה עם בננה. לא לאכול גבינה צהובה, בשר שומני או סלט שמן — יגרמו לכבדות', protein: '10g', cal: '200' },
  { time: '20:00', name: 'אחרי אימון (עד שעה מסיום)', items: 'חזה עוף + אורז מלא + שעועית ירוקה / סלמון + בטטה + תרד / חביתה + פיתה מלאה + ירקות / יוגורט יווני גדול + גרנולה + בננה. חייב: 20-40g חלבון + 30-40g פחמימה מורכבת. בלי פחמימה — הגוף שורף שריר לאנרגיה', protein: '40g', cal: '500' },
];

const FOODS = [
  { name: 'ביצים חופש', cat: 'protein', per: '2-3 ביצים', note: 'גם החלמון!' },
  { name: 'חזה עוף', cat: 'protein', per: '120-150g', note: 'ארגני אם אפשר' },
  { name: 'דג סלמון', cat: 'protein', per: '150g', note: 'עשיר אומגה-3' },
  { name: 'טונה במים', cat: 'protein', per: 'פחית', note: 'לא בשמן' },
  { name: 'יוגורט יווני', cat: 'protein', per: '150-200g', note: 'תרביות חיות' },
  { name: 'קוטג\' 5%', cat: 'protein', per: '200g', note: 'נח, שובע, מהיר' },
  { name: 'עדשים מבושלות', cat: 'protein', per: 'כוס', note: 'השרייה 8 שעות' },
  { name: 'טופו טרי', cat: 'protein', per: '150g', note: 'לא מפוסטר' },
  { name: 'טמפה', cat: 'protein', per: '100g', note: 'מותסס, מעולה למעי' },
  { name: 'בטטה', cat: 'carb', per: 'בינונית', note: 'עם קליפה' },
  { name: 'תפוח אדמה אדום', cat: 'carb', per: 'בינוני', note: 'עם קליפה' },
  { name: 'קינואה', cat: 'carb', per: 'חצי כוס מבושל', note: 'ללא גלוטן' },
  { name: 'שיבולת שועל', cat: 'carb', per: '50g', note: 'לא אינסטנט' },
  { name: 'אורז מלא / בסמטי', cat: 'carb', per: 'חצי כוס מבושל', note: '' },
  { name: 'לחם מחמצת', cat: 'carb', per: 'פרוסה', note: 'לא תעשייתי!' },
  { name: 'כוסמת / פריקה', cat: 'carb', per: 'חצי כוס', note: 'מגוון טוב' },
  { name: 'שמן זית כתית', cat: 'fat', per: 'כף', note: 'לסלטים בלבד' },
  { name: 'אבוקדו', cat: 'fat', per: 'חצי', note: 'עשיר אשלגן' },
  { name: 'טחינה גולמית', cat: 'fat', per: 'כף-שתיים', note: 'ייצור ישראלי' },
  { name: 'שקדים', cat: 'fat', per: '30g', note: 'לא קלויים/מלוחים' },
  { name: 'אגוזי מלך', cat: 'fat', per: '30g', note: 'עשיר אומגה-3' },
  { name: 'זרעי פשתן טחונים', cat: 'fat', per: '2 כפות', note: 'חייב טחון!' },
  { name: 'ברוקולי', cat: 'veg', per: 'כוס', note: 'עדיף מאודה קל' },
  { name: 'רוקט/ארוגולה', cat: 'veg', per: 'חופן גדול', note: 'מגרה עיכול' },
  { name: 'תרד', cat: 'veg', per: '2 כוסות', note: 'טרי או קפוא' },
  { name: 'כרוב סגול', cat: 'veg', per: '2 כוסות', note: 'אנתוציאנינים' },
  { name: 'נבטי ברוקולי', cat: 'veg', per: 'חופן', note: 'פי 100 סולפורפאן' },
  { name: 'פטרוזיליה/כוסברה', cat: 'veg', per: 'אגד', note: 'עשירות ויטמין K' },
];

const SWAPS = [
  { from: 'לחם לבן תעשייתי', to: 'לחם מחמצת איכותי', tag: 'פחמימה' },
  { from: 'שמן קנולה / חמניות', to: 'שמן זית כתית מעולה', tag: 'שומן' },
  { from: 'יוגורט עם סוכר', to: 'יוגורט יווני טבעי', tag: 'חלב' },
  { from: 'אורז לבן', to: 'קינואה / בטטה / אורז מלא', tag: 'פחמימה' },
  { from: 'סוכר לבן', to: 'תמרים / מייפל טהור / דבש', tag: 'ממתיק' },
  { from: 'חטיפים מלוחים', to: 'חופן שקדים לא קלויים', tag: 'חטיף' },
  { from: 'משקאות ממותקים', to: 'מים עם לימון / תה צמחים', tag: 'שתייה' },
  { from: 'פסטרמה / נקניק', to: 'חזה עוף / טונה במים', tag: 'חלבון' },
  { from: 'מרגרינה', to: 'חמאה / שמן קוקוס לבישול', tag: 'שומן' },
  { from: 'פסטה לבנה', to: 'פסטת דורום מלאה / כוסמת', tag: 'פחמימה' },
];

const GOOD_COMBOS = [
  { title: 'ויטמין C + ברזל צמחי', example: 'לימון על סלט עדשים', why: 'מעלה ספיגת ברזל פי 3' },
  { title: 'שומן טוב + ירקות מבושלים', example: 'שמן זית על ברוקולי', why: 'ויטמינים A,D,E,K נספגים רק בשומן' },
  { title: 'פרוביוטיקה + פרהביוטיקה', example: 'יוגורט עם בננה ירוקה', why: 'החיידקים הטובים גדלים על הסיבים' },
  { title: 'סיבים + נוזלים', example: 'שיבולת שועל עם חלב שקדים', why: 'הסיבים זקוקים למים לעבוד' },
];

const BAD_COMBOS = [
  { title: 'פרי על קיבה מלאה', why: 'פרי מתעכל ב-30-45 דקות. כשנתקע מאחורי ארוחה כבדה — מתסוס. לאכול פרי לפני הארוחה.' },
  { title: 'שני חלבונים מרוכזים', example: 'גבינה + ביצים + בשר', why: 'עומס אנזימי גדול, הגוף לא יודע מה לשלוח ראשון' },
  { title: 'פחמימה פשוטה + שומן', example: 'סופגנייה, קרואסון, פיצה', why: 'הצירוף המהיר ביותר לאגירת שומן' },
  { title: 'אלכוהול בזמן ארוחה', why: 'אלכוהול משתק עיכול ומגביר ספיגת שומן. אם רוצה — שתי ליד הארוחה, לא בזמן' },
  { title: 'שתייה קרה עם ארוחה כבדה', why: 'קור מכווץ קיבה ומאט עיכול. שתייה בטמפרטורת החדר עדיפה' },
];

function MealRow({ m }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 16, padding: '16px 20px', marginBottom: 10, alignItems: 'flex-start' }}>
      <div style={{
        background: 'var(--guide-rose-light)', borderRadius: 'var(--radius-lg)',
        padding: '6px 10px', fontSize: 11, fontWeight: 700,
        color: 'var(--color-accent)', flexShrink: 0, minWidth: 64, textAlign: 'center',
      }}>{m.time}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.name}</div>
        <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{m.items}</p>
      </div>
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-accent)' }}>{m.protein}</div>
        <div style={{ fontSize: 10, color: 'var(--color-fg3)' }}>חלבון</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-fg2)', marginTop: 4 }}>{m.cal}</div>
        <div style={{ fontSize: 10, color: 'var(--color-fg3)' }}>קל</div>
      </div>
    </div>
  );
}

function Chapter1() {
  const [foodFilter, setFoodFilter] = useState('all');
  const [mealTab, setMealTab] = useState(0);

  const filtered = useMemo(function() {
    return FOODS.filter(function(f) { return foodFilter === 'all' || f.cat === foodFilter; });
  }, [foodFilter]);

  const catLabel = { protein: 'חלבון', carb: 'פחמימה', fat: 'שומן', veg: 'ירק' };
  const catClass = { protein: 'cat-protein', carb: 'cat-carb', fat: 'cat-fat', veg: 'cat-veg' };
  const meals = mealTab === 0 ? WORKDAY_MEALS : TRAINING_MEALS;

  return (
    <section id="chapter-1" className="guide-section">
      <ChapterHeader
        label="פרק 1"
        title="תזונה — לאכול נכון זה לא לאכול פחות"
        desc="הגישה שאני מציעה לך שונה. במקום מה אי אפשר לאכול, נדבר על מה אפשר ואיך. במקום ספירת קלוריות, נתעסק בהרכב המזון. במקום להילחם ברעב, נאכל כך שנשבע."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          אני הולכת להיות כנה איתך ברגע הראשון. אם היית אוכלת פחות כדי לרדת במשקל, כנראה שכבר היית שם.
          רוב הנשים שאני מכירה ניסו דיאטות מגבילות שוב ושוב. הן איבדו שלושה קילו, חזרו לאכול "נורמלי",
          וצברו חמישה קילו. המעגל הזה שובר גוף, שובר מטבוליזם, ושובר ראש.
        </p>
      </Reveal>

      {/* Principles */}
      <Reveal><h3 style={sH3ch1}>חמשת עקרונות התזונה האנטי-דלקתית</h3></Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 60 }}>
        {PRINCIPLES.map(function(p, i) {
          return (
            <Reveal key={i} delay={i * 0.07}>
              <div className="principle-card">
                <div className="principle-num">{p.num}</div>
                <div className="principle-icon-wrap" style={{ fontSize: 22 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.6, margin: '0 0 8px' }}>{p.desc}</p>
                  <div style={{ fontSize: 13, color: 'var(--color-fg3)', marginBottom: 8 }}><strong>מקורות:</strong> {p.sources}</div>
                  <WhyImportant>{p.why}</WhyImportant>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Plate method */}
      <PullQuote text="לאכול נכון זה לא לאכול פחות. זה לדעת איזה מרכיבים בונים את הגוף שלנו ואיך לשלב אותם." />

      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>מבנה ארוחה אידיאלית</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          בכל ארוחה שאת בונה, הצלחת שלך צריכה להיראות כך: לא קלוריות, לא מאקרוסים — צלחת אחת, ארבעה מרכיבים.
        </p>
        <div className="card-grid-2" style={{ marginBottom: 40 }}>
          {[
            { pct: '½', icon: '🥗', label: 'ירקות', desc: 'חצי חי וחצי מבושל, מגוון צבעים', color: '#34C759' },
            { pct: '¼', icon: '🍗', label: 'חלבון', desc: 'מקור חלבון אמיתי — לא כף טחינה', color: '#E85D75' },
            { pct: '¼', icon: '🍠', label: 'פחמימה מורכבת', desc: 'חצי כוס מבושל: אורז, בטטה, קינואה', color: '#FF9500' },
            { pct: '+', icon: '🫒', label: 'שומן טוב', desc: 'כף שמן זית, אבוקדו, או אגוזים', color: '#BBB2EE' },
          ].map(function(r, i) {
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: r.color, lineHeight: 1, marginBottom: 8 }}>{r.pct}</div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{r.label}</div>
                  <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0 }}>{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Meal plans */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>תפריט לדוגמה: יום שלם</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="tab-bar" style={{ marginBottom: 24 }}>
          {['יום עבודה רגיל', 'יום עם אימון'].map(function(t, i) {
            return (
              <button key={i} className={'tab-btn' + (mealTab === i ? ' active' : '')}
                onClick={function() { setMealTab(i); }}>{t}</button>
            );
          })}
        </div>
        <div key={mealTab} style={{ animation: 'fade-scale 0.3s var(--anim-ease)' }}>
          {meals.map(function(m, i) { return <MealRow key={i} m={m} />; })}
        </div>
      </Reveal>

      {/* Food Database */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>מאגר מוצרים: מה לקנות בסופר</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 20 }}>
          כשהמקרר שלך נראה נכון, את מנצחת. זה המאגר שאת רוצה לשמור בבית כל הזמן.
        </p>
        <div className="filter-bar">
          {[['all','הכל'],['protein','חלבון'],['carb','פחמימה'],['fat','שומן'],['veg','ירקות']].map(function(item) {
            return (
              <button key={item[0]} className={'filter-btn' + (foodFilter === item[0] ? ' active' : '')}
                onClick={function() { setFoodFilter(item[0]); }}>{item[1]}</button>
            );
          })}
        </div>
        <div className="food-table-wrap">
          <table className="food-table">
            <thead><tr><th>מזון</th><th>קטגוריה</th><th>מנה</th><th>הערה</th></tr></thead>
            <tbody>
              {filtered.map(function(f, i) {
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{f.name}</td>
                    <td><span className={'food-cat-badge ' + catClass[f.cat]}>{catLabel[f.cat]}</span></td>
                    <td>{f.per}</td>
                    <td style={{ color: 'var(--color-fg3)', fontSize: 13 }}>{f.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Swap Bank */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>בנק ההחלפות</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 16 }}>לא תמיד יש את מה שצריך. הנה החלפות חכמות שלא מקריבות תוצאות:</p>
        {SWAPS.map(function(s, i) {
          return (
            <div key={i} className="swap-item">
              <span className="swap-from">{s.from}</span>
              <span className="swap-arrow">←</span>
              <span className="swap-to">{s.to}</span>
              <span className="swap-tag">{s.tag}</span>
            </div>
          );
        })}
      </Reveal>

      {/* Combos */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>שילובי מזון — מה עוזר ומה מזיק</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2D9E47', marginBottom: 12 }}>✅ שילובים שעוזרים</div>
            {GOOD_COMBOS.map(function(c, i) {
              return (
                <div key={i} style={{ marginBottom: 12, padding: '14px 16px', background: 'rgba(52,199,89,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(52,199,89,0.15)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 4 }}>דוגמה: {c.example}</div>
                  <div style={{ fontSize: 12, color: '#2D9E47' }}>{c.why}</div>
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-error)', marginBottom: 12 }}>⚠️ שילובים שכדאי להימנע</div>
            {BAD_COMBOS.map(function(c, i) {
              return (
                <div key={i} style={{ marginBottom: 12, padding: '14px 16px', background: 'rgba(255,59,48,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,59,48,0.12)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                  {c.example && <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 4 }}>{c.example}</div>}
                  <div style={{ fontSize: 12, color: 'var(--color-error)' }}>{c.why}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* What not to keep at home */}
      <Reveal>
        <div className="warning-card" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-error)', marginBottom: 10 }}>
            🚫 מה לא כדאי להשאיר בבית
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['משקאות ממותקים ומוגזים','חטיפי אנרגיה עם סוכר','עוגיות ומאפים תעשייתיים','לחם לבן תעשייתי','יוגורטים עם סוכר מוסף','מרגרינה','שמני קנולה וחמניות תעשייתיים','נקניקיות ופסטרמה מעובדת'].map(function(item, i) {
              return (
                <div key={i} style={{ fontSize: 13, color: 'var(--color-fg2)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--color-error)' }}>✗</span>{item}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-1" label="תזונה" />
      </div>
    </section>
  );
}

const sH3ch1 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };


// ──────────────────────────────────────────────────
// chapter2.jsx
// ──────────────────────────────────────────────────

// chapter2.jsx — בריאות המעיים — FULL REAL CONTENT

const MICRO_FOODS = [
  { name: 'כרוב כבוש לא מפוסטר', emoji: '🥬', dose: 'כפית → כף ביום', strain: 'Lactobacillus', tip: 'חייב להיות מהמקרר, לא מהמדף. רק שם יש חיידקים חיים. בהתחלה כפית אחת, להגדיל בהדרגה.' },
  { name: 'יוגורט עם תרביות חיות', emoji: '🥛', dose: '200g ביום', strain: 'Bifidobacterium', tip: 'חפשי "תרביות חיות ופעילות" על האריזה. קפיר מכיל אפילו יותר מגוון חיידקים. אפשר לעשות קפיר בבית.' },
  { name: 'זרעי פשתן טחונים', emoji: '🌰', dose: '2 כפות ביום', strain: 'פרהביוטיקה + ליגננים', tip: 'חייב שיהיו טחונים. שלמים לא נספגים. לאחסן במקרר עד חודש. מאזן אסטרוגן — לא במקרה.' },
  { name: 'נבטי ברוקולי', emoji: '🥦', dose: 'חופן ביום', strain: 'Sulforaphane', tip: 'פי 100 יותר סולפורפאן מברוקולי בוגר. לנבוט בבית בקלות. חופן בסלט = זהב לבריאות המעי.' },
  { name: 'שום ובצל', emoji: '🧄', dose: '2-3 שיניים ביום', strain: 'אינולין (פרהביוטיקה)', tip: 'שום נא הכי חזק. מכיל אינולין שחיידקים טובים מעריצים. גם אנטיבקטריאלי נגד חיידקים רעים.' },
  { name: 'בננות ירוקות/בוסריות', emoji: '🍌', dose: 'חצי בננה ירוקה', strain: 'עמילן עמיד', tip: 'דווקא הירוקות! מכילות עמילן עמיד שחיידקים טובים מתרבים עליו. אפשר בשייק ירוק.' },
  { name: 'עלים ירוקים מרים', emoji: '🌿', dose: 'חופן גדול לפני ארוחה', strain: 'מגרה חומצת קיבה', tip: 'רוקט, ארוגולה, עולש, חסה אנדיב. כסלט פתיחה — מגרה ייצור חומצת קיבה ואנזימי עיכול.' },
];

function Chapter2() {
  const [hoveredBacteria, setHoveredBacteria] = useState(null);

  const bacteria = [
    { id: 'lacto', label: 'לקטובציל', color: '#E85D75', r: 88, angle: 0, desc: 'מייצרים חומצה לקטית שמגינה מפני פתוגנים. נמצאים ביוגורט, קפיר וכרוב כבוש. חיוניים לבריאות הנרתיק אצל נשים.' },
    { id: 'bifido', label: 'ביפידובקטריה', color: '#BBB2EE', r: 88, angle: 72, desc: 'מייצרים ויטמיני B, מסייעים לעיכול סיבים. 95% מהסרוטונין מיוצר במעי — אלה עוזרים בייצורו.' },
    { id: 'akkerm', label: 'אקרמנסיה', color: '#E8A87C', r: 88, angle: 144, desc: 'מחזקים את רירית המעי ומפחיתים חדירות. נמצאים ברמות גבוהות אצל אנשים בריאים. מגרים על ידי תה ירוק.' },
    { id: 'faecali', label: 'פקאליבקטריה', color: '#34C759', r: 88, angle: 216, desc: 'מייצרים בוטיראט — דלק לתאי המעי. מפחיתים דלקת. מדד לבריאות מיקרוביום. ניזון מסיבים מגוונים.' },
    { id: 'strepto', label: 'סטרפטוקוק', color: '#FF9500', r: 88, angle: 288, desc: 'בכמות מאוזנת תורמים לעיכול פחמימות. עודף קשור לדלקות. מאוזן על ידי מגוון תזונה.' },
  ];

  const cx = 170, cy = 170;

  return (
    <section id="chapter-2" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="פרק 2"
        title="בריאות המעיים — הכל מתחיל פה"
        desc="אם הייתי צריכה לבחור פרק אחד מהמדריך שישנה לך את החיים יותר מכל דבר אחר — זה הפרק הזה."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          המעי הוא לא רק צינור עיכול. הוא המערכת החשובה ביותר לאיזון הורמונלי, לבריאות חיסונית,
          למצב רוח, לעור, לשינה, ואפילו לחשקי האוכל. כן, המעי שלך קובע אם את תרצי פתאום סוכר
          בשעה שלוש בצהריים. זו לא חולשת אופי — זו כימיה.
        </p>
      </Reveal>

      <Reveal>
        <div className="side-note">
          <strong>מה זה מיקרוביום?</strong> כמאה טריליון מיקרואורגניזמים שחיים בגופך. יותר תאים חיידקיים מאנושיים.
          70% ממערכת החיסון שם. 95% מהסרוטונין שם. שינה, עור, הורמונים — הכל מתחיל מהמעי.
        </div>
      </Reveal>

      {/* Microbiome SVG viz */}
      <Reveal><h3 style={sH3ch2}>המיקרוביום שלך — לחצי לפרטים</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="340" height="340" viewBox="0 0 340 340" overflow="visible">
            <defs>
              <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E85D75" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#BBB2EE" stopOpacity="0.03" />
              </radialGradient>
            </defs>
            {[52, 88, 124].map(function(r, i) {
              return (
                <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                  stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 7"
                  style={{ transformOrigin: cx + 'px ' + cy + 'px', animation: 'spin-slow ' + (20 + i * 7) + 's linear infinite' + (i % 2 ? ' reverse' : '') }} />
              );
            })}
            <circle cx={cx} cy={cy} r={44} fill="url(#coreG)" />
            <circle cx={cx} cy={cy} r={34} fill="rgba(232,93,117,0.1)" style={{ animation: 'heartbeat 3s ease-in-out infinite' }} />
            <text x={cx} y={cy-6} textAnchor="middle" fill="var(--color-fg2)" fontSize="9" fontWeight="700" fontFamily="Heebo">100 טריליון</text>
            <text x={cx} y={cy+7} textAnchor="middle" fill="var(--color-fg3)" fontSize="8" fontFamily="Heebo">חיידקים</text>
            {bacteria.map(function(b) {
              var rad = (b.angle - 90) * Math.PI / 180;
              var bx = cx + b.r * Math.cos(rad);
              var by = cy + b.r * Math.sin(rad);
              var isHov = hoveredBacteria === b.id;
              return (
                <g key={b.id}
                  onMouseEnter={function() { setHoveredBacteria(b.id); }}
                  onMouseLeave={function() { setHoveredBacteria(null); }}
                  onClick={function() { setHoveredBacteria(hoveredBacteria === b.id ? null : b.id); }}
                  style={{ cursor: 'pointer' }}>
                  <line x1={cx} y1={cy} x2={bx} y2={by} stroke={b.color} strokeWidth={isHov ? 1.5 : 0.7} strokeOpacity={isHov ? 0.5 : 0.2} style={{ transition: 'all 0.3s' }} />
                  <circle cx={bx} cy={by} r={isHov ? 22 : 17} fill={b.color} fillOpacity={isHov ? 0.22 : 0.12} stroke={b.color} strokeWidth={isHov ? 2 : 1.5} style={{ transition: 'all 0.3s' }} />
                  <circle cx={bx} cy={by} r={4} fill={b.color} />
                  <text x={bx} y={by + (by > cy ? 36 : -28)} textAnchor="middle" fill="var(--color-fg2)" fontSize="9" fontFamily="Heebo" fontWeight="600">{b.label}</text>
                </g>
              );
            })}
          </svg>
          {hoveredBacteria && (function() {
            var b = bacteria.find(function(x) { return x.id === hoveredBacteria; });
            return (
              <div style={{ background: 'var(--color-surface-elevated)', border: '1px solid ' + b.color + '44', borderRadius: 'var(--radius-xl)', padding: '14px 18px', maxWidth: 320, marginTop: 12, animation: 'slide-down 0.25s var(--anim-ease)' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: b.color, marginBottom: 6 }}>{b.label}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            );
          })()}
        </div>
      </Reveal>

      {/* Estrobolome section */}
      <Reveal><h3 style={{ ...sH3ch2, marginTop: 60 }}>הקשר בין מעיים להורמונים</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          במעי שלך יש אוסף חיידקים שנקרא <Tooltip term="אסטרובולום" definition="אוסף החיידקים במעי שאחראים על עיבוד ופינוי האסטרוגן מהגוף." />.
          הכבד שלך מעבד אסטרוגן ושולח אותו למעי לפינוי. אבל אם המעי לא בריא, חיידקים מסוימים מייצרים
          אנזים שמחזיר את האסטרוגן לדם.
        </p>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          התוצאה? <Tooltip term="שליטת אסטרוגן" definition="יותר אסטרוגן יחסית לפרוגסטרון — גורם ל-PMS חמור, דימום כבד, כאבי שד, ציסטות, ועלייה במשקל בירכיים." />:
          נפיחות חמורה לפני מחזור, דימום כבד, כאבי שד, PMS קשה, ציסטות, ועלייה בירכיים וישבן.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '😤', title: 'מצב רוח', desc: '95% מהסרוטונין מיוצר במעי' },
            { icon: '💤', title: 'שינה', desc: 'מלטונין גם מיוצר במעי' },
            { icon: '🛡️', title: 'חסינות', desc: '70% ממערכת החיסון במעי' },
            { icon: '✨', title: 'עור', desc: 'אקנה, רוזצאה — קשורים ישירות למעי' },
            { icon: '🍬', title: 'חשקים', desc: 'חיידקי סוכר שולחים אותות למוח לבקש סוכר' },
          ].map(function(item, i) {
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card" style={{ textAlign: 'center', padding: '20px 14px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 12, color: 'var(--color-fg3)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      <PullQuote text="המעי שלך קובע אם תרצי פתאום סוכר בשלוש אחרי הצהריים. זו לא חולשת אופי, זו כימיה." />

      {/* Probiotics vs Prebiotics */}
      <Reveal><h3 style={{ ...sH3ch2, marginTop: 60 }}>
        <Tooltip term="פרוביוטיקה" definition="חיידקים חיים שמועילים לבריאות כשנצרכים בכמות מספקת." />
        {' מול '}
        <Tooltip term="פרהביוטיקה" definition="סיבים שהגוף לא מעכל, אבל מזינים את חיידקי המעי הטובים." />
        {' — וגם פוסט-ביוטיקה'}
      </h3></Reveal>

      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          <strong>פרוביוטיקה:</strong> חיידקים חיים שמצטרפים לאוכלוסייה שלך — יוגורט, קפיר, כרוב כבוש, קימצ'י, מיסו.
          <br/><strong>פרהביוטיקה:</strong> האוכל של החיידקים — בצל, שום, שיבולת שועל, ארטישוק, בננות ירוקות, תפוחים.
          <br/><strong>פוסט-ביוטיקה:</strong> תוצרי החיידקים — בוטיראט שמרפא את תאי המעי.
        </p>
        <div className="side-note">
          <strong>טעות נפוצה:</strong> לוקחות תוסף פרוביוטיקה אבל לא אוכלות סיבים. זה כמו לזרוק זרעים לשממה.
          אין להם על מה לגדול. חייבים שילוב יומיומי של שניהם — "סינביוטיקה".
        </div>
      </Reveal>

      <Reveal>
        <div className="two-col" style={{ marginTop: 20, marginBottom: 40 }}>
          {[
            { title: 'פרוביוטיקה', emoji: '🦠', color: '#E85D75', sub: 'חיידקים חיים', items: ['יוגורט עם תרביות חיות', 'קפיר (בית או קנוי)', 'כרוב כבוש לא מפוסטר', 'קימצ\'י', 'מיסו', 'קומבוצ\'ה', 'טמפה'] },
            { title: 'פרהביוטיקה', emoji: '🌱', color: '#34C759', sub: 'אוכל לחיידקים', items: ['שום ובצל', 'בננה ירוקה', 'שיבולת שועל', 'ארטישוק', 'אספרגוס', 'תפוחים עם קליפה', 'זרעי פשתן טחונים'] },
          ].map(function(col, i) {
            return (
              <div key={i} className="compare-col">
                <div className="compare-col-header">
                  <div className="compare-col-icon">{col.emoji}</div>
                  <div className="compare-col-title" style={{ color: col.color }}>{col.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginTop: 4 }}>{col.sub}</div>
                </div>
                {col.items.map(function(item, j) {
                  return (
                    <div key={j} className="compare-item">
                      <span className="compare-bullet" style={{ color: col.color }}>›</span>{item}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* 7 foods */}
      <Reveal><h3 style={sH3ch2}>7 מזונות שבונים מיקרוביום בריא</h3></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 60 }}>
        {MICRO_FOODS.map(function(f, i) {
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div className="card" style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.emoji}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.name}</div>
                <div style={{ display: 'inline-block', background: 'var(--guide-rose-light)', color: 'var(--color-accent)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: 6 }}>{f.dose}</div>
                <div style={{ display: 'block', fontSize: 10, color: 'var(--color-purple-deep)', marginBottom: 8, fontWeight: 600 }}>{f.strain}</div>
                <p style={{ fontSize: 12, color: 'var(--color-fg3)', lineHeight: 1.5, margin: 0 }}>{f.tip}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Signs of improvement / warning */}
      <Reveal><h3 style={sH3ch2}>איך יודעים שהמעי משתפר?</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D9E47', marginBottom: 12 }}>✅ סימנים חיוביים</div>
            {['יציאות סדירות ונוחות יותר','פחות גזים','עור משתפר (סנטר ומצח)','שובע גדול יותר אחרי ארוחות','חשקים בסוכר מתחילים להיעלם','שינה טובה יותר','פחות הצטננויות חוזרות'].map(function(s, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-fg2)', marginBottom: 8 }}>
                  <span style={{ color: '#2D9E47' }}>›</span>{s}
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-error)', marginBottom: 12 }}>⚠️ מתי לפנות לרופא</div>
            {['כאבי בטן חזקים או קבועים','דם בצואה','ירידה פתאומית במשקל','חום לא ברור','עצירות/שלשול שנמשכים שבועות','נפיחות כרונית שלא משתפרת מכלום'].map(function(s, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-fg2)', marginBottom: 8 }}>
                  <span style={{ color: 'var(--color-error)' }}>›</span>{s}
                </div>
              );
            })}
            <div className="side-note" style={{ marginTop: 12 }}>
              בדיקות מומלצות: צואה מורחבת (GI-MAP), בדיקת SIBO (נשיפה), calprotectin, אנדוסקופיה אם יש חשד.
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-2" label="בריאות המעיים" />
      </div>
    </section>
  );
}

const sH3ch2 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };


// ──────────────────────────────────────────────────
// chapter3.jsx
// ──────────────────────────────────────────────────

// chapter3.jsx — אימון — FULL REAL CONTENT

const PRINCIPLES_TRAINING = [
  { num: 1, title: 'תנועות מורכבות לפני בידוד', desc: 'סקווט, דדליפט, הרמת ספסל, שכיבות סמיכה, מתח — אלה מה שבונה גוף. תנועות בידוד (ביצפס, ישבן מכשיר) הן תוספת, לא הבסיס. נשים רבות עושות 80% בידוד — טעות.' },
  { num: 2, title: 'העמסה הדרגתית', desc: 'כל שבוע — עוד חצי קילו על המוט, עוד חזרה, עוד סט. הגוף מסתגל למה שנותנים לו. אם את מרימה את אותם 10 ק"ג מזה חצי שנה, הגוף אמר "הבנתי" וסירב להשתפר.' },
  { num: 3, title: 'פחות זה יותר', desc: 'נשים שמתאמנות 6 פעמים בשבוע לרוב לא מתקדמות יותר ממי שמתאמנת 3-4 פעמים בחכמה. הגוף בונה שריר בזמן המנוחה, לא בזמן האימון.' },
  { num: 4, title: 'לאתגר אבל לא להרוג', desc: 'אימון טוב מסתיים בתחושה שיכולת לעשות עוד 2 סטים. בחרי משקל שמאפשר לבצע חזרות עם 2 אחרונות קשות, אבל בטכניקה שלמה.' },
  { num: 5, title: 'רישום — כלי הכי חשוב', desc: 'כל אימון: תרגיל, משקל, חזרות, סטים. Strong, Hevy, Fitbod, או מחברת. בלי רישום לא יודעת אם מתקדמת. עם רישום — כל שבוע שחור על לבן.' },
];

const WEEKLY = [
  { day: 'ראשון', type: 'יום A', icon: '🏋️', color: '#E85D75', note: 'ישבן וקוודריצפס + 30 דק\' הליכה' },
  { day: 'שני',    type: 'הליכה',  icon: '🚶', color: '#34C759', note: '45 דק\' קרדיו זון 2' },
  { day: 'שלישי', type: 'יום B',  icon: '🏋️', color: '#BBB2EE', note: 'גב וכתפיים' },
  { day: 'רביעי', type: 'מנוחה / יוגה', icon: '🧘', color: '#E8A87C', note: 'שחרור' },
  { day: 'חמישי', type: 'יום C',  icon: '🏋️', color: '#E85D75', note: 'רגליים אחוריות + 20 דק\' הליכה' },
  { day: 'שישי',  type: 'יום D',  icon: '🏋️', color: '#34C759', note: 'חזה וידיים' },
  { day: 'שבת',   type: 'מנוחה',  icon: '😴', color: '#86868B', note: 'חיוני! שריר נבנה במנוחה' },
];

const DAYS = {
  A: {
    title: 'יום A', sub: 'פלג גוף תחתון | ישבן וקוודריצפס', color: '#E85D75',
    exercises: [
      { name: 'סקווט עם מוט (Barbell Squat)', sets: 4, reps: '8-10', rest: '2 דק\'', muscle: 'קוודריצפס, ישבן', technique: 'המוט על חלק עליון הכתפיים, לא הצוואר. רגליים קצת יותר רחבות מרוחב כתפיים. עקבים על הרצפה. ישבן יורד אחורה ולמטה. להגיע לפחות לגובה שבו הירך מקבילה לרצפה. להידחף מהעקבים.', tips: 'להתחיל בלי משקל, ללמוד התנועה, ואז להוסיף מוט.', mistakes: 'עקבים מורמים, ברכיים נסגרות פנימה, אי הגעה לעומק.' },
      { name: 'Hip Thrust עם מוט', sets: 4, reps: '10-12', rest: '90 שנ\'', muscle: 'ישבן (gluteus maximus)', technique: 'כתפיים על ספסל נמוך. מוט עם כרית על האגן. כפות רגליים שטוחות ברוחב כתפיים. עלייה עד קו ישר ברכיים-ישבן-כתפיים. לסחוט ישבן שנייה בחלק הגבוה.', tips: 'זה תרגיל הישבן הכי יעיל שיש. אל תדלגי עליו.', mistakes: 'קישות הגב, אי סחיטה בחלק הגבוה.' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12 לרגל', rest: '60 שנ\'', muscle: 'ישבן, קוודריצפס, שיווי משקל', technique: 'רגל אחת מאחור על ספסל. ירידה איטית עם גב ישר. ברך קדמית לא עוברת הרבה מעבר לאצבעות.', tips: 'להתחיל בלי משקל. לסחוט ישבן בעלייה.', mistakes: 'נטייה קדמית של הגוף, ברך קדמית פנימה.' },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'קוודריצפס, ישבן', technique: 'רגליים גבוהות ורחבות לדגש על ישבן. לא לנעול ברכיים בחלק העליון.', tips: 'שליטה בירידה. עקבים על הלוחית.', mistakes: 'נעילת ברכיים, טווח קצר מדי.' },
      { name: 'Walking Lunges', sets: 3, reps: '10 לרגל', rest: '60 שנ\'', muscle: 'ישבן, קוודריצפס, שיווי משקל', technique: 'צעד גדול קדימה, ירידה עד שהברך האחורית כמעט נוגעת. דחיפה מעקב קדמי.', tips: 'דמבלים קלים בהתחלה. להביט קדימה.', mistakes: 'גב נוטה קדימה, ברך אחורית בחוזקה.' },
    ]
  },
  B: {
    title: 'יום B', sub: 'פלג גוף עליון | גב וכתפיים', color: '#BBB2EE',
    exercises: [
      { name: 'מתח / Lat Pulldown', sets: 4, reps: '6-12', rest: '2 דק\'', muscle: 'גב רחב, ביצפס', technique: 'אחיזה ברוחב כתפיים, ידיים קדימה. משיכת החזה אל המוט — לא הסנטר. להרגיש גב עובד.', tips: 'לסחוט שכמות בתחתית.', mistakes: 'משיכת הסנטר, שימוש בזרועות בלבד.' },
      { name: 'Barbell Row', sets: 4, reps: '8-10', rest: '90 שנ\'', muscle: 'גב אמצעי, שכמות, ביצפס', technique: 'רכינה מהמותניים, גב ישר. משיכה לבטן תחתונה. שכמות נסגרות בכל חזרה.', tips: 'המוט קרוב לגוף.', mistakes: 'גב מעוגל, משיכה לחזה.' },
      { name: 'Overhead Press', sets: 3, reps: '8-10', rest: '90 שנ\'', muscle: 'כתפיים, טריצפס, גב עליון', technique: 'עמידה או ישיבה. דחיקה אנכית עד נעילת מרפקים.', tips: 'בטן ישרה, ראש קדימה בזמן ההנפה.', mistakes: 'קמירת הגב, שימוש בתנופה.' },
      { name: 'Face Pull', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'כתפיים אחוריות, שרוון מסתובב', technique: 'כבל בגובה הפנים. משיכה לעבר הפנים, מרפקים גבוהים.', tips: 'תנועה איטית, לסחוט בתחתית.', mistakes: 'מרפקים נמוכים.' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'כתף מדיאלית', technique: 'הרמה לצדדים עד גובה כתפיים. כיפוף קל מרפקים.', tips: 'דמבלים קלים. ללא תנודת גוף.', mistakes: 'משקל כבד, הרמה מעל כתפיים.' },
      { name: 'Bicep + Tricep סופרסט', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'ביצפס, טריצפס', technique: 'כפיפת זרועות + הארכת טריצפס, ללא מנוחה בין השניים.', tips: 'מרפקים צמודים לגוף בביצפס.', mistakes: 'תנופת גוף.' },
    ]
  },
  C: {
    title: 'יום C', sub: 'פלג גוף תחתון | ישבן ורגליים אחוריות', color: '#E8A87C',
    exercises: [
      { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '2 דק\'', muscle: 'המסטרינגס, ישבן', technique: 'מוט/דמבלים צמוד לגוף. ירידה עם ברכיים כפופות מעט עד מתיחה חזקה. עלייה עם סחיטה.', tips: 'גב ישר לאורך כל התנועה.', mistakes: 'גב מעוגל, ירידה עמוקה מדי.' },
      { name: 'Single-Leg Glute Bridge', sets: 4, reps: '10-12 לרגל', rest: '60 שנ\'', muscle: 'ישבן, מייצבים', technique: 'שכיבה על גב. רגל אחת כפופה, שנייה מורמת. העלאת אגן מהעקב. סחיטה בחלק הגבוה.', tips: 'מותניים ניטרלי.', mistakes: 'שימוש ברגל התחתונה, גב מקמר.' },
      { name: 'Cable Kickback', sets: 3, reps: '12-15 לרגל', rest: '60 שנ\'', muscle: 'ישבן עליון', technique: 'רצועה לקרסול. בעיטה אחורית ומעלה עם סחיטה. לא להקפיץ גוף.', tips: 'תנועה איטית.', mistakes: 'הקפצת הגוף.' },
      { name: 'Leg Curl', sets: 3, reps: '10-12', rest: '60 שנ\'', muscle: 'המסטרינגס', technique: 'כיפוף ברכיים על המכונה. ירידה איטית ומבוקרת.', tips: 'לא לנעול ברכיים בתחתית.', mistakes: 'שימוש בתנופה.' },
      { name: 'Hip Abduction Machine', sets: 3, reps: '15-20', rest: '60 שנ\'', muscle: 'ישבן צידי (gluteus medius)', technique: 'פתיחה איטית עם סחיטה בסוף.', tips: 'לשבת ישר.', mistakes: 'מהירות יתרה.' },
      { name: 'Standing Calf Raises', sets: 3, reps: '15-20', rest: '60 שנ\'', muscle: 'שוקיים', technique: 'הרמה מלאה ורידה בשליטה.', tips: 'טווח תנועה מלא.', mistakes: 'חצי טווח.' },
    ]
  },
  D: {
    title: 'יום D', sub: 'פלג גוף עליון | חזה וידיים', color: '#34C759',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', rest: '2 דק\'', muscle: 'חזה, טריצפס, כתפיים', technique: 'שכיבה על ספסל. ירידה עד החזה, עלייה. שכמות נסגרות ומורדות.', tips: 'לא לנעול מרפקים לגמרי.', mistakes: 'קשת הגב, מרפקים פתוחים לרוחב.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '90 שנ\'', muscle: 'חזה עליון, כתפיים', technique: 'ספסל ב-30-45°. דחיקה אנכית של הדמבלים.', tips: 'מרפקים ב-75°.', mistakes: 'זווית גבוהה מדי.' },
      { name: 'Chest Fly', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'חזה (stretch)', technique: 'פריסת ידיים לצדדים. חזרה לאמצע עם מתיחה.', tips: 'לא להוריד מתחת לקו כתפיים.', mistakes: 'ירידה עמוקה מדי.' },
      { name: 'Push-Ups', sets: 3, reps: 'AMRAP', rest: '60 שנ\'', muscle: 'חזה, טריצפס, ליבה', technique: 'קו ישר מראש לרגליים. ירידה עד שהחזה כמעט נוגע.', tips: 'ליבה מהודקת. אם קשה — ברכיים.', mistakes: 'אגן יורד/עולה.' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'טריצפס', technique: 'הארכה מאחורי הראש. מרפקים קרובים.', tips: 'לא לנעול בחלק הגבוה.', mistakes: 'מרפקים זעים.' },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '60 שנ\'', muscle: 'ביצפס, ברכיון', technique: 'אחיזה ניטרלית. כיפוף ללא סיבוב.', tips: 'מרפקים קבועים.', mistakes: 'תנופת הגוף.' },
    ]
  },
};

const CARDIO_TYPES = [
  { type: 'הליכה יומית', freq: '4-5× בשבוע', dur: '30-50 דקות', color: '#34C759', desc: 'שורפת שומן בלי להעלות קורטיזול. משפרת עיכול. מאפשרת פודקאסט. לא מותישה. מטרה: 8,000-10,000 צעדים ביום.' },
  { type: 'קרדיו זון 2', freq: '2× בשבוע', dur: '40-60 דקות', color: '#BBB2EE', desc: 'דופק 60-70% מהמקסימום. יכולה לנהל שיחה. אופניים, שחייה, אליפטיקה. משפרת לב ומטבוליזם.' },
  { type: 'HIIT (אופציונלי)', freq: '1× בשבוע מקסימום', dur: '20-30 דקות', color: '#FF9500', desc: 'יעיל אבל מעלה קורטיזול. בסטרס גבוה — לוותר. לא בבוקר. לא לפני שלושה חודשים רצופים.' },
];

function RPECalc() {
  const [weight, setWeight] = useState('');
  const [rpe, setRpe] = useState('');
  const [result, setResult] = useState(null);

  function calc() {
    var w = parseFloat(weight), r = parseFloat(rpe);
    if (!w || !r || r < 1 || r > 10) return;
    var est = w * (1 + 0.0333 * (10 - r + 1));
    setResult({ est: Math.round(est), p70: Math.round(est * 0.70), p80: Math.round(est * 0.80), p85: Math.round(est * 0.85) });
  }

  return (
    <div className="card" style={{ marginTop: 40, padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>מחשבון עומס (RPE)</div>
      <p style={{ fontSize: 13, color: 'var(--color-fg3)', marginBottom: 20 }}>הכניסי משקל שהרמת ורמת מאמץ (1-10) לקבל את ה-1RM המשוער ואחוזי העומס.</p>
      <div className="calc-input-group">
        <div className="calc-input-wrap">
          <label className="calc-label">משקל שהרמת (ק"ג)</label>
          <input className="calc-input" type="number" value={weight} onChange={function(e) { setWeight(e.target.value); }} placeholder="60" />
        </div>
        <div className="calc-input-wrap">
          <label className="calc-label">RPE (1-10)</label>
          <input className="calc-input" type="number" value={rpe} min="1" max="10" onChange={function(e) { setRpe(e.target.value); }} placeholder="8" />
        </div>
      </div>
      <button className="calc-btn" onClick={calc}>חשבי</button>
      {result && (
        <div className="calc-result" style={{ marginTop: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[['1RM משוער', result.est + ' ק"ג'], ['70%', result.p70 + ' ק"ג'], ['80%', result.p80 + ' ק"ג'], ['85%', result.p85 + ' ק"ג']].map(function(r, i) {
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--color-accent)' }}>{r[1]}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-fg3)', marginTop: 2 }}>{r[0]}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Chapter3() {
  const [activeDay, setActiveDay] = useState('A');
  const day = DAYS[activeDay];

  return (
    <section id="chapter-3" className="guide-section">
      <ChapterHeader
        label="פרק 3"
        title="תוכנית האימון — שרירים זה לא רק אסתטיקה"
        desc="עבור נשים בגיל 20, 30, 40 ו-50, הדרך היחידה לשנות את הרכב הגוף היא אימון כוח. לא קרדיו ארוך, לא משקולות קטנות."
      />

      <Reveal>
        <div className="side-note" style={{ marginBottom: 40 }}>
          <strong>למה אימון כוח מפחית נפיחות?</strong> מוריד קורטיזול בסיסי, משפר רגישות לאינסולין,
          שרירי ליבה חזקים שומרים פנים, ומשפר זרימת דם למעי.
          שריר = המטבוליזם שלך.
        </div>
      </Reveal>

      {/* Principles */}
      <Reveal><h3 style={sH3ch3}>5 עקרונות אימון לנשים</h3></Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 60 }}>
        {PRINCIPLES_TRAINING.map(function(p, i) {
          return (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--color-accent)', opacity: 0.2, lineHeight: 1, flexShrink: 0, minWidth: 40, textAlign: 'center' }}>{p.num}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Weekly schedule */}
      <Reveal><h3 style={sH3ch3}>לוח השבוע המומלץ</h3></Reveal>
      <Reveal delay={0.1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 60 }}>
          {WEEKLY.map(function(d, i) {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: d.color + '1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{d.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.day}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg3)' }}>{d.note}</div>
                </div>
                <div style={{ background: d.color + '1A', color: d.color, borderRadius: 'var(--radius-full)', padding: '4px 14px', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{d.type}</div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Training days tabs */}
      <Reveal><h3 style={sH3ch3}>ימי האימון — לחצי לפרטי תרגילים</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="tab-bar" style={{ marginBottom: 20 }}>
          {['A','B','C','D'].map(function(d) {
            return (
              <button key={d} className={'tab-btn' + (activeDay === d ? ' active' : '')}
                onClick={function() { setActiveDay(d); }}>
                יום {d}
              </button>
            );
          })}
        </div>
        <div key={activeDay} style={{ animation: 'fade-scale 0.3s var(--anim-ease)' }}>
          <div style={{ padding: '12px 0 16px', color: day.color, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>{day.sub}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 80px 32px', gap: 8, padding: '8px 20px', fontSize: 11, fontWeight: 700, color: 'var(--color-fg3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>תרגיל</span>
            <span style={{ textAlign: 'center' }}>סטים</span>
            <span style={{ textAlign: 'center' }}>חזרות</span>
            <span style={{ textAlign: 'center' }}>מנוחה</span>
            <span />
          </div>
          {day.exercises.map(function(ex, j) {
            return <Reveal key={j} delay={j * 0.04}><ExerciseRow {...ex} /></Reveal>;
          })}
        </div>
      </Reveal>

      {/* Cardio */}
      <Reveal><h3 style={{ ...sH3ch3, marginTop: 60 }}>קרדיו — כמה, מתי, ואיזה סוג</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          רוב הנשים עושות יותר מדי קרדיו ופחות מדי אימון כוח. שום כמות של קרדיו לא תבנה לך את הישבן שאת רוצה.
          ריצת מרחקים ארוכה 5× בשבוע מעלה קורטיזול, שוחקת מפרקים, ומורידה מסת שריר.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {CARDIO_TYPES.map(function(c, i) {
            return (
              <div key={i} className="card" style={{ display: 'flex', gap: 20, padding: '20px 24px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{c.type}</span>
                    <span style={{ background: c.color + '1A', color: c.color, padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 700 }}>{c.freq}</span>
                    <span style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-fg3)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: 11 }}>{c.dur}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <RPECalc />

      <PullQuote text="שרירים לא נבנים בחדר הכושר. הם נבנים במנוחה שבין האימונים." />

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-3" label="תוכנית אימון" />
      </div>
    </section>
  );
}

const sH3ch3 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };


// ──────────────────────────────────────────────────
// chapter4.jsx
// ──────────────────────────────────────────────────

// chapter4.jsx — אורח חיים — FULL REAL CONTENT

const SLEEP_RULES = [
  { num: '01', title: 'שעת שינה קבועה', desc: 'ללכת לישון באותה שעה, גם בסופי שבוע. הגוף אוהב קצב קבוע.' },
  { num: '02', title: 'חדר קריר 18-20°', desc: 'גוף קר ישן טוב יותר. זה אנטומיה.' },
  { num: '03', title: 'חדר חשוך לגמרי', desc: 'אפילו שעון עם תצוגה משפיע. וילונות אטומים הם חיוניים.' },
  { num: '04', title: 'חדר שקט', desc: 'אם יש רעש — אטמי אוזניים או White Noise.' },
  { num: '05', title: 'בלי מסכים שעה לפני', desc: 'האור הכחול מעכב ייצור מלטונין. אם חייב — פילטר אור כחול.' },
  { num: '06', title: 'בלי אוכל כבד שעתיים לפני', desc: 'אכילה מאוחרת מפריעה לעיכול ומעלה סוכר.' },
  { num: '07', title: 'ללא קפאין מ-14:00', desc: 'חצי חיים של קפה — 6 שעות. קפה ב-15:00 פעיל ב-21:00.' },
  { num: '08', title: 'טקס הרגעה חצי שעה לפני', desc: 'מקלחת חמה, ספר, תה קמומיל. הגוף לומד "עכשיו הולכים לישון".' },
  { num: '09', title: 'לא להסתכל על השעון בלילה', desc: 'זה מגביר חרדה. להפוך אותו לכיוון הקיר.' },
  { num: '10', title: 'אור שמש בבוקר', desc: 'ברגע שקמת — חלון או יציאה החוצה. מכוונן השעון הביולוגי.' },
  { num: '11', title: 'טלפון מחוץ לחדר שינה', desc: 'קני שעון מעורר של 20 ₪. הטלפון בסלון. משנה את כל חייך.' },
  { num: '12', title: 'לא להישאר במיטה ער', desc: 'אם לא נרדמת תוך 20 דקות — תקומי ותעשי משהו משעמם עד שתתעייפי.' },
];

const STRESS_TOOLS = [
  { name: 'נשימת 4-7-8', emoji: '🫁', dur: '4 דקות', color: '#E85D75',
    desc: 'שאיפה 4 שניות, החזקה 7 שניות, נשיפה 8 שניות. לחזור 4 פעמים. מפעיל עצב הוואגוס ומעביר לפרסימפתטי.',
    when: 'בבוקר, לפני אוכל חשוב, לפני שינה, לפני שיחה קשה, לפני אימון' },
  { name: 'הליכה ללא טלפון', emoji: '🚶', dur: '20 דקות', color: '#34C759',
    desc: 'בחוץ, בלי טלפון, בלי פודקאסט. רק את, האוויר, הצעדים. שורפת שומן בלי להעלות קורטיזול. זו לא המלצה — זו תרופה.',
    when: 'כל יום. ביום אימון אחרי, ביום מנוחה בכל שעה' },
  { name: 'לא לעשות כלום', emoji: '🛋️', dur: '30 דקות', color: '#BBB2EE',
    desc: 'לשבת בלי נטפליקס, בלי אינסטגרם, בלי לסדר הבית. רק לשבת. המוח שלנו לא יודע את הרגיעה הזאת. שם צומחת הבריאות.',
    when: 'כשמרגישות הכי לחוצות — זה בדיוק הזמן' },
  { name: 'יומן הערכה', emoji: '📝', dur: '5 דקות', color: '#FF9500',
    desc: 'שלושה דברים שאת מודה עליהם לפני שינה. מחקר על מחקר מראה שמוריד קורטיזול ומעלה איכות שינה.',
    when: 'לפני שינה, כל יום' },
  { name: 'חיבוק', emoji: '🤗', dur: '20 שניות', color: '#E8A87C',
    desc: 'חיבוק של 20 שניות משחרר אוקסיטוצין — ההורמון האנטי-קורטיזולי. לא פינוק — תרופה.',
    when: 'כשבלחץ, לפני שינה, כשצריך' },
  { name: 'חשיפה לשמש ולטבע', emoji: '☀️', dur: '30 דקות', color: '#BBB2EE',
    desc: 'רופאים רושמים "רישיון טבע". שלושים דקות ביום של שמש, עץ, צמחים. מוריד קורטיזול בלי שום תרופה.',
    when: 'בבוקר אחרי הקמה' },
];

const DAILY_HABITS = [
  { text: 'חשיפה לאור שמש תוך 30 דקות מהיקיצה', desc: '15 דקות בחוץ, גם ביום מעונן. מכוונן השעון הביולוגי ומעורר קורטיזול בצורה תקינה.', key: 'sun' },
  { text: 'שתי כוסות מים על קיבה ריקה לפני הקפה', desc: 'הדבר הכי פשוט והכי מיידי לבריאות. הגוף מתעורר מיובש.', key: 'water' },
  { text: '10 דקות הליכה אחרי ארוחה גדולה', desc: 'מוריד סוכר בדם ב-20%, משפר עיכול, עוזר נגד נפיחות.', key: 'walk' },
  { text: 'ללא קפאין אחרי 14:00', desc: 'חצי חיים 6 שעות — קפה ב-15:00 פעיל ב-21:00.', key: 'caffeine' },
  { text: 'טלפון מחוץ לחדר שינה', desc: 'קני שעון מעורר של 20 ₪. הטלפון בסלון.', key: 'phone' },
  { text: 'נשימת 4-7-8 לפני שינה', desc: '3 דקות. מכניסה לשינה עמוקה ומורידה קורטיזול.', key: 'breath' },
  { text: 'ארוחה אחת ביום — ישיבה ובלי מסכים', desc: 'אכילה במנוחה משפרת עיכול ב-40%.', key: 'nomeal' },
];

const SUPPLEMENTS = [
  { name: 'מגנזיום גליצינט', dose: '300-400 מ"ג', time: 'לפני שינה', icon: '💊', why: 'שינה, סטרס, ריפוי מעי, עצירות' },
  { name: 'אשוואגנדה', dose: '600 מ"ג', time: 'בערב', icon: '🌿', why: 'איזון קורטיזול, תמיכה בבלוטות האדרנל' },
  { name: 'ויטמין D3', dose: '2000-4000 IU', time: 'עם ארוחה', icon: '☀️', why: 'רוב הישראלים בחוסר. קריטי לחסינות' },
  { name: 'אומגה-3', dose: '2-3g EPA/DHA', time: 'עם ארוחה', icon: '🐟', why: 'אנטי-דלקתי, ריפוי מעי, מוח ולב' },
  { name: 'רודיולה', dose: '200 מ"ג', time: 'בבוקר', icon: '🌱', why: 'אדפטוגן לסטרס. רק בתקופות לחוצות' },
  { name: 'ויטמין C', dose: '1000 מ"ג', time: 'ביום', icon: '🍊', why: 'בתקופות לחוצות. מוריד קורטיזול' },
];

function StressTimeline() {
  const [revealed, setRevealed] = useState(0);
  const stages = [
    { title: 'סטרס', arrow: '← קורטיזול', desc: 'הגוף מפריש קורטיזול בתגובה לאיום. אדפטיבי ובריא לטווח קצר — בסדר גמור.' },
    { title: 'קורטיזול', arrow: '← סוכר', desc: 'קורטיזול מעלה גלוקוז בדם לספק אנרגיה מהירה. "מצב לחימה".' },
    { title: 'סוכר גבוה', arrow: '← אינסולין', desc: 'הלבלב מפריש אינסולין לאיזון. כשחוזר כרונית = עמידות אינסולין.' },
    { title: 'אינסולין עודף', arrow: '← שומן', desc: 'עודף אינסולין גורם לאגירת שומן, בעיקר סביב הבטן.' },
    { title: 'שומן ויסצרלי', arrow: '← דלקת', desc: 'שומן בטני הוא רקמה פעילה שמפרישה ציטוקינים דלקתיים.' },
    { title: 'דלקת כרונית', arrow: '← הורמונים', desc: 'דלקת משבשת הורמונים, פוגעת במעי ומחזירה למחזור מהתחלה.' },
  ];

  useEffect(function() {
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setRevealed(0);
        var i = 0;
        var t = setInterval(function() {
          setRevealed(function(r) { return r + 1; });
          i++;
          if (i >= stages.length) clearInterval(t);
        }, 600);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    var el = document.getElementById('stress-viz');
    if (el) obs.observe(el);
    return function() { obs.disconnect(); };
  }, []);

  return (
    <div id="stress-viz" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {stages.map(function(s, i) {
        return (
          <div key={i} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            padding: '16px 20px',
            background: revealed > i ? 'var(--color-surface)' : 'transparent',
            borderRadius: 'var(--radius-xl)',
            opacity: revealed > i ? 1 : 0.2,
            transition: 'all 0.5s var(--anim-ease)', marginBottom: 8,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'hsl(' + (340 - i * 20) + ', 70%, ' + (55 + i * 3) + '%)',
              color: 'white', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14,
            }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                {s.title} <span style={{ color: 'var(--color-accent)', fontWeight: 400, fontSize: 13 }}>{s.arrow}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HabitTracker() {
  const [checked, setChecked] = useState(function() { return JSON.parse(localStorage.getItem('guide_habits') || '{}'); });

  function toggle(key) {
    var next = Object.assign({}, checked);
    next[key] = !next[key];
    setChecked(next);
    localStorage.setItem('guide_habits', JSON.stringify(next));
  }

  var done = DAILY_HABITS.filter(function(h) { return checked[h.key]; }).length;
  var pct = Math.round((done / DAILY_HABITS.length) * 100);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, padding: '16px 20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>הרגלי היום</span>
            <span style={{ fontSize: 14, color: 'var(--color-accent)', fontWeight: 700 }}>{done}/{DAILY_HABITS.length}</span>
          </div>
          <div style={{ height: 6, background: 'var(--color-border-strong)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg, #E85D75, #BBB2EE)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s var(--anim-ease)' }} />
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: pct === 100 ? '#34C759' : 'var(--color-accent)' }}>
          {pct === 100 ? '🎉' : pct + '%'}
        </div>
      </div>

      {DAILY_HABITS.map(function(h) {
        return (
          <div key={h.key} className={'habit-item' + (checked[h.key] ? ' done' : '')} onClick={function() { toggle(h.key); }}>
            <div className="habit-checkbox">
              <svg className="habit-check-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12l5 5L20 7"/>
              </svg>
            </div>
            <div>
              <div className="habit-text">{h.text}</div>
              <div className="habit-desc">{h.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chapter4() {
  return (
    <section id="chapter-4" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="פרק 4"
        title="אורח חיים — 40% מהתוצאות מגיעות מכאן"
        desc="זה הפרק שנשים הכי ממעטות להשקיע בו. הן מיישמות תזונה ואימונים, אבל מדלגות על הפרק הזה. טעות גדולה."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 32 }}>
          ארבעה עמודי תווך: שינה, סטרס, הידרציה והרגלים יומיומיים. אם עושה הכל נכון במטבח ובחדר כושר
          אבל לא ישנה, לא מנהלת סטרס ושותה חצי כוס מים ביום — לא תראי תוצאות.
        </p>
      </Reveal>

      {/* Daily habits tracker */}
      <Reveal><h3 style={sH3ch4}>5 ההרגלים הקטנים שמשנים הכל</h3></Reveal>
      <Reveal delay={0.1}><HabitTracker /></Reveal>

      {/* Stress / cortisol cycle */}
      <Reveal><h3 style={{ ...sH3ch4, marginTop: 60 }}>מחזור הקורטיזול — למה הכאוס קורה?</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 20 }}>
          גללי לאט וצפי איך הדפוס מתפתח בזמן אמת:
        </p>
        <div className="card" style={{ padding: '28px 32px' }}>
          <StressTimeline />
        </div>
        <div className="side-note" style={{ marginTop: 16 }}>
          <strong>הסטרס המודרני הוא כרוני.</strong> הגוף תוכנן לקפוץ לגזע עץ כשדב מתקרב, להילחם ולהתאושש.
          הסטרס של היום לא נגמר. הוא מתלווה לנו ללילה, לחופשה, לבדיקת הילדים בגן.
        </div>
      </Reveal>

      <PullQuote text="אי אפשר לאמן את עצמך מחוץ למחסור שינה. הגוף זוכר הכל." />

      {/* Sleep */}
      <Reveal><h3 style={{ ...sH3ch4, marginTop: 60 }}>שינה — הבסיס של הבסיס</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          שינה לא נועדה רק למנוחה. זהו זמן של תיקון, איזון הורמונלי, וניקיון המוח.
          אם את ישנה פחות מ-7 שעות, <strong>אף פרק אחר במדריך לא יעבוד בשבילך.</strong>
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 24 }}>
          מה שקורה כשלא ישנה מספיק: קורטיזול נשאר גבוה, לפטין יורד (פחות שובע), גרלין עולה (יותר רעב),
          הורמון גדילה נפגע (אין בניית שריר), ומיקרוביום נפגע.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {SLEEP_RULES.map(function(r, i) {
            return (
              <Reveal key={i} delay={i * 0.04}>
                <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: 'var(--color-accent)', opacity: 0.25, flexShrink: 0, lineHeight: 1 }}>{r.num}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{r.title}</div>
                    <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Stress tools */}
      <Reveal><h3 style={{ ...sH3ch4, marginTop: 60 }}>כלי ניהול סטרס שבאמת עובדים</h3></Reveal>
      {STRESS_TOOLS.map(function(tool, i) {
        return (
          <Reveal key={i} delay={i * 0.07}>
            <div className="card" style={{ display: 'flex', gap: 20, marginBottom: 12, padding: '20px 24px', alignItems: 'flex-start' }}>
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-xl)', background: tool.color + '1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{tool.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{tool.name}</span>
                  <span style={{ background: tool.color + '1A', color: tool.color, borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{tool.dur}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.6, margin: '0 0 6px' }}>{tool.desc}</p>
                <div style={{ fontSize: 12, color: tool.color, fontWeight: 600 }}>מתי: {tool.when}</div>
              </div>
            </div>
          </Reveal>
        );
      })}

      {/* Hydration */}
      <Reveal><h3 style={{ ...sH3ch4, marginTop: 60 }}>הידרציה — הטעויות הנפוצות</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="card-grid-2">
          {[
            { icon: '💧', title: 'כמה מים?', desc: '30 מ"ל לק"ג משקל. 65 ק"ג = ~1.95 ליטר ביום. עם אימון — עוד 500-1000 מ"ל. בקיץ ישראלי — לפחות 2.5 ליטר.' },
            { icon: '⏰', title: 'מתי לשתות?', desc: 'בוקר: 2 כוסות לפני הקפה. לפני ארוחה: חצי שעה לפני. לא בזמן הארוחה (דוחס חומצת קיבה). לא בלילה מאוחר.' },
            { icon: '❌', title: 'הטעות הכי נפוצה', desc: 'לשתות רק כשצמאים. עד שצמאה — כבר מיובשת. צמא זה סימן מאוחר. גם קפה לא מחליף מים.' },
            { icon: '⚡', title: 'אלקטרוליטים', desc: 'אם מזיעה הרבה — מים לבד לא מספיקים. קורט מלח הימלאיה בכוס הבוקר, או תוסף אלקטרוליטים (LMNT).' },
          ].map(function(tip, i) {
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card">
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{tip.title}</div>
                  <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{tip.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Supplements */}
      <Reveal><h3 style={{ ...sH3ch4, marginTop: 60 }}>תוספים לאיזון קורטיזול ושינה</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="side-note" style={{ marginBottom: 20 }}>
          אלה לא תרופות. אלה תוספים בסיסיים שרוב הנשים הישראליות חסרות. לא מחליפים תזונה ואורח חיים.
        </div>
        <div className="card-grid-2">
          {SUPPLEMENTS.map(function(s, i) {
            return (
              <div key={i} className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span className="tag tag-rose">{s.dose}</span>
                  <span className="tag tag-purple">{s.time}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0, lineHeight: 1.5 }}>{s.why}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-4" label="אורח חיים" />
      </div>
    </section>
  );
}

const sH3ch4 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };


// ──────────────────────────────────────────────────
// chapter5.jsx
// ──────────────────────────────────────────────────

// chapter5.jsx — 4 שבועות — FULL REAL CONTENT

const WEEKS = [
  {
    num: '01', title: 'שבוע 1', theme: 'ניקוי ואיפוס', color: '#E85D75',
    desc: 'המטרה השבוע היא לא להכניס דברים חדשים, אלא להוציא את מה שמפריע. נקרא לזה "שבוע השקט".',
    remove: ['סוכר לבן מוסף בכל צורה','קמח לבן מעובד (לחמניות תעשייתיות, מאפים, פסטה לבנה)','משקאות ממותקים ומוגזים','אלכוהול'],
    add: ['שתי כוסות מים גדולות על קיבה ריקה לפני הקפה','שתי מנות ירקות בכל ארוחה עיקרית'],
    training: 'שלושה אימוני כוח של 30-45 דקות בלבד (A, B, C). לא במלוא הכוח. המטרה — ללמוד תנועות ולתת לגוף להסתגל.',
    cardio: 'הליכה של 30 דקות, 4 פעמים בשבוע',
    lifestyle: 'חמשת ההרגלים הקטנים מתחילים. ללכת לישון חצי שעה קודם — רק חצי שעה.',
    expect: ['פחות נפיחות כללית','אנרגיה יציבה יותר אחר הצהריים','שינה קצת יותר טובה','ירידה קלה של קילו-שניים (בעיקר מים — זה בסדר)'],
    warning: 'יהיה קשה. יום 4-5, כשהגוף מתנקה מסוכר: כאבי ראש, עייפות, עצבנות. זה עובר. תשתי יותר מים ותעברי.',
  },
  {
    num: '02', title: 'שבוע 2', theme: 'בניית הרגלים', color: '#BBB2EE',
    desc: 'ממשיכים עם השינויים משבוע 1 ומוסיפים מזונות שבונים. עובדים על הרגלים.',
    remove: [],
    add: ['חלבון בכל ארוחה — מטרה: 20-40 גרם בכל ארוחה עיקרית','שלוש מנות ירקות מצליבים בשבוע (ברוקולי, כרובית, רוקט)','מזון פרוביוטי פעם ביום: יוגורט / כרוב כבוש / קפיר','כף זרעי פשתן טחונים ביום'],
    training: 'A, B, C ואם מוכנה — מוסיפים D. מוסיפים חצי קילו עד קילו לתרגילים.',
    cardio: 'הליכה 40 דקות, 4 פעמים בשבוע',
    lifestyle: 'נשימת 4-7-8 לפני שינה. יומן הערכה — 3 דברים שמודה עליהם. טלפון מחוץ לחדר 5+ ימים.',
    expect: ['בטן שטוחה יותר באופן יציב','פחות חשקים בסוכר','יותר אנרגיה לאימונים','שינה טובה יותר','עור נקי יותר'],
  },
  {
    num: '03', title: 'שבוע 3', theme: 'העמקה והתאמות', color: '#E8A87C',
    desc: 'הגוף מתחיל להסתגל. כעת נעמיק ונוסיף קושי.',
    remove: ['קמח לבן עד לחמי מחמצת בלבד'],
    add: ['חלון אכילה 10 שעות — לא לאכול לפני 08:00 ולא אחרי 20:00','צמצום גלוטן משמעותי'],
    training: '4 אימונים עם העמסה. RPE 8-9 בסטים האחרונים. רישום חובה.',
    cardio: 'הליכה שעה, 5 פעמים בשבוע. אפשר להוסיף HIIT קצר 20 דקות (אופציונלי)',
    lifestyle: 'תמונת "לפני" ומדידות. נשימות 10 דקות בבוקר + 3 דקות לפני שינה.',
    expect: ['משקלות עולות (סקווט +10 ק"ג)','מידות ירדו (~2-3 ס"מ סביב טבור)','מרגישה "בונה" את הגוף שלך','הכל קצת יותר "אוטומטי"'],
  },
  {
    num: '04', title: 'שבוע 4', theme: 'שגרה לטווח ארוך', color: '#34C759',
    desc: 'שבוע ההוכחה. ממשיכות עם עצימות ומודדות תוצאות. ומחגיגות!',
    remove: [],
    add: ['בכל ארוחה: יש חלבון? יש ירקות? יש פחמימה מורכבת? — שלוש שאלות, זה הכל','ארוחה מיוחדת אחת — בלי אשמה, בלי פיצוי'],
    training: '4 אימוני כוח. מודדות 1RM על 2 תרגילים ורואות כמה עלינו.',
    cardio: 'לפי תחושה',
    lifestyle: 'תמונת "אחרי". מדידות. כתיבת 3 הצלחות מ-4 שבועות. תכנון החודש הבא ביומן.',
    expect: ['כל מה שהובטח','4 שבועות של עבודה עומדים מאחוריך','יש לך כעת תשתית של אורח חיים'],
    cta: true,
  },
];

const TRACKING = [
  { key: 'weight', label: 'משקל (ק"ג)' },
  { key: 'waist', label: 'היקף מותן' },
  { key: 'hip', label: 'היקף ישבן' },
  { key: 'energy', label: 'אנרגיה (1-10)' },
  { key: 'bloat', label: 'נפיחות (1-10)' },
  { key: 'sleep', label: 'שינה (1-10)' },
];

const FAQ = [
  { q: 'אני צמחונית / טבעונית — איך מתאימה?', a: 'תחליפי עוף/דג בטופו, טמפה, קטניות וביצים. שני כפות טחינה + גרגרי חומוס = חלבון מלא. B12 תוסף חובה לטבעוניות. ויטמין D ואומגה-3 מאצות.' },
  { q: 'אני לא רואה תוצאות אחרי שבועיים', a: 'שבועיים זה מוקדם. תמשיכי. אם אחרי חודש אין שינוי — בדקי: ישנה? בסטרס? האימונים בהעמסה? רישום אימון שחור על לבן לא משקר.' },
  { q: 'אני לא מצליחה לוותר על סוכר', a: 'זה קשה. תתחילי עם הגבלה חלקית — רק אחרי ארוחה, רק יום אחד בשבוע. שבועיים ואת שוברת את ההתמכרות. שבועיים של אומץ ואפשר.' },
  { q: 'יש לי בלוטת תריס — איך מתאימה?', a: 'התוכנית טובה אבל אל תצמצמי יותר מדי קלוריות. הגדילי סלניום (אגוזי ברזיל), אבץ ויוד עם מעקב רפואי. לבדוק TSH, FT3, FT4.' },
  { q: 'אני מוצפת מהמידע — מאיפה מתחילים?', a: 'חזרי לפרק 5 ותתחילי בשבוע 1. ארבעה דברים מוציאים, שני הרגלים חדשים. זה הכל. אחרי שבוע תוסיפי עוד.' },
  { q: 'מה לעשות אחרי 4 שבועות?', a: 'שלוש אפשרויות: (1) להמשיך — תוכנית שבוע 4 היא לחיים; (2) להעמיק — לעבור ל-5 ימי אימון; (3) להתחיל שוב שבוע 1 — כל פעם שחוזרים, זה קל יותר.' },
];

function WeekCard({ week, isOpen, onToggle }) {
  return (
    <Reveal>
      <div className={'week-capsule' + (isOpen ? ' open' : '')}>
        <button className="week-capsule-header" onClick={onToggle}>
          <div className="week-num-badge" style={{ background: week.color + '1A', color: week.color }}>{week.num}</div>
          <div style={{ flex: 1 }}>
            <div className="week-title">{week.title}</div>
            <div className="week-subtitle">{week.theme}</div>
          </div>
          <svg style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none', color: 'var(--color-fg3)', flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <div className="week-capsule-body">
          <div className="week-capsule-inner">
            <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>{week.desc}</p>

            {week.remove && week.remove.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-error)', marginBottom: 10 }}>🚫 מוציאים</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {week.remove.map(function(r, i) {
                    return (
                      <div key={i} style={{ fontSize: 13, color: 'var(--color-fg2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-error)', flexShrink: 0 }}>✗</span>{r}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2D9E47', marginBottom: 10 }}>✅ מוסיפים</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {week.add.map(function(a, i) {
                  return (
                    <div key={i} style={{ fontSize: 13, color: 'var(--color-fg2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#2D9E47', flexShrink: 0 }}>›</span>{a}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="two-col" style={{ marginBottom: 20 }}>
              <div style={{ background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-xl)', padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: week.color, marginBottom: 8 }}>🏋️ אימון</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: '0 0 8px', lineHeight: 1.5 }}>{week.training}</p>
                <div style={{ fontSize: 12, color: 'var(--color-fg3)', fontStyle: 'italic' }}>קרדיו: {week.cardio}</div>
              </div>
              <div style={{ background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-xl)', padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: week.color, marginBottom: 8 }}>🌙 אורח חיים</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.5 }}>{week.lifestyle}</p>
              </div>
            </div>

            <div style={{ background: 'var(--guide-rose-light)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 8 }}>📊 מה לצפות לראות בסוף השבוע</div>
              {week.expect.map(function(e, i) {
                return (
                  <div key={i} style={{ fontSize: 13, color: 'var(--color-fg2)', marginBottom: 4, display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--color-accent)' }}>›</span>{e}
                  </div>
                );
              })}
            </div>

            {week.warning && (
              <div className="warning-card" style={{ marginTop: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--color-fg2)' }}>⚠️ {week.warning}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProgressTracker() {
  const [data, setData] = useState(function() { return JSON.parse(localStorage.getItem('guide_tracking') || '{}'); });

  function update(key, week, value) {
    var next = Object.assign({}, data);
    next[key + '-w' + week] = value;
    setData(next);
    localStorage.setItem('guide_tracking', JSON.stringify(next));
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 4 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', minWidth: 140 }}>מדד</th>
            {['התחלה','שבוע 1','שבוע 2','שבוע 3','שבוע 4'].map(function(w) {
              return <th key={w} style={{ textAlign: 'center', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', minWidth: 80 }}>{w}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {TRACKING.map(function(m) {
            return (
              <tr key={m.key}>
                <td style={{ padding: '6px 12px', fontSize: 14, fontWeight: 600, color: 'var(--color-fg1)' }}>{m.label}</td>
                {[0,1,2,3,4].map(function(w) {
                  return (
                    <td key={w} style={{ padding: 4 }}>
                      <input type="text" value={data[m.key + '-w' + w] || ''} onChange={function(e) { update(m.key, w, e.target.value); }}
                        placeholder="—"
                        style={{ width: '100%', padding: '8px 8px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-fg1)', textAlign: 'center', transition: 'border-color 0.2s' }}
                        onFocus={function(e) { e.target.style.borderColor = 'var(--color-accent)'; }}
                        onBlur={function(e) { e.target.style.borderColor = 'var(--color-border-strong)'; }}
                        dir="ltr" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: 'var(--color-fg3)', marginTop: 10, textAlign: 'center' }}>הנתונים נשמרים אוטומטית בדפדפן שלך</p>
    </div>
  );
}

function Chapter5() {
  const [openWeek, setOpenWeek] = useState(0);

  return (
    <section id="chapter-5" className="guide-section">
      <ChapterHeader
        label="פרק 5"
        title="תוכנית 4 השבועות"
        desc="אחרי כל התיאוריה, הגיע הזמן לעבודה. המטרה היא לא לרזות 5 ק״ג — אלא לבנות תשתית של הרגלים שילוו אותך לכל החיים."
      />

      <Reveal>
        <div className="side-note" style={{ marginBottom: 40 }}>
          <strong>חשוב לקרוא לפני שמתחילות:</strong> הסיבה הראשית שנשים לא מצליחות היא שהן מתלהבות ביום הראשון,
          קופצות ל"הכל" ביום השני, ונכשלות ביום השלישי. אנחנו עושות זאת אחרת.
          בהדרגה, במדידה, בסדר.
        </div>
      </Reveal>

      {/* 4 weeks */}
      <Reveal><h3 style={sH3ch5}>ארבעה שבועות. שינוי אמיתי.</h3></Reveal>
      {WEEKS.map(function(w, i) {
        return <WeekCard key={i} week={w} isOpen={openWeek === i} onToggle={function() { setOpenWeek(openWeek === i ? -1 : i); }} />;
      })}

      <PullQuote text="4 שבועות זה רק ההתחלה. ההרגלים שתבני כאן — יישארו איתך לכל החיים." />

      {/* Progress tracker */}
      <Reveal><h3 style={{ ...sH3ch5, marginTop: 60 }}>טבלת מעקב אישית</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 20 }}>
          מלאי את הנתונים שלך בכל שבוע. לא כדי להתבאס — כדי לראות את השינוי האמיתי. נשמר בדפדפן.
        </p>
        <div className="card">
          <ProgressTracker />
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal><h3 style={{ ...sH3ch5, marginTop: 60 }}>שאלות נפוצות</h3></Reveal>
      {FAQ.map(function(faq, i) {
        return (
          <Reveal key={i} delay={i * 0.07}>
            <AccordionCard icon="❓" title={faq.q} color="#BBB2EE">
              <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </AccordionCard>
          </Reveal>
        );
      })}

      {/* Final message */}
      <Reveal>
        <div style={{ marginTop: 60, background: 'linear-gradient(135deg, rgba(232,93,117,0.08), rgba(187,178,238,0.08))', border: '1px solid rgba(232,93,117,0.2)', borderRadius: 'var(--radius-2xl)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 20 }}>מילה אחרונה ממני</h2>
          <div style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 20px', textAlign: 'right' }}>
            <p>עברת דרך ארוכה אם קראת עד כאן. ואני כבר גאה בך.</p>
            <p>הגוף שלך מדבר איתך כל יום. כשהוא אומר "אני נפוחה" — הוא מבקש ממך עזרה. כשהוא אומר "אני עייפה" — הוא מבקש ממך עזרה. כשהוא אומר "אני רעבה בחמש בערב" — הוא מבקש ממך עזרה.</p>
            <p>התפקיד שלך הוא להקשיב. ולהגיב עם מה שהוא באמת צריך.</p>
            <p style={{ fontWeight: 700, color: 'var(--color-fg1)' }}>בהצלחה. אליס ❤️</p>
          </div>
          <button onClick={function() { window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '14px 28px', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: 'var(--shadow-accent)' }}>
            חזרי להתחלה
          </button>
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-5" label="תוכנית 4 שבועות" />
      </div>
    </section>
  );
}

const sH3ch5 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };


// ──────────────────────────────────────────────────
// app.jsx
// ──────────────────────────────────────────────────

// app.jsx — Main app shell

const SECTION_IDS = [
  'section-intro', 'section-bloating',
  'chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5'
];

function App() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [completed, setCompleted] = useState(() =>
    JSON.parse(localStorage.getItem('guide_completed') || '[]')
  );

  // Mark sections as completed when scrolled past them
  useEffect(() => {
    const onScroll = () => {
      const updated = [...completed];
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 && !updated.includes(id)) {
          updated.push(id);
        }
      });
      if (updated.length !== completed.length) {
        setCompleted(updated);
        localStorage.setItem('guide_completed', JSON.stringify(updated));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [completed]);

  return (
    <div>
      <ProgressBar />
      <DarkModeToggle />

      <div className="guide-layout">
        <Sidebar activeSection={activeSection} completedSections={completed} />

        <main className="guide-content">
          <HeroSection />
          <IntroSection />
          <BloatingSection />
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Chapter5 />

          {/* Footer */}
          <footer style={{
            padding: '40px 60px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <img src="../assets/elice-logo-purple.png" alt="Elice Fit" style={{ height: 24 }} />
            <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0 }}>
              © 2026 Elice Fit · כל הזכויות שמורות
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Hide loading screen after React mounts
setTimeout(() => {
  const el = document.getElementById('loading');
  if (el) el.classList.add('hidden');
}, 200);

