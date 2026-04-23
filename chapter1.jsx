// chapter1.jsx — תזונה — FULL REAL CONTENT
const { useState, useMemo } = React;

const PRINCIPLES = [
  {
    num: 1, icon: '🥩', title: 'חלבון בכל ארוחה',
    desc: 'אשה שמתאמנת כוח צריכה 1.5-2 גרם חלבון לקילו משקל גוף ביום. 20-40 גרם חלבון בכל ארוחה. ארוחה של קפה עם לחמנייה היא לא ארוחה — זה חטיף פחמימה.',
    sources: 'ביצים, עוף, הודו, דג (סלמון, טונה, מקרל), יוגורט יווני, קוטג\', טופו, טמפה, עדשים.',
    why: 'חלבון הוא הלבנה. בלעדיו אין בנייה של שריר, אין תחושת שובע, אין איזון הורמונלי. גרם וחצי לקילו = 97 גרם ליום לאישה של 65 ק"ג.',
  },
  {
    num: 2, icon: '🌾', title: 'סיבים בכמות הנכונה',
    desc: 'מטרה: 25-35 גרם סיבים ביום. רוב הנשים על 15 גרם ומטה. הפער הזה הוא הסיבה לעצירות, נפיחות, חשקים בסוכר ולחץ דם לא יציב.',
    sources: 'ירקות, פירות, קטניות, אגוזים, זרעים ודגנים מלאים. 2 כפות ירקות בצהריים ובערב + פרי ביום + זרעים בבוקר.',
    why: 'סיבים מזינים חיידקי מעי טובים, מאזנים סוכר בדם ומסייעים לפינוי אסטרוגן עודף.',
  },
  {
    num: 3, icon: '🫒', title: 'שומנים טובים בלי פחד',
    desc: 'השנים של דיאטת דלת-שומן הרסו את בריאות הנשים. ההורמונים שלך בנויים מכולסטרול. שומן הוא לא אויב.',
    sources: 'שמן זית כתית, אבוקדו, שקדים, אגוזי מלך, טחינה גולמית, זרעים, ביצים שלמות עם חלמון, דגים שומניים.',
    why: 'לא מרגרינה, לא שמנים מזוקקים (שמן תירס, חמניות, קנולה תעשייתי). שומן טוב תומך בהורמונים, מוח, עור ומעי.',
  },
  {
    num: 4, icon: '🍠', title: 'פחמימות מורכבות, לא פשוטות',
    desc: 'פחמימה טובה: תפוח אדמה עם הקליפה, בטטה, קינואה, שיבולת שועל, אורז מלא, כוסמת, לחם מחמצת איכותי.',
    sources: 'לא קמח לבן, לא סוכר לבן, לא מאפים תעשייתיים. ההבדל הוא בקצב שחרור הסוכר לדם.',
    why: 'פחמימות מורכבות שומרות על אנרגיה יציבה ולא יוצרות פיקים וקרסאות — זה מה שגורם לחשקים ולנפיחות.',
  },
  {
    num: 5, icon: '🧘', title: 'אכילה שקטה וסדר ארוחות',
    desc: 'את יכולה לאכול את התפריט המושלם, אבל אם את אוכלת בעצבים, בהסחת דעת או בעמידה — הגוף לא יעכל טוב.',
    sources: 'לשבת. שלוש נשימות לפני. ללעוס 20-30 פעם. להניח סכין ומזלג בין ביסים. לא לגלול.',
    why: 'אכילה מתבצעת במערכת הפרסימפתטית. מתח מעביר למצב "הילחם או ברח" שסוגר את מערכת העיכול.',
  },
];

