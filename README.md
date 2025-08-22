# JS-HTML-CSS-Mini-Projects

A growing collection of small, self-contained JavaScript, HTML, CSS projects.  
Each project lives in its own folder with its own `index.html`, `style.css`, and `index.js`, so you can run them directly in your browser.

<br>

##  Projects Overview

| Project | Folder | Tech | Description |
|---------|--------|------|-------------|
| Text to Speech | [TextToSpeech](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/TextToSpeech) | HTML, CSS, JS (Web Speech API) | Convert text into spoken words with voice, pitch, speed controls. |
| Pomodoro Timer | [Pomodoro-Timer](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Pomodoro-Timer) | HTML, CSS, JS (Web Audio API, SVG) | 25-minute timer with circular progress ring, notes, and CSV export. |
| Basic Calculator | [Basic-Calculator](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Basic-Calculator) | HTML, CSS, JS | Simple four-function calculator with history and modern UI. |
| Hex Color Generator | [Hex-Color-Generator](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Hex%20Color%20Generator) | HTML, CSS, JS | Pick a color, see its hex instantly, and preview it as background. |
| Image Color Hex Extractor | [Image Color Hex Extractor (Upload:Drag Image → Hex Codes)](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Image%20Color%20Hex%20Extractor%20(Upload%3ADrag%20Image%20%E2%86%92%20Hex%20Codes)) | HTML, CSS, JS (Canvas, k-means) | Upload an image, extract dominant hex colors, hover to highlight swatches, and export palettes. |

<br>

## [Text to Speech](./TextToSpeech)

A browser-based Text to Speech app built with HTML, CSS, and JavaScript.  
Uses the built-in Web Speech API (SpeechSynthesis) to convert text into spoken words with customizable options.

### Features
- Enter any text and have it read aloud  
- Choose from available browser voices  
- Adjust speed, pitch, and volume  
- Preview button to quickly sample selected voice  
- Pause, Stop, and Speak controls  
- Clean glassmorphism UI with typewriter-style title animation  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Type your text, pick a voice, and press Speak.  

Note: Works best in Chrome or Edge (voice support varies by browser).  

### Tech Used
- HTML5 for structure  
- CSS3 (glassmorphism, typewriter animation, custom sliders)  
- Vanilla JavaScript for Web Speech API  

### Notes
- Voices available depend on your system and browser.  
- No backend required — everything runs in the browser.  
- Useful as a mini JavaScript project or learning resource for browser APIs.
  
---

<br>

## [Pomodoro Timer](./Pomodoro-Timer)

A clean Pomodoro timer app built with HTML, CSS, and JavaScript.  
It uses an SVG-based circular progress ring to visualize the countdown and includes session history with notes and CSV export.

### Features
- 25-minute countdown (Pomodoro technique)  
- Circular progress ring synced to the timer  
- Start / Stop / Reset controls  
- Gentle chime at session end (with mute toggle)  
- Session history stored in browser `localStorage`  
- Prompt to add a quick note after each session  
- Export history to CSV  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Click Start to begin a session and work until the chime.  

### Tech Used
- HTML5 for structure  
- CSS3 for styling and SVG-based progress ring  
- Vanilla JavaScript for timer logic, session history, CSV export, and Web Audio API chime  

### Notes
- History persists between sessions using localStorage.  
- CSV export lets you save your progress for tracking.  
- No frameworks, no backend — just run it in your browser.

---

<br>

## [Basic Calculator](./Basic-Calculator)

A modern, minimal calculator app built with HTML, CSS, and JavaScript.  
Supports basic arithmetic and keeps a history of calculations.

### Features
- Clean, responsive layout styled with modern CSS  
- Basic arithmetic: add, subtract, multiply, divide  
- Calculator history with clickable entries  
- Clear history option stored in browser `localStorage`  
- Smooth hover/press animations for buttons  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Start calculating — results will be logged in history.

### Tech Used
- HTML5 for structure  
- CSS3 for styling, grid-based layout, and button animations  
- Vanilla JavaScript for calculator logic, history handling, and localStorage persistence  

### Notes
- Only safe button input is allowed (no free typing).  
- History entries can be clicked to reuse past expressions.  
- Runs entirely in the browser — no frameworks or backend required.

---

<br>

## [Hex Color Generator](./Hex-Color-Generator)

A tiny utility app to quickly convert a color selection into its **hex code**.  
Great for design work and quick reference.

### Features
- Native color picker input  
- Instantly displays the hex code of the chosen color  
- Page background updates live to match selection  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Pick a color and copy the hex code.

### Tech Used
- HTML5 for structure  
- CSS3 for layout  
- Vanilla JavaScript for live updates  

### Notes
- Uses `<input type="color">` for native color selection.  
- No dependencies, no backend — everything runs in-browser.

---

<br>

## [Image Color Hex Extractor](./Image-Color-Hex-Extractor)

An interactive palette extraction tool for any uploaded image.  

### Features
- Upload or drag & drop an image  
- Extracts **12 dominant colors** from the image using k-means clustering  
- Shows image on the left, palette on the right  
- Hover over the image → the closest swatch pulses/highlights  
- **Download Palette** button saves a PNG strip of all hex codes  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Upload an image and hover over it to explore colors.  
4. Download the palette PNG for later use.  

### Screenshots
![Overview](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/blob/main/Image%20Color%20Hex%20Extractor%20(Upload%3ADrag%20Image%20%E2%86%92%20Hex%20Codes)/overview.png)

![Palette Download](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/blob/main/Image%20Color%20Hex%20Extractor%20(Upload%3ADrag%20Image%20%E2%86%92%20Hex%20Codes)/palette%20download.png)

### Tech Used
- HTML5 + Canvas for pixel sampling and rendering  
- CSS3 for layout and pulse hover animation  
- Vanilla JavaScript for clustering, interaction, and export  

### Notes
- Palette size defaults to 12 colors but can be adjusted in code.  
- Works 100% client-side with no backend.  
- Useful for quick palette generation, design inspiration, or web projects.
