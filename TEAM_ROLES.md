# 👥 Team Roles & Responsibilities - Grinch's Lost Gifts

**Hackathon:** Agentic Jul 2025-12-18
**Team Size:** 5 personer
**Tid:** 2 timmar 45 minuter
**Mål:** Vinna genom imponerande AI-driven spelupplevelse

---

## 🎯 ÖVERSIKT

| Person | Huvudroll | Branch | Arbetstid | Kritisk Milestone |
|--------|-----------|--------|-----------|-------------------|
| **1 (Rickard)** | AI Engineer | `rickard/ai-integration` | 2h 30min | 1:00 - AI endpoint live |
| **2** | Game Developer | `game-mechanics` | 2h 30min | 0:30 - Player movement |
| **3** | Level Designer | `level-design` | 2h 15min | 1:00 - Static platforms |
| **4** | UI/UX + Sound | `ui-sound` | 2h 15min | 1:30 - UI komplett |
| **5** | QA + Deploy | `deployment` | 2h 45min | 2:30 - Live på Vercel |

---

## 👤 PERSON 1: AI ENGINEER (Rickard)

### 🎯 Huvudansvar
Du är projektets **hemliga vapen**. Allt som gör spelet unikt kommer från dig - AI-genererade banor, karaktärsanpassning, dynamisk svårighetsgrad.

### 🛠️ Teknisk Stack
- Claude Opus 4.5 API
- Next.js API Routes
- TypeScript
- Prompt engineering

### 📋 Konkreta Arbetsuppgifter

#### 0:00 - 0:15 | Setup & Planering
```typescript
✅ Verifiera Claude API key fungerar
✅ Testa grundläggande API call
✅ Förstå Phaser.js coordinate system
✅ Skapa mappar: lib/, app/api/, prompts/
```

#### 0:15 - 1:00 | AI Level Generation
**DEADLINE: 1:00 - Endpoint måste vara live!**

```typescript
// app/api/generate-level/route.ts
export async function POST(req: Request) {
  const { difficulty, theme } = await req.json();

  // Claude Opus 4.5 genererar bana
  const level = await generateLevel(difficulty, theme);

  return Response.json({ level });
}

// Generera:
// - Platforms (position, width, type)
// - Gifts (position, value)
// - Obstacles (position, type)
// - Background elements
```

**Output exempel:**
```json
{
  "platforms": [
    {"x": 100, "y": 500, "width": 200, "type": "ground"},
    {"x": 350, "y": 400, "width": 150, "type": "floating"}
  ],
  "gifts": [
    {"x": 250, "y": 450, "value": 10}
  ]
}
```

#### 1:00 - 1:45 | Character Customization
```typescript
// app/api/customize-character/route.ts
// Input: "Jag vill vara en pingvin som gillar glass"
// Output:
// - Character sprite (base64 eller URL)
// - Special ability ("Glid på is utan att tappa fart")
// - Color palette
```

#### 1:45 - 2:15 | Difficulty Adaptation
```typescript
// app/api/adapt-difficulty/route.ts
// Analysera spelarens performance:
// - Deaths på level
// - Tid för completion
// - Gifts collected

// → Justera nästa level:
//   - Färre/fler platformar
//   - Mer/mindre gap mellan platformar
//   - Enklare/svårare gift-placeringar
```

#### 2:15 - 2:30 | Polish & Integration
```typescript
✅ Error handling på alla endpoints
✅ Loading states
✅ Fallback om Claude API tar för lång tid
✅ Cache vanliga requests
✅ Testa integration med Person 2's game loop
```

### 🎯 Success Criteria

**Minimum Viable (Detta MÅSTE funka):**
- ✅ AI genererar spelbar bana på < 3 sekunder
- ✅ Banan är faktiskt spelbar (inga omöjliga hopp)
- ✅ Minst 1 working AI feature under demo

**Nice to Have:**
- ⭐ Character customization live under demo
- ⭐ Difficulty adaptation syns mellan levels
- ⭐ AI genererar olika teman (snow, forest, chimney)

### 🚨 Red Flags & Lösningar

