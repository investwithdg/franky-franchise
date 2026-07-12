/* Franky Franchise — 8-minute Diagnostic Flow.
   Full-screen questionnaire → score reveal.
   Uses FRANKY_QUESTIONS and FrankyScoring from diagnostic-questions.js. */
const { Button, Badge, Card, ScoreRing, PillarBar } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect, useRef, useCallback } = React;

const MASCOT = 'assets/franky-mascot.png';
const LOGO   = 'assets/franky-logo.png';
const PILLARS = window.FRANKY_PILLARS;
const Q = window.FRANKY_QUESTIONS;
const Scoring = window.FrankyScoring;

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
        20 questions across four pillars. About 8 minutes. At the end you'll get your Franky Health Score and a clear action plan.
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
        Crunching your numbers…
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)' }}>
        Scoring four pillars and building your action plan.
      </p>
    </div>
  );
}

/* ── Score reveal ────────────────────────────────────────── */
function ScoreReveal({ scores, pillarScores, overallScore, band }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Animate score counter
    const duration = 1800;
    const start = performance.now();
    let raf;
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      // Ease out cubic
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

  return (
    <div className="ff-diag-reveal ff-diag-fade-in">
      <div className="ff-diag-reveal-card">
        <div className="ff-eyebrow" style={{ textAlign: 'center', marginBottom: 8 }}>Your Franky Health Score</div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 20px' }}>
          <ScoreRing value={displayScore} size={220} showLabel={true} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Badge variant={band} solid style={{ fontSize: 15, padding: '6px 18px' }}>{bandLabel}</Badge>
        </div>

        <div className={`ff-diag-pillars-summary ${revealed ? 'visible' : ''}`}>
          {PILLARS.map(key => {
            const p = Q[key];
            const score = pillarScores[key];
            return (
              <PillarBar
                key={key}
                label={p.label}
                value={revealed ? score : 0}
                icon={<Icon name={p.icon} size={18} />}
              />
            );
          })}
        </div>

        <div className={`ff-diag-reveal-ctas ${revealed ? 'visible' : ''}`}>
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
  const [screen, setScreen] = useState('start'); // start | pillar-intro | question | calculating | results
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
    setScreen('pillar-intro');
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

      // Save to Firestore / localStorage
      try {
        await FrankyData.saveDiagnostic({
          overallScore: overall,
          pillars: pillarScores,
          band,
          answers: newAnswers,
        });
      } catch (e) {
        console.warn('Failed to save diagnostic:', e);
      }

      // Brief pause for dramatic effect
      setTimeout(() => {
        setResults({ pillarScores, overallScore: overall, band });
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
            <ProgressBar current={currentQNumber - (screen === 'pillar-intro' ? 0 : 0)} total={totalQuestions} />
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
