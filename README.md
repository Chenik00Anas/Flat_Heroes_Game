# Flat Heroes Game

A minimalist 2D arcade game inspired by Flat Heroes, built with HTML5 Canvas and vanilla JavaScript.

## Project Description

This is a Computer Science student project to create a simple platformer game using HTML5 Canvas API. The game features a player character that must avoid enemies and collect points.

**Due Date:** December 15th

## Current Status

🚧 **Work in Progress**

### Completed Features (Commit 3)
- ✅ Basic HTML5 canvas setup (800x600)
- ✅ Game loop using `requestAnimationFrame()`
- ✅ Player rendering (green square)
- ✅ Ground rendering
- ✅ Basic UI display
- ✅ Keyboard controls (Arrow Keys + WASD)
- ✅ Left/right player movement
- ✅ Collision detection with canvas edges
- ✅ **Gravity implementation**
- ✅ **Jump mechanics**
- ✅ **Ground collision detection**
- ✅ **Player falls and lands properly**

### To Do
- [ ] Better physics with velocity and acceleration
- [ ] Platforms to jump on
- [ ] Enemy AI
- [ ] Collision detection with enemies
- [ ] Sound effects
- [ ] Scoring system
- [ ] Multiple levels/waves

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
│   └── game.js        # Game logic
└── README.md          # This file
```

## Technologies Used

- HTML5 Canvas API
- Vanilla JavaScript (ES6)
- CSS3

## Controls

- **Arrow Left / A** - Move left
- **Arrow Right / D** - Move right
- **Space / W / Up Arrow** - Jump

## Game Mechanics

### Physics
- **Gravity**: 0.5 (pulls player down)
- **Jump Power**: -12 (initial upward velocity)
- **Horizontal Speed**: 5 pixels per frame
- Player can only jump when on the ground


## Resources

- [MDN Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN Keyboard Events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
- HTML5 Apps and Games course (w3cx.org)
- Game physics tutorials for gravity implementation

## Author

Chenik Anas
Computer Science Student
Ubinet Master 2 - DS4H

## License

This is a student project for educational purposes.

