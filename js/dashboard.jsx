/* Franky Franchise — Dashboard app view.
   Auth-gated. Loads real diagnostic data from FrankyData.
   Composes the design-system primitives from window.FrankyFranchiseDesignSystem_83cfe5. */
const { Button, Badge, Card, Avatar, Input, Tag, ScoreRing, PillarBar, Stat } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const MASCOT = 'assets/franky-mascot.png';
const LOGO   = 'assets/franky-logo.png';
const Q = window.FRANKY_QUESTIONS;
const Scoring = window.FrankyScoring;
const ACTIONS = window.FRANKY_ACTIONS;
const PILLARS_KEYS = window.FRANKY_PILLARS;

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
function Sidebar({ tab, setTab, user, onSignOut }) {
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
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
          <Avatar name={user?.name || 'User'} size="sm" />
          <div style={{ lineHeight: 1.2, flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: 'var(--text-strong)' }}>{user?.name || 'User'}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Franchise operator</div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '8px 12px', marginTop: 6, borderRadius: 'var(--radius-md)', border: 'none',
            cursor: 'pointer', background: 'transparent',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
          }}
        >
          <Icon name="log-out" size={16} />
          Sign out
        </button>
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

function Topbar() {
  return (
    <header className="ff-dash-topbar">
      <button style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px 7px 8px',
        background: 'var(--surface-card)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-pill)', cursor: 'pointer',
      }}>
        <img src={MASCOT} width={26} height={26} style={{ borderRadius: '50%' }} alt="" />
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>My Franchise</span>
        <Icon name="chevron-down" size={16} color="var(--text-muted)" />
      </button>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={iconBtn} aria-label="Search"><Icon name="search" size={18} color="var(--text-muted)" /></button>
        <button style={iconBtn} aria-label="Notifications"><Icon name="bell" size={18} color="var(--text-muted)" /></button>
        <Button variant="primary" leadingIcon={<Icon name="activity" size={18} />}
          onClick={() => window.location.href = 'diagnostic.html'}
        >Run diagnostic</Button>
      </div>
    </header>
  );
}

/* ── Franky Says ─────────────────────────────────────────── */
function FrankySays({ data, user }) {
  if (!data) return null;

  // Find the weakest pillar
  const pillars = data.pillars || {};
  let weakest = null, weakScore = Infinity;
  PILLARS_KEYS.forEach(k => {
    if (pillars[k] !== undefined && pillars[k] < weakScore) {
      weakScore = pillars[k]; weakest = k;
    }
  });
  const weakLabel = weakest ? Q[weakest].label : '';
  const weakBand = weakest ? Scoring.bandLabel(Scoring.band(weakScore)) : '';

  const name = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, background: 'var(--ff-ink)',
      borderRadius: 'var(--radius-lg)', padding: '16px 20px', color: 'var(--text-inverse)',
    }}>
      <img src={MASCOT} width={48} height={48} style={{ borderRadius: '50%', border: '3px solid var(--ff-gold)', flex: 'none' }} alt="Franky" />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.45 }}>
        <b style={{ fontWeight: 700 }}>Hey {name}.</b> Your score is <b style={{ color: 'var(--ff-yellow)' }}>{data.overallScore}</b> — {Scoring.bandLabel(data.band)}.
        {weakest && <>
          {' '}One thing: <b style={{ color: 'var(--ff-yellow)' }}>{weakLabel}</b> is in {weakBand} territory. I've put the fix at the top of your plan.
        </>}
      </div>
    </div>
  );
}

/* ── Action row ──────────────────────────────────────────── */
function ActionRow({ action, pillar, band }) {
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
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)', textDecoration: done ? 'line-through' : 'none' }}>{action.t}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{action.d}</div>
      </div>
      <Badge variant={band}>{Q[pillar]?.label || pillar}</Badge>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="ff-reveal" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: '60px 24px', flex: 1,
    }}>
      <img src={MASCOT} width={100} height={100} style={{ borderRadius: '50%', border: '4px solid var(--ff-gold)', marginBottom: 24 }} alt="Franky" />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-strong)', margin: '0 0 12px' }}>
        No score yet
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-body)', maxWidth: 400, lineHeight: 1.55, margin: '0 0 32px' }}>
        Run your first 8-minute diagnostic to get your Franky Health Score, pillar breakdown, and action plan.
      </p>
      <Button variant="primary" size="lg"
        leadingIcon={<Icon name="activity" size={20} />}
        onClick={() => window.location.href = 'diagnostic.html'}
      >
        Run the diagnostic
      </Button>
    </div>
  );
}

