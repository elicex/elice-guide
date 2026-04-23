// hero.jsx — with real content from Elice
const { useEffect, useRef } = React;

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

Object.assign(window, { HeroSection, IntroSection });
