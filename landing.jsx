const LANDING_FUNNEL = {
  productName: 'בניית הגוף מבפנים ומבחוץ',
  subtitle: 'המדריך הדיגיטלי לנשים שרוצות להבין נפיחות, מעיים, תזונה, אימון ואורח חיים - בלי קיצוניות ובלי בלבול',
  priceLabel: '149 ש"ח במקום 380 ש"ח',
  checkoutUrl: '',
  sellerEmail: '',
  leadWebhookUrl: '',
  guideUrl: '',
};

const LANDING_PAIN_POINTS = [
  'את אוכלת "בריא" ועדיין מרגישה נפוחה, עייפה או מבולבלת מול האוכל.',
  'את מנסה להתאמן, אבל לא באמת יודעת איך לבנות תפריט או תוכנית שעובדים יחד.',
  'כל פעם יש תקופה טובה, ואז בלגן, חשקים, חוסר סדר ותחושה שהגוף לא משתף פעולה.',
  'את רוצה להבין מה קורה בגוף שלך - לא רק לקבל עוד רשימת איסורים.',
];

const LANDING_INCLUDES = [
  { icon: '🥗', title: 'פרק תזונה מלא', desc: 'מאקרו, קלוריות, הורמונים, בניית ארוחות והבנה אמיתית של מה הגוף שלך צריך.' },
  { icon: '🦠', title: 'פרק מיקרוביום ומעיים', desc: 'הסבר עמוק אבל ברור על חיידקי המעי, ציר המעי-מוח, פרוביוטיקה ופרה-ביוטיקה.' },
  { icon: '🌿', title: 'מדריך נפיחות מעשי', desc: 'סוגי נפיחות, FODMAP, טריגרים נפוצים, וכלים לזהות מה באמת מפריע לך.' },
  { icon: '🏋️', title: 'פרק אימון פרקטי', desc: 'בניית תוכנית לישבן, רגליים וגב, כולל תבניות ומאגרי תרגילים לבחירה.' },
  { icon: '🌙', title: 'אורח חיים לנשים', desc: 'שינה, סטרס, קורטיזול, הידרציה והרגלים קטנים שמשנים את התמונה כולה.' },
  { icon: '🗓️', title: 'תוכנית 4 שבועות', desc: 'מסלול ישים שמוציא אותך מבלבול לשגרה בריאה וברורה.' },
];

const LANDING_FOR_HER = [
  'אם את רוצה להבין למה הגוף שלך מגיב כמו שהוא מגיב - ולא רק "לנסות עוד משהו".',
  'אם את מרגישה שהבטן, האנרגיה, התזונה והאימונים שלך לא באמת עובדים יחד.',
  'אם חשוב לך לקבל מדריך נשי, מדויק, ברור ועמוק - בלי ניסוחים יבשים ובלי תיאוריה מנותקת.',
];

const LANDING_RESULTS = [
  'יותר בהירות מול אוכל וארוחות',
  'פחות נפיחות ויותר הבנה של הטריגרים שלך',
  'מסגרת מסודרת לבניית שגרה',
  'יכולת להתחיל ליישם מיד, גם בלי ליווי צמוד',
];

const LANDING_FAQ = [
  {
    q: 'איך אני מקבלת את המדריך אחרי הרכישה?',
    a: 'המטרה של התשתית היא שהלקוחה תקבל למייל שלה קישור מסודר למדריך, כדי שתוכל לפתוח אותו מתי שנוח לה ולחזור אליו שוב ושוב.',
  },
  {
    q: 'זה מתאים רק למי שסובלת מנפיחות?',
    a: 'לא. הנפיחות היא חלק משמעותי במדריך, אבל יש כאן גם תזונה, מיקרוביום, אימון, הורמונים ואורח חיים. זה מדריך רחב על הגוף הנשי מבפנים ומבחוץ.',
  },
  {
    q: 'זה פרקטי או רק מסביר?',
    a: 'פרקטי מאוד. יש הסברים, אבל גם טבלאות, תבניות, דוגמאות, מעקבים, ובנייה של ממש - כדי שתוכלי ליישם ולא רק לקרוא.',
  },
];

function persistLandingLead(payload) {
  try {
    const current = JSON.parse(localStorage.getItem('landing_leads') || '[]');
    current.push(payload);
    localStorage.setItem('landing_leads', JSON.stringify(current));
  } catch (e) {}
}

