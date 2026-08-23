Custom-branded window frame for Electron apps — replaces OS chrome with our own titlebar so the app looks the same on mac and Windows. The mac traffic lights use our palette (danger/amber/success) instead of red/yellow/green.

```jsx
<WindowChrome title="Oscilla" platform="mac"><App/></WindowChrome>
```

Wire the titlebar's `WebkitAppRegion: drag` region to your Electron `frame: false` window for real dragging; the traffic-light dots are decorative here — bind them to actual close/minimize/maximize IPC calls in the app.
