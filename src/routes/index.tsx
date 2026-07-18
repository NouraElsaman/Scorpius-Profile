import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Bot,
  Database,
  Workflow,
  MessageCircle,
  LayoutDashboard,
  BookOpenText,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Mail,
  Linkedin,
  Compass,
  Wrench,
  Rocket,
  Lock,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import wordmark from "@/assets/scorpius-wordmark.png";
import mark from "@/assets/scorpius-mark.png";
import wordmarkLight from "@/assets/scorpius-wordmark-light.png";
import markLight from "@/assets/scorpius-mark-light.png";
import { projects, type Project } from "@/data/projects";
import { ProjectModal } from "@/components/site/ProjectModal";
import { AiAssistant } from "@/components/site/AiAssistant";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useReveal } from "@/hooks/use-reveal";
import { useCursorLight } from "@/hooks/use-cursor-light";
import {
  springSnappy,
  springStandard,
  staggerContainer,
  staggerItem,
  serviceCardVariants,
  serviceIconVariants,
  projectCardVariants,
  projectArrowVariants,
  techPillVariants,
  buttonHover,
  buttonTap,
} from "@/lib/motion";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "SCORPIUS — AI Engineering & Automation Studio" },
      {
        name: "description",
        content:
          "SCORPIUS builds AI agents, RAG systems, workflow automation, WhatsApp automation, knowledge assistants and custom software for modern businesses.",
      },
      { property: "og:title", content: "SCORPIUS — AI Engineering & Automation Studio" },
      {
        property: "og:description",
        content:
          "SCORPIUS builds AI agents, RAG systems, workflow automation, WhatsApp automation, knowledge assistants and custom software for modern businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [openEntry, setOpenEntry] = useState<{ project: Project; index: number } | null>(null);
  const [aiOpen, setAiOpen] = useState(false);

  const openModal = (p: Project) => {
    if (p.comingSoon) return;
    const idx = projects.findIndex((x) => x.slug === p.slug);
    setOpenEntry({ project: p, index: idx });
  };

  const navigateTo = (idx: number) => {
    const p = projects[idx];
    if (p && !p.comingSoon) setOpenEntry({ project: p, index: idx });
  };

  const canPrev = openEntry !== null && openEntry.index > 0;
  const canNext = openEntry !== null && openEntry.index < projects.length - 1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh" style={{ background: "var(--background)", color: "var(--text-primary)" }}>
        {/* Backgrounds — recede behind content */}
        <div aria-hidden className="pointer-events-none fixed inset-0 grid-bg" />
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-[70vh] radial-glow" />

        <Nav />
        <main className="relative">
          <Hero onOpenAi={() => setAiOpen(true)} />
          <Services />
          <Projects onOpen={openModal} />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />

        <AnimatePresence>
          {openEntry && (
            <ProjectModal
              key={openEntry.project.slug}
              project={openEntry.project}
              onClose={() => setOpenEntry(null)}
              onPrev={canPrev ? () => navigateTo(openEntry!.index - 1) : undefined}
              onNext={canNext ? () => navigateTo(openEntry!.index + 1) : undefined}
              onSelectProject={openModal}
              currentIndex={openEntry.index}
              total={projects.length}
            />
          )}
        </AnimatePresence>

        <AiAssistant
          isOpen={aiOpen}
          onClose={() => setAiOpen(false)}
          onOpenProject={(p) => { setAiOpen(false); openModal(p); }}
        />
      </div>
    </MotionConfig>
  );
}