**Problem 1: AI för långsam (> 5 sek)**
```typescript
// Lösning: Pre-generera 3 levels vid startup
const CACHE = {
  easy: [level1, level2, level3],
  medium: [level4, level5],
  hard: [level6]
};
```

**Problem 2: AI genererar ospelbar bana**
```typescript
// Lösning: Validation function
function validateLevel(level) {
  // Check: Alla platformar inom skärm
  // Check: Hopp är möjliga (max gap 200px)
  // Check: Minst 1 gift per platform
  return isValid ? level : fallbackLevel;
}
```

### 📞 Kommunikation

**Du måste koordinera med:**
- **Person 2** (Game Dev): "Vilka properties behöver platform-objekten ha?"
- **Person 3** (Level Design): "Hur renderar du platforms? JSON format?"
- **Person 4** (UI): "Hur visar vi loading state under level generation?"

**Prata med dem varje timme!**

---

## 👤 PERSON 2: GAME DEVELOPER

### 🎯 Huvudansvar
Du bygger **själva spelet**. Physics, collision, game loop - allt som får Grinch att röra sig och kännas bra att spela.

### 🛠️ Teknisk Stack
- Phaser.js 3
- TypeScript
- Arcade Physics
- React integration

### 📋 Konkreta Arbetsuppgifter

#### 0:00 - 0:30 | Phaser Setup + Basic Player
**DEADLINE: 0:30 - Detta blockerar alla andra!**

```typescript
// src/game/main.ts
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;

  create() {
    // 1. Create player sprite
    this.player = this.physics.add.sprite(100, 100, 'grinch');

    // 2. Enable physics
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // 3. Basic movement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Left/Right movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // Jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
}
```

**Merge till main vid 0:30!** → Nu kan andra testa

#### 0:30 - 1:15 | Collision Detection + Gift Collection

```typescript
// src/game/physics.ts

// Platform collision
this.physics.add.collider(this.player, this.platforms);

// Gift collection
this.physics.add.overlap(
  this.player,
  this.gifts,
  this.collectGift,
  null,
  this
);

collectGift(player, gift) {
  gift.destroy();  // Ta bort presenten
  this.score += gift.value;  // Öka poäng
  this.sound.play('collect');  // Ljud (Person 4)

  // Particle effect (snö/stjärnor)
  this.emitter.explode(20, gift.x, gift.y);
}
```

#### 1:15 - 1:45 | Game States + Win/Lose

```typescript
// src/game/game-manager.ts

class GameManager {
  state: 'playing' | 'won' | 'dead' = 'playing';
  lives = 3;
  score = 0;

  checkWinCondition() {
    if (this.collectedAllGifts()) {
      this.state = 'won';
      this.scene.start('VictoryScene');
    }
  }

  playerDied() {
    this.lives -= 1;
    if (this.lives === 0) {
      this.state = 'dead';
      this.scene.start('GameOverScene');
    } else {
      this.resetLevel();
    }
  }

  playerFell() {
    // Föll utanför skärmen
    if (this.player.y > 700) {
      this.playerDied();
    }
  }
}
```

#### 1:45 - 2:15 | Advanced Mechanics + Polish

```typescript
// Ice platforms (slippery)
if (platform.type === 'ice') {
  this.player.setDrag(50, 0);  // Mindre friktion
} else {
  this.player.setDrag(800, 0);  // Normal friktion
}

// Double jump
let jumpsLeft = 2;
if (this.cursors.up.isDown && jumpsLeft > 0) {
  this.player.setVelocityY(-500);
  jumpsLeft -= 1;
}
if (this.player.body.touching.down) {
  jumpsLeft = 2;  // Reset när man landar
}

// Coyote time (kan hoppa lite efter man lämnat platform)
let coyoteTime = 100;  // ms
```

#### 2:15 - 2:30 | Bug Fixes + Tuning

```typescript
✅ Testa alla edge cases
✅ Justera jump force (känns bra?)
✅ Justera movement speed
✅ Fix: Kan inte gå igenom platformar underifrån
✅ Fix: Gifts spawnar inte inne i platformar
```

### 🎯 Success Criteria

**Minimum:**
- ✅ Player kan röra sig (vänster/höger/hoppa)
- ✅ Collision med platformar funkar
- ✅ Kan samla presenter
- ✅ Kan dö och starta om

