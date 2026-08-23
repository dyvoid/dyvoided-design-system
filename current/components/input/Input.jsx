import React from 'react';

export function Input({ label, placeholder, value, onChange, error, iconLeft, disabled, type = 'text' }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 'var(--control-height-md)', padding: '0 12px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-sunken)',
        border: `1px solid ${error ? 'var(--danger-500)' : (focused ? 'var(--primary)' : 'var(--border-subtle)')}`,
        boxShadow: focused ? 'var(--focus-ring)' : 'none',
        transition: `border-color var(--duration-fast) var(--ease-standard)`,
      }}>
        {iconLeft}
        <input
          type={type} value={value} placeholder={placeholder} disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)', fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)' }}
        />
      </div>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-500)' }}>{error}</span>}
    </label>
  );
}
