const paymentMethods = [
  { id: "visa_card", name: "Visa Credit Card", type: "card", countries: ["MX","CO","AR"], confirmationTime: "instant", baseSuccessRate: 82 },
  { id: "mastercard", name: "Mastercard", type: "card", countries: ["MX","CO","AR"], confirmationTime: "instant", baseSuccessRate: 80 },
  { id: "amex", name: "American Express", type: "card", countries: ["MX","CO","AR"], confirmationTime: "instant", baseSuccessRate: 70 },
  { id: "oxxo", name: "OXXO Cash", type: "cash", countries: ["MX"], confirmationTime: "24hr", baseSuccessRate: 95 },
  { id: "spei", name: "SPEI Transfer", type: "bank_transfer", countries: ["MX"], confirmationTime: "5min", baseSuccessRate: 90 },
  { id: "pse", name: "PSE Bank Transfer", type: "bank_transfer", countries: ["CO"], confirmationTime: "2hr", baseSuccessRate: 88 },
  { id: "rapipago", name: "Rapipago", type: "cash", countries: ["AR"], confirmationTime: "24hr", baseSuccessRate: 93 },
  { id: "pagofacil", name: "Pago Fácil", type: "cash", countries: ["AR"], confirmationTime: "24hr", baseSuccessRate: 91 },
  { id: "debit_mx", name: "Mexican Debit Card", type: "card", countries: ["MX"], confirmationTime: "instant", baseSuccessRate: 85 },
  { id: "debit_co", name: "Colombian Debit Card", type: "card", countries: ["CO"], confirmationTime: "instant", baseSuccessRate: 83 },
  { id: "debit_ar", name: "Argentine Debit Card", type: "card", countries: ["AR"], confirmationTime: "instant", baseSuccessRate: 86 },
  { id: "paypal", name: "PayPal", type: "wallet", countries: ["MX","CO","AR"], confirmationTime: "instant", baseSuccessRate: 78 },
  { id: "mercadopago", name: "MercadoPago", type: "wallet", countries: ["MX","CO","AR"], confirmationTime: "instant", baseSuccessRate: 84 },
  { id: "nequi", name: "Nequi", type: "wallet", countries: ["CO"], confirmationTime: "instant", baseSuccessRate: 87 }
];

const countryBoosts = {
  MX: { oxxo: 15, spei: 10, debit_mx: 8 },
  CO: { pse: 12, nequi: 10, debit_co: 8 },
  AR: { rapipago: 14, pagofacil: 12, debit_ar: 10 }
};

const amountPenalties = {
  cash: { high: -20 },
  bank_transfer: { high: -5 },
  card: { high: -8 },
  wallet: { high: -10 }
};

module.exports = { paymentMethods, countryBoosts, amountPenalties };
