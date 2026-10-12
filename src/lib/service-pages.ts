export type ServicePageData = {
  slug: string; eyebrow: string; title: string; description: string; heroImage: string; heroImageAlt: string;
  heroKicker: string; exploreLabel: string; featuresTitle: string;
  features: readonly { title: string; description: string }[];
  benefitsTitle: string; benefitsDescription: string;
  benefits: readonly { index: string; title: string; description: string; image?: string; imageAlt?: string }[];
  processTitle: string; processDescription: string;
  process: readonly { title: string; description: string; image: string; imageAlt: string }[];
  advisorImage: string; advisorImageAlt: string; testimonialEyebrow: string; testimonialTitle: string;
  testimonials: readonly { quote: string; role: string }[];
  faqTitle: string; faqDescription: string; faqs: readonly { question: string; answer: string }[];
  finalTitle: string; finalDescription: string;
};

const onboardingProcess = [
  { title: "Free initial consultation", description: "Tell us how your business operates and where the current process is falling short. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS consultation shown on a modern smartphone" },
  { title: "A clear working plan", description: "Once you choose KRS, we confirm the people, records, deadlines and next actions so responsibility is visible from the beginning.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Business documents moving securely into the KRS operating file" },
  { title: "Your first working rhythm", description: "Meet the KRS team responsible for your file, connect the working flows and receive a clear view of the first priority.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A completed KRS work summary ready for review" },
] as const;

