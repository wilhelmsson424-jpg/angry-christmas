# 🎮 Grinch Smasher - Christmas Mobile Game

**Built with 4 Parallel Agents in Minutes!**

A festive whack-a-mole style mobile game where you smash Grinches and avoid presents. Built with React Native + Expo for native iOS and Android.

---

## 🎯 Game Overview

**Objective:** Smash as many Grinches as possible while avoiding presents in 60 seconds!

**Gameplay:**
- 😈 **Tap Grinches**: +10 points
- 🎁 **Avoid Presents**: -5 points (they're for good kids!)
- ⏱️ **60 Second Timer**: Beat your high score before time runs out
- 🏆 **High Score Tracking**: Your best score is saved automatically

---

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
cd ~/angry-christmas/grinch-smasher

# Install dependencies (if not already done)
npm install

# Start the development server
npx expo start
```

### Play the Game

1. Scan the QR code with your phone
2. Take a selfie (your face becomes part of the game!)
3. Tap "Start Game"
4. Smash Grinches, avoid presents!
5. Beat your high score!

---

## 🏗️ Architecture

### Built with 4 Parallel Agents

This game was built using **4 specialized AI agents** working in parallel:

1. **Frontend Agent 1** → Selfie Screen Component
2. **Frontend Agent 2** → Game Board UI
3. **Full-stack Agent** → Game Logic & State Management
4. **Frontend Agent 3** → Main App Integration

### Project Structure

```
grinch-smasher/
├── App.tsx                    # Main app with screen navigation
├── components/
│   ├── SelfieScreen.tsx       # Camera capture component
│   ├── GameBoard.tsx          # 3x3 grid game board
│   ├── GameBoard.test.tsx     # Unit tests
│   └── GameBoard.example.tsx  # Usage examples
├── hooks/
│   └── useGameLogic.ts        # Core game logic hook
├── package.json
└── GAME_README.md             # This file
```

---

## 🎨 Features

### ✅ Implemented Features

- **📸 Selfie Capture**: Take your photo which becomes part of the game
- **🎮 Game Board**: 3x3 responsive grid with smooth animations
- **😈 Grinch Spawning**: Random grinches appear and disappear
- **🎁 Present Obstacles**: Avoid tapping presents (point deduction)
- **⏱️ 60s Timer**: Countdown timer for each game session
- **🎯 Score System**: +10 for grinches, -5 for presents
- **🏆 High Score**: Best score persists between sessions
- **🎄 Christmas Theme**: Festive gradient background, snow effects
- **📱 Native Mobile**: Runs on iOS and Android via Expo

### 🎨 Design Highlights

- **Gradient Background**: Blue → Purple → Red Christmas gradient
- **Smooth Animations**: Spring animations for item appearances
- **Responsive Layout**: Works on all screen sizes
- **Festive UI**: Snowflake decorations, Christmas colors
- **High Performance**: 60fps animations with native driver

---

## 🎮 Game Mechanics

### Spawn System
- Items spawn randomly in empty cells
- **Spawn rate**: Every 800ms
- **Display time**: 1500ms before auto-hide
- **Item ratio**: 70% grinches, 30% presents

### Scoring
- **Grinch hit**: +10 points
- **Present hit**: -5 points
- **Auto-hide**: No penalty (just missed opportunity)

### Timer
- **Game duration**: 60 seconds
- **Auto-end**: Game stops when timer reaches 0
- **Display**: Real-time countdown in header

---

## 🛠️ Tech Stack

**Core:**
- React Native 0.76.5
- Expo SDK 52
- TypeScript 5.3.3

**Key Libraries:**
- `expo-camera` - Selfie capture
- `expo-image-manipulator` - Image processing
- `expo-linear-gradient` - Background gradients
- `@react-native-async-storage/async-storage` - High score persistence

**State Management:**
- React Hooks (useState, useEffect, useCallback)
- Custom hook (`useGameLogic`)

**Animations:**
- React Native Animated API
- Native driver for 60fps performance

---

## 📱 How to Play

### Step 1: Selfie Screen
- Tap "Allow" for camera permissions
- Position your face in the circular guide
- Tap "Take Selfie" button
- Your face is processed to 150x150px

### Step 2: Ready Screen
- Read the instructions
- Tap "Start Game" when ready

### Step 3: Playing
- Grinches (😈) and Presents (🎁) appear randomly
- Tap Grinches quickly for points
- Avoid tapping Presents
- Watch the timer count down

### Step 4: Game Over
- See your final score
- Check if you beat your high score (🏆)
- Tap "Play Again" or take a "New Selfie"

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Manual Testing Checklist
- [ ] Camera permission flow works
- [ ] Selfie capture and processing works
- [ ] Game starts without crashes
- [ ] Grinches spawn randomly
- [ ] Presents spawn randomly
- [ ] Tapping grinches increases score
- [ ] Tapping presents decreases score
- [ ] Timer counts down correctly
- [ ] Game ends at 0 seconds
- [ ] High score saves correctly
- [ ] Play Again button works
- [ ] New Selfie button works

---

## 🎯 Performance

### Optimization Features
- **Native driver animations** for smooth 60fps
- **Memoized callbacks** to prevent unnecessary re-renders
- **Efficient state updates** with functional setState
- **Cleanup timers** to prevent memory leaks

### Performance Metrics (Target)
- **Frame rate**: 60fps during gameplay
- **Render time**: < 150ms for game board
- **Memory**: < 100MB during active gameplay

---

## 🐛 Troubleshooting

### Expo won't start
```bash
# Clear cache and restart
npx expo start --clear
```

### Camera not working
- Check phone camera permissions in Settings
- Restart the app
- On Android: Enable camera in app permissions

### High score not saving
- Check AsyncStorage permissions
- Restart the app
- Clear app data and try again

### Slow performance
- Close other apps
- Restart Expo server with `--clear` flag
- Check phone has enough free memory

---

## 📚 Documentation

Additional documentation available in `components/` directory:

- **README.md** - Component documentation
- **ACCESSIBILITY_CHECKLIST.md** - WCAG 2.1 compliance
- **PERFORMANCE_GUIDE.md** - Optimization strategies
- **GAME_DOCUMENTATION.md** - Technical architecture
- **ARCHITECTURE.md** - Visual diagrams

---

## 🚀 Deployment

### Build for Production

**Android:**
```bash
eas build --platform android
```

**iOS:**
```bash
eas build --platform ios
```

### Publish Updates
```bash
npx expo publish
```

---

## 🎄 Credits

**Built by:** 4 AI Agents working in parallel
**Framework:** React Native + Expo
**Design:** Christmas-themed festive UI
**Date:** December 2025

---

## 📝 License

MIT License - Use freely for hackathons and personal projects!

---

## 🎮 Future Enhancements (Ideas)

- [ ] Add sound effects (smash, miss, timer)
- [ ] Add power-ups (freeze time, double points)
- [ ] Add difficulty levels (easy, medium, hard)
- [ ] Add multiplayer mode
- [ ] Add leaderboards
- [ ] Add achievements system
- [ ] Add more character variations
- [ ] Add different game modes (endless, speed)

---

**Ready to smash some Grinches? Let's go! 🎮🎄**

```bash
npx expo start
```

Scan the QR code and start playing!
