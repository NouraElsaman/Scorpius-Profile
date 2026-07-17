import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  X, ArrowUpRight, CheckCircle2, Sparkles, Wrench, Target, TrendingUp, Compass,
  MapPin, Flag, Cpu, Route, Ticket, Shuffle, ListChecks, QrCode, TrainFront,
  User, Layout, Boxes, Radio, Calculator, Monitor, GitBranch, Workflow, Layers,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Upload, FileSearch, ShieldCheck, Lightbulb, CheckSquare, Globe, Users, Mail,
  Database, Search, UserCheck, Star, BarChart2, Calendar, Edit3, Zap,
  MessageCircle, ShoppingCart, Lock, BookOpen, Clock, FileText,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { projectWorkflows } from "@/data/project-workflows";
import { projectTechGroups } from "@/data/project-tech-groups";
import {
  springSnappy,
  springStandard,
  backdropVariants,
  modalPanelVariants,
  galleryImageVariants,
  buttonHover,
  buttonTap,
} from "@/lib/motion";

/* ─── Icon registry for workflow step icons ─────────────────────────── */
const ICONS: Record<string, LucideIcon> = {
  MapPin, Flag, Cpu, Route, Ticket, Shuffle, ListChecks, QrCode, TrainFront,
  User, Layout, Boxes, Radio, Calculator, Monitor, GitBranch, Workflow, Layers,
  Upload, FileSearch, ShieldCheck, Lightbulb, CheckSquare, Globe, Users, Mail,
  Database, Search, UserCheck, Star, BarChart2, Calendar, Edit3, Zap,
  MessageCircle, ShoppingCart, Lock, BookOpen, Clock, FileText, CheckCircle2,
};

/* ─── Keyword-based feature icon lookup ─────────────────────────────── */
function getFeatureIcon(feature: string): LucideIcon {
  const f = feature.toLowerCase();
  if (f.includes("ats") || f.includes("guard") || f.includes("secure") || f.includes("legal") || f.includes("compliance")) return ShieldCheck;
  if (f.includes("resume") || f.includes("document") || f.includes("pdf") || f.includes("citation") || f.includes("article") || f.includes("source")) return FileText;
  if (f.includes("recommend") || f.includes("suggest") || f.includes("insight") || f.includes("intelligence")) return Lightbulb;
  if (f.includes("crm") || f.includes("database") || f.includes("storage") || f.includes("vector") || f.includes("memory")) return Database;
  if (f.includes("email") || f.includes("outreach") || f.includes("mail")) return Mail;
  if (f.includes("search") || f.includes("discover") || f.includes("retriev") || f.includes("find")) return Search;
  if (f.includes("analytic") || f.includes("dashboard") || f.includes("report") || f.includes("score")) return BarChart2;
  if (f.includes("calendar") || f.includes("schedul") || f.includes("publish")) return Calendar;
  if (f.includes("workflow") || f.includes("automat") || f.includes("pipeline")) return Workflow;
  if (f.includes("chat") || f.includes("conversation") || f.includes("whatsapp") || f.includes("message") || f.includes("natural language")) return MessageCircle;
  if (f.includes("voice") || f.includes("audio")) return Radio;
  if (f.includes("image") || f.includes("photo") || f.includes("ocr") || f.includes("receipt")) return Monitor;
  if (f.includes("map") || f.includes("location") || f.includes("tour") || f.includes("virtual")) return MapPin;
  if (f.includes("route") || f.includes("path") || f.includes("trip") || f.includes("journey") || f.includes("transfer")) return Route;
  if (f.includes("payment") || f.includes("order") || f.includes("ticket")) return Ticket;
  if (f.includes("real-time") || f.includes("live") || f.includes("instant")) return Zap;
  if (f.includes("mobile") || f.includes("responsive") || f.includes("interface")) return Layout;
  if (f.includes("multilingual") || f.includes("language") || f.includes("arabic") || f.includes("rtl") || f.includes("i18n") || f.includes("locali")) return Globe;
  if (f.includes("prayer") || f.includes("azkar") || f.includes("spiritual") || f.includes("islamic")) return BookOpen;
  if (f.includes("assessment") || f.includes("evaluat") || f.includes("quiz") || f.includes("adaptive")) return CheckSquare;
  if (f.includes("agent") || f.includes("agentic") || f.includes("autonomous") || f.includes("orchestrat")) return Cpu;
  if (f.includes("rag") || f.includes("retrieval-augmented") || f.includes("grounded")) return Search;
  if (f.includes("contact") || f.includes("verif") || f.includes("match")) return UserCheck;
  if (f.includes("user") || f.includes("person") || f.includes("profil") || f.includes("candidate")) return User;
  if (f.includes("product") || f.includes("catalog") || f.includes("inventory")) return ShoppingCart;
  if (f.includes("step") || f.includes("walkthrough") || f.includes("procedure") || f.includes("guide")) return ListChecks;
  if (f.includes("clock") || f.includes("time")) return Clock;
  if (f.includes("enterprise") || f.includes("auth") || f.includes("secure")) return Lock;
  if (f.includes("architect") || f.includes("modular") || f.includes("scalab") || f.includes("layer")) return Layers;
  if (f.includes("upload") || f.includes("import")) return Upload;
  if (f.includes("enrich") || f.includes("intel")) return Star;
  return Sparkles;
}

