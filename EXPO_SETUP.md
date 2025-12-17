# 📱 Expo + React Native Setup Guide - Grinch Game

**For:** Agentic Jul Hackathon 2025-12-18
**Target:** Native iOS + Android game
**Time to setup:** 5-10 minuter
**Sponsor alignment:** 100% (Natively.dev builds this!)

---

## 🎯 VARFÖR EXPO?

**Expo = React Native på steroider:**
- ✅ Zero native code configuration
- ✅ Instant preview på mobil (scan QR)
- ✅ iOS + Android samtidigt
- ✅ Hot reload (ändra kod → instant uppdatering)
- ✅ Deploy med ett kommando
- ✅ Built-in APIs (camera, sensors, sound)

**Perfect för hackathon:**
- Setup: 5 minuter (vs 2 timmar för vanilla React Native)
- Deploy: 1 kommando (vs komplex build process)
- Test: Scan QR code (vs simulators)

---

## 🚀 QUICK START (5 Minuter)

### Steg 1: Install Expo CLI (1 minut)

```bash
# Global Expo CLI
npm install -g expo-cli

# Eller använd npx (no install needed):
npx expo --version
```

### Steg 2: Create Project (2 minuter)

```bash
# Create Expo app
npx create-expo-app grinch-game --template blank-typescript

cd grinch-game

# Install game dependencies
npm install react-native-game-engine matter-js
npm install expo-av  # För ljud
npm install @expo/vector-icons  # För ikoner
```

### Steg 3: Start Development Server (1 minut)

```bash
npx expo start
```

**Du får en QR code i terminalen!**

### Steg 4: Preview på Mobil (1 minut)

**iOS:**
1. Installera "Expo Go" från App Store
2. Öppna Camera app
3. Scanna QR code
4. Appen öppnas i Expo Go

**Android:**
1. Installera "Expo Go" från Play Store
2. Öppna Expo Go app
3. Scanna QR code
4. Appen körs direkt

**BOOM! Nu har du live preview på mobilen! 🎉**

---

## 📁 PROJECT STRUCTURE

```
grinch-game/
├── App.tsx                    # Entry point
├── app.json                   # Expo config
├── package.json
├── src/
│   ├── screens/
│   │   ├── StartScreen.tsx    # Main menu
│   │   ├── GameScreen.tsx     # Gameplay
│   │   ├── CustomizeScreen.tsx # Character creator
│   │   └── EndScreen.tsx      # Victory/Game Over
│   ├── game/
│   │   ├── GameEngine.tsx     # Main game loop
│   │   ├── entities/
│   │   │   ├── Player.ts      # Grinch character
│   │   │   ├── Platform.ts    # Platforms
│   │   │   └── Gift.ts        # Collectibles
│   │   ├── systems/
│   │   │   ├── Physics.ts     # Matter.js physics
│   │   │   └── Collision.ts   # Collision detection
│   │   └── levels/
│   │       └── LevelLoader.ts # AI level integration
│   ├── api/
│   │   └── claude.ts          # AI API calls
│   ├── components/
│   │   ├── HUD.tsx            # Score, lives
│   │   └── Button.tsx         # Custom buttons
│   └── assets/
│       ├── images/
│       ├── sounds/
│       └── fonts/
└── tsconfig.json
```

---

## 🎮 GAME ENGINE SETUP

### Install React Native Game Engine

```bash
npm install react-native-game-engine matter-js
npm install @types/matter-js --save-dev
```

### Basic Game Setup

