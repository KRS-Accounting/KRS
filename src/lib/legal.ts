export const legalEntity = {
  name: "KRS AI Services",
  email: "krs@krs.gr",
  phone: "+30 21 0934 1211",
  phoneHref: "tel:+302109341211",
  address: ["Leof. Andrea Siggrou 120", "Athina 117 42", "Greece"],
};

export const legalNav = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookies & Tracking", href: "/legal/cookies" },
] as const;

export type InlinePart = string | { text: string; href: string; external?: boolean };

export type LegalBlock =
  | { type: "p"; parts: InlinePart[] }
  | { type: "h3"; text: string }
  | { type: "list"; items: InlinePart[][] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  href: (typeof legalNav)[number]["href"];
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const p = (...parts: InlinePart[]): LegalBlock => ({ type: "p", parts });
const h3 = (text: string): LegalBlock => ({ type: "h3", text });
const list = (...items: InlinePart[][]): LegalBlock => ({ type: "list", items });

export const termsOfService: LegalDocument = {
  href: "/legal/terms-of-service",
  title: "Terms of Service",
  description:
    "Terms for the KRS AI platform and for accounting, tax, payroll, and compliance services provided to Greek businesses.",
  updated: "24 September 2026",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      blocks: [
        p(
          "By accessing or using the services provided by ",
          legalEntity.name,
          ' ("KRS", "we", "us", or "our"), including our website, platform, and related accounting, tax, payroll, funding, and consulting services (together, the "Services"), you ("you" or "your") agree to these Terms of Service ("Terms").',
        ),
        p("If you do not agree to these Terms, do not use the Services."),
        p(
          "This page is placeholder website copy, adapted for the Greek market. A signed engagement letter or service agreement controls the work we actually do for you.",
        ),
      ],
    },
    {
      id: "services",
      title: "2. Description of Services",
      blocks: [
        p(
          "KRS provides an operating platform and a licensed accounting practice for Greek businesses. The Services include:",
        ),
        list(
          ["Bookkeeping and accounting records, including myDATA submissions"],
          ["Tax advisory, VAT, and filings with AADE"],
          ["Payroll, EFKA contributions, and ERGANI notices"],
          ["Funding and grant support, and related consulting"],
          ["Company administration support, including formation steps and GEMI filings where agreed"],
        ),
        p(
          "KRS AI Services operates the technology platform and the client experience. Reserved accounting and tax work is performed by licensed tax and accounting professionals. KRS AI Services and those licensed partners are separate legal entities cooperating as a network. Each entity is responsible only for its own acts and omissions, to the extent permitted by Greek law.",
        ),
        p(
          "The Services may be updated to improve the product, add features, or meet Greek and EU compliance requirements.",
        ),
      ],
    },
    {
      id: "responsibilities",
      title: "3. User Responsibilities",
      blocks: [
        p("When using the Services, you agree to:"),
        list(
          ["Use the Services in line with the laws of Greece and the European Union."],
          ["Not use the Services for unlawful activity."],
          [
            "Make sure documents and data you upload do not infringe the rights of other people, including intellectual property rights.",
          ],
          ["Keep your login details confidential and accept responsibility for activity under your account."],
          [
            "Give us accurate, complete, and timely information. Greek filings are only as reliable as the records you provide.",
          ],
        ),
      ],
    },
    {
      id: "payment",
      title: "4. Subscription and Payment",
      blocks: [
        p("KRS offers monthly plans for ongoing accounting support, including:"),
        list(
          ["Independent and Independent Start, for sole traders and freelancers."],
          ["IKE / EPE and IKE / EPE Start, for private companies."],
          ["AE and AE Start, for sociétés anonymes."],
          ["Custom, for groups and more complex structures."],
        ),
        p("Payment terms:"),
        list(
          [
            "Fees are quoted in euro, exclude Greek VAT unless stated otherwise, and are billed in advance.",
          ],
          [
            "Fees are non-refundable except where Greek or EU law requires a refund, including mandatory consumer rights where those rights apply.",
          ],
          [
            "You may cancel at any time. Cancellation takes effect at the end of the current billing period, unless the engagement letter says otherwise.",
          ],
          [
            "Payroll, formation, notarial work, and specialist tax matters are scoped separately and confirmed in writing before that work begins.",
          ],
        ),
      ],
    },
    {
      id: "privacy",
      title: "5. Data Protection and Privacy",
      blocks: [
        p(
          "KRS processes personal data in line with the General Data Protection Regulation (EU) 2016/679 and Greek Law 4624/2019.",
        ),
        p(
          "Our ",
          { text: "Privacy Policy", href: "/legal/privacy-policy" },
          " explains what we collect, why we use it, and the rights you have, including access, rectification, erasure, restriction, portability, and objection.",
        ),
        p(
          "By using the Services, you acknowledge that we process personal data to provide and improve the Services. For privacy questions, email ",
          { text: legalEntity.email, href: `mailto:${legalEntity.email}` },
          ".",
        ),
        p(
          "Where KRS processes personal data on your behalf as a processor, a data processing agreement applies and forms part of these Terms. We will provide it on request.",
        ),
      ],
    },
    {
      id: "ip",
      title: "6. Intellectual Property Rights",
      blocks: [
        p(
          "The Services, including software, trademarks, content, and design, belong to KRS or its licensors.",
        ),
        p(
          "You receive a limited, non-exclusive, non-transferable licence to use the Services for your internal business purposes, in line with these Terms.",
        ),
        p(
          "You may not copy, reverse-engineer, or commercially exploit the Services without our prior written consent. Documents and data you upload remain yours.",
        ),
      ],
    },
    {
      id: "liability",
      title: "7. Limitation of Liability",
      blocks: [
        p("To the extent Greek and EU law allow, KRS is not liable for:"),
        list(
          ["Indirect, incidental, special, or consequential damages."],
          ["Loss of profits, revenue, data, goodwill, or other intangible losses."],
          [
            "Damages from unauthorised access to or misuse of personal data where we took reasonable security measures.",
          ],
        ),
        p(
          "Nothing in these Terms limits liability that Greek or EU law does not allow us to limit, including liability for intent, gross negligence, or breaches of mandatory consumer rights.",
        ),
      ],
    },
    {
      id: "changes",
      title: "8. Modifications to the Services and Terms",
      blocks: [
        p(
          "We may update the Services to improve them, keep them secure, or comply with Greek or EU law.",
        ),
        p(
          "We may revise these Terms from time to time. The latest version is always on this page. Where the law requires it, we will tell you about material changes in advance.",
        ),
        p("If you keep using the Services after updated Terms take effect, you accept the changes."),
      ],
    },
    {
      id: "law",
      title: "9. Governing Law and Jurisdiction",
      blocks: [
        p(
          "These Terms are governed by the laws of Greece and applicable EU law.",
        ),
        p(
          "Disputes are subject to the exclusive jurisdiction of the competent courts of Athens, unless mandatory consumer protection law requires another court.",
        ),
      ],
    },
    {
      id: "platform",
      title: "10. Platform and licensed work",
      blocks: [
        h3("10.1 Who does what"),
        p(
          "KRS AI Services provides the platform: the file, deadlines, document intake, and the tools your advisor uses. KRS AI Services is not a payment institution and does not hold client funds.",
        ),
        p(
          "Licensed tax and accounting professionals perform reserved work, including bookkeeping opinions, tax filings, payroll calculations, and representations before AADE, EFKA, ERGANI, and GEMI, within the agreed scope.",
        ),
        h3("10.2 If something goes wrong"),
        p("KRS AI Services is responsible for:"),
        list(
          ["The platform, the interface, and technical support."],
          ["Showing the status of your file, documents, and deadlines."],
          ["Routing questions to the advisor responsible for your work."],
        ),
        p("The licensed professional responsible for a filing is responsible for:"),
        list(
          ["The professional judgment in that filing."],
          ["Submissions made in their name and within the agreed scope."],
          ["Professional secrecy and the rules of their licence."],
        ),
      ],
    },
    {
      id: "accounting",
      title: "11. Accounting, tax, and payroll services",
      blocks: [
        h3("11.1 Scope"),
        p(
          "Bookkeeping, tax preparation, VAT, myDATA, annual accounts, payroll, and related compliance work are provided under a separate engagement letter. That letter sets the scope, deliverables, and fees.",
        ),
        h3("11.2 Your responsibilities"),
        p("When you engage those services, you agree to:"),
        list(
          ["Provide accurate, complete, and timely information and documents."],
          ["Tell us promptly about changes that affect your tax, payroll, or company position."],
          ["Review and approve deliverables in time for Greek filing deadlines."],
          ["Remain responsible for business decisions you make using our work."],
        ),
        p(
          "Our obligation is to perform the services with reasonable care and skill. We do not guarantee a tax outcome, a grant award, or the result of an audit.",
        ),
        h3("11.3 Authorisation"),
        p(
          "By engaging the services, you authorise KRS and the licensed professional on your file to communicate with AADE, EFKA, ERGANI, GEMI, and other relevant Greek authorities for matters inside the agreed scope.",
        ),
        h3("11.4 Liability"),
        p("Liability for professional services is governed by the engagement letter. In general:"),
        list(
          [
            "Liability is limited to direct damages and capped at the fees paid for the specific services that gave rise to the claim.",
          ],
          ["KRS is not liable for indirect or consequential damages, including lost profits."],
          ["Claims must be sent in writing within 30 days of discovering the issue."],
          ["The limitation period for claims is 12 months from the event that gave rise to the claim."],
        ),
        p("These limits do not apply in cases of intent or gross negligence, or where Greek law forbids them."),
        h3("11.5 Confidentiality"),
        p(
          "We treat client information as confidential and process personal data in line with section 5 and Greek data protection law. A data processing agreement forms part of the engagement where we process personal data on your behalf.",
        ),
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  href: "/legal/privacy-policy",
  title: "Privacy Policy",
  description:
    "How KRS AI Services collects, uses, and protects personal data for its website and Greek accounting, payroll, and tax services.",
  updated: "24 September 2026",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      blocks: [
        p(
          'This Privacy Policy explains how ',
          legalEntity.name,
          ' ("KRS", "we", "us", or "our") collects, uses, stores, and protects personal data when you visit our website, request a consultation, subscribe to updates, or use our accounting, payroll, tax, funding, and related services (together, the "Services").',
        ),
        p(
          "By using the Services, you confirm that you have read this policy. If you do not agree, please do not use the Services.",
        ),
        p(
          "This page is placeholder website copy, adapted for the Greek market. It does not replace a data processing agreement or an engagement letter.",
        ),
      ],
    },
    {
      id: "controller",
      title: "2. Data controller",
      blocks: [
        p("The controller for personal data described in this policy is:"),
        p(legalEntity.name),
        p("Email: ", { text: legalEntity.email, href: `mailto:${legalEntity.email}` }),
        p("Leof. Andrea Siggrou 120, Athina 117 42, Greece"),
        p(
          "Where a licensed tax or accounting partner performs reserved professional work, that partner may be an independent controller for the file they sign. They process that data under their professional duties and this policy.",
        ),
      ],
    },
    {
      id: "collect",
      title: "3. Information we collect",
      blocks: [
        h3("3.1 Communication data"),
        list(
          ["Contact details you send us, such as your name, email, phone number, and the message itself."],
          ["Business enquiry details, such as company name, legal form, and role."],
        ),
        h3("3.2 Data collected through the Services"),
        list(
          [
            "Usage data, including IP address, browser type, operating system, and general statistics about how the website is used.",
          ],
          [
            "Cookies and similar technologies, used for the website to function, for analytics, and to remember preferences. See our ",
            { text: "Cookie Policy", href: "/legal/cookies" },
            ".",
          ],
          [
            "Client file data needed to do the work, such as company documents, tax identifiers, invoices, payroll records, and correspondence with AADE, EFKA, ERGANI, or GEMI.",
          ],
        ),
        h3("3.3 Marketing and enquiries"),
        p("We may collect personal data when you:"),
        list(
          ["Request a consultation or complete the onboarding form."],
          ["Subscribe to updates or download a guide."],
          ["Contact us about a role, a partnership, or the press."],
        ),
      ],
    },
    {
      id: "use",
      title: "4. How we use your information",
      blocks: [
        p("We process personal data to:"),
        list(
          ["Provide, maintain, and improve the Services, including your accounting file."],
          ["Answer enquiries, provide support, and send notices you need about filings and deadlines."],
          ["Prepare and submit work to Greek authorities when you have asked us to."],
          ["Understand how the website is used and improve it."],
          ["Protect the Services against misuse, fraud, and security incidents."],
          ["Meet legal duties under Greek and EU law, including tax, payroll, and anti-money-laundering rules that apply to the engagement."],
        ),
      ],
    },
    {
      id: "basis",
      title: "5. Legal basis for processing",
      blocks: [
        p("We rely on the following bases under the GDPR:"),
        list(
          ["Performance of a contract, when processing is needed to provide the Services you asked for."],
          [
            "Legitimate interests, for running the practice, securing the platform, and understanding website use, where those interests do not override your rights.",
          ],
          ["Legal obligation, when Greek or EU law requires the processing, including retention of tax and payroll records."],
          [
            "Consent, for optional marketing messages and non-essential cookies. You can withdraw consent at any time.",
          ],
        ),
      ],
    },
    {
      id: "sharing",
      title: "6. Data sharing and transfers",
      blocks: [
        p("We may share personal data with:"),
        list(
          [
            "Service providers that help us run the Services, including hosting, email, analytics, customer support, accounting software, and payroll tools.",
          ],
          [
            "Greek authorities, when a filing or a legal duty requires it, including AADE, EFKA, ERGANI, and GEMI.",
          ],
          ["Licensed professionals in the KRS network who work on your file."],
          ["Public authorities, where a law, regulation, or court order requires disclosure."],
          [
            "A buyer or investor, if the business is restructured, financed, or sold, with appropriate safeguards.",
          ],
        ),
        h3("Transfers outside the EEA"),
        p(
          "If personal data is transferred outside the European Economic Area, we use a lawful mechanism, such as a European Commission adequacy decision, Standard Contractual Clauses, or another safeguard required at the time.",
        ),
      ],
    },
    {
      id: "rights",
      title: "7. Your rights",
      blocks: [
        p("Under the GDPR you can ask us to:"),
        list(
          ["Provide a copy of your personal data."],
          ["Correct inaccurate or incomplete data."],
          ["Delete data, where the law allows it."],
          ["Restrict certain processing."],
          ["Provide your data in a structured, machine-readable format."],
          ["Stop processing based on legitimate interests, and stop direct marketing."],
          ["Withdraw consent, where processing is based on consent."],
        ),
        p(
          "You can also complain to the Hellenic Data Protection Authority (Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα), Kifissias 1-3, 115 23 Athens, ",
          { text: "www.dpa.gr", href: "https://www.dpa.gr/", external: true },
          ".",
        ),
        p(
          "To use these rights, email ",
          { text: legalEntity.email, href: `mailto:${legalEntity.email}` },
          ". We may ask you to confirm your identity before we act.",
        ),
      ],
    },
    {
      id: "retention",
      title: "8. Data retention",
      blocks: [
        p(
          "We keep personal data only for as long as we need it to provide the Services, meet legal duties, resolve disputes, and enforce our agreements.",
        ),
        p(
          "Greek tax, accounting, payroll, and company law often require books and records to be kept for at least five years after the relevant year, and sometimes longer. We keep those records for the statutory period, then delete or anonymise them.",
        ),
      ],
    },
    {
      id: "security",
      title: "9. Security",
      blocks: [
        p(
          "We use technical and organisational measures designed to protect personal data against unauthorised access, disclosure, alteration, or destruction.",
        ),
        p("No system can promise absolute security. We will tell you about a breach when the law requires it."),
      ],
    },
    {
      id: "updates",
      title: "10. Updates to this policy",
      blocks: [
        p(
          "We may update this policy when our practices, tools, or legal duties change. The current version is always at ",
          { text: "this page", href: "/legal/privacy-policy" },
          ". Where the law requires it, we will tell you about material changes.",
        ),
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  href: "/legal/cookies",
  title: "Cookie Policy",
  description:
    "How KRS AI Services uses cookies and similar technologies on its website, and how you can control them.",
  updated: "24 September 2026",
  sections: [
    {
      id: "what",
      title: "1. What are cookies?",
      blocks: [
        p(
          "Cookies are small text files stored on your computer or phone. Your browser keeps them when you use krs.ai. When you return, the browser sends them back so the site can recognise a previous visit.",
        ),
        p(
          "This page is placeholder website copy, adapted for the Greek market. The table below describes the cookies we expect to use. It will be updated when the live tag set is confirmed.",
        ),
      ],
    },
    {
      id: "why",
      title: "2. Why we use cookies",
      blocks: [
        p(
          "Cookies help us see how the website is used, keep it fast and secure, and remember a choice you have made. Some cookies are set by us. Others are set by providers that support analytics, support chat, or embedded video.",
        ),
        p(
          "Essential cookies are required for the site to work. Analytics, support, and marketing cookies run only where Greek and EU rules require consent, and you can refuse them.",
        ),
        {
          type: "table",
          headers: ["Cookie", "Provider", "Purpose", "Storage"],
          rows: [
            [
              "_ga",
              "Google",
              "Distinguishes visitors for analytics. You can opt out with the Google Analytics opt-out add-on.",
              "24 months",
            ],
            [
              "_ga_<container-id>",
              "Google",
              "Keeps analytics session state so visits can be measured across pages.",
              "24 months",
            ],
            [
              "intercom-id-[app_id]",
              "Intercom",
              "Anonymous visitor identifier, so a conversation can continue if you use support chat.",
              "9 months",
            ],
            [
              "intercom-session-[app_id]",
              "Intercom",
              "Identifies the browser session and keeps recent support messages available. Renewed on activity.",
              "1 week",
            ],
            [
              "intercom-device-id-[app_id]",
              "Intercom",
              "Identifies the device talking to support chat, including to limit abuse.",
              "9 months",
            ],
            [
              "Matomo cookies",
              "Matomo",
              "Stores visit information between sessions. Matomo can also run without cookies if you refuse analytics.",
              "24 months",
            ],
            [
              "YouTube",
              "Google",
              "Set if you play an embedded video. We use the privacy-enhanced youtube-nocookie.com player.",
              "Session, or as set by YouTube",
            ],
          ],
        },
      ],
    },
    {
      id: "delete",
      title: "3. Can I delete cookies?",
      blocks: [
        p(
          "Yes. You can delete cookies in your browser, and you can block new ones in the browser settings. Some parts of the website may not work properly without essential cookies.",
        ),
        p(
          "For Google Analytics specifically, Google offers an opt-out browser add-on at ",
          {
            text: "tools.google.com/dlpage/gaoptout",
            href: "https://tools.google.com/dlpage/gaoptout",
            external: true,
          },
          ".",
        ),
      ],
    },
    {
      id: "rights",
      title: "4. Your rights",
      blocks: [
        p(
          "You can ask for access to personal data collected through cookies, and you can ask us to correct or delete it, restrict processing, or provide a copy. Email ",
          { text: legalEntity.email, href: `mailto:${legalEntity.email}` },
          ". We may ask you to confirm your identity.",
        ),
        p(
          "You can withdraw consent for non-essential cookies at any time. Withdrawal does not affect processing that was lawful before you withdrew.",
        ),
        p(
          "You can also complain to the Hellenic Data Protection Authority at ",
          { text: "www.dpa.gr", href: "https://www.dpa.gr/", external: true },
          ".",
        ),
      ],
    },
    {
      id: "changes",
      title: "5. Changes to this statement",
      blocks: [
        p(
          "We may change this Cookie Policy. The version on this page is the one that applies. Please check it when you return if you want to see whether the cookie list has changed.",
        ),
      ],
    },
  ],
};

export const legalDocuments = [termsOfService, privacyPolicy, cookiePolicy];
