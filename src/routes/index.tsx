import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HSN" },
      { name: "description", content: "Personal portfolio showcasing software, hardware, and creative projects — from clinic management systems to retro terminal apps." },
      { property: "og:title", content: "Portfolio — Maker, Tinkerer, Developer" },
      { property: "og:description", content: "Personal portfolio showcasing software, hardware, and creative projects." },
    ],
  }),
  component: Portfolio,
});

const skills = [
  { name: "Hackintoshing", emoji: "🍎" },
  { name: "Custom Keyboard Modding", emoji: "⌨️" },
  { name: "Arduino & Embedded", emoji: "🔌" },
  { name: "PC Building & Diagnosing", emoji: "🖥️" },
  { name: "Disk Recovery", emoji: "💾" },
  { name: "Cross-Platform Proficiency", emoji: "🔀" },
  { name: "Hardware & Software Troubleshooting", emoji: "🔧" },
  { name: "Software Development", emoji: "</>" },
  { name: "PHP Programming", emoji: "🐘" },
  { name: "C# Programming", emoji: "♯" },
  { name: "C++ Programming", emoji: "➕" },
  { name: "UI/UX Design", emoji: "🎨" },
  { name: "Sound Design", emoji: "🎚️" },
  { name: "Technical Writing", emoji: "📝" },
  { name: "Photography", emoji: "📷" },
  { name: "Songwriting", emoji: "🎼" },
  { name: "Guitar Playing", emoji: "🎸" },
];

