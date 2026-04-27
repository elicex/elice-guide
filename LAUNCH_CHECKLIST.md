# Launch Checklist — בניית הגוף מבפנים ומבחוץ

## Product
- [ ] לעבור על כל פרקי המדריך ולסגור audit לשוני מלא
- [ ] להוסיף CTA עדין לתכנית הליווי בתוך המדריך
- [ ] להחליט אם מוסיפים גם PDF/print bonus

## Technical
- [x] landing page בתוך `elice-app`
- [x] create-payment למוצר דיגיטלי
- [x] webhook ייעודי ל-CardCom
- [x] success page
- [x] tokenized access
- [x] פתיחת המדריך עצמו דרך route מאובטח
- [x] email outbox + provider-ready flow
- [ ] להגדיר `RESEND_API_KEY`
- [ ] להגדיר `RESEND_FROM_EMAIL`
- [ ] לבצע test purchase אמיתי או sandbox
- [ ] לבדוק שהמייל מתקבל בפועל
- [ ] לבדוק שהקישור במייל פותח את המדריך

## Domain / production
- [ ] להחליט אם הדף יעלה תחת `coach.elice.co.il/guide/body-inside-out`
- [ ] לוודא SEO/meta בסיסיים לעמוד הנחיתה
- [ ] לחבר analytics לאירועי רכישה/פתיחה

## QA
- [ ] בדיקת מובייל מלאה
- [ ] בדיקת RTL מלאה
- [ ] בדיקת success flow אחרי תשלום
- [ ] בדיקת failure flow
- [ ] בדיקת חזרה חוזרת עם אותו access token

## Business
- [ ] להחליט אם 149 ₪ הוא מחיר launch או מחיר קבוע
- [ ] לנסח מייל delivery סופי בנוסח המותג
- [ ] לנסח CTA סופי לתכנית הליווי
