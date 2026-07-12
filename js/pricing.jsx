/* Franky Franchise — Pricing + Waitlist page (The 5-Step Product Stack). */
const { Button, Badge, Card } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO   = 'assets/franky-logo.png';
const MASCOT = 'assets/franky-mascot.png';
const BADGE  = 'assets/franky-badge.png';

function Icon({ name, size = 18, color }) {
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

/* ── Five Services Stack Data ────────────────────────────── */
const SERVICES = [
  {
    id: 'sniff-test',
    name: 'The Sniff Test',
    price: 'Free',
    period: '',
    description: 'On-demand operational diagnostic quiz and estimated annual leak calculations.',
    cta: 'Start free diagnostic',
    ctaVariant: 'secondary',
    provided: [
      '8-minute operational diagnostic',
      'Scores across 4 core pillars',
      'Quantified annual leak calculation',
      'Industry segment benchmarks comparison',
    ],
    effort: 'Answer 20 quick scenario-based questions about your day-to-day operations. No POS integration required.',
  },
  {
    id: 'fieldbook',
    name: 'The Fieldbook',
    price: '$197–$497',
    period: '/ pillar',
    description: 'Self-guided implementation kits. Bundle of all four pillars available for $997.',
    cta: 'Buy Fieldbook',
    ctaVariant: 'secondary',
    provided: [
      'Segment-specific DIY playbooks',
      'Hiring pipelines & onboarding checklists',
      'Vendor contracts audit templates',
      '30-day staff retention checklists',
      'Async Loom video walkthroughs',
    ],
    effort: 'Download the playbooks and templates, and deploy them using your own team at your own pace.',
  },
  {
    id: 'fix-sprint',
    name: 'The Fix Sprint',
    price: '$4,500–$28,000',
    period: '',
    description: 'Interactive 4-week co-execution program to deploy core systems and fix leaks.',
    cta: 'Apply for Sprint',
    ctaVariant: 'primary',
    featured: true,
    badge: 'Core Offer',
    provided: [
      'Week 1: Live 90-min diagnostic deep dive',
      'Week 2: Custom hiring pipelines & SOP templates',
      'Week 3: 2 review calls to test and adjust systems',
      'Week 4: Final playbooks & handoff documentation',
      '30-day post-sprint follow-up audit',
    ],
    effort: 'Collaborate in live strategy sessions, customize the templates, and deploy the new systems inside your units.',
  },
  {
    id: 'watchdog',
    name: 'The Watchdog Retainer',
    price: '$800–$6,000',
    period: '/ mo',
    description: 'Ongoing protection to maintain scores, protect margins, and prevent leak creep.',
    cta: 'Join Retainer Waitlist',
    ctaVariant: 'secondary',
    provided: [
      '1 Sniff Check diagnostic run per quarter',
      '1 monthly live review session (30-45 min)',
      'Direct async support channel (Slack or Telnyx)',
      '40% discount on any future Fix Sprints',
    ],
    effort: 'Participate in monthly operational review calls and report local data adjustments.',
  },
  {
    id: 'formation',
    name: 'Franky Formation',
    price: '$25,000–$65,000',
    period: '',
    description: 'Complete operating infrastructure build for scaling or restructuring franchisors.',
    cta: 'Enquire for Formation',
    ctaVariant: 'secondary',
    provided: [
      'Hiring & onboarding franchisee playbook',
      'Vendor preferred supplier contracts framework',
      'Automated sales and lead SMS pipelines via Telnyx',
      'Operations SOP library & compliance playbooks',
      'White-labeled Sniff Test diagnostic for franchisees',
    ],
    effort: 'Provide brand specs, collaborate on operational blueprints, and roll out systems to your franchisee network.',
  },
];

function PricingPanel({ service, onWaitlist }) {
  return (
    <div className={`ff-pricing-panel ${service.featured ? 'featured' : ''}`}>
      {/* Col 1: Header & CTA */}
      <div className="ff-pricing-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div className="ff-pricing-seal">
            <img src={service.featured ? BADGE : MASCOT} alt="" />
          </div>
          {service.badge && (
            <Badge variant="gold" solid>{service.badge}</Badge>
          )}
        </div>
        <h3 className="ff-pricing-panel-title">{service.name}</h3>
        <div className="ff-pricing-panel-price">
          <span className="ff-pricing-amount">{service.price}</span>
          {service.period && <span className="ff-pricing-period">{service.period}</span>}
        </div>
        <p className="ff-pricing-panel-desc">{service.description}</p>
        <Button
          variant={service.ctaVariant}
          size="lg"
          style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
          onClick={() => {
            if (service.id === 'sniff-test') {
              window.location.href = 'auth.html';
            } else {
              onWaitlist();
            }
          }}
        >
          {service.cta}
        </Button>
      </div>

      {/* Col 2: What We Provide */}
      <div className="ff-pricing-panel-col">
        <h4 className="ff-pricing-panel-col-title">
          <Icon name="check-circle-2" color="var(--success)" size={16} />
          What we provide
        </h4>
        <ul className="ff-pricing-panel-list">
          {service.provided.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Col 3: Your Team's Effort */}
      <div className="ff-pricing-panel-col">
        <h4 className="ff-pricing-panel-col-title">
          <Icon name="user-check" color="var(--brand)" size={16} />
          Your team's effort
        </h4>
        <p className="ff-pricing-panel-effort">{service.effort}</p>
      </div>
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
          <p>Tell us which offer (Fieldbook, Fix Sprint, Watchdog, or Formation) you are interested in, and we'll reach out to discuss your operations.</p>
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
  ['How does the co-execution model work?', 'Instead of a consultant doing everything in a vacuum or giving you videos to watch alone, the Fix Sprint is a co-execution model. Franky provides the SOP templates, pipeline architectures, and reviews, while you and your local store managers execute. This builds internal team capability so you aren\'t dependent on external consultants.'],
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
          <div className="ff-eyebrow">Product Offerings</div>
          <h1>Clear packages for every stage of growth.</h1>
          <p className="ff-pricing-hero-sub">
            From a free diagnostic to a custom franchisor formation blueprint, Franky builds capability, not dependency.
          </p>
        </div>
      </section>

      {/* Stack List */}
      <section className="ff-container" style={{ marginTop: -20, paddingBottom: 64 }}>
        <div className="ff-pricing-ladder-stack">
          {SERVICES.map((s, idx) => (
            <div key={s.id} className="ff-reveal">
              <PricingPanel service={s} onWaitlist={scrollToWaitlist} />
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
