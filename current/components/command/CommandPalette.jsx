import React from 'react';
/* ICONOGRAPHY NOTE: this file inlines Lucide's exact SVG path data (verbatim,
   from the real library) because this project's in-browser compiler cannot
   resolve npm packages — `import { X } from 'lucide-react'` gets silently
   dropped. This is a STAND-IN, not the real dependency. In any real app
   consuming this design system: `npm install lucide-react` and replace the
   inline <svg> below with the matching <ChevronDown/>/<Search/>/<X/> import. */

export function CommandPalette({ open, query = '', onQueryChange, groups = [], activeId, onSelect, onClose, placeholder = 'Search commands…', footer }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300, background: 'var(--scrim)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '12vh',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 560, maxWidth: '90vw', background: 'var(--surface-overlay)', borderRadius: 'var(--radius-lg)',
        border: 'var(--border-width) solid var(--border-strong)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderBottom: 'var(--border-width) solid var(--border-subtle)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input autoFocus value={query} placeholder={placeholder} onChange={(e) => onQueryChange && onQueryChange(e.target.value)} style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            color: 'var(--text-primary)', fontSize: 'var(--text-md)', fontFamily: 'var(--font-body)',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', border: 'var(--border-width) solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '2px 6px' }}>ESC</span>
        </div>
        <div style={{ maxHeight: 340, overflowY: 'auto', padding: 6 }}>
          {groups.length === 0 && (
            <div style={{ padding: '28px 12px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>No matches</div>
          )}
          {groups.map((group, gi) => (
            <div key={group.label || gi} style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 4 }}>
              {group.label && <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--text-tertiary)', padding: '8px 10px 5px',
              }}>{group.label}</span>}
              {(group.items || []).map((item) => {
                const active = item.id === activeId;
                return (
                  <button key={item.id} type="button" onMouseDown={() => onSelect && onSelect(item.id)} data-ds-hover="" data-ds-focus="" style={{
                    '--_bg-hover': active ? 'var(--primary-muted-bg)' : 'var(--surface-hover)',
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px',
                    border: 'none', borderRadius: 'var(--radius-sm)', textAlign: 'left', cursor: 'pointer',
                    background: active ? 'var(--primary-muted-bg)' : 'transparent',
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
                  }}>
                    {item.icon && <span style={{ display: 'flex', flexShrink: 0, color: active ? 'var(--primary-400)' : 'var(--text-tertiary)' }}>{item.icon}</span>}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{item.hint}</span>}
                    {item.shortcut && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{item.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {footer && (
          <div style={{ padding: '8px 14px', borderTop: 'var(--border-width) solid var(--border-subtle)', display: 'flex', gap: 14, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
