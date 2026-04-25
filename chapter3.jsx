// chapter3.jsx - בניית אימון - FULL REAL CONTENT
const TRAINING_PROMISES = [
  'להבין איך לחשוב על אימון, לא רק איך להעתיק תרגילים.',
  'לדעת למה הסדר של התרגילים משנה, ולא לזרוק תנועות באקראי.',
  'לבנות אימון רגליים ואימון גב שמקדמים מראה נשי, חזק ומאוזן.',
];

const HYPERTROPHY_MECHANISMS = [
  {
    title: 'מתח מכני',
    tag: 'הבסיס לבניית שריר',
    color: '#E85D75',
    desc: 'כשהשריר עובד מול התנגדות מאתגרת ובאמת צריך להפיק כוח, הוא מקבל את האות העיקרי לגדילה. לכן תרגילים מורכבים עם עומס טוב וקרבה לכישלון חשובים כל כך.',
  },
  {
    title: 'עבודה במצב מתוח',
    tag: 'טווח ארוך של השריר',
    color: '#FF9500',
    desc: 'בתרגילים שבהם השריר נטען כשהוא ארוך, כמו סקווט עמוק או דדליפט רומני, נוצר גירוי חזק מאוד להיפרטרופיה. זה אחד העקרונות הכי חשובים במבנה של אימון טוב.',
  },
  {
    title: 'סטרס מטבולי',
    tag: 'הפאמפ והבערה',
    color: '#BBB2EE',
    desc: 'החזרות הגבוהות יותר, המנוחות הקצרות והכיווץ הממושך מוסיפים נפח עבודה, תחושת בערה ופאמפ. הם לא מחליפים עומס טוב, אלא משלימים אותו.',
  },
];

const PROGRESSION_METHODS = [
  { title: 'להוסיף משקל', desc: 'הדרך הכי ברורה. גם תוספת קטנה היא התקדמות.', icon: '＋' },
  { title: 'להוסיף חזרה', desc: 'אם המשקל נשאר זהה אבל הצלחת עוד חזרה או שתיים, גם זו העמסה.', icon: '↗' },
  { title: 'להוסיף סט', desc: 'כשצריך עוד נפח עבודה, אפשר להוסיף סט בצורה מדודה.', icon: '▣' },
  { title: 'לשפר טכניקה', desc: 'יותר עומק, שליטה טובה יותר, פחות תנופה. גם זו התקדמות אמיתית.', icon: '◎' },
  { title: 'להאט אקצנטרי', desc: 'ירידה איטית יותר מאריכה את זמן המתח ומעלה את הקושי.', icon: '◔' },
  { title: 'לנהל מנוחה נכון', desc: 'בתרגילי בידוד אפשר לקצר מעט מנוחה כדי להעלות את האתגר.', icon: '⏱' },
];

const REP_RANGES = [
  { range: '5-8', title: 'כבד ומורכב', use: 'סקווט, דדליפט, חתירה, Lat Pulldown', note: 'מעולה לכוח ולבנייה עם עומס גבוה.' },
  { range: '8-12', title: 'לב האימון', use: 'רוב התרגילים המשניים והעיקריים', note: 'שילוב מצוין של עומס, שליטה ונפח.' },
  { range: '12-20', title: 'בידוד וגימור', use: 'Abduction, Kickback, Face Pull, Leg Curl', note: 'מצוין לפאמפ, לשליטה ולשרירים קטנים יותר.' },
];

const GLUTE_MUSCLES = [
  {
    title: 'Gluteus Maximus',
    heb: 'גלוטאוס מקסימוס',
    accent: '#E85D75',
    region: 'glute-max',
    view: 'back',
    role: 'הנפח, העגלגלות והמסה של הישבן',
    trains: 'סקווט עמוק, דדליפט רומני, Hip Thrust, לאנג׳ים',
    visual: 'ככל שהוא חזק ומפותח יותר, הישבן נראה מלא ומודגש יותר מאחור.',
  },
  {
    title: 'Gluteus Medius',
    heb: 'גלוטאוס מדיוס',
    accent: '#BBB2EE',
    region: 'glute-med',
    view: 'back',
    role: 'הצד העליון של הישבן ויציבות האגן',
    trains: 'Hip Abduction, Cable Side Kickback, Bulgarian Split Squat, Step-Up',
    visual: 'הוא עוזר ליצור את ה"מדף" ואת ההפרדה בין הישבן לירך.',
  },
  {
    title: 'Hamstrings',
    heb: 'ירך אחורית',
    accent: '#FF9500',
    region: 'hamstrings',
    view: 'back',
    role: 'המעבר החלק בין הישבן לרגל והכוח של תנועות היפ-הינג',
    trains: 'Romanian Deadlift, Leg Curl, Single-Leg RDL',
    visual: 'בלעדיהם הישבן יכול להיראות מנותק מהרגל. איתם המראה שלם יותר.',
  },
];

const LEG_SUPPORT_MUSCLES = [
  { name: 'Quadriceps', heb: 'ירך קדמית', accent: '#5AC8FA', region: 'quads', view: 'front', desc: 'חשובים לתנועות סקווט, ליציבות ולמראה אתלטי מאוזן. לא צריך להגזים, אבל גם לא להזניח.' },
  { name: 'Adductors', heb: 'מקרבים', accent: '#34C759', region: 'adductors', view: 'front', desc: 'מוסיפים כוח ויציבות לסקווטים, לאנג׳ים ותנועות רחבות.' },
  { name: 'Calves', heb: 'שוקיים', accent: '#AF8CFF', region: 'calves', view: 'back', desc: 'פחות קריטיים לרוב הנשים מבחינת מראה, אבל כן תורמים לאתלטיות ולשלמות של הרגל.' },
];

const LEG_PATTERNS = [
  {
    title: 'תנועת סקווט',
    color: '#E85D75',
    examples: 'Back Squat, Front Squat, Goblet Squat, Leg Press',
    why: 'בונה בסיס של כוח, קוואדס וישבן, ומתאימה מאוד לפתוח איתה אימון.',
  },
  {
    title: 'תנועת Hip Hinge',
    color: '#FF9500',
    examples: 'Romanian Deadlift, Deadlift, Good Morning, Pull-Through',
    why: 'הדרך המרכזית להעמיס על ירך אחורית ועל הישבן במצב מתוח - וזה אחד המפתחות הכי חזקים לבניית ישבן.',
  },
  {
    title: 'Hip Thrust / Bridge',
    color: '#FF7A59',
    examples: 'Hip Thrust, Barbell Glute Bridge, Single-Leg Hip Thrust',
    why: 'זה אחד התרגילים הכי חשובים לישבן, כי הוא נותן עומס ישיר מאוד על הגלוטאוס מקסימוס דווקא בקיצור ובכיווץ. הוא לא מחליף היפ-הינג, אלא משלים אותו.',
  },
  {
    title: 'תרגיל חד-צדדי',
    color: '#BBB2EE',
    examples: 'Bulgarian Split Squat, Reverse Lunge, Step-Up, Single-Leg RDL',
    why: 'משפר יציבות, מאזן בין צדדים, ונותן הרבה עבודה לגלוטאוס מדיוס.',
  },
  {
    title: 'הרחקה ובידוד',
    color: '#34C759',
    examples: 'Hip Abduction, Cable Kickback, Side Steps, Clamshells',
    why: 'מוסיף את העבודה הייעודית לישבן הצידי ולכיווץ בסוף האימון.',
  },
];

