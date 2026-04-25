// chapter4.jsx - אורח חיים - rewritten from user master copy

const LIFESTYLE_HABITS = [
  {
    icon: '☀️',
    title: 'חשיפה לאור שמש תוך 30 דקות מהיקיצה',
    teaser: 'ההרגל הכי פשוט והכי חזק לשעון הביולוגי שלך.',
    body: [
      'ברגע שאת קמה בבוקר, צריך לצאת החוצה למשך 10 עד 15 דקות. לא דרך חלון. ממש החוצה. גם ביום מעונן זה עובד, כי אור יום טבעי חזק משמעותית מאור מלאכותי בבית.',
      'למה זה חשוב? כי הגוף שלך עובד לפי שעון ביולוגי פנימי, והוא מכוונן בעיקר על ידי אור. כשאת חושפת את העיניים שלך לאור יום בבוקר, את שולחת לגוף מסר ברור: עכשיו בוקר. זה גורם לקורטיזול לעלות בצורה טבעית, וזה גם עוזר לקבוע מתי המלטונין יתחיל להיות מופרש בלילה.',
      'במילים אחרות: החשיפה לאור שמש בבוקר היום, קובעת כמה טוב את תישני הלילה. אם את לא עושה את זה, הגוף שלך לא באמת יודע מתי התחיל היום.',
      'איך ליישם בפועל: מרפסת עם קפה, הליכה קצרה עם הכלב, סיבוב קטן ליד העבודה, או ירידה ברגל לכמה דקות במקום ישר לשבת מול מסך.',
    ],
  },
  {
    icon: '💧',
    title: 'שתי כוסות מים על קיבה ריקה לפני הקפה',
    teaser: 'הגוף שלך מתעורר מיובש, והקפה הוא לא הפתרון הראשון.',
    body: [
      'אחרי 7-8 שעות שינה הגוף שלך כבר איבד נוזלים דרך הנשימה, הכליות ותהליכי ניקוי. הרבה נשים מתעוררות במצב של יובש תפקודי, ואז רצות ישר לקפה.',
      'הקפה עצמו יכול להגביר את תחושת היובש, במיוחד אם הוא הדבר הראשון שנכנס לגוף. הפתרון הוא פשוט: שתי כוסות מים מיד כשאת קמה, לפני כל דבר אחר.',
      'מה זה עושה לגוף? מעיר את מערכת העיכול, מפעיל את רפלקס ההתרוקנות של הבוקר, מעלה אנרגיה בצורה טבעית ומכין את הגוף לארוחת הבוקר ולקפה.',
      'טיפ מעשי: להכין בקבוק מים ליד המיטה בערב, כך שהשתייה תהיה אוטומטית ברגע שאת קמה.',
    ],
  },
  {
    icon: '🚶',
    title: 'עשר דקות הליכה אחרי כל ארוחה גדולה',
    teaser: 'אחד הכלים הכי חזקים לעיכול, סוכר בדם ונפיחות.',
    body: [
      'הליכה של 10-15 דקות אחרי ארוחה יכולה להוריד משמעותית את העלייה בסוכר בדם לעומת ישיבה מיידית אחרי האוכל. זה אומר שהגוף משתמש יותר טוב באנרגיה של הארוחה.',
      'מעבר לזה, הליכה קלה אחרי אוכל משפרת עיכול, מפחיתה נפיחות, עוזרת להניע את המעי, ומונעת את הקריסה של אחרי הצהריים.',
      'זה לא אימון. לא צריך ללכת מהר. להפך. המטרה היא תנועה רגועה וקלה, לא דופק גבוה.',
      'איך ליישם: סיבוב קצר אחרי הצהריים במשרד, הליכה קטנה אחרי ארוחת ערב, או אפילו תזוזה בבית במקום לשבת ישר על הספה.',
    ],
  },
  {
    icon: '☕',
    title: 'ללא קפאין אחרי 14:00',
    teaser: 'גם אם את נרדמת, זה לא אומר שאת ישנה טוב.',
    body: [
      'חצי החיים של הקפאין הוא בערך 5-7 שעות. זה אומר שקפה בשעה 15:00 עדיין פעיל בגוף בערב, ולפעמים אפילו באמצע הלילה.',
      'הרבה נשים אומרות: "אני ישנה מצוין גם אם שתיתי קפה אחר הצהריים". אבל המחקרים מראים שגם אם את מצליחה להירדם, איכות השינה נפגעת. יש פחות שינה עמוקה, פחות התאוששות, ויותר עייפות בבוקר.',
      'התוצאה היא מעגל קלאסי: ישנת פחות טוב, את עייפה יותר, צריכה עוד קפה, שותה אותו מאוחר, ושוב ישנה פחות טוב.',
      'הפתרון: קפה אחרון עד 14:00, ואצל חלק מהנשים עדיף אפילו מוקדם יותר. אם קשה, לרדת בהדרגה שעה אחר שעה במהלך שבועות.',
    ],
  },
  {
    icon: '📵',
    title: 'טלפון מחוץ לחדר שינה',
    teaser: 'השינוי הכי קשה, והכי משנה חיים.',
    body: [
      'החדר שלך צריך להיות אזור שקט. בלי מסכים, בלי עבודה, בלי פיד, בלי הודעות. כשהטלפון בחדר, הוא יוצר שני נזקים: הוא גונב את זמן ההירדמות, והוא נכנס גם ליקיצות הלילה ולבוקר.',
      'לפני השינה את רק "בודקת משהו קטן", וזה הופך לעשרים דקות או שעה. בלילה, אם התעוררת, את מסתכלת בשעון או בהודעות. בבוקר, עוד לפני שהגוף התעורר, את כבר מגיבה לעולם.',
      'הפתרון: שעון מעורר פשוט, והטלפון מחוץ לחדר החל משעה קבועה בערב. אם חייבים אותו זמין, לפחות במצב טיסה ובמרחק מהראש.',
      'בשבוע הראשון זה מרגיש מוזר. אחר כך מרגישים כמה שקט זה מכניס גם לשינה וגם לקימה.',
    ],
  },
];

