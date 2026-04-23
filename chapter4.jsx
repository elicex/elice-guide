// chapter4.jsx — אורח חיים — FULL REAL CONTENT
const { useState, useEffect } = React;

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
Object.assign(window, { Chapter4 });
