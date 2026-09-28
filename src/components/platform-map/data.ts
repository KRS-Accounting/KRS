import {
  accountingPage,
  consultingPage,
  fundingGrantsPage,
  payrollPage,
  taxAdvisoryPage,
  type ServicePageData,
} from "@/lib/service-pages";

import type { ReviewStatus } from "./status";

export type PlatformServiceId = "accounting" | "tax-advisory" | "payroll" | "consulting" | "funding-grants";

export type ClientInput = {
  label: string;
  channel: string;
  status: ReviewStatus;
};

export type WorkItem = {
  label: string;
  detail: string;
  status: ReviewStatus;
};

export type PlatformService = {
  id: PlatformServiceId;
  name: string;
  subtitle: string;
  caption: string;
  href: string;
  exploreLabel: string;
  workTitle: string;
  reviewer: { role: string; image: string; imageAlt: string };
  inputs: readonly ClientInput[];
  work: readonly WorkItem[];
};

function pageLinks(page: ServicePageData) {
  return {
    href: `/services/${page.slug}`,
    exploreLabel: page.exploreLabel,
  };
}

function reviewer(page: ServicePageData, role: string) {
  return { role, image: page.advisorImage, imageAlt: page.advisorImageAlt };
}

/**
 * Import from server components only and pass it down as props: importing it in
 * client code would ship every service page's copy to the browser.
 */
