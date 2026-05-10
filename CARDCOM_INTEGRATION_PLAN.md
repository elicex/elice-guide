# תכנון מערכת סליקה ומסירת מדריך - Cardcom

מסמך עבודה פנימי: איך להפוך את עמוד הנחיתה והמדריך למערכת מכירה אמיתית.

## המטרה

לקוחה נכנסת לעמוד הנחיתה, משאירה פרטים, עוברת לסליקה של Cardcom, משלמת, ואז מקבלת אוטומטית גישה למדריך במייל. במקביל, הפרטים שלה נשמרים אצל אליס כדי שאפשר יהיה לעשות פולואו־אפ, לקבל פידבק, ולהציע ליווי או מוצרים נוספים.

## העיקרון הכי חשוב

לא שולחים את המדריך על בסיס זה שהלקוחה הגיעה לעמוד הצלחה.

עמוד הצלחה בדפדפן לא מספיק אמין, כי לקוחה יכולה לסגור חלון, לרענן, להיתקע בפופאפ, או להגיע לשם בלי שהמערכת שלנו באמת אימתה תשלום. Cardcom בעצמם ממליצים להשתמש ב־`IndicatorUrl`, כלומר דיווח שרת־לשרת, ולא להסתמך רק על עמוד הצלחה.

הגישה נשלחת רק אחרי שהשרת שלנו קיבל דיווח מ־Cardcom, בדק את העסקה, ואישר שהתשלום באמת הצליח.

## ארכיטקטורה מומלצת

האתר הנוכחי הוא סטטי: `landing.html` ו־`index.html`.

בשביל סליקה אמיתית צריך להוסיף שכבת Backend קטנה. לא כדאי לשים פרטי Cardcom בתוך הקוד של הדפדפן.

המלצה פשוטה:

- Hosting: Vercel או Netlify
- Backend: Serverless Functions באותו Hosting
- Database: Supabase או Airtable
- Email: Resend / SendGrid / Mailgun
- סליקה: Cardcom Low Profile Redirect

## זרימת לקוחה מלאה

1. לקוחה נכנסת ל־`landing.html`.
2. היא ממלאת שם, מייל וטלפון.
3. לחיצה על רכישה שולחת בקשה לשרת שלנו: `POST /api/orders/create`.
4. השרת יוצר הזמנה במצב `pending`.
5. השרת קורא ל־Cardcom ויוצר דף סליקה Low Profile.
6. Cardcom מחזיר `LowProfileCode` ו־`url`.
7. הדפדפן מעביר את הלקוחה ל־`url` של Cardcom.
8. הלקוחה משלמת ב־Cardcom.
9. Cardcom קורא לשרת שלנו ב־`IndicatorUrl`.
10. השרת שלנו שומר את הדיווח, ואז קורא ל־Cardcom שוב כדי למשוך פרטי עסקה ולאמת אותה.
11. אם העסקה הצליחה, ההזמנה מתעדכנת ל־`paid`.
12. השרת שולח ללקוחה מייל עם קישור גישה למדריך.
13. הלקוחה חוזרת לעמוד הצלחה שאומר לה לבדוק את המייל.

## Endpoint 1 - יצירת הזמנה

`POST /api/orders/create`

מקבל מהעמוד:

```json
{
  "name": "שם מלא",
  "email": "name@example.com",
  "phone": "0500000000",
  "consent": true
}
```

מה השרת עושה:

- מוודא שיש שם ומייל תקין.
- יוצר `orderId` פנימי.
- שומר הזמנה בטבלה `orders` במצב `pending`.
- קורא ל־Cardcom כדי ליצור דף סליקה.
- מחזיר לדפדפן את כתובת הסליקה.

תגובה לדפדפן:

```json
{
  "orderId": "guide_123456",
  "checkoutUrl": "https://secure.cardcom.solutions/..."
}
```

## קריאה ל־Cardcom

לפי התיעוד של Cardcom, אפשר לעבוד עם Low Profile.

הפרמטרים המרכזיים:

- `Operation`: חיוב רגיל. ב־API v11 זה `ChargeOnly`.
- `TerminalNumber`: מספר המסוף שלך.
- `ApiName`: שם משתמש API.
- `ApiPassword`: סיסמת API, נשמרת רק בשרת.
- `SumToBill`: סכום לחיוב, כרגע `149`.
- `CoinId`: שקל, בדרך כלל `1`.
- `Language`: `he`.
- `ProductName`: שם המוצר, למשל `בניית הגוף מבפנים ומבחוץ`.
- `SuccessRedirectUrl`: עמוד הצלחה באתר.
- `ErrorRedirectUrl`: עמוד כשלון באתר.
- `IndicatorUrl`: כתובת השרת שלנו לקבלת דיווח מ־Cardcom.
- `ReturnValue`: מזהה ההזמנה שלנו, למשל `guide_123456`.
- `CardOwnerEmail`: המייל של הלקוחה.
- `CardOwnerName`: השם של הלקוחה.
- `CardOwnerPhone`: הטלפון של הלקוחה.

חשוב:

