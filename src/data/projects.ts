import elraedCover from "@/assets/project-elraed.jpg";
import manaraCover from "@/assets/project-manara.jpg";
import bayyinahCover from "@/assets/project-bayyinah.jpg";
import restro360Workflow from "@/assets/restro360-workflow.png";
import nasmHero from "@/assets/nasm-Screenshot_1614.png";
import nasmMap from "@/assets/nasm-Screenshot_1615.png";
import nasmAssistant from "@/assets/nasm-Screenshot_1617.png";
import nasmFloorPlans from "@/assets/nasm-Screenshot_1619.png";
import nasmTour1 from "@/assets/nasm-Screenshot_1620.png";
import nasmTour2 from "@/assets/nasm-Screenshot_1621.png";
import islamyScreens from "@/assets/islamy-screens.png";
import metroMasrHero from "@/assets/metro-masr-hero.png";
import madarekiqHero from "@/assets/madarekiq-hero.png";
import madarekiqHowItWorks from "@/assets/madarekiq-how-it-works.png";
import madarekiqCta from "@/assets/madarekiq-cta.png";
import madarekiqAssessments from "@/assets/madarekiq-assessments.png";
import madarekiqArabicHero from "@/assets/madarekiq-arabic-hero.png";
import aichatContact from "@/assets/aichat-contact.png";
import aichatSkills from "@/assets/aichat-skills.png";
import aichatProject from "@/assets/aichat-project.png";
import whatsappSalesAgentHero from "@/assets/whatsapp-sales-agent-hero.png";
import leadGenerationPipelineHero from "@/assets/lead-generation-pipeline-hero.png";
import careerIntelligenceHero from "@/assets/career-intelligence-hero.png";
import salesIntelligenceHero from "@/assets/sales-intelligence-hero.jpeg";
import contentStrategyEngineHero from "@/assets/content-strategy-engine-hero.png";




export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string[];
  cover?: string;
  /** When true, card renders as a "Coming Soon" placeholder and modal is disabled. */
  comingSoon?: boolean;
  /** Optional accent for placeholder covers, degrees for the gradient hue rotation. */
  accentHue?: number;
  gallery: { caption: string; src?: string; lang?: "en" | "ar" }[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  results: string[];
  roadmap: string[];
  /** Optional CTA override for the project modal. */
  cta?: string;
  /** Optional workflow steps — renders as animated connected cards in the modal. */
  workflow?: { icon: string; title: string; desc: string }[];
  /** Optional architecture flow nodes — renders as connected node diagram. */
  architecture?: { icon: string; title: string }[];
  /** Optional floating tech badges visualization. */
  techBadges?: string[];
  /** Optional grouped technology sections { label, items }[] for the modal sidebar. */
  techGroups?: { label: string; items: string[] }[];

  /** Optional Arabic translation. When present, modal shows a language toggle. */
  i18n?: {
    ar: {
      tagline: string;
      category: string;
      overview: string;
      problem: string;
      solution: string;
      features: string[];
      challenges: string[];
      results: string[];
      roadmap: string[];
      gallery?: string[];
      cta?: string;
      workflow?: { title: string; desc: string }[];
      architecture?: { title: string }[];
    };
  };
};

