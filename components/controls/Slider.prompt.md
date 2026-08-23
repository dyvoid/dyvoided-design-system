Continuous value control for numeric parameters (volume, opacity, zoom). The filled track shows progress toward max. A 20-step tick rail auto-renders below the track via `::after` (no markup required); an explicit `.ds-slider-ticks` element overrides the auto-render if present. Track uses `--inset-rail` for a recessed appearance; fill gets a self-edge so the active portion reads as a lit segment.

```jsx
<Slider label="Opacity" value={opacity} min={0} max={100} onChange={setOpacity} valueLabel={`${opacity}%`} />
```

Use `accent="secondary"` sparingly to mark a parameter as "live"/recording.
