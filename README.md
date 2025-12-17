# 🎮 Agentic Jul Hackathon - Starter Kit

**Prepared for:** Agentic Jul 2025-12-18 | Stockholm
**Team Size:** 5 personer | **Time:** 2h 45min
**AI Power:** Claude Opus 4.5 (Best Model Available)

---

## 🎯 HACKATHON IDEAS - READY TO BUILD

### ⭐⭐⭐⭐⭐ PRIMARY IDEA: Grinch's Lost Gifts (NATIVE MOBILE GAME!)

**The Winning Idea** - See `GRINCH_GAME_IDEA.md` for complete guide

**Pitch:** "Native mobile Christmas platformer där Claude Opus 4.5 genererar unika spelbanor, anpassar karaktärer, och justerar svårighetsgrad i realtid - på iOS OCH Android samtidigt!"

**Why This DOMINATES:**
- ✅ **NATIVE MOBILE** (iOS + Android) - inte web!
- ✅ **100% SPONSOR ALIGNMENT** - Natively.dev bygger exakt detta!
- ✅ AI är KÄRNAN (level generation, character customization, difficulty)
- ✅ Visuellt imponerande på mobil + roligt att demoa
- ✅ Realistisk scope för 2.5h med 5 personer (time multiplier!)
- ✅ Baserat på vinnande hackathon-mönster
- ✅ Christmas theme + gaming + mobile = brett appeal

**Tech Stack:**
- 📱 **React Native + Expo** (NATIVE iOS + Android!)
- react-native-game-engine + matter.js (2D physics)
- Claude Opus 4.5 för AI-features
- expo-av för sound
- Expo Publish deployment (instant på mobil!)

**🎯 Sponsor Advantage:**
Natively.dev (huvudsponsor) = AI-powered mobile app builder
→ They build EXACTLY React Native + Expo apps
→ Judges will LOVE that you used their stack
→ Native mobile > Web apps = högre poäng

**5-Person Team Breakdown:**
1. **Rickard** - AI Engineer (Claude integration)
2. **Person 2** - Mobile Game Developer (React Native + matter.js)
3. **Person 3** - Level Designer + Assets
4. **Person 4** - UI/UX + Sound Designer
5. **Person 5** - QA + Deployment + Demo Prep

📖 **Full Documentation:**
- `GRINCH_GAME_IDEA.md` - Complete game concept
- `EXPO_SETUP.md` - React Native + Expo mobile setup
- `TEAM_ROLES.md` - Detailed role breakdown

---

### ⭐⭐⭐⭐ BACKUP IDEA: Secret Santa AI Matchmaker

**Alternative App Idea** - See `SECRET_SANTA_IDEA.md` for complete guide

**Pitch:** "AI-driven Secret Santa som skapar perfekta matchningar baserat på intressen och föreslår personliga julklappar"

**Note:** Kan fungera men är mer nischad för svensk marknad. Grinch-spelet har bredare appeal.

**Tech Stack:**
- Next.js 14 + React
- Claude Opus 4.5
- Email integration
- PDF generation

📖 **Full Documentation:** `SECRET_SANTA_IDEA.md`

---

## ⚡ QUICK START

This starter kit is a **generic boilerplate** for building AI-powered apps quickly. Pre-configured for Claude Opus 4.5 integration.

### ✅ What's Included (Saves ~30 minutes)

- Next.js 14 + TypeScript + Tailwind CSS
- Claude AI API integration (generic wrapper)
- Reusable UI components (AIInput, AIResponse)
- API route for AI requests
- Environment configuration
- Vercel deployment config
- Professional project structure

### ❌ What's NOT Included (You Must Build)

- Domain-specific logic (Christmas features, etc.)
- Custom UI for your specific app
- Business logic
- Data models
- Styling/theming for your idea

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use for Your Hackathon Project

### Step 1: Customize the System Prompt

In `app/page.tsx`, change the system prompt to match your use case:

```typescript
systemPrompt: 'You are a Secret Santa gift matcher. Help users find perfect gifts based on interests and budget.'
```

