import React from 'react';
/* ICONOGRAPHY NOTE: this file inlines Lucide's exact SVG path data (verbatim,
   from the real library) because this project's in-browser compiler cannot
   resolve npm packages — `import { X } from 'lucide-react'` gets silently
   dropped. This is a STAND-IN, not the real dependency. In any real app
   consuming this design system: `npm install lucide-react` and replace the
   inline <svg> below with the matching <ChevronDown/>/<Search/>/<X/> import. */

export function Select({ label, options = [], value, onChange, placeholder = 'Select…', disabled, error }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);
  const selected = options.find((o) => o.value === value);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', position: 'relative' }}>
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>}
      <button type="button" disabled={disabled} onClick={() => setOpen((o) => !o)} data-ds-focus="" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        height: 'var(--control-height-md)', padding: '0 10px 0 12px', width: '100%',
        borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)',
        border: `var(--border-width) solid ${error ? 'var(--danger-500)' : (open ? 'var(--primary)' : 'var(--border-subtle)')}`,
        boxShadow: open ? 'var(--focus-ring)' : 'none',
        color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
        fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--duration-fast) var(--ease-standard)',
      }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected ? selected.label : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-500)' }}>{error}</span>}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 50,
          padding: 4, background: 'var(--surface-overlay)', borderRadius: 'var(--radius-md)',
          border: 'var(--border-width) solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
          maxHeight: 260, overflowY: 'auto',
        }}>
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button key={o.value} type="button" onClick={() => { onChange && onChange(o.value); setOpen(false); }} data-ds-hover="" data-ds-focus="" style={{
                '--_bg-hover': active ? 'var(--primary-muted-bg)' : 'var(--surface-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%',
                padding: '7px 10px', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer', textAlign: 'left',
                background: active ? 'var(--primary-muted-bg)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
              }}>
                <span>{o.label}</span>
                {o.hint && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{o.hint}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
