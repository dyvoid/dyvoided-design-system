import React from 'react';

export function Spinner({ size = 18 }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      border: '2px solid var(--border-strong)', borderTopColor: 'var(--primary)',
      animation: 'ds-spin 0.7s linear infinite',
    }} />
  );
}
