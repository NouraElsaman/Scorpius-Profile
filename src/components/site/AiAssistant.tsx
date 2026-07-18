/**
 * SCORPIUS AI Assistant
 *
 * Triggered by the Hero logo click.
 * Slides in from the right as a glassmorphism sidebar.
 * Reuses all existing design tokens, motion springs, and the ProjectModal.
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
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

/* ─── Types ───────────────────────────────────────────────── */
type Role = "assistant" | "user";
type MessageContent =
  | { kind: "text"; text: string }
  | { kind: "project-card"; project: Project }
  | { kind: "project-list"; projects: Project[] };

interface Message {
  id: number;
  role: Role;
  content: MessageContent[];
}

/* ─── Suggestion chips ────────────────────────────────────── */
const SUGGESTIONS = [
  { Icon: Rocket,    label: "Explore AI Solutions" },
  { Icon: Bot,       label: "Multi-Agent Systems" },
  { Icon: Zap,       label: "AI Automation" },
  { Icon: BarChart2, label: "Business Intelligence" },
  { Icon: Briefcase, label: "Industries" },
  { Icon: Mail,      label: "Contact Scorpius" },
];

/* ─── Project keyword map ─────────────────────────────────── */
const PROJECT_KEYWORDS: { slug: string; keywords: string[] }[] = [
  {
    slug: "career-intelligence-platform",
    keywords: ["career", "resume", "résumé", "linkedin", "ats", "job", "cv"],
  },
  {
    slug: "whatsapp-sales-agent",
    keywords: ["whatsapp", "sales", "crm", "receipt", "chat", "order"],
  },
  {
    slug: "lead-generation-pipeline",
    keywords: ["lead", "prospect", "outreach", "email", "pipeline", "b2b"],
  },
  {
    slug: "sales-intelligence-platform",
    keywords: ["analytics", "dashboard", "sales intelligence", "reporting"],
  },
  {
    slug: "content-strategy-engine",
    keywords: ["content", "marketing", "strategy", "blog", "social"],
  },
];

function findMatchingProjects(query: string): Project[] {
  const q = query.toLowerCase();
  const matched: Project[] = [];
  for (const { slug, keywords } of PROJECT_KEYWORDS) {
    if (keywords.some((kw) => q.includes(kw))) {
      const p = projects.find((proj) => proj.slug === slug);
      if (p && !matched.includes(p)) matched.push(p);
    }
  }
  return matched;
}

