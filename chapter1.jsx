// chapter1.jsx - תזונה - rewritten from user master copy

const ENERGY_USES = [
  {
    num: '01',
    title: 'חילוף חומרים בסיסי (BMR)',
    desc: 'זו האנרגיה שהגוף שלך שורף פשוט כדי לחיות. גם אם תשבי כל היום על הספה ולא תזוזי. זה הלב שפועם, הכבד שעובד, המוח שחושב, התאים שמתחדשים. זה בערך 60-70 אחוז מכל הקלוריות שאת שורפת ביום.',
  },
  {
    num: '02',
    title: 'פעילות יומית לא מודעת (NEAT)',
    desc: 'זו הפעילות של היומיום. ללכת לשירותים, לבשל, לסחוב תיק, להרים ילד, לעמוד ולדבר. זה בערך 15-25 אחוז מסך השריפה היומית שלך, וזה משתנה דרמטית בין אישה יושבנית לאישה שעובדת פיזית.',
  },
  {
    num: '03',
    title: 'אימון (EEE)',
    desc: 'זו השריפה מהאימון עצמו. בניגוד למה שמקובל לחשוב, זה בדרך כלל החלק הקטן יחסית, בערך 5-15 אחוז מהיום. אימון כוח של שעה לא "מוחק" יום שלם של אכילה.',
  },
  {
    num: '04',
    title: 'אפקט תרמוגני של האוכל (TEF)',
    desc: 'הגוף שורף אנרגיה גם כדי לעכל. חלבון "עולה" הכי הרבה לעיכול, שומן הכי מעט, ופחמימות באמצע. זו אחת הסיבות שחלבון כל כך חשוב.',
  },
];

const ACTIVITY_LEVELS = [
  ['יושבנית', 'עבודה ליד מחשב, כמעט ללא אימון', 'BMR × 1.2'],
  ['פעילות קלה', 'עבודה יושבנית, אימון קל 1-3 פעמים בשבוע', 'BMR × 1.375'],
  ['פעילות בינונית', 'אימון 3-5 פעמים בשבוע', 'BMR × 1.55'],
  ['פעילות גבוהה', 'אימון 6-7 פעמים בשבוע, או עבודה פיזית', 'BMR × 1.725'],
  ['פעילות קיצונית', 'אימון פעמיים ביום, או ספורטאית תחרותית', 'BMR × 1.9'],
];

const GOAL_OPTIONS = [
  {
    icon: '📈',
    title: 'עלייה במסת שריר',
    desc: 'אוכלים בערך 200-300 קלוריות מעל מה שהגוף שורף. הגוף צריך עודף אנרגיה כדי לבנות רקמה חדשה.',
  },
  {
    icon: '⚖️',
    title: 'שמירה על משקל',
    desc: 'אוכלים בערך את אותה כמות שהגוף שורף.',
  },
  {
    icon: '📉',
    title: 'ירידה בשומן',
    desc: 'אוכלים פחות ממה שהגוף שורף. אבל כאן חשוב להיות חכמות: גרעון מתון עובד טוב יותר לטווח ארוך.',
  },
];

const DEFICIT_MISTAKES = [
  {
    title: 'את לא סופרת נכון',
    body: 'זו אולי הטעות הכי נפוצה. הרבה נשים בטוחות שהן בגרעון, אבל בפועל הן פשוט לא סופרות נכון. רוטב פה, טעימה שם, קפה עם חלב, חופן אגוזים, ביס מהצלחת של הילד - ובקלות נוספות עוד 200-300 קלוריות ביום בלי לשים לב. ואז נדמה לך שהגוף "לא מגיב", כשבעצם לא באמת היית בגרעון.',
  },
  {
    title: 'גרעון גדול מדי',
    body: 'כשאת יורדת נמוך מדי, הגוף עובר למצב חירום. הורמוני בלוטת התריס יורדים, המחזור עלול להשתבש, הקורטיזול עולה, מסת שריר נפגעת, והרעב הופך קיצוני. הגרעון הנכון לרוב הנשים הוא בערך 15-20 אחוז מתחת לשריפה.',
  },
  {
    title: 'גרעון רציף לנצח',
    body: 'הגוף לא אוהב להיות בגרעון ללא הפסקה. גם גרעון מתון לאורך זמן דורש עצירות תחזוקה לפעמים, כדי לשמור על הורמונים, אנרגיה והתמדה.',
  },
  {
    title: 'לחשוב שאימון מוחק את האוכל',
    body: 'אימון חשוב לבריאות, לשריר ולחילוף החומרים, אבל הוא לא מוחק בקלות עודף אכילה. זאת אחת הטעויות הקלאסיות שהורסות גרעון.',
  },
  {
    title: 'להתעלם ממסת שריר',
    body: 'המטרה שלך היא לא רק לשקול פחות, אלא להיראות ולהרגיש טוב יותר. אישה עם יותר שריר ופחות שומן יכולה להיראות אחרת לחלוטין באותו משקל.',
  },
];

const MACRO_TABS = [
  'חלבון',
  'שומן',
  'פחמימות',
];

const PROTEIN_SOURCES = [
  ['ביצה אחת', '6-7 גרם'],
  ['חזה עוף 100 גרם', '30-32 גרם'],
  ['חזה הודו 100 גרם', '29-31 גרם'],
  ['בקר רזה 100 גרם', '26-28 גרם'],
  ['פילה דג 100 גרם', '22-26 גרם'],
  ['סלמון 100 גרם', '25-27 גרם'],
  ['טונה במים - קופסה', 'כ-25 גרם'],
  ['יוגורט יווני 200 גרם', '18-20 גרם'],
  ['קוטג׳ 5% 200 גרם', '22-25 גרם'],
  ['טופו 100 גרם', '8-10 גרם'],
  ['טמפה 100 גרם', '19-20 גרם'],
  ['עדשים מבושלות - כוס', '18 גרם'],
  ['גרגרי חומוס - כוס', '15 גרם'],
  ['אדממה - כוס', '17 גרם'],
];

const PROTEIN_ROLES = [
  'בונה ומתחזק כל שריר בגוף שלך.',
  'יוצר את הקולגן שמחזיק את העור שלך מתוח.',
  'בונה שיער וציפורניים.',
  'משתתף בייצור הורמונים כמו אסטרוגן ופרוגסטרון.',
  'מייצר נוגדנים כחלק ממערכת החיסון.',
  'מאט ספיגת סוכר ותומך ביציבות אנרגטית.',
  'נותן שובע חזק יותר מכל מאקרו אחר.',
];

const POPULAR_ISRAELI_PROTEIN = [
  ['פיתה + חומוס + טחינה + ביצה', 'כ-15 גרם'],
  ['שקשוקה עם 2 ביצים', 'כ-14 גרם'],
  ['סלט טונה עם ביצה', 'כ-32 גרם'],
  ['שווארמה עוף במנה רגילה', '35-40 גרם'],
  ['לביבות גבינה עם יוגורט', '18-20 גרם'],
  ['פלאפל במנה', 'כ-18 גרם'],
];

const FAT_TYPES = [
  {
    title: 'שומן רווי',
    desc: 'נמצא בחמאה, גהי, שמן קוקוס, בשר שמן וגבינות. הוא לא "השטן" כמו שסיפרו לך, אבל גם לא כל השומן שלך. במינון סביר הוא לגמרי חלק מתזונה טובה.',
  },
  {
    title: 'שומן חד-בלתי רווי',
    desc: 'נמצא בשמן זית, אבוקדו, שקדים, טחינה וזיתים. זה הכוכב של התזונה הים תיכונית והבסיס הכי טוב לשומנים שלך.',
  },
  {
    title: 'שומן רב-בלתי רווי',
    desc: 'כאן נמצאים אומגה 3 ואומגה 6. אומגה 3 חיונית להפחתת דלקת, למוח, לעור ולמצב הרוח. אומגה 6 בכמות גבוהה מדי, במיוחד ממזון תעשייתי, יכולה להחמיר דלקת.',
  },
  {
    title: 'שומן טרנס',
    desc: 'זה השומן שכדאי באמת להימנע ממנו: מרגרינה, חלק ממאפים תעשייתיים, מוצרים עם שומן מוקשה. כאן אין בלבול, זה פשוט לא שווה את זה.',
  },
];

