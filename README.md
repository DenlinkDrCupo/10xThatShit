# AI for Business Owners — Course App

## Deploy in 5 minutes (free)

### Step 1 — Get your Anthropic API key
1. Go to console.anthropic.com
2. Sign in or create account
3. Click "API Keys" → "Create Key"
4. Copy the key (starts with sk-ant-)

### Step 2 — Deploy to Vercel (free)
1. Go to vercel.com and sign up with GitHub
2. Click "Add New Project"
3. Upload this folder OR push to a GitHub repo first
4. During setup, add this Environment Variable:
   - Name:  ANTHROPIC_API_KEY
   - Value: sk-ant-your-key-here
5. Click Deploy

### Step 3 — Your app is live
Vercel gives you a URL like: your-app.vercel.app
Share that URL with students who buy the course.

## To run locally first
```
npm install
ANTHROPIC_API_KEY=sk-ant-your-key npm run dev
```
Then open http://localhost:3000

## To add a paywall
Use Gumroad ($99 product) — when someone buys, send them the Vercel URL.
Or use Stripe + a simple password gate.

## Files
- pages/index.js     — the full course app
- pages/api/chat.js  — server-side API call (this is what fixes the mobile issue)
- package.json       — dependencies
