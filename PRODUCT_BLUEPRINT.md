# מוצר דיגיטלי — Blueprint מלא

## מטרת המוצר
`בניית הגוף מבפנים ומבחוץ` הוא מוצר דיגיטלי חד-פעמי במחיר 149 ₪.

המטרות העסקיות שלו:
1. לייצר הכנסה פסיבית ממוצר נגיש במחיר ביניים.
2. לשמש מוצר כניסה שמחמם לקוחות לתכנית הליווי.
3. לחזק את הסמכות של Elice Fit דרך חוויית תוכן פרימיום, לא רק דרך שיווק.

---

## עקרונות מוצר

### 1. זה לא PDF "שנשלח וזהו"
ההמלצה היא למכור **גישה דיגיטלית למדריך וובי**.

למה:
- מרגיש פרימיום יותר
- מאפשר לעדכן תוכן בלי לשלוח קבצים מחדש
- מאפשר CTA חכמים לתכנית ליווי
- מאפשר גישה חוזרת מכל מכשיר
- מאפשר בעתיד דאשבורד של מוצרים דיגיטליים

### 2. PDF הוא בונוס, לא המוצר הראשי
אם רוצים בהמשך, אפשר להוסיף:
- גרסת PDF להדפסה
- דף "סיכומי פרק"
- worksheet להורדה

אבל ה-delivery הראשי צריך להיות web access.

### 3. המדריך צריך להיות מוצר עצמאי וגם מוצר ממיר
כלומר:
- הוא חייב לעמוד בזכות עצמו
- אבל בסוף ובנקודות נכונות לאורך הדרך, צריך להוביל בעדינות לליווי

---

## ה-Flow המלא

### שלב 1 — Landing page
הלקוחה מגיעה לעמוד נחיתה ייעודי.

העמוד צריך לכלול:
- Hero חד וברור
- למי זה מתאים / לא מתאים
- מה מקבלים בפועל
- למה זה שונה ממידע חינמי
- תועלות מעשיות
- FAQ
- מחיר
- CTA ברור לרכישה
- CTA משני לתכנית הליווי בסוף

### שלב 2 — Checkout
לחיצה על רכישה מעבירה ל-checkout.

ההמלצה:
- להשתמש בתשתית CardCom הקיימת ב-`elice-app`
- לפתוח מסלול חדש של **one-time digital product**, לא מנוי

### שלב 3 — Payment success
אחרי תשלום מוצלח:
- transaction verified מול CardCom
- נשמרת רכישה ב-Firestore
- נוצרת הרשאת גישה למדריך
- נשלחת חשבונית/קבלה
- נשלח מייל delivery עם קישור גישה
- success page מציג גם גישה מיידית, כדי שלא נהיה תלויים רק במייל

### שלב 4 — Email delivery
המייל צריך לכלול:
- ברכה אישית
- קישור ישיר למדריך
- הסבר קצר איך לפתוח ולשמור
- CTA רך לתכנית ליווי
- כתובת תמיכה למקרה שלא הצליח להיפתח

### שלב 5 — Guide access
הגישה למדריך צריכה להיות:
- דרך route מאובטח
- על בסיס purchase/access token או user access record
- עם אפשרות חזרה עתידית

### שלב 6 — Conversion to coaching
בתוך המדריך ובסופו:
- block של "רוצה לקחת את זה צעד קדימה?"
- קישור ברור לתכנית הליווי
- ניסוח שמכבד את מי שקנתה את המדריך ולא לוחץ מדי

---

## ארכיטקטורה מומלצת

## A. איפה המדריך חי
### המלצה
להעביר את הגשת המדריך תחת `elice-app`, גם אם התוכן עצמו מתחיל כקבצים מתוך `elice-guide`.

### סיבה
כך כל המערכת יושבת במקום אחד:
- דומיין
- תשלום
- success page
- access control
- email delivery
- analytics

### מבנה מוצע
- `elice-guide` = סביבת כתיבה/עיצוב/פיתוח תוכן
- `elice-app` = סביבת production delivery

---

## B. מודל נתונים מוצע ב-Firestore

### `digital_products/{productId}`
```json
{
  "id": "guide-body-inside-out",
  "type": "guide",
  "name": "בניית הגוף מבפנים ומבחוץ",
  "price": 149,
  "currency": "ILS",
  "status": "active",
  "guideSlug": "body-inside-out",
  "deliveryMode": "web_access",
  "upsellTarget": "coaching-program"
}
```

### `digital_purchases/{purchaseId}`
```json
{
  "uid": "optional",
  "email": "customer@example.com",
  "fullName": "לקוחה",
  "phone": "optional",
  "productId": "guide-body-inside-out",
  "provider": "cardcom",
  "amount": 149,
  "currency": "ILS",
  "status": "paid",
  "cardcomLowProfileId": "...",
  "cardcomTransactionId": "...",
  "invoiceUrl": "...",
  "createdAt": "ISO",
  "paidAt": "ISO"
}
```

### `guide_access/{accessId}`
```json
{
  "productId": "guide-body-inside-out",
  "purchaseId": "...",
  "email": "customer@example.com",
  "token": "random-secure-token",
  "status": "active",
  "guideSlug": "body-inside-out",
  "createdAt": "ISO",
  "lastOpenedAt": null
}
```

