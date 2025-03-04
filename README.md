# LazyMute
A chrome extension to mute/unmute Google mute from any tab

### Overview
This Chrome extension allows users to mute/unmute their microphone in Google Meet from any tab with a single click. The extension dynamically updates the icon based on the mute state.

### Motivation
This extension was created as a replacement for similar extensions that were removed from the Chrome Web Store due to non-compliance with best practices.

### Features
- Mute/unmute Google Meet from any tab
- Extension icon updates dynamically based on mute state
- No need to switch tabs to control the microphone

### Installation
1. Download the extension source code.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right corner).
4. Click **Load unpacked** and select the extension folder.

### How It Works
- The background script listens for a browser action (clicking the extension icon).
- It injects JavaScript into the active Google Meet tab to toggle the mute state.
- The extension reads the `aria-pressed` attribute of the mute button to determine the current state.
- The icon updates accordingly to reflect the mute status.

### Code Structure
- **`manifest.json`**: Defines extension permissions and background scripts.
- **`background.js`**: Handles user interactions and executes scripts in the Google Meet tab.
- **`icons/`**: Contains icons for different mute states.

