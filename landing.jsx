const LANDING_FUNNEL = {
  productName: 'בניית הגוף מבפנים ומבחוץ',
  subtitle: 'המדריך הדיגיטלי לנשים שרוצות להבין סוף סוף מה קורה בגוף שלהן, להפסיק לנחש, ולקבל דרך ברורה לתזונה, נפיחות, מעיים ואורח חיים - בצורה פרקטית, נשית וברורה',
  priceLabel: '149 ש"ח במקום 380 ש"ח',
  checkoutUrl: '',
  sellerEmail: '',
  leadWebhookUrl: '',
  guideUrl: '',
};

const LANDING_PAIN_POINTS = [
  'את אוכלת "בריא" ועדיין מרגישה נפוחה, כבדה או לא מבינה למה שום דבר לא מתיישב.',
  'יש לך מלא מידע בראש - חלבון, הורמונים, נפיחות, מעיים, קלוריות, אימונים - אבל אין לך שיטה אחת מסודרת.',
  'את רוצה לרדת בשומן, להרגיש טוב יותר בגוף, ולבנות שגרה שעובדת באמת - בלי לקפוץ כל שבוע למשהו אחר.',
  'את לא מחפשת עוד השראה. את מחפשת להבין מה לעשות, למה, ואיך ליישם את זה בחיים האמיתיים שלך.',
];

const LANDING_INCLUDES = [
  { icon: '🥗', title: 'פרק תזונה מלא', desc: 'קלוריות, חלבון, שומן, פחמימות, הורמונים, בניית ארוחות, קריאת תוויות, אלכוהול, צום לסירוגין - והכול מוסבר בעברית ברורה.' },
  { icon: '🦠', title: 'פרק מיקרוביום ומעיים', desc: 'מה באמת קורה במעי שלך, איך זה קשור לנפיחות, לאנרגיה, למצב הרוח ולהורמונים, ומה אפשר להתחיל לעשות אחרת כבר עכשיו.' },
  { icon: '🌿', title: 'מדריך נפיחות פרקטי', desc: '7 סוגי נפיחות, Low FODMAP, טריגרים נפוצים, טבלת מעקב, תפריט התחלה, וכלים לזהות מה באמת מפעיל אותך.' },
  { icon: '🌙', title: 'אורח חיים שמביא תוצאות', desc: 'שינה, סטרס, קורטיזול, הידרציה והרגלים קטנים שמשפיעים על איך את נראית, מרגישה ומתאוששת.' },
  { icon: '🗓️', title: 'תוכנית 4 שבועות', desc: 'מסלול יישום ברור שעוזר לך להפוך ידע לפעולה, במקום רק לקרוא ולהרגיש מוצפת.' },
];

const LANDING_FOR_HER = [
  'אם את רוצה להבין למה הגוף שלך מגיב כמו שהוא מגיב - ולא רק לנסות עוד שיטה אקראית.',
  'אם את מרגישה שהבטן, האנרגיה, האוכל וההורמונים שלך לא באמת עובדים יחד.',
  'אם חשוב לך מדריך נשי, עמוק, פרקטי ולא מתנשא - כזה שמסביר וגם מראה לך מה לעשות.',
];

const LANDING_RESULTS = [
  'יותר בהירות מול אוכל, ארוחות וקלוריות',
  'פחות נפיחות ויותר הבנה של הטריגרים האישיים שלך',
  'יכולת לבנות צלחת ושבוע אכילה בלי לנחש',
  'תבניות, טבלאות וכלים שתוכלי לחזור אליהם שוב ושוב',
  'פחות בלבול, פחות קיצוניות ויותר שיטה',
  'בסיס חזק שיכול לחסוך לך חודשים של ניסוי וטעייה',
];

const LANDING_DIFFERENT = [
  {
    title: 'לא עוד תוכן מפוזר',
    desc: 'במקום לקפוץ בין פוסטים, סרטונים והמלצות סותרות - יש כאן מסלול אחד שמחבר בין כל החלקים לתמונה ברורה.'
  },
  {
    title: 'גם הבנה וגם פרקטיקה',
    desc: 'לא רק להסביר למה את נפוחה או עייפה, אלא גם לעזור לך להבין מה לבדוק קודם, מה לשנות, ואיך ליישם בפועל.'
  },
  {
    title: 'בסיס מעולה לפני ליווי',
    desc: 'גם אם אחר כך תרצי להעמיק או לעבור לליווי, המדריך הזה נותן לך קודם קרקע יציבה, שפה ברורה והבנה אמיתית של הגוף שלך.'
  },
];

