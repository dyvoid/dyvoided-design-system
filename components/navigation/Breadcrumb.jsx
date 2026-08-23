import React from 'react';

export function Breadcrumb({ items }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)' }}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {item.onClick && !last ? (
              <button onClick={item.onClick} data-ds-focus="" style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-tertiary)',
                transition: `color var(--duration-fast) var(--ease-standard)`,
              }}>{item.label}</button>
            ) : (
              <span style={{ color: last ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: last ? 600 : 400 }}>{item.label}</span>
            )}
            {!last && <span style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
