import {
  initializePositionAlly,
  moveAlly,
  setEnergyAlly,
  allyVertical,
  allyHorizontal,
  allyEnergy,
  allyPoints,
} from '../js/ally';
import {
  dungeonGrid,
  initializeGrid,
  gridHeight,
  gridWidth,
} from '../js/dungeon-grid';
import { heroVertical, heroHorizontal } from '../js/player';

jest.mock('../js/player', () => ({
  ...jest.requireActual('../js/player'), // Keep other exports intact
  heroVertical: 10, // Mock heroVertical to 10
  heroHorizontal: 10, // Mock heroHorizontal to 10
}));

describe('initializePositionAlly', () => {
  beforeEach(() => {
    initializeGrid();
    dungeonGrid[heroVertical][heroHorizontal] = 'hero'; // Place hero at (10, 10)
  });

  test('should initialize the ally near the hero', () => {
    initializePositionAlly();
    expect(allyVertical).toBe(11);
    expect(allyHorizontal).toBe(11);
    expect(allyEnergy).toBe(15); // Initial energy
    expect(allyPoints).toBe(0); // Initial points
    expect(dungeonGrid[11][11]).toBe('ally');
  });
});

describe('moveAlly', () => {
  beforeEach(() => {
    // Set up a small dungeon grid
    initializeGrid();
    for (let i = 0; i < gridHeight; i++) {
      dungeonGrid[i] = Array(gridWidth).fill('empty');
    }
    dungeonGrid[allyVertical][allyHorizontal] = 'ally';
  });

  test('should move the ally down', () => {
    expect(allyVertical).toBe(11);
    expect(allyHorizontal).toBe(11); // Ally is at [11][11]
    moveAlly('down');
    expect(allyVertical).toBe(10);
    expect(allyHorizontal).toBe(11);
    expect(dungeonGrid[10][11]).toBe('ally'); // Ally is at [10][11]
    expect(dungeonGrid[11][11]).toBe('empty');
  });

  test('should not move ally if energy is zero', () => {
    setEnergyAlly(0);
    moveAlly('down');
    expect(allyVertical).toBe(10); // No movement
    expect(allyHorizontal).toBe(11); // Ally stays at [10][11]
  });

  test('should transfer points if ally collides with hero', () => {
    setEnergyAlly(10); // Add energy to allow movement
    expect(allyVertical).toBe(10); // No movement
    expect(allyHorizontal).toBe(11); // Ally still at [10][11]
    moveAlly('right'); // Move ally at the position of the hero now both are at [10][10]
    expect(allyPoints).toBe(0); // Points transferred to hero
    expect(allyEnergy).toBe(0); // Ally disappears
  });
});
