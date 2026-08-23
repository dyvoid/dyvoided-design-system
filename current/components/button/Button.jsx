import React from 'react';

const sizes = {
  sm: { height: 'var(--control-height-sm)', padding: '0 12px', font: 'var(--font-size-sm)' },
  md: { height: 'var(--control-height-md)', padding: '0 16px', font: 'var(--font-size-base)' },
  lg: { height: 'var(--control-height-lg)', padding: '0 20px', font: 'var(--font-size-md)' },
};

const variants = {
  primary: { bg: 'var(--primary-500)', color: 'var(--text-on-accent)', border: 'transparent', hoverBg: 'var(--primary-400)' },
  secondary: { bg: 'var(--surface-raised)', color: 'var(--text-primary)', border: 'var(--border-strong)', hoverBg: 'var(--surface-hover)' },
  ghost: { bg: 'transparent', color: 'var(--text-secondary)', border: 'transparent', hoverBg: 'var(--surface-hover)' },
  danger: { bg: 'var(--danger-500)', color: 'var(--text-on-accent)', border: 'transparent', hoverBg: 'var(--danger-400)' },
};

export function Button({ children, variant = 'primary', size = 'md', disabled = false, iconLeft, iconRight, onClick, style }) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-ds-hover={disabled ? undefined : ''}
      data-ds-press={disabled ? undefined : ''}
      data-ds-focus=""
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        height: s.height, padding: s.padding, fontSize: s.font,
        fontFamily: 'var(--font-body)', fontWeight: 500,
        borderRadius: 'var(--radius-sm)', border: `var(--border-width) solid ${disabled ? 'var(--border-subtle)' : v.border}`,
        background: disabled ? 'var(--surface-raised)' : v.bg,
        color: disabled ? 'var(--text-disabled)' : v.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
        '--_bg-hover': v.hoverBg,
        ...style,
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
