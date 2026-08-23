import React from 'react';

export function Panel({ children, title, actions, padding = 'md' }) {
  const pad = { sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' }[padding] || 'var(--space-6)';
  return (
    <div style={{
      background: 'var(--surface-panel)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-body)',
    }}>
      {(title || actions) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `var(--space-4) ${pad}`, borderBottom: '1px solid var(--border-subtle)',
        }}>
          {title && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>{title}</span>}
          {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}
