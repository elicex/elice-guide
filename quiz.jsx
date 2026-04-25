// quiz.jsx - bloating diagnosis opening + 7 types
const BLOATING_TYPES = [
  {
    id: 'food-gas',
    title: 'נפיחות גזים תזונתית',
    emoji: '🫧',
    color: '#E8A87C',
    signs: [
      'הנפיחות עולה תוך זמן קצר אחרי ארוחה',
      'יש קרקורים, גזים או לחץ בבטן',
      'בבוקר לעיתים הבטן שטוחה יותר, ובמהלך היום זה מחמיר',
      'יש מזונות מסוימים שאת כבר חושדת בהם',
    ],
    cause: 'מזון שלא מתעכל היטב ממשיך הלאה ועובר תסיסה על ידי חיידקי המעי. זה שכיח במיוחד סביב מזונות עתירי FODMAP, אכילה מהירה, עומס בארוחה אחת או עיכול פחות יעיל.',
    focus: 'זה בדרך כלל נראה כמו בטן שמגיבה לארוחות, למסעדות, לשילובים מסוימים או לימים שבהם אכלת מהר ובלי קשב.',
    solutions: [
      'להאט אכילה ולעבור ללעיסה יסודית יותר',
      'לנהל יומן מזון וסימפטומים לשבועיים',
      'לבדוק בהמשך התאמה ל-Low FODMAP מסודר',
      'להיעזר בתה נענע, ג׳ינג׳ר או שומר אחרי ארוחות',
    ],
    firstStep: 'במשך 7 ימים כתבי מה אכלת, מתי התנפחת, ומה הייתה עוצמת הנפיחות. בלי המעקב הזה קשה להבין את הדפוס האמיתי.',
  },
  {
    id: 'hormonal',
    title: 'נפיחות הורמונלית ציקלית',
    emoji: '🌊',
    color: '#BBB2EE',
    signs: [
      'מופיעה לרוב בשבוע שלפני הווסת',
      'יש תחושת כבדות, אגירת נוזלים או עלייה זמנית במשקל',
      'לפעמים יש גם כאבי שד, שינויים במצב הרוח או חשקים',
      'עם תחילת הווסת יש הקלה חלקית או מלאה',
    ],
    cause: 'שינויים באסטרוגן ובפרוגסטרון משפיעים על אגירת נוזלים, על תנועתיות המעי ועל האופן שבו הגוף מרגיש לאורך החודש. אצל חלק מהנשים זו אחת הסיבות המרכזיות לנפיחות.',
    focus: 'ביומיום זה מרגיש כמו שבוע שבו הגוף פשוט יושב אחרת עליך, גם אם לא שינית שום דבר דרמטי באוכל.',
    solutions: [
      'מעקב מחזור מסודר והצלבה מול הנפיחות',
      'הפחתת נתרן ומזון מעובד בשבוע שלפני הווסת',
      'הגדלת מזונות עשירים באשלגן',
      'תנועה קבועה, שינה טובה והפחתת אלכוהול סביב הימים הרגישים',
    ],
    firstStep: 'עקבי לפחות שני מחזורים מלאים אחרי הימים שבהם הנפיחות מתחילה ונרגעת. אם יש דפוס קבוע, זו כבר חתיכת תשובה.',
  },
  {
    id: 'constipation',
    title: 'נפיחות עצירות',
    emoji: '🪨',
    color: '#E85D75',
    signs: [
      'אין יציאה יומית קלה ונוחה',
      'הבטן מרגישה מלאה וכבדה, בעיקר בתחתית',
      'הנפיחות הולכת ומחמירה ככל שהיום מתקדם',
      'אחרי יציאה יש תחושת הקלה',
    ],
    cause: 'כשיש האטה בתנועתיות המעי או קושי קבוע ביציאות, הצואה נשארת יותר זמן במעי והנפיחות מתגברת. חוסר במים, סיבים, תנועה, מגנזיום או איזון הורמונלי יכולים להשתתף בתמונה.',
    focus: 'זו נפיחות שפחות קשורה לביס אחד ויותר לתחושת תקיעות כללית של מערכת העיכול.',
    solutions: [
      'שתי כוסות מים בבוקר על קיבה ריקה',
      'הליכה קבועה אחרי ארוחת הבוקר',
      'הגדלה הדרגתית של סיבים בהתאם לסבילות',
      'בדיקה אם מגנזיום, תזונה ושגרת שירותים עוזרים',
    ],
    firstStep: 'התחילי משלושת הבסיסים: מים בבוקר, הליכה קצרה, ועקביות סביב שעה קבועה לשירותים.',
  },
  {
    id: 'sensitivity',
    title: 'נפיחות רגישות מזון',
    emoji: '🥛',
    color: '#34C759',
    signs: [
      'יש מזון מסוים שאת מרגישה שאחריו משהו “לא יושב טוב”',
      'לפעמים יש גם עייפות, כאב ראש, ערפל מוחי או תגובת עור',
      'התגובה יכולה להגיע תוך חצי שעה ועד כמה שעות',
      'לפעמים זה נראה כמו “כל הגוף מגיב”, לא רק הבטן',
    ],
    cause: 'לפעמים מדובר ברגישות, לפעמים בקושי עיכולי, ולפעמים בתגובה מערכתית יותר. הגלוטן, חלב, ביצים, סויה, FODMAP או מזון מעובד יכולים להיות מעורבים אצל חלק מהנשים.',
    focus: 'זו בדרך כלל נפיחות שמגיעה עם תחושת “זה לא רק גזים, משהו כאן ממש מעצבן אותי”.',
    solutions: [
      'להתחיל ממעקב לפני שמוציאים קבוצות מזון שלמות',
      'לשקול אלימינציה מסודרת ולא אקראית',
      'להפחית מזון מעובד בזמן הבדיקה',
      'במקרים מסוימים לשקול ליווי מקצועי',
    ],
    firstStep: 'בחרי מזון אחד שאת באמת חושדת בו, ובדקי אותו מסודר במקום להתחיל להימנע מהכול בבת אחת.',
  },
  {
    id: 'stress',
    title: 'נפיחות סטרס וקורטיזול',
    emoji: '😤',
    color: '#FF9500',
    signs: [
      'אין קשר חד למזון ספציפי',
      'הנפיחות מחמירה בתקופות עמוסות או אחרי לילות גרועים',
      'הבטן מרגישה יותר קשה ומתוחה',
      'יש גם חשקים, עייפות או תחושת עומס כללי',
    ],
    cause: 'המעי והמוח מחוברים כל הזמן. סטרס כרוני, אכילה בלחץ, שינה לא טובה ועומס עצבי יכולים לשבש תנועתיות, הפרשת חומצה קיבתית והרגשה כללית במערכת העיכול.',
    focus: 'זה נראה כמו גוף שמגיב ללו״ז, למסכים, למתח ולחוסר התאוששות, לא רק למה שיש בצלחת.',
    solutions: [
      'נשימה סרעפתית לפני ארוחות',
      'שיפור שינה והפחתת עומס עצבי',
      'הליכה יומית קבועה',
      'להימנע מהוספת אימונים אגרסיביים בזמן עומס גבוה',
    ],
    firstStep: 'לפני עוד דיאטה, בדקי מה מצב השינה, הקפה, הלחץ והאכילה תוך כדי ריצה. אצל הרבה נשים זו הסיבה המרכזית.',
  },
  {
    id: 'sibo',
    title: 'נפיחות SIBO',
    emoji: '🎈',
    color: '#D97706',
    signs: [
      'נפיחות חזקה מאוד, לפעמים כבר מהביס הראשון',
      'גם אוכל “בריא” יכול לנפח אותך מאוד',
      'Low FODMAP עשויה לעזור חלקית אבל לא לפתור',
      'לעיתים יש שלשול, עצירות או שניהם לסירוגין',
    ],
    cause: 'ב-SIBO יש צמיחת יתר של חיידקים במעי הדק, מקום שבו בדרך כלל אמורים להיות מעט יחסית. כשהם מתסיסים אוכל מוקדם מדי, נוצרת נפיחות משמעותית ומהירה.',
    focus: 'זה הסוג שגורם להרבה נשים להרגיש ששום דבר שהן ניסו באמת לא פתר את הבעיה מהשורש.',
    solutions: [
      'לשקול בירור מסודר ובדיקת נשיפה',
      'להשתמש בדיאטה כהפחתת סימפטומים, לא כפתרון יחיד',
      'לבדוק גם חומצה קיבתית, תנועתיות וסטרס',
      'לעבוד מסודר ולא לנסות הכול בבת אחת',
    ],
    firstStep: 'אם את מרגישה שהנפיחות חריגה, מהירה, קבועה ולא מגיבה טוב לכלים הרגילים, שווה לשקול כיוון של SIBO ולא רק “רגישות כללית”.',
  },
  {
    id: 'histamine',
    title: 'נפיחות היסטמין',
    emoji: '🍷',
    color: '#8B5CF6',
    signs: [
      'החמרה אחרי יין, גבינות בשלות, מזון מותסס או שאריות',
      'יחד עם הנפיחות יש לפעמים כאב ראש, גרד, נזלת או דופק מהיר',
      'לפעמים מחמיר לפני הווסת',
      'התחושה היא לא רק עיכולית, אלא תגובתית יותר',
    ],
    cause: 'אצל חלק מהנשים יש קושי יחסי לפרק היסטמין, או עומס היסטמין שמגיע עם מזון, מיקרוביום, דלקת או סטרס. זה יכול להתבטא גם בנפיחות וגם בתסמינים נוספים.',
    focus: 'ביומיום זה נראה כמו גוף שמגיב חזק למזונות “מזדקנים”, מותססים או אלכוהול, ולא תמיד ברור מיד שזה הכיוון.',
    solutions: [
      'לבדוק אם יש דפוס ברור סביב מזונות עתירי היסטמין',
      'לשקול ניסיון קצר ומדויק של הפחתת היסטמין',
      'לבדוק קשר למחזור ולסטרס',
      'להבין אם יש גם רקע של SIBO או דיסביוזיס',
    ],
    firstStep: 'אם את רואה תגובה ליין, גבינות קשות, מזון מותסס או שאריות, שווה לסמן את כיוון ההיסטמין ולבדוק אותו מסודר.',
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'מתי הנפיחות בדרך כלל מתחילה?',
    opts: [
      { emoji: '🍽️', label: 'סביב ארוחות מסוימות', type: 'food-gas' },
      { emoji: '📅', label: 'סביב הווסת', type: 'hormonal' },
      { emoji: '🌅', label: 'אני קמה כבר נפוחה', type: 'sibo' },
      { emoji: '😤', label: 'בימים לחוצים במיוחד', type: 'stress' },
    ],
  },
  {
    q: 'מה הכי מתאר את התחושה שלך?',
    opts: [
      { emoji: '🫧', label: 'גזים, רעשים ולחץ', type: 'food-gas' },
      { emoji: '🪨', label: 'כבדות ותקיעות', type: 'constipation' },
      { emoji: '🌊', label: 'אגירת נוזלים וכבדות כללית', type: 'hormonal' },
      { emoji: '⚡', label: 'תגובה חזקה ולא צפויה', type: 'histamine' },
    ],
  },
  {
    q: 'מה קורה סביב יציאות?',
    opts: [
      { emoji: '🚽', label: 'אחרי יציאה יש הקלה', type: 'constipation' },
      { emoji: '✅', label: 'היציאות יחסית תקינות', type: 'food-gas' },
      { emoji: '🔄', label: 'שלשול ועצירות מתחלפים', type: 'sibo' },
      { emoji: '🌫️', label: 'לא יודעת, זה לא מרגיש קשור', type: 'stress' },
    ],
  },
  {
    q: 'האם יש תסמינים נוספים מעבר לבטן?',
    opts: [
      { emoji: '🤯', label: 'עייפות, ערפל מוחי או כאב ראש', type: 'sensitivity' },
      { emoji: '💓', label: 'גרד, נזלת, דופק או כאב ראש אחרי אוכל', type: 'histamine' },
      { emoji: '🥺', label: 'כאבי שד או תנודות מצב רוח', type: 'hormonal' },
      { emoji: '😴', label: 'עייפות ולחץ כללי', type: 'stress' },
    ],
  },
  {
    q: 'איזה משפט הכי מרגיש נכון?',
    opts: [
      { emoji: '🥖', label: 'יש מזונות שאני כבר חושדת בהם', type: 'sensitivity' },
      { emoji: '🧄', label: 'שום, בצל וקטניות הם אויבים', type: 'food-gas' },
      { emoji: '🍷', label: 'יין, גבינות או מזון מותסס מפילים אותי', type: 'histamine' },
      { emoji: '🤰', label: 'אני מרגישה נפוחה מאוד, כמו “בהריון”', type: 'sibo' },
    ],
  },
];

