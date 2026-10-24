# How to edit the Sleepless website

This guide shows you how to change everything on the site: text, links, games, images, schedule, FAQ, colours, fonts and logo.
You don't need to know how to code. Most changes happen in **one file**.

---

## 0. Where things live

```
frontend/
├── public/
│   ├── assets/              <- all images (game pictures)
│   ├── favicon.svg          <- browser tab icon
│   └── index.html           <- page title, Google description, fonts
└── src/
    ├── data/site.js         <- ALL TEXT & CONTENT (edit this most)
    ├── App.css              <- colours, buttons, effects
    ├── App.js               <- order of the sections on the page
    └── components/site/     <- each section of the page
        ├── Nav.jsx          top menu bar
        ├── Hero.jsx         big opening headline + card stack
        ├── Marquee.jsx      scrolling ribbon of words
        ├── Games.jsx        "Four worlds. One crew." games section
        ├── Gallery.jsx      "Caught on camera." clips & screenshots
        ├── GalleryLightbox.jsx  pop-up that opens a clip/screenshot
        ├── Vibe.jsx         rules / vibe boxes
        ├── Schedule.jsx     weekly schedule with filter buttons
        ├── Rules.jsx        "Read before you join." rules dropdown table
        ├── JoinSteps.jsx    "Three steps to the lobby"
        ├── Faq.jsx          questions & answers
        ├── Cta.jsx          big "Stay up with us" banner + footer
        └── Logo.jsx         moon logo
```

How to open files: on Emergent, click the **Code** button in the top toolbar, then open the file from the list on the left.
Save a file and the preview updates by itself in a few seconds.

**Golden rules when editing `site.js`:**
- Only change the text **inside the quotes** `"like this"`.
- Keep the commas `,` at the end of lines and the brackets `{ } [ ]`.
- If you need an apostrophe or quote inside text, use `’` or write `\"`.
- If the page goes blank after an edit, you probably deleted a comma, quote or bracket. Undo with `Ctrl+Z` / `Cmd+Z`.

---

## 1. Change the Discord link (do this first!)

Open `frontend/src/data/site.js`. The first line is:

```js
export const DISCORD_URL = "https://discord.gg/sleepless-placeholder";
```

Replace it with your real invite, for example:

```js
export const DISCORD_URL = "https://discord.gg/AbCdEf123";
```

Every Discord button on the site updates automatically: menu, hero, banner, footer and the copy-link button.

Tip: in Discord, go to Server → Invite People → Edit invite link → set **Expire after: Never**, so the link never stops working.

---

## 2. Edit, add or remove games

In `site.js`, find `export const GAMES = [`. Each game looks like this:

```js
{
  id: "mobile-legends",            // short name, lowercase, no spaces (used by the schedule)
  no: "04",                        // big number shown on the card
  name: "Mobile Legends",          // game title
  genre: "5v5 mobile MOBA",        // small label on the image
  image: "/assets/mlbb.jpg",       // picture (see section 3)
  alt: "Mobile Legends key art",   // picture description for blind users and Google
  blurb: "Our pocket battleground...", // the paragraph
  tags: ["Five-stack ranked", "Classic & brawl"], // small pills
  hue: "#FFB547",                  // the game's accent colour (big number, glow)
},
```

- **Add a game:** copy a whole `{ ... },` block, paste it before the closing `];`, then change the values. Give it a new `id` and `no`.
- **Remove a game:** delete its whole `{ ... },` block. Also delete any schedule events that use its `id`.
- **Change the order:** move the blocks up or down.

The hero card stack, games section and schedule filter buttons all update automatically.
The hero stack looks best with 3 to 5 games.

If you change the number of games, also update the heading in `components/site/Games.jsx`:
`Four worlds.` and `We mostly play these four games.`
And update the hero sentence in `components/site/Hero.jsx` (search for `mostly plays`).

---

## 3. Change images

1. Put your new image in `frontend/public/assets/`. In the Code editor, drag the file onto that folder, or right-click → Upload.
2. Use a landscape image, ideally **1600×1000 px** or larger, in JPG or WebP format.
3. In `site.js`, change the game's `image` to `"/assets/your-file-name.jpg"`.

You can also link an image hosted online: `image: "https://example.com/picture.jpg"`.

Current images:

| File | Used for | Source |
|------|----------|--------|
| `wwm-shot1.jpg` | Where Winds Meet | Official screenshot from its Steam store page |
| `roblox.jpg` | Roblox | Unsplash stock photo |
| `aniimo-shot1.jpg` | Aniimo | Official screenshot from its Steam store page |
| `mlbb.jpg` | Mobile Legends | Official key art from its Google Play listing |

Spare screenshots you can swap in: `wwm-shot2.jpg`, `wwm-shot3.jpg`, `wwm-hero.jpg`, `aniimo-shot2.jpg`, `aniimo-shot3.jpg`.

