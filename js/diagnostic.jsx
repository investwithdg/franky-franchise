/* Franky Franchise — 8-minute Diagnostic Flow.
   Full-screen questionnaire → score reveal.
   Uses FRANKY_QUESTIONS, FRANKY_SEGMENTS and FrankyScoring from diagnostic-questions.js. */
const { Button, Badge, Card, ScoreRing, PillarBar } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect, useRef, useCallback } = React;

const MASCOT = 'assets/franky-mascot.png';
const LOGO   = 'assets/franky-logo.png';
const PILLARS = window.FRANKY_PILLARS;
const Q = window.FRANKY_QUESTIONS;
const Scoring = window.FrankyScoring;
const SEGMENTS = window.FRANKY_SEGMENTS;

function Icon({ name, size = 20, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

/* ── Tiny progress bar ───────────────────────────────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="ff-diag-progress-wrap">
      <div className="ff-diag-progress-track">
        <div className="ff-diag-progress-fill" style={{ width: pct + '%' }} />
      </div>
      <span className="ff-diag-progress-label">{current} of {total}</span>
    </div>
  );
}

/* ── Start screen ────────────────────────────────────────── */
function StartScreen({ onStart }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="ff-diag-center ff-reveal">
      <img src={MASCOT} width={96} height={96} style={{ borderRadius: '50%', border: '4px solid var(--ff-gold)', marginBottom: 24 }} alt="Franky" />
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-strong)', margin: '0 0 12px', textAlign: 'center' }}>
        Ready to run your diagnostic?
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-body)', maxWidth: 440, textAlign: 'center', lineHeight: 1.55, margin: '0 0 32px' }}>
        20 questions across four pillars. About 8 minutes. At the end you'll get your Franky Health Score and a quantified report of your annual leaks.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {PILLARS.map(key => {
          const p = Q[key];
          return (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text-body)',
            }}>
              <Icon name={p.icon} size={16} color={p.color} />
              {p.label}
            </div>
          );
        })}
      </div>
      <Button variant="primary" size="lg" onClick={onStart} style={{ marginTop: 36, minWidth: 220, justifyContent: 'center' }}
        leadingIcon={<Icon name="activity" size={20} />}
      >
        Let's go
      </Button>
    </div>
  );
}

/* ── Segment selection screen ────────────────────────────── */
function SegmentSelect({ onSelect }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="ff-diag-center ff-reveal">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-strong)', margin: '0 0 12px', textAlign: 'center' }}>
        Select your industry segment
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-muted)', maxWidth: 440, textAlign: 'center', lineHeight: 1.55, margin: '0 0 32px' }}>
        We compare your operational metrics to benchmarks verified for your specific industry sector.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 420 }}>
        {Object.entries(SEGMENTS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="ff-diag-option"
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            type="button"
          >
            <span style={{ fontWeight: 600, fontSize: 15.5 }}>{s.label}</span>
            <Icon name="arrow-right" size={18} color="var(--brand)" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Pillar intro screen ─────────────────────────────────── */
function PillarIntro({ pillarKey, index, onStart }) {
  const p = Q[pillarKey];
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="ff-diag-center ff-diag-fade-in" key={'intro-' + pillarKey}>
      <div className="ff-diag-pillar-icon" style={{ '--pillar-color': p.color }}>
        <Icon name={p.icon} size={36} color={p.color} />
      </div>
      <div className="ff-eyebrow" style={{ marginTop: 20, color: p.color }}>Pillar {index + 1} of 4</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-strong)', margin: '8px 0 12px' }}>
        {p.label}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-body)', maxWidth: 420, textAlign: 'center', lineHeight: 1.55, margin: '0 0 32px' }}>
        {p.description}
      </p>
      <Button variant="primary" size="lg" onClick={onStart} style={{ minWidth: 180, justifyContent: 'center' }}>
        5 questions — let's go
      </Button>
    </div>
  );
}

