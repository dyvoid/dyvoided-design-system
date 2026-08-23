ProgressBar for determinate operations (render, upload, export) with a known percent; Spinner for indeterminate waits. Spinner needs `@keyframes ds-spin` — already loaded globally by `styles.css`.

```jsx
<ProgressBar value={64} label="Rendering" />
<Spinner />
```
