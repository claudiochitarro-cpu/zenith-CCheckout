# Zenith Checkout — Payment Method Recommender

A full-stack payment method recommender built for Zenith Electronics, powered by Yuno.

## How to Run

### 1. Start the backend
```bash
cd backend
node index.js
```
Backend runs on http://localhost:3001

### 2. Open the frontend
Open `frontend/index.html` in your browser.

## Recommendation Algorithm

The engine scores each payment method using three factors:

1. **Base success rate** — each method has a historical success rate (e.g. OXXO: 95%)
2. **Country boost** — local methods get a bonus score per country (e.g. SPEI +10 in Mexico, PSE +12 in Colombia, Rapipago +14 in Argentina)
3. **Amount penalty** — high value purchases (>$200) penalize cash methods (-20) since customers prefer confirmation for large amounts

The top 3 methods by final score are returned with dynamic explanations.

## Architecture

- **Backend**: Node.js + Express REST API (`/recommend` endpoint)
- **Frontend**: Vanilla HTML/CSS/JS single page checkout
- **Data**: 14 payment methods across MX, CO, AR with realistic success rates

## Trade-offs & What I'd Improve

- Would add a real database (PostgreSQL) with actual transaction history
- Would add customer history personalization
- Would add A/B testing simulation
- Would containerize with Docker for easier setup