**Nice to Have:**
- ⭐ Ice platforms (slippery)
- ⭐ Double jump
- ⭐ Particle effects
- ⭐ Camera följer player

### 📞 Kommunikation

**Koordinera med:**
- **Person 1** (AI): "Vad är JSON-formatet för levels?"
- **Person 3** (Level): "Hur stora är platform sprites?"
- **Person 4** (UI): "När ska jag trigger sound effects?"

---

## 👤 PERSON 3: LEVEL DESIGNER + ASSETS

### 🎯 Huvudansvar
Du gör spelet **vackert och julligt**. Assets, sprites, bakgrunder - allt visuellt kommer från dig.

### 🛠️ Teknisk Stack
- Pixel art tools (Piskel, Aseprite)
- Phaser.js asset loading
- JSON level format
- OpenGameArt.org (gratis assets)

### 📋 Konkreta Arbetsuppgifter

#### 0:00 - 0:45 | Find/Create Basic Assets
**DEADLINE: 0:45 - Person 2 behöver detta!**

```bash
# Hitta gratis assets:
# - opengameart.org
# - itch.io (free section)
# - kenney.nl (gratis asset packs)

Behövs:
✅ Grinch sprite (32x32 eller 64x64)
✅ Platform tiles (3 typer: ground, floating, ice)
✅ Gift sprite (16x16)
✅ Background (1200x600)
✅ Snowflake particles

# Organisera:
public/assets/
├── characters/
│   └── grinch.png
├── platforms/
│   ├── ground.png
│   ├── floating.png
│   └── ice.png
├── items/
│   └── gift.png
└── backgrounds/
    └── christmas-forest.png
```

#### 0:45 - 1:30 | Level Manager + Asset Loading

```typescript
// src/game/level-manager.ts

export class LevelManager {
  preload() {
    // Load all assets
    this.load.image('grinch', '/assets/characters/grinch.png');
    this.load.image('platform', '/assets/platforms/ground.png');
    this.load.image('gift', '/assets/items/gift.png');
  }

  createLevel(levelData) {
    // Render platforms från JSON
    levelData.platforms.forEach(p => {
      const platform = this.add.image(p.x, p.y, 'platform');
      this.physics.add.existing(platform, true);  // Static body
    });

    // Render gifts
    this.gifts = this.physics.add.group();
    levelData.gifts.forEach(g => {
      const gift = this.gifts.create(g.x, g.y, 'gift');
    });
  }
}
```

#### 1:30 - 2:00 | AI Level Integration

```typescript
// src/game/ai-level-loader.ts

async function loadAILevel(difficulty: string) {
  // Fetch från Person 1's API
  const response = await fetch('/api/generate-level', {
    method: 'POST',
    body: JSON.stringify({ difficulty })
  });

  const { level } = await response.json();

  // Validera och rendera
  if (validateLevel(level)) {
    this.createLevel(level);
  } else {
    console.error('Invalid level, using fallback');
    this.createLevel(FALLBACK_LEVEL);
  }
}
```

#### 2:00 - 2:30 | Visual Polish

```typescript
// Parallax backgrounds
this.bg1 = this.add.tileSprite(0, 0, 1200, 600, 'bg-far');
this.bg2 = this.add.tileSprite(0, 0, 1200, 600, 'bg-near');

update() {
  // Scroll bakgrund långsammare än spel (parallax)
  this.bg1.tilePositionX += 0.5;
  this.bg2.tilePositionX += 1;
}

// Snöfall particles
this.particles = this.add.particles('snowflake');
this.emitter = this.particles.createEmitter({
  x: { min: 0, max: 1200 },
  y: -10,
  speed: { min: 20, max: 60 },
  angle: { min: 170, max: 190 },
  lifespan: 6000,
  frequency: 100
});
```

### 🎯 Success Criteria

**Minimum:**
- ✅ Alla nödvändiga sprites exists
- ✅ Platforms renderas korrekt
- ✅ AI-genererade levels visas

**Nice to Have:**
- ⭐ Parallax backgrounds
- ⭐ Snowfall effect
- ⭐ Animated character sprite
- ⭐ Christmas theme (reds, greens, golds)

### 📞 Kommunikation

