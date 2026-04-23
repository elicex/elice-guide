// chapter3.jsx — אימון — FULL REAL CONTENT
const { useState } = React;

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
Object.assign(window, { Chapter3 });