const LANDING_VALUE_STACK = [
  { icon: '🧭', title: 'בהירות', desc: 'תביני סוף סוף מה לעשות קודם, מה קשור למה, ואיפה בכלל מתחילים.' },
  { icon: '🛠️', title: 'כלים אמיתיים', desc: 'מחשבון, טבלאות מעקב, תבניות לבניית ארוחות, תוכנית 4 שבועות וכלים שאפשר ממש להשתמש בהם.' },
  { icon: '🧠', title: 'הבנה עמוקה', desc: 'לא רק "מה לאכול", אלא למה הגוף שלך מגיב כמו שהוא מגיב - במעיים, בהורמונים, בנפיחות ובשגרה היומיומית.' },
  { icon: '📅', title: 'יישום לחיים', desc: 'תוכנית 4 שבועות, סדר פעולות ברור, והרבה פחות תחושה של הצפה.' },
];

const LANDING_TAKEAWAYS = [
  'לדעת לבנות לעצמך ארוחה מאוזנת בלי להסתבך כל יום מחדש.',
  'להבין מה ההבדל בין נפיחות של גזים, הורמונים, עצירות, סטרס, היסטמין או SIBO.',
  'לזהות איפה את נופלת בגרעון קלורי, בחלבון, בשומן, או בחוסר סדר יומי.',
  'להבין למה שינה, סטרס, מים ואורח חיים משפיעים ישירות על התוצאות שלך.',
  'להחזיק ביד מוצר אחד שמרכז לך במקום אחד חודשים של מידע מפוזר.',
];

const LANDING_TRANSFORMATION_POINTS = {
  before: [
    'אוכלת "בסדר" ועדיין מסיימת ימים נפוחה',
    'לא בטוחה אם הבעיה היא האוכל, ההורמונים או המעיים',
    'כל שבוע מתחילה שוב משהו אחר',
    'יש הרבה מידע, אבל אין סדר',
  ],
  after: [
    'מבינה מה כנראה מפעיל אותך ומה לא',
    'יודעת איך לאכול בצורה שמרגיעה את הגוף',
    'יש לך שיטה ברורה ולא עוד ניסוי וטעייה',
    'את מרגישה שיש לך על מה להישען',
  ],
};