const SLEEP_EFFECTS = [
  'הורמון הרעב גרלין עולה, ולכן את מרגישה רעבה יותר.',
  'הורמון השובע לפטין יורד, ולכן קשה יותר להרגיש שבעה.',
  'החשק לסוכר עולה בצורה משמעותית.',
  'הקורטיזול נשאר גבוה יותר ומקשה על הגוף להירגע.',
  'הרגישות לאינסולין נפגעת.',
  'הורמון הגדילה נפגע, וזה פוגע בבניית שריר ובהתאוששות.',
  'הורמוני מין משתבשים, והמחזור עלול להפוך לפחות יציב.',
  'המיקרוביום נפגע, ולכן גם העיכול והנפיחות מושפעים.',
  'החסינות מוחלשת, והעור נראה עייף יותר.',
];

const SLEEP_RULES = [
  {
    title: 'שעת שינה קבועה, גם בסופי שבוע',
    desc: 'הגוף שלך אוהב קצב. אם את חיה בפערים גדולים בין חול לשבת, את יוצרת לעצמך ג׳ט לג פנימי.',
  },
  {
    title: 'חדר שינה קריר, 18-20 מעלות',
    desc: 'הגוף צריך להתקרר כדי להירדם ולהישאר בשינה עמוקה.',
  },
  {
    title: 'חדר חשוך לגמרי',
    desc: 'גם אורות קטנים פוגעים במלטונין. וילונות אטומים או מסכת עיניים עושים הבדל גדול.',
  },
  {
    title: 'חדר שקט',
    desc: 'גם אם רעש לא מעיר אותך לגמרי, הוא פוגע בעומק השינה.',
  },
  {
    title: 'בלי מסכים שעה לפני השינה',
    desc: 'האור הכחול מעכב מלטונין ומעורר את המוח.',
  },
  {
    title: 'בלי אוכל כבד שעתיים לפני השינה',
    desc: 'שינה עם עיכול כבד היא שינה פחות עמוקה ופחות משקמת.',
  },
  {
    title: 'בלי קפאין אחרי 14:00',
    desc: 'גם אם את לא מרגישה אותו, הוא משפיע על עומק השינה.',
  },
  {
    title: 'בלי אלכוהול לפחות 4 שעות לפני השינה',
    desc: 'אלכוהול אולי מרדים, אבל פוגע מאוד באיכות השינה.',
  },
  {
    title: 'טקס הרגעה חצי שעה לפני השינה',
    desc: 'מקלחת, תה, ספר, יומן. הגוף לומד לזהות ש"היום נגמר".',
  },
  {
    title: 'לא להסתכל על השעון בלילה',
    desc: 'זה רק מעלה חרדה ומקשה על ההירדמות מחדש.',
  },
  {
    title: 'אור שמש בבוקר',
    desc: 'כן, שוב. זה אחד המפתחות החזקים ביותר לשינה טובה.',
  },
  {
    title: 'אם לא נרדמת תוך 20 דקות - לקום',
    desc: 'כך המיטה נשארת מקושרת לשינה, לא לחרדה.',
  },
];

