import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { SelfieScreen } from './components/SelfieScreen';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

type GameScreen = 'selfie' | 'ready' | 'playing' | 'gameOver';

const HIGHSCORE_KEY = '@grinch_smasher_highscore';

/**
 * Main App Component
 *
 * Christmas-themed Grinch Smasher game with selfie capture,
 * score tracking, and high score persistence.
 *
 * Flow:
 * 1. Selfie capture screen
 * 2. Game ready screen with Start button
 * 3. Active gameplay with timer and score
 * 4. Game over screen with final score and Play Again
 */
export default function App() {
  const [screen, setScreen] = useState<GameScreen>('selfie');
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  const {
    score,
    timeLeft,
    isPlaying,
    grid,
    startGame,
    handleItemTap,
  } = useGameLogic();

  // Load high score on mount
  useEffect(() => {
    loadHighScore();
  }, []);

  // Update high score when game ends
  useEffect(() => {
    if (screen === 'gameOver' && score > highScore) {
      saveHighScore(score);
      setHighScore(score);
    }
  }, [screen, score]);

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [screen]);

  const loadHighScore = async () => {
    try {
      const savedScore = await AsyncStorage.getItem(HIGHSCORE_KEY);
      if (savedScore !== null) {
        setHighScore(parseInt(savedScore, 10));
      }
    } catch (error) {
      console.error('Failed to load high score:', error);
    }
  };

  const saveHighScore = async (newScore: number) => {
    try {
      await AsyncStorage.setItem(HIGHSCORE_KEY, newScore.toString());
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  };

  const handleSelfieTaken = (uri: string) => {
    setSelfieUri(uri);
    setScreen('ready');
  };

  const handleStartGame = () => {
    setScreen('playing');
    startGame();
  };

  const handlePlayAgain = () => {
    setScreen('ready');
  };

  // Watch for game end
  useEffect(() => {
    if (!isPlaying && screen === 'playing' && timeLeft === 0) {
      setScreen('gameOver');
    }
  }, [isPlaying, screen, timeLeft]);

  // Selfie Screen
  if (screen === 'selfie') {
    return <SelfieScreen onSelfieTaken={handleSelfieTaken} />;
  }

  // Main game screens
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7e22ce', '#be123c']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          {/* Header with Score and Timer */}
          <View style={styles.header}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>

            {screen !== 'gameOver' && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerIcon}>⏱️</Text>
                <Text style={styles.timerValue}>{timeLeft}s</Text>
              </View>
            )}

            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Best</Text>
              <Text style={styles.scoreValue}>{highScore}</Text>
            </View>
          </View>

          {/* Game Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>🎅 Grinch Smasher 🎄</Text>
            <Text style={styles.subtitle}>
              Smash the grinches! Avoid the presents!
            </Text>
          </View>

          {/* Game Content */}
          <View style={styles.content}>
            {screen === 'ready' && (
              <View style={styles.readyScreen}>
                <View style={styles.instructions}>
                  <Text style={styles.instructionTitle}>How to Play:</Text>
                  <Text style={styles.instructionText}>
                    😈 Tap Grinches: +10 points
                  </Text>
                  <Text style={styles.instructionText}>
                    🎁 Avoid Presents: -5 points
                  </Text>
                  <Text style={styles.instructionText}>
                    ⏱️ You have 60 seconds!
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.startButton}
                  onPress={handleStartGame}
                >
                  <Text style={styles.startButtonText}>Start Game</Text>
                </TouchableOpacity>
              </View>
            )}

            {screen === 'playing' && (
              <GameBoard grid={grid} onItemTap={handleItemTap} />
            )}

            {screen === 'gameOver' && (
              <View style={styles.gameOverScreen}>
                <Text style={styles.gameOverTitle}>Game Over!</Text>

                <View style={styles.finalScoreContainer}>
                  <Text style={styles.finalScoreLabel}>Final Score</Text>
                  <Text style={styles.finalScoreValue}>{score}</Text>

                  {score === highScore && score > 0 && (
                    <Text style={styles.newHighScore}>🏆 New High Score! 🏆</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.playAgainButton}
                  onPress={handlePlayAgain}
                >
                  <Text style={styles.playAgainButtonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.newSelfieButton}
                  onPress={() => setScreen('selfie')}
                >
                  <Text style={styles.newSelfieButtonText}>New Selfie</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Snowflakes decoration */}
          <View style={styles.snowflakes}>
            <Text style={styles.snowflake}>❄️</Text>
            <Text style={styles.snowflake}>❄️</Text>
            <Text style={styles.snowflake}>❄️</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    minWidth: 80,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  timerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  timerValue: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readyScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    width: '100%',
    maxWidth: 350,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 12,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameOverScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  finalScoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    minWidth: 250,
  },
  finalScoreLabel: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  finalScoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  newHighScore: {
    fontSize: 18,
    color: '#fbbf24',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newSelfieButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  newSelfieButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  snowflakes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    pointerEvents: 'none',
  },
  snowflake: {
    fontSize: 24,
    opacity: 0.6,
  },
});
