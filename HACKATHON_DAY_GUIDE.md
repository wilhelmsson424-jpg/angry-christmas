# 📋 STEG-FÖR-STEG GUIDE - ONSDAG 18 DECEMBER

**Din Roll:** AI Engineer (Person 1)
**Platform:** React Native + Expo (NATIVE iOS + Android!)
**Tid:** 2 timmar 45 minuter
**Sponsor:** Natively.dev (100% alignment!)

---

## 🏁 FÖRE HACKATHON STARTAR

### ☕ Morgon Prep (Hemma - 15 min):

1. **Ladda laptop till 100%**
2. **Ha dessa filer öppna på laptop:**
   - `EXPO_SETUP.md`
   - `QUICK_REFERENCE.md`
   - `GRINCH_GAME_IDEA.md`
   - `HACKATHON_DAY_GUIDE.md` (denna fil!)
3. **Verifiera API key:**
   ```bash
   echo $ANTHROPIC_API_KEY
   # Eller ha den sparad i säker fil
   ```
4. **Ha Expo Go installerat på telefon**
5. **Frukost + kaffe** ☕

---

## ⏰ MINUT 0-5: TEAM ASSEMBLY & PITCH

### Din Uppgift:

**1. Pitcha Idén Till Teamet (2 min):**
```
"Hej alla! Jag har förberett något.

Vi ska bygga ett NATIVE MOBILE GAME - Grinch's Lost Gifts.
2D platformer med AI-genererade banor.

Varför mobil? Huvudsponsorn Natively.dev bygger
mobile apps med AI. Vi använder DERAS stack:
React Native + Expo.

Det är en native iOS + Android app - inte web.
Perfekt sponsor alignment.

Jag har komplett dokumentation här *visa laptop*
och jag kan AI-delen. Vem vill göra vad?"
```

**2. Fördela Roller (2 min):**
```
Person 1 (DIG):   AI Engineer
Person 2:         Mobile Game Developer
Person 3:         Level Designer + Assets
Person 4:         UI/UX + Sound
Person 5:         QA + Deploy + Demo Prep

Alla OK? Perfekt!
```

**3. Bestäm GitHub (1 min):**
```
Vem har GitHub account?
Person X: Skapa repo "grinch-game-agentic-jul"
Public, Add README, .gitignore: Node
```

---

## ⏰ MINUT 5-15: TECHNICAL SETUP

### ALLA GÖR DETTA SAMTIDIGT:

**Person X (den som har GitHub):**
```bash
# 1. Skapa Expo project
cd ~/Desktop
npx create-expo-app grinch-game --template blank

cd grinch-game

# 2. Installera dependencies
npm install react-native-game-engine matter-js expo-av @expo/vector-icons @anthropic-ai/sdk @react-navigation/native

# 3. Git setup
git init
git remote add origin https://github.com/[username]/grinch-game-agentic-jul.git
git add .
git commit -m "Initial Expo setup"
git push -u origin main

# 4. Lägg till alla som collaborators på GitHub
# Settings → Collaborators → Add people
```

**Alla Andra (samtidigt):**
```bash
# Vänta 5 min tills Person X pushat

# Klona repo
cd ~/Desktop
git clone https://github.com/[username]/grinch-game-agentic-jul.git
cd grinch-game-agentic-jul

# Installera
npm install

# Testa Expo
npx expo start
```

**ALLA SKA NU:**
- Ha projektet lokalt
- Kunna köra `npx expo start`
- Scanna QR code med telefon
- Se "Open up App.js..." på telefon

**✅ CHECKPOINT:** Alla har appen på sina telefoner!

---

## ⏰ MINUT 15-30: SKAPA BRANCHES & BÖRJA

### DIN UPPGIFT (Person 1 - AI Engineer):

**1. Skapa Din Branch (1 min):**
```bash
git checkout -b rickard/ai-integration
git push -u origin rickard/ai-integration
```