/* ── Question screen ─────────────────────────────────────── */
function QuestionScreen({ pillarKey, questionIndex, question, selected, onSelect, onNext, qNumber, totalQ }) {
  const p = Q[pillarKey];
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <div className="ff-diag-fade-in" key={question.id}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <Icon name={p.icon} size={18} color={p.color} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {p.label} · Q{questionIndex + 1} of 5
        </span>
      </div>

      <h2 className="ff-diag-question-text">{question.text}</h2>

      <div className="ff-diag-options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`ff-diag-option ${selected === i ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
            type="button"
          >
            <span className="ff-diag-option-radio">
              {selected === i && <span className="ff-diag-option-dot" />}
            </span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={selected === null}
          style={{ minWidth: 140, justifyContent: 'center' }}
          trailingIcon={<Icon name="arrow-right" size={18} />}
        >
          {qNumber === totalQ ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

/* ── Calculating screen ──────────────────────────────────── */
function Calculating() {
  return (
    <div className="ff-diag-center ff-diag-fade-in">
      <div className="ff-diag-spinner" />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-strong)', margin: '24px 0 8px' }}>
        Calculating your report…
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)' }}>
        Scoring four pillars and quantifying your annual operational leaks.
      </p>
    </div>
  );
}

/* ── Score reveal ────────────────────────────────────────── */
function ScoreReveal({ pillarScores, overallScore, band, segmentKey }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Animate score counter
    const duration = 1800;
    const start = performance.now();
    let raf;
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(eased * overallScore));
      if (t < 1) { raf = requestAnimationFrame(step); }
      else { setRevealed(true); }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [overallScore]);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const bandLabel = Scoring.bandLabel(band);
  
  // Calculate leak values
  const { totalLeak } = Scoring.calculateLeaks(segmentKey, pillarScores);

  return (
    <div className="ff-diag-reveal ff-diag-fade-in">
      <div className="ff-diag-reveal-card" style={{ maxWidth: 580 }}>
        <div className="ff-eyebrow" style={{ textAlign: 'center', marginBottom: 4 }}>Diagnostic Complete</div>
        
        {/* Estimated Annual Leak Headline */}
        <div className="ff-reveal" style={{ textAlign: 'center', marginBottom: 24, marginTop: 10 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: '0 0 6px', color: 'var(--text-strong)' }}>
            Your operations are leaking
          </h2>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: 'var(--ff-red)', lineHeight: 1.1 }}>
            ${totalLeak.toLocaleString()}<span style={{ fontSize: 18, fontWeight: 500, color: 'var(--text-muted)' }}>/year</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-muted)', marginTop: 8, margin: 0 }}>
            Estimated annual bleed across hiring, sales, vendors, and ops based on segment metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '20px 0', marginBottom: 20 }}>
          <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Franky Score</div>
            <ScoreRing value={displayScore} size={130} showLabel={true} />
            <Badge variant={band} solid style={{ marginTop: 8, fontSize: 11 }}>{bandLabel}</Badge>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 15 }}>Pillar Losses:</h4>
            {PILLARS.map(key => {
              const p = Q[key];
              const score = pillarScores[key];
              const maxL = {
                qsr: { hiring: 90000, sales: 40000, vendors: 45000, operations: 35000 },
                auto: { hiring: 240000, sales: 90000, vendors: 60000, operations: 80000 },
                fitness: { hiring: 80000, sales: 60000, vendors: 25000, operations: 35000 },
                healthcare: { hiring: 110000, sales: 150000, vendors: 45000, operations: 75000 },
                general: { hiring: 50000, sales: 30000, vendors: 20000, operations: 25000 }
              }[segmentKey]?.[key] || 50000;
              const leak = Math.round((1 - (score / 1000)) * maxL);

              return (
                <div key={key} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13.5 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name={p.icon} size={14} color={p.color} />
                    {p.label}
                  </span>
                  <span>
                    <b>${leak.toLocaleString()}</b> <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>({score} pts)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`ff-diag-reveal-ctas visible`} style={{ marginTop: 10 }}>
          <Button variant="primary" size="lg" onClick={() => window.location.href = 'dashboard.html'}
            style={{ flex: 1, justifyContent: 'center' }}
            leadingIcon={<Icon name="layout-dashboard" size={18} />}
          >
            View your dashboard
          </Button>
          <Button variant="ghost" size="lg" onClick={() => window.location.href = 'index.html'}
            style={{ justifyContent: 'center' }}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Main diagnostic controller ──────────────────────────── */
function DiagnosticPage() {
  const [screen, setScreen] = useState('start'); // start | segment-select | pillar-intro | question | calculating | results
  const [segmentKey, setSegmentKey] = useState('qsr');
  const [pillarIdx, setPillarIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({ hiring: [], sales: [], vendors: [], operations: [] });
  const [results, setResults] = useState(null);

  // Check auth
  const [user, setUser] = useState(undefined); // undefined = loading
  useEffect(() => { FrankyAuth.onChanged(u => setUser(u)); }, []);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  // Redirect to auth if not signed in (after initial check)
  useEffect(() => {
    if (user === null) window.location.href = 'auth.html';
  }, [user]);

  // Current state helpers
  const currentPillarKey = PILLARS[pillarIdx];
  const currentPillar = Q[currentPillarKey];
  const currentQuestion = currentPillar?.questions[qIdx];
  const totalQuestions = 20;
  const currentQNumber = pillarIdx * 5 + qIdx + 1;

  function handleStart() {
    setScreen('segment-select');
  }

  function handleSegmentSelect(key) {
    setSegmentKey(key);
    setScreen('pillar-intro');
    setPillarIdx(0);
    setQIdx(0);
  }

  function handlePillarStart() {
    setScreen('question');
    setQIdx(0);
    setSelected(null);
  }

  function handleSelect(optionIndex) {
    setSelected(optionIndex);
  }

  async function handleNext() {
    if (selected === null) return;

    // Record answer
    const score = currentQuestion.options[selected].score;
    const newAnswers = { ...answers };
    newAnswers[currentPillarKey] = [...newAnswers[currentPillarKey], score];
    setAnswers(newAnswers);
    setSelected(null);

    if (qIdx < 4) {
      // Next question in same pillar
      setQIdx(qIdx + 1);
    } else if (pillarIdx < 3) {
      // Next pillar
      setPillarIdx(pillarIdx + 1);
      setScreen('pillar-intro');
    } else {
      // All done — calculate
      setScreen('calculating');

      const pillarScores = {};
      PILLARS.forEach(key => {
        pillarScores[key] = Scoring.pillarScore(newAnswers[key]);
      });
      const overall = Scoring.overallScore(pillarScores);
      const band = Scoring.band(overall);
      const leakCalculations = Scoring.calculateLeaks(segmentKey, pillarScores);

      // Save to Firestore / localStorage
      try {
        await FrankyData.saveDiagnostic({
          segmentKey,
          overallScore: overall,
          pillars: pillarScores,
          band,
          answers: newAnswers,
          leaks: leakCalculations.leaks,
          totalLeak: leakCalculations.totalLeak,
          baselineLeak: leakCalculations.baselineLeak,
        });
        // Save segmentKey to user profile
        await FrankyData.saveProfile({ segmentKey });
      } catch (e) {
        console.warn('Failed to save diagnostic:', e);
      }

      // Brief pause for dramatic effect
      setTimeout(() => {
        setResults({ pillarScores, overallScore: overall, band, segmentKey });
        setScreen('results');
      }, 2200);
    }
  }

  // Loading state
  if (user === undefined) {
    return (
      <div className="ff-diag" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ff-diag-spinner" />
      </div>
    );
  }

  return (
    <div className="ff-diag">
      {/* Top bar — minimal */}
      {screen !== 'results' && (
        <div className="ff-diag-topbar">
          <a href="index.html" className="ff-diag-logo">
            <img src={LOGO} width={36} height={36} alt="Franky" />
            <span>Franky</span>
          </a>
          {(screen === 'question' || screen === 'pillar-intro') && (
            <ProgressBar current={currentQNumber} total={totalQuestions} />
          )}
          <button
            className="ff-diag-exit"
            onClick={() => {
              if (confirm('Leave the diagnostic? Your progress won\'t be saved.')) {
                window.location.href = 'dashboard.html';
              }
            }}
          >
            <Icon name="x" size={20} color="var(--text-muted)" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="ff-diag-body">
        {screen === 'start' && <StartScreen onStart={handleStart} />}
        {screen === 'segment-select' && (
          <SegmentSelect onSelect={handleSegmentSelect} />
        )}
        {screen === 'pillar-intro' && (
          <PillarIntro pillarKey={currentPillarKey} index={pillarIdx} onStart={handlePillarStart} />
        )}
        {screen === 'question' && currentQuestion && (
          <div className="ff-diag-question-wrap">
            <QuestionScreen
              pillarKey={currentPillarKey}
              questionIndex={qIdx}
              question={currentQuestion}
              selected={selected}
              onSelect={handleSelect}
              onNext={handleNext}
              qNumber={currentQNumber}
              totalQ={totalQuestions}
            />
          </div>
        )}
        {screen === 'calculating' && <Calculating />}
        {screen === 'results' && results && (
          <ScoreReveal {...results} />
        )}
      </div>
    </div>
  );
}

window.DiagnosticPage = DiagnosticPage;
