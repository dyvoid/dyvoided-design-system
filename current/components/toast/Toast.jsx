import React from 'react';
/* ICONOGRAPHY NOTE: this file inlines Lucide's exact SVG path data (verbatim,
   from the real library) because this project's in-browser compiler cannot
   resolve npm packages — `import { X } from 'lucide-react'` gets silently
   dropped. This is a STAND-IN, not the real dependency. In any real app
   consuming this design system: `npm install lucide-react` and replace the
   inline <svg> below with the matching <ChevronDown/>/<Search/>/<X/> import. */

const TONE = {
  info: 'var(--primary)',
  success: 'var(--success-500)',
  warning: 'var(--warning-500)',
  danger: 'var(--danger-500)',
};

export function Toast({ variant = 'info', title, children, action, onClose }) {
  const tone = TONE[variant] || TONE.info;
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, width: 340, padding: '12px 12px 12px 14px',
      background: 'var(--surface-overlay)', borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 'var(--radius-full)', background: tone, marginTop: 6, flexShrink: 0, boxShadow: `0 0 6px 0 ${tone}` }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {title && <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>}
        {children && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)' }}>{children}</span>}
        {action && <span style={{ marginTop: 5 }}>{action}</span>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" data-ds-hover="" data-ds-focus="" style={{
          '--_bg-hover': 'var(--surface-hover)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 0, borderRadius: 'var(--radius-xs)', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </div>
  );
}

export function ToastStack({ children, placement = 'bottom-right' }) {
  const [v, h] = placement.split('-');
  return (
    <div style={{
      position: 'fixed', zIndex: 200, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
      alignItems: h === 'left' ? 'flex-start' : 'flex-end',
      [v]: 'var(--space-5)', [h]: 'var(--space-5)',
    }}>{children}</div>
  );
}