**2. Skapa Mappar (1 min):**
```bash
mkdir -p src/api
mkdir -p src/utils
touch src/api/claude.ts
touch .env
```

**3. Lägg Till API Key (.env):**
```bash
# .env
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-sWHnlcd6Ev...
```

**4. Börja Koda (13 min - DU HAR TID!):**

```typescript
// src/api/claude.ts
import Anthropic from '@anthropic-ai/sdk';
import Constants from 'expo-constants';

const client = new Anthropic({
  apiKey: Constants.expoConfig?.extra?.anthropicApiKey ||
          process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
});

export async function generateLevel(difficulty: 'easy' | 'medium' | 'hard') {
  const prompt = `Generate a Christmas platformer level for mobile game.

Screen size: 375px wide × 667px tall (iPhone size)
Difficulty: ${difficulty}
Controls: Touch screen (tap to jump)

Return JSON with this EXACT structure:
{
  "platforms": [
    {"x": number, "y": number, "width": number, "height": 20, "type": "ground|floating|ice"}
  ],
  "gifts": [
    {"x": number, "y": number, "value": 10}
  ],
  "enemies": [
    {"type": "snowball", "x": number, "y": number, "speed": 1.5, "range": 100}
  ]
}

RULES:
- All coordinates within screen bounds (0-375, 0-667)
- Platforms must be reachable by jumping (max gap 120px vertically)
- Place exactly 10 gifts
- At least 8 platforms total
- Ground platform at bottom (y=617, width=375)
- Make it progressively harder left to right`;

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }

    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Level generation failed:', error);
    // Fallback level
    return getFallbackLevel(difficulty);
  }
}

function getFallbackLevel(difficulty: string) {
  return {
    platforms: [
      { x: 0, y: 617, width: 375, height: 50, type: 'ground' },
      { x: 100, y: 500, width: 120, height: 20, type: 'floating' },
      { x: 250, y: 400, width: 100, height: 20, type: 'floating' },
    ],
    gifts: [
      { x: 150, y: 460, value: 10 },
      { x: 280, y: 360, value: 10 },
    ],
    enemies: [],
  };
}

export async function customizeCharacter(description: string) {
  const prompt = `Create a character for a Christmas game based on: "${description}"

  Return JSON:
  {
    "name": "character name",
    "color": "#hex color",
    "ability": "special power description"
  }`;

  const message = await client.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return JSON.parse(content.text);
  }
}
```

**5. Testa API (5 min):**
```typescript
// Skapa test fil: src/api/test.ts
import { generateLevel } from './claude';

async function test() {
  console.log('Testing level generation...');
  const level = await generateLevel('easy');
  console.log('Generated level:', JSON.stringify(level, null, 2));
}

test();
```

```bash
# Kör test
npx ts-node src/api/test.ts

# Borde se: Generated level: { platforms: [...], gifts: [...] }
```

**✅ CHECKPOINT 0:30:** Din AI API funkar!

---

## ⏰ MINUT 30-60: VÄNTA PÅ PERSON 2 + FÖRBÄTTRA AI

### Vad Händer Nu:

**Person 2** bygger basic game loop (player movement, physics)
**Person 3** hittar assets
**Person 4** börjar UI mockups
**Person 5** observerar, testar

### DU (30 minuter extra tid):

**Option A: Förbättra Level Generation**
```typescript
// Lägg till validation
function validateLevel(level: any): boolean {
  // Check platforms exist
  if (!level.platforms || level.platforms.length < 5) return false;

  // Check all platforms within bounds
  for (const p of level.platforms) {
    if (p.x < 0 || p.x > 375 || p.y < 0 || p.y > 667) return false;
  }

  // Check gifts exist
  if (!level.gifts || level.gifts.length < 8) return false;

  return true;
}
```