**Koordinera med:**
- **Person 1** (AI): "Vilket JSON-format genererar du?"
- **Person 2** (Game): "Vilken storlek ska sprites vara?"

---

## 👤 PERSON 4: UI/UX + SOUND DESIGNER

### 🎯 Huvudansvar
Du gör spelet **känslomässigt engagerande**. UI som ser proffsig ut, ljud som ger feedback, julstämning överallt.

### 🛠️ Teknisk Stack
- React + Tailwind CSS
- Phaser.js sound system
- Freesound.org (gratis ljud)
- CSS animations

### 📋 Konkreta Arbetsuppgifter

#### 0:00 - 0:45 | Find Sound Effects

```bash
# Hitta ljud på:
# - freesound.org
# - zapsplat.com
# - opengameart.org

Behövs:
✅ jump.mp3 (boing sound)
✅ collect.mp3 (ding/chime)
✅ die.mp3 (sad trombone)
✅ win.mp3 (fanfare)
✅ background-music.mp3 (Christmas jingle, loop)

# Lägg i:
public/sounds/
```

#### 0:45 - 1:30 | React UI Components

```typescript
// src/components/StartScreen.tsx
export function StartScreen({ onStart }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
          🎄 Grinch's Lost Gifts 🎁
        </h1>
        <p className="text-xl text-green-200 mb-8">
          Help the Grinch collect all the Christmas presents!
        </p>
        <button
          onClick={onStart}
          className="bg-red-600 hover:bg-red-700 text-white text-2xl px-12 py-4 rounded-lg shadow-2xl transform hover:scale-110 transition"
        >
          START GAME
        </button>
      </div>

      {/* Snowfall effect */}
      <Snowfall snowflakeCount={200} />
    </div>
  );
}

// src/components/GameHUD.tsx
export function GameHUD({ score, lives, level }) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black/50 text-white p-4 flex justify-between">
      <div>🎁 Score: {score}</div>
      <div>❤️ Lives: {lives}</div>
      <div>🎯 Level: {level}</div>
    </div>
  );
}

// src/components/CharacterCustomizer.tsx (om tid finns)
export function CharacterCustomizer({ onCustomize }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCustomize() {
    setLoading(true);
    const response = await fetch('/api/customize-character', {
      method: 'POST',
      body: JSON.stringify({ description })
    });
    const character = await response.json();
    onCustomize(character);
  }

  return (
    <div className="p-8 bg-white rounded-lg">
      <h2>Customize Your Grinch!</h2>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your character..."
        className="border p-2 w-full"
      />
      <button onClick={handleCustomize} disabled={loading}>
        {loading ? 'Generating...' : 'Create Character'}
      </button>
    </div>
  );
}
```

#### 1:30 - 2:00 | Sound Integration

```typescript
// src/game/sound-manager.ts

export class SoundManager extends Phaser.Scene {
  preload() {
    this.load.audio('jump', '/sounds/jump.mp3');
    this.load.audio('collect', '/sounds/collect.mp3');
    this.load.audio('die', '/sounds/die.mp3');
    this.load.audio('win', '/sounds/win.mp3');
    this.load.audio('bgm', '/sounds/background-music.mp3');
  }

  create() {
    // Background music (loop)
    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.3 });
    this.bgm.play();

    // Sound effects
    this.sfx = {
      jump: this.sound.add('jump'),
      collect: this.sound.add('collect'),
      die: this.sound.add('die'),
      win: this.sound.add('win')
    };
  }

  // Koordinera med Person 2 - de kallar detta:
  playSound(name: string) {
    this.sfx[name]?.play();
  }
}
```

#### 2:00 - 2:30 | Polish & Animations

```typescript
// CSS animations
.snowflake {
  animation: fall 10s linear infinite;
}

@keyframes fall {
  from { transform: translateY(-10px); }
  to { transform: translateY(100vh); }
}

// Victory screen
export function VictoryScreen({ score, onRestart }) {
  return (
    <div className="fixed inset-0 bg-green-900 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <h1 className="text-8xl mb-4">🎉</h1>
        <h2 className="text-5xl font-bold text-yellow-300">
          YOU SAVED CHRISTMAS!
        </h2>
        <p className="text-2xl text-white mt-4">
          Final Score: {score}
        </p>
        <button
          onClick={onRestart}
          className="mt-8 bg-red-600 px-8 py-4 rounded-lg"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
```

