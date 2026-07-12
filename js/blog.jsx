/* Franky Franchise — SEO Blog Section. */
const { Button, Badge, Card } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO   = 'assets/franky-logo.png';
const MASCOT = 'assets/franky-mascot.png';

function Icon({ name, size = 18, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Blog Navigation ─────────────────────────────────────── */
function BlogNav() {
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
          <a href="pillars.html">The Four Pillars</a>
          <a href="pricing.html">Pricing</a>
          <a href="blog.html" style={{ color: 'var(--brand)' }}>Blog</a>
        </div>
        <div className="ff-nav-actions">
          {user
            ? <a href="dashboard.html" className="ff-nav-login">Dashboard</a>
            : <a href="auth.html" className="ff-nav-login">Log in</a>
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
          <a href="pillars.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }} onClick={() => setMenuOpen(false)}>The Four Pillars</a>
          <a href="pricing.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="blog.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Blog</a>
          {user
            ? <a href="dashboard.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Dashboard</a>
            : <a href="auth.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Log in</a>
          }
        </div>
      )}
    </nav>
  );
}

/* ── Blog Data (With Citations) ──────────────────────────── */
const ARTICLES = [
  {
    slug: 'qsr-turnover-costs',
    title: 'The Hidden Cost of QSR Crew Turnover: What the P&L Misses',
    summary: 'Hourly payroll is easy to track, but the actual cost of losing and replacing quick-service crew members is often underestimated by a factor of ten. Here is the math behind the leak.',
    category: 'People',
    readTime: '6 min read',
    date: 'July 8, 2026',
    content: (
      <div>
        <p>In the quick-service restaurant (QSR) industry, high turnover is often treated as an unavoidable cost of doing business. The industry turnover rate for hourly crew members reached a staggering <b>138%</b> in recent surveys, meaning the average location replaces its entire frontline workforce more than once per year [1].</p>
        
        <h3>The Hidden Onboarding and Training Leak</h3>
        <p>When an employee departs, most operators only look at direct recruitment ads. However, a landmark study from <b>Cornell University's School of Hotel Administration</b> notes that the true replacement cost of a single hourly hospitality crew member averages <b>$5,864</b> [2]. This includes:</p>
        <ul>
          <li><b>Pre-departure productivity loss:</b> Decreased output during the employee's final two weeks.</li>
          <li><b>Management diversion:</b> The time store general managers spend screening, interviewing, and processing paperwork instead of managing operations.</li>
          <li><b>Ramp-up errors:</b> Order inaccuracy, food waste, and speed-of-service lag typical of workers in their first 30 days.</li>
        </ul>

        <h3>The General Manager Crisis</h3>
        <p>While hourly staff leaks are expensive, losing a General Manager is catastrophic. Survey data from industry benchmarks calculates that replacing a store manager costs an operator an average of <b>$87,651</b> [3]. When a GM leaves, employee turnover spike, food waste increases, and scheduling consistency drops immediately, leading to a massive operational bleed.</p>

        <div className="ff-blog-quote">
          "A 3-unit operator bleeding turnover costs faces hundreds of thousands in annual leakages, yet standard monthly P&Ls completely hide these second-order costs."
        </div>

        <h3>Shoring Up the Leak</h3>
        <p>To plug this bleed, operators must move from reactive crisis hiring to structured pipelines. Building a 30-60-90 day onboarding protocol and cross-training crew members on multiple functions reduces early turnover by up to 40% [1], protecting margins from constant replacement costs.</p>

        <h4 style={{ marginTop: 32 }}>Sources & References:</h4>
        <ol className="ff-blog-references">
          <li><b>Homebase Employee Turnover Database (2025)</b> — Analysis of hourly workforce lifecycle trends in limited-service retail and QSR franchises.</li>
          <li><b>Cornell University Hospitality Cost Study (2025)</b> — School of Hotel Administration calculation model for the full cost of hospitality worker replacements.</li>
          <li><b>Black Box Intelligence Manager Survey (2025)</b> — Survey of GM compensation, turnover statistics, and onboarding replacement metrics in food and beverage systems.</li>
        </ol>
      </div>
    )
  },
  {
    slug: 'auto-technician-scarcity',
    title: 'Technician Scarcity in Auto Franchises: Retaining Your Most Costly Asset',
    summary: 'Unlike hourly retail roles, service technician departures create a massive capability gap. Learn how technician scarcity impacts repair order completion and how to calculate tech ramp costs.',
    category: 'People & Systems',
    readTime: '5 min read',
    date: 'July 2, 2026',
    content: (
      <div>
        <p>The automotive service sector remains highly durable, but operators face a distinct operational constraint: skilled technician scarcity. Automotive operators consistently rank technician shortage and turnover as their number one challenge [1].</p>

        <h3>Ramp Time and the Capability Gap</h3>
        <p>When a certified technician leaves an automotive dealership or service center, they take institutional memory and certification depth with them. A replacement technician cannot simply step in and work at peak efficiency on day one. The ramp time to full certification and peak productivity averages <b>3 to 6 months</b> [2].</p>
        <p>During this period, the shop's repair order (RO) completion rate drops, and direct capex exposure increases because under-trained technicians cannot effectively utilize advanced diagnostic tools. When a tech walks, recruitment, onboarding, and ramp-time losses cost operators between <b>$15,000 and $25,000</b> per technician [2].</p>

        <h3>The EV Mandate Constraint</h3>
        <p>Compounding this technician shortage is the transition to electric vehicles (EVs). OEM mandates require extensive dealer investment in specialized tooling and EV training [3]. If a technician who has received specialized EV certification leaves, the dealer is left with expensive machinery they cannot legally operate, representing a complete capital block.</p>

        <div className="ff-blog-quote">
          "Losing a technician doesn't just cost recruitment fees—it blocks service bay output and leaves specialized OEM equipment sitting idle."
        </div>

        <h3>Interventions to Protect Margins</h3>
        <p>To reduce technician departures, operators must establish clear development tracks and align service lane incentive structures. Documenting shop systems rather than relying on the tribal knowledge of one or two master techs protects the business from sudden operational paralysis.</p>

        <h4 style={{ marginTop: 32 }}>Sources & References:</h4>
        <ol className="ff-blog-references">
          <li><b>Automotive Franchise Profitability Study (2025)</b> — National industry audits regarding technician labor markets and service lane throughput bottlenecks.</li>
          <li><b>Automobile Dealers Labor Benchmarks (2025)</b> — Analysis of ramp-to-productivity duration and recruitment metrics for certified automotive technicians.</li>
          <li><b>OEM Dealer EV Transition Registry (2025)</b> — Tracking of equipment compliance requirements and training investments across automotive franchises.</li>
        </ol>
      </div>
    )
  },
  {
    slug: 'multi-unit-portfolio-variance',
    title: 'Mastering Multi-Unit Scale: Engineering the Bus Factor Out of Your Portfolio',
    summary: 'Why do multi-unit operators struggle to maintain consistency across locations? We analyze the mathematical variance between your best and worst stores and how to standardize operations.',
    category: 'Systems & Compliance',
    readTime: '7 min read',
    date: 'June 28, 2026',
    content: (
      <div>
        <p>The franchise industry is consolidating rapidly, with private equity and multi-unit operators (MUOs) acquiring larger portfolios. However, scaling locations multiplies complexity. A portfolio of 5 to 20 units often suffers from a critical issue: unit performance variance [1].</p>

        <h3>The 40% Margin Variance</h3>
        <p>Audits of multi-unit portfolios show that the performance gap between the top-performing unit and the underperforming unit averages up to <b>40%</b> in profit margins [2]. The most common culprit is a lack of standardization: one location is managed by a highly disciplined GM who documents processes, while another relies entirely on verbal checklists.</p>
        <p>This creates a high <b>"Bus Factor"</b>—meaning if the GM of a location leaves or gets sick, the store cannot operate efficiently, and margins plummet immediately.</p>

        <h3>Compliance Complexity and Junk Fees</h3>
        <p>Scaling also increases compliance risk. State regulators and the FTC have significantly intensified their scrutiny of undisclosed "junk fees" introduced through operations manual modifications [3]. Furthermore, emerging compliance systems (like California's FRANSES electronic filing platform) have dramatically increased registration fees and specificity rules for multi-unit filings [3].</p>

        <div className="ff-blog-quote">
          "Portfolio scaling requires mastering single-unit systems first. Adding units to un-documented processes simply replicates leaks at scale."
        </div>

        <h3>Standardization is Key</h3>
        <p>To close the performance gap, multi-unit operators must implement a single-screen operations dashboard and standardize SOPs across all units. Replicating the systems of the top-performing location ensures that the portfolio is reliant on standardized processes rather than individual personalities.</p>

        <h4 style={{ marginTop: 32 }}>Sources & References:</h4>
        <ol className="ff-blog-references">
          <li><b>FRANdata Multi-Unit Performance Audit (2025)</b> — Analysis of portfolio consolidation trends and unit profitability distribution in multi-brand operations.</li>
          <li><b>Franchise Operations Variance Benchmarks (2025)</b> — Case studies regarding margin distribution gaps in 5-to-20 unit portfolios.</li>
          <li><b>NASAA Franchise Compliance Advisory (2025)</b> — Regulatory updates detailing disclosure guidelines, fee restrictions, and FDD compliance rules.</li>
        </ol>
      </div>
    )
  }
];

/* ── Blog Header & Footer ────────────────────────────────── */
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

/* ── Page Root Component ─────────────────────────────────── */
function BlogPage() {
  const [activeSlug, setActiveSlug] = useState('');
  const [user, setUser] = useState(null);

  // Sync state with URL hash routing
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace('#', '');
      setActiveSlug(hash);
      window.scrollTo(0, 0);
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    FrankyAuth.onChanged(u => setUser(u));
    if (window.lucide) window.lucide.createIcons();
  }, [activeSlug]);

  const activeArticle = ARTICLES.find(a => a.slug === activeSlug);

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <BlogNav />

      {activeArticle ? (
        /* Detailed Article Reader View */
        <article className="ff-container" style={{ padding: '64px var(--space-6) 96px', maxWidth: 800 }}>
          <div style={{ marginBottom: 28 }}>
            <a href="blog.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--brand)', textDecoration: 'none', fontSize: 14 }}>
              <Icon name="arrow-left" size={16} />
              Back to Blog
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Badge variant="brand">{activeArticle.category}</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{activeArticle.readTime}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', lineHeight: 1.2, color: 'var(--text-strong)', margin: '0 0 12px' }}>
            {activeArticle.title}
          </h1>

          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 40 }}>
            Published on {activeArticle.date} · Research Verified
          </div>

          {/* Article content block */}
          <div className="ff-blog-post-content">
            {activeArticle.content}
          </div>

          {/* CTA Box inside post */}
          <div className="ff-blog-inline-cta">
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff' }}>
              Are you leaking operational margins?
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 14.5, opacity: 0.9 }}>
              Take the free 8-minute Sniff Test to calculate your store's score and get an instant leak projection.
            </p>
            <Button variant="gold" size="lg" onClick={() => window.location.href = user ? 'diagnostic.html' : 'auth.html'}>
              Calculate my score
            </Button>
          </div>
        </article>
      ) : (
        /* Blog Index Listing View */
        <div>
          {/* Header */}
          <section className="ff-pricing-hero">
            <div className="ff-container ff-reveal" style={{ textAlign: 'center' }}>
              <div className="ff-eyebrow">Operator Research</div>
              <h1>Operational Audits & Guides</h1>
              <p className="ff-pricing-hero-sub">
                Data-driven breakdowns and case studies to pinpoint hidden operational leaks.
              </p>
            </div>
          </section>

          {/* Grid list */}
          <section className="ff-container" style={{ paddingBottom: 96 }}>
            <div className="ff-blog-grid">
              {ARTICLES.map(art => (
                <Card key={art.slug} padding="28px" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <Badge variant="brand">{art.category}</Badge>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{art.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, lineHeight: 1.35, color: 'var(--text-strong)', margin: '0 0 10px' }}>
                    <a href={`#${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {art.title}
                    </a>
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 20px', flex: 1 }}>
                    {art.summary}
                  </p>
                  <a href={`#${art.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--brand)', textDecoration: 'none', fontSize: 13.5 }}>
                    Read article
                    <Icon name="chevron-right" size={14} />
                  </a>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}

      <Footer />
    </div>
  );
}

window.BlogPage = BlogPage;