Game art belongs to its publishers. It's generally fine for a fan community, but don't sell anything with it.

---

## 4. Edit the weekly schedule

In `site.js`, find `export const SCHEDULE = [`:

```js
{ day: "Mon", time: "21:00", game: "where-winds-meet", title: "Guild boss run" },
```

- `day`: any short text, like `"Mon"` or `"Fri"`.
- `time`: any text, like `"21:00"` or `"9 PM"`.
- `game`: must exactly match one game's `id` from section 2.
- `title`: the event name.

Add, delete or reorder lines freely. Two events on the same day are fine.

To set your time zone, open `components/site/Schedule.jsx`, search for `[your time zone]` and replace it, e.g. `GMT+7`.
Also update the last FAQ answer in `site.js`, which mentions `[your time zone]`.

---

## 5. Edit rules / vibe boxes

In `site.js`, find `export const VIBES = [`:

```js
{ key: "respect", title: "Respect first, always.", text: "No toxicity...", big: true },
```

- Change `title` and `text` freely.
- `big: true` makes the large blue box. Keep it on only **one** item.
- The layout fits exactly **1 big box + 4 small boxes**. If you add or remove boxes, it may leave a gap on desktop.
- `key` chooses the icon. Available keys: `respect` (shield), `levels` (sparkles), `vc` (mic), `spam` (ban sign), `night` (moon).
  To use other icons, open `components/site/Vibe.jsx` and add any icon from https://lucide.dev/icons to the `ICONS` list and the `import` line.

---

## 6. Edit the join steps, FAQ and marquee

All three are in `site.js`:

- `STEPS`: the 3 "How to join" cards (`title` and `text`).
- `FAQS`: questions and answers (`q` = question, `a` = answer). Add as many as you like.
- `MARQUEE`: the words in the scrolling ribbon. Just a list of text.

---

## 6b. Clips & screenshots gallery

In `site.js`, find `export const GALLERY = [`. Each item is one tile. Clicking a tile opens it full size in a pop-up.
There are 3 kinds of item.

**1. Screenshot (image)**
```js
{ id: "wwm-duel", game: "where-winds-meet", type: "image", src: "/assets/wwm-shot2.jpg", title: "Duel on the frozen lake", alt: "Two fighters on a lake" },
```

**2. YouTube clip** (easiest for videos)
```js
{ id: "ml-savage", game: "mobile-legends", type: "youtube", src: "dQw4w9WgXcQ", title: "Our first SAVAGE" },
```
- `src` is the video ID, the part after `watch?v=` in the YouTube link.
  For example, in `https://www.youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`.
  For Shorts (`youtube.com/shorts/ABC123`) the ID is `ABC123`.
- The thumbnail is picked up from YouTube automatically.

**3. Video file (.mp4)**
```js
{ id: "wwm-boss", game: "where-winds-meet", type: "video", src: "/assets/boss-clip.mp4", thumb: "/assets/boss-thumb.jpg", title: "Boss down in 40s" },
```
- Put the `.mp4` in `frontend/public/assets/`. Keep it short and small (under 20 MB), because big files make the site slow.
- `thumb` is optional. Without it, the first frame of the video is shown.

What each field means:
- `id`: any unique short name, with no spaces.
- `game`: must match a game `id` from section 2. This sets the coloured label and the filter buttons.
- `title`: the caption on the tile.
- `alt`: optional picture description for blind users and Google.

Filter buttons are created automatically for each game that has at least one item.
To show clips from Roblox or Aniimo too, just add items with `game: "roblox"` or `game: "aniimo"` and their buttons appear.
Tiles are always the same 16:9 shape, so the grid stays neat however many you add.

To change the heading "Caught on camera." or the paragraph under it, edit `components/site/Gallery.jsx`.

Current gallery images: `mlbb-gameplay.jpg`, `mlbb-map.jpg` and `mlbb-skins.jpg` are from the Mobile Legends Google Play listing. `wwm-shot2.jpg`, `wwm-shot3.jpg` and `wwm-hero.jpg` are from the Where Winds Meet Steam page.
Replace them with your own community screenshots whenever you like.

---

## 6c. Server rules (dropdown table)

In `site.js`, find `export const RULES = [`. Each line is one row of the table:

```js
{ rule: "Be respectful", detail: "Treat everyone like a teammate. No insults..." },
```

- `rule`: the short rule name (middle column).
- `detail`: the explanation (right column on desktop, under the rule on phones).
- Rule numbers (01, 02, 03...) and the "9 rules" counter update automatically.
- Add a rule by copying a line. Delete a line to remove a rule. Move lines to reorder.

The table starts closed, and visitors click **Show the rules** to open it.
To make it **open by default**, open `components/site/Rules.jsx` and change `useState(false)` to `useState(true)`.
To change the heading "Read before you join.", the paragraph or the "I agree, join Discord" button text, edit the same file.

