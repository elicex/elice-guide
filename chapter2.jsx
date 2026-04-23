// chapter2.jsx — בריאות המעיים — FULL REAL CONTENT
const { useState } = React;

const MICRO_FOODS = [
  { name: 'כרוב כבוש לא מפוסטר', emoji: '🥬', dose: 'כפית → כף ביום', strain: 'Lactobacillus', tip: 'חייב להיות מהמקרר, לא מהמדף. רק שם יש חיידקים חיים. בהתחלה כפית אחת, להגדיל בהדרגה.' },
  { name: 'יוגורט עם תרביות חיות', emoji: '🥛', dose: '200g ביום', strain: 'Bifidobacterium', tip: 'חפשי "תרביות חיות ופעילות" על האריזה. קפיר מכיל אפילו יותר מגוון חיידקים. אפשר לעשות קפיר בבית.' },
  { name: 'זרעי פשתן טחונים', emoji: '🌰', dose: '2 כפות ביום', strain: 'פרהביוטיקה + ליגננים', tip: 'חייב שיהיו טחונים. שלמים לא נספגים. לאחסן במקרר עד חודש. מאזן אסטרוגן — לא במקרה.' },
  { name: 'נבטי ברוקולי', emoji: '🥦', dose: 'חופן ביום', strain: 'Sulforaphane', tip: 'פי 100 יותר סולפורפאן מברוקולי בוגר. לנבוט בבית בקלות. חופן בסלט = זהב לבריאות המעי.' },
  { name: 'שום ובצל', emoji: '🧄', dose: '2-3 שיניים ביום', strain: 'אינולין (פרהביוטיקה)', tip: 'שום נא הכי חזק. מכיל אינולין שחיידקים טובים מעריצים. גם אנטיבקטריאלי נגד חיידקים רעים.' },
  { name: 'בננות ירוקות/בוסריות', emoji: '🍌', dose: 'חצי בננה ירוקה', strain: 'עמילן עמיד', tip: 'דווקא הירוקות! מכילות עמילן עמיד שחיידקים טובים מתרבים עליו. אפשר בשייק ירוק.' },
  { name: 'עלים ירוקים מרים', emoji: '🌿', dose: 'חופן גדול לפני ארוחה', strain: 'מגרה חומצת קיבה', tip: 'רוקט, ארוגולה, עולש, חסה אנדיב. כסלט פתיחה — מגרה ייצור חומצת קיבה ואנזימי עיכול.' },
];

