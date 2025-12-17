# 🎮 GRINCH SMASHER - KOMPLETT BUILDPROMPT

**För Claude Opus 4.5 | Hackathon: Agentic Jul 2025-12-18**

---

## ANVÄND DENNA PROMPT IMORGON

Kopiera hela texten nedan och ge den till Claude när ni ska börja bygga:

---

# Bygg "Grinch Smasher" - Mobilt Spel

Du ska hjälpa mig bygga "Grinch Smasher" - ett mobilt spel i React Native + Expo för en hackathon med 2h 45min deadline.

## SPELKONCEPT

**Genre:** Whack-a-Mole med jul-tema

**Spelmekanik:**
- Spelare tar selfie som blir "julhuvud" i spelet
- Julhuvuden poppar upp från 3x3 rutnät av "skorstenar"
- Tryck på julhuvud innan det försvinner = +1 poäng
- 60 sekunder gameplay
- Game over → visa score + highscore
- Multiplier: 5 träffar i rad = 2x poäng, 10 träffar = 3x poäng

**Win Condition:** Slå ditt eget highscore

---

## TEKNISKA KRAV

**Platform:** React Native + Expo (managed workflow)

**Dependencies:**
```bash
npx create-expo-app grinch-smasher --template blank-typescript
cd grinch-smasher
npm install expo-camera expo-image-manipulator @react-native-async-storage/async-storage
```

**Tech Stack:**
- React Native + Expo
- TypeScript (föredras)
- Expo Camera (selfie)
- Expo Image Manipulator (crop till cirkel)
- React Native Animated (pop-up effekter)
- AsyncStorage (highscore)

---

## IMPLEMENTATION PLAN

### 🎯 PRIORITERING
- **MUST-HAVE:** Steg 1-7 (core gameplay loop)
- **NICE-TO-HAVE:** Steg 8-10 (polish)

**Om tid tar slut:** Skippa animationer och highscore. Fokusera på fungerande gameplay!

---

### Steg 1: Project Setup (5 min)

**Uppgift:**
```bash
npx create-expo-app grinch-smasher --template blank-typescript
cd grinch-smasher
npm install expo-camera expo-image-manipulator @react-native-async-storage/async-storage
```

**Verifiera:**
- `npx expo start` fungerar
- Kan scanna QR-kod med Expo Go
- Ser "Open up App.tsx to start working"

**Nästa:** Gå till Steg 2

---

### Steg 2: Selfie Screen (20 min)

**Uppgift:**
Skapa en `SelfieScreen.tsx` med:
- Expo Camera-vy (full screen)
- "Ta bild"-knapp (bottom center)
- Request camera permissions vid mount
- onPictureTaken: spara bild till state + navigera till GameScreen

**Kod-struktur:**
```typescript
import { Camera } from 'expo-camera';
import { useState, useRef } from 'react';

export function SelfieScreen({ onPictureTaken }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPictureTaken(photo.uri);
    }
  };

  // ... render Camera + button
}
```

**Fallback:**
Om kamera failar, använd `expo-image-picker` för att välja från galleri.

**Verifiera:**
- Kamera öppnas
- Kan ta bild
- Bild visas i console.log(photo.uri)

**Nästa:** Gå till Steg 3

---

### Steg 3: Bildbehandling (15 min)

**Uppgift:**
Använd `expo-image-manipulator` för att:
1. Crop bilden till kvadrat (centrerad)
2. Resize till 200x200px
3. Gör cirkulär mask (optional: lägg till jul-ram)

**Kod-exempel:**
```typescript
import * as ImageManipulator from 'expo-image-manipulator';

async function processImage(uri: string) {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [
      { resize: { width: 200, height: 200 } },
      { crop: { originX: 0, originY: 0, width: 200, height: 200 } }
    ],
    { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
  );

  return manipResult.uri;
}
```

**Verifiera:**
- Processad bild är 200x200px
- Laddas snabbt i Image-komponent

**Nästa:** Gå till Steg 4

---

### Steg 4: Game Board (30 min)

**Uppgift:**
Skapa `GameBoard.tsx` med:
- 3x3 grid layout (Flexbox)
- Varje cell = "skorsten" (View med bakgrund)
- State för varje cell: `{ visible: boolean, id: number }`

**Layout-struktur:**
```typescript
const GameBoard = ({ headImage }) => {
  const [cells, setCells] = useState(
    Array(9).fill(null).map((_, i) => ({ id: i, visible: false }))
  );

  return (
    <View style={styles.grid}>
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          visible={cell.visible}
          headImage={headImage}
          onPress={() => handlePress(cell.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: 360,
    height: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
```

**Cell-komponent:**
```typescript
const Cell = ({ visible, headImage, onPress }) => (
  <TouchableOpacity
    style={styles.cell}
    onPress={onPress}
    disabled={!visible}
  >
    <View style={styles.chimney}>
      {visible && (
        <Image source={{ uri: headImage }} style={styles.head} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: 120,
    height: 120,
    padding: 5,
  },
  chimney: {
    flex: 1,
    backgroundColor: '#8B4513',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
});
```

