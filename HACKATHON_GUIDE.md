# 🎯 Hackathon Strategy Guide

## Before You Start (30 minutes before hackathon)

### 1. Test Everything
```bash
cd hackathon-starter-kit
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
# Visit http://localhost:3000 and test the basic flow
```

### 2. Pick Your Idea

**From brainstorm session, top 3:**

1. **Secret Santa Organizer** - Best chance to win
2. **Christmas Card AI Studio** - Most visual
3. **Smart Julbord Planner** - Most Swedish

### 3. Time Budget (2h 45min total)

- **0-15min**: Team intro + idea finalization
- **15-30min**: Setup + architecture planning
- **30min-2h**: Core development
- **2h-2h 30min**: Polish + styling
- **2h 30min-2h 45min**: Deploy + demo prep

## During Hackathon

### Minute 0-15: Team Planning

**On a whiteboard/doc, define:**
```
App Name: [e.g., "Santa's AI Matchmaker"]
One-sentence pitch: [e.g., "AI-powered Secret Santa that matches perfect gifts"]
Core feature: [e.g., "Input interests → AI suggests gifts"]
Tech stack: Next.js + Claude + Vercel
```

### Minute 15-30: Technical Setup

**Terminal 1:**
```bash
cd ~/hackathon-starter-kit
npm install
npm run dev
```

**Terminal 2:**
```bash
git init
git add .
git commit -m "Initial setup from starter kit"
```

**Update immediately:**
1. Change app name in `app/layout.tsx`
2. Update system prompt in `app/page.tsx`
3. Customize colors in `tailwind.config.js` (Christmas theme)

### Minute 30-120: Development Phase

**Use Claude Code agents aggressively:**

```bash
# For UI components:
"Create a festive Christmas-themed form component with snow animation for collecting Secret Santa participant data"

# For AI logic:
"Write a Claude prompt that analyzes participant interests and suggests 5 gift ideas under a specific budget"

# For styling:
"Add Christmas theme styling with red/green colors, snow animations, and festive fonts to this component"

# For debugging:
"Debug this API route - it's not returning the expected response"
```

**Parallel work (if team of 5):**
- Person 1-2: Frontend UI
- Person 3: Claude AI prompts + logic
- Person 4: Data handling + state
- Person 5: Deployment prep + README

### Minute 120-150: Polish Phase

**Critical tasks:**
```bash
# 1. Add loading states
<button disabled={loading}>
  {loading ? 'Processing...' : 'Submit'}
</button>

# 2. Error handling
try {
  // API call
} catch (error) {
  setError(error.message);
}

# 3. Basic styling
- Consistent spacing
- Christmas colors
- Readable fonts
- Mobile responsive

# 4. Test critical path
- Can user complete main flow?
- Does AI respond correctly?
- Any console errors?
```

### Minute 150-165: Deploy + Demo Prep

**Deploy to Vercel:**
```bash
# Push to GitHub
git add .
git commit -m "Final version"
git push origin main

# Deploy
vercel --prod
# Add ANTHROPIC_API_KEY in Vercel dashboard
```

**Prepare 2-minute demo:**
```
1. Problem (15 sec): "Secret Santa gift matching is hard"
2. Solution (30 sec): "Our AI analyzes interests and suggests perfect gifts"
3. Demo (60 sec): Live demo of core flow
4. Tech (15 sec): "Built with Claude AI and Next.js"
```

## Emergency Protocols

### If Things Break (15 min before deadline)

**Priority 1: Make SOMETHING work**
```tsx
// Simplest possible version:
<form onSubmit={async (e) => {
  e.preventDefault();
  const res = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({
      prompt: formData,
      systemPrompt: 'You are helpful'
    })
  });
  const data = await res.json();
  alert(data.response);
}}>
  <input name="prompt" />
  <button>Submit</button>
</form>
```

**Priority 2: Deploy current state**
```bash
vercel --prod
# Better to have something deployed than nothing
```

**Priority 3: Prepare backup demo**
- Screenshot of working localhost
- Explain what WOULD happen
- Show code architecture

## Demo Tips

### What Jury Looks For

1. **Working demo** (most important)
2. **Clear problem/solution**
3. **Creative use of AI**
4. **Polish + design**
5. **Technical complexity**

### Demo Script Template

```
"Hi, I'm [name] and we built [app name].

[SHOW PROBLEM]
'Have you ever struggled with Secret Santa? You don't know what to buy, you're on a budget, and you want it to be personal.'

[SHOW SOLUTION]
'Our AI solves this. Watch:'

[LIVE DEMO - 60 SECONDS]
1. Enter participant name + interests
2. Set budget
3. Click "Get Gift Ideas"
4. Show AI-generated suggestions with reasoning
5. One-click add to shopping list

[TECH HIGHLIGHT]
'We used Claude AI to analyze interests, match personality profiles, and generate creative gift ideas with budget optimization.'

[CLOSE]
'Perfect Secret Santa gifts in 30 seconds. Thank you!'
```

## Common Pitfalls to Avoid

❌ Building too many features → Focus on 1 killer feature
❌ Complex database setup → Use state or localStorage
❌ New tech you don't know → Stick to the template
❌ No commits → Commit every 30 minutes
❌ Waiting too long to deploy → Deploy at 2h mark as backup
❌ No error handling → Users WILL break things
❌ Ignoring mobile → Test on phone

## Winning Formula

```
Simple idea + Polished execution + Working demo > Complex idea + Broken code

AI integration that WORKS > AI integration with bells and whistles that crashes

Visual appeal + User value > Technical complexity with bad UX
```

## Quick Wins

**Add these for easy points:**

1. **Loading animations**
```tsx
<div className="animate-pulse">AI is thinking...</div>
```

2. **Success states**
```tsx
{success && <div className="text-green-600">✓ Generated!</div>}
```

3. **Christmas theme**
```css
background: linear-gradient(to bottom, #DC2626, #059669);
```

4. **Responsive design**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

5. **Smooth transitions**
```css
transition-all duration-300
```

## Remember

- **Demo > Documentation**
- **Working > Perfect**
- **Ship > Polish**
- **Fun > Stress**

You've got this! 🎄🚀
