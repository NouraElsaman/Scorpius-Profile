/**
 * SCORPIUS AI Solutions Consultant
 *
 * An interactive, professional pre-sales and solutions consultant assistant.
 * Dynamically utilizes project data from `projects.ts` (with full Arabic/English i18n support)
 * to recommend and explain Scorpius AI engineering capabilities.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Rocket,
  Bot,
  Zap,
  BarChart2,
  Briefcase,
  Mail,
  ArrowUpRight,
  ChevronRight,
  GraduationCap,
  Building2,
  Terminal,
  Globe,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import {
  springStandard,
  springSnappy,
  backdropVariants,
} from "@/lib/motion";

/* ─── Sidebar panel animation ─────────────────────────────── */
const panelVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springStandard, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

/* ─── Message bubble animation ────────────────────────────── */
const bubbleVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

/* ─── Types ───────────────────────────────────────────────── */
type Role = "assistant" | "user";
type VisitorProfile = "business" | "enterprise" | "developer" | "student" | "general";

type MessageContent =
  | { kind: "text"; text: string }
  | { kind: "project-card"; project: Project }
  | { kind: "project-list"; projects: Project[] };

interface Message {
  id: number;
  role: Role;
  content: MessageContent[];
}

/* ─── Profile Options ─────────────────────────────────────── */
const PROFILE_OPTIONS = [
  {
    id: "business" as const,
    icon: Briefcase,
    titleEn: "Business & Startup",
    titleAr: "الأعمال والشركات الناشئة",
    descEn: "I'm looking for AI solutions to automate or grow my business.",
    descAr: "أبحث عن حلول الذكاء الاصطناعي لأتمتة أعمالي أو تنميتها.",
  },
  {
    id: "enterprise" as const,
    icon: Building2,
    titleEn: "Enterprise",
    titleAr: "المؤسسات الكبرى",
    descEn: "We're evaluating enterprise AI and digital transformation solutions.",
    descAr: "نحن نقيّم حلول الذكاء الاصطناعي للمؤسسات والتحول الرقمي.",
  },
  {
    id: "developer" as const,
    icon: Terminal,
    titleEn: "Developer",
    titleAr: "المطورون",
    descEn: "I'd like to explore the technologies, architecture and engineering behind your projects.",
    descAr: "أود استكشاف التقنيات والمعمارية والهندسة وراء مشاريعكم.",
  },
  {
    id: "student" as const,
    icon: GraduationCap,
    titleEn: "Researcher / Student",
    titleAr: "الباحثون والطلاب",
    descEn: "I'm learning AI Engineering and would like to understand your projects.",
    descAr: "أتعلم هندسة الذكاء الاصطناعي وأود فهم مشاريعكم.",
  },
];

/* ─── Suggestion chips by profile ─────────────────────────── */
const SUGGESTIONS_BY_PROFILE: Record<VisitorProfile, { Icon: any; labelEn: string; labelAr: string }[]> = {
  business: [
    { Icon: Rocket, labelEn: "Our Services", labelAr: "خدماتنا" },
    { Icon: Zap, labelEn: "AI Automation", labelAr: "أتمتة الذكاء الاصطناعي" },
    { Icon: Bot, labelEn: "Restaurant AI", labelAr: "ذكاء اصطناعي للمطاعم" },
    { Icon: BarChart2, labelEn: "Lead Generation", labelAr: "جلب العملاء المحتملين" },
    { Icon: Zap, labelEn: "WhatsApp Automation", labelAr: "أتمتة الواتساب" },
    { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  ],
  enterprise: [
    { Icon: Building2, labelEn: "Enterprise AI", labelAr: "الذكاء الاصطناعي للمؤسسات" },
    { Icon: Zap, labelEn: "Workflow Automation", labelAr: "أتمتة سير العمل" },
    { Icon: Bot, labelEn: "Multi-Agent Systems", labelAr: "أنظمة الوكلاء المتعددة" },
    { Icon: Rocket, labelEn: "RAG Architectures", labelAr: "معماريات RAG" },
    { Icon: Terminal, labelEn: "Custom Software", labelAr: "البرمجيات المخصصة" },
    { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  ],
  developer: [
    { Icon: Terminal, labelEn: "Technologies", labelAr: "التقنيات" },
    { Icon: Bot, labelEn: "AI Stack & APIs", labelAr: "حزمة الذكاء الاصطناعي" },
    { Icon: Rocket, labelEn: "RAG Implementation", labelAr: "تنفيذ الـ RAG" },
    { Icon: Bot, labelEn: "Multi-Agent Routing", labelAr: "توجيه الوكلاء المتعددين" },
    { Icon: Briefcase, labelEn: "Projects", labelAr: "المشاريع" },
    { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  ],
  student: [
    { Icon: GraduationCap, labelEn: "Learn AI Engineering", labelAr: "تعلم هندسة الذكاء الاصطناعي" },
    { Icon: Rocket, labelEn: "What is RAG?", labelAr: "ما هو الـ RAG؟" },
    { Icon: Bot, labelEn: "What are AI Agents?", labelAr: "ما هي وكلاء الذكاء الاصطناعي؟" },
    { Icon: Briefcase, labelEn: "Projects Overview", labelAr: "نظرة على المشاريع" },
    { Icon: Rocket, labelEn: "Our Services", labelAr: "خدماتنا" },
    { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  ],
  general: [
    { Icon: Rocket, labelEn: "Our Services", labelAr: "خدماتنا" },
    { Icon: Briefcase, labelEn: "Projects", labelAr: "المشاريع" },
    { Icon: Bot, labelEn: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي" },
    { Icon: Zap, labelEn: "Automation", labelAr: "الأتمتة" },
    { Icon: Terminal, labelEn: "Technologies", labelAr: "التقنيات" },
    { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  ],
};

/* ─── Domain → Flagship project mapping ──────────────────── */
const DOMAIN_RECOMMENDATIONS: Record<string, { flagship: string; related: string[]; domainEn: string; domainAr: string }> = {
  "multi-agent":    { flagship: "restro360",                  related: ["whatsapp-sales-agent", "lead-generation-pipeline"], domainEn: "Multi-Agent AI Systems",       domainAr: "أنظمة الوكلاء المتعددة" },
  "enterprise-rag": { flagship: "el-raed",                    related: ["bayyinah", "manara"],                               domainEn: "Enterprise RAG",             domainAr: "RAG للمؤسسات" },
  "education-rag":  { flagship: "manara",                     related: ["el-raed", "madarekiq"],                             domainEn: "Educational RAG",            domainAr: "RAG التعليمي" },
  "legal":          { flagship: "bayyinah",                   related: ["el-raed", "manara"],                               domainEn: "Legal Knowledge AI",         domainAr: "الذكاء الاصطناعي القانوني" },
  "sales":          { flagship: "lead-generation-pipeline",   related: ["whatsapp-sales-agent", "restro360"],               domainEn: "Sales Automation",           domainAr: "أتمتة المبيعات" },
  "whatsapp":       { flagship: "whatsapp-sales-agent",       related: ["lead-generation-pipeline", "restro360"],           domainEn: "Conversational Commerce",    domainAr: "التجارة التحادثية" },
  "career":         { flagship: "career-intelligence-platform",related: ["madarekiq", "ai-chat-portfolio"],                  domainEn: "Career Intelligence",        domainAr: "ذكاء المسار المهني" },
  "real-estate":    { flagship: "nasm",                       related: ["lead-generation-pipeline", "el-raed"],             domainEn: "Real Estate AI",             domainAr: "الذكاء الاصطناعي للعقارات" },
  "learning":       { flagship: "madarekiq",                  related: ["manara", "career-intelligence-platform"],          domainEn: "Learning Intelligence",      domainAr: "ذكاء التعلم" },
  "restaurant":     { flagship: "restro360",                  related: ["whatsapp-sales-agent", "lead-generation-pipeline"], domainEn: "Restaurant AI",              domainAr: "الذكاء الاصطناعي للمطاعم" },
  "automation":     { flagship: "lead-generation-pipeline",   related: ["whatsapp-sales-agent", "restro360"],               domainEn: "Workflow Automation",        domainAr: "أتمتة سير العمل" },
  "ocr":            { flagship: "whatsapp-sales-agent",       related: ["lead-generation-pipeline", "el-raed"],             domainEn: "OCR & Document Processing", domainAr: "معالجة المستندات بالـ OCR" },
  "portfolio":      { flagship: "ai-chat-portfolio",          related: ["career-intelligence-platform", "madarekiq"],       domainEn: "Portfolio AI Assistant",     domainAr: "مساعد الملف الذكي" },
};

/* ─── Consultant-style loading messages ───────────────────── */
const LOADING_MESSAGES_EN = [
  "Reviewing our portfolio...",
  "Finding the most relevant solution...",
  "Analyzing your business needs...",
  "Matching to our flagship projects...",
  "Comparing similar solutions...",
  "Consulting our knowledge base...",
  "Preparing your recommendation...",
];
const LOADING_MESSAGES_AR = [
  "أستعرض مشاريعنا...",
  "أبحث عن أنسب الحلول لك...",
  "أحلل احتياجاتك التجارية...",
  "أطابق مع مشاريعنا الرائدة...",
  "أقارن الحلول المشابهة...",
  "أراجع قاعدة معرفتنا...",
  "أُعدّ توصيتك...",
];

/* ─── Language utilities ──────────────────────────────────── */
function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/* ─── Arabic translations for projects without i18n block ─── */
const ARABIC_PROJECT_OVERRIDES: Record<string, { tagline: string; overview: string; problem: string; solution: string }> = {
  "whatsapp-sales-agent": {
    tagline: "تجارة محادثاتية مدعومة بالذكاء الاصطناعي لتطبيق WhatsApp",
    overview: "منصة تجارة محادثاتية تتيح للشركات أتمتة تفاعلات العملاء بالكامل عبر تطبيق WhatsApp، بما في ذلك فهم الرسائل الصوتية والصور والتحقق من الإيصالات باستخدام تقنية OCR.",
    problem: "تلقي مئات الاستفسارات اليومية مما يؤدي إلى بطء الاستجابة وضياع فرص المبيعات والأخطاء اليدوية في التحقق من الدفع.",
    solution: "مساعد مبيعات ذكي يؤتمت رحلة العميل بالكامل ويتحقق من إيصالات الدفع تلقائياً باستخدام OCR ويتكامل مع أنظمة CRM.",
  },
  "ai-chat-portfolio": {
    tagline: "مساعد محادثة ذكي لاستعراض الملف المهني والشخصي",
    overview: "مساعد ذكي يتيح للزوار استكشاف المهارات والمشاريع والشهادات من خلال محادثة طبيعية مدعومة بنظام RAG.",
    problem: "صعوبة العثور على المعلومات في السير الذاتية والملفات التعريفية التقليدية الثابتة.",
    solution: "تحويل الملف التعريفي إلى تجربة محادثة تفاعلية تجيب على الأسئلة بدقة بالغة.",
  },
  "restro360": {
    tagline: "نظام تشغيل وإدارة المطاعم القائم على الوكلاء المتعددين",
    overview: "منصة متكاملة تنسق عمل عدة وكلاء ذكاء اصطناعي متخصصين لإدارة الطلبات، خدمة العملاء، المخزون، والتحليلات بشكل مستقل تماماً.",
    problem: "تشتت عمليات المطاعم بين أنظمة منفصلة مما يزيد من الأخطاء ويقلل الكفاءة والقدرة على التوسع.",
    solution: "نظام تشغيل موحد مدعوم بوكلاء مبيعات وخدمة عملاء مستقلين يتشاركون السياق والذاكرة.",
  },
};

/* ─── Detailed project explanations matching profile requirements ─── */
function getProjectExplanation(project: Project, profile: VisitorProfile, isAr: boolean): string {
  const overrides = ARABIC_PROJECT_OVERRIDES[project.slug];
  
  const tagline = isAr ? (project.i18n?.ar?.tagline || overrides?.tagline || project.tagline) : project.tagline;
  const overview = isAr ? (project.i18n?.ar?.overview || overrides?.overview || project.overview) : project.overview;
  const problem = isAr ? (project.i18n?.ar?.problem || overrides?.problem || project.problem) : project.problem;
  const solution = isAr ? (project.i18n?.ar?.solution || overrides?.solution || project.solution) : project.solution;

  const techList = project.technologies.join(", ");
  
  if (isAr) {
    let focusSection = "";
    if (profile === "business") {
      focusSection = `\n\n🎯 **القيمة التجارية والأثر:**\n• ${project.results ? project.results.join("\n• ") : "تحسين كفاءة العمليات وتقليل التكاليف اليدوية بشكل ملحوظ."}`;
    } else if (profile === "enterprise") {
      focusSection = `\n\n🛡️ **معمارية المؤسسات وقابلية التوسع:**\n• ${project.challenges ? project.challenges.join("\n• ") : "مصمم للتكامل المرن مع الأنظمة القائمة وتأمين تدفقات البيانات."}`;
    } else if (profile === "developer") {
      focusSection = `\n\n💻 **تفاصيل المطور والمكدس التقني:**\n• التقنيات المستخدمة: **${techList}**\n• التحديات الهندسية: ${project.challenges ? project.challenges.slice(0, 2).join(", ") : "مزامنة البيانات وحل مشكلات الأداء."}`;
    } else if (profile === "student") {
      focusSection = `\n\n📚 **مفاهيم الذكاء الاصطناعي المبسطة:**\n• يستخدم هذا المشروع تقنيات ذكية متقدمة مثل RAG ومعالجة اللغات الطبيعية لأتمتة المهام المعقدة وتحليل البيانات بشكل يشابه الذكاء البشري.`;
    }

    return `### **${project.title}**\n*${tagline}*\n\n**📌 نظرة عامة:**\n${overview}\n\n**⚠️ المشكلة:**\n${problem}\n\n**✅ الحل الذكي:**\n${solution}${focusSection}\n\n**🛠️ المكونات التقنية:**\n${techList}`;
  } else {
    let focusSection = "";
    if (profile === "business") {
      focusSection = `\n\n🎯 **Business Value & ROI:**\n• ${project.results ? project.results.join("\n• ") : "Significantly reduced manual operations and optimized business throughput."}`;
    } else if (profile === "enterprise") {
      focusSection = `\n\n🛡️ **Enterprise Architecture & Scalability:**\n• ${project.challenges ? project.challenges.join("\n• ") : "Built to securely scale, handle rate-limiting, and integrate with CRM/ERP stacks."}`;
    } else if (profile === "developer") {
      focusSection = `\n\n💻 **Developer Deep-Dive & Tech Stack:**\n• Stack: **${techList}**\n• Core Engineering Hurdles: ${project.challenges ? project.challenges.slice(0, 2).join(", ") : "Concurrency, context preservation, or latency optimization."}`;
    } else if (profile === "student") {
      focusSection = `\n\n📚 **How It Works (Simplified):**\n• This project utilizes advanced AI architectures like RAG (Retrieval-Augmented Generation) or Multi-Agent reasoning to execute complex workflows just like a human expert would.`;
    }

    return `### **${project.title}**\n*${tagline}*\n\n**📌 Overview:**\n${overview}\n\n**⚠️ The Business Problem:**\n${problem}\n\n**✅ Our Solution:**\n${solution}${focusSection}\n\n**🛠️ Key Technologies:**\n${techList}`;
  }
}

/* ─── Text renderer (simple markdown-ish) ─────────────────── */
function RenderText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed text-sm">
      {lines.map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1.5" />;
        
        // Render headings
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-base font-bold mt-3 mb-1" style={{ color: "var(--cyan)" }}>
              {line.substring(4)}
            </h3>
          );
        }
        
        // Bold segments **bold**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

/* ─── Compact project card inside the chat ────────────────── */
function ChatProjectCard({
  project,
  onOpenModal,
  isAr,
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
  isAr: boolean;
}) {
  const imgSrc =
    project.cover && typeof project.cover === "object"
      ? (project.cover as any).default ?? (project.cover as any).src ?? undefined
      : typeof project.cover === "string"
      ? project.cover
      : undefined;

  const overrides = ARABIC_PROJECT_OVERRIDES[project.slug];
  const tagline = isAr ? (project.i18n?.ar?.tagline || overrides?.tagline || project.tagline) : project.tagline;

  return (
    <motion.div
      variants={bubbleVariants}
      className="overflow-hidden rounded-[var(--radius-lg)] border"
      style={{
        border: "1px solid var(--border-accent)",
        background: "linear-gradient(175deg, var(--surface-elevated) 0%, var(--surface) 100%)",
      }}
    >
      {imgSrc && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={imgSrc}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(6,17,26,0.7) 0%, transparent 60%)",
            }}
          />
          <span className="chip absolute left-3 top-3 text-[10px]">
            {isAr ? (project.i18n?.ar?.category || project.category) : project.category}
          </span>
        </div>
      )}

      <div className="p-4">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </p>
        <p
          className="mt-1.5 text-xs leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {tagline}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-[var(--radius-sm)] border px-1.5 py-0.5 text-[10px]"
              style={{
                border: "1px solid var(--border-accent)",
                color: "var(--text-secondary)",
              }}
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span
              className="rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[10px]"
              style={{ color: "var(--text-dim)" }}
            >
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {!project.comingSoon && (
          <button
            onClick={() => onOpenModal(project)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "var(--cyan)" }}
          >
            {isAr ? "استكشف الدراسة الكاملة" : "View Case Study"}
            <ArrowUpRight style={{ width: 13, height: 13 }} strokeWidth={2} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Typing indicator ────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--cyan)",
            opacity: 0.4,
            animation: "pulse 1.2s infinite ease-in-out",
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Props ───────────────────────────────────────────────── */
export interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (p: Project) => void;
}

/* ─── Main component ──────────────────────────────────────── */
export function AiAssistant({ isOpen, onClose, onOpenProject }: AiAssistantProps) {
  const [profile, setProfile] = useState<VisitorProfile | null>(null);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [msgId, setMsgId] = useState(0);
  
  // Conversation context memory
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [explanationLevel, setExplanationLevel] = useState<number>(1);
  // Context-aware dynamic suggestions
  const [dynamicSuggestions, setDynamicSuggestions] = useState<{ Icon: any; labelEn: string; labelAr: string }[] | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const nextId = () => {
    setMsgId((n) => n + 1);
    return msgId + 1;
  };

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, profile]);

  /* Focus input when panel opens & profile selected */
  useEffect(() => {
    if (isOpen && profile) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, profile]);

  /* ESC to close */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Click-outside to close */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      const t = setTimeout(() => document.addEventListener("mousedown", onClick), 200);
      return () => {
        clearTimeout(t);
        document.removeEventListener("mousedown", onClick);
      };
    }
  }, [isOpen, onClose]);

  /* Detect initial language context */
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isHtmlAr = document.documentElement.lang === "ar";
      setLang(isHtmlAr ? "ar" : "en");
    }
  }, [isOpen]);

  /* Set Profile & Populate initial personalized greeting */
  const selectProfile = (selected: VisitorProfile) => {
    setProfile(selected);
    
    // Choose greeting language
    const isAr = lang === "ar";
    
    let text = "";
    if (selected === "business") {
      text = isAr
        ? "مرحبًا! تم تهيئة المساعد في وضع **الأعمال والشركات الناشئة**.\n\nسنركز على العائد الاستثماري (ROI)، وأثر الأتمتة، وكيف تدعم حلولنا نمو الأرباح وتقليل التكاليف.\n\nما هو التحدي الذي تواجهه في عملك اليوم وترغب في حله؟"
        : "Hello! We've configured the assistant for **Business & Startup** mode.\n\nWe'll focus on ROI, automation impact, and how our solutions drive revenue while reducing operational costs.\n\nWhat business challenge are you looking to solve today?";
    } else if (selected === "enterprise") {
      text = isAr
        ? "مرحبًا! تم تهيئة المساعد في وضع **المؤسسات الكبرى**.\n\nسنركز على قابلية التوسع، الأمان، والتكامل مع أنظمة CRM/ERP، والامتثال بالمعايير.\n\nكيف يمكننا دعم رحلة التحول الرقمي وأتمتة العمليات الكبرى لديكم؟"
        : "Hello! We've configured the assistant for **Enterprise** mode.\n\nWe'll focus on scalability, security, custom CRM/ERP integrations, and compliance.\n\nHow can we assist with your digital transformation and workflow orchestrations?";
    } else if (selected === "developer") {
      text = isAr
        ? "مرحبًا! تم تهيئة المساعد في وضع **المطورين**.\n\nسنركز على المكونات البرمجية، ومعمارية الأنظمة، وتكامل واجهات البرمجية (APIs) وحزم الذكاء الاصطناعي.\n\nاسألنا عن أي تفاصيل برمجية أو هندسية للمشاريع!"
        : "Hello! We've configured the assistant for **Developer** mode.\n\nWe'll highlight technical stacks, system architectures, API integrations, and AI models.\n\nAsk us anything about our engineering decisions or project source codes!";
    } else if (selected === "student") {
      text = isAr
        ? "مرحبًا! تم تهيئة المساعد في وضع **الطلاب والباحثين**.\n\nسنبسط مفاهيم الذكاء الاصطناعي مثل RAG والوكلاء المتعددين وOCR بطريقة تعليمية سهلة ومباشرة.\n\nما الذي تود تعلمه أو استكشافه اليوم؟"
        : "Hello! We've configured the assistant for **Researcher & Student** mode.\n\nWe'll explain AI concepts like RAG, Multi-Agent systems, and OCR in a simple, friendly, and structured way.\n\nWhat would you like to learn about today?";
    } else {
      text = isAr
        ? "مرحبًا! أنا مستشار Scorpius للحلول الذكية.\n\nيمكنني مساعدتك في:\n• التعرف على خدماتنا\n• شرح مشاريعنا بالتفصيل\n• اقتراح أفضل حلول الذكاء الاصطناعي لعملك\n• الإجابة عن أي سؤال تقني\n\nكيف يمكنني مساعدتك اليوم؟"
        : "Hello!\n\nI'm the Scorpius AI Solutions Consultant.\n\nI can help you:\n• Explore our AI solutions\n• Understand our projects in depth\n• Recommend the right AI architecture\n• Answer technical questions\n\nHow can I help today?";
    }

    setMessages([
      {
        id: 0,
        role: "assistant",
        content: [{ kind: "text", text }],
      },
    ]);
  };

