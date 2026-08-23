import React from 'react';

export function Slider({ value = 50, min = 0, max = 100, onChange, label, valueLabel, accent = 'primary' }) {
  const pct = ((value - min) / (max - min)) * 100;
  const color = accent === 'secondary' ? 'var(--accent-1-500)' : 'var(--primary)';
  const muted = accent === 'secondary' ? 'var(--accent-1-muted-bg)' : 'var(--primary-muted-bg)';
  return (
    <div style={{ fontFamily: 'var(--font-body)', width: '100%' }}>
      {(label || valueLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>}
          {valueLabel !== undefined && <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{valueLabel}</span>}
        </div>
      )}
      <div data-ds-track="" style={{ height: 4, borderRadius: 2, background: 'var(--control-track)', position: 'relative' }}>
        <div style={{ height: 4, borderRadius: 2, position: 'absolute', left: 0, top: 0, width: `${pct}%`, background: color }} />
        <div style={{ position: 'absolute', top: -5, left: `calc(${pct}% - 7px)`, width: 14, height: 14, boxSizing: 'border-box', borderRadius: '50%', background: 'linear-gradient(180deg,oklch(100% 0 0),oklch(95.5% 0.002 260))', boxShadow: `inset 0 1px 1px oklch(100% 0 0 / .8), 0 0 0 4px ${muted}, var(--shadow-md)`, border: `3px solid ${color}` }} />
        <input
          type="range" min={min} max={max} value={value}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: '-8px 0', width: '100%', height: 20, opacity: 0, cursor: 'pointer', margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, padding: '0 1px' }}>
        {Array.from({ length: 20 }).map((_, i) => <span key={i} style={{ width: 1, height: 5, background: 'var(--gray-500)', opacity: 0.85 }} />)}
      </div>
    </div>
  );
}
