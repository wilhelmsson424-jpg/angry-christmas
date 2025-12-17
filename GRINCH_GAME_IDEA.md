# 🎮 GRINCH'S LOST GIFTS - Native Mobile Game

**Status:** ⭐⭐⭐⭐⭐ STARKT REKOMMENDERAD
**Platform:** 📱 Native Mobile (iOS + Android via React Native + Expo)
**Team:** 5 personer
**Tid:** 2.5 timmar
**Svårighetsgrad:** Medel (men IMPONERANDE resultat!)
**Vinnarchans:** Mycket hög
**Sponsor Alignment:** 💯 PERFECT (Natively.dev bygger exakt detta!)

**🚀 VIKTIGT:** Detta är nu ett NATIVE MOBILE GAME (React Native + Expo)
**📖 Complete setup guide:** Se `EXPO_SETUP.md` för detaljerad mobile implementation

---

## 🎯 SPELKONCEPT

### Elevator Pitch (30 sekunder):
> "Grinchen har stulit julen och tappar julklappar överallt! Du är en modig jultomte på uppdrag att samla alla presenter innan det är för sent. Hoppa över fällor, undvik Grinchens snöbollar, och rädda julen i detta AI-drivna platformer-äventyr där varje level är unikt!"

### Gameplay:
- **Genre:** 2D Platformer (Super Mario-stil)
- **Speltid:** 3-5 minuter per genomspelning
- **Svårighetsgrad:** Progressiv (lätt → medel → svår)
- **AI-Feature:** Infinite level generation + character customization

---

## 🎨 SPELMEKANIK

### Grundläggande Kontroller:
```
📱 TAP screen: Hoppa
📱 TILT phone: Gå vänster/höger (eller virtuella pilar)
📱 PAUSE button: Pausa
📱 RESTART button: Starta om level

Native mobile controls - fungerar på iOS + Android!
```

### Mål:
1. Samla alla 10 julklappar i leveln
2. Undvik fällor (snöbollar, istappar, gropar)
3. Nå slutflaggan
4. Gör det innan tiden tar slut! (60 sekunder per level)

### Power-Ups (Om tid finns):
- ⭐ **Speed Boost**: Löp 2x snabbare i 5 sekunder
- 🎁 **Extra Points**: Dubblerad poäng för nästa gift
- 🛡️ **Shield**: Oskadlig i 3 sekunder
- ⏱️ **Time Freeze**: Stoppa klockan i 5 sekunder

### Hinder & Fiender:
- ❄️ **Snöbollar**: Rullar fram och tillbaka
- 🧊 **Istappar**: Faller när du går under dem
- 🕳️ **Gropar**: Fall i = förlora ett liv
- 🌨️ **Is-plattor**: Hal yta (svårare kontroll)

---

## 🤖 AI FEATURES (Detta gör spelet UNIKT)

### 1. AI Level Generator ⭐ KÄRNFEATURE
**Vad:** Claude genererar nya levels varje gång du spelar

**Tekniskt:**
```javascript
// Prompt till Claude Opus 4.5
const levelPrompt = `Generate a Christmas platformer level for MOBILE.

CONSTRAINTS:
- Screen: 375px wide × 667px tall (iPhone size)
- Touch controls: Player taps to jump
- Platforms: 8-12 platforms total
- Types: ground, floating, ice (slippery)
- Gifts: Exactly 10 (scattered strategically)
- Enemies: 2-4 snowballs (horizontal movement)
- Difficulty: ${difficulty} (easy/medium/hard)

RULES:
- Must be completable (player CAN reach all gifts)
- Progressively harder (left→right)
- No impossible jumps (max jump height: 120px)
- Final platform has flag
- All coordinates within screen bounds (0-375, 0-667)

OUTPUT JSON:
{
  "platforms": [
    { "x": 0, "y": 617, "width": 375, "height": 50, "type": "ground" },
    { "x": 100, "y": 500, "width": 120, "height": 20, "type": "floating" },
    { "x": 250, "y": 400, "width": 100, "height": 20, "type": "ice" }
  ],
  "gifts": [
    { "x": 150, "y": 460, "value": 10 },
    { "x": 280, "y": 360, "value": 10 }
  ],
  "enemies": [
    { "type": "snowball", "x": 200, "y": 597, "speed": 1.5, "range": 150 }
  ],
  "flag": { "x": 340, "y": 580 }
}`;
```

