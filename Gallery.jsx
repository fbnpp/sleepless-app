import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Expand } from "lucide-react";
import { GAMES, GALLERY } from "../../data/site";
import { Reveal, SectionLabel } from "./Reveal";
import { GalleryLightbox } from "./GalleryLightbox";

const byId = Object.fromEntries(GAMES.map((g) => [g.id, g]));
const gameIds = [...new Set(GALLERY.map((c) => c.game))];
const TABS = [{ id: "all", name: "All" }, ...gameIds.map((id) => byId[id]).filter(Boolean)];
const ALL_LIMIT = 9;

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
  const randomPicks = useMemo(() => shuffle(GALLERY).slice(0, ALL_LIMIT), []);
  const items = tab === "all" ? randomPicks : GALLERY.filter((c) => c.game === tab);
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
