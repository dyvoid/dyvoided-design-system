import React from 'react';

export function EmptyState({ icon, title, description, action }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 'var(--space-3)', padding: 'var(--space-10) var(--space-6)', fontFamily: 'var(--font-body)',
    }}>
      {icon && (
        <div style={{
          width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--surface-raised)',
          border: 'var(--border-width) solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-tertiary)',
        }}>{icon}</div>
      )}
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)' }}>{title}</span>
      {description && <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-tertiary)', maxWidth: 320, lineHeight: 'var(--leading-body)' }}>{description}</span>}
      {action && <div style={{ marginTop: 'var(--space-2)' }}>{action}</div>}
    </div>
  );
}