**📱 Mobile-specific:** Coordinates optimized for mobile screen sizes!

**Demo-moment:**
"Klicka här för nytt level - VARJE level är AI-genererat och unikt!"

---

### 2. AI Character Customizer
**Vad:** Välj mellan AI-genererade Santa-varianter

**Styles:**
1. **Classic Santa** - Röd kostym, vit skägg
2. **Elf Santa** - Grön/röd, spetsiga öron
3. **Ninja Santa** - Svart outfit, snabb
4. **Cyber Santa** - Futuristisk, neon
5. **Grinch Santa** - Grön och elak (ironiskt!)

**Tekniskt:**
```javascript
const characterPrompt = `Generate pixel art color palette for ${style} Santa:
- Primary color (body)
- Secondary color (trim)
- Accent color (details)
- Personality trait (affects animation speed)

Return JSON with hex colors.`;
```

**Demo-moment:**
"Customiza din Santa - alla stilar AI-genererade!"

---

### 3. AI Difficulty Adapter (Bonus)
**Vad:** Spelet anpassar sig efter din spelstil

**Tekniskt:**
```javascript
// Efter varje level, analysera:
const stats = {
  deaths: 3,
  gifts_collected: 7,
  time_taken: 45,
  jumps_made: 52
};

const adaptPrompt = `Player stats: ${JSON.stringify(stats)}
Should next level be:
A) Easier (fewer enemies, more platforms)
B) Same difficulty
C) Harder (more challenges)

Reasoning?`;
```

**Demo-moment:**
"AI lär känna din spelstil och anpassar svårighetsgrad!"

---

## 🛠️ TECH STACK

### Core Framework: React Native + Expo 🚀📱
**Varför React Native + Expo?**
- ✅ **NATIVE MOBILE APPS** (iOS + Android samtidigt!)
- ✅ **100% SPONSOR ALIGNMENT** (Natively.dev bygger exakt detta!)
- ✅ Physics engine: matter.js (perfekt för 2D platformers)
- ✅ Instant preview: Scan QR code → spela på mobil
- ✅ Deploy med ETT kommando (expo publish)
- ✅ Claude Code genererar React Native lika bra som web
- ✅ Touch controls inbyggt (tap, swipe, tilt)
- ✅ Free & open source

### Full Stack:
```
Platform: React Native + Expo (NATIVE iOS + Android!)
Game Engine: react-native-game-engine + matter.js
Physics: matter.js (2D physics engine)
AI: Claude Opus 4.5 API
Assets: Free pixel art (Kenney.nl, OpenGameArt)
Sound: expo-av + free SFX
Deploy: Expo Publish / EAS Build
Version Control: GitHub
Testing: Expo Go app (scan QR → live på mobil)
```

**🎯 SPONSOR ADVANTAGE:**
Natively.dev (huvudsponsor) = AI-powered mobile app builder
→ De bygger EXAKT React Native + Expo apps
→ Domare kommer ÄLSKA att ni använder deras stack
→ Native mobile > Web apps = högre poäng

### Dependencies:
```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "react-native-game-engine": "^2.2.0",
    "matter-js": "^0.20.0",
    "expo-av": "~14.0.0",
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/native": "^6.1.9",
    "@anthropic-ai/sdk": "^0.30.0"
  },
  "devDependencies": {
    "@types/matter-js": "^0.20.0",
    "typescript": "~5.3.0"
  }
}
```

**Setup kommando:**
```bash
npx create-expo-app grinch-game --template blank-typescript
cd grinch-game
npm install react-native-game-engine matter-js expo-av @expo/vector-icons
```

---

## 👥 TEAM ROLLFÖRDELNING (5 personer)

### 🎮 Person 1: Game Developer (Lead)
**Ansvar:** Phaser core mechanics

**Uppgifter:**
- [ ] Setup Phaser 3 project
- [ ] Player sprite & movement (←→)
- [ ] Jump physics (Arcade Physics)
- [ ] Collision detection (platforms, gifts, enemies)
- [ ] Camera follow player
- [ ] Death/respawn logic
- [ ] Win condition (all gifts + flag)