/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
  ];
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "var(--glass-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "blur(8px) saturate(110%)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 0 var(--border), 0 4px 24px -4px rgba(0,0,0,0.28)" : "none",
        transition: "background 160ms ease-out, backdrop-filter 160ms ease-out, border-color 160ms ease-out, box-shadow 160ms ease-out",
      }}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 transition-[height] duration-[160ms] ease-out ${scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"}`}>
        <a href="#home" aria-label="SCORPIUS — home" className="flex items-center gap-3 shrink-0">
          <img
            src={mark}
            alt=""
            width={558}
            height={447}
            decoding="async"
            className="block h-10 w-auto sm:h-12 dark:hidden"
          />
          <img
            src={markLight}
            alt=""
            width={558}
            height={447}
            decoding="async"
            className="hidden h-10 w-auto sm:h-12 dark:block"
          />
          <img
            src={wordmark}
            alt="SCORPIUS"
            width={1056}
            height={134}
            decoding="async"
            className="block h-5 w-auto sm:h-6 dark:hidden"
          />
          <img
            src={wordmarkLight}
            alt="SCORPIUS"
            width={1056}
            height={134}
            decoding="async"
            className="hidden h-5 w-auto sm:h-6 dark:block"
          />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <motion.a
              href="#contact"
              className="btn-primary hidden sm:inline-flex"
              whileHover={buttonHover}
              whileTap={buttonTap}
              transition={springSnappy}
            >
              Get in touch <ArrowRight className="icon-md" />
            </motion.a>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-px w-4 transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className={`h-px w-4 transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                style={{ background: "var(--text-primary)" }}
              />
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={springSnappy}
            style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}
          >
            <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 link-underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {l.label}
                </a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springSnappy}
              >
                Get in touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   HERO LOGO (interactive AI trigger)
   Preserves all existing visual effects and adds:
   - pointer cursor
   - subtle cyan glow ring on hover
   - 1.06 scale on hover (spring)
   - "Talk to Scorpius" tooltip
   ============================================================ */
function HeroLogo({
  tilt,
  onOpenAi,
  mark,
}: {
  tilt: { x: number; y: number };
  onOpenAi: () => void;
  mark: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative animate-scale-in"
      style={{
        transform: `translate3d(${tilt.x * 5}px, ${tilt.y * 5}px, 0) rotateY(${tilt.x * 3}deg) rotateX(${tilt.y * -3}deg)`,
        transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="logo-tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: springSnappy }}
            exit={{ opacity: 0, y: 4, scale: 0.94, transition: { duration: 0.15 } }}
            className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border-accent)",
              color: "var(--cyan)",
              boxShadow: "0 4px 16px -4px rgba(33,184,187,0.28)",
              zIndex: 20,
            }}
          >
            ✦ Talk to Scorpius
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow ring */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.12 : 1,
        }}
        transition={springSnappy}
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 40px 12px rgba(33,184,187,0.32), 0 0 80px 20px rgba(33,184,187,0.14)",
          zIndex: 0,
        }}
      />

      {/* Clickable button wrapping the logo — no DOM change to the logo itself */}
      <motion.button
        onClick={onOpenAi}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={springSnappy}
        aria-label="Open Scorpius AI Assistant"
        className="relative block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] rounded-full"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        {/* Floating logo wrapper (6s float) */}
        <div
          className="animate-logo-float relative"
          style={{
            filter:
              "drop-shadow(0 3px 12px rgba(0,0,0,0.65)) drop-shadow(0 20px 48px rgba(33,184,187,0.38)) drop-shadow(0 0 70px rgba(33,184,187,0.18))",
          }}
        >
          {/* Ground reflection — casting light downward */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2"
            style={{
              width: "75%",
              height: "22px",
              background: "radial-gradient(ellipse at center, rgba(33,184,187,0.28) 0%, transparent 75%)",
              filter: "blur(9px)",
            }}
          />

          {/* Overflow hidden container for sweep clipping */}
          <div className="relative overflow-hidden rounded-full h-32 w-32 sm:h-44 sm:w-44">
            <img
              src={mark}
              alt="SCORPIUS mark"
              className="h-full w-full object-contain relative z-10"
            />
            {/* Premium light sweep (diagonal reflective pass every 9.5s) */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen animate-light-sweep z-20"
              style={{
                background:
                  "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                width: "200%",
                height: "100%",
                left: "-50%",
              }}
            />
          </div>
        </div>
      </motion.button>
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onOpenAi }: { onOpenAi: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const ny = (e.clientY - rect.top - rect.height / 2) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTilt({ x: nx, y: ny }));
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Orbiting icons — 6 capability chips with parallax depth
  const orbits = [
    { Icon: Bot, label: "AI Agents", top: "6%", left: "12%", depth: 26, delay: "0s" },
    { Icon: Database, label: "RAG", top: "10%", right: "10%", depth: -22, delay: "1.2s" },
    { Icon: Workflow, label: "Workflow", bottom: "16%", left: "6%", depth: 30, delay: "0.6s" },
    { Icon: MessageCircle, label: "WhatsApp", bottom: "8%", right: "14%", depth: -28, delay: "2s" },
    { Icon: BookOpenText, label: "Knowledge", top: "44%", left: "-2%", depth: 18, delay: "1.5s" },
    { Icon: Code2, label: "Custom Software", top: "48%", right: "-2%", depth: -18, delay: "0.9s" },
  ] as const;

  return (
    <section id="home" className="relative overflow-hidden pt-14 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero stage: logo centerpiece with orbiting AI capabilities */}
        <div
          ref={stageRef}
          className="relative mx-auto flex h-[280px] w-full max-w-3xl items-center justify-center sm:h-[360px]"
          style={{ perspective: "1200px" }}
        >

          {/* Hero atmospheric depth — three layered radial gradients breathing independently */}
          {/* Layer 1: tight inner core — most intense */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-breathe-g1"
            style={{
              background: "radial-gradient(circle at center, rgba(33,184,187,0.30) 0%, transparent 40%)",
              filter: "blur(16px)",
            }}
          />
          {/* Layer 2: mid atmosphere — soft blur */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-breathe-g2"
            style={{
              background: "radial-gradient(circle at center, rgba(33,184,187,0.16) 0%, transparent 58%)",
              filter: "blur(32px)",
            }}
          />
          {/* Layer 3: far ambient — very low opacity */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 animate-breathe-g3"
            style={{
              background: "radial-gradient(circle at center, rgba(33,184,187,0.06) 0%, transparent 72%)",
              filter: "blur(60px)",
            }}
          />

          {/* Outer orbit ring — slow clockwise spin (90s) and parallax tilt */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[340px] sm:w-[340px]"
            style={{
              transform: `translate3d(calc(-50% + ${tilt.x * 4}px), calc(-50% + ${tilt.y * 4}px), 0)`,
              transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="animate-spin-slow w-full h-full rounded-full"
              style={{
                border: "1px solid var(--border-accent)",
                opacity: 0.28,
                boxShadow: "0 0 40px -12px rgba(33,184,187,0.18), inset 0 0 40px -12px rgba(33,184,187,0.06)",
              }}
            />
          </div>

          {/* Inner orbit ring — slow counter-clockwise spin (65s) and parallax tilt */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[240px] sm:w-[240px]"
            style={{
              transform: `translate3d(calc(-50% + ${tilt.x * -2.5}px), calc(-50% + ${tilt.y * -2.5}px), 0)`,
              transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="animate-spin-reverse w-full h-full rounded-full"
              style={{
                border: "1px dashed rgba(33,184,187,0.22)",
                opacity: 1,
              }}
            />
          </div>

          {/* Centerpiece mark — dual shadow system + ground reflection + floating logo + diagonal sweep */}
          {/* Now also acts as the AI assistant trigger */}
          <HeroLogo tilt={tilt} onOpenAi={onOpenAi} mark={mark} />

          {/* Orbiting capability chips — depth-aware opacity + unsynchronized breathing */}
          {orbits.map(({ Icon, label, depth, delay, ...pos }, i) => {
            const depthOpacity = depth < 0 ? 0.72 : 0.92;
            const depthBorder = depth < 0 ? "1px solid rgba(33,184,187,0.20)" : "1px solid var(--border-accent)";
            return (
              <div
                key={label}
                className="pointer-events-none absolute"
                style={{
                  ...pos,
                  opacity: depthOpacity,
                  transform: `translate3d(${tilt.x * Math.max(-10, Math.min(10, depth * 0.38))}px, ${tilt.y * Math.max(-10, Math.min(10, depth * 0.38))}px, 0)`,
                  transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  className="pointer-events-auto flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                  style={{
                    border: depthBorder,
                    background: "var(--hero-orb-bg)",
                    boxShadow: depth > 0
                      ? "0 4px 12px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.09)"
                      : "0 2px 6px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
                    animation: `chip-breathe ${5.4 + (i * 0.5)}s ease-in-out infinite`,
                    animationDelay: `${(i * 0.9) % 3.5}s`,
                    willChange: "transform",
                  }}
                >
                  <span
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{ background: "var(--surface)", color: "var(--cyan)" }}
                  >
                    <Icon className="icon-sm" strokeWidth={1.6} />
                  </span>
                  <span
                    className="hidden text-[11px] font-medium uppercase tracking-[0.12em] sm:inline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staggered entrance wrapper */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Text block */}
          <div className="mx-auto mt-10 max-w-4xl text-center">
            <motion.span className="eyebrow" variants={staggerItem}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--accent)" }} />
              AI Engineering &amp; Automation Studio
            </motion.span>
            <motion.h1 className="mt-6" variants={staggerItem}>
              Smart automation for{" "}
              <span className="teal-gradient-text">modern businesses</span>.
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
              variants={staggerItem}
            >
              We design and engineer AI agents, RAG systems, and workflow automations that turn
              complex problems into measurable outcomes — built with the precision your business
              deserves.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" variants={staggerItem}>
              <motion.a
                href="#projects"
                className="btn-primary group"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springSnappy}
              >
                Explore our work
                <ArrowUpRight className="icon-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-ghost"
                whileHover={buttonHover}
                whileTap={buttonTap}
                transition={springSnappy}
              >
                Start a project
              </motion.a>
            </motion.div>
          </div>

          {/* Stat strip — staggered stats */}
          <motion.div
            className="relative mx-auto mt-16 max-w-5xl"
            variants={staggerItem}
          >
            <div className="divider-teal" />
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {[
                { k: "3", v: "Flagship AI products shipped" },
                { k: "7+", v: "Core AI & automation capabilities" },
                { k: "4", v: "Step engineering process" },
                { k: "100%", v: "Custom, source-grounded systems" },
              ].map((s, i) => (
                <RevealItem key={s.v} delay={i * 90} className="text-center sm:text-left">
                  <div className="stat-number teal-gradient-text">
                    <CountUp value={s.k} />
                  </div>
                  <div
                    className="mt-1 text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {s.v}
                  </div>
                </RevealItem>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Bottom fade — dissolves Hero into the next section instead of hard-cutting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
      />
    </section>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
function Services() {
  const items = [
    { icon: Bot, title: "AI Agents", desc: "Autonomous agents that reason, plan, and execute across your tools and data." },
    { icon: Database, title: "RAG Systems", desc: "Source-grounded retrieval systems with citations, so answers are always defensible." },
    { icon: Workflow, title: "Workflow Automation", desc: "Practical systems that remove bottlenecks and let teams focus on real work." },
    { icon: MessageCircle, title: "WhatsApp Automation", desc: "Conversational commerce, support and lead capture that meets customers where they are." },
    { icon: LayoutDashboard, title: "AI Business Platforms", desc: "End-to-end platforms that turn data into smarter decisions and lasting growth." },
    { icon: BookOpenText, title: "Knowledge Assistants", desc: "Internal copilots that unlock your documents, playbooks, and institutional expertise." },
    { icon: Code2, title: "Custom Software", desc: "Modern, scalable web and mobile products designed around real business needs." },
    { icon: ShieldCheck, title: "Decision Support", desc: "Predictive analytics and decision-support systems tailored to each industry." },
  ];
  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Ambient top accent — directional light entering from top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 0%, var(--border-accent) 35%, var(--border-accent) 65%, transparent 100%)", opacity: 0.5 }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What we build"
          title={<>Engineering-grade AI, <span className="teal-gradient-text">tailored to you</span>.</>}
          sub="Every SCORPIUS system is designed for real integration, measurable impact, and lasting growth — never generic templates."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <ServiceCard key={title} Icon={Icon} title={title} desc={desc} delay={i * 55} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  Icon,
  title,
  desc,
  delay,
}: {
  Icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  const cardRef = useCursorLight<HTMLDivElement>();
  const revealRef = useReveal<HTMLDivElement>();

  // Outer div: owns CSS reveal (opacity/translateY entrance).
  // Inner motion.div: owns Framer hover lift — keeps the two transform systems separate.
  const setReveal = (el: HTMLDivElement | null) => {
    (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  const setCard = (el: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <div
      ref={setReveal}
      className="reveal-card"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <motion.div
        ref={setCard}
        className="group card-surface cursor-light rounded-[var(--radius-lg)] p-6"
        initial="rest"
        whileHover="hover"
        variants={serviceCardVariants}
        transition={springSnappy}
      >
        <motion.div
          className="relative z-10 grid h-10 w-10 place-items-center rounded-[var(--radius-md)]"
          style={{
            border: "1px solid var(--border-accent)",
            background: "var(--surface)",
            color: "var(--cyan)",
          }}
          variants={serviceIconVariants}
        >
          <Icon className="icon-md" strokeWidth={1.6} />
        </motion.div>
        <h3 className="relative z-10 mt-5" style={{ color: "var(--text-primary)" }}>{title}</h3>
        <p className="relative z-10 mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
      </motion.div>
    </div>
  );
}


/* ============================================================
   PROJECTS
   ============================================================ */
function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--background-alt)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 radial-glow" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Key projects"
          title={<>Practical AI solutions, <span className="teal-gradient-text">built for real impact</span>.</>}
          sub="Explore our shipped work — each one turns complex challenges into practical experiences for learning, guidance and decision-making."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} onOpen={onOpen} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const getImgSrc = (src: any): string | undefined => {
  if (!src) return undefined;
  if (typeof src === "string") return src;
  if (typeof src === "object") {
    return src.default || src.url || src.src || undefined;
  }
  return undefined;
};

function ProjectCard({
  project: p,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  index: number;
}) {
  const revealRef = useReveal<HTMLElement>();
  const cursorRef = useCursorLight<HTMLElement>();
  const disabled = !!p.comingSoon;
  const accent = p.accentHue ?? 180;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgSrc = getImgSrc(p.cover);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoaded(true);
    }
  }, [imgSrc]);

  // Outer article: CSS reveal entrance. Inner motion.article: Framer hover lift.
  const setReveal = (el: HTMLElement | null) => {
    (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };
  const setCard = (el: HTMLElement | null) => {
    (cursorRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <article
      ref={setReveal}
      className="reveal-card h-full"
      style={{ transitionDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      <motion.article
        ref={setCard}
        className="group card-surface cursor-light flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)]"
        initial="rest"
        whileHover="hover"
        variants={projectCardVariants}
        transition={springSnappy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => { if (!disabled) onOpen(p); }}
        onKeyDown={(e) => { if (!disabled && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(p); } }}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        aria-label={disabled ? undefined : `View ${p.title} case study`}
        style={{
          cursor: disabled ? "default" : "pointer",
          borderColor: hovered 
            ? `hsla(${accent}, 50%, 50%, 0.38)` 
            : `hsla(${accent}, 30%, 50%, 0.12)`,
          boxShadow: hovered 
            ? `0 8px 24px -4px hsla(${accent}, 50%, 40%, 0.2), 0 0 28px -8px hsla(${accent}, 50%, 50%, 0.1)` 
            : "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.055)",
          transition: "border-color 0.28s ease, box-shadow 0.28s ease",
        }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {imgSrc ? (
            <img
              ref={imgRef}
              src={imgSrc}
              alt={`${p.title} cover`}
              loading="lazy"
              className={`img-fade h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${imgLoaded ? "is-loaded" : ""}`}
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <PlaceholderCover title={p.title} hue={accent} />
          )}

          {/* Cinematic vignette overlay — four-stop gradient for real depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to top,
                  var(--background-alt) 0%,
                  rgba(8,19,30,0.72) 28%,
                  rgba(8,19,30,0.18) 52%,
                  transparent 68%
                ),
                linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 30%),
                radial-gradient(ellipse at bottom, hsla(${accent}, 40%, 18%, 0.18) 0%, transparent 65%)
              `,
            }}
          />
          {/* Edge vignette — perimeter darkening, like a real lens */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)",
              borderRadius: "inherit",
            }}
          />
          <span className="absolute left-4 top-4 chip">{p.category}</span>
          {disabled && (
            <span
              className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md"
              style={{
                border: "1px solid var(--border-accent)",
                background: "var(--glass-bg)",
                color: "var(--cyan)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--cyan)" }} />
              Coming soon
            </span>
          )}
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 min-h-[2lh]" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.technologies.slice(0, 4).map((t) => (
              <motion.span
                key={t}
                variants={techPillVariants}
                className="rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px]"
                style={{
                  border: hovered ? `1px solid hsla(${accent}, 45%, 50%, 0.30)` : "1px solid var(--border)",
                  color: hovered ? `hsla(${accent}, 65%, 75%, 0.90)` : "var(--text-secondary)",
                  background: hovered ? `hsla(${accent}, 55%, 40%, 0.08)` : "transparent",
                  transition: "border-color 0.25s ease, color 0.25s ease, background 0.25s ease",
                }}
              >
                {t}
              </motion.span>
            ))}
            {p.technologies.length > 4 && (
              <span className="rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px]" style={{ color: "var(--text-dim)" }}>
                +{p.technologies.length - 4}
              </span>
            )}
          </div>
          {disabled ? (
            <span
              className="mt-auto pt-6 inline-flex items-center gap-2 self-start text-sm font-semibold"
              style={{ color: "var(--text-dim)" }}
            >
              <Lock className="icon-md" strokeWidth={1.6} /> Case study in preparation
            </span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(p); }}
              aria-label={`View ${p.title} case study`}
              className="link-underline mt-auto pt-6 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                color: "var(--cyan)",
                outlineColor: "var(--accent)",
              }}
            >
              View project
              <motion.span variants={projectArrowVariants} style={{ display: "inline-flex" }}>
                <ArrowUpRight className="icon-md" strokeWidth={1.6} />
              </motion.span>
            </button>
          )}
        </div>
      </motion.article>
    </article>
  );
}