/* ─── Knowledge base responses ────────────────────────────── */
function buildResponse(input: string): MessageContent[] {
  const q = input.toLowerCase().trim();
  const contents: MessageContent[] = [];

  // Contact
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    contents.push({
      kind: "text",
      text: "We'd love to hear from you.\n\n📧 **thescorpius12@gmail.com**\n🔗 **linkedin.com/company/scorpius-ai**\n\nTell us about your goals — we'll respond with a clear next step, not a sales pitch.",
    });
    return contents;
  }

  // Team / founder
  if (
    q.includes("founder") ||
    q.includes("team") ||
    q.includes("noura") ||
    q.includes("who built") ||
    q.includes("who made")
  ) {
    contents.push({
      kind: "text",
      text: "Scorpius was founded by **Noura Elsaman** — a multidisciplinary engineer combining expertise in AI, computer science, and business to build practical automation solutions.\n\nOur team brings together AI engineers, backend developers, and domain specialists to deliver end-to-end solutions.",
    });
    return contents;
  }

  // Industries
  if (
    q.includes("industr") ||
    q.includes("sector") ||
    q.includes("vertical")
  ) {
    contents.push({
      kind: "text",
      text: "We serve a broad range of industries:\n\n• **Education** — AI tutors, adaptive assessments, learning platforms\n• **Retail & E-commerce** — order automation, WhatsApp commerce, catalog agents\n• **Healthcare** — knowledge assistants, compliance-aware document retrieval\n• **Real Estate** — lead qualification, outreach pipelines\n• **Professional Services** — career intelligence, sales analytics\n• **Government & Tourism** — navigation systems, cultural knowledge bases\n\nEvery solution is custom-built for the client's specific context.",
    });
    return contents;
  }

  // Multi-agent systems
  if (
    q.includes("multi-agent") ||
    q.includes("multi agent") ||
    q.includes("agentic") ||
    q.includes("agent system")
  ) {
    contents.push({
      kind: "text",
      text: "Our multi-agent systems are one of our core differentiators.\n\nWe design **orchestrated AI networks** where specialized agents collaborate — each handling a distinct task such as retrieval, reasoning, communication, or action — coordinated by a central planner.\n\nThis architecture enables:\n• Parallel task execution\n• Fault-tolerant fallback chains\n• Domain-specialized reasoning\n• Seamless tool integration",
    });
    return contents;
  }

  // AI Automation
  if (
    q.includes("automat") ||
    q.includes("workflow") ||
    q.includes("pipeline")
  ) {
    contents.push({
      kind: "text",
      text: "We build **AI-powered workflow automation** that removes bottlenecks and lets your team focus on high-value work.\n\nOur automations are:\n• Source-grounded — always backed by real data\n• Integration-ready — connect to your existing tools\n• Observable — every step is logged and auditable\n• Scalable — from single-user to enterprise-grade",
    });
    return contents;
  }

  // Business Intelligence
  if (
    q.includes("business intelligence") ||
    q.includes("analytics") ||
    q.includes("dashboard") ||
    q.includes("insight")
  ) {
    const proj = projects.find(
      (p) => p.slug === "sales-intelligence-platform"
    );
    contents.push({
      kind: "text",
      text: "We build **AI Business Platforms** that turn raw data into strategic decisions.\n\nOur systems combine real-time analytics, predictive modeling, and intelligent dashboards — designed around your specific KPIs, not generic templates.",
    });
    if (proj) contents.push({ kind: "project-card", project: proj });
    return contents;
  }

  // Services
  if (q.includes("service") || q.includes("what do you") || q.includes("what can you") || q.includes("what does scorpius")) {
    contents.push({
      kind: "text",
      text: "Here's what Scorpius builds:\n\n🤖 **AI Agents** — autonomous reasoning agents for your tools and data\n🗂 **RAG Systems** — retrieval-augmented generation with citations\n⚙️ **Workflow Automation** — removing bottlenecks across your operations\n💬 **WhatsApp Automation** — conversational commerce and support\n📊 **AI Business Platforms** — turning data into smarter decisions\n📚 **Knowledge Assistants** — internal copilots for your documents\n💻 **Custom Software** — modern, scalable web and mobile products\n🛡 **Decision Support** — predictive analytics for every industry",
    });
    return contents;
  }

  // Projects
  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("built") || q.includes("case study")) {
    const visibleProjects = projects.filter((p) => !p.comingSoon).slice(0, 4);
    contents.push({
      kind: "text",
      text: "Here are some of our flagship AI products:",
    });
    contents.push({ kind: "project-list", projects: visibleProjects });
    return contents;
  }

  // Explore AI Solutions
  if (q.includes("explore") || q.includes("ai solution")) {
    contents.push({
      kind: "text",
      text: "Scorpius specializes in end-to-end AI engineering — from architecture design to production deployment.\n\nOur solutions are built on three principles:\n\n✅ **Source-grounded** — no hallucination, every answer backed by real data\n✅ **Integration-first** — works with your existing stack\n✅ **Measurable impact** — every project is evaluated by real outcomes",
    });
    return contents;
  }

  // Keyword-based project matching
  const matched = findMatchingProjects(q);
  if (matched.length === 1) {
    contents.push({
      kind: "text",
      text: `Based on what you described, this Scorpius project might be a strong fit:`,
    });
    contents.push({ kind: "project-card", project: matched[0] });
    return contents;
  }
  if (matched.length > 1) {
    contents.push({
      kind: "text",
      text: "These Scorpius projects are relevant to what you're describing:",
    });
    contents.push({ kind: "project-list", projects: matched });
    return contents;
  }

  // Default
  contents.push({
    kind: "text",
    text: "Thanks for reaching out. We'd be happy to help.\n\nYou can ask us about our **services**, **projects**, **technologies**, **industries** we serve, or how to **contact** us.\n\nAlternatively, describe a business challenge and we'll point you to the right solution.",
  });
  return contents;
}

/* ─── Suggestion handler ──────────────────────────────────── */
function suggestionToQuery(label: string): string {
  const map: Record<string, string> = {
    "Explore AI Solutions": "explore AI solutions",
    "Multi-Agent Systems": "multi-agent systems",
    "AI Automation": "workflow automation",
    "Business Intelligence": "business intelligence analytics",
    "Industries": "which industries do you serve",
    "Contact Scorpius": "contact",
  };
  return map[label] ?? label;
}

