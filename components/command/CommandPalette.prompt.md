Keyboard-first access to every command and destination in the app (⌘K). One per app, always at 12vh from the top so it lands in the same place on any screen size.

Results are grouped with uppercase mono labels; the highlighted row is tinted `--primary-muted-bg` — arrow keys move it, they never scroll a selection box. Shortcuts and `hint` (file path, section) both render in the trailing slot. You own filtering and key handling; the component only renders and reports.

```jsx
<CommandPalette open={open} query={q} onQueryChange={setQ} activeId={cursor}
  onSelect={run} onClose={() => setOpen(false)}
  groups={[{ label: 'Commands', items: [{ id: 'render', label: 'Render project', shortcut: '⌘⏎' }] }]} />
```
