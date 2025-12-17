import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { GridItem } from '../hooks/useGameLogic';

interface GameBoardProps {
  grid: GridItem[];
  onItemTap: (itemId: string) => void;
}

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 80) / 3; // 3 columns with padding

/**
 * GameBoard Component
 *
 * Displays the 3x3 grid where grinches and presents appear.
 *
 * @example
 * <GameBoard grid={grid} onItemTap={handleItemTap} />
 */
export const GameBoard: React.FC<GameBoardProps> = ({ grid, onItemTap }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((item, index) => (
          <GridCell
            key={item.id}
            item={item}
            onTap={() => onItemTap(item.id)}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

interface GridCellProps {
  item: GridItem;
  onTap: () => void;
  index: number;
}

const GridCell: React.FC<GridCellProps> = ({ item, onTap, index }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (item.isVisible) {
      // Pop in animation
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset scale
      scaleAnim.setValue(0);
    }
  }, [item.isVisible]);

  const handlePress = () => {
    if (item.isVisible) {
      // Pop out animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      onTap();
    }
  };

  return (
    <TouchableOpacity
      style={styles.cell}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={!item.isVisible}
    >
      <View style={styles.cellInner}>
        {item.isVisible && (
          <Animated.View
            style={[
              styles.itemContainer,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View
              style={[
                styles.item,
                item.type === 'grinch' ? styles.grinch : styles.present,
              ]}
            >
              <Text style={styles.itemEmoji}>
                {item.type === 'grinch' ? '😈' : '🎁'}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 40,
    gap: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cell: {
    width: CELL_SIZE - 10,
    height: CELL_SIZE - 10,
    margin: 5,
  },
  cellInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '85%',
    height: '85%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  grinch: {
    backgroundColor: '#16a34a',
    borderWidth: 3,
    borderColor: '#166534',
  },
  present: {
    backgroundColor: '#dc2626',
    borderWidth: 3,
    borderColor: '#991b1b',
  },
  itemEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
});
