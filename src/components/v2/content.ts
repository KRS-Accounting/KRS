export const bookCall = { label: "Book a free call", href: "/onboarding" } as const;

export const clientLogin = "https://krs-platform-staging-6xbnf.ondigitalocean.app/portal/login";

export const navServices = [
  { label: "Accounting", text: "Monthly books, closed on time", href: "/services/accounting" },
  { label: "Tax Advisory", text: "Reviewed answers within 24 hours", href: "/services/tax-advisory" },
  { label: "Payroll", text: "EFKA and ERGANI, handled", href: "/services/payroll" },
  { label: "Consulting", text: "Plans you can act on", href: "/services/consulting" },
  { label: "Funding & Grants", text: "Greek and EU programmes", href: "/services/funding-grants" },
] as const;

export const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Why KRS", href: "/why" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

export const press = [
  { label: "Money Review", href: "https://www.moneyreview.gr/" },
  { label: "Kathimerini", href: "https://www.kathimerini.gr/economy/business/" },
  { label: "Naftemporiki", href: "https://www.naftemporiki.gr/" },
  { label: "Startupper", href: "https://www.startupper.gr/" },
] as const;

export const authorities = [
  { label: "AADE", src: "/logos/authorities/aade.png", fit: "cover" },
  { label: "myDATA", src: "/logos/authorities/mydata.png", fit: "cover" },
  { label: "TAXISnet", src: "/logos/authorities/taxisnet.png", fit: "contain" },
  { label: "EFKA", src: "/logos/authorities/efka.png", fit: "cover" },
  { label: "ERGANI", src: "/logos/authorities/ergani.png", fit: "cover" },
  { label: "gov.gr", src: "/logos/authorities/govgr.png", fit: "cover" },
] as const;

export const stats = [
  { value: 2011, format: "year", label: "In practice since", note: "Licensed accounting and tax work in Greece." },
  { value: 4.8, format: "rating", label: "Google rating", note: "From 132 client reviews." },
  { value: 24, format: "hours", label: "Answer time", note: "On tax and accounting questions." },
  { value: 5, format: "plain", label: "Services, one team", note: "On one platform, with one file." },
] as const;

export type ServiceId = "accounting" | "tax-advisory" | "payroll" | "consulting" | "funding";

export const services: ReadonlyArray<{
  id: ServiceId;
  name: string;
  title: string;
  text: string;
  points: readonly string[];
  href: string;
  tone: "mist" | "sand" | "navy" | "blue" | "paper";
}> = [
  {
    id: "accounting",
    name: "Accounting",
    title: "Monthly books, closed on time.",
    text: "From company formation to year-end. AI matches every invoice and bank line, and an accountant signs off.",
    points: ["myDATA kept current", "Monthly P&L", "Year-end statements"],
    href: "/services/accounting",
    tone: "mist",
  },
  {
    id: "tax-advisory",
    name: "Tax Advisory",
    title: "Direction before the deadline.",
    text: "Ask a question, get a reviewed answer within 24 hours. VAT, structure, deductions and cross-border work.",
    points: ["VAT and reverse charge", "Company structure", "Audit support"],
    href: "/services/tax-advisory",
    tone: "sand",
  },
  {
    id: "payroll",
    name: "Payroll",
    title: "Payroll without the portal work.",
    text: "Payroll runs, EFKA contributions and ERGANI notices, connected to each employee and checked before submission.",
    points: ["Monthly runs", "EFKA and ERGANI", "Hiring and exits"],
    href: "/services/payroll",
    tone: "navy",
  },
  {
    id: "consulting",
    name: "Consulting",
    title: "Plans you can act on.",
    text: "Turn your numbers and growth plans into one clear next step on hiring, pricing, cash or structure.",
    points: ["Cash planning", "Hiring cost", "Business plans"],
    href: "/services/consulting",
    tone: "blue",
  },
  {
    id: "funding",
    name: "Funding & Grants",
    title: "Find the money you qualify for.",
    text: "We match you to Greek and EU programmes, build the application and keep grant reporting on schedule.",
    points: ["Eligibility checks", "Applications", "Grant reporting"],
    href: "/services/funding-grants",
    tone: "paper",
  },
];