### Step 2: Modify the UI

Replace the generic UI in `app/page.tsx` with your custom design:

```tsx
// Add your custom form fields
<input type="number" placeholder="Budget" />
<input type="text" placeholder="Recipient interests" />
```

### Step 3: Add Your Logic

Create custom API routes or client-side logic:

```typescript
// app/api/match-gifts/route.ts
export async function POST(request: NextRequest) {
  // Your custom gift matching logic here
}
```

### Step 4: Style It

Update Tailwind colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#DC2626', // Christmas red
  },
}
```

## Architecture

```
hackathon-starter-kit/
├── app/
│   ├── api/ai/          # Generic AI API route
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (CUSTOMIZE THIS)
│   └── globals.css      # Global styles
├── components/
│   ├── AIInput.tsx      # Reusable AI input component
│   └── AIResponse.tsx   # Reusable AI response display
├── lib/
│   └── claude.ts        # Claude API wrapper (generic)
└── public/              # Static assets
```

## Key Files to Customize

1. **app/page.tsx** - Main UI and logic
2. **lib/claude.ts** - Tweak AI parameters if needed
3. **tailwind.config.js** - Theme colors
4. **components/** - Add custom components here

## Claude API Usage

### Simple Prompt

```typescript
import { askClaude } from '@/lib/claude';

const response = await askClaude(
  'Match a gift for someone who loves coding',
  'You are a gift expert'
);
```

### Conversation

```typescript
import { sendToClaude } from '@/lib/claude';

const messages = [
  { role: 'user', content: 'I need a gift for my mom' },
  { role: 'assistant', content: 'Tell me about her interests' },
  { role: 'user', content: 'She loves gardening' },
];

const response = await sendToClaude(messages);
```

### Streaming (Real-time)

```typescript
import { streamClaude } from '@/lib/claude';

await streamClaude(
  [{ role: 'user', content: 'Generate a poem' }],
  {},
  (chunk) => {
    console.log('Received:', chunk);
    // Update UI with each chunk
  }
);
```

## Deploy to Vercel (5 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add ANTHROPIC_API_KEY
```

Or use the Vercel dashboard:
1. Push to GitHub
2. Import project in Vercel
3. Add ANTHROPIC_API_KEY in settings
4. Deploy

## Tips for Hackathon Success

### Speed > Perfection
- Use this template to save 30min setup time
- Focus on 1 killer feature
- Make it work, then make it pretty

### Leverage Claude Code Agents
```bash
# During hackathon, use agents heavily:
"Create a Christmas-themed UI component for gift matching"
"Optimize this Claude prompt for better gift suggestions"
"Debug this API route"
```

### Common Patterns

**Form + AI Response:**
```tsx
const [result, setResult] = useState('');

const handleSubmit = async (formData) => {
  const res = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({
      prompt: `Generate gift ideas for: ${formData.interests}`,
      systemPrompt: 'You are a gift expert...'
    })
  });
  const data = await res.json();
  setResult(data.response);
};
```

**Multi-step Flow:**
```tsx
const [step, setStep] = useState(1);
const [data, setData] = useState({});

// Step 1: Collect interests
// Step 2: Claude generates ideas
// Step 3: User selects
// Step 4: Claude refines
```

## Troubleshooting

**Error: "API key not found"**
- Check `.env` file exists
- Verify `ANTHROPIC_API_KEY` is set
- Restart dev server

**Error: "Module not found"**
```bash
npm install
```

**Styling not working**
- Check Tailwind is configured
- Verify `globals.css` imports Tailwind

## License

MIT - Use freely for hackathons

## Support

This is a generic template. For Claude AI help:
- Docs: https://docs.anthropic.com
- API Reference: https://docs.anthropic.com/en/api

---

## 📚 COMPLETE DOCUMENTATION INDEX

