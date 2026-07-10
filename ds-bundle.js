/* @ds-bundle: {"format":4,"namespace":"FrankyFranchiseDesignSystem_83cfe5","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"PillarBar","sourcePath":"components/data/PillarBar.jsx"},{"name":"ScoreRing","sourcePath":"components/data/ScoreRing.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"04f5cc2ca000","components/core/Badge.jsx":"2b10d2985a64","components/core/Button.jsx":"c478a1c1d23a","components/core/Card.jsx":"967162393dd7","components/core/Input.jsx":"048dbd134dde","components/core/Tag.jsx":"fed25870317f","components/data/PillarBar.jsx":"268ca7fac1c8","components/data/ScoreRing.jsx":"0a5c3dfeaec0","components/data/Stat.jsx":"676bd0b84922","ui_kits/dashboard/DashboardScreen.jsx":"0d0c1d3cff05","ui_kits/marketing/MarketingScreen.jsx":"0b4d91778e50"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FrankyFranchiseDesignSystem_83cfe5 = window.FrankyFranchiseDesignSystem_83cfe5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FRANKY = 'assets/franky-mascot.png';

/**
 * Franky Franchise — Avatar
 * Round image or initials. Defaults to Franky the mascot.
 * NOTE: default mascot path is project-relative ("assets/..."); pass `src`
 * with the correct path for your page, or use initials.
 */
function Avatar({
  src,
  name,
  initials,
  size = 'md',
  ring = false,
  ringColor = 'var(--ff-gold)',
  style,
  ...rest
}) {
  const sizes = {
    xs: 26,
    sm: 34,
    md: 44,
    lg: 60,
    xl: 84
  };
  const px = typeof size === 'number' ? size : sizes[size] || 44;
  const showInitials = !src && (initials || name);
  const text = initials || (name ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() : '');
  const base = {
    width: px,
    height: px,
    borderRadius: '50%',
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    border: ring ? `3px solid ${ringColor}` : '2px solid var(--surface-card)',
    background: 'var(--ff-cream-deep)',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-bold)',
    color: 'var(--ff-ink)',
    fontSize: px * 0.38,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), showInitials ? text : /*#__PURE__*/React.createElement("img", {
    src: src || FRANKY,
    alt: name || 'Franky',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Franky Franchise — Badge
 * Status & score-band pills. Soft (tinted) by default, solid optional.
 */
function Badge({
  variant = 'neutral',
  solid = false,
  dot = false,
  size = 'md',
  children,
  style,
  ...rest
}) {
  const map = {
    strong: {
      fg: 'var(--score-strong)',
      bg: 'var(--score-strong-bg)'
    },
    steady: {
      fg: 'var(--score-steady)',
      bg: 'var(--score-steady-bg)'
    },
    watch: {
      fg: 'var(--score-watch)',
      bg: 'var(--score-watch-bg)'
    },
    critical: {
      fg: 'var(--score-critical)',
      bg: 'var(--score-critical-bg)'
    },
    success: {
      fg: 'var(--success)',
      bg: 'var(--success-bg)'
    },
    warning: {
      fg: 'var(--warning)',
      bg: 'var(--warning-bg)'
    },
    danger: {
      fg: 'var(--danger)',
      bg: 'var(--danger-bg)'
    },
    info: {
      fg: 'var(--info)',
      bg: 'var(--info-bg)'
    },
    brand: {
      fg: 'var(--brand)',
      bg: 'var(--brand-tint)'
    },
    gold: {
      fg: 'var(--ff-gold-deep)',
      bg: 'var(--ff-yellow-tint)'
    },
    neutral: {
      fg: 'var(--neutral-600)',
      bg: 'var(--neutral-100)'
    }
  };
  const c = map[variant] || map.neutral;
  const sizes = {
    sm: {
      fontSize: 'var(--text-2xs)',
      padding: '3px 8px',
      gap: '5px'
    },
    md: {
      fontSize: 'var(--text-xs)',
      padding: '4px 10px',
      gap: '6px'
    }
  };
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--fw-medium)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-pill)',
    background: solid ? c.fg : c.bg,
    color: solid ? '#fff' : c.fg,
    border: solid ? '1px solid transparent' : `1px solid color-mix(in srgb, ${c.fg} 20%, transparent)`,
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: styles
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: solid ? '#fff' : c.fg,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Franky Franchise — Button
 * Pill-shaped, bold, friendly. Red leads; gold and outline support it.
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  leadingIcon,
  trailingIcon,
  full = false,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '11px 22px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '15px 30px',
      fontSize: 'var(--text-md)'
    }
  };
  const palette = {
    primary: {
      base: {
        background: 'var(--brand)',
        color: 'var(--text-on-brand)',
        boxShadow: 'var(--shadow-brand)'
      },
      hover: {
        background: 'var(--brand-hover)'
      },
      press: {
        background: 'var(--brand-press)'
      }
    },
    secondary: {
      base: {
        background: 'var(--surface-card)',
        color: 'var(--text-strong)',
        borderColor: 'var(--border-ink)',
        boxShadow: 'var(--shadow-xs)'
      },
      hover: {
        background: 'var(--neutral-50)'
      },
      press: {
        background: 'var(--neutral-100)'
      }
    },
    gold: {
      base: {
        background: 'var(--ff-gold)',
        color: 'var(--ff-ink)'
      },
      hover: {
        background: 'var(--ff-gold-deep)',
        color: '#fff'
      },
      press: {
        background: 'var(--ff-gold-deep)',
        color: '#fff'
      }
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--brand)'
      },
      hover: {
        background: 'var(--brand-tint)'
      },
      press: {
        background: 'var(--ff-red-tint)'
      }
    }
  };
  const v = palette[variant] || palette.primary;
  const interactive = disabled ? {} : press ? v.press : hover ? v.hover : {};
  const styles = {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-bold)',
    borderRadius: 'var(--radius-pill)',
    border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    width: full ? '100%' : 'auto',
    opacity: disabled ? 0.45 : 1,
    transform: press && !disabled ? 'translateY(1px) scale(0.98)' : 'none',
    transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-out), color var(--dur-fast)',
    ...sizes[size],
    ...v.base,
    ...interactive,
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: styles,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Franky Franchise — Card
 * Warm white surface, round corners, soft elevation. Optional top accent bar.
 */
