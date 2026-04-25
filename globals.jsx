// globals.jsx - shared hooks, utilities, and micro-components

const { useState, useEffect, useRef, useCallback, useMemo } = React;

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
Object.assign(window, {
  useInView, useScrollProgress, useActiveSection,
  ProgressBar, DarkModeToggle, Reveal, ChapterHeader,
  Tooltip, WhyImportant, PullQuote, SideNote,
  BookmarkBtn, AccordionCard, Tabs, ExerciseRow, WaveLoader,
});