```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/StartScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Game Screen with Physics

```typescript
// src/screens/GameScreen.tsx
import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [running, setRunning] = useState(true);
  const [engine] = useState(Matter.Engine.create({ enableSleeping: false }));
  const world = engine.world;

  // Create player
  const player = Matter.Bodies.rectangle(100, 100, 50, 50, {
    label: 'player',
    restitution: 0.3,
  });

  // Create ground
  const ground = Matter.Bodies.rectangle(
    width / 2,
    height - 50,
    width,
    100,
    { isStatic: true, label: 'ground' }
  );

  Matter.World.add(world, [player, ground]);

  const Physics = (entities, { time }) => {
    Matter.Engine.update(engine, time.delta);
    return entities;
  };

  return (
    <GameEngine
      style={{ flex: 1, backgroundColor: '#87CEEB' }}
      systems={[Physics]}
      entities={{
        physics: { engine, world },
        player: { body: player, size: [50, 50], color: '#00FF00', renderer: Box },
        ground: { body: ground, size: [width, 100], color: '#654321', renderer: Box },
      }}
      running={running}
    />
  );
}

// Simple box renderer
const Box = (props) => {
  const { body, size, color } = props;
  const [width, height] = size;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
      }}
    />
  );
};
```

---

## 🎨 TOUCH CONTROLS

```typescript
// src/game/TouchHandler.ts
import { GestureResponderEvent } from 'react-native';
import Matter from 'matter-js';

export class TouchHandler {
  player: Matter.Body;

  constructor(player: Matter.Body) {
    this.player = player;
  }

  handleTouch = (evt: GestureResponderEvent) => {
    const { locationY } = evt.nativeEvent;
    const screenHeight = Dimensions.get('window').height;

    // Tap upper half = jump
    if (locationY < screenHeight / 2) {
      this.jump();
    }

    // Tap lower half = duck (future feature)
  };

  jump() {
    // Only jump if on ground
    if (this.player.velocity.y < 0.5) {
      Matter.Body.applyForce(this.player, this.player.position, {
        x: 0,
        y: -0.15,
      });
    }
  }

  moveLeft() {
    Matter.Body.setVelocity(this.player, {
      x: -5,
      y: this.player.velocity.y,
    });
  }

  moveRight() {
    Matter.Body.setVelocity(this.player, {
      x: 5,
      y: this.player.velocity.y,
    });
  }
}

// Usage in GameScreen:
<GameEngine
  onEvent={(evt) => touchHandler.handleTouch(evt)}
  // ...
/>
```

---

## 🔊 SOUND SETUP (Expo AV)

```typescript
// src/utils/SoundManager.ts
import { Audio } from 'expo-av';

export class SoundManager {
  sounds: { [key: string]: Audio.Sound } = {};

  async loadSounds() {
    const jumpSound = await Audio.Sound.createAsync(
      require('../assets/sounds/jump.mp3')
    );
    const collectSound = await Audio.Sound.createAsync(
      require('../assets/sounds/collect.mp3')
    );

    this.sounds.jump = jumpSound.sound;
    this.sounds.collect = collectSound.sound;
  }

  async play(soundName: string) {
    const sound = this.sounds[soundName];
    if (sound) {
      await sound.replayAsync();
    }
  }

  async cleanup() {
    for (const sound of Object.values(this.sounds)) {
      await sound.unloadAsync();
    }
  }
}

// Usage:
const soundManager = new SoundManager();
await soundManager.loadSounds();
soundManager.play('jump');
```

---

## 🤖 AI INTEGRATION (Same as Web!)

```typescript
// src/api/claude.ts
const CLAUDE_API_KEY = 'sk-ant-api03-...';  // Your key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function generateLevel(difficulty: string) {
  const prompt = `Generate a Christmas platformer level for mobile.

  Difficulty: ${difficulty}
  Screen: 375x667 (iPhone size)

  Return JSON with:
  {
    "platforms": [
      {"x": number, "y": number, "width": number, "type": "ground|floating|ice"}
    ],
    "gifts": [
      {"x": number, "y": number, "value": number}
    ],
    "obstacles": [
      {"x": number, "y": number, "type": "spike|snowball"}
    ]
  }

  Ensure all x,y coordinates are within screen bounds.
  Platforms should be jumpable (max gap 120px).
  Place at least 10 gifts strategically.`;

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  const levelData = JSON.parse(data.content[0].text);

  return levelData;
}

