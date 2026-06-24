import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
//#region src/hooks/use-theme.tsx
function useTheme() {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("theme");
			if (stored === "light" || stored === "dark") return stored;
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
		}
		return "light";
	});
	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("theme", theme);
	}, [theme]);
	const toggleTheme = () => {
		setTheme((prev) => prev === "light" ? "dark" : "light");
	};
	return {
		theme,
		toggleTheme,
		setTheme
	};
}
//#endregion
//#region src/components/theme-toggle.tsx
function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ jsx("button", {
		onClick: toggleTheme,
		className: "inline-flex items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur px-4 py-2 text-sm font-medium text-foreground hover:border-sage transition-colors",
		"aria-label": "Toggle dark mode",
		children: theme === "dark" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 mr-2" }), "Light"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 mr-2" }), "Dark"] })
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var skills = [
	{
		name: "Hackintoshing",
		emoji: "🍎"
	},
	{
		name: "Custom Keyboard Modding",
		emoji: "⌨️"
	},
	{
		name: "Arduino & Embedded",
		emoji: "🔌"
	},
	{
		name: "PC Building & Diagnosing",
		emoji: "🖥️"
	},
	{
		name: "Disk Recovery",
		emoji: "💾"
	},
	{
		name: "Cross-Platform Proficiency",
		emoji: "🔀"
	},
	{
		name: "Hardware & Software Troubleshooting",
		emoji: "🔧"
	},
	{
		name: "Software Development",
		emoji: "</>"
	},
	{
		name: "PHP Programming",
		emoji: "🐘"
	},
	{
		name: "C# Programming",
		emoji: "♯"
	},
	{
		name: "C++ Programming",
		emoji: "➕"
	},
	{
		name: "UI/UX Design",
		emoji: "🎨"
	},
	{
		name: "Sound Design",
		emoji: "🎚️"
	},
	{
		name: "Technical Writing",
		emoji: "📝"
	},
	{
		name: "Songwriting",
		emoji: "🎼"
	},
	{
		name: "Guitar Playing",
		emoji: "🎸"
	}
];
var projects = [
	{
		title: "RabiesResQ",
		tag: "Healthcare · Web App",
		blurb: "A clinic management app that makes rabies care smoother and smarter. Tracks patients, flags urgent cases, and keeps vaccinations on schedule through a clean dashboard.",
		role: "QA Tester · Frontend · Tech Writer · Backend (a little)",
		accent: "from-[oklch(0.78_0.06_145)] to-[oklch(0.55_0.06_145)]",
		glyph: "🐕",
		size: "lg"
	},
	{
		title: "Addit '87",
		tag: "Terminal · Diary App",
		blurb: "A retro-styled terminal diary inspired by The Lake. Looks old-school on the outside, modern security under the hood.",
		role: "Designer · Developer",
		accent: "from-[oklch(0.65_0.04_140)] to-[oklch(0.38_0.05_150)]",
		glyph: "▌",
		size: "md"
	},
	{
		title: "Weather-Boi",
		tag: "Kotlin · CLI",
		blurb: "A clean, aesthetic terminal weather dashboard. Real-time forecasts and a 3-day outlook rendered in a colored box with dynamic ASCII weather art.",
		role: "Solo build",
		accent: "from-[oklch(0.82_0.05_220)] to-[oklch(0.5_0.08_215)]",
		glyph: "☁",
		size: "md"
	},
	{
		title: "Retro Calculator",
		tag: "Web · Toy",
		blurb: "A clean, retro-looking calculator that came straight from a VHS tape.",
		role: "Solo build",
		accent: "from-[oklch(0.85_0.06_85)] to-[oklch(0.55_0.1_60)]",
		glyph: "▣",
		size: "sm"
	},
	{
		title: "Retro Tape Simulator",
		tag: "Web · Audio",
		blurb: "A nostalgic tape-deck simulator with the warmth and wobble of analog playback.",
		role: "Solo build",
		accent: "from-[oklch(0.78_0.08_40)] to-[oklch(0.45_0.09_30)]",
		glyph: "⊚",
		size: "sm"
	}
];
function Portfolio() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen grain-bg overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsx(Nav, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(Divider, { label: "01 — about" }),
				/* @__PURE__ */ jsx(About, {}),
				/* @__PURE__ */ jsx(Divider, { label: "02 — skills" }),
				/* @__PURE__ */ jsx(Skills, {}),
				/* @__PURE__ */ jsx(Divider, { label: "03 — work" }),
				/* @__PURE__ */ jsx(Projects, {}),
				/* @__PURE__ */ jsx(Divider, { label: "04 — contact" }),
				/* @__PURE__ */ jsx(Contact, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsx("header", {
		className: `sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-3 backdrop-blur-md bg-background/70 border-b border-border" : "py-6 bg-transparent"}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#top",
					className: "flex min-w-0 items-center gap-3 group",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sage text-primary-foreground font-display text-lg shadow-soft transition-transform duration-500 group-hover:rotate-12",
						children: "✦"
					}), /* @__PURE__ */ jsx("span", {
						className: "truncate font-display text-lg text-sage-deep",
						children: "portfolio."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden md:flex items-center gap-1 text-sm",
					children: [/* @__PURE__ */ jsx("nav", {
						className: "flex items-center gap-1",
						children: [
							["about", "#about"],
							["skills", "#skills"],
							["work", "#work"],
							["contact", "#contact"]
						].map(([label, href]) => /* @__PURE__ */ jsxs("a", {
							href,
							className: "relative px-4 py-2 rounded-full text-muted-foreground hover:text-sage-deep transition-colors group",
							children: [/* @__PURE__ */ jsx("span", {
								className: "relative z-10",
								children: label
							}), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-sage-soft scale-0 group-hover:scale-100 transition-transform duration-300" })]
						}, href))
					}), /* @__PURE__ */ jsx(ThemeToggle, {})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:hidden flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ThemeToggle, {}), /* @__PURE__ */ jsx("a", {
						href: "#contact",
						className: "inline-flex items-center justify-center rounded-full bg-sage px-4 py-2 text-sm text-primary-foreground",
						children: "say hi"
					})]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ jsx("section", {
		id: "top",
		className: "relative pt-16 pb-32 md:pt-28 md:pb-44",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-8 animate-fade-in",
					children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-sage animate-pulse" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
						children: "available for new projects · 2026"
					})]
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "font-display text-5xl sm:text-7xl md:text-[8rem] leading-[0.95] tracking-tight text-foreground animate-fade-up",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "block",
							children: "Maker of"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "block text-sage italic",
							children: "curious things."
						}),
						/* @__PURE__ */ jsx("span", {
							className: "block",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground/60",
								children: "Hardware,"
							})
						}),
						/* @__PURE__ */ jsx("span", {
							className: "block text-muted-foreground/60",
							children: "software, sound."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12 grid md:grid-cols-[1fr_auto] gap-8 items-end animate-fade-up delay-200",
					children: [/* @__PURE__ */ jsx("p", {
						className: "max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed",
						children: "I build apps, mod keyboards, recover dead disks, design interfaces, and write songs on the side. Equal parts engineer and tinkerer — happiest where code meets something you can actually hold."
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "#work",
							className: "group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-glow transition-all duration-300",
							children: ["see the work", /* @__PURE__ */ jsx("span", {
								className: "transition-transform duration-300 group-hover:translate-x-1",
								children: "→"
							})]
						}), /* @__PURE__ */ jsx("a", {
							href: "#contact",
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium text-foreground hover:border-sage transition-colors",
							children: "get in touch"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pointer-events-none absolute right-6 top-32 hidden lg:block",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative h-64 w-64",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-sage-soft animate-float" }),
							/* @__PURE__ */ jsx("div", {
								className: "absolute right-8 top-8 grid h-20 w-20 place-items-center rounded-3xl bg-card shadow-lift animate-float",
								style: { animationDelay: "1s" },
								children: /* @__PURE__ */ jsx("span", {
									className: "text-3xl",
									children: "⌨️"
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute left-0 bottom-12 grid h-16 w-16 place-items-center rounded-2xl bg-card shadow-lift animate-float",
								style: { animationDelay: "2s" },
								children: /* @__PURE__ */ jsx("span", {
									className: "text-2xl",
									children: "🎸"
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute right-0 bottom-0 grid h-14 w-14 place-items-center rounded-2xl bg-sage text-primary-foreground shadow-lift animate-float",
								style: { animationDelay: "0.5s" },
								children: /* @__PURE__ */ jsx("span", {
									className: "font-display",
									children: "</>"
								})
							})
						]
					})
				})
			]
		})
	});
}
function Divider({ label }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: .5 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: "mx-auto max-w-6xl px-6 py-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-6",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-xs uppercase tracking-[0.25em] text-sage-deep font-medium",
				children: label
			}), /* @__PURE__ */ jsx("span", { className: `h-px bg-sage origin-left ${visible ? "animate-draw-line" : "scale-x-0"}` })]
		})
	});
}
function About() {
	return /* @__PURE__ */ jsx("section", {
		id: "about",
		className: "py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "md:col-span-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-6",
					children: /* @__PURE__ */ jsx("img", {
						src: "/profile.png",
						alt: "Profile photo",
						className: "w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover shadow-lift border-2 border-border"
					})
				}), /* @__PURE__ */ jsxs("h2", {
					className: "font-display text-4xl md:text-5xl text-sage-deep",
					children: [
						"A few words",
						/* @__PURE__ */ jsx("br", {}),
						"about me."
					]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "md:col-span-7 space-y-6 text-muted-foreground leading-relaxed",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-lg",
						children: "I'm a generalist who genuinely likes the whole stack from soldering an Arduino sensor at 1 am to shipping a healthcare dashboard the next morning."
					}),
					/* @__PURE__ */ jsx("p", { children: "My favorite problems sit between disciplines: a calculator that thinks it lives inside a VHS tape, a diary app dressed up like a 1987 terminal, a weather CLI that draws clouds in ASCII. The work I'm proudest of feels like it has a personality." }),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-3 gap-6 pt-6 border-t border-border",
						children: [
							["5+", "years tinkering"],
							["16", "disciplines"],
							["∞", "rabbit holes"]
						].map(([n, l]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-3xl text-sage",
							children: n
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs uppercase tracking-wider text-muted-foreground mt-1",
							children: l
						})] }, l))
					})
				]
			})]
		})
	});
}
function Skills() {
	return /* @__PURE__ */ jsx("section", {
		id: "skills",
		className: "py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between mb-12 gap-4 flex-wrap",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "font-display text-4xl md:text-5xl text-sage-deep max-w-2xl",
						children: [
							"Things I do ",
							/* @__PURE__ */ jsx("span", {
								className: "italic text-sage",
								children: "(sometimes all at once)"
							}),
							"."
						]
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "hover to peek →"
					})]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
					children: skills.map((s, i) => /* @__PURE__ */ jsxs("li", {
						className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-1 hover:border-sage cursor-default",
						style: { animationDelay: `${i * 30}ms` },
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-sage-soft translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative z-10 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-sm text-foreground leading-snug",
									children: s.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-lg opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300",
									children: s.emoji
								})]
							}),
							/* @__PURE__ */ jsx("div", { className: "relative z-10 mt-8 h-px w-8 bg-sage origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" })
						]
					}, s.name))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-16 overflow-hidden border-y border-border py-6 -mx-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "flex gap-12 animate-marquee whitespace-nowrap",
						children: [...skills, ...skills].map((s, i) => /* @__PURE__ */ jsxs("span", {
							className: "font-display text-2xl text-sage-deep/40 inline-flex items-center gap-3",
							children: [s.name, /* @__PURE__ */ jsx("span", {
								className: "text-sage",
								children: "✦"
							})]
						}, i))
					})
				})
			]
		})
	});
}
function Projects() {
	const [hovered, setHovered] = useState(null);
	return /* @__PURE__ */ jsx("section", {
		id: "work",
		className: "py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-12 max-w-2xl",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-4xl md:text-5xl text-sage-deep",
						children: "Selected work."
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "A mix of shipped products and weekend obsessions."
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(0,1fr)]",
					children: projects.map((p) => {
						return /* @__PURE__ */ jsxs("article", {
							onMouseEnter: () => setHovered(p.title),
							onMouseLeave: () => setHovered(null),
							className: `group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-2 cursor-pointer ${p.size === "lg" ? "md:col-span-4 md:row-span-2" : p.size === "md" ? "md:col-span-2 md:row-span-1" : "md:col-span-2"}`,
							children: [
								/* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700` }),
								/* @__PURE__ */ jsx("div", {
									className: "absolute -right-8 -bottom-8 text-[10rem] leading-none opacity-[0.06] group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700",
									children: p.glyph
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative z-10 flex flex-col h-full min-h-[180px]",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between gap-3 mb-4",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[10px] uppercase tracking-[0.2em] text-sage-deep group-hover:text-primary-foreground/80 transition-colors",
												children: p.tag
											}), /* @__PURE__ */ jsx("span", {
												className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-soft text-sage-deep group-hover:bg-card group-hover:rotate-45 transition-all duration-500",
												children: "↗"
											})]
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-display text-2xl md:text-3xl text-foreground group-hover:text-primary-foreground transition-colors duration-500",
											children: p.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-3 text-sm text-muted-foreground group-hover:text-primary-foreground/85 transition-colors duration-500 leading-relaxed flex-1",
											children: p.blurb
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-5 pt-4 border-t border-border group-hover:border-primary-foreground/20 transition-colors",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-xs text-muted-foreground group-hover:text-primary-foreground/70 transition-colors",
												children: p.role
											})
										})
									]
								})
							]
						}, p.title);
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-8 text-sm text-muted-foreground text-center",
					children: hovered ? /* @__PURE__ */ jsxs(Fragment, { children: ["currently peeking: ", /* @__PURE__ */ jsx("span", {
						className: "text-sage-deep font-medium",
						children: hovered
					})] }) : /* @__PURE__ */ jsx(Fragment, { children: "more in the workshop. always." })
				})
			]
		})
	});
}
function Contact() {
	const [copied, setCopied] = useState(false);
	const email = "hello@example.com";
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		className: "py-24",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-4xl px-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 md:p-16 shadow-lift text-center",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grain-bg opacity-60" }), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sage-deep",
							children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-sage animate-pulse" }), "let's build something"]
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "mt-6 font-display text-4xl md:text-6xl text-foreground leading-tight",
							children: [
								"Got an idea worth",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "italic text-sage",
									children: "tinkering on"
								}),
								"?"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 text-muted-foreground max-w-md mx-auto",
							children: "I'm open to freelance, collaborations, or just nerdy conversations about keyboards and weird hardware."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => {
									navigator.clipboard?.writeText(email);
									setCopied(true);
									setTimeout(() => setCopied(false), 1800);
								},
								className: "group inline-flex items-center gap-3 rounded-full bg-sage px-6 py-3 text-sm text-primary-foreground shadow-soft hover:shadow-glow transition-all",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-mono",
									children: copied ? "copied ✓" : email
								}), /* @__PURE__ */ jsx("span", {
									className: "opacity-70 group-hover:opacity-100",
									children: "⌘C"
								})]
							}), /* @__PURE__ */ jsx("a", {
								href: `mailto:${email}`,
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm hover:border-sage transition-colors",
								children: "open mail →"
							})]
						})
					]
				})]
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "border-t border-border py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground truncate",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" · handcrafted with sage green and stubbornness."
				]
			}), /* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-center gap-2 text-xs text-muted-foreground",
				children: ["online", /* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-sage animate-blink" })]
			})]
		})
	});
}
//#endregion
export { Portfolio as component };
