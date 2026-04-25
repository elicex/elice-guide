const GUIDE_FUNNEL = {
  productName: 'בניית הגוף מבפנים ומבחוץ',
  productSubtitle: 'המדריך הדיגיטלי לנשים שרוצות להבין את הגוף שלהן באמת',
  priceLabel: 'המחיר שלך כאן',
  checkoutUrl: '',
  sellerEmail: '',
  leadWebhookUrl: '',
  feedbackWebhookUrl: '',
  deliveryGuideUrl: (typeof window !== 'undefined' && window.location) ? window.location.href : '',
  deliveryPromise: 'אחרי הרכישה הלקוחה מקבלת למייל שלה קישור אישי למדריך, ותוכלי להמשיך משם לליווי, מוצרים נוספים ופידבק.',
};

function saveFunnelRecord(key, payload) {
  try {
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.push(payload);
    localStorage.setItem(key, JSON.stringify(current));
  } catch (e) {}
}

async function submitFunnelPayload(kind, payload) {
  const webhookUrl = kind === 'feedback' ? GUIDE_FUNNEL.feedbackWebhookUrl : GUIDE_FUNNEL.leadWebhookUrl;
  const storageKey = kind === 'feedback' ? 'guide_feedback_records' : 'guide_lead_records';

  saveFunnelRecord(storageKey, payload);

  if (!webhookUrl) {
    return { ok: true, mode: 'local' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Webhook failed');
    return { ok: true, mode: 'webhook' };
  } catch (error) {
    return { ok: false, mode: 'error', error };
  }
}

function SalesOfferSection() {
  const scrollToPurchase = function() {
    const el = document.getElementById('section-purchase');
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
  };

  return (
    <section id="section-offer" className="guide-section" style={{ paddingTop: 40 }}>
      <Reveal>
        <div className="sales-shell card">
          <div className="sales-copy">
            <div className="chapter-label" style={{ marginBottom: 16 }}>
              <div className="chapter-label-line" />
              רכישה ומסירה
            </div>
            <h2 className="chapter-title" style={{ marginBottom: 16 }}>
              לא רק מדריך - מוצר דיגיטלי שלם שאפשר למכור, למסור ולעקוב אחריו
            </h2>
            <p className="chapter-desc" style={{ marginBottom: 18 }}>
              המטרה שלנו עכשיו היא לבנות בסיס אמיתי לעסק: עמוד שמוכר, טופס שאוסף פרטים, רכישה שמובילה למסירה, ופידבק שאת יכולה להפוך אחר כך לליווי, מוצרים משלימים ומערכת יחסים עם הלקוחה.
            </p>
            <div className="sales-chip-row">
              <span className="sales-chip">עמוד נחיתה</span>
              <span className="sales-chip">רכישה</span>
              <span className="sales-chip">מסירה למייל</span>
              <span className="sales-chip">פידבק והמשך מכירה</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <button className="hero-cta" onClick={scrollToPurchase}>
                לבניית אזור הרכישה
              </button>
              <div className="sales-price-tag">{GUIDE_FUNNEL.priceLabel}</div>
            </div>
          </div>
          <div className="sales-visual" aria-hidden="true">
            <div className="sales-flow-card sales-flow-card-1">עמוד נחיתה</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-2">תשלום</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-3">מייל עם קישור</div>
            <div className="sales-flow-arrow">→</div>
            <div className="sales-flow-card sales-flow-card-4">פידבק והמשך</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function DeliveryFlowSection() {
  const steps = [
    {
      title: 'נכנסת לעמוד',
      desc: 'הלקוחה רואה את ההבטחה, התוכן, הוויזואליות והסיבה לקנות עכשיו.'
    },
    {
      title: 'משאירה פרטים',
      desc: 'שם, מייל, טלפון והסכמה לשמוע ממך בהמשך על מוצרים, ליווי ותוכן נוסף.'
    },
    {
      title: 'רוכשת',
      desc: 'מעבירים אותה ללינק סליקה אחד ברור - בלי בלגן, בלי יותר מדי שלבים.'
    },
    {
      title: 'מקבלת למייל',
      desc: 'המדריך נשלח עם קישור מסודר, כדי שהיא תוכל לחזור אליו גם אחר כך.'
    },
  ];

  return (
    <section className="guide-section" style={{ paddingTop: 0 }}>
      <Reveal>
        <div className="card" style={{ padding: '28px 28px 24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 10 }}>איך התשתית הזאת אמורה לעבוד</div>
          <p style={{ fontSize: 15, color: 'var(--color-fg2)', lineHeight: 1.8, marginBottom: 22 }}>
            {GUIDE_FUNNEL.deliveryPromise}
          </p>
          <div className="sales-steps-grid">
            {steps.map(function(step, i) {
              return (
                <div key={i} className="sales-step-card">
                  <div className="sales-step-num">0{i + 1}</div>
                  <div className="sales-step-title">{step.title}</div>
                  <div className="sales-step-desc">{step.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PurchaseLeadForm() {
  const [form, setForm] = useState(function() {
    return JSON.parse(localStorage.getItem('guide_purchase_lead_form') || '{"name":"","email":"","phone":"","consent":true}');
  });
  const [status, setStatus] = useState('');

  function updateField(key, value) {
    const next = Object.assign({}, form, { [key]: value });
    setForm(next);
    localStorage.setItem('guide_purchase_lead_form', JSON.stringify(next));
  }

  async function handleSubmit() {
    if (!form.name || !form.email) {
      setStatus('מלאי לפחות שם ומייל כדי שנוכל להתחיל לבנות את זרימת הרכישה.');
      return;
    }

    const payload = {
      kind: 'lead',
      productName: GUIDE_FUNNEL.productName,
      name: form.name,
      email: form.email,
      phone: form.phone,
      consent: !!form.consent,
      guideUrl: GUIDE_FUNNEL.deliveryGuideUrl,
      createdAt: new Date().toISOString(),
      source: 'guide-landing',
      page: window.location.href,
    };

    setStatus('שומרת את הפרטים...');
    const result = await submitFunnelPayload('lead', payload);

    if (!result.ok) {
      setStatus('הפרטים נשמרו מקומית, אבל ה־webhook עוד לא מחובר או נכשל. ברגע שתחברי endpoint - זה יגיע אלייך אוטומטית.');
      return;
    }

    if (GUIDE_FUNNEL.checkoutUrl) {
      window.open(GUIDE_FUNNEL.checkoutUrl, '_blank', 'noopener,noreferrer');
      setStatus('הפרטים נשמרו. מעבירה לרכישה.');
    } else {
      setStatus('הפרטים נשמרו. עכשיו נשאר רק לחבר לינק סליקה אמיתי כדי שהמעבר לרכישה יהיה אוטומטי.');
    }
  }

  return (
    <section id="section-purchase" className="guide-section" style={{ paddingTop: 10 }}>
      <Reveal>
        <div className="sales-purchase-shell card">
          <div className="sales-purchase-copy">
            <div className="chapter-label" style={{ marginBottom: 16 }}>
              <div className="chapter-label-line" />
              שלב רכישה
            </div>
            <h3 className="chapter-title" style={{ marginBottom: 16 }}>
              איסוף פרטים + מעבר לרכישה
            </h3>
            <p className="chapter-desc" style={{ marginBottom: 20 }}>
              זה הבסיס ל־CRM שלך. מי שנכנסת ומשאירה פרטים יכולה אחר כך לקבל את המדריך, פידבק, תכנית ליווי, מוצרים משלימים והצעות המשך - אבל קודם צריך להתחיל לשמור את המידע במקום אחד.
            </p>
            <div className="sales-mini-note">
              כרגע המערכת מוכנה ל־Webhook וללינק סליקה. ברגע שתחברי אותם, כל הזרימה תהפוך לאוטומטית בלי לשנות את המבנה.
            </div>
          </div>

          <div className="sales-form-wrap">
            <div className="sales-form-grid">
              <div>
                <label className="sales-label">שם מלא</label>
                <input className="sales-input" type="text" value={form.name} onChange={function(e) { updateField('name', e.target.value); }} placeholder="איך קוראים לך?" />
              </div>
              <div>
                <label className="sales-label">מייל</label>
                <input className="sales-input" type="email" value={form.email} onChange={function(e) { updateField('email', e.target.value); }} placeholder="name@example.com" dir="ltr" />
              </div>
              <div>
                <label className="sales-label">טלפון</label>
                <input className="sales-input" type="text" value={form.phone} onChange={function(e) { updateField('phone', e.target.value); }} placeholder="050-0000000" dir="ltr" />
              </div>
              <div>
                <label className="sales-label">מה היא תקבל</label>
                <div className="sales-static-box">קישור למדריך במייל + אפשרות להמשך קשר, פידבק והצעות המשך</div>
              </div>
            </div>

            <label className="sales-consent">
              <input type="checkbox" checked={!!form.consent} onChange={function(e) { updateField('consent', e.target.checked); }} />
              <span>אני מאשרת לקבל ממך בהמשך תכנים, פידבק, מוצרים נוספים או הצעה לליווי.</span>
            </label>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="hero-cta" onClick={handleSubmit}>
                שמרי פרטים ועברי לרכישה
              </button>
              {GUIDE_FUNNEL.checkoutUrl && (
                <a href={GUIDE_FUNNEL.checkoutUrl} target="_blank" rel="noreferrer" className="sales-secondary-btn">
                  פתחי את הרכישה
                </a>
              )}
            </div>

            {status && <p style={{ marginTop: 14, fontSize: 13, color: 'var(--color-fg3)', lineHeight: 1.7 }}>{status}</p>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FinalSalesCta() {
  const scrollToPurchase = function() {
    const el = document.getElementById('section-purchase');
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
  };

  return (
    <Reveal>
      <div className="sales-final-cta">
        <div>
          <div className="sales-final-kicker">השלב הבא</div>
          <div className="sales-final-title">להפוך את המדריך למוצר שנמכר ונשלח אוטומטית</div>
          <div className="sales-final-text">
            עכשיו יש לך בסיס טוב. השלב הבא יהיה לחבר סליקה, מייל אוטומטי ויעד שמירה אמיתי ללידים ולפידבקים.
          </div>
        </div>
        <button className="hero-cta" onClick={scrollToPurchase}>
          חזרי לאזור הרכישה
        </button>
      </div>
    </Reveal>
  );
}

Object.assign(window, {
  GUIDE_FUNNEL,
  submitFunnelPayload,
  SalesOfferSection,
  DeliveryFlowSection,
  PurchaseLeadForm,
  FinalSalesCta,
});
