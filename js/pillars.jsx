/* Franky Franchise — The Four Pillars explanation page. */
const { Button, Badge, Card, Stat } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO   = 'assets/franky-logo.png';
const MASCOT = 'assets/franky-mascot.png';
const BADGE  = 'assets/franky-badge.png';

function Icon({ name, size = 18, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Nav (shared) ────────────────────────────────────────── */
function PillarsNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => { FrankyAuth.onChanged(u => setUser(u)); }, []);

  return (
    <nav className="ff-nav" role="navigation" aria-label="Main navigation">
      <div className="ff-nav-inner">
        <a href="index.html" className="ff-nav-logo">
          <img src={LOGO} width={42} height={42} alt="Franky Franchise" />
          <span>Franky Franchise</span>
        </a>
        <div className="ff-nav-links">
          <a href="index.html#product">Product</a>
          <a href="pillars.html" style={{ color: 'var(--brand)' }}>The Four Pillars</a>
          <a href="pricing.html">Pricing</a>
          <a href="blog.html">Blog</a>
        </div>
        <div className="ff-nav-actions">
          {user
            ? <a href="dashboard.html" className="ff-nav-login">Dashboard</a>
            : <a href="dashboard.html?demo=1" className="ff-nav-login">Demo</a>
          }
          <Button variant="primary" onClick={() => window.location.href = user ? 'diagnostic.html' : 'auth.html'}>
            Get my score
          </Button>
        </div>
        <button className="ff-hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'x' : 'menu'} size={20} color="var(--text-strong)" />
        </button>
      </div>
      {menuOpen && (
        <div style={{
          padding: '0 var(--space-4) var(--space-4)',
          display: 'flex', flexDirection: 'column', gap: 8,
          background: 'var(--surface-page)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <a href="index.html#product" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Product</a>
          <a href="pillars.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>The Four Pillars</a>
          <a href="pricing.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="blog.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>Blog</a>
          {user
            ? <a href="dashboard.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Dashboard</a>
            : <a href="dashboard.html?demo=1" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Demo</a>
          }
        </div>
      )}
    </nav>
  );
}

/* ── Four Pillars Detailed Data ──────────────────────────── */
const PILLARS_DETAIL = [
  {
    id: 'people',
    name: 'People',
    icon: 'users',
    color: 'var(--ff-red)',
    tagline: 'Pipeline health, turnover rate, and manager independence.',
    measures: 'Hiring metrics, employee lifecycle duration, cross-training coverage, and owner operational bottleneck risk.',
    math: [
      { label: 'QSR Crew turnover', stat: '75-130%', desc: 'Annual turnover rate, costing $5,864 per hourly crew replacement (Cornell).' },
      { label: 'Store General Manager', stat: '$87,651', desc: 'Average replacement cost due to onboarding, recruitment, and output gap.' },
      { label: 'Dealership Technician', stat: '$15K–$25K', desc: 'Recruiting and certification ramp loss when a technician walks.' }
    ],
    interventions: [
      'Build passive, evergreen talent pipelines rather than reactive emergency job posts.',
      'Implement structured 30-60-90 day onboarding protocols to reduce early turnover.',
      'Cross-train at least two employees on every critical system function to remove single-points-of-failure.',
      'Establish shift-lead development paths to move owners out of daily checklists.'
    ]
  },
  {
    id: 'revenue',
    name: 'Revenue',
    icon: 'trending-up',
    color: 'var(--ff-green)',
    tagline: 'Upsell consistency, ticket values, and compensation alignment.',
    measures: 'Upsell protocol adherence, check/repair order averages, comp and incentive structure transparency, and customer conversion rates.',
    math: [
      { label: 'Ticket size boost', stat: '+8–15%', desc: 'Average ticket increase achievable through shiftupsell scripting without adding new traffic.' },
      { label: 'Dealership repair value', stat: '$350+', desc: 'Target average repair order (RO) ticket value, tracked against F&I product attachment rates.' },
      { label: 'QSR margin leverage', stat: 'Volume-sensitive', desc: 'Revenue is highly volume-dependent; micro ticket improvements scale exponentially.' }
    ],
    interventions: [
      'Document check/ticket upsell protocols and run training with weekly measurements.',
      'Align employee incentive and commission plans directly with high-margin revenue goals.',
      'Audit third-party delivery and digital platforms to optimize product placement and pricing structures.',
      'Regularly review price books and service menus against competitor benchmarks.'
    ]
  },
  {
    id: 'resources',
    name: 'Resources',
    icon: 'truck',
    color: 'var(--ff-yellow)',
    tagline: 'Vendor cost competitiveness, inventory waste, and COGS control.',
    measures: 'Vendor contracts management, supply shrinkage, inventory turn rates, and prime cost ratios.',
    math: [
      { label: 'Unchecked contract drag', stat: '3–8%', desc: 'Ongoing revenue leakage caused by failing to renegotiate vendor supply terms annually.' },
      { label: 'QSR Prime cost target', stat: '< 55%', desc: 'Combined food and labor costs target to sustain standard profitability benchmarks.' },
      { label: 'Food/Parts waste', stat: '4–8%', desc: 'Average leakage caused by lack of inventory logging and untracked scrap.' }
    ],
    interventions: [
      'Perform vendor cost audits against competitive quotes on every major contract annually.',
      'Establish a strict weekly inventory and waste-tracking protocol for raw ingredients or parts.',
      'Negotiate volume commitments with documented price protections.',
      'Audit days-supply of inventory to free up locked capital.'
    ]
  },
  {
    id: 'systems',
    name: 'Systems',
    icon: 'cog',
    color: 'var(--brand)',
    tagline: 'Process documentation, tech stack efficiency, and operational backup plans.',
    measures: 'Written SOP coverage, manager compliance, POS/scheduling/CRM utilization, and the "Bus Factor" score.',
    math: [
      { label: 'Owner operational bottleneck', stat: '50-60 hrs', desc: 'Average work week of owners who lack documented systems to delegate work.' },
      { label: 'The Bus Factor', stat: 'Crucial metric', desc: 'How many days a unit can operate at 90% efficiency without the owner/key manager.' },
      { label: 'SOP coverage target', stat: '80%+', desc: 'Standard system coverage target to ensure processes are transferable to managers.' }
    ],
    interventions: [
      'Map out and document standard procedures for the top 5 daily critical store tasks.',
      'Identify and automate/delegate the top 3 decisions that currently require owner involvement.',
      'Implement single-screen dashboards tracking 5–7 actionable leading metrics.',
      'Enforce checklist adherence for store opening, shift handoffs, and closing routines.'
    ]
  }
];

/* ── Methodology Callout ────────────────────────────────── */
function Methodology() {
  return (
    <section className="ff-container" style={{ padding: '48px var(--space-8)' }}>
      <div className="ff-pillars-layout-grid ff-reveal" style={{ alignItems: 'center', gap: 40 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: '0 0 16px', color: 'var(--text-strong)' }}>
            Leading inputs vs. Lagging financials
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--text-body)' }}>
            Most franchise software tells you what happened last month. They measure <b>lagging indicators</b>—like labor percentages or utility logs. By the time you spot a leak on your P&L, you've already lost the cash.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--text-body)', marginTop: 12 }}>
            The Franky Score measures <b>leading indicators</b>—the inputs you control today that dictate your staff, margins, and revenue over the next 30 to 90 days. It focuses entirely on predictive metrics that allow you to intervene <i>before</i> the damage hits your bank statement.
          </p>
        </div>
        
        <Card padding="32px" accent="brand" style={{ background: 'var(--neutral-900)', color: 'var(--text-inverse)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, margin: '0 0 20px', color: '#fff' }}>
            NPS vs. The Franky Score
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
              <Badge variant="steady" style={{ marginBottom: 6 }}>Net Promoter Score (NPS)</Badge>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'rgba(255,255,255,0.75)' }}>
                Tells you what customers felt in the past. Subjective, reactive, and doesn't tell you how to resolve the operational issues causing poor scores.
              </div>
            </div>
            <div>
              <Badge variant="brand" style={{ marginBottom: 6 }}>The Franky Score</Badge>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'rgba(255,255,255,0.75)' }}>
                Tells you what is about to happen to your units. Objective, predictive, and points directly to the system leak you need to plug this week.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const footLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Overview', url: 'index.html' },
        { label: 'The Four Pillars', url: 'pillars.html' },
        { label: 'Pricing Stack', url: 'pricing.html' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Methodology', url: 'pillars.html' },
        { label: 'Try the Demo', url: 'dashboard.html' },
        { label: 'Inquire Now', url: 'pricing.html#waitlist' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Operator Blog', url: 'blog.html' },
        { label: 'FAQ Support', url: 'pricing.html#faq' },
        { label: 'Diagnostic Quiz', url: 'diagnostic.html' }
      ]
    }
  ];
  return (
    <footer className="ff-footer">
      <div className="ff-container">
        <div className="ff-footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <img src={LOGO} width={40} height={40} alt="" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: '#fff' }}>Franky Franchise</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, maxWidth: 260, margin: 0 }}>
              The operational health score for franchise operators. Know what's coming.
            </p>
          </div>
          {footLinks.map(col => (
            <div key={col.title}>
              <div className="ff-footer-col-title">{col.title}</div>
              <div className="ff-footer-links">
                {col.links.map(link => (
                  <a key={link.label} href={link.url}>{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="ff-footer-bottom">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© 2026 Franky Franchise, Inc.</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Page Root ───────────────────────────────────────────── */
function PillarsPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    FrankyAuth.onChanged(u => setUser(u));
    if (window.lucide) window.lucide.createIcons();
  }, []);

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <PillarsNav />

      {/* Hero */}
      <section className="ff-pricing-hero">
        <div className="ff-container ff-reveal" style={{ textAlign: 'center' }}>
          <div className="ff-eyebrow">The Score Architecture</div>
          <h1>The Four Operational Pillars</h1>
          <p className="ff-pricing-hero-sub">
            Why Franky scores these four critical operational levers, the math behind the leaks, and how we shore them up.
          </p>
        </div>
      </section>

      <Methodology />

      {/* Pillars Stack */}
      <section className="ff-container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 960, margin: '0 auto' }}>
          {PILLARS_DETAIL.map((p, idx) => (
            <div key={p.id} className="ff-reveal" id={p.id}>
              <Card padding="32px" accent={p.id === 'people' ? 'gold' : undefined}>
                <div className="ff-pillars-layout-grid">
                  {/* Left Column: Summary and Benchmarks */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'var(--brand-tint)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name={p.icon} size={22} color="var(--brand)" />
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: 0, color: 'var(--text-strong)' }}>{p.name}</h2>
                    </div>
                    
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15.5, color: 'var(--text-strong)', lineHeight: 1.45, margin: '0 0 12px' }}>
                      {p.tagline}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 24px' }}>
                      <b>What we measure:</b> {p.measures}
                    </p>

                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-strong)', margin: '0 0 12px' }}>
                      Verified Cost Leaks
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {p.math.map((m, i) => (
                        <div key={i} style={{ borderLeft: '3px solid var(--border-strong)', paddingLeft: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13.5, color: 'var(--text-strong)' }}>{m.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13.5, color: 'var(--ff-red)' }}>{m.stat}</span>
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Interventions */}
                  <div className="ff-pillars-panel-col">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, margin: '0 0 16px', color: 'var(--text-strong)' }}>
                      How Franky Shores It Up
                    </h3>
                    <ul className="ff-pricing-panel-list" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {p.interventions.map((item, i) => (
                        <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.5 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="ff-container" style={{ paddingBottom: 80 }}>
        <div className="ff-cta-banner ff-reveal" style={{ textAlign: 'center', flexDirection: 'column', padding: '54px 32px' }}>
          <h2>Test your operational metrics</h2>
          <p style={{ maxWidth: 460, margin: '0 auto 24px', color: 'rgba(255,255,255,0.9)' }}>
            Run the on-demand 8-minute diagnostic to receive your scored operational health composite and a full leak-bleed analysis.
          </p>
          <Button variant="gold" size="lg" onClick={() => window.location.href = user ? 'diagnostic.html' : 'auth.html'}>
            Start free diagnostic
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.PillarsPage = PillarsPage;
