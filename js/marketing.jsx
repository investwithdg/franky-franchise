/* Franky Franchise — Marketing landing page components.
   Composes design-system primitives from window.FrankyFranchiseDesignSystem_83cfe5. */
const { Button, Badge, Card, ScoreRing, PillarBar, Stat, Avatar } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect, useRef } = React;

const MASCOT = 'assets/franky-mascot.png';
const LOGO   = 'assets/franky-logo.png';
const BADGE  = 'assets/franky-badge.png';

function Icon({ name, size = 22, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    FrankyAuth.onChanged(u => setUser(u));
  }, []);

  function handleCta() {
    window.location.href = user ? 'diagnostic.html' : 'auth.html';
  }

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
          <a href="blog.html">Blog</a>
        </div>
        <div className="ff-nav-actions">
          {user
            ? <a href="dashboard.html" className="ff-nav-login">Dashboard</a>
            : <a href="auth.html" className="ff-nav-login">Log in</a>
          }
          <Button variant="primary" onClick={handleCta}>Get my score</Button>
        </div>
        <button
          className="ff-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
          <a href="pillars.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>The Four Pillars</a>
          <a href="pricing.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>Pricing</a>
          <a href="blog.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>Blog</a>
          {user
            ? <a href="dashboard.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Dashboard</a>
            : <a href="auth.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Log in</a>
          }
        </div>
      )}
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  const [user, setUser] = useState(null);
  useEffect(() => { FrankyAuth.onChanged(u => setUser(u)); }, []);

  function handleCta() {
    window.location.href = user ? 'diagnostic.html' : 'auth.html';
  }

  return (
    <section className="ff-hero" id="product">
      <div className="ff-hero-inner">
        <div className="ff-reveal">
          <div className="ff-eyebrow">Operational health for franchises</div>
          <h1>
            <span style={{ display: 'block' }}>Know what you lose.</span>
            <span style={{ display: 'block', color: 'var(--brand)' }}>Before it costs more.</span>
          </h1>
          <p className="ff-hero-subtitle" style={{ maxWidth: 540 }}>
            Franky runs an 8-minute diagnostic, scores your Hiring, Sales, Vendors, and Operations, and assigns a dollar figure to your leaks using standard segment benchmarks—like Cornell's <b>$5,864 per hourly crew replacement cost</b> or automotive's <b>$15K–$25K technician turnover loss</b>.
          </p>
          <div className="ff-hero-ctas">
            <Button variant="primary" size="lg" leadingIcon={<Icon name="activity" size={20} />} onClick={handleCta}>
              Run the 8-minute diagnostic
            </Button>
            <Button variant="ghost" size="lg" leadingIcon={<Icon name="layout" size={20} />} onClick={() => window.location.href = 'dashboard.html'}>
              Try the Interactive Demo
            </Button>
          </div>
          <div className="ff-hero-stats">
            <Stat label="Diagnostic Time" value="8" unit="minutes" intent="neutral" />
            <Stat label="Operational Pillars" value="4" intent="neutral" />
            <Stat label="Quantified Report" value="Instant" intent="neutral" />
          </div>
        </div>
        <div className="ff-reveal ff-reveal-d1" style={{ position: 'relative' }}>
          <Card padding="28px" accent="green" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <img src={MASCOT} width={40} height={40} style={{ borderRadius: '50%', border: '2px solid var(--ff-gold)' }} alt="" />
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>Slice House · 12 units</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Franky Health Score</div>
              </div>
              <Badge variant="strong" dot style={{ marginLeft: 'auto' }}>Thriving</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 20px' }}>
              <ScoreRing value={724} size={172} showLabel={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <PillarBar label="Hiring" value={742} delta={+42} />
              <PillarBar label="Vendors" value={388} delta={-15} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ── Four pillars ────────────────────────────────────────── */
const FEATURES = [
  ['users',       'Hiring',     'Identify staffing coverage gaps and turnover costs before they impact operations.'],
  ['trending-up', 'Sales',      'Quantify sales leakages from missed upselling and conversion opportunities.'],
  ['truck',       'Vendors',    'Catch contract cost creep early vs. standard industry benchmarks.'],
  ['cog',         'Operations', 'Expose day-to-day process inefficiencies and schedule scheduling waste.'],
];

function Pillars() {
  const slugMap = {
    'Hiring': 'people',
    'Sales': 'revenue',
    'Vendors': 'resources',
    'Operations': 'systems'
  };

  return (
    <section className="ff-features" id="the-four-pillars">
      <div className="ff-container">
        <div className="ff-features-header ff-reveal">
          <div className="ff-eyebrow">The four pillars</div>
          <h2>One score. Four leaks that actually drag it down.</h2>
        </div>
        <div className="ff-features-grid">
          {FEATURES.map(([ic, t, d], i) => (
            <div className={`ff-reveal ff-reveal-d${i + 1}`} key={t}>
              <Card interactive padding="24px" onClick={() => window.location.href = `pillars.html#${slugMap[t]}`}>
                <div style={{
                  width: 46, height: 46, borderRadius: 13,
                  background: 'var(--brand-tint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Icon name={ic} size={24} color="var(--brand)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: 'var(--text-strong)', margin: '0 0 8px' }}>{t}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>{d}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How the score works ─────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="ff-how" id="pricing">
      <div className="ff-how-inner">
        <div className="ff-reveal">
          <div className="ff-eyebrow" style={{ color: 'var(--ff-yellow)' }}>How the score works</div>
          <h2>From a hunch to a quantified annual bleed report.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.78)', margin: '0 0 24px', maxWidth: 440 }}>
            Every score maps to one of four bands. The band tells you how worried to be; the action plan shows you exactly where the cash is leaking.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['strong', 'Thriving', '800–1000', 'Ahead of the pack — protect it.'],
              ['steady', 'Steady',   '600–799',  'Solid, with room to climb.'],
              ['watch',  'Watch',    '400–599',  'Something\'s about to slip.'],
              ['critical','Critical', '0–399',   'Act this week.']].map(([v, n, r, d]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <Badge variant={v} solid style={{ minWidth: 96, justifyContent: 'center' }}>{n}</Badge>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.6)', minWidth: 84 }}>{r}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Button variant="gold" onClick={() => window.location.href = 'pillars.html'}>
              Learn how the score is calculated
            </Button>
          </div>
        </div>
        <div className="ff-reveal ff-reveal-d2" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-2xl)', padding: 40, boxShadow: 'var(--shadow-xl)' }}>
            <ScoreRing value={724} size={240} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA banner ──────────────────────────────────────────── */
function CTA() {
  const [user, setUser] = useState(null);
  useEffect(() => { FrankyAuth.onChanged(u => setUser(u)); }, []);

  return (
    <section className="ff-container" style={{ padding: '72px 32px' }}>
      <div className="ff-cta-banner ff-reveal">
        <img src={BADGE} width={132} height={132} style={{ flex: 'none', borderRadius: 'var(--radius-full)' }} alt="Franky" />
        <div style={{ flex: 1 }}>
          <h2>Get your Franky Health Score</h2>
          <p>Eight minutes. No POS hookup. Just a clear read on what your operations leak.</p>
        </div>
        <Button
          variant="gold" size="lg" style={{ flex: 'none' }}
          onClick={() => window.location.href = user ? 'diagnostic.html' : 'auth.html'}
        >
          Start free diagnostic
        </Button>
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
    <footer className="ff-footer" id="story">
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

/* ── Root ─────────────────────────────────────────────────── */
function MarketingPage() {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <Nav />
      <Hero />
      <Pillars />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

window.MarketingPage = MarketingPage;