const LANDING_FAQ = [
  {
    q: 'איך אני מקבלת את המדריך אחרי הרכישה?',
    a: 'מיד אחרי הרכישה תקבלי גישה מסודרת למדריך, וגם מייל עם קישור אישי כדי שתוכלי לפתוח אותו מתי שנוח לך ולחזור אליו שוב ושוב.',
  },
  {
    q: 'זה מתאים רק למי שסובלת מנפיחות?',
    a: 'לא. הנפיחות היא חלק משמעותי במדריך, אבל יש כאן גם תזונה, מיקרוביום, הורמונים ואורח חיים. זה מדריך רחב על הגוף הנשי מבפנים ומבחוץ.',
  },
  {
    q: 'זה פרקטי או רק מסביר?',
    a: 'פרקטי מאוד. יש הסברים, אבל גם טבלאות, תבניות, דוגמאות, מעקבים, ובנייה של ממש - כדי שתוכלי ליישם ולא רק לקרוא.',
  },
  {
    q: 'זה מחליף ליווי אישי?',
    a: 'לא. המדריך נותן הרבה מאוד בהירות וכלים, אבל הוא עדיין מוצר דיגיטלי כללי. אם תרצי התאמה אישית, פרקטיקה צמודה ובקרה - תוכלי לעבור אחר כך גם לתכנית הליווי.',
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
          <span>הבנה אמיתית של הגוף שלך - מהבטן, דרך הצלחת, ועד התוצאות</span>
        </h1>

        <p className="hero-subtitle">
          זה לא עוד PDF עם טיפים. זה מדריך דיגיטלי עמוק, פרקטי ומסודר<br />
          שנותן לך סוף סוף שיטה להבין את הגוף שלך ולעבוד איתו, לא נגדו
        </p>

        <div className="hero-meta">
          {[
            { icon: '📚', label: '5 פרקים עמוקים עם יישום אמיתי' },
            { icon: '🛠️', label: 'כלים, טבלאות, מחשבון ותבניות' },
            { icon: '📩', label: 'נשלח ישירות למייל שלך אחרי הרכישה' },
          ].map((m, i) => (
            <div key={i} className="hero-meta-item">
              <span>{m.icon}</span>
              {m.label}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
          <div className="sales-price-tag" style={{ fontSize: 15, minHeight: 50 }}>{LANDING_FUNNEL.priceLabel}</div>
          <div className="sales-chip" style={{ minHeight: 50 }}>גישה דיגיטלית מלאה + חזרה חופשית למדריך</div>
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
            לא עוד מידע מפוזר. לא עוד "תאכלי פחות ותזוזי יותר". אלא מדריך שבונה לך הבנה אמיתית: למה את נפוחה, למה האנרגיה שלך נופלת, איך לאכול, ואיך סוף סוף לעבוד עם הגוף שלך במקום להילחם בו.
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

function BellyStateCard({ title, subtitle, chips, state = 'before' }) {
  const before = state === 'before';
  return (
    <div className="card" style={{ padding: '26px 24px', minHeight: 420 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--color-fg3)', lineHeight: 1.7, marginBottom: 18 }}>{subtitle}</div>

      <div
        aria-hidden="true"
        style={{
          height: 220,
          borderRadius: 28,
          background: before
            ? 'linear-gradient(180deg, rgba(232,93,117,0.12), rgba(232,93,117,0.04))'
            : 'linear-gradient(180deg, rgba(123,198,164,0.16), rgba(187,178,238,0.08))',
          border: '1px solid rgba(25,34,29,0.08)',
          display: 'grid',
          placeItems: 'center',
          marginBottom: 18,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: before ? 170 : 148,
            height: before ? 170 : 148,
            borderRadius: '48% 52% 46% 54% / 44% 45% 55% 56%',
            background: before
              ? 'radial-gradient(circle at 40% 35%, #ffd2da 0%, #f3a8b7 48%, #e17b91 100%)'
              : 'radial-gradient(circle at 40% 35%, #f6efe5 0%, #e8c7b3 44%, #d99d82 100%)',
            transform: before ? 'translateY(14px)' : 'translateY(4px)',
            boxShadow: before
              ? '0 24px 50px rgba(232,93,117,0.16)'
              : '0 24px 50px rgba(123,198,164,0.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: before ? 112 : 96,
            height: 140,
            borderRadius: '48px 48px 24px 24px',
            background: before
              ? 'linear-gradient(180deg, #f7dccf 0%, #efc3ad 100%)'
              : 'linear-gradient(180deg, #f8e2d3 0%, #efc6b1 100%)',
            transform: 'translateY(-38px)',
            boxShadow: '0 8px 20px rgba(25,34,29,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            padding: '8px 12px',
            borderRadius: 999,
            background: before ? 'rgba(232,93,117,0.12)' : 'rgba(123,198,164,0.18)',
            color: before ? 'var(--color-accent)' : '#2E8B57',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {before ? 'נפיחות, לחץ וכבדות' : 'יותר רוגע, יותר בהירות'}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {chips.map(function(chip, i) {
          return (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: before ? 'var(--color-accent)' : '#2E8B57', fontWeight: 800 }}>•</span>
              <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7 }}>{chip}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingTransformationSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 10 }}>
      <Reveal>
        <div className="chapter-label" style={{ marginBottom: 16 }}>
          <div className="chapter-label-line" />
          השינוי שהיא קונה
        </div>
        <h2 className="chapter-title" style={{ marginBottom: 14 }}>
          לא עוד “אני נפוחה ואין לי מושג למה” - אלא יותר שקט, יותר הבנה, ויותר שליטה
        </h2>
        <p className="chapter-desc" style={{ marginBottom: 24 }}>
          המדריך הזה לא מבטיח קסם ולא “בטן שטוחה ב־3 ימים”. הוא נותן משהו הרבה יותר חזק: הבנה אמיתית של מה כנראה קורה אצלך, וכלים להתחיל לשנות את זה בצורה חכמה.
        </p>
      </Reveal>

      <div className="card-grid-2">
        <Reveal>
          <BellyStateCard
            state="before"
            title="לפני"
            subtitle="בלבול, נפיחות, ותחושה שהגוף עושה מה שהוא רוצה"
            chips={LANDING_TRANSFORMATION_POINTS.before}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <BellyStateCard
            state="after"
            title="אחרי"
            subtitle="יותר סדר, פחות בלבול, וכלים שמרגיעים את הגוף במקום להילחם בו"
            chips={LANDING_TRANSFORMATION_POINTS.after}
          />
        </Reveal>
      </div>
    </section>
  );
}

function LandingValueSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 10 }}>
      <Reveal>
        <div className="chapter-label" style={{ marginBottom: 16 }}>
          <div className="chapter-label-line" />
          הערך שאת מקבלת
        </div>
        <h2 className="chapter-title" style={{ marginBottom: 14 }}>
          את לא קונה רק מדריך - את קונה סדר, הבנה וכלים שילכו איתך הרבה אחרי הקריאה
        </h2>
        <p className="chapter-desc" style={{ marginBottom: 24 }}>
          המטרה של המדריך הזה היא לא רק שתסיימי לקרוא ותגידי "מעניין". המטרה היא שתצאי ממנו עם יותר בהירות, יותר ביטחון, ופחות תחושת ניסוי וטעייה מול הגוף שלך.
        </p>
      </Reveal>

      <div className="card-grid-2">
        {LANDING_VALUE_STACK.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card" style={{ padding: '24px 22px', minHeight: 180 }}>
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
          המדריך בנוי כמו מערכת אחת. כל פרק מסביר שכבה אחרת, אבל יחד הם נותנים לך תמונה שלמה, ישימה ומדויקת - כדי שלא תצטרכי לחבר לבד בין עשרות פוסטים, סרטונים והמלצות סותרות.
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

function LandingTakeawaySection() {
  return (
    <section className="guide-section" style={{ paddingTop: 24 }}>
      <Reveal>
        <div className="card" style={{ padding: '34px 32px' }}>
          <div className="chapter-label" style={{ marginBottom: 16 }}>
            <div className="chapter-label-line" />
            עם מה את יוצאת
          </div>
          <h2 className="chapter-title" style={{ marginBottom: 14 }}>
            לא רק מידע - אלא דברים שתוכלי ממש לקחת איתך הלאה
          </h2>
          <p className="chapter-desc" style={{ marginBottom: 22 }}>
            אם את שואלת את עצמך מה נשאר לך ביד בסוף, התשובה היא: הרבה יותר מבסיס. את יוצאת עם שפה חדשה להבין את הגוף שלך, ועם כלים שאפשר לחזור אליהם שוב ושוב.
          </p>
          <div className="card-grid-2">
            {LANDING_TAKEAWAYS.map(function(item, i) {
              return (
                <div key={i} className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                    <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75 }}>{item}</div>
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

function LandingDifferentSection() {
  return (
    <section className="guide-section" style={{ paddingTop: 8 }}>
      <Reveal>
        <div className="chapter-label" style={{ marginBottom: 16 }}>
          <div className="chapter-label-line" />
          למה זה שונה
        </div>
        <h2 className="chapter-title" style={{ marginBottom: 14 }}>זה לא עוד אוסף טיפים - אלא מסלול מסודר להבנה ויישום</h2>
        <p className="chapter-desc" style={{ marginBottom: 24 }}>
          הרעיון כאן הוא לא להציף אותך בעוד מידע, אלא לקחת תחומים שנשמעים מורכבים ולתרגם אותם למשהו בהיר, ישים ונעים לעבודה.
        </p>
      </Reveal>
      <div className="card-grid-3">
        {LANDING_DIFFERENT.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card" style={{ padding: '24px 22px', minHeight: 198 }}>
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
      setStatus('הפרטים נשמרו. חיבור הסליקה/שרת עדיין לא הושלם, אבל הטופס עצמו קלט את הנתונים.');
      return;
    }

    if (LANDING_FUNNEL.checkoutUrl) {
      window.open(LANDING_FUNNEL.checkoutUrl, '_blank', 'noopener,noreferrer');
      setStatus('הפרטים נשמרו. מעבירה אותך לרכישה.');
      return;
    }

    setStatus('הפרטים נשמרו. השלב הבא הוא לחבר את העמוד הזה לרכישה האמיתית.');
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
              ברגע שהרכישה תושלם, המדריך יישלח ישירות למייל שלה עם קישור מסודר, כדי שתוכל לפתוח, לשמור ולחזור אליו בכל זמן.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <div className="sales-price-tag" style={{ fontSize: 16 }}>{LANDING_FUNNEL.priceLabel}</div>
              <div style={{ fontSize: 14, color: 'var(--color-fg3)', textDecoration: 'line-through' }}>380 ש"ח</div>
            </div>
            <div className="sales-mini-note">
              ב־149 ש"ח היא מקבלת מדריך דיגיטלי עמוק, מסודר ויישומי, עם תבניות, טבלאות, מחשבון וכלים שיכולים לחסוך לה הרבה מאוד בלבול, זמן וניסוי וטעייה.
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
              השאירי פרטים כדי לעבור לרכישה ולקבל אחר כך את המדריך למייל שלך. אם חיפשת נקודת התחלה אחת טובה, מסודרת ורצינית - זה בדיוק זה.
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
            אם חיפשת סוף סוף להבין את הגוף שלך כמו שצריך - זה המקום להתחיל ממנו. בשביל 149 ש"ח את מקבלת מדריך שיכול לעשות לך הרבה סדר, לתת לך כלים אמיתיים, ולחסוך לך חודשים של ניסוי וטעייה.
            <br /><br />
            זה לא עוד קובץ שפותחים פעם אחת ושוכחים. זה מדריך שאפשר לחזור אליו שוב ושוב, ליישם ממנו, ולבנות בעזרתו שפה חדשה מול הגוף, האוכל והנפיחות שלך.
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
      <LandingTransformationSection />
      <LandingValueSection />
      <LandingIncludesSection />
      <LandingTakeawaySection />
      <LandingForWhoSection />
      <LandingDifferentSection />
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
