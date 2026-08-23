Blocking overlay for confirmations and short focused tasks. Click the scrim or call `onClose` to dismiss.

```jsx
<Dialog open={open} title="Delete project?" onClose={close} footer={<>
  <Button variant="ghost" onClick={close}>Cancel</Button>
  <Button variant="danger" onClick={confirm}>Delete</Button>
</>}>This can't be undone.</Dialog>
```
