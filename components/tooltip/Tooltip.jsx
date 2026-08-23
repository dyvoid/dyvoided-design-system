import React from 'react';

export function Tooltip({ children, label, side = 'top' }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }[side];
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open && (
        <span style={{
          position: 'absolute', ...pos, whiteSpace: 'nowrap', zIndex: 10,
          background: 'var(--gray-950)', color: 'var(--gray-50)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 500,
          padding: '5px 9px', borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-md)',
        }}>{label}</span>
      )}
    </span>
  );
}