### 🎯 Success Criteria

**Minimum:**
- ✅ Start screen exists
- ✅ Game HUD shows score/lives
- ✅ Sound effects work
- ✅ Victory/Game Over screens

**Nice to Have:**
- ⭐ Background music
- ⭐ Snowfall effect
- ⭐ Character customization UI
- ⭐ Smooth transitions between screens

### 📞 Kommunikation

**Koordinera med:**
- **Person 2** (Game): "När ska jag spela ljud?"
- **Person 5** (QA): "Testa alla UI states"

---

## 👤 PERSON 5: QA + DEPLOYMENT + DEMO PREP

### 🎯 Huvudansvar
Du säkerställer att **allt faktiskt funkar** och att vi **ser bra ut under demo**.

### 🛠️ Teknisk Stack
- Vercel CLI
- Git workflow
- Screenshot tools
- Testing frameworks (om tid finns)

### 📋 Konkreta Arbetsuppgifter

#### 0:00 - 0:30 | Initial Setup

```bash
# 1. Skapa GitHub repo (se GITHUB_TEAM_GUIDE.md)
# 2. Setup Vercel project

npm install -g vercel
vercel login
vercel --prod  # Link till projekt

# 3. Skapa testing checklist
docs/QA_CHECKLIST.md

# 4. Setup screenshot folder
mkdir docs/demo-screenshots
```

#### 0:30 - 1:30 | Continuous Testing

**Varje 30:e minut, kör detta:**

```bash
# Pull senaste main
git pull origin main

# Bygg lokalt
npm run build

# Om build failar:
# → Stoppa allt
# → Identifiera vem som bröt det
# → Få dem att fixa ASAP

# Testa i webbläsare:
✅ Start screen visas
✅ Kan starta spel
✅ Player rör sig
✅ Kan hoppa
✅ Collision funkar
✅ Kan samla presenter
✅ Score uppdateras
✅ Kan dö
✅ Kan vinna
✅ Sound effects spelar
```

#### 1:30 - 2:00 | Documentation + Screenshots

```bash
# README.md
# - Hur man kör projektet
# - Features lista
# - Tech stack
# - Team members

# DEMO_SCRIPT.md
# - Exakt vad Rickard ska säga
# - Timing (2 minuter)
# - Fallback om något går fel

# Ta screenshots:
docs/demo-screenshots/
├── 01-start-screen.png
├── 02-gameplay.png
├── 03-ai-level-generation.png
├── 04-character-customization.png
└── 05-victory-screen.png
```

#### 2:00 - 2:15 | Pre-Demo Testing

```bash
# Testa som om du vore domare:

1. Öppna start screen
   → Timer: Hur lång tid från load till playable?

2. Spela genom 1 level
   → Bugs? Crashes? Frustration?

3. Testa AI feature
   → Tryck "Generate New Level"
   → Timer: Hur lång tid tar det?

4. Testa på mobil (om tid finns)
   → Responsive?

# Hitta buggar:
# → Logga i docs/KNOWN_ISSUES.md
# → Prioritera: Blockers vs Nice-to-fix
```

#### 2:15 - 2:30 | Final Deployment

```bash
# FRYS UTVECKLING
# Säg till teamet: "STOP CODING NOW"

# Final build
git checkout main
git pull origin main
npm run build

# Om success:
git push origin main

# Vercel auto-deploys (2-3 min)
# → Testa live URL
# → Funkar på mobil?
# → Funkar på desktop?

# Om något är fel:
# → Fix IMMEDIATELY
# → Eller: Använd förra working versionen

# När live URL funkar:
# → Kopiera URL
# → Skicka till Rickard
# → Spara i docs/LIVE_URL.txt
```

#### 2:30 - 2:45 | Demo Prep

```bash
# Förbered Rickard:

✅ Pitch script (DEMO_SCRIPT.md)
✅ Live URL bookmark
✅ Screenshots backup (om WiFi dör)
✅ Bullet points på papper
✅ Testdata (för character customization)

# Saker att ha redo:
- Laptop fully charged
- HDMI adapter (om det behövs)
- Mobiltelefon (testa live URL)
- Screenshots på USB (backup)
```

