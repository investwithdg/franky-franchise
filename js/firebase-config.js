/* ============================================================
   FRANKY FRANCHISE — Firebase Configuration + Data Layer
   ────────────────────────────────────────────────────────────
   SETUP (takes ~2 minutes):
   1.  Go to https://console.firebase.google.com → Create project
   2.  Add a Web App → copy the config object below
   3.  Authentication → Sign-in method → enable Email/Password AND Google
   4.  Cloud Firestore → Create database (start in test mode)
   5.  Replace the REPLACE_ME values below and redeploy

   Until configured the app runs in DEMO MODE — everything works
   but data lives in localStorage instead of the cloud.
   ============================================================ */

const _fbConfig = {
  apiKey:            'REPLACE_ME',
  authDomain:        'REPLACE_ME',
  projectId:         'REPLACE_ME',
  storageBucket:     'REPLACE_ME',
  messagingSenderId: 'REPLACE_ME',
  appId:             'REPLACE_ME',
};

const _isDemo = _fbConfig.apiKey === 'REPLACE_ME';
let _fbAuth = null;
let _fbDb   = null;

if (!_isDemo && typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(_fbConfig);
    _fbAuth = firebase.auth();
    _fbDb   = firebase.firestore();
  } catch (e) {
    console.warn('Firebase init failed — falling back to demo mode.', e);
  }
}

if (_isDemo || !_fbAuth) {
  console.info(
    '%c🌭 Franky is running in DEMO MODE. Add your Firebase config to js/firebase-config.js to go live.',
    'color:#DBA42F;font-weight:bold;font-size:13px'
  );

  // Seed default client demo data if localStorage is empty
  (function _seedDefaultDemoData() {
    if (!localStorage.getItem('franky_demo_user')) {
      localStorage.setItem('franky_demo_user', JSON.stringify({
        uid: 'demo_dana',
        email: 'dana@slicehouse.com',
        name: 'Dana Ruiz'
      }));
    }
    if (!localStorage.getItem('franky_profile')) {
      localStorage.setItem('franky_profile', JSON.stringify({
        name: 'Dana Ruiz',
        unitName: 'Slice House',
        unitCount: 12
      }));
    }
    if (!localStorage.getItem('franky_diagnostics')) {
      localStorage.setItem('franky_diagnostics', JSON.stringify([{
        overallScore: 724,
        pillars: { hiring: 742, sales: 668, vendors: 388, operations: 812 },
        band: 'steady',
        answers: {
          hiring: [4, 3, 4, 3, 4],
          sales: [3, 4, 3, 3, 4],
          vendors: [2, 1, 3, 2, 2],
          operations: [4, 4, 4, 4, 4]
        },
        completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }]));
    }
  })();
}

