# Flat Heroes Game

A minimalist 2D arcade game inspired by Flat Heroes, built with HTML5 Canvas and vanilla JavaScript.

## Project Description

This is a Computer Science student project recreating the spirit of Flat Heroes. The game features a player character that must avoid enemies, collect coins, and survive waves using advanced movement mechanics.

**Course:** Introduction to Web Developpement/Javascript
**Due Date:** December 15th, 2025 
**Author:** CHENIK ANAS

## 🎮 Play the Game

[Live Demo on GitHub Pages](https://chenik00anas.github.io/Flat_Heroes_Game/)

## ✨ Features

### Core Gameplay
- ✅ Smooth 60 FPS gameplay using `requestAnimationFrame()`
- ✅ Vector-based physics system
- ✅ Multiple platforms for vertical gameplay
- ✅ Wave-based enemy spawning (difficulty increases)
- ✅ Collectible coins with animations
- ✅ Score tracking and game over state

### Advanced Player Mechanics
- ✅ **Double Jump** - Jump twice in mid-air
- ✅ **Coyote Time** - Brief window to jump after leaving platform
- ✅ **Dash** - Quick horizontal movement (cooldown-based)
- ✅ **Trail Effect** - Visual feedback for movement
- ✅ **Smooth Physics** - Acceleration, velocity, friction

### Enemy AI
- ✅ **Steering Behaviors** - Reynolds steering for realistic movement
- ✅ **Seek Behavior** - Enemies chase the player
- ✅ **Force-based Movement** - Natural acceleration and turning
- ✅ **Screen Wrapping** - Enemies wrap around edges

### Visual Polish
- ✅ Minimalist aesthetic (Flat Heroes style)
- ✅ Smooth animations and effects
- ✅ Visual indicators for jumps remaining
- ✅ Pulsing, rotating coin animations
- ✅ Fade trail effect on canvas

## 🎯 How to Play

### Objective
- Avoid red diamond enemies
- Collect golden star coins
- Survive waves to increase your score
- Each wave spawns more enemies!

### Controls
- **Arrow Keys / WASD** - Move left and right
- **Space / W / Up Arrow** - Jump (press twice for double jump!)
- **Shift** - Dash (has cooldown)
- **R** - Restart after game over

### Tips
- Use double jump to reach high platforms
- Dash to escape tight situations
- Coyote time lets you jump shortly after leaving a platform
- Coins spawn on platforms and ground every 2 seconds
- Each wave gives bonus score!

## 🏗️ Project Structure

```
flat-heroes-game/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Game styling
├── js/
│   ├── Vector2D.js        # 2D vector math utility
│   ├── Player.js          # Player class with advanced mechanics
│   ├── Enemy.js           # Enemy class with AI
│   ├── Platform.js        # Platform class
│   ├── Coin.js            # Coin class with animations
│   └── game.js            # Main game logic and loop
└── README.md              # This file
```

## 🔧 Technologies Used

- **HTML5 Canvas API** - For all rendering
- **Vanilla JavaScript (ES6)** - Classes, modules, arrow functions
- **Object-Oriented Programming** - Clean class structure
- **Vector Mathematics** - Position, velocity, acceleration
- **Steering Behaviors** - Autonomous agent AI (Reynolds)
- **CSS3** - Minimal styling

## 📚 Game Mechanics

### Physics System
```javascript
// Force-based movement
Force → Acceleration → Velocity → Position
```

- **Gravity**: 1.0 (constant downward force)
- **Jump Force**: -20 (upward velocity)
- **Friction**: 0.85 multiplier on horizontal velocity
- **Max Speed**: 8 units (24 for vertical)

### Double Jump System
- Player has 2 jumps available
- Jumps reset when landing on ground/platform
- Visual indicator shows remaining jumps
- Can be used in any order

### Coyote Time
- 8 frames (≈133ms) grace period after leaving platform
- Prevents frustrating missed jumps
- Common in professional platformers (Celeste, Hollow Knight)

### Dash Mechanic
- 15 units of instant velocity
- 30 frame cooldown (0.5 seconds at 60 FPS)
- Only works in horizontal direction
- Can be used for quick escapes

### Enemy AI (Steering Behaviors)
Based on Craig Reynolds' autonomous agents:
1. Calculate desired velocity (direction to player)
2. Normalize and scale to max speed
3. Calculate steering force (desired - current)
4. Limit steering force for smooth turning
5. Apply force to acceleration

### Collision Detection
- **AABB (Axis-Aligned Bounding Box)** collision
- Checks overlap between rectangles
- Used for: player-enemy, player-coin, player-platform

### Wave System
- Starts with 3 enemies
- Each wave adds 1 more enemy
- Wave completion gives 100 × wave number bonus
- Infinite waves (increasing difficulty)

## 🎨 Design Principles

Following Flat Heroes' minimalist aesthetic:
- Simple geometric shapes (squares, diamonds, stars)
- Bright colors on dark background
- Smooth motion and animations
- Visual feedback for all actions
- No textures, just solid colors

## 📖 Development Process

### Phase 1: Foundation (Commits 1-2)
- Canvas setup and game loop
- Basic player rendering
- Keyboard input handling
- Simple movement

### Phase 2: Physics (Commits 3-4)
- Gravity implementation
- Jump mechanics
- Vector2D utility class
- Force-based physics

### Phase 3: Enemies (Commit 5)
- Enemy class creation
- AI steering behaviors
- Collision detection
- Game over state

### Phase 4: Final Features (Commit 6)
- Platform system
- Coin collection
- Double jump & coyote time
- Dash mechanic
- Wave system
- Visual polish

## 🔬 Technical Highlights

### Clean OOP Architecture
```javascript
class Player {
  constructor() { /* initialize */ }
  update() { /* game logic */ }
  draw() { /* rendering */ }
  getBounds() { /* collision */ }
}
```

### Modular Design
- Each class in separate file
- Clear separation of concerns
- Easy to extend and maintain

### Performance
- 60 FPS constant frame rate
- Efficient collision detection
- Minimal DOM manipulation
- Canvas clearing strategies

## 📚 Resources & Learning

### Course Material
- HTML5 Apps and Games (w3cx.org)
- Module 2: HTML5 games best practices
- Reactive AI and Steering Behaviors course

### External Resources
- [MDN Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Nature of Code - Vectors](https://natureofcode.com/book/chapter-1-vectors/)
- [Nature of Code - Autonomous Agents](https://natureofcode.com/book/chapter-6-autonomous-agents/)
- [Reynolds Steering Behaviors](https://www.red3d.com/cwr/steer/)

### Game Design References
- Flat Heroes (Steam/Nintendo Switch)
- Celeste (for coyote time inspiration)
- Geometry Dash (for minimalist aesthetic)

## 🚀 Future Enhancements

Potential features for expansion:
- [ ] Sound effects using Web Audio API
- [ ] Background music with Howler.js
- [ ] Particle effects on coin collection
- [ ] Different enemy types (fleeing, wandering)
- [ ] Power-ups (shield, speed boost)
- [ ] Local multiplayer (Gamepad API)
- [ ] Level editor
- [ ] Leaderboard system
- [ ] Mobile touch controls

## 🎓 Learning Outcomes

This project demonstrates:
- **Canvas API Mastery** - Rendering, transforms, animations
- **Game Loop Architecture** - Update/draw separation
- **Physics Programming** - Vectors, forces, collision
- **AI Implementation** - Steering behaviors, autonomous agents
- **OOP Design** - Classes, encapsulation, modularity
- **Game Feel** - Coyote time, double jump, dash
- **Code Organization** - ES6 modules, clean structure

## 📝 License

This is a student project for educational purposes.

## 👤 Author

Chenik Anas
Computer Science Student
Ubinet Master 2 - DS4H

---

**Project completed:** December 2025
**Total development time:** ~8 weeks  
**Lines of code:** ~600  
**Commits:** 6
