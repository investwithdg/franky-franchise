/* ============================================================
   FRANKY FRANCHISE — Diagnostic Question Bank
   4 pillars × 5 questions = 20 questions
   Each option scores 1–5.  Pillar score scales to 0–1000.
   ============================================================ */

window.FRANKY_PILLARS = ['hiring', 'sales', 'vendors', 'operations'];

window.FRANKY_QUESTIONS = {
  /* ── HIRING ──────────────────────────────────────────────── */
  hiring: {
    label: 'Hiring',
    icon: 'users',
    color: 'var(--info)',
    description: "Let's look at your talent pipeline — how fast you fill roles, how long people stay, and whether they're set up to succeed.",
    questions: [
      {
        id: 'h1',
        text: 'How long does it typically take to fill an open crew position?',
        options: [
          { label: 'Over 6 weeks — we struggle to find anyone',                score: 1 },
          { label: '4–6 weeks',                                                 score: 2 },
          { label: '2–4 weeks',                                                 score: 3 },
          { label: '1–2 weeks',                                                 score: 4 },
          { label: 'Under a week — we have a bench ready',                      score: 5 },
        ],
      },
      {
        id: 'h2',
        text: "What's your annual crew turnover rate?",
        options: [
          { label: 'Over 200% — constant churn',           score: 1 },
          { label: '150–200%',                              score: 2 },
          { label: '100–150%',                              score: 3 },
          { label: '50–100%',                               score: 4 },
          { label: 'Under 50% — very stable team',         score: 5 },
        ],
      },
      {
        id: 'h3',
        text: 'How would you rate your new-hire training program?',
        options: [
          { label: 'No formal training — they learn on the fly',          score: 1 },
          { label: 'Basic orientation only',                               score: 2 },
          { label: 'Documented process but inconsistently followed',       score: 3 },
          { label: 'Structured program, mostly followed',                  score: 4 },
          { label: 'Comprehensive with checklists, mentorship, and tracking', score: 5 },
        ],
      },
      {
        id: 'h4',
        text: 'How often are your shifts fully staffed?',
        options: [
          { label: "Rarely — we're always short",                     score: 1 },
          { label: 'About half the time',                              score: 2 },
          { label: 'Most days, but weekends are tough',                score: 3 },
          { label: 'Almost always — minor gaps only',                  score: 4 },
          { label: 'Consistently — we plan ahead and cross-train',     score: 5 },
        ],
      },
      {
        id: 'h5',
        text: 'Do you have a clear advancement path for crew members?',
        options: [
          { label: 'No — people leave when they want to grow',                 score: 1 },
          { label: 'We promote sometimes but it\'s ad-hoc',                    score: 2 },
          { label: 'Informal growth conversations happen',                      score: 3 },
          { label: 'Clear roles exist but no formal program',                   score: 4 },
          { label: 'Defined career ladder with milestones and regular reviews', score: 5 },
        ],
      },
    ],
  },

  /* ── SALES ───────────────────────────────────────────────── */
  sales: {
    label: 'Sales',
    icon: 'trending-up',
    color: 'var(--success)',
    description: 'Now for revenue health — ticket size, upselling, traffic, and how you stack up against the brand average.',
    questions: [
      {
        id: 's1',
        text: 'How has your average ticket size trended this quarter?',
        options: [
          { label: 'Down significantly',                          score: 1 },
          { label: 'Down slightly',                               score: 2 },
          { label: 'Flat',                                        score: 3 },
          { label: 'Up slightly',                                 score: 4 },
          { label: 'Up meaningfully — upselling is working',      score: 5 },
        ],
      },
      {
        id: 's2',
        text: 'What percentage of your crew consistently upsells or suggests add-ons?',
        options: [
          { label: 'Almost none',                                  score: 1 },
          { label: 'A few standouts — maybe 10–20%',              score: 2 },
          { label: 'About half',                                   score: 3 },
          { label: 'Most of the team — 60–80%',                   score: 4 },
          { label: "Nearly everyone — it's part of the culture",   score: 5 },
        ],
      },
      {
        id: 's3',
        text: 'How is your customer visit frequency trending?',
        options: [
          { label: 'Declining noticeably',                            score: 1 },
          { label: 'Slightly down',                                   score: 2 },
          { label: 'Holding steady',                                  score: 3 },
          { label: 'Growing slowly',                                  score: 4 },
          { label: 'Strong growth — loyalty and repeats are up',      score: 5 },
        ],
      },
      {
        id: 's4',
        text: 'How effective are your local marketing promotions?',
        options: [
          { label: "We don't run any — or have no idea if they work",  score: 1 },
          { label: 'We try things but rarely track results',            score: 2 },
          { label: "Hit or miss — some work, some don't",              score: 3 },
          { label: 'Most campaigns drive measurable traffic',           score: 4 },
          { label: 'Dialed in — clear ROI on every campaign',          score: 5 },
        ],
      },
      {
        id: 's5',
        text: "How does your revenue per unit compare to your brand's national average?",
        options: [
          { label: 'Well below average',       score: 1 },
          { label: 'Slightly below',           score: 2 },
          { label: 'About average',            score: 3 },
          { label: 'Above average',            score: 4 },
          { label: 'Top quartile',             score: 5 },
        ],
      },
    ],
  },

  /* ── VENDORS ─────────────────────────────────────────────── */
  vendors: {
    label: 'Vendors',
    icon: 'truck',
    color: 'var(--warning)',
    description: 'Supply chain and vendor relationships — costs, contracts, reliability, and quality.',
    questions: [
      {
        id: 'v1',
        text: 'How do your key supply costs compare to brand benchmarks?',
        options: [
          { label: "Way above — we're overpaying",          score: 1 },
          { label: 'Somewhat above benchmark',               score: 2 },
          { label: 'About in line',                          score: 3 },
          { label: 'Slightly below — good deals locked in',  score: 4 },
          { label: 'Well below — we negotiate hard',         score: 5 },
        ],
      },
      {
        id: 'v2',
        text: 'When did you last review or renegotiate vendor contracts?',
        options: [
          { label: "Can't remember — or never",    score: 1 },
          { label: 'Over 2 years ago',              score: 2 },
          { label: '1–2 years ago',                 score: 3 },
          { label: 'Within the last year',          score: 4 },
          { label: 'We review quarterly',           score: 5 },
        ],
      },
      {
        id: 'v3',
        text: 'How reliable are your vendor deliveries?',
        options: [
          { label: 'Frequent missed or late deliveries',             score: 1 },
          { label: 'Regular issues — monthly or more',               score: 2 },
          { label: 'Occasional hiccups — maybe quarterly',           score: 3 },
          { label: 'Rare issues — once or twice a year',             score: 4 },
          { label: 'Extremely reliable — almost never a problem',    score: 5 },
        ],
      },
      {
        id: 'v4',
        text: 'How often do you encounter quality issues with supplied goods?',
        options: [
          { label: 'Constantly — it affects the product',       score: 1 },
          { label: 'Regularly — a few times a month',           score: 2 },
          { label: 'Occasionally — monthly or so',              score: 3 },
          { label: 'Rarely',                                    score: 4 },
          { label: 'Almost never — quality is locked in',       score: 5 },
        ],
      },
      {
        id: 'v5',
        text: 'What are your typical vendor payment terms?',
        options: [
          { label: 'COD or prepay — no leverage',                 score: 1 },
          { label: 'Net 15',                                      score: 2 },
          { label: 'Net 30',                                      score: 3 },
          { label: 'Net 45',                                      score: 4 },
          { label: 'Net 60+ with early-pay discounts available',  score: 5 },
        ],
      },
    ],
  },

  /* ── OPERATIONS ──────────────────────────────────────────── */
  operations: {
    label: 'Operations',
    icon: 'cog',
    color: 'var(--brand)',
    description: 'The day-to-day engine — compliance, maintenance, customer satisfaction, and management coverage.',
    questions: [
      {
        id: 'o1',
        text: 'How did your most recent compliance or brand audit go?',
        options: [
          { label: 'Failed — serious issues flagged',             score: 1 },
          { label: 'Multiple flags and corrections required',      score: 2 },
          { label: 'Passed with some notes',                       score: 3 },
          { label: 'Passed cleanly',                               score: 4 },
          { label: 'Perfect or near-perfect score',                score: 5 },
        ],
      },
      {
        id: 'o2',
        text: 'How current is your equipment maintenance schedule?',
        options: [
          { label: 'No schedule — we fix things when they break',          score: 1 },
          { label: "We have a schedule but don't follow it",               score: 2 },
          { label: 'Mostly on schedule with some gaps',                     score: 3 },
          { label: 'On schedule with minor exceptions',                     score: 4 },
          { label: 'Fully current — preventive maintenance logged',        score: 5 },
        ],
      },
      {
        id: 'o3',
        text: "What's your trend in customer complaints or negative reviews?",
        options: [
          { label: "Increasing — and we're not sure why",                   score: 1 },
          { label: 'Steady but too many',                                   score: 2 },
          { label: 'Holding steady at an acceptable level',                 score: 3 },
          { label: "Declining — we're actively improving",                  score: 4 },
          { label: 'Very few — we respond fast and fix root causes',        score: 5 },
        ],
      },
      {
        id: 'o4',
        text: 'How well-documented are your standard operating procedures?',
        options: [
          { label: 'Nothing written down — tribal knowledge',               score: 1 },
          { label: 'Some docs but mostly outdated',                         score: 2 },
          { label: 'Key processes documented',                              score: 3 },
          { label: 'Comprehensive SOPs — mostly current',                   score: 4 },
          { label: 'Living playbook, regularly updated and trained on',     score: 5 },
        ],
      },
      {
        id: 'o5',
        text: 'What is your manager-to-store ratio and oversight quality?',
        options: [
          { label: '1 manager for 4+ stores — stretched thin',            score: 1 },
          { label: '1 manager for 3 stores — managing',                   score: 2 },
          { label: '1 manager for 2 stores — decent coverage',            score: 3 },
          { label: '1 manager per store',                                  score: 4 },
          { label: 'Strong team with clear delegation and accountability', score: 5 },
        ],
      },
    ],
  },
};

