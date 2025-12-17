# ⚡ QUICK REFERENCE - Native Mobile Hackathon Cheatsheet

**Print this out or keep on phone!** 📱
**Platform:** React Native + Expo (NATIVE iOS + Android!)
**Sponsor:** Natively.dev (100% alignment! 🎯)

---

## 🎯 DIN ROLL: AI ENGINEER (Person 1)

**Branch:** `rickard/ai-integration`
**Din superkraft:** Claude Opus 4.5
**Platform:** Native Mobile (React Native + Expo)
**Kritisk deadline:** 1:00 - AI endpoint MÅSTE vara live

---

## ⏱️ DIN TIDSLINJE

```
0:00-0:15 | Setup (verifiera API key, skapa mappar)
0:15-1:00 | AI Level Generation endpoint ⚡ KRITISK
1:00-1:45 | Character Customization endpoint
1:45-2:15 | Difficulty Adaptation endpoint
2:15-2:30 | Polish, error handling, integration test
```

---

## 🚨 VIKTIGASTE KOMMANDONA

### Git Workflow

```bash
# Din branch
git checkout -b rickard/ai-integration

# Spara arbete (varje 15-20 min)
git add .
git commit -m "ai: beskrivning"
git push origin rickard/ai-integration

# Merge till main när klar
npm run build  # MÅSTE lyckas först!
git checkout main
git pull origin main
git merge rickard/ai-integration
git push origin main
```

### Development

```bash
# Kör Expo (öppnar QR code)
npx expo start

# Kör med tunnel (om WiFi krånglar)
npx expo start --tunnel

# Testa API endpoint (Backend API separat eller mock)
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-opus-4-5-20251101", "messages": [...]}'

# Deploy till Expo
npx expo publish

# Build APK/IPA (om tid finns)
eas build --platform android --profile preview
```

---

## 📋 AI FUNCTIONS DU SKA BYGGA

**📱 I React Native:** AI calls direkt från appen (no backend needed!)

### 1. Level Generation (DEADLINE 1:00)

```typescript
// src/api/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: 'sk-ant-api03-...',  // Din API key
});

export async function generateLevel(difficulty: string) {
  const prompt = `Generate a Christmas platformer level for MOBILE.

  Screen: 375px × 667px (iPhone size)
  Difficulty: ${difficulty}
  Touch controls: Tap to jump

  Return JSON with:
  - platforms: [{x, y, width, type}] (all within 0-375, 0-667)
  - gifts: [{x, y, value}] (exactly 10)
  - obstacles: [{x, y, type}]`;

  const message = await client.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const levelData = JSON.parse(message.content[0].text);
  return levelData;
}
```

**Usage i React Native:**
```typescript
// I GameScreen.tsx
const loadNewLevel = async () => {
  setLoading(true);
  const level = await generateLevel('medium');
  createPlatforms(level.platforms);
  createGifts(level.gifts);
  setLoading(false);
};
```

### 2. Character Customization

```typescript
// app/api/customize-character/route.ts
export async function POST(req: Request) {
  const { description } = await req.json();

  const prompt = `Create a playable character based on: "${description}"

  Return JSON with:
  - name: string
  - ability: string (one special power)
  - colors: {primary, secondary}`;

  const response = await askClaude(prompt);
  return Response.json({ character: JSON.parse(response) });
}
```

### 3. Difficulty Adaptation

```typescript
// app/api/adapt-difficulty/route.ts
export async function POST(req: Request) {
  const { performance } = await req.json();

  const prompt = `Player performance:
  - Deaths: ${performance.deaths}
  - Time: ${performance.time}
  - Gifts collected: ${performance.giftsCollected}

  Suggest next level difficulty adjustment.`;

  const response = await askClaude(prompt);
  return Response.json({ adjustment: JSON.parse(response) });
}
```

---

## 🔧 TROUBLESHOOTING

### API Key Error
```bash
# Check .env
cat .env | grep ANTHROPIC

# Should show:
ANTHROPIC_API_KEY=sk-ant-api03-sWHnlcd6Ev...
```

### Claude Too Slow (> 5 sec)
```typescript
// Add timeout + fallback
const FALLBACK_LEVEL = {
  platforms: [
    {x: 100, y: 500, width: 200, type: 'ground'},
    {x: 350, y: 400, width: 150, type: 'floating'}
  ],
  gifts: [{x: 250, y: 450, value: 10}]
};

try {
  const response = await Promise.race([
    askClaude(prompt),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    )
  ]);
  return response;
} catch {
  console.log('Using fallback level');
  return FALLBACK_LEVEL;
}
```

### Invalid JSON from Claude
```typescript
// Add validation
function validateLevel(level: any) {
  if (!level.platforms || !Array.isArray(level.platforms)) {
    return false;
  }
  // Check platforms are playable
  for (const p of level.platforms) {
    if (!p.x || !p.y || !p.width) return false;
    if (p.y < 0 || p.y > 600) return false;
  }
  return true;
}

// Use it:
const level = JSON.parse(response);
if (!validateLevel(level)) {
  return FALLBACK_LEVEL;
}
```