/* ── Helpers ────────────────────────────────────────────────── */
function _ls(key)       { try { return JSON.parse(localStorage.getItem('franky_' + key)); } catch { return null; } }
function _lsSet(key, v) { localStorage.setItem('franky_' + key, JSON.stringify(v)); }
function _id()          { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

/* ── Auth abstraction ──────────────────────────────────────── */
window.FrankyAuth = {
  /** Currently signed-in user (or null). */
  user: null,

  /**
   * Listen for auth state changes.
   * @param {Function} cb - receives user object or null
   * @returns {Function} unsubscribe
   */
  onChanged(cb) {
    if (_fbAuth) {
      return _fbAuth.onAuthStateChanged(u => {
        this.user = u ? { uid: u.uid, email: u.email, name: u.displayName || u.email.split('@')[0] } : null;
        cb(this.user);
      });
    }
    // Demo mode: check localStorage
    const demoUser = _ls('demo_user');
    this.user = demoUser;
    cb(this.user);
    return () => {};
  },

  /** Sign up with email + password. Returns user object. */
  async signUp(email, password, name) {
    if (_fbAuth) {
      const cred = await _fbAuth.createUserWithEmailAndPassword(email, password);
      if (name) await cred.user.updateProfile({ displayName: name });
      // Create user doc in Firestore
      await _fbDb.collection('users').doc(cred.user.uid).set({
        name: name || email.split('@')[0],
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.user = { uid: cred.user.uid, email, name: name || email.split('@')[0] };
      return this.user;
    }
    // Demo
    const u = { uid: 'demo_' + _id(), email, name: name || email.split('@')[0] };
    _lsSet('demo_user', u);
    this.user = u;
    return u;
  },

  /** Sign in with email + password. */
  async signIn(email, password) {
    if (_fbAuth) {
      const cred = await _fbAuth.signInWithEmailAndPassword(email, password);
      this.user = { uid: cred.user.uid, email: cred.user.email, name: cred.user.displayName || email.split('@')[0] };
      return this.user;
    }
    // Demo — accept any credentials
    const existing = _ls('demo_user');
    const u = existing && existing.email === email
      ? existing
      : { uid: 'demo_' + _id(), email, name: email.split('@')[0] };
    _lsSet('demo_user', u);
    this.user = u;
    return u;
  },

  /** Sign in with Google popup. */
  async signInGoogle() {
    if (_fbAuth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await _fbAuth.signInWithPopup(provider);
      const u = result.user;
      // Ensure user doc exists
      const doc = await _fbDb.collection('users').doc(u.uid).get();
      if (!doc.exists) {
        await _fbDb.collection('users').doc(u.uid).set({
          name: u.displayName || u.email.split('@')[0],
          email: u.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      this.user = { uid: u.uid, email: u.email, name: u.displayName || u.email.split('@')[0] };
      return this.user;
    }
    // Demo
    const u = { uid: 'demo_google', email: 'demo@gmail.com', name: 'Demo User' };
    _lsSet('demo_user', u);
    this.user = u;
    return u;
  },

  /** Sign out. */
  async signOut() {
    if (_fbAuth) { await _fbAuth.signOut(); }
    localStorage.removeItem('franky_demo_user');
    this.user = null;
  },
};

/* ── Data abstraction ──────────────────────────────────────── */
window.FrankyData = {
  /** Save a completed diagnostic. */
  async saveDiagnostic(data) {
    const user = FrankyAuth.user;
    if (!user) throw new Error('Not signed in');
    const record = { ...data, completedAt: new Date().toISOString() };

    if (_fbDb) {
      const unitId = data.unitId || 'default';
      await _fbDb
        .collection('users').doc(user.uid)
        .collection('units').doc(unitId)
        .collection('diagnostics').add({
          ...record,
          completedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      return;
    }
    // Demo
    const all = _ls('diagnostics') || [];
    all.push(record);
    _lsSet('diagnostics', all);
  },

  /** Get the most recent diagnostic. */
  async getLatestDiagnostic() {
    const user = FrankyAuth.user;
    if (!user) return null;

    if (_fbDb) {
      const snap = await _fbDb
        .collection('users').doc(user.uid)
        .collection('units').doc('default')
        .collection('diagnostics')
        .orderBy('completedAt', 'desc')
        .limit(1)
        .get();
      if (snap.empty) return null;
      return { id: snap.docs[0].id, ...snap.docs[0].data() };
    }
    // Demo
    const all = _ls('diagnostics') || [];
    return all.length ? all[all.length - 1] : null;
  },

  /** Get all diagnostics (for history). */
  async getDiagnostics() {
    const user = FrankyAuth.user;
    if (!user) return [];

    if (_fbDb) {
      const snap = await _fbDb
        .collection('users').doc(user.uid)
        .collection('units').doc('default')
        .collection('diagnostics')
        .orderBy('completedAt', 'desc')
        .get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
    // Demo
    return _ls('diagnostics') || [];
  },

  /** Save an email to the waitlist. */
  async addWaitlist(email) {
    if (_fbDb) {
      await _fbDb.collection('waitlist').add({
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return;
    }
    // Demo
    const list = _ls('waitlist') || [];
    list.push({ email, createdAt: new Date().toISOString() });
    _lsSet('waitlist', list);
  },

  /** Save / update user profile. */
  async saveProfile(data) {
    const user = FrankyAuth.user;
    if (!user) return;
    if (_fbDb) {
      await _fbDb.collection('users').doc(user.uid).set(data, { merge: true });
      return;
    }
    _lsSet('profile', { ...(_ls('profile') || {}), ...data });
  },

  /** Get user profile. */
  async getProfile() {
    const user = FrankyAuth.user;
    if (!user) return null;
    if (_fbDb) {
      const doc = await _fbDb.collection('users').doc(user.uid).get();
      return doc.exists ? doc.data() : null;
    }
    return _ls('profile');
  },
};
