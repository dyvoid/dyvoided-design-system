import React from 'react';
/* ICONOGRAPHY NOTE: this file inlines Lucide's exact SVG path data (verbatim,
   from the real library) because this project's in-browser compiler cannot
   resolve npm packages — `import { X } from 'lucide-react'` gets silently
   dropped. This is a STAND-IN, not the real dependency. In any real app
   consuming this design system: `npm install lucide-react` and replace the
   inline <svg> below with the matching <ChevronDown/>/<Search/>/<X/> import. */

/* KEYBOARD CONTRACT: this is a combobox, so it owes the keyboard the behaviour a native <select>
   would have given for free. Focus stays on the trigger and aria-activedescendant names the
   highlighted option, which is why the options are <div role="option"> rather than buttons: making
   them tab stops means the tab count changes with the option count and Escape never reaches the
   trigger that owns the open state.
     closed   Enter / Space / ArrowDown open the list
     open     ArrowUp/Down move, Home/End jump, letters type-ahead, Enter commits,
              Escape closes and returns focus to the trigger, Tab closes and moves on */

export function Select({ label, options = [], value, onChange, placeholder = 'Select…', disabled, error }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const trigger = React.useRef(null);
  const typed = React.useRef({ text: '', at: 0 });
  const uid = React.useId().replace(/:/g, '');
  const listId = `${uid}-list`;
  const labelId = `${uid}-label`;

  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex];

  const openList = () => { setActive(selectedIndex); setOpen(true); };
  const close = (restoreFocus = true) => { setOpen(false); if (restoreFocus && trigger.current) trigger.current.focus(); };
  const commit = (index) => { const o = options[index]; if (o && onChange) onChange(o.value); close(); };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); openList(); }
      return;
    }
    switch (e.key) {
      case 'Escape': e.preventDefault(); close(); return;
      case 'Tab': setOpen(false); return;
      case 'ArrowDown': e.preventDefault(); setActive((i) => Math.min(options.length - 1, i + 1)); return;
      case 'ArrowUp': e.preventDefault(); setActive((i) => Math.max(0, i - 1)); return;
      case 'Home': e.preventDefault(); setActive(0); return;
      case 'End': e.preventDefault(); setActive(options.length - 1); return;
      case 'Enter': case ' ': e.preventDefault(); commit(active); return;
      default: break;
    }
    if (e.key.length === 1) {
      const now = Date.now();
      typed.current = { text: now - typed.current.at > 800 ? e.key : typed.current.text + e.key, at: now };
      const query = typed.current.text.toLowerCase();
      const match = options.findIndex((o) => String(o.label).toLowerCase().startsWith(query));
      if (match >= 0) setActive(match);
    }
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', position: 'relative' }}>
      {label && <span id={labelId} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>}
      <button
        type="button" ref={trigger} disabled={disabled} data-ds-focus=""
        role="combobox" aria-expanded={open} aria-controls={listId} aria-haspopup="listbox"
        aria-labelledby={label ? labelId : undefined} aria-label={label ? undefined : placeholder}
        aria-activedescendant={open ? `${listId}-option-${active}` : undefined}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={(e) => { if (ref.current && !ref.current.contains(e.relatedTarget)) setOpen(false); }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          height: 'var(--control-height-md)', padding: '0 10px 0 12px', width: '100%',
          borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)',
          border: `var(--border-width) solid ${error ? 'var(--danger-500)' : (open ? 'var(--primary)' : 'var(--border-subtle)')}`,
          boxShadow: open ? 'var(--focus-ring)' : 'none',
          color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
          fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
          cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
          transition: 'border-color var(--duration-fast) var(--ease-standard)',
        }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected ? selected.label : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-500)' }}>{error}</span>}
      {open && (
        <div
          id={listId} role="listbox" aria-labelledby={label ? labelId : undefined}
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 50,
            padding: 4, background: 'var(--surface-overlay)', borderRadius: 'var(--radius-md)',
            border: 'var(--border-width) solid var(--border-subtle)', boxShadow: 'var(--shadow-md)',
            maxHeight: 260, overflowY: 'auto',
          }}>
          {options.map((o, index) => {
            const chosen = o.value === value;
            const highlighted = index === active;
            return (
              <div
                key={o.value} id={`${listId}-option-${index}`} role="option" aria-selected={chosen}
                onMouseEnter={() => setActive(index)}
                /* mousedown, not click: the trigger's blur would otherwise close the list first. */
                onMouseDown={(e) => { e.preventDefault(); commit(index); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%',
                  padding: '7px 10px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', textAlign: 'left',
                  background: chosen ? 'var(--primary-muted-bg)' : (highlighted ? 'var(--surface-hover)' : 'transparent'),
                  boxShadow: highlighted ? 'inset 2px 0 0 var(--primary)' : 'none',
                  color: chosen || highlighted ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)',
                }}>
                <span>{o.label}</span>
                {o.hint && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{o.hint}</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
