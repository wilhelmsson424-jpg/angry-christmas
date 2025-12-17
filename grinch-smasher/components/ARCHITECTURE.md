# GameBoard Component - Architecture Diagram

## Component Hierarchy

```
App
└── Game Screen
    ├── Header (Score, Timer)
    ├── GameBoard ⭐
    │   └── Grid Container
    │       └── GridCell (x9)
    │           ├── TouchableOpacity
    │           ├── Cell Container
    │           └── Animated.View (when visible)
    │               └── Item Display
    │                   ├── Background (grinch/present)
    │                   └── Emoji (😈/🎁)
    └── Footer (Start/End buttons)
```

## Data Flow

```
useGameLogic Hook
├── State Management
│   ├── score: number
│   ├── timeLeft: number
│   ├── isPlaying: boolean
│   └── grid: GridItem[]
│
├── Timers
│   ├── Game Timer (1s intervals)
│   ├── Spawn Timer (800ms intervals)
│   └── Item Auto-Hide Timers (1500ms each)
│
└── Functions
    ├── startGame()
    ├── endGame()
    ├── handleItemTap(id)
    └── spawnRandomItem()
        ↓
GameBoard Component
├── Props: { grid, onItemTap }
├── Renders: 9 GridCell components
└── Handles: Touch events → onItemTap
        ↓
GridCell Component
├── Props: { item, onTap, index }
├── State: Animated.Value (scale)
├── Effects: Pop-in/Pop-out animations
└── Handles: Touch → Animation → onTap callback
```

## State Flow Diagram

```
Game Start
    ↓
Initialize Grid (9 empty cells)
    ↓
Start Timers
    ├── Game Timer (countdown)
    └── Spawn Timer (create items)
        ↓
    Spawn Item
        ├── Find empty cell
        ├── Set type (grinch/present)
        ├── Set visible = true
        └── Start auto-hide timer
            ↓
        Item Visible
            ├── User Taps → handleItemTap()
            │   ├── Update score
            │   ├── Clear auto-hide timer
            │   ├── Set visible = false
            │   └── Trigger pop-out animation
            │
            └── Timer Expires (1500ms)
                ├── Set visible = false
                └── Reset to empty
    ↓
Time Expires (60s)
    ↓
End Game
    ├── Clear all timers
    ├── Hide all items
    └── Display final score
```

## Animation Lifecycle

```
Item Spawn Triggered
    ↓
GridCell receives item.isVisible = true
    ↓
useEffect detects change
    ↓
[Pop-in Animation Starts]
    ↓
Animated.spring(scaleAnim, {
    from: 0,
    to: 1,
    duration: ~300ms
})
    ↓
[Item Fully Visible]
    ↓
User Taps Cell
    ↓
handlePress() called
    ↓
[Pop-out Animation Starts]
    ↓
Animated.sequence([
    timing(scale, { to: 1.2, duration: 100ms }),
    timing(scale, { to: 0, duration: 150ms })
])
    ↓
Animation Complete → onTap() callback
    ↓
Parent updates grid state
    ↓
[Item Hidden]
```

## Grid Layout Structure

```
Visual Grid (3x3):

┌─────────┬─────────┬─────────┐
│ Cell 0  │ Cell 1  │ Cell 2  │
│  (😈)   │         │  (🎁)   │
├─────────┼─────────┼─────────┤
│ Cell 3  │ Cell 4  │ Cell 5  │
│         │  (😈)   │         │
├─────────┼─────────┼─────────┤
│ Cell 6  │ Cell 7  │ Cell 8  │
│  (🎁)   │         │  (😈)   │
└─────────┴─────────┴─────────┘

Data Structure:
grid = [
  { id: "0", type: "grinch", isVisible: true },
  { id: "1", type: "empty", isVisible: false },
  { id: "2", type: "present", isVisible: true },
  { id: "3", type: "empty", isVisible: false },
  { id: "4", type: "grinch", isVisible: true },
  { id: "5", type: "empty", isVisible: false },
  { id: "6", type: "present", isVisible: true },
  { id: "7", type: "empty", isVisible: false },
  { id: "8", type: "grinch", isVisible: true },
]
```

## Event Flow

```
User Interaction Flow:

Touch Down on Cell
    ↓
TouchableOpacity detects press
    ↓
activeOpacity: 0.8 (visual feedback)
    ↓
onPress handler fired
    ↓
Check: item.isVisible === true?
    ├── NO → Do nothing (disabled)
    └── YES → Continue
        ↓
    Start pop-out animation
        ↓
    Call onTap() → handleItemTap(itemId)
        ↓
    Parent component (useGameLogic)
        ├── Find item by id
        ├── Check type
        │   ├── grinch → score += 10
        │   └── present → score -= 5
        ├── Clear auto-hide timer
        └── Update grid state
            ↓
        GridCell receives new props
            ↓
        item.isVisible = false
            ↓
        Component re-renders (item hidden)
```

## Performance Optimization Points

