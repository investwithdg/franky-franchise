/* Franky Franchise — Auth page (Sign Up / Log In).
   Uses the FrankyAuth abstraction from firebase-config.js. */
const { Button, Card } = window.FrankyFranchiseDesignSystem_83cfe5;
const { useState, useEffect } = React;

const LOGO = 'assets/franky-logo.png';

function Icon({ name, size = 20, color }) {
  return <i data-lucide={name} style={{ width: size, height: size, color }} />;
}

function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  // If already signed in, go to dashboard
  useEffect(() => {
    FrankyAuth.onChanged(u => { if (u) window.location.href = 'dashboard.html'; });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await FrankyAuth.signUp(email, password, name);
      } else {
        await FrankyAuth.signIn(email, password);
      }
      window.location.href = 'dashboard.html';
    } catch (err) {
      const msg = err.code
        ? {
            'auth/email-already-in-use': 'That email is already registered. Try signing in.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/weak-password': 'Password must be at least 6 characters.',
            'auth/user-not-found': 'No account found with that email.',
            'auth/wrong-password': 'Incorrect password. Try again.',
            'auth/invalid-credential': 'Invalid email or password.',
          }[err.code] || err.message
        : err.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await FrankyAuth.signInGoogle();
      window.location.href = 'dashboard.html';
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in failed.');
      }
    } finally {
      setLoading(false);
    }
  }

  const isSignup = mode === 'signup';

  return (
    <div className="ff-auth-wrapper">
      <div className="ff-auth-card ff-reveal">
        {/* Logo */}
        <a href="index.html" className="ff-auth-logo">
          <img src={LOGO} width={52} height={52} alt="Franky Franchise" />
        </a>

        <h1 className="ff-auth-title">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="ff-auth-subtitle">
          {isSignup
            ? 'Start with a free diagnostic — no credit card required.'
            : 'Sign in to view your score and action plan.'}
        </p>

        {/* Tabs */}
        <div className="ff-auth-tabs">
          <button
            className={`ff-auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >Log in</button>
          <button
            className={`ff-auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setError(''); }}
          >Sign up</button>
        </div>

        {/* Error */}
        {error && (
          <div className="ff-auth-error">
            <Icon name="alert-circle" size={16} color="var(--danger)" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="ff-auth-form">
          {isSignup && (
            <div className="ff-form-group">
              <label className="ff-form-label" htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                className="ff-form-input"
                type="text"
                placeholder="Dana Ruiz"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}
          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              className="ff-form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="ff-form-group">
            <label className="ff-form-label" htmlFor="auth-pw">Password</label>
            <input
              id="auth-pw"
              className="ff-form-input"
              type="password"
              placeholder={isSignup ? 'At least 6 characters' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              minLength={6}
              required
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            style={{ width: '100%', marginTop: 4, justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'One sec…' : isSignup ? 'Create account' : 'Sign in'}
          </Button>
        </form>

        {/* Divider */}
        <div className="ff-auth-divider">
          <span>or</span>
        </div>

        {/* Google */}
        <button
          className="ff-auth-google"
          onClick={handleGoogle}
          disabled={loading}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.09 24.09 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          <span>Continue with Google</span>
        </button>

        <p className="ff-auth-footer-text">
          By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

window.AuthPage = AuthPage;
