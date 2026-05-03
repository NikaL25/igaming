# Neon Fruit Casino
A vibrant, retro-inspired web-based slot machine game featuring neon visuals and classic fruit symbols. This project demonstrates a clean implementation of game logic, CSS animations, and responsive design within a modal-based architecture.

# 🚀 Getting Started
## Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites
 You only need a modern web browser (Chrome, Firefox, Edge, or Safari). No complex backend or database is required as the game runs entirely on the client side.

1. Local Installation
Clone the repository (or download the ZIP file):

Bash 
` 
git clone https://github.com/your-username/neon-fruit-casino.git
` 
Navigate to the project folder:

Bash
cd neon-fruit-casino
Launch the project:

Simply double-click the index.html file in your file explorer.

Recommended: Use a local server extension (like Live Server for VS Code) to ensure all assets (sounds and scripts) load correctly without CORS issues.

🕹️ Features
Responsive Modal Design: The game is optimized to run inside an iframe within a modal window without being cut off.

Neon Aesthetics: Custom CSS styling with glow effects and dark mode.

Interactive Controls: Real-time balance updates, adjustable bet sizes, and smooth reel animations.

Audio Feedback: Immersive sound effects for spinning, winning, and depositing money.

🛠️ Project Structure
`
Plaintext
├── index.html          # Main landing page with the "Play Game" button
├── style.css           # Global styles and modal positioning
├── main.js             # Modal logic and iframe injection
└── slot/               # Game directory
    ├── index.html      # Game entry point
    ├── style.css       # Game-specific neon styles
    ├── script.js       # Core slot machine logic
    └── media/          # Audio assets (mp3)
`
🌍 