# Delivery Adventure

[![License](https://img.shields.io/github/license/osmanadam-dev/Delivery-Adventure)](LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/osmanadam-dev/Delivery-Adventure)]()
[![Top Language](https://img.shields.io/github/languages/top/osmanadam-dev/Delivery-Adventure)]()
[![Demo (GitHub Pages)](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://osmanadam-dev.github.io/Delivery-Adventure/) <!-- enable Pages to activate -->

A tiny, browser-based interactive micro-game that simulates placing a food order and tracking its delivery. It's a portable demo/portfolio piece built with plain HTML, CSS and vanilla JavaScript.

Quick demo
- Live demo: https://osmanadam-dev.github.io/Delivery-Adventure/ (enable GitHub Pages on the repository)
- Screenshot / GIF:
  - Add `docs/screenshot.png` or `docs/demo.gif` and replace the image link here:
  ![Delivery Adventure screenshot](docs/screenshot.png)

Table of contents
- Features
- Demo / Screenshots
- How to run
- Controls & gameplay
- Project layout
- Browser support & accessibility
- Contributing
- License
- Author

Features
- Pick a character, choose a restaurant and items from a menu
- Cart, order confirmation and a simple delivery tracking animation
- Confetti celebration and simple sound effects (Web Audio API)
- Fully client-side, single-file UI: `index.html`, `style.css`, `init.js`
- No build step — drop into any static host

Demo / Screenshots
- Add a short animated GIF or several screenshots to show the flow: picking a restaurant, the cart, delivery tracking, and confetti.
- If you want, include a short video or embed a Loom/YouTube link.

How to run (local)
The app is static — open it in any modern browser. For best results (and to avoid CORS / autoplay quirks), serve it from a local HTTP server.

Open directly (not recommended for best audio/autoplay behavior)
- Double-click `index.html` or use your file manager to open it.

Recommended (local server)
- Python 3:
  - python3 -m http.server 8000
  - Then open http://localhost:8000
- Node (http-server):
  - npx http-server -c-1 .
  - or npx serve .
- For development: open the devtools console to see logs and errors.

Controls & gameplay
- Use mouse / touch to navigate UI and select items.
- Keyboard:
  - Tab/Shift+Tab to move between interactive elements
  - Enter / Space to activate buttons (ensure focusable controls)
- Gameplay flow:
  1. Pick a character (cosmetic).
  2. Choose a restaurant and menu items.
  3. Review cart and confirm order.
  4. Watch the delivery tracking animation and celebrate with confetti.

Project layout
- index.html — UI screens (markup) and links to styles & script
- style.css — visuals, layout, and animations
- init.js — `gameState`, menus data, screen transitions, ordering, delivery tracking, audio, and confetti
- docs/ — (optional) screenshots, design notes

Browser support & accessibility
- Target: modern evergreen browsers (Chrome, Firefox, Edge, Safari).
- Audio: browsers may block autoplay; starting audio may require user interaction (click) depending on browser policy.
- Accessibility suggestions:
  - Ensure buttons have aria-labels and focus styles.
  - Make interactive elements keyboard-focusable (tabindex / <button>).
  - Add skip links if screens get more complex.
  - Consider reducing motion option for users who prefer reduced animations.

Development notes
- Single-file UI for portability. If you later split into modules, consider a tiny build step or using ES modules.
- To add more restaurants or items, update the menus data in `init.js`.

Known issues
- Autoplay of sounds may be inconsistent across browsers (requires user interaction on some platforms).
- Small screen layout tweaks may be needed on older mobile browsers.

Contributing
- Contributions welcome! Open an issue or pull request with a small, focused change.
- Suggested contribution flow:
  1. Fork the repo
  2. Create a feature branch
  3. Open a PR with a short description and screenshots if relevant
- Add a `CONTRIBUTING.md` if you want more formal rules.

License
- This project does not currently include a LICENSE file in the repo. I recommend adding one (e.g., MIT). Example:
  - Create a `LICENSE` file with the MIT license text and update the badge above.

Author
**Osman Adam**
- GitHub: [@osmanadam-dev](https://github.com/osmanadam-dev)
- Portfolio: https://lnk.bio/osmanadam-dev