export const accountingPage = {
  slug: "accounting", eyebrow: "Accounting", title: "We keep the books. You keep building.",
  description: "Monthly accounting for Greek companies, reviewed by licensed accountants and kept current through myDATA, VAT and the close.",
  heroImage: "/images/krs-accountant-advisor.png", heroImageAlt: "KRS accounting advisor speaking directly with a business client", heroKicker: "Formation / books / reporting / closure", exploreLabel: "Explore accounting",
  featuresTitle: "Less time on admin. More time on the business.",
  features: [
    { title: "Less admin, every month", description: "Matching, VAT and myDATA move through one monthly process, so the team is not chasing the close." },
    { title: "Expert support when you need it", description: "Talk to accountants who already know the business, not a ticket queue that starts from zero." },
    { title: "Always up to date", description: "Live books, monthly reporting and recurring checks keep a clear picture of performance." },
  ],
  benefitsTitle: "What stays in the accounting work, every month.", benefitsDescription: "The books, VAT and myDATA coding, and the monthly pack stay with one accountant, so the close is a review, not a chase.",
  benefits: [
    { index: "01", title: "Monthly books", description: "Income, costs and bank lines are recorded and reconciled through the month, then closed on a date.", image: "/images/krs-accounting-benefit-books.jpg", imageAlt: "A navy ledger with clipped receipts beside a checked calendar block" },
    { index: "02", title: "VAT and myDATA", description: "VAT treatment and myDATA classification sit on the same lines as the books, so the return does not start from a separate pile.", image: "/images/krs-accounting-benefit-vat.jpg", imageAlt: "An invoice tagged and sealed as reviewed" },
    { index: "03", title: "Management reporting", description: "P&L, balance sheet and cash flow are prepared with the close, in language the team can use.", image: "/images/krs-accounting-benefit-reporting.jpg", imageAlt: "A bar chart and a summary card from the monthly management pack" },
    { index: "04", title: "A named accountant", description: "Questions go to the person on the file. They already have the period, the exceptions and the last answer.", image: "/images/krs-accounting-benefit-accountant.jpg", imageAlt: "A KRS accountant beside a message marked as answered" },
  ],
  processTitle: "Switch your accounting to KRS in three clear steps.", processDescription: "Changing accountants takes coordination. KRS manages the background work, protects active deadlines and prepares your first monthly close.",
  process: [
    { title: "Free initial consultation", description: "Tell us how your business operates and where the current process is falling short. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS accounting consultation shown on a modern smartphone" },
    { title: "Managed data transfer", description: "Once you choose KRS, we coordinate the handover with your previous accountant, collect the records and protect active deadlines.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Accounting documents moving securely into the KRS operating file" },
    { title: "First monthly close", description: "Meet the KRS team responsible for your file, connect the working flows and receive your first monthly accounting overview.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A completed KRS monthly accounting report" },
  ],
  advisorImage: "/images/krs-expert-accounting-advisor.webp", advisorImageAlt: "KRS accounting specialist", testimonialEyebrow: "Accounting perspectives", testimonialTitle: "What better accounting changes first.",
  testimonials: [
    { quote: "The monthly close stopped being a search across inboxes. We know what is missing, who owns it and when the numbers are ready.", role: "Composite of common operator feedback" },
    { quote: "What changed was access. We can ask the person responsible for our file and get an answer that reflects how our business actually works.", role: "Composite of common founder feedback" },
    { quote: "The reports now lead to a management conversation about cash, costs and the next decision instead of arriving after the moment has passed.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Accounting questions worth asking early.", faqDescription: "The first conversation is free and focused on understanding the facts before recommending a route.",
  faqs: [
    { question: "Does KRS handle the full accounting process?", answer: "KRS organises the agreed accounting work, from recurring books and reconciliations to the relevant filings and reporting. Your team supplies business context and documents that only you can provide." },
    { question: "Can KRS take over from our current accountant?", answer: "Yes. The switch starts with a records review and a dated responsibility plan, so active deadlines continue while working methods move to KRS." },
    { question: "Can you help with older or incomplete periods?", answer: "Often, yes. We assess the books, missing evidence and outstanding submissions, then define the remediation work and timing." },
    { question: "Can KRS help us form a new company?", answer: "Yes. KRS can support entity selection, formation planning and the first accounting setup, then continue as the recurring accounting team." },
    { question: "What financial reporting can management receive?", answer: "The scope can include accounting results, cash-flow monitoring, budgets and actual-versus-plan analysis. The format and frequency are shaped around the decisions your team needs to make." },
    { question: "Can KRS also manage an orderly company closure?", answer: "Yes. We begin by reviewing the entity, records and open obligations, then coordinate the accounting and tax actions required for a documented closure." },
    { question: "Will we speak with real people?", answer: "Yes. You communicate directly with KRS professionals who know your business and can bring specialised accounting, tax, payroll or financial expertise into the conversation when needed." },
  ],
  finalTitle: "Make accounting part of how the business moves forward.", finalDescription: "One team, one operating rhythm and a clearer view from the first company decision to the latest monthly close.",
} as const satisfies ServicePageData;

export const taxAdvisoryPage = {
  slug: "tax-advisory", eyebrow: "Tax", title: "Tax handled. Deadlines kept.",
  description: "VAT returns, the annual income tax filing and practical tax advice for Greek companies, prepared by licensed advisors and submitted through AADE.",
  heroImage: "/images/krs-pricing-advisory-session.png", heroImageAlt: "KRS tax advisor reviewing a filing with a client", heroKicker: "VAT / income tax / OSS / advice", exploreLabel: "Explore tax advisory",
  featuresTitle: "Stay current. No deadline left to chance.",
  features: [
    { title: "VAT on your filing cycle", description: "VAT returns are prepared and submitted to AADE on the monthly or quarterly cycle that applies to your books." },
    { title: "Income tax from the closed year", description: "The annual income tax return and E3 are prepared from the accounts, with deductions and advance tax reviewed before filing." },
    { title: "Advice while there is time to act", description: "Questions about VAT, deductibility and cross-border sales are answered during the year, before the treatment is locked into a return." },
  ],
  benefitsTitle: "What stays with your tax advisor, year-round.", benefitsDescription: "VAT, income tax, EU filings and advice stay on one calendar, with one advisor owning the next deadline.",
  benefits: [
    { index: "01", title: "VAT returns", description: "Periodic VAT returns are prepared from the books, checked against myDATA and filed with AADE.", image: "/images/krs-tax-benefit-vat.jpg", imageAlt: "A VAT return being placed into a submission box" },
    { index: "02", title: "Corporate income tax", description: "The annual income tax return and E3 are prepared from the closed accounts, including deductions, adjustments and advance tax.", image: "/images/krs-tax-benefit-income.jpg", imageAlt: "A balance scale weighing documents against coins" },
    { index: "03", title: "EU VAT reporting", description: "OSS and intra-EU reporting are coordinated alongside domestic VAT when the company sells beyond Greece.", image: "/images/krs-tax-benefit-eu.jpg", imageAlt: "A globe ringed with stars and linked to filing cards" },
    { index: "04", title: "Advice and deadline monitoring", description: "Upcoming AADE deadlines remain visible, and tax questions are answered before they affect a return.", image: "/images/krs-tax-benefit-deadlines.jpg", imageAlt: "A desk calendar with a marked date beside an hourglass" },
  ],
  processTitle: "Move tax filings to KRS in three clear steps.", processDescription: "Changing who files takes a review of open returns first. KRS protects the next deadline while the tax position comes across.",
  process: [
    { title: "Free initial consultation", description: "Tell us how the company trades and which returns are open. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS tax consultation shown on a modern smartphone" },
    { title: "A clear working plan", description: "Once you choose KRS, we confirm authorisations, open AADE deadlines and the records needed before the next filing.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Tax records moving into the KRS file" },
    { title: "Your first filing rhythm", description: "Meet the advisor responsible for the file, and see the next VAT return and income-tax date with a named owner.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A KRS tax calendar ready for the next filing" },
  ],
  advisorImage: "/images/krs-expert-tax-advisor.webp", advisorImageAlt: "KRS tax advisory specialist", testimonialEyebrow: "Tax perspectives", testimonialTitle: "What a watched tax calendar changes first.",
  testimonials: [
    { quote: "The VAT return stopped arriving as a surprise. We can see the period, what is still open, and who files it.", role: "Composite of common operator feedback" },
    { quote: "The income tax conversation started from the closed books, not from a pile of questions in June.", role: "Composite of common founder feedback" },
    { quote: "When we started selling in the EU, the OSS and listing deadlines had an owner before the first invoice went out.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Tax questions worth asking before a deadline.", faqDescription: "The first conversation is free and looks at open returns, how you trade, and the next AADE date.",
  faqs: [
    { question: "Are VAT and income tax filings included?", answer: "Periodic VAT returns and the annual income tax filing, including the E3, are part of the agreed scope. Specialist matters such as an AADE audit, a restructuring, or a one-off ruling are scoped separately and confirmed in writing before that work starts." },
    { question: "What happens if a deadline is already close?", answer: "We start with the next AADE date. If KRS is taking over the filings, we map what can still be submitted on time and what needs a separate catch-up plan, so a late return is not discovered after the fact." },
    { question: "Can KRS handle EU and cross-border VAT?", answer: "Yes. We coordinate Greek VAT, the OSS return where you sell to consumers in other EU countries, and intra-EU reporting for B2B sales. Obligations outside that scope are confirmed before work begins." },
    { question: "Can I speak directly with a tax advisor?", answer: "Yes. You message the advisor responsible for the file. They already have the books, the open returns and the prior answers, so the conversation does not start from zero." },
    { question: "Do you only file returns, or also advise?", answer: "Both. Filings are prepared and submitted, and the same advisor flags VAT treatment, deductibility and cross-border questions during the year, before they are locked into a return." },
  ],
  finalTitle: "Keep VAT and income tax on a calendar someone owns.", finalDescription: "One advisor, the next AADE date in view, and a tax position that is reviewed before the return is due.",
} as const satisfies ServicePageData;

export const payrollPage = {
  slug: "payroll", eyebrow: "Payroll", title: "Payroll handled. Payday kept.",
  description: "Payroll for Greek companies, from the employment contract to the payslip. KRS runs the monthly payroll, EFKA contributions and ERGANI notices, so growing the team does not grow the admin.",
  heroImage: "/images/krs-hero-payroll.jpg", heroImageAlt: "A payroll handover between a KRS advisor and a client", heroKicker: "Payslips / EFKA / ERGANI / hires", exploreLabel: "Explore payroll",
  featuresTitle: "Everything payroll needs. The admin stays with KRS.",
  features: [
    { title: "Payroll from contract to payslip", description: "Employment contracts, the monthly run, payslips and the filings that follow stay in one workflow." },
    { title: "New hires on the next run", description: "Once the details are complete, a new employee is set up for payroll within one business day, and the ERGANI hire notice is filed before their first day." },
    { title: "EFKA and ERGANI handled with the payroll", description: "EFKA contributions, the monthly APD and ERGANI notices are prepared from the same payroll, not reconstructed after payday." },
  ],
  benefitsTitle: "What stays with your payroll advisor, every month.", benefitsDescription: "Onboarding, the monthly run, EFKA, ERGANI and employee records stay with one advisor, on one calendar.",
  benefits: [
    { index: "01", title: "Employee onboarding", description: "Contract, AFM, AMKA and bank details are collected once, followed by the ERGANI hire notice and the first payslip.", image: "/images/krs-payroll-benefit-onboarding.jpg", imageAlt: "An employee badge resting on an open onboarding folder" },
    { index: "02", title: "Monthly payroll", description: "Gross pay, net pay, employer cost and payslips are prepared before the pay date, with that month’s changes already included.", image: "/images/krs-payroll-benefit-payroll.jpg", imageAlt: "A payslip in an envelope beside a stack of coins" },
    { index: "03", title: "EFKA, payroll tax and ERGANI", description: "Employee and employer contributions, the monthly APD, payroll withholding and ERGANI notices are filed within their own deadlines.", image: "/images/krs-payroll-benefit-filings.jpg", imageAlt: "An official stamp beside a sealed filing form" },
    { index: "04", title: "Employee records", description: "Contracts, payslips and changes are kept with each employee’s record, so the next run does not start from an inbox.", image: "/images/krs-payroll-benefit-records.jpg", imageAlt: "An open card-index box of employee records" },
  ],
  processTitle: "Move payroll to KRS in three clear steps.", processDescription: "Changing payroll providers starts with your team and the next pay date. KRS protects that date while the employee records move across.",
  process: [
    { title: "Free initial consultation", description: "Tell us how the team is paid and whether any hires are pending. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS payroll consultation shown on a modern smartphone" },
    { title: "A clear working plan", description: "Once you choose KRS, we confirm the pay date, ERGANI access and the employee details needed before the first run.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Payroll records moving into the KRS file" },
    { title: "Your first payroll run", description: "Meet the advisor responsible for your payroll, and see the next payslip, APD and any pending hire with a named owner.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A KRS payroll calendar ready for the next run" },
  ],
  advisorImage: "/images/krs-expert-payroll-advisor.webp", advisorImageAlt: "KRS payroll specialist", testimonialEyebrow: "Payroll perspectives", testimonialTitle: "What a watched pay date changes first.",
  testimonials: [
    { quote: "We stopped assembling the payroll from messages. The changes are in before the payslips go out.", role: "Composite of common operator feedback" },
    { quote: "A new hire no longer waits on a spreadsheet. The ERGANI notice and the first payslip have an owner.", role: "Composite of common people-team feedback" },
    { quote: "Employer cost is visible before we approve the run, which is when the number is still useful.", role: "Composite of common founder feedback" },
  ],
  faqTitle: "Payroll questions worth asking before payday.", faqDescription: "The first conversation is free and looks at headcount, the pay date, and any hire that has not been declared yet.",
  faqs: [
    { question: "What is included in payroll?", answer: "The agreed work covers the monthly run, payslips, employee and employer EFKA, the APD, ERGANI notices for hires and changes, and the employee record. You still approve pay and supply details only you have, such as a new contract or a leaver’s last day." },
    { question: "How much does payroll cost?", answer: "Payroll administration starts at €14 per employee per month. The final fee reflects headcount, pay patterns and any extra employment coordination, and is confirmed before onboarding." },
    { question: "How quickly can a new employee be added?", answer: "When the contract, AFM, AMKA and bank details are complete, the hire is prepared for payroll within one business day. The ERGANI notice is filed before the first shift, so the person is on the next run." },
    { question: "Do you file EFKA and ERGANI?", answer: "Yes. Contributions are calculated on the run, the monthly APD goes to EFKA, and ERGANI notices for hires, schedule changes and leavers are filed on their own dates." },
    { question: "Do we need separate payroll software?", answer: "No. The payroll run, the filings and the employee record stay in the KRS file, with a person you can message. You do not keep a second spreadsheet to make payday work." },
  ],
  finalTitle: "Keep payday, EFKA and ERGANI on one calendar.", finalDescription: "One advisor, the next pay date in view, and a hire that is declared before the first shift.",
} as const satisfies ServicePageData;

export const consultingPage = {
  slug: "consulting", eyebrow: "Services / Consulting services", title: "Business decisions, grounded in the numbers.", description: "KRS helps founders and leadership teams test the assumptions, financial implications and practical steps behind a growth plan, investment or operational decision.",
  heroImage: "/images/krs-consulting-advisor.png", heroImageAlt: "KRS business advisor discussing a growth plan with a founder in Athens", heroKicker: "Planning / growth / finance / decisions", exploreLabel: "Explore consulting",
  featuresTitle: "Clearer decisions. Practical plans to carry them out.", features: [
    { title: "Plans built from current information", description: "Turn current performance, cash needs and key assumptions into a plan leadership can use." },
    { title: "Scenarios before commitments", description: "Compare costs, revenue, cash and timing before committing to a hire, investment, new market or change in direction." },
    { title: "A recommendation with owners and dates", description: "Convert the chosen direction into actions, responsibilities, milestones and measures of progress." },
  ],
  benefitsTitle: "What stays in the advisory work, from question to action.", benefitsDescription: "The financial model, decision framework, implementation plan and review points stay together, so the recommendation remains connected to the work that follows.",
  benefits: [
    { index: "01", title: "Business planning", description: "Turn goals, assumptions, revenue drivers, costs and funding requirements into a plan the leadership team can use.", image: "/images/krs-consulting-benefit-planning.jpg", imageAlt: "A compass resting on a business-plan booklet" },
    { index: "02", title: "Financial modelling", description: "Test revenue, costs, cash flow and alternative scenarios before the business commits to a direction.", image: "/images/krs-consulting-benefit-modelling.jpg", imageAlt: "Stacked blocks comparing three scenarios" },
    { index: "03", title: "Decision support", description: "Compare the financial and operational effects of a new hire, market, investment or change in strategy.", image: "/images/krs-consulting-benefit-decisions.jpg", imageAlt: "A signpost pointing in two directions" },
    { index: "04", title: "Management review", description: "Establish a practical cadence for reviewing performance, risks, decisions and progress against the plan.", image: "/images/krs-consulting-benefit-review.jpg", imageAlt: "A performance dashboard beside a stack of review cards" },
  ],
  processTitle: "Start a business advisory project in three clear steps.", processDescription: "KRS begins with the decision in front of you, aligns the facts and people, then agrees the practical work plan.", process: onboardingProcess,
  advisorImage: "/images/krs-consulting-advisor.png", advisorImageAlt: "KRS consulting advisor in conversation with a founder", testimonialEyebrow: "Consulting perspectives", testimonialTitle: "What focused business advice creates.",
  testimonials: [
    { quote: "The plan became more useful once we tied ambition to the numbers, decisions and owners needed to deliver it.", role: "Composite of common founder feedback" },
    { quote: "We left with a practical sequence, not a longer list of things to consider.", role: "Composite of common operator feedback" },
    { quote: "The financial view gave leadership a shared basis for the decision instead of competing assumptions.", role: "Composite of common leadership-team feedback" },
  ],
  faqTitle: "Consulting questions worth discussing early.", faqDescription: "The first conversation is about the decision, timing and business context, so KRS can suggest a focused scope rather than a generic engagement.",
  faqs: [
    { question: "What kinds of consulting services does KRS offer?", answer: "KRS supports business planning, financial modelling, investment and growth decisions, management reporting and operational finance questions. The scope is built around a specific decision, output and timetable." },
    { question: "Can you help us prepare a business plan?", answer: "Yes. KRS can develop the assumptions, financial model, operating plan and supporting evidence required for a business plan. The structure is adapted to its purpose, whether it is for management, investors or a funding application." },
    { question: "Will consulting connect to our accounting information?", answer: "Yes. With your permission, the advisory work can use current accounting, management and operating information, so recommendations are based on the company’s actual position rather than a separate set of assumptions." },
    { question: "How long does a consulting project take?", answer: "Timing depends on the decision, available information and people involved. KRS confirms the milestones, responsibilities, expected outputs and timetable before work begins." },
    { question: "Do you help implement the recommendations?", answer: "The agreed scope can cover the recommendation alone or include implementation planning and ongoing review. The actions, owners and milestones are confirmed before the project begins." },
    { question: "How are consulting fees structured?", answer: "Fees depend on the scope, outputs, timetable and whether support is project-based or ongoing. KRS confirms the fee and working plan in writing before the engagement begins." },
  ],
  finalTitle: "Turn the next business decision into a workable plan.", finalDescription: "Bring the decision, available information and key assumptions. KRS will help turn them into a practical plan with clear actions, owners and milestones.",
} as const satisfies ServicePageData;

export const fundingGrantsPage = {
  slug: "funding-grants", eyebrow: "Services / Funding and grants", title: "Funding matched. Applications prepared.",
  description: "KRS monitors Greek and EU funding programmes, screens open opportunities against your company and project, and prepares selected applications with you.",
  heroImage: "/images/krs-funding-advisor.png", heroImageAlt: "KRS funding advisor and founder reviewing a grant application in Athens", heroKicker: "ESPA / Horizon / EIC / applications", exploreLabel: "Explore funding and grants",
  featuresTitle: "From a relevant opportunity to a submitted application.", features: [
    { title: "Greek and EU programmes on one watchlist", description: "Current NSRF (ESPA), Development Law, Horizon Europe, EIC and other national and EU opportunities are monitored against the same company profile." },
    { title: "An eligibility screen before anyone starts writing", description: "Legal form, activity, size, region, project costs and timing are checked against the published criteria before application work begins." },
    { title: "An application prepared with you", description: "KRS prepares the business case, budget and forms. You provide the required documents and approve the final application before submission." },
  ],
  benefitsTitle: "What stays with your funding advisor, from search to submission.", benefitsDescription: "Programme monitoring, eligibility screening, application preparation and the obligations that follow stay on one project file.",
  benefits: [
    { index: "01", title: "Programme monitoring", description: "Current Greek and EU opportunities are monitored against the company and proposed project.", image: "/images/krs-funding-benefit-monitoring.jpg", imageAlt: "A magnifying glass over a fan of programme documents" },
    { index: "02", title: "Eligibility screening", description: "Legal form, company size, region, project costs and timing are reviewed before application work begins.", image: "/images/krs-funding-benefit-screening.jpg", imageAlt: "A funnel narrowing several cards down to one" },
    { index: "03", title: "Application preparation", description: "KRS prepares the business case, budget and forms with clear responsibilities for the documents and approvals you provide.", image: "/images/krs-funding-benefit-application.jpg", imageAlt: "An open portfolio of application pages with a fountain pen" },
    { index: "04", title: "Award and reporting calendar", description: "If funding is awarded, spending conditions, deliverables and reporting dates remain visible on the project file.", image: "/images/krs-funding-benefit-reporting.jpg", imageAlt: "An award rosette beside a report booklet" },
  ],
  processTitle: "Start funding support in three clear steps.", processDescription: "KRS begins with the company and the project, confirms which calls fit, then agrees who prepares what before the deadline.", process: onboardingProcess,
  advisorImage: "/images/krs-funding-advisor.png", advisorImageAlt: "KRS funding advisor reviewing an application with a founder", testimonialEyebrow: "Funding perspectives", testimonialTitle: "What a watched funding calendar changes.",
  testimonials: [
    { quote: "We stopped reading every call. The ones that reached us actually fitted the company.", role: "Composite of common founder feedback" },
    { quote: "The application moved because our part was named: the documents, the numbers and the sign-off.", role: "Composite of common operator feedback" },
    { quote: "The deadline was on the calendar before anyone had to ask whether the call was still open.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Funding questions worth asking before you apply.", faqDescription: "The first conversation looks at the company, the project and which Greek or EU routes are actually open.",
  faqs: [
    { question: "Which programmes do you cover?", answer: "Greek routes include the NSRF (ESPA) programmes and regional calls, the Development Law and other current national grant and loan schemes. EU routes include Horizon Europe, the European Innovation Council (Pathfinder, Transition, Accelerator and related calls) and other EU programmes such as Digital Europe, LIFE and Interreg. New calls are screened as they are published." },
    { question: "Will we be notified when something opens?", answer: "Yes. When KRS identifies a potentially relevant call, or a deadline moves, we check it against your company and project and notify you if it remains worth considering. You do not have to watch the portals." },
    { question: "Can you guarantee that we are eligible or that funding will be awarded?", answer: "No. Initial screening identifies potential matches, but final eligibility depends on the complete call criteria and supporting evidence. Funding decisions are made by the programme authority, not KRS." },
    { question: "Do you prepare and submit the application?", answer: "Yes, with your cooperation. KRS drafts the business case, the budget and the forms. You provide the company facts, documents and approval. We submit it once you approve the complete pack." },
    { question: "How are funding and application fees structured?", answer: "Fees depend on the programme, the scope of the application and any support needed after an award. KRS confirms the fee structure in writing before application work begins." },
    { question: "What happens if funding is awarded?", answer: "Spending conditions, deliverables and reporting dates stay on the project file, so the obligations do not become a separate scramble after the award. Whether KRS also prepares the progress and final reports is confirmed in the agreed scope." },
  ],
  finalTitle: "Let the next fitting call reach you before the deadline.", finalDescription: "One company profile, Greek and EU programmes on the same list, and an application prepared with you.",
} as const satisfies ServicePageData;