function Chapter2() {
  const [hoveredBacteria, setHoveredBacteria] = useState(null);

  const bacteria = [
    { id: 'lacto', label: 'לקטובציל', color: '#E85D75', r: 88, angle: 0, desc: 'מייצרים חומצה לקטית שמגינה מפני פתוגנים. נמצאים ביוגורט, קפיר וכרוב כבוש. חיוניים לבריאות הנרתיק אצל נשים.' },
    { id: 'bifido', label: 'ביפידובקטריה', color: '#BBB2EE', r: 88, angle: 72, desc: 'מייצרים ויטמיני B, מסייעים לעיכול סיבים. 95% מהסרוטונין מיוצר במעי — אלה עוזרים בייצורו.' },
    { id: 'akkerm', label: 'אקרמנסיה', color: '#E8A87C', r: 88, angle: 144, desc: 'מחזקים את רירית המעי ומפחיתים חדירות. נמצאים ברמות גבוהות אצל אנשים בריאים. מגרים על ידי תה ירוק.' },
    { id: 'faecali', label: 'פקאליבקטריה', color: '#34C759', r: 88, angle: 216, desc: 'מייצרים בוטיראט — דלק לתאי המעי. מפחיתים דלקת. מדד לבריאות מיקרוביום. ניזון מסיבים מגוונים.' },
    { id: 'strepto', label: 'סטרפטוקוק', color: '#FF9500', r: 88, angle: 288, desc: 'בכמות מאוזנת תורמים לעיכול פחמימות. עודף קשור לדלקות. מאוזן על ידי מגוון תזונה.' },
  ];

  const cx = 170, cy = 170;

  return (
    <section id="chapter-2" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="פרק 2"
        title="בריאות המעיים — הכל מתחיל פה"
        desc="אם הייתי צריכה לבחור פרק אחד מהמדריך שישנה לך את החיים יותר מכל דבר אחר — זה הפרק הזה."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          המעי הוא לא רק צינור עיכול. הוא המערכת החשובה ביותר לאיזון הורמונלי, לבריאות חיסונית,
          למצב רוח, לעור, לשינה, ואפילו לחשקי האוכל. כן, המעי שלך קובע אם את תרצי פתאום סוכר
          בשעה שלוש בצהריים. זו לא חולשת אופי — זו כימיה.
        </p>
      </Reveal>

      <Reveal>
        <div className="side-note">
          <strong>מה זה מיקרוביום?</strong> כמאה טריליון מיקרואורגניזמים שחיים בגופך. יותר תאים חיידקיים מאנושיים.
          70% ממערכת החיסון שם. 95% מהסרוטונין שם. שינה, עור, הורמונים — הכל מתחיל מהמעי.
        </div>
      </Reveal>

      {/* Microbiome SVG viz */}
      <Reveal><h3 style={sH3ch2}>המיקרוביום שלך — לחצי לפרטים</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="340" height="340" viewBox="0 0 340 340" overflow="visible">
            <defs>
              <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E85D75" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#BBB2EE" stopOpacity="0.03" />
              </radialGradient>
            </defs>
            {[52, 88, 124].map(function(r, i) {
              return (
                <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                  stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 7"
                  style={{ transformOrigin: cx + 'px ' + cy + 'px', animation: 'spin-slow ' + (20 + i * 7) + 's linear infinite' + (i % 2 ? ' reverse' : '') }} />
              );
            })}
            <circle cx={cx} cy={cy} r={44} fill="url(#coreG)" />
            <circle cx={cx} cy={cy} r={34} fill="rgba(232,93,117,0.1)" style={{ animation: 'heartbeat 3s ease-in-out infinite' }} />
            <text x={cx} y={cy-6} textAnchor="middle" fill="var(--color-fg2)" fontSize="9" fontWeight="700" fontFamily="Heebo">100 טריליון</text>
            <text x={cx} y={cy+7} textAnchor="middle" fill="var(--color-fg3)" fontSize="8" fontFamily="Heebo">חיידקים</text>
            {bacteria.map(function(b) {
              var rad = (b.angle - 90) * Math.PI / 180;
              var bx = cx + b.r * Math.cos(rad);
              var by = cy + b.r * Math.sin(rad);
              var isHov = hoveredBacteria === b.id;
              return (
                <g key={b.id}
                  onMouseEnter={function() { setHoveredBacteria(b.id); }}
                  onMouseLeave={function() { setHoveredBacteria(null); }}
                  onClick={function() { setHoveredBacteria(hoveredBacteria === b.id ? null : b.id); }}
                  style={{ cursor: 'pointer' }}>
                  <line x1={cx} y1={cy} x2={bx} y2={by} stroke={b.color} strokeWidth={isHov ? 1.5 : 0.7} strokeOpacity={isHov ? 0.5 : 0.2} style={{ transition: 'all 0.3s' }} />
                  <circle cx={bx} cy={by} r={isHov ? 22 : 17} fill={b.color} fillOpacity={isHov ? 0.22 : 0.12} stroke={b.color} strokeWidth={isHov ? 2 : 1.5} style={{ transition: 'all 0.3s' }} />
                  <circle cx={bx} cy={by} r={4} fill={b.color} />
                  <text x={bx} y={by + (by > cy ? 36 : -28)} textAnchor="middle" fill="var(--color-fg2)" fontSize="9" fontFamily="Heebo" fontWeight="600">{b.label}</text>
                </g>
              );
            })}
          </svg>
          {hoveredBacteria && (function() {
            var b = bacteria.find(function(x) { return x.id === hoveredBacteria; });
            return (
              <div style={{ background: 'var(--color-surface-elevated)', border: '1px solid ' + b.color + '44', borderRadius: 'var(--radius-xl)', padding: '14px 18px', maxWidth: 320, marginTop: 12, animation: 'slide-down 0.25s var(--anim-ease)' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: b.color, marginBottom: 6 }}>{b.label}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            );
          })()}
        </div>
      </Reveal>

      {/* Estrobolome section */}
      <Reveal><h3 style={{ ...sH3ch2, marginTop: 60 }}>הקשר בין מעיים להורמונים</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          במעי שלך יש אוסף חיידקים שנקרא <Tooltip term="אסטרובולום" definition="אוסף החיידקים במעי שאחראים על עיבוד ופינוי האסטרוגן מהגוף." />.
          הכבד שלך מעבד אסטרוגן ושולח אותו למעי לפינוי. אבל אם המעי לא בריא, חיידקים מסוימים מייצרים
          אנזים שמחזיר את האסטרוגן לדם.
        </p>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          התוצאה? <Tooltip term="שליטת אסטרוגן" definition="יותר אסטרוגן יחסית לפרוגסטרון — גורם ל-PMS חמור, דימום כבד, כאבי שד, ציסטות, ועלייה במשקל בירכיים." />:
          נפיחות חמורה לפני מחזור, דימום כבד, כאבי שד, PMS קשה, ציסטות, ועלייה בירכיים וישבן.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '😤', title: 'מצב רוח', desc: '95% מהסרוטונין מיוצר במעי' },
            { icon: '💤', title: 'שינה', desc: 'מלטונין גם מיוצר במעי' },
            { icon: '🛡️', title: 'חסינות', desc: '70% ממערכת החיסון במעי' },
            { icon: '✨', title: 'עור', desc: 'אקנה, רוזצאה — קשורים ישירות למעי' },
            { icon: '🍬', title: 'חשקים', desc: 'חיידקי סוכר שולחים אותות למוח לבקש סוכר' },
          ].map(function(item, i) {
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card" style={{ textAlign: 'center', padding: '20px 14px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 12, color: 'var(--color-fg3)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      <PullQuote text="המעי שלך קובע אם תרצי פתאום סוכר בשלוש אחרי הצהריים. זו לא חולשת אופי, זו כימיה." />

      {/* Probiotics vs Prebiotics */}
      <Reveal><h3 style={{ ...sH3ch2, marginTop: 60 }}>
        <Tooltip term="פרוביוטיקה" definition="חיידקים חיים שמועילים לבריאות כשנצרכים בכמות מספקת." />
        {' מול '}
        <Tooltip term="פרהביוטיקה" definition="סיבים שהגוף לא מעכל, אבל מזינים את חיידקי המעי הטובים." />
        {' — וגם פוסט-ביוטיקה'}
      </h3></Reveal>

      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          <strong>פרוביוטיקה:</strong> חיידקים חיים שמצטרפים לאוכלוסייה שלך — יוגורט, קפיר, כרוב כבוש, קימצ'י, מיסו.
          <br/><strong>פרהביוטיקה:</strong> האוכל של החיידקים — בצל, שום, שיבולת שועל, ארטישוק, בננות ירוקות, תפוחים.
          <br/><strong>פוסט-ביוטיקה:</strong> תוצרי החיידקים — בוטיראט שמרפא את תאי המעי.
        </p>
        <div className="side-note">
          <strong>טעות נפוצה:</strong> לוקחות תוסף פרוביוטיקה אבל לא אוכלות סיבים. זה כמו לזרוק זרעים לשממה.
          אין להם על מה לגדול. חייבים שילוב יומיומי של שניהם — "סינביוטיקה".
        </div>
      </Reveal>

      <Reveal>
        <div className="two-col" style={{ marginTop: 20, marginBottom: 40 }}>
          {[
            { title: 'פרוביוטיקה', emoji: '🦠', color: '#E85D75', sub: 'חיידקים חיים', items: ['יוגורט עם תרביות חיות', 'קפיר (בית או קנוי)', 'כרוב כבוש לא מפוסטר', 'קימצ\'י', 'מיסו', 'קומבוצ\'ה', 'טמפה'] },
            { title: 'פרהביוטיקה', emoji: '🌱', color: '#34C759', sub: 'אוכל לחיידקים', items: ['שום ובצל', 'בננה ירוקה', 'שיבולת שועל', 'ארטישוק', 'אספרגוס', 'תפוחים עם קליפה', 'זרעי פשתן טחונים'] },
          ].map(function(col, i) {
            return (
              <div key={i} className="compare-col">
                <div className="compare-col-header">
                  <div className="compare-col-icon">{col.emoji}</div>
                  <div className="compare-col-title" style={{ color: col.color }}>{col.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginTop: 4 }}>{col.sub}</div>
                </div>
                {col.items.map(function(item, j) {
                  return (
                    <div key={j} className="compare-item">
                      <span className="compare-bullet" style={{ color: col.color }}>›</span>{item}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* 7 foods */}
      <Reveal><h3 style={sH3ch2}>7 מזונות שבונים מיקרוביום בריא</h3></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 60 }}>
        {MICRO_FOODS.map(function(f, i) {
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div className="card" style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.emoji}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.name}</div>
                <div style={{ display: 'inline-block', background: 'var(--guide-rose-light)', color: 'var(--color-accent)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: 6 }}>{f.dose}</div>
                <div style={{ display: 'block', fontSize: 10, color: 'var(--color-purple-deep)', marginBottom: 8, fontWeight: 600 }}>{f.strain}</div>
                <p style={{ fontSize: 12, color: 'var(--color-fg3)', lineHeight: 1.5, margin: 0 }}>{f.tip}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Signs of improvement / warning */}
      <Reveal><h3 style={sH3ch2}>איך יודעים שהמעי משתפר?</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2D9E47', marginBottom: 12 }}>✅ סימנים חיוביים</div>
            {['יציאות סדירות ונוחות יותר','פחות גזים','עור משתפר (סנטר ומצח)','שובע גדול יותר אחרי ארוחות','חשקים בסוכר מתחילים להיעלם','שינה טובה יותר','פחות הצטננויות חוזרות'].map(function(s, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-fg2)', marginBottom: 8 }}>
                  <span style={{ color: '#2D9E47' }}>›</span>{s}
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-error)', marginBottom: 12 }}>⚠️ מתי לפנות לרופא</div>
            {['כאבי בטן חזקים או קבועים','דם בצואה','ירידה פתאומית במשקל','חום לא ברור','עצירות/שלשול שנמשכים שבועות','נפיחות כרונית שלא משתפרת מכלום'].map(function(s, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-fg2)', marginBottom: 8 }}>
                  <span style={{ color: 'var(--color-error)' }}>›</span>{s}
                </div>
              );
            })}
            <div className="side-note" style={{ marginTop: 12 }}>
              בדיקות מומלצות: צואה מורחבת (GI-MAP), בדיקת SIBO (נשיפה), calprotectin, אנדוסקופיה אם יש חשד.
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-2" label="בריאות המעיים" />
      </div>
    </section>
  );
}

const sH3ch2 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };
Object.assign(window, { Chapter2 });
