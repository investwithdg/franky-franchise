/* Franky Franchise — Dashboard app view.
   Composes the design-system primitives from window.FrankyFranchiseDesignSystem_83cfe5. */
const { Button, Badge, Card, Avatar, Input, Tag, ScoreRing, PillarBar, Stat } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const MASCOT = 'assets/franky-mascot.png';
const LOGO   = 'assets/franky-logo.png';

function Icon({ name, size = 20, color, strokeWidth = 2 }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, strokeWidth }} />;
}

function useLucide(dep) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
}

/* ── Sidebar nav item ────────────────────────────────────── */
function NavItem({ icon, label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%',
        padding: '10px 12px', borderRadius: 'var(--radius-md)', border: 'none',
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600,
        background: active ? 'var(--brand-tint)' : hover ? 'var(--neutral-50)' : 'transparent',
        color: active ? 'var(--brand)' : 'var(--text-body)',
      }}>
      <Icon name={icon} size={18} />
      {label}
    </button>
  );
}

/* ── Sidebar ─────────────────────────────────────────────── */
function Sidebar({ tab, setTab }) {
  const items = [
    ['layout-dashboard', 'Overview'],
    ['target',           'Pillars'],
    ['bar-chart-3',      'Benchmarks'],
    ['list-checks',      'Action plan'],
    ['settings',         'Settings'],
  ];
  return (
    <aside className="ff-dash-sidebar" role="navigation" aria-label="Dashboard navigation">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 18px' }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src={LOGO} width={40} height={40} alt="Franky" />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: 'var(--text-strong)', lineHeight: 1 }}>
            Franky<br /><span style={{ color: 'var(--brand)' }}>Franchise</span>
          </div>
        </a>
      </div>
      {items.map(([ic, label]) => (
        <NavItem key={label} icon={ic} label={label} active={tab === label} onClick={() => setTab(label)} />
      ))}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', borderTop: '1px solid var(--border-subtle)' }}>
        <Avatar name="Dana Ruiz" size="sm" />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: 'var(--text-strong)' }}>Dana Ruiz</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Multi-unit owner</div>
        </div>
      </div>
    </aside>
  );
}

/* ── Topbar ───────────────────────────────────────────────── */
const iconBtn = {
  width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--border-subtle)',
  background: 'var(--surface-card)', cursor: 'pointer', display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center',
};

function Topbar({ onRun }) {
  return (
    <header className="ff-dash-topbar">
      <button style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px 7px 8px',
        background: 'var(--surface-card)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-pill)', cursor: 'pointer',
      }}>
        <img src={MASCOT} width={26} height={26} style={{ borderRadius: '50%' }} alt="" />
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>Slice House · 12 units</span>
        <Icon name="chevron-down" size={16} color="var(--text-muted)" />
      </button>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={iconBtn} aria-label="Search"><Icon name="search" size={18} color="var(--text-muted)" /></button>
        <button style={iconBtn} aria-label="Notifications"><Icon name="bell" size={18} color="var(--text-muted)" /></button>
        <Button variant="primary" leadingIcon={<Icon name="activity" size={18} />} onClick={onRun}>Run diagnostic</Button>
      </div>
    </header>
  );
}

/* ── Franky Says ─────────────────────────────────────────── */
function FrankySays() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, background: 'var(--ff-ink)',
      borderRadius: 'var(--radius-lg)', padding: '16px 20px', color: 'var(--text-inverse)',
    }}>
      <img src={MASCOT} width={48} height={48} style={{ borderRadius: '50%', border: '3px solid var(--ff-gold)', flex: 'none' }} alt="Franky" />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.45 }}>
        <b style={{ fontWeight: 700 }}>Morning, Dana.</b> Your score's up <b style={{ color: 'var(--ff-yellow)' }}>+28 this month</b> — nice climb.
        One thing: <b style={{ color: 'var(--ff-yellow)' }}>Vendors</b> slipped into Watch. I've put the fix at the top of your plan.
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────── */
const PILLARS = [
  { label: 'Hiring',     value: 742, delta: +42, icon: 'users' },
  { label: 'Sales',      value: 668, delta: +11, icon: 'trending-up' },
  { label: 'Vendors',    value: 388, delta: -15, icon: 'truck' },
  { label: 'Operations', value: 812, delta: +6,  icon: 'cog' },
];

const ACTIONS = [
  { p: 'critical', t: 'Renegotiate cheese & dough vendor', d: 'Costs up 9% vs benchmark — locks in before Q3', pillar: 'Vendors' },
  { p: 'watch',    t: 'Fill 2 open shift-lead roles',      d: 'Understaffed stores score 18% lower on Ops',  pillar: 'Hiring' },
  { p: 'steady',   t: 'Roll out the upsell script to 3 units', d: 'Top units see +6% ticket size',           pillar: 'Sales' },
];

function ActionRow({ a }) {
  const [done, setDone] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)', opacity: done ? 0.5 : 1,
      transition: 'opacity var(--dur-base)',
    }}>
      <button onClick={() => setDone(!done)} style={{
        width: 24, height: 24, marginTop: 1, flex: 'none', borderRadius: 7, cursor: 'pointer',
        border: done ? 'none' : '2px solid var(--border-strong)',
        background: done ? 'var(--success)' : 'var(--surface-card)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        transition: 'background var(--dur-fast), border var(--dur-fast)',
      }}>{done && <Icon name="check" size={15} color="#fff" />}</button>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)', textDecoration: done ? 'line-through' : 'none' }}>{a.t}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{a.d}</div>
      </div>
      <Badge variant={a.p}>{a.pillar}</Badge>
    </div>
  );
}

/* ── Dashboard screen ────────────────────────────────────── */
function DashboardPage() {
  const [tab, setTab] = useState('Overview');
  const [score, setScore] = useState(724);
  useLucide([tab, score]);
  return (
    <div className="ff-dash-layout">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="ff-dash-main">
        <Topbar onRun={() => setScore(s => Math.min(1000, s + 12))} />
        <main className="ff-dash-content">
          <FrankySays />
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'stretch' }}>
            <Card padding="26px" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }} accent="green">
              <ScoreRing value={score} size={196} />
              <Badge variant="strong" dot style={{ marginTop: 4 }}>▲ +28 this month</Badge>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>Updated 2h ago</div>
            </Card>
            <Card padding="26px">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-strong)' }}>Four pillars</h3>
                <Badge variant="brand" style={{ marginLeft: 'auto' }}>8-min diagnostic</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {PILLARS.map(p => <PillarBar key={p.label} {...p} icon={<Icon name={p.icon} size={18} />} />)}
              </div>
            </Card>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <Card padding="22px"><Stat label="Projected revenue" value="$1.24M" delta="+8.3%" deltaLabel="next 90 days" /></Card>
            <Card padding="22px">
              <Stat label="Benchmark rank" value="Top 15%" intent="neutral" />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>among 1,400+ pizza franchises</div>
            </Card>
            <Card padding="22px"><Stat label="At-risk units" value={2} unit="of 12" delta={-1} deltaLabel="vs last mo" /></Card>
          </div>
          <Card padding="26px">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-strong)' }}>Your action plan</h3>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>3 moves this week</span>
            </div>
            {ACTIONS.map((a, i) => <ActionRow key={i} a={a} />)}
          </Card>
        </main>
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
