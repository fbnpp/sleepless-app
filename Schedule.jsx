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
