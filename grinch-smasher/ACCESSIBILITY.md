# Accessibility Checklist - Grinch Smasher

## WCAG 2.1 AA Compliance

### Perceivable

#### Text Alternatives (1.1)
- [ ] **Add accessibilityLabel to all interactive elements**
  - Camera button: "Take selfie"
  - Grid cells: "Grinch cell" / "Present cell" / "Empty cell"
  - Start button: "Start game"
  - Play Again: "Play game again"

#### Time-based Media (1.2)
- ✅ N/A - No video or audio content

#### Adaptable (1.3)
- ✅ Content structure is logical and sequential
- [ ] **Add accessibilityRole to all buttons**
  ```tsx
  <TouchableOpacity accessibilityRole="button">
  ```
- [ ] **Add heading levels using accessibilityRole="header"**

#### Distinguishable (1.4)
- ✅ Text contrast ratio > 7:1 (white on dark gradient)
- ✅ Text size minimum 16px
- [ ] **Add sound effects toggle for hearing impaired**
- [ ] **Add haptic feedback as alternative to audio**

### Operable

#### Keyboard Accessible (2.1)
- [ ] **Add keyboard navigation support (web)**
- [ ] **Focus indicators for all interactive elements**
- ✅ No keyboard traps

#### Enough Time (2.2)
- [ ] **Add option to pause game**
- [ ] **Add option to extend time limit**
- ✅ No unexpected time limits

#### Seizures (2.3)
- ✅ No flashing content > 3 times per second
- ✅ Animations use smooth easing

#### Navigable (2.4)
- [ ] **Add skip to main content link**
- ✅ Logical tab order
- [ ] **Descriptive page titles**

#### Input Modalities (2.5)
- ✅ Large touch targets (48x48dp minimum)
- ✅ Tap gestures only (no complex gestures)
- ✅ No motion-based controls

### Understandable

#### Readable (3.1)
- ✅ English language clearly indicated
- ✅ Simple, clear instructions
- ✅ No jargon or complex terms

#### Predictable (3.2)
- ✅ Consistent navigation
- ✅ No automatic context changes
- ✅ Clear feedback on all actions

#### Input Assistance (3.3)
- ✅ Clear error messages (camera permissions)
- ✅ Error prevention (disabled states)
- ✅ Confirmation before major actions

### Robust

#### Compatible (4.1)
- [ ] **Test with TalkBack (Android)**
- [ ] **Test with VoiceOver (iOS)**
- [ ] **Validate all accessibility props**
- ✅ Valid React Native components

## Implementation Guide

### Priority 1 (Critical)

```tsx
// SelfieScreen.tsx
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Enable camera to take selfie"
  accessibilityHint="Opens camera permission dialog"
>
  <Text>Enable Camera</Text>
</TouchableOpacity>

// GameBoard.tsx
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel={
    item.type === 'grinch' 
      ? 'Grinch, tap to smash for 10 points'
      : 'Present, avoid tapping to prevent losing 5 points'
  }
  accessibilityState={{ disabled: !item.isVisible }}
>
```

### Priority 2 (Important)

```tsx
// App.tsx - Add screen reader announcements
import { AccessibilityInfo } from 'react-native';

// When score changes
useEffect(() => {
  AccessibilityInfo.announceForAccessibility(
    `Score is now ${score} points`
  );
}, [score]);

// When timer reaches 10 seconds
useEffect(() => {
  if (timeLeft === 10) {
    AccessibilityInfo.announceForAccessibility(
      '10 seconds remaining'
    );
  }
}, [timeLeft]);
```

### Priority 3 (Nice to have)

```tsx
// Add haptic feedback
import * as Haptics from 'expo-haptics';

const handleItemTap = (itemId: string) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // ... rest of logic
};
```

## Testing Protocol

### Manual Testing

1. **TalkBack (Android)**
   ```bash
   # Enable TalkBack in Settings > Accessibility
   # Navigate through app using swipe gestures
   # Verify all elements are announced correctly
   ```

2. **VoiceOver (iOS)**
   ```bash
   # Triple-click home button to enable
   # Swipe to navigate
   # Double-tap to activate
   ```

3. **Font Scaling**
   ```bash
   # Increase system font size to maximum
   # Verify no text cutoff
   # Verify layout doesn't break
   ```

4. **Color Blindness**
   ```bash
   # Test with color blindness simulator
   # Ensure game is playable without color cues
   # Add patterns/icons if needed
   ```

### Automated Testing

```typescript
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react-native';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('App has no accessibility violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Resources

- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
