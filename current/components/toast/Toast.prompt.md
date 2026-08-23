Transient result of an action the user already initiated — "Render complete", "Project saved". Never for validation errors (those belong beside the field) and never for anything the user must act on.

State is carried by a single tinted dot, not a colored panel or an icon — the surface stays neutral `--surface-overlay` so a stack of toasts reads as one quiet column. Keep the title to a few literal words; the body line is optional.

```jsx
<ToastStack>
  <Toast variant="success" title="Render complete" onClose={dismiss}>Bounced 2 stems to /exports.</Toast>
</ToastStack>
```
