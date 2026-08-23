import React from 'react';

export function WindowChrome({ title, children, active = true, platform = 'mac' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: 'var(--surface-app)', borderRadius: platform === 'mac' ? 10 : 0,
      overflow: 'hidden', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{
        height: 40, flexShrink: 0, display: 'flex', alignItems: 'center',
        padding: '0 14px', background: 'var(--surface-panel)',
        borderBottom: '1px solid var(--border-subtle)', WebkitAppRegion: 'drag',
        justifyContent: platform === 'mac' ? 'flex-start' : 'space-between',
      }}>
        {platform === 'mac' ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: active ? 'var(--danger-500)' : 'var(--gray-700)' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: active ? 'var(--accent-1-500)' : 'var(--gray-700)' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: active ? 'var(--success-500)' : 'var(--gray-700)' }} />
          </div>
        ) : <span />}
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: 'var(--tracking-wide)',
          color: 'var(--text-tertiary)', textTransform: 'uppercase',
          position: platform === 'mac' ? 'absolute' : 'static', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none',
        }}>{title}</span>
        {platform !== 'mac' && (
          <div style={{ display: 'flex', gap: 18, color: 'var(--text-tertiary)', fontSize: 13 }}>
            <span>—</span><span>▢</span><span>✕</span>
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</div>
    </div>
  );
}