**Verifiera:**
- 3x3 grid renderas korrekt
- Kan visa/dölja huvud i cell manuellt

**Nästa:** Gå till Steg 5

---

### Steg 5: Spawn Logic (25 min)

**Uppgift:**
Implementera spawn-system för julhuvuden:
- Spawn random cell var 1 sekund (öka till 0.5 sek efter 30 sek)
- Varje huvud synligt 1.2 sekunder
- Max 3 huvuden samtidigt

**Kod:**
```typescript
const GameBoard = ({ headImage }) => {
  const [cells, setCells] = useState(/* ... */);
  const [gameTime, setGameTime] = useState(0);

  // Spawn logic
  useEffect(() => {
    const spawnRate = gameTime > 30 ? 500 : 1000;

    const spawnInterval = setInterval(() => {
      const visibleCount = cells.filter(c => c.visible).length;
      if (visibleCount >= 3) return;

      const hiddenCells = cells.filter(c => !c.visible);
      if (hiddenCells.length === 0) return;

      const randomIndex = Math.floor(Math.random() * hiddenCells.length);
      const cellToShow = hiddenCells[randomIndex];

      showHead(cellToShow.id);

      setTimeout(() => {
        hideHead(cellToShow.id);
      }, 1200);
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [cells, gameTime]);

  const showHead = (id: number) => {
    setCells(prev => prev.map(c =>
      c.id === id ? { ...c, visible: true } : c
    ));
  };

  const hideHead = (id: number) => {
    setCells(prev => prev.map(c =>
      c.id === id ? { ...c, visible: false } : c
    ));
  };
};
```

**Verifiera:**
- Huvuden spawnar random
- Max 3 samtidigt
- Försvinner efter 1.2 sek
- Spawn-rate ökar efter 30 sek

**Nästa:** Gå till Steg 6

---

### Steg 6: Interaktion + Score (15 min)

**Uppgift:**
Lägg till tap-handling och score-system:
- onPress cell: om visible = true → +poäng + dölj huvud
- Multiplier: 5 i rad = 2x, 10 i rad = 3x
- Miss (tap på tom cell) = reset multiplier

**Kod:**
```typescript
const GameBoard = ({ headImage }) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const handlePress = (cellId: number) => {
    const cell = cells.find(c => c.id === cellId);

    if (cell?.visible) {
      // HIT!
      hideHead(cellId);

      const newStreak = streak + 1;
      setStreak(newStreak);

      // Update multiplier
      if (newStreak >= 10) setMultiplier(3);
      else if (newStreak >= 5) setMultiplier(2);
      else setMultiplier(1);

      setScore(prev => prev + (10 * multiplier));
    } else {
      // MISS!
      setStreak(0);
      setMultiplier(1);
    }
  };

  return (
    <View>
      <Text style={styles.score}>
        Score: {score} | x{multiplier}
      </Text>
      {/* ... GameBoard */}
    </View>
  );
};
```

**Verifiera:**
- Poäng ökar vid träff
- Multiplier ökar vid streak
- Streak reset vid miss

**Nästa:** Gå till Steg 7

---

### Steg 7: Game Loop + Timer (20 min)

**Uppgift:**
Implementera:
- 60 sekunder countdown timer
- Game state: 'playing' | 'gameOver'
- Game over screen med score + "Spela igen"

**Kod:**
```typescript
const GameScreen = ({ headImage }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');
  const [finalScore, setFinalScore] = useState(0);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          setFinalScore(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score]);

  const resetGame = () => {
    setTimeLeft(60);
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setMultiplier(1);
  };

  if (gameState === 'gameOver') {
    return (
      <View style={styles.gameOver}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.finalScore}>Score: {finalScore}</Text>
        <TouchableOpacity onPress={resetGame} style={styles.button}>
          <Text style={styles.buttonText}>Spela Igen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.timer}>⏱️ {timeLeft}s</Text>
      <GameBoard headImage={headImage} />
    </View>
  );
};
```

**Verifiera:**
- Timer counts down från 60
- Game over efter 60 sek
- Kan starta ny runda

**Nästa:** Steg 8 (optional)

---

### Steg 8: Animations (15 min) - OPTIONAL

**Uppgift:**
Lägg till animationer med React Native Animated:
- Pop-up: translateY från botten + scale
- Disappear: scale to 0
- Score pulse när poäng läggs till

**Kod-exempel:**
```typescript
const Cell = ({ visible, headImage, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      translateYAnim.setValue(50);
    }
  }, [visible]);

  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <View style={styles.chimney}>
        {visible && (
          <Animated.Image
            source={{ uri: headImage }}
            style={[
              styles.head,
              {
                transform: [
                  { scale: scaleAnim },
                  { translateY: translateYAnim }
                ]
              }
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
```

**VIKTIGT:** Använd `useNativeDriver: true` för smooth animations!

