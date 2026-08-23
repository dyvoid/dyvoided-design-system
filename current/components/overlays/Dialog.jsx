import React from 'react';

export function Dialog({ open, title, children, onClose, footer }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--scrim)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 420, background: 'var(--surface-overlay)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)',
        fontFamily: 'var(--font-body)', overflow: 'hidden',
      }}>
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>{title}</span>
        </div>
        <div style={{ padding: 'var(--space-6)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)' }}>{children}</div>
        {footer && <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}
