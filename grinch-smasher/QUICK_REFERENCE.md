# Quick Reference Card

## Commands

```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS
npm test            # Run tests
```

## Key Files

| File | Purpose | Lines |
|------|---------|-------|
| App.tsx | Main app component | 428 |
| components/SelfieScreen.tsx | Camera capture | 150 |
| components/GameBoard.tsx | Game grid | 150 |
| hooks/useGameLogic.ts | Game logic | 200 |

## Component APIs

### SelfieScreen
```tsx
<SelfieScreen onSelfieTaken={(uri) => {}} />
```

### GameBoard
```tsx
<GameBoard grid={grid} onItemTap={(id) => {}} />
```

### useGameLogic
```tsx
const { score, timeLeft, isPlaying, grid, startGame, handleItemTap } = useGameLogic();
```

## Game Constants

```typescript
GRID_SIZE = 9              // 3x3
GAME_DURATION = 60         // seconds
SPAWN_INTERVAL = 800       // ms
ITEM_DISPLAY_TIME = 1500   // ms
```

## Scoring

- Grinch tap: **+10**
- Present tap: **-5**
- Minimum: **0**

## Colors

```typescript
// Gradient
['#1e3a8a', '#7e22ce', '#be123c']

// Grinch
'#16a34a'

// Present
'#dc2626'
```

## State Flow

```
selfie → ready → playing → gameOver
  ↑                           ↓
  └───────────────────────────┘
```

## Troubleshooting

### Camera not working
1. Check permissions in app settings
2. Restart app
3. Clear cache: `npm start -- --clear`

### Build errors
1. `rm -rf node_modules package-lock.json`
2. `npm install`
3. `npx expo start -c`

## Performance Tips

- Use `useCallback` for callbacks
- Enable `useNativeDriver` for animations
- Clean up timers in `useEffect`
- Avoid inline functions in render

## Testing Checklist

- [ ] Camera permission works
- [ ] Selfie captured successfully
- [ ] Game starts and timer counts down
- [ ] Tapping grinch adds 10 points
- [ ] Tapping present subtracts 5 points
- [ ] Game ends at 0 seconds
- [ ] High score saves correctly
- [ ] Play again resets game

## Accessibility

```tsx
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Start game"
>
```

## Common Imports

```typescript
import { SelfieScreen, GameBoard } from './components';
import { useGameLogic } from './hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
```
