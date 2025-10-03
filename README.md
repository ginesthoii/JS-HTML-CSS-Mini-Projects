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
| Browser Piano (Keys & Code) |  [PlayablePiano](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/PlayablePiano)  | HTML, CSS, JS (Web Audio API) | Real-piano layout synth with record/download, history, metronome + count-in, and Audio→Keys pitch detection. |
| Typing Speed Test Game | [Typing Speed Test Game](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Typing%20Speed%20Test%20Game) | HTML, CSS, JS | Typing game that measures speed (WPM, CPM), mistakes, accuracy, and includes timer, progress bar, and dark mode. |
| dog age calculator | [dog-age-calculator](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/dog-age-calculator) | HTML, CSS, JS | Estimate your dog’s age in human years (adjusted by size category). |
| Dog Clicker Trainer | [Dog-Clicker-Trainer](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/Dog-Clicker-Trainer) | HTML, CSS, JS (Audio) | Training clicker with sound, total count, clicks per minute, and session stats. |
| Basic Post-It Notes | [Basic-Post-It-Notes](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/tree/main/basic-post-it-notes) | HTML, CSS, JS | An interactive sticky notes app built with HTML, CSS, and JavaScript — create, edit, and delete notes directly in the browser. |


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

### Tech Used
- HTML5 + Canvas for pixel sampling and rendering  
- CSS3 for layout and pulse hover animation  
- Vanilla JavaScript for clustering, interaction, and export  

### Notes
- Palette size defaults to 12 colors but can be adjusted in code.  
- Works 100% client-side with no backend.  
- Useful for quick palette generation, design inspiration, or web projects.

### Screenshots

<img src="https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/blob/main/Image%20Color%20Hex%20Extractor%20(Upload%3ADrag%20Image%20%E2%86%92%20Hex%20Codes)/overview.png" width="400" alt="Overview"/>

![Palette Download](https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/blob/main/Image%20Color%20Hex%20Extractor%20(Upload%3ADrag%20Image%20%E2%86%92%20Hex%20Codes)/palette%20download.png)



---

<br>


## [Browser Piano (Keys & Code)](./PlayablePiano)

A sleek browser synth piano with a **real-piano key layout** (black keys grouped 2–3 between whites), recording with **download & history**, **metronome + count-in**, optional **localStorage** persistence, and an **Audio → Keys** tool that plays detected notes from an uploaded MP3/WAV. No sample files needed — it uses the Web Audio API.

### Features
- Realistic layout (black keys sit between whites)
- Web Audio synth (sine / triangle / square / saw)
- Click or use your keyboard to play
- Octave shift, volume, label toggle, dark mode
- **Record / Stop / Play / Clear**
- **Recording history** (timestamps) with **download** (WebM/Opus)
- **Save to this browser** toggle (persists events via `localStorage`)
- **Metronome** with BPM and optional **count-in**
- **Audio → Keys**: upload audio you own (MP3/WAV), detect pitch, and “play” nearest keys

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. If you don’t hear sound, click the page once (browsers require a user gesture to start audio).

### Tech Used
- HTML5 for structure  
- CSS3 for layout and responsive UI  
- Vanilla JavaScript: Web Audio API (synth & metronome), MediaRecorder (download), `localStorage` (persistence), simple autocorrelation (pitch detection)

### Notes
- **Local save** stores *events only* (not audio blobs). Replays use the synth.  
- Want full audio persistence across reloads? Use IndexedDB (easy future upgrade).  
- Pitch detection is intentionally simple; best on monophonic audio.  
- YouTube→MP3 is **not** included (copyright/TOS). If you already have a legal MP3/WAV, drop it in and analyze.  


### Screenshots
<img src="https://github.com/ginesthoii/JS-HTML-CSS-Mini-Projects/blob/main/PlayablePiano/playablepiano.png" width="400" alt="Playable Piano Overview"/>

---

<br>

## [Typing Speed Test Game](./Typing%20Speed%20Test%20Game)

A modern typing test game that measures speed and accuracy in real-time. It highlights correct/incorrect keystrokes, tracks mistakes, WPM (words per minute), CPM (characters per minute), accuracy, and remaining time — all inside a clean card UI with dark mode support.

### Features
- Random paragraph loads each test  
- Real-time highlighting (green = correct, red = incorrect)  
- 60-second countdown timer with **progress bar**  
- Tracks **mistakes, WPM, CPM, and accuracy** live  
- **Try Again** and **New Paragraph** buttons  
- Responsive layout for desktop & mobile  
- Optional **Dark Mode** toggle  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in any modern browser.  
3. Start typing — the timer begins automatically.  

### Tech Used
- HTML5 for structure  
- CSS3 for card layout, highlighting, and dark mode  
- Vanilla JavaScript for timer, input handling, live stats, and progress bar  

### Notes
- Paragraphs are pulled from a local array in `script.js`.  
- The hidden input auto-focuses so you can type immediately.  
- All logic runs entirely in the browser — no backend required.  
---

<br>

## [Dog Age Calculator](./Dog-Age-Calculator)

A quick dog age → human years calculator with size-adjusted estimates.  
Different multipliers are used for small, medium, large, and giant breeds.

### Features
- Enter dog’s age in years (with decimals for months)  
- Select size category (small, medium, large, giant)  
- Converts to approximate human age  
- Simple responsive card layout  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in your browser.  
3. Enter age + size, then hit Calculate.  

### Tech Used
- HTML5 form inputs  
- CSS3 card-based styling  
- Vanilla JavaScript conversion logic  

### Notes
- Not veterinary-accurate, just a general guide.  
- All client-side, no backend required.  

---

<br>

## [Dog Clicker Trainer](./Dog-Clicker-Trainer)

A browser-based dog training clicker tool. Plays a sharp “click” sound on button press (or spacebar) and tracks session stats.

### Features
- Large, tappable clicker button  
- Click with mouse or press Spacebar  
- Tracks **total clicks**, **clicks per minute**, and **session time**  
- Reset session option  
- “Bookmark tip” button for quick training reminders  

### How to Run
1. Clone the repo (or just this folder).  
2. Open `index.html` in your browser.  
3. Start clicking — use with treats for reinforcement training.  

### Tech Used
- HTML5 structure  
- CSS3 neumorphic-style button and layout  
- Vanilla JavaScript for sound, timers, and session stats  

### Notes
- Designed for short, upbeat training sessions.  
- Works offline, no frameworks needed.  

---
<br>
