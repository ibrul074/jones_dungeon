import {
  initializePositionAlly,
  moveAlly,
  showScoreAlly,
  transferPoints,
  allyVertical,
  allyHorizontal,
  setEnergyAlly,
  setPointsAlly,
  allyEnergy,
  allyPoints,
} from '../js/ally';
import {
  dungeonGrid,
  initializeGrid,
  gridHeight,
  gridWidth,
} from '../js/dungeon-grid';
import { heroVertical, heroHorizontal, setPoints } from '../js/player';

let mockPoints = 50; // Initial points for the hero
jest.mock('../js/player', () => ({
  ...jest.requireActual('../js/player'), // Keep other exports intact
  heroVertical: 10, // Mock heroVertical to 10
  heroHorizontal: 10, // Mock heroHorizontal to 10

  //The value of points is mutable value so I'll use mockPoints to show the process
  get points() {
    // Getter to simulate when points is accessed
    return mockPoints; // Return the mock value
  },
  setPoints: jest.fn((newPoints) => {
    // Setter to set the mock points
    mockPoints = newPoints; // Update the mock value
  }),
}));

// Test: initializePositionAlly
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

// Test: moveAlly
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

// Test: transferPoints
describe('transferPoints', () => {
  beforeEach(() => {
    setPointsAlly(20);
    setEnergyAlly(10);
    mockPoints = 50;
  });

  test('should transfer ally points to hero', () => {
    expect(allyPoints).toBe(20); // Ally's points (20)
    expect(mockPoints).toBe(50); // Hero's points (50)
    transferPoints();
    expect(setPoints).toHaveBeenCalledWith(70); // 50 (hero) + 20 (ally)
    expect(mockPoints).toBe(70); // New hero's points (70)
    expect(allyPoints).toBe(0); // Ally's points should be transferred
    expect(allyEnergy).toBe(0); // Ally's energy should be depleted
  });
});

// Test: showScoreAlly
describe('showScoreAlly', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="points-ally"></div>
        <div id="energy-ally"></div>
        <div id="energy-ally-bar"></div>
      `;
    setPointsAlly(10);
    setEnergyAlly(5);
  });

  test('should update ally score and energy in the DOM', () => {
    showScoreAlly();
    expect(document.getElementById('points-ally').innerText).toBe(
      'Points ally: 10',
    );
    expect(document.getElementById('energy-ally').innerText).toBe(
      'Energy ally: 5',
    );
    expect(document.getElementById('energy-ally-bar').style.width).toBe(
      '33.33333333333333%',
    );
  });
});