const CARB_GROUPS = [
  {
    title: 'פחמימות שכדאי שיהיו בבסיס שלך',
    items: ['שיבולת שועל מלאה', 'קינואה', 'אורז', 'לחם מחמצת איכותי', 'תפוחי אדמה', 'בטטה', 'דלעת', 'כוסמת', 'פריקה', 'פסטה דורום מלאה', 'קטניות', 'פירות'],
  },
  {
    title: 'פחמימות שהן בסדר, אבל לא חייבות להיות הבסיס',
    items: ['לחם לבן', 'פסטה לבנה', 'אורז לבן רגיל', 'תירס'],
  },
  {
    title: 'פחמימות שכדאי לצמצם',
    items: ['סוכר לבן מוסף', 'ממתקים', 'מאפים תעשייתיים', 'משקאות ממותקים', 'דגני בוקר ממותקים', 'לחמים תעשייתיים עם סוכר מוסף'],
  },
];

const CYCLE_PHASES = [
  {
    title: 'שלב 1: הווסת (ימים 1-5)',
    desc: 'רמות האסטרוגן והפרוגסטרון נמוכות. יש אובדן דם וברזל, אנרגיה לרוב נמוכה יותר, ולעיתים כאבים או רגישות.',
    body: 'זה חלון שבו הגוף לרוב פחות "דוחף קדימה" ויותר עסוק בהתאוששות. הרחם מתכווץ, יש תגובה דלקתית טבעית, ולעיתים מאבדים דם, ברזל ונוזלים. לכן זה לא שלב להילחם בגוף אלא לעבוד איתו.',
    feel: ['יותר עייפות או כבדות', 'כאבי מחזור, גב תחתון רגיש או כאבי ראש', 'פחות סבלנות לאימון אגרסיבי', 'לפעמים רעב מוגבר או צורך במזון מנחם וחם'],
    train: ['אם את מרגישה טוב: אימון כוח רגיל אבל מעט מתון יותר', 'אם יש כאבים או חולשה: הליכה, מוביליטי, יוגה, פילאטיס עדין', 'זה זמן טוב להוריד עומס ולא להרגיש אשמה על זה', 'המטרה היא תחזוקה והתאוששות, לא שיא ביצועים'],
    doEat: ['ברזל: בשר אדום, כבד עוף, עדשים, תרד, רימון', 'ויטמין C ליד הברזל לספיגה טובה יותר', 'מגנזיום נגד כאבי מחזור', 'אומגה 3 להפחתת דלקת'],
    reduce: ['קפאין', 'אלכוהול', 'מזון מעובד ומלוח'],
  },
  {
    title: 'שלב 2: השלב הפוליקולרי (ימים 6-13)',
    desc: 'אסטרוגן עולה, אנרגיה חוזרת, הרגישות לאינסולין טובה יותר, וזה לרוב זמן נעים יותר לאימונים ולהתקדמות.',
    body: 'זה בדרך כלל שלב של עלייה באנרגיה, במוטיבציה וביכולת להתאושש. הגוף מגיב טוב יותר לפחמימות, יש יותר תחושת קלילות, והרבה נשים מרגישות שהראש חד יותר והגוף משתף פעולה.',
    feel: ['יותר אנרגיה וראש צלול', 'תחושת קלילות יחסית', 'פחות נפיחות ויותר יציבות במצב הרוח', 'יותר מוכנות להתקדמות באימונים'],
    train: ['זה חלון מצוין להעמיס יותר באימוני כוח', 'אפשר לדחוף קצת יותר משקל, נפח או אינטנסיביות', 'אם את עובדת על התקדמות, זה שלב טוב לרדוף אחרי PR חכם', 'גם גרעון קלורי לרוב מרגיש נסבל יותר בשלב הזה'],
    doEat: ['ירקות מצליבים', 'חלבון מספק', 'פחמימות מלאות', 'זרעי פשתן'],
    reduce: [],
  },
  {
    title: 'שלב 3: הביוץ (ימים 14-16)',
    desc: 'שיא האסטרוגן, תחושה טובה יותר, לפעמים תיאבון מעט נמוך יותר ואנרגיה גבוהה.',
    body: 'בביוץ יש הרבה פעמים שיא של תחושת חיוניות, חדות ודרייב. זה יכול להרגיש כמו "הגוף עובד מעצמו". מצד שני, אצל חלק מהנשים יש גם רגישות גדולה יותר למאמץ חד מדי, ולכן צריך לשלב בין ניצול של האנרגיה לבין הקשבה למפרקים ולעייפות.',
    feel: ['תחושת כוח ואנרגיה גבוהה', 'לפעמים תיאבון מעט נמוך יותר', 'ביטחון גבוה יותר ומוטיבציה טובה', 'אצל חלק מהנשים גם רגישות קלה, כאב צדדי או תחושת עומס'],
    train: ['אפשר להתאמן חזק, במיוחד אם מרגישים טוב', 'זה זמן טוב לאימון איכותי וקצת יותר עצים', 'עדיין שווה להקפיד על חימום ושליטה בתנועה', 'לא חייבים "לשרוף את עצמך" רק כי יש הרבה אנרגיה'],
    doEat: ['אוכל סטנדרטי, מאוזן ובריא', 'הרבה ירקות צבעוניים', 'מקורות נוגדי חמצון'],
    reduce: [],
  },
  {
    title: 'שלב 4: השלב הלוטאלי (ימים 17-28)',
    desc: 'זה השלב של ה-PMS. יותר חשקים, יותר אגירת מים, נפיחות ותנודות מצב רוח.',
    body: 'בשלב הזה הפרוגסטרון עולה ואז יורד, טמפרטורת הגוף מעט עולה, והתיאבון הרבה פעמים נפתח יותר. הגוף שורף מעט יותר קלוריות, אבל גם סובל יותר מנפיחות, אגירת מים ותחושת "אין לי כוח". כאן לא צריך להעניש את עצמך, אלא להתאים ציפיות.',
    feel: ['יותר רעב ויותר חשקים לפחמימות או למתוק', 'יותר נפיחות, אגירת מים ותחושת כבדות', 'שינה פחות יציבה או סבלנות נמוכה יותר', 'אצל חלק מהנשים גם ירידה חדה במוטיבציה לאימונים'],
    train: ['אימוני כוח עדיין חשובים, אבל לפעמים נכון להוריד ציפייה לביצועי שיא', 'אם הגוף מרגיש כבד, אפשר לעבוד נקי ומדויק במקום אגרסיבי', 'יותר הליכה, יותר התאוששות, פחות מאבק', 'אם את מרגישה שבשבוע הזה את צריכה קצת יותר מנוחה, זה לא כשל אלא פיזיולוגיה'],
    doEat: ['יותר פחמימות מורכבות', 'יותר קלוריות אם צריך', 'מגנזיום', 'ויטמין B6', 'שוקולד מריר במידה', 'מזונות מלאים במים'],
    reduce: ['מלח מעובד', 'אלכוהול', 'קפאין'],
  },
];

const PLATE_PARTS = [
  { title: 'רבע ראשון: חלבון', desc: 'כף יד אחת. חזה עוף, דג, ביצים, קציצות, טופו, יוגורט יווני.' },
  { title: 'רבע שני: פחמימה מורכבת', desc: 'כף יד אחת סגורה. אורז, תפוח אדמה, בטטה, קינואה, שיבולת שועל, פיתה שלמה, לחם מחמצת.' },
  { title: 'חצי צלחת: ירקות', desc: 'שתי כפות יד פתוחות. סלט גדול, ירקות מאודים, אפויים או טריים.' },
  { title: 'תוספת: שומן טוב', desc: 'בערך כף אחת. שמן זית, טחינה, אבוקדו, זיתים או אגוזים.' },
];

