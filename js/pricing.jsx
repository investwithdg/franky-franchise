/* Franky Franchise — Pricing + Waitlist page. */
const { Button, Badge, Card } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO   = 'assets/franky-logo.png';
const MASCOT = 'assets/franky-mascot.png';
const BADGE  = 'assets/franky-badge.png';

function Icon({ name, size = 20, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Nav (shared with marketing — lightweight copy) ──────── */
function PricingNav() {
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
          <a href="index.html#the-four-pillars">The four pillars</a>
          <a href="pricing.html" style={{ color: 'var(--brand)' }}>Pricing</a>
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
          <a href="index.html#the-four-pillars" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }} onClick={() => setMenuOpen(false)}>The four pillars</a>
          <a href="pricing.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Pricing</a>
          {user
            ? <a href="dashboard.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Dashboard</a>
            : <a href="auth.html" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--brand)', textDecoration: 'none', padding: '8px 0' }}>Log in</a>
          }
        </div>
      )}
    </nav>
  );
}

/* ── Pricing tiers ───────────────────────────────────────── */
const TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'One unit, one score. See where you stand.',
    cta: 'Start free diagnostic',
    ctaVariant: 'secondary',
    features: [
      '1 franchise unit',
      'Monthly diagnostic',
      'Franky Health Score',
      'Basic action plan',
      'Four-pillar breakdown',
    ],
  },
  {
    name: 'Growth',
    price: '$49',
    period: '/mo',
    description: 'For multi-unit operators who want the full picture.',
    cta: 'Join the waitlist',
    ctaVariant: 'primary',
    featured: true,
    badge: 'Most popular',
    features: [
      'Up to 10 units',
      'Weekly diagnostics',
      'Portfolio-level benchmarks',
      'Priority action plans',
      'Score history & trends',
      'Email alerts on score changes',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For franchise groups and area developers.',
    cta: 'Talk to us',
    ctaVariant: 'secondary',
    features: [
      'Unlimited units',
      'Daily diagnostics',
      'API access',
      'Custom scoring weights',
      'Dedicated success manager',
      'SSO & team permissions',
      'White-label reporting',
    ],
  },
];

function PricingCard({ tier, onWaitlist }) {
  return (
    <div className={`ff-pricing-card ${tier.featured ? 'featured' : ''}`}>
      {tier.badge && (
        <div className="ff-pricing-badge">
          <Badge variant="gold" solid>{tier.badge}</Badge>
        </div>
      )}
      <h3 className="ff-pricing-tier-name">{tier.name}</h3>
      <div className="ff-pricing-price">
        <span className="ff-pricing-amount">{tier.price}</span>
        {tier.period && <span className="ff-pricing-period">{tier.period}</span>}
      </div>
      <p className="ff-pricing-desc">{tier.description}</p>
      <Button
        variant={tier.ctaVariant}
        size="lg"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={() => {
          if (tier.name === 'Starter') {
            window.location.href = 'auth.html';
          } else {
            onWaitlist();
          }
        }}
      >{tier.cta}</Button>
      <ul className="ff-pricing-features">
        {tier.features.map(f => (
          <li key={f}>
            <Icon name="check" size={16} color="var(--success)" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Waitlist section ────────────────────────────────────── */
function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done | error
  const [errMsg, setErrMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('saving');
    try {
      await FrankyData.addWaitlist(email);
      setStatus('done');
      setEmail('');
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <section className="ff-waitlist-section" id="waitlist">
      <div className="ff-container">
        <div className="ff-waitlist-inner ff-reveal">
          <img src={MASCOT} width={80} height={80} style={{ borderRadius: '50%', border: '3px solid var(--ff-gold)' }} alt="Franky" />
          <h2>Get early access</h2>
          <p>Growth and Enterprise plans are coming soon. Drop your email and we'll let you know the moment they're live.</p>
          {status === 'done' ? (
            <div className="ff-waitlist-success">
              <Icon name="check-circle" size={24} color="var(--success)" />
              <span>You're on the list! We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ff-waitlist-form">
              <input
                type="email"
                className="ff-form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <Button variant="gold" size="lg" type="submit" disabled={status === 'saving'}>
                {status === 'saving' ? 'Saving…' : 'Join waitlist'}
              </Button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ color: 'var(--danger)', fontSize: 14, marginTop: 8 }}>{errMsg}</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
const FAQS = [
  ['What's a Franky Health Score?', 'A single number (0–1000) that measures the operational health of your franchise across four pillars: Hiring, Sales, Vendors, and Operations. Think of it like a credit score for franchise operators.'],
  ['How long does the diagnostic take?', 'About 8 minutes. It\'s 20 questions — 5 per pillar. You can take it from your phone, tablet, or desktop.'],
  ['Do I need to connect my POS or accounting software?', 'Nope. The diagnostic is self-reported. You answer based on what you know about your business. No integrations required.'],
  ['Can I run it for multiple locations?', 'The Starter plan covers 1 unit. Growth supports up to 10 units, and Enterprise is unlimited. Each unit gets its own score and action plan.'],
  ['How often should I run a diagnostic?', 'Monthly is great for the Starter plan. Growth operators often run weekly to spot trends early. The more data points, the clearer the picture.'],
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="ff-faq" id="faq">
      <div className="ff-container">
        <div className="ff-features-header ff-reveal">
          <div className="ff-eyebrow">FAQ</div>
          <h2>Common questions</h2>
        </div>
        <div className="ff-faq-list">
          {FAQS.map(([q, a], i) => (
            <div key={i} className={`ff-faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className="ff-faq-q">
                <span>{q}</span>
                <Icon name={open === i ? 'minus' : 'plus'} size={18} color="var(--text-muted)" />
              </div>
              {open === i && <div className="ff-faq-a">{a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer (shared) ─────────────────────────────────────── */
function Footer() {
  const cols = {
    Product:   ['Overview', 'The four pillars', 'Benchmarks', 'Pricing'],
    Company:   ['Our story', 'Careers', 'Press', 'Contact'],
    Resources: ['Operator guides', 'Help center', 'API', 'Status'],
  };
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
          {Object.entries(cols).map(([h, links]) => (
            <div key={h}>
              <div className="ff-footer-col-title">{h}</div>
              <div className="ff-footer-links">
                {links.map(l => {
                  const href = l === 'Pricing' ? 'pricing.html' : l === 'Overview' ? 'index.html' : '#';
                  return <a key={l} href={href}>{l}</a>;
                })}
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

/* ── Page root ───────────────────────────────────────────── */
function PricingPage() {
  const waitlistRef = React.useRef(null);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  function scrollToWaitlist() {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div style={{ background: 'var(--surface-page)' }}>
      <PricingNav />

      {/* Hero */}
      <section className="ff-pricing-hero">
        <div className="ff-container ff-reveal" style={{ textAlign: 'center' }}>
          <div className="ff-eyebrow">Pricing</div>
          <h1>Start free. Upgrade when you're ready.</h1>
          <p className="ff-pricing-hero-sub">
            Every operator gets a free diagnostic. Need more units, more frequency, or team access? We've got you.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="ff-container" style={{ marginTop: -20 }}>
        <div className="ff-pricing-grid">
          {TIERS.map((tier, i) => (
            <div key={tier.name} className={`ff-reveal ff-reveal-d${i + 1}`}>
              <PricingCard tier={tier} onWaitlist={scrollToWaitlist} />
            </div>
          ))}
        </div>
      </section>

      <Waitlist />
      <FAQ />
      <Footer />
    </div>
  );
}

window.PricingPage = PricingPage;