**Filer att jobba i:**
```
/game/Player.js
/game/GameScene.js
/game/Physics.js
```

**Tidsbudget:**
- 0:15-0:45: Player movement working
- 0:45-1:30: Collision + physics
- 1:30-2:15: Polish + power-ups

**Verktyg:**
- Phaser 3 docs
- Arcade Physics tutorial
- VS Code

---

### 🎨 Person 2: Level Designer + Assets
**Ansvar:** Visual design & level creation

**Uppgifter:**
- [ ] Hitta pixel art assets (Santa, platforms, gifts)
- [ ] Design level 1 layout (paper → Phaser Tilemap)
- [ ] Background layers (parallax scrolling)
- [ ] Particle effects (snow falling)
- [ ] Enemy sprites & animation
- [ ] Gift/collectible sprites
- [ ] Flag sprite

**Filer att jobba i:**
```
/game/Level1.js
/game/Assets.js
/public/assets/ (images)
```

**Tidsbudget:**
- 0:15-0:45: Find & import assets
- 0:45-1:30: Build level 1
- 1:30-2:15: Levels 2-3 + visual polish

**Verktyg:**
- Kenney.nl (gratis assets)
- OpenGameArt.org
- Tiled (optional level editor)
- Photopea (pixel art edits)

---

### 🤖 Person 3: AI Engineer (RICKARD - DIG!)
**Ansvar:** Claude integration & AI features

**Uppgifter:**
- [ ] Setup Anthropic API
- [ ] Level generator prompt engineering
- [ ] Convert AI JSON → Phaser format
- [ ] Character customizer (color palettes)
- [ ] Difficulty analyzer
- [ ] API route `/api/generate-level`
- [ ] API route `/api/customize-character`

**Filer att jobba i:**
```
/app/api/generate-level/route.ts
/app/api/customize-character/route.ts
/lib/claude-game.ts
/game/AILevelLoader.js
```

**Tidsbudget:**
- 0:15-0:45: Test Claude API, draft prompts
- 0:45-1:30: Level generation working
- 1:30-2:15: Character customizer + difficulty

**Verktyg:**
- Claude Opus 4.5 API
- Prompt engineering
- JSON → Phaser converter

---

### 🎵 Person 4: UI/UX + Sound
**Ansvar:** User interface & audio experience

**Uppgifter:**
- [ ] Start menu (Play, Settings, Credits)
- [ ] Character select screen
- [ ] HUD (Score, Lives, Timer)
- [ ] Game Over screen
- [ ] Victory screen
- [ ] Pause menu
- [ ] Sound effects (jump, collect, death)
- [ ] Background music (Christmas themes)

**Filer att jobba i:**
```
/game/MenuScene.js
/game/HUD.js
/game/GameOver.js
/game/AudioManager.js
```

**Tidsbudget:**
- 0:15-0:45: Menu mockups + find music
- 0:45-1:30: Build menus in Phaser
- 1:30-2:15: Sound integration + polish

**Verktyg:**
- Figma (UI mockups - snabbt!)
- Freesound.org (SFX)
- Incompetech.com (music)
- Howler.js (audio library)

---

### ✅ Person 5: QA + Deployment + Demo
**Ansvar:** Testing, deploy, pitch

**Uppgifter:**
- [ ] Setup GitHub repo (minut 0!)
- [ ] Setup Vercel deployment (minut 15)
- [ ] Continuous playtesting
- [ ] Bug tracking (Google Sheet)
- [ ] Balance difficulty
- [ ] Create test levels
- [ ] Record demo video (backup)
- [ ] Write pitch script
- [ ] Take screenshots
- [ ] Prepare demo flow

**Filer att jobba i:**
```
/README.md
/DEMO_SCRIPT.md
/vercel.json
Google Sheet: Bug tracker
```

**Tidsbudget:**
- 0:00-0:15: Setup repo + Vercel
- 0:15-2:00: Continuous testing
- 2:00-2:15: Collect all bugs
- 2:15-2:35: Help fix critical bugs
- 2:35-2:45: Demo rehearsal

**Verktyg:**
- GitHub
- Vercel
- OBS Studio (screen recording)
- Google Sheets
- Timer/stopwatch

---

## ⏱️ DETALJERAD TIDSBUDGET

### **0:00 - 0:15 | SETUP & PLANNING** 👥 ALL