// Usage in GameScreen:
const loadNewLevel = async () => {
  setLoading(true);
  const level = await generateLevel('medium');
  createPlatformsFromData(level.platforms);
  createGiftsFromData(level.gifts);
  setLoading(false);
};
```

---

## 📱 DEPLOYMENT OPTIONS

### Option 1: Expo Go (Instant - For Testing)

```bash
# Already running when you do:
npx expo start

# Team members scan QR → instant preview
# Perfect for development & testing
```

### Option 2: Expo Publish (Demo Day)

```bash
# Publish to Expo servers (takes 2 min)
npx expo publish

# Get shareable URL:
# exp://exp.host/@yourusername/grinch-game

# Anyone with Expo Go can open it
# Perfect for judges to test
```

### Option 3: Build APK/IPA (If Time Allows)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build Android APK (15 min on Expo servers)
eas build --platform android --profile preview

# Build iOS (requires Apple Developer account)
eas build --platform ios --profile preview

# Download .apk → install on Android
# Share with judges
```

**For hackathon: Use Option 2 (Expo Publish) - snabbast och enklast!**

---

## 🧪 TESTING WORKFLOW

### Local Testing (Continuous)

```bash
# Terminal 1: Run Expo
npx expo start

# Your phone: Expo Go app
# → Scan QR code
# → Live preview
# → Hot reload när du ändrar kod

# Test on multiple devices:
# → Din telefon
# → Teammedlems telefoner
# → Både iOS och Android samtidigt
```

### Debug Tools

```bash
# Open DevTools
# Shake phone → "Debug Remote JS"
# → Opens Chrome DevTools
# → Full console, network, errors

# Performance Monitor
# Shake phone → "Show Performance Monitor"
# → FPS, JS thread usage
```

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: "Expo Go won't connect"

```bash
# Fix 1: Same WiFi network
# Ensure laptop + phone on same WiFi

# Fix 2: Use tunnel mode
npx expo start --tunnel

# Fix 3: Use LAN IP directly
npx expo start --lan
```

### Issue 2: "Module not found"

```bash
# Clear cache
npx expo start -c

# Or full reset:
rm -rf node_modules
npm install
npx expo start -c
```

### Issue 3: "Game is laggy"

```typescript
// Optimize physics
const engine = Matter.Engine.create({
  enableSleeping: true,  // Enable sleeping bodies
  positionIterations: 6,
  velocityIterations: 4,
});

// Reduce render frequency
<GameEngine
  systems={[Physics]}
  running={true}
  style={{ flex: 1 }}
  // Add this:
  timer={{
    interval: 16,  // 60 FPS (1000ms / 60)
  }}
/>
```

### Issue 4: "AI API calls are slow"

```typescript
// Add timeout + fallback
const generateLevelWithFallback = async (difficulty: string) => {
  try {
    const levelPromise = generateLevel(difficulty);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    );

    const level = await Promise.race([levelPromise, timeoutPromise]);
    return level;
  } catch (error) {
    console.log('Using fallback level');
    return FALLBACK_LEVELS[difficulty];
  }
};

// Pre-generate 3 levels at startup
const [cachedLevels, setCachedLevels] = useState([]);

useEffect(() => {
  async function pregenerate() {
    const levels = await Promise.all([
      generateLevel('easy'),
      generateLevel('medium'),
      generateLevel('hard'),
    ]);
    setCachedLevels(levels);
  }
  pregenerate();
}, []);
```

---

## 📊 PERFORMANCE BEST PRACTICES

### 1. Optimize Physics

```typescript
// Only update physics for visible objects
const visibleBodies = world.bodies.filter(body =>
  body.position.x > camera.x - 100 &&
  body.position.x < camera.x + screenWidth + 100
);

// Remove sleeping bodies from render
const activeBodies = visibleBodies.filter(body => !body.isSleeping);
```

### 2. Use React.memo for Static Components