const STRESS_CYCLE = [
  {
    num: '01',
    title: 'סטרס מתחיל',
    desc: 'המוח מזהה איום, והמערכת הסימפטטית מופעלת.',
  },
  {
    num: '02',
    title: 'קורטיזול עולה',
    desc: 'הגוף מעלה סוכר בדם, מעכב עיכול ומכין אותך ל"הילחם או ברח".',
  },
  {
    num: '03',
    title: 'הסוכר בדם עולה',
    desc: 'אבל אין ריצה, אין לחימה, ואין שימוש פיזי באנרגיה הזאת.',
  },
  {
    num: '04',
    title: 'אינסולין עולה',
    desc: 'הגוף מנסה לפנות את הסוכר מהדם מהר.',
  },
  {
    num: '05',
    title: 'אגירת שומן, בעיקר בבטן',
    desc: 'עודף אינסולין וקורטיזול מעודדים אגירה באזור הוויסצרלי.',
  },
  {
    num: '06',
    title: 'הרעב והחשק לסוכר חוזרים',
    desc: 'כי הסוכר נפל מהר, והגוף מחפש שוב אנרגיה מיידית.',
  },
  {
    num: '07',
    title: 'דלקת כרונית',
    desc: 'השומן הבטני הופך לרקמה פעילה שמפרישה חומרים דלקתיים.',
  },
  {
    num: '08',
    title: 'שיבוש הורמונלי',
    desc: 'המחזור, השינה, מצב הרוח והעיכול מתחילים לשלם את המחיר.',
  },
  {
    num: '09',
    title: 'המעגל מתחיל מחדש',
    desc: 'הסטרס החדש שנוצר מהסימפטומים עצמם חוזר לשלב הראשון.',
  },
];

