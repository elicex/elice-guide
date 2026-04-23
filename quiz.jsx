// quiz.jsx — 5 bloating types with FULL real content
const { useState } = React;

const BLOATING_TYPES = [
  {
    id: 'gas',
    title: 'נפיחות גזים',
    emoji: '🫧',
    color: '#E8A87C',
    signs: [
      'הבטן מתנפחת תוך שעה-שעתיים אחרי ארוחה',
      'קולות קרקור וגזים מרובים, לפעמים עם ריח חזק',
      'לחץ ותחושת מלאות באזור הבטן העליונה או התחתונה',
      'לפעמים כאב שמשתחרר אחרי גז',
      'הנפיחות משתחררת לפנות בוקר — מתעוררת עם בטן שטוחה',
    ],
    cause: 'כשמזון לא מתפרק כמו שצריך במעי הדק, הוא מגיע למעי הגס. שם הוא פוגש את חיידקי המעי שמתחילים לתסוס אותו. התוסס הזה מפיק גזים, בעיקר מימן ומתאן. הסיבות הנפוצות: פחמימות FODMAP (שום, בצל, קטניות, כרובית), חוסר אנזימי עיכול, ו-SIBO — צמיחת יתר של חיידקים במעי הדק.',
    solutions: [
      'להאט את קצב האכילה — לעיסה 20-30 פעם לכל ביס',
      'יומן מזון לשבועיים לזיהוי טריגרים אישיים',
      'תה נענע, ג\'ינג\'ר ושומר אחרי ארוחה — זה לא אגדה, זה עובד',
      'חומץ תפוחים מדולל במים 10 דקות לפני הארוחה (אם אין צרבות)',
      'אם הבעיה חמורה — בדיקת נשיפה ל-SIBO אצל גסטרואנטרולוג',
    ],
  },
  {
    id: 'hormonal',
    title: 'נפיחות הורמונלית',
    emoji: '🌊',
    color: '#BBB2EE',
    signs: [
      'מופיעה 7-10 ימים לפני הווסת, נעלמת ביום 1-2 של הדימום',
      'כאבי שד, תנודות מצב רוח, כאבי ראש',
      'נפיחות לא רק בבטן — גם פנים, אצבעות, קרסוליים',
      'הגוף מרגיש "כבד"',
      'עלייה של קילו עד שלושה בלילה אחד',
    ],
    cause: 'בשבוע לפני הווסת רמות האסטרוגן יורדות והפרוגסטרון עולה. הפרוגסטרון מאט את תנועת המעיים. האסטרוגן גורם לאגירת מים ונתרן. התוצאה: שילוב של נפיחות מים, גזים ותנועה איטית. אצל נשים עם PMS חמור, PCOS או פרימנופאוזה — חזקה במיוחד.',
    solutions: [
      'מעקב אחר המחזור באפליקציה — לדעת מתי לצפות',
      'צמצום נתרן שבוע לפני הווסת (להימנע ממזון מעובד)',
      'הגדלת אשלגן — אבוקדו, בננה, בטטה, תרד, קיווי',
      'לשתות יותר מים (לא פחות!) — גוף ספוג מים לא אוגר',
      'זרעי פשתן טחונים — קושרים אסטרוגן עודף ומסייעים לפינוי',
      'אימון כוח בימים האלה — מפחית דלקת ומשפר פינוי הורמוני',
    ],
  },
  {
    id: 'constipation',
    title: 'נפיחות עצירות',
    emoji: '🪨',
    color: '#E85D75',
    signs: [
      'לא מתרוקנת כל יום — לפעמים יומיים-שלושה ויותר',
      'צואה יבשה וקשה',
      'תחושת מלאות כבדה בבטן התחתונה',
      'הנפיחות מחמירה עם הזמן לאורך היום, לא קשורה לארוחה ספציפית',
      'פריחות בפנים או באזור הסנטר',
    ],
    cause: 'שילוב של: חוסר בסיבים (רוב הנשים על 15 גרם, צריך 25-35), חוסר מים, חוסר תנועה, חוסר מגנזיום, לחץ כרוני, ולפעמים בלוטת תריס איטית. כשאין מספיק נוזלים, הסיבים לא יכולים לעשות את עבודתם.',
    solutions: [
      'שתי כוסות מים גדולות על קיבה ריקה לפני הקפה — כל יום',
      'כף זרעי פשתן טחונים ביום (מוסיפה ליוגורט, שייק, סלט)',
      'מגנזיום ציטראט 300-400 מ"ג בערב — שינוי חיים',
      'הליכה 20 דקות אחרי ארוחת בוקר — מפעילה רפלקס גסטרוקולי',
      'שעת שירותים קבועה בבוקר — המעי לומד הרגל',
      'לבדוק TSH, FT3, FT4 אם הבעיה קיצונית',
    ],
  },
  {
    id: 'sensitivity',
    title: 'נפיחות רגישות מזון',
    emoji: '🥛',
    color: '#34C759',
    signs: [
      'הנפיחות מופיעה בעקבות מזון ספציפי, תוך 20 דקות עד שעתיים',
      'מרגישה מיד שמשהו לא בסדר',
      'לפעמים: פריחה בעור, ערפל מוחי, כאבי ראש, עייפות פתאומית',
      'לפעמים שלשולים, לפעמים עצירות, לפעמים גם וגם',
      'אכלת את אותו מזון שנים ופתאום זה מתחיל',
    ],
    cause: 'זה לא תמיד אלרגיה קלאסית — לרוב רגישות שבה המערכת החיסונית מגיבה בצורה מעודנת. הרגישויות הנפוצות: לקטוז, גלוטן, ביצים, סויה, FODMAP. מעי דולף — כשדופן המעי מאבד שלמות וחלבוני מזון לא שלמים עוברים לדם — הוא גורם מרכזי לרגישויות שמתפתחות בגיל מבוגר.',
    solutions: [
      'דיאטת אלימינציה 3 שבועות — מסירים גלוטן, חלב, ביצים, סויה, סוכר, אלכוהול',
      'אחרי 3 שבועות — מחזירים מזון אחד כל 3 ימים ובודקים',
      'L-גלוטמין, אבץ, שמן דגים, קולוסטרום — לריפוי דופן המעי',
      'להימנע ממזון מעובד לחלוטין',
      'בדיקות דם לרגישויות לרוב לא מדויקות — תהליך אלימינציה עדיף',
    ],
  },
  {
    id: 'stress',
    title: 'נפיחות סטרס וקורטיזול',
    emoji: '😤',
    color: '#FF9500',
    signs: [
      'לא קשורה לשום מזון ספציפי',
      'מופיעה בתקופות לחוצות גם בלי קשר לאכילה',
      'הבטן נראית "קשה", לא "רכה"',
      'שומן נאגר בעיקר סביב הבטן',
      'חשק עז לסוכר ומלוח בשעות אחה"צ-ערב',
      'מתעוררת עייפה גם אחרי 8 שעות שינה',
    ],
    cause: 'קורטיזול אמור לעלות בבוקר ולרדת בערב. בלחץ כרוני — הוא נשאר גבוה כל היום. התוצאה: אגירת נוזלים, האטת עיכול, שיבוש חיידקי המעי, אגירת שומן ויסצרלי (סביב האיברים). שומן זה פעיל הורמונלית ומפריש חומרים דלקתיים שמחזקים את המעגל.',
    solutions: [
      'שינה 7-9 שעות — לא ניתן לפיצוי. זה הבסיס',
      'לא להוסיף HIIT בזמן סטרס — מעלה קורטיזול עוד יותר',
      'נשימת 4-7-8 פעמיים ביום (בוקר + לפני שינה)',
      'בוקר איטי — 20 דקות בלי טלפון ומיילים',
      'אשוואגנדה 600 מ"ג בערב, רודיולה בבוקר',
      'הליכה ביום בלי טלפון — 20 דקות, זה תרופה',
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'מתי הנפיחות בדרך כלל מתגברת?',
    opts: [
      { emoji: '🍽️', label: 'תוך שעה-שעתיים אחרי ארוחה', type: 'gas' },
      { emoji: '📅', label: 'שבוע לפני המחזור', type: 'hormonal' },
      { emoji: '🔄', label: 'לאורך כל היום, לא קשור לאכילה', type: 'constipation' },
      { emoji: '😤', label: 'בתקופות לחץ וסטרס', type: 'stress' },
    ],
  },
  {
    q: 'איך הבטן מרגישה?',
    opts: [
      { emoji: '🫧', label: 'מלאה גזים ורעשים', type: 'gas' },
      { emoji: '💧', label: 'כבדה ונפוחה, גם פנים ואצבעות', type: 'hormonal' },
      { emoji: '🪨', label: 'קשה, תחושת מלאות בתחתית', type: 'constipation' },
      { emoji: '🎈', label: 'מתנפחת אחרי מזון ספציפי', type: 'sensitivity' },
    ],
  },
  {
    q: 'מה מצב התנועתיות שלך?',
    opts: [
      { emoji: '💨', label: 'גזים מרובים, לפעמים עם ריח', type: 'gas' },
      { emoji: '🌊', label: 'שלשולים או רגישות מחזורית', type: 'sensitivity' },
      { emoji: '🐢', label: 'עצירות — יומיים-שלושה בלי יציאה', type: 'constipation' },
      { emoji: '✅', label: 'תקינה, הבעיה היא רק הנפיחות', type: 'stress' },
    ],
  },
  {
    q: 'האם יש תסמינים נוספים?',
    opts: [
      { emoji: '😣', label: 'כאבי בטן שמשתחררים אחרי גז', type: 'gas' },
      { emoji: '😔', label: 'כאבי שד, תנודות מצב רוח', type: 'hormonal' },
      { emoji: '🤯', label: 'ערפל מוחי, עייפות, פריחה בעור', type: 'sensitivity' },
      { emoji: '😓', label: 'עלייה בבטן, חשקים בסוכר', type: 'stress' },
    ],
  },
  {
    q: 'מתי הנפיחות נעלמת?',
    opts: [
      { emoji: '🌅', label: 'בבוקר — מתעוררת עם בטן שטוחה', type: 'gas' },
      { emoji: '🩸', label: 'עם תחילת הווסת', type: 'hormonal' },
      { emoji: '🚽', label: 'אחרי יציאה', type: 'constipation' },
      { emoji: '🧘', label: 'לא ממש נעלמת', type: 'stress' },
    ],
  },
  {
    q: 'מה הכי מחמיר את הנפיחות?',
    opts: [
      { emoji: '🫘', label: 'קטניות, כרוב, שום, בצל', type: 'gas' },
      { emoji: '🧀', label: 'מוצרי חלב', type: 'sensitivity' },
      { emoji: '🍞', label: 'לחם ומוצרי גלוטן', type: 'sensitivity' },
      { emoji: '⚡', label: 'סטרס ולחץ, ללא קשר למזון', type: 'stress' },
    ],
  },
];

function getResultType(answers) {
  const scores = {};
  BLOATING_TYPES.forEach(t => scores[t.id] = 0);
  answers.forEach(a => { if (a) scores[a] = (scores[a] || 0) + 1; });
  return Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
}

function BloatingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const select = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setResult(getResultType(newAnswers));
      }
    }, 300);
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  if (result) {
    const t = BLOATING_TYPES.find(x => x.id === result);
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div style={{ fontSize: 52, marginBottom: 12 }}>{t.emoji}</div>
          <div className="quiz-result-type" style={{ color: t.color }}>{t.title}</div>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            padding: 20, textAlign: 'right', marginTop: 20, marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 12, letterSpacing: '0.08em' }}>
              מה עוזר עבורך
            </div>
            {t.solutions.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
              </div>
            ))}
          </div>
          <button onClick={reset} style={{
            background: 'none', border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)', padding: '8px 20px', cursor: 'pointer',
            fontSize: 13, color: 'var(--color-fg3)', fontFamily: 'var(--font-body)',
          }}>ענה שוב</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz-container">
      <div className="quiz-step-indicator">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} className={'quiz-dot' + (i === step ? ' active' : '') + (i < step ? ' done' : '')} />
        ))}
      </div>
      <div key={step} style={{ animation: 'fade-scale 0.3s var(--anim-ease)' }}>
        <p className="quiz-question">{q.q}</p>
        <div className="quiz-options">
          {q.opts.map(function(opt, i) {
            return (
              <button key={i} className="quiz-option-btn" onClick={function() { select(opt.type); }}>
                <span className="quiz-option-emoji">{opt.emoji}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--color-fg3)' }}>
        שאלה {step + 1} מתוך {QUIZ_QUESTIONS.length}
      </div>
    </div>
  );
}

function BloatingSection() {
  return (
    <section id="section-bloating" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="סקשן פתיחה"
        title='לא כל נפיחות נולדת שווה. תזהי את שלך'
        desc="לפני שמדברות על תזונה, מעיים או אימון, יש שאלה אחת שאני מבקשת ממך לענות עליה. איזה סוג נפיחות יש לך?"
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 32, maxWidth: 700 }}>
          רוב הנשים לא יודעות. הן קוראות לזה "בטן נפוחה" וחושבות שזה דבר אחד. האמת היא שיש לפחות חמישה סוגי נפיחות שונים, ולכל אחד יש גורמים אחרים ופתרונות אחרים.
          מה שעובד לאחת בדיוק לא יעבוד לשנייה.
        </p>
      </Reveal>

      {/* Quiz */}
      <Reveal>
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)', padding: '40px 32px',
          boxShadow: 'var(--shadow-soft)', marginBottom: 60,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            גלי את סוג הנפיחות שלך
          </h3>
          <p style={{ fontSize: 13, color: 'var(--color-fg3)', textAlign: 'center', marginBottom: 28 }}>
            6 שאלות קצרות — תוצאה אישית
          </p>
          <BloatingQuiz />
        </div>
      </Reveal>

      {/* 5 type cards */}
      <Reveal>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--color-fg1)' }}>
          5 סוגי הנפיחות — מדריך מלא
        </h3>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 24 }}>
          קראי את כל הכרטיסיות לאט. סמני את מה שמתאים לך.
        </p>
      </Reveal>

      {BLOATING_TYPES.map(function(t, i) {
        return (
          <Reveal key={t.id} delay={i * 0.07}>
            <AccordionCard icon={t.emoji} title={t.title} teaser={t.signs[0]} color={t.color}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>
                  הסימנים שלך
                </div>
                {t.signs.map(function(s, j) {
                  return (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                      <span style={{ color: t.color, flexShrink: 0 }}>›</span>{s}
                    </div>
                  );
                })}
              </div>

              <div style={{ background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>מה גורם לזה</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{t.cause}</p>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>מה עוזר</div>
                {t.solutions.map(function(s, j) {
                  return (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                      <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                    </div>
                  );
                })}
              </div>
            </AccordionCard>
          </Reveal>
        );
      })}

      <Reveal>
        <div className="side-note" style={{ marginTop: 32 }}>
          <strong>הרבה נשים מזהות יותר מסוג אחד.</strong> זה בסדר ונורמלי. תתחילי מהסוג שהכי דומיננטי אצלך,
          ואחרי חודש-שניים תזהי שרוב הסוגים האחרים נרגעים יחד.
        </div>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        <BookmarkBtn id="section-bloating" label="סוג הנפיחות שלך" />
      </div>
    </section>
  );
}

Object.assign(window, { BloatingSection });