**Aktiviteter:**
- [ ] Introduce team (namn, skills, vad ni gjort innan)
- [ ] Pitch Grinch Game (visa DENNA fil!)
- [ ] Assign roles (baserat på styrkor)
- [ ] Person 5: Skapa GitHub repo
- [ ] Person 5: Setup Vercel project
- [ ] Alla: Clone repo lokalt
- [ ] Person 1: `npx create-next-app grinch-game`
- [ ] Person 1: `npm install phaser`
- [ ] Test: Visa tom Phaser canvas (verify setup)

**Checkpoint:** Alla har projektet lokalt, Phaser visar black screen ✅

---

### **0:15 - 0:30 | FOUNDATION** 👥 PARALLELLT

**Person 1 (Game Dev):**
- [ ] Create basic GameScene
- [ ] Add player sprite (placeholder rectangle OK!)
- [ ] Left/Right movement working

**Person 2 (Assets):**
- [ ] Download Santa sprite pack
- [ ] Download platform/tile assets
- [ ] Download gift sprite
- [ ] Import to `/public/assets/`

**Person 3 (AI - DIG):**
- [ ] Verify Claude API key works
- [ ] Create `/api/generate-level` endpoint
- [ ] Test basic Claude call
- [ ] Draft level generation prompt (v1)

**Person 4 (UI):**
- [ ] Sketch start menu (paper/Figma - 5min!)
- [ ] Find Christmas music (1 track)
- [ ] Find jump SFX
- [ ] Find collect SFX

**Person 5 (QA):**
- [ ] Deploy v0.1 to Vercel (just starter)
- [ ] Create bug tracker spreadsheet
- [ ] Setup testing checklist

**Checkpoint:** Player can move left/right, assets imported ✅

---

### **0:30 - 1:00 | CORE MECHANICS** 🎮 INTENSIVT

**Person 1:**
- [ ] Jump physics (↑ or Space)
- [ ] Gravity working
- [ ] Ground collision (player stops falling)
- [ ] Platform collision (player can stand on platforms)

**Person 2:**
- [ ] Build Level 1 layout in Phaser
- [ ] 5-7 platforms (start simple!)
- [ ] Add background image
- [ ] Place 10 gifts

**Person 3:**
- [ ] Generate test level with AI
- [ ] Parse JSON response
- [ ] Convert to Phaser objects
- [ ] Load AI-generated platforms into game

**Person 4:**
- [ ] Create Start Menu scene
- [ ] "Play" button → GameScene
- [ ] Add HUD (score counter)
- [ ] Add timer (60 seconds countdown)

**Person 5:**
- [ ] Test: Can player jump?
- [ ] Test: Does collision work?
- [ ] Test: Can switch to GameScene?
- [ ] Log bugs in tracker

**Checkpoint:** Level 1 is playable (walk, jump, platforms) ✅

---

### **1:00 - 1:30 | COLLECTIBLES & ENEMIES** 💎

**Person 1:**
- [ ] Gift collection (overlap → gift disappears, score +10)
- [ ] Score tracking
- [ ] Death logic (touch enemy → respawn)
- [ ] Lives system (3 lives)

**Person 2:**
- [ ] Snowball enemy sprite
- [ ] Snowball movement (back and forth)
- [ ] Add enemies to Level 1 (2-3 snowballs)
- [ ] Add flag sprite at end

**Person 3:**
- [ ] Refine AI level generation (test 5 levels)
- [ ] Add difficulty parameter (easy/medium/hard)
- [ ] Start character customization prompt

**Person 4:**
- [ ] Lives display (❤️❤️❤️)
- [ ] Integrate jump SFX
- [ ] Integrate collect SFX
- [ ] Background music loop

**Person 5:**
- [ ] Full playthrough test
- [ ] Is level too hard/easy?
- [ ] Can you collect all gifts?
- [ ] Deploy v0.5

**Checkpoint:** Full game loop works (collect gifts, avoid enemies, win/lose) ✅

---

### **1:30 - 2:00 | EXPAND & POLISH** ✨

**Person 1:**
- [ ] Win condition (all gifts + reach flag)
- [ ] Camera follow player smoothly
- [ ] Add particle effect on gift collect
- [ ] Power-up: Speed boost (if time)