### `marketing_leads/{leadId}`
לפני רכישה או לטפסי עניין.

---

## C. Routes מוצעים ב-`elice-app`

### Public
- `/guide/body-inside-out` — landing page
- `/guide/body-inside-out/checkout` — purchase screen
- `/guide/body-inside-out/success` — success page
- `/g/body-inside-out/:token` — access link from email

### API
- `/api/digital-products/create-payment`
- `/api/digital-products/webhook/cardcom`
- `/api/digital-products/access`
- `/api/digital-products/send-delivery`
- `/api/digital-products/lead`

---

## D. סליקה

### מה יש כבר
ב-`elice-app` כבר קיימת אינטגרציית CardCom למנוי.

### מה צריך לשנות
המסלול החדש חייב להיות **one-time purchase** ולא subscription.

כלומר:
- לא לכתוב ל-`subscriptions`
- לא להפעיל לוגיקת `current_period_end`
- לא לסמן `hasActiveSubscription` אם זו רק רכישת מדריך
- כן לשמור `digital_purchases`
- כן לייצר invoice/receipt
- כן לייצר access record

---

## E. מייל

### דרישה מוצרית
המייל הוא לא nice-to-have. הוא חלק מהמוצר.

### מה צריך להיות בו
Subject לדוגמה:
- המדריך שלך מוכן ✨
- רכשת בהצלחה — הנה הגישה שלך למדריך

תוכן:
- תודה על הרכישה
- קישור אישי למדריך
- הסבר קצר
- אם יש בעיה: כתובת תמיכה
- CTA משני לליווי

### הערה טכנית
נכון לעכשיו זיהיתי invoice email דרך Morning, אבל לא זיהיתי עדיין שירות transactional email ייעודי לשליחת מייל המדריך.
לכן במימוש נצטרך אחד מאלה:
1. Resend
2. Postmark
3. SendGrid
4. SMTP קיים אם יש

עד אז חובה שגם success page ייתן גישה מיידית.

---

## F. הרשאות גישה

### ההמלצה
לא להשאיר את המדריך פתוח לגמרי בדומיין ציבורי בלי שכבת access.

### אופציות
1. **Tokenized access link**
   - הכי מהיר למוצר דיגיטלי
   - הקישור נשלח למייל
   - אפשר לפתוח בלי login

2. **Account-based access**
   - הלקוחה נרשמת/מתחברת
   - הרכישה משויכת לחשבון
   - יותר מסודר לטווח ארוך
   - אבל יותר friction

### המלצת ביניים
Phase 1:
- tokenized access
- success page עם link מיידי

Phase 2:
- optional account claim

---

## G. מבנה שיווקי מומלץ לעמוד הנחיתה

### Hero
הבטחה אחת ברורה:
- להבין למה הגוף שלך מגיב כמו שהוא מגיב
- ולעשות סדר בתזונה, נפיחות, מעיים, אימון ושגרה

### Sections
1. הכאב / למה זה מרגיש מבלבל
2. מה המדריך נותן בפועל
3. למי זה מתאים
4. מה תקבלי בפנים
5. למה זה שונה ממידע חינמי
6. מחיר + CTA
7. FAQ
8. CTA לליווי בסוף

### מה לא לעשות
- לא להבטיח תוצאות מוחלטות
- לא להישמע רפואי מדי בלי הסתייגות
- לא להישמע כמו דף מכירה אגרסיבי

---

## H. CTA לליווי

### איפה
- סוף עמוד הנחיתה
- סוף המדריך
- אולי 1-2 אזכורים עדינים באמצע

### ניסוח מומלץ
"אם המדריך הזה עשה לך סדר, אבל את רוצה גם להפוך את זה לפרקטיקה מותאמת אישית — תכנית הליווי שלי נבנתה בדיוק בשביל זה."

לא לדחוף חזק מדי. המדריך צריך קודם כל להרגיש מוצר שלם.

---

## I. Analytics ואירועים

כדאי למדוד:
- landing_view
- CTA_click
- checkout_started
- payment_success
- delivery_email_sent
- guide_opened
- coaching_CTA_clicked

---

## J. סדר מימוש מומלץ

### Phase 1 — Product definition
- להחליט slug, product id, data model
- להחליט delivery strategy
- להחליט domain path

### Phase 2 — Content polish
- audit עברית
- חידוד hero
- חידוד promise
- CTA ליווי

### Phase 3 — Technical delivery
- create-payment route למוצר דיגיטלי
- webhook route
- purchase records
- access token generation
- success page

### Phase 4 — Email delivery
- email provider integration
- template למייל מדריך

### Phase 5 — Production launch
- route ציבורי
- QA end-to-end
- בדיקות תשלום אמיתי
- בדיקות גישה ממייל

---

## החלטות שכדאי לקבע עכשיו
1. המדריך יימכר כמוצר דיגיטלי וובי, לא רק PDF.
2. התשלום יישב על CardCom הקיים, במסלול חדש של one-time product.
3. delivery יכלול גם success page וגם מייל.
4. המרה לליווי תיכנס בעדינות בסוף המדריך ובסוף עמוד הנחיתה.
5. סביבת ה-production צריכה להיות תחת `elice-app` ולא כפרויקט מנותק.
