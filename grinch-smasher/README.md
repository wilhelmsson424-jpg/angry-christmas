# 🎅 Grinch Smasher 🎄

A festive Christmas-themed mobile game built with React Native and Expo. Smash grinches, avoid presents, and compete for the high score!

## Features

- 📸 Selfie capture before gameplay
- 🎮 Fast-paced whack-a-mole style gameplay
- ⏱️ 60-second countdown timer
- 🏆 Persistent high score tracking
- 🎨 Beautiful Christmas-themed UI with gradient backgrounds
- ✨ Smooth animations and transitions
- 📱 Fully responsive design

## Screenshots

```
[Selfie Screen] → [Game Ready] → [Playing] → [Game Over]
```

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on device
npm run android  # Android
npm run ios      # iOS
npm run web      # Web browser
```

## Game Rules

- **Tap Grinches (😈)**: +10 points
- **Avoid Presents (🎁)**: -5 points
- **Timer**: 60 seconds to get the highest score
- **Challenge**: Items disappear after 1.5 seconds!

## Project Structure

```
grinch-smasher/
├── App.tsx                    # Main app component
├── components/
│   ├── SelfieScreen.tsx      # Camera/selfie capture
│   ├── GameBoard.tsx         # 3x3 game grid
│   └── index.ts              # Component exports
├── hooks/
│   ├── useGameLogic.ts       # Game state & logic
│   └── index.ts              # Hook exports
├── __tests__/
│   └── App.test.tsx          # Unit tests
├── GAME_DOCUMENTATION.md     # Detailed game docs
├── ACCESSIBILITY.md          # Accessibility guide
├── PERFORMANCE.md            # Performance optimization
└── package.json
```

## Component Usage

### SelfieScreen

```tsx
import { SelfieScreen } from './components/SelfieScreen';

<SelfieScreen 
  onSelfieTaken={(uri) => {
    console.log('Selfie saved:', uri);
    // Proceed to game
  }} 
/>
```

**Props:**
- `onSelfieTaken: (uri: string) => void` - Callback with photo URI

**Features:**
- Camera permission handling
- Front-facing camera
- Circular guide overlay
- Error handling

### GameBoard

```tsx
import { GameBoard } from './components/GameBoard';

<GameBoard 
  grid={grid}
  onItemTap={(itemId) => {
    console.log('Item tapped:', itemId);
  }}
/>
```

**Props:**
- `grid: GridItem[]` - Array of 9 grid items
- `onItemTap: (itemId: string) => void` - Tap callback

**Features:**
- 3x3 responsive grid
- Spring animations on item appearance
- Tap feedback animations
- Auto-sizing based on screen width

### useGameLogic Hook

```tsx
import { useGameLogic } from './hooks/useGameLogic';

function GameComponent() {
  const {
    score,        // Current score
    timeLeft,     // Seconds remaining
    isPlaying,    // Game active state
    grid,         // 9-item grid array
    startGame,    // Start/reset game
    endGame,      // End game early
    handleItemTap // Handle item tap
  } = useGameLogic();

  return (
    <View>
      <Text>Score: {score}</Text>
      <Text>Time: {timeLeft}s</Text>
      <GameBoard grid={grid} onItemTap={handleItemTap} />
      {!isPlaying && (
        <Button onPress={startGame} title="Start" />
      )}
    </View>
  );
}
```

**Returns:**
- `score: number` - Current game score
- `timeLeft: number` - Seconds remaining (0-60)
- `isPlaying: boolean` - Is game currently active
- `grid: GridItem[]` - Grid state (9 items)
- `startGame: () => void` - Start new game
- `endGame: () => void` - End current game
- `handleItemTap: (itemId: string) => void` - Process item tap

**GridItem Type:**
```typescript
interface GridItem {
  id: string;
  type: 'grinch' | 'present' | 'empty';
  isVisible: boolean;
}
```

## Configuration

### Game Constants

```typescript
// hooks/useGameLogic.ts
const GRID_SIZE = 9;           // 3x3 grid
const GAME_DURATION = 60;      // 60 seconds
const SPAWN_INTERVAL = 800;    // 800ms between spawns
const ITEM_DISPLAY_TIME = 1500; // 1.5s visible time
```

### Scoring

```typescript
// Grinch tap: +10
// Present tap: -5
// Minimum score: 0 (no negatives)
```

## Styling

### Color Palette

```typescript
// Gradient background
colors={['#1e3a8a', '#7e22ce', '#be123c']}

// Grinch (green)
backgroundColor: '#16a34a'

// Present (red)  
backgroundColor: '#dc2626'

// Text (white with shadow)
color: '#fff'
textShadowColor: 'rgba(0, 0, 0, 0.5)'
```

### Typography

- **Title**: 28px, bold, white
- **Score**: 24-64px, bold, white
- **Instructions**: 16px, regular, light gray
- **Buttons**: 18-24px, bold, white

## Performance

- **Load Time**: < 3 seconds
- **FPS**: Consistent 60fps with native animations
- **Memory**: < 150MB
- **Bundle**: Optimized with Hermes engine

See [PERFORMANCE.md](/home/rickard/angry-christmas/grinch-smasher/PERFORMANCE.md) for details.

## Accessibility

- Large touch targets (48x48dp minimum)
- High contrast text and backgrounds
- Clear visual feedback
- Readable font sizes (16px+)

See [ACCESSIBILITY.md](/home/rickard/angry-christmas/grinch-smasher/ACCESSIBILITY.md) for complete checklist.

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

See [__tests__/App.test.tsx](/home/rickard/angry-christmas/grinch-smasher/__tests__/App.test.tsx) for test structure.

## Dependencies

```json
{
  "expo": "~54.0.29",
  "expo-camera": "^17.0.10",
  "expo-linear-gradient": "^14.0.1",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

## Development

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Props interfaces for all components
- JSDoc comments for documentation
- Consistent naming conventions

### Best Practices

```typescript
// ✅ Use useCallback for functions passed as props
const handleTap = useCallback((id: string) => {
  // logic
}, []);

// ✅ Use native driver for animations
Animated.spring(anim, {
  toValue: 1,
  useNativeDriver: true,
}).start();

// ✅ Clean up timers and listeners
useEffect(() => {
  return () => {
    clearInterval(timer);
  };
}, []);
```

## Troubleshooting

### Camera Not Working

```bash
# Android: Check permissions in AndroidManifest.xml
<uses-permission android:name="android.permission.CAMERA" />

# iOS: Check Info.plist
<key>NSCameraUsageDescription</key>
<string>Take a festive selfie!</string>
```

### Build Errors

```bash
# Clear cache
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset Metro bundler
npx expo start -c
```

## Future Enhancements

- [ ] Multiplayer mode
- [ ] Power-ups (freeze time, double points)
- [ ] Difficulty levels
- [ ] Sound effects and music
- [ ] Global leaderboard
- [ ] Achievement system
- [ ] Social sharing
- [ ] Haptic feedback

## License

MIT

## Author

Built with React Native and Expo for a festive coding challenge! 🎄

---

**Merry Christmas and Happy Gaming!** 🎅