**Verifiera:**
- Huvuden "poppar upp" smooth
- Försvinner med animation

**Nästa:** Steg 9 (optional)

---

### Steg 9: Highscore (10 min) - OPTIONAL

**Uppgift:**
Spara highscore med AsyncStorage:

**Kod:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const [highScore, setHighScore] = useState(0);

// Load highscore vid mount
useEffect(() => {
  loadHighScore();
}, []);

const loadHighScore = async () => {
  try {
    const saved = await AsyncStorage.getItem('highscore');
    if (saved) setHighScore(parseInt(saved));
  } catch (e) {
    console.error('Failed to load highscore', e);
  }
};

const saveHighScore = async (score: number) => {
  try {
    if (score > highScore) {
      await AsyncStorage.setItem('highscore', score.toString());
      setHighScore(score);
    }
  } catch (e) {
    console.error('Failed to save highscore', e);
  }
};

// I game over:
useEffect(() => {
  if (gameState === 'gameOver') {
    saveHighScore(finalScore);
  }
}, [gameState]);
```

**Verifiera:**
- Highscore sparas
- Visas i game over screen

**Nästa:** Steg 10 (optional)

---

### Steg 10: Polish (10 min) - OPTIONAL

**Uppgift:**
Final polish:
1. Jul-bakgrund (snöflingor, röd/grön färgschema)
2. Ljudeffekt vid träff (expo-av) - bara om tid finns
3. Haptic feedback vid träff (Haptics.impactAsync)

**Enkel bakgrund:**
```typescript
<LinearGradient
  colors={['#1e3a8a', '#1e40af', '#3b82f6']}
  style={styles.background}
>
  {/* Game content */}
</LinearGradient>
```

**Haptic feedback:**
```typescript
import * as Haptics from 'expo-haptics';

const handlePress = (cellId: number) => {
  if (cell?.visible) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // ... rest of code
  }
};
```

**Verifiera:**
- Ser professionellt ut
- Vibration vid träff (kräver fysisk enhet)

---

## TEKNISKA DETALJER

### App Structure
```
grinch-smasher/
├── App.tsx (navigation mellan screens)
├── screens/
│   ├── SelfieScreen.tsx
│   ├── GameScreen.tsx
│   └── GameOverScreen.tsx
├── components/
│   ├── GameBoard.tsx
│   └── Cell.tsx
└── utils/
    ├── imageProcessor.ts
    └── storage.ts
```

### Performance Tips
1. **useNativeDriver: true** på alla animationer
2. Använd `React.memo()` på Cell-komponenten
3. Debounce spawn logic om laggar
4. Komprimera bilder till max 200x200px

### Common Pitfalls
1. **Kamera permissions:** Hantera alltid rejected permissions
2. **Image caching:** Använd `Image.prefetch()` för selfie
3. **Memory leaks:** Rensa alla intervals i cleanup
4. **Spawn timing:** Testa på fysisk enhet, inte simulator

---

## DEBUGGING CHECKLIST

Om något inte fungerar:

**Expo Camera kraschar:**
```bash
# Fallback till image picker
expo install expo-image-picker
```

**Animationer laggar:**
```javascript
// Sätt useNativeDriver: true
Animated.timing(value, { useNativeDriver: true })
```

**Huvuden spawnar inte:**
```javascript
// Logga spawn events
console.log('Spawning head at cell:', cellId);
```

**Timer stannar:**
```javascript
// Kontrollera dependencies i useEffect
useEffect(() => { /* timer */ }, [gameState, score]);
```

---

## OUTPUT REQUIREMENTS

**Must Deliver:**
- ✅ Fungerande app på fysisk enhet
- ✅ Kan ta selfie (eller välja från galleri)
- ✅ 3x3 grid med spawning heads
- ✅ Tap-interaktion fungerar
- ✅ 60s timer + game over
- ✅ Score counter

**Nice to Have:**
- ⭐ Smooth animationer
- ⭐ Highscore persistence
- ⭐ Multiplier system
- ⭐ Haptic feedback
- ⭐ Ljudeffekter

---

## EXECUTION STRATEGY

1. **Börja med Steg 1** och be om feedback innan nästa steg
2. **Testa kontinuerligt** på fysisk enhet (inte simulator)
3. **Om tid tar slut:** Prioritera gameplay över polish
4. **Commit kod var 20:e minut** till Git
5. **Sista 30 min:** Testa + förbered demo

---

## SUCCESS CRITERIA

**Minimum Viable Demo:**
- Selfie tas → blir julhuvud
- Huvuden spawnar och försvinner
- Tap fungerar → score ökar
- Timer counts down → game over

**Winning Demo:**
- Ovanstående + animationer
- Highscore sparas
- Multiplier system
- Polished UI

---

**Börja med Steg 1 nu. När du är klar, rapportera tillbaka och be om feedback innan du fortsätter till Steg 2.**

Good luck! 🎄🎮
