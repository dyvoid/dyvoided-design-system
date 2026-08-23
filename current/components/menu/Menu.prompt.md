Actions on a specific object — right-click a track, a file row, an avatar. It renders the surface only; position it yourself (absolute inside a relative anchor) so it can serve as dropdown, context menu, or overflow menu.

Shortcuts are mono and right-aligned. `separator` groups; `header` adds an uppercase mono microlabel; destructive entries take `danger` and are always last in their group.

```jsx
<Menu onSelect={run} items={[
  { id: 'rename', label: 'Rename', shortcut: '⌘R' },
  { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D' },
  { separator: true },
  { id: 'delete', label: 'Delete', danger: true },
]} />
```
