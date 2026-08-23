import React from 'react';

const colors = {
  neutral: { bg: 'var(--surface-raised)', fg: 'var(--text-secondary)' },
  accent: { bg: 'var(--primary-muted-bg)', fg: 'var(--primary-hover)' },
  success: { bg: 'var(--success-muted-bg)', fg: 'var(--success-500)' },
  danger: { bg: 'oklch(from var(--danger-500) l c h / 0.15)', fg: 'var(--danger-400)' },
  warning: { bg: 'var(--warning-muted-bg)', fg: 'var(--accent-1-500)' },
};

export function Badge({ children, variant = 'neutral' }) {
  const c = colors[variant] || colors.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-2xs)', fontWeight: 500, letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase', background: c.bg, color: c.fg,
    }}>{children}</span>
  );
}
