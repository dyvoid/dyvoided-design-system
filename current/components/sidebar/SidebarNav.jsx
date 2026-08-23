import React from 'react';

export function SidebarNav({ sections = [], activeId, onChange, width = 220, collapsed = false }) {
  return (
    <nav style={{
      width: collapsed ? 56 : width, flexShrink: 0, height: '100%', boxSizing: 'border-box',
      padding: 'var(--space-3) var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      background: 'var(--surface-panel)', borderRight: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-body)', overflowY: 'auto',
    }}>
      {sections.map((section, si) => (
        <div key={section.label || si} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.label && !collapsed && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wide, 0.08em)', color: 'var(--text-tertiary)',
              padding: '4px 10px 6px',
            }}>{section.label}</span>
          )}
          {(section.items || []).map((item) => {
            const active = item.id === activeId;
            return (
              <button key={item.id} type="button" onClick={() => onChange && onChange(item.id)} title={collapsed ? item.label : undefined} data-ds-hover="" data-ds-focus="" style={{
                '--_bg-hover': active ? 'var(--surface-active)' : 'var(--surface-hover)',
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '9px 0' : '8px 10px', justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
                background: active ? 'var(--surface-active)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 'var(--text-base)', fontWeight: active ? 600 : 500, fontFamily: 'var(--font-body)',
                transition: 'background var(--duration-fast) var(--ease-standard)',
              }}>
                {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, borderRadius: 1, background: 'var(--primary)' }} />}
                {item.icon && <span style={{ display: 'flex', color: active ? 'var(--primary-400)' : 'var(--text-tertiary)', flexShrink: 0 }}>{item.icon}</span>}
                {!collapsed && <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>}
                {!collapsed && item.meta != null && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{item.meta}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