const LEG_BUILDER_TEMPLATE = [
  ['A1', 'תנועת סקווט או תרגיל פתיחה כבד', '3-5 סטים', '5-8 חזרות', 'לבחור תרגיל אחד מוביל'],
  ['A2', 'Hip Hinge או Hip Thrust', '3-4 סטים', '6-10 חזרות', 'לבחור תרגיל אחד משלים לישבן/ירך אחורית'],
  ['B1', 'תרגיל חד-צדדי', '3 סטים', '8-12 לכל רגל', 'ליציבות, איזון והרבה עבודת ישבן'],
  ['C1', 'בידוד / הרחקה / גימור', '3 סטים', '12-20 חזרות', 'לישבן צידי, תחושה וכיווץ'],
  ['C2', 'גימור אופציונלי', '2-3 סטים', '12-20 חזרות', 'רק אם יש כוח, זמן והתאוששות'],
];

const LEG_EXERCISE_BANK = [
  {
    title: 'תנועת סקווט',
    options: 'Back Squat, Front Squat, Goblet Squat, Hack Squat, Leg Press',
    tip: 'בחרי תרגיל אחד שאת יכולה להתקדם בו לאורך זמן.'
  },
  {
    title: 'Hip Hinge',
    options: 'Romanian Deadlift, Deadlift, Good Morning, Pull-Through',
    tip: 'אם המטרה היא ישבן וירך אחורית, זה אחד העוגנים של האימון.'
  },
  {
    title: 'Hip Thrust / Bridge',
    options: 'Hip Thrust, Barbell Glute Bridge, Single-Leg Hip Thrust, Smith Hip Thrust',
    tip: 'אם את רוצה ישבן מודגש יותר, זה מקום מרכזי מאוד בתוכנית.'
  },
  {
    title: 'חד-צדדי',
    options: 'Bulgarian Split Squat, Reverse Lunge, Step-Up, Walking Lunge, Single-Leg RDL',
    tip: 'בחרי תרגיל אחד או שניים, לא את כולם.'
  },
  {
    title: 'הרחקה / בידוד',
    options: 'Hip Abduction, Cable Kickback, Side Steps, Clamshells, Frog Pumps',
    tip: 'אלה תרגילים של תחושה, שליטה וכיווץ - לא של אגו.'
  },
  {
    title: 'ירך אחורית / גימור',
    options: 'Seated Leg Curl, Lying Leg Curl, Hyperextension, Glute Ham Raise',
    tip: 'כאן אפשר להשלים עבודה שחסרה לירך האחורית.'
  },
];

const LEG_BUILD_SLOTS = [
  {
    key: 'leg-main-squat',
    step: 'A1',
    title: 'פתיחה - תנועת סקווט',
    hint: 'בחרי תרגיל פתיחה אחד שאת רוצה להתקדם בו לאורך זמן.',
    options: ['Back Squat', 'Front Squat', 'Goblet Squat', 'Hack Squat', 'Leg Press'],
  },
  {
    key: 'leg-main-hinge',
    step: 'A2',
    title: 'תרגיל כבד שני - Hip Hinge או Hip Thrust',
    hint: 'פה מגיע העומס המרכזי לישבן ולירך האחורית.',
    options: ['Romanian Deadlift', 'Deadlift', 'Good Morning', 'Pull-Through', 'Hip Thrust', 'Barbell Glute Bridge', 'Smith Hip Thrust'],
  },
  {
    key: 'leg-single',
    step: 'B1',
    title: 'תרגיל חד-צדדי',
    hint: 'לבחור תרגיל אחד ליציבות, איזון ועבודה עמוקה יותר על הישבן.',
    options: ['Bulgarian Split Squat', 'Reverse Lunge', 'Step-Up', 'Walking Lunge', 'Single-Leg RDL'],
  },
  {
    key: 'leg-isolation',
    step: 'C1',
    title: 'בידוד / הרחקה',
    hint: 'כאן בוחרים תרגיל שמוסיף כיווץ ותחושה לישבן.',
    options: ['Hip Abduction', 'Cable Kickback', 'Side Steps', 'Clamshells', 'Frog Pumps'],
  },
  {
    key: 'leg-finisher',
    step: 'C2',
    title: 'גימור אופציונלי',
    hint: 'לא חובה. רק אם יש זמן, התאוששות ותחושה שחסר משהו.',
    options: ['Seated Leg Curl', 'Lying Leg Curl', 'Hyperextension', 'Glute Ham Raise', 'Cable Pull-Through'],
  },
];

