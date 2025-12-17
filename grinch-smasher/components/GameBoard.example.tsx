import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import GameBoard from './GameBoard';

/**
 * Example Usage of GameBoard Component
 *
 * This demonstrates a complete whack-a-mole style game loop
 * with random head appearances and score tracking
 */

export default function GameBoardExample() {
  const [cells, setCells] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      visible: false,
      multiplier: undefined,
    }))
  );
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  // Game loop - randomly show/hide heads
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setCells((prevCells) => {
        return prevCells.map((cell) => {
          // 30% chance to show a head
          const shouldShow = Math.random() > 0.7;

          // 10% chance for multiplier bonus
          let multiplier: number | undefined = undefined;
          if (shouldShow && Math.random() > 0.9) {
            multiplier = Math.random() > 0.5 ? 5 : 10;
          }

          return {
            ...cell,
            visible: shouldShow,
            multiplier,
          };
        });
      });
    }, 800); // Update every 800ms

    return () => clearInterval(interval);
  }, [gameActive]);

  // Handle cell press (smash the head!)
  const handleCellPress = useCallback((cellId: number) => {
    setCells((prevCells) => {
      const cell = prevCells.find((c) => c.id === cellId);
      if (!cell?.visible) return prevCells;

      // Calculate points
      const points = cell.multiplier ? cell.multiplier * 10 : 10;
      setScore((prev) => prev + points);

      // Hide the cell immediately
      return prevCells.map((c) =>
        c.id === cellId ? { ...c, visible: false } : c
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <GameBoard
        headImage="file:///path/to/your/selfie.jpg" // Replace with actual image URI
        cells={cells}
        onCellPress={handleCellPress}
      />
    </View>
  );
}

/**
 * Advanced Example with Timer and Difficulty Levels
 */
export function GameBoardAdvancedExample() {
  const [cells, setCells] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      visible: false,
      multiplier: undefined,
    }))
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Difficulty settings
  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy':
        return { interval: 1000, showChance: 0.6, multiplierChance: 0.2 };
      case 'medium':
        return { interval: 800, showChance: 0.7, multiplierChance: 0.1 };
      case 'hard':
        return { interval: 600, showChance: 0.8, multiplierChance: 0.05 };
    }
  };

  // Game timer
  useEffect(() => {
    if (timeLeft <= 0) {
      Alert.alert('Game Over!', `Your score: ${score}`);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, score]);

  // Game loop with difficulty
  useEffect(() => {
    const settings = getDifficultySettings();

    const interval = setInterval(() => {
      setCells((prevCells) => {
        return prevCells.map((cell) => {
          const shouldShow = Math.random() > settings.showChance;
          let multiplier: number | undefined = undefined;

          if (shouldShow && Math.random() > (1 - settings.multiplierChance)) {
            multiplier = Math.random() > 0.5 ? 5 : 10;
          }

          return {
            ...cell,
            visible: shouldShow,
            multiplier,
          };
        });
      });
    }, settings.interval);

    return () => clearInterval(interval);
  }, [difficulty]);

  const handleCellPress = useCallback((cellId: number) => {
    setCells((prevCells) => {
      const cell = prevCells.find((c) => c.id === cellId);
      if (!cell?.visible) return prevCells;

      const points = cell.multiplier ? cell.multiplier * 10 : 10;
      setScore((prev) => prev + points);

      return prevCells.map((c) =>
        c.id === cellId ? { ...c, visible: false } : c
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <GameBoard
        headImage="file:///path/to/your/selfie.jpg"
        cells={cells}
        onCellPress={handleCellPress}
      />
    </View>
  );
}

/**
 * Simple Static Example for Testing
 */
export function GameBoardStaticExample() {
  const [cells] = useState([
    { id: 0, visible: true, multiplier: 5 },
    { id: 1, visible: false },
    { id: 2, visible: true, multiplier: 10 },
    { id: 3, visible: false },
    { id: 4, visible: true },
    { id: 5, visible: false },
    { id: 6, visible: true },
    { id: 7, visible: false },
    { id: 8, visible: false },
  ]);

  const handleCellPress = (cellId: number) => {
    Alert.alert('Cell Pressed', `You smashed cell ${cellId}!`);
  };

  return (
    <View style={styles.container}>
      <GameBoard
        headImage="file:///path/to/your/selfie.jpg"
        cells={cells}
        onCellPress={handleCellPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a472a', // Christmas green background
    alignItems: 'center',
    justifyContent: 'center',
  },
});
