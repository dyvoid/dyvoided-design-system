import React from 'react';

export function Tabs({ items, activeId, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)' }}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button key={item.id} onClick={() => onChange && onChange(item.id)} data-ds-focus="" style={{
            background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
            padding: '8px 4px', marginBottom: -1,
            fontSize: 'var(--text-sm)', fontWeight: active ? 600 : 500,
            color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: `color var(--duration-fast) var(--ease-standard)`,
          }}>
            {item.label}
            {active && <span style={{
              position: 'absolute', left: 4, right: 4, bottom: -1, height: 2, borderRadius: 1,
              background: 'var(--primary)',
            }} />}
          </button>
        );
      })}
    </div>
  );
}
