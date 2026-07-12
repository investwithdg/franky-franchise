/* Franky Franchise — Pricing + Waitlist page (The 5-Rung Product Ladder). */
const { Button, Badge, Card } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO   = 'assets/franky-logo.png';
const MASCOT = 'assets/franky-mascot.png';

function Icon({ name, size = 20, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Nav (shared with marketing) ────────────────────────── */
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

/* ── Five Rungs Ladder Data ──────────────────────────────── */
const RUNGS = [
  {
    rung: 1,
    name: 'Rung 1: The Sniff Test',
    price: 'Free',
    period: '',
    description: 'On-demand operational diagnostic. Get scored across 4 pillars and identify annual leaks based on segment benchmarks.',
    cta: 'Start free diagnostic',
    ctaVariant: 'secondary',
    features: [
      '8-minute operational diagnostic',
      'Scores across 4 core pillars',
      'Quantified annual leak calculation',
      'Industry segment benchmarks comparison',
    ],
  },
  {
    rung: 2,
    name: 'Rung 2: Franky Fieldbook',
    price: '$197–$497',
    period: '/ pillar',
    description: 'DIY segment-specific implementation kits to fix leaks. Bundle all 4 pillars for $997.',
    cta: 'Buy Fieldbook',
    ctaVariant: 'secondary',
    features: [
      'Segment-specific DIY playbooks',
      'Hiring pipelines & onboarding SOPs',
      'Vendor contract audit templates',
      '30-day staff retention checklist',
      'Async Loom video walkthroughs',
    ],
  },
  {
    rung: 3,
    name: 'Rung 3: The Fix Sprint',
    price: '$4,500–$28,000',
    period: '',
    description: 'DpWY (Done-with-you) 4-week co-execution sprint. Franky provides playbooks and sessions; your team does the install.',
    cta: 'Apply for Sprint',
    ctaVariant: 'primary',
    featured: true,
    badge: 'Core Offer (DpWY)',
    features: [
      'Week 1: Sniff Deep Dive (90-min live)',
      'Week 2: Custom framework asset design',
      'Week 3: Live install review & adjustments',
      'Week 4: Documentation & final handoff',
      'Builds long-term internal capability',
    ],
  },
  {
    rung: 4,
    name: 'Rung 4: Watchdog Retainer',
    price: '$800–$6,000',
    period: '/ mo',
    description: 'DWY (Done-with-you) recurring protection. Ongoing reviews and channel access to protect your baseline.',
    cta: 'Join Retainer Waitlist',
    ctaVariant: 'secondary',
    features: [
      '1 Sniff Check diagnostic per quarter',
      '1 monthly working session (30-45 min)',
      'Async Slack / Telnyx SMS support',
      '40% discount on future Fix Sprints',
    ],
  },
  {
    rung: 5,
    name: 'Rung 5: Franky Formation',
    price: '$25,000–$65,000',
    period: '',
    description: 'DFY + DpWY hybrid. Build custom operational systems and whitelist diagnostics for scaling franchisors.',
    cta: 'Enquire for Formation',
    ctaVariant: 'secondary',
    features: [
      'Custom hiring & onboarding systems',
      'Vendor contracts & supplier frameworks',
      'Sales and lead Telnyx SMS automation',
      'SOP playbooks & compliance library',
      'White-labeled Sniff Test for franchisees',
    ],
  },
];

function PricingCard({ tier, onWaitlist }) {
  return (
    <div className={`ff-pricing-card ${tier.featured ? 'featured' : ''}`} style={tier.featured ? { gridColumn: 'span 2' } : {}}>
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
          if (tier.rung === 1) {
            window.location.href = 'auth.html';
          } else {
            onWaitlist();
          }
        }}
      >{tier.cta}</Button>
      <ul className="ff-pricing-features" style={tier.featured ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } : {}}>
        {tier.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="check" size={16} color="var(--success)" />
            <span style={{ fontSize: 13.5 }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Waitlist Section ────────────────────────────────────── */
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
          <h2>Enquire / Join the Waitlist</h2>
          <p>Tell us which rung of the Franky Ladder (Fieldbook, Fix Sprint, Watchdog, or Formation) you are interested in, and we'll reach out to discuss your operations.</p>
          {status === 'done' ? (
            <div className="ff-waitlist-success">
              <Icon name="check-circle" size={24} color="var(--success)" />
              <span>We've received your request! We will contact you within 24 hours.</span>
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
                {status === 'saving' ? 'Submitting…' : 'Submit Enquiry'}
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
  ['What is a "Done-with-You" (DpWY) Sprint?', 'Instead of a consultant doing everything in a vacuum or giving you videos to watch alone, the Fix Sprint is a co-execution model. Franky provides the SOP templates, pipeline architectures, and reviews, while you and your local store managers execute. This builds internal team capability so you aren\'t dependent on external consultants.'],
  ['What is the "Watchdog Retainer"?', 'Once leaks are fixed in a Sprint, the Watchdog Retainer acts as insurance. We run a diagnostic quarterly, hold monthly live check-ins, and provide async Slack/Telnyx support to prevent operational creep.'],
  ['How is the "Annual Leak" calculated?', 'The Sniff Test diagnostic calculates annual financial leaks based on your metrics and standard segment benchmarks (e.g. hourly crew replacement costs in QSR or dealership technician turnover costs). It translates operational friction directly into dollar metrics.'],
  ['What is Franky Formation?', 'For operators expanding into franchisors, Formation builds your entire standard operating system (hiring, scheduling, SOP playbooks, vendor frameworks) before you scale, including white-labeled Sniff diagnostics for your future franchisees.'],
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="ff-faq" id="faq">
      <div className="ff-container">
        <div className="ff-features-header ff-reveal">
          <div className="ff-eyebrow">FAQ</div>
          <h2>Product & Model FAQ</h2>
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

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const cols = {
    Product:   ['Overview', 'The four pillars', 'Pricing'],
    Company:   ['Our story', 'Careers', 'Contact'],
    Resources: ['Operator guides', 'Help center', 'Status'],
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
          <div className="ff-eyebrow">The Product Ladder</div>
          <h1>Clear product tiers for every stage of growth.</h1>
          <p className="ff-pricing-hero-sub">
            From a free diagnostic to a custom franchisor formation blueprint, Franky builds capability, not dependency.
          </p>
        </div>
      </section>

      {/* Rungs Grid */}
      <section className="ff-container" style={{ marginTop: -20, paddingBottom: 64 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          maxWidth: 960,
          margin: '0 auto',
        }}>
          {/* Rung 1 & 2 */}
          <PricingCard tier={RUNGS[0]} onWaitlist={scrollToWaitlist} />
          <PricingCard tier={RUNGS[1]} onWaitlist={scrollToWaitlist} />
          
          {/* Rung 3 (Featured full-width) */}
          <div style={{ gridColumn: 'span 2' }}>
            <PricingCard tier={RUNGS[2]} onWaitlist={scrollToWaitlist} />
          </div>
          
          {/* Rung 4 & 5 */}
          <PricingCard tier={RUNGS[3]} onWaitlist={scrollToWaitlist} />
          <PricingCard tier={RUNGS[4]} onWaitlist={scrollToWaitlist} />
        </div>
      </section>

      <Waitlist />
      <FAQ />
      <Footer />
    </div>
  );
}

window.PricingPage = PricingPage;