---

## 💬 KOMMUNIKATION

### Fråga Person 2 (Game Dev):
- "Vilka properties behöver platforms ha?"
- "Hur stora ska gaps mellan platforms vara (max)?"
- "Vilket JSON-format vill du ha?"

### Fråga Person 3 (Level Designer):
- "Hur renderar du platforms i Phaser?"
- "Vilka platform types finns (ground, floating, ice)?"

### Informera Person 5 (QA):
- Vid 1:00: "AI endpoint live nu, testa!"
- Vid 1:45: "Character customization klar"
- Vid 2:15: "Alla AI features done"

---

## 📞 NÖDSITUATION

### Build Är Trasig
```bash
# Hitta problemet
npm run build

# Om det är din kod:
git diff  # Se vad du ändrat
# Fixa felet
git add .
git commit -m "fix: build error"
```

### Merge Conflict
```bash
git merge main
# CONFLICT in file.ts

# Öppna file.ts, hitta:
<<<<<<< HEAD
din kod
=======
någon annans kod
>>>>>>> main

# Välj rätt version, spara
git add file.ts
git commit -m "fix: resolve conflict"
```

### Blockerad - Kan Inte Fortsätta
1. Använd fallback/mock data temporärt
2. Ropa till teamet i Discord: "Blockerad - behöver X"
3. Jobba på något annat meanwhile

---

## 🎤 PITCH NOTES (Om Du Presenterar AI-delen)

**30 sekunder - Explain AI Magic:**

"Varje spelomgång är unik tack vare Claude Opus 4.5:

1. **Level Generation** - AI skapar banor baserat på spelarens skicklighet
   [Visa demo: klicka Generate Level → banan visas]

2. **Character Customization** - Beskriv din karaktär, AI skapar den
   [Visa: 'En pingvin som älskar glass' → custom character]

3. **Difficulty Adaptation** - Spelet blir svårare/lättare beroende på hur du spelar
   [Visa metrics: Deaths, Time → justerad bana]

Detta är inte bara ett spel - det är ett spel som lär känna DIG."

---

## ✅ PRE-DEMO CHECKLIST (2:25 - 5 min före)

```bash
✅ API endpoints testad senaste 5 min
✅ Inga console errors
✅ Level generation < 3 sekunder
✅ Fallbacks funkar om API failar
✅ Exempel-prompts redo för demo
✅ Vet exakt vad jag ska säga

# Test alla endpoints:
curl -X POST http://localhost:3000/api/generate-level \
  -d '{"difficulty":"easy"}'

curl -X POST http://localhost:3000/api/customize-character \
  -d '{"description":"A penguin who loves ice cream"}'
```

---

## 🔥 CONFIDENCE BOOSTERS

**Remember:**
- Du har Claude Opus 4.5 (BÄSTA modellen)
- Du har full dokumentation
- Du har testat API:n igår
- Din roll är KRITISK men DOABLE
- Time multiplier: Du jobbar 8-15x snabbare än normalt

**Mantran:**
- "2.5h med Claude = 50h solo coding"
- "Build → Test → Merge → Repeat"
- "Kommunicera tidigt och ofta"
- "Fallbacks för allt"

---

## 📱 EMERGENCY CONTACTS

**Person 2 (Game Dev):** Samarbetar mest med dig
**Person 5 (QA/Deploy):** Koordinator - ropa om blockers

**Discord Channels:**
- #git-updates
- #merge-requests
- #blockers

---

## 🎯 SUCCESS = 3 THINGS

1. ✅ AI level generation funkar vid 1:00
2. ✅ Minst 1 AI feature imponerar under demo
3. ✅ Inga crashes when judges testa

**If alla 3 = WIN** 🏆

---

## 💾 BACKUP PLAN

**Om Claude API dör:**
```typescript
// Pre-generera 5 levels vid startup
const CACHE = {
  levels: [level1, level2, level3, level4, level5]
};

// Returnera random från cache
return CACHE.levels[Math.floor(Math.random() * 5)];
```

**Om du är försenad:**
- Skippa Character Customization (nice-to-have)
- Skippa Difficulty Adaptation (nice-to-have)
- Fokusera 100% på Level Generation (MUST-HAVE)

---

## 🚀 FINAL WORDS

**Du är AI Engineer.**
**Du har den viktigaste rollen.**
**Spelet är unikt TACK VARE DIG.**

**Go make magic happen! 🔥🎮**

---

**Print Date:** 2025-12-16
**Hackathon Date:** 2025-12-18
**Location:** Stockholm
**Team:** 5 personer
**Your Power Level:** MAXIMUM 💪
