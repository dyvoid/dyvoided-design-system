import React from 'react';

export function Checkbox({ checked, onChange, label, disabled, indeterminate }) {
  const on = checked || indeterminate;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)' }}>
      <input
        type="checkbox" data-ds-peer="" checked={!!checked} disabled={disabled}
        aria-checked={indeterminate && !checked ? 'mixed' : !!checked}
        onChange={() => onChange && onChange(!checked)}
      />
      <span data-ds-peer-target="" style={{
        width: 16, height: 16, boxSizing: 'border-box', borderRadius: 'var(--radius-xs)', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--control-track)',
        border: `1px solid ${on ? 'var(--primary)' : 'var(--border-strong)'}`,
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--duration-fast) var(--ease-standard)',
      }}>
        {on && <span style={{
          width: 12, height: 12, borderRadius: 3,
          background: 'linear-gradient(180deg,var(--primary-400) 0%,var(--primary-600) 100%)',
          boxShadow: 'inset 0 1px 0 oklch(100% 0 0 / .3), 0 0 4px 0 var(--primary-muted-bg)',
        }} />}
      </span>
      {label && <span style={{ fontSize: 'var(--font-size-base)', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