async function submitLandingLead(payload) {
  persistLandingLead(payload);

  if (!LANDING_FUNNEL.leadWebhookUrl) {
    return { ok: true, mode: 'local' };
  }

  try {
    const res = await fetch(LANDING_FUNNEL.leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Lead webhook failed');
    return { ok: true, mode: 'webhook' };
  } catch (error) {
    return { ok: false, mode: 'error', error };
  }
}

function LandingHero() {
  return (
    <section className="hero-section" style={{ minHeight: '100vh' }}>
      <div className="hero-bg" />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          מדריך דיגיטלי פרימיום לנשים
          <span style={{ opacity: 0.6, marginRight: 4 }}>·</span>
          Elice Fit
        </div>

        <h1 className="hero-title">
          {LANDING_FUNNEL.productName}<br />
          <span>הבנה אמיתית של הגוף שלך - מהבטן ועד התוצאות</span>
        </h1>

        <p className="hero-subtitle">
          מדריך אחד שמחבר בין תזונה, מיקרוביום, נפיחות,<br />
          אימון ואורח חיים - בצורה נשית, פרקטית וברורה
        </p>

        <div className="hero-meta">
          {[
            { icon: '📚', label: '6 פרקים עמוקים ומעשיים' },
            { icon: '✨', label: 'מדריך שאפשר באמת ליישם' },
            { icon: '📩', label: 'נשלח ישירות למייל שלך' },
          ].map((m, i) => (
            <div key={i} className="hero-meta-item">
              <span>{m.icon}</span>
              {m.label}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
          <div className="sales-price-tag" style={{ fontSize: 15, minHeight: 50 }}>{LANDING_FUNNEL.priceLabel}</div>
          <div className="sales-chip" style={{ minHeight: 50 }}>גישה דיגיטלית + חזרה חופשית למדריך</div>
        </div>

        <a className="hero-cta" href="#landing-purchase">
          אני רוצה את המדריך
        </a>
      </div>
    </section>
  );
}

function LandingPainSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 70 }}>
      <Reveal>
        <div className="card" style={{ padding: '34px 32px' }}>
          <div className="chapter-label" style={{ marginBottom: 16 }}>
            <div className="chapter-label-line" />
            אם זה נשמע כמוך
          </div>
          <h2 className="chapter-title" style={{ marginBottom: 16 }}>
            זה בדיוק המדריך שנועד לעשות לך סדר
          </h2>
          <p className="chapter-desc" style={{ marginBottom: 22 }}>
            לא עוד מידע מפוזר. לא עוד "תאכלי פחות ותזוזי יותר". אלא מדריך שבונה הבנה - למה את נפוחה, למה האנרגיה שלך נופלת, איך לאכול, איך להתאמן ואיך סוף סוף לעבוד עם הגוף שלך במקום להילחם בו.
          </p>
          <div className="card-grid-2">
            {LANDING_PAIN_POINTS.map(function(point, i) {
              return (
                <div key={i} className="card" style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>•</span>
                    <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75 }}>{point}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LandingIncludesSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 10 }}>
      <Reveal>
        <div className="chapter-label" style={{ marginBottom: 16 }}>
          <div className="chapter-label-line" />
          מה יש בפנים
        </div>
        <h2 className="chapter-title" style={{ marginBottom: 14 }}>כל מה שאת צריכה כדי להבין את הגוף שלך בצורה אחרת</h2>
        <p className="chapter-desc" style={{ marginBottom: 24 }}>
          המדריך בנוי כמו מערכת אחת. כל פרק מסביר שכבה אחרת - אבל יחד הם מתחברים לתמונה שלמה, ישימה ומדויקת.
        </p>
      </Reveal>
      <div className="card-grid-3">
        {LANDING_INCLUDES.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card" style={{ padding: '24px 22px', minHeight: 210 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function LandingForWhoSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 30 }}>
      <Reveal>
        <div className="sales-shell card">
          <div className="sales-copy">
            <div className="chapter-label" style={{ marginBottom: 16 }}>
              <div className="chapter-label-line" />
              למי זה מתאים
            </div>
            <h2 className="chapter-title" style={{ marginBottom: 14 }}>אם את רוצה להבין, ליישם ולהרגיש שינוי - את במקום הנכון</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {LANDING_FOR_HER.map(function(item, i) {
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                    <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75 }}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sales-visual" aria-hidden="true">
            <div className="sales-flow-card sales-flow-card-1">פחות בלבול</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-2">יותר הבנה</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-3">יותר יישום</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-4">יותר תוצאות</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PurchaseSection() {
  const [form, setForm] = useState(function() {
    return JSON.parse(localStorage.getItem('landing_purchase_form') || '{"name":"","email":"","phone":"","consent":true}');
  });
  const [status, setStatus] = useState('');

  function updateField(key, value) {
    const next = Object.assign({}, form, { [key]: value });
    setForm(next);
    localStorage.setItem('landing_purchase_form', JSON.stringify(next));
  }

  async function handleSubmit() {
    if (!form.name || !form.email) {
      setStatus('כדי להתחיל צריך לפחות שם ומייל.');
      return;
    }

    const payload = {
      productName: LANDING_FUNNEL.productName,
      name: form.name,
      email: form.email,
      phone: form.phone,
      consent: !!form.consent,
      createdAt: new Date().toISOString(),
      page: window.location.href,
    };

    setStatus('שומרת את הפרטים...');
    const result = await submitLandingLead(payload);

    if (!result.ok) {
      setStatus('הפרטים נשמרו מקומית, אבל עדיין אין חיבור אמיתי לשרת.');
      return;
    }

    if (LANDING_FUNNEL.checkoutUrl) {
      window.open(LANDING_FUNNEL.checkoutUrl, '_blank', 'noopener,noreferrer');
      setStatus('הפרטים נשמרו. מעבירה לרכישה.');
      return;
    }

    setStatus('הפרטים נשמרו. עכשיו נשאר לחבר סליקה אמיתית.');
  }

  return (
    <section id="landing-purchase" className="guide-section" style={{ paddingTop: 30 }}>
      <Reveal>
        <div className="sales-purchase-shell card">
          <div className="sales-purchase-copy">
            <div className="chapter-label" style={{ marginBottom: 16 }}>
              <div className="chapter-label-line" />
              רכישה
            </div>
            <h3 className="chapter-title" style={{ marginBottom: 12 }}>{LANDING_FUNNEL.productName}</h3>
            <p className="chapter-desc" style={{ marginBottom: 16 }}>
              ברגע שהרכישה תושלם, הלקוחה אמורה לקבל את המדריך ישירות למייל שלה עם קישור מסודר, כדי שתוכל לפתוח, לשמור ולחזור אליו בכל זמן.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <div className="sales-price-tag" style={{ fontSize: 16 }}>{LANDING_FUNNEL.priceLabel}</div>
              <div style={{ fontSize: 14, color: 'var(--color-fg3)', textDecoration: 'line-through' }}>380 ש"ח</div>
            </div>
            <div className="sales-mini-note">
              מה היא מקבלת: גישה דיגיטלית למדריך, תוכן מעמיק, תבניות עבודה, ומוצר שהיא יכולה לחזור אליו שוב ושוב.
            </div>
            <div style={{ marginTop: 18, display: 'grid', gap: 8 }}>
              {LANDING_RESULTS.map(function(item, i) {
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                    <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7 }}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sales-form-wrap">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>שרייני לעצמך את המדריך</div>
            <p style={{ fontSize: 14, color: 'var(--color-fg3)', lineHeight: 1.7, marginBottom: 16 }}>
              השאירי פרטים כדי לעבור לרכישה ולקבל אחר כך את המדריך למייל שלך.
            </p>

            <div className="sales-form-grid">
              <div>
                <label className="sales-label">שם מלא</label>
                <input className="sales-input" type="text" value={form.name} onChange={function(e) { updateField('name', e.target.value); }} placeholder="איך קוראים לך?" />
              </div>
              <div>
                <label className="sales-label">מייל</label>
                <input className="sales-input" type="email" value={form.email} onChange={function(e) { updateField('email', e.target.value); }} placeholder="name@example.com" dir="ltr" />
              </div>
              <div>
                <label className="sales-label">טלפון</label>
                <input className="sales-input" type="text" value={form.phone} onChange={function(e) { updateField('phone', e.target.value); }} placeholder="050-0000000" dir="ltr" />
              </div>
              <div>
                <label className="sales-label">אופן המסירה</label>
                <div className="sales-static-box">מייל עם קישור ישיר למדריך</div>
              </div>
            </div>

            <label className="sales-consent">
              <input type="checkbox" checked={!!form.consent} onChange={function(e) { updateField('consent', e.target.checked); }} />
              <span>אני מאשרת לקבל ממך בהמשך גם עדכונים, פידבק, מוצרים נוספים או הצעה לתכנית ליווי.</span>
            </label>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="hero-cta" onClick={handleSubmit}>
                אני רוצה את המדריך
              </button>
              {LANDING_FUNNEL.checkoutUrl && (
                <a href={LANDING_FUNNEL.checkoutUrl} target="_blank" rel="noreferrer" className="sales-secondary-btn">
                  מעבר ישיר לרכישה
                </a>
              )}
            </div>

            {status && <p style={{ marginTop: 14, fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7 }}>{status}</p>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function DeliverySection() {
  return (
    <section className="guide-section" style={{ paddingTop: 20 }}>
      <Reveal>
        <div className="card" style={{ padding: '30px 28px' }}>
          <div className="chapter-label" style={{ marginBottom: 16 }}>
            <div className="chapter-label-line" />
            שאלות נפוצות
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {LANDING_FAQ.map(function(item, i) {
              return (
                <AccordionCard key={i} icon="❓" title={item.q} color="#BBB2EE">
                  <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </AccordionCard>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LandingFinalCta() {
  return (
    <Reveal>
      <div className="sales-final-cta">
        <div>
          <div className="sales-final-kicker">הצעה מיוחדת</div>
          <div className="sales-final-title">149 ש"ח במקום 380 ש"ח</div>
          <div className="sales-final-text">
            אם חיפשת סוף סוף להבין את הגוף שלך כמו שצריך - זה המקום להתחיל ממנו. מדריך אחד שיכול לעשות לך הרבה סדר, ולחסוך לך חודשים של ניסוי וטעייה.
          </div>
        </div>
        <a className="hero-cta" href="#landing-purchase">
          עברי לרכישה
        </a>
      </div>
    </Reveal>
  );
}

function LandingApp() {
  return (
    <div>
      <LandingHero />
      <LandingPainSection />
      <LandingIncludesSection />
      <LandingForWhoSection />
      <PurchaseSection />
      <DeliverySection />
      <LandingFinalCta />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LandingApp />);

setTimeout(() => {
  const el = document.getElementById('loading');
  if (el) el.classList.add('hidden');
}, 200);
