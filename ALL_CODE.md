# Sleepless website: all code files

Create each file below with exactly this name and paste in the code. Images can't be pasted as text: download them separately (see README).

---

## FILE: `README.md`

````md
# Sleepless website: standalone version

This folder is the complete Sleepless website. It runs on its own, outside Emergent.
You can host it for free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## What's inside

```
sleepless-website/
├── index.html              page title, Google description, fonts
├── package.json            list of libraries the site needs
├── vite.config.js          build tool settings
├── tailwind.config.cjs     styling settings
├── postcss.config.cjs      styling settings
├── .gitignore
├── public/
│   ├── favicon.svg         browser tab icon
│   └── assets/             all images (12 .jpg files)
└── src/
    ├── main.jsx            starts the app
    ├── App.jsx             order of sections
    ├── App.css             colours & effects
    ├── index.css           base styles
    ├── data/site.js        ALL TEXT & CONTENT (Discord link, games, gallery, schedule, FAQ)
    ├── lib/                scroll.js, useTheme.js, utils.js
    └── components/
        ├── site/           every section of the page (14 files)
        └── ui/             accordion.jsx, dialog.jsx
```

The full editing guide is in `tutorial/README.md` in the main project. It applies to this folder too:
everything under `frontend/src/...` there is under `src/...` here, and `frontend/public/...` is `public/...`.

## Run it on your computer (optional)

1. Install **Node.js** (LTS version) from https://nodejs.org
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints, usually http://localhost:5173

## Put it online for free

**Netlify (no coding tools needed)**
1. Run `npm install` and then `npm run build` on your computer. This creates a `dist` folder.
2. Go to https://app.netlify.com/drop and drag the `dist` folder onto the page.
3. You get a live link right away.

**Vercel or Netlify with GitHub (updates automatically)**
1. Create a free GitHub account and a new repository.
2. Upload all files from this folder (not `node_modules` or `dist`).
3. On https://vercel.com, click New Project and import the repository.
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click Deploy. Every time you edit a file on GitHub, the site updates.

## Before you share

- Put your real Discord invite in `src/data/site.js` (`DISCORD_URL`).
- Replace `[your time zone]` in `src/components/site/Schedule.jsx` and in the last FAQ answer in `src/data/site.js`.
````

---

## FILE: `package.json`

````json
{
  "name": "sleepless-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "1.2.8",
    "@radix-ui/react-dialog": "1.1.11",
    "clsx": "2.1.1",
    "framer-motion": "11.18.0",
    "lenis": "1.3.27",
    "lucide-react": "0.516.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.3.4",
    "autoprefixer": "10.4.20",
    "postcss": "8.5.28",
    "tailwindcss": "3.4.17",
    "tailwindcss-animate": "1.0.7",
    "vite": "6.0.7"
  }
}
````

---

## FILE: `vite.config.js`

````js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
````

---

## FILE: `tailwind.config.cjs`

````cjs
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "muted-foreground": "var(--muted)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
````

---

## FILE: `postcss.config.cjs`

````cjs
module.exports = {
  plugins: {
    tailwindcss: { config: "./tailwind.config.cjs" },
    autoprefixer: {},
  },
};
````

---

## FILE: `.gitignore`

````gitignore
node_modules
dist
````

---

## FILE: `index.html`