function PlaceholderCover({ title, hue }: { title: string; hue: number }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 30%, hsl(${hue} 65% 45% / 0.32), transparent 60%), radial-gradient(circle at 75% 70%, hsl(${(hue + 30) % 360} 70% 55% / 0.24), transparent 55%), var(--background-alt)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div className="relative text-center">
        <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--cyan)" }}>
          In development
        </div>
        <div className="mt-1 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{title}</div>
      </div>
    </div>
  );
}

/* ============================================================
   PROCESS
   ============================================================ */
function Process() {
  const steps = [
    { icon: Compass, k: "01", t: "Discovery", d: "We engage with you to understand your goals, needs and constraints. Nothing is assumed." },
    { icon: Sparkles, k: "02", t: "Design", d: "We shape a tailored solution around your workflow — architecture, data, and user experience." },
    { icon: Wrench, k: "03", t: "Development", d: "Our engineers build and integrate the system with care, precision, and rigorous testing." },
    { icon: Rocket, k: "04", t: "Support", d: "We test, launch, and stay in the loop — continuing to support and evolve your solution." },
  ];
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How we work"
          title={<>A calm, deliberate <span className="teal-gradient-text">engineering process</span>.</>}
          sub="Four stages that keep the work honest and the outcomes real."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, k, t, d }, i) => (
            <ProcessCard key={k} Icon={Icon} k={k} t={t} d={d} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  const values = [
    { icon: Zap, t: "Innovation", d: "Curious engineers who push what AI can do for real businesses." },
    { icon: ShieldCheck, t: "Integrity", d: "Source-grounded systems and honest guardrails — never smoke and mirrors." },
    { icon: Layers, t: "Impact", d: "Every project is measured by the outcomes it produces, not the tech it uses." },
  ];
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--background-alt)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] items-start">
          <div>
            <span className="eyebrow">About SCORPIUS</span>
            <h2 className="mt-5">
              A multidisciplinary team turning{" "}
              <span className="teal-gradient-text">expertise into automation</span>.
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                We transform collaboration and expertise in AI, computer science, engineering and
                business into smart automation solutions that help modern businesses grow, adapt,
                and lead in a fast-changing digital world.
              </p>
            </div>
            <div
              className="mt-8 rounded-[var(--radius-lg)] p-6"
              style={{
                background: "linear-gradient(175deg, var(--surface-elevated) 0%, var(--surface) 100%)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.055), inset 3px 0 0 rgba(33,184,187,0.20)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--cyan)" }}>Our mission</p>
              <p className="mt-2" style={{ color: "var(--text-primary)" }}>
                To help businesses grow through tailored technical solutions that address their unique needs.
              </p>
              <div className="my-5 divider-teal" />
              <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--cyan)" }}>Our vision</p>
              <p className="mt-2" style={{ color: "var(--text-primary)" }}>
                To become a trusted partner in digital transformation, helping small ideas grow into successful enterprises.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {values.map(({ icon: Icon, t, d }, vi) => {
              // Each card gets a slightly different top-edge accent intensity — never identical
              const edgeOpacity = [0.45, 0.28, 0.36][vi] ?? 0.35;
              return (
                <div
                  key={t}
                  className="relative overflow-hidden rounded-[var(--radius-lg)] p-6 flex gap-5"
                  style={{
                    background: "linear-gradient(175deg, var(--surface-elevated) 0%, var(--surface) 100%)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.055)",
                  }}
                >
                  {/* Top-edge accent — unique per card */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent 0%, rgba(33,184,187,${edgeOpacity}) 40%, rgba(33,184,187,${edgeOpacity}) 60%, transparent 100%)`,
                    }}
                  />
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)]"
                    style={{ border: "1px solid var(--border-accent)", color: "var(--cyan)", background: "var(--accent-dim)" }}
                  >
                    <Icon className="icon-md" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0">
                    <h3 style={{ color: "var(--text-primary)" }}>{t}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{d}</p>
                  </div>
                </div>
              );
            })}
            <blockquote
              className="mt-2 rounded-[var(--radius-lg)] p-6 text-lg italic leading-relaxed"
              style={{
                border: "1px solid var(--border-accent)",
                background: "linear-gradient(145deg, rgba(33,184,187,0.06) 0%, var(--surface) 100%)",
                color: "var(--text-primary)",
                boxShadow: "inset 0 1px 0 rgba(33,184,187,0.12)",
              }}
            >
              "Innovation, integrity, and impact."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const btnRef = useCursorLight<HTMLAnchorElement>();

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-[var(--radius-2xl)] p-10 sm:p-16 text-center"
          style={{
            border: "1px solid var(--border-accent)",
            background: "linear-gradient(145deg, var(--surface-elevated) 0%, var(--surface) 60%, rgba(8,19,30,0.5) 100%)",
            boxShadow: "inset 0 1px 0 rgba(33,184,187,0.12), 0 1px 0 rgba(33,184,187,0.08), 0 24px 64px -16px rgba(0,0,0,0.45)",
          }}
        >
          {/* Top-edge accent seam — light bleeding through the border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent 5%, rgba(33,184,187,0.50) 30%, rgba(33,184,187,0.70) 50%, rgba(33,184,187,0.50) 70%, transparent 95%)",
            }}
          />
          {/* Key light — top-right warm ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[5%] h-64 w-[50%] rounded-full blur-[70px]"
            style={{ background: "var(--accent)", opacity: 0.09 }}
          />
          {/* Fill light — bottom-left cool ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-[8%] h-44 w-[38%] rounded-full blur-[55px]"
            style={{ background: "var(--accent)", opacity: 0.05 }}
          />
          <span className="eyebrow">Contact SCORPIUS</span>
          <h2 className="mt-5">
            Ready to transform your business with{" "}
            <span className="teal-gradient-text">smart automation</span>?
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell us about your goals. We'll respond with a clear next step, not a sales pitch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              ref={btnRef}
              href="mailto:thescorpius12@gmail.com"
              className="btn-primary cursor-light"
              whileHover={buttonHover}
              whileTap={buttonTap}
              transition={springSnappy}
            >
              <Mail className="icon-md" strokeWidth={1.6} />
              thescorpius12@gmail.com
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/company/scorpius-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              whileHover={buttonHover}
              whileTap={buttonTap}
              transition={springSnappy}
            >
              <Linkedin className="icon-md" strokeWidth={1.6} />
              LinkedIn
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid var(--border)", background: "var(--background-alt)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={mark} alt="" className="block h-8 w-8 dark:hidden" width={32} height={32} />
              <img src={markLight} alt="" className="hidden h-8 w-8 dark:block" width={32} height={32} />
              <img src={wordmark} alt="SCORPIUS" className="block h-4 w-auto dark:hidden" />
              <img src={wordmarkLight} alt="SCORPIUS" className="hidden h-4 w-auto dark:block" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Smart automation for modern businesses. We build AI systems that are practical,
              source-grounded, and engineered to last.
            </p>
          </div>
          <FooterCol title="Platform" links={[
            { href: "#services", label: "Services" },
            { href: "#projects", label: "Projects" },
            { href: "#process", label: "Process" },
          ]} />
          <FooterCol title="Company" links={[
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
            { href: "https://www.linkedin.com/company/scorpius-ai", label: "LinkedIn", external: true },
          ]} />
          <FooterCol title="Get started" links={[
            { href: "mailto:thescorpius12@gmail.com", label: "Email us" },
            { href: "#contact", label: "Start a project" },
          ]} />
        </div>
        <div
          className="mt-12 flex flex-col-reverse items-center justify-between gap-4 pt-6 sm:flex-row"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>© {new Date().getFullYear()} SCORPIUS. All rights reserved.</p>
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>Innovation · Integrity · Impact</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--cyan)" }}>{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="link-underline text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   SHARED
   ============================================================ */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal-heading mx-auto max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>{sub}</p>
    </div>
  );
}

function RevealItem({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  variant?: "default" | "heading" | "body" | "card";
}) {
  const ref = useReveal<HTMLDivElement>();
  const variantClass =
    variant === "heading" ? "reveal-heading" :
    variant === "body" ? "reveal-body" :
    variant === "card" ? "reveal-card" :
    "reveal";

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   EXTRA POLISHED MICRO-INTERACTIONS
   ============================================================ */

function CountUp({ value }: { value: string }) {
  const [displayVal, setDisplayVal] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayVal(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    
    const duration = 1200;
    const startTime = performance.now();

    const run = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      setDisplayVal(`${current}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };
    requestAnimationFrame(run);
  }, [triggered, value]);

  return <div ref={elementRef} style={{ display: "inline-block" }}>{displayVal}</div>;
}

function ProcessCard({
  Icon,
  k,
  t,
  d,
  delay,
}: {
  Icon: React.ElementType;
  k: string;
  t: string;
  d: string;
  delay: number;
}) {
  const cardRef = useCursorLight<HTMLDivElement>();
  const revealRef = useReveal<HTMLDivElement>();

  const setReveal = (el: HTMLDivElement | null) => {
    (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  const setCard = (el: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <div
      ref={setReveal}
      className="reveal-card"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <motion.div
        ref={setCard}
        className="group card-surface cursor-light rounded-[var(--radius-lg)] p-6 h-full"
        initial="rest"
        whileHover="hover"
        variants={serviceCardVariants}
        transition={springSnappy}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)]"
            style={{
              border: "1px solid var(--border-accent)",
              background: "var(--surface)",
              color: "var(--cyan)",
            }}
            variants={serviceIconVariants}
          >
            <Icon className="icon-md" strokeWidth={1.6} />
          </motion.div>
          <span className="teal-gradient-text text-xs font-bold tracking-[0.22em]">{k}</span>
        </div>
        <h3 className="mt-5" style={{ color: "var(--text-primary)" }}>{t}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{d}</p>
      </motion.div>
    </div>
  );
}
