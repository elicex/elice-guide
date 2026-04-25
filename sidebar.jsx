// sidebar.jsx
const CHAPTERS = [
  { id: 'section-intro',    num: '00', label: 'מבוא' },
  { id: 'chapter-1',        num: '01', label: 'תזונה' },
  { id: 'chapter-microbiome', num: '02', label: 'המיקרוביום והמעיים' },
  { id: 'chapter-2',        num: '03', label: 'מדריך הנפיחות' },
  { id: 'chapter-3',        num: '04', label: 'בניית אימון' },
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
        <img src="assets/elice-logo-purple.svg" alt="Elice Fit" />
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

Object.assign(window, { Sidebar, CHAPTERS });