---

## 7. Edit headlines and other text

Big section headings are inside each section file in `components/site/`. Search for the words you see on the page:

| What you see | File |
|--------------|------|
| "We don't / sleep. / We play." | `Hero.jsx` (the `LINES` list near the top) |
| "Open to everyone" badge | `Hero.jsx` |
| "Four worlds. One crew." | `Games.jsx` |
| "Caught on camera." | `Gallery.jsx` |
| "Good people. Good games." | `Vibe.jsx` |
| "After dark, every night." | `Schedule.jsx` |
| "Read before you join." | `Rules.jsx` |
| "Three steps to the lobby." | `JoinSteps.jsx` |
| "Before you log in." | `Faq.jsx` |
| "Stay up with us." + footer text | `Cta.jsx` |
| Menu links | `Nav.jsx` (the `LINKS` list) |

In headings, the part inside `<span className="sl-outline">...</span>` shows as outlined text. Change the words but keep the tags.

---

## 8. Change colours

Open `frontend/src/App.css`. At the very top are two colour sets:

```css
:root {          /* LIGHT MODE */
  --bg: #f5f4f0;       background
  --surface: #ffffff;  cards
  --fg: #0d0f1a;       main text
  --muted: #4a5163;    secondary text
  --accent: #4752c4;   main accent (purple-blue)
  --accent-2: #00788a; second accent (teal)
}
.dark {          /* DARK MODE */
  --bg: #07080c;
  --accent: #7b86ff;
  --accent-2: #00e0ff;
  ...
}
```

Replace the `#hex` codes. You can pick colours at https://htmlcolorcodes.com.
Keep text colours readable against the background.

Other colours in the same file:
- `.sl-btn-primary`: the Discord button (`#5865f2` is Discord's official colour).
- `.sl-card-hero`: the big blue rules box gradient.
- `.sl-cta`: the "Stay up with us" banner background.

---

## 9. Dark / light mode

- On a visitor's first visit, the site follows their device setting (dark or light), falling back to dark.
- The sun/moon button switches modes, and the browser remembers the choice.
- To **always start in dark mode**, open `frontend/src/lib/useTheme.js` and change the line
  `return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";`
  to `return "dark";`.
  Then, in `frontend/public/index.html`, find `matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'` and change it to `'dark'`.

---

## 10. Fonts

Fonts are loaded in `frontend/public/index.html` (the `fonts.googleapis.com` line) and used in `App.css`:

- `.sl-display`: headings (**Chivo**)
- `body`: normal text (**IBM Plex Sans**)
- `.sl-mono`: small labels (**JetBrains Mono**)

To change a font:
1. Choose one at https://fonts.google.com.
2. Replace its name in the Google Fonts link. Spaces become `+`, e.g. `family=Bebas+Neue:wght@400`.
3. Replace the name in `App.css`.

---

## 11. Logo and browser tab icon

- On-page logo: `frontend/src/components/site/Logo.jsx`
- Browser tab icon: `frontend/public/favicon.svg`

Both are simple SVG drawings: a crescent moon with an open eye. To use your own logo image instead:
1. Put `logo.png` in `frontend/public/assets/`.
2. Replace everything inside `LogoMark` in `Logo.jsx` with:
   `<img src="/assets/logo.png" alt="Sleepless" className={className} />`
3. For the tab icon, open `public/index.html` and change `favicon.svg` to `assets/logo.png`.

---

## 12. Page title and Google description

In `frontend/public/index.html`:
- `<title>Sleepless | Late-Night Gaming Community</title>` is the browser tab text.
- `<meta name="description" content="...">` is the text shown under your site in Google results.

---

## 13. Reorder or hide whole sections

Open `frontend/src/App.js`. Inside `<main>` you'll see:

```jsx
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
```

- Move a line up or down to reorder sections.
- Delete a line, or wrap it like `{/* <Faq /> */}`, to hide a section.
- If you hide a section, also remove its menu link from `LINKS` in `Nav.jsx`.

---

## 14. Animation speed

- Marquee speed: in `App.css`, `.sl-marquee { animation: sl-marquee 60s ... }`. A bigger number scrolls slower.
- Smooth scrolling: in `App.js`, `new Lenis({ duration: 1.15 })`. A bigger number feels smoother and slower.
- Visitors who turn on "reduce motion" on their device automatically get fewer animations.

---

## 15. Quick checklist before sharing your site

- [ ] Real Discord invite link in `site.js`
- [ ] Your time zone in `Schedule.jsx` and in the FAQ
- [ ] Your real event times in `SCHEDULE`
- [ ] Your own images if you have them
- [ ] Your best clips and screenshots in `GALLERY`
- [ ] Check the site on your phone