### 🎮 Game Development Guides (NATIVE MOBILE!)
- **`GRINCH_GAME_IDEA.md`** - Complete game concept, AI features, team roles, minute-by-minute schedule
- **`EXPO_SETUP.md`** - 📱 **CRITICAL:** React Native + Expo mobile setup guide (READ THIS FIRST!)
- **`TEAM_ROLES.md`** - Detailed responsibilities for all 5 team members with exact tasks
- **`GITHUB_TEAM_GUIDE.md`** - Git workflow, branching strategy, collaboration best practices

### 💡 Strategic Planning
- **`CLAUDE_ADVANTAGE.md`** - Understanding the time multiplier effect (2.5h = 50-100h human work)
- **`IDEA_SELECTOR.md`** - 7 evaluated ideas with scoring matrix and feature capacity test

### 🎅 Alternative Ideas
- **`SECRET_SANTA_IDEA.md`** - Complete backup plan for Secret Santa AI Matchmaker

### ⚡ Activation & Readiness
- **`/activate-superpowers`** - Slash command to verify hackathon readiness (Combat Readiness Score)
- **`activate-superpowers.sh`** - Comprehensive system check script
- **`~/hackathon-checklist.txt`** - Generated checklist after running activation script

---

## 🚀 PRE-HACKATHON CHECKLIST

### Innan Onsdag (Dec 18)

**Technical Setup:**
- [ ] Kör `/activate-superpowers` kommando
- [ ] Verifiera Combat Readiness Score ≥ 90/100
- [ ] Testa Claude API key med Opus 4.5
- [ ] Installera dependencies (`npm install`)
- [ ] Testa local build (`npm run build`)

**Strategic Prep:**
- [ ] Läs `GRINCH_GAME_IDEA.md` (din huvudidé)
- [ ] Läs `CLAUDE_ADVANTAGE.md` (förstå din superkraft)
- [ ] Läs `TEAM_ROLES.md` (förstå din roll som AI Engineer)
- [ ] Öva 2-minuters pitch (se DEMO_SCRIPT i game guide)
- [ ] Ha elevator pitch redo för när du pitchar idén till teamet

**GitHub Prep:**
- [ ] Läs `GITHUB_TEAM_GUIDE.md`
- [ ] Ha GitHub account klar
- [ ] Förstå branch workflow
- [ ] Vet hur man hanterar merge conflicts

**Day-Of Essentials:**
- [ ] Laptop fully charged
- [ ] Claude API key sparad (säkert ställe)
- [ ] Denna README bookmarkad
- [ ] Pitch script i huvudet
- [ ] Confidence level: 🔥🔥🔥

---

## 🎯 HACKATHON DAY WORKFLOW

### Minut 0-15: Team Assembly
1. Pitcha Grinch-idén (visa `GRINCH_GAME_IDEA.md`)
2. Fördela roller enligt `TEAM_ROLES.md`
3. Sätt upp GitHub repo (följ `GITHUB_TEAM_GUIDE.md`)
4. Alla klonar, kör `npm install`

### Minut 15-135: Development Sprint
- **Person 1 (DIG)**: Följ din timeline i `TEAM_ROLES.md` → AI Engineer section
- Merge till main enligt Integration Schedule
- Kommunicera varje timme med teamet

### Minut 135-150: Integration & Testing
- QA testar allt
- Bug fixes
- Final polish

### Minut 150-165: Deployment & Demo Prep
- Deploy to Vercel
- Ta screenshots
- Rehearse pitch

### Total: 2h 45min → DONE! 🎉

---

## ⚡ SUPERPOWERS ACTIVATED

**Din Competitive Advantage:**
- 🤖 Claude Opus 4.5 (bästa AI-modellen)
- ⏱️ Time Multiplier: 8-15x faster än humans
- 📖 Complete documentation för allt
- 🎯 Pre-validated winning strategy
- 👥 Clear team coordination

**Remember:**
- 2.5h med Claude ≠ 2.5h human coding
- Var ambitiös, inte konservativ
- Kommunicera ofta med teamet
- Testa innan merge till main
- Ha KUL! Detta är DITT element 🔥

---

**LYCKA TILL PÅ ONSDAG! LÅT OSS VINNA DETTA! 🎮🎄🏆**