/* ── Segment definitions (Verifiable benchmark baselines) ─── */
window.FRANKY_SEGMENTS = {
  qsr: {
    label: 'Quick-Service Restaurant (QSR)',
    baselineLeak: 52000,
    hiringCostPerPerson: 2300,
    averageTurnoverRate: 0.75,
  },
  auto: {
    label: 'Automotive Dealership',
    baselineLeak: 120000,
    hiringCostPerPerson: 48000,
    averageTurnoverRate: 0.35,
  },
  fitness: {
    label: 'Boutique Fitness Studio',
    baselineLeak: 45000,
    hiringCostPerPerson: 4200,
    averageTurnoverRate: 0.40,
  },
  healthcare: {
    label: 'Healthcare Retail (Dental/Chiro)',
    baselineLeak: 95000,
    hiringCostPerPerson: 8500,
    averageTurnoverRate: 0.25,
  },
  general: {
    label: 'General / Personal Services',
    baselineLeak: 35000,
    hiringCostPerPerson: 3200,
    averageTurnoverRate: 0.45,
  }
};

/* ── Scoring helpers ───────────────────────────────────────── */
window.FrankyScoring = {
  /**
   * Calculate pillar score from an array of 5 answer scores (each 1–5).
   * Returns 0–1000.
   */
  pillarScore(answers) {
    const raw = answers.reduce((s, v) => s + v, 0);   // 5–25
    return Math.round(((raw - 5) / 20) * 1000);
  },

  /** Overall score = mean of four pillar scores. */
  overallScore(pillarScores) {
    const vals = Object.values(pillarScores);
    return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
  },

  /** Score band. */
  band(score) {
    if (score >= 800) return 'strong';
    if (score >= 600) return 'steady';
    if (score >= 400) return 'watch';
    return 'critical';
  },

  bandLabel(band) {
    return { strong: 'Thriving', steady: 'Steady', watch: 'Watch', critical: 'Critical' }[band] || band;
  },

  /** Calculate annual leak in dollars based on segment and scores */
  calculateLeaks(segmentKey, pillarScores) {
    const segment = window.FRANKY_SEGMENTS[segmentKey] || window.FRANKY_SEGMENTS.general;
    
    // Defined max leaks per segment per category based on industry bleed analyses
    const maxLeaks = {
      qsr: { hiring: 90000, sales: 40000, vendors: 45000, operations: 35000 },
      auto: { hiring: 240000, sales: 90000, vendors: 60000, operations: 80000 },
      fitness: { hiring: 80000, sales: 60000, vendors: 25000, operations: 35000 },
      healthcare: { hiring: 110000, sales: 150000, vendors: 45000, operations: 75000 },
      general: { hiring: 50000, sales: 30000, vendors: 20000, operations: 25000 }
    }[segmentKey] || { hiring: 50000, sales: 30000, vendors: 20000, operations: 25000 };

    const leaks = {};
    let totalLeak = 0;
    
    window.FRANKY_PILLARS.forEach(key => {
      const score = pillarScores[key] || 0;
      const maxL = maxLeaks[key] || 50000;
      // The lower the score, the higher the leak (e.g. 1000 score = $0 leak, 0 score = max leak)
      const leakVal = Math.round((1 - (score / 1000)) * maxL);
      leaks[key] = leakVal;
      totalLeak += leakVal;
    });

    return {
      leaks,
      totalLeak,
      baselineLeak: segment.baselineLeak,
    };
  }
};