/* ── Dashboard screen ────────────────────────────────────── */
function DashboardPage() {
  const [tab, setTab] = useState('Overview');
  const [user, setUser] = useState(undefined); // undefined = loading
  const [data, setData] = useState(null);      // latest diagnostic
  const [loading, setLoading] = useState(true);

  useLucide([tab, data, user]);

  // Auth gate
  useEffect(() => {
    FrankyAuth.onChanged(u => {
      setUser(u);
      if (u === null) window.location.href = 'auth.html';
    });
  }, []);

  // Load latest diagnostic
  useEffect(() => {
    if (!user) return;
    FrankyData.getLatestDiagnostic()
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  async function handleSignOut() {
    await FrankyAuth.signOut();
    window.location.href = 'index.html';
  }

  // Loading
  if (user === undefined || loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--surface-page)' }}>
        <div className="ff-diag-spinner" />
      </div>
    );
  }

  // Build action plan from data
  let actionItems = [];
  if (data && data.pillars) {
    // Sort pillars by score (lowest first) and pick top 3 actions
    const sorted = [...PILLARS_KEYS].sort((a, b) => (data.pillars[a] || 0) - (data.pillars[b] || 0));
    sorted.forEach(pillarKey => {
      const score = data.pillars[pillarKey] || 0;
      const band = Scoring.band(score);
      const pillarActions = (ACTIONS[pillarKey] && ACTIONS[pillarKey][band]) || [];
      pillarActions.forEach(a => {
        if (actionItems.length < 5) {
          actionItems.push({ ...a, pillar: pillarKey, band });
        }
      });
    });
  }

  const score = data?.overallScore || 0;
  const band = data?.band || 'critical';
  const pillars = data?.pillars || {};

  return (
    <div className="ff-dash-layout">
      <Sidebar tab={tab} setTab={setTab} user={user} onSignOut={handleSignOut} />
      <div className="ff-dash-main">
        <Topbar />
        <main className="ff-dash-content">
          {!data ? (
            <EmptyState />
          ) : (
            <>
              <FrankySays data={data} user={user} />

              <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'stretch' }}>
                <Card padding="26px" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  accent={band === 'strong' || band === 'steady' ? 'green' : undefined}
                >
                  <ScoreRing value={score} size={196} />
                  <Badge variant={band} dot style={{ marginTop: 4 }}>
                    {Scoring.bandLabel(band)}
                  </Badge>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>
                    {data.completedAt
                      ? 'Last run: ' + new Date(typeof data.completedAt === 'string' ? data.completedAt : data.completedAt.toDate()).toLocaleDateString()
                      : ''}
                  </div>
                </Card>
                <Card padding="26px">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-strong)' }}>Four pillars</h3>
                    <Badge variant="brand" style={{ marginLeft: 'auto' }}>8-min diagnostic</Badge>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {PILLARS_KEYS.map(key => (
                      <PillarBar key={key} label={Q[key].label} value={pillars[key] || 0}
                        icon={<Icon name={Q[key].icon} size={18} />}
                      />
                    ))}
                  </div>
                </Card>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                <Card padding="22px">
                  <Stat label="Overall score" value={score} intent="neutral" />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                    Run another diagnostic to see your trend
                  </div>
                </Card>
                <Card padding="22px">
                  <Stat label="Strongest pillar" value={
                    (() => {
                      let best = '', bestScore = -1;
                      PILLARS_KEYS.forEach(k => { if ((pillars[k] || 0) > bestScore) { bestScore = pillars[k]; best = k; } });
                      return Q[best]?.label || '—';
                    })()
                  } intent="neutral" />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                    {(() => {
                      let best = '', bestScore = -1;
                      PILLARS_KEYS.forEach(k => { if ((pillars[k] || 0) > bestScore) { bestScore = pillars[k]; best = k; } });
                      return bestScore + ' / 1000';
                    })()}
                  </div>
                </Card>
                <Card padding="22px">
                  <Stat label="Needs attention" value={
                    (() => {
                      let worst = '', worstScore = Infinity;
                      PILLARS_KEYS.forEach(k => { if ((pillars[k] || 0) < worstScore) { worstScore = pillars[k]; worst = k; } });
                      return Q[worst]?.label || '—';
                    })()
                  } intent="neutral" />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                    {(() => {
                      let worst = '', worstScore = Infinity;
                      PILLARS_KEYS.forEach(k => { if ((pillars[k] || 0) < worstScore) { worstScore = pillars[k]; worst = k; } });
                      return Scoring.bandLabel(Scoring.band(worstScore)) + ' · ' + worstScore + ' / 1000';
                    })()}
                  </div>
                </Card>
              </div>

              <Card padding="26px">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-strong)' }}>Your action plan</h3>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                    {actionItems.length} moves this week
                  </span>
                </div>
                {actionItems.map((a, i) => (
                  <ActionRow key={i} action={a} pillar={a.pillar} band={a.band} />
                ))}
              </Card>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 16px' }}>
                <Button variant="ghost" onClick={() => window.location.href = 'diagnostic.html'}
                  leadingIcon={<Icon name="refresh-cw" size={16} />}
                >
                  Run another diagnostic
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