function getResultType(answers) {
  const scores = {};
  BLOATING_TYPES.forEach(function(t) { scores[t.id] = 0; });
  answers.forEach(function(a) {
    if (a) scores[a] = (scores[a] || 0) + 1;
  });
  return Object.entries(scores).sort(function(a, b) { return b[1] - a[1]; })[0][0];
}

function BloatingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  function select(type) {
    const newAnswers = answers.concat(type);
    setAnswers(newAnswers);
    setTimeout(function() {
      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setResult(getResultType(newAnswers));
      }
    }, 220);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setResult(null);
  }

  if (result) {
    const t = BLOATING_TYPES.find(function(x) { return x.id === result; });
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div style={{ fontSize: 52, marginBottom: 12 }}>{t.emoji}</div>
          <div className="quiz-result-type" style={{ color: t.color }}>{t.title}</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, marginTop: 10, marginBottom: 18 }}>
            זה לא אבחון רפואי, אבל זו אינדיקציה טובה לכיוון שכדאי לקרוא עליו קודם.
          </p>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            padding: 20, textAlign: 'right', marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 12, letterSpacing: '0.08em' }}>
              מה הכי כדאי להתחיל ממנו
            </div>
            <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: '0 0 14px' }}>{t.firstStep}</p>
            {t.solutions.slice(0, 3).map(function(s, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                  <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                </div>
              );
            })}
          </div>
          <button onClick={reset} style={{
            background: 'none', border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)', padding: '8px 20px', cursor: 'pointer',
            fontSize: 13, color: 'var(--color-fg3)', fontFamily: 'var(--font-body)',
          }}>עני שוב</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz-container">
      <div className="quiz-step-indicator">
        {QUIZ_QUESTIONS.map(function(_, i) {
          return <div key={i} className={'quiz-dot' + (i === step ? ' active' : '') + (i < step ? ' done' : '')} />;
        })}
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
        label="פתיחת הנפיחות"
        title="המדריך המלא לנפיחות: למה זה קורה, איך לזהות, ואיך לפתור"
        desc="לפני שמדברות על תזונה, מעיים או אימון, חשוב להבין מה הגוף מנסה לסמן לך דרך הנפיחות."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 18, maxWidth: 760 }}>
          הנפיחות היא לא רק תחושת אי-נוחות. הרבה פעמים זו הדרך של הגוף לרמוז שמשהו במערכת פחות עובד
          טוב: עיכול, תנועתיות, הורמונים, סטרס, רגישות מזון או עומס של חיידקים במקום הלא נכון.
        </p>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 28, maxWidth: 760 }}>
          הבעיה היא שלא כל נפיחות נראית אותו דבר. שתי נשים יכולות להגיד "אני נפוחה", אבל אצל אחת זו
          תגובה ל-FODMAP ואצל השנייה זו בכלל נפיחות הורמונלית או עצירות. לכן הצעד הראשון הוא לזהות את
          הדפוס, לא לרוץ לפתרון אקראי.
        </p>
      </Reveal>

      <Reveal>
        <div className="card-grid-2" style={{ marginBottom: 30 }}>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Bloating</div>
            <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>
              תחושת מלאות, לחץ, גזים או כבדות בתוך הבטן. לפעמים זו תחושה חזקה גם בלי שהבטן נראית שונה מאוד מבחוץ.
            </p>
          </div>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Distention</div>
            <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>
              התרחבות נראית לעין של הבטן. הרבה נשים חוות גם תחושת נפיחות וגם התרחבות בפועל, אבל לא תמיד זה אותו דבר.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 36 }}>
          <strong>מה תקבלי בחלק הזה:</strong> אבחון ראשוני של סוג הנפיחות הדומיננטי, מפת דרכים להבין מה לבדוק קודם,
          ואז מעבר לפרק המלא שבו נצלול לעיכול, FODMAP, SIBO, היסטמין, כלים מעשיים ופרוטוקול 28 יום.
        </div>
      </Reveal>

      <Reveal>
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border)', padding: '40px 32px',
          boxShadow: 'var(--shadow-soft)', marginBottom: 60,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            אבחון ראשוני מהיר
          </h3>
          <p style={{ fontSize: 13, color: 'var(--color-fg3)', textAlign: 'center', marginBottom: 28 }}>
            5 שאלות קצרות כדי להבין איזה כיוון הכי דומיננטי אצלך כרגע
          </p>
          <BloatingQuiz />
        </div>
      </Reveal>

      <Reveal>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--color-fg1)' }}>
          7 סוגי נפיחות שכדאי להכיר
        </h3>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 24 }}>
          רוב הנשים חוות יותר מסוג אחד. המטרה כאן היא לזהות מה הכי דומיננטי אצלך, לא להכניס אותך לקופסה אחת.
        </p>
      </Reveal>

      {BLOATING_TYPES.map(function(t, i) {
        return (
          <Reveal key={t.id} delay={i * 0.05}>
            <AccordionCard icon={t.emoji} title={t.title} teaser={t.signs[0]} color={t.color}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>
                  סימני זיהוי
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
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>מה קורה כאן</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{t.cause}</p>
              </div>

              <div style={{ background: 'rgba(178,166,234,0.08)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 8 }}>איך זה נראה ביומיום</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{t.focus}</p>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 10, letterSpacing: '0.07em' }}>כיווני פעולה ראשונים</div>
                {t.solutions.map(function(s, j) {
                  return (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--color-fg2)', alignItems: 'flex-start' }}>
                      <span style={{ color: t.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-fg3)', marginBottom: 8 }}>מה לעשות השבוע</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{t.firstStep}</p>
              </div>
            </AccordionCard>
          </Reveal>
        );
      })}

      <Reveal>
        <div className="card" style={{ padding: '22px 24px', marginTop: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>טבלת זיהוי מהירה</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['קשור למזון ספציפי', 'גזים תזונתית או רגישות מזון'],
              ['קשור למחזור', 'נפיחות הורמונלית'],
              ['אין יציאה יומית קלה', 'נפיחות עצירות'],
              ['תגובה כללית, לא רק בבטן', 'רגישות מזון או היסטמין'],
              ['תוך דקות מהאוכל, חזק מאוד', 'SIBO'],
              ['מחמיר בתקופות סטרס', 'נפיחות סטרס וקורטיזול'],
              ['אחרי יין, גבינות או מזון מותסס', 'נפיחות היסטמין'],
            ].map(function(row, i) {
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) 1fr', gap: 14, alignItems: 'start' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-fg1)' }}>{row[0]}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7 }}>{row[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        <BookmarkBtn id="section-bloating" label="מדריך הנפיחות" />
      </div>
    </section>
  );
}