const WORKDAY_MEALS = [
  { time: '07:00-09:00', name: 'ארוחת בוקר', items: 'חביתה משלוש ביצים עם בצל ירוק ופטרוזיליה + 2 מלפפונים + 2 עגבניות שרי + כף טחינה גולמית + פרוסת לחם מחמצת + חצי אבוקדו. אפשרות 2: קערת יוגורט יווני עם כף זרעי צ\'יה, פירות יער, כף שקדים טחונים, מעט דבש. אפשרות 3: שייק חלבון, חופן תרד, חצי בננה, כף טחינה, כוס חלב שקדים.', protein: '25g', cal: '420' },
  { time: '10:30-11:00', name: 'נשנוש (אופציונלי)', items: 'תפוח עם כף שקדים / יוגורט קטן / 2 תמרים עם 3 אגוזי מלך', protein: '6g', cal: '150' },
  { time: '13:00-14:00', name: 'ארוחת צהריים', items: 'סלט גדול מאוד של עלים, מלפפון, עגבנייה, גזר, פלפל, כרוב, בצל ירוק ונבטים + חזה עוף צרוב 120-150g / דג / טופו + חצי תפוח אדמה אפוי עם קליפה / 3 כפות קינואה + רוטב שמן זית ולימון', protein: '35g', cal: '480' },
  { time: '16:00-17:00', name: 'נשנוש', items: 'שוקולד מריר 70%+ / חופן אגוזים לא קלויים / חומוס עם ירקות / ביצה קשה עם מלפפון', protein: '8g', cal: '180' },
  { time: '19:00-20:00', name: 'ארוחת ערב', items: 'דג סלמון אפוי עם ברוקולי ושעועית ירוקה / סלט גדול עם ביצים + קוטג\' + טחינה / שקשוקה + פרוסת לחם מחמצת / קציצות הודו עם סלט יווני', protein: '30g', cal: '380' },
];

const TRAINING_MEALS = [
  { time: '07:00-09:00', name: 'ארוחת בוקר', items: 'אותו הדבר כמו יום עבודה', protein: '25g', cal: '420' },
  { time: '13:00-14:00', name: 'ארוחת צהריים', items: 'אותו הדבר + עוד חצי כוס פחמימה אם מתאמנת קשה', protein: '35g', cal: '550' },
  { time: '16:30', name: 'לפני אימון (60-90 דקות לפני)', items: 'תפוח עם כף חמאת שקדים / יוגורט עם גרנולה ביתית / פרוסת לחם מחמצת עם ביצה / קפה עם בננה. לא לאכול גבינה צהובה, בשר שומני או סלט שמן — יגרמו לכבדות', protein: '10g', cal: '200' },
  { time: '20:00', name: 'אחרי אימון (עד שעה מסיום)', items: 'חזה עוף + אורז מלא + שעועית ירוקה / סלמון + בטטה + תרד / חביתה + פיתה מלאה + ירקות / יוגורט יווני גדול + גרנולה + בננה. חייב: 20-40g חלבון + 30-40g פחמימה מורכבת. בלי פחמימה — הגוף שורף שריר לאנרגיה', protein: '40g', cal: '500' },
];

const FOODS = [
  { name: 'ביצים חופש', cat: 'protein', per: '2-3 ביצים', note: 'גם החלמון!' },
  { name: 'חזה עוף', cat: 'protein', per: '120-150g', note: 'ארגני אם אפשר' },
  { name: 'דג סלמון', cat: 'protein', per: '150g', note: 'עשיר אומגה-3' },
  { name: 'טונה במים', cat: 'protein', per: 'פחית', note: 'לא בשמן' },
  { name: 'יוגורט יווני', cat: 'protein', per: '150-200g', note: 'תרביות חיות' },
  { name: 'קוטג\' 5%', cat: 'protein', per: '200g', note: 'נח, שובע, מהיר' },
  { name: 'עדשים מבושלות', cat: 'protein', per: 'כוס', note: 'השרייה 8 שעות' },
  { name: 'טופו טרי', cat: 'protein', per: '150g', note: 'לא מפוסטר' },
  { name: 'טמפה', cat: 'protein', per: '100g', note: 'מותסס, מעולה למעי' },
  { name: 'בטטה', cat: 'carb', per: 'בינונית', note: 'עם קליפה' },
  { name: 'תפוח אדמה אדום', cat: 'carb', per: 'בינוני', note: 'עם קליפה' },
  { name: 'קינואה', cat: 'carb', per: 'חצי כוס מבושל', note: 'ללא גלוטן' },
  { name: 'שיבולת שועל', cat: 'carb', per: '50g', note: 'לא אינסטנט' },
  { name: 'אורז מלא / בסמטי', cat: 'carb', per: 'חצי כוס מבושל', note: '' },
  { name: 'לחם מחמצת', cat: 'carb', per: 'פרוסה', note: 'לא תעשייתי!' },
  { name: 'כוסמת / פריקה', cat: 'carb', per: 'חצי כוס', note: 'מגוון טוב' },
  { name: 'שמן זית כתית', cat: 'fat', per: 'כף', note: 'לסלטים בלבד' },
  { name: 'אבוקדו', cat: 'fat', per: 'חצי', note: 'עשיר אשלגן' },
  { name: 'טחינה גולמית', cat: 'fat', per: 'כף-שתיים', note: 'ייצור ישראלי' },
  { name: 'שקדים', cat: 'fat', per: '30g', note: 'לא קלויים/מלוחים' },
  { name: 'אגוזי מלך', cat: 'fat', per: '30g', note: 'עשיר אומגה-3' },
  { name: 'זרעי פשתן טחונים', cat: 'fat', per: '2 כפות', note: 'חייב טחון!' },
  { name: 'ברוקולי', cat: 'veg', per: 'כוס', note: 'עדיף מאודה קל' },
  { name: 'רוקט/ארוגולה', cat: 'veg', per: 'חופן גדול', note: 'מגרה עיכול' },
  { name: 'תרד', cat: 'veg', per: '2 כוסות', note: 'טרי או קפוא' },
  { name: 'כרוב סגול', cat: 'veg', per: '2 כוסות', note: 'אנתוציאנינים' },
  { name: 'נבטי ברוקולי', cat: 'veg', per: 'חופן', note: 'פי 100 סולפורפאן' },
  { name: 'פטרוזיליה/כוסברה', cat: 'veg', per: 'אגד', note: 'עשירות ויטמין K' },
];

