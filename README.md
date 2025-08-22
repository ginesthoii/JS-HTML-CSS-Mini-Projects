# JS-HTML-CSS-Mini-Projects

A growing collection of small, self-contained JavaScript, HTML, CSS projects.  
Each project lives in its own folder with its own `index.html`, `style.css`, and `index.js`, so you can run them directly in your browser.

<br>

##  Projects Overview

| Project | Folder | Tech | Description |
|---------|--------|------|-------------|
| Text to Speech | [TextToSpeech](./TextToSpeech) | HTML, CSS, JS (Web Speech API) | Convert text into spoken words with voice, pitch, speed controls. |
| Pomodoro Ring | [pomodoro-ring](./pomodoro-ring) | HTML, CSS, JS (Web Audio API, SVG) | 25-minute timer with circular progress ring, notes, and CSV export. |



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

## [Pomodoro Ring](./pomodoro-ring)

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

## [Calculator](./Calculator)
A clean, minimal calculator with basic arithmetic support.  
- Responsive layout.  
- Keyboard support.  
- Styled with modern CSS.  

---

<br>


## [Todo App](./TodoApp)
A lightweight task manager.  
- Add, edit, delete tasks.  
- Local storage persistence.  
- Simple UI designed for productivity.  


<br>

