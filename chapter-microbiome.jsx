// chapter-microbiome.jsx - מיקרוביום ומעיים

const MICRO_OVERVIEW = [
  {
    title: 'המיקרוביום הוא לא "עוד נושא בעיכול"',
    desc: 'הוא משפיע על מצב רוח, עור, שיער, חשקים, חסינות, הורמונים, ריכוז ואנרגיה. היום הוא נחשב כמעט כאיבר פונקציונלי בפני עצמו.',
  },
  {
    title: 'יש בך טריליוני חיידקים',
    desc: 'רובם המוחלט חיים במעיים שלך, בעיקר במעי הגס. הם לא אורחים. הם חלק מהמערכת.',
  },
  {
    title: 'מגוון הוא שם המשחק',
    desc: 'ככל שיש יותר זנים שונים של חיידקים, כך המעי שלך עמיד יותר לסטרס, אנטיביוטיקה, שינויים בתזונה ומחלות.',
  },
  {
    title: 'אפשר לשקם את המיקרוביום',
    desc: 'לא ביום אחד, אבל בהחלט בצורה משמעותית דרך מזון, הרגלים, חשיפה לטבע והפחתת מה שפוגע בו.',
  },
];

const MICRO_FUNCTIONS = [
  'הם מעכלים לך סיבים שהגוף שלך לא יודע לפרק לבד.',
  'הם מייצרים ויטמינים כמו K2 וחלק מוויטמיני B.',
  'הם משתתפים באיזון אסטרוגן דרך האסטרובולום.',
  'הם "מלמדים" את מערכת החיסון שלך מה לתקוף ומה לא.',
  'הם משפיעים על חשקים לסוכר, לדגנים ולמזונות מסוימים.',
  'הם משתתפים בייצור נוירוטרנסמיטורים כמו סרוטונין, GABA ודופמין.',
  'הם מסייעים בפירוק רעלים ותרופות.',
  'הם מגנים מפני חיידקים "רעים" ומונעים השתלטות שלהם.',
];

const MICROBE_SPOTLIGHT = [
  {
    name: 'Bifidobacterium longum',
    tag: 'החיידק שאוהב להאכיל את המעי',
    eats: 'סיבים מורכבים שהגוף שלך לא יודע לפרק לבד, ובמיוחד פרוקטנים כמו FOS - כאלה שנמצאים בבצל, שום, ארטישוק ירושלמי ובננות ירוקות.',
    releases: 'חומצות שומן קצרות שרשרת, וגם חומרים שקשורים לייצור GABA - נוירוטרנסמיטור מרגיע.',
    role: 'כשהחיידק הזה מקבל את הסיבים שהוא אוהב, הוא עוזר להזין את דופן המעי, לחזק את המחסום שלו וליצור סביבה רגועה יותר. זה אחד החיידקים שעוזרים להבין למה תזונה עשירה בסיבים יכולה להשפיע לא רק על היציאות, אלא גם על נפיחות, מצב רוח ותחושת יציבות כללית בגוף.',
    icon: 'bacteria',
  },
  {
    name: 'Lactobacillus rhamnosus',
    tag: 'החיידק ששומר על סביבה טובה במעי',
    eats: 'לקטוז ופחמימות שמגיעות ממוצרי חלב מותססים, ולכן הוא מזוהה הרבה פעמים עם יוגורט, קפיר ומוצרי פרוביוטיקה איכותיים.',
    releases: 'חומצה לקטית ובקטריוצינים - חומרים שפועלים כמו אנטיביוטיקה טבעית נגד פתוגנים.',
    role: 'כשהוא משגשג, הוא עוזר להקשות על חיידקים בעייתיים להשתלט, ותומך בשכבת ההגנה הטבעית של המעי. מעבר לעיכול, הוא מעניין גם מהכיוון של מערכת העצבים, כי יש מחקרים שקושרים אותו ליותר רוגע ולפחות עומס במערכת המעי־מוח אצל חלק מהאנשים.',
    icon: 'leaf',
  },
  {
    name: 'Faecalibacterium prausnitzii',
    tag: 'החיידק של המעי הרגוע',
    eats: 'עמילן עמיד, סיבים מסיסים ותוצרים שמגיעים מפירוק של סיבים צמחיים - במיוחד כשיש בתפריט שיבולת שועל, קטניות, תפוחי אדמה מקוררים ואורז מקורר.',
    releases: 'בוטיראט - שוב, אותו חומר זהב שהמעי שלך ממש אוהב.',
    role: 'זה אחד החיידקים שהכי מזוהים עם מעי בריא ושקט. הבוטיראט שהוא מייצר מזין את דופן המעי, עוזר להפחית דלקת, ותומך בתחושת יציבות - פחות גירוי, פחות עומס, יותר איזון.',
    icon: 'shield',
  },
];

const MICRO_FOUNDATIONS = [
  {
    title: 'מה זה בכלל חיידק',
    text: 'חיידק הוא יצור חי זעיר מאוד, לרוב חד-תאי, אבל כזה שיודע לחיות, להתרבות ולהגיב לסביבה. הוא לא רק "גורם מחלה". בפועל, רוב החיידקים בעולם הם ניטרליים, וחלק עצום מהם חיוני לבריאות שלנו.',
  },
  {
    title: 'המיקרוביום הוא מדינה שלמה בתוך הגוף',
    text: 'המיקרוביום הוא כל אוסף החיידקים שחיים בגוף שלך: על העור, בפה, בנרתיק, באף, אבל בעיקר במעיים. הרוב הגדול נמצא במעי הגס, ושם הוא פועל כמעט כמו איבר בפני עצמו.',
  },
  {
    title: '38 טריליון זו לא הגזמה',
    text: 'ההערכות היום מדברות על בערך 38 טריליון חיידקים מול בערך 30 טריליון תאי גוף. זה יחס שמתקרב מאוד לאחד לאחד, ולכן המדע כבר לא רואה בהם "אורחים", אלא חלק מהמערכת.',
  },
  {
    title: 'מגוון הוא ההגנה שלך',
    text: 'במיקרוביום בריא יש מאות זנים שונים של חיידקים. ככל שהמגוון גדול יותר, כך המעי שלך עמיד יותר לאנטיביוטיקה, סטרס, תזונה פחות טובה ותקופות של עומס. מיקרוביום עני קורס מהר יותר.',
  },
];

