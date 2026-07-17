/**
 * Technology group definitions and badge lists keyed by project slug.
 * Used by ProjectModal to render grouped tech sidebar sections.
 */

export type TechGroup = {
  label: string;
  items: string[];
};

export type ProjectTechData = {
  groups: TechGroup[];
  badges: string[];
};

export const projectTechGroups: Record<string, ProjectTechData> = {
  "career-intelligence-platform": {
    badges: ["React", "TypeScript", "GPT-4", "PDF Parsing", "Cloud Storage"],
    groups: [
      { label: "Frontend",        items: ["React", "TypeScript"] },
      { label: "AI",              items: ["LLM Evaluation", "GPT-4"] },
      { label: "Infrastructure",  items: ["PDF Parser", "Cloud Storage"] },
    ],
  },
  "lead-generation-pipeline": {
    badges: ["Python", "OpenAI API", "Web Enrichment", "CRM Integration", "Automation"],
    groups: [
      { label: "Backend",         items: ["Python"] },
      { label: "AI",              items: ["OpenAI API", "AI Web Enrichment"] },
      { label: "Integration",     items: ["CRM Integration", "Automated Workflows", "Data Validation"] },
    ],
  },
  "sales-intelligence-system": {
    badges: ["TypeScript", "AI Enrichment", "Lead Scoring", "CRM Integration"],
    groups: [
      { label: "Backend",         items: ["TypeScript"] },
      { label: "AI",              items: ["AI Enrichment", "Lead Scoring"] },
      { label: "Integration",     items: ["CRM Integration"] },
    ],
  },
  "content-strategy-engine": {
    badges: ["Next.js", "GPT-4", "NLP", "Social Analytics"],
    groups: [
      { label: "Frontend",        items: ["Next.js"] },
      { label: "AI",              items: ["GPT-4", "NLP", "Market Research Algorithms", "Social Analytics"] },
    ],
  },
  "whatsapp-sales-agent": {
    badges: ["WhatsApp API", "Node.js", "GPT-4", "OCR", "CRM"],
    groups: [
      { label: "Backend",         items: ["Node.js"] },
      { label: "AI",              items: ["GPT-4", "Receipt Verification OCR", "Memory Management"] },
      { label: "Integration",     items: ["WhatsApp Business API", "CRM Integration"] },
    ],
  },
  "ai-chat-portfolio": {
    badges: ["React", "RAG", "Vector Search", "LLM Reasoning"],
    groups: [
      { label: "Frontend",        items: ["React", "Framer Motion"] },
      { label: "AI",              items: ["RAG", "LLM Reasoning", "Vector Search", "Conversational AI"] },
    ],
  },
  "restro360": {
    badges: ["React", "Python", "FastAPI", "Multi-Agent AI", "WebSockets"],
    groups: [
      { label: "Frontend",        items: ["React"] },
      { label: "Backend",         items: ["Python", "FastAPI", "WebSockets", "REST APIs"] },
      { label: "AI",              items: ["Multi-Agent Orchestration", "LLMs", "Memory Systems", "AI Workflow Engine"] },
      { label: "Infrastructure",  items: ["Real-Time Automation"] },
    ],
  },
  "nasm": {
    badges: ["AI Agent", "NLP", "Recommendation Engine", "Virtual Tours"],
    groups: [
      { label: "Frontend",        items: ["Web Application"] },
      { label: "AI",              items: ["AI Agent", "Natural Language Processing", "Recommendation Engine"] },
      { label: "Features",        items: ["Interactive Maps", "Virtual Tours"] },
    ],
  },
  "madarekiq": {
    badges: ["Next.js", "TypeScript", "React", "Framer Motion", "i18n"],
    groups: [
      { label: "Frontend",        items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
      { label: "Backend",         items: ["TypeScript"] },
      { label: "Features",        items: ["Internationalization (i18n)", "Responsive Design", "AI-ready Architecture"] },
    ],
  },
  "islamy": {
    badges: ["Kotlin", "Android", "MVVM", "Material Design"],
    groups: [
      { label: "Mobile",          items: ["Kotlin", "Android"] },
      { label: "Architecture",    items: ["MVVM", "Navigation Component", "ViewModel", "LiveData", "View Binding"] },
      { label: "Integration",     items: ["Retrofit", "Gson", "REST APIs"] },
      { label: "UI",              items: ["Material Design", "ConstraintLayout"] },
    ],
  },
  "metro-masr": {
    badges: ["Kotlin", "Jetpack Compose", "Material Design 3", "MVVM"],
    groups: [
      { label: "Mobile",          items: ["Kotlin", "Android", "Jetpack Compose"] },
      { label: "Architecture",    items: ["MVVM", "StateFlow", "Compose Navigation"] },
      { label: "UI",              items: ["Material Design 3", "AnimatedVisibility", "Custom Theming"] },
      { label: "Data",            items: ["Gson"] },
    ],
  },
  "el-raed": {
    badges: ["RAG", "Python", "Next.js", "Agentic AI", "Vector Search"],
    groups: [
      { label: "Frontend",        items: ["Next.js"] },
      { label: "Backend",         items: ["Python"] },
      { label: "AI",              items: ["RAG", "Agentic AI", "LLM Orchestration", "Vector Search"] },
    ],
  },
  "manara": {
    badges: ["RAG", "Arabic NLP", "LangChain", "PostgreSQL", "pgvector"],
    groups: [
      { label: "AI",              items: ["RAG", "Semantic Search", "Arabic NLP", "LangChain"] },
      { label: "Infrastructure",  items: ["PostgreSQL", "pgvector"] },
    ],
  },
  "bayyinah": {
    badges: ["RAG", "Legal NLP", "FastAPI", "React", "LLM Guardrails"],
    groups: [
      { label: "Frontend",        items: ["React"] },
      { label: "Backend",         items: ["FastAPI"] },
      { label: "AI",              items: ["RAG", "Legal NLP", "Vector DB", "LLM Guardrails"] },
    ],
  },
};
