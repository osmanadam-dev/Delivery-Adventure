# Delivery Adventure

Delivery Adventure is a small, browser-based interactive micro-game that simulates placing a food order and tracking its delivery. It's a portable demo/portfolio piece built with plain HTML, CSS and vanilla JavaScript—great for learning UI animation, simple state management, Canvas effects (confetti) and the Web Audio API.

## Features
- Pick a character, choose a restaurant and items from a menu
- Cart, order confirmation and a simple delivery tracking animation
- Confetti celebration and simple sound effects (Web Audio API)
- Fully client-side, single-file UI: index.html + style.css + init.js

## Stack
- Language(s): HTML, JavaScript (vanilla), CSS
- Framework / runtime: Plain browser (no build step)
- Notable APIs: Canvas (confetti), Web Audio API, Google Fonts (Poppins)

## Project layout

How it fits together:
- index.html contains the UI screens and links to style.css and init.js.
- style.css defines visuals, animations and layout for the various screens.
- init.js holds the `gameState`, menus data and the functions that drive screen transitions, ordering, delivery tracking, audio, and confetti.

## How to run
The app is static—open it in any modern browser. For best results (and to avoid CORS/autoplay quirks), serve it from a local HTTP server.

Open directly:
```bash
# From your file manager or:
open index.html
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000 in your browser

npx http-server -c-1 .  # or `npx serve .`
```

Then navigate to `http://localhost:8000` and click through the sidebar navigation to explore all pages.
## 👤 Author

**Osman Adam**
- Portfolio: [lnk.bio/osmanadam-dev](https://lnk.bio/osmanadam-dev)
