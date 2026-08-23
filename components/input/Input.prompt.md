Single-line text field. Sunken background reads as "input" against panel surfaces without needing a heavy border.

```jsx
<Input label="Project name" value={name} onChange={setName} placeholder="Untitled" />
```

Pass `error` to switch the border to danger and show a message below.
