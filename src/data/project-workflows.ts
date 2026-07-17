/**
 * Workflow step definitions keyed by project slug.
 * Used by ProjectModal when a project has no multi-screenshot gallery.
 */

export type WorkflowStep = {
  icon: string;
  title: string;
  desc: string;
};

export const projectWorkflows: Record<string, WorkflowStep[]> = {
  "career-intelligence-platform": [
    { icon: "Upload",      title: "Resume Upload",        desc: "Candidate uploads PDF or LinkedIn data to secure cloud storage" },
    { icon: "FileSearch",  title: "Document Parsing",     desc: "AI extracts structured career data across any format or layout" },
    { icon: "Cpu",         title: "LLM Evaluation",       desc: "Language model scores content quality, tone, and career positioning" },
    { icon: "ShieldCheck", title: "ATS Compatibility",    desc: "System validates against recruiter keyword schemas and formatting rules" },
    { icon: "Lightbulb",   title: "Recommendations",      desc: "Personalised improvements delivered to strengthen the candidate's profile" },
  ],
  "lead-generation-pipeline": [
    { icon: "Upload",      title: "Lead Import",          desc: "Raw company lists imported from CSV or CRM export files" },
    { icon: "CheckSquare", title: "Data Validation",      desc: "Inconsistent records normalised, deduplicated, and flagged" },
    { icon: "Globe",       title: "AI Web Enrichment",    desc: "AI researches each company across the public web in real time" },
    { icon: "Users",       title: "Decision Makers",      desc: "Key contacts identified and verified with LinkedIn and email signals" },
    { icon: "Mail",        title: "Outreach Generation",  desc: "Personalised cold emails generated per prospect and queued" },
    { icon: "Database",    title: "CRM Export",           desc: "Qualified leads structured and exported as CRM-ready records" },
  ],
  "sales-intelligence-system": [
    { icon: "Search",      title: "Company Discovery",    desc: "Platform surfaces companies matching the ideal customer profile" },
    { icon: "Globe",       title: "Website Validation",   desc: "Active websites verified; dead domains and duplicates removed" },
    { icon: "UserCheck",   title: "Contact Verification", desc: "Emails and phones validated and matched to decision-makers" },
    { icon: "Star",        title: "Lead Scoring",         desc: "AI calculates quality scores using firmographic and intent signals" },
    { icon: "Database",    title: "CRM Ready",            desc: "Structured records exported for immediate sales team action" },
  ],
  "content-strategy-engine": [
    { icon: "BarChart2",   title: "Market Research",      desc: "AI analyses competitors, trends, and audience insights at scale" },
    { icon: "Layers",      title: "Content Pillars",      desc: "Strategic themes generated from synthesised market signals" },
    { icon: "Calendar",    title: "Publishing Calendar",  desc: "Multi-platform schedule built automatically from the content plan" },
    { icon: "Edit3",       title: "Caption & Hooks",      desc: "Platform-specific copy, hooks, and CTAs generated per post" },
    { icon: "Zap",         title: "Creative Direction",   desc: "Visual tone and format recommendations delivered instantly" },
  ],
  "whatsapp-sales-agent": [
    { icon: "MessageCircle", title: "Customer Message",     desc: "Text, voice, or image received directly through WhatsApp Business" },
    { icon: "Cpu",           title: "Intent Detection",     desc: "AI understands the customer's need in natural conversational language" },
    { icon: "ShoppingCart",  title: "Product Match",        desc: "Relevant products recommended from the live catalogue with context" },
    { icon: "FileSearch",    title: "Receipt Verification", desc: "OCR analyses uploaded payment receipts and confirms authenticity" },
    { icon: "CheckCircle2",  title: "Order Confirmed",      desc: "Transaction confirmed, CRM updated, and customer notified" },
  ],
  "restro360": [
    { icon: "MessageCircle", title: "Customer Request",     desc: "Voice, text, or image arrives from any customer channel" },
    { icon: "Route",         title: "Agent Routing",        desc: "Orchestrator dispatches to the correct specialist agent" },
    { icon: "Cpu",           title: "Agent Execution",      desc: "Specialist agent handles the domain task fully autonomously" },
    { icon: "Database",      title: "Memory Update",        desc: "Context and conversation history persisted for continuity" },
    { icon: "CheckCircle2",  title: "Response Delivered",   desc: "Customer receives a coherent, accurate answer instantly" },
  ],
  "islamy": [
    { icon: "MapPin",        title: "Location Detected",    desc: "App reads device location for accurate prayer time calculation" },
    { icon: "Clock",         title: "Prayer Times",         desc: "Daily schedule computed from verified astronomical methods" },
    { icon: "BookOpen",      title: "Daily Azkar",          desc: "Morning and evening dhikr presented with contextual reminders" },
    { icon: "CheckSquare",   title: "Prayer Tracker",       desc: "User logs completed prayers for daily spiritual accountability" },
    { icon: "BarChart2",     title: "Spiritual Dashboard",  desc: "Weekly progress and streaks displayed in a clean summary" },
  ],
  "metro-masr": [
    { icon: "MapPin",        title: "Station Selection",    desc: "User selects departure and destination from the full station list" },
    { icon: "Route",         title: "Graph Search",         desc: "BFS algorithm computes the optimal path through the metro network" },
    { icon: "Shuffle",       title: "Transfer Detection",   desc: "Line changes identified and highlighted clearly in the result" },
    { icon: "Ticket",        title: "Fare Calculation",     desc: "Exact ticket price computed automatically from station count" },
    { icon: "TrainFront",    title: "Journey Summary",      desc: "Route, duration, fare, and transfers in one clean view" },
  ],
  "el-raed": [
    { icon: "Upload",        title: "Curriculum Upload",    desc: "Instructor uploads course material as the AI knowledge source" },
    { icon: "Database",      title: "Vector Indexing",      desc: "Content chunked, embedded, and indexed for semantic retrieval" },
    { icon: "MessageCircle", title: "Student Question",     desc: "Learner asks any question in natural language at any hour" },
    { icon: "Search",        title: "RAG Retrieval",        desc: "Relevant passages retrieved exclusively from course material" },
    { icon: "BookOpen",      title: "Cited Answer",         desc: "LLM generates a grounded response with source citations" },
  ],
  "manara": [
    { icon: "User",          title: "Business Profile",     desc: "User describes their activity type, structure, and needs" },
    { icon: "Search",        title: "Regulatory Search",    desc: "System retrieves relevant official Egyptian legal sources" },
    { icon: "FileText",      title: "Answer Generation",    desc: "Response crafted in plain Egyptian Arabic with inline citations" },
    { icon: "ListChecks",    title: "Step-by-Step Guide",   desc: "Complex procedures broken into clear, sequenced action steps" },
    { icon: "ShieldCheck",   title: "Verified Guidance",    desc: "Every claim traceable back to its official source document" },
  ],
  "bayyinah": [
    { icon: "MessageCircle", title: "Legal Question",       desc: "User asks in natural conversational Arabic — no legal knowledge required" },
    { icon: "Layers",        title: "Domain Routing",       desc: "Query classified into the correct branch of Egyptian law" },
    { icon: "Search",        title: "Legal Retrieval",      desc: "Precise articles retrieved from the statutory database" },
    { icon: "FileText",      title: "Cited Guidance",       desc: "Plain-language explanation with article-level references" },
    { icon: "ShieldCheck",   title: "Guardrails Applied",   desc: "Out-of-scope questions refused gracefully and safely" },
  ],
};