### 🎯 Success Criteria

**Minimum:**
- ✅ Spelet deploys utan errors
- ✅ Live URL funkar
- ✅ README exists
- ✅ Screenshots tagna

**Nice to Have:**
- ⭐ Automated tests
- ⭐ Performance metrics
- ⭐ Backup demo video
- ⭐ Polerad dokumentation

### 📞 Kommunikation

**Du är koordinatorn!**
- Varje timme: "Status check, alla!"
- Vid buggar: "Person X, din feature är trasig"
- 2:15: "FREEZE - deploying nu"

---

## 🔄 INTEGRATION SCHEDULE

### Kritiska Merge Points

```
0:30 │ Person 2 → main
     │ BLOCKERARE: Alla väntar på detta
     │ [Basic game canvas ready]
     │
0:45 │ Person 3 → main
     │ [Platform assets ready]
     │
1:00 │ Person 1 → main ⚡ KRITISK
     │ [AI level generation API]
     │
1:15 │ Person 4 → main
     │ [UI screens ready]
     │
1:30 │ Person 2 → main
     │ [Collision complete]
     │
1:45 │ Person 3 → main
     │ [AI levels integrated]
     │
2:00 │ Person 4 → main
     │ [Sound + polish]
     │
2:15 │ Person 1 → main
     │ [All AI features]
     │
2:30 │ Person 5 → Vercel
     │ [FINAL DEPLOY]
```

---

## 🚨 EMERGENCY PROTOCOLS

### Någon Blir Blockerad

```bash
# Person 2: "Jag kan inte fortsätta utan Person 1's API"
→ Person 2: Använd mock data temporärt
→ Person 1: Prioritera API endpoint

# Person 4: "Jag har inget att göra än"
→ Person 5: Ge dem QA tasks
→ Person 3: Be om hjälp med assets
```

### Build Är Trasig 15 Min Före Deadline

```bash
# Person 5 kommando:
git log --oneline
git reset --hard [senaste-fungerande-commit]
git push --force origin main

# Säg till teamet:
"Vi revertar till version X. Den funkar."
```

### WiFi Dör Under Demo

```bash
# Person 5's backup plan:
1. Kör lokalt (npm run dev)
2. Visa screenshots
3. Spela backup video
4. Förklara muntligt
```

---

## 🎯 FINAL CHECKLIST (2:25 - 5 Min Före)

```bash
Rickard (Person 1):
✅ API endpoints testad senaste 5 min
✅ Vet exakt vad jag ska säga om AI features
✅ Exempel-prompts redo

Person 2:
✅ Spelet går att spela utan bugs
✅ Vet vilka controls jag ska visa

Person 3:
✅ AI-level funkar
✅ Ser snyggt ut

Person 4:
✅ Alla skärmar funkar
✅ Sound effects spelar
✅ UI ser polerad ut

Person 5:
✅ Live URL funkar
✅ Screenshots backup
✅ Timer redo för 2-min demo
✅ Rickard har allt han behöver
```

---

## 🏆 VINNARSTRATEGIN

### Vad Gör Oss Unika?

1. **AI är kärnan** (inte bara en feature)
   - Level generation
   - Character customization
   - Difficulty adaptation

2. **Impressive scope** för 2.5h
   - Fungerande spel
   - AI integration
   - Professional UI
   - Sound design

3. **Demo-friendly**
   - Visuellt imponerande
   - AI "wow" moment
   - Faktiskt kul att spela

### Under Demo - Rickard's Ansvar

```
0:00-0:20 | Problem + Lösning
0:20-0:40 | Live gameplay
0:40-1:00 | AI generation live
1:00-1:30 | Character customization
1:30-2:00 | Impact statement
```

**Person 5 håller koll på tiden!**

---

## 🎄 LYCKA TILL TEAM!

**Remember:**
- Kommunicera OFTA
- Merge EARLY and OFTEN
- Test BEFORE merging to main
- Person 5 har sista ordet
- Ha KUL! 🎉

**Vi vinner detta! 🔥🎮🎄**
