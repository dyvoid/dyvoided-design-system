Top-level view switcher for an app shell — the vertical counterpart to Tabs. Use Tabs inside one view, SidebarNav across views.

Section labels are uppercase mono microlabels. The active row is a filled `--surface-active` pill plus a 2px `--primary` edge marker; `meta` renders as a mono count on the right. `collapsed` drops to a 56px icon rail with tooltip-by-title.

```jsx
<SidebarNav activeId={view} onChange={setView} sections={[
  { label: 'Workspace', items: [{ id: 'projects', label: 'Projects', meta: 12 }, { id: 'library', label: 'Library' }] },
  { label: 'System', items: [{ id: 'settings', label: 'Settings' }] },
]} />
```
