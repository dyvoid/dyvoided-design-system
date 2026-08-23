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
        width: 15, height: 15, boxSizing: 'border-box', borderRadius: 'var(--radius-xs)', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: on ? 'var(--primary)' : 'var(--control-track)',
        border: `var(--border-width) solid ${on ? 'var(--primary)' : 'var(--border-strong)'}`,
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)',
      }}>
        {on && <span style={{
          width: 7, height: indeterminate && !checked ? 2 : 7,
          borderRadius: indeterminate && !checked ? 1 : 2,
          background: 'var(--text-on-accent)',
        }} />}
      </span>
      {label && <span style={{ fontSize: 'var(--font-size-base)', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