const STRESS_TOOLS = [
  {
    title: 'נשימת 4-7-8',
    teaser: 'הדרך הכי מהירה לאפס את מערכת העצבים תוך כמה דקות.',
    body: [
      'שאיפה דרך האף ל-4 שניות, החזקת אוויר ל-7 שניות, ונשיפה ארוכה ל-8 שניות. החלק הקריטי הוא הנשיפה הארוכה, שמפעילה את עצב הוואגוס ומאותת לגוף שהוא בטוח.',
      'אפשר לעשות את זה בבוקר, לפני ארוחות, לפני שיחה מלחיצה, לפני אימון, לפני שינה, או בכל רגע שאת מרגישה עלייה בלחץ.',
      'איך תדעי שזה עובד? הכתפיים יורדות, הלסת משתחררת, והנשימה הופכת עמוקה יותר גם בלי שתתאמצי.',
    ],
  },
  {
    title: 'הליכה בלי טלפון',
    teaser: '20 דקות של שקט יומי למוח שלך.',
    body: [
      'הליכה בחוץ בלי טלפון, בלי פודקאסט, ובלי שום קלט חיצוני. רק את, הצעדים והמחשבות שלך.',
      'זה נשמע קטן, אבל זו אחת הדרכים הכי טובות לאפשר למוח לעבד את היום במקום רק להגיב אליו.',
      'בהתחלה זה מרגיש משעמם. אחר כך זה הופך להיות אחד הדברים הכי מרגיעים ביום.',
    ],
  },
  {
    title: 'לא לעשות כלום',
    teaser: 'כן, פשוט לשבת. בלי מסך, בלי מטלה, בלי "לנצל את הזמן".',
    body: [
      'זה קשה בדיוק בגלל שאנחנו לא רגילות לזה. המוח שלנו מפחד מריק, ולכן מיד מחפש משהו "יעיל" לעשות.',
      'אבל דווקא ב-5, 10 או 20 דקות של אי-עשייה, מערכת העצבים שלך מקבלת סוף סוף הזדמנות לרדת ממצב חירום למצב מנוחה.',
      'להתחיל מ-5 דקות ביום. לאט לאט זה נהיה נסבל, ואז אפילו ממכר בצורה טובה.',
    ],
  },
  {
    title: 'יומן הערכה',
    teaser: 'שלושה דברים טובים לפני שינה. קטן, פשוט, ועובד.',
    body: [
      'כתיבה של שלושה דברים שאת מודה עליהם מכוונת מחדש את המוח להבחין במה שכן היה טוב ביום, במקום ללעוס שוב ושוב רק את מה שלא הסתדר.',
      'זה לא חייב להיות משהו גדול. להפך. דווקא הדברים הקטנים הופכים את הכלי הזה לחזק מאוד.',
      'מחברת ועט ליד המיטה, שלוש דקות לפני השינה, וזהו.',
    ],
  },
  {
    title: 'חיבוק של 20 שניות',
    teaser: 'אוקסיטוצין הוא לא מותרות. הוא ביולוגיה.',
    body: [
      'חיבוק אמיתי, לא "היי־ביי", משחרר אוקסיטוצין - הורמון שמרגיע, מוריד לחץ דם, ומאזן את הקורטיזול.',
      'עם בן זוג, ילד, הורה, חברה קרובה, כלב או חתול. הגוף מגיב לזה.',
      'בבוקר, כשחוזרים הביתה, או לפני שינה - כל זמן טוב.',
    ],
  },
  {
    title: 'שמש וטבע',
    teaser: 'שלושים דקות ביום של חוץ, אור וטבע מורידות עומס עצבי.',
    body: [
      'חשיפה לשמש ולטבע מורידה קורטיזול ומעלה סרוטונין. זה לא "פינוק". זה טיפול עצבי בסיסי.',
      'אם אין לך גישה לטבע ממש, גם מרפסת, גג, גינה, או הליכה ברחוב שקט עוזרים.',
    ],
  },
  {
    title: 'להגיד "לא"',
    teaser: 'אחד הכלים הכי חשובים לנשים, והכי קשה ליישום.',
    body: [
      'כל פעם שאת אומרת "כן" כשאת רוצה לומר "לא", את מוסיפה לעצמך שכבת לחץ. עם הזמן, זה נהיה עומס כרוני.',
      'להתחיל מדברים קטנים: "לא תודה", "זה לא מתאים לי עכשיו", "אני אחזור אלייך".',
      '"לא" הוא משפט שלם. לא צריך תמיד להסביר.',
    ],
  },
  {
    title: 'יוגה או פילאטיס רגוע',
    teaser: 'לא הכול צריך להיות חזק, מהיר ומזיע.',
    body: [
      'יוגה מרגיעה או פילאטיס לא "מבזבזים זמן". הם עובדים על מערכת העצבים, הנשימה, היציבה והשקט הפנימי.',
      'כשאת בלחץ כרוני, זה לעיתים קרובות הרבה יותר מועיל מעוד אימון אגרסיבי.',
    ],
  },
  {
    title: 'לא לאמן את עצמך יתר על המידה',
    teaser: 'עוד HIIT לא תמיד יפתור לחץ. לפעמים הוא רק יגביר אותו.',
    body: [
      'הרבה נשים בלחץ מנסות "לאמן את עצמן החוצה מהלחץ". אבל אימון עצים מאוד הוא בעצמו סטרס פיזיולוגי.',
      'אם את כבר מותשת, לא ישנה, נפוחה ועצבנית - אימוני כוח מתונים, הליכה ויוגה יתנו לך הרבה יותר מאשר עוד אימון HIIT.',
    ],
  },
  {
    title: 'לטפל במקור של הלחץ',
    teaser: 'הטכניקות עוזרות לגוף להתמודד, אבל לפעמים צריך גם לשנות את המציאות.',
    body: [
      'אם הלחץ מגיע מעבודה, ממערכת יחסים, מכסף, מהורות או מבריאות - צריך לפחות לזהות את המקור שלו בשם ולא להישאר רק ב"אני לחוצה".',
      'אחרי שמזהים, שואלים: מה היה נראה אחרת אם הכול היה אפשרי? ואז בוחרים צעד אחד קטן בכיוון הזה.',
      'ולפעמים, עזרה מקצועית היא בדיוק הצעד החכם. לא חולשה.',
    ],
  },
];