const LEG_WORKOUTS = [
  {
    key: 'A',
    title: 'אימון רגליים A',
    subtitle: 'דגש ישבן וקוואדס',
    note: 'נבנה סביב סקווט ונותן בסיס חזק של כוח + נפח.',
    exercises: [
      { name: 'Back Squat', sets: '4', reps: '6-8', rest: '2-3 דק׳', muscle: 'קוואדס + ישבן', technique: 'לרדת לעומק טוב בלי לאבד שליטה או קו גב יציב.', tips: 'העלי משקל רק כשכל הסטים מרגישים נקיים.', mistakes: 'לקצר עומק בשביל עוד עומס.' },
      { name: 'Romanian Deadlift', sets: '4', reps: '8-10', rest: '2 דק׳', muscle: 'ירך אחורית + ישבן', technique: 'אגן אחורה, מוט צמוד לגוף, מתיחה אמיתית בירך האחורית.', tips: 'חשבי על דחיפה של האגן אחורה, לא על כפיפה מהגב.', mistakes: 'לעגל גב או להפוך את התנועה לסקווט.' },
      { name: 'Bulgarian Split Squat', sets: '3', reps: '10-12 לכל רגל', rest: '90 שנ׳', muscle: 'ישבן + יציבות', technique: 'צעד מספיק ארוך, ירידה עמוקה, שליטה מלאה.', tips: 'אפשר להטות מעט את הגו קדימה אם המטרה היא יותר ישבן.', mistakes: 'צעד קצר מדי שיוצר עומס מיותר על הברך.' },
      { name: 'Leg Press / Goblet Squat', sets: '3', reps: '10-12', rest: '90 שנ׳', muscle: 'קוואדס + ישבן', technique: 'שליטה בירידה, לא לנעול ברכיים למעלה.', tips: 'קצב נקי עדיף על עוד פלטה.', mistakes: 'לעבוד בטווח קצר מדי.' },
      { name: 'Hip Abduction', sets: '3', reps: '15-20', rest: '60 שנ׳', muscle: 'ישבן צידי', technique: 'כיווץ מודגש בקצה התנועה.', tips: 'להאט את החזרה פנימה.', mistakes: 'לזרוק את הרגליים בלי שליטה.' },
      { name: 'Cable Kickback', sets: '3', reps: '12-15 לכל רגל', rest: '60 שנ׳', muscle: 'ישבן', technique: 'תנועה קטנה יחסית, בלי תנופה מהגב.', tips: 'להחזיק רגע בכיווץ.', mistakes: 'להרים את הרגל גבוה מדי ולפצות עם גב תחתון.' },
    ],
  },
  {
    key: 'B',
    title: 'אימון רגליים B',
    subtitle: 'דגש ישבן וירך אחורית',
    note: 'מתאים לימים שבהם את רוצה יותר עבודה במצב מתוח ופחות ברך-דומיננטי.',
    exercises: [
      { name: 'Romanian Deadlift', sets: '4', reps: '6-8', rest: '2-3 דק׳', muscle: 'ירך אחורית + ישבן', technique: 'עומס כבד יחסית, שליטה חזקה בטווח.', tips: 'אם האחיזה מגבילה אותך, רצועות יכולות לעזור.', mistakes: 'לרדוף אחרי עומק על חשבון גב יציב.' },
      { name: 'Barbell Hip Thrust', sets: '4', reps: '8-10', rest: '2 דק׳', muscle: 'ישבן', technique: 'נעילה מלאה של האגן וכיווץ למעלה.', tips: 'סנטר מעט פנימה כדי לא לקשת גב.', mistakes: 'לרוץ עם החזרות בלי שליטה.' },
      { name: 'Single-Leg RDL', sets: '3', reps: '8-10 לכל רגל', rest: '90 שנ׳', muscle: 'ירך אחורית + יציבות', technique: 'אגן מאוזן, טווח תנועה איכותי, לא מרדף אחרי משקל.', tips: 'החזיקי יד חופשית על קיר אם צריך.', mistakes: 'לסובב את האגן הצידה.' },
      { name: 'Seated Leg Curl', sets: '3', reps: '10-12', rest: '75-90 שנ׳', muscle: 'ירך אחורית', technique: 'כיווץ מלא וקצב איטי בחזרה.', tips: 'לא לעבוד בפיצוצים.', mistakes: 'לשחרר את המשקל בבת אחת.' },
      { name: 'Cable Pull-Through', sets: '3', reps: '12-15', rest: '60 שנ׳', muscle: 'ישבן + ירך אחורית', technique: 'מתיחה עמוקה בירידה, דחיפת אגן קדימה בעלייה.', tips: 'שמרי על צוואר ניטרלי.', mistakes: 'להפוך את התרגיל לסקווט.' },
      { name: 'Banded Side Steps', sets: '3', reps: '15-20', rest: '45-60 שנ׳', muscle: 'ישבן צידי', technique: 'צעדים קטנים, מתח קבוע בגומייה.', tips: 'מעולה גם כחימום.', mistakes: 'לשחרר מתח בין צעד לצעד.' },
    ],
  },
  {
    key: 'C',
    title: 'אימון רגליים C',
    subtitle: 'גרסה היברידית למי שמתאמנת פעם בשבוע',
    note: 'אם יש לך רק יום רגליים אחד, זה המבנה שיכסה את רוב מה שצריך.',
    exercises: [
      { name: 'Back Squat', sets: '3', reps: '6-8', rest: '2-3 דק׳', muscle: 'קוואדס + ישבן', technique: 'תרגיל ראשון, כשהגוף רענן.', tips: 'שמרי 1-2 חזרות ברזרבה בסטים הראשונים.', mistakes: 'לשרוף את כל האנרגיה בסט הראשון.' },
      { name: 'Romanian Deadlift', sets: '3', reps: '8-10', rest: '2 דק׳', muscle: 'ירך אחורית + ישבן', technique: 'המשיכי לקו שליטה, לא לקו כאב.', tips: 'עבודה יפה בטווח מתוח.', mistakes: 'ברכיים נעולות לגמרי.' },
      { name: 'Walking Lunges', sets: '3', reps: '10 לכל רגל', rest: '90 שנ׳', muscle: 'ישבן + קוואדס', technique: 'צעד ארוך ויציב.', tips: 'מתאמן גם על קואורדינציה.', mistakes: 'צעדים קצרים ומהירים מדי.' },
      { name: 'Hip Thrust', sets: '3', reps: '10-12', rest: '90 שנ׳', muscle: 'ישבן', technique: 'שליטה מלאה בחלק העליון.', tips: 'אפשר לעצור שנייה למעלה.', mistakes: 'להקפיץ משקל.' },
      { name: 'Seated Leg Curl', sets: '3', reps: '12', rest: '75 שנ׳', muscle: 'ירך אחורית', technique: 'לסיים בשליטה ולא בחיפזון.', tips: 'מתאים לסוף האימון.', mistakes: 'טווח חצי.' },
      { name: 'Hip Abduction / Kickback', sets: '3', reps: '15-20', rest: '45-60 שנ׳', muscle: 'ישבן צידי + גימור', technique: 'פוקוס על תחושה וכיווץ.', tips: 'זה מקום טוב לפאמפ.', mistakes: 'לבחור עומס כבד מדי ולהפסיד שליטה.' },
    ],
  },
];

const BACK_MUSCLES = [
  {
    title: 'Latissimus Dorsi',
    heb: 'לטים',
    accent: '#BBB2EE',
    role: 'יוצרים גב רחב יותר ומבליטים את קו המותן',
    trains: 'Pull-Up, Lat Pulldown, Straight-Arm Pulldown',
  },
  {
    title: 'Mid Back',
    heb: 'גב אמצעי',
    accent: '#E85D75',
    role: 'נותן לגב עומק, יציבה ומראה חזק יותר מאחור',
    trains: 'Seated Row, Chest-Supported Row, Barbell Row',
  },
  {
    title: 'Rear Delts',
    heb: 'כתפיים אחוריות',
    accent: '#34C759',
    role: 'פותחות את קו הכתפיים ומשפרות את המראה של החלק העליון',
    trains: 'Face Pull, Reverse Fly, Rear Delt Machine',
  },
  {
    title: 'Erector Spinae',
    heb: 'זקפי הגב',
    accent: '#FF9500',
    role: 'שומרים על גב יציב, זקוף וחזק בתרגילי משיכה והיפ-הינג',
    trains: 'Deadlift, RDL, Hyperextension',
  },
];

const HOURGLASS_RULES = [
  { title: 'יותר משיכות מלמעלה', desc: 'אם המטרה שלך היא גב רחב יותר ומראה של מותן צרה יותר, רוב נפח האימון צריך להגיע מתרגילים כמו Pulldown, Pull-Up ומשיכות דומות מלמעלה.' },
  { title: 'עובי - אבל במינון נכון', desc: 'כן צריך גם חתירות, אבל לא להפוך את כל אימון הגב לאימון אופקי. לרוב השילוב הטוב הוא יותר עבודה לרוחב, וקצת פחות לעובי.' },
  { title: 'פחות עומס מיותר לטרפז העליון', desc: 'לא חייבים לבנות את כל החלק העליון סביב Shrugs ותרגילים שמעמיסים בעיקר על האזור שבין הצוואר לכתף.' },
  { title: 'למשוך עם המרפקים, לא עם כפות הידיים', desc: 'בתרגילי גב הידיים רק מחזיקות את הידית. המטרה היא לחשוב על המרפקים שנעים, כדי שהגב באמת יעבוד ולא רק האמות והביצפס.' },
];

