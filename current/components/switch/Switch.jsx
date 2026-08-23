import React from 'react';

export function Switch({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)' }}>
      <input
        type="checkbox" role="switch" data-ds-peer="" checked={!!checked} disabled={disabled}
        onChange={() => onChange && onChange(!checked)}
      />
      <span data-ds-peer-target="" style={{
        width: 30, height: 17, boxSizing: 'border-box', borderRadius: 'var(--radius-xs)', position: 'relative', flexShrink: 0,
        background: checked ? 'var(--primary-muted-bg)' : 'var(--control-track)',
        border: `1px solid ${checked ? 'var(--primary)' : 'var(--border-strong)'}`,
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard)',
      }}>
        <span style={{
          position: 'absolute', top: 1, left: checked ? 15 : 1,
          width: 13, height: 13, borderRadius: 2,
          background: checked ? 'var(--primary-500)' : 'var(--gray-500)',
          transition: 'left var(--duration-base) var(--ease-spring), background var(--duration-base)',
        }} />
      </span>
      {label && <span style={{ fontSize: 'var(--font-size-base)', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