**Option B: Pre-generate Levels (Cache)**
```typescript
// Pre-generate 3 levels at startup
const [cachedLevels, setCachedLevels] = useState<any[]>([]);

useEffect(() => {
  async function pregenerate() {
    const easy = await generateLevel('easy');
    const medium = await generateLevel('medium');
    const hard = await generateLevel('hard');
    setCachedLevels([easy, medium, hard]);
  }
  pregenerate();
}, []);
```

**Option C: Hjälp Person 2**
```
"Behöver du hjälp? Jag kan para med dig"
```

**💡 VIKTIGT:** Commit + push varje 20 min!
```bash
git add .
git commit -m "ai: level generation working"
git push origin rickard/ai-integration
```

---

## ⏰ MINUT 60 (1:00): KRITISK DEADLINE!

### DU MÅSTE MERGE TILL MAIN:

**1. Testa En Sista Gång:**
```bash
npm run test  # Om ni har tests
# Eller kör manually i test.ts
```

**2. Merge Till Main:**
```bash
# Hämta senaste main
git checkout main
git pull origin main

# Merge din branch
git merge rickard/ai-integration

# Testa att det funkar
npx expo start
# → Scan QR → appen ska funka

# Push
git push origin main
```

**3. Annonsera Till Teamet:**
```
"AI level generation är merged till main!
Person 2 & 3: Ni kan nu använda generateLevel() i er kod"
```

**✅ CHECKPOINT 1:00:** AI i main, andra kan använda det!

---

## ⏰ MINUT 60-105: CHARACTER CUSTOMIZATION

### Nu Bygger Du Feature 2:

**1. Skapa Component (15 min):**
```typescript
// src/components/CharacterCustomizer.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { customizeCharacter } from '../api/claude';

export function CharacterCustomizer({ onComplete }: { onComplete: (char: any) => void }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) return;

    setLoading(true);
    try {
      const character = await customizeCharacter(description);
      onComplete(character);
    } catch (error) {
      console.error('Character generation failed:', error);
      // Use default
      onComplete({
        name: 'Grinch',
        color: '#00FF00',
        ability: 'Quick jumper'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Customize Your Character
      </Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Describe your character... (e.g., 'A penguin who loves ice cream')"
        style={{
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleGenerate}
        disabled={loading || !description.trim()}
        style={{
          backgroundColor: loading ? '#CCC' : '#DC2626',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
            Generate Character
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
```

**2. Testa (5 min)**

**3. Commit + Push (5 min)**

---

## ⏰ MINUT 105-135: DIFFICULTY ADAPTATION

### Feature 3 (Om Tid Finns):

**Annars:** Polish level generation, fix bugs, hjälp andra

---

## ⏰ MINUT 135-150: INTEGRATION & TESTING

### Teamet Samarbetar:

**DIN UPPGIFT:**
```bash
# 1. Pull senaste main
git checkout main
git pull origin main

# 2. Testa ALLT
npx expo start
# → Test på mobil:
#    - Generate level
#    - Character customization
#    - Gameplay funkar?

# 3. Hitta buggar
# → Fixa direkt på main (små fixes)
# → Eller skapa snabb branch för större fixes

# 4. Koordinera med Person 5 (QA)
"Här är AI-features som behöver testas..."
```

---

## ⏰ MINUT 150-165: DEPLOYMENT & DEMO PREP

### Person 5 Deployar:

**DU HJÄLPER TILL:**

**1. Verifiera AI Endpoints (5 min):**
```bash
# Test i deployed version
# → Generate level funkar?
# → < 5 sekunder response?
# → Fallback funkar om fail?
```

**2. Prepare Demo Data (5 min):**
```typescript
// Exempel prompts för demo:
const demoPrompts = [
  "A ninja penguin",
  "Santa's helper elf",
  "Grinch's cousin",
];

// Test dem alla → välj bästa för demo
```

**3. Rehearse (5 min):**
```
Du säger under demo:
"Every level is unique, generated by Claude Opus 4.5.
*Click Generate New Level*
*Wait 3 seconds*
*New level appears*
See? Completely different layout. Infinite replayability."
```