export const platformServices: PlatformService[] = [
  {
    id: "accounting",
    name: "Accounting",
    subtitle: "Invoices & receipts",
    caption: "Transactions sync automatically while KRS accountants keep every entry accurate and compliant.",
    ...pageLinks(accountingPage),
    workTitle: "Matched transactions",
    reviewer: reviewer(accountingPage, "Licensed accountant"),
    inputs: [
      { label: "Sales invoices", channel: "myDATA sync", status: "reviewed" },
      { label: "Expense receipts", channel: "Photo upload", status: "reviewed" },
      { label: "Bank activity", channel: "Bank feed", status: "reviewed" },
      { label: "Attachments", channel: "Email in", status: "prepared" },
      { label: "Evidence needed for review", channel: "Advisor request", status: "waiting" },
    ],
    work: [
      { label: "Alpha Supplies", detail: "€1,240 matched to INV-2481", status: "reviewed" },
      { label: "Cosmote", detail: "€86 matched to receipt 0932", status: "reviewed" },
      { label: "Piraeus Bank fee", detail: "€12 posted to bank charges", status: "reviewed" },
      { label: "Office Depot", detail: "€450 needs its receipt", status: "waiting" },
      { label: "myDATA", detail: "September sales reconciled", status: "reviewed" },
      { label: "VAT period", detail: "Prepared from the books", status: "prepared" },
    ],
  },
  {
    id: "tax-advisory",
    name: "Tax Advisory",
    subtitle: "VAT & income tax",
    caption:
      "VAT and income tax are prepared from the books, then checked by a licensed advisor before anything reaches AADE.",
    ...pageLinks(taxAdvisoryPage),
    workTitle: "Filing calendar",
    reviewer: reviewer(taxAdvisoryPage, "Tax advisor"),
    inputs: [
      { label: "Closed books", channel: "From accounting", status: "reviewed" },
      { label: "Cross-border sales", channel: "OSS data", status: "prepared" },
      { label: "Deductible expenses", channel: "Expense review", status: "reviewed" },
      { label: "AADE authorisation", channel: "Taxisnet", status: "reviewed" },
      { label: "Tax questions", channel: "Advisor chat", status: "reviewed" },
    ],
    work: [
      { label: "ΦΠΑ return", detail: "Q3 filed with AADE", status: "reviewed" },
      { label: "Reverse charge", detail: "EU supplier invoices checked", status: "reviewed" },
      { label: "OSS return", detail: "Prepared for EU sales", status: "prepared" },
      { label: "Income tax return", detail: "E3 from the closed year", status: "prepared" },
      { label: "Advance tax", detail: "Reviewed before filing", status: "reviewed" },
      { label: "Next AADE date", detail: "31 Oct, needs your sign-off", status: "waiting" },
    ],
  },
  {
    id: "payroll",
    name: "Payroll",
    subtitle: "People & pay changes",
    caption: "Payroll runs from contract to payslip while a payroll advisor files EFKA and ERGANI before payday.",
    ...pageLinks(payrollPage),
    workTitle: "Pay run",
    reviewer: reviewer(payrollPage, "Payroll advisor"),
    inputs: [
      { label: "New hire details", channel: "AFM · AMKA · bank", status: "reviewed" },
      { label: "Employment contracts", channel: "Upload", status: "reviewed" },
      { label: "Salary changes", channel: "Payroll form", status: "reviewed" },
      { label: "Leavers & schedule changes", channel: "Message", status: "prepared" },
      { label: "Pay-run approval", channel: "One-click approve", status: "waiting" },
    ],
    work: [
      { label: "Payslips", detail: "12 ready before payday", status: "reviewed" },
      { label: "Employer cost", detail: "Ready for your approval", status: "waiting" },
      { label: "APD", detail: "Submitted to EFKA", status: "reviewed" },
      { label: "ERGANI notice", detail: "Filed before the first shift", status: "reviewed" },
      { label: "Employee records", detail: "Contracts and changes updated", status: "prepared" },
    ],
  },
  {
    id: "consulting",
    name: "Consulting",
    subtitle: "Plans & decisions",
    caption: "Plans are tested against the numbers while a KRS advisor turns them into a focused next step.",
    ...pageLinks(consultingPage),
    workTitle: "Advisory file",
    reviewer: reviewer(consultingPage, "Business advisor"),
    inputs: [
      { label: "Business plan", channel: "Current draft", status: "reviewed" },
      { label: "Growth question", channel: "Advisor call", status: "reviewed" },
      { label: "Assumptions", channel: "Workshop", status: "prepared" },
      { label: "Operating data", channel: "From the books", status: "prepared" },
      { label: "Decision owners", channel: "Leadership", status: "waiting" },
    ],
    work: [
      { label: "Financial model", detail: "Three scenarios tested", status: "reviewed" },
      { label: "Cash needs", detail: "12-month runway view", status: "reviewed" },
      { label: "Decision memo", detail: "New hire versus outsourcing", status: "prepared" },
      { label: "Owners & milestones", detail: "Awaiting leadership sign-off", status: "waiting" },
      { label: "Review rhythm", detail: "Monthly management review", status: "reviewed" },
    ],
  },
  {
    id: "funding-grants",
    name: "Funding & Grants",
    subtitle: "Company & project",
    caption: "Greek and EU calls are matched to your company while a funding advisor prepares the application with you.",
    ...pageLinks(fundingGrantsPage),
    workTitle: "Funding pipeline",
    reviewer: reviewer(fundingGrantsPage, "Funding advisor"),
    inputs: [
      { label: "Company profile", channel: "Activity · size · region", status: "reviewed" },
      { label: "Project to fund", channel: "Project brief", status: "reviewed" },
      { label: "Supporting documents", channel: "Upload", status: "prepared" },
      { label: "Budget figures", channel: "From the books", status: "prepared" },
      { label: "Sign-off", channel: "Approval", status: "waiting" },
    ],
    work: [
      { label: "ESPA call", detail: "Matched to your profile", status: "reviewed" },
      { label: "Weak fits", detail: "3 calls filtered out", status: "reviewed" },
      { label: "Budget", detail: "Drafted with the case", status: "prepared" },
      { label: "Application", detail: "Ready to file after sign-off", status: "waiting" },
      { label: "Reporting dates", detail: "Kept on the project file", status: "prepared" },
    ],
  },
];
