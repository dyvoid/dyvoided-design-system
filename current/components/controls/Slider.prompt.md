Continuous value control for numeric parameters (volume, opacity, zoom). The filled track shows progress toward max.

```jsx
<Slider label="Cutoff" value={freq} min={20} max={20000} onChange={setFreq} valueLabel={`${freq} Hz`} />
```

Use `accent="secondary"` sparingly to mark a parameter as "live"/recording.