```typescript
// HUD doesn't need to re-render every frame
export const HUD = React.memo(({ score, lives }) => (
  <View style={styles.hud}>
    <Text>Score: {score}</Text>
    <Text>Lives: {lives}</Text>
  </View>
));
```

### 3. Batch State Updates

```typescript
// Bad: Multiple setState calls
setScore(score + 10);
setGiftsCollected(giftsCollected + 1);
setCombo(combo + 1);

// Good: Single update
setGameState(prev => ({
  ...prev,
  score: prev.score + 10,
  giftsCollected: prev.giftsCollected + 1,
  combo: prev.combo + 1,
}));
```

---

## 🎨 UI COMPONENTS (React Native)

### Button Component

```typescript
// src/components/Button.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function Button({ title, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#DC2626',
  },
  secondary: {
    backgroundColor: '#16A34A',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### HUD Component

```typescript
// src/components/HUD.tsx
import { View, Text, StyleSheet } from 'react-native';

export function HUD({ score, lives, level }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.emoji}>🎁</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.emoji}>❤️</Text>
        <Text style={styles.value}>{lives}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.value}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

---

## 🎯 HACKATHON DAY CHECKLIST

### Pre-Hackathon (Do Tonight!)

```bash
[ ] Install Expo CLI globally
[ ] Install Expo Go on your phone
[ ] Test: npx create-expo-app test-app
[ ] Test: Scan QR code → see app on phone
[ ] Delete test-app
[ ] Verify Claude API key works
[ ] Bookmark this file
```

### Day 1 - Setup (Minut 0-15)

```bash
[ ] npx create-expo-app grinch-game --template blank-typescript
[ ] npm install react-native-game-engine matter-js expo-av
[ ] npx expo start
[ ] All team members scan QR code
[ ] Everyone sees "Grinch Game" on their phone
[ ] Setup GitHub repo
[ ] Push initial commit
```

### Day 1 - Development (Minut 15-150)

```bash
[ ] Person 2: Basic game loop running
[ ] Person 1: AI endpoint tested and working
[ ] Person 3: Assets loaded and rendering
[ ] Person 4: UI screens complete
[ ] All: Test on phones every 30 min
```

### Day 1 - Deploy (Minut 150-165)

```bash
[ ] npx expo publish
[ ] Test published URL on multiple phones
[ ] Take screenshots (iOS + Android)
[ ] Prepare demo phone (fully charged)
[ ] Rehearse pitch
```

---

## 🏆 DEMO DAY STRATEGY

### Setup

```bash
# Morning of demo:
1. Phone fully charged (100%)
2. Expo Go app already open
3. Game already loaded
4. Airplane mode ON (avoid notifications)
5. Brightness 100%
6. Backup phone ready (teammate's phone)
```

### Demo Flow

```
1. Show phone to judges (physical device!)
2. "This is a native mobile game built in 2.5 hours"
3. Play live (tap to jump, collect gifts)
4. Show AI generation: "Generate New Level" button
5. Wait 3 seconds → new level appears
6. "Works on iOS and Android simultaneously"
7. Pass phone to judge: "Try it yourself"
```

**Natively.dev judges kommer ÄLSKA att ni använder deras stack! 🎯**

---

## 📚 RESOURCES

**Official Docs:**
- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- Matter.js: https://brm.io/matter-js/

**Game Examples:**
- https://github.com/bberak/react-native-game-engine-handbook
- https://blog.expo.dev/building-a-game-with-expo-4af3a53e8de0

**Troubleshooting:**
- https://docs.expo.dev/troubleshooting/overview/

---

## 🚀 READY TO WIN!

**Du har nu:**
- ✅ Complete Expo setup guide
- ✅ Game engine configuration
- ✅ Touch controls
- ✅ AI integration
- ✅ Deployment strategy
- ✅ Troubleshooting solutions

**Next step:** Läs uppdaterade GRINCH_GAME_IDEA.md för fullständigt game koncept! 🎮

**LÅT OSS BYGGA DET HÄR! 🔥📱🎄**