/* ─── Props ──────────────────────────────────────────────────────────── */
type Props = {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectProject?: (p: Project) => void;
  currentIndex?: number;
  total?: number;
};

/* ═══════════════════════════════════════════════════════════════════════
   PROJECT MODAL
   ═══════════════════════════════════════════════════════════════════════ */
export function ProjectModal({ project, onClose, onPrev, onNext, onSelectProject, currentIndex, total }: Props) {
  const [activeImg, setActiveImg]     = useState(0);
  const [lang, setLang]               = useState<"en" | "ar">("en");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed]           = useState(false);
  const [imgReady, setImgReady]       = useState(false);
  const touchStartX                   = useRef<number | null>(null);

  useEffect(() => {
    if (!project) return;
    setActiveImg(0);
    setImgReady(false);
    setLang("en");
    setLightboxOpen(false);
    setZoomed(false);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    setImgReady(false);
  }, [activeImg, project?.slug]);

  const ar    = project?.i18n?.ar;
  const isAr  = lang === "ar" && !!ar;

  /* Gallery — cover first, then real-src items only (filter placeholders) */
  const galleryItems = useMemo(() => {
    if (!project) return [] as { caption: string; src?: string }[];
    const arCaptions = ar?.gallery ?? [];
    const base = project.gallery.map((g, i) => ({
      caption : (isAr && arCaptions[i]) || g.caption,
      src     : g.src,
      lang    : g.lang,
    }));
    const preferred = isAr ? "ar" : "en";
    const matched = base.filter((g) => g.lang === preferred && g.src);
    const others  = base.filter((g) => g.lang !== preferred && g.src);
    return [
      { caption: isAr ? "الغلاف" : "Cover", src: project.cover },
      ...[...matched, ...others],
    ];
  }, [project, isAr, ar]);

  useEffect(() => {
    if (activeImg >= galleryItems.length) setActiveImg(0);
  }, [galleryItems.length, activeImg]);

  const go = useCallback((delta: number) => {
    setActiveImg((i) => {
      const n = galleryItems.length;
      return n === 0 ? 0 : (i + delta + n) % n;
    });
    setZoomed(false);
  }, [galleryItems.length]);

  const openLightbox  = useCallback(() => { if (galleryItems[activeImg]?.src) setLightboxOpen(true); }, [galleryItems, activeImg]);
  const closeLightbox = useCallback(() => { setLightboxOpen(false); setZoomed(false); }, []);

  /* Keyboard */
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { lightboxOpen ? closeLightbox() : onClose(); return; }
      if (galleryItems.length > 1) {
        if (e.key === "ArrowLeft")  go(-1);
        if (e.key === "ArrowRight") go(1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose, go, lightboxOpen, closeLightbox, galleryItems.length]);

  if (!project) return null;

  /* Localised text */
  const t = {
    tagline    : isAr ? ar!.tagline    : project.tagline,
    category   : isAr ? ar!.category   : project.category,
    overview   : isAr ? ar!.overview   : project.overview,
    problem    : isAr ? ar!.problem    : project.problem,
    solution   : isAr ? ar!.solution   : project.solution,
    features   : isAr ? ar!.features   : project.features,
    challenges : isAr ? ar!.challenges : project.challenges,
    results    : isAr ? ar!.results    : project.results,
    roadmap    : isAr ? ar!.roadmap    : project.roadmap,
  };
  const ctaText   = (isAr ? ar!.cta : project.cta) ?? (isAr ? "ابدأ مشروعاً مماثلاً" : "Start a similar project");
  const active    = galleryItems[activeImg] ?? galleryItems[0];
  const techData  = projectTechGroups[project.slug];
  const techGroups = project.techGroups ?? techData?.groups;
  const badges     = project.techBadges  ?? techData?.badges ?? project.technologies;

  /* UI labels */
  const L = {
    overview    : isAr ? "نظرة عامة على المشروع" : "Project overview",
    problem     : isAr ? "المشكلة"               : "Business problem",
    solution    : isAr ? "الحل"                   : "Our solution",
    features    : isAr ? "الميزات الرئيسية"       : "Key features",
    challenges  : isAr ? "التحديات"              : "Engineering challenges",
    results     : isAr ? "النتائج"               : "Results & impact",
    roadmap     : isAr ? "خارطة الطريق"           : "Future scalability",
    technologies: isAr ? "التقنيات"               : "Technologies",
    category    : isAr ? "الفئة"                  : "Category",
    workflow    : isAr ? "سير عمل المشروع"         : "Project workflow",
    architecture: isAr ? "معمارية التطبيق"         : "Application architecture",
    techStack   : isAr ? "المكدس التقني"           : "Tech stack",
    related     : isAr ? "مشاريع ذات صلة"          : "Related projects",
    prev        : isAr ? "السابق"                  : "Previous",
    next        : isAr ? "التالي"                  : "Next",
  };

  /* Workflow steps */
  const workflowSteps = useMemo(() => {
    const raw = project.workflow ?? projectWorkflows[project.slug] ?? [];
    return raw.map((w, i) => ({
      icon  : w.icon,
      title : isAr && ar?.workflow?.[i]?.title ? ar.workflow[i].title : w.title,
      desc  : isAr && ar?.workflow?.[i]?.desc  ? ar.workflow[i].desc  : w.desc,
    }));
  }, [project, isAr, ar]);

  /* Architecture nodes */
  const archNodes = project.architecture?.map((n, i) => ({
    icon  : n.icon,
    title : isAr && ar?.architecture?.[i]?.title ? ar.architecture[i].title : n.title,
  }));

  const counterTotal = total ?? projects.length;
  const counterIdx   = currentIndex ?? 0;

  /* ── render ── */
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/75 backdrop-blur-md"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Modal panel */}
      <motion.div
        className="relative m-0 h-dvh w-full overflow-hidden sm:m-4 sm:h-[calc(100dvh-2rem)] sm:rounded-3xl"
        style={{
          maxWidth : "min(1380px, 88vw)",
          background: "var(--background)",
          border   : "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
        variants={modalPanelVariants}
      >

        {/* ── Top bar: lang · counter · close ── */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-3">
          {/* Language toggle */}
          <div className="flex items-center">
            {ar && (
              <div
                className="flex items-center gap-0.5 rounded-full p-1 text-xs"
                style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}
              >
                <button
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className="rounded-full px-3 py-1.5 transition-colors"
                  style={{ background: lang === "en" ? "var(--surface-elevated)" : "transparent", color: lang === "en" ? "var(--text-primary)" : "var(--text-dim)" }}
                >🇬🇧 EN</button>
                <button
                  onClick={() => setLang("ar")}
                  aria-pressed={lang === "ar"}
                  className="rounded-full px-3 py-1.5 transition-colors"
                  style={{ background: lang === "ar" ? "var(--surface-elevated)" : "transparent", color: lang === "ar" ? "var(--text-primary)" : "var(--text-dim)" }}
                >🇸🇦 AR</button>
              </div>
            )}
          </div>

          {/* Counter + close */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-dim)" }}>
              {String(counterIdx + 1).padStart(2, "0")} / {String(counterTotal).padStart(2, "0")}
            </span>
            <motion.button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full transition-colors duration-200"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              whileHover={{ scale: 1.08, borderColor: "var(--border-accent)" }}
              whileTap={{ scale: 0.92 }}
              transition={springSnappy}
            >
              <X className="h-4 w-4" style={{ color: "var(--text-secondary)" }} />
            </motion.button>
          </div>
        </div>

        {/* ── Prev / Next project buttons ── */}
        {onPrev && (
          <motion.button
            onClick={onPrev}
            aria-label={L.prev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 hidden sm:grid h-10 w-10 place-items-center rounded-full"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", backdropFilter: "blur(16px)", opacity: 0.65 }}
            whileHover={{ opacity: 1, borderColor: "var(--border-accent)", scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springSnappy}
          >
            <ChevronLeft className="h-4 w-4" style={{ color: "var(--text-secondary)" }} />
          </motion.button>
        )}
        {onNext && (
          <motion.button
            onClick={onNext}
            aria-label={L.next}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 hidden sm:grid h-10 w-10 place-items-center rounded-full"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", backdropFilter: "blur(16px)", opacity: 0.65 }}
            whileHover={{ opacity: 1, borderColor: "var(--border-accent)", scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springSnappy}
          >
            <ChevronRight className="h-4 w-4" style={{ color: "var(--text-secondary)" }} />
          </motion.button>
        )}

        {/* ── Scroll container ── */}
        <div className="scorpius-scroll h-full overflow-y-auto" style={{ paddingTop: "56px" }}>
          {/* AnimatePresence drives cross-fade on project switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              variants={{
                hidden:  { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { ...springStandard, delay: 0.05 } },
                exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

            {/* ── Hero image ── */}
            <div className="relative">
              <div
                className="group relative w-full cursor-zoom-in overflow-hidden"
                style={{ aspectRatio: "16 / 7" }}
                onClick={openLightbox}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchStartX.current == null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                  touchStartX.current = null;
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={active.src ?? project.cover}
                    alt={`${project.title} — ${active.caption}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    variants={galleryImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onLoad={() => setImgReady(true)}
                  />
                </AnimatePresence>
                {!imgReady && (
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      animation: "shimmer 1.8s infinite linear",
                      backgroundImage: "linear-gradient(90deg, var(--surface-elevated) 25%, var(--surface-hover) 50%, var(--surface-elevated) 75%)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                )}
                {/* gradient overlay — ultra-feathered premium dark scrim */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top,
                      var(--background) 0%,
                      color-mix(in srgb, var(--background) 90%, transparent) 25%,
                      color-mix(in srgb, var(--background) 50%, transparent) 55%,
                      color-mix(in srgb, var(--background) 15%, transparent) 75%,
                      transparent 100%
                    )`
                  }}
                />
                {/* Gallery arrows on hover */}
                {galleryItems.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); go(-1); }}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass opacity-0 transition-all group-hover:opacity-100"
                      style={{ border: "1px solid var(--border)" }}
                    ><ChevronLeft className="h-5 w-5" /></button>
                    <button
                      onClick={(e) => { e.stopPropagation(); go(1); }}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass opacity-0 transition-all group-hover:opacity-100"
                      style={{ border: "1px solid var(--border)" }}
                    ><ChevronRight className="h-5 w-5" /></button>
                    <span
                      className="absolute bottom-4 right-4 z-10 rounded-full glass px-3 py-1 text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >{activeImg + 1} / {galleryItems.length}</span>
                  </>
                )}
              </div>
 
              {/* Title overlay — z-10 for premium readability */}
              <div
                className="relative -mt-24 px-6 pb-8 sm:px-12 z-10"
                dir={isAr ? "rtl" : "ltr"}
              >
                <span className="chip">{t.category}</span>
                <h2
                  className="mt-4 teal-gradient-text"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.25rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.55))",
                  }}
                >
                  {project.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                  {t.tagline}
                </p>
              </div>
            </div>

            {/* ── Gallery thumbnail strip ── */}
            {galleryItems.length > 1 && (
              <div className="px-6 sm:px-12 pb-4">
                <div className="flex gap-3 overflow-x-auto scorpius-scroll pb-2">
                  {galleryItems.map((g, i) =>
                    g.src ? (
                      <button
                        key={i}
                        onClick={() => { setActiveImg(i); }}
                        aria-label={`View ${g.caption}`}
                        className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-200"
                        style={{
                          width  : 200,
                          height : 120,
                          border : i === activeImg ? "2px solid var(--border-accent-strong, var(--cyan))" : "1px solid var(--border)",
                          opacity: i === activeImg ? 1 : 0.6,
                        }}
                        onMouseEnter={(e) => { if (i !== activeImg) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                        onMouseLeave={(e) => { if (i !== activeImg) (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}
                      >
                        <img src={g.src} alt={g.caption} loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            {/* ── Body: main content + sticky sidebar ── */}
            <div
              className="grid gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1fr_300px] lg:items-start"
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* ── Left: main content ── */}
              <div className="min-w-0 space-y-12">

                {/* Overview */}
                <Section icon={<Sparkles className="h-4 w-4" />} title={L.overview}>
                  <p>{t.overview}</p>
                </Section>

                {/* Problem + Solution */}
                <div
                  className="grid gap-6 sm:grid-cols-2"
                  style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}
                >
                  <Section icon={<Target className="h-4 w-4" />} title={L.problem}>
                    <p>{t.problem}</p>
                  </Section>
                  <Section icon={<Wrench className="h-4 w-4" />} title={L.solution}>
                    <p>{t.solution}</p>
                  </Section>
                </div>

                {/* Key Features — icon pills */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                  <Section icon={<CheckCircle2 className="h-4 w-4" />} title={L.features}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {t.features.map((f) => {
                        const Icon = getFeatureIcon(f);
                        return (
                          <li
                            key={f}
                            className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2.5 text-sm"
                            style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--cyan)" }} strokeWidth={1.8} />
                            {f}
                          </li>
                        );
                      })}
                    </ul>
                  </Section>
                </div>

                {/* Challenges + Results */}
                <div
                  className="grid gap-6 sm:grid-cols-2"
                  style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}
                >
                  <Section icon={<Compass className="h-4 w-4" />} title={L.challenges}>
                    <ol className="space-y-3">
                      {t.challenges.map((c, i) => (
                        <li key={c} className="flex gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                          <span
                            className="mt-0.5 shrink-0 font-mono text-[10px]"
                            style={{ color: "var(--text-dim)" }}
                          >{String(i + 1).padStart(2, "0")}</span>
                          {c}
                        </li>
                      ))}
                    </ol>
                  </Section>

                  <Section icon={<TrendingUp className="h-4 w-4" />} title={L.results}>
                    <ul className="space-y-2">
                      {t.results.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-3 rounded-[var(--radius-md)] p-3 text-sm"
                          style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
                        >
                          <CheckCircle2
                            className="h-4 w-4 mt-0.5 shrink-0"
                            style={{ color: "var(--cyan)" }}
                            strokeWidth={1.6}
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>

                {/* Future Scalability */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                  <Section icon={<ArrowUpRight className="h-4 w-4" />} title={L.roadmap}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {t.roadmap.map((r) => (
                        <li
                          key={r}
                          className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2.5 text-sm"
                          style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--cyan)" }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>

                {/* Workflow — horizontal on desktop, vertical on mobile */}
                {workflowSteps.length > 0 && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                    <Section icon={<Workflow className="h-4 w-4" />} title={L.workflow}>
                      {/* Desktop horizontal */}
                      <div className="hidden lg:flex items-stretch gap-2">
                        {workflowSteps.map((s, i) => {
                          const Icon = ICONS[s.icon] ?? Sparkles;
                          return (
                            <div key={i} className="flex flex-1 items-stretch gap-2 min-w-0">
                              <div
                                className="flex flex-1 min-w-0 flex-col items-center rounded-[var(--radius-lg)] p-4"
                                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                              >
                                <div
                                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] mb-3"
                                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-accent, var(--cyan))", color: "var(--cyan)" }}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="font-mono text-[10px] mb-1" style={{ color: "var(--text-dim)" }}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <h4 className="text-xs font-semibold text-center leading-snug" style={{ color: "var(--text-primary)" }}>{s.title}</h4>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-center" style={{ color: "var(--text-dim)" }}>{s.desc}</p>
                              </div>
                              {i < workflowSteps.length - 1 && (
                                <div className="flex items-center shrink-0">
                                  <ChevronRight className="h-4 w-4 shrink-0" style={{ color: "var(--text-dim)" }} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* Mobile vertical */}
                      <div className="lg:hidden flex flex-col gap-3">
                        {workflowSteps.map((s, i) => {
                          const Icon = ICONS[s.icon] ?? Sparkles;
                          return (
                            <div key={i}>
                              <div
                                className="flex items-start gap-3 rounded-[var(--radius-lg)] p-4"
                                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                              >
                                <div
                                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-md)]"
                                  style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-accent, var(--cyan))", color: "var(--cyan)" }}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.title}</h4>
                                  </div>
                                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-dim)" }}>{s.desc}</p>
                                </div>
                              </div>
                              {i < workflowSteps.length - 1 && (
                                <div className="flex justify-center py-1.5">
                                  <div className="w-px h-4" style={{ background: "var(--border)" }} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Section>
                  </div>
                )}

                {/* Architecture */}
                {archNodes && archNodes.length > 0 && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                    <Section icon={<Layers className="h-4 w-4" />} title={L.architecture}>
                      <div
                        className="relative overflow-hidden rounded-[var(--radius-lg)] p-5"
                        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                      >
                        <ol className="relative flex flex-col gap-3">
                          {archNodes.map((n, i) => {
                            const Icon = ICONS[n.icon] ?? GitBranch;
                            return (
                              <li key={i} className="flex items-center gap-3">
                                <span
                                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                                  style={{ border: "1px solid var(--border-accent, var(--cyan))", background: "var(--surface-elevated)", color: "var(--cyan)" }}
                                >
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span
                                  className="flex-1 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium"
                                  style={{ border: "1px solid var(--border)", background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                >
                                  {n.title}
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </Section>
                  </div>
                )}

                {/* Tech badges */}
                {badges && badges.length > 0 && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                    <Section icon={<Sparkles className="h-4 w-4" />} title={L.techStack}>
                      <div className="flex flex-wrap gap-2.5">
                        {badges.map((b, i) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                            style={{
                              border     : "1px solid var(--border-accent, var(--cyan))",
                              background : "color-mix(in srgb, var(--accent) 8%, transparent)",
                              color      : "var(--text-primary)",
                              animationDelay: `${i * 0.28}s`,
                            }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)" }} />
                            {b}
                          </span>
                        ))}
                      </div>
                    </Section>
                  </div>
                )}

                {/* Related Projects */}
                {onSelectProject && (
                  <RelatedProjectsStrip
                    currentSlug={project.slug}
                    category={project.category}
                    onSelect={onSelectProject}
                    label={L.related}
                  />
                )}
              </div>

              {/* ── Sticky sidebar ── */}
              <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
                {/* Grouped technologies */}
                <div
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-dim)" }}>
                    {L.technologies}
                  </p>
                  {techGroups && techGroups.length > 0 ? (
                    <div className="mt-4 space-y-5">
                      {techGroups.map((g) => (
                        <div key={g.label}>
                          <p className="mb-2 text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-dim)" }}>
                            {g.label}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {g.items.map((item) => (
                              <span key={item} className="chip text-[11px]">{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="chip">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div
                  className="rounded-[var(--radius-lg)] p-5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-dim)" }}>
                    {L.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.category}</p>
                </div>

                {/* CTA */}
                <a href="#contact" onClick={onClose} className="btn-primary w-full justify-center">
                  {ctaText} <ArrowUpRight className="h-4 w-4" />
                </a>
              </aside>
            </div>
            </motion.div>
          </AnimatePresence>{/* end project.slug content wrapper */}
        </div>{/* end scroll container */}

        {/* ── Lightbox ── */}
        {lightboxOpen && active.src && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full glass"
            ><X className="h-5 w-5" /></button>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className="absolute right-20 top-4 z-10 grid h-11 w-11 place-items-center rounded-full glass"
            >{zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}</button>
            {galleryItems.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image" className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image" className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <div
              className="flex h-full w-full items-center justify-center overflow-auto p-6 sm:p-12"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                touchStartX.current = null;
              }}
            >
              <img
                key={`lb-${imgKey}`}
                src={active.src}
                alt={active.caption}
                onClick={() => setZoomed((z) => !z)}
                className={`max-h-full max-w-full rounded-2xl object-contain animate-fade-in transition-transform duration-300 ${zoomed ? "scale-[1.75] cursor-zoom-out" : "cursor-zoom-in"}`}
                style={{ boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}
              />
              <span
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {active.caption} — {activeImg + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}



/* ─── Related projects strip ─────────────────────────────────────────── */
function RelatedProjectsStrip({
  currentSlug,
  category,
  onSelect,
  label,
}: {
  currentSlug: string;
  category: string;
  onSelect: (p: Project) => void;
  label: string;
}) {
  const related = projects
    .filter((p) => p.category === category && p.slug !== currentSlug && !p.comingSoon)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
      <div className="mb-5 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
        <Layers className="h-4 w-4" />
        <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">{label}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {related.map((p) => (
          <button
            key={p.slug}
            onClick={() => onSelect(p)}
            className="group text-left rounded-[var(--radius-lg)] p-5 transition-all duration-200"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent, var(--cyan))")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
          >
            <span className="chip text-[10px]">{p.category}</span>
            <h4 className="mt-3 text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
              {p.title}
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--text-dim)" }}>
              {p.tagline}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--cyan)" }}>
              View <ArrowUpRight className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Section heading helper ─────────────────────────────────────────── */
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
        {icon}
        <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">{title}</h3>
      </div>
      <div className="max-w-none text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </section>
  );
}