const GUT_BRAIN_FACTS = [
  {
    title: 'המעי הוא המוח השני שלך',
    desc: 'למעי יש מערכת עצבים עצמאית, עם מאות מיליוני נוירונים. הוא לא "סתם צינור". הוא מערכת חכמה שמרגישה, מגיבה ושולחת אותות.',
  },
  {
    title: 'עצב הוואגוס הוא הכביש המהיר',
    desc: 'רוב המידע שעובר בעצב הוואגוס דווקא זורם מהמעי למוח, לא להפך. כלומר, המוח מקשיב הרבה למה שהמעי משדר לו.',
  },
  {
    title: 'כ-90% מהסרוטונין בגוף נמצא במעי',
    desc: 'הסרוטונין שבמעי משפיע בעיקר על תנועתיות המעי. הקשר למצב הרוח עובר דרך עצב הוואגוס, דלקת וחיידקים שמשפיעים על מערכת העצבים בדרכים אחרות.',
  },
  {
    title: 'ערפל מוחי, חרדה ועייפות יכולים להתחיל במעי',
    desc: 'לא כל תחושת עומס היא "בראש שלך". הרבה פעמים זו ביולוגיה של ציר המעי־מוח.',
  },
];

const NEUROTRANSMITTERS = [
  ['סרוטונין', 'כ-90% מהסרוטונין בגוף נמצא במעי ומשפיע בעיקר על תנועתיות המעי. הקשר למצב הרוח עובר דרך עצב הוואגוס, דלקת וחיידקים שמשפיעים על מערכת העצבים בעקיפין.'],
  ['GABA', 'נוירוטרנסמיטר מרגיע שעוזר להוריד חרדה ולהאט מחשבות. חיידקים מסוימים במעי משתתפים בייצור שלו.'],
  ['דופמין', 'קשור למוטיבציה, הנעה ותחושת "בא לי לקום ולעשות". גם כאן למעי יש תפקיד.'],
  ['אצטילכולין', 'משפיע על ריכוז, זיכרון וחדות מחשבה. גם הוא מושפע מבריאות המעי והדלקת שבו.'],
];

const PRO_PRE_POST = [
  {
    title: 'פרוביוטיקה',
    subtitle: 'החיידקים עצמם',
    desc: 'חיידקים חיים שמגיעים מבחוץ, דרך מזון מותסס או תוספים. הם יכולים לעזור, אבל הם לא חזקים כמו שחושבים אם אין להם תנאים להישאר.',
  },
  {
    title: 'פרה-ביוטיקה',
    subtitle: 'המזון של החיידקים',
    desc: 'אלה הסיבים שהחיידקים שלך אוכלים. בהרבה מקרים זה החלק החשוב יותר, כי הוא מזין את המגוון שכבר קיים אצלך במעי.',
  },
  {
    title: 'פוסט-ביוטיקה',
    subtitle: 'מה שהחיידקים מייצרים',
    desc: 'ה"תוצרים" של חיידקים בריאים: חומצות שומן קצרות שרשרת, ויטמינים, נוירוטרנסמיטורים וחומרים שמרגיעים דלקת ומזינים את דופן המעי.',
  },
];

const PROBIOTIC_SOURCES = [
  ['קפיר', 'יותר מגוון זני חיידקים מיוגורט רגיל.'],
  ['כרוב כבוש לא מפוסטר', 'חייב להיות לא מפוסטר, אחרת החיידקים מתו.'],
  ['קימצ׳י', 'מזון מותסס חזק מאוד למעי.'],
  ['קומבוצ׳ה', 'עדיף לבחור כזו עם מעט סוכר.'],
  ['מיסו', 'סויה מותססת שמתאימה למרקים ולבישול.'],
  ['טמפה', 'חלבון טוב וגם מזון מותסס.'],
  ['חמוצים מותססים אמיתיים', 'לא עם חומץ, אלא התססה במים ומלח.'],
];

const PREBIOTIC_SOURCES = [
  ['בצל, שום, כרישה', 'עשירים באינולין, אחד הסיבים הפרה-ביוטיים החשובים.'],
  ['ארטישוק, אספרגוס', 'מקורות חזקים לפרה-ביוטיקה.'],
  ['בננה ירוקה', 'עמילן עמיד שהחיידקים אוהבים במיוחד.'],
  ['שיבולת שועל', 'עשירה בבטא-גלוקן.'],
  ['זרעי פשתן וצ׳יה', 'סיבים + שומנים טובים + מזון לחיידקים.'],
  ['קטניות', 'עדשים, חומוס, שעועית - מצוינות למעי כשמעלים אותן בהדרגה.'],
  ['ירקות ממשפחת הכרוב', 'פרה-ביוטיקה וגם תמיכה הורמונלית.'],
  ['תפוחים עם הקליפה', 'הפקטין בקליפה הוא מזון מצוין לחיידקים.'],
  ['קקאו טבעי', 'כן, גם הוא מכיל סיבים שהחיידקים אוהבים.'],
];

const TROUBLE_SIGNS = [
  'נפיחות תכופה, גם מארוחות רגילות.',
  'גזים עם ריח חזק במיוחד.',
  'עצירות או יציאות לא סדירות.',
  'כאבי בטן אחרי אוכל.',
  'צרבת, רפלוקס או תחושת שריפה.',
  'אקנה, פריחות או עור שמן.',
  'שיער שנושר וציפורניים שבירות.',
  'עייפות כרונית שלא נפתרת בשינה.',
  'ערפל מוחי, חרדה או דכדוך.',
  'כאבי ראש תכופים.',
  'PMS חמור או מחזור לא סדיר.',
  'דלקות חוזרות, פטריות או זיהומים.',
];