const REAL_MEALS = [
  {
    title: 'ארוחת בוקר ישראלית',
    desc: '2 ביצים, פרוסת לחם מחמצת, סלט ישראלי, וכף טחינה או חצי אבוקדו. זו ארוחה מלאה, לא "כבדה מדי".',
  },
  {
    title: 'ארוחת צהריים במשרד או באוניברסיטה',
    desc: 'חזה עוף או דג, אורז, וסלט גדול. הטיפ היחיד: להכפיל את הירקות, ולוודא שיש באמת חלבון מספק.',
  },
  {
    title: 'ארוחת ערב ביתית',
    desc: 'סלמון או קציצות הודו או ביצים, לצד חצי בטטה או חצי כוס אורז, וירקות. פשוט, נגיש ומאוזן.',
  },
];

const ISRAELI_MEALS = [
  {
    title: 'חומוס',
    desc: 'חומוס + ביצה + טחינה + סלט ירקות גדול + פיתה אחת. זו ארוחה לגמרי תקינה כשמרכיבים אותה נכון.',
  },
  {
    title: 'שקשוקה',
    desc: '2-3 ביצים, הרבה עגבניות ופלפלים, חצי פיתה או פרוסת לחם מחמצת, וקצת טחינה או שמן זית.',
  },
  {
    title: 'שווארמה',
    desc: 'חלבון טוב, ירקות, פיתה אחת, ולהעדיף לא להפוך את זה לארוחת "גם וגם וגם".',
  },
  {
    title: 'ארוחת שבת',
    desc: 'לבחור חלבון, לקחת פחמימה בכמות נורמלית, ולהגדיל ירקות וסלטים. לא חייבים לוותר על אוכל משפחתי כדי לאכול נכון.',
  },
];

const EATING_STYLES = [
  {
    title: '3 ארוחות גדולות',
    desc: 'מתאים למי שעסוקה, לא אוהבת לנשנש, ויכולה לעבור טוב בין ארוחות.',
  },
  {
    title: '4-5 ארוחות קטנות',
    desc: 'מתאים למי שמרגישה רעבה כל 3-4 שעות, עם רמות סוכר פחות יציבות, או כשיש אימונים בשגרה.',
  },
  {
    title: 'הסגנון שלא עובד',
    desc: 'לא לאכול כל היום ואז "להתפרק" בערב. זה אחד הדפוסים הכי שכיחים והכי מתסכלים אצל נשים צעירות.',
  },
];

const FAT_SOURCES = [
  ['לבישול חם', 'שמן קוקוס, גהי, חמאה איכותית, שומן אווז'],
  ['לסלטים וקר', 'שמן זית כתית מעולה, שמן אבוקדו, שמן פשתן'],
  ['מהאוכל עצמו', 'אבוקדו, טחינה, שקדים, אגוזי מלך, זרעי פשתן, צ׳יה, זיתים, ביצים, סלמון, מקרל וסרדינים'],
];

const CARB_TIMING = [
  ['בבוקר', 'פחמימות מורכבות עם חלבון ושומן, כדי להחזיק אנרגיה יציבה.'],
  ['לפני אימון', 'פחמימה קלה לעיכול כמו בננה, תמר או שיבולת שועל.'],
  ['אחרי אימון', 'פחמימה עם חלבון כדי למלא מאגרים ולתמוך בהתאוששות.'],
  ['בערב', 'פחמימה קטנה יכולה דווקא לעזור לשינה ולא חייבים לפחד ממנה.'],
];

const FINAL_SUMMARY = [
  'קלוריות כן חשובות, אבל לא כמו שחשבת. 15-20 אחוז גרעון, לא קיצוניות.',
  'הגוף שלך צריך חלבון, שומן ופחמימה. כולם הכרחיים.',
  'חלבון הוא הכי חשוב, ובדרך כלל את צריכה יותר ממה שאת חושבת.',
  'שומן הוא לא אויב. להפך, הוא הכרחי להורמונים, למוח, לעור ולשובע.',
  'פחמימות לא צריך לחתוך לגמרי. פשוט לבחור אותן טוב יותר ולתזמן אותן חכם.',
  'ההורמונים שלך עובדים במחזור. יש שבועות שבהם צריך יותר אוכל, לא פחות.',
  '80/20 מנצח 100/0. חיים אמיתיים עובדים טוב יותר עם גמישות.',
  'ארוחת בוקר עם חלבון משנה הרבה יותר ממה שנדמה לך.',
  'את לא רק המספר על המשקל. שריר ושומן מספרים סיפור אחר לגמרי.',
  'זה מרתון, לא ספרינט. שינוי אחד קטן בשבוע שווה יותר מעשרה שינויים שלא תחזיקי.',
];

const sH3ch1 = { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };

function NutritionIcon({ type }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    nutrition: <svg {...common}><path d="M6 4h12"/><path d="M9 4v6a3 3 0 1 0 6 0V4"/><path d="M8 20h8"/><path d="M12 13v7"/></svg>,
    energy: <svg {...common}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>,
    calculator: <svg {...common}><rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6h8"/><path d="M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01M8 19h8"/></svg>,
    deficit: <svg {...common}><path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h6"/><path d="m18 15 3 3-3 3"/></svg>,
    protein: <svg {...common}><path d="M8 4c2 0 3 1.5 3 3.5S10 11 8 11 5 9.5 5 7.5 6 4 8 4Z"/><path d="M16 13c2 0 3 1.5 3 3.5S18 20 16 20s-3-1.5-3-3.5S14 13 16 13Z"/><path d="M10.5 9.5 13.5 14.5"/></svg>,
    fat: <svg {...common}><path d="M12 3c4 4 7 7 7 11a7 7 0 1 1-14 0c0-4 3-7 7-11Z"/></svg>,
    carbs: <svg {...common}><path d="M5 15c0-4 3-7 7-7s7 3 7 7"/><path d="M7 15h10"/><path d="M8 11h8"/><path d="M10 8h4"/></svg>,
    leaf: <svg {...common}><path d="M19 5c-6 0-10 3.5-10 9 0 3 1.7 5 4 5 5.5 0 6-7.5 6-14Z"/><path d="M6 19c2-3 5-5 9-6"/></svg>,
    hormones: <svg {...common}><circle cx="12" cy="7" r="3"/><path d="M12 10v11"/><path d="M8 18h8"/><path d="M9 21h6"/></svg>,
    plate: <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M4 12h16"/><path d="M12 12 18 18"/></svg>,
    meal: <svg {...common}><path d="M4 4v7a2 2 0 0 0 2 2h1v7"/><path d="M8 4v7"/><path d="M12 4h5v17"/><path d="M17 4v6h-5"/></svg>,
    timing: <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    summary: <svg {...common}><path d="M5 12.5 9 16l10-10"/></svg>,
  };
  return icons[type] || icons.nutrition;
}

function Ch1SectionTitle({ icon, children, style = {} }) {
  return (
    <Reveal>
      <div className="nutrition-section-title" style={style}>
        <div className="nutrition-section-icon"><NutritionIcon type={icon} /></div>
        <h3 style={{ ...sH3ch1, marginBottom: 0 }}>{children}</h3>
      </div>
    </Reveal>
  );
}

function CalorieDashboard() {
  return (
    <div className="calorie-dashboard card">
      <div className="calorie-copy">
        <div className="nutrition-kicker">METABOLIC MAP</div>
        <div className="calorie-title">האוכל שלך לא "נשרף" במקום אחד</div>
        <p className="calorie-text">
          הגוף מפצל את האנרגיה בין חילוף חומרים בסיסי, תנועה יומיומית, אימון ועיכול. זאת בדיוק הסיבה שצריך להבין את כל התמונה, לא רק "כמה אכלתי".
        </p>
      </div>
      <div className="calorie-rings">
        <div className="calorie-center">ENERGY</div>
        <div className="calorie-chip calorie-chip-a">BMR</div>
        <div className="calorie-chip calorie-chip-b">NEAT</div>
        <div className="calorie-chip calorie-chip-c">EEE</div>
        <div className="calorie-chip calorie-chip-d">TEF</div>
      </div>
    </div>
  );
}

