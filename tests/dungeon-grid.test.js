import {
  gridHeight,
  gridWidth,
  dungeonGrid,
  initializeGrid,
} from '../js/dungeon-grid';

describe('Dungeon Grid Tests', () => {
  beforeEach(() => {
    initializeGrid();
  });

  test('Grid is initialized with the correct dimensions', () => {
    expect(dungeonGrid.length).toBe(gridHeight);
    //expect(dungeonGrid.every((row) => row.length === gridWidth)).toBe(true);
    dungeonGrid.forEach((row) => expect(row.length).toBe(gridWidth));
  });

  test('Grid contains expected tile types', () => {
    const allowedTiles = ['broken-trap', 'trap', 'treasure'];
    dungeonGrid.forEach((row) => {
      row.forEach((tile) => {
        expect(allowedTiles).toContain(tile);
      });
    });
  });
});