````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#07080C" />
    <meta name="description" content="Sleepless is a chill late-night gaming community playing Where Winds Meet, Roblox, Aniimo and Mobile Legends. Join our Discord and squad up." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>try{var t=localStorage.getItem('sl-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@700;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <title>Sleepless | Late-Night Gaming Community</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

---

## FILE: `public/favicon.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#07080C"/><path d="M40 10a22 22 0 1 0 14 38A24 24 0 0 1 40 10z" fill="#7B86FF"/><path d="M20 34c4-5 12-5 16 0-4 5-12 5-16 0z" fill="#07080C"/><circle cx="28" cy="34" r="2.6" fill="#00E0FF"/></svg>
````

---

## FILE: `src/main.jsx`

````jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
````

---

## FILE: `src/index.css`

````css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  border-color: var(--line);
}
````

---

## FILE: `src/App.jsx`

````jsx
import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "./App.css";
import { useTheme } from "./lib/useTheme";
import { setLenis } from "./lib/scroll";
import { Nav } from "./components/site/Nav";
import { Hero } from "./components/site/Hero";
import { Marquee } from "./components/site/Marquee";
import { Games } from "./components/site/Games";
import { Gallery } from "./components/site/Gallery";
import { Vibe } from "./components/site/Vibe";
import { Schedule } from "./components/site/Schedule";
import { Rules } from "./components/site/Rules";
import { JoinSteps } from "./components/site/JoinSteps";
import { Faq } from "./components/site/Faq";
import { Cta, Footer } from "./components/site/Cta";

function App() {
  const { theme, toggle } = useTheme();
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return (
    <div className="sl-root">
      <div className="sl-grain" aria-hidden="true" />
      <Nav theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <Marquee />
        <Games />
        <Gallery />
        <Vibe />
        <Schedule />
        <Rules />
        <JoinSteps />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Toaster position="bottom-center" theme={theme} richColors />
    </div>
  );
}

export default App;
````

---

## FILE: `src/App.css`

````css
:root {
  --bg: #f5f4f0;
  --surface: #ffffff;
  --fg: #0d0f1a;
  --muted: #4a5163;
  --line: rgba(13, 15, 26, 0.13);
  --accent: #4752c4;
  --accent-2: #00788a;
  --glass: rgba(245, 244, 240, 0.78);
}
.dark {
  --bg: #07080c;
  --surface: #11131b;
  --fg: #f1f3f8;
  --muted: #a3acbf;
  --line: rgba(255, 255, 255, 0.12);
  --accent: #7b86ff;
  --accent-2: #00e0ff;
  --glass: rgba(7, 8, 12, 0.72);
}

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: "IBM Plex Sans", sans-serif;
  transition: background-color 0.4s ease, color 0.4s ease;
}
::selection { background: var(--accent); color: #fff; }

.sl-root { position: relative; overflow-x: clip; }
.sl-display { font-family: "Chivo", sans-serif; }
.sl-mono { font-family: "JetBrains Mono", monospace; }
.sl-muted { color: var(--muted); }
.sl-fg { color: var(--fg); }
.sl-accent { color: var(--accent); }
.sl-accent2 { color: var(--accent-2); }
.sl-line { border-color: var(--line); }
.sl-outline { color: transparent; -webkit-text-stroke: 1.5px var(--fg); }
@media (min-width: 1024px) { .sl-outline { -webkit-text-stroke-width: 2px; } }

.sl-glass { background: var(--glass); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.sl-card { background: var(--surface); border: 1px solid var(--line); transition: border-color 0.3s ease; }
.sl-card:hover { border-color: var(--accent); }
.sl-card-hero { background: linear-gradient(135deg, #3a44c9 0%, #5865f2 55%, #0aa5c2 100%); border-color: transparent; }

:where(.sl-btn) { display: inline-flex; }
.sl-btn {
  align-items: center; gap: 0.6rem;
  border-radius: 999px; padding: 0.95rem 1.6rem; font-weight: 600;
  transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.sl-btn:hover { transform: translateY(-2px); }
.sl-btn:active { transform: scale(0.97); }
.sl-btn-primary { background: #5865f2; color: #fff; box-shadow: 0 10px 40px -10px rgba(88, 101, 242, 0.7); }
.sl-btn-primary:hover { background: #4752c4; box-shadow: 0 16px 50px -10px rgba(88, 101, 242, 0.9); }
.sl-btn-ghost { border: 1px solid var(--line); color: var(--fg); }
.sl-btn-ghost:hover { border-color: var(--fg); }
:where(.sl-iconbtn) { display: grid; }
.sl-iconbtn {
  place-items: center; height: 40px; width: 40px; border-radius: 999px;
  border: 1px solid var(--line); transition: border-color 0.25s ease, transform 0.25s ease;
}
.sl-iconbtn:hover { border-color: var(--accent); transform: rotate(12deg); }

.sl-navlink { position: relative; color: var(--muted); transition: color 0.25s ease; }
.sl-navlink:hover { color: var(--fg); }
.sl-navlink::after {
  content: ""; position: absolute; left: 0; bottom: -4px; height: 1px; width: 100%;
  background: var(--accent); transform: scaleX(0); transform-origin: right; transition: transform 0.35s ease;
}
.sl-navlink:hover::after { transform: scaleX(1); transform-origin: left; }

.sl-moon {
  background: radial-gradient(circle at 35% 35%, rgba(123, 134, 255, 0.45), rgba(0, 224, 255, 0.12) 45%, transparent 70%);
  filter: blur(20px);
}

.sl-frame { border: 1px solid var(--line); }
.sl-spot {
  background: radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), transparent 0%, rgba(0, 0, 0, 0.45) 70%);
  opacity: 0; transition: opacity 0.4s ease;
}
.sl-frame:hover .sl-spot { opacity: 1; }
.sl-frame::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.sl-row { transition: padding-left 0.3s ease, background-color 0.3s ease; }
@media (hover: hover) { .sl-row:hover { padding-left: 1rem; background: var(--surface); } }

.sl-rule-row { transition: background-color 0.25s ease; }
@media (hover: hover) { .sl-rule-row:hover { background: color-mix(in srgb, var(--accent) 8%, transparent); } }

.sl-cta { background: #2b33a8; }
.sl-cta::before {
  content: ""; position: absolute; right: -10%; top: -40%; width: 70%; aspect-ratio: 1; border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 224, 255, 0.55), transparent 65%); filter: blur(10px);
  animation: sl-float 9s ease-in-out infinite; pointer-events: none;
}
.sl-cta::after {
  content: ""; position: absolute; right: 6%; bottom: 10%; width: 180px; height: 180px; border-radius: 50%;
  box-shadow: inset -40px 10px 0 0 rgba(255, 255, 255, 0.9); opacity: 0.85; pointer-events: none;
}
@media (max-width: 640px) { .sl-cta::after { width: 90px; height: 90px; box-shadow: inset -20px 6px 0 0 rgba(255,255,255,.9); right: 8%; bottom: 6%; opacity: .5; } }

.sl-marquee { animation: sl-marquee 60s linear infinite; }
.sl-marquee:hover { animation-play-state: paused; }
@keyframes sl-marquee { to { transform: translateX(-50%); } }
@keyframes sl-float { 50% { transform: translate(-30px, 30px); } }

.sl-pulse { animation: sl-pulse 2s ease-in-out infinite; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
@keyframes sl-pulse { 50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); } }
.sl-blink { transform-origin: 28px 34px; animation: sl-blink 5s infinite; }
@keyframes sl-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }

.sl-grain {
  pointer-events: none; position: fixed; inset: 0; z-index: 60; opacity: 0.05; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  .sl-marquee, .sl-cta::before, .sl-pulse, .sl-blink { animation: none; }
}
````

---

## FILE: `src/data/site.js`

````js
export const DISCORD_URL = "https://discord.gg/sleepless-placeholder";

export const GAMES = [
  {
    id: "where-winds-meet",
    no: "01",
    name: "Where Winds Meet",
    genre: "Open-world wuxia action RPG",
    image: "/assets/wwm-shot1.jpg",
    alt: "Where Winds Meet character standing on a rock overlooking misty islands",
    blurb:
      "Our main home. We roam the Jianghu together, clear bosses as a squad, run co-op exploration and spar each other just for fun.",
    tags: ["Guild runs", "Boss co-op", "Exploration", "Friendly PvP"],
    hue: "#00E0FF",
  },
  {
    id: "roblox",
    no: "02",
    name: "Roblox",
    genre: "Endless worlds, one lobby",
    image: "/assets/roblox.jpg",
    alt: "Laptop showing the Roblox game library",
    blurb:
      "Whatever's trending tonight: horror maps, obbies, tycoons and chaotic party games. Someone always has a new experience to try.",
    tags: ["Horror nights", "Obbies", "Party games", "Private servers"],
    hue: "#7B86FF",
  },
  {
    id: "aniimo",
    no: "03",
    name: "Aniimo",
    genre: "Creature-collecting open world",
    image: "/assets/aniimo-shot1.jpg",
    alt: "Aniimo player lifting a fluffy cloud creature in a sunny meadow",
    blurb:
      "Our cosy side quest. We hunt for rare Aniimo, swap tips on teams and explore the bright, sunny world together.",
    tags: ["Creature hunts", "Team builds", "Co-op", "Chill VC"],
    hue: "#FF7AC6",
  },
  {
    id: "mobile-legends",
    no: "04",
    name: "Mobile Legends",
    genre: "5v5 mobile MOBA",
    image: "/assets/mlbb.jpg",
    alt: "Mobile Legends: Bang Bang heroes in colourful 10th anniversary key art",
    blurb:
      "Our pocket battleground. We queue up as a five-stack, climb ranked together and play classic and brawl matches just for laughs.",
    tags: ["Five-stack ranked", "Classic & brawl", "Hero tips", "Custom lobbies"],
    hue: "#FFB547",
  },
];

export const MARQUEE = [
  "Where Winds Meet",
  "Roblox",
  "Aniimo",
  "Mobile Legends",
  "Late-night voice chat",
  "No toxicity",
  "All skill levels",
];

export const VIBES = [
  { key: "respect", title: "Respect first, always.", text: "No toxicity, no hate, no drama. Everyone here is a teammate, whatever your rank or ping.", big: true },
  { key: "levels", title: "Every skill level", text: "Brand new or maxed out, there's a squad for you." },
  { key: "vc", title: "Mic optional", text: "Talk, type or just listen. Your call." },
  { key: "spam", title: "No spam or self-promo", text: "Keep the channels clean and on topic." },
  { key: "night", title: "Night owls welcome", text: "Most of us play late. Join whenever you can." },
];

export const GALLERY = [
  { id: "mlbb-gameplay", game: "mobile-legends", type: "image", src: "/assets/mlbb-gameplay.jpg", title: "Lord fight in the Land of Dawn", alt: "Mobile Legends team fight around the Lord" },
  { id: "wwm-duel", game: "where-winds-meet", type: "image", src: "/assets/wwm-shot2.jpg", title: "Duel on the frozen lake", alt: "Two Where Winds Meet fighters facing off on a misty lake" },
  { id: "mlbb-map", game: "mobile-legends", type: "image", src: "/assets/mlbb-map.jpg", title: "New season, new map", alt: "Mobile Legends hero beside the updated battlefield map" },
  { id: "wwm-ride", game: "where-winds-meet", type: "image", src: "/assets/wwm-shot3.jpg", title: "Sunset ride through red fields", alt: "Where Winds Meet rider crossing red grass at sunset" },
  { id: "mlbb-skins", game: "mobile-legends", type: "image", src: "/assets/mlbb-skins.jpg", title: "Fresh skins drop", alt: "Mobile Legends heroes showing new Aspirants skins" },
  { id: "wwm-night", game: "where-winds-meet", type: "image", src: "/assets/wwm-hero.jpg", title: "Night raid crew", alt: "Two Where Winds Meet swordsmen at night under lanterns" },
];

export const SCHEDULE = [
  { day: "Mon", time: "21:00", game: "where-winds-meet", title: "Guild boss run" },
  { day: "Tue", time: "21:00", game: "roblox", title: "Horror map night" },
  { day: "Wed", time: "21:30", game: "aniimo", title: "Rare creature hunt" },
  { day: "Thu", time: "21:00", game: "where-winds-meet", title: "Co-op exploration" },
  { day: "Fri", time: "22:00", game: "roblox", title: "Party games marathon" },
  { day: "Wed", time: "23:00", game: "mobile-legends", title: "Five-stack ranked climb" },
  { day: "Sat", time: "20:00", game: "aniimo", title: "Team build swap & co-op" },
  { day: "Sat", time: "22:30", game: "mobile-legends", title: "Custom lobby brawl" },
  { day: "Sun", time: "20:00", game: "where-winds-meet", title: "Friendly sparring cup" },
];

export const STEPS = [
  { title: "Join the Discord", text: "Tap the invite link and say hi in #welcome. That's the whole entry exam." },
  { title: "Pick your games", text: "Grab the Where Winds Meet, Roblox, Aniimo or Mobile Legends role so you get pinged for the right sessions." },
  { title: "Hop into voice", text: "Jump into an open VC or a scheduled event. Someone's usually awake." },
];

export const RULES = [
  { rule: "Be respectful", detail: "Treat everyone like a teammate. No insults, name-calling or starting drama." },
  { rule: "No hate or harassment", detail: "Zero tolerance for racism, sexism, homophobia, threats or bullying, in chat or in voice." },
  { rule: "Keep it safe for work", detail: "No NSFW, gore or shocking content anywhere: names, avatars, messages or screen shares." },
  { rule: "No spam or self-promo", detail: "No message spam, mass pings or ads for other servers and channels without mod permission." },
  { rule: "Use the right channels", detail: "Post in the matching game channel and keep off-topic chat in #general." },
  { rule: "Play fair", detail: "No cheats, hacks, exploits, account selling or boosting in any game we play." },
  { rule: "Protect privacy", detail: "Never share anyone's personal info, photos or DMs without their permission." },
  { rule: "Follow Discord's rules", detail: "Discord's Terms of Service and Community Guidelines apply here, including the minimum age." },
  { rule: "Listen to the mods", detail: "Mods have the final say. If you disagree, message them privately instead of arguing in chat." },
];

export const FAQS = [
  { q: "Is it free to join?", a: "Yes. Sleepless is a free community. Just join the Discord and follow the rules." },
  { q: "Do I need to be good at the games?", a: "Not at all. We have new players and veterans, and everyone helps each other out." },
  { q: "Do I have to use voice chat?", a: "No. Voice is optional. Plenty of members play with text chat or just listen in." },
  { q: "Can I play other games with you too?", a: "Sure. We mostly play Where Winds Meet, Roblox, Aniimo and Mobile Legends, but members often start sessions for other games." },
  { q: "What time zone are the events in?", a: "Times on this page are a sample in [your time zone]. Check the Discord events channel for the latest schedule." },
];
````

---

## FILE: `src/lib/scroll.js`

````js
let lenis = null;

export const setLenis = (l) => {
  lenis = l;
};

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
};
````

---

## FILE: `src/lib/useTheme.js`

````js
import { useEffect, useState } from "react";

const initial = () => {
  const saved = localStorage.getItem("sl-theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const useTheme = () => {
  const [theme, setTheme] = useState(initial);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("sl-theme", next);
    setTheme(next);
  };
  return { theme, toggle };
};
````

---

## FILE: `src/lib/utils.js`

````js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
````

---

## FILE: `src/components/ui/accordion.jsx`

````jsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
````

---

## FILE: `src/components/ui/dialog.jsx`

````jsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
````

---

## FILE: `src/components/site/Cta.jsx`

````jsx
import { Copy, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { DISCORD_URL } from "../../data/site";
import { Reveal } from "./Reveal";
import { DiscordIcon } from "./DiscordIcon";
import { LogoMark } from "./Logo";

const copy = async () => {
  try {
    await navigator.clipboard.writeText(DISCORD_URL);
    toast.success("Invite link copied. See you in voice!");
  } catch {
    toast.error("Couldn't copy. Long-press the link instead.");
  }
};

export const Cta = () => (
  <section data-testid="discord-cta-banner" className="px-5 pb-10 sm:px-8">
    <Reveal className="sl-cta relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] px-6 py-16 text-white sm:px-14 sm:py-24">
      <div className="relative max-w-3xl">
        <h2 className="sl-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">Stay up with us.</h2>
        <p className="mt-6 max-w-lg text-base text-white/85 md:text-lg">The lobby's open. Join the Sleepless Discord and find your next squad tonight.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a data-testid="cta-join-discord-btn" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-btn bg-white text-[#1b1f4a] hover:bg-white/90">
            <DiscordIcon /> Join the server <ArrowUpRight size={18} />
          </a>
          <button data-testid="discord-copy-link-btn" onClick={copy} className="sl-btn border border-white/40 text-white hover:bg-white/10">
            <Copy size={17} /> Copy invite link
          </button>
        </div>
      </div>
    </Reveal>
  </section>
);

export const Footer = () => (
  <footer className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
    <div className="flex items-center gap-2.5">
      <LogoMark className="h-7 w-7" />
      <span className="sl-display font-black uppercase">Sleepless</span>
    </div>
    <p className="text-sm sl-muted">© {new Date().getFullYear()} Sleepless gaming community. Game art belongs to its owners.</p>
    <a data-testid="footer-discord-link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-navlink inline-flex items-center gap-2 text-sm font-semibold">
      <DiscordIcon className="h-4 w-4" /> Discord
    </a>
  </footer>
);
````

---

## FILE: `src/components/site/DiscordIcon.jsx`

````jsx
export const DiscordIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18a19.9 19.9 0 0 0 6 3l1.3-2a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2a19.8 19.8 0 0 0 6-3c.5-5.1-.9-9.6-3.6-13.6zM8.5 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" />
  </svg>
);
````

---

## FILE: `src/components/site/Faq.jsx`

````jsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { FAQS } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";

export const Faq = () => (
  <section id="faq" data-testid="faq-accordion" className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.4fr]">
    <Reveal>
      <SectionLabel no="07">FAQ</SectionLabel>
      <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Before you <span className="sl-outline">log in.</span>
      </h2>
    </Reveal>
    <Reveal delay={0.1}>
      <Accordion type="single" collapsible className="border-t sl-line">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`q${i}`} className="sl-line">
            <AccordionTrigger data-testid={`faq-item-${i + 1}`} className="py-6 text-left text-lg font-semibold hover:no-underline sm:text-xl">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base sl-muted">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  </section>
);
````

