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
        background: 'var(--control-track)',
        border: `1px solid ${checked ? 'var(--primary)' : 'var(--border-strong)'}`,
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--duration-base) var(--ease-standard)',
      }}>
        <span style={{
          position: 'absolute', top: 1, left: checked ? 15 : 1,
          width: 13, height: 13, borderRadius: 2,
          background: checked ? 'linear-gradient(180deg,var(--primary-400) 0%,var(--primary-600) 100%)' : 'var(--gray-500)',
          boxShadow: checked ? 'inset 0 1px 0 oklch(100% 0 0 / .3), 0 0 4px 0 var(--primary-muted-bg)' : 'none',
          transition: 'left var(--duration-base) var(--ease-spring), background var(--duration-base)',
        }}>
          <span style={{ position: 'absolute', left: '50%', top: 3, bottom: 3, width: 1, transform: 'translateX(-50%)', background: 'oklch(0% 0 0 / 0.28)' }} />
        </span>
      </span>
      {label && <span style={{ fontSize: 'var(--font-size-base)', color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