/* ─── Text renderer (simple markdown-ish) ─────────────────── */
function RenderText({ text }: { text: string }) {
  // Split by newlines, render **bold** inline
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed text-sm">
      {lines.map((line, i) => {
        if (line === "") return <div key={i} className="h-1" />;
        // Bold segments
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
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
}) {
  const imgSrc =
    project.cover && typeof project.cover === "object"
      ? (project.cover as any).default ?? (project.cover as any).src ?? undefined
      : typeof project.cover === "string"
      ? project.cover
      : undefined;

  return (
    <motion.div
      variants={bubbleVariants}
      className="overflow-hidden rounded-[var(--radius-lg)] border"
      style={{
        border: "1px solid var(--border-accent)",
        background: "linear-gradient(175deg, var(--surface-elevated) 0%, var(--surface) 100%)",
      }}
    >
      {/* Image */}
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
          <span
            className="chip absolute left-3 top-3 text-[10px]"
          >
            {project.category}
          </span>
        </div>
      )}

      {/* Body */}
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
          {project.description}
        </p>

        {/* Tech badges */}
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

        {/* CTA */}
        {!project.comingSoon && (
          <button
            onClick={() => onOpenModal(project)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "var(--cyan)" }}
          >
            View Project
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
          className="h-1.5 w-1.5 rounded-full animate-pulse-glow"
          style={{
            background: "var(--cyan)",
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Props ───────────────────────────────────────────────── */
export interface AiAssistantProps {
  /** Open/close controlled by the parent (Hero logo click) */
  isOpen: boolean;
  onClose: () => void;
  /** Passed through so project cards can open the existing ProjectModal */
  onOpenProject: (p: Project) => void;
}

/* ─── Main component ──────────────────────────────────────── */
export function AiAssistant({ isOpen, onClose, onOpenProject }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgId, setMsgId] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const nextId = () => {
    setMsgId((n) => n + 1);
    return msgId + 1;
  };

  /* Welcome message on first open */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 0,
          role: "assistant",
          content: [
            {
              kind: "text",
              text: "Welcome.\n\nWe build AI-powered products, intelligent automation, enterprise AI systems, and multi-agent solutions.\n\nHow can we help you today?",
            },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

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
      // Slight delay to avoid closing immediately on the logo click
      const t = setTimeout(() => document.addEventListener("mousedown", onClick), 200);
      return () => {
        clearTimeout(t);
        document.removeEventListener("mousedown", onClick);
      };
    }
  }, [isOpen, onClose]);

  const sendMessage = useCallback(
    (userText: string) => {
      if (!userText.trim() || isTyping) return;
      const trimmed = userText.trim();
      setInputValue("");

      const userMsg: Message = {
        id: nextId(),
        role: "user",
        content: [{ kind: "text", text: trimmed }],
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Simulate natural response delay
      const delay = 650 + Math.random() * 400;
      setTimeout(() => {
        const responseContent = buildResponse(trimmed);
        const assistantMsg: Message = {
          id: nextId(),
          role: "assistant",
          content: responseContent,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping, msgId]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleSuggestion = (label: string) => {
    sendMessage(suggestionToQuery(label));
  };

  const showSuggestions =
    messages.length <= 1 && !isTyping;

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
            style={{ background: "rgba(6,17,26,0.55)", backdropFilter: "blur(4px)" }}
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
            aria-label="Scorpius AI Assistant"
            className="fixed right-0 top-0 z-[100] flex h-full w-full flex-col sm:max-w-[420px]"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(32px) saturate(160%)",
              borderLeft: "1px solid var(--border-accent)",
              boxShadow: "-4px 0 40px -8px rgba(0,0,0,0.6), -1px 0 0 rgba(33,184,187,0.12)",
            }}
          >
            {/* ── Header ───────────────────────────────────────── */}
            <div
              className="flex shrink-0 items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                {/* AI status dot */}
                <div
                  className="grid h-8 w-8 place-items-center rounded-full"
                  style={{
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border-accent)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full animate-pulse-glow"
                    style={{ background: "var(--cyan)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Scorpius AI
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--cyan)" }}>
                    Always online
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close AI assistant"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <X style={{ width: 15, height: 15 }} strokeWidth={2} />
              </button>
            </div>

            {/* ── Message thread ────────────────────────────────── */}
            <div
              className="scorpius-scroll flex-1 overflow-y-auto px-5 py-5 space-y-4"
            >
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
                          className="max-w-[88%] rounded-[var(--radius-lg)] px-4 py-3 text-sm leading-relaxed"
                          style={
                            msg.role === "user"
                              ? {
                                  background: "linear-gradient(135deg, rgba(33,184,187,0.22) 0%, rgba(33,184,187,0.12) 100%)",
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
                            onOpenModal={(p) => { onClose(); onOpenProject(p); }}
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
                              onOpenModal={(proj) => { onClose(); onOpenProject(proj); }}
                            />
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  variants={bubbleVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start"
                >
                  <div
                    className="rounded-[var(--radius-lg)] rounded-bl-[4px]"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.35, ...springSnappy } }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {SUGGESTIONS.map(({ Icon, label }) => (
                      <button
                        key={label}
                        onClick={() => handleSuggestion(label)}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
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
                        <Icon style={{ width: 12, height: 12 }} strokeWidth={2} />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Input area ────────────────────────────────────── */}
            <div
              className="shrink-0 px-4 py-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div
                className="flex items-end gap-2 rounded-[var(--radius-lg)] px-4 py-3"
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
                  placeholder="Ask about our services, projects…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-[var(--text-dim)]"
                  style={{
                    color: "var(--text-primary)",
                    maxHeight: "120px",
                    lineHeight: "1.5",
                    fontFamily: "inherit",
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
                  <Send style={{ width: 14, height: 14 }} strokeWidth={2.2} />
                </button>
              </div>
              <p
                className="mt-2 text-center text-[10px]"
                style={{ color: "var(--text-dim)" }}
              >
                Press <kbd className="rounded px-1" style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}>Enter</kbd> to send · <kbd className="rounded px-1" style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}>Shift+Enter</kbd> for new line
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
