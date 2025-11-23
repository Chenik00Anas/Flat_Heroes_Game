# Flat Heroes Game

A minimalist 2D arcade game inspired by Flat Heroes, built with HTML5 Canvas and vanilla JavaScript.

## Project Description

This is a Computer Science student project to create a simple platformer game using HTML5 Canvas API. The game features a player character that must avoid enemies and collect points.

**Due Date:** December 15th

## Current Status

🚧 **Work in Progress**

### Completed Features (Commit 4)
- ✅ Basic HTML5 canvas setup (800x600)
- ✅ Game loop using `requestAnimationFrame()`
- ✅ Player rendering (green square)
- ✅ Ground rendering
- ✅ Basic UI display
- ✅ Keyboard controls (Arrow Keys + WASD)
- ✅ Left/right player movement
- ✅ Collision detection with canvas edges
- ✅ Gravity implementation
- ✅ Jump mechanics
- ✅ Ground collision detection
- ✅ **Vector2D utility class created**
- ✅ **Proper physics with position, velocity, and acceleration vectors**
- ✅ **Force-based movement system**
- ✅ **Friction applied to horizontal movement**
- ✅ **Smoother, more realistic physics**

### To Do
- [ ] Platforms to jump on
- [ ] Enemy AI with steering behaviors
- [ ] Collision detection with enemies
- [ ] Sound effects
- [ ] Scoring system with waves
- [ ] Visual effects (trails, particles)

## How to Run

1. Clone this repository
2. Open `index.html` in a web browser
3. Use **Arrow Keys** or **WASD** to move
4. Press **Space**, **W**, or **Up Arrow** to jump

## Project Structure

```
flat-heroes-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Game styling
├── js/
│   ├── Vector2D.js    # 2D vector utility class
│   └── game.js        # Game logic with physics
└── README.md          # This file
```

## Technologies Used

- HTML5 Canvas API
- Vanilla JavaScript (ES6)
- CSS3
- Vector mathematics for physics

## Controls

- **Arrow Left / A** - Move left
- **Arrow Right / D** - Move right
- **Space / W / Up Arrow** - Jump

## Game Mechanics

### Physics System
- **Position, Velocity, Acceleration**: All use Vector2D objects
- **Force-based movement**: Forces are applied and accumulated
- **Gravity**: 0.6 constant downward force
- **Jump Power**: -15 initial upward velocity
- **Friction**: 0.85 multiplier on horizontal velocity
- **Max Speed**: 6 units (prevents infinite acceleration)

### Vector2D Class
Provides mathematical operations for 2D physics:
- `add(v)` - Vector addition
- `sub(v)` - Vector subtraction
- `mult(n)` - Scalar multiplication
- `mag()` - Calculate magnitude
- `normalize()` - Unit vector
- `limit(max)` - Constrain magnitude

## Resources

- [MDN Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Nature of Code - Vectors](https://natureofcode.com/book/chapter-1-vectors/)
- HTML5 Apps and Games course (w3cx.org)
- Vector mathematics tutorials

## Author

Chenik Anas
Computer Science Student
Ubinet Master 2 - DS4H

## License

This is a student project for educational purposes.