const HYDRATION_RULES = [
  {
    title: 'כמה מים באמת צריך?',
    desc: 'הכלל הבסיסי הוא בערך 30 מ"ל לכל קילוגרם משקל גוף. לרוב הנשים בישראל, זה יוצא בערך 2-3 ליטר ביום, יותר אם יש אימונים, קיץ, הנקה או הרבה קפה.',
  },
  {
    title: 'מתי לשתות',
    desc: 'בוקר לפני קפה, חצי שעה לפני ארוחות, לגימות לאורך היום, ואחרי אימון. לא לחכות לצמא - זה כבר שלב מאוחר יחסית.',
  },
  {
    title: 'הטעות הכי נפוצה',
    desc: 'לשתות רק כשצמאים. עד אז, הגוף כבר עובד ביובש יחסי. עדיף לשתות לפי שגרה, לא לפי נזק.',
  },
  {
    title: 'מתי לחשוב על אלקטרוליטים',
    desc: 'אם את מזיעה הרבה, סובלת מהתכווצויות, כאב ראש או סחרחורת, ייתכן שמים לבד לא מספיקים. לפעמים צריך גם מלח, אשלגן או תוסף אלקטרוליטים.',
  },
];

const SUPPLEMENTS = [
  {
    title: 'מגנזיום גליצינט, 300-400 מ"ג לפני השינה',
    desc: 'משפר שינה, מרגיע את מערכת העצבים, עוזר לעצירות ותומך בהתאוששות. גליצינט היא אחת הצורות הנסבלות והיעילות יותר.',
  },
  {
    title: 'ויטמין D3, 2,000-4,000 IU עם ארוחה',
    desc: 'חשוב לחסינות, להורמונים, לבריאות העצם ולמצב הרוח. עדיף עם שומן ועם K2 אם יש התאמה.',
  },
  {
    title: 'אומגה 3, 2-3 גרם EPA+DHA ביום',
    desc: 'אנטי-דלקתי חזק, תומך במוח, בעור, במצב הרוח ובהורמונים.',
  },
  {
    title: 'ויטמין B קומפלקס, בבוקר',
    desc: 'תומך בייצור אנרגיה ובמערכת העצבים, במיוחד בתקופות לחץ או אצל נשים עם חסרים.',
  },
  {
    title: 'אשוואגנדה, 600 מ"ג בערב',
    desc: 'אדפטוגן שמתאים בעיקר לתקופות של לחץ כרוני, שינה פחות טובה או קורטיזול גבוה.',
  },
  {
    title: 'רודיולה, 200 מ"ג בבוקר',
    desc: 'אדפטוגן יותר מעורר, מתאים לתקופות עומס שבהן צריך חדות וערנות, לא בערב.',
  },
  {
    title: 'ויטמין C, 1,000 מ"ג ביום',
    desc: 'נוגד חמצון ותמיכה טובה בבלוטות האדרנל ובמצבי לחץ.',
  },
];

const FIRST_WEEK = [
  {
    title: 'ימים 1-3: התחלה עדינה',
    items: [
      'אור שמש 10 דקות בבוקר.',
      'שתי כוסות מים לפני הקפה.',
      'נשימת 4-7-8 למשך 3 דקות.',
      'הליכה אחרי ארוחת צהריים.',
      'בלי קפאין אחרי 14:00.',
      '2-3 ליטר מים ביום.',
      'טלפון בסלון ב-21:30.',
      'יומן הערכה לפני שינה.',
    ],
  },
  {
    title: 'ימים 4-7: הוספה',
    items: [
      'להמשיך את כל מה שהתחלת.',
      '20 דקות הליכה בחוץ בלי טלפון פעם ביום.',
      'לפחות חיבוק אחד של 20 שניות ביום.',
      'מגנזיום גליצינט 300 מ"ג לפני השינה.',
    ],
  },
];