/* ── Action bank (post-diagnostic recommendations) ─────── */
window.FRANKY_ACTIONS = {
  hiring: {
    critical: [
      { t: 'Launch an urgent hiring blitz', d: 'Post on 3+ channels today — you need bodies in seats this week.' },
      { t: 'Offer a referral bonus to current crew', d: 'Existing team members are your fastest pipeline.' },
      { t: 'Simplify the application process', d: 'Reduce steps to apply — every friction point costs candidates.' },
    ],
    watch: [
      { t: 'Fill open shift-lead roles within 2 weeks', d: 'Understaffed stores score 18% lower on Operations.' },
      { t: 'Conduct stay interviews with top performers', d: 'Find out what keeps your best people — before they leave.' },
      { t: 'Build a bench of 2–3 on-call crew members', d: 'A short-call list prevents scrambling on no-shows.' },
    ],
    steady: [
      { t: 'Formalize your training checklist', d: 'Documented onboarding cuts early turnover by up to 25%.' },
      { t: 'Create a crew advancement path', d: 'Visible growth keeps your strongest people longer.' },
      { t: 'Start tracking time-to-fill as a KPI', d: 'What you measure improves.' },
    ],
    strong: [
      { t: 'Document what's working in hiring', d: 'Your process is strong — capture it so it scales.' },
      { t: 'Mentor a struggling unit's hiring manager', d: 'Share your playbook across the portfolio.' },
      { t: 'Explore employer branding', d: 'Great teams attract great people — tell that story publicly.' },
    ],
  },
  sales: {
    critical: [
      { t: 'Implement a basic upsell script this week', d: 'Even a simple "would you like to add..." lifts tickets.' },
      { t: 'Audit your menu pricing vs. competitors', d: 'You may be leaving money on the table — or pricing people out.' },
      { t: 'Run a limited-time promo to drive traffic', d: 'Get people back in the door, then work on ticket size.' },
    ],
    watch: [
      { t: 'Roll out upsell training to the bottom 50% of crew', d: 'Your top sellers prove it works — now spread it.' },
      { t: 'Launch a loyalty program or punch card', d: 'Repeat visits compound revenue faster than new acquisition.' },
      { t: 'Track and share daily ticket-size averages per unit', d: 'Visibility drives accountability.' },
    ],
    steady: [
      { t: 'Roll out the upsell script to remaining units', d: 'Top units see +6% ticket size — bring everyone up.' },
      { t: 'A/B test a new promo format', d: 'You have a baseline that works — now optimize.' },
      { t: 'Set a 90-day revenue-per-unit target', d: 'A clear goal focuses the team.' },
    ],
    strong: [
      { t: 'Analyze what your top unit does differently', d: 'Replicate success across the portfolio.' },
      { t: 'Explore catering or delivery partnerships', d: 'New channels can grow revenue without adding seats.' },
      { t: 'Invest in local brand awareness', d: 'You've earned the right to spend — compound it.' },
    ],
  },
  vendors: {
    critical: [
      { t: 'Renegotiate your top 3 vendor contracts', d: 'You're overpaying — this is the fastest margin fix available.' },
      { t: 'Get competitive bids from alternative suppliers', d: 'Leverage is everything in vendor negotiations.' },
      { t: 'Audit delivery reliability and document issues', d: 'Data gives you negotiating power.' },
    ],
    watch: [
      { t: 'Renegotiate cheese & dough vendor', d: 'Costs up vs. benchmark — lock in before Q3 increases.' },
      { t: 'Set up a quarterly vendor review cadence', d: 'Regular check-ins prevent cost creep.' },
      { t: 'Document quality issues for the last 90 days', d: 'Build the case before the conversation.' },
    ],
    steady: [
      { t: 'Negotiate longer payment terms', d: 'Net 45 or 60 improves cash flow without changing suppliers.' },
      { t: 'Consolidate orders to unlock volume discounts', d: 'Buying power across units should be leveraged.' },
      { t: 'Build relationships with backup suppliers', d: 'Options prevent being held hostage by any single vendor.' },
    ],
    strong: [
      { t: 'Lock in multi-year pricing where possible', d: 'Your rates are great — protect them from inflation.' },
      { t: 'Explore co-op purchasing with other operators', d: 'More volume, better rates, shared leverage.' },
      { t: 'Document your vendor management playbook', d: 'This is a competitive advantage — formalize it.' },
    ],
  },
  operations: {
    critical: [
      { t: 'Address the top 3 compliance audit failures', d: 'Fix the flags before the next visit — closures are expensive.' },
      { t: 'Create a daily opening/closing checklist', d: 'The basics need to be airtight before anything else.' },
      { t: 'Assign a manager to the at-risk location full-time', d: 'This store needs dedicated attention right now.' },
    ],
    watch: [
      { t: 'Implement a preventive maintenance schedule', d: 'Reactive repairs cost 3–5× more than planned maintenance.' },
      { t: 'Respond to all negative reviews within 24 hours', d: 'Speed and tone turn critics into repeat customers.' },
      { t: 'Update your SOPs for the top 5 daily processes', d: 'Current docs reduce errors and speed up training.' },
    ],
    steady: [
      { t: 'Run a mock audit at each location this month', d: 'Find the gaps yourself before the brand does.' },
      { t: 'Set up a weekly ops scorecard per unit', d: 'A quick pulse keeps small issues from compounding.' },
      { t: 'Cross-train managers across locations', d: 'Flexibility prevents single points of failure.' },
    ],
    strong: [
      { t: 'Certify your ops playbook for new unit openings', d: 'You've built a machine — document it for scale.' },
      { t: 'Share your ops practices at a franchise conference', d: 'Industry recognition attracts better talent and deals.' },
      { t: 'Explore automation for routine compliance checks', d: 'Free up manager time for higher-leverage work.' },
    ],
  },
};