function EnergySplitPie() {
  const items = [
    { label: 'BMR', value: '65%', color: '#E85D75', desc: 'חילוף חומרים בסיסי' },
    { label: 'NEAT', value: '20%', color: '#BBB2EE', desc: 'תנועה יומיומית' },
    { label: 'EEE', value: '8%', color: '#FFB84D', desc: 'אימון' },
    { label: 'TEF', value: '7%', color: '#7BC6A4', desc: 'עיכול' },
  ];

  return (
    <div className="card" style={{ padding: '24px', marginBottom: 28 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך נראית השריפה היומית שלך בעין</div>
      <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 18 }}>
        אלה כמובן ממוצעים, אבל הם עוזרים להבין את התמונה: רוב השריפה שלך מגיעה מ־`BMR`, אחר כך מתנועה יומיומית, ורק חלק קטן יחסית מגיע מהאימון עצמו.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div
            style={{
              width: 230,
              height: 230,
              borderRadius: '50%',
              background: 'conic-gradient(#E85D75 0 65%, #BBB2EE 65% 85%, #FFB84D 85% 93%, #7BC6A4 93% 100%)',
              position: 'relative',
              boxShadow: 'inset 0 0 0 1px rgba(25,34,29,0.06), 0 16px 40px rgba(25,34,29,0.08)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '22%',
                borderRadius: '50%',
                background: '#fffdf8',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                padding: 12,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900, color: 'var(--color-fg1)' }}>EEE</div>
              <div style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.5 }}>
                רק חלק קטן
                <br />
                מהשריפה הכוללת
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map((item, i) => (
            <div key={i} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: item.color, flexShrink: 0 }} />
              <div style={{ minWidth: 54, fontWeight: 800, color: 'var(--color-fg1)' }}>{item.label}</div>
              <div style={{ minWidth: 48, fontWeight: 700, color: 'var(--color-accent)' }}>{item.value}</div>
              <div style={{ fontSize: 14, color: 'var(--color-fg2)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MacroVisual() {
  const items = [
    ['protein', 'חלבון', 'בונה ומתחזק'],
    ['fat', 'שומן', 'מאזן ומרגיע'],
    ['carbs', 'פחמימות', 'מדליקות אנרגיה'],
  ];
  return (
    <div className="macro-visual card">
      {items.map(([icon, title, sub], i) => (
        <div key={i} className="macro-visual-item">
          <div className="macro-visual-icon"><NutritionIcon type={icon} /></div>
          <div className="macro-visual-title">{title}</div>
          <div className="macro-visual-sub">{sub}</div>
        </div>
      ))}
    </div>
  );
}

function PlateVisual() {
  return (
    <div className="plate-visual card">
      <div className="plate-circle">
        <div className="plate-q plate-q1"><span>חלבון</span></div>
        <div className="plate-q plate-q2"><span>פחמימה</span></div>
        <div className="plate-q plate-q3"><span>ירקות</span></div>
        <div className="plate-q plate-q4"><span>ירקות</span></div>
        <div className="plate-center-badge">+ שומן טוב</div>
      </div>
    </div>
  );
}

function BmrTdeeCalculator() {
  const [weight, setWeight] = useState('65');
  const [height, setHeight] = useState('165');
  const [age, setAge] = useState('28');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState(() => {
    const bmr = (10 * 65) + (6.25 * 165) - (5 * 28) - 161;
    const tdee = bmr * 1.55;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      fatLoss: `${Math.round(tdee * 0.8)}-${Math.round(tdee * 0.85)}`,
      maintenance: Math.round(tdee),
      gain: `${Math.round(tdee + 200)}-${Math.round(tdee + 300)}`,
    };
  });

  const handleCalculate = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedAge = parseFloat(age);
    const parsedActivity = parseFloat(activity);

    if (!parsedWeight || !parsedHeight || !parsedAge || !parsedActivity) return;

    const bmr = (10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) - 161;
    const tdee = bmr * parsedActivity;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      fatLoss: `${Math.round(tdee * 0.8)}-${Math.round(tdee * 0.85)}`,
      maintenance: Math.round(tdee),
      gain: `${Math.round(tdee + 200)}-${Math.round(tdee + 300)}`,
    });
  };

  return (
    <div className="card" style={{ padding: '24px', marginTop: 18, marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div className="nutrition-function-icon" style={{ width: 42, height: 42 }}>
          <NutritionIcon type="calculator" />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>מחשבון BMR ו-TDEE</div>
          <div style={{ fontSize: 13, color: 'var(--color-fg2)', marginTop: 2 }}>
            כדי שלא תצטרכי לחשב בראש, הנה נקודת התחלה מהירה ומעשית.
          </div>
        </div>
      </div>

      <div className="calc-input-group" style={{ marginTop: 14 }}>
        <div className="calc-input-wrap">
          <label className="calc-label">משקל (ק"ג)</label>
          <input className="calc-input" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="calc-input-wrap">
          <label className="calc-label">גובה (ס"מ)</label>
          <input className="calc-input" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className="calc-input-wrap">
          <label className="calc-label">גיל</label>
          <input className="calc-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="calc-input-wrap">
          <label className="calc-label">רמת פעילות</label>
          <select className="calc-input" value={activity} onChange={(e) => setActivity(e.target.value)}>
            {ACTIVITY_LEVELS.map(([label, detail, multiplier], idx) => (
              <option key={idx} value={multiplier.replace('BMR × ', '')}>
                {label} - {multiplier.replace('BMR × ', 'x')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="calc-btn" style={{ marginTop: 16 }} onClick={handleCalculate}>חשבי לי</button>

      <div className="card-grid-4" style={{ marginTop: 18 }}>
        <div className="calc-result">
          <div className="calc-result-num">{result.bmr}</div>
          <div className="calc-result-label">BMR</div>
        </div>
        <div className="calc-result">
          <div className="calc-result-num">{result.tdee}</div>
          <div className="calc-result-label">TDEE</div>
        </div>
        <div className="calc-result">
          <div className="calc-result-num">{result.fatLoss}</div>
          <div className="calc-result-label">ירידה בשומן</div>
        </div>
        <div className="calc-result">
          <div className="calc-result-num">{result.gain}</div>
          <div className="calc-result-label">עלייה במסה</div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.8, marginTop: 16, marginBottom: 0 }}>
        `BMR` הוא מה שהגוף שלך שורף רק כדי לחיות. `TDEE` הוא סך השריפה היומית שלך. טווח הירידה בשומן כאן מחושב לפי גרעון מתון של 15-20 אחוז, כי זה הטווח שהכי מחזיק לנשים לאורך זמן.
      </p>
    </div>
  );
}

function MacroPanel({ active }) {
  if (active === 0) {
    return (
      <div>
        <div className="card" style={{ padding: '24px', marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>חלבון: הבסיס של הכל</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            חלבון הוא אבן הבניין של הגוף. כל שריר, עצם, שיער, ציפורן, עור, אנזים והורמון בנויים מחלבון. הוא לא קשור רק לשריר. הוא קשור לשובע, לעור, לשיער, למערכת החיסון וליציבות של הסוכר בדם.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            לבריאות בסיסית, ההמלצות הרשמיות נמוכות יותר. אבל אם את מתאמנת ורוצה גם שובע, התאוששות ובניית שריר, לרוב כדאי לחשוב על בערך 1.2-1.6 גרם חלבון לקילו כטווח טוב להתחלה, ועל 1.6-2.0 גרם לקילו כטווח אופטימלי יותר למי שמתאמנת כוח או נמצאת בגרעון קלורי.
          </p>
        </div>
        <MacroVisual />
        <div className="card-grid-2" style={{ marginBottom: 18 }}>
          {PROTEIN_ROLES.map((item, i) => (
            <div key={i} className="card" style={{ padding: '16px 18px' }}>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
        <div className="side-note" style={{ marginBottom: 18 }}>
          כלל אצבע פשוט: בכל ארוחה עיקרית לכוון ל-25-40 גרם חלבון, ובנשנוש ל-15-20 גרם אם צריך.
        </div>
        <BloatTable headers={['מקור', 'חלבון']} rows={PROTEIN_SOURCES} />
        <div style={{ marginTop: 18 }}>
          <BloatTable headers={['אוכל ישראלי נפוץ', 'כמה חלבון יש בו בערך']} rows={POPULAR_ISRAELI_PROTEIN} />
        </div>
        <div className="side-note" style={{ marginTop: 18 }}>
          טיפ חשוב לצמחוניות: חלבון צמחי הוא לא "פחות טוב", אבל הוא דורש הרכבה חכמה יותר. שילובים כמו חומוס עם טחינה, אורז עם עדשים או לחם עם חמאת בוטנים עוזרים להשלים את חומצות האמינו.
        </div>
      </div>
    );
  }

  if (active === 1) {
    return (
      <div>
        <div className="card" style={{ padding: '24px', marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>שומן: החבר שחשבת שהוא אויב</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם גדלת על "0 אחוז שומן", גדלת על פחד. בפועל, שומן חיוני להורמונים, לבלוטת התריס, למוח, לעור, לספיגת ויטמינים ולשובע. אישה שלא אוכלת מספיק שומן עלולה לראות את זה במחזור, בעור, במצב הרוח ובשיער.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            כלל אצבע טוב: בערך 0.8-1.2 גרם שומן לקילו משקל גוף ביום. זה לא קיצוני. זה פשוט נורמלי.
          </p>
        </div>
        <div className="side-note" style={{ marginBottom: 18 }}>
          בפועל, לאישה של 65 ק"ג זה יוצא בערך 50-80 גרם שומן ביום. זה יכול להיות 2 כפות שמן זית, חצי אבוקדו, חופן שקדים, כף טחינה ו-2 ביצים. לא דרמה, פשוט תזונה תקינה.
        </div>
        <div className="card-grid-2">
          {FAT_TYPES.map((item, i) => (
            <div key={i} className="card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <BloatTable headers={['קטגוריה', 'מקורות טובים']} rows={FAT_SOURCES} />
        </div>
        <div className="side-note" style={{ marginTop: 18 }}>
          טיפ ישראלי פשוט: טחינה גולמית טובה היא אחד המזונות הכי משתלמים שיש. היא נותנת שומן טוב, קצת חלבון, סידן, מגנזיום ושובע. היא לא "משהו משמין שצריך לפחד ממנו".
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card" style={{ padding: '24px', marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>פחמימות: החברה הכי מבולבלת</div>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          פחמימה היא לא אויב. לאישה, פחמימות הן חלק מהאיזון ההורמונלי, מהשינה, מהמצב הרוח ומהביצועים באימון. הבעיה היא לא עצם קיומן, אלא סוג הפחמימה, הכמות, וההקשר שבו את אוכלת אותה.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
          אחרי שקבעת חלבון ושומן, הפחמימות הן מה שנשאר מהקלוריות. לא חייבים לפחד מהן. צריך לדעת להשתמש בהן.
        </p>
      </div>
      <div className="card" style={{ padding: '24px', marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>מה זה בכלל פחמימה?</div>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          פחמימה היא בעצם סוכר, או שרשרת של סוכרים. ההבדל בין תפוח, אורז, לחם, פסטה או סוכר לבן הוא לא בזה שאחד "קסם" והשני "רעל", אלא במהירות שבה הם מתפרקים, במה עוד יש סביבם, ובתגובה שהם יוצרים בגוף שלך.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
          לנשים במיוחד, חיתוך אגרסיבי מדי של פחמימות עלול לפגוע ב-T3 של בלוטת התריס, להעלות קורטיזול, לפגוע בשינה ולהחליש ביצועים באימון. לכן גם בגרעון צריך להשתמש בפחמימות חכם, לא למחוק אותן.
        </p>
      </div>
      <div className="card-grid-2">
        {CARB_GROUPS.map((group, i) => (
          <div key={i} className="card" style={{ padding: '20px 22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{group.title}</div>
            <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
              {group.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18 }}>
        <BloatTable headers={['מתי', 'איך להשתמש בפחמימות']} rows={CARB_TIMING} />
      </div>
      <div className="side-note" style={{ marginTop: 18 }}>
        טיימינג פשוט: בבוקר פחמימות מורכבות עם חלבון ושומן, לפני אימון פחמימה קלה לעיכול, אחרי אימון פחמימה עם חלבון, ובערב פחמימה קטנה בהחלט יכולה לעזור לשינה.
      </div>
      <div className="card" style={{ padding: '24px', marginTop: 18, marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>אלכוהול - לא "אסור", אבל כדאי להבין מה הוא עושה</div>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          אלכוהול הוא לא רע מוסרי, והוא לא "יהרוס לך הכל". אבל אם את רוצה לבנות שריר, לרדת בשומן ולהרגיש טוב, חשוב להבין מה בדיוק קורה בגוף בכל פעם שאת שותה כוס יין בארוחת שישי או בירה ביום שישי בערב.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          מבחינה קלורית, אלכוהול הוא 7 קלוריות לגרם. זה יותר מחלבון ומפחמימות, ופחות משומן. כוס יין רגילה היא בערך 120-150 קלוריות, בירה קטנה היא בערך 150, וכוס וודקה או ערק קטנה היא בערך 100. שלוש כוסות יין בארוחת שישי כבר יכולות להוסיף 400-450 קלוריות שלא ממש הרגשת.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          אבל הקאץ' האמיתי הוא לא רק הקלוריות. הגוף מתייחס לאלכוהול כאל חומר שצריך לפנות. ברגע שהוא נכנס לדם, הכבד מתפנה לטפל בו, ובזמן הזה שריפת השומן יורדת משמעותית. זאת אומרת שגם אם היית בגרעון קלורי, בערב שבו שתית, הגוף שלך פחות פנוי לעבוד על מה שחשבת שהוא יעבוד עליו.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          ועכשיו החלק שמעצבן במיוחד למי שמתאמנת: אלכוהול פוגע גם בסינתזת חלבון. במילים פשוטות, הוא מחליש את היכולת של הגוף להפוך אימון וחלבון שאת אוכלת לבנייה אמיתית של שריר. הוא גם מעלה קורטיזול, פוגע בטסטוסטרון - שגם נשים צריכות לבניית שריר - ומשבש את הורמון הגדילה שמופרש בלילה.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
          גם השינה משלמת מחיר. הרבה נשים מרגישות שהן "נרדמות מהר יותר" אחרי שתייה, אבל איכות השינה נפגעת. שלב ה-REM מתקצר, יש יותר יקיצות קטנות, ובבוקר את פחות משוקמת. פחות שינה טובה = יותר רעב, יותר חשקים, פחות אנרגיה לאימון ופחות תוצאות.
        </p>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
          אז מה עושים? לא מחרימים אלכוהול לתמיד, אבל כן מבינים שהוא עולה משהו. כוס יין בארוחת שישי עם המשפחה יכולה להיות שווה את זה. שלוש בירות בערב רגיל מול הטלוויזיה - כנראה פחות. ואם את בתקופה שאת באמת רוצה לראות שינוי, או סביב אימון חשוב, לפעמים פשוט שווה לוותר על אותו ערב.
        </p>
      </div>
    </div>
  );
}

function Chapter1() {
  return (
    <section id="chapter-1" className="guide-section">
      <ChapterHeader
        label="פרק 1"
        title="תזונה - המדריך הבסיסי שלא קיבלת בבית הספר"
        desc="הפרק שמתחיל מההתחלה. בלי להניח שאת יודעת מונחים, בלי לזלזל, ובלי עוד תפריט דיאטה ריק מהקשר."
      />

      <Reveal>
        <div className="side-note" style={{ marginBottom: 28 }}>
          זה לא הולך להיות מהיר. זה הולך להיות עמוק. אבל אחרי שתקראי את הפרק הזה, את תביני למה את עושה כל דבר שאת עושה במטבח, ולא תצטרכי יותר לחפש "תפריט דיאטה" באינטרנט.
        </div>
      </Reveal>

      <Reveal>
        <div className="card-grid-2" style={{ marginBottom: 44 }}>
          {[
            'איך הגוף שלך בכלל משתמש באוכל, ולמה "פחות קלוריות" זו תשובה חלקית.',
            'מה זה חלבון, שומן ופחמימה, ולמה הגוף צריך את שלושתם.',
            'איך לחשב בעצמך כמה קלוריות את צריכה, גם בלי אפליקציה.',
            'איך לבנות ארוחה בלי לחשוב יותר מדי, אבל לחשוב נכון.',
            'למה הורמונים של אישה דורשים גישה אחרת מזו של גבר.',
            'איך לשלב את כל זה עם הסיטואציות האמיתיות של החיים בישראל.',
          ].map((item, i) => (
            <div key={i} className="card nutrition-icon-card" style={{ padding: '20px 22px' }}>
              <div className="nutrition-inline-head">
                <div className="nutrition-mini-icon"><NutritionIcon type={['energy','protein','calculator','plate','hormones','meal'][i] || 'nutrition'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-accent)' }}>0{i + 1}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <PullQuote text="אחרי שתקראי את הפרק הזה, את תביני למה את עושה כל דבר שאת עושה במטבח, ולא תצטרכי יותר לחפש 'תפריט דיאטה' באינטרנט." />

      <Reveal><CalorieDashboard /></Reveal>

      <Ch1SectionTitle icon="energy">1. איך הגוף שלך בכלל עובד</Ch1SectionTitle>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>אנרגיה: מה זה בכלל אומר?</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כל מה שהגוף שלך עושה דורש אנרגיה: לנשום, לחשוב, ללכת, לעכל, לגדל שיער, לשמור על טמפרטורת גוף ולהילחם בהצטננות. האנרגיה הזאת מגיעה מהאוכל, ואנחנו מודדים אותה בקלוריות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            אבל הגוף שלך לא פשוט "שורף" קלוריות כמו שאוטו שורף בנזין. הוא משתמש באנרגיה בכמה מסלולים שונים, וזו הסיבה שצריך להבין את התמונה המלאה.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {ENERGY_USES.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="principle-card nutrition-principle-card">
              <div className="principle-num">{item.num}</div>
              <div className="nutrition-function-icon"><NutritionIcon type={['energy','energy','timing','meal'][i] || 'energy'} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <EnergySplitPie />
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך לחשב BMR ו-TDEE</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 12 }}>
            נוסחת Mifflin-St Jeor לנשים:
            <br />
            <strong style={{ color: 'var(--color-fg1)' }}>BMR = (10 × משקל בק"ג) + (6.25 × גובה בס"מ) - (5 × גיל) - 161</strong>
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 12 }}>
            דוגמה: אישה בת 28, גובה 165 ס"מ, משקל 65 ק"ג:
            <br />
            BMR = (10 × 65) + (6.25 × 165) - (5 × 28) - 161
            <br />
            BMR = 650 + 1031 - 140 - 161 = <strong style={{ color: 'var(--color-fg1)' }}>1380</strong>
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 0 }}>
            עכשיו מכפילים לפי רמת הפעילות כדי להגיע ל-TDEE, כלומר סך השריפה היומית.
          </p>
        </div>
        <BloatTable headers={['רמת פעילות', 'פירוט', 'נוסחה']} rows={ACTIVITY_LEVELS} />
        <BmrTdeeCalculator />
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginTop: 18, marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>שלב 3: התאמה למטרה</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אחרי שחישבת את ה-TDEE שלך, מגיע שלב המטרה. לעלות במסת שריר זה בדרך כלל עודף קטן של 200-300 קלוריות. לשמור על המשקל זה לאכול בערך את מה שאת שורפת. ולרדת בשומן זה לאכול פחות ממה שהגוף שורף.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            הנקודה הכי חשובה: רוב הנשים לא נכשלות כי הן לא מבינות שצריך גרעון, אלא כי הן בוחרות גרעון אגרסיבי מדי שלא מחזיק יותר משבועות בודדים.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card-grid-3" style={{ marginTop: 18, marginBottom: 48 }}>
          {GOAL_OPTIONS.map((item, i) => (
            <div key={i} className="card nutrition-goal-card" style={{ padding: '22px 20px', textAlign: 'center' }}>
              <div className="nutrition-goal-icon">{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Ch1SectionTitle icon="deficit">2. גרעון קלורי - המילה הכי חשובה שלא הסבירו לך</Ch1SectionTitle>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            גרעון קלורי הוא המצב שבו את אוכלת פחות ממה שהגוף שלך שורף. אם הגוף שורף 2,000 קלוריות ואת אוכלת 1,700, יש חוסר של 300 קלוריות. הגוף משלים אותו מהמאגרים שלו, ובעיקר משומן.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            זה הבסיס של כל ירידה בשומן. אין דרך קסם שעוקפת את זה. אבל כאן בדיוק הרבה נשים טועות: לא בזה שהן עושות גרעון, אלא בזה שהן עושות אותו לא נכון.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            קילו של רקמת שומן בגוף הוא לא מספר מתמטי מושלם, אבל בפועל נהוג לחשוב על סדר גודל של בערך 7,000-7,700 קלוריות. גרעון של 500 קלוריות ביום יוצר בערך 3,500 קלוריות בשבוע, כלומר סביב חצי קילו. זה עדיין חשבון - פשוט כזה שהגוף לא תמיד מבצע בקו ישר ומושלם, במיוחד אצל נשים עם תנודות הורמונליות.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
        {DEFICIT_MISTAKES.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <AccordionCard
              icon="⚡"
              title={item.title}
              teaser={item.body}
              color={i % 2 === 0 ? '#E85D75' : '#BBB2EE'}
            >
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: 0 }}>{item.body}</p>
            </AccordionCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 18 }}>
          <strong>הגרעון הנכון לרוב הנשים:</strong> בערך 15-20 אחוז מתחת לשריפה. אם את שורפת 2,000 קלוריות, אז 1,600-1,700 הוא טווח מצוין. לא 1,200. לא 1,300. לא דיאטת חירום.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 42 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>עוד משהו חשוב: את לא רק המספר</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כל הנוסחאות האלה הן קירוב. גוף של אישה הוא לא מכונה מתמטית. יש ימים שהגוף שורף יותר, כמו אחרי אימון חזק או סביב ביוץ, ויש ימים שהוא שורף פחות, כמו בשבוע שלפני המחזור, בסטרס כרוני או בתקופות של שינה לא טובה.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם אכלת "לפי המספר" ולא ירדת אחרי 3-4 שבועות, זה לא אומר שצריך ישר להוריד עוד קלוריות. קודם בודקים אם את אוכלת יותר ממה שנדמה לך, אם את ישנה מעט, אם את בתקופת PMS, אם יש סטרס קבוע או אם יש בעיה הורמונלית אמיתית כמו PCOS או בלוטת תריס איטית.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            והכי חשוב: גם משקל זה לא כל הסיפור. שתי נשים באותו משקל יכולות להיראות אחרת לחלוטין לפי היחס בין שריר לשומן. לפעמים המשקל לא זז, אבל את נראית אחרת לגמרי. כשזה קורה, זו הצלחה, לא תקלה.
          </p>
        </div>
      </Reveal>

      <Ch1SectionTitle icon="protein">3. שלושת מקורות האנרגיה של הגוף</Ch1SectionTitle>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 20 }}>
          לגוף שלך יש שלושה מקורות של אנרגיה: חלבון, שומן ופחמימה. כל אחד מהם עושה משהו אחר בגוף, וכל אחד מהם הכרחי. ברגע שתביני מה כל אחד עושה, תפסיקי לראות אוכל כרשימת "אסור ומותר" ותתחילי להבין תפקידים.
        </p>
      </Reveal>

      <Reveal>
        <Tabs tabs={MACRO_TABS} renderContent={(active) => <MacroPanel active={active} />} />
      </Reveal>

      <Ch1SectionTitle icon="hormones" style={{ marginTop: 60 }}>4. הורמונים ותזונה - הסיפור הלא-מסופר של נשים</Ch1SectionTitle>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            רוב ספרי התזונה כתובים כאילו נשים וגברים הם אותו דבר. זה פשוט לא נכון. הגוף של אישה עובר מחזור חודשי שמשנה את הרעב, את הביצועים, את הרגישות לפחמימות, את מצב הרוח, ואת הצורך בנוזלים ובמינרלים.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            אישה שמבינה את זה ומתאימה את התזונה שלה, מרגישה הרבה יותר טוב. אישה שלא, מרגישה שהגוף שלה "בוגד בה" פעם בחודש.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
        {CYCLE_PHASES.map((phase, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <AccordionCard
              icon="🌗"
              title={phase.title}
              teaser={phase.desc}
              color={i % 2 === 0 ? '#BBB2EE' : '#E85D75'}
            >
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: '0 0 12px' }}>{phase.desc}</p>
              <div className="card" style={{ padding: '18px 20px', marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>מה באמת קורה בגוף</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{phase.body}</p>
              </div>
              <div className="card-grid-2" style={{ marginBottom: 14 }}>
                <div className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>מה כנראה תרגישי</div>
                  <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                    {phase.feel.map((item, idx) => <li key={idx} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>{item}</li>)}
                  </ul>
                </div>
                <div className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>איך לנצל את זה באימון</div>
                  <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                    {phase.train.map((item, idx) => <li key={idx} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="card-grid-2">
                <div className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>מה כן לאכול</div>
                  <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                    {phase.doEat.map((item, idx) => <li key={idx} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>{item}</li>)}
                  </ul>
                </div>
                <div className="card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>מה להפחית</div>
                  {phase.reduce.length ? (
                    <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                      {phase.reduce.map((item, idx) => <li key={idx} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>{item}</li>)}
                    </ul>
                  ) : (
                    <p style={{ fontSize: 14, color: 'var(--color-fg3)', lineHeight: 1.75, margin: 0 }}>אין כאן רשימת איסורים מיוחדת. זה פשוט חלון שבו הגוף בדרך כלל משתף פעולה יותר.</p>
                  )}
                </div>
              </div>
            </AccordionCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 48 }}>
          אם המחזור לא סדיר, נעלם, כאבי המחזור קשים מאוד, ה-PMS קיצוני, יש אקנה עמוק, נשירת שיער, ציפורניים שבירות או חשקים כבדים לסוכר - הרבה פעמים קודם כל צריך להסתכל על תזונה, שינה ועומס, לפני שקופצים ישר לתוספים.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>סימנים שהתזונה שלך מפרה את ההורמונים שלך</div>
          <div className="card-grid-2">
            {[
              'מחזור לא סדיר או נעלם: הרבה פעמים זה סימן לחוסר קלוריות, חוסר שומן, או אימון יתר.',
              'כאבי מחזור חזקים: לעיתים קרובות יש כאן חוסר במגנזיום, אומגה 3 או עודף דלקת מהתזונה.',
              'PMS קשה מאוד: חוסר B6, חוסר מגנזיום, יותר מדי סוכר ואלכוהול או מעט מדי אוכל אמיתי לאורך היום.',
              'עור שמן ואקנה בסנטר: לעיתים קרובות קשור לצריכת סוכר גבוהה, סטרס ועודף מוצרי חלב אצל מי שרגישה.',
              'שיער נושר וציפורניים שבירות: הרבה פעמים זו לא "בעיה קוסמטית" אלא חוסר בחלבון, ברזל או שומנים טובים.',
              'חשקים כבדים לסוכר: לא חולשה. בדרך כלל זה חוסר חלבון בארוחות, עייפות, שינה לא טובה או גרעון גדול מדי.'
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Ch1SectionTitle icon="plate">5. איך לבנות ארוחה בפועל</Ch1SectionTitle>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 24 }}>
          אחרי כל התיאוריה, הנה הכלי הכי פשוט: "הצלחת של אליס". צלחת רגילה, מחולקת בראש לארבעה חלקים. זה עובד הרבה יותר טוב מרשימות ומספרים שרוב הנשים לא מחזיקות לאורך זמן.
        </p>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '22px 24px', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>ארוחה טובה צריכה לענות על 4 שאלות</div>
          <div className="card-grid-2">
            {[
              'איפה החלבון שלי? אם אין מקור ברור לחלבון, זו כנראה לא ארוחה שבאמת תשביע אותך.',
              'איפה הפחמימה שתיתן לי אנרגיה? לא חייב הרבה, אבל כן צריך מקור ברור.',
              'איפה הירקות? לא בשביל "להיות ילדה טובה", אלא בשביל סיבים, ויטמינים, שובע ונפח.',
              'איפה השומן הטוב? מעט טחינה, שמן זית, אבוקדו או אגוזים יכולים להפוך ארוחה למרגיעה ומשביעה.'
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <PlateVisual />
      </Reveal>

      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {PLATE_PARTS.map((part, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="card nutrition-icon-card" style={{ padding: '20px 22px' }}>
              <div className="nutrition-inline-head">
                <div className="nutrition-mini-icon"><NutritionIcon type={['protein','carbs','leaf','fat'][i] || 'plate'} /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{part.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{part.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal><h3 style={{ ...sH3ch1, marginTop: 44 }}>דוגמאות מעשיות לארוחות</h3></Reveal>
      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {REAL_MEALS.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card nutrition-icon-card" style={{ padding: '20px 22px' }}>
              <div className="nutrition-inline-head">
                <div className="nutrition-mini-icon"><NutritionIcon type="meal" /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{item.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal><h3 style={{ ...sH3ch1, marginTop: 44 }}>ארוחות ישראליות פופולריות - איך לאכול אותן נכון</h3></Reveal>
      <div className="card-grid-2" style={{ marginBottom: 24 }}>
        {ISRAELI_MEALS.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card nutrition-icon-card" style={{ padding: '20px 22px' }}>
              <div className="nutrition-inline-head">
                <div className="nutrition-mini-icon"><NutritionIcon type="meal" /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{item.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal><h3 style={{ ...sH3ch1, marginTop: 44 }}>מתי לאכול?</h3></Reveal>
      <div className="card-grid-3" style={{ marginBottom: 24 }}>
        {EATING_STYLES.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card nutrition-icon-card" style={{ padding: '20px 22px' }}>
              <div className="nutrition-inline-head">
                <div className="nutrition-mini-icon"><NutritionIcon type="timing" /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{item.title}</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 26 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>צום לסירוגין - מה זה באמת ומתי זה מתאים</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            צום לסירוגין הוא לא דיאטה, אלא דרך לארגן את חלון הזמן שבו את אוכלת. במקום לאכול מהבוקר עד הלילה, מגדירים שעות אכילה ושעות בלי אוכל. המודלים הנפוצים הם 16:8, 14:10, 18:6 או 5:2 - אבל הרעיון הבסיסי הוא אותו רעיון: לאכול בתוך חלון זמן מוגדר.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            מה שחשוב להבין הוא שצום לסירוגין לא פוטר אותך מלהבין קלוריות, חלבון ואיכות אוכל. הוא לא קסם, והוא לא בהכרח עדיף על כל מבנה אכילה אחר אם סך הקלוריות, איכות התזונה וההרכב נשארים דומים. הרבה פעמים הוא פשוט כלי נוח יותר: פחות החלטות ביום, פחות נשנוש לילי, ויותר סדר.
          </p>
          <div className="card-grid-2" style={{ marginBottom: 14 }}>
            <div className="card" style={{ padding: '16px 18px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>מתי זה יכול להתאים</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>
                אם את לא רעבה בבוקר, אוהבת ארוחות גדולות יותר, מרגישה שזה עוזר לך עם סדר ועם פחות נשנוש בערב, ולא נכנסת לחרדה סביב השעון - זה יכול להיות כלי טוב ופשוט.
              </p>
            </div>
            <div className="card" style={{ padding: '16px 18px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>מתי זה פחות מתאים</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>
                בהריון, בהנקה, עם היסטוריה של הפרעות אכילה, במחזור לא סדיר, כשיש אימוני בוקר רציניים, או אם עצם הצום מוסיף לך סטרס - זה כנראה לא הכיוון הנכון עכשיו.
              </p>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אצל נשים יש כאן ניואנס חשוב. הרבה מהמחקרים נעשו על גברים, ונשים לפעמים מגיבות אחרת בגלל הרגישות ההורמונלית. אם את רואה סימנים כמו מחזור שמתקצר או נעלם, עייפות כרונית, נשירת שיער, חשקים לא נשלטים או יותר חרדה סביב אוכל - זה סימן לעצור ולא להכריח את הגוף.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            אם את רוצה לנסות, לא קופצים ישר ל-16 שעות. מתחילים מ-12:12, אחר כך 13:11, ורק אז מתקדמים אם זה באמת מרגיש טוב. המטרה היא לא לסבול אלא למצוא מבנה אכילה שמשרת אותך.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            שורה תחתונה: צום לסירוגין הוא כלי לארגון, לא מטרה בפני עצמה. אם את רעבה בבוקר ומרגישה טוב עם 3 ארוחות מסודרות - אין שום סיבה להכריח את עצמך. ואם את דווקא מרגישה שהוא עושה לך סדר ונעים בגוף - אפשר בהחלט לעבוד איתו.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 26 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>הטעות הכי נפוצה של נשים צעירות</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            לא אוכלות ארוחת בוקר, אוכלות צהריים קטנה מדי, מנשנשות כל היום, ואז מגיעות לערב רעבות ומתפרקות. הן מרגישות שהן "לא אוכלות הרבה", אבל בפועל אין מבנה, אין מספיק חלבון, ואין שובע אמיתי.
          </p>
          <ul style={{ margin: '0 0 12px', paddingRight: 20, color: 'var(--color-fg2)' }}>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>רק קפה בבוקר במקום אוכל.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>סלט קטן במשרד בלי חלבון אמיתי.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>נשנושים אקראיים כל היום בלי ארוחה מסודרת.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>ארוחת ערב עצומה כי כל היום הגוף לא קיבל מספיק.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>אכילה אוטומטית גם אחרי הערב, מול מסך או מתוך עייפות.</li>
          </ul>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            הפתרון פשוט יותר ממה שנדמה: ארוחת בוקר בתוך שעה מהיקיצה, צהריים נורמלית, נשנוש עם חלבון אם צריך, ארוחת ערב רגילה ולא עצומה, ופחות אכילה אוטומטית אחרי הערב. נשים שעושות רק את השינוי הזה מרגישות הבדל גדול תוך שבועיים.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 48 }}>
          <strong>80/20 זה המתכון לחיים.</strong> 80 אחוז מהזמן לפי העקרונות, 20 אחוז מקום לחיים עצמם: שישי, שבת, עוגה של אמא, פיצה עם חברים. מה שלא עובד זה 100 אחוז של שלמות או 50/50 של כאוס.
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך לקרוא תווית מזון בלי ליפול במלכודות שיווק</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            תעשיית המזון יודעת בדיוק על מה את מסתכלת בסופר, ובונה את האריזות בהתאם. "0% שומן", "ללא סוכר", "טבעוני", "אורגני", "עשיר בחלבון" - כל אלה לא תמיד אומרים מה שנדמה לך. הדרך היחידה לדעת מה את באמת קונה היא להפוך את האריזה ולקרוא את התווית האמיתית.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              {
                title: '1. גודל המנה',
                body: 'זו המלכודת הכי נפוצה. לפעמים כתוב "100 קלוריות למנה", אבל המנה היא 25 גרם בלבד והאריזה כולה הרבה יותר גדולה. תמיד לבדוק קודם כמה נחשב מנה, ואז להשוות למה שאת באמת אוכלת בפועל.',
              },
              {
                title: '2. רשימת הרכיבים',
                body: 'הרכיבים מסודרים לפי כמות - מהכי הרבה להכי מעט. אם סוכר מופיע במקום הראשון, השני או השלישי, את קונה מוצר שהבסיס שלו הוא סוכר. אם הרשימה ארוכה ומלאה במילים שלא היית מזהה במטבח, זה בדרך כלל סימן למזון מאוד מעובד.',
              },
              {
                title: '3. חלבון',
                body: 'זה המאקרו שאת בדרך כלל רוצה לראות במספרים יפים יותר. בנשנוש טוב לרוב תרצי לפחות 8-10 גרם חלבון למנה. ביוגורט חלבון באמת טוב, בדרך כלל 10-12 גרם ל-100 גרם.',
              },
              {
                title: '4. סיבים תזונתיים',
                body: 'ככל שיש יותר, בדרך כלל יותר טוב. סיבים נותנים שובע, מאזנים ספיגת סוכר ומזינים את חיידקי המעי. בלחם טוב תחפשי לפחות 6 גרם ל-100 גרם, ובדגנים או קרקרים לפחות 4-5 גרם.',
              },
              {
                title: '5. סוכר',
                body: 'כפית סוכר היא 4 גרם. אם מוצר "בריא" מכיל 16-20 גרם סוכר במנה, זה כבר כמה כפיות טובות. ארגון הבריאות העולמי ממליץ ברוב המקרים לא לעבור בערך 25 גרם סוכר חופשי ביום, כלומר בערך 6 כפיות. גם חשוב לזכור שסוכר מתחבא תחת שמות כמו פרוקטוז, דקסטרוז, מלטוז, סירופ אורז או מיץ פירות מרוכז.',
              },
              {
                title: '6. שומן',
                body: 'לא צריך לפחד אוטומטית משומן. הרבה פעמים "0% שומן" אומר שהוסיפו יותר סוכר, ממתיקים או חומרי טעם. כן כדאי לשים לב לשומן טראנס, שמנים מוקשים ומרגרינה - שם הבעיה האמיתית.',
              },
              {
                title: '7. נתרן',
                body: 'חשוב במיוחד אם יש לך נטייה לאגירת נוזלים, לחץ דם או PMS. מוצרים מעובדים מגיעים בקלות למאות רבות של מיליגרמים למנה, ולפעמים גם יותר מאלף.',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--color-fg1)' }}>{item.title}</div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="side-note" style={{ marginTop: 18 }}>
            <strong>מילות קסם שיווקיות שלא אומרות הרבה:</strong> "טבעי", "ללא סוכר", "דל קלוריות", "עשיר בחלבון", "אורגני". אלה מילים שיכולות להישמע טוב, אבל הן לא מחליפות תווית אמיתית. הכלל הפשוט: קודם הופכים את האריזה, ורק אחר כך מחליטים.
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: '18px 0 0' }}>
            זה אולי נשמע קטן, אבל זה אחד ההרגלים הכי משתלמים שאת יכולה לבנות. אחרי כמה שבועות של קריאת תוויות, את כבר יודעת כמעט אוטומטית מה להרים מהמדף ומה להשאיר עליו.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px', marginBottom: 46 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>מה לעשות כשזה נכשל</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            כמעט אף אחת לא משנה הרגלים של שנים בשבוע אחד. השבוע הראשון בדרך כלל מרגש, השני מתחיל להתנדנד, ובשלישי מגיעה עייפות, חוסר סבלנות או בינג׳ של שוקולד. זה לא אומר שנכשלת. זה אומר שאת בן אדם.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            במקום לנסות "להיות מושלמת מחדש", פשוט חוזרים לבסיס: ארוחה אחת מסודרת, עוד ארוחה אחת מסודרת, ואז עוד יום. ההתקדמות האמיתית נבנית מחזרה שקטה למסלול, לא מדרמות.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>מילה אחרונה ממני</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            את אולי מרגישה קצת מוצפת, וזה נורמלי. אני לא רוצה שתנסי ליישם הכול בבת אחת. אני רוצה שתבחרי דבר אחד מהפרק הזה, שינוי אחד קטן, ותיישמי אותו השבוע.
          </p>
          <ul style={{ margin: '0 0 14px', paddingRight: 20, color: 'var(--color-fg2)' }}>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>השבוע אני אוכלת ארוחת בוקר כל יום עם חלבון.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>השבוע אני מחשבת כמה חלבון אני באמת אוכלת.</li>
            <li style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.75 }}>השבוע אני מפסיקה לפחד משומן טוב.</li>
          </ul>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            שינוי אחד. שבוע אחד. ואז עוד אחד. אחרי חצי שנה, את יכולה להיות אישה אחרת. לא בגלל דיאטה, אלא בגלל שבנית, לאט, הבנה אמיתית של מה הגוף שלך צריך.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Chapter1 });