export const processSteps = [
  {
    when: "Day 1",
    title: "We take over the file.",
    text: "After you sign, we open your file, confirm authorisations with AADE and EFKA, and map your first tax and accounting obligations.",
    image: "/images/krs-switch-transfer.jpg",
    alt: "Files moving from an old cabinet into a KRS cabinet along a gold rail",
    link: { label: "How onboarding works", href: "/onboarding" },
  },
  {
    when: "Every month",
    title: "The month closes on time.",
    text: "Receipts, bank activity, payroll changes and myDATA move through one review sequence. You only hear from us when something is missing.",
    image: "/images/v2/v2-monthly-close.jpg",
    alt: "Receipts gliding along a gold rail into a navy tray with a check badge",
    link: { label: "Accounting", href: "/services/accounting" },
  },
  {
    when: "Once a year",
    title: "Annual filings, without the scramble.",
    text: "Financial statements, tax returns and supporting evidence are prepared with visible status, well before the deadline.",
    image: "/images/krs-switch-first-close.jpg",
    alt: "A navy folder holding an annual report with a gold seal",
    link: { label: "Annual filings", href: "/services/accounting" },
  },
  {
    when: "Always",
    title: "A real advisor, one message away.",
    text: "Ask anything about VAT, payroll or structure. An advisor who knows your file replies within 24 hours.",
    image: "/images/krs-pricing-advisory-session.png",
    alt: "A KRS advisor reviewing documents with a client",
    link: { label: "Tax advisory", href: "/services/tax-advisory" },
  },
] as const;

/* Placeholder quotes until client-approved testimonials are supplied. */
export const testimonials = [
  {
    quote:
      "KRS gives us the operating clarity we wanted from an internal finance team, without losing the judgement of real tax advisors.",
    name: "Nikos Vardakis",
    role: "Co-founder, HelioStack Technologies",
  },
  {
    quote:
      "The monthly close is no longer a chase. We see what is missing, who owns it, and which filings need advisor review.",
    name: "Eleni Markou",
    role: "Managing Director, Agora Foods",
  },
  {
    quote: "Payroll, myDATA and tax questions now live in one accountable file instead of scattered reminders.",
    name: "Dimitris Pappas",
    role: "Finance Lead, Meridian Labs",
  },
] as const;

export const articles = [
  {
    type: "News",
    read: "8 min read",
    title: "VAT and myDATA changes Greek SMEs should track.",
    text: "What changed for invoices, filings and the monthly close, and what to do before the next deadline.",
    image: "/images/krs-athens-operations.png",
  },
  {
    type: "Guide",
    read: "11 min read",
    title: "How to keep myDATA current through the year.",
    text: "A practical way to collect invoices, review each month and avoid a scramble at year-end.",
    image: "/images/v2/v2-blog-mydata.jpg",
  },
  {
    type: "Insight",
    read: "17 min read",
    title: "The tax question founders ask too late.",
    text: "How structure, payroll and reporting choices shape the business before you raise outside capital.",
    image: "/images/v2/v2-blog-founder.jpg",
  },
] as const;

export const faqs = [
  {
    question: "Does KRS do all of my bookkeeping?",
    answer:
      "Yes. AI handles document routing, classification, deadline tracking and evidence gathering. Licensed accountants review and complete the reserved accounting work. You only step in when a document or some context is missing.",
  },
  {
    question: "Does the AI replace my accountant?",
    answer:
      "No. The platform makes preparation faster and the status visible. KRS advisors stay responsible for judgment, review and every piece of work that must be handled by a licensed professional.",
  },
  {
    question: "Which Greek systems do you work with?",
    answer:
      "AADE, myDATA, TAXISnet, EFKA, ERGANI and gov.gr, plus the documents Greek businesses need for accounting, payroll and tax continuity.",
  },
  {
    question: "What can I ask my tax team?",
    answer:
      "VAT, payroll obligations, company structure, deductions, deadlines, filings and monthly reports. Your question goes to the right advisor with your file attached, and you get a reviewed answer within 24 hours.",
  },
] as const;

export const videos = [
  {
    id: "Wl6-gvmHT88",
    title: "Building a company in Greece.",
    text: "The early decisions that shape a business.",
  },
  {
    id: "_HIrEfhkh6Y",
    title: "What entrepreneurship looks like in practice.",
    text: "Clients, teams and staying focused as you grow.",
  },
  {
    id: "-_k56R5dp7U",
    title: "Advice founders wait too long to hear.",
    text: "Tax, cash and structure, in plain language.",
  },
] as const;

export const compliance = [
  { label: "GDPR", src: "/logos/compliance/gdpr.svg" },
  { label: "SOC 2", src: "/logos/compliance/soc2.svg" },
  { label: "ISO 27001", src: "/logos/compliance/iso27001.svg" },
] as const;