const DAMAGE_FACTORS = [
  'אנטיביוטיקה, במיוחד חוזרת או לא הכרחית.',
  'תזונה מעובדת, סוכר ושמנים תעשייתיים.',
  'סטרס כרוני וחוסר שינה.',
  'אלכוהול.',
  'עודף חיטוי וסטריליות סביבתית.',
  'חוסר חשיפה לטבע, אדמה, בעלי חיים ומגוון סביבתי.',
  'תרופות PPI לצרבת לאורך זמן.',
];

const MICRO_ISSUES = [
  {
    title: 'דיכאון וחרדה',
    desc: 'נשים עם מיקרוביום חלש או מעי מגורה מראות הרבה יותר נטייה לחרדה, דכדוך ורגישות נפשית. זה לא אומר שכל דיכאון "מגיע מהבטן", אבל בהחלט אומר שהמעי הוא חלק מהתמונה, ולא שחקן משני.',
  },
  {
    title: 'ערפל מוחי וריכוז',
    desc: 'דלקת במעי יכולה לייצר תחושת כבדות מנטלית, איטיות במחשבה וקושי בשליפה של מילים. הרבה נשים קוראות לזה "אני לא מרוכזת", כשבפועל הגוף שלהן מאותת דרך ציר המעי־מוח.',
  },
  {
    title: 'הורמונים ומחזור',
    desc: 'האסטרובולום, קבוצת חיידקים במעי, משפיע על פינוי עודפי אסטרוגן. כשיש חוסר איזון, אפשר לראות יותר PMS, נפיחות, אקנה הורמונלית, רגישות בשדיים ומחזורים פחות יציבים.',
  },
  {
    title: 'עור, שיער וציפורניים',
    desc: 'המיקרוביום תומך בספיגה של מינרלים, ויטמינים ושומנים חיוניים. כשהוא לא עובד טוב, זה יכול להופיע על העור, בשיער ובחוזק הציפורניים הרבה לפני שמישהי חושבת בכלל על המעיים.',
  },
];

const MICROBIOME_15 = [
  'יוגורט יווני מסונן עם תרביות חיות',
  'קפיר',
  'כרוב כבוש לא מפוסטר',
  'שום',
  'בצל',
  'שיבולת שועל',
  'זרעי פשתן טחונים',
  'זרעי צ׳יה',
  'עדשים',
  'חומוס',
  'ברוקולי',
  'תפוחים עם הקליפה',
  'בננה ירוקה',
  'טחינה גולמית',
  'תה ירוק',
];

const MICRO_WEEK = [
  {
    day: 'יום ראשון',
    meals: 'בוקר: שיבולת שועל עם בננה ירוקה, זרעי צ׳יה, שקדים וקקאו. צהריים: סלט גדול עם חזה עוף, אורז מלא וטחינה. ערב: סלמון, ברוקולי ובטטה. נשנוש: יוגורט יווני עם פטל.',
  },
  {
    day: 'יום שני',
    meals: 'בוקר: 2 ביצים עם בצל, תרד ועגבניות. צהריים: מרק עדשים עם שום, כורכום, גזר ובצל. ערב: קציצות הודו עם ירקות שורש. נשנוש: תפוח עם הקליפה ואגוזי מלך.',
  },
  {
    day: 'יום שלישי',
    meals: 'בוקר: שייק ירוק עם חלב שקדים, תרד, בננה, חמאת שקדים וזרעי פשתן. צהריים: סלט קינואה עם עשבי תיבול. ערב: קציצות דג, אורז וכרובית צלויה. נשנוש: יוגורט עם צ׳יה.',
  },
  {
    day: 'יום רביעי',
    meals: 'בוקר: חביתת ירק. צהריים: חומוס ביתי עם ביצה וסלט כרוב סגול. ערב: תבשיל כרישה וקטניות. נשנוש: קפיר ואגוזי מלך.',
  },
  {
    day: 'יום חמישי',
    meals: 'בוקר: יוגורט יווני עם גרנולה ביתית ופירות יער. צהריים: פסטה מלאה עם ירקות מוקפצים וטונה או עוף. ערב: שקשוקה עם הרבה ירקות. נשנוש: פרי וטחינה.',
  },
  {
    day: 'יום שישי',
    meals: 'בוקר: שיבולת שועל עם תפוח וקינמון. צהריים: פלאפל עם סלטים וטחינה. ערב: ארוחת שבת עם חלבון, סלטים וירקות. נשנוש: שקדים.',
  },
  {
    day: 'יום שבת',
    meals: 'בוקר: ארוחת בוקר משפחתית עם גבינות, ירקות, ביצים, לחם מחמצת, טחינה וזיתים. צהריים: תבשיל שבת עם קטניות, בשר וירקות. ערב: ארוחה קלה עם סלט ואגוזים.',
  },
];

const THIRTY_DAY_PLAN = [
  {
    title: 'שבוע 1: ייסוד',
    items: [
      'שתי כוסות מים ברגע שקמים.',
      'להוסיף ירק חדש אחד ביום.',
      'להפחית סוכר מעובד לחצי.',
      '15 דקות הליכה אחרי הארוחה הכי גדולה.',
    ],
  },
  {
    title: 'שבוע 2: פרוביוטיקה',
    items: [
      'להוסיף יוגורט יווני עם תרביות חיות פעם ביום.',
      'להוסיף מזון מותסס פעם-פעמיים בשבוע.',
      'להכניס 5-7 סוגי ירקות חדשים השבוע.',
    ],
  },
  {
    title: 'שבוע 3: פרה-ביוטיקה',
    items: [
      'להוסיף שום או בצל לכל ארוחה מבושלת.',
      'כף זרעי פשתן כל בוקר.',
      'קטניות 2-3 פעמים השבוע.',
      'שיבולת שועל 3-4 פעמים השבוע.',
    ],
  },
  {
    title: 'שבוע 4: הטמעה',
    items: [
      'לספור כמה סוגי צמחים אכלת השבוע. היעד: 30.',
      'לזהות מה עבד ומה פחות.',
      'לבנות תפריט קבוע משלך שכולל את המזונות שעשו לך טוב.',
    ],
  },
];