export const projects: Project[] = [
  {
    slug: "career-intelligence-platform",
    title: "Career Intelligence Platform",
    tagline: "AI-powered résumé & LinkedIn optimization for job seekers",
    category: "AI",
    description:
      "An AI-powered Career Intelligence Platform that helps job seekers optimize their résumés and LinkedIn profiles through intelligent analysis, ATS evaluation, and personalized career recommendations.",
    technologies: [
      "React",
      "TypeScript",
      "LLM Evaluation",
      "PDF Parser",
      "Cloud Storage",
    ],
    cover: careerIntelligenceHero,
    gallery: [],
    overview:
      "Career Intelligence Platform is an AI-powered career optimization platform designed to help professionals improve their résumés and LinkedIn profiles. The system securely processes uploaded résumés and LinkedIn data, extracts structured career information, evaluates professional content using Large Language Models, analyzes ATS compatibility, and generates personalized recommendations that improve interview readiness and recruiter visibility.",
    problem:
      "Many qualified candidates struggle to secure interviews because their résumés are poorly structured, lack ATS optimization, or fail to effectively communicate their experience and skills. Manual résumé reviews are inconsistent, time-consuming, and often inaccessible.",
    solution:
      "The platform automates résumé and LinkedIn evaluation using AI-powered language models. It analyzes formatting, content quality, ATS compatibility, technical skills, professional experience, and career positioning, then provides personalized recommendations that help candidates strengthen their professional profiles and improve hiring outcomes.",
    features: [
      "AI Resume Analysis",
      "LinkedIn Profile Evaluation",
      "ATS Compatibility Assessment",
      "Skills Gap Detection",
      "Professional Experience Analysis",
      "Resume Parsing",
      "Personalized Career Recommendations",
      "Secure Document Processing",
      "Cloud Document Storage",
      "Intelligent Career Insights",
    ],
    challenges: [
      "Reliably parsing résumés across diverse formats, layouts, and languages",
      "Evaluating professional content with LLMs while maintaining consistency and objectivity",
      "Assessing ATS compatibility against varied recruiter systems and keyword schemas",
      "Securely handling sensitive career documents through cloud storage and processing pipelines",
    ],
    results: [
      "Delivered consistent, AI-driven résumé and LinkedIn evaluations at scale",
      "Improved candidate interview readiness through actionable recommendations",
      "Increased ATS pass-through rates via targeted formatting and keyword guidance",
      "Enabled accessible, on-demand career reviews without manual reviewer bottlenecks",
    ],
    roadmap: [
      "Job-description matching with tailored résumé rewrites",
      "Interview preparation assistant with role-specific question banks",
      "Recruiter-facing analytics dashboard for candidate pipelines",
      "Multi-language résumé evaluation and localization support",
    ],
    cta: "Let's build your intelligent solution.",
    i18n: {
      ar: {
        tagline: "منصة ذكية لتحسين السيرة الذاتية وملف LinkedIn للباحثين عن عمل",
        category: "الذكاء الاصطناعي",
        overview:
          "منصة Career Intelligence هي منصة تحسين مهني مدعومة بالذكاء الاصطناعي مصممة لمساعدة المحترفين على تحسين سيرهم الذاتية وملفاتهم على LinkedIn. يقوم النظام بمعالجة السير الذاتية وبيانات LinkedIn المرفوعة بأمان، ويستخرج معلومات مهنية منظمة، ويقيّم المحتوى المهني باستخدام نماذج اللغة الكبيرة، ويحلل توافق ATS، ويولد توصيات مخصصة تعزز الجاهزية للمقابلات وظهور المرشح أمام المسؤولين.",
        problem:
          "يعاني الكثير من المرشحين المؤهلين من صعوبة الحصول على مقابلات لأن سيرهم الذاتية غير منظمة بشكل جيد أو تفتقر إلى تحسين ATS أو تفشل في إيصال خبراتهم ومهاراتهم بشكل فعال. مراجعات السير الذاتية اليدوية غير متسقة، وتستغرق وقتاً طويلاً، وغالباً ما يصعب الوصول إليها.",
        solution:
          "تقوم المنصة بأتمتة تقييم السير الذاتية وملفات LinkedIn باستخدام نماذج لغة مدعومة بالذكاء الاصطناعي. تحلل التنسيق وجودة المحتوى وتوافق ATS والمهارات التقنية والخبرة المهنية والتموضع المهني، ثم تقدم توصيات مخصصة تساعد المرشحين على تعزيز ملفاتهم المهنية وتحسين نتائج التوظيف.",
        features: [
          "تحليل السيرة الذاتية بالذكاء الاصطناعي",
          "تقييم ملف LinkedIn",
          "تقييم توافق ATS",
          "اكتشاف فجوات المهارات",
          "تحليل الخبرة المهنية",
          "تحليل بنية السيرة الذاتية",
          "توصيات مهنية مخصصة",
          "معالجة آمنة للمستندات",
          "تخزين المستندات على السحابة",
          "رؤى مهنية ذكية",
        ],
        challenges: [
          "تحليل السير الذاتية بشكل موثوق عبر تنسيقات وتخطيطات ولغات متنوعة",
          "تقييم المحتوى المهني باستخدام نماذج اللغة مع الحفاظ على الاتساق والموضوعية",
          "تقييم توافق ATS مقابل أنظمة توظيف ومخططات كلمات مفتاحية متنوعة",
          "التعامل بأمان مع المستندات المهنية الحساسة عبر التخزين والمعالجة السحابية",
        ],
        results: [
          "تقديم تقييمات متسقة للسيرة الذاتية وLinkedIn مدعومة بالذكاء الاصطناعي على نطاق واسع",
          "تحسين جاهزية المرشحين للمقابلات من خلال توصيات قابلة للتنفيذ",
          "زيادة معدلات اجتياز ATS عبر إرشادات تنسيق وكلمات مفتاحية مستهدفة",
          "تمكين مراجعات مهنية متاحة عند الطلب دون اختناقات المراجعة اليدوية",
        ],
        roadmap: [
          "مطابقة الوصف الوظيفي مع إعادة كتابة مخصصة للسيرة الذاتية",
          "مساعد تحضير للمقابلات مع بنوك أسئلة خاصة بكل دور",
          "لوحة تحليلات للمسؤولين لمتابعة قنوات المرشحين",
          "تقييم السيرة الذاتية بلغات متعددة ودعم الترجمة",
        ],
        cta: "لنبنِ حل التوظيف الذكي القادم.",
      },
    },
  },
  {
    slug: "lead-generation-pipeline",
    title: "Lead Generation Pipeline",
    tagline: "AI-powered Lead Generation Automation platform",
    category: "Automation",
    description:
      "An AI-powered Lead Generation Automation platform that streamlines the complete B2B prospecting lifecycle—from importing raw business data to AI-powered company enrichment, decision-maker discovery, personalized outreach generation, and CRM-ready lead management.",
    technologies: [
      "Python",
      "OpenAI API",
      "AI Web Enrichment",
      "CRM Integration",
      "Automated Workflows",
      "Data Validation",
    ],
    cover: leadGenerationPipelineHero,
    gallery: [],
    overview:
      "Lead Generation Pipeline is an enterprise AI automation platform built to automate the entire B2B sales prospecting process. The system imports company datasets, validates business information, enriches records using AI-powered web research, identifies decision-makers, normalizes contact information, generates personalized cold emails, and prepares structured CRM-ready leads through an intelligent automated workflow.",
    problem:
      "Sales teams spend countless hours manually researching companies, validating contact information, identifying decision-makers, and preparing personalized outreach. This repetitive workflow slows sales operations, reduces efficiency, and limits scalability.",
    solution:
      "Lead Generation Pipeline automates the complete prospecting lifecycle using AI-powered enrichment and workflow automation. The platform transforms raw company lists into qualified, CRM-ready sales opportunities while significantly reducing manual effort and improving outreach quality.",
    features: [
      "Automated Lead Import",
      "AI Company Research",
      "Business Data Enrichment",
      "Decision Maker Discovery",
      "Contact Information Validation",
      "Personalized Cold Email Generation",
      "CRM Integration",
      "Automated Workflow Execution",
      "Error Handling",
      "AI-Powered Prospect Qualification",
    ],
    challenges: [
      "Validating and normalizing inconsistent company and contact data at scale",
      "Orchestrating AI web enrichment without exceeding rate limits or cost budgets",
      "Generating personalized outreach that remains authentic and context-aware",
      "Integrating reliably with diverse CRM systems and lead schemas",
    ],
    results: [
      "Reduced manual prospecting effort by automating data import, research, and enrichment",
      "Improved lead quality through AI-powered validation and decision-maker identification",
      "Accelerated sales outreach with personalized cold emails generated automatically",
      "Created a scalable CRM-ready pipeline for B2B lead management",
    ],
    roadmap: [
      "Real-time lead scoring and prospect prioritization",
      "Multi-channel outreach including LinkedIn and email sequences",
      "Advanced analytics dashboard for pipeline performance",
      "Integration with additional CRM and sales engagement platforms",
    ],
    cta: "Let's Automate Sales.",
    i18n: {
      ar: {
        tagline: "منصة أتمتة توليد العملاء المحتملين المدعومة بالذكاء الاصطناعي",
        category: "الأتمتة",
        overview:
          "Lead Generation Pipeline هي منصة أتمتة مؤسسية مدعومة بالذكاء الاصطناعي، تم بناؤها لأتمتة عملية البحث عن العملاء المحتملين B2B بالكامل. يستورد النظام مجموعات بيانات الشركات، ويتحقق من معلومات الأعمال، ويغني السجلات باستخدام البحث على الويب المدعوم بالذكاء الاصطناعي، ويحدد صناع القرار، وينسق معلومات الاتصال، ويولد رسائل بريد إلكتروني باردة مخصصة، ويحضر عملاء محتملين جاهزين لإدارة علاقات العملاء (CRM) من خلال سير عمل آلي ذكي.",
        problem:
          "تقضي فرق المبيعات ساعات لا تحصى في البحث اليدوي عن الشركات، والتحقق من معلومات الاتصال، وتحديد صناع القرار، وإعداد التواصل المخصص. يبطئ سير العمل المتكرر عمليات المبيعات ويقلل الكفاءة ويحد من القابلية للتوسع.",
        solution:
          "يقوم Lead Generation Pipeline بأتمتة دورة حياة البحث عن العملاء المحتملين بالكامل باستخدام الإثراء المدعوم بالذكاء الاصطناعي وأتمتة سير العمل. تحول المنصة قوائم الشركات الخام إلى فرص مبيعات مؤهلة وجاهزة لإدارة علاقات العملاء (CRM) مع تقليل الجهد اليدوي بشكل كبير وتحسين جودة التواصل.",
        features: [
          "استيراد العملاء المحتملين تلقائياً",
          "البحث عن الشركات بالذكاء الاصطناعي",
          "إثراء بيانات الأعمال",
          "اكتشاف صناع القرار",
          "التحقق من معلومات الاتصال",
          "إنشاء رسائل بريد إلكتروني باردة مخصصة",
          "تكامل CRM",
          "تنفيذ سير العمل الآلي",
          "معالجة الأخطاء",
          "التأهيل الذكي للعملاء المحتملين",
        ],
        challenges: [
          "التحقق من بيانات الشركات ومعلومات الاتصال غير المتسقة وتوحيدها على نطاق واسع",
          "تنظيم الإثراء الذكي للويب دون تجاوز حدود الاستخدام أو الميزانية",
          "إنشاء رسائل تواصل مخصصة تظل أصلية وواعية بالسياق",
          "التكامل بموثوقية مع أنظمة CRM ومخططات العملاء المتنوعة",
        ],
        results: [
          "تقليل الجهد اليدوي في البحث عن العملاء المحتملين من خلال أتمتة الاستيراد والبحث والإثراء",
          "تحسين جودة العملاء المحتملين من خلال التحقق بالذكاء الاصطناعي وتحديد صناع القرار",
          "تسريع التواصل المبيعاتي من خلال رسائل بريد إلكتروني باردة مولدة تلقائياً",
          "إنشاء خط أنابيب قابل للتوسع لإدارة العملاء المحتملين B2B وجاهز لـ CRM",
        ],
        roadmap: [
          "تقييم العملاء المحتملين وتحديد أولوياتهم في الوقت الفعلي",
          "التواصل عبر قنوات متعددة بما في ذلك LinkedIn وتسلسلات البريد الإلكتروني",
          "لوحة تحكم تحليلات متقدمة لأداء خط الأنابيب",
          "التكامل مع أنظمة CRM ومنصات المشاركة المبيعاتية الإضافية",
        ],
        cta: "دعونا نؤتمت المبيعات.",
      },
    },
  },
  {
    slug: "sales-intelligence-system",
    title: "Sales Intelligence System",
    tagline: "AI-powered B2B lead discovery, verification & CRM enrichment",
    category: "Automation",
    description:
      "An AI-powered Sales Intelligence platform that automates B2B lead discovery, verification, enrichment, and CRM preparation. The system aggregates company information from multiple sources, validates business data, identifies decision-makers, enriches contact profiles, and produces a structured CRM-ready database that helps sales teams prioritize qualified prospects and accelerate outreach.",
    technologies: [
      "TypeScript",
      "AI Enrichment",
      "CRM Integration",
      "Lead Scoring",
    ],
    cover: salesIntelligenceHero,
    gallery: [],
    overview:
      "Sales Intelligence System is an AI-powered platform designed to transform raw business information into qualified, actionable sales intelligence. The platform automatically discovers companies, validates websites, identifies decision-makers, enriches business profiles with verified contact information, and prepares structured CRM-ready records for sales teams. By combining AI-powered enrichment, verification, and lead qualification, the platform significantly reduces manual prospecting while improving lead quality and sales efficiency.",
    problem:
      "Sales teams often spend hours manually researching companies, validating contact information, identifying key decision-makers, and organizing data before starting outreach. This repetitive process slows business development and reduces sales productivity.",
    solution:
      "Sales Intelligence System centralizes the entire lead intelligence workflow. The platform automatically enriches company profiles, validates business information, verifies contacts, calculates lead quality indicators, and prepares structured CRM-ready records that enable faster and more effective B2B prospecting.",
    features: [
      "Company Discovery",
      "AI Business Enrichment",
      "Contact Verification",
      "Decision Maker Identification",
      "Email & Phone Discovery",
      "LinkedIn Profile Matching",
      "Website Validation",
      "CRM Data Enrichment",
      "Lead Qualification",
      "Lead Scoring",
      "Outreach Tracking",
      "Sales Intelligence Dashboard",
    ],
    challenges: [
      "Aggregating and reconciling company data across multiple heterogeneous sources",
      "Validating websites, emails, and phone numbers at scale while minimizing false positives",
      "Accurately identifying decision-makers and matching them to verified LinkedIn profiles",
      "Producing CRM-ready records that fit diverse sales workflows and pipeline schemas",
    ],
    results: [
      "Automated end-to-end B2B lead discovery, verification, and enrichment",
      "Reduced manual prospecting effort and accelerated sales outreach cycles",
      "Improved lead quality through AI-powered qualification and scoring",
      "Delivered structured, CRM-ready datasets that sales teams can action immediately",
    ],
    roadmap: [
      "Real-time enrichment triggers directly inside CRM records",
      "Advanced lead scoring with intent and firmographic signals",
      "Multi-channel outreach orchestration and sequencing",
      "Analytics dashboard for pipeline performance and conversion insights",
    ],
    cta: "Let's Automate Sales",
    i18n: {
      ar: {
        tagline: "منصة ذكية لاكتشاف العملاء المحتملين والتحقق منهم وإثراء بيانات CRM",
        category: "الأتمتة",
        overview:
          "Sales Intelligence System هي منصة مدعومة بالذكاء الاصطناعي مصممة لتحويل معلومات الأعمال الخام إلى استخبارات مبيعات مؤهلة وقابلة للتنفيذ. تكتشف المنصة الشركات تلقائياً، وتتحقق من المواقع الإلكترونية، وتحدد صناع القرار، وتُثري ملفات الأعمال بمعلومات اتصال موثقة، وتُعد سجلات جاهزة لأنظمة CRM لفرق المبيعات. من خلال الجمع بين الإثراء بالذكاء الاصطناعي والتحقق وتأهيل العملاء المحتملين، تقلل المنصة الجهد اليدوي بشكل كبير مع تحسين جودة العملاء المحتملين وكفاءة المبيعات.",
        problem:
          "تقضي فرق المبيعات ساعات طويلة في البحث اليدوي عن الشركات والتحقق من معلومات الاتصال وتحديد صناع القرار وتنظيم البيانات قبل بدء التواصل. هذه العملية المتكررة تبطئ تطوير الأعمال وتقلل من إنتاجية المبيعات.",
        solution:
          "يوحّد Sales Intelligence System سير عمل استخبارات العملاء المحتملين بالكامل. تُثري المنصة تلقائياً ملفات الشركات، وتتحقق من معلومات الأعمال، وتوثق جهات الاتصال، وتحسب مؤشرات جودة العميل المحتمل، وتُعد سجلات منظمة جاهزة لـ CRM تتيح بحثاً أسرع وأكثر فاعلية عن عملاء B2B.",
        features: [
          "اكتشاف الشركات",
          "إثراء الأعمال بالذكاء الاصطناعي",
          "التحقق من جهات الاتصال",
          "تحديد صناع القرار",
          "اكتشاف البريد الإلكتروني والهاتف",
          "مطابقة ملفات LinkedIn",
          "التحقق من المواقع الإلكترونية",
          "إثراء بيانات CRM",
          "تأهيل العملاء المحتملين",
          "تقييم العملاء المحتملين",
          "متابعة التواصل",
          "لوحة استخبارات المبيعات",
        ],
        challenges: [
          "تجميع بيانات الشركات من مصادر متعددة ومتباينة والتوفيق بينها",
          "التحقق من المواقع والبريد الإلكتروني وأرقام الهواتف على نطاق واسع مع تقليل الأخطاء",
          "تحديد صناع القرار بدقة ومطابقتهم بملفات LinkedIn موثقة",
          "إنتاج سجلات جاهزة لـ CRM تناسب سير عمل المبيعات ومخططات القنوات المتنوعة",
        ],
        results: [
          "أتمتة كاملة لاكتشاف العملاء المحتملين B2B والتحقق منهم وإثرائهم",
          "تقليل الجهد اليدوي في البحث وتسريع دورات التواصل المبيعاتي",
          "تحسين جودة العملاء المحتملين من خلال التأهيل والتقييم بالذكاء الاصطناعي",
          "تقديم مجموعات بيانات منظمة جاهزة لـ CRM يمكن لفرق المبيعات استخدامها فوراً",
        ],
        roadmap: [
          "محفزات إثراء فورية داخل سجلات CRM",
          "تقييم متقدم للعملاء المحتملين بإشارات النية والبيانات الشركاتية",
          "تنظيم التواصل عبر قنوات متعددة وتسلسلات المبيعات",
          "لوحة تحليلات لأداء خط الأنابيب ورؤى التحويل",
        ],
        cta: "لنبنِ منصة المبيعات الذكية القادمة.",
      },
    },
  },
  {
    slug: "content-strategy-engine",
    title: "Content Strategy Engine",
    tagline: "AI-powered content strategy & multi-platform social planning",
    category: "AI",
    description:
      "An AI-powered Content Strategy platform that transforms market research into actionable, data-driven social media strategies. The system automatically analyzes market insights, identifies content opportunities, and generates complete multi-platform content plans including content pillars, post ideas, engaging hooks, captions, publishing schedules, and creative directions.",
    technologies: [
      "Next.js",
      "GPT-4",
      "NLP",
      "Market Research Algorithms",
      "Social Analytics",
    ],
    cover: contentStrategyEngineHero,
    gallery: [],
    overview:
      "Content Strategy Engine is an AI-powered marketing intelligence platform that converts market research into structured content strategies. The platform analyzes business objectives, market trends, audience insights, and competitive positioning before automatically generating comprehensive social media plans tailored for multiple platforms. Instead of manually brainstorming content, businesses receive complete publishing calendars with strategic content pillars, engaging hooks, captions, creative recommendations, and posting schedules that align with their marketing goals.",
    problem:
      "Creating high-quality content consistently requires significant time spent researching competitors, identifying trends, planning content calendars, writing captions, and maintaining publishing consistency. Marketing teams often struggle to scale this process efficiently.",
    solution:
      "Content Strategy Engine automates the complete content planning workflow using AI. By combining market research, NLP, and large language models, the platform generates structured marketing strategies, personalized content calendars, engaging copy, and platform-specific recommendations that significantly reduce planning time while improving content quality.",
    features: [
      "AI Market Research",
      "Competitor Analysis",
      "Content Pillar Generation",
      "Multi-Platform Content Planning",
      "Social Media Calendar Generation",
      "Caption Generation",
      "Hook & CTA Generation",
      "Creative Direction Suggestions",
      "AI-Powered Marketing Insights",
      "Content Strategy Automation",
    ],
    challenges: [
      "Synthesizing diverse market research signals into coherent content pillars",
      "Generating platform-specific copy that matches each channel's tone and format",
      "Maintaining brand voice consistency across automated, high-volume output",
      "Aligning AI-generated calendars with real marketing objectives and seasonality",
    ],
    results: [
      "Automated end-to-end content strategy from research to publishing calendar",
      "Reduced manual planning time while improving content quality and consistency",
      "Delivered multi-platform content plans tailored to audience and channel",
      "Enabled marketing teams to scale output without sacrificing strategic depth",
    ],
    roadmap: [
      "Direct publishing integrations with major social platforms",
      "Performance analytics feedback loop for continuous strategy refinement",
      "Brand voice fine-tuning per client and campaign",
      "Visual asset generation aligned with each content plan",
    ],
    cta: "Let's build an intelligent marketing.",
    i18n: {
      ar: {
        tagline: "منصة ذكية لاستراتيجية المحتوى والتخطيط لمنصات التواصل الاجتماعي",
        category: "الذكاء الاصطناعي",
        overview:
          "Content Strategy Engine هي منصة ذكاء تسويقي مدعومة بالذكاء الاصطناعي تحوّل أبحاث السوق إلى استراتيجيات محتوى منظمة. تحلل المنصة أهداف الأعمال واتجاهات السوق ورؤى الجمهور والتموضع التنافسي، ثم تولد تلقائياً خططاً شاملة لوسائل التواصل الاجتماعي مخصصة لمنصات متعددة. بدلاً من العصف الذهني اليدوي، تحصل الشركات على تقاويم نشر كاملة مع ركائز محتوى استراتيجية وجاذبيات ونصوص وتوصيات إبداعية وجداول نشر تتماشى مع أهدافها التسويقية.",
        problem:
          "يتطلب إنشاء محتوى عالي الجودة بشكل متسق وقتاً كبيراً في البحث عن المنافسين وتحديد الاتجاهات وتخطيط تقاويم المحتوى وكتابة النصوص والحفاظ على انتظام النشر. غالباً ما تواجه فرق التسويق صعوبة في توسيع هذه العملية بكفاءة.",
        solution:
          "يقوم Content Strategy Engine بأتمتة سير عمل تخطيط المحتوى بالكامل باستخدام الذكاء الاصطناعي. من خلال الجمع بين أبحاث السوق ومعالجة اللغة الطبيعية ونماذج اللغة الكبيرة، تولد المنصة استراتيجيات تسويقية منظمة، وتقاويم محتوى مخصصة، ونصوصاً جذابة، وتوصيات خاصة بكل منصة، مما يقلل بشكل كبير وقت التخطيط ويحسن جودة المحتوى.",
        features: [
          "أبحاث السوق بالذكاء الاصطناعي",
          "تحليل المنافسين",
          "توليد ركائز المحتوى",
          "تخطيط المحتوى متعدد المنصات",
          "توليد تقويم وسائل التواصل الاجتماعي",
          "توليد النصوص",
          "توليد الجاذبيات والدعوات للعمل",
          "اقتراحات التوجيه الإبداعي",
          "رؤى تسويقية مدعومة بالذكاء الاصطناعي",
          "أتمتة استراتيجية المحتوى",
        ],
        challenges: [
          "توليف إشارات أبحاث السوق المتنوعة في ركائز محتوى متماسكة",
          "توليد نصوص خاصة بكل منصة تتناسب مع نبرتها وصيغتها",
          "الحفاظ على اتساق صوت العلامة التجارية عبر مخرجات آلية كثيفة",
          "مواءمة التقاويم المولدة بالذكاء الاصطناعي مع الأهداف التسويقية الفعلية والمواسم",
        ],
        results: [
          "أتمتة كاملة لاستراتيجية المحتوى من البحث إلى تقويم النشر",
          "تقليل وقت التخطيط اليدوي مع تحسين جودة المحتوى واتساقه",
          "تقديم خطط محتوى متعددة المنصات مخصصة للجمهور والقناة",
          "تمكين فرق التسويق من توسيع الإنتاج دون التضحية بالعمق الاستراتيجي",
        ],
        roadmap: [
          "تكاملات نشر مباشرة مع منصات التواصل الاجتماعي الرئيسية",
          "حلقة تغذية راجعة لتحليلات الأداء لتحسين الاستراتيجية باستمرار",
          "ضبط دقيق لصوت العلامة التجارية لكل عميل وحملة",
          "توليد أصول بصرية متوافقة مع كل خطة محتوى",
        ],
        cta: "لنبنِ منصة تسويقية ذكية لأعمالك.",
      },
    },
  },
  {
    slug: "whatsapp-sales-agent",
    title: "WhatsApp Sales Agent",
    tagline: "AI-Powered Conversational Commerce for WhatsApp",
    category: "Automation",
    description:
      "An AI-powered WhatsApp Sales Agent that automates customer engagement, product consultations, order assistance, and payment verification through natural conversations.",
    technologies: [
      "WhatsApp Business API",
      "Node.js",
      "GPT-4",
      "CRM Integration",
      "Receipt Verification OCR",
      "Memory Management",
    ],
    cover: whatsappSalesAgentHero,
    gallery: [],
    overview:
      "WhatsApp Sales Agent is an AI-powered conversational commerce platform that enables businesses to automate customer interactions directly through WhatsApp. Customers can communicate using text, voice messages, or images while the AI understands their intent, recommends products, answers questions, guides purchases, and verifies uploaded payment receipts before confirming transactions. By integrating CRM systems, conversation memory, and intelligent automation, the platform delivers a seamless end-to-end sales experience.",
    problem:
      "Businesses receive hundreds of customer inquiries through WhatsApp every day, making it difficult to respond consistently, qualify leads, verify payments, and manage customer information manually. This often leads to slower response times, operational overhead, and lost sales opportunities.",
    solution:
      "An AI-powered sales assistant that automates the entire customer journey inside WhatsApp. The system understands natural language, processes voice and image messages, retrieves customer information from CRM systems, maintains conversation history, recommends products, validates uploaded payment receipts using OCR, and assists businesses in delivering fast, personalized, and scalable customer support.",
    features: [
      "AI-powered WhatsApp conversations",
      "Text, voice, and image understanding",
      "Intelligent product recommendations",
      "CRM integration & customer history",
      "Automated payment receipt verification",
      "OCR-based receipt analysis",
      "Personalized customer interactions",
      "End-to-end sales workflow automation",
    ],
    challenges: [
      "Handling mixed-mode input (text, voice, images) reliably within WhatsApp threads",
      "Integrating with diverse CRM systems and payment workflows",
      "Verifying payment receipts accurately using OCR while preventing fraud",
      "Maintaining conversational context across long-running sales cycles",
    ],
    results: [
      "Reduced response time for customer inquiries through automated WhatsApp conversations",
      "Streamlined lead qualification and product recommendations at scale",
      "Improved payment verification accuracy with OCR receipt analysis",
      "Created a unified CRM-aware view of every customer conversation",
    ],
    roadmap: [
      "Voice-first WhatsApp shopping experience",
      "Multi-language support for regional markets",
      "Advanced analytics on sales conversations and conversion funnels",
      "Integration with e-commerce platforms and payment gateways",
    ],
    cta: "Let's build your AI solution.",
  },
  {
    slug: "ai-chat-portfolio",
    title: "AI Chat Portfolio",

    tagline: "Conversational AI Assistant for Personal Branding",
    category: "AI",
    description:
      "An intelligent conversational portfolio that lets visitors explore experience, projects, skills, and certifications through natural language — powered by Retrieval-Augmented Generation and LLM reasoning.",
    technologies: [
      "React",
      "RAG",
      "LLM Reasoning",
      "Vector Search",
      "Conversational AI",
      "Framer Motion",
    ],
    cover: aichatContact,
    gallery: [
      { caption: "Skills Explorer", src: aichatSkills },
      { caption: "Project Deep-Dive", src: aichatProject },
    ],
    overview:
      "AI Chat Portfolio transforms a traditional portfolio into an intelligent conversational experience. Instead of browsing static pages, visitors interact with an AI assistant that answers questions about professional experience, technical skills, projects, certifications, achievements, and career journey. Powered by Retrieval-Augmented Generation (RAG) and Large Language Models, the assistant retrieves verified portfolio information and generates natural, context-aware responses, creating a more engaging and personalized way to explore professional profiles.",
    problem:
      "Static portfolios require visitors to manually search for information, making it difficult to quickly understand experience, projects, or technical expertise. Recruiters and collaborators often leave before finding what they need.",
    solution:
      "An AI-powered conversational assistant trained on the owner's professional profile. It understands natural language questions, retrieves verified information using RAG, and generates intelligent responses with LLM reasoning, allowing visitors to explore projects, experience, certifications, and skills naturally.",
    features: [
      "AI-powered portfolio assistant",
      "Retrieval-Augmented Generation (RAG)",
      "Context-aware answers",
      "Natural language conversations",
      "Intelligent project discovery",
      "Professional profile search",
      "Interactive visitor experience",
      "Responsive conversational UI",
    ],
    challenges: [
      "Grounding LLM responses strictly in verified portfolio data to prevent hallucinations",
      "Designing a conversational UI that feels natural without sacrificing information density",
      "Optimizing vector search latency for real-time chat responsiveness",
    ],
    results: [
      "Transformed a static portfolio into an engaging conversational experience",
      "Enabled visitors to discover projects and skills through natural questions",
      "Improved time-on-site and depth of exploration versus a traditional layout",
    ],
    roadmap: [
      "Voice-based conversational interactions",
      "Multilingual assistant support",
      "Personalized recruiter-oriented answer modes",
      "Analytics on visitor questions to surface trending interests",
    ],
    cta: "Let's build your next AI experience.",
  },
  {
    slug: "restro360",
    title: "Restro360",
    tagline: "Autonomous Multi-Agent Restaurant Operating System",
    category: "AI",
    description:
      "A production-ready Multi-Agent AI platform that serves as an autonomous operating system for restaurant businesses — orchestrating specialized AI agents across ordering, customer service, workforce, inventory, analytics, and business workflows.",
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "Multi-Agent Orchestration",
      "LLMs",
      "Memory Systems",
      "WebSockets",
      "Real-Time Automation",
      "REST APIs",
      "AI Workflow Engine",
    ],
    cover: restro360Workflow,
    gallery: [],
    overview:
      "Restro360 is designed as a complete AI Operating System for modern restaurants. Instead of relying on a single chatbot, the platform coordinates multiple specialized AI agents, each responsible for a dedicated business function. Customer requests are automatically routed to the appropriate agent, enabling intelligent collaboration across ordering, menu management, inventory, workforce coordination, customer engagement, reporting, and business administration. The platform supports text, voice, and image interactions while maintaining conversational memory, secure authentication, and real-time communication, creating a fully autonomous operational environment.",
    problem:
      "Restaurant operations are typically fragmented across multiple disconnected systems, requiring employees to manually manage orders, customer requests, inventory, scheduling, reporting, and business decisions. This leads to operational inefficiencies, slower customer service, increased costs, and poor scalability.",
    solution:
      "Restro360 transforms restaurant management into an AI-native ecosystem powered by autonomous collaborating agents. Each AI agent specializes in a business domain while sharing context and memory through a centralized orchestration layer, allowing the platform to automate complex operational workflows with minimal human intervention.",
    features: [
      "Autonomous Multi-Agent AI Architecture",
      "Intelligent Agent Routing",
      "AI Customer Support",
      "Smart Order Processing",
      "Inventory Management",
      "Workforce Coordination",
      "Business Analytics",
      "Voice, Text & Image Interaction",
      "Persistent Memory Systems",
      "Real-Time Automation",
      "Enterprise Authentication",
      "Scalable Modular Architecture",
    ],
    challenges: [
      "Coordinating multiple autonomous agents without conflicting decisions",
      "Maintaining real-time context and memory across long-running conversations",
      "Integrating voice, image, and text inputs into a unified agent interface",
      "Designing secure role-based access for enterprise restaurant operations",
    ],
    results: [
      "Unified restaurant operations into a single conversational AI interface",
      "Reduced manual workload across customer support, ordering, and workforce tasks",
      "Scalable foundation ready for multi-location restaurant deployments",
    ],
    roadmap: [
      "Integration with POS, kitchen display systems, and delivery platforms",
      "Advanced predictive analytics for demand forecasting and inventory optimization",
      "Voice-first drive-through and in-store assistant experiences",
      "White-label enterprise deployment for regional restaurant chains",
    ],
    cta: "Let's build your next AI platform.",
  },
  {
    slug: "nasm",
    title: "NASM",
    tagline: "AI-Powered Real Estate Intelligence Platform",
    category: "Web Apps",
    description:
      "An enterprise AI platform that turns property search into an intelligent, guided experience — from intent to 360° tour.",
    technologies: [
      "AI Agent",
      "Natural Language Processing",
      "Recommendation Engine",
      "Interactive Maps",
      "Virtual Tours",
      "Web Application",
    ],
    cover: nasmHero,
    gallery: [
      { caption: "Interactive Smart Map", src: nasmMap },
      { caption: "AI Real Estate Assistant", src: nasmAssistant },
      { caption: "Floor Plans Viewer", src: nasmFloorPlans },
      { caption: "360° Virtual Tour", src: nasmTour1 },
      { caption: "Interior Virtual Tour", src: nasmTour2 },
    ],
    overview:
      "NASM is an enterprise AI-powered real estate platform that helps users discover the most suitable property based on their goals. Instead of browsing hundreds of listings, users simply describe what they are looking for — invest, buy a home, or find a family residence — and the AI Agent understands intent, recommends properties, explains why each one fits, and guides them through an interactive exploration experience combining conversational AI, smart maps, floor plans, and immersive 360° virtual tours.",
    problem:
      "Real estate buyers and investors spend significant time filtering listings that don't match their needs. Traditional search relies on manual filtering and keywords, making it hard to know which property truly aligns with investment goals, lifestyle, or family requirements.",
    solution:
      "NASM introduces an AI Real Estate Agent that understands natural language and interprets user intent to recommend properties based on investment goals, lifestyle preferences, location priorities, and budget. It combines conversational AI with smart search, recommendation systems, interactive maps, floor plans, and virtual property tours to create an end-to-end intelligent property discovery platform.",
    features: [
      "AI conversational property assistant",
      "Intelligent recommendation engine",
      "Smart property matching by intent and budget",
      "Interactive map navigation",
      "Community exploration",
      "Property details with AI explanations",
      "Architectural floor plans viewer",
      "Interactive 360° virtual walkthroughs",
      "Multilingual experience (Arabic & English)",
      "Mobile-friendly interface",
    ],
    challenges: [
      "Interpreting free-form intent across investment and lifestyle goals",
      "Fusing conversational AI with map, floor-plan, and 360° tour surfaces",
      "Delivering an immersive experience that stays fast on mobile",
    ],
    results: [
      "Property discovery reduced from hours of filtering to a single conversation",
      "Buyers evaluate properties remotely via 360° tours before visiting",
      "Higher-quality leads reach sales teams already qualified by the AI",
    ],
    roadmap: [
      "Deeper investment analytics (ROI, rental yield, comparables)",
      "Voice-driven property tours",
      "CRM and developer-portfolio integrations",
    ],
    i18n: {
      ar: {
        tagline: "منصة عقارية ذكية مدعومة بالذكاء الاصطناعي",
        category: "تطبيقات الويب",
        overview:
          "نَسم هي منصة عقارية مؤسسية مدعومة بالذكاء الاصطناعي تساعد المستخدمين على اكتشاف العقار الأنسب لأهدافهم. بدلاً من تصفح مئات القوائم يدوياً، يصف المستخدم ما يبحث عنه — استثمار أو شراء منزل أو سكن عائلي — فيفهم الوكيل الذكي نيته، ويوصي بالعقارات المناسبة، ويشرح سبب ملاءمتها، ويوجه المستخدم عبر تجربة تفاعلية تجمع بين المحادثة الذكية والخرائط التفاعلية ومخططات الطوابق والجولات الافتراضية بزاوية 360°.",
        problem:
          "يقضي المشترون والمستثمرون العقاريون وقتاً طويلاً في تصفية قوائم لا تناسب احتياجاتهم. تعتمد أدوات البحث التقليدية على التصفية اليدوية والكلمات المفتاحية، مما يصعّب معرفة العقار الذي يتوافق فعلاً مع الأهداف الاستثمارية أو نمط الحياة أو متطلبات الأسرة.",
        solution:
          "تقدم نَسم وكيلاً عقارياً ذكياً يفهم اللغة الطبيعية ويفسر نية المستخدم ليقترح عقارات بناءً على الأهداف الاستثمارية وتفضيلات نمط الحياة وأولويات الموقع والميزانية. تجمع المنصة بين الذكاء المحادثاتي والبحث الذكي وأنظمة التوصية والخرائط التفاعلية ومخططات الطوابق والجولات الافتراضية لتقدم رحلة اكتشاف عقاري متكاملة.",
        features: [
          "مساعد عقاري ذكي بالمحادثة",
          "محرك توصيات ذكي",
          "مطابقة عقارية دقيقة حسب النية والميزانية",
          "تصفح تفاعلي عبر الخريطة",
          "استكشاف المجتمعات السكنية",
          "تفاصيل عقارية مع شروحات من الذكاء الاصطناعي",
          "عارض مخططات معمارية",
          "جولات افتراضية تفاعلية بزاوية 360°",
          "تجربة متعددة اللغات (عربي وإنجليزي)",
          "واجهة متوافقة مع الجوال",
        ],
        challenges: [
          "تفسير النية الحرة عبر الأهداف الاستثمارية ونمط الحياة",
          "دمج الذكاء المحادثاتي مع الخرائط ومخططات الطوابق وجولات 360°",
          "تقديم تجربة غامرة تحافظ على السرعة على الجوال",
        ],
        results: [
          "اختصار البحث العقاري من ساعات من التصفية إلى محادثة واحدة",
          "تقييم العقارات عن بُعد عبر جولات 360° قبل الزيارة",
          "وصول عملاء محتملين مؤهلين مسبقاً إلى فرق المبيعات",
        ],
        roadmap: [
          "تحليلات استثمارية أعمق (العائد، الإيجار، المقارنات)",
          "جولات عقارية بالتحكم الصوتي",
          "تكامل مع أنظمة CRM ومحافظ المطورين",
        ],
        gallery: [
          "الخريطة التفاعلية الذكية",
          "المساعد العقاري الذكي",
          "عارض مخططات الطوابق",
          "جولة افتراضية 360°",
          "جولة داخلية افتراضية",
        ],
      },
    },
  },
  {
    slug: "madarekiq",
    title: "MadarekIQ",
    tagline: "AI-Powered Child Development Assessment Platform",
    category: "Web Apps",
    description:
      "MadarekIQ is an AI-powered child development assessment platform designed for speech therapy centers and specialists — evaluating developmental abilities, estimating developmental age, and orchestrating structured digital workflows in a bilingual experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "AI-ready Architecture",
      "Internationalization (i18n)",
      "Responsive Design",
      "Modern SaaS UI",
    ],
    cover: madarekiqHero,
    gallery: [
      { caption: "How It Works", src: madarekiqHowItWorks, lang: "en" },
      { caption: "Child Development Assessments", src: madarekiqAssessments, lang: "en" },
      { caption: "Start Free Today", src: madarekiqCta, lang: "en" },
      { caption: "Arabic Experience (RTL)", src: madarekiqArabicHero, lang: "ar" },
    ],
    overview:
      "MadarekIQ modernizes the assessment process used by speech therapy clinics. Instead of relying on manual evaluation and paperwork, therapists can perform structured assessments, monitor child progress, estimate developmental age, and manage evaluations inside one intelligent platform. The system supports both Arabic and English users and provides an intuitive experience for specialists and parents.",
    problem:
      "Speech therapy centers often rely on manual assessment forms that are difficult to organize, compare, and track over time. This slows evaluations and makes long-term monitoring challenging.",
    solution:
      "MadarekIQ digitizes the entire assessment workflow into a bilingual AI-ready platform. Therapists can evaluate children, monitor developmental domains, estimate developmental age, and access organized assessment records through one modern interface.",
    features: [
      "Child developmental assessments",
      "Developmental age estimation",
      "Speech therapy workflow management",
      "Arabic & English localization",
      "Responsive modern dashboard",
      "Specialist-friendly UI",
      "Secure assessment management",
      "Multi-domain evaluation system",
    ],
    challenges: [
      "Designing a bilingual (Arabic/English) experience with full RTL parity",
      "Structuring multi-domain developmental assessments into a unified data model",
      "Balancing clinical accuracy with an intuitive, therapist-friendly UI",
    ],
    results: [
      "Assessment workflows digitized end-to-end for speech therapy centers",
      "Faster evaluations with organized, comparable records over time",
      "A modern bilingual SaaS foundation ready for AI-driven insights",
    ],
    roadmap: [
      "AI-driven developmental insights and recommendations",
      "Parent portal with progress sharing",
      "Deeper analytics and longitudinal tracking",
    ],
    cta: "Let's build your next product.",
    i18n: {
      ar: {
        tagline: "منصة تقييم نمو الطفل المدعومة بالذكاء الاصطناعي",
        category: "تطبيقات الويب",
        overview:
          "تُحدِّث مدارك IQ عملية التقييم المستخدمة في مراكز علاج النطق. بدلاً من الاعتماد على التقييم اليدوي والأوراق، يستطيع المعالجون إجراء تقييمات منظمة ومتابعة تقدم الطفل وتقدير العمر التطوري وإدارة التقييمات داخل منصة ذكية واحدة. يدعم النظام المستخدمين باللغتين العربية والإنجليزية ويقدم تجربة بديهية للأخصائيين وأولياء الأمور.",
        problem:
          "تعتمد مراكز علاج النطق غالباً على نماذج تقييم يدوية يصعب تنظيمها ومقارنتها وتتبعها مع مرور الوقت، مما يبطئ التقييمات ويجعل المتابعة طويلة المدى تحدياً.",
        solution:
          "تُرقمن مدارك IQ سير عمل التقييم بالكامل في منصة ثنائية اللغة جاهزة للذكاء الاصطناعي. يمكن للمعالجين تقييم الأطفال ومتابعة المجالات التطورية وتقدير العمر التطوري والوصول إلى سجلات تقييم منظمة عبر واجهة عصرية واحدة.",
        features: [
          "تقييمات تطور الطفل",
          "تقدير العمر التطوري",
          "إدارة سير عمل علاج النطق",
          "دعم اللغتين العربية والإنجليزية",
          "لوحة تحكم عصرية متجاوبة",
          "واجهة مصممة للأخصائيين",
          "إدارة تقييمات آمنة",
          "نظام تقييم متعدد المجالات",
        ],
        challenges: [
          "تصميم تجربة ثنائية اللغة مع دعم كامل للاتجاه من اليمين إلى اليسار",
          "تنظيم تقييمات تطورية متعددة المجالات في نموذج بيانات موحد",
          "الموازنة بين الدقة السريرية وواجهة سهلة للمعالج",
        ],
        results: [
          "رقمنة سير عمل التقييم بالكامل لمراكز علاج النطق",
          "تقييمات أسرع مع سجلات منظمة قابلة للمقارنة عبر الزمن",
          "أساس SaaS عصري ثنائي اللغة جاهز لرؤى مدعومة بالذكاء الاصطناعي",
        ],
        roadmap: [
          "رؤى وتوصيات تطويرية مدعومة بالذكاء الاصطناعي",
          "بوابة لأولياء الأمور لمشاركة التقدم",
          "تحليلات أعمق وتتبع طولي للنمو",
        ],
        gallery: [
          "كيف تعمل المنصة",
          "تقييمات نمو الطفل",
          "ابدأ مجاناً اليوم",
          "التجربة العربية (RTL)",
        ],
        cta: "هل تبحث عن بناء منصات رعاية صحية بالذكاء الاصطناعي؟ لنبنِ منتجك القادم.",
      },
    },
  },
  {
    slug: "islamy",
    title: "Islamy",
    tagline: "Modern Islamic Companion for Everyday Worship",
    category: "Mobile Apps",
    description:
      "Islamy is a modern Android application designed to provide Muslims with essential daily Islamic tools in a simple, elegant, and user-friendly experience.",
    technologies: [
      "Kotlin",
      "Android",
      "MVVM",
      "Navigation Component",
      "ViewModel",
      "LiveData",
      "View Binding",
      "Retrofit",
      "Gson",
      "Material Design",
      "ConstraintLayout",
      "REST APIs",
    ],
    cover: islamyScreens,
    gallery: [],
    overview:
      "Islamy was built as a modern Android application following Google's recommended architecture. The application helps users stay connected with their daily worship through an elegant interface that includes prayer times, Azkar, daily reminders, and spiritual progress tracking. The project focuses on clean architecture, maintainability, responsive UI, and excellent user experience using Material Design principles.",
    problem:
      "Many Islamic applications provide useful features but suffer from outdated interfaces, inconsistent navigation, and poor maintainability. The goal was to build a modern Android application that combines essential Islamic daily tools within a clean, organized, and scalable architecture.",
    solution:
      "Islamy uses Kotlin and the MVVM architecture to create a responsive, maintainable, and scalable mobile application. The project integrates modern Android Jetpack libraries, efficient state management, API communication for prayer times, and intuitive navigation to deliver a smooth user experience.",
    features: [
      "Prayer Times based on user location",
      "Daily Azkar",
      "Prayer Tracking",
      "Beautiful Material Design UI",
      "Smooth Fragment Navigation",
      "Responsive Layouts",
      "Offline-friendly architecture",
      "Daily spiritual dashboard",
      "Clean Android Architecture",
      "Modern User Experience",
    ],
    challenges: [
      "Balancing feature richness with simplicity in a single mobile app",
      "Ensuring accurate prayer times across locations and calculation methods",
      "Building a maintainable codebase that follows Android best practices",
    ],
    results: [
      "A unified Islamic daily companion in one polished Android app",
      "Simplified worship tracking and daily spiritual reminders",
      "Foundation for future expansion with modular architecture",
    ],
    roadmap: [
      "Qibla direction and mosque finder",
      "Hijri calendar and event reminders",
      "Cloud sync and cross-device support",
    ],
    cta: "Explore similar mobile solutions",
    i18n: {
      ar: {
        tagline: "رفيق إسلامي عصري للعبادة اليومية",
        category: "تطبيقات الجوال",
        overview:
          "تم بناء تطبيق إسلامي كتطبيق أندرويد عصري يتبع البنية المعمارية الموصى بها من Google. يساعد التطبيق المستخدمين على البقاء متصلين بعبادتهم اليومية من خلال واجهة أنيقة تشمل أوقات الصلاة والأذكار والتنبيهات اليومية وتتبع التقدم الروحي. يركز المشروع على البنية النظيفة وقابلية الصيانة وواجهة المستخدم المتجاوبة وتجربة المستخدم الممتازة باستخدام مبادئ التصميم المادي.",
        problem:
          "توفر العديد من التطبيقات الإسلامية ميزات مفيدة ولكنها تعاني من واجهات قديمة وتنقل غير متسق وقابلية صيانة ضعيفة. كان الهدف بناء تطبيق أندرويد عصري يجمع الأدوات الإسلامية اليومية الأساسية ضمن بنية نظيفة ومنظمة وقابلة للتطوير.",
        solution:
          "يستخدم إسلامي لغة Kotlin وبنية MVVM لإنشاء تطبيق جوال متجاوب وقابل للصيانة والتطوير. يدمج المشروع مكتبات Android Jetpack الحديثة وإدارة الحالة الفعالة والتواصل مع واجهات برمجة التطبيقات لأوقات الصلاة والتنقل البديهي لتقديم تجربة مستخدم سلسة.",
        features: [
          "أوقات الصلاة بناءً على موقع المستخدم",
          "أذكار يومية",
          "تتبع الصلاة",
          "واجهة مستخدم جميلة بتصميم مادي",
          "تنقل سلس بين الشاشات",
          "تخطيطات متجاوبة",
          "بنية تعمل بشكل جيد دون اتصال",
          "لوحة معلومات روحية يومية",
          "بنية أندرويد نظيفة",
          "تجربة مستخدم عصرية",
        ],
        challenges: [
          "موازنة غنى الميزات مع البساطة في تطبيق جوال واحد",
          "ضمان دقة أوقات الصلاة عبر المواقع وطرق الحساب",
          "بناء قاعدة بيانات قابلة للصيانة تتبع أفضل ممارسات Android",
        ],
        results: [
          "رفيق إسلامي يومي موحد في تطبيق أندرويد مصقول",
          "تبسيط تتبع العبادة والتذكيرات الروحية اليومية",
          "أساس متين للتوسع المستقبلي ببنية معيارية",
        ],
        roadmap: [
          "اتجاه القبلة ومكتشف المساجد",
          "التقويم الهجري وتذكيرات المناسبات",
          "المزامنة السحابية والدعم عبر الأجهزة",
        ],
        cta: "استكشف حلول الجوال المماثلة",
      },
    },
  },
  {
    slug: "metro-masr",
    title: "Metro Masr",
    tagline: "Smart Metro Route Planner for Cairo Underground",
    category: "Mobile Apps",
    description:
      "A modern Android app that plans optimal Cairo metro journeys — computing best route, fare, duration, transfers, and a full trip summary in one tap.",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "MVVM",
      "Material Design 3",
      "StateFlow",
      "Compose Navigation",
      "Gson",
      "Android",
      "AnimatedVisibility",
      "Custom Theming",
    ],
    cover: metroMasrHero,
    gallery: [],
    overview:
      "Metro Masr is a modern Android application that helps commuters plan metro journeys intelligently. Users simply choose their departure station and destination, and the app automatically calculates the best route, number of stations, estimated travel time, ticket fare, transfer stations, and a complete journey summary — simplifying public transportation with a clean and intuitive experience.",
    problem:
      "Metro commuters often waste time trying to determine the shortest route, calculate ticket prices, estimate travel duration, and identify transfer stations manually — especially when journeys involve switching between metro lines.",
    solution:
      "Metro Masr automatically analyzes the metro network and provides the optimal route with every important travel detail, making commuting faster, easier, and more convenient through a beautifully designed Material 3 interface.",
    features: [
      "Smart route planning",
      "Automatic fare calculation",
      "Estimated travel duration",
      "Number of stations per journey",
      "Transfer detection between metro lines",
      "Journey visualization",
      "Arabic RTL support",
      "Material Design 3 interface",
      "Smooth animations",
      "Modern responsive UI",
    ],
    challenges: [
      "Designing a pathfinding algorithm optimized for a multi-line metro graph",
      "Delivering a fully RTL-aware experience with Material Design 3",
      "Balancing rich animations with performance on low-end Android devices",
    ],
    results: [
      "Commuters plan trips in seconds instead of manually mapping transfers",
      "Clean MVVM architecture enables rapid feature iteration",
      "Reusable Compose components accelerate future screens",
    ],
    roadmap: [
      "Live station status and crowd insights",
      "Multi-city support beyond Cairo",
      "Google Maps integration for last-mile navigation",
    ],
    cta: "Let's build your next mobile application.",

    i18n: {
      ar: {
        tagline: "مخطط رحلات ذكي لمترو أنفاق القاهرة",
        category: "تطبيقات الجوال",
        overview:
          "تطبيق مترو مصر هو تطبيق أندرويد ذكي يساعد مستخدمي مترو الأنفاق على التخطيط لرحلاتهم بسهولة. يقوم المستخدم بتحديد محطة البداية ومحطة الوصول، ثم يقوم التطبيق تلقائياً بحساب أفضل مسار وعدد المحطات ومدة الرحلة وسعر التذكرة ومحطات التحويل وملخص الرحلة بالكامل، ليقدم تجربة استخدام حديثة وسريعة.",
        problem:
          "يعاني مستخدمو المترو من صعوبة معرفة أفضل مسار وعدد المحطات ومدة الرحلة وسعر التذكرة، خاصةً عند وجود تحويلات بين الخطوط المختلفة.",
        solution:
          "يقوم التطبيق بتحليل شبكة المترو بالكامل ثم يعرض أفضل رحلة مع جميع التفاصيل بشكل واضح وسهل الاستخدام عبر واجهة عصرية بتصميم Material 3.",
        features: [
          "تحديد أفضل مسار",
          "حساب سعر التذكرة",
          "حساب مدة الرحلة",
          "معرفة عدد المحطات",
          "تحديد محطات التحويل",
          "واجهة حديثة",
          "دعم اللغة العربية RTL",
          "تصميم Material Design 3",
          "رسوم متحركة سلسة",
        ],
        challenges: [
          "تصميم خوارزمية إيجاد المسار الأمثل عبر شبكة متعددة الخطوط",
          "تقديم تجربة كاملة تدعم العربية RTL مع Material 3",
          "الموازنة بين الرسوم المتحركة الغنية والأداء على الأجهزة المحدودة",
        ],
        results: [
          "تخطيط الرحلات في ثوانٍ بدلاً من رسم التحويلات يدوياً",
          "بنية MVVM نظيفة تسرّع إضافة الميزات المستقبلية",
          "مكونات Compose قابلة لإعادة الاستخدام تسرّع الشاشات القادمة",
        ],
        roadmap: [
          "حالة المحطات المباشرة ومؤشرات الازدحام",
          "دعم مدن إضافية بجانب القاهرة",
          "تكامل مع خرائط جوجل للتنقل من وإلى المحطات",
        ],
        gallery: [],
        cta: "هل تفكر في بناء حل نقل ذكي؟ لنبنِ تطبيقك القادم معاً.",

      },
    },
  },
  {
    slug: "el-raed",
    title: "El Raed",
    tagline: "AI learning assistant for personalized, instructor-guided education.",
    category: "AI",
    description:
      "An AI-powered learning companion that makes education interactive, adaptive, and personal — while keeping instructors in control of the learning path.",
    technologies: ["RAG", "Agentic AI", "LLM Orchestration", "Vector Search", "Python", "Next.js"],
    cover: elraedCover,
    gallery: [
      { caption: "Student conversation view — replace with real screenshot" },
      { caption: "Instructor dashboard — replace with real screenshot" },
      { caption: "Adaptive quiz flow — replace with real screenshot" },
      { caption: "Knowledge source citations — replace with real screenshot" },
    ],
    overview:
      "El Raed is an AI-powered learning assistant that makes education more interactive, adaptive and personalized for both students and instructors. It combines Retrieval-Augmented Generation with agentic reasoning so learners get accurate, source-grounded answers while instructors keep control over what is taught.",
    problem:
      "Students need explanations that match their level, at their pace, at any hour. Instructors need to guide learning without answering the same question a hundred times, and without losing pedagogical control to a generic chatbot.",
    solution:
      "A RAG + agentic system trained on the instructor's own curriculum. It answers questions, simplifies difficult concepts, generates quizzes, and recommends what to study next — while respecting the boundaries and emphasis set by the instructor.",
    features: [
      "Retrieval-Augmented answers grounded in course material",
      "Adaptive quizzes generated from student weak points",
      "Instructor console to steer topics and priorities",
      "Smart recommendations for what to review next",
      "Multi-turn agentic reasoning for complex questions",
      "Source citations for every answer",
    ],
    challenges: [
      "Keeping answers strictly within the instructor's curriculum",
      "Balancing conversational fluency with pedagogical accuracy",
      "Designing evaluation criteria for open-ended learning outcomes",
    ],
    results: [
      "Faster comprehension of complex topics through simpler explanations",
      "Instructors regain hours previously spent on repeat Q&A",
      "Higher engagement through personalized, always-available support",
    ],
    roadmap: [
      "Voice-based tutoring mode",
      "Deeper analytics for instructors on class-wide understanding",
      "Integration with existing LMS platforms",
    ],
  },
  {
    slug: "manara",
    title: "Manara",
    tagline: "AI assistant for business, tax, and legal support in Egyptian Arabic.",
    category: "AI",
    description:
      "An AI guide for entrepreneurs and small business owners in Egypt — grounded in official sources, delivered in clear Egyptian Arabic.",
    technologies: ["RAG", "Semantic Search", "Arabic NLP", "LangChain", "PostgreSQL", "pgvector"],
    cover: manaraCover,
    gallery: [
      { caption: "Business setup wizard — replace with real screenshot" },
      { caption: "Egyptian-Arabic Q&A with citations — replace with real screenshot" },
      { caption: "Tax registration walkthrough — replace with real screenshot" },
      { caption: "Source library view — replace with real screenshot" },
    ],
    overview:
      "Manara is an AI assistant designed to help individuals and small business owners in Egypt understand business setup and tax regulations more easily. It delivers accurate, source-based guidance in Egyptian Arabic and offers step-by-step support that makes complex legal and business information genuinely accessible.",
    problem:
      "Business, tax, and legal procedures in Egypt are complex, scattered across official documents, and rarely written in the everyday Arabic entrepreneurs actually speak. This friction slows or blocks small businesses from ever getting formalized.",
    solution:
      "A retrieval-augmented assistant that searches inside official Egyptian sources and answers in Egyptian Arabic, with every claim traceable to its source. It also collects a light profile (activity type, partners, foreign ownership) to tailor answers to the user's exact situation.",
    features: [
      "Answers grounded in official Egyptian regulatory sources",
      "Source references attached to every answer",
      "Guided profile intake for context-aware responses",
      "Step-by-step walkthroughs for common procedures",
      "Full support for Egyptian Arabic dialect",
      "Coverage across tax, licensing, and business setup",
    ],
    challenges: [
      "Handling Egyptian Arabic dialect with high accuracy",
      "Keeping the knowledge base current with regulatory changes",
      "Balancing conversational tone with legal precision",
    ],
    results: [
      "Complex procedures reduced to clear, sequenced steps",
      "Confidence for founders making decisions on verified information",
      "Faster path from idea to legally-registered business",
    ],
    roadmap: [
      "Document generation for common filings",
      "Direct integration with government e-services",
      "Expert-in-the-loop review workflow",
    ],
  },
  {
    slug: "bayyinah",
    title: "Bayyinah",
    tagline: "AI legal guidance that simplifies Egyptian law for everyday users.",
    category: "AI",
    description:
      "A RAG-based legal companion that makes Egyptian law understandable across civil, criminal, family, labor, commercial, and administrative domains.",
    technologies: ["RAG", "Legal NLP", "Vector DB", "LLM Guardrails", "FastAPI", "React"],
    cover: bayyinahCover,
    gallery: [
      { caption: "Legal Q&A view — replace with real screenshot" },
      { caption: "Cited article and code references — replace with real screenshot" },
      { caption: "Domain selector (family, labor, civil...) — replace with real screenshot" },
      { caption: "Out-of-scope refusal handling — replace with real screenshot" },
    ],
    overview:
      "Bayyinah is a RAG-based legal guidance system that simplifies Egyptian law across multiple sections — civil, criminal, family, labor, commercial, constitutional, procedural, and administrative. It helps civilians understand their rights while intentionally refusing questions outside its legal scope.",
    problem:
      "Ordinary people rarely know their rights until they need them, and legal texts are written for lawyers, not citizens. Generic chatbots either hallucinate legal advice or answer questions they should never touch.",
    solution:
      "A retrieval-augmented system anchored strictly to Egyptian legal sources, with domain-level routing, article-level citations, and hard guardrails that keep the assistant inside its legal remit.",
    features: [
      "Coverage across 8 major branches of Egyptian law",
      "Article-level citations for every legal statement",
      "Guardrails that refuse out-of-scope questions gracefully",
      "Plain-language explanations of rights and procedures",
      "Domain-aware retrieval for accuracy",
      "Egyptian Arabic conversational interface",
    ],
    challenges: [
      "Ensuring refusals are helpful, not dismissive",
      "Preventing generalization beyond cited sources",
      "Modeling law as structured, retrievable knowledge",
    ],
    results: [
      "Citizens gain clear, cited answers instead of guesswork",
      "Consistent behaviour across all supported legal domains",
      "A defensible, source-grounded alternative to generic chatbots",
    ],
    roadmap: [
      "Case-history search with anonymization",
      "Lawyer-facing research mode with deeper citations",
      "Voice interface for accessibility",
    ],
  },
];
