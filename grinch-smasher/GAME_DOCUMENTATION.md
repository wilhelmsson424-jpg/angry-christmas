# Grinch Smasher - Game Documentation

## Overview
A festive Christmas-themed whack-a-mole style game built with React Native and Expo.

## Game Flow

### 1. Selfie Screen
- User must take a selfie before playing
- Camera permission request
- Front-facing camera with circular guide
- Clean, festive UI

### 2. Ready Screen  
- Displays game instructions
- Shows current high score
- "Start Game" button

### 3. Playing Screen
- 3x3 grid of interactive cells
- Grinches (😈) and presents (🎁) appear randomly
- 60-second countdown timer
- Real-time score display
- Smooth animations for item appearances

### 4. Game Over Screen
- Final score display
- High score indicator (with trophy if new record)
- "Play Again" button
- "New Selfie" button

## Scoring System
- **+10 points**: Tap a grinch
- **-5 points**: Tap a present
- Minimum score: 0 (cannot go negative)

## Technical Architecture

### Components

#### `/components/SelfieScreen.tsx`
```typescript
interface SelfieScreenProps {
  onSelfieTaken: (uri: string) => void;
}
```
- Handles camera permissions
- Captures selfie using expo-camera
- Error handling for permission denial
- Responsive design

#### `/components/GameBoard.tsx`
```typescript
interface GameBoardProps {
  grid: GridItem[];
  onItemTap: (itemId: string) => void;
}
```
- Renders 3x3 grid
- Animated item appearances (spring animation)
- Touch feedback with scale animations
- Responsive cell sizing

### Hooks

#### `/hooks/useGameLogic.ts`
```typescript
export const useGameLogic = () => {
  return {
    score: number;
    timeLeft: number;
    isPlaying: boolean;
    grid: GridItem[];
    startGame: () => void;
    endGame: () => void;
    handleItemTap: (itemId: string) => void;
  };
}
```

**Game Constants:**
- Grid Size: 9 (3x3)
- Game Duration: 60 seconds
- Spawn Interval: 800ms
- Item Display Time: 1500ms
- Grinch Spawn Rate: 70%
- Present Spawn Rate: 30%

**Logic:**
- Timer management with useRef to prevent memory leaks
- Random item spawning on available cells
- Auto-hide items after display time
- Score calculation based on item type
- Cleanup on unmount

### State Management

#### App.tsx State
```typescript
type GameScreen = 'selfie' | 'ready' | 'playing' | 'gameOver';

const [screen, setScreen] = useState<GameScreen>('selfie');
const [selfieUri, setSelfieUri] = useState<string | null>(null);
const [highScore, setHighScore] = useState(0);
const [fadeAnim] = useState(new Animated.Value(0));
```

## Performance Optimizations

1. **useCallback hooks** - Prevents unnecessary re-renders
2. **Animated.Value** - Native driver for smooth 60fps animations
3. **Timer cleanup** - Proper useEffect cleanup prevents memory leaks
4. **Conditional rendering** - Only renders active screen
5. **useRef for timers** - Avoids stale closure issues

## Accessibility Features

### Current Implementation
- ✅ Large touch targets (cells are 30%+ of screen width)
- ✅ High contrast colors (white text on dark backgrounds)
- ✅ Clear visual feedback on interactions
- ✅ Readable font sizes (16px minimum)
- ✅ Semantic button components

### To Improve
- ⚠️ Add ARIA labels for screen readers
- ⚠️ Keyboard navigation support (for web)
- ⚠️ Haptic feedback on taps
- ⚠️ Sound effects toggle
- ⚠️ Adjustable game difficulty/speed

## Styling

### Color Palette
- **Primary Gradient**: Blue (#1e3a8a) → Purple (#7e22ce) → Red (#be123c)
- **Grinch**: Green (#16a34a)
- **Present**: Red (#dc2626)
- **Text**: White (#fff) with shadows
- **Overlays**: White with 15-20% opacity

### Typography
- Title: 28px, bold
- Score: 24-64px, bold
- Instructions: 16px, regular
- Buttons: 18-24px, bold

## Storage

### AsyncStorage Keys
- `@grinch_smasher_highscore`: Persistent high score

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

## Build & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Testing Checklist

### Functional Tests
- [ ] Camera permission request works
- [ ] Camera permission denial handled gracefully
- [ ] Selfie capture saves URI correctly
- [ ] Game timer counts down accurately
- [ ] Items spawn at correct intervals
- [ ] Items auto-hide after 1.5 seconds
- [ ] Tapping grinch adds 10 points
- [ ] Tapping present subtracts 5 points
- [ ] Score never goes below 0
- [ ] Game ends at 0 seconds
- [ ] High score persists across sessions
- [ ] High score updates when exceeded
- [ ] "Play Again" resets game state
- [ ] "New Selfie" returns to camera

### UI Tests
- [ ] All text is readable
- [ ] Buttons are easily tappable
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts during gameplay
- [ ] Responsive on different screen sizes
- [ ] Safe area respected on notched devices

### Edge Cases
- [ ] Multiple rapid taps on same item
- [ ] Tapping empty cells does nothing
- [ ] Camera unavailable scenario
- [ ] Background/foreground app transitions
- [ ] Low memory situations
- [ ] Network unavailable (AsyncStorage)

## Future Enhancements

1. **Multiplayer Mode** - Compete with friends
2. **Power-ups** - Freeze time, double points, etc.
3. **Difficulty Levels** - Easy, Medium, Hard
4. **Sound Effects** - Christmas jingles and tap sounds
5. **Leaderboard** - Global rankings
6. **Achievements** - Unlock badges
7. **Selfie Integration** - Show selfie during gameplay
8. **Social Sharing** - Share scores on social media
9. **Themes** - Different holiday themes
10. **Haptic Feedback** - Vibration on taps

## Known Issues

- None currently reported

## License
MIT
