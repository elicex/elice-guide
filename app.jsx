// app.jsx - Main app shell
const SECTION_IDS = [
  'section-intro',
  'chapter-1', 'chapter-microbiome', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5'
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
          <Chapter1 />
          <ChapterMicrobiome />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Hide loading screen after React mounts
setTimeout(() => {
  const el = document.getElementById('loading');
  if (el) el.classList.add('hidden');
}, 200);