- `IndicatorUrl`, `SuccessRedirectUrl`, `ErrorRedirectUrl` חייבים להיות כתובות חיצוניות עם `https`, לא `localhost`.
- `ReturnValue` צריך להיות מזהה ההזמנה שלנו, כדי שנוכל לחבר בין הדיווח של Cardcom להזמנה במערכת.
- לא לשים `TerminalNumber` / `ApiName` / `ApiPassword` בתוך `landing.jsx`.

## Endpoint 2 - דיווח Cardcom

`POST /api/cardcom/indicator`

זו הכתובת שמעבירים ל־Cardcom בתור `IndicatorUrl`.

מה Cardcom שולח:

- `LowProfileCode`
- `Operation`
- `ReturnValue`
- פרטי עסקה נוספים

מה השרת שלנו עושה:

- מקבל את הדיווח.
- מוצא את ההזמנה לפי `ReturnValue`.
- קורא ל־Cardcom `GetLowProfileIndicator` עם `LowProfileCode`.
- בודק שהעסקה באמת הצליחה:
  - `OperationResponse = 0`
  - ובעסקת חיוב רגילה גם `DealResponse = 0`
- שומר מספר עסקה ופרטי חיוב.
- מסמן את ההזמנה כ־`paid`.
- שולח מייל עם קישור למדריך.
- מחזיר ל־Cardcom תשובת `200 OK`.

צריך לטפל בכפל דיווחים: Cardcom עשוי לשלוח את אותו דיווח כמה פעמים אם לא קיבל תשובה תקינה. לכן אם הזמנה כבר `paid`, לא שולחים שוב מייל בלי בדיקה.

## Endpoint 3 - עמוד הצלחה

`/success.html` או `/payment-success`

העמוד הזה לא מחלק את המדריך בעצמו.

הוא רק אומר:

> התשלום התקבל. אנחנו שולחות לך עכשיו את הקישור למדריך במייל. אם הוא לא הגיע תוך כמה דקות, בדקי ספאם או צרי קשר.

אפשר גם להציג כפתור “שלחו לי שוב את המייל” בהמשך.

## איך לשלוח את המדריך

יש שתי אפשרויות:

### אפשרות פשוטה להתחלה

המייל כולל קישור ל־`index.html`.

יתרון: הכי פשוט.

חיסרון: מי שיש לה את הקישור יכולה להעביר אותו הלאה.

### אפשרות מומלצת יותר

המייל כולל קישור אישי:

`/access?token=...`

השרת בודק שהטוקן קיים, שייך להזמנה ששולמה, ולא פג תוקף. אם הכול תקין, הוא מציג או מפנה למדריך.

אפשר להתחיל פשוט, אבל לתכנן מראש את הטבלה כך שאפשר יהיה להוסיף טוקנים בהמשך.

## Database מומלץ

טבלת `orders`:

```text
id
name
email
phone
consent
status: pending | paid | failed
amount
currency
cardcomLowProfileCode
cardcomTransactionId
cardcomDealResponse
returnValue
guideAccessToken
emailSentAt
createdAt
updatedAt
```

טבלת `events`:

```text
id
orderId
type
payload
createdAt
```

הטבלה השנייה חשובה כדי לשמור כל דיווח מ־Cardcom, גם אם משהו נכשל באמצע.

## מייל שנשלח ללקוחה

נושא:

`המדריך שלך מחכה לך כאן`

גוף:

```text
היי {{name}},

איזה כיף, הרכישה שלך הושלמה.

הנה הקישור למדריך:
{{guideLink}}

ממליצה לשמור את המייל הזה, כי תוכלי לחזור למדריך בכל זמן.

אליס
```

## מה צריך ממך כדי לחבר בפועל

פרטי Cardcom:

- `TerminalNumber`
- `ApiName`
- `ApiPassword`
- האם להפיק חשבונית דרך Cardcom או רק לבצע חיוב
- האם לאפשר תשלומים או רק תשלום אחד
- כתובת דומיין סופית

פרטי מערכת מייל:

- Resend / SendGrid / Mailgun
- כתובת השולחת, למשל `hello@your-domain.co.il`
- DNS מאומת לדומיין

פרטי אחסון:

- האם משתמשים ב־Supabase או Airtable לשמירת לידים והזמנות

## המלצה שלי לביצוע

שלב 1:

להעלות את האתר ל־Vercel עם דומיין זמני.

שלב 2:

להקים Supabase עם טבלת `orders`.

שלב 3:

להקים Resend לשליחת מיילים.

שלב 4:

לבנות `POST /api/orders/create` שמייצר הזמנה ומחזיר URL של Cardcom.

שלב 5:

לבנות `POST /api/cardcom/indicator` שמאמת תשלום ושולח מייל.

שלב 6:

לעשות בדיקת רכישה מלאה עם סכום נמוך או מסוף בדיקות.

שלב 7:

לחבר דומיין אמיתי, לעבור לסכום `149`, ולעלות לאוויר.

## מקורות Cardcom שנבדקו

- Low Profile interface - יצירת דף סליקה ו־`IndicatorUrl`:
  https://cardcomapinametovalue.zendesk.com/hc/he/articles/27008964534162-Low-profile-interface-EN-Step-1-2

- ריכוז Webhooks ודיווחים מ־Cardcom:
  https://support.cardcom.solutions/hc/he/articles/27875111757970

- Swagger/API v11:
  https://secure.cardcom.solutions/swagger/index.html?url=/swagger/v11/swagger.json