const sH3ch4 = { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };

function LifeIcon({ type = 'life' }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  switch (type) {
    case 'life':
      return <svg {...common}><path d="M12 3v18"/><path d="M5 12h14"/><path d="M7.5 7.5 16.5 16.5"/><path d="M16.5 7.5 7.5 16.5"/></svg>;
    case 'habits':
      return <svg {...common}><path d="M12 4a4 4 0 0 1 4 4c0 1.1-.3 2-.8 2.8-.6 1-1.4 1.7-1.8 3.2h-2.8c-.4-1.5-1.2-2.2-1.8-3.2A5 5 0 0 1 8 8a4 4 0 0 1 4-4Z"/><path d="M10 18h4"/><path d="M10.5 21h3"/></svg>;
    case 'sleep':
      return <svg {...common}><path d="M17 15a6 6 0 1 1-5-10 5 5 0 0 0 5 10Z"/><path d="M7 5h.01"/><path d="M5 8h.01"/></svg>;
    case 'stress':
      return <svg {...common}><path d="M12 21c4.5 0 8-3.2 8-8 0-4.3-3.2-8-8-8S4 8.7 4 13c0 4.8 3.5 8 8 8Z"/><path d="M9 10h6"/><path d="M9 14h4"/><path d="m15 5 1.5-2"/><path d="m9 5-1.5-2"/></svg>;
    case 'water':
      return <svg {...common}><path d="M12 3c3 4 5 6.8 5 10a5 5 0 0 1-10 0c0-3.2 2-6 5-10Z"/></svg>;
    case 'supplements':
      return <svg {...common}><path d="M9 5h6"/><path d="M12 3v4"/><rect x="6" y="7" width="12" height="14" rx="3"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>;
    case 'week':
      return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M4 10h16"/><path d="M8 14h3"/><path d="M8 17h6"/></svg>;
    case 'summary':
      return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="m9.5 12 1.7 1.7 3.8-4.2"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 8v4"/><circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none"/></svg>;
  }
}

function Ch4SectionTitle({ icon, children, style }) {
  return (
    <Reveal>
      <div className="life-section-title" style={style}>
        <div className="life-section-icon"><LifeIcon type={icon} /></div>
        <h3 style={{ ...sH3ch4, margin: 0 }}>{children}</h3>
      </div>
    </Reveal>
  );
}

function LifeHero() {
  return (
    <div className="life-hero card">
      <div className="life-hero-copy">
        <div className="nutrition-kicker">40% מהתוצאות מתחילות כאן</div>
        <h4>שינה, סטרס, מים והרגלים קטנים משנים הכול.</h4>
        <p>אורח חיים טוב לא נראה דרמטי כמו דיאטה או אימון, אבל הוא מה שמאפשר לשאר הדברים באמת לעבוד. בלי זה, הגוף רק שורד. עם זה, הוא מתחיל לשגשג.</p>
        <div className="life-chip-row">
          <span className="life-chip">Sleep</span>
          <span className="life-chip">Stress</span>
          <span className="life-chip">Hydration</span>
          <span className="life-chip">Recovery</span>
        </div>
      </div>
      <div className="life-hero-art" aria-hidden="true">
        <div className="life-orbit life-orbit-a" />
        <div className="life-orbit life-orbit-b" />
        <div className="life-core"><LifeIcon type="life" /></div>
        <div className="life-float life-float-1">שינה</div>
        <div className="life-float life-float-2">רוגע</div>
        <div className="life-float life-float-3">מים</div>
        <div className="life-float life-float-4">קצב</div>
      </div>
    </div>
  );
}

function SleepFlow() {
  return (
    <div className="life-flow card">
      <div className="life-flow-step"><div className="life-flow-icon">🌙</div><div className="life-flow-label">שינה</div></div>
      <div className="life-flow-arrow">→</div>
      <div className="life-flow-step"><div className="life-flow-icon">🧠</div><div className="life-flow-label">הורמונים</div></div>
      <div className="life-flow-arrow">→</div>
      <div className="life-flow-step"><div className="life-flow-icon">💪</div><div className="life-flow-label">התאוששות</div></div>
      <div className="life-flow-arrow">→</div>
      <div className="life-flow-step"><div className="life-flow-icon">✨</div><div className="life-flow-label">תוצאות</div></div>
    </div>
  );
}

