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
const SEGMENTS = window.FRANKY_SEGMENTS;

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
function Sidebar({ tab, setTab, user, profile, onSignOut }) {
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
          <Avatar name={profile?.name || user?.name || 'User'} size="sm" />
          <div style={{ lineHeight: 1.2, flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: 'var(--text-strong)' }}>
              {profile?.name || user?.name || 'User'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              {profile?.unitCount && parseInt(profile.unitCount) > 1 ? 'Multi-unit owner' : 'Franchise operator'}
            </div>
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

function Topbar({ profile }) {
  return (
    <header className="ff-dash-topbar">
      <button style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px 7px 8px',
        background: 'var(--surface-card)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-pill)', cursor: 'pointer',
      }}>
        <img src={MASCOT} width={26} height={26} style={{ borderRadius: '50%' }} alt="" />
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>
          {profile?.unitName || 'My Franchise'} · {profile?.unitCount || 1} {parseInt(profile?.unitCount) === 1 ? 'unit' : 'units'}
        </span>
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
function FrankySays({ data, user, totalLeak, segmentLabel }) {
  if (!data) return null;

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
        <b style={{ fontWeight: 700 }}>Morning {name}.</b> Your operational health score is <b style={{ color: 'var(--ff-yellow)' }}>{data.overallScore}</b>.
        Based on the {segmentLabel} benchmarks, your current operational leaks cost you an estimated <b style={{ color: 'var(--ff-yellow)' }}>${totalLeak.toLocaleString()}/year</b>.
        {weakest && <> Your largest leak is in <b style={{ color: 'var(--ff-yellow)' }}>{weakLabel}</b> (Score: {weakScore}).</>}
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

/* ── Pillars Tab View ────────────────────────────────────── */
function PillarsTab({ data, segmentKey }) {
  const [expandedPillar, setExpandedPillar] = useState(null);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="ff-reveal">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '0 0 8px' }}>Pillar Details</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Drill down into your scores for Hiring, Sales, Vendors, and Operations. Click a category to inspect individual responses.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PILLARS_KEYS.map(key => {
          const p = Q[key];
          const score = data.pillars[key] || 0;
          const band = Scoring.band(score);
          const isExpanded = expandedPillar === key;
          const answersList = data.answers?.[key] || [];
          
          const maxL = {
            qsr: { hiring: 90000, sales: 40000, vendors: 45000, operations: 35000 },
            auto: { hiring: 240000, sales: 90000, vendors: 60000, operations: 80000 },
            fitness: { hiring: 80000, sales: 60000, vendors: 25000, operations: 35000 },
            healthcare: { hiring: 110000, sales: 150000, vendors: 45000, operations: 75000 },
            general: { hiring: 50000, sales: 30000, vendors: 20000, operations: 25000 }
          }[segmentKey]?.[key] || 50000;
          const leak = Math.round((1 - (score / 1000)) * maxL);

          return (
            <Card key={key} padding="24px" accent={band === 'strong' || band === 'steady' ? 'green' : 'gold'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}
                   onClick={() => setExpandedPillar(isExpanded ? null : key)}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--brand-tint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={p.icon} size={22} color="var(--brand)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--text-strong)' }}>{p.label}</h3>
                    <Badge variant={band}>{Scoring.bandLabel(band)}</Badge>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                    {p.description}
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginRight: 12 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 750, color: 'var(--ff-red)' }}>
                    -${leak.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)' }}>/yr</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Score: {score}</div>
                </div>
                <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="var(--text-muted)" />
              </div>
              
              <div style={{ marginTop: 16 }}>
                <PillarBar label="" value={score} showLabel={false} />
              </div>

              {isExpanded && (
                <div className="ff-diag-fade-in" style={{ marginTop: 24, borderTop: '1px solid var(--border-subtle)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 16 }}>Evaluated Areas</h4>
                  {p.questions.map((q, idx) => {
                    const ansVal = answersList[idx] || 3;
                    const selectedOpt = q.options.find(o => o.score === ansVal) || q.options[2];
                    return (
                      <div key={q.id} style={{ padding: '12px 16px', background: 'var(--surface-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14.5, color: 'var(--text-strong)' }}>
                            {idx + 1}. {q.text}
                          </span>
                          <Badge variant={ansVal >= 4 ? 'strong' : ansVal === 3 ? 'steady' : 'critical'}>
                            {ansVal}/5
                          </Badge>
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Icon name="check-circle" size={13} color="var(--success)" />
                          <span>Current state: <b>{selectedOpt.label}</b></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── Benchmarks Tab View ─────────────────────────────────── */
function BenchmarksTab({ data, segmentKey }) {
  const benchmarks = {
    hiring: { avg: 680, topDecile: 850, user: data.pillars.hiring || 0 },
    sales: { avg: 650, topDecile: 820, user: data.pillars.sales || 0 },
    vendors: { avg: 580, topDecile: 790, user: data.pillars.vendors || 0 },
    operations: { avg: 710, topDecile: 880, user: data.pillars.operations || 0 },
  };

  const { totalLeak, baselineLeak } = Scoring.calculateLeaks(segmentKey, data.pillars);
  const segment = SEGMENTS[segmentKey] || SEGMENTS.general;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="ff-reveal">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '0 0 8px' }}>Brand & Peer Benchmarks</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Compare your operational metrics to verified sector baseline benchmarks.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card padding="24px">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 0 16px' }}>Operational Efficiency</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800, color: totalLeak <= baselineLeak ? 'var(--success)' : 'var(--ff-red)' }}>
              {totalLeak <= baselineLeak ? 'Optimal' : 'Sub-optimal'}
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--text-muted)', marginTop: 12, margin: 0, lineHeight: 1.5 }}>
            {totalLeak <= baselineLeak 
              ? 'Your annual operational bleed is currently below standard benchmarks for your segment.' 
              : `Your operations bleed is $${(totalLeak - baselineLeak).toLocaleString()}/year higher than standard segment benchmarks.`}
          </p>
        </Card>

        <Card padding="24px">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 0 16px' }}>Benchmark References</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)' }}>Segment Model</span>
              <b style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-strong)' }}>{segment.label}</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)' }}>Standard Baseline Leak</span>
              <b style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-strong)' }}>${baselineLeak.toLocaleString()}/yr</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)' }}>Annual Leak Diff</span>
              <b style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: totalLeak <= baselineLeak ? 'var(--success)' : 'var(--danger)' }}>
                ${(totalLeak - baselineLeak).toLocaleString()}/yr
              </b>
            </div>
          </div>
        </Card>
      </div>

      <Card padding="26px">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, margin: '0 0 20px' }}>Pillar Comparison</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PILLARS_KEYS.map(key => {
            const dataP = benchmarks[key];
            const p = Q[key];
            const maxVal = 1000;
            const userPct = (dataP.user / maxVal) * 100;
            const avgPct = (dataP.avg / maxVal) * 100;
            const topPct = (dataP.topDecile / maxVal) * 100;

            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name={p.icon} size={16} color="var(--brand)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{p.label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-strong)', fontWeight: 600 }}>
                    {dataP.user} <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 400 }}>vs {dataP.avg} baseline</span>
                  </span>
                </div>
                <div style={{ height: 28, background: 'var(--neutral-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: `${avgPct}%`, top: 0, bottom: 0, width: 2, background: 'var(--text-strong)', zIndex: 3 }} title={`Segment Average: ${dataP.avg}`} />
                  <div style={{ position: 'absolute', left: `${topPct}%`, top: 0, bottom: 0, width: 2, background: 'var(--ff-gold)', zIndex: 3 }} title={`Top Target: ${dataP.topDecile}`} />
                  <div style={{
                    height: '100%',
                    width: `${userPct}%`,
                    background: dataP.user >= dataP.avg ? 'color-mix(in srgb, var(--success) 20%, var(--surface-card))' : 'color-mix(in srgb, var(--danger) 15%, var(--surface-card))',
                    borderRight: `2.5px solid ${dataP.user >= dataP.avg ? 'var(--success)' : 'var(--danger)'}`,
                    zIndex: 2,
                    position: 'absolute',
                    left: 0,
                    top: 0
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                  <span>0</span>
                  <span style={{ color: 'var(--text-strong)', fontWeight: 600 }}>Average Baseline ({dataP.avg})</span>
                  <span style={{ color: 'var(--ff-gold)', fontWeight: 600 }}>Top Standard ({dataP.topDecile})</span>
                  <span>1000</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ── Action Plan Tab View ────────────────────────────────── */
function ActionPlanTab({ data }) {
  const [filter, setFilter] = useState('all');
  const [completedItems, setCompletedItems] = useState({});

  const actions = [];
  if (data && data.pillars) {
    PILLARS_KEYS.forEach(pillarKey => {
      const score = data.pillars[pillarKey] || 0;
      const band = Scoring.band(score);
      const pillarActions = (ACTIONS[pillarKey] && ACTIONS[pillarKey][band]) || [];
      pillarActions.forEach((a, idx) => {
        actions.push({
          ...a,
          id: `${pillarKey}-${band}-${idx}`,
          pillar: pillarKey,
          band: band,
        });
      });
    });
  }

  const filteredActions = actions.filter(a => {
    if (filter === 'all') return true;
    return a.band === filter;
  });

  function toggleComplete(id) {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }} className="ff-reveal">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '0 0 8px' }}>Your Action Plan</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
            Operational fixes customized to your scores. Check items off as you complete them.
          </p>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--brand-tint)', color: 'var(--brand)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
          {Object.values(completedItems).filter(Boolean).length} of {actions.length} completed
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['all', 'critical', 'watch', 'steady'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`ff-auth-tab ${filter === type ? 'active' : ''}`}
            style={{
              padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              background: filter === type ? 'var(--brand)' : 'var(--neutral-100)',
              color: filter === type ? '#fff' : 'var(--text-body)',
              boxShadow: 'none', transition: 'all var(--dur-fast)'
            }}
          >
            {type === 'all' ? 'All Moves' : Scoring.bandLabel(type)}
          </button>
        ))}
      </div>

      <Card padding="26px">
        {filteredActions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
            No recommendations in this category.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredActions.map(a => {
              const done = !!completedItems[a.id];
              return (
                <div key={a.id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 0',
                  borderBottom: '1px solid var(--border-subtle)', opacity: done ? 0.5 : 1,
                  transition: 'opacity var(--dur-base)'
                }}>
                  <button onClick={() => toggleComplete(a.id)} style={{
                    width: 24, height: 24, marginTop: 1, flex: 'none', borderRadius: 7, cursor: 'pointer',
                    border: done ? 'none' : '2px solid var(--border-strong)',
                    background: done ? 'var(--success)' : 'var(--surface-card)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    transition: 'background var(--dur-fast), border var(--dur-fast)'
                  }}>{done && <Icon name="check" size={15} color="#fff" />}</button>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15.5, color: 'var(--text-strong)', textDecoration: done ? 'line-through' : 'none' }}>
                      {a.t}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
                      {a.d}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <Badge variant={a.band}>{Q[a.pillar]?.label}</Badge>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                      {a.band === 'critical' ? 'Urgent' : a.band === 'watch' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ── Settings Tab View ───────────────────────────────────── */
function SettingsTab({ profile, onUpdateProfile }) {
  const [name, setName] = useState(profile?.name || '');
  const [unitName, setUnitName] = useState(profile?.unitName || '');
  const [unitCount, setUnitCount] = useState(profile?.unitCount || 1);
  const [segmentKey, setSegmentKey] = useState(profile?.segmentKey || 'qsr');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setUnitName(profile.unitName || '');
      setUnitCount(profile.unitCount || 1);
      setSegmentKey(profile.segmentKey || 'qsr');
    }
  }, [profile]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const updated = { name, unitName, unitCount: parseInt(unitCount) || 1, segmentKey };
      await FrankyData.saveProfile(updated);
      onUpdateProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="ff-reveal">
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '0 0 8px' }}>Franchise Settings</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Manage your account profile, unit details, and configuration.
        </p>
      </div>

      <Card padding="32px" style={{ maxWidth: 540 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="settings-name">Full name</label>
            <input
              id="settings-name"
              className="ff-form-input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="settings-unit-name">Franchise unit name</label>
            <input
              id="settings-unit-name"
              className="ff-form-input"
              type="text"
              value={unitName}
              onChange={e => setUnitName(e.target.value)}
              required
            />
          </div>

          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="settings-unit-count">Number of locations</label>
            <input
              id="settings-unit-count"
              className="ff-form-input"
              type="number"
              min="1"
              value={unitCount}
              onChange={e => setUnitCount(e.target.value)}
              required
            />
          </div>

          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="settings-segment">Industry Segment</label>
            <select
              id="settings-segment"
              className="ff-form-input"
              value={segmentKey}
              onChange={e => setSegmentKey(e.target.value)}
              style={{ appearance: 'none', background: 'var(--surface-page) url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center / 16px' }}
            >
              {Object.entries(SEGMENTS).map(([key, s]) => (
                <option key={key} value={key}>{s.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
            <Button variant="primary" size="lg" type="submit" disabled={saving}>
              {saving ? 'Saving changes…' : 'Save changes'}
            </Button>
            {saved && (
              <span className="ff-diag-fade-in" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="check" size={16} />
                Changes saved successfully!
              </span>
            )}
          </div>
        </form>
      </Card>
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
        Run your first 8-minute diagnostic to get your Franky Health Score, pillar breakdown, and annual leak report.
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
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);      // latest diagnostic
  const [loading, setLoading] = useState(true);

  useLucide([tab, data, user, profile]);

  // Auth gate
  useEffect(() => {
    FrankyAuth.onChanged(u => {
      setUser(u);
      if (u === null) window.location.href = 'auth.html';
    });
  }, []);

  // Load latest diagnostic and profile
  useEffect(() => {
    if (!user) return;
    Promise.all([
      FrankyData.getLatestDiagnostic(),
      FrankyData.getProfile()
    ]).then(([d, prof]) => {
      setData(d);
      setProfile(prof || { name: user.name, unitName: 'My Franchise', unitCount: 1, segmentKey: 'qsr' });
      setLoading(false);
    }).catch(() => setLoading(false));
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

  const score = data?.overallScore || 0;
  const band = data?.band || 'critical';
  const pillars = data?.pillars || {};
  const segmentKey = data?.segmentKey || profile?.segmentKey || 'qsr';
  const segment = SEGMENTS[segmentKey] || SEGMENTS.general;

  // Build action plan from data
  let actionItems = [];
  if (data && data.pillars) {
    const sorted = [...PILLARS_KEYS].sort((a, b) => (data.pillars[a] || 0) - (data.pillars[b] || 0));
    sorted.forEach(pillarKey => {
      const pScore = data.pillars[pillarKey] || 0;
      const pBand = Scoring.band(pScore);
      const pillarActions = (ACTIONS[pillarKey] && ACTIONS[pillarKey][pBand]) || [];
      pillarActions.forEach(a => {
        if (actionItems.length < 5) {
          actionItems.push({ ...a, pillar: pillarKey, band: pBand });
        }
      });
    });
  }

  // Calculate leak data
  const { totalLeak, baselineLeak } = Scoring.calculateLeaks(segmentKey, pillars);

  // Tab Content Routing
  let mainContent;
  if (tab === 'Settings') {
    mainContent = <SettingsTab profile={profile} onUpdateProfile={setProfile} />;
  } else if (!data) {
    mainContent = <EmptyState />;
  } else {
    switch (tab) {
      case 'Overview':
        mainContent = (
          <>
            <FrankySays data={data} user={user} totalLeak={totalLeak} segmentLabel={segment.label} />

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
                <Stat label="Estimated Annual Leak" value={`$${totalLeak.toLocaleString()}`} intent="danger" />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  Quantified bleed across all pillars
                </div>
              </Card>
              <Card padding="22px">
                <Stat label="Segment Baseline Leak" value={`$${baselineLeak.toLocaleString()}`} intent="neutral" />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  Baseline for {segment.label}
                </div>
              </Card>
              <Card padding="22px">
                <Stat 
                  label="Difference vs. Baseline" 
                  value={`${totalLeak > baselineLeak ? '+' : ''}${(totalLeak - baselineLeak).toLocaleString()}`} 
                  intent={totalLeak > baselineLeak ? 'danger' : 'success'} 
                />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {totalLeak > baselineLeak ? 'Exceeding segment baseline losses' : 'Performing better than average'}
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
        );
        break;
      case 'Pillars':
        mainContent = <PillarsTab data={data} segmentKey={segmentKey} />;
        break;
      case 'Benchmarks':
        mainContent = <BenchmarksTab data={data} segmentKey={segmentKey} />;
        break;
      case 'Action plan':
        mainContent = <ActionPlanTab data={data} />;
        break;
      default:
        mainContent = <EmptyState />;
    }
  }

  return (
    <div className="ff-dash-layout">
      <Sidebar tab={tab} setTab={setTab} user={user} profile={profile} onSignOut={handleSignOut} />
      <div className="ff-dash-main">
        <Topbar profile={profile} />
        <main className="ff-dash-content">
          {mainContent}
        </main>
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
