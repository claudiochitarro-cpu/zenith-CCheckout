const express = require('express');
const cors = require('cors');
const { paymentMethods, countryBoosts, amountPenalties } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

function getAmountTier(amount) {
  return amount > 200 ? 'high' : 'low';
}

function scoreMethod(method, country, amount) {
  let score = method.baseSuccessRate;
  const tier = getAmountTier(amount);
  const boosts = countryBoosts[country] || {};
  const boost = boosts[method.id] || 0;
  score += boost;
  if (tier === 'high') {
    const penalty = amountPenalties[method.type]?.high || 0;
    score += penalty;
  }
  return score;
}

function getExplanation(method, country, amount, score) {
  const tier = getAmountTier(amount);
  const boosts = countryBoosts[country] || {};
  const isLocal = boosts[method.id] > 0;
  const lines = [];
  if (isLocal) lines.push(`Most popular in ${country === 'MX' ? 'Mexico' : country === 'CO' ? 'Colombia' : 'Argentina'}`);
  if (score >= 90) lines.push(`${score}% success rate`);
  else lines.push(`${score}% success rate for purchases like yours`);
  if (tier === 'high' && method.type === 'card') lines.push('Reliable for high-value purchases');
  if (method.type === 'cash') lines.push('No card needed');
  if (method.confirmationTime === 'instant') lines.push('Instant confirmation');
  else if (method.confirmationTime === '5min') lines.push('Confirmed in ~5 minutes');
  else if (method.confirmationTime === '2hr') lines.push('Confirmed in ~2 hours');
  else if (method.confirmationTime === '24hr') lines.push('Confirmed within 24 hours');
  return lines.slice(0, 2).join(' · ');
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/recommend', (req, res) => {
  const { country, amount, available_methods } = req.body;
  if (!country || !amount) {
    return res.status(400).json({ error: 'country and amount are required' });
  }
  const validCountries = ['MX', 'CO', 'AR'];
  if (!validCountries.includes(country)) {
    return res.status(400).json({ error: 'country must be MX, CO, or AR' });
  }
  let methods = paymentMethods.filter(m => m.countries.includes(country));
  if (available_methods && available_methods.length > 0) {
    methods = methods.filter(m => available_methods.includes(m.id));
  }
  const scored = methods.map(m => ({
    ...m,
    score: scoreMethod(m, country, amount),
    explanation: getExplanation(m, country, amount, scoreMethod(m, country, amount))
  }));
  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3).map(m => ({
    id: m.id,
    name: m.name,
    type: m.type,
    confirmationTime: m.confirmationTime,
    score: m.score,
    explanation: m.explanation
  }));
  const all = scored.map(m => ({
    id: m.id,
    name: m.name,
    type: m.type,
    confirmationTime: m.confirmationTime,
    score: m.score
  }));
  res.json({ recommended: top3, all_methods: all });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Zenith API running on http://localhost:${PORT}`));