const BACK_WORKOUT = [
  { name: 'Lat Pulldown', sets: '4', reps: '8-10', rest: '2 דק׳', muscle: 'לטים', technique: 'להוביל עם המרפקים כלפי מטה, לפתוח חזה ולשלוט בחזרה.', tips: 'רצועות יכולות לעזור אם האחיזה נשרפת קודם.', mistakes: 'למשוך עם הידיים בלבד.' },
  { name: 'Chest-Supported Row', sets: '4', reps: '8-10', rest: '2 דק׳', muscle: 'גב אמצעי', technique: 'כיווץ שכמות בלי תנופה מהגב.', tips: 'תרגיל מצוין לשמור בו על טכניקה נקייה.', mistakes: 'להרים את החזה מהספסל.' },
  { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '10-12 לכל צד', rest: '90 שנ׳', muscle: 'לטים + גב אמצעי', technique: 'מתיחה אמיתית למטה, מרפק קרוב לגוף בעלייה.', tips: 'מעולה גם לאיזון בין צדדים.', mistakes: 'לסובב את הגו.' },
  { name: 'Seated Cable Row', sets: '3', reps: '10-12', rest: '90 שנ׳', muscle: 'גב אמצעי', technique: 'התחילי מהשכמות ורק אז כופפי מרפקים.', tips: 'קצב רגוע ומכוון.', mistakes: 'לנדנד את הגב אחורה.' },
  { name: 'Straight-Arm Pulldown', sets: '3', reps: '12-15', rest: '60 שנ׳', muscle: 'לטים', technique: 'זרועות כמעט ישרות, תנועה ארוכה ונקייה.', tips: 'מעולה כשלא רוצים עוד עומס על הביצפס.', mistakes: 'לכופף מרפקים ולהפוך את זה לפולדאון רגיל.' },
  { name: 'Face Pull', sets: '3', reps: '15', rest: '60 שנ׳', muscle: 'כתפיים אחוריות + יציבה', technique: 'מרפקים גבוהים ומשיכה אל קו הפנים.', tips: 'להרגיש פתיחה בחלק העליון של הגב.', mistakes: 'משיכה נמוכה מדי.' },
];

const BACK_BUILDER_TEMPLATE = [
  ['A1', 'משיכה אנכית עיקרית', '3-4 סטים', '6-10 חזרות', 'זו הבסיס לרוחב של הגב'],
  ['A2', 'חתירה עיקרית', '3-4 סטים', '8-10 חזרות', 'לגב אמצעי ולעומק'],
  ['B1', 'משיכה חד-צדדית או זווית נוספת', '3 סטים', '10-12 חזרות', 'כדי לאזן צדדים ולחדד תחושה'],
  ['B2', 'בידוד ללטים או לכתפיים אחוריות', '3 סטים', '12-15 חזרות', 'ללטים, פתיחה ודיוק'],
  ['C1', 'יציבה / גימור', '2-3 סטים', '12-20 חזרות', 'Face Pull, Rear Delt או Hyperextension לפי צורך'],
];

const BACK_EXERCISE_BANK = [
  {
    title: 'משיכה אנכית',
    options: 'Pull-Up, Assisted Pull-Up, Lat Pulldown, Neutral-Grip Pulldown',
    tip: 'זה המאגר המרכזי לרוחב הגב.'
  },
  {
    title: 'חתירה אופקית',
    options: 'Seated Row, Chest-Supported Row, Barbell Row, Machine Row',
    tip: 'בחרי תרגיל אחד עיקרי ועוד אחד משלים אם צריך.'
  },
  {
    title: 'עבודה חד-צדדית',
    options: 'Single-Arm Dumbbell Row, One-Arm Cable Row, Meadows Row',
    tip: 'מעולה לחיבור טוב יותר לכל צד בנפרד.'
  },
  {
    title: 'בידוד ללטים',
    options: 'Straight-Arm Pulldown, Dumbbell Pullover, Single-Arm Lat Prayer',
    tip: 'כאן מרגישים את הלטים בלי שהביצפס יגנוב את העבודה.'
  },
  {
    title: 'כתפיים אחוריות / יציבה',
    options: 'Face Pull, Reverse Fly, Rear Delt Machine, Band Pull Apart',
    tip: 'תורם למראה פתוח ונקי יותר של הגב העליון.'
  },
  {
    title: 'זקפי גב',
    options: 'Hyperextension, Deadlift, RDL, Back Extension',
    tip: 'לא תמיד חייבים להוסיף אותם בנפרד אם כבר יש הרבה היפ-הינג בתוכנית.'
  },
];

const BACK_BUILD_SLOTS = [
  {
    key: 'back-vertical',
    step: 'A1',
    title: 'פתיחה - משיכה אנכית',
    hint: 'זה הבסיס לרוחב של הגב ולמראה של מותן צרה יותר.',
    options: ['Pull-Up', 'Assisted Pull-Up', 'Lat Pulldown', 'Neutral-Grip Pulldown'],
  },
  {
    key: 'back-row',
    step: 'A2',
    title: 'חתירה עיקרית',
    hint: 'כאן בונים עומק, יציבה ועובי לגב האמצעי.',
    options: ['Seated Row', 'Chest-Supported Row', 'Barbell Row', 'Machine Row'],
  },
  {
    key: 'back-single',
    step: 'B1',
    title: 'תרגיל חד-צדדי או זווית נוספת',
    hint: 'מעולה לאיזון בין צדדים ולחיבור טוב יותר לגב.',
    options: ['Single-Arm Dumbbell Row', 'One-Arm Cable Row', 'Meadows Row'],
  },
  {
    key: 'back-isolation',
    step: 'B2',
    title: 'בידוד ללטים או לכתפיים אחוריות',
    hint: 'לבחור תרגיל אחד שנותן דיוק והשלמה לחלק העליון.',
    options: ['Straight-Arm Pulldown', 'Dumbbell Pullover', 'Single-Arm Lat Prayer', 'Face Pull', 'Reverse Fly', 'Rear Delt Machine', 'Band Pull Apart'],
  },
  {
    key: 'back-finish',
    step: 'C1',
    title: 'גימור / יציבה',
    hint: 'שלב אחרון - רק מה שחסר לך באמת.',
    options: ['Face Pull', 'Reverse Fly', 'Rear Delt Machine', 'Hyperextension', 'Back Extension'],
  },
];