function Card({
  variant = 'raised',
  accent,
  interactive = false,
  padding = '24px',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const variants = {
    raised: {
      background: 'var(--surface-card)',
      boxShadow: hover && interactive ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      border: '1px solid var(--border-subtle)'
    },
    plain: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      border: '1px solid rgba(255,255,255,0.08)'
    }
  };
  const accentColors = {
    red: 'var(--ff-red)',
    gold: 'var(--ff-gold)',
    green: 'var(--score-strong)',
    watch: 'var(--score-watch)',
    critical: 'var(--score-critical)'
  };
  const styles = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    padding,
    overflow: 'hidden',
    transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
    transform: hover && interactive ? 'translateY(-3px)' : 'none',
    cursor: interactive ? 'pointer' : 'default',
    color: variant === 'inverse' ? 'var(--text-inverse)' : 'var(--text-body)',
    ...variants[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: styles,
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false)
  }, rest), accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: accentColors[accent] || accent
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Franky Franchise — Input
 * Labelled text field with optional leading icon, hint and error states.
 */
function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  size = 'md',
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `ff-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const sizes = {
    sm: {
      padding: '8px 12px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '11px 14px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '14px 16px',
      fontSize: 'var(--text-md)'
    }
  };
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--surface-card)',
      border: `2px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? `0 0 0 4px var(--focus-ring)` : 'var(--shadow-xs)',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      ...sizes[size]
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      fontFamily: 'var(--font-body)',
      fontSize: 'inherit',
      color: 'var(--text-strong)'
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, trailingIcon)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Franky Franchise — Tag
 * Filter / category chip. Lighter weight than Badge; optionally removable.
 */