**Person 2:**
- [ ] Create Level 2 (harder)
- [ ] Create Level 3 (hardest)
- [ ] Add parallax background layers
- [ ] Falling snow particles
- [ ] Polish animations

**Person 3:**
- [ ] Character customizer working
- [ ] Show 3-5 Santa variants
- [ ] Apply color palette to player sprite
- [ ] Difficulty adapter (analyze deaths)

**Person 4:**
- [ ] Game Over screen (Restart / Menu buttons)
- [ ] Victory screen (Score, Time, Next Level)
- [ ] Pause menu (P key)
- [ ] Settings menu (Music On/Off)

**Person 5:**
- [ ] Test all 3 levels
- [ ] Test character customizer
- [ ] Test AI level generation
- [ ] Create "Best Path" doc for demo

**Checkpoint:** 3 levels playable, AI features working ✅

---

### **2:00 - 2:15 | FEATURE COMPLETE** 🏁

**Person 1:**
- [ ] Fix remaining physics bugs
- [ ] Optimize performance
- [ ] Add death animation

**Person 2:**
- [ ] Final visual polish
- [ ] Ensure consistent art style
- [ ] Add loading screen

**Person 3:**
- [ ] Test AI on stage (WiFi permitting)
- [ ] Cache 5 pre-generated levels (backup)
- [ ] Ensure AI doesn't break demo

**Person 4:**
- [ ] Sound balance (not too loud!)
- [ ] Final UI tweaks
- [ ] Credits screen (team names!)

**Person 5:**
- [ ] Note all known bugs
- [ ] Decide: Fix or accept?
- [ ] Practice demo run