const SWAPS = [
  { from: 'לחם לבן תעשייתי', to: 'לחם מחמצת איכותי', tag: 'פחמימה' },
  { from: 'שמן קנולה / חמניות', to: 'שמן זית כתית מעולה', tag: 'שומן' },
  { from: 'יוגורט עם סוכר', to: 'יוגורט יווני טבעי', tag: 'חלב' },
  { from: 'אורז לבן', to: 'קינואה / בטטה / אורז מלא', tag: 'פחמימה' },
  { from: 'סוכר לבן', to: 'תמרים / מייפל טהור / דבש', tag: 'ממתיק' },
  { from: 'חטיפים מלוחים', to: 'חופן שקדים לא קלויים', tag: 'חטיף' },
  { from: 'משקאות ממותקים', to: 'מים עם לימון / תה צמחים', tag: 'שתייה' },
  { from: 'פסטרמה / נקניק', to: 'חזה עוף / טונה במים', tag: 'חלבון' },
  { from: 'מרגרינה', to: 'חמאה / שמן קוקוס לבישול', tag: 'שומן' },
  { from: 'פסטה לבנה', to: 'פסטת דורום מלאה / כוסמת', tag: 'פחמימה' },
];

const GOOD_COMBOS = [
  { title: 'ויטמין C + ברזל צמחי', example: 'לימון על סלט עדשים', why: 'מעלה ספיגת ברזל פי 3' },
  { title: 'שומן טוב + ירקות מבושלים', example: 'שמן זית על ברוקולי', why: 'ויטמינים A,D,E,K נספגים רק בשומן' },
  { title: 'פרוביוטיקה + פרהביוטיקה', example: 'יוגורט עם בננה ירוקה', why: 'החיידקים הטובים גדלים על הסיבים' },
  { title: 'סיבים + נוזלים', example: 'שיבולת שועל עם חלב שקדים', why: 'הסיבים זקוקים למים לעבוד' },
];

const BAD_COMBOS = [
  { title: 'פרי על קיבה מלאה', why: 'פרי מתעכל ב-30-45 דקות. כשנתקע מאחורי ארוחה כבדה — מתסוס. לאכול פרי לפני הארוחה.' },
  { title: 'שני חלבונים מרוכזים', example: 'גבינה + ביצים + בשר', why: 'עומס אנזימי גדול, הגוף לא יודע מה לשלוח ראשון' },
  { title: 'פחמימה פשוטה + שומן', example: 'סופגנייה, קרואסון, פיצה', why: 'הצירוף המהיר ביותר לאגירת שומן' },
  { title: 'אלכוהול בזמן ארוחה', why: 'אלכוהול משתק עיכול ומגביר ספיגת שומן. אם רוצה — שתי ליד הארוחה, לא בזמן' },
  { title: 'שתייה קרה עם ארוחה כבדה', why: 'קור מכווץ קיבה ומאט עיכול. שתייה בטמפרטורת החדר עדיפה' },
];

