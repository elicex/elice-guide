const { requireEnv, optionalEnv } = require('./env');

const LOW_PROFILE_CREATE_URL = 'https://secure.cardcom.solutions/api/v11/LowProfile/Create';
const LOW_PROFILE_RESULT_URL = 'https://secure.cardcom.solutions/api/v11/LowProfile/GetLpResult';

function cardcomCredentials() {
  return {
    terminalNumber: Number(requireEnv('CARDCOM_TERMINAL_NUMBER')),
    apiName: requireEnv('CARDCOM_API_NAME'),
    apiPassword: optionalEnv('CARDCOM_API_PASSWORD'),
  };
}

async function createLowProfilePayment({ order, successUrl, errorUrl, indicatorUrl }) {
  const { terminalNumber, apiName, apiPassword } = cardcomCredentials();
  const amount = Number(optionalEnv('GUIDE_PRICE', '149'));
  const productName = optionalEnv('GUIDE_PRODUCT_NAME', 'בניית הגוף מבפנים ומבחוץ');

  const payload = {
    TerminalNumber: terminalNumber,
    ApiName: apiName,
    Amount: amount,
    Operation: 'ChargeOnly',
    ReturnValue: order.id,
    SuccessRedirectUrl: successUrl,
    FailedRedirectUrl: errorUrl,
    WebHookUrl: indicatorUrl,
    ProductName: productName,
    Language: 'he',
    ISOCoinId: 1,
    UIDefinition: {
      IsHideCardOwnerName: false,
      CardOwnerNameValue: order.name,
      IsHideCardOwnerPhone: false,
      CardOwnerPhoneValue: order.phone || '',
      IsCardOwnerPhoneRequired: false,
      IsHideCardOwnerEmail: false,
      CardOwnerEmailValue: order.email,
      IsCardOwnerEmailRequired: true,
    },
    Document: {
      DocumentTypeToCreate: 'OrderConfirmation',
      Name: order.name,
      Email: order.email,
      IsSendByEmail: true,
      Products: [
        {
          Description: productName,
          UnitCost: amount,
        },
      ],
    },
  };

  if (apiPassword) {
    payload.AdvancedDefinition = { ApiPassword: apiPassword };
  }

  const response = await fetch(LOW_PROFILE_CREATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  const checkoutUrl = data && (data.Url || data.url);

  if (!response.ok || !data || data.ResponseCode !== 0 || !checkoutUrl) {
    const error = new Error((data && data.Description) || 'Cardcom checkout creation failed');
    error.statusCode = 502;
    error.details = data;
    throw error;
  }

  return {
    lowProfileCode: data.LowProfileId,
    checkoutUrl,
    raw: data,
  };
}

async function getLowProfileIndicator(lowProfileCode) {
  const { terminalNumber, apiName } = cardcomCredentials();
  const payload = {
    TerminalNumber: terminalNumber,
    ApiName: apiName,
    LowProfileId: lowProfileCode,
  };

  const response = await fetch(LOW_PROFILE_RESULT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data || data.ResponseCode !== 0) {
    const error = new Error((data && data.Description) || 'Cardcom indicator lookup failed');
    error.statusCode = 502;
    error.details = data;
    throw error;
  }

  return data;
}

function isSuccessfulCharge(indicator) {
  return indicator.ResponseCode === 0 && (!indicator.TranzactionInfo || indicator.TranzactionInfo.ResponseCode === 0);
}

module.exports = { createLowProfilePayment, getLowProfileIndicator, isSuccessfulCharge };