function Tag({
  children,
  color = 'neutral',
  onRemove,
  active = false,
  style,
  ...rest
}) {
  const colors = {
    neutral: {
      fg: 'var(--neutral-700)',
      bg: 'var(--neutral-100)',
      bd: 'var(--border-strong)'
    },
    red: {
      fg: 'var(--brand)',
      bg: 'var(--brand-tint)',
      bd: 'color-mix(in srgb, var(--brand) 30%, transparent)'
    },
    gold: {
      fg: 'var(--ff-gold-deep)',
      bg: 'var(--ff-yellow-tint)',
      bd: 'color-mix(in srgb, var(--ff-gold) 40%, transparent)'
    },
    green: {
      fg: 'var(--success)',
      bg: 'var(--success-bg)',
      bd: 'color-mix(in srgb, var(--success) 30%, transparent)'
    }
  };
  const c = colors[color] || colors.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)',
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      background: active ? c.fg : c.bg,
      color: active ? '#fff' : c.fg,
      border: `1px solid ${active ? 'transparent' : c.bd}`,
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'inherit',
      fontSize: '15px',
      lineHeight: 1,
      padding: 0,
      opacity: 0.7,
      display: 'flex'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/PillarBar.jsx
try { (() => {
/**
 * Franky Franchise — PillarBar
 * Horizontal meter for one operating pillar (Hiring / Sales / Vendors / Operations).
 */
function PillarBar({
  label,
  value = 0,
  max = 1000,
  delta,
  icon,
  animate = true
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const s = value / max * 1000;
  const color = s >= 800 ? 'var(--score-strong)' : s >= 600 ? 'var(--score-steady)' : s >= 400 ? 'var(--score-watch)' : 'var(--score-critical)';
  const up = (delta ?? 0) >= 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)'
    }
  }, Math.round(value)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: up ? 'var(--success)' : 'var(--danger)',
      minWidth: 52,
      textAlign: 'right'
    }
  }, up ? '▲' : '▼', " ", up ? '+' : '', delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--neutral-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct * 100}%`,
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: color,
      transition: animate ? 'width 900ms var(--ease-out)' : undefined
    }
  })));
}
Object.assign(__ds_scope, { PillarBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PillarBar.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreRing.jsx
try { (() => {
/**
 * Franky Franchise — ScoreRing
 * The signature Franky Health Score gauge (0–1000). Colored arc by band,
 * big slab number in the center.
 */
function ScoreRing({
  value = 0,
  max = 1000,
  size = 180,
  thickness = 14,
  label = 'Franky Health Score',
  showLabel = true,
  animate = true
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  function band(v) {
    const s = v / max * 1000;
    if (s >= 800) return {
      color: 'var(--score-strong)',
      name: 'Thriving'
    };
    if (s >= 600) return {
      color: 'var(--score-steady)',
      name: 'Steady'
    };
    if (s >= 400) return {
      color: 'var(--score-watch)',
      name: 'Watch'
    };
    return {
      color: 'var(--score-critical)',
      name: 'Critical'
    };
  }
  const b = band(value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: "var(--neutral-100)",
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: b.color,
    strokeWidth: thickness,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    style: animate ? {
      transition: 'stroke-dashoffset 900ms var(--ease-out)'
    } : undefined
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: size * 0.3,
      lineHeight: 1,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, Math.round(value)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.066,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "/ ", max))), showLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-medium)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: b.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: b.color
    }
  }), b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, label)));
}
Object.assign(__ds_scope, { ScoreRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreRing.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
/**
 * Franky Franchise — Stat
 * Compact metric tile: label, big value, optional delta + caption.
 */
function Stat({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  intent,
  align = 'left'
}) {
  const up = (delta ?? 0) >= 0;
  const deltaColor = intent === 'neutral' ? 'var(--text-muted)' : up ? 'var(--success)' : 'var(--danger)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-muted)',
      fontWeight: 'var(--fw-medium)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-3xl)',
      lineHeight: 1,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-muted)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: deltaColor,
      display: 'inline-flex',
      gap: '4px'
    }
  }, intent !== 'neutral' && (up ? '▲' : '▼'), " ", up && intent !== 'neutral' ? '+' : '', delta, deltaLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontWeight: 500
    }
  }, deltaLabel)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashboardScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Franky Franchise — Dashboard UI kit screen.
   Composes the design-system primitives from window.FrankyFranchiseDesignSystem_83cfe5.
   Loaded via <script type="text/babel" src> after the bundle + Lucide. */
const {
  Button,
  Badge,
  Card,
  Avatar,
  Input,
  Tag,
  ScoreRing,
  PillarBar,
  Stat
} = window.FrankyFranchiseDesignSystem_83cfe5;
const {
  useState,
  useEffect
} = React;
const MASCOT = '../../assets/franky-mascot.png';
const LOGO = '../../assets/franky-logo.png';
function Icon({
  name,
  size = 20,
  color,
  strokeWidth = 2
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      strokeWidth
    }
  });
}
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function NavItem({
  icon,
  label,
  active,
  onClick
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      background: active ? 'var(--brand-tint)' : hover ? 'var(--neutral-50)' : 'transparent',
      color: active ? 'var(--brand)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  }), label);
}
function Sidebar({
  tab,
  setTab
}) {
  const items = [['layout-dashboard', 'Overview'], ['target', 'Pillars'], ['bar-chart-3', 'Benchmarks'], ['list-checks', 'Action plan'], ['settings', 'Settings']];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-w)',
      flex: 'none',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 8px 18px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    width: 40,
    height: 40,
    alt: "Franky"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, "Franky", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, "Franchise"))), items.map(([ic, label]) => /*#__PURE__*/React.createElement(NavItem, {
    key: label,
    icon: ic,
    label: label,
    active: tab === label,
    onClick: () => setTab(label)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 8px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Dana Ruiz",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--text-strong)'
    }
  }, "Dana Ruiz"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "Multi-unit owner"))));
}
function Topbar({
  onRun
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 28px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-page)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 12px 7px 8px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MASCOT,
    width: 26,
    height: 26,
    style: {
      borderRadius: '50%'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, "Slice House \xB7 12 units"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("button", {
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "activity",
      size: 18
    }),
    onClick: onRun
  }, "Run diagnostic")));
}
const iconBtn = {
  width: 38,
  height: 38,
  borderRadius: '50%',
  border: '1px solid var(--border-subtle)',
  background: 'var(--surface-card)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};
function FrankySays() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'var(--ff-ink)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 20px',
      color: 'var(--text-inverse)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MASCOT,
    width: 48,
    height: 48,
    style: {
      borderRadius: '50%',
      border: '3px solid var(--ff-gold)',
      flex: 'none'
    },
    alt: "Franky"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700
    }
  }, "Morning, Dana."), " Your score's up ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ff-yellow)'
    }
  }, "+28 this month"), " \u2014 nice climb. One thing: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ff-yellow)'
    }
  }, "Vendors"), " slipped into Watch. I've put the fix at the top of your plan."));
}
const PILLARS = [{
  label: 'Hiring',
  value: 742,
  delta: +42,
  icon: 'users'
}, {
  label: 'Sales',
  value: 668,
  delta: +11,
  icon: 'trending-up'
}, {
  label: 'Vendors',
  value: 388,
  delta: -15,
  icon: 'truck'
}, {
  label: 'Operations',
  value: 812,
  delta: +6,
  icon: 'cog'
}];
const ACTIONS = [{
  p: 'critical',
  t: 'Renegotiate cheese & dough vendor',
  d: 'Costs up 9% vs benchmark — locks in before Q3',
  pillar: 'Vendors'
}, {
  p: 'watch',
  t: 'Fill 2 open shift-lead roles',
  d: 'Understaffed stores score 18% lower on Ops',
  pillar: 'Hiring'
}, {
  p: 'steady',
  t: 'Roll out the upsell script to 3 units',
  d: 'Top units see +6% ticket size',
  pillar: 'Sales'
}];
function ActionRow({
  a
}) {
  const [done, setDone] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)',
      opacity: done ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDone(!done),
    style: {
      width: 24,
      height: 24,
      marginTop: 1,
      flex: 'none',
      borderRadius: 7,
      cursor: 'pointer',
      border: done ? 'none' : '2px solid var(--border-strong)',
      background: done ? 'var(--success)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }
  }, done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-strong)',
      textDecoration: done ? 'line-through' : 'none'
    }
  }, a.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, a.d)), /*#__PURE__*/React.createElement(Badge, {
    variant: a.p
  }, a.pillar));
}
function DashboardScreen() {
  const [tab, setTab] = useState('Overview');
  const [score, setScore] = useState(724);
  useLucide([tab, score]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    tab: tab,
    setTab: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    onRun: () => setScore(s => Math.min(1000, s + 12))
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(FrankySays, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
      gap: 20,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "26px",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    },
    accent: "green"
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    value: score,
    size: 196
  }), /*#__PURE__*/React.createElement(Badge, {
    variant: "strong",
    dot: true,
    style: {
      marginTop: 4
    }
  }, "\u25B2 +28 this month"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "Updated 2h ago")), /*#__PURE__*/React.createElement(Card, {
    padding: "26px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      color: 'var(--text-strong)'
    }
  }, "Four pillars"), /*#__PURE__*/React.createElement(Badge, {
    variant: "brand",
    style: {
      marginLeft: 'auto'
    }
  }, "8-min diagnostic")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, PILLARS.map(p => /*#__PURE__*/React.createElement(PillarBar, _extends({
    key: p.label
  }, p, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: p.icon,
      size: 18
    })
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "22px"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Projected revenue",
    value: "$1.24M",
    delta: "+8.3%",
    deltaLabel: "next 90 days"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "22px"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Benchmark rank",
    value: "Top 15%",
    intent: "neutral"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "among 1,400+ pizza franchises")), /*#__PURE__*/React.createElement(Card, {
    padding: "22px"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "At-risk units",
    value: 2,
    unit: "of 12",
    delta: -1,
    deltaLabel: "vs last mo"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "26px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      color: 'var(--text-strong)'
    }
  }, "Your action plan"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "3 moves this week")), ACTIONS.map((a, i) => /*#__PURE__*/React.createElement(ActionRow, {
    key: i,
    a: a
  }))))));
}
window.DashboardScreen = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingScreen.jsx
try { (() => {
/* Franky Franchise — Marketing landing page UI kit.
   Composes design-system primitives from window.FrankyFranchiseDesignSystem_83cfe5. */
const {
  Button,
  Badge,
  Card,
  ScoreRing,
  PillarBar,
  Stat,
  Avatar
} = window.FrankyFranchiseDesignSystem_83cfe5;
const {
  useState,
  useEffect
} = React;
const MASCOT = '../../assets/franky-mascot.png';
const LOGO = '../../assets/franky-logo.png';
const BADGE = '../../assets/franky-badge.png';
function Icon({
  name,
  size = 22,
  color
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color
    }
  });
}
const WRAP = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 32px'
};
const EYE = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--brand)',
  fontWeight: 500
};
function Nav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      ...WRAP,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '20px 32px',
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    width: 42,
    height: 42,
    alt: "Franky Franchise"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--text-strong)'
    }
  }, "Franky Franchise")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginLeft: 24
    }
  }, ['Product', 'The four pillars', 'Pricing', 'Story'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Get my score")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...WRAP,
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 48,
      alignItems: 'center',
      padding: '56px 32px 72px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: EYE
  }, "Operational health for franchises"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '16px 0 0',
      textWrap: 'normal'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "Know what's coming."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--brand)'
    }
  }, "Before it costs you.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.5,
      color: 'var(--text-body)',
      maxWidth: 460,
      margin: '20px 0 28px'
    }
  }, "Franky runs an 8-minute diagnostic, scores your Hiring, Sales, Vendors and Operations, and turns it into one number you can act on this week \u2014 like a credit score for your franchise."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "activity",
      size: 20
    })
  }, "Run the 8-minute diagnostic"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg"
  }, "See a sample score")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Operators",
    value: "1,400+",
    intent: "neutral"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Avg. score lift",
    value: "+86",
    unit: "pts / qtr",
    intent: "neutral"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Diagnostic",
    value: "8",
    unit: "min",
    intent: "neutral"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "28px",
    accent: "green",
    style: {
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MASCOT,
    width: 40,
    height: 40,
    style: {
      borderRadius: '50%',
      border: '2px solid var(--ff-gold)'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, "Slice House \xB7 12 units"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "Franky Health Score")), /*#__PURE__*/React.createElement(Badge, {
    variant: "strong",
    dot: true,
    style: {
      marginLeft: 'auto'
    }
  }, "Thriving")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: '4px 0 20px'
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    value: 724,
    size: 172,
    showLabel: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement(PillarBar, {
    label: "Hiring",
    value: 742,
    delta: +42
  }), /*#__PURE__*/React.createElement(PillarBar, {
    label: "Vendors",
    value: 388,
    delta: -15
  })))));
}
const FEATURES = [['users', 'Hiring', 'Spot understaffing and turnover risk before a store starts slipping.'], ['trending-up', 'Sales', 'See which units are leaving ticket size on the table — and the script that fixes it.'], ['truck', 'Vendors', 'Catch cost creep early. Franky flags the renegotiation before it bites margin.'], ['cog', 'Operations', 'A live read on the day-to-day so small cracks never become closures.']];
function Pillars() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...WRAP,
      padding: '64px 32px',
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 620,
      margin: '0 auto 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: EYE
  }, "The four pillars"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      color: 'var(--text-strong)',
      margin: '12px 0 0'
    }
  }, "One score. Four things that actually move it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, FEATURES.map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: 'var(--brand-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 24,
    color: "var(--brand)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 21,
      color: 'var(--text-strong)',
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, d)))));
}
function HowItWorks() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ff-ink)',
      color: 'var(--text-inverse)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center',
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYE,
      color: 'var(--ff-yellow)'
    }
  }, "How the score works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 38,
      color: '#fff',
      margin: '12px 0 16px'
    }
  }, "From a hunch to a number you can act on."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.78)',
      margin: '0 0 24px',
      maxWidth: 440
    }
  }, "Every score lands in one of four bands. The band tells you how worried to be; the action plan tells you what to do next."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['strong', 'Thriving', '800–1000', 'Ahead of the pack — protect it.'], ['steady', 'Steady', '600–799', 'Solid, with room to climb.'], ['watch', 'Watch', '400–599', 'Something\'s about to slip.'], ['critical', 'Critical', '0–399', 'Act this week.']].map(([v, n, r, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: v,
    solid: true,
    style: {
      minWidth: 96,
      justifyContent: 'center'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'rgba(255,255,255,0.6)',
      minWidth: 84
    }
  }, r), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'rgba(255,255,255,0.85)'
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-2xl)',
      padding: 40,
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    value: 724,
    size: 240
  })))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...WRAP,
      maxWidth: 'var(--container-max)',
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--brand)',
      borderRadius: 'var(--radius-2xl)',
      padding: '52px 56px',
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      boxShadow: 'var(--shadow-brand)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: BADGE,
    width: 132,
    height: 132,
    style: {
      flex: 'none'
    },
    alt: "Franky"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 36,
      color: '#fff',
      margin: '0 0 8px'
    }
  }, "Get your Franky Health Score"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      color: 'rgba(255,255,255,0.9)',
      margin: 0
    }
  }, "Eight minutes. No POS hookup. Just a clear read on what's coming.")), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    style: {
      flex: 'none'
    }
  }, "Start free diagnostic")));
}
function Footer() {
  const cols = {
    Product: ['Overview', 'The four pillars', 'Benchmarks', 'Pricing'],
    Company: ['Our story', 'Careers', 'Press', 'Contact'],
    Resources: ['Operator guides', 'Help center', 'API', 'Status']
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-900)',
      color: 'rgba(255,255,255,0.7)',
      padding: '56px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40,
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    width: 40,
    height: 40,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: '#fff'
    }
  }, "Franky Franchise")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.55,
      maxWidth: 260,
      margin: 0
    }
  }, "The operational health score for franchise operators. Know what's coming.")), Object.entries(cols).map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ff-yellow)',
      marginBottom: 14
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none'
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      maxWidth: 'var(--container-max)',
      marginTop: 40,
      paddingTop: 22,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "\xA9 2026 Franky Franchise, Inc."), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Privacy \xB7 Terms")));
}
function MarketingScreen() {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Pillars, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.MarketingScreen = MarketingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.PillarBar = __ds_scope.PillarBar;

__ds_ns.ScoreRing = __ds_scope.ScoreRing;

__ds_ns.Stat = __ds_scope.Stat;

})();