function MealRow({ m }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 16, padding: '16px 20px', marginBottom: 10, alignItems: 'flex-start' }}>
      <div style={{
        background: 'var(--guide-rose-light)', borderRadius: 'var(--radius-lg)',
        padding: '6px 10px', fontSize: 11, fontWeight: 700,
        color: 'var(--color-accent)', flexShrink: 0, minWidth: 64, textAlign: 'center',
      }}>{m.time}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.name}</div>
        <p style={{ fontSize: 13, color: 'var(--color-fg2)', margin: 0, lineHeight: 1.6 }}>{m.items}</p>
      </div>
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-accent)' }}>{m.protein}</div>
        <div style={{ fontSize: 10, color: 'var(--color-fg3)' }}>חלבון</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-fg2)', marginTop: 4 }}>{m.cal}</div>
        <div style={{ fontSize: 10, color: 'var(--color-fg3)' }}>קל</div>
      </div>
    </div>
  );
}

function Chapter1() {
  const [foodFilter, setFoodFilter] = useState('all');
  const [mealTab, setMealTab] = useState(0);

  const filtered = useMemo(function() {
    return FOODS.filter(function(f) { return foodFilter === 'all' || f.cat === foodFilter; });
  }, [foodFilter]);

  const catLabel = { protein: 'חלבון', carb: 'פחמימה', fat: 'שומן', veg: 'ירק' };
  const catClass = { protein: 'cat-protein', carb: 'cat-carb', fat: 'cat-fat', veg: 'cat-veg' };
  const meals = mealTab === 0 ? WORKDAY_MEALS : TRAINING_MEALS;

  return (
    <section id="chapter-1" className="guide-section">
      <ChapterHeader
        label="פרק 1"
        title="תזונה — לאכול נכון זה לא לאכול פחות"
        desc="הגישה שאני מציעה לך שונה. במקום מה אי אפשר לאכול, נדבר על מה אפשר ואיך. במקום ספירת קלוריות, נתעסק בהרכב המזון. במקום להילחם ברעב, נאכל כך שנשבע."
      />

      <Reveal>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 20 }}>
          אני הולכת להיות כנה איתך ברגע הראשון. אם היית אוכלת פחות כדי לרדת במשקל, כנראה שכבר היית שם.
          רוב הנשים שאני מכירה ניסו דיאטות מגבילות שוב ושוב. הן איבדו שלושה קילו, חזרו לאכול "נורמלי",
          וצברו חמישה קילו. המעגל הזה שובר גוף, שובר מטבוליזם, ושובר ראש.
        </p>
      </Reveal>

      {/* Principles */}
      <Reveal><h3 style={sH3ch1}>חמשת עקרונות התזונה האנטי-דלקתית</h3></Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 60 }}>
        {PRINCIPLES.map(function(p, i) {
          return (
            <Reveal key={i} delay={i * 0.07}>
              <div className="principle-card">
                <div className="principle-num">{p.num}</div>
                <div className="principle-icon-wrap" style={{ fontSize: 22 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.6, margin: '0 0 8px' }}>{p.desc}</p>
                  <div style={{ fontSize: 13, color: 'var(--color-fg3)', marginBottom: 8 }}><strong>מקורות:</strong> {p.sources}</div>
                  <WhyImportant>{p.why}</WhyImportant>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Plate method */}
      <PullQuote text="לאכול נכון זה לא לאכול פחות. זה לדעת איזה מרכיבים בונים את הגוף שלנו ואיך לשלב אותם." />

      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>מבנה ארוחה אידיאלית</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 24 }}>
          בכל ארוחה שאת בונה, הצלחת שלך צריכה להיראות כך: לא קלוריות, לא מאקרוסים — צלחת אחת, ארבעה מרכיבים.
        </p>
        <div className="card-grid-2" style={{ marginBottom: 40 }}>
          {[
            { pct: '½', icon: '🥗', label: 'ירקות', desc: 'חצי חי וחצי מבושל, מגוון צבעים', color: '#34C759' },
            { pct: '¼', icon: '🍗', label: 'חלבון', desc: 'מקור חלבון אמיתי — לא כף טחינה', color: '#E85D75' },
            { pct: '¼', icon: '🍠', label: 'פחמימה מורכבת', desc: 'חצי כוס מבושל: אורז, בטטה, קינואה', color: '#FF9500' },
            { pct: '+', icon: '🫒', label: 'שומן טוב', desc: 'כף שמן זית, אבוקדו, או אגוזים', color: '#BBB2EE' },
          ].map(function(r, i) {
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: r.color, lineHeight: 1, marginBottom: 8 }}>{r.pct}</div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{r.label}</div>
                  <p style={{ fontSize: 13, color: 'var(--color-fg3)', margin: 0 }}>{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Meal plans */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>תפריט לדוגמה: יום שלם</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="tab-bar" style={{ marginBottom: 24 }}>
          {['יום עבודה רגיל', 'יום עם אימון'].map(function(t, i) {
            return (
              <button key={i} className={'tab-btn' + (mealTab === i ? ' active' : '')}
                onClick={function() { setMealTab(i); }}>{t}</button>
            );
          })}
        </div>
        <div key={mealTab} style={{ animation: 'fade-scale 0.3s var(--anim-ease)' }}>
          {meals.map(function(m, i) { return <MealRow key={i} m={m} />; })}
        </div>
      </Reveal>

      {/* Food Database */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>מאגר מוצרים: מה לקנות בסופר</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 20 }}>
          כשהמקרר שלך נראה נכון, את מנצחת. זה המאגר שאת רוצה לשמור בבית כל הזמן.
        </p>
        <div className="filter-bar">
          {[['all','הכל'],['protein','חלבון'],['carb','פחמימה'],['fat','שומן'],['veg','ירקות']].map(function(item) {
            return (
              <button key={item[0]} className={'filter-btn' + (foodFilter === item[0] ? ' active' : '')}
                onClick={function() { setFoodFilter(item[0]); }}>{item[1]}</button>
            );
          })}
        </div>
        <div className="food-table-wrap">
          <table className="food-table">
            <thead><tr><th>מזון</th><th>קטגוריה</th><th>מנה</th><th>הערה</th></tr></thead>
            <tbody>
              {filtered.map(function(f, i) {
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{f.name}</td>
                    <td><span className={'food-cat-badge ' + catClass[f.cat]}>{catLabel[f.cat]}</span></td>
                    <td>{f.per}</td>
                    <td style={{ color: 'var(--color-fg3)', fontSize: 13 }}>{f.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Swap Bank */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>בנק ההחלפות</h3></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 14, color: 'var(--color-fg3)', marginBottom: 16 }}>לא תמיד יש את מה שצריך. הנה החלפות חכמות שלא מקריבות תוצאות:</p>
        {SWAPS.map(function(s, i) {
          return (
            <div key={i} className="swap-item">
              <span className="swap-from">{s.from}</span>
              <span className="swap-arrow">←</span>
              <span className="swap-to">{s.to}</span>
              <span className="swap-tag">{s.tag}</span>
            </div>
          );
        })}
      </Reveal>

      {/* Combos */}
      <Reveal><h3 style={{ ...sH3ch1, marginTop: 60 }}>שילובי מזון — מה עוזר ומה מזיק</h3></Reveal>
      <Reveal delay={0.1}>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2D9E47', marginBottom: 12 }}>✅ שילובים שעוזרים</div>
            {GOOD_COMBOS.map(function(c, i) {
              return (
                <div key={i} style={{ marginBottom: 12, padding: '14px 16px', background: 'rgba(52,199,89,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(52,199,89,0.15)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 4 }}>דוגמה: {c.example}</div>
                  <div style={{ fontSize: 12, color: '#2D9E47' }}>{c.why}</div>
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-error)', marginBottom: 12 }}>⚠️ שילובים שכדאי להימנע</div>
            {BAD_COMBOS.map(function(c, i) {
              return (
                <div key={i} style={{ marginBottom: 12, padding: '14px 16px', background: 'rgba(255,59,48,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,59,48,0.12)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                  {c.example && <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 4 }}>{c.example}</div>}
                  <div style={{ fontSize: 12, color: 'var(--color-error)' }}>{c.why}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* What not to keep at home */}
      <Reveal>
        <div className="warning-card" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-error)', marginBottom: 10 }}>
            🚫 מה לא כדאי להשאיר בבית
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['משקאות ממותקים ומוגזים','חטיפי אנרגיה עם סוכר','עוגיות ומאפים תעשייתיים','לחם לבן תעשייתי','יוגורטים עם סוכר מוסף','מרגרינה','שמני קנולה וחמניות תעשייתיים','נקניקיות ופסטרמה מעובדת'].map(function(item, i) {
              return (
                <div key={i} style={{ fontSize: 13, color: 'var(--color-fg2)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--color-error)' }}>✗</span>{item}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-1" label="תזונה" />
      </div>
    </section>
  );
}

const sH3ch1 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };
Object.assign(window, { Chapter1 });