/* ─── Concept definitions ─────────────────────────────────── */
const CONCEPT_DEFINITIONS = {
  en: {
    rag: "RAG (Retrieval-Augmented Generation) is an architecture that retrieves relevant context from secure databases to ground language model responses, ensuring precision and source verification.",
    llm: "LLMs (Large Language Models) are deep learning models trained to understand, reason, and generate natural language.",
    embeddings: "Embeddings are numerical vectors representing semantic text data, allowing conceptual search instead of simple keyword matching.",
    ocr: "OCR (Optical Character Recognition) extracts text from images, documents, and business receipts.",
    vector: "Vector Databases (such as pgvector) store embeddings to allow instant semantic context search.",
    automation: "Workflow Automation connects APIs and intelligence layers to run repetitive processes without manual friction.",
    agents: "AI Agents are autonomous systems that use LLM reasoning to plan, use tools, and complete multi-step goals.",
    crm: "CRM Integration links conversational workflows directly to databases (HubSpot, Salesforce) to synchronize lead pipelines.",
    enterprise: "Enterprise AI builds secure, scalable architectures designed for high corporate workloads and compliance.",
    legal: "Legal AI applies structured context mapping and guardrails to simplify compliance and regulatory text.",
    education: "Education AI builds adaptive tutoring paths and personalized, curriculum-grounded companions.",
    restaurant: "Restaurant AI applies multi-agent architectures to automate ordering, service, and inventory coordination.",
  },
  ar: {
    rag: "تقنية RAG (الاسترجاع المعزز بالتوليد) هي معمارية تسترجع السياق ذي الصلة من قواعد بيانات آمنة لدعم استجابات النموذج اللغوي وضمان الدقة والاستشهاد بالمصادر.",
    llm: "النماذج اللغوية الكبيرة (LLMs) هي نماذج تعلم عميق تم تدريبها على فهم اللغة الطبيعية وتوليدها والتفكير من خلالها.",
    embeddings: "الترميزات الرقمية المتجهة (Embeddings) هي تمثيلات رياضية تعبر عن المعاني الدلالية للنصوص للبحث بالمفهوم بدلاً من الكلمات المفتاحية البسيطة.",
    ocr: "تقنية OCR (التعرف الضوئي على الحروف) تستخرج النصوص المقروءة آلياً من الصور والمستندات الورقية وإيصالات الدفع.",
    vector: "قواعد البيانات المتجهة (مثل pgvector) تخزن الترميزات المتجهة للسماح بالبحث الدلالي اللحظي وسرعة الاسترجاع.",
    automation: "أتمتة سير العمل تربط واجهات البرمجة وبنيات الذكاء الاصطناعي لتشغيل العمليات المتكررة تلقائياً بدون تدخل يدوي.",
    agents: "وكلاء الذكاء الاصطناعي (AI Agents) هم أنظمة مستقلة تستخدم منطق الـ LLM للتخطيط واستدعاء الأدوات وإنجاز المهام المتعددة.",
    crm: "التكامل مع أنظمة CRM يربط واجهات المحادثة وقنوات الأتمتة مباشرة بقواعد بيانات العملاء (Salesforce أو HubSpot) لمزامنة البيانات.",
    enterprise: "الذكاء الاصطناعي للمؤسسات يقدم معماريات آمنة وقابلة للتوسع مصممة خصيصاً لأحجام العمل الكبيرة والامتثال للسياسات.",
    legal: "الذكاء الاصطناعي القانوني يطبق ضوابط صارمة ومطابقة سياقية لتبسيط التعامل مع النصوص اللائحية والتنظيمية.",
    education: "الذكاء الاصطناعي التعليمي يبني مسارات تعلم تكييفية ومساعدين دراسيين مدعومين بالمناهج الخاصة.",
    restaurant: "ذكاء اصطناعي للمطاعم يطبق أنظمة وكلاء متعددة لأتمتة عمليات الطلبات والخدمة وتنسيق المخزون.",
  }
};

