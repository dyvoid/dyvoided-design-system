import React from 'react';

const SIZES = { xs: 20, sm: 26, md: 32, lg: 44 };
const TINTS = [
  { bg: 'var(--primary-muted-bg)', fg: 'var(--primary-400)' },
  { bg: 'var(--accent-1-muted-bg)', fg: 'var(--accent-1-400)' },
  { bg: 'var(--accent-2-muted-bg)', fg: 'var(--accent-2-400)' },
  { bg: 'var(--accent-3-muted-bg)', fg: 'var(--accent-3-400)' },
];

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
function tintFor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
  return TINTS[h % TINTS.length];
}

export function Avatar({ name = '', src, size = 'md', tint, status, square }) {
  const px = SIZES[size] || SIZES.md;
  const t = tint != null ? TINTS[tint % TINTS.length] : tintFor(name);
  const dot = status && { online: 'var(--success-500)', busy: 'var(--danger-500)', away: 'var(--warning-500)', offline: 'var(--text-disabled)' }[status];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <span title={name || undefined} style={{
        width: px, height: px, borderRadius: square ? 'var(--radius-sm)' : 'var(--radius-full)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        background: src ? 'var(--surface-sunken)' : t.bg, color: t.fg,
        border: '1px solid var(--border-subtle)', boxSizing: 'border-box',
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: Math.max(9, Math.round(px * 0.38)),
        letterSpacing: '0.01em', userSelect: 'none',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : initials(name)}
      </span>
      {dot && <span style={{
        position: 'absolute', right: -1, bottom: -1, width: Math.max(6, Math.round(px * 0.28)), height: Math.max(6, Math.round(px * 0.28)),
        borderRadius: 'var(--radius-full)', background: dot, border: '2px solid var(--surface-panel)', boxSizing: 'border-box',
      }} />}
    </span>
  );
}

export function AvatarGroup({ children, max = 4, size = 'md', overflow }) {
  const kids = React.Children.toArray(children);
  const shown = kids.slice(0, max);
  const rest = overflow != null ? overflow : kids.length - shown.length;
  const px = SIZES[size] || SIZES.md;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {shown.map((k, i) => <span key={i} style={{ marginLeft: i ? -Math.round(px * 0.3) : 0, display: 'inline-flex' }}>{k}</span>)}
      {rest > 0 && (
        <span style={{
          marginLeft: -Math.round(px * 0.3), width: px, height: px, borderRadius: 'var(--radius-full)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
          background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
          color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: Math.max(9, Math.round(px * 0.34)),
        }}>+{rest}</span>
      )}
    </span>
  );
}
