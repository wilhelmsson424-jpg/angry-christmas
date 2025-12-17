import { useState, useEffect, useCallback, useRef } from 'react';

export interface GridItem {
  id: string;
  type: 'grinch' | 'present' | 'empty';
  isVisible: boolean;
}

export interface GameState {
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  grid: GridItem[];
}

const GRID_SIZE = 9; // 3x3 grid
const GAME_DURATION = 60; // 60 seconds
const SPAWN_INTERVAL = 800; // milliseconds
const ITEM_DISPLAY_TIME = 1500; // milliseconds

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<GridItem[]>([]);

  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const itemTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Initialize grid
  useEffect(() => {
    const initialGrid: GridItem[] = Array.from({ length: GRID_SIZE }, (_, i) => ({
      id: `cell-${i}`,
      type: 'empty',
      isVisible: false,
    }));
    setGrid(initialGrid);
  }, []);

  // Game timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      gameTimerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }

    return () => {
      if (gameTimerRef.current) {
        clearTimeout(gameTimerRef.current);
      }
    };
  }, [isPlaying, timeLeft]);

  // Spawn items
  useEffect(() => {
    if (isPlaying) {
      spawnTimerRef.current = setInterval(() => {
        spawnRandomItem();
      }, SPAWN_INTERVAL);
    }

    return () => {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
      }
    };
  }, [isPlaying, grid]);

  const spawnRandomItem = useCallback(() => {
    setGrid((currentGrid) => {
      const emptyIndices = currentGrid
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => !item.isVisible)
        .map(({ idx }) => idx);

      if (emptyIndices.length === 0) return currentGrid;

      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const itemType: 'grinch' | 'present' = Math.random() > 0.3 ? 'grinch' : 'present';

      const newGrid = [...currentGrid];
      newGrid[randomIndex] = {
        ...newGrid[randomIndex],
        type: itemType,
        isVisible: true,
      };

      // Auto-hide after ITEM_DISPLAY_TIME
      const itemId = newGrid[randomIndex].id;
      const timer = setTimeout(() => {
        setGrid((g) => {
          const updated = [...g];
          const idx = updated.findIndex((item) => item.id === itemId);
          if (idx !== -1 && updated[idx].isVisible) {
            updated[idx] = { ...updated[idx], isVisible: false, type: 'empty' };
          }
          return updated;
        });
        itemTimersRef.current.delete(itemId);
      }, ITEM_DISPLAY_TIME);

      itemTimersRef.current.set(itemId, timer);

      return newGrid;
    });
  }, []);

  const handleItemTap = useCallback((itemId: string) => {
    setGrid((currentGrid) => {
      const index = currentGrid.findIndex((item) => item.id === itemId);
      if (index === -1 || !currentGrid[index].isVisible) return currentGrid;

      const tappedItem = currentGrid[index];

      // Update score
      if (tappedItem.type === 'grinch') {
        setScore((prev) => prev + 10);
      } else if (tappedItem.type === 'present') {
        setScore((prev) => Math.max(0, prev - 5));
      }

      // Clear auto-hide timer
      const timer = itemTimersRef.current.get(itemId);
      if (timer) {
        clearTimeout(timer);
        itemTimersRef.current.delete(itemId);
      }

      // Hide the item
      const newGrid = [...currentGrid];
      newGrid[index] = { ...newGrid[index], isVisible: false, type: 'empty' };
      return newGrid;
    });
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);

    // Reset grid
    setGrid((currentGrid) =>
      currentGrid.map((item) => ({ ...item, isVisible: false, type: 'empty' }))
    );

    // Clear all timers
    itemTimersRef.current.forEach((timer) => clearTimeout(timer));
    itemTimersRef.current.clear();
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);

    // Clear all timers
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    itemTimersRef.current.forEach((timer) => clearTimeout(timer));
    itemTimersRef.current.clear();

    // Hide all items
    setGrid((currentGrid) =>
      currentGrid.map((item) => ({ ...item, isVisible: false, type: 'empty' }))
    );
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
      itemTimersRef.current.forEach((timer) => clearTimeout(timer));
      itemTimersRef.current.clear();
    };
  }, []);

  return {
    score,
    timeLeft,
    isPlaying,
    grid,
    startGame,
    endGame,
    handleItemTap,
  };
};
