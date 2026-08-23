Dense tabular data — dashboards, file lists, log views. Numeric columns should set `numeric: true` to render in mono with tabular figures.

```jsx
<DataTable
  columns={[{ key: 'name', label: 'Name' }, { key: 'size', label: 'Size', numeric: true, align: 'right' }]}
  rows={[{ name: 'mix-v3.wav', size: '84 MB' }]}
  rowKey="name"
/>
```
