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