const WEEKLY_SPLITS = [
  {
    title: '4 אימונים בשבוע',
    accent: '#E85D75',
    days: ['ראשון: רגליים A', 'שני: גב + כתפיים', 'רביעי: רגליים B', 'חמישי: עליון משלים או גב משני'],
    note: 'החלוקה הכי פרקטית לרוב הנשים שרוצות להתקדם בלי להרגיש שהחיים סובבים רק סביב חדר כושר.',
  },
  {
    title: '5 אימונים בשבוע',
    accent: '#BBB2EE',
    days: ['ראשון: רגליים A', 'שני: גב', 'שלישי: מנוחה / ליבה / הליכה', 'רביעי: רגליים B', 'חמישי: חזה + כתפיים + ידיים', 'שישי: ישבן בידוד או גב משני'],
    note: 'מתאים למי שכבר בנתה בסיס טוב ויודעת להתאושש היטב.',
  },
  {
    title: '3 אימונים בשבוע',
    accent: '#34C759',
    days: ['ראשון: רגליים מלא', 'רביעי: עליון עם דגש גב', 'שישי: רגליים עם דגש ישבן'],
    note: 'פחות ימים לא אומר פחות תוצאות, אם האימונים עצמם בנויים נכון.',
  },
];

const SUCCESS_MARKERS = [
  'משקלים או חזרות עולים לאורך שבועות.',
  'אותו משקל מרגיש יציב ונקי יותר טכנית.',
  'הישבן, הגב העליון וקו הגוף נראים אחרת גם בלי שינוי חד במשקל הגוף.',
  'יש פחות תחושת בלבול ויותר בהירות לגבי מה לעשות בכל אימון.',
];

const RANDOM_VS_SMART = [
  {
    title: 'אימון אקראי',
    icon: '🎲',
    points: [
      'מתחלף כל שבוע בלי סיבה',
      'הרבה תרגילים, מעט כיוון',
      'אין רישום עומסים',
      'קשה לראות התקדמות אמיתית'
    ],
  },
  {
    title: 'אימון בנוי נכון',
    icon: '🧭',
    points: [
      'אותה תבנית למשך כמה שבועות',
      'סדר תרגילים עם מטרה ברורה',
      'רישום חזרות, משקל ו־RPE',
      'פרוגרס שקל למדוד'
    ],
  },
];

function TrainingIcon({ type = 'train' }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  switch (type) {
    case 'train':
      return <svg {...common}><path d="M6 20V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v12"/><path d="M9 20h6"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>;
    case 'growth':
      return <svg {...common}><path d="M5 17 10 12l3 3 6-7"/><path d="M14 8h5v5"/></svg>;
    case 'load':
      return <svg {...common}><path d="M4 10h3"/><path d="M17 10h3"/><path d="M7 7h3v6H7z"/><path d="M14 7h3v6h-3z"/><path d="M10 9h4v2h-4z"/></svg>;
    case 'glute':
      return <svg {...common}><path d="M9 5c1.5 2.5 1.5 5.5-.5 8 2 .2 3.5 1.6 3.5 3.5 0-1.9 1.5-3.3 3.5-3.5-2-2.5-2-5.5-.5-8"/><path d="M8 18c.8 1.2 2.2 2 4 2s3.2-.8 4-2"/></svg>;
    case 'back':
      return <svg {...common}><path d="M8 4c-1 2 0 4 1.5 5.5L12 12l2.5-2.5C16 8 17 6 16 4"/><path d="M8.5 10.5 7 20"/><path d="M15.5 10.5 17 20"/></svg>;
    case 'plan':
      return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M4 10h16"/><path d="M8 14h8"/><path d="M8 17h5"/></svg>;
    case 'summary':
      return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="m9.5 12 1.7 1.7 3.8-4.2"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 8v4"/><circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none"/></svg>;
  }
}

function Ch3SectionTitle({ icon, children, style }) {
  return (
    <Reveal>
      <div className="train-section-title" style={style}>
        <div className="train-section-icon"><TrainingIcon type={icon} /></div>
        <h3 style={{ ...sH3ch3, margin: 0 }}>{children}</h3>
      </div>
    </Reveal>
  );
}

function TrainingHero() {
  return (
    <div className="train-hero card">
      <div className="train-hero-copy">
        <div className="nutrition-kicker">אימון שנבנה נכון נראה אחרת</div>
        <h4>לא אוסף תרגילים. מערכת של מטרה, סדר ופרוגרס.</h4>
        <p>המטרה של הפרק הזה היא לקחת אותך מתוכנית אקראית לאימון שבאמת בונה גוף: ישבן, רגליים וגב עם כיוון ברור, עומס מתקדם והתאוששות חכמה.</p>
        <div className="train-chip-row">
          <span className="train-chip">Glutes</span>
          <span className="train-chip">Back</span>
          <span className="train-chip">RPE</span>
          <span className="train-chip">Progressive Overload</span>
        </div>
      </div>
      <div className="train-hero-art" aria-hidden="true">
        <div className="train-bars">
          <div className="train-bar train-bar-1" />
          <div className="train-bar train-bar-2" />
          <div className="train-bar train-bar-3" />
          <div className="train-bar train-bar-4" />
        </div>
        <div className="train-hero-core"><TrainingIcon type="train" /></div>
        <div className="train-float train-float-1">כוח</div>
        <div className="train-float train-float-2">טכניקה</div>
        <div className="train-float train-float-3">נפח</div>
        <div className="train-float train-float-4">פרוגרס</div>
      </div>
    </div>
  );
}

function GrowthFlow() {
  return (
    <div className="train-flow card">
      <div className="train-flow-step"><div className="train-flow-icon">🏋️</div><div className="train-flow-label">עומס</div></div>
      <div className="train-flow-arrow">→</div>
      <div className="train-flow-step"><div className="train-flow-icon">🧠</div><div className="train-flow-label">שליטה</div></div>
      <div className="train-flow-arrow">→</div>
      <div className="train-flow-step"><div className="train-flow-icon">📈</div><div className="train-flow-label">העמסה</div></div>
      <div className="train-flow-arrow">→</div>
      <div className="train-flow-step"><div className="train-flow-icon">🍑</div><div className="train-flow-label">תוצאה</div></div>
    </div>
  );
}

function MuscleMap({ nodes, centerIcon, centerLabel }) {
  return (
    <div className="muscle-map card">
      <div className="muscle-map-center">
        <div className="muscle-map-center-icon">{centerIcon}</div>
        <div className="muscle-map-center-label">{centerLabel}</div>
      </div>
      {nodes.map(function(node, i) {
        return (
          <div key={i} className={`muscle-map-node muscle-map-node-${i + 1}`}>
            <div className="muscle-map-node-dot" style={{ background: node.accent }} />
            <div className="muscle-map-node-title">{node.heb}</div>
            <div className="muscle-map-node-text">{node.role}</div>
          </div>
        );
      })}
    </div>
  );
}