/* ─── Semantic similarity scoring (Knowledge Graph approach) ─── */
function scoreProject(project: Project, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  // Exact matching signals
  if (project.title.toLowerCase().includes(q)) score += 12;
  if (project.slug.toLowerCase().includes(q)) score += 12;
  if (project.category.toLowerCase().includes(q)) score += 4;

  // Technology match
  project.technologies.forEach((tech) => {
    if (q.includes(tech.toLowerCase())) score += 6;
  });

  // Structural metadata match
  if (project.tagline.toLowerCase().includes(q)) score += 3;
  if (project.overview.toLowerCase().includes(q)) score += 2;
  if (project.problem.toLowerCase().includes(q)) score += 2;
  if (project.solution.toLowerCase().includes(q)) score += 2;

  // Features check
  project.features.forEach((feat) => {
    if (feat.toLowerCase().includes(q)) score += 1.5;
  });

  // Concept-specific semantic mapping
  if (q.includes("rag") || q.includes("retrieval") || q.includes("knowledge") || q.includes("استرجاع") || q.includes("معرف")) {
    const keywords = ["rag", "retrieval", "vector", "search", "citation", "document", "source", "library", "cite"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  if (q.includes("agent") || q.includes("agents") || q.includes("autonomous") || q.includes("الوكلاء") || q.includes("وكيل")) {
    const keywords = ["agent", "multi-agent", "autonomous", "orchestration", "planner", "routing", "collaborat"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  if (q.includes("ocr") || q.includes("receipt") || q.includes("image") || q.includes("التعرف الضوئي") || q.includes("إيصال") || q.includes("صور")) {
    const keywords = ["ocr", "receipt", "image", "document parsing", "vision", "parser"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  if (q.includes("whatsapp") || q.includes("chat") || q.includes("واتساب") || q.includes("محادث")) {
    const keywords = ["whatsapp", "chat", "message", "conversational", "reply", "commerce"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  if (q.includes("crm") || q.includes("erp") || q.includes("integration") || q.includes("تكامل") || q.includes("ربط")) {
    const keywords = ["crm", "erp", "integration", "hubspot", "salesforce", "api", "database"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  if (q.includes("automation") || q.includes("workflow") || q.includes("automate") || q.includes("أتمتة") || q.includes("سير العمل")) {
    const keywords = ["automation", "workflow", "automate", "pipeline", "trigger", "action"];
    keywords.forEach(kw => {
      if (project.description.toLowerCase().includes(kw) || project.overview.toLowerCase().includes(kw)) score += 2;
      project.technologies.forEach(t => { if (t.toLowerCase().includes(kw)) score += 3; });
    });
  }

  return score;
}

/* ─── Project distance similarity ─────────────────────────── */
function getProjectSimilarity(p1: Project, p2: Project): number {
  if (p1.slug === p2.slug) return 0;
  let score = 0;

  // Shared technologies
  const set1 = new Set(p1.technologies.map(t => t.toLowerCase()));
  p2.technologies.forEach(t => {
    if (set1.has(t.toLowerCase())) score += 4;
  });

  // Shared category
  if (p1.category === p2.category) score += 3;

  // Shared concept markers in overview / features
  const markers = ["rag", "agent", "automation", "whatsapp", "crm", "ocr", "dashboard", "nlp"];
  markers.forEach(kw => {
    const inP1 = p1.description.toLowerCase().includes(kw) || p1.overview.toLowerCase().includes(kw);
    const inP2 = p2.description.toLowerCase().includes(kw) || p2.overview.toLowerCase().includes(kw);
    if (inP1 && inP2) score += 3;
  });

  return score;
}

/* ─── Auto-generate relevance description ─────────────────── */
function getRelevanceExplanation(p: Project, primary: Project, isAr: boolean): string {
  const sharedTech = p.technologies.filter(t => primary.technologies.includes(t));
  if (isAr) {
    if (sharedTech.length > 0) {
      return `يستخدم هذا المشروع تقنيات مشتركة مثل **${sharedTech.slice(0, 2).join(" و ")}** لتأمين معالجة ذكية للبيانات.`;
    }
    if (p.category === primary.category) {
      return `ينتمي هذا الحل لنفس الفئة وهي **${p.category}** لحل متطلبات الأتمتة والتحليلات.`;
    }
    return `يعزز هذا المشروع حلولنا من خلال أتمتة تدفقات الأعمال الذكية.`;
  } else {
    if (sharedTech.length > 0) {
      return `Shares development technologies like **${sharedTech.slice(0, 2).join(" and ")}** to optimize computational layers.`;
    }
    if (p.category === primary.category) {
      return `Belongs to the same **${p.category}** group, resolving related operational inefficiencies.`;
    }
    return `Supports related automation demands with secure context integration.`;
  }
}

/* ─── Detect concept from input ───────────────────────────── */
function detectConcept(q: string): string | null {
  if (q.includes("rag") || q.includes("retrieval") || q.includes("استرجاع")) return "rag";
  if (q.includes("llm") || q.includes("gpt") || q.includes("large language model") || q.includes("نموذج لغوي") || q.includes("نماذج لغة")) return "llm";
  if (q.includes("embedding") || q.includes("vector representation") || q.includes("ترميز متجه") || q.includes("متجهات")) return "embeddings";
  if (q.includes("ocr") || q.includes("receipt") || q.includes("التعرف الضوئي") || q.includes("إيصال")) return "ocr";
  if (q.includes("vector database") || q.includes("vector db") || q.includes("pgvector") || q.includes("قاعدة بيانات متجهة")) return "vector";
  if (q.includes("automation") || q.includes("workflow") || q.includes("automate") || q.includes("أتمتة") || q.includes("سير العمل")) return "automation";
  if (q.includes("agent") || q.includes("autonomous agent") || q.includes("الوكلاء") || q.includes("وكيل")) return "agents";
  if (q.includes("crm") || q.includes("erp") || q.includes("integration") || q.includes("تكامل") || q.includes("ربط")) return "crm";
  if (q.includes("enterprise") || q.includes("corporate") || q.includes("مؤسسات")) return "enterprise";
  if (q.includes("legal") || q.includes("law") || q.includes("قانون")) return "legal";
  if (q.includes("education") || q.includes("school") || q.includes("تعليم")) return "education";
  if (q.includes("restaurant") || q.includes("food") || q.includes("مطعم")) return "restaurant";
  return null;
}

/* ─── Detect business domain from input ───────────────────── */
function detectDomain(q: string): string | null {
  if (q.includes("restaurant") || q.includes("food") || q.includes("مطعم") || q.includes("طعام")) return "restaurant";
  if (q.includes("legal") || q.includes("law") || q.includes("lawyer") || q.includes("قانون") || q.includes("محامي") || q.includes("تشريع")) return "legal";
  if (q.includes("education") || q.includes("school") || q.includes("university") || q.includes("learn") || q.includes("تعليم") || q.includes("مدرسة") || q.includes("جامعة") || q.includes("تعلم")) return "education-rag";
  if (q.includes("enterprise") || q.includes("corporate") || q.includes("company") || q.includes("مؤسسة") || q.includes("شركات كبرى")) return "enterprise-rag";
  if (q.includes("whatsapp") || q.includes("واتساب") || q.includes("conversational") || q.includes("تحادث")) return "whatsapp";
  if (q.includes("lead") || q.includes("sales") || q.includes("crm") || q.includes("مبيعات") || q.includes("عملاء محتملين")) return "sales";
  if (q.includes("career") || q.includes("job") || q.includes("resume") || q.includes("مسار مهني") || q.includes("وظيفة") || q.includes("سيرة ذاتية")) return "career";
  if (q.includes("real estate") || q.includes("property") || q.includes("عقارات") || q.includes("عقار")) return "real-estate";
  if (q.includes("learning") || q.includes("madarek") || q.includes("تعلم") || q.includes("مسار")) return "learning";
  if (q.includes("agent") || q.includes("multi-agent") || q.includes("autonomous") || q.includes("وكلاء")) return "multi-agent";
  if (q.includes("automation") || q.includes("workflow") || q.includes("automate") || q.includes("أتمتة")) return "automation";
  if (q.includes("ocr") || q.includes("receipt") || q.includes("document") || q.includes("إيصال") || q.includes("مستند")) return "ocr";
  if (q.includes("portfolio") || q.includes("profile") || q.includes("ملف") || q.includes("سيرة")) return "portfolio";
  return null;
}

/* ─── Project Comparison Handler ──────────────────────────── */
function compareProjects(p1: Project, p2: Project, isAr: boolean): string {
  const overrides1 = ARABIC_PROJECT_OVERRIDES[p1.slug];
  const overrides2 = ARABIC_PROJECT_OVERRIDES[p2.slug];
  const tagline1 = isAr ? (p1.i18n?.ar?.tagline || overrides1?.tagline || p1.tagline) : p1.tagline;
  const tagline2 = isAr ? (p2.i18n?.ar?.tagline || overrides2?.tagline || p2.tagline) : p2.tagline;

  const sharedTech = p1.technologies.filter(t => p2.technologies.includes(t));
  const uniqueToP1 = p1.technologies.filter(t => !p2.technologies.includes(t)).slice(0, 3);
  const uniqueToP2 = p2.technologies.filter(t => !p1.technologies.includes(t)).slice(0, 3);

  if (isAr) {
    return `### **مقارنة: ${p1.title} مقابل ${p2.title}**

**${p1.title}**
*${tagline1}*
• التركيز: ${p1.category}
• تقنيات مميزة: ${uniqueToP1.join("، ") || p1.technologies.slice(0, 2).join("، ")}

**${p2.title}**
*${tagline2}*
• التركيز: ${p2.category}
• تقنيات مميزة: ${uniqueToP2.join("، ") || p2.technologies.slice(0, 2).join("، ")}

**أوجه التشابه:**
${sharedTech.length > 0 ? `• تقنيات مشتركة: ${sharedTech.slice(0, 3).join("، ")}` : "• الحلان يعالجان تحديات مختلفة من زوايا متكاملة."}

**الخلاصة:** ${p1.title} هو الأنسب إذا كنت تبحث عن ${p1.category}. أما ${p2.title} فهو الاختيار الأمثل لـ${p2.category}.`;
  } else {
    return `### **Comparison: ${p1.title} vs ${p2.title}**

**${p1.title}**
*${tagline1}*
• Focus: ${p1.category}
• Distinctive Tech: ${uniqueToP1.join(", ") || p1.technologies.slice(0, 2).join(", ")}

**${p2.title}**
*${tagline2}*
• Focus: ${p2.category}
• Distinctive Tech: ${uniqueToP2.join(", ") || p2.technologies.slice(0, 2).join(", ")}

**Shared Capabilities:**
${sharedTech.length > 0 ? `• Common technologies: ${sharedTech.slice(0, 3).join(", ")}` : "• Both solve different challenges from complementary angles."}

**Bottom Line:** ${p1.title} is the right choice for ${p1.category} use cases. ${p2.title} excels when the focus is ${p2.category}.`;
  }
}

/* ─── Explaining the rationale for choice ─────────────────── */
function getStrongestRecommendationExplanation(project: Project, query: string, isAr: boolean): string {
  const q = query.toLowerCase();
  if (isAr) {
    if (q.includes("rag") || q.includes("استرجاع")) {
      return `نوصي بـ **${project.title}** كأقوى مثال على تطبيق RAG لدينا، حيث يربط الاستعلامات بنصوص المصدر مستنداً إلى مراجع رسمية وموثقة بدقة.`;
    }
    if (q.includes("agent") || q.includes("وكلاء")) {
      return `نوصي بـ **${project.title}** كأقوى حل لأنظمة الوكلاء المتعددة، حيث ينسق مهام اتخاذ القرار والأتمتة التشغيلية بشكل مستقل تماماً.`;
    }
    return `لقد اخترنا **${project.title}** كأقوى توصية هنا لأن هذا المشروع يدمج حلولاً ذكية مصممة خصيصاً لمثل هذه التحديات، مما يساهم بشكل مباشر في معالجة متطلباتك بفعالية وأمان.`;
  } else {
    if (q.includes("rag")) {
      return `We recommend **${project.title}** as our strongest example of RAG implementation, because it grounds model queries directly in verified documentation with precise, reliable citations.`;
    }
    if (q.includes("agent")) {
      return `We recommend **${project.title}** as our strongest solution because it leverages coordinated autonomous agents that share context and memory to execute complex operational loops.`;
    }
    return `We recommend **${project.title}** as the strongest solution because it directly addresses these goals, featuring specialized AI components and proven outcomes engineered for this exact context.`;
  }
}

/* ─── Clarification / Follow-up phrases ───────────────────── */
function isFollowUpRequest(q: string): boolean {
  const phrases = [
    "explain more", "explain further", "elaborate", "tell me more", "more details",
    "confused", "simplify", "example", "continue", "what do you mean", "explain that better",
    "ashrah", "waddih", "basit", "bمثال", "kamel", "tafasil",
    "اشرح أكثر", "وضح أكثر", "ممكن توضح", "لسه مش فاهم", "مش واضح", "تبسطها", "بمثال",
    "كيف يعني", "وبعد كده", "كمل", "احكيلي", "تفاصيل", "أفهم أكتر", "إيه الفرق"
  ];
  return phrases.some(phrase => q.includes(phrase));
}

/* ─── 5-Level Progressive Explanation Engine ───────────────── */
function getProgressiveExplanation(
  topic: string,
  level: number,
  profile: VisitorProfile,
  isAr: boolean
): string {
  const project = projects.find(p => p.slug === topic);

  // Tailor response style to the visitor's profile perspective
  let profilePrefix = "";
  if (isAr) {
    if (profile === "business") {
      profilePrefix = "> 📊 **القيمة للأعمال:** يساعد هذا الحل في تحسين الكفاءة التشغيلية وتحقيق عائد استثماري أسرع من خلال الذكاء الاصطناعي.\n\n";
    } else if (profile === "enterprise") {
      profilePrefix = "> 🛡️ **للمؤسسات:** بنيت هذه الحلول لتتوافق مع معايير الأمان الصارمة والأحمال العالية والربط الآمن بالـ APIs.\n\n";
    } else if (profile === "developer") {
      profilePrefix = "> ⚙️ **دليل المطورين:** تركز المعمارية على استخدام كود نمطي نظيف، واجهات برمجية مهندسة جيداً، ونماذج قابلة للاستبدال.\n\n";
    } else if (profile === "student") {
      profilePrefix = "> 🎓 **شرح تعليمي مبسط:** نوضح المفاهيم هنا خطوة بخطوة وبأمثلة واضحة لتسهيل الفهم الأكاديمي والعملي.\n\n";
    }
  } else {
    if (profile === "business") {
      profilePrefix = "> 📊 **Business ROI:** This approach streamlines workflow execution to reduce overhead costs and drive measurable margins.\n\n";
    } else if (profile === "enterprise") {
      profilePrefix = "> 🛡️ **Enterprise Ready:** Tailored for scale, enterprise compliance, secure data handling, and robust legacy integrations.\n\n";
    } else if (profile === "developer") {
      profilePrefix = "> ⚙️ **Developer Specs:** Highlights backend architecture efficiency, clean code practices, and decoupled modular components.\n\n";
    } else if (profile === "student") {
      profilePrefix = "> 🎓 **Step-by-Step Learning:** Demystifying complex paradigms with clear flowcharts and zero technical jargon barriers.\n\n";
    }
  }

  if (project) {
    const overrides = ARABIC_PROJECT_OVERRIDES[project.slug];
    const tagline = isAr ? (project.i18n?.ar?.tagline || overrides?.tagline || project.tagline) : project.tagline;
    const overview = isAr ? (project.i18n?.ar?.overview || overrides?.overview || project.overview) : project.overview;
    const problem = isAr ? (project.i18n?.ar?.problem || overrides?.problem || project.problem) : project.problem;
    const solution = isAr ? (project.i18n?.ar?.solution || overrides?.solution || project.solution) : project.solution;
    const techList = project.technologies.join(", ");

    if (level === 1) {
      return profilePrefix + (isAr
        ? `### **المشروع: ${project.title}**\n*${tagline}*\n\n**📌 نظرة عامة:**\n${overview}`
        : `### **Project: ${project.title}**\n*${tagline}*\n\n**📌 Overview:**\n${overview}`);
    }
    if (level === 2) {
      const archText = project.architecture 
        ? (isAr ? (project.i18n?.ar?.architecture || project.architecture).map(n => n.title).join(" -> ") : project.architecture.map(n => n.title).join(" -> "))
        : techList;
      return isAr
        ? `### **التفاصيل التقنية لـ ${project.title}**\n\n• **التقنيات المستخدمة:** ${techList}\n• **معمارية النظام:** ${archText}\n\nتم تصميم هذا النظام للعمل كحل متكامل وقابل للتطوير بشكل مباشر داخل بنية خوادم الشركة.`
        : `### **Technical Details for ${project.title}**\n\n• **Tech Stack:** ${techList}\n• **System Architecture Flow:** ${archText}\n\nEngineered with a modular, decoupled design to facilitate seamless API integrations and backend stability.`;
    }
    if (level === 3) {
      if (project.slug === "restro360") {
        return isAr
          ? `### **مثال تشبيهي لـ Restro360**\n\nتخيل مطبخ مطعم يعمل فيه عدة طهاة؛ أحدهم يستقبل الطلب، والثاني يحضر المكونات، والثالث يقوم بالطهي، والرابع يغلف الوجبة. الكل ينسق عمله تلقائياً لتقديم الوجبة دون تعارض.\n\nمنصة Restro360 تفعل الشيء ذاته بمجموعة وكلاء ذكاء اصطناعي يتشاركون الذاكرة والسياق لتشغيل المطعم بالكامل.`
          : `### **Real-World Analogy for Restro360**\n\nImagine a busy restaurant kitchen. Instead of one single chef trying to take orders, cook, manage inventory, and clean, you have specialized station chefs. Each chef does their specific job and coordinates with the others to serve the customer.\n\nRestro360 works exactly like this; a coordinated network of specialized autonomous AI agents sharing context to run restaurant operations smoothly.`;
      }
      if (project.slug === "bayyinah") {
        return isAr
          ? `### **مثال تشبيهي لـ Bayyinah**\n\nتخيل أن لديك خبيراً قانونياً يحمل دائماً كتاب الدستور والقوانين الكامل في يده. عندما تسأله، لا يجيب من الذاكرة أو يخمن، بل يفتح الباب ويشير بإصبعه إلى المادة والسطر الدقيق في القانون الرسمي ويقرأه لك.\n\nنظام Bayyinah يفعل ذلك تماماً باستخدام RAG لضمان أن كل إجابة قانونية مدعومة بنص القانون الصريح.`
          : `### **Real-World Analogy for Bayyinah**\n\nImagine you have a legal consultant who carries the entire official civil code book in hand. When you ask them a question, instead of answering from memory or guessing, they open the book, point their finger to the exact article and line, and read it to you.\n\nBayyinah does exactly this using RAG to ensure every answer is strictly grounded in official statutory text.`;
      }
      return isAr
        ? `### **مثال تشبيهي لـ ${project.title}**\n\nيعمل هذا النظام مثل موظف مخصص لديه وصول كامل لدفاتر الشركة الرسمية، يستخرج البيانات الدقيقة ويسلمها لك دون أخطاء عشوائية.`
        : `### **Real-World Analogy for ${project.title}**\n\nThink of this system as an expert clerk in a company archive who quickly retrieves verified files, double-checks them, and hands you the exact information you requested without guesswork.`;
    }
    if (level === 4) {
      const steps = project.workflow 
        ? (isAr ? (project.i18n?.ar?.workflow || project.workflow).map((w, i) => `${i + 1}. **${w.title}**: ${w.desc}`).join("\n") : project.workflow.map((w, i) => `${i + 1}. **${w.title}**: ${w.desc}`).join("\n"))
        : (isAr ? "1. استقبال مدخلات المستخدم.\n2. معالجة البيانات وتحليلها بالذكاء الاصطناعي.\n3. أتمتة الخطوات وحفظ السجلات.\n4. تسليم المخرجات الجاهزة." : "1. Intake user inputs.\n2. Process data using AI modules.\n3. Execute automated pipeline.\n4. Deliver verified structured output.");
      return isAr
        ? `### **خطوات العمل بالتفصيل لـ ${project.title}**\n\n${steps}`
        : `### **Step-by-Step Workflow for ${project.title}**\n\n${steps}`;
    }
    const results = isAr ? (project.i18n?.ar?.results || project.results) : project.results;
    return isAr
      ? `### **النتائج والأثر الملموس لـ ${project.title}**\n\n• ${results.join("\n• ")}`
      : `### **Proven Outcomes & Impact of ${project.title}**\n\n• ${results.join("\n• ")}`;
  }

  // If topic is an AI concept key
  const conceptKey = detectConcept(topic) || "rag";
  const def = isAr ? CONCEPT_DEFINITIONS.ar[conceptKey as keyof typeof CONCEPT_DEFINITIONS.ar] : CONCEPT_DEFINITIONS.en[conceptKey as keyof typeof CONCEPT_DEFINITIONS.en];

  if (level === 1) {
    return isAr
      ? `### **مفهوم: ${conceptKey.toUpperCase()}**\n\n${def}`
      : `### **Concept: ${conceptKey.toUpperCase()}**\n\n${def}`;
  }

  if (level === 2) {
    // Technical description with explanation of terminologies beforehand
    if (conceptKey === "rag") {
      return isAr
        ? "### **الشرح التقني لتقنية RAG**\n\nقبل استخدام المصطلحات التقنية، لنوضحها أولاً:\n• **النماذج اللغوية الكبيرة (LLMs):** هي محركات الذكاء الاصطناعي الأساسية التي تفهم وتولد النصوص.\n• **الترميزات المتجهة (Embeddings):** هي تحويل الكلمات إلى أرقام تعبر عن معناها الدلالي.\n• **قواعد البيانات المتجهة (Vector DB):** هي قواعد بيانات تبحث بالمعنى والتشابه بسرعة فائقة.\n\n**آلية العمل الهندسية:**\nيتم تقسيم المستندات وتوليد ترميزات متجهة (Embeddings) لها وتخزينها في قاعدة البيانات المتجهة (Vector DB). عندما يطرح المستخدم سؤالاً، يقوم النظام بالبحث الدلالي عن الفقرات الأكثر شبهاً بسؤاله، ثم يقوم بتمرير هذه الفقرات كـ 'سياق سري' مع السؤال إلى الـ LLM ليقوم بصياغة رد مستند بالكامل إلى المصادر."
        : "### **Technical Implementation of RAG**\n\nLet's clarify the key technical terms first:\n• **LLMs (Large Language Models):** The foundational AI engines that understand and draft text.\n• **Embeddings:** Numerical vector values representing the semantic meaning of text.\n• **Vector Databases:** Special data stores optimized to perform semantic similarity matches instantly.\n\n**Technical Pipeline:**\nPrivate documents are chunked, converted into semantic vector embeddings, and indexed in a Vector Database (like pgvector). When a user inputs a query, the database does a cosine similarity search to retrieve matching text chunks. These chunks are injected into the LLM context window alongside the prompt, forcing the LLM to draft a factual response rooted directly in your files.";
    }
    if (conceptKey === "agents") {
      return isAr
        ? "### **الشرح التقني لوكلاء الذكاء الاصطناعي (AI Agents)**\n\nالمصطلحات الأساسية:\n• **حلقات التفكير (Reasoning Loops):** قدرة النموذج على اتخاذ قرارات متسلسلة (مثل خطة -> عمل -> ملاحظة).\n• **واجهات البرمجة (APIs):** الجسور التي تسمح للنظام بالتفاعل مع التطبيقات الخارجية.\n\n**آلية العمل الهندسية:**\nيعمل الوكيل عن طريق تقييم الهدف المطلوب، وتقسيمه لخطوات عمل. يستدعي واجهات البرمجة والأنظمة لاسترجاع أو تعديل البيانات، ثم يراقب النتيجة، ويصحح أخطاء التنفيذ تلقائياً حتى ينجز المهمة بنجاح."
        : "### **Technical Architecture of AI Agents**\n\nCore terminology to understand:\n• **Reasoning Loops:** The process (like ReAct) where an LLM plans, acts, observes the results, and replans.\n• **APIs (Application Programming Interfaces):** Code interfaces that allow the agent to execute actions in other software.\n\n**Technical Pipeline:**\nAn agent wraps an LLM in a loop. Given a goal, the agent dynamically decides which tool or API to invoke, parses the API payload, evaluates the outcome, and self-corrects if errors occur until the goal is fully satisfied.";
    }
    return isAr
      ? `### **الهندسة والتقنيات لـ ${conceptKey.toUpperCase()}**\n\nتعتمد معمارية هذا المفهوم على ربط واجهات البرمجة (APIs) بالنماذج اللغوية (LLMs) لتمكين تدفقات بيانات آمنة وقابلة للتكرار.`
      : `### **Engineering Architecture of ${conceptKey.toUpperCase()}**\n\nThis pattern connects core Large Language Models (LLMs) with custom backend APIs to orchestrate robust, scalable logic.`;
  }

  if (level === 3) {
    if (conceptKey === "rag") {
      return isAr
        ? "### **مثال تشبيهي لتقنية RAG**\n\nتخيل طبيباً يأتيه مريض يعاني من أعراض نادرة. بدلاً من محاولة تذكر كل حالة قرأها في حياته أو تخمين العلاج، يفتح الطبيب كتاب المراجع الطبي المعتمد على مكتبه، ويبحث عن الأعراض، ويجد الدراسة السريرية الدقيقة، ثم يصف الدواء بناءً عليها.\n\nتقنية RAG تعمل تماماً مثل هذا الطبيب؛ فهي تفتح كتاب مستنداتك الرسمية لتجيبك منه بدلاً من التخمين."
        : "### **Real-World Analogy for RAG**\n\nImagine a doctor diagnosing a rare symptom. Instead of trying to guess from memory or making up a cure, the doctor opens a verified medical reference textbook on their desk, looks up the exact symptoms, reads the clinical guidelines, and then prescribes the medicine.\n\nRAG operates exactly like that doctor—retrieving verified records from the 'textbook' before answering.";
    }
    if (conceptKey === "agents") {
      return isAr
        ? "### **مثال تشبيهي للوكلاء (Agents)**\n\nتخيل منظم حفلات مستقل. تعطيه ميزانية وهدفاً: 'نظم حفلاً لـ 100 شخص يوم السبت'. يقوم المنظم بالاتصال بمطعم لتوفير الطعام، وحجز القاعة، وتنسيق الموسيقى، والتحقق من الطقس لتعديل الترتيبات. لا يعود إليك إلا والحدث جاهز تماماً.\n\nالوكيل الذكي يفعل نفس الشيء؛ يعمل بشكل مستقل لتحقيق هدفك بدلاً من مجرد إجابتك بنص مكتوب."
        : "### **Real-World Analogy for AI Agents**\n\nImagine an autonomous event planner. You give them a budget and a target: 'Organize a banquet for 100 people this Saturday.' The planner makes calls, hires the caterers, books the hall, tracks RSVPs, and coordinates logistics. They don't just tell you how to plan it; they execute the entire event.\n\nAI Agents do the same—planning and taking actions to get the job done rather than just giving you a text reply.";
    }
    return isAr
      ? "### **مثال تشبيهي مبسط**\n\nيعمل هذا النظام مثل موظف استقبال محترف لديه وصول كامل لدفاتر الشركة الرسمية، يستخرج البيانات الدقيقة ويسلمها لك دون أخطاء."
      : "### **Real-World Analogy**\n\nThink of this system as an expert clerk in a company archive who quickly retrieves files, double-checks them, and hands you the exact information you requested.";
  }

  if (level === 4) {
    if (conceptKey === "rag") {
      return isAr
        ? "### **خطوات عمل نظام RAG**\n\n1. **السؤال:** يكتب المستخدم الاستفسار.\n2. **البحث:** يبحث النظام دلالياً في قواعد البيانات المتجهة.\n3. **الاسترجاع:** يجلب النظام الفقرات الأكثر صلة.\n4. **الدمج:** يدمج النظام الفقرات المسترجعة مع السؤال الأصلي.\n5. **الصياغة:** يقوم النموذج اللغوي (LLM) بصياغة الإجابة مع توثيق المصدر."
        : "### **Step-by-Step RAG Execution**\n\n1. **Query:** The user submits a question.\n2. **Semantic Search:** The database locates matching text chunks.\n3. **Context Retrieval:** Relevant document snippets are extracted.\n4. **Prompt Augmentation:** Chunks are injected into the LLM context window.\n5. **Generation & Citation:** The LLM outputs a grounded response with source links.";
    }
    if (conceptKey === "agents") {
      return isAr
        ? "### **خطوات عمل الوكيل الذكي**\n\n1. **التخطيط:** يحلل الوكيل الهدف ويقسمه إلى خطوات متتالية.\n2. **اختيار الأداة:** يقرر الوكيل أي واجهة برمجة (API) يجب استدعاؤها.\n3. **التنفيذ:** يستدعي النظام الأداة ويستقبل الرد.\n4. **التقييم:** يدرس الوكيل النتائج ويحدد ما إذا كانت صحيحة.\n5. **التكرار:** يكرر العملية أو يعدل خطته حتى يكتمل الهدف بنجاح."
        : "### **Step-by-Step Agent Workflow**\n\n1. **Goal Parsing:** The agent interprets the objective and creates a plan.\n2. **Tool Selection:** The agent decides which API or utility to invoke.\n3. **Execution:** The system triggers the call and parses the return data.\n4. **Observation & Self-Correction:** The agent inspects the output for errors.\n5. **Iteration:** The loop continues until the final objective is satisfied.";
    }
    return isAr
      ? "1. تحليل الطلب بدقة.\n2. تحديد قواعد العمل وأماكن البيانات.\n3. تنفيذ خطوات المعالجة والتحقق تلقائياً.\n4. تقديم النتيجة للمستخدم."
      : "1. Intake and evaluate the goal.\n2. Locate the secure data references.\n3. Run the automated matching and processing logic.\n4. Present the verified outcome.";
  }

  // Level 5: Dynamic Portfolio Project Recommendation
  const matched = projects
    .filter(p => !p.comingSoon)
    .map(p => ({ project: p, score: scoreProject(p, conceptKey) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matched.length > 0) {
    const primary = matched[0].project;
    const others = matched.slice(1, 3);
    
    if (isAr) {
      let text = `### **تطبيق المفهوم في مشاريع Scorpius**\n\nيعتبر مشروع **${primary.title}** أفضل مثال عملي لدينا على تطبيق هذا المفهوم.\n\n• **لماذا؟** ${getStrongestRecommendationExplanation(primary, conceptKey, true)}`;
      if (others.length > 0) {
        text += `\n\n**مشاريع أخرى تطبق نفس المفهوم:**\n` + others.map(item => `• **${item.project.title}**: ${getRelevanceExplanation(item.project, primary, true)}`).join("\n");
      }
      return text;
    } else {
      let text = `### **How Scorpius Demonstrates This Concept**\n\nOur flagship implementation of this concept is **${primary.title}**.\n\n• **Why?** ${getStrongestRecommendationExplanation(primary, conceptKey, false)}`;
      if (others.length > 0) {
        text += `\n\n**Other relevant Scorpius projects:**\n` + others.map(item => `• **${item.project.title}**: ${getRelevanceExplanation(item.project, primary, false)}`).join("\n");
      }
      return text;
    }
  }

  return isAr
    ? "نطبق هذه المفاهيم في بناء جميع حلولنا المخصصة لخدمة متطلبات عملائنا."
    : "We apply these exact architectures to design and scale custom solutions for our clients.";
}

  /* The Brains of the Assistant — Consultative & Context-aware */
  const generateConsultantResponse = (inputText: string): MessageContent[] => {
    const q = inputText.toLowerCase().trim();
    const isAr = isArabic(inputText);
    
    // Remember preference for current session
    if (isAr && lang !== "ar") setLang("ar");
    if (!isAr && lang !== "en") setLang("en");

    const contents: MessageContent[] = [];
    const activeProfile = profile || "general";

    // ── 0. Company Knowledge Layer ──
    // Detect whether the visitor is asking about Scorpius as a COMPANY.
    // If so, answer about the company first — do NOT jump to projects.
    const isCompanyQuestion = (() => {
      // Who / what is Scorpius
      if (q.match(/who\s+is\s+scorpius/)) return true;
      if (q.match(/what\s+is\s+scorpius/)) return true;
      if (q.match(/tell\s+me\s+about\s+scorpius/)) return true;
      if (q.match(/about\s+scorpius/)) return true;
      if (q.includes("summarize your company") || q.includes("company summary") || q.includes("company overview")) return true;
      // Capabilities / expertise / specialties
      if (q.match(/what\s+(are\s+your|do\s+you\s+have|is\s+your)\s+(capabilit|specialt|expert|strength)/)) return true;
      if (q.includes("your capabilities") || q.includes("your expertise") || q.includes("your specialties") || q.includes("your strengths")) return true;
      // What makes / why choose / differentiation
      if (q.match(/what\s+makes\s+scorpius/)) return true;
      if (q.match(/why\s+(should\s+i|choose|pick|select|work\s+with)\s+scorpius/)) return true;
      if (q.match(/why\s+(is\s+)?scorpius\s+(different|better|unique|special)/)) return true;
      if (q.includes("what sets you apart") || q.includes("your differentiator") || q.includes("competitive advantage")) return true;
      // Industries served
      if (q.match(/what\s+industries/) || q.match(/which\s+industries/)) return true;
      if (q.includes("industry you serve") || q.includes("industries you serve") || q.includes("sectors you serve")) return true;
      // Mission / vision / company description
      if (q.includes("your mission") || q.includes("your vision") || q.includes("company mission")) return true;
      // What kind of AI / software do you build
      if (q.match(/what\s+kind\s+of\s+(ai|software|systems|solutions)\s+(do\s+you|does\s+scorpius)/)) return true;
      if (q.match(/do\s+you\s+build\s+(custom|software|apps|applications|ai)/)) return true;
      // Arabic equivalents
      if (q.includes("من هو scorpius") || q.includes("من هي scorpius") || q.includes("ما هو scorpius")) return true;
      if (q.includes("أخبرني عن scorpius") || q.includes("عن scorpius") || q.includes("عن شركة scorpius")) return true;
      if (q.includes("ما الذي تقدمه") || q.includes("ماذا يفعل scorpius") || q.includes("ما الذي يقدمه scorpius")) return true;
      if (q.includes("قدرات") || q.includes("كفاءات") || q.includes("تخصصات") || q.includes("مهارات الشركة")) return true;
      if (q.includes("ما الذي يميز") || q.includes("لماذا اختار scorpius") || q.includes("لماذا أختار scorpius")) return true;
      if (q.includes("مجالات عمل") || q.includes("قطاعات تخدمون") || q.includes("المجالات التي تخدمها")) return true;
      if (q.includes("رسالة الشركة") || q.includes("رؤية الشركة") || q.includes("مهمة الشركة")) return true;
      if (q.includes("هل تبنون برمجيات") || q.includes("هل تبنون تطبيقات") || q.includes("أنواع الأنظمة")) return true;
      return false;
    })();

    if (isCompanyQuestion) {
      // Determine sub-intent: why choose vs industries vs general about
      const isWhyChoose =
        q.includes("why") || q.includes("choose") || q.includes("different") || q.includes("better") ||
        q.includes("sets you apart") || q.includes("لماذا") || q.includes("يميز") || q.includes("اختار");
      const isIndustries =
        q.includes("industr") || q.includes("sector") || q.includes("مجالات") || q.includes("قطاعات");
      const isCapabilities =
        q.includes("capabilit") || q.includes("specialt") || q.includes("expert") ||
        q.includes("قدرات") || q.includes("تخصصات") || q.includes("كفاءات") || q.includes("مهارات");

      let responseText = "";

      if (isWhyChoose) {
        responseText = isAr
          ? `**لماذا تختار Scorpius؟**

نحن لسنا مجرد شركة برمجيات — نحن شركاء هندسيون متخصصون في الذكاء الاصطناعي التطبيقي.

**ما يميزنا:**

🏗️ **معمارية جاهزة للإنتاج** — كل نظام نبنيه مصمم للتوسع والاستقرار في بيئات الإنتاج الحقيقية، لا مجرد نماذج أولية.

🤖 **تخصص في أنظمة الوكلاء المتعددة** — نبني وكلاء ذكاء اصطناعي يعملون باستقلالية كاملة وينسقون مع بعضهم لإنجاز مهام معقدة.

🗂️ **خبرة عميقة في RAG** — نتميز في بناء أنظمة استرجاع معرفي موثوقة وخالية من الهلوسة عبر مجالات متعددة (قانوني، تعليمي، مؤسسي).

⚙️ **أتمتة تجارية حقيقية** — لا نبيع لك أدوات جاهزة؛ نصمم خطوط أتمتة مخصصة لعمليات عملك تحديداً.

💼 **تركيز على الأثر التجاري** — كل قرار هندسي نتخذه مرتبط بهدف تجاري قابل للقياس.

📐 **تصميم مخصص بالكامل** — لا حلول قياسية؛ كل نظام مبني من الصفر ليناسب متطلباتك.

إذا أردت، يمكنني أن أريك أحد مشاريعنا الرائدة التي تعكس هذه المزايا عملياً.`
          : `**Why Choose Scorpius?**

We're not just a software company — we're AI Engineering partners who specialize in production-ready intelligent systems.

**What sets us apart:**

🏗️ **Production-Ready Architecture** — Every system we build is engineered for real-world scale and stability, not just prototypes.

🤖 **Multi-Agent AI Specialization** — We build autonomous agent networks that coordinate to execute complex, multi-step business workflows.

🗂️ **Deep RAG Expertise** — We excel at building reliable, hallucination-free knowledge retrieval systems across legal, educational, and enterprise domains.

⚙️ **Real Business Automation** — We don't sell generic tools; we design custom automation pipelines tailored to your specific operations.

💼 **Business-Impact Focus** — Every engineering decision we make is tied to a measurable business outcome.

📐 **Fully Custom Development** — No off-the-shelf solutions; every system is built from the ground up to fit your requirements exactly.

If you'd like, I can show you one of our flagship projects that demonstrates these capabilities in practice.`;
      } else if (isIndustries) {
        responseText = isAr
          ? `**المجالات والقطاعات التي يخدمها Scorpius:**

نصمم ونبني حلول الذكاء الاصطناعي لمجموعة متنوعة من القطاعات:

🏛️ **المؤسسات والشركات الكبرى** — قواعد معرفة داخلية، أنظمة تحليل، وأتمتة العمليات.
⚖️ **القطاع القانوني** — استشارات قانونية مستنَدة بالنصوص الرسمية، وتحليل العقود.
🎓 **التعليم** — مساعدون دراسيون ذكيون مبنيون على المناهج الرسمية.
🍽️ **المطاعم والضيافة** — أتمتة عمليات المطاعم بأنظمة وكلاء متعددة.
💰 **المبيعات والتسويق** — خطوط جلب عملاء آلية وإدارة العلاقات.
💬 **التجارة الإلكترونية** — تجارة محادثاتية عبر WhatsApp مع دعم صوتي وOCR.
🏠 **العقارات** — تحليل السوق العقاري وتوصيات ذكية للعقارات.
📚 **التعلم والتطوير** — منصات تعلم تكيفية مبنية على الذكاء الاصطناعي.

إذا كان مجالك غير مذكور، أخبرنا عن تحديك وسنجد الحل الأنسب.`
          : `**Industries & Sectors Scorpius Serves:**

We design and build AI solutions across a wide range of business domains:

🏛️ **Enterprise & Corporations** — Internal knowledge bases, analytics systems, and process automation.
⚖️ **Legal** — Statute-grounded legal consultations and contract analysis.
🎓 **Education** — AI tutors and study companions built on official curricula.
🍽️ **Restaurants & Hospitality** — Full restaurant operations automation via multi-agent systems.
💰 **Sales & Marketing** — Automated lead generation pipelines and CRM integration.
💬 **E-commerce & Conversational Commerce** — WhatsApp-based sales with voice, image, and OCR support.
🏠 **Real Estate** — Property market analysis and intelligent listing recommendations.
📚 **Learning & Development** — Adaptive AI-powered learning platforms.

If your industry isn't listed, describe your challenge and we'll find the right approach.`;
      } else if (isCapabilities) {
        responseText = isAr
          ? `**قدرات وتخصصات Scorpius:**

نحن استوديو متكامل لهندسة الذكاء الاصطناعي والأتمتة. إليك تخصصاتنا الأساسية:

🤖 **أنظمة الوكلاء المتعددة** — تصميم وبناء وكلاء ذكاء اصطناعي مستقلة تعمل معاً لإنجاز مهام معقدة.
🗂️ **أنظمة RAG** — استرجاع معلومات موثق ودقيق من قواعد معرفة داخلية مؤمنة.
⚙️ **أتمتة سير العمل** — بناء خطوط أتمتة مخصصة تلغي الاختناقات التشغيلية.
💬 **الذكاء الاصطناعي التحادثي** — مساعدون ذكيون وروبوتات محادثة مخصصة لأعمالك.
📊 **منصات تحليلات الأعمال** — تحويل بيانات الشركة إلى لوحات قرار ذكية وقابلة للتنفيذ.
💻 **تطوير البرمجيات المخصصة** — تطبيقات ويب وجوال عالية الأداء مبنية بأحدث التقنيات.
🔌 **تكاملات APIs** — ربط الأنظمة الحالية مع حلول الذكاء الاصطناعي بشكل سلس.

إذا أردت، يمكنني عرض أمثلة حقيقية من مشاريعنا على أي من هذه التخصصات.`
          : `**Scorpius Capabilities & Specializations:**

We are a full-service AI Engineering & Automation Studio. Here are our core competencies:

🤖 **Multi-Agent AI Systems** — Design and build autonomous agent networks that work together to complete complex tasks.
🗂️ **RAG Systems** — Accurate, source-grounded knowledge retrieval from secured internal data.
⚙️ **Workflow Automation** — Custom automation pipelines that eliminate operational bottlenecks.
💬 **Conversational AI** — Smart assistants and chatbots tailored to your business processes.
📊 **AI Business Platforms** — Transform company data into actionable intelligence dashboards.
💻 **Custom Software Development** — High-performance web and mobile apps built with modern tech.
🔌 **API Integrations** — Seamlessly connect existing systems with AI-powered solutions.

If you'd like, I can show you real examples from our portfolio for any of these specializations.`;
      } else {
        // General "Who is / Tell me about / What does Scorpius do"
        responseText = isAr
          ? `**Scorpius** هو استوديو متخصص في هندسة الذكاء الاصطناعي والأتمتة، يصمم ويبني أنظمة ذكية متكاملة للشركات والمؤسسات.

**تخصصاتنا الأساسية:**

🤖 **أنظمة الوكلاء المتعددة** — وكلاء ذكاء اصطناعي مستقلون ينسقون لإنجاز المهام المعقدة.
🗂️ **حلول RAG المؤسسية** — استرجاع معرفي موثوق ودقيق من مصادر رسمية.
⚙️ **أتمتة العمليات التجارية** — تحويل العمليات اليدوية إلى خطوط أتمتة ذكية.
💬 **الذكاء الاصطناعي التحادثي** — مساعدون ذكيون لخدمة العملاء والمبيعات.
📊 **منصات تحليلات الأعمال** — تحويل البيانات إلى قرارات تجارية قابلة للتنفيذ.
💻 **البرمجيات المخصصة** — تطبيقات ويب وجوال بأعلى معايير الجودة.

**هدفنا:** مساعدة المنظمات على تحويل عملياتهم التجارية إلى أنظمة ذكية قابلة للتوسع.

إذا أردت، يمكنني عرض أحد مشاريعنا الرائدة التي تجسّد هذه القدرات عملياً.`
          : `**Scorpius** is an AI Engineering & Automation Studio that designs and builds intelligent software systems for businesses and organizations.

**We specialize in:**

🤖 **Multi-Agent AI Systems** — Autonomous agents that coordinate to complete complex operational workflows.
🗂️ **Enterprise RAG Solutions** — Reliable, source-grounded knowledge retrieval from secured internal data.
⚙️ **AI Automation** — Transforming manual business processes into intelligent, auditable pipelines.
💬 **Conversational AI** — Smart assistants for customer service, sales, and internal operations.
📊 **AI Business Platforms** — Turning company data into actionable intelligence and decision dashboards.
💻 **Custom Web & Mobile Applications** — High-performance software built to your exact specifications.

**Our goal:** Help organizations transform their business processes into intelligent, scalable AI-powered systems.

If you'd like, I can also show you one of our flagship projects that demonstrates these capabilities in practice.`;
      }

      contents.push({ kind: "text", text: responseText });
      setDynamicSuggestions([
        { Icon: Briefcase, labelEn: "Show me your projects", labelAr: "أرني مشاريعكم" },
        { Icon: Rocket, labelEn: "Why choose Scorpius?", labelAr: "لماذا أختار Scorpius؟" },
        { Icon: Globe, labelEn: "What industries do you serve?", labelAr: "ما المجالات التي تخدمونها؟" },
        { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
      ]);
      return contents;
    }

    // ── 1. Contact / Reach Out ──
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("تواصل") || q.includes("اتصال") || q.includes("ايميل")) {
      const responseText = isAr
        ? "يسعدنا دائماً التحدث مع عملائنا ومناقشة أفكارهم.\n\n📧 البريد الإلكتروني: **thescorpius12@gmail.com**\n🔗 لينكد إن: **linkedin.com/company/scorpius-ai**\n\nأخبرنا عن أهدافك — وسنرد عليك بخطوة عملية واضحة بدلاً من عرض بيع تقليدي."
        : "We'd love to discuss how we can build your next solution.\n\n📧 Email: **thescorpius12@gmail.com**\n🔗 LinkedIn: **linkedin.com/company/scorpius-ai**\n\nTell us about your goals — we'll respond with a clear technical roadmap, not a generic sales pitch.";
      contents.push({ kind: "text", text: responseText });
      return contents;
    }

    // ── 2. Services / Capabilities ──
    if (
      q.includes("service") || q.includes("what do you") || q.includes("what can you") || q.includes("what does scorpius") ||
      q.includes("الخدمات") || q.includes("ماذا تقدم") || q.includes("ماذا تفعل") || q.includes("خدماتكم")
    ) {
      const responseText = isAr
        ? "إليكم الحلول والخدمات التي نصممها ونبنيها في Scorpius:\n\n🤖 **وكلاء الذكاء الاصطناعي** — أنظمة تفكير مستقلة تستخدم أدواتك وبياناتك لإنجاز المهام.\n🗂 **أنظمة RAG** — استرجاع مدعوم بالاستشهادات للحصول على إجابات موثقة وخالية من الهلوسة.\n⚙️ **أتمتة سير العمل** — إزالة الاختناقات التشغيلية من خلال خطوط معالجة آلية.\n💬 **أتمتة الواتساب** — إدارة العملاء والطلبات والتحقق من الدفع تلقائياً.\n📊 **منصات تحليلات الأعمال** — تحويل البيانات الصامتة إلى لوحات تحكم وقرارات ذكية.\n💻 **البرمجيات المخصصة** — تطبيقات ويب وجوال مبنية بأحدث التقنيات البرمجية."
        : "Here's what our engineering studio builds:\n\n🤖 **AI Agents** — Autonomous reasoning agents configured to use your tools and data.\n🗂 **RAG Systems** — Production-grade Retrieval-Augmented Generation with article citations.\n⚙️ **Workflow Automation** — Eliminating operational bottlenecks through intelligent, auditable pipelines.\n💬 **WhatsApp Automation** — Conversational commerce, lead routing, and OCR-driven payment verification.\n📊 **AI Business Platforms** — Turning databases into predictive dashboards and actionable decisions.\n💻 **Custom Software** — High-performance, scalable web and mobile solutions tailored to your workflows.";
      contents.push({ kind: "text", text: responseText });
      // After services, suggest comparisons
      setDynamicSuggestions([
        { Icon: Bot, labelEn: "Show AI Agent Projects", labelAr: "مشاريع الوكلاء الذكية" },
        { Icon: Rocket, labelEn: "Show RAG Projects", labelAr: "مشاريع RAG" },
        { Icon: Zap, labelEn: "WhatsApp Automation", labelAr: "أتمتة الواتساب" },
        { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
      ]);
      return contents;
    }

    // ── 3. "Best Project" / "Strongest" Intent ──
    const isBestProjectQuery =
      q.includes("best project") || q.includes("strongest project") || q.includes("top project") ||
      q.includes("represents scorpius") || q.includes("flagship") ||
      q.includes("أفضل مشروع") || q.includes("أقوى مشروع") || q.includes("أبرز مشروع") || q.includes("يمثل scorpius");

    if (isBestProjectQuery) {
      const responseText = isAr
        ? `كل مشروع لدينا هو الأفضل في مجاله — لا يوجد مشروع واحد يمثل Scorpius لأن كل حل صمم ليكون رائداً في نطاقه.\n\nإليك نماذجنا الرائدة حسب المجال:\n\n🤖 **الوكلاء المتعددون:** Restro360 — نظام تشغيل مطاعم بوكلاء ذكاء اصطناعي مستقلة\n📚 **RAG المؤسسي:** El Raed — استرجاع معرفي للمؤسسات مع توثيق المصادر\n🎓 **RAG التعليمي:** Manara — مساعد دراسي مبني على المناهج الرسمية\n⚖️ **الذكاء القانوني:** Bayyinah — استشارات قانونية مستنَدة بنصوص القوانين\n📊 **أتمتة المبيعات:** Lead Generation Pipeline — بناء خطوط مبيعات آلية\n💬 **التجارة التحادثية:** WhatsApp Sales Agent — تجارة ومبيعات عبر WhatsApp\n🏠 **العقارات الذكية:** Nasm — ذكاء اصطناعي لتحليل سوق العقارات\n\nأخبرني بمجال عملك وسأرشحك للمشروع الأنسب لك بالضبط.`
        : `Every Scorpius project is the strongest in its own domain — there is no single "best" because each solution was purpose-built to lead in a specific business category.\n\nHere are our flagship solutions by domain:\n\n🤖 **Multi-Agent AI:** Restro360 — autonomous agent network for restaurant operations\n📚 **Enterprise RAG:** El Raed — enterprise knowledge retrieval with source citations\n🎓 **Educational RAG:** Manara — AI tutor built on official curricula\n⚖️ **Legal Knowledge AI:** Bayyinah — legal consultations grounded in statute text\n📊 **Sales Automation:** Lead Generation Pipeline — automated prospect pipelines\n💬 **Conversational Commerce:** WhatsApp Sales Agent — commerce and sales via WhatsApp\n🏠 **Real Estate AI:** Nasm — intelligent property market analytics\n\nTell me your industry or business challenge and I'll recommend the exact flagship that fits.`;
      contents.push({ kind: "text", text: responseText });
      setDynamicSuggestions([
        { Icon: Bot, labelEn: "Tell me about Restro360", labelAr: "أخبرني عن Restro360" },
        { Icon: Rocket, labelEn: "Tell me about El Raed", labelAr: "أخبرني عن El Raed" },
        { Icon: Briefcase, labelEn: "Tell me about Bayyinah", labelAr: "أخبرني عن Bayyinah" },
        { Icon: BarChart2, labelEn: "Compare two projects", labelAr: "قارن بين مشروعين" },
      ]);
      return contents;
    }

    // ── 4. Comparison Logic (e.g. "El Raed vs Manara") ──
    const vsMatch = inputText.match(/(.+?)\s+(?:vs\.?|versus|مقابل|مقارنة مع|ضد)\s+(.+)/i);
    if (vsMatch) {
      const name1 = vsMatch[1].trim().toLowerCase();
      const name2 = vsMatch[2].trim().toLowerCase();
      const p1 = projects.find(p => p.slug.includes(name1) || p.title.toLowerCase().includes(name1));
      const p2 = projects.find(p => p.slug.includes(name2) || p.title.toLowerCase().includes(name2));
      if (p1 && p2) {
        contents.push({ kind: "text", text: compareProjects(p1, p2, isAr) });
        contents.push({ kind: "project-card", project: p1 });
        contents.push({ kind: "project-card", project: p2 });
        setDynamicSuggestions([
          { Icon: ArrowUpRight, labelEn: `More on ${p1.title}`, labelAr: `المزيد عن ${p1.title}` },
          { Icon: ArrowUpRight, labelEn: `More on ${p2.title}`, labelAr: `المزيد عن ${p2.title}` },
          { Icon: Briefcase, labelEn: "See all projects", labelAr: "جميع المشاريع" },
        ]);
        return contents;
      }
    }

    // ── 5. RAG / Agent / Tech concept — answer intent first ──
    const ragIntent = q.includes("rag project") || q.includes("rag solution") || q.includes("do you have rag") || q.includes("عندكم rag") || q.includes("مشاريع rag") || q.includes("هل لديكم rag");
    if (ragIntent) {
      const ragProjects = projects.filter(p => !p.comingSoon && (
        p.technologies.some(t => t.toLowerCase().includes("rag") || t.toLowerCase().includes("retrieval")) ||
        p.description.toLowerCase().includes("rag") || p.overview.toLowerCase().includes("rag")
      ));
      const introText = isAr
        ? `نعم. لدى Scorpius عدة حلول مبنية على تقنية RAG (الاسترجاع المعزز بالتوليد).\n\nفي الواقع، RAG هو أحد أقوى ركائزنا الهندسية — نطبقه في مجالات تعليمية ومؤسسية وقانونية.\n\nإليك أبرز مشاريعنا المبنية على RAG:`
        : `Yes. Scorpius has several solutions built on RAG (Retrieval-Augmented Generation).\n\nIn fact, RAG is one of our core engineering pillars — we deploy it across education, enterprise, and legal domains.\n\nHere are our flagship RAG-powered projects:`;
      contents.push({ kind: "text", text: introText });
      const displayProjects = ragProjects.length > 0 ? ragProjects.slice(0, 3) : projects.filter(p => !p.comingSoon).slice(0, 3);
      contents.push({ kind: "project-list", projects: displayProjects });
      setDynamicSuggestions([
        { Icon: Rocket, labelEn: "Compare RAG projects", labelAr: "قارن مشاريع RAG" },
        { Icon: Bot, labelEn: "What is RAG?", labelAr: "ما هو الـ RAG؟" },
        { Icon: Building2, labelEn: "Enterprise RAG (El Raed)", labelAr: "RAG المؤسسي (El Raed)" },
        { Icon: GraduationCap, labelEn: "Educational RAG (Manara)", labelAr: "RAG التعليمي (Manara)" },
      ]);
      return contents;
    }

    const agentIntent = q.includes("agent project") || q.includes("do you have agent") || q.includes("عندكم وكلاء") || q.includes("مشاريع وكلاء") || q.includes("هل لديكم وكيل");
    if (agentIntent) {
      const agentProjects = projects.filter(p => !p.comingSoon && (
        p.technologies.some(t => t.toLowerCase().includes("agent")) ||
        p.description.toLowerCase().includes("agent") || p.overview.toLowerCase().includes("agent")
      ));
      const introText = isAr
        ? `نعم. Scorpius تبني حلول قائمة على وكلاء الذكاء الاصطناعي (AI Agents).\n\nأنظمة الوكلاء هي تخصصنا المحوري — كل وكيل يعمل باستقلالية كاملة وينسق مع بقية الوكلاء لإنجاز مهام معقدة.\n\nإليك مشاريعنا المبنية على أنظمة الوكلاء:`
        : `Yes. Scorpius builds AI Agent-powered solutions.\n\nAgent systems are one of our core specializations — each agent runs autonomously while coordinating with others to complete complex workflows.\n\nHere are our agent-driven projects:`;
      contents.push({ kind: "text", text: introText });
      const displayProjects = agentProjects.length > 0 ? agentProjects.slice(0, 3) : projects.filter(p => !p.comingSoon).slice(0, 3);
      contents.push({ kind: "project-list", projects: displayProjects });
      setDynamicSuggestions([
        { Icon: Bot, labelEn: "Tell me about Restro360", labelAr: "أخبرني عن Restro360" },
        { Icon: Rocket, labelEn: "What are AI Agents?", labelAr: "ما هي وكلاء الذكاء الاصطناعي؟" },
        { Icon: Zap, labelEn: "Multi-agent vs RAG", labelAr: "الوكلاء مقابل RAG" },
      ]);
      return contents;
    }

    // ── 6. Domain-based business routing ──
    const domain = detectDomain(q);
    if (domain && DOMAIN_RECOMMENDATIONS[domain]) {
      const rec = DOMAIN_RECOMMENDATIONS[domain];
      const flagship = projects.find(p => p.slug === rec.flagship);
      const relatedProjs = rec.related
        .map(slug => projects.find(p => p.slug === slug))
        .filter((p): p is Project => p !== undefined && !p.comingSoon);

      if (flagship) {
        const overrides = ARABIC_PROJECT_OVERRIDES[flagship.slug];
        const tagline = isAr ? (flagship.i18n?.ar?.tagline || overrides?.tagline || flagship.tagline) : flagship.tagline;
        const domainLabel = isAr ? rec.domainAr : rec.domainEn;

        const introText = isAr
          ? `بناءً على احتياجاتك في **${domainLabel}**، أنصح بمشروع **${flagship.title}** كحلنا الرائد في هذا المجال.\n\n*${tagline}*\n\n${getProjectExplanation(flagship, activeProfile, true)}`
          : `Based on your **${domainLabel}** needs, I recommend **${flagship.title}** as our flagship solution for this domain.\n\n*${tagline}*\n\n${getProjectExplanation(flagship, activeProfile, false)}`;

        contents.push({ kind: "text", text: introText });
        contents.push({ kind: "project-card", project: flagship });
        setCurrentProjectSlug(flagship.slug);
        setCurrentTopic(flagship.slug);
        setExplanationLevel(1);

        if (relatedProjs.length > 0) {
          const relatedText = isAr
            ? `\n**مشاريع ذات صلة قد تهمك أيضاً:**`
            : `\n**Related solutions you may also find relevant:**`;
          contents.push({ kind: "text", text: relatedText });
          contents.push({ kind: "project-list", projects: relatedProjs });
        }

        setDynamicSuggestions([
          { Icon: ChevronRight, labelEn: `Explain more about ${flagship.title}`, labelAr: `وضح أكثر عن ${flagship.title}` },
          { Icon: Zap, labelEn: "Business ROI & Results", labelAr: "العائد التجاري والنتائج" },
          { Icon: Terminal, labelEn: "Tech Stack & Architecture", labelAr: "التقنيات والمعمارية" },
          { Icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
        ]);
        return contents;
      }
    }

    // ── 7. Progressive Clarification & Follow-Up Engine ──
    const isFollowUp = isFollowUpRequest(q);
    let activeTopic = currentTopic;
    let levelToUse = 1;

    if (isFollowUp) {
      if (!activeTopic) {
        activeTopic = currentProjectSlug || "rag";
        setCurrentTopic(activeTopic);
      }
      levelToUse = Math.min(explanationLevel + 1, 5);
      setExplanationLevel(levelToUse);
    } else {
      // Direct project match check
      const matchedProj = projects.find(p => q.includes(p.slug.toLowerCase()) || q.includes(p.title.toLowerCase()));
      // Direct concept match check
      const concept = detectConcept(q);

      if (matchedProj) {
        activeTopic = matchedProj.slug;
        setCurrentTopic(activeTopic);
        setCurrentProjectSlug(matchedProj.slug);
      } else if (concept) {
        activeTopic = concept;
        setCurrentTopic(activeTopic);
      } else {
        // General query resets the progressive track
        activeTopic = null;
        setCurrentTopic(null);
      }
      levelToUse = 1;
      setExplanationLevel(1);
    }

    if (activeTopic) {
      const explanation = getProgressiveExplanation(activeTopic, levelToUse, activeProfile, isAr);
      contents.push({ kind: "text", text: explanation });

      // Append visual project cards
      const project = projects.find(p => p.slug === activeTopic);
      if (project) {
        contents.push({ kind: "project-card", project });
      } else if (levelToUse === 5) {
        // Concept recommendation at level 5
        const matched = projects
          .filter(p => !p.comingSoon)
          .map(p => ({ project: p, score: scoreProject(p, activeTopic!) }))
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score);
        if (matched.length > 0) {
          contents.push({ kind: "project-card", project: matched[0].project });
        }
      }

      // Append follow-up guide text
      if (isAr) {
        if (levelToUse < 5) {
          contents.push({ kind: "text", text: "\n\nهل ترغب في أن أشرح لك المزيد عن هذا الموضوع؟ (مثال: 'وضح أكثر' أو 'ممكن تبسطها؟')" });
        } else {
          contents.push({ kind: "text", text: "\n\nلقد استعرضنا كل مستويات الشرح لهذا الموضوع. هل ترغب في مناقشة حلول مخصصة لأعمالك؟" });
        }
      } else {
        if (levelToUse < 5) {
          contents.push({ kind: "text", text: "\n\nWould you like me to explain this topic further? (e.g. 'Explain more' or 'Give me an analogy')" });
        } else {
          contents.push({ kind: "text", text: "\n\nWe've reached the end of our progressive overview. Would you like to discuss custom solutions for your business?" });
        }
      }
      return contents;
    }

    // ── 4. Project follow-up context memory (General project details) ──
    if (currentProjectSlug) {
      const activeProj = projects.find((p) => p.slug === currentProjectSlug);
      if (activeProj) {
        const overrides = ARABIC_PROJECT_OVERRIDES[activeProj.slug];
        
        if (q.includes("tech") || q.includes("stack") || q.includes("تقني") || q.includes("برمج")) {
          const techText = isAr
            ? `يستخدم مشروع **${activeProj.title}** التقنيات التالية:\n\n• ${activeProj.technologies.join("\n• ")}`
            : `The project **${activeProj.title}** is powered by the following technologies:\n\n• ${activeProj.technologies.join("\n• ")}`;
          contents.push({ kind: "text", text: techText });
          return contents;
        }

        if (q.includes("feature") || q.includes("capability") || q.includes("does it do") || q.includes("ميز") || q.includes("خصائص")) {
          const features = isAr ? (activeProj.i18n?.ar?.features || activeProj.features) : activeProj.features;
          const featuresText = isAr
            ? `الميزات الرئيسية لمشروع **${activeProj.title}** هي:\n\n• ${features.join("\n• ")}`
            : `The key features of **${activeProj.title}** include:\n\n• ${features.join("\n• ")}`;
          contents.push({ kind: "text", text: featuresText });
          return contents;
        }

        if (q.includes("problem") || q.includes("why") || q.includes("need") || q.includes("مشكل") || q.includes("لماذا")) {
          const problem = isAr ? (activeProj.i18n?.ar?.problem || overrides?.problem || activeProj.problem) : activeProj.problem;
          const probText = isAr
            ? `المشكلة التي يحلها مشروع **${activeProj.title}** هي:\n\n${problem}`
            : `The core problem addressed by **${activeProj.title}** is:\n\n${problem}`;
          contents.push({ kind: "text", text: probText });
          return contents;
        }

        if (q.includes("result") || q.includes("impact") || q.includes("benefit") || q.includes("نتائج") || q.includes("أثر")) {
          const results = isAr ? (activeProj.i18n?.ar?.results || activeProj.results) : activeProj.results;
          const resText = isAr
            ? `النتائج والأثر التشغيلي لمشروع **${activeProj.title}** هي:\n\n• ${results.join("\n• ")}`
            : `The operational results and business impact of **${activeProj.title}** are:\n\n• ${results.join("\n• ")}`;
          contents.push({ kind: "text", text: resText });
          return contents;
        }

        if (q.includes("roadmap") || q.includes("future") || q.includes("scale") || q.includes("خطة") || q.includes("مستقبل")) {
          const roadmap = isAr ? (activeProj.i18n?.ar?.roadmap || activeProj.roadmap) : activeProj.roadmap;
          const roadText = isAr
            ? `خارطة الطريق المستقبلية لمشروع **${activeProj.title}**:\n\n• ${roadmap.join("\n• ")}`
            : `The future scaling roadmap for **${activeProj.title}** includes:\n\n• ${roadmap.join("\n• ")}`;
          contents.push({ kind: "text", text: roadText });
          return contents;
        }

        if (q.includes("architecture") || q.includes("design") || q.includes("معمار") || q.includes("تصميم")) {
          const archText = isAr
            ? `تم بناء معمارية **${activeProj.title}** لتكون آمنة وقابلة للتوسع.\n• ${activeProj.architecture ? (activeProj.i18n?.ar?.architecture || activeProj.architecture).map(n => n.title).join(" -> ") : activeProj.technologies.slice(0, 3).join(" و ") + " في الطبقة الأساسية."}`
            : `The architecture of **${activeProj.title}** is designed for modularity.\n• ${activeProj.architecture ? (activeProj.architecture).map(n => n.title).join(" -> ") : activeProj.technologies.slice(0, 3).join(", ") + " powering the core layers."}`;
          contents.push({ kind: "text", text: archText });
          return contents;
        }

        if (q.includes("model") || q.includes("ai") || q.includes("llm") || q.includes("نموذج") || q.includes("ذكاء")) {
          const modelText = isAr
            ? `يعتمد مشروع **${activeProj.title}** على نماذج لغوية متقدمة (مثل GPT-4 أو Llama) مدمجة مع خوارزميات RAG أو أنظمة الوكلاء لضمان استجابات دقيقة.`
            : `The intelligence layer in **${activeProj.title}** utilizes advanced models (like GPT-4 or Llama) connected with RAG pipelines or agent workflows for reasoning.`;
          contents.push({ kind: "text", text: modelText });
          return contents;
        }

        if (q.includes("different") || q.includes("unique") || q.includes("advantage") || q.includes("يميز") || q.includes("مختلف")) {
          const diffText = isAr
            ? `ما يميز **${activeProj.title}** هو أنه حل حقيقي مبني على مصادر موثقة وخالٍ من الهلوسة، مع كونه يتكامل تماماً مع البنية البرمجية القائمة لمؤسستك.`
            : `What makes **${activeProj.title}** unique is its strict source-grounding, robust edge cases, and its capability to scale dynamically within legacy business applications.`;
          contents.push({ kind: "text", text: diffText });
          return contents;
        }

        if (q.includes("industry") || q.includes("industries") || q.includes("sector") || q.includes("مجال") || q.includes("قطاع")) {
          const cat = isAr ? (activeProj.i18n?.ar?.category || activeProj.category) : activeProj.category;
          const indText = isAr
            ? `يخدم هذا المشروع قطاع **${cat}**، وهو مناسب تماماً للمؤسسات والشركات التي تبحث عن أتمتة العمليات.`
            : `This solution belongs to the **${cat}** category, tailored for businesses wanting to optimize high-volume operations.`;
          contents.push({ kind: "text", text: indText });
          return contents;
        }
      }
    }

    // ── 5. Default Project List ──
    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("المشروع") || q.includes("المشاريع")) {
      const visibleProjects = projects.filter((p) => !p.comingSoon).slice(0, 4);
      const listText = isAr
        ? "إليكم بعضاً من مشاريعنا البرمجية وحلول الذكاء الاصطناعي الرائدة:"
        : "Here are some of our flagship AI engineering solutions:";
      contents.push({ kind: "text", text: listText });
      contents.push({ kind: "project-list", projects: visibleProjects });
      return contents;
    }

    // ── 6. General Fallback ──
    const fallbackText = isAr
      ? "شكراً لتواصلك معنا. نحن استوديو متكامل لهندسة الذكاء الاصطناعي والأتمتة.\n\nيمكنك سؤالي عن:\n• **الخدمات** التي نقدمها للشركات\n• تفاصيل أي **مشروع** من مشاريعنا المعروضة\n• **التقنيات** ودمجها مع أنظمتك الحالية\n• كيف يمكننا **مساعدتك** في حل مشكلة تشغيلية محددة."
      : "Thank you for reaching out. We are an AI Engineering & Automation Studio.\n\nFeel free to ask us about:\n• Our specific **services** and capabilities\n• Details of any **project** or case study\n• The **technologies** and model integrations we use\n• Or describe a business bottleneck, and we'll advise the right AI architecture.";
    contents.push({ kind: "text", text: fallbackText });
    return contents;
  };

  const sendMessage = useCallback(
    (userText: string) => {
      if (!userText.trim() || isTyping) return;
      const trimmed = userText.trim();
      setInputValue("");
      setDynamicSuggestions(null);

      const userMsg: Message = {
        id: nextId(),
        role: "user",
        content: [{ kind: "text", text: trimmed }],
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Pick a consultant-style loading message
      const isInputAr = isArabic(trimmed);
      const pool = isInputAr ? LOADING_MESSAGES_AR : LOADING_MESSAGES_EN;
      setLoadingMsg(pool[Math.floor(Math.random() * pool.length)]);

      const delay = 800 + Math.random() * 500;
      setTimeout(() => {
        const responseContent = generateConsultantResponse(trimmed);
        const assistantMsg: Message = {
          id: nextId(),
          role: "assistant",
          content: responseContent,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
        setLoadingMsg("");
      }, delay);
    },
    [isTyping, msgId, profile, lang, currentProjectSlug, currentTopic, explanationLevel]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleSuggestion = (label: string) => {
    sendMessage(label);
  };

  const activeProfile = profile || "general";
  const currentSuggestions = dynamicSuggestions ?? SUGGESTIONS_BY_PROFILE[activeProfile];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────── */}
          <motion.div
            key="ai-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[90]"
            style={{ background: "rgba(6,17,26,0.6)", backdropFilter: "blur(5px)" }}
            aria-hidden
          />

          {/* ── Sidebar panel ─────────────────────────────────── */}
          <motion.div
            key="ai-panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Scorpius AI Consultant"
            className="fixed right-0 top-0 z-[100] flex h-full w-full flex-col sm:max-w-[420px]"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(32px) saturate(160%)",
              borderLeft: "1px solid var(--border-accent)",
              boxShadow: "-4px 0 40px -8px rgba(0,0,0,0.65), -1px 0 0 rgba(33,184,187,0.15)",
            }}
          >
            {/* ── Header ───────────────────────────────────────── */}
            <div
              className="flex shrink-0 items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full"
                  style={{
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border-accent)",
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: "var(--cyan)",
                      boxShadow: "0 0 10px var(--cyan)",
                      animation: "pulse 1.6s infinite ease-in-out",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {lang === "ar" ? "مستشار Scorpius الذكي" : "Scorpius AI Consultant"}
                  </p>
                  <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--cyan)" }}>
                    {lang === "ar" ? "متاح للخدمة" : "Solutions Architect"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language switcher */}
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] transition-all hover:border-cyan-500"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Globe style={{ width: 10, height: 10 }} />
                  {lang === "en" ? "العربية" : "EN"}
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close AI assistant"
                  className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-[var(--surface-elevated)]"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <X style={{ width: 15, height: 15 }} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* ── Main Panel Content ────────────────────────────── */}
            {profile === null ? (
              /* Profile selector welcome screen */
              <div className="scorpius-scroll flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2
                      className="text-xl font-bold tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {lang === "ar" ? "مرحبًا بكم في Scorpius AI" : "Welcome to Scorpius AI"}
                    </h2>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {lang === "ar"
                        ? "أنا مستشار الحلول الذكية الخاص بكم. قبل أن نبدأ، يرجى إخباري بقليل عن نفسك لأتمكن من تخصيص توصياتي لك."
                        : "I'm your AI Solutions Consultant. Before we begin, tell me a little about yourself so I can personalize my recommendations."}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {PROFILE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => selectProfile(opt.id)}
                          className="flex items-start gap-3 rounded-[var(--radius-lg)] border p-3.5 text-left transition-all duration-200"
                          style={{
                            border: "1px solid var(--border)",
                            background: "linear-gradient(175deg, var(--surface-elevated) 0%, var(--surface) 100%)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--border-accent)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(33,184,187,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div
                            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                            style={{
                              background: "var(--accent-dim)",
                              color: "var(--cyan)",
                            }}
                          >
                            <Icon style={{ width: 14, height: 14 }} />
                          </div>
                          <div>
                            <p
                              className="text-xs font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {lang === "ar" ? opt.titleAr : opt.titleEn}
                            </p>
                            <p
                              className="mt-1 text-[11px] leading-normal"
                              style={{ color: "var(--text-dim)" }}
                            >
                              {lang === "ar" ? opt.descAr : opt.descEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <button
                    onClick={() => selectProfile("general")}
                    className="text-xs transition-colors hover:text-[var(--cyan)]"
                    style={{ color: "var(--text-secondary)", textDecoration: "underline" }}
                  >
                    {lang === "ar" ? "المتابعة دون تحديد" : "Continue without selecting"}
                  </button>
                </div>
              </div>
            ) : (
              /* Chat Thread Interface */
              <>
                <div className="scorpius-scroll flex-1 overflow-y-auto px-5 py-5 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      variants={bubbleVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex flex-col gap-2 ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      {msg.content.map((c, ci) => {
                        if (c.kind === "text") {
                          return (
                            <div
                              key={ci}
                              className="max-w-[90%] rounded-[var(--radius-lg)] px-4 py-3 text-sm leading-relaxed"
                              style={
                                msg.role === "user"
                                  ? {
                                      background: "linear-gradient(135deg, rgba(33,184,187,0.2) 0%, rgba(33,184,187,0.08) 100%)",
                                      border: "1px solid var(--border-accent)",
                                      color: "var(--text-primary)",
                                      borderBottomRightRadius: 4,
                                    }
                                  : {
                                      background: "var(--surface-elevated)",
                                      border: "1px solid var(--border)",
                                      color: "var(--text-secondary)",
                                      borderBottomLeftRadius: 4,
                                    }
                              }
                            >
                              <RenderText text={c.text} />
                            </div>
                          );
                        }
                        if (c.kind === "project-card") {
                          return (
                            <div key={ci} className="w-full max-w-[92%]">
                              <ChatProjectCard
                                project={c.project}
                                onOpenModal={(p) => {
                                  onClose();
                                  onOpenProject(p);
                                }}
                                isAr={lang === "ar"}
                              />
                            </div>
                          );
                        }
                        if (c.kind === "project-list") {
                          return (
                            <div key={ci} className="w-full space-y-3">
                              {c.projects.map((p) => (
                                <ChatProjectCard
                                  key={p.slug}
                                  project={p}
                                  onOpenModal={(proj) => {
                                    onClose();
                                    onOpenProject(proj);
                                  }}
                                  isAr={lang === "ar"}
                                />
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      variants={bubbleVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-start"
                    >
                      <div
                        className="rounded-[var(--radius-lg)] rounded-bl-[4px] px-4 py-2.5"
                        style={{
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {loadingMsg ? (
                          <p className="text-xs italic" style={{ color: "var(--cyan)", opacity: 0.8 }}>{loadingMsg}</p>
                        ) : (
                          <TypingIndicator />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Dynamic Suggestions List */}
                  {!isTyping && currentSuggestions && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {currentSuggestions.map(({ Icon, labelEn, labelAr }) => {
                        const label = lang === "ar" ? labelAr : labelEn;
                        return (
                          <button
                            key={labelEn}
                            onClick={() => handleSuggestion(label)}
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all"
                            style={{
                              background: "var(--accent-dim)",
                              border: "1px solid var(--border-accent)",
                              color: "var(--cyan)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = "rgba(33,184,187,0.18)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-dim)";
                            }}
                          >
                            <Icon style={{ width: 11, height: 11 }} />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* ── Input Area ── */}
                <div
                  className="shrink-0 px-4 py-3.5"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div
                    className="flex items-end gap-2 rounded-[var(--radius-lg)] px-3.5 py-2.5"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocusCapture={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-accent)";
                    }}
                    onBlurCapture={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    }}
                  >
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={lang === "ar" ? "اسأل عن مشاريعنا، خدماتنا، أو تقنياتنا..." : "Ask about our services, projects, or stack..."}
                      rows={1}
                      className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-[var(--text-dim)]"
                      style={{
                        color: "var(--text-primary)",
                        maxHeight: "100px",
                        lineHeight: "1.4",
                        fontFamily: "inherit",
                        direction: lang === "ar" ? "rtl" : "ltr",
                      }}
                      disabled={isTyping}
                    />
                    <button
                      onClick={() => sendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      aria-label="Send message"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all"
                      style={{
                        background: inputValue.trim() && !isTyping
                          ? "linear-gradient(135deg, #9ff0eb 0%, #21b8bb 55%, #179fa2 100%)"
                          : "var(--surface-elevated)",
                        color: inputValue.trim() && !isTyping ? "#06111a" : "var(--text-dim)",
                        cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                        border: "none",
                      }}
                    >
                      <Send style={{ width: 13, height: 13 }} strokeWidth={2.2} />
                    </button>
                  </div>
                  <p
                    className="mt-2 text-center text-[9px]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {lang === "ar"
                      ? "اضغط Enter للإرسال · Shift+Enter لسطر جديد"
                      : "Press Enter to send · Shift+Enter for new line"}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