const projects = [
  {
    title: "RabiesResQ",
    tag: "Healthcare · Web App",
    blurb:
      "A clinic management app that makes rabies care smoother and smarter. Tracks patients, flags urgent cases, and keeps vaccinations on schedule through a clean dashboard.",
    role: "QA Tester · Frontend · Tech Writer · Backend (a little)",
    accent: "from-[oklch(0.78_0.06_145)] to-[oklch(0.55_0.06_145)]",
    glyph: "🐕",
    size: "lg",
    link: "https://github.com/Ang3lito/RABIESRESQ",
  },
  {
    title: "Addit '87",
    tag: "Terminal · Diary App",
    blurb:
      "A retro-styled terminal diary inspired by The Lake. Looks old-school on the outside, modern security under the hood.",
    role: "Designer · Developer",
    accent: "from-[oklch(0.65_0.04_140)] to-[oklch(0.38_0.05_150)]",
    glyph: "▌",
    size: "md",
    link: "https://github.com/pancak00/addit-87",
  },
  {
    title: "Weather-Boi",
    tag: "Kotlin · CLI",
    blurb:
      "A clean, aesthetic terminal weather dashboard. Real-time forecasts and a 3-day outlook rendered in a colored box with dynamic ASCII weather art.",
    role: "Solo build",
    accent: "from-[oklch(0.82_0.05_220)] to-[oklch(0.5_0.08_215)]",
    glyph: "☁",
    size: "md",
    link: "https://github.com/pancak00/weather_boi",
  },
  {
    title: "Retro Calculator",
    tag: "Web · Toy",
    blurb: "A clean, retro-looking calculator that came straight from a VHS tape.",
    role: "Solo build",
    accent: "from-[oklch(0.85_0.06_85)] to-[oklch(0.55_0.1_60)]",
    glyph: "▣",
    size: "sm",
    link: "https://github.com/pancak00/calc",
  },
  {
    title: "Retro Tape Player",
    tag: "Web · Audio",
    blurb: "A nostalgic tape-deck simulator with the warmth and wobble of analog playback.",
    role: "Solo build",
    accent: "from-[oklch(0.78_0.08_40)] to-[oklch(0.45_0.09_30)]",
    glyph: "⊚",
    size: "sm",
    link: "https://pancak00.github.io/retrotapeplayer/",
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen grain-bg overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Divider label="01 — about" />
        <About />
        <Divider label="02 — skills" />
        <Skills />
        <Divider label="03 — work" />
        <Projects />
        <Divider label="04 — contact" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md bg-background/70 border-b border-border" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-3 group">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sage text-primary-foreground font-display text-lg shadow-soft transition-transform duration-500 group-hover:rotate-12">
            ✦
          </span>
          <span className="truncate font-display text-lg text-sage-deep">portfolio.</span>
        </a>
        <div className="hidden md:flex items-center gap-1 text-sm">
          <nav className="flex items-center gap-1">
            {[
              ["about", "#about"],
              ["skills", "#skills"],
              ["work", "#work"],
              ["contact", "#contact"],
            ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative px-4 py-2 rounded-full text-muted-foreground hover:text-sage-deep transition-colors group"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 rounded-full bg-sage-soft scale-0 group-hover:scale-100 transition-transform duration-300" />
            </a>
          ))}
          </nav>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-sage px-4 py-2 text-sm text-primary-foreground"
          >
            say hi
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-16 pb-32 md:pt-28 md:pb-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            available for new projects · 2026
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-[8rem] leading-[0.95] tracking-tight text-foreground animate-fade-up">
          <span className="block">Maker of</span>
          <span className="block text-sage italic">curious things.</span>
          <span className="block">
            <span className="text-muted-foreground/60">Hardware,</span>
          </span>
          <span className="block text-muted-foreground/60">software, sound.</span>
        </h1>

        <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-8 items-end animate-fade-up delay-200">
          <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            I build apps, mod keyboards, recover dead disks, design interfaces, and write
            songs on the side. Equal parts engineer and tinkerer — happiest where code meets
            something you can actually hold.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-glow transition-all duration-300"
            >
              see the work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium text-foreground hover:border-sage transition-colors"
            >
              get in touch
            </a>
          </div>
        </div>

        {/* floating glyphs */}
        <div className="pointer-events-none absolute right-6 top-32 hidden lg:block">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full bg-sage-soft animate-float" />
            <div
              className="absolute right-8 top-8 grid h-20 w-20 place-items-center rounded-3xl bg-card shadow-lift animate-float"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-3xl">⌨️</span>
            </div>
            <div
              className="absolute left-0 bottom-12 grid h-16 w-16 place-items-center rounded-2xl bg-card shadow-lift animate-float"
              style={{ animationDelay: "2s" }}
            >
              <span className="text-2xl">🎸</span>
            </div>
            <div
              className="absolute right-0 bottom-0 grid h-14 w-14 place-items-center rounded-2xl bg-sage text-primary-foreground shadow-lift animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="font-display">{"</>"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Divider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-6">
        <span className="text-xs uppercase tracking-[0.25em] text-sage-deep font-medium">
          {label}
        </span>
        <span
          className={`h-px bg-sage origin-left ${visible ? "animate-draw-line" : "scale-x-0"}`}
        />
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <div className="mb-6">
            <img
              src="/profile.png"
              alt="Profile photo"
              className="w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover shadow-lift border-2 border-border"
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-sage-deep">
            A few words<br />about me.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-lg">
            I'm a generalist who genuinely likes the whole stack from soldering an Arduino
            sensor at 1 am to shipping a healthcare dashboard the next morning.
          </p>
          <p>
            My favorite problems sit between disciplines: a calculator that thinks it lives
            inside a VHS tape, a diary app dressed up like a 1987 terminal, a weather CLI
            that draws clouds in ASCII. The work I'm proudest of feels like it has a personality.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            {[
              ["5+", "years tinkering"],
              ["16", "disciplines"],
              ["∞", "rabbit holes"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-sage">{n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <h2 className="font-display text-4xl md:text-5xl text-sage-deep max-w-2xl">
            Things I do <span className="italic text-sage">(sometimes all at once)</span>.
          </h2> 
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {skills.map((s, i) => (
            <li
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-1 hover:border-sage cursor-default"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="absolute inset-0 bg-sage-soft translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="font-medium text-sm text-foreground leading-snug">
                  {s.name}
                </span>
                <span className="text-lg opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">
                  {s.emoji}
                </span>
              </div>
              <div className="relative z-10 mt-8 h-px w-8 bg-sage origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </li>
          ))}
        </ul>

        {/* marquee */}
        <div className="mt-16 overflow-hidden border-y border-border py-6 -mx-6">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((s, i) => (
              <span
                key={i}
                className="font-display text-2xl text-sage-deep/40 inline-flex items-center gap-3"
              >
                {s.name}
                <span className="text-sage">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section id="work" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl text-sage-deep">
            Selected work.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A mix of shipped products and weekend obsessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(0,1fr)]">
          {projects.map((p) => {
            const span =
              p.size === "lg"
                ? "md:col-span-4 md:row-span-2"
                : p.size === "md"
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-2";
            return (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(p.title)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-2 cursor-pointer ${span}`}
              >
                {/* gradient backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="absolute -right-8 -bottom-8 text-[10rem] leading-none opacity-[0.06] group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700">
                  {p.glyph}
                </div>

                <div className="relative z-10 flex flex-col h-full min-h-[180px]">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-deep group-hover:text-primary-foreground/80 transition-colors">
                      {p.tag}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-soft text-sage-deep group-hover:bg-card group-hover:rotate-45 transition-all duration-500">
                      ↗
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground group-hover:text-primary-foreground/85 transition-colors duration-500 leading-relaxed flex-1">
                    {p.blurb}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border group-hover:border-primary-foreground/20 transition-colors">
                    <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                      {p.role}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          {hovered ? (
            <>
              currently peeking: <span className="text-sage-deep font-medium">{hovered}</span>
            </>
          ) : (
            <>more in the workshop. always.</>
          )}
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "stratstrat120@gmail.com";
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 md:p-16 shadow-lift text-center">
          <div className="absolute inset-0 grain-bg opacity-60" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sage-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
              let's build something
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl text-foreground leading-tight">
              Got an idea worth<br />
              <span className="italic text-sage">tinkering on</span>?
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md mx-auto">
              I'm open to freelance, collaborations, or just nerdy conversations
              about keyboards and weird hardware.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/pancak00"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-sage px-6 py-3 text-sm text-primary-foreground shadow-soft hover:shadow-glow transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm hover:border-sage transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>email me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex justify-center items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · handcrafted with sage green and stubbornness.
        </p>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          online
          <span className="inline-block h-2 w-2 rounded-full bg-sage animate-blink" />
        </span>
      </div>
    </footer>
  );
}
