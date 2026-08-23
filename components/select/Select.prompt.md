Single-choice picker for a known, short list — output format, device, sample rate. Longer or searchable lists belong in CommandPalette.

Matches Input's field metrics exactly (`--control-height-md`, sunken fill, hairline border) so a form of mixed fields lines up. Popover uses `--surface-overlay` + `--shadow-md`; the selected row is tinted `--primary-muted-bg`, never checkmarked. `hint` renders in mono on the right for units or values.

```jsx
<Select label="Sample rate" value={rate} onChange={setRate}
  options={[{value:'44',label:'44.1 kHz'},{value:'48',label:'48 kHz',hint:'default'}]} />
```