---

## ⏰ MINUT 165: DEMO TIME! 🎤

### Du Står Bredvid Person Som Presenterar:

**När de nämner AI:**
```
Presenter: "...and every level is AI-generated"

*Du visar telefon*
"Let me show you live. *Tap Generate Level button*
*Wait 3 seconds*
*New level appears*

Every single platform, gift, and enemy placement
is created by Claude Opus 4.5 in real-time.

No two playthroughs are the same.

This is what makes it infinitely replayable."
```

**Judges Frågar:** "How does the AI work?"

**DU SVARAR:**
```
"We use Claude Opus 4.5 with carefully engineered prompts.

The AI understands:
- Mobile screen constraints (375x667)
- Platform game physics (max jump height)
- Difficulty progression
- Player psychology

It generates valid, playable levels in under 3 seconds.

We also added validation and fallbacks for reliability.

And most importantly - we built this on React Native + Expo,
the same stack that Natively.dev uses. *points at sponsors*

Native mobile. AI-driven. Built in 2.5 hours."
```

**Judges:** 🤯💥🏆

---

## 📋 QUICK CHEAT SHEET (Ha På Telefon)

```
0-5:     Pitcha idé, fördela roller
5-15:    Setup Expo projekt, alla klonar
15-30:   Skapa AI API, börja koda
30-60:   Fortsätt + förbättra
60:      MERGE TILL MAIN (kritisk deadline!)
60-105:  Character customization
105-135: Polish / Difficulty feature
135-150: Testing + bug fixes
150-165: Deploy + demo prep
165:     DEMO! 🎤

GIT:
- Commit var 20:e min
- Push till din branch
- Merge till main vid deadline

KOMMUNIKATION:
- Säg till när du mergar
- Hjälp andra om du har tid
- Fråga Person 5 om du är blockerad
```

---

## ⚠️ TROUBLESHOOTING

### Om något går fel:

**AI API tar för lång tid:**
```typescript
// Använd fallback level
return getFallbackLevel(difficulty);
```

**Can't merge to main:**
```bash
# Pusha till din branch istället
git push origin rickard/ai-integration
# Person 5 mergar senare
```

**Expo kraschar:**
```bash
# Restart
npx expo start -c
```

**Blockerad:**
```
"Person 5! Jag är blockerad, kan du hjälpa?"
```

---

## 🏆 DIN SUCCESS CRITERIA

**Must Have:**
- ✅ AI level generation funkar vid minut 60
- ✅ Merged till main
- ✅ < 5 sekunder response time
- ✅ Fallback finns om AI failar

**Nice to Have:**
- ⭐ Character customization
- ⭐ Pre-generated cache
- ⭐ Difficulty adaptation

**VIKTIGT:**
- Fokusera på level generation FÖRST
- Den är CORE feature
- Resten är bonus

---

## 🔑 API KEY - CRITICAL!

**Din API Key:**
```
YOUR_ANTHROPIC_API_KEY_HERE
```

**Lägg den i .env:**
```bash
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-sWHnlcd6Ev...
```

**VIKTIGT:** Committa INTE .env till GitHub! (finns redan i .gitignore)

---

## 💪 FINAL PEP TALK

**Du har:**
- ✅ Complete documentation
- ✅ Claude Opus 4.5 (best model)
- ✅ API key testad
- ✅ Code examples redo
- ✅ Time multiplier advantage
- ✅ Perfect sponsor alignment

**Du kommer:**
- 🔥 Bygga working AI på < 1 timme
- 🔥 Imponera teamet
- 🔥 Imponera domarna
- 🔥 VINNA! 🏆

**LÅT OSS GÖRA DETTA! 🚀📱🎮**

---

**Skapad:** 2025-12-16
**För:** Agentic Jul Hackathon 2025-12-18, Stockholm
**Av:** Claude Sonnet 4.5 via Claude Code
**Status:** REDO ATT DOMINERA! 💪
