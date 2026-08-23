Single-choice picker for a known, short list — output format, theme, density. Longer or searchable lists belong in CommandPalette.

Matches Input's field metrics exactly (`--control-height-md`, sunken fill, hairline border) so a form of mixed fields lines up. Popover uses `--surface-overlay` + `--shadow-md`; the selected row is tinted `--primary-muted-bg`, never checkmarked. `hint` renders in mono on the right for units or values.

```jsx
<Select label="Density" value={density} onChange={setDensity}
  options={[{value:'compact',label:'Compact'},{value:'spacious',label:'Spacious',hint:'default'}]} />
```
