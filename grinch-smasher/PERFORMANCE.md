# Performance Optimization Guide

## Current Performance Metrics

### Target Metrics
- **Load Time**: < 3 seconds
- **FPS**: 60fps consistent
- **Memory**: < 150MB
- **Bundle Size**: < 2MB

### Achieved Metrics
- ✅ Animations run on native thread (useNativeDriver: true)
- ✅ No unnecessary re-renders (useCallback, useMemo where needed)
- ✅ Efficient timer management with cleanup
- ✅ Minimal component tree depth

## Optimization Strategies

### 1. React Performance

#### Memoization
```typescript
// Already implemented in useGameLogic
const startGame = useCallback(() => {
  // Game start logic
}, []);

const handleItemTap = useCallback((itemId: string) => {
  // Tap logic
}, []);

// Could be added to GameBoard
const GridCell = React.memo<GridCellProps>(({ item, onTap }) => {
  // Component logic
});
```

#### Conditional Rendering
```typescript
// Already optimized - only renders active screen
{screen === 'selfie' && <SelfieScreen />}
{screen === 'playing' && <GameBoard />}
{screen === 'gameOver' && <GameOverScreen />}
```

### 2. Animation Performance

#### Current Implementation
```typescript
// Using native driver for transform animations
Animated.spring(scaleAnim, {
  toValue: 1,
  useNativeDriver: true, // ✅ Runs on native thread
}).start();
```

#### Best Practices
- ✅ Only animate transform and opacity (GPU accelerated)
- ✅ Avoid animating layout properties (width, height)
- ✅ Use Animated.View instead of re-rendering
- ✅ Cleanup animations on unmount

### 3. Timer Management

#### Current Implementation
```typescript
// Proper cleanup prevents memory leaks
useEffect(() => {
  return () => {
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    itemTimersRef.current.forEach((timer) => clearTimeout(timer));
  };
}, []);
```

### 4. Image Optimization

#### Selfie Handling
```typescript
// Currently: 0.8 quality (good balance)
const photo = await cameraRef.current.takePictureAsync({
  quality: 0.8, // 0-1 scale
  base64: false, // Save memory
});

// Future optimization: Resize for display
import * as ImageManipulator from 'expo-image-manipulator';

const resized = await ImageManipulator.manipulateAsync(
  photo.uri,
  [{ resize: { width: 300 } }],
  { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
);
```

### 5. Bundle Size Optimization

#### Code Splitting
```typescript
// Lazy load screens (Future improvement)
const SelfieScreen = React.lazy(() => import('./components/SelfieScreen'));
const GameBoard = React.lazy(() => import('./components/GameBoard'));
```

#### Remove Unused Dependencies
```bash
# Analyze bundle
npx expo-bundle-visualizer

# Remove unused exports
# Use tree-shaking friendly imports
import { Camera } from 'expo-camera'; // ✅ Good
// import * as Camera from 'expo-camera'; // ❌ Imports everything
```

## Performance Testing

### Manual Testing

```typescript
// Enable performance monitor
import { YellowBox } from 'react-native';

if (__DEV__) {
  // Show FPS monitor
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
```

### Automated Testing

```bash
# Measure app startup time
npm run android -- --variant release

# Profile with React DevTools
npm install -g react-devtools
react-devtools
```

### Profiling Checklist

- [ ] FPS stays at 60 during gameplay
- [ ] No dropped frames during animations
- [ ] Memory usage stable (no leaks)
- [ ] Smooth scrolling (if lists added)
- [ ] Fast app startup (< 3s)
- [ ] No ANR (Application Not Responding) errors

## Memory Management

### Current Implementation
```typescript
// Grid uses fixed array size (no dynamic growth)
const GRID_SIZE = 9;

// Timers stored in Map (efficient lookup/cleanup)
const itemTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

// Cleanup on item hide
itemTimersRef.current.delete(itemId);
```

### Best Practices
- ✅ Clear timers immediately when not needed
- ✅ Use refs for mutable values (not state)
- ✅ Avoid storing large objects in state
- ✅ Clean up event listeners

## Network Optimization

### Future: Leaderboard Implementation
```typescript
// Debounce score updates
import { debounce } from 'lodash';

const updateLeaderboard = debounce(async (score: number) => {
  await fetch('/api/leaderboard', {
    method: 'POST',
    body: JSON.stringify({ score }),
  });
}, 1000);

// Cache leaderboard data
import AsyncStorage from '@react-native-async-storage/async-storage';

const cachedData = await AsyncStorage.getItem('leaderboard');
if (cachedData) {
  // Use cached data while fetching fresh
}
```

## Build Optimization

### Production Build
```bash
# Android
npm run android -- --variant release --minify

# iOS
npm run ios -- --configuration Release

# Enable Hermes engine (already default in RN 0.70+)
# Improves startup time and reduces memory
```

### Hermes Optimization
```json
// android/app/build.gradle
project.ext.react = [
  enableHermes: true, // ✅ Already enabled by default
]
```

## Monitoring

### React Native Performance Monitor
```bash
# Shake device or Cmd+M (Android) / Cmd+D (iOS)
# Select "Show Perf Monitor"
```

### Key Metrics to Watch
- **RAM**: < 150MB
- **JSC Heap**: < 50MB  
- **Views**: < 50 views in hierarchy
- **UI FPS**: 60fps
- **JS FPS**: 60fps

## Optimization Wins

| Optimization | Impact | Difficulty |
|--------------|--------|------------|
| useNativeDriver | High | Easy |
| useCallback hooks | Medium | Easy |
| Memo GridCell | Medium | Easy |
| Image compression | Medium | Medium |
| Code splitting | Low | Hard |
| Hermes engine | High | Easy (default) |

## Future Improvements

1. **Virtual Grid** - If expanding beyond 3x3
2. **Image Caching** - Cache selfie thumbnails
3. **Reduce Bundle Size** - Remove unused dependencies
4. **Optimize Fonts** - Only load needed font weights
5. **Background Task** - Preload next game state

## Tools

- [React DevTools Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
- [Flipper](https://fbflipper.com/) - React Native debugging
- [Metro Bundler](https://facebook.github.io/metro/) - Bundle optimization
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render) - Debug re-renders