function LowerBodyHighlight({ region, accent = '#E85D75', view = 'back' }) {
  const base = '#E9E3F4';
  const stroke = 'rgba(86, 72, 112, 0.22)';
  const highlight = { fill: accent, opacity: 0.92 };

  return (
    <div
      aria-hidden="true"
      style={{
        width: 116,
        minWidth: 116,
        height: 156,
        borderRadius: 22,
        background: 'linear-gradient(180deg, rgba(187,178,238,0.14), rgba(232,93,117,0.06))',
        border: '1px solid var(--color-border)',
        display: 'grid',
        placeItems: 'center',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
      }}
    >
      <svg width="88" height="132" viewBox="0 0 88 132" fill="none">
        <ellipse cx="44" cy="10" rx="11" ry="8" fill={base} stroke={stroke} />
        <path d="M31 22c2-4 7-7 13-7s11 3 13 7l4 16c1 5-2 10-7 12l-1 1v14c0 4 1 8 3 12l6 15c1 3 0 7-3 9-3 2-7 1-9-2L44 87l-6 12c-2 3-6 4-9 2-3-2-4-6-3-9l6-15c2-4 3-8 3-12V51l-1-1c-5-2-8-7-7-12l4-16Z" fill={base} stroke={stroke} />
        <path d="M35 63c-3 11-6 24-7 38-.2 4 2.7 7 6.2 7s6.3-2.9 6.8-6.3c1.1-8.6 2-16.6 3-24.7 1-8 2.1-16 3-24H35Z" fill={base} stroke={stroke} />
        <path d="M53 63c3 11 6 24 7 38 .2 4-2.7 7-6.2 7s-6.3-2.9-6.8-6.3c-1.1-8.6-2-16.6-3-24.7-1-8-2.1-16-3-24H53Z" fill={base} stroke={stroke} />

        {view === 'back' && (
          <>
            {region === 'glute-max' && (
              <>
                <path d="M30 42c2 8 7 12 14 13-1 4-4 7-8 8-6 1-12-3-13-9-1-5 2-10 7-12Z" {...highlight} />
                <path d="M58 42c-2 8-7 12-14 13 1 4 4 7 8 8 6 1 12-3 13-9 1-5-2-10-7-12Z" {...highlight} />
              </>
            )}
            {region === 'glute-med' && (
              <>
                <path d="M27 34c4 1 7 4 9 8-3 1-6 2-9 4-4 2-8 0-9-4-1-4 1-7 4-8 2 0 3 0 5 0Z" {...highlight} />
                <path d="M61 34c-4 1-7 4-9 8 3 1 6 2 9 4 4 2 8 0 9-4 1-4-1-7-4-8-2 0-3 0-5 0Z" {...highlight} />
              </>
            )}
            {region === 'hamstrings' && (
              <>
                <path d="M32 67c-3 10-5 20-5 31 0 5 3 8 7 8 3 0 6-2 6-6 0-11 1-22 2-33H32Z" {...highlight} />
                <path d="M56 67c3 10 5 20 5 31 0 5-3 8-7 8-3 0-6-2-6-6 0-11-1-22-2-33H56Z" {...highlight} />
              </>
            )}
            {region === 'calves' && (
              <>
                <path d="M30 97c-4 6-5 12-4 18 1 4 4 6 7 6 4 0 7-3 7-7 0-7-1-12-3-19l-7 2Z" {...highlight} />
                <path d="M58 97c4 6 5 12 4 18-1 4-4 6-7 6-4 0-7-3-7-7 0-7 1-12 3-19l7 2Z" {...highlight} />
              </>
            )}
          </>
        )}

        {view === 'front' && (
          <>
            {region === 'quads' && (
              <>
                <path d="M33 63c-4 8-6 18-6 31 0 5 3 9 8 9 4 0 7-3 7-7V63H33Z" {...highlight} />
                <path d="M55 63c4 8 6 18 6 31 0 5-3 9-8 9-4 0-7-3-7-7V63H55Z" {...highlight} />
              </>
            )}
            {region === 'adductors' && (
              <>
                <path d="M40 66c-3 6-4 13-4 22 0 6 2 9 5 9 2 0 4-2 4-5V66h-5Z" {...highlight} />
                <path d="M48 66c3 6 4 13 4 22 0 6-2 9-5 9-2 0-4-2-4-5V66h5Z" {...highlight} />
              </>
            )}
          </>
        )}
      </svg>
    </div>
  );
}