const sH3micro = { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };

function MicroTable({ headers, rows }) {
  return (
    <div className="card mobile-table-card" style={{ padding: 0, overflowX: 'auto' }}>
      <table className="mobile-stack-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} style={{ textAlign: 'right', padding: '16px 18px', borderBottom: '1px solid var(--color-border)', background: 'var(--guide-purple-light)', color: 'var(--color-fg1)', fontSize: 13, fontWeight: 800 }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ridx) => (
            <tr key={ridx}>
              {row.map((cell, cidx) => (
                <td key={cidx} data-label={headers[cidx]} style={{ verticalAlign: 'top', padding: '14px 18px', borderBottom: '1px solid var(--color-border)', color: 'var(--color-fg2)', fontSize: 14, lineHeight: 1.8 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MicroIcon({ type }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    bacteria: <svg {...common}><path d="M7 8c0-2 1.8-4 4.2-4H13a4 4 0 0 1 0 8h-2A4 4 0 0 0 7 16v0a4 4 0 0 0 4 4h2"/><path d="M5 7h2M4 12h3M5 17h2M17 6h2M18 11h2M17 16h2"/></svg>,
    gut: <svg {...common}><path d="M9 4v6a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v0a4 4 0 0 0 4 4h2"/><path d="M15 4v6a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v0a4 4 0 0 1-4 4h-2"/><path d="M9 10h6M12 10v10"/></svg>,
    brain: <svg {...common}><path d="M9 5a3 3 0 0 0-3 3v1a2.5 2.5 0 0 0 0 5V15a3 3 0 0 0 3 3"/><path d="M15 5a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1 0 5V15a3 3 0 0 1-3 3"/><path d="M9 8a2 2 0 0 1 2-2h1M15 8a2 2 0 0 0-2-2h-1M12 6v12"/></svg>,
    shield: <svg {...common}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z"/><path d="m9.5 12 1.7 1.7 3.8-3.8"/></svg>,
    hormone: <svg {...common}><circle cx="12" cy="7" r="3"/><path d="M12 10v11"/><path d="M8 18h8"/><path d="M9 21h6"/></svg>,
    spark: <svg {...common}><path d="m12 3 1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8L12 3Z"/></svg>,
    leaf: <svg {...common}><path d="M19 5c-6 0-10 3.5-10 9 0 3 1.7 5 4 5 5.5 0 6-7.5 6-14Z"/><path d="M6 19c2-3 5-5 9-6"/></svg>,
    warning: <svg {...common}><path d="M12 4 3 20h18L12 4Z"/><path d="M12 9v5"/><path d="M12 17h.01"/></svg>,
    supplements: <svg {...common}><path d="M8 6h8a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M10 6V4h4v2"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>,
    calendar: <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>,
  };
  return icons[type] || icons.spark;
}

function SectionTitle({ icon, children, style = {} }) {
  return (
    <Reveal>
      <div className="micro-section-title" style={style}>
        <div className="micro-section-icon"><MicroIcon type={icon} /></div>
        <h3 style={{ ...sH3micro, marginBottom: 0 }}>{children}</h3>
      </div>
    </Reveal>
  );
}

function ImpactConstellation() {
  const items = [
    ['brain', 'מצב רוח'],
    ['hormone', 'הורמונים'],
    ['spark', 'חשקים'],
    ['shield', 'חסינות'],
    ['leaf', 'עור ושיער'],
    ['gut', 'עיכול'],
  ];
  return (
    <div className="impact-constellation card">
      <div className="impact-center">
        <div className="impact-center-badge">
          <MicroIcon type="bacteria" />
        </div>
        <div className="impact-center-text">המיקרוביום</div>
      </div>
      {items.map(([icon, label], i) => (
        <div key={i} className={`impact-node impact-node-${i + 1}`}>
          <div className="impact-node-icon"><MicroIcon type={icon} /></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function MicroBiomeScene() {
  return (
    <div className="micro-scene card">
      <div className="micro-scene-copy">
        <div className="micro-kicker">ECOSYSTEM MODE</div>
        <div className="micro-scene-title">המעי שלך הוא מערכת אקולוגית חיה</div>
        <p className="micro-scene-text">
          לא "סתם" קיבה ובטן, אלא יער פעיל של חיידקים, סיבים, מסרים עצביים ותגובות הורמונליות.
        </p>
        <div className="micro-pill-row">
          <span className="micro-pill">38 טריליון חיידקים</span>
          <span className="micro-pill">500-1000 זנים</span>
          <span className="micro-pill">השפעה על מצב רוח</span>
        </div>
      </div>
      <div className="micro-orbit">
        <div className="micro-core">
          <span>MICRO</span>
        </div>
        <div className="micro-ring micro-ring-a" />
        <div className="micro-ring micro-ring-b" />
        <div className="micro-ring micro-ring-c" />
        <div className="micro-node micro-node-a">עור</div>
        <div className="micro-node micro-node-b">הורמונים</div>
        <div className="micro-node micro-node-c">חשקים</div>
        <div className="micro-node micro-node-d">מוח</div>
        <div className="micro-spark micro-spark-a" />
        <div className="micro-spark micro-spark-b" />
        <div className="micro-spark micro-spark-c" />
      </div>
    </div>
  );
}

function GutBrainBridge() {
  return (
    <div className="gut-brain-bridge card">
      <div className="gb-side">
        <div className="gb-icon gb-brain">מוח</div>
        <div className="gb-label">מצב רוח, ריכוז, חרדה, מוטיבציה</div>
      </div>
      <div className="gb-channel">
        <div className="gb-channel-line" />
        <div className="gb-channel-wave">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="gb-channel-tag">עצב הוואגוס</div>
      </div>
      <div className="gb-side">
        <div className="gb-icon gb-gut">מעי</div>
        <div className="gb-label">סרוטונין, GABA, דלקת, חיידקים, עיכול</div>
      </div>
    </div>
  );
}

function SynbioticStrip() {
  return (
    <div className="synbiotic-strip card">
      <div className="syn-card syn-pro">
        <div className="syn-head">פרוביוטיקה</div>
        <div className="syn-sub">החיידקים עצמם</div>
      </div>
      <div className="syn-plus">+</div>
      <div className="syn-card syn-pre">
        <div className="syn-head">פרה-ביוטיקה</div>
        <div className="syn-sub">האוכל של החיידקים</div>
      </div>
      <div className="syn-arrow">→</div>
      <div className="syn-card syn-post">
        <div className="syn-head">פוסט-ביוטיקה</div>
        <div className="syn-sub">התוצאה שהגוף מרוויח</div>
      </div>
    </div>
  );
}

function ChapterMicrobiome() {
  return (
    <section id="chapter-microbiome" className="guide-section">
      <ChapterHeader
        label="פרק 2"
        title="המיקרוביום והמעיים"
        desc="המערכת החשובה ביותר בגוף שלך שאף אחד לא לימד אותך עליה. לא רק עיכול, אלא מצב רוח, הורמונים, עור, שיער, חשקים, חסינות ואנרגיה."
      />

      <Reveal>
        <div className="card" style={{ padding: '24px 24px 20px', marginBottom: 40 }}>
          <p style={{ fontSize: 16, color: 'var(--color-fg2)', lineHeight: 1.9, marginBottom: 14 }}>
            אני רוצה להתחיל עם משפט שאולי ישמע דרמטי, אבל הוא אמת מדעית מלאה: המעיים שלך קובעים את מצב הרוח שלך יותר ממה שרוב האנשים מדמיינים, המיקרוביום שלך משפיע על ייצור הורמונים, והחיידקים שחיים בגוף שלך קשורים לדברים שלא לימדו אותך לקשר לעיכול בכלל - שיער, עור, חשקים, חשיבה וריכוז.
          </p>
          <p style={{ fontSize: 16, color: 'var(--color-fg2)', lineHeight: 1.9, marginBottom: 0 }}>
            זה לא אומר שכל בעיה בחיים מתחילה במעי, אבל זה כן אומר שהמעי שלך הוא לא "רק בטן". הוא מרכז שליטה ביולוגי, והגיע הזמן להתחיל להבין אותו כמו שצריך.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <MicroBiomeScene />
      </Reveal>

      <Reveal delay={0.1}>
        <ImpactConstellation />
      </Reveal>

      <div className="card-grid-2" style={{ marginBottom: 44 }}>
        {MICRO_OVERVIEW.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="card micro-icon-card" style={{ padding: '20px 22px' }}>
              <div className="micro-inline-head">
                <div className="micro-mini-icon"><MicroIcon type={['bacteria','gut','spark','leaf'][i] || 'spark'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{item.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <PullQuote text="המיקרוביום שלך הוא לא רק משהו שחי בגוף שלך. הוא חלק מהגוף שלך." />

      <SectionTitle icon="bacteria">1. מה זה המיקרוביום שלך, בעצם?</SectionTitle>

      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {MICRO_FOUNDATIONS.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card micro-icon-card" style={{ padding: '20px 22px' }}>
              <div className="micro-inline-head">
                <div className="micro-mini-icon"><MicroIcon type={['bacteria','gut','spark','shield'][i] || 'spark'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{item.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.82, margin: 0 }}>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 28 }}>
          <strong>מגוון זה הכל.</strong> כמו יער שיש בו הרבה סוגי עצים ולכן הוא עמיד יותר, כך גם מיקרוביום עשיר במגוון זנים יודע להתמודד טוב יותר עם אנטיביוטיקה, סטרס, תזונה פחות טובה ותקופות עומס.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>למה לנשים מודרניות יש פחות מגוון?</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כי גדלנו בעולם מערבי, סטרילי ומעובד יותר. קיבלנו אנטיביוטיקות בילדות, אנחנו חשופות פחות לאדמה, לחיות, לטבע ולמזון אמיתי שעובר תסיסה טבעית.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            זאת גם הסיבה שבמחקרים שמשווים נשים מערביות לנשים שחיות בחברות מסורתיות יותר, רואים שוב ושוב שמגוון המיקרוביום שלהן גבוה בהרבה. הידיעה הטובה היא שלא חייבים "לחזור למערה" כדי לשקם חלק גדול מזה. צריך פשוט להתחיל לעבוד נכון.
          </p>
        </div>
      </Reveal>

      <SectionTitle icon="gut">2. מה החיידקים שלך בעצם עושים?</SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 28 }}>
        {MICRO_FUNCTIONS.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card micro-function-card" style={{ padding: '18px 20px' }}>
              <div className="micro-function-icon"><MicroIcon type={['gut','spark','hormone','shield','brain','brain','leaf','warning'][i] || 'spark'} /></div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>3 חיידקים שכדאי להכיר</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            המיקרוביום הוא לא "גוש" אחד של חיידקים, אלא קהילה חיה של זנים שונים. כל חיידק אוהב מזון קצת אחר, וכשהוא מקבל אותו הוא מתרבה, מפריש חומרים פעילים, ומשפיע על המעי, על מערכת החיסון, על הדלקת, ואפילו על מערכת העצבים. הנה שלוש דוגמאות שיעזרו לך להבין למה מה שאת אוכלת משנה כל כך.
          </p>
        </div>
      </Reveal>

      <div className="card-grid-2" style={{ marginBottom: 30 }}>
        {MICROBE_SPOTLIGHT.map((bug, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card micro-icon-card" style={{ padding: '22px 22px' }}>
              <div className="micro-inline-head" style={{ alignItems: 'flex-start' }}>
                <div className="micro-mini-icon"><MicroIcon type={bug.icon} /></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{bug.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-accent)', marginTop: 4 }}>{bug.tag}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>מה הוא אוהב לאכול</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{bug.eats}</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>מה הוא מפריש / מייצר</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{bug.releases}</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>למה זה חשוב לך</div>
                  <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{bug.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 30 }}>
          <strong>השורה התחתונה:</strong> כשאת אוכלת מגוון של סיבים, פוליפנולים ומזון צמחי אמיתי, את לא "רק אוכלת בריא". את ממש מאכילה צבא שלם של חיידקים טובים, שברגע שהם מקבלים את התנאים הנכונים - מתחילים לעבוד בשבילך.
        </div>
      </Reveal>

      <SectionTitle icon="brain">3. ציר המעי-מוח: הקשר שמשנה את הכל</SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {GUT_BRAIN_FACTS.map((fact, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card micro-icon-card" style={{ padding: '20px 22px' }}>
              <div className="micro-inline-head">
                <div className="micro-mini-icon"><MicroIcon type={['brain','spark','gut','warning'][i] || 'spark'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{fact.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{fact.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <GutBrainBridge />
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>עצב הוואגוס: הקו הישיר בין הבטן למוח</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            עצב הוואגוס הוא העצב הארוך ביותר בגוף. הוא מתחיל בבסיס המוח, יורד דרך הצוואר והחזה ומגיע אל הקיבה, הכבד והמעיים. הוא כביש מהיר של מידע.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            הנקודה המדהימה היא שרוב המידע שעובר בו נע דווקא מהמעי למוח. כלומר, המעי שלך כל הזמן מדווח: איך העיכול, איזה חיידקים פעילים, האם יש דלקת, האם יש שובע, האם יש סטרס. והמוח, רוב הזמן, מגיב למה שהמעי משדר.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <MicroTable headers={['נוירוטרנסמיטר', 'למה זה חשוב']} rows={NEUROTRANSMITTERS} />
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך זה נראה בחיים עצמם?</div>
          <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>אכלת ארוחה כבדה ואת מרגישה עייפה ומדוכדכת - זה לא רק "כבדות", אלא תגובה של ציר המעי־מוח.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>חרדה אחרי גבינה מיושנת או יין - יכולה להיות קשורה להיסטמין.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>ערפל מוחי אחרי אוכל - לא תמיד "קריסה של סוכר", לפעמים דלקת מהמעי שמדברת עם המוח.</li>
            <li style={{ marginBottom: 0, fontSize: 14, lineHeight: 1.8 }}>תחושת "בטן לחוצה" לפני פגישה חשובה - זו בדיוק המערכת הדו־כיוונית הזו בפעולה.</li>
          </ul>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {MICRO_ISSUES.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <AccordionCard title={item.title} defaultOpen={i === 0}>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: 0 }}>{item.desc}</p>
            </AccordionCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 30 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>האסטרובולום - למה הוא כל כך חשוב לנשים?</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            האסטרובולום הוא השם לקבוצת חיידקים במעי שמשפיעה על המטבוליזם של אסטרוגן. במילים פשוטות, הוא עוזר לקבוע כמה אסטרוגן יתפנה החוצה מהגוף וכמה ממנו יחזור להסתובב במערכת.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כשהאסטרובולום מאוזן, פינוי האסטרוגן בדרך כלל עובד טוב יותר. אבל כשהמיקרוביום חלש או מבולגן, חלק מהאסטרוגן עלול לחזור למחזור הדם במקום לצאת. אצל חלק מהנשים זה יכול להיראות כמו יותר דומיננטיות אסטרוגנית - PMS חזק יותר, שדיים רגישים, מחזור כבד יותר, נפיחות, אקנה הורמונלית או הפרשות פחות יציבות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            זה בדיוק אחד המקומות שבהם בריאות מעיים והורמונים נפגשים. לכן אצל נשים, עבודה על המיקרוביום היא לא רק עניין של עיכול - היא יכולה להיות חלק חשוב גם ממחזור נעים יותר, פחות רגישות הורמונלית, הבנה טובה יותר של תסמיני PMS, והקשבה אחרת לגוף כשהוא מאותת שמשהו לא מאוזן.
          </p>
        </div>
      </Reveal>

      <SectionTitle icon="leaf">4. פרוביוטיקה, פרה-ביוטיקה, פוסט-ביוטיקה</SectionTitle>
      <Reveal>
        <SynbioticStrip />
      </Reveal>
      <div className="card-grid-3" style={{ marginBottom: 24 }}>
        {PRO_PRE_POST.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="card micro-icon-card" style={{ padding: '22px 20px' }}>
              <div className="micro-inline-head">
                <div className="micro-mini-icon"><MicroIcon type={['bacteria','leaf','spark'][i] || 'spark'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{item.title}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-accent)', fontWeight: 700, marginBottom: 8 }}>{item.subtitle}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 20 }}>
          אם היית יכולה לבחור רק אחד, הרבה פעמים <strong>פרה-ביוטיקה</strong> תהיה חשובה יותר מפרוביוטיקה, כי היא מאכילה את החיידקים שכבר יש לך.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>אז מה בעצם ההבדל בחיים האמיתיים?</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            פרוביוטיקה היא כמו להביא למעי "אורחים טובים" מבחוץ. זה יכול להיות נהדר, אבל הרבה מהם לא באמת משתקעים לאורך זמן.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            פרה-ביוטיקה היא האוכל של החיידקים שכבר חיים אצלך. ולכן בהרבה מקרים היא חשובה יותר: היא לא מנסה להחליף את היער, אלא להשקות ולהזין אותו.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            פוסט-ביוטיקה היא התוצאה הסופית שאת רוצה: בוטיראט, אצטט, פרופיונאט, ויטמינים וחומרים אנטי-דלקתיים. כלומר, לא רק "לאכול בריא", אלא לגרום למעי שלך לייצר בריאות מבפנים.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <Tabs
          tabs={['פרוביוטיקה טבעית', 'פרה-ביוטיקה חשובה']}
          renderContent={(active) => (
            active === 0 ? (
              <MicroTable headers={['מקור', 'למה הוא טוב']} rows={PROBIOTIC_SOURCES} />
            ) : (
              <MicroTable headers={['מקור', 'למה הוא טוב']} rows={PREBIOTIC_SOURCES} />
            )
          )}
        />
      </Reveal>

      <Reveal>
        <div className="side-note" style={{ marginTop: 18, marginBottom: 24 }}>
          <strong>טריק קטן עם השפעה גדולה: עמילן עמיד.</strong> כשאת מבשלת אורז או תפוחי אדמה ואז מקררת אותם לפני האכילה, חלק מהעמילן עובר שינוי והופך ל"עמילן עמיד" - סוג של פרה-ביוטיקה שהחיידקים הטובים במעי אוהבים במיוחד. לכן אורז מקורר, תפוחי אדמה מקוררים או אפילו סלט תפוחי אדמה יכולים להיות כלי חכם למעי, לא רק "שאריות מהמקרר". זאת בדיוק אחת הדוגמאות לכך שאותו מזון יכול לפעול קצת אחרת לפי איך שהכנת אותו.
        </div>
      </Reveal>

      <SectionTitle icon="warning" style={{ marginTop: 60 }}>5. סימנים שהמעי שלך בבעיה</SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {TROUBLE_SIGNS.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card micro-function-card" style={{ padding: '18px 20px' }}>
              <div className="micro-function-icon"><MicroIcon type={i < 5 ? 'gut' : i < 8 ? 'leaf' : i < 10 ? 'brain' : i < 11 ? 'hormone' : 'shield'} /></div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>מה גורם לחוסר איזון הזה?</div>
          <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
            {DAMAGE_FACTORS.map((item, i) => (
              <li key={i} style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>SIBO - כשחיידקים עולים למעי הדק</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            SIBO הוא מצב של גידול יתר של חיידקים במעי הדק - אזור שאמור להכיל הרבה פחות חיידקים מהמעי הגס. זה אבחון שהרבה נשים שומעות, במיוחד סביב תסמונת המעי הרגיש, בלי להבין באמת מה המשמעות שלו.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            הסימנים הקלאסיים הם נפיחות חזקה יחסית מהר אחרי האוכל - לפעמים תוך פחות משעה, גזים, רגישות ברורה לפחמימות, תחושת כבדות ואצל חלק מהנשים גם ריח לא נעים מהפה או יציאות פחות יציבות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            מה שחשוב לדעת הוא שזה לא משהו שמאבחנים או מטפלים בו לבד מתוך אינסטגרם ותוספים. אם יש חשד אמיתי, זה כיוון שדורש אבחון רפואי מסודר והבנה של התמונה המלאה, ולא רק "להוריד אוכל שמנפח".
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>הסימנים שלא תמיד מקשרים למעי</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            הרבה נשים מחפשות פתרון לעור, לשיער, לחשקים, ל-PMS, לעייפות ולחרדה, בלי שאף אחת בכלל תשאל אותן איך נראית היציאה שלהן, כמה נפיחות יש להן, או כמה פעמים הן לקחו אנטיביוטיקה בשנים האחרונות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            וזה בדיוק העניין: המעי לא צועק תמיד דרך כאב בטן. לפעמים הוא צועק דרך עור שמן, דרך ערפל מוחי, דרך כאבי ראש, דרך מחזור קשה או דרך מערכת חיסון שנחלשת כל חודש מחדש.
          </p>
        </div>
      </Reveal>

      <SectionTitle icon="leaf">6. איך לבנות מיקרוביום בריא - המדריך המעשי</SectionTitle>
      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>העיקרון הראשון: מגוון מעל הכל</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            הגורם היחיד הכי משמעותי לגיוון במיקרוביום הוא מספר סוגי המזונות הצמחיים שאת אוכלת בשבוע. היעד הפרקטי: 30 סוגי צמחים שונים בשבוע.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            זה כולל ירקות, פירות, קטניות, אגוזים, זרעים, עשבי תיבול, תבלינים ודגנים מלאים. כלומר גם פטרוזיליה, כוסברה, נענע, בזיליקום, קינמון, כורכום, זעתר ותבלינים שאת שמה "רק קצת" - כולם נחשבים. לא צריך להיות קיצונית - צריך להיות מגוונת.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>15 מזונות לבנות איתם מיקרוביום חזק</div>
          <div className="card-grid-3">
            {MICROBIOME_15.map((item, i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal><h3 style={{ ...sH3micro, marginTop: 48 }}>תפריט שבועי מעי-ידידותי</h3></Reveal>
      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {MICRO_WEEK.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.day}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.meals}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 24 }}>
          <strong>אזהרה חשובה:</strong> אם את כרגע אוכלת מעט סיבים, אל תכניסי את כל המזונות האלה ביום אחד. זה עלול ליצור גזים ונפיחות עד שהמעי מסתגל. עובדים בהדרגה.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך להוסיף בהדרגה בלי להציף את המעי</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם היום את כמעט לא אוכלת סיבים, אין שום יתרון בלעבור מ-0 ל-100. להפך. זה בדיוק מה שיגרום לך להרגיש שהכול "לא טוב לך".
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            המעי שלך צריך זמן. החיידקים צריכים זמן. מתחילים עם מזון אחד חדש, או עם תוספת אחת ברורה, נשארים איתה כמה ימים ורק אחר כך מוסיפים עוד שכבה.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            אם מזון חדש יוצר קצת גזים או נפיחות בהתחלה, זה לא בהכרח אומר שהוא "אויב". הרבה פעמים זה פשוט אומר שאת בתהליך הסתגלות, וצריך לעבוד בו חכם ולא קיצוני.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>הידרציה: החלק שהכי שוכחים</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כל הסיבים הפרה-ביוטיים שדיברנו עליהם צריכים מים כדי לעבוד. אם את מעלה סיבים אבל לא מעלה שתייה, את לא "בונה מיקרוביום" - את בונה עצירות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            היעד הבסיסי הוא 2-3 ליטר מים ביום. שתי כוסות מיד בקימה, כוס לפני ארוחות ולגימות קבועות לאורך היום. זה לא קישוט. זה חלק מהטיפול במעי.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>למה תנועה חשובה גם למעי</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            המעי הוא לא איבר שאוהב קיפאון. הוא בנוי לעבוד בתנועה, בקצב ובזרימה. כשאת יושבת שעות ארוכות, במיוחד אחרי אוכל, הפריסטלטיקה - תנועת הגלים של המעי - נוטה להיות איטית יותר.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            לכן הליכה קלה של 10-15 דקות אחרי ארוחה יכולה להיות כל כך חזקה. היא לא "שורפת את האוכל", אלא עוזרת למערכת העיכול לזוז, מקלה על נפיחות, תומכת ביציאות סדירות ונותנת למעי תנאים טובים יותר לעבוד.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            זו בדיוק הסיבה שהמלצה כל כך פשוטה כמו הליכה קצרה אחרי הארוחה הכי גדולה ביום יכולה לשנות הרבה יותר ממה שהיא נשמעת על הנייר.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>מה להפחית כי הורס את המיקרוביום</div>
          <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>סוכר מעובד.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>שמנים תעשייתיים כמו תירס, קנולה, חמניות וסויה.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>אלכוהול.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>מזון מעובד ואמולגטורים.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>ממתיקים מלאכותיים.</li>
            <li style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>עודף קפאין.</li>
            <li style={{ marginBottom: 0, fontSize: 14, lineHeight: 1.8 }}>אנטיביוטיקה ו-PPI שלא לצורך או לאורך זמן בלי בקרה.</li>
          </ul>
        </div>
      </Reveal>

      <SectionTitle icon="supplements">7. תוספים למעי - מה באמת עובד</SectionTitle>
      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            פרוביוטיקה בתוסף יכולה לעזור במיוחד אחרי אנטיביוטיקה, אחרי זיהום במערכת העיכול, או במצבים מסוימים של תסמונת המעי הרגיש. אבל היא לא קסם, ובטח לא תחליף לתזונה שמאכילה את החיידקים הטובים.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם בוחרים לקנות תוסף, מחפשים מוצר עם מגוון זנים, כמות סבירה של חיידקים, ואחסון נכון. אבל חשוב לזכור: בלי מזון אמיתי, בלי פרה-ביוטיקה, ובלי הפחתת הגורמים שפוגעים במעי, גם הפרוביוטיקה הכי יקרה בעולם לא תעשה עבורך את העבודה.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            אם כבר קונים פרוביוטיקה, כדאי לחפש מגוון זנים, כמות סבירה של חיידקים, ומוצר איכותי. בנוסף, תוספים כמו L-גלוטמין, אבץ, מגנזיום ציטראט, אומגה 3, קולגן פפטידים או סיבים פרה-ביוטיים מרוכזים יכולים לעזור במקרים מסוימים - אבל לא במקום אוכל.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>אחרי אנטיביוטיקה - 30 הימים שהכי חשובים למעי</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם לאחרונה לקחת אנטיביוטיקה, חשוב לדעת שהחודש שאחרי הוא זמן קריטי לבנייה מחדש של המיקרוביום. אנטיביוטיקה לא מבדילה היטב בין חיידקים בעייתיים לחיידקים טובים, ולכן הרבה נשים מרגישות אחרי טיפול כזה יותר נפיחות, יותר רגישות או יציאות פחות יציבות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            בהרבה מקרים שווה לשקול פרוביוטיקה גם בזמן האנטיביוטיקה עצמה - פשוט במרווח של 2-3 שעות ממנה - ואז להמשיך לתוך התקופה שאחרי. במקביל, מתחילים להחזיר מזונות מותססים, והרבה יותר חשוב מזה: בונים בהדרגה גם סיבים פרה-ביוטיים כדי שלחיידקים הטובים יהיה ממה לגדול מחדש.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אני אישית משתמשת בפרוביוטיקה
            {' '}
            <a href="https://iherb.prf.hn/l/3PqB5zv/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
              הזו
            </a>
            , שיש בה זנים שונים ו-25 ביליון חיידקים טובים. נשים שעובדות איתי שואלות אותי לא מעט איזו פרוביוטיקה אני בוחרת, ולכן אני שמה כאן גם את הקישור וגם את קוד הקופון <strong style={{ color: 'var(--color-fg1)' }}>ELICE</strong> למי שרוצה.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            זה לא אומר שצריך להעמיס הכל ביום אחד. בדיוק להפך. אחרי אנטיביוטיקה עובדים חכם, רך ובהדרגה - אבל כן מתייחסים לחודש הזה כאל חלון הזדמנות אמיתי לשיקום.
          </p>
        </div>
      </Reveal>

      <SectionTitle icon="calendar">9. תוכנית 30 הימים</SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 28 }}>
        {THIRTY_DAY_PLAN.map((week, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card" style={{ padding: '22px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{week.title}</div>
              <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                {week.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 9, fontSize: 14, lineHeight: 1.75 }}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>מילה אחרונה</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            המעי שלך הוא לא רק צינור לעיכול. הוא מרכז שליטה לבריאות שלך: למצב הרוח, לאנרגיה, לעור, למחזור, לשינה ולחשיבה.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            החדשות הטובות הן שלא צריך לחכות ל"יום מושלם" כדי להתחיל לשנות אותו. תוסיפי את הכרוב הכבוש, תאכלי תפוח עם הקליפה, תשלבי שום בבישול, ותתחילי לבנות בהדרגה. כל צעד כזה הוא בנייה של גוף יותר יציב, רגוע ובריא.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { ChapterMicrobiome });
