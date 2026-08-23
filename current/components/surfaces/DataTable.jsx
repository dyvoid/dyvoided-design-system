import React from 'react';

export function DataTable({ columns, rows, rowKey }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{
                textAlign: col.align || 'left', padding: 'var(--space-3) var(--space-4)',
                background: 'var(--surface-sunken)', borderBottom: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase', color: 'var(--text-tertiary)', width: col.width,
              }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey ? row[rowKey] : i} data-ds-focus="" style={{ transition: `background var(--duration-fast) var(--ease-standard)` }}>
              {columns.map((col) => (
                <td key={col.key} style={{
                  textAlign: col.align || 'left', padding: 'var(--space-3) var(--space-4)',
                  borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: 'var(--font-size-base)', color: 'var(--text-primary)',
                  fontFamily: col.numeric ? 'var(--font-mono)' : 'var(--font-body)',
                  fontWeight: col.numeric ? 500 : undefined,
                  fontFeatureSettings: col.numeric ? 'var(--tnum)' : undefined,
                  letterSpacing: col.numeric ? '-0.01em' : undefined,
                }}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
