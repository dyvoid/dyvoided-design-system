import React from 'react';

const sizes = {
  sm: { height: 'var(--control-height-sm)', padding: '0 12px', font: 'var(--font-size-sm)' },
  md: { height: 'var(--control-height-md)', padding: '0 16px', font: 'var(--font-size-base)' },
  lg: { height: 'var(--control-height-lg)', padding: '0 20px', font: 'var(--font-size-md)' },
};

const variants = {
  primary: { bg: 'linear-gradient(180deg,var(--primary-500) 0%,var(--primary-700) 100%)', color: 'var(--text-on-accent)', border: 'color-mix(in srgb, var(--primary-700) 55%, transparent)', hoverBg: 'linear-gradient(180deg,var(--primary-300) 0%,var(--primary-500) 100%)' },
  secondary: { bg: 'var(--surface-raised)', color: 'var(--text-primary)', border: 'var(--border-strong)', hoverBg: 'var(--surface-hover)' },
  ghost: { bg: 'transparent', color: 'var(--text-secondary)', border: 'transparent', hoverBg: 'var(--surface-hover)' },
  danger: { bg: 'linear-gradient(180deg,var(--danger-400) 0%,var(--danger-500) 100%)', color: 'var(--text-on-accent)', border: 'color-mix(in srgb, var(--danger-500) 60%, black)', hoverBg: 'linear-gradient(180deg,var(--danger-400) 0%,var(--danger-400) 100%)' },
};

export function Button({ children, variant = 'primary', size = 'md', disabled = false, iconLeft, iconRight, onClick, style }) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const isPrimary = variant === 'primary' && !disabled;
  const isBeveled = (variant === 'primary' || variant === 'danger') && !disabled;
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
        fontFamily: 'var(--font-body)', fontWeight: 600,
        borderRadius: isBeveled ? 'var(--radius-xs)' : 'var(--radius-sm)', border: `1px solid ${v.border}`,
        background: disabled ? 'var(--surface-raised)' : v.bg,
        color: disabled ? 'var(--text-disabled)' : v.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
        textShadow: isBeveled ? '0 1px 1px oklch(0% 0 0 / .25)' : 'none',
        boxShadow: isBeveled
          ? `inset 0 1px 0 oklch(100% 0 0 / .3), inset 0 -1px 1px oklch(0% 0 0 / .2), 0 2px 10px -2px ${isPrimary ? 'var(--primary-muted-bg)' : 'var(--danger-muted-bg)'}, var(--shadow-sm)`
          : 'none',
        '--_bg-hover': v.hoverBg,
        '--_shadow-press': isBeveled ? 'inset 0 1px 2px oklch(0% 0 0 / .3)' : 'none',
        ...style,
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
