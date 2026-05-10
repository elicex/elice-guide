# הקמה חינמית למכירת המדריך

זה הצעד־אחר־צעד כדי לגרום למערכת לעבוד בפועל.

## מה משתמשים בו

- Cardcom - כבר יש לך.
- Vercel - אחסון האתר + פונקציות שרת בחינם.
- Supabase - שמירת הזמנות ולידים בחינם.
- Resend - שליחת מיילים בחינם בהתחלה.

חשוב: GitHub Pages לא מספיק כאן, כי הוא לא מריץ Backend. בשביל Cardcom צריך כתובת `https` חיצונית שמקבלת דיווח שרת־לשרת, ולכן Vercel מתאים יותר.

## 1. Supabase

1. לפתוח פרויקט חדש ב־Supabase.
2. ללכת ל־SQL Editor.
3. להריץ את הקובץ [SUPABASE_SCHEMA.sql](/Users/elicesheidin/Downloads/guide/SUPABASE_SCHEMA.sql).
4. לשמור בצד:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

לא לשים את ה־service role key בקוד של הדפדפן. הוא נכנס רק ל־Environment Variables של Vercel.

## 2. Resend

1. לפתוח חשבון ב־Resend.
2. לחבר דומיין או להשתמש בשולח שהם מאפשרים לשלב בדיקות.
3. ליצור API Key.
4. לשמור:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_REPLY_TO`

דוגמה ל־`EMAIL_FROM`:

```text
Elice Fit <hello@your-domain.co.il>
```

## 3. Cardcom

צריך להכין:

```text
CARDCOM_TERMINAL_NUMBER=
CARDCOM_API_NAME=
CARDCOM_API_PASSWORD=
```

החיבור הנוכחי משתמש ב־Cardcom API v11, כלומר `LowProfile/Create` ו־`LowProfile/GetLpResult`. לכן שם המשתמש הוא `ApiName`, והסיסמה נשמרת כ־`CARDCOM_API_PASSWORD`.

## 4. Vercel

1. לחבר את הריפו ל־Vercel.
2. להגדיר את הפרויקט כ־Static + Serverless Functions. Vercel יזהה לבד את תיקיית `api`.
3. להוסיף Environment Variables:

```text
CARDCOM_TERMINAL_NUMBER=
CARDCOM_API_NAME=
CARDCOM_API_PASSWORD=
GUIDE_PRICE=149
GUIDE_PRODUCT_NAME=בניית הגוף מבפנים ומבחוץ
PUBLIC_BASE_URL=https://your-vercel-or-domain-url

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
EMAIL_FROM=
EMAIL_REPLY_TO=
```

`PUBLIC_BASE_URL` חייב להיות הכתובת האמיתית של האתר אחרי העלאה, לא `localhost`.

## 5. בדיקה מלאה

1. לפתוח את עמוד הנחיתה בכתובת של Vercel.
2. למלא שם, מייל וטלפון.
3. ללחוץ על רכישה.
4. לוודא שנפתח עמוד תשלום של Cardcom.
5. לבצע תשלום בדיקה או סכום נמוך.
6. לבדוק ב־Supabase שהזמנה עברה מ־`pending` ל־`paid`.
7. לבדוק שהמייל נשלח ללקוחה.
8. לבדוק שב־events נשמרו:
   - `order_created`
   - `cardcom_checkout_created`
   - `cardcom_indicator_received`
   - `cardcom_indicator_verified`
   - `guide_email_sent`

## בדיקה מקומית

האתר הרגיל שרץ עם `python3 -m http.server` לא מספיק לסליקה, כי הוא לא מריץ את תיקיית `api`.

כדי לבדוק את הזרימה עם פונקציות שרת:

```bash
npm install
npm run dev
```

זה יריץ את Vercel Dev, כולל:

- `landing.html`
- `index.html`
- `/api/orders/create`
- `/api/cardcom/indicator`

חשוב: Cardcom לא יכולה לשלוח `WebHookUrl` ל־`localhost`, לכן בדיקה מלאה של תשלום אמיתי תעבוד רק אחרי פריסה ל־Vercel עם כתובת `https` ציבורית.

## מה כבר מחובר בקוד

- [api/orders/create.js](/Users/elicesheidin/Downloads/guide/api/orders/create.js) - יוצר הזמנה ופותח סליקה ב־Cardcom.
- [api/cardcom/indicator.js](/Users/elicesheidin/Downloads/guide/api/cardcom/indicator.js) - מקבל דיווח מ־Cardcom, מאמת עסקה ושולח מייל.
- [landing.jsx](/Users/elicesheidin/Downloads/guide/landing.jsx) - כפתור הרכישה קורא עכשיו ל־`/api/orders/create`.
- [payment-success.html](/Users/elicesheidin/Downloads/guide/payment-success.html) - עמוד אחרי תשלום מוצלח.
- [payment-failed.html](/Users/elicesheidin/Downloads/guide/payment-failed.html) - עמוד אחרי תשלום שנכשל.
