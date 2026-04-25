// chapter5.jsx - 4 שבועות - FULL REAL CONTENT
const WEEKS = [
  {
    num: '01', title: 'שבוע 1', theme: 'ניקוי ואיפוס', color: '#E85D75',
    desc: 'המטרה השבוע היא לא להכניס דברים חדשים, אלא להוציא את מה שמפריע. נקרא לזה "שבוע השקט".',
    remove: ['סוכר לבן מוסף בכל צורה','קמח לבן מעובד (לחמניות תעשייתיות, מאפים, פסטה לבנה)','משקאות ממותקים ומוגזים','אלכוהול'],
    add: ['שתי כוסות מים גדולות על קיבה ריקה לפני הקפה','שתי מנות ירקות בכל ארוחה עיקרית'],
    training: 'שלושה אימוני כוח של 30-45 דקות בלבד (A, B, C). לא במלוא הכוח. המטרה - ללמוד תנועות ולתת לגוף להסתגל.',
    cardio: 'הליכה של 30 דקות, 4 פעמים בשבוע',
    lifestyle: 'חמשת ההרגלים הקטנים מתחילים. ללכת לישון חצי שעה קודם - רק חצי שעה.',
    expect: ['פחות נפיחות כללית','אנרגיה יציבה יותר אחר הצהריים','שינה קצת יותר טובה','ירידה קלה של קילו-שניים (בעיקר מים - זה בסדר)'],
    warning: 'בימים הראשונים ייתכנו קושי, עייפות או יותר חשק למתוק. זה טבעי בתקופת הסתגלות, ולכן חשוב לשתות מספיק, לאכול מסודר ולהתקדם בהדרגה.',
  },
  {
    num: '02', title: 'שבוע 2', theme: 'בניית הרגלים', color: '#BBB2EE',
    desc: 'ממשיכים עם השינויים משבוע 1 ומוסיפים מזונות שבונים. עובדים על הרגלים.',
    remove: [],
    add: ['חלבון בכל ארוחה - מטרה: 20-40 גרם בכל ארוחה עיקרית','שלוש מנות ירקות מצליבים בשבוע (ברוקולי, כרובית, רוקט)','מזון פרוביוטי פעם ביום: יוגורט / כרוב כבוש / קפיר','כף זרעי פשתן טחונים ביום'],
    training: 'A, B, C ואם את מרגישה מוכנה - מוסיפים D. אפשר להעלות בהדרגה חצי קילו עד קילו בתרגילים.',
    cardio: 'הליכה 40 דקות, 4 פעמים בשבוע',
    lifestyle: 'נשימת 4-7-8 לפני שינה. יומן הערכה - 3 דברים שמודה עליהם. טלפון מחוץ לחדר 5+ ימים.',
    expect: ['בטן שטוחה יותר באופן יציב','פחות חשקים בסוכר','יותר אנרגיה לאימונים','שינה טובה יותר','עור נקי יותר'],
  },
  {
    num: '03', title: 'שבוע 3', theme: 'העמקה והתאמות', color: '#E8A87C',
    desc: 'הגוף מתחיל להסתגל. כעת נעמיק ונוסיף קושי.',
    remove: ['קמח לבן עד לחמי מחמצת בלבד'],
    add: ['חלון אכילה 10 שעות - לא לאכול לפני 08:00 ולא אחרי 20:00','צמצום גלוטן משמעותי'],
    training: '4 אימונים עם העמסה. RPE 8-9 בסטים האחרונים. רישום חובה.',
    cardio: 'הליכה שעה, 5 פעמים בשבוע. אפשר להוסיף HIIT קצר 20 דקות (אופציונלי)',
    lifestyle: 'תמונת "לפני" ומדידות. נשימות 10 דקות בבוקר + 3 דקות לפני שינה.',
    expect: ['המשקלים עולים בהדרגה','המידות עשויות לרדת (למשל 2-3 ס"מ סביב הטבור)','יש תחושה ברורה יותר של בנייה וחיזוק הגוף','ההרגלים מתחילים להרגיש טבעיים יותר'],
  },
  {
    num: '04', title: 'שבוע 4', theme: 'שגרה לטווח ארוך', color: '#34C759',
    desc: 'שבוע של ביסוס השגרה. ממשיכות עם העצימות, בודקות מה השתפר ומתכננות איך לשמור על ההתקדמות גם הלאה.',
    remove: [],
    add: ['בכל ארוחה: יש חלבון? יש ירקות? יש פחמימה מורכבת? - שלוש שאלות, זה הכל','ארוחה מיוחדת אחת - בלי אשמה, בלי פיצוי'],
    training: '4 אימוני כוח. מודדות 1RM על 2 תרגילים ורואות כמה עלינו.',
    cardio: 'לפי תחושה',
    lifestyle: 'תמונת "אחרי". מדידות. כתיבת 3 הצלחות מ-4 שבועות. תכנון החודש הבא ביומן.',
    expect: ['תחושת ביטחון גבוהה יותר במה שעובד לך','4 שבועות של עבודה עקבית כבר מאחורייך','יש לך עכשיו תשתית טובה להמשך הדרך'],
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
  { q: 'אני צמחונית / טבעונית - איך מתאימה?', a: 'תחליפי עוף או דג בטופו, טמפה, קטניות וביצים. שתי כפות טחינה עם גרגרי חומוס יכולות להשתלב יפה בארוחה. לטבעוניות כדאי לשקול B12, ויטמין D ואומגה-3 מאצות לפי צורך.' },
  { q: 'אני לא רואה תוצאות אחרי שבועיים', a: 'שבועיים זה מוקדם. תמשיכי. אם אחרי חודש אין שינוי - בדקי: ישנה? בסטרס? האימונים בהעמסה? רישום אימון שחור על לבן לא משקר.' },
  { q: 'אני לא מצליחה לוותר על סוכר', a: 'זה קשה. תתחילי עם הגבלה חלקית - רק אחרי ארוחה, רק יום אחד בשבוע. שבועיים ואת שוברת את ההתמכרות. שבועיים של אומץ ואפשר.' },
  { q: 'יש לי בלוטת תריס - איך מתאימה?', a: 'התוכנית טובה אבל אל תצמצמי יותר מדי קלוריות. הגדילי סלניום (אגוזי ברזיל), אבץ ויוד עם מעקב רפואי. לבדוק TSH, FT3, FT4.' },
  { q: 'אני מוצפת מהמידע - מאיפה מתחילים?', a: 'חזרי לפרק 5 ותתחילי בשבוע 1. ארבעה דברים מוציאים, שני הרגלים חדשים. זה הכל. אחרי שבוע תוסיפי עוד.' },
  { q: 'מה לעשות אחרי 4 שבועות?', a: 'שלוש אפשרויות: (1) להמשיך - תוכנית שבוע 4 היא לחיים; (2) להעמיק - לעבור ל-5 ימי אימון; (3) להתחיל שוב שבוע 1 - כל פעם שחוזרים, זה קל יותר.' },
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
                        placeholder="-"
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

function FeedbackForm() {
  const [form, setForm] = useState(function() {
    return JSON.parse(localStorage.getItem('guide_feedback_form') || '{"name":"","rating":"","learned":"","apply":"","feedback":""}');
  });

  function updateField(key, value) {
    const next = Object.assign({}, form, { [key]: value });
    setForm(next);
    localStorage.setItem('guide_feedback_form', JSON.stringify(next));
  }

  function buildMessage() {
    return [
      'פידבק חדש מהמדריך',
      '',
      'שם: ' + (form.name || 'לא נכתב'),
      'דירוג כללי: ' + (form.rating || 'לא נבחר'),
      '',
      'מה למדתי מהמדריך:',
      form.learned || 'לא נכתב',
      '',
      'מה אני מתכוונת ליישם:',
      form.apply || 'לא נכתב',
      '',
      'פידבק נוסף:',
      form.feedback || 'לא נכתב',
    ].join('\n');
  }

  function sendFeedback() {
    const payload = {
      kind: 'feedback',
      name: form.name,
      rating: form.rating,
      learned: form.learned,
      apply: form.apply,
      feedback: form.feedback,
      createdAt: new Date().toISOString(),
      productName: typeof GUIDE_FUNNEL !== 'undefined' ? GUIDE_FUNNEL.productName : 'המדריך',
      page: window.location.href,
    };

    submitFunnelPayload('feedback', payload).then(function(result) {
      if (result.ok && result.mode === 'webhook') {
        alert('הפידבק נשלח.');
        return;
      }

      const subject = encodeURIComponent('פידבק חדש מהמדריך');
      const body = encodeURIComponent(buildMessage());
      const target = (typeof GUIDE_FUNNEL !== 'undefined' && GUIDE_FUNNEL.sellerEmail) ? GUIDE_FUNNEL.sellerEmail : '';
      window.location.href = 'mailto:' + target + '?subject=' + subject + '&body=' + body;
    });
  }

  async function copyFeedback() {
    try {
      await navigator.clipboard.writeText(buildMessage());
      alert('הפידבק הועתק.');
    } catch (e) {
      alert('לא הצלחתי להעתיק אוטומטית. אפשר לסמן ולהעתיק ידנית.');
    }
  }

  return (
    <div className="card" style={{ padding: '30px 28px', marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 46, height: 46, borderRadius: 18, display: 'grid', placeItems: 'center', background: 'rgba(232,93,117,0.12)', color: 'var(--color-accent)', fontSize: 22 }}>💌</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>מה למדת מהמדריך ואיך תיישמי?</div>
          <div style={{ fontSize: 14, color: 'var(--color-fg3)', lineHeight: 1.7 }}>אם קראת עד לכאן, אני ממש אשמח לשמוע ממך. מה היה הכי משמעותי, מה לקחת לדרך, ומה תרצי ליישם כבר השבוע.</div>
        </div>
      </div>

      <div className="two-col" style={{ marginTop: 22, marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>שם</label>
          <input
            type="text"
            value={form.name}
            onChange={function(e) { updateField('name', e.target.value); }}
            placeholder="איך קוראים לך?"
            style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-fg1)' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>איך היה לך המדריך?</label>
          <select
            value={form.rating}
            onChange={function(e) { updateField('rating', e.target.value); }}
            style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-fg1)' }}
          >
            <option value="">בחרי דירוג</option>
            <option value="מטורף">מטורף</option>
            <option value="ממש טוב">ממש טוב</option>
            <option value="טוב">טוב</option>
            <option value="בסדר">בסדר</option>
            <option value="יש מה לשפר">יש מה לשפר</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>מה למדת מהמדריך?</label>
          <textarea
            value={form.learned}
            onChange={function(e) { updateField('learned', e.target.value); }}
            placeholder="מה היה לך הכי משמעותי להבין?"
            rows="4"
            style={{ width: '100%', resize: 'vertical', padding: '14px 16px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-fg1)', lineHeight: 1.7 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>איך תיישמי את זה?</label>
          <textarea
            value={form.apply}
            onChange={function(e) { updateField('apply', e.target.value); }}
            placeholder="איזה שינוי את לוקחת כבר לשבוע הקרוב?"
            rows="4"
            style={{ width: '100%', resize: 'vertical', padding: '14px 16px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-fg1)', lineHeight: 1.7 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>עוד משהו שבא לך לכתוב לי?</label>
          <textarea
            value={form.feedback}
            onChange={function(e) { updateField('feedback', e.target.value); }}
            placeholder="פידבק חופשי, מחשבות, רעיונות או מה היה הכי חסר לך"
            rows="4"
            style={{ width: '100%', resize: 'vertical', padding: '14px 16px', border: '1.5px solid var(--color-border-strong)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-fg1)', lineHeight: 1.7 }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
        <button onClick={sendFeedback} style={{ padding: '14px 24px', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: 'var(--shadow-accent)' }}>
          שלחי לי את הפידבק
        </button>
        <button onClick={copyFeedback} style={{ padding: '14px 20px', background: 'rgba(187,178,238,0.18)', color: 'var(--color-fg1)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          העתיקי טקסט
        </button>
      </div>

      <p style={{ fontSize: 12, color: 'var(--color-fg3)', margin: '12px 0 0' }}>
        מה שאת כותבת נשמר אוטומטית בדפדפן עד שתשלחי או תמחקי אותו.
      </p>
    </div>
  );
}

function Chapter5() {
  const [openWeek, setOpenWeek] = useState(0);

  return (
    <section id="chapter-5" className="guide-section">
      <ChapterHeader
        label="פרק 6"
        title="תוכנית 4 השבועות"
        desc="אחרי כל התיאוריה, הגיע הזמן לעבודה. המטרה היא לא לרזות 5 ק״ג - אלא לבנות תשתית של הרגלים שילוו אותך לכל החיים."
      />

      <Reveal>
        <div className="side-note" style={{ marginBottom: 40 }}>
          <strong>חשוב לקרוא לפני שמתחילות:</strong> אחת הסיבות הנפוצות לקושי בהתמדה היא ניסיון לעשות הכול בבת אחת.
          כאן אנחנו בונות שינוי בצורה אחרת.
          בהדרגה, במדידה, בסדר.
        </div>
      </Reveal>

      {/* 4 weeks */}
      <Reveal><h3 style={sH3ch5}>ארבעה שבועות. שינוי אמיתי.</h3></Reveal>
      {WEEKS.map(function(w, i) {
        return <WeekCard key={i} week={w} isOpen={openWeek === i} onToggle={function() { setOpenWeek(openWeek === i ? -1 : i); }} />;
      })}

      <PullQuote text="4 שבועות זה רק ההתחלה. ההרגלים שתבני כאן - יישארו איתך לכל החיים." />

      {/* Progress tracker */}
      <Reveal><h3 style={{ ...sH3ch5, marginTop: 60 }}>טבלת מעקב אישית</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 20 }}>
          מלאי את הנתונים שלך בכל שבוע. לא כדי להתבאס - כדי לראות את השינוי האמיתי. נשמר בדפדפן.
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

      <Reveal>
        <FeedbackForm />
      </Reveal>

      {/* Final message */}
      <Reveal>
        <div style={{ marginTop: 60, background: 'linear-gradient(135deg, rgba(232,93,117,0.08), rgba(187,178,238,0.08))', border: '1px solid rgba(232,93,117,0.2)', borderRadius: 'var(--radius-2xl)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 20 }}>מילה אחרונה ממני</h2>
          <div style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 20px', textAlign: 'right' }}>
            <p>עברת דרך ארוכה אם קראת עד כאן. ואני כבר גאה בך.</p>
            <p>הגוף שלך מדבר איתך כל יום. כשהוא אומר "אני נפוחה" - הוא מבקש ממך עזרה. כשהוא אומר "אני עייפה" - הוא מבקש ממך עזרה. כשהוא אומר "אני רעבה בחמש בערב" - הוא מבקש ממך עזרה.</p>
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
Object.assign(window, { Chapter5 });
