// app.jsx - Main app shell
const SECTION_IDS = [
  'section-intro',
  'chapter-1', 'chapter-microbiome', 'chapter-2', 'chapter-4', 'chapter-5'
];

function App() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [accessState, setAccessState] = useState({ status: 'checking', buyer: null });
  const [completed, setCompleted] = useState(() =>
    JSON.parse(localStorage.getItem('guide_completed') || '[]')
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access');

    if (!token) {
      setAccessState({ status: 'denied', buyer: null });
      return;
    }

    fetch(`/api/guide/access?access=${encodeURIComponent(token)}`)
      .then(res => res.json().then(data => ({ ok: res.ok && data.ok, data })))
      .then(result => {
        if (result.ok) {
          setAccessState({ status: 'granted', buyer: result.data });
        } else {
          setAccessState({ status: 'denied', buyer: null });
        }
      })
      .catch(() => {
        setAccessState({ status: 'error', buyer: null });
      });
  }, []);

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

  if (accessState.status === 'checking') {
    return <GuideAccessScreen title="בודקות את הגישה שלך..." text="זה ייקח רגע קטן." />;
  }

  if (accessState.status !== 'granted') {
    return (
      <GuideAccessScreen
        title="המדריך נעול"
        text="כדי לפתוח את המדריך צריך להשתמש בקישור האישי שנשלח למייל אחרי הרכישה."
        actionHref="landing.html#landing-purchase"
        actionText="רכישת המדריך"
      />
    );
  }

  return (
    <div>
      <ProgressBar />
      <DarkModeToggle />

      <div className="guide-layout">
        <Sidebar activeSection={activeSection} completedSections={completed} />

        <main className="guide-content">
          <HeroSection />
          <IntroSection />
          <Chapter1 />
          <ChapterMicrobiome />
          <Chapter2 />
          <Chapter4 />
          <Chapter5 />

          {/* Footer */}
          <footer style={{
            padding: '40px 60px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <img src="assets/elice-logo-purple.svg" alt="Elice Fit" style={{ height: 24 }} />
            <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0 }}>
              © 2026 Elice Fit · כל הזכויות שמורות
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GuideAccessScreen({ title, text, actionHref, actionText }) {
  return (
    <main className="guide-access-screen">
      <div className="guide-access-panel">
        <img src="assets/elice-logo-purple.svg" alt="Elice Fit" className="guide-access-logo" />
        <h1>{title}</h1>
        <p>{text}</p>
        {actionHref && (
          <a className="hero-cta" href={actionHref}>
            {actionText}
          </a>
        )}
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Hide loading screen after React mounts
setTimeout(() => {
  const el = document.getElementById('loading');
  if (el) el.classList.add('hidden');
}, 200);