function CompareTraining() {
  return (
    <div className="compare-table" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
      {RANDOM_VS_SMART.map(function(col, i) {
        return (
          <div key={i} className="compare-col">
            <div className="compare-col-header">
              <div className="compare-col-icon">{col.icon}</div>
              <div className="compare-col-title">{col.title}</div>
            </div>
            {col.points.map(function(point, j) {
              return (
                <div key={j} className="compare-item">
                  <span className="compare-bullet">{i === 0 ? '–' : '+'}</span>
                  <span>{point}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function WeeklyTrack() {
  return (
    <div className="weekly-track card">
      {WEEKLY_SPLITS.map(function(split, i) {
        return (
          <div key={i} className="weekly-track-col">
            <div className="weekly-track-head" style={{ color: split.accent }}>{split.title}</div>
            <div className="weekly-track-days">
              {split.days.map(function(day, j) {
                return <div key={j} className="weekly-track-day">{day}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InfoCard({ title, subtitle, accent, children }) {
  return (
    <div className="card" style={{ padding: '22px 22px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: 999, background: accent || 'var(--color-accent)' }} />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{title}</div>
      </div>
      {subtitle && <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 10 }}>{subtitle}</div>}
      <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function SectionIntro({ children }) {
  return (
    <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.85, marginBottom: 24 }}>
      {children}
    </p>
  );
}

function WorkoutBuilder({ title, subtitle, slots }) {
  const [selected, setSelected] = useState(
    slots.reduce(function(acc, slot) {
      acc[slot.key] = '';
      return acc;
    }, {})
  );

  function choose(slotKey, option) {
    setSelected(function(prev) {
      return { ...prev, [slotKey]: prev[slotKey] === option ? '' : option };
    });
  }

  function clearAll() {
    setSelected(
      slots.reduce(function(acc, slot) {
        acc[slot.key] = '';
        return acc;
      }, {})
    );
  }

  return (
    <div className="card" style={{ padding: '24px', marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{title}</div>
          {subtitle && <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>{subtitle}</p>}
        </div>
        <button className="calc-btn" onClick={clearAll} style={{ minWidth: 110, padding: '10px 14px' }}>איפוס בחירה</button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {slots.map(function(slot) {
          return (
            <div
              key={slot.key}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 20,
                padding: '18px 18px 16px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.82), rgba(246,241,251,0.78))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  minWidth: 42,
                  height: 32,
                  borderRadius: 999,
                  background: 'rgba(232,93,117,0.12)',
                  color: 'var(--color-accent)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: 13
                }}>{slot.step}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{slot.title}</div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7, margin: '0 0 12px' }}>{slot.hint}</p>
              <div style={{
                borderRadius: 16,
                border: '1px dashed rgba(86,72,112,0.18)',
                padding: '12px 14px',
                marginBottom: 12,
                background: selected[slot.key] ? 'rgba(232,93,117,0.08)' : 'rgba(255,255,255,0.72)'
              }}>
                <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 4 }}>התרגיל שבחרת</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: selected[slot.key] ? 'var(--color-fg1)' : 'var(--color-fg3)' }}>
                  {selected[slot.key] || 'עדיין לא נבחר תרגיל'}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {slot.options.map(function(option) {
                  const active = selected[slot.key] === option;
                  return (
                    <button
                      key={option}
                      onClick={function() { choose(slot.key, option); }}
                      style={{
                        borderRadius: 999,
                        border: active ? '1px solid rgba(232,93,117,0.4)' : '1px solid var(--color-border)',
                        background: active ? 'linear-gradient(180deg, rgba(232,93,117,0.16), rgba(232,93,117,0.08))' : 'rgba(255,255,255,0.9)',
                        color: 'var(--color-fg1)',
                        padding: '10px 14px',
                        fontSize: 13,
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkoutBlock({ plan }) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{plan.title}</div>
        <div style={{ fontSize: 13, color: 'var(--color-accent)', fontWeight: 700, marginBottom: 6 }}>{plan.subtitle}</div>
        <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{plan.note}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 80px 32px', gap: 8, padding: '8px 20px', fontSize: 11, fontWeight: 700, color: 'var(--color-fg3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        <span>תרגיל</span>
        <span style={{ textAlign: 'center' }}>סטים</span>
        <span style={{ textAlign: 'center' }}>חזרות</span>
        <span style={{ textAlign: 'center' }}>מנוחה</span>
        <span />
      </div>
      {plan.exercises.map(function(ex, i) {
        return <ExerciseRow key={i} {...ex} />;
      })}
    </div>
  );
}

function RPECalc() {
  const [weight, setWeight] = useState('');
  const [rpe, setRpe] = useState('');
  const [result, setResult] = useState(null);

  function calc() {
    var w = parseFloat(weight), r = parseFloat(rpe);
    if (!w || !r || r < 6 || r > 10) return;
    var est = w * (1 + 0.0333 * (10 - r + 1));
    setResult({
      est: Math.round(est),
      p70: Math.round(est * 0.70),
      p80: Math.round(est * 0.80),
      p85: Math.round(est * 0.85)
    });
  }

  return (
    <div className="card" style={{ marginTop: 24, padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>מחשבון עומס פשוט</div>
      <p style={{ fontSize: 13, color: 'var(--color-fg3)', marginBottom: 20 }}>אם עשית סט מאתגר ואת רוצה להבין איפה את עומדת, זה כלי נוח לקבלת כיוון כללי.</p>
      <div className="calc-input-group">
        <div className="calc-input-wrap">
          <label className="calc-label">משקל שהרמת</label>
          <input className="calc-input" type="number" value={weight} onChange={function(e) { setWeight(e.target.value); }} placeholder="60" />
        </div>
        <div className="calc-input-wrap">
          <label className="calc-label">RPE</label>
          <input className="calc-input" type="number" value={rpe} min="6" max="10" onChange={function(e) { setRpe(e.target.value); }} placeholder="8" />
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
  return (
    <section id="chapter-3" className="guide-section">
      <ChapterHeader
        label="פרק 4"
        title="בניית אימון: ישבן, רגליים וגב למראה שעון חול"
        desc="זה לא עוד אוסף תרגילים. זה הפרק שילמד אותך איך בונים אימון שמשרת מטרה אסתטית ברורה, מתקדם לאורך זמן, ונראה מקצועי גם על הנייר וגם במציאות."
      />

      <Reveal>
        <TrainingHero />
      </Reveal>

      <Reveal>
        <SectionIntro>
          אם את כבר יודעת מה זה סקווט, דדליפט וחתירה אבל עדיין לא באמת מבינה איך לסדר אותם, כמה לבחור, ולמה תרגיל אחד צריך לבוא לפני השני, זה בדיוק המקום שלך. ההבדל בין אימון אקראי לבין אימון שבאמת בונה גוף הוא לא רק התרגילים עצמם, אלא ההיגיון שמחבר ביניהם.
        </SectionIntro>
      </Reveal>

      <Reveal>
        <div className="card" style={{ padding: '24px 24px 18px', marginBottom: 50 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>מה תקבלי מהפרק הזה</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {TRAINING_PROMISES.map(function(item, i) {
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                  <div style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7 }}>{item}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <CompareTraining />
      </Reveal>

      <Ch3SectionTitle icon="growth">1. יסודות בניית השריר</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          לפני שבונים אימון, צריך להבין מה בכלל יוצר גדילה. לא כל תחושת קושי היא גירוי טוב, ולא כל אימון "שורף" הוא אימון בונה. שלושת המרכיבים שכדאי לחשוב עליהם בכל תוכנית הם עומס אמיתי, עבודה בטווחי תנועה טובים, ונפח שמתווסף בצורה חכמה.
        </SectionIntro>
      </Reveal>

      <Reveal>
        <GrowthFlow />
      </Reveal>
      <div className="card-grid-3" style={{ marginBottom: 30 }}>
        {HYPERTROPHY_MECHANISMS.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="train-card-wrap">
                <InfoCard title={item.title} subtitle={item.tag} accent={item.color}>{item.desc}</InfoCard>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="side-note" style={{ marginBottom: 36 }}>
          <strong>המשמעות המעשית:</strong> אימון טוב לא בנוי רק מסטים כבדים או רק מ"פאמפ". הוא משלב תרגיל מוביל כבד יחסית, תרגילים משניים בטווח בינוני, ובידוד חכם בסוף.
        </div>
      </Reveal>

      <Ch3SectionTitle icon="load">2. עומס מתקדם, RPE וטווחי חזרות</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          אם את מבצעת שוב ושוב את אותו אימון בדיוק, הגוף מפסיק לקבל סיבה להשתנות. העמסה מתקדמת היא הדרך שלך לתת לשריר סיבה לגדול: עוד משקל, עוד חזרה, יותר שליטה או יותר נפח עבודה.
        </SectionIntro>
      </Reveal>
      <div className="card-grid-3" style={{ marginBottom: 28 }}>
        {PROGRESSION_METHODS.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card train-progression-card" style={{ padding: '20px 18px' }}>
                <div className="train-progression-icon">{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="card-grid-2" style={{ marginBottom: 28 }}>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>איך לכוון מאמץ</div>
            <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: '0 0 10px' }}>
              ברוב סטי ההיפרטרופיה תרצי להגיע בערך ל-RPE 8-9, כלומר להישאר עם עוד 1-2 חזרות ברזרבה. זה אומר שהסט באמת מאתגר, אבל לא שובר אותך לגמרי.
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.75, margin: 0 }}>
              בתרגילים מורכבים כבדים עדיף לא לחיות בכישלון מוחלט. בתרגילי בידוד, לעומת זאת, אפשר לפעמים להתקרב אליו יותר.
            </p>
          </div>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>טווחי חזרות חכמים</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {REP_RANGES.map(function(item, i) {
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 12, alignItems: 'start' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--color-accent)' }}>{item.range}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.65 }}>{item.use}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginTop: 2 }}>{item.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal><RPECalc /></Reveal>

      <Ch3SectionTitle icon="glute" style={{ marginTop: 60 }}>3. אנטומיית רגליים וישבן</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          כדי לבנות ישבן ורגליים שנראים מלאים ומדויקים יותר, צריך להבין שלא כל תרגיל "לישבן" עושה את אותה עבודה. יש שרירים שאחראים על הנפח, אחרים על הצד העליון והיציבות, ואחרים יוצרים את המעבר הנכון לרגל.
        </SectionIntro>
      </Reveal>
      <Reveal>
        <MuscleMap nodes={GLUTE_MUSCLES} centerIcon="🍑" centerLabel="ישבן ורגליים" />
      </Reveal>
      <div className="card-grid-3" style={{ marginBottom: 24 }}>
        {GLUTE_MUSCLES.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div className="card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{item.heb}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-fg3)' }}>{item.title}</div>
                  </div>
                  <LowerBodyHighlight region={item.region} accent={item.accent} view={item.view} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 8 }}>{item.role}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7, margin: '0 0 10px' }}><strong>תרגילים מובילים:</strong> {item.trains}</p>
                <p style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7, margin: 0 }}>{item.visual}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="card-grid-3" style={{ marginBottom: 36 }}>
          {LEG_SUPPORT_MUSCLES.map(function(item, i) {
            return (
              <div key={i} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{item.heb}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 8 }}>{item.name}</div>
                  </div>
                  <LowerBodyHighlight region={item.region} accent={item.accent} view={item.view} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Ch3SectionTitle icon="plan">4. סוגי התנועות שחייבות להופיע באימון רגליים</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          הדרך הכי טובה לוודא שהאימון שלך שלם היא לא לחשוב רק על שמות של תרגילים, אלא על סוגי תנועה. ברגע שיש לך תנועת סקווט, היפ-הינג, חד-צדדי ובידוד, את מכסה הרבה יותר טוב את המטרה.
        </SectionIntro>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 50 }}>
        {LEG_PATTERNS.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card" style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 999, background: item.color }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{item.title}</div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7, margin: '0 0 8px' }}><strong>דוגמאות:</strong> {item.examples}</p>
                <p style={{ fontSize: 14, color: 'var(--color-fg3)', lineHeight: 1.7, margin: 0 }}>{item.why}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Ch3SectionTitle icon="plan">5. איך לבנות אימון רגליים שלם</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          במקום להיתקע על "איזו תוכנית מושלמת", עדיף לחשוב על תבנית קבועה ואז לבחור מתוך מאגר תרגילים. ככה את יכולה לבנות לעצמך אימון שמתאים לרמה, לציוד ולהעדפות שלך - בלי לאבד כיוון.
        </SectionIntro>
      </Reveal>
      <Reveal>
        <div className="card" style={{ padding: '22px 24px', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>התבנית לבניית אימון רגליים / ישבן</div>
          <BloatTable headers={['מיקום', 'סוג התרגיל', 'סטים', 'חזרות', 'איך לחשוב על זה']} rows={LEG_BUILDER_TEMPLATE} />
        </div>
      </Reveal>
      <Reveal>
        <WorkoutBuilder
          title="בני לעצמך עכשיו יום רגליים / ישבן"
          subtitle="בכל שורה בחרי תרגיל אחד מתוך המאגר. בסוף יהיה לך אימון שלם שבנוי נכון, בלי לנחש."
          slots={LEG_BUILD_SLOTS}
        />
      </Reveal>

      <Ch3SectionTitle icon="back" style={{ marginTop: 60 }}>6. אנטומיית הגב למראה שעון חול</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          גב נשי ומרשים לא נוצר רק מחתירה אחת בסוף אימון עליון. כדי ליצור אשליה של מותן צרה יותר, את רוצה לפתח בעיקר את הרוחב של הגב העליון, להוסיף מספיק עובי כדי שהגב לא ייראה שטוח, ולשמור על כתפיים אחוריות חזקות ויציבה פתוחה.
        </SectionIntro>
      </Reveal>
      <Reveal>
        <MuscleMap nodes={BACK_MUSCLES} centerIcon="🪽" centerLabel="מפת הגב" />
      </Reveal>
      <div className="card-grid-2" style={{ marginBottom: 28 }}>
        {BACK_MUSCLES.map(function(item, i) {
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 999, background: item.accent }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{item.heb}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-fg3)', marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7, margin: '0 0 8px' }}>{item.role}</p>
                <p style={{ fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7, margin: 0 }}><strong>איך עובדים עליו:</strong> {item.trains}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="card-grid-2" style={{ marginBottom: 36 }}>
          {HOURGLASS_RULES.map(function(item, i) {
            return (
              <div key={i} className="card" style={{ padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'var(--color-fg2)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Ch3SectionTitle icon="back">7. איך לבנות לעצמך אימון גב</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          גם בגב לא צריך "רשימת תרגילים מושלמת", אלא תבנית ברורה ובנק תרגילים טוב לבחירה. המטרה היא לשלב רוחב, עומק, יציבה ודיוק - בלי להפוך את כל האימון לחתירות אקראיות.
        </SectionIntro>
      </Reveal>
      <Reveal>
        <div className="card" style={{ padding: '22px 24px', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>התבנית לבניית אימון גב</div>
          <BloatTable headers={['מיקום', 'סוג התרגיל', 'סטים', 'חזרות', 'איך לחשוב על זה']} rows={BACK_BUILDER_TEMPLATE} />
        </div>
      </Reveal>
      <Reveal>
        <WorkoutBuilder
          title="בני לעצמך עכשיו אימון גב"
          subtitle="בחרי תרגיל אחד לכל סוג תנועה, וככה תצאי עם אימון גב מאוזן ולא עם אוסף חתירות אקראי."
          slots={BACK_BUILD_SLOTS}
        />
      </Reveal>

      <Ch3SectionTitle icon="plan" style={{ marginTop: 60 }}>8. תכנון שבועי ונפח עבודה</Ch3SectionTitle>
      <Reveal>
        <SectionIntro>
          רוב הנשים יתקדמו מצוין עם שני אימוני רגליים או ישבן בשבוע ושני אימונים שכוללים מספיק עבודה לגב. אין צורך באינסוף ימי אימון. צריך תדירות מספקת, התאוששות טובה ועקביות.
        </SectionIntro>
      </Reveal>
      <Reveal>
        <WeeklyTrack />
      </Reveal>

      <Reveal>
        <div className="card-grid-2" style={{ marginBottom: 36 }}>
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>סימנים שהתוכנית עובדת</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {SUCCESS_MARKERS.map(function(line, i) {
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--color-fg2)', lineHeight: 1.7 }}>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <PullQuote text="אימון טוב הוא לא אוסף תרגילים יפים. הוא מערכת ברורה: מטרה, סדר, עומס, התמדה והתאוששות." />

      <Reveal>
        <div className="side-note" style={{ marginTop: 34 }}>
          <strong>איך להשתמש בפרק הזה בפועל:</strong> בחרי חלוקה שבועית, הרכיבי 1-2 אימוני רגליים ואימון גב אחד קבוע לפחות, רשמי משקלים וחזרות, והישארי עם אותה תבנית 6-8 שבועות לפני שאת מחליפה תרגילים. ההתקדמות שלך צריכה לבוא בעיקר מהעמסה טובה יותר, לא מחיפוש אינסופי אחרי תוכנית חדשה.
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <BookmarkBtn id="chapter-3" label="בניית אימון" />
      </div>
    </section>
  );
}

const sH3ch3 = { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-fg1)', marginBottom: 20 };
Object.assign(window, { Chapter3 });