---

## FILE: `src/components/site/Gallery.jsx`

````jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Expand } from "lucide-react";
import { GAMES, GALLERY } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";
import { GalleryLightbox } from "./GalleryLightbox";

const byId = Object.fromEntries(GAMES.map((g) => [g.id, g]));
const gameIds = [...new Set(GALLERY.map((c) => c.game))];
const TABS = [{ id: "all", name: "All" }, ...gameIds.map((id) => byId[id]).filter(Boolean)];

export const thumbOf = (c) => c.thumb || (c.type === "youtube" ? `https://img.youtube.com/vi/${c.src}/hqdefault.jpg` : c.src);

const Tile = ({ c, onOpen }) => {
  const g = byId[c.game];
  return (
    <motion.button
      layout
      data-testid={`gallery-item-${c.id}`}
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="sl-frame group relative aspect-video overflow-hidden rounded-[20px] text-left"
      style={{ "--hue": g?.hue }}
    >
      {c.type === "video" && !c.thumb ? (
        <video src={c.src} muted playsInline preload="metadata" className="h-full w-full object-cover" />
      ) : (
        <img src={thumbOf(c)} alt={c.alt || c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
        {c.type === "image" ? <Expand size={16} /> : <Play size={16} fill="currentColor" />}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="sl-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: g?.hue }}>{g?.name}</span>
        <p className="sl-display mt-1 text-lg font-black uppercase leading-tight">{c.title}</p>
      </div>
    </motion.button>
  );
};

export const Gallery = () => {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(null);
  const items = GALLERY.filter((c) => tab === "all" || c.game === tab);
  return (
    <section id="clips" data-testid="clips-gallery" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel no="02">Clips & screenshots</SectionLabel>
          <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Caught <span className="sl-outline">on camera.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base sl-muted md:text-lg">Big plays and pretty views from our Mobile Legends and Where Winds Meet sessions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.id} data-testid={`gallery-tab-${t.id}`} onClick={() => setTab(t.id)} className="relative rounded-full border sl-line px-4 py-2 text-sm font-semibold">
              {tab === t.id && <motion.span layoutId="gallerypill" className="absolute inset-0 rounded-full bg-[var(--accent)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className={`relative ${tab === t.id ? "text-white" : ""}`}>{t.name}</span>
            </button>
          ))}
        </div>
      </Reveal>
      <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {items.map((c) => <Tile key={c.id} c={c} onOpen={() => setOpen(c)} />)}
        </AnimatePresence>
      </motion.div>
      <GalleryLightbox item={open} onClose={() => setOpen(null)} />
    </section>
  );
};
````

---

## FILE: `src/components/site/GalleryLightbox.jsx`

````jsx
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";

const Media = ({ item }) => {
  if (item.type === "youtube")
    return (
      <iframe
        title={item.title}
        src={`https://www.youtube.com/embed/${item.src}?autoplay=1&rel=0`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  if (item.type === "video") return <video src={item.src} controls autoPlay playsInline className="aspect-video w-full bg-black" />;
  return <img src={item.src} alt={item.alt || item.title} className="max-h-[80vh] w-full object-contain" />;
};

export const GalleryLightbox = ({ item, onClose }) => (
  <Dialog open={!!item} onOpenChange={(o) => { if (!o) onClose(); }}>
    <DialogContent data-testid="gallery-lightbox" className="max-w-5xl overflow-hidden border-white/10 bg-black p-0 text-white [&>button]:rounded-full [&>button]:bg-black/70 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100">
      <DialogTitle className="sr-only">{item?.title}</DialogTitle>
      <DialogDescription className="sr-only">{item?.alt || item?.title}</DialogDescription>
      {item && <Media item={item} />}
      {item && <p className="sl-display px-5 pb-4 pt-3 text-lg font-black uppercase">{item.title}</p>}
    </DialogContent>
  </Dialog>
);
````

---

## FILE: `src/components/site/Games.jsx`

````jsx
import { motion } from "framer-motion";
import { GAMES } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";

const GameRow = ({ g, i }) => {
  const flip = i % 2 === 1;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <article data-testid={`game-card-${g.id}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14" style={{ "--hue": g.hue }}>
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div onMouseMove={onMove} className="sl-frame group relative aspect-[16/10] overflow-hidden rounded-[28px]">
          <motion.img
            src={g.image}
            alt={g.alt}
            loading="lazy"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="sl-spot pointer-events-none absolute inset-0" />
          <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3 py-1 sl-mono text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur">
            {g.genre}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <span className="sl-display block text-7xl font-black leading-none sm:text-8xl" style={{ color: g.hue }}>{g.no}</span>
        <h3 className="sl-display mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">{g.name}</h3>
        <p className="mt-5 text-base sl-muted md:text-lg">{g.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {g.tags.map((t) => (
            <li key={t} className="rounded-full border sl-line px-3.5 py-1.5 text-sm font-medium">{t}</li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
};

export const Games = () => (
  <section id="games" data-testid="games-showcase" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
    <Reveal>
      <SectionLabel no="01">What we play</SectionLabel>
      <h2 className="sl-display mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Four worlds. <span className="sl-outline">One crew.</span>
      </h2>
      <p className="mt-5 max-w-xl text-base sl-muted md:text-lg">
        We mostly play these four games. Pick the one you love, or come try all of them with us.
      </p>
    </Reveal>
    <div className="mt-16 flex flex-col gap-24 sm:gap-32">
      {GAMES.map((g, i) => <GameRow key={g.id} g={g} i={i} />)}
    </div>
  </section>
);
````

---

## FILE: `src/components/site/Hero.jsx`

````jsx
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { DISCORD_URL, GAMES } from "../../data/site";
import { scrollToId } from "../../lib/scroll";
import { DiscordIcon } from "./DiscordIcon";

const LINES = ["We don't", "sleep.", "We play."];
const ease = [0.16, 1, 0.3, 1];

const Line = ({ text, i }) => (
  <span className="block overflow-hidden pb-[0.06em]">
    <motion.span
      className={`block ${i === 1 ? "sl-outline" : ""} ${i === 2 ? "sl-accent" : ""}`}
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay: 0.15 + i * 0.14, ease }}
    >
      {text}
    </motion.span>
  </span>
);

const CardStack = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };
  return (
    <div onMouseMove={onMove} onMouseLeave={reset} className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[420px] [perspective:1200px]" data-testid="hero-card-stack">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative h-full w-full [transform-style:preserve-3d]">
        {GAMES.map((g, i) => (
          <motion.figure
            key={g.id}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={{ opacity: 1, y: (1.5 - i) * 8, x: `${(i - 1.5) * 13}%`, rotate: (i - 1.5) * 7 }}
            transition={{ duration: 1.2, delay: 0.6 + i * 0.12, ease }}
            style={{ transform: `translateZ(${i * 30}px)` }}
            className="absolute inset-[14%] overflow-hidden rounded-2xl border sl-line shadow-2xl"
          >
            <img src={g.image} alt={g.alt} className="h-full w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-white">
              <span className="sl-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: g.hue }}>{g.no}</span>
              <p className="sl-display text-lg font-black uppercase leading-tight">{g.name}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -80]);
  return (
    <section id="top" data-testid="hero-section" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:min-h-[100svh] lg:pb-24">
      <div className="sl-moon pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ y: yText }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border sl-line px-3 py-1.5 sl-mono text-xs uppercase tracking-[0.18em]">
            <span className="sl-pulse h-2 w-2 rounded-full bg-[#22C55E]" /> Open to everyone
          </motion.div>
          <h1 data-testid="hero-title" className="sl-display text-[17vw] font-black uppercase leading-[0.86] tracking-[-0.04em] sm:text-[13vw] lg:text-[8.6vw] xl:text-[8.2rem]">
            {LINES.map((l, i) => <Line key={l} text={l} i={i} />)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8, ease }} className="mt-8 max-w-lg text-base sl-muted md:text-lg">
            Sleepless is a chill, late-night crew that mostly plays <b className="sl-fg">Where Winds Meet</b>, <b className="sl-fg">Roblox</b>, <b className="sl-fg">Aniimo</b> and <b className="sl-fg">Mobile Legends</b>. Grab a seat in voice and squad up with us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }} className="mt-9 flex flex-wrap gap-3">
            <a data-testid="hero-join-discord-btn" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-btn sl-btn-primary">
              <DiscordIcon className="h-5 w-5" /> Join our Discord
            </a>
            <button data-testid="hero-explore-games-btn" onClick={() => scrollToId("games")} className="sl-btn sl-btn-ghost">
              See what we play <ArrowDownRight size={18} />
            </button>
          </motion.div>
        </motion.div>
        <CardStack />
      </div>
    </section>
  );
};
````

---

## FILE: `src/components/site/JoinSteps.jsx`

````jsx
import { motion } from "framer-motion";
import { STEPS } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";

export const JoinSteps = () => (
  <section id="join" data-testid="join-steps" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
    <Reveal>
      <SectionLabel no="06">How to join</SectionLabel>
      <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Three steps <span className="sl-outline">to the lobby.</span>
      </h2>
    </Reveal>
    <ol className="mt-14 grid gap-4 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <motion.li
          key={s.title}
          data-testid={`join-step-${i + 1}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="sl-card group relative overflow-hidden rounded-[24px] p-7 sm:p-8"
        >
          <span className="sl-display sl-outline block text-[7rem] font-black leading-none transition-transform duration-500 group-hover:-translate-y-2">{i + 1}</span>
          <h3 className="sl-display mt-6 text-2xl font-black uppercase">{s.title}</h3>
          <p className="mt-3 text-base sl-muted">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  </section>
);
````

---

## FILE: `src/components/site/Logo.jsx`

````jsx
export const LogoMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M40 10a22 22 0 1 0 14 38A24 24 0 0 1 40 10z" fill="var(--accent)" />
    <path d="M20 34c4-5 12-5 16 0-4 5-12 5-16 0z" fill="var(--bg)" />
    <circle cx="28" cy="34" r="2.6" fill="var(--accent-2)" className="sl-blink" />
  </svg>
);
````

---

## FILE: `src/components/site/Marquee.jsx`

````jsx
import { MARQUEE } from "../../data/site";

const Row = () => (
  <div className="flex shrink-0 items-center">
    {MARQUEE.map((t, i) => (
      <span key={t} className="flex items-center">
        <span className={`sl-display px-6 text-4xl font-black uppercase tracking-tight sm:text-6xl ${i % 2 ? "sl-outline" : ""}`}>{t}</span>
        <span className="sl-accent2 text-2xl sm:text-4xl">✦</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <section data-testid="marquee-ribbon" className="overflow-hidden border-y sl-line py-6 sm:py-8" aria-label="What we play">
    <div className="sl-marquee flex w-max">
      <Row />
      <Row />
    </div>
  </section>
);
````

---

## FILE: `src/components/site/Nav.jsx`

````jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";
import { DISCORD_URL } from "../../data/site";
import { scrollToId } from "../../lib/scroll";

const LINKS = [
  ["games", "Games"],
  ["clips", "Clips"],
  ["vibe", "Vibe"],
  ["schedule", "Schedule"],
  ["rules", "Rules"],
  ["join", "Join"],
  ["faq", "FAQ"],
];

export const Nav = ({ theme, onToggle }) => {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 sl-glass border-b sl-line">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 sm:px-8">
        <button data-testid="navbar-logo" onClick={() => go("top")} className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="sl-display text-lg font-black uppercase tracking-tight">Sleepless</span>
        </button>
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([id, label]) => (
            <button key={id} data-testid={`nav-link-${id}`} onClick={() => go(id)} className="sl-navlink text-sm font-medium">
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button data-testid="navbar-theme-toggle" onClick={onToggle} aria-label="Toggle theme" className="sl-iconbtn">
            <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="grid place-items-center">
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </motion.span>
          </button>
          <a data-testid="navbar-discord-button" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-btn sl-btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Join Discord
          </a>
          <button data-testid="navbar-menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu" className="sl-iconbtn lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t sl-line lg:hidden">
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map(([id, label]) => (
                <button key={id} data-testid={`mobile-nav-link-${id}`} onClick={() => go(id)} className="sl-display py-2 text-left text-2xl font-black uppercase">
                  {label}
                </button>
              ))}
              <a data-testid="mobile-nav-discord-button" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-btn sl-btn-primary mt-3 justify-center">
                Join Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
````

---

## FILE: `src/components/site/Reveal.jsx`

````jsx
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 32 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionLabel = ({ no, children }) => (
  <div className="flex items-center gap-3 sl-mono text-xs uppercase tracking-[0.25em] sl-muted">
    <span className="sl-accent2">{no}</span>
    <span className="h-px w-10 bg-current opacity-40" />
    <span>{children}</span>
  </div>
);
````

---

## FILE: `src/components/site/Rules.jsx`

````jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ScrollText } from "lucide-react";
import { DISCORD_URL, RULES } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";
import { DiscordIcon } from "./DiscordIcon";

const RulesTable = () => (
  <table data-testid="rules-table" className="w-full border-collapse text-left">
    <thead>
      <tr className="border-b sl-line sl-mono text-[11px] uppercase tracking-[0.2em] sl-muted">
        <th className="w-14 px-5 py-4 font-medium sm:w-20 sm:px-7">#</th>
        <th className="px-2 py-4 font-medium sm:w-[32%]">Rule</th>
        <th className="hidden px-5 py-4 font-medium sm:table-cell">What it means</th>
      </tr>
    </thead>
    <tbody>
      {RULES.map((r, i) => (
        <tr key={r.rule} data-testid={`rules-row-${i + 1}`} className="sl-rule-row border-b sl-line last:border-0">
          <td className="px-5 py-5 align-top sm:px-7">
            <span className="sl-display text-xl font-black sl-accent">{String(i + 1).padStart(2, "0")}</span>
          </td>
          <td className="px-2 py-5 align-top">
            <p className="text-base font-semibold sm:text-lg">{r.rule}</p>
            <p className="mt-1 pr-4 text-sm sl-muted sm:hidden">{r.detail}</p>
          </td>
          <td className="hidden px-5 py-5 align-top text-base sl-muted sm:table-cell">{r.detail}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Rules = () => {
  const [open, setOpen] = useState(false);
  return (
    <section id="rules" data-testid="server-rules" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <SectionLabel no="05">Server rules</SectionLabel>
        <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
          Read before <span className="sl-outline">you join.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base sl-muted md:text-lg">A few simple rules keep Sleepless fun for everyone. Breaking them can get you a warning, a kick or a ban.</p>
      </Reveal>
      <Reveal delay={0.1} className="sl-card mt-12 overflow-hidden rounded-[24px]">
        <button
          data-testid="rules-dropdown-toggle"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
        >
          <span className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white"><ScrollText size={19} /></span>
            <span>
              <span className="sl-display block text-lg font-black uppercase sm:text-2xl">{open ? "Hide the rules" : "Show the rules"}</span>
              <span className="sl-mono text-xs uppercase tracking-[0.18em] sl-muted">{RULES.length} rules · 1 min read</span>
            </span>
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="sl-iconbtn shrink-0">
            <ChevronDown size={18} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="rules"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t sl-line"
            >
              <RulesTable />
              <div className="flex flex-col items-start justify-between gap-4 border-t sl-line px-5 py-6 sm:flex-row sm:items-center sm:px-7">
                <p className="text-sm sl-muted">Read them all? You're ready.</p>
                <a data-testid="rules-join-discord-btn" href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="sl-btn sl-btn-primary">
                  <DiscordIcon /> I agree, join Discord
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
};
````

---

## FILE: `src/components/site/Schedule.jsx`

````jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GAMES, SCHEDULE } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";

const TABS = [{ id: "all", name: "All games" }, ...GAMES];
const byId = Object.fromEntries(GAMES.map((g) => [g.id, g]));

export const Schedule = () => {
  const [tab, setTab] = useState("all");
  const rows = SCHEDULE.filter((s) => tab === "all" || s.game === tab);
  return (
    <section id="schedule" data-testid="weekly-schedule" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel no="04">Weekly schedule</SectionLabel>
          <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            After dark, <span className="sl-outline">every night.</span>
          </h2>
          <p className="mt-4 sl-mono text-xs uppercase tracking-[0.18em] sl-muted">Sample times · [your time zone]</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.id} data-testid={`schedule-tab-${t.id}`} onClick={() => setTab(t.id)} className="relative rounded-full border sl-line px-4 py-2 text-sm font-semibold">
              {tab === t.id && <motion.span layoutId="tabpill" className="absolute inset-0 rounded-full bg-[var(--accent)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className={`relative ${tab === t.id ? "text-white" : ""}`}>{t.name}</span>
            </button>
          ))}
        </div>
      </Reveal>
      <ul className="mt-12 border-t sl-line">
        <AnimatePresence initial={false}>
          {rows.map((s) => (
            <motion.li
              layout
              key={`${s.day}-${s.time}`}
              data-testid={`schedule-row-${s.day.toLowerCase()}-${s.time.replace(":", "")}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
              className="sl-row grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-1 border-b sl-line py-5 sm:grid-cols-[120px_120px_1fr_auto] sm:py-6"
            >
              <span className="sl-display text-2xl font-black uppercase sm:text-4xl">{s.day}</span>
              <span className="sl-mono text-sm sl-muted sm:order-none">{s.time}</span>
              <span className="col-start-2 text-lg font-semibold sm:col-start-auto sm:text-xl">{s.title}</span>
              <span className="col-start-2 inline-flex w-fit items-center gap-2 text-sm sm:col-start-auto">
                <span className="h-2 w-2 rounded-full" style={{ background: byId[s.game].hue }} />
                {byId[s.game].name}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};
````

---

## FILE: `src/components/site/Vibe.jsx`

````jsx
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Mic, Ban, MoonStar } from "lucide-react";
import { VIBES } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";

const ICONS = { respect: ShieldCheck, levels: Sparkles, vc: Mic, spam: Ban, night: MoonStar };

const Tile = ({ v, i }) => {
  const Icon = ICONS[v.key];
  return (
    <motion.div
      data-testid={`vibe-tile-${v.key}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`sl-card relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-7 ${v.big ? "sl-card-hero md:col-span-2 md:row-span-2" : ""}`}
    >
      <Icon size={v.big ? 40 : 26} className={v.big ? "text-white" : "sl-accent"} />
      <div className="mt-8">
        <h3 className={`sl-display font-black uppercase tracking-tight ${v.big ? "text-3xl text-white sm:text-5xl" : "text-xl"}`}>{v.title}</h3>
        <p className={`mt-3 ${v.big ? "max-w-md text-base text-white/85 md:text-lg" : "text-sm sl-muted"}`}>{v.text}</p>
      </div>
    </motion.div>
  );
};

export const Vibe = () => (
  <section id="vibe" data-testid="vibe-rules-bento" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
    <Reveal>
      <SectionLabel no="03">The vibe & rules</SectionLabel>
      <h2 className="sl-display mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Good people. <span className="sl-outline">Good games.</span>
      </h2>
    </Reveal>
    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[230px]">
      {VIBES.map((v, i) => <Tile key={v.key} v={v} i={i} />)}
    </div>
  </section>
);
````