**Checkpoint:** Game is DONE (might have minor bugs, that's OK!) ✅

---

### **2:15 - 2:35 | INTEGRATION & BUG BASH** 🐛

**ALL TOGETHER:**
- [ ] Merge all branches to main
- [ ] Fix merge conflicts
- [ ] Deploy final version to Vercel
- [ ] Everyone playtests full game
- [ ] Fix ONLY game-breaking bugs:
  - ❌ Game crashes
  - ❌ Can't complete level
  - ❌ AI doesn't work
- [ ] Accept minor bugs:
  - 🟡 Animation glitches
  - 🟡 Sound timing issues

**Checkpoint:** Production build deployed and playable ✅

---

### **2:35 - 2:45 | DEMO PREP** 🎤

**Team huddle:**
- [ ] Run through full demo (2min)
- [ ] Person 5 reads pitch script
- [ ] Decide who controls during demo (Person 1 or 5)
- [ ] Backup plan if WiFi fails:
  - [ ] Have local build ready
  - [ ] Have recorded video
  - [ ] Have screenshots
- [ ] Mentally prepare
- [ ] Deep breath!

**Checkpoint:** Demo script memorized, backup ready ✅

---

## 📁 PROJEKTSTRUKTUR

```
grinch-game/
├── app/
│   ├── page.tsx                 # Wraps Phaser game
│   ├── layout.tsx
│   └── api/
│       ├── generate-level/
│       │   └── route.ts         # AI level generation
│       └── customize-character/
│           └── route.ts         # AI character customization
├── game/
│   ├── scenes/
│   │   ├── MenuScene.js         # Start menu
│   │   ├── GameScene.js         # Main gameplay
│   │   ├── GameOverScene.js     # Game over screen
│   │   └── VictoryScene.js      # Win screen
│   ├── entities/
│   │   ├── Player.js            # Player class
│   │   ├── Enemy.js             # Snowball enemy
│   │   ├── Gift.js              # Collectible
│   │   └── Platform.js          # Platform class
│   ├── managers/
│   │   ├── AudioManager.js      # Sound/music
│   │   └── AILevelLoader.js     # Load AI-generated levels
│   └── config.js                # Phaser config
├── public/
│   └── assets/
│       ├── sprites/
│       │   ├── santa.png
│       │   ├── snowball.png
│       │   ├── gift.png
│       │   └── flag.png
│       ├── tiles/
│       │   ├── platform.png
│       │   └── ice-platform.png
│       ├── backgrounds/
│       │   └── winter-bg.png
│       └── audio/
│           ├── music.mp3
│           ├── jump.wav
│           └── collect.wav
├── lib/
│   └── claude-game.ts           # AI helper functions
├── package.json
├── README.md
└── .env                         # ANTHROPIC_API_KEY
```

---

## 🎤 DEMO SCRIPT (2 minuter - EXAKT)

### **[0:00 - 0:15] HOOK** 🎣
**Person 5 pratar:**
> "Höj handen om ni älskar platformer-spel!"
>
> [Vänta på reaktion]
>
> "Idag visar vi **Grinch's Lost Gifts** - ett AI-drivet jullspel byggt på 2.5 timmar av vårt team!"

**[Visa landing page]**

---

### **[0:15 - 0:30] STORY** 📖
**Person 5:**
> "Grinchen har stulit julen och tappar presenter överallt. Du spelar som en modig jultomte som måste samla alla gåvor innan det är för sent!"

**[Klicka Play]**

---

### **[0:30 - 1:15] LIVE GAMEPLAY** 🎮
**Person 1 spelar (eller Person 5):**

**[Level 1 startar]**
- Visa movement (gå vänster/höger)
- Hoppa över första plattformen
- Samla 2-3 gifts (SFX ljuder!)
- Undvik en snowball
- Samla fler gifts
- Nå flaggan = WIN!

**Person 5 kommenterar:**
> "Som ni ser - classic platformer mechanics. Men nu kommer det COOLA..."

---

### **[1:15 - 1:45] AI FEATURES** 🤖
**Person 5:**
> "Varje level är **AI-genererat**. Inget level är detsamma två gånger!"

**[Klicka "Generate New Level" button]**
**[Visa att level-layouten ändras]**

> "Claude Opus 4.5 designar plattformar, fiender, och gift-placeringar baserat på svårighetsgrad."

**[Om tid: Visa character customizer]**
> "Och customiza din Santa - alla stilar AI-genererade!"

---

### **[1:45 - 2:00] TECH STACK** 💻
**Person 5 (snabbt):**
> "Tech stack:
> - Phaser 3 för game engine
> - Claude Opus 4.5 för AI generation
> - Next.js + Vercel för deployment
> - Byggt av 5 personer på 2 timmar och 45 minuter!"

---

### **[2:00 - 2:10] IMPACT** 💥
**Person 5:**
> "Varför är detta speciellt?
>
> **Infinite replayability** - AI skapar nya utmaningar varje gång.
>
> **Adaptive difficulty** - Spelet lär sig hur du spelar.
>
> **Built in hours** - Detta visar kraften i AI-driven game development!"

---

### **[2:10 - 2:15] CLOSE** 🎬
**Person 5:**
> "Tack! Frågor?"

**[Om tid över: Spela level 2 live]**

---

## 🎨 ASSET SOURCES (Free & Legal)

### Pixel Art Sprites:
1. **Kenney.nl**
   - URL: kenney.nl/assets
   - Packs: "Platformer Pack", "Winter Pack"
   - License: CC0 (public domain)

2. **OpenGameArt.org**
   - Search: "santa sprite", "snow platform", "christmas"
   - License: Varies (check each!)

3. **Itch.io Assets**
   - Search: "platformer asset pack pixel"
   - Many free packs from creators

### Sound Effects:
1. **Freesound.org**
   - Search: "jump", "collect coin", "game over"
   - License: CC0 or CC-BY

2. **Mixkit.co**
   - Free game sound effects
   - No attribution required

### Music:
1. **Incompetech.com**
   - Search: "Christmas" or "Upbeat"
   - License: CC-BY (credit Kevin MacLeod)

2. **FreePD.com**
   - Public domain music
   - Christmas themes available

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: Phaser not rendering
**Symptom:** Black screen, no game visible

**Fix:**
```javascript
// In page.tsx, ensure Phaser only loads client-side
'use client';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./Game'), { ssr: false });
```

---

### Issue 2: Player falls through platforms
**Symptom:** Collision not working

**Fix:**
```javascript
// Ensure both have physics bodies
this.physics.add.existing(player);
this.physics.add.existing(platform);

// Add collider
this.physics.add.collider(player, platform);
```

---

### Issue 3: AI too slow on stage
**Symptom:** Demo lags waiting for Claude

**Fix:**
```javascript
// Pre-generate 5 levels before demo
const cachedLevels = [
  level1Data,
  level2Data,
  level3Data,
  level4Data,
  level5Data
];

// Use cache first, then AI
function getLevel(difficulty) {
  if (cachedLevels[difficulty]) {
    return cachedLevels[difficulty];
  }
  return generateWithAI(difficulty);
}
```

---

### Issue 4: Jump feels floaty
**Symptom:** Player jumps too slow/high

**Fix:**
```javascript
// In Player.js, tweak gravity
player.body.setGravityY(800); // Higher = falls faster

// Tweak jump velocity
player.setVelocityY(-400); // More negative = higher jump
```

---

## 🏆 VARFÖR DETTA VINNER

### Judging Criteria Breakdown:

**1. Technical Excellence** ⭐⭐⭐⭐⭐
- ✅ Working physics engine
- ✅ AI integration (level generation)
- ✅ Clean code structure
- ✅ Deployed & accessible

**2. Creativity** ⭐⭐⭐⭐⭐
- ✅ Unique use of AI (procedural generation)
- ✅ Christmas theme (event-appropriate)
- ✅ Interactive & engaging
- ✅ Replayability (infinite levels)

**3. Potential Impact** ⭐⭐⭐⭐
- ✅ Educational (shows AI in games)
- ✅ Entertaining (people will PLAY it)
- ✅ Scalable (more levels, enemies, worlds)
- ✅ Open source potential

**4. Presentation** ⭐⭐⭐⭐⭐
- ✅ Live demo (judges can play!)
- ✅ Visual appeal (pixel art nostalgia)
- ✅ Audio (music + SFX immersion)
- ✅ Clear value prop

**TOTAL SCORE:** 19/20 ⭐⭐⭐⭐⭐

---

## ✅ PRE-HACKATHON CHECKLIST

**Rickard (AI Engineer) - Förbered:**
- [ ] Läs denna guide 2 gånger
- [ ] Testa Claude API key fungerar
- [ ] Skriv level generation prompt (draft)
- [ ] Förstå JSON → Phaser conversion
- [ ] Ha `/api/generate-level` route mentalt klar

**Pitcha till teamet:**
- [ ] Visa denna fil på dag 1
- [ ] Förklara varför spel > app
- [ ] Visa vinnande mönster (research)
- [ ] Belysa DIN roll (AI = core feature!)

**Backup plan:**
- [ ] Om teamet säger nej → ha Secret Santa ready
- [ ] Men PUSHA för Grinch - det är roligare! 🔥

---

## 🎯 SUCCESS METRICS

**Minimum Viable Game (MVG):**
- ✅ 1 level playable start to finish
- ✅ Player can jump & collect gifts
- ✅ Win condition works
- ✅ AI generates AT LEAST 1 new level

**Target Game (TG):**
- ✅ 3 levels playable
- ✅ Enemies working
- ✅ AI generates infinite levels
- ✅ Character customization
- ✅ Sound + music

**Dream Game (DG):**
- ✅ Everything above +
- ✅ Power-ups working
- ✅ Particle effects
- ✅ Difficulty adapter
- ✅ Leaderboard

**Reality:** Sikta på TG, nöj dig med MVG om tiden är tight!

---

## 📞 RESOURCES & LINKS

**Phaser 3:**
- Docs: https://photonstorm.github.io/phaser3-docs/
- Tutorial: "Making your first Phaser 3 game"
- Examples: https://labs.phaser.io

**AI Prompting:**
- Anthropic Docs: https://docs.anthropic.com
- Prompt engineering guide (i starter kit!)

**Assets:**
- Kenney: https://kenney.nl/assets
- OpenGameArt: https://opengameart.org
- Freesound: https://freesound.org

**Deploy:**
- Vercel: https://vercel.com
- GitHub: https://github.com

---

## 🔥 FINAL WORDS

Detta är inte bara ett spel.

Detta är ett **statement**.

Ett statement om vad AI + kreativitet kan göra på 2.5 timmar.

Andra team bygger apps.

**Du bygger en UPPLEVELSE.**

Judges kommer **SPELA** ditt projekt.

De kommer **SKRATTA** när de hoppar.

De kommer säga **"WOW"** när du visar AI-generering.

**Vinn detta.** 🏆

---

**Good luck, Rickard! Du har detta! 🎮🎅🔥**