```
Component Tree:
GameBoard (Level 1)
    ↓
GridCell x9 (Level 2)
    ↓
Optimization Opportunities:

1. Memoize GridCell
   └── React.memo(GridCell, customComparison)

2. Stable callbacks
   └── useCallback(onItemTap, [dependencies])

3. Native animations
   └── useNativeDriver: true

4. Avoid inline styles
   └── StyleSheet.create({ ... })

5. Efficient state updates
   └── Only changed cells re-render
```

## Responsive Layout Calculation

```
Screen Width: 375px (iPhone SE)
    ↓
Available Width = screenWidth - 80px
                = 375px - 80px = 295px
    ↓
Cell Size = availableWidth / 3
          = 295px / 3 = 98.3px
    ↓
Cell Dimensions:
    Width: 98.3px - 10px = 88.3px
    Height: 88.3px - 10px = 88.3px
    Margin: 5px
    Gap: 10px
    ↓
Grid Layout:
[88.3px] [10px] [88.3px] [10px] [88.3px]
```

## TypeScript Type Hierarchy

```
GridItem (Base Interface)
├── id: string
├── type: 'grinch' | 'present' | 'empty'
└── isVisible: boolean

GameBoardProps (Component Props)
├── grid: GridItem[]
└── onItemTap: (itemId: string) => void

GridCellProps (Sub-component Props)
├── item: GridItem
├── onTap: () => void
└── index: number

GameState (Hook State)
├── score: number
├── timeLeft: number
├── isPlaying: boolean
└── grid: GridItem[]
```

## Styling Architecture

```
StyleSheet.create({
    Container Styles
    ├── container (GameBoard outer)
    ├── grid (Grid container)
    └── cell (Individual cell)
        
    Layout Styles
    ├── cellInner (Cell content)
    ├── itemContainer (Animated wrapper)
    └── item (Item display)
        
    Theme Styles
    ├── grinch (Green background)
    └── present (Red background)
        
    Typography
    └── itemEmoji (48px emoji)
})

Dynamic Styles:
├── Calculated: CELL_SIZE = (width - 80) / 3
├── Responsive: width from Dimensions API
└── Platform-specific: elevation vs shadow
```

## File Dependencies

```
GameBoard.tsx
├── Imports
│   ├── React (hooks)
│   ├── React Native (View, TouchableOpacity, etc)
│   └── ../hooks/useGameLogic (GridItem interface)
│
├── Exports
│   └── GameBoard component (named export)
│
└── Used By
    ├── App.tsx (main game screen)
    └── components/index.ts (re-export)
```

## Testing Strategy

```
Unit Tests (GameBoard.test.tsx)
├── Rendering Tests
│   ├── Renders 3x3 grid
│   ├── Shows items when visible
│   └── Hides items when not visible
│
├── Interaction Tests
│   ├── Calls onItemTap with correct id
│   ├── Disabled state prevents taps
│   └── Touch feedback works
│
├── Performance Tests
│   ├── Handles rapid updates
│   ├── Memory doesn't leak
│   └── Animations are smooth
│
└── Accessibility Tests
    ├── Touch targets are large enough
    ├── Screen reader support
    └── Keyboard navigation
```

## Build & Deploy Flow

```
Development
├── npm start
├── Expo Dev Server
└── Hot Reload
    ↓
Testing
├── npm test
├── Jest + React Native Testing Library
└── Unit + Integration Tests
    ↓
Build
├── npm run ios / android
├── Expo Build Service
└── Native Compilation
    ↓
Production
├── Optimized Bundle
├── Hermes Engine (optional)
└── App Store / Play Store
```

## Future Architecture Enhancements

```
Current: GameBoard → GridCell → Emoji

Planned:
GameBoard
├── GridCell
│   ├── ItemRenderer (abstracted)
│   │   ├── Emoji (current)
│   │   ├── Image (selfie photos)
│   │   └── Animation (Lottie)
│   │
│   ├── EffectLayer
│   │   ├── Particles
│   │   └── Explosions
│   │
│   └── SoundEffect (optional)
│
└── PowerUpSystem
    ├── Multiplier (5x, 10x)
    ├── Freeze Time
    └── Bomb (clear all)
```

---

## Key Architectural Decisions

### 1. Component-First Approach
- GameBoard is a pure presentational component
- Game logic separated into useGameLogic hook
- Easy to test and maintain

### 2. Animations with Native Driver
- All animations use `useNativeDriver: true`
- Offloads to native thread for 60fps
- Smooth performance on low-end devices

### 3. Type Safety with TypeScript
- Strict typing throughout
- Interfaces for all props and state
- Compile-time error detection

### 4. Responsive by Default
- Dynamic sizing based on screen width
- Works on all screen sizes
- Portrait and landscape support

### 5. Accessibility First
- Touch targets meet WCAG guidelines
- Screen reader ready structure
- Keyboard navigation support

---

**Architecture Version**: 1.0.0
**Last Updated**: December 17, 2025
