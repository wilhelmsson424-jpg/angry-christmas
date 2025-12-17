# ⚡ 5-Minute Quick Start

## Before Hackathon (Do this TODAY)

```bash
cd ~/hackathon-starter-kit
npm install
cp .env.example .env
```

Add your API key to `.env`:
```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
```

Test it works:
```bash
npm run dev
```

Visit http://localhost:3000 - you should see the starter page.

## At Hackathon (18:00)

### Minute 0-5: Setup

```bash
cd ~/hackathon-starter-kit
npm run dev

# In another terminal:
git init
git add .
git commit -m "Initial setup"
```

### Minute 5-15: Customize

**1. Update app name** (`app/layout.tsx` line 6-7):
```typescript
title: 'Santa's AI Matchmaker',  // Your app name
description: 'AI-powered Secret Santa gift matcher',
```

**2. Update system prompt** (`app/page.tsx` line 32):
```typescript
systemPrompt: 'You are a Secret Santa gift expert. Help users find perfect gifts based on interests and budget. Always provide 3-5 specific gift suggestions with prices.',
```

**3. Change colors** (`tailwind.config.js` line 13-23):
```javascript
colors: {
  primary: {
    500: '#DC2626', // Christmas red
    600: '#B91C1C',
    700: '#991B1B',
  },
}
```

**4. Update heading** (`app/page.tsx` line 46-47):
```tsx
<h1 className="text-4xl font-bold text-gray-900 mb-4">
  Santa's AI Matchmaker 🎅
</h1>
```

### Minute 15-120: Build Your Feature

Use Claude Code agents for everything:

```bash
"Create a form component for Secret Santa with fields: name, interests, budget, age"

"Write a Claude system prompt that generates gift suggestions based on interests and budget constraints"

"Add Christmas snow animation to the background using CSS"

"Debug this API call - it's not returning data"
```

### Minute 120-150: Polish

```bash
"Add loading spinner animation"
"Make this mobile responsive"
"Add error handling for failed API calls"
"Create festive Christmas color scheme"
```

### Minute 150-165: Deploy

```bash
git add .
git commit -m "Final version"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main

# Deploy to Vercel
vercel --prod
```

In Vercel dashboard: Add `ANTHROPIC_API_KEY` environment variable

### Minute 165-180: Demo Prep

Practice your 2-minute pitch:
1. Problem (15s)
2. Solution (30s)
3. Live demo (60s)
4. Tech (15s)

## Quick Reference

### Call Claude AI

```typescript
const res = await fetch('/api/ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: userInput,
    systemPrompt: 'Your system prompt here'
  })
});
const data = await res.json();
console.log(data.response);
```

### Add Loading State

```tsx
const [loading, setLoading] = useState(false);

// Before API call:
setLoading(true);

// After API call:
setLoading(false);

// In JSX:
{loading && <p>Loading...</p>}
```

### Show Response

```tsx
const [result, setResult] = useState('');

// After getting response:
setResult(data.response);

// In JSX:
{result && (
  <div className="bg-white p-6 rounded-lg">
    {result}
  </div>
)}
```

## Emergency Checklist (30 min before deadline)

- [ ] App runs on localhost
- [ ] Main feature works
- [ ] Deployed to Vercel
- [ ] ANTHROPIC_API_KEY added to Vercel
- [ ] Tested deployed version
- [ ] Screenshot/video backup
- [ ] 2-min pitch ready
- [ ] Git committed

## Help!

**"npm install fails"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"API not working"**
- Check .env file has ANTHROPIC_API_KEY
- Restart dev server
- Check API key is valid

**"Vercel deploy fails"**
- Check all files committed to git
- Ensure package.json has all dependencies
- Add env var in Vercel dashboard

**"Everything is broken"**
- Commit current state: `git add . && git commit -m "backup"`
- Simplify to minimum working version
- Focus on ONE feature working perfectly

## Remember

✅ Working simple > Broken complex
✅ Demo > Documentation
✅ Ship > Perfect
✅ Have fun! 🎄

You got this! 🚀