function Chapter4() {
  return (
    <section id="chapter-4" className="guide-section" style={{ background: 'var(--color-surface-elevated)' }}>
      <ChapterHeader
        label="פרק 5"
        title="אורח חיים - 40% מהתוצאות מגיעות מכאן"
        desc="הפרק שאמור להזכיר לך משהו חשוב: תזונה ואימון הם לא כל הסיפור. בלי שינה, מים, קצב עצבי נכון והרגלים בסיסיים, הגוף שלך פשוט לא נותן את מה שהוא מסוגל לתת."
      />

      <Reveal>
        <LifeHero />
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px 24px 20px', marginBottom: 40, marginTop: 18 }}>
          <p style={{ fontSize: 16, color: 'var(--color-fg2)', lineHeight: 1.9, marginBottom: 14 }}>
            את יכולה לאכול בצורה מושלמת. תפריט מדויק, חלבון, ירקות, אפס סוכר מעובד. את יכולה להתאמן ארבע פעמים בשבוע, להרים משקלים ולעשות הכול "נכון". ואם את ישנה שש שעות בלילה, נמצאת בלחץ כל הזמן, ושותה כוס וחצי מים ביום, את לא תראי את התוצאות שהגוף שלך מסוגל לתת.
          </p>
          <p style={{ fontSize: 16, color: 'var(--color-fg2)', lineHeight: 1.9, marginBottom: 14 }}>
            רוב הנשים חושבות שהפתרון הוא לעבוד יותר קשה. עוד אימון, עוד הורדה בקלוריות, עוד מאמץ. והאמת היא שלפעמים הפתרון הוא בדיוק להפך: לישון יותר, לשתות יותר, להוריד עומס, ולתת לגוף תנאים בסיסיים לתפקד כמו שהוא תוכנן לתפקד.
          </p>
          <p style={{ fontSize: 16, color: 'var(--color-fg2)', lineHeight: 1.9, marginBottom: 0 }}>
            זה הפרק הזה. ארבעה תחומים שאם תטפלי בהם, כל מה שאת עושה בתזונה ובאימון יעבוד טוב יותר. ואם תתעלמי מהם, הרבה מהמאמץ שלך פשוט יילך לאיבוד.
          </p>
        </div>
      </Reveal>

      <PullQuote text="לפעמים הפתרון הוא לא לעבוד יותר קשה, אלא לתת לגוף שלך תנאים בסיסיים יותר טובים." />

      <Ch4SectionTitle icon="habits">1. חמשת ההרגלים הקטנים שמשנים הכל</Ch4SectionTitle>
      <Reveal delay={0.1}>
        <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 24 }}>
          אם תיישמי רק את חמשת ההרגלים האלה, את יכולה לראות שינוי מורגש בתוך שבועיים. אלה לא שינויים גדולים, וכל אחד מהם לוקח מעט זמן, אבל יחד הם בסיס עצום לכל השאר.
        </p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {LIFESTYLE_HABITS.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <AccordionCard
              icon={item.icon}
              title={item.title}
              teaser={item.teaser}
              color={i % 2 === 0 ? '#E85D75' : '#BBB2EE'}
            >
              {item.body.map((paragraph, idx) => (
                <p key={idx} style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: idx === item.body.length - 1 ? 0 : '0 0 12px' }}>
                  {paragraph}
                </p>
              ))}
            </AccordionCard>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="sleep">2. שינה: הבסיס של כל דבר בריא בגוף שלך</Ch4SectionTitle>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>למה שינה היא לא מותרות</div>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            בזמן השינה הגוף מייצר הורמון גדילה, משקם שריר, מאזן הורמונים, מחזק חסינות, מנקה את המוח, ומשקם את המיקרוביום. את לא "מבזבזת זמן" כשאת ישנה. את מאפשרת לגוף לעשות את כל מה שהוא לא יכול לעשות כמו שצריך בזמן ערות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            פחות משבע שעות שינה באופן קבוע זה לא עניין של "אני מסתדרת". זה עניין ביולוגי שמצטבר ומשפיע על תיאבון, הורמונים, התאוששות, מצב רוח, עור, עיכול ויכולת לרדת בשומן.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SleepFlow />
      </Reveal>

      <div className="card-grid-2" style={{ marginBottom: 26 }}>
        {SLEEP_EFFECTS.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card life-card" style={{ padding: '18px 20px' }}>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 24 }}>
          <strong>כמה באמת צריך?</strong> ברוב המקרים 7-9 שעות. אם את מתאמנת קשה, בתקופת עומס, עם ילדים קטנים, בפרה-מנופאוזה, או בגרעון קלורי - הסיכוי שאת צריכה יותר, לא פחות.
        </div>
      </Reveal>

      <Ch4SectionTitle icon="sleep" style={{ marginTop: 48 }}>12 הכללים של שינה טובה</Ch4SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 48 }}>
        {SLEEP_RULES.map((rule, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card life-card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'var(--color-accent)', opacity: 0.22, lineHeight: 1, minWidth: 28 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{rule.title}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7, margin: 0 }}>{rule.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="stress">3. סטרס וקורטיזול: איך שוברים את המעגל</Ch4SectionTitle>
      <Reveal delay={0.1}>
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 12 }}>
            הגוף שלך תוכנן להתמודד עם סטרס קצר וממוקד. הדב. הסכנה. הריצה. אבל הסטרס שלך היום הוא עבודה, כסף, ילדים, זוגיות, אחריות, מסכים, גירוי תמידי. הגוף שלך לא באמת יודע להבדיל. הוא מגיב כאילו זו סכנה פיזית, שוב ושוב.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            לכן, אם את בלחץ כרוני, את לא רק "עייפה". את חיה בתוך מעגל ביולוגי של קורטיזול, סוכר, אינסולין, רעב, שומן בטני, דלקת ושיבוש הורמונלי.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
        {STRESS_CYCLE.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="card life-card" style={{ padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--guide-rose-light)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                {item.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="stress" style={{ marginTop: 48 }}>10 הטכניקות הכי יעילות לניהול סטרס</Ch4SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {STRESS_TOOLS.map((item, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <AccordionCard
              icon="🧘"
              title={item.title}
              teaser={item.teaser}
              color={i % 2 === 0 ? '#BBB2EE' : '#E85D75'}
            >
              {item.body.map((paragraph, idx) => (
                <p key={idx} style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, margin: idx === item.body.length - 1 ? 0 : '0 0 12px' }}>
                  {paragraph}
                </p>
              ))}
            </AccordionCard>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="water">4. הידרציה: הטעויות שכולנו עושות</Ch4SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 48 }}>
        {HYDRATION_RULES.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card life-card" style={{ padding: '22px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="supplements">5. תוספי תזונה לתמיכה באיזון קורטיזול ושינה</Ch4SectionTitle>
      <Reveal delay={0.1}>
        <div className="side-note" style={{ marginBottom: 24 }}>
          תוספים אינם תחליף לאורח חיים. הם עזרה. קודם כל בונים בסיס של שינה, מים, אור, תנועה והפחתת עומס. רק אז התוספים באמת יודעים "לשבת" על משהו יציב.
        </div>
      </Reveal>

      <div className="card-grid-2" style={{ marginBottom: 48 }}>
        {SUPPLEMENTS.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card life-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Ch4SectionTitle icon="week">6. סיכום: התוכנית של השבוע הראשון</Ch4SectionTitle>
      <div className="card-grid-2" style={{ marginBottom: 28 }}>
        {FIRST_WEEK.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="card life-card" style={{ padding: '22px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <ul style={{ margin: 0, paddingRight: 20, color: 'var(--color-fg2)' }}>
                {item.items.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: 9, fontSize: 14, lineHeight: 1.75 }}>{point}</li>
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
            הפרק הזה הוא אחד החשובים במדריך, והוא גם אחד הקשים ליישום כי הוא לא "דיאטה שמתחילים ביום שני". זה אורח חיים. הוא נבנה לאט, והוא מבקש ממך סבלנות ולא מושלמות.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 0 }}>
            אם תעשי את השינויים האלה, את תרגישי שונה. לא בגלל קסם, אלא בגלל שאת נותנת לגוף שלך סוף סוף את התנאים שהוא צריך: מספיק שינה, מים, אור, תנועה, רוגע ואהבה.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Chapter4 });
