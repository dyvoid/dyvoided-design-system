import React from 'react';

export function ProgressBar({ value = 0, variant = 'primary', label }) {
  const color = { primary: 'var(--primary)', success: 'var(--success-500)', danger: 'var(--danger-500)', warning: 'var(--warning-500)' }[variant] || 'var(--primary)';
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontFamily: 'var(--font-body)' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
          <span>{label}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div style={{ height: 6, borderRadius: 'var(--radius-full)', background: 'var(--control-track)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: 'var(--radius-full)', background: color,
          transition: `width var(--duration-base) var(--ease-standard)`,
        }} />
      </div>
    </div>
  );
}
