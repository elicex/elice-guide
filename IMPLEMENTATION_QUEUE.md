# Implementation Queue — guide-body-inside-out

## Current status

### Done
- נכתב blueprint מלא למוצר: `PRODUCT_BLUEPRINT.md`
- נכתב audit תוכן/שפה: `CONTENT_AUDIT_HE.md`
- שופר קופי ב-`landing.jsx`
- נוספה שכבת מסרים טובה יותר לעמוד הנחיתה:
  - הבטחה מדויקת יותר
  - FAQ משופר
  - מסר ברור על delivery במייל
  - חיבור טוב יותר לתכנית הליווי
- נוצר בסיס product definition ב-`elice-app/src/lib/digital-products.ts`

### Still missing
- route אמיתי ל-checkout עבור מוצר דיגיטלי
- webhook ייעודי ל-one-time purchase
- שמירת purchase/access ב-Firestore
- tokenized guide access
- success page ייעודי למדריך
- email delivery provider
- hosting/route של המדריך תחת production app
- CTA משולב בתוך המדריך עצמו

---

## Priority order

### P0 — Launch blockers
1. לחבר landing ל-checkout אמיתי
2. לבנות webhook one-time
3. לייצר access link
4. להציג success page עם גישה מיידית
5. לשלוח מייל delivery

### P1 — Product quality
1. שכתוב עומק לפרקי המדריך
2. סיכומי פרק
3. בלוק "מה לקחת לשבוע הקרוב"
4. CTA חכם לליווי בתוך המדריך

### P2 — Premium polish
1. גרסת PDF/print
2. analytics events
3. feedback loop אחרי רכישה
4. upsell automation לליווי

---

## Technical build sequence

### Step 1
להוסיף public landing route ב-`elice-app` עבור:
- `/guide/body-inside-out`

### Step 2
להוסיף checkout API חדש:
- `/api/digital-products/create-payment`

Input:
```json
{
  "productId": "guide-body-inside-out",
  "email": "customer@example.com",
  "fullName": "לקוחה",
  "phone": "050..."
}
```

Output:
```json
{
  "paymentUrl": "...",
  "lowProfileId": "..."
}
```

### Step 3
להוסיף CardCom webhook נפרד או branch ייעודי בתוך webhook קיים, שמזהה:
- `kind: digital_product`
- `productId: guide-body-inside-out`

### Step 4
לשמור:
- `digital_purchases`
- `guide_access`

### Step 5
לייצר success page:
- `/guide/body-inside-out/success`
- retrieval לפי `lowProfileId`
- כפתור "פתחי את המדריך"

### Step 6
לשלוח email delivery

### Step 7
להגיש את המדריך עצמו מתוך production app

---

## Product copy tasks

### Landing
- לחזק social proof בהמשך אם יהיה
- להוסיף "למי זה לא מתאים"
- להוסיף block של "למה 149 ₪ זה no-brainer"

### Guide
- ליישר טון בכל הפרקים
- להפחית ניסוחים מוחלטים
- להוסיף takeaways קבועים
- להוסיף CTA ליווי בסיום

---

## Important implementation notes
- זה מוצר חד-פעמי, לא מנוי.
- לא לגעת בלוגיקת subscription הקיימת מעבר למה שנדרש לשיתוף תשתית CardCom.
- success page חייב לתת גישה מיידית גם אם delivery email נכשל.
- email delivery חייב להיות nice and premium, לא מייל טכני יבש.
- לא להשאיר את המדריך כקישור ציבורי פתוח בלי שום שכבת access.
