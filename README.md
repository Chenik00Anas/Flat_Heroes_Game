# Flat Heroes Game

A minimalist 2D arcade game inspired by Flat Heroes, built with HTML5 Canvas and vanilla JavaScript.

## Project Description

This is a Computer Science student project to create a simple platformer game using HTML5 Canvas API. The game features a player character that must avoid enemies and collect points.

**Due Date:** December 15th

## Current Status

🚧 **Work in Progress**

### Completed Features (Commit 5)
- ✅ Basic HTML5 canvas setup (800x600)
- ✅ Game loop using `requestAnimationFrame()`
- ✅ Player rendering (green square)
- ✅ Ground rendering
- ✅ Basic UI display
- ✅ Keyboard controls (Arrow Keys + WASD)
- ✅ Player movement with physics
- ✅ Collision detection with canvas edges
- ✅ Gravity and jump mechanics
- ✅ Vector2D utility class
- ✅ Force-based physics system
- ✅ **Enemy class created**
- ✅ **AI steering behavior (seek)**
- ✅ **Enemies chase the player**
- ✅ **Collision detection between player and enemies**
- ✅ **Game over state**
- ✅ **Restart functionality (Press R)**

### To Do
- [ ] Platforms for more interesting gameplay
- [ ] Multiple enemy types (wandering, fleeing)
- [ ] Coins and scoring system
- [ ] Sound effects
- [ ] Wave system with increasing difficulty
- [ ] Visual effects (trails, particles)

## How to Run

1. Clone this repository
2. Open `index.html` in a web browser
3. Use **Arrow Keys** or **WASD** to move
4. Press **Space**, **W**, or **Up Arrow** to jump
5. Avoid the red diamond enemies!
6. Press **R** to restart after game over

## Project Structure

```
flat-heroes-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Game styling
├── js/
│   ├── Vector2D.js    # 2D vector utility class
│   ├── Enemy.js       # Enemy class with AI
│   └── game.js        # Main game logic
└── README.md          # This file
```

## Technologies Used

- HTML5 Canvas API
- Vanilla JavaScript (ES6 Classes)
- CSS3
- Vector mathematics for physics
- Steering behaviors for AI

## Controls

- **Arrow Left / A** - Move left
- **Arrow Right / D** - Move right
- **Space / W / Up Arrow** - Jump
- **R** - Restart game (after game over)

## Game Mechanics

### Physics System
- **Position, Velocity, Acceleration**: All use Vector2D objects
- **Force-based movement**: Forces are applied and accumulated
- **Gravity**: 0.6 constant downward force
- **Jump Power**: -15 initial upward velocity
- **Friction**: 0.85 multiplier on horizontal velocity
- **Max Speed**: 6 units

### Enemy AI (Steering Behaviors)
Enemies use Reynolds steering behaviors for realistic movement:
- **Seek**: Enemy calculates desired velocity toward player
- **Steering Force**: Difference between desired and current velocity
- **Max Force**: 0.1 (limits how quickly enemy can turn)
- **Max Speed**: 2.5 (enemy movement speed)
- **Wrapping**: Enemies wrap around screen edges

### Collision Detection
- Simple AABB (Axis-Aligned Bounding Box) collision
- Checks overlap between player and enemy rectangles
- Game over triggered on collision


## Resources

- [MDN Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Nature of Code - Autonomous Agents](https://natureofcode.com/book/chapter-6-autonomous-agents/)
- [Reynolds Steering Behaviors](https://www.red3d.com/cwr/steer/)
- HTML5 Apps and Games course (w3cx.org)
- Michel Buffa's course on Reactive AI and Steering Behaviors

## Author

Chenik Anas
Computer Science Student
Ubinet Master 2 - DS4H

## License

This is a student project for educational purposes.
