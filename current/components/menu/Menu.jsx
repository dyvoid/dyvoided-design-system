import React from 'react';

export function Menu({ items = [], onSelect, width = 220 }) {
  return (
    <div role="menu" style={{
      width, padding: 4, background: 'var(--surface-overlay)', borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 1,
    }}>
      {items.map((item, i) => {
        if (item.separator) return <span key={`sep${i}`} style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 6px' }} />;
        if (item.label && item.header) return (
          <span key={`hd${i}`} style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--text-tertiary)', padding: '6px 10px 4px',
          }}>{item.label}</span>
        );
        return (
          <button key={item.id || i} type="button" role="menuitem" disabled={item.disabled}
            onClick={() => !item.disabled && onSelect && onSelect(item.id)}
            data-ds-hover={item.disabled ? undefined : ''} data-ds-focus="" style={{
              '--_bg-hover': 'var(--surface-hover)',
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '7px 10px',
              border: 'none', borderRadius: 'var(--radius-xs)', background: 'transparent', textAlign: 'left',
              cursor: item.disabled ? 'default' : 'pointer',
              color: item.disabled ? 'var(--text-disabled)' : (item.danger ? 'var(--danger-400)' : 'var(--text-secondary)'),
              fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
            }}>
            {item.icon && <span style={{ display: 'flex', flexShrink: 0, color: 'currentColor', opacity: 0.8 }}>{item.icon}</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{item.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
}
