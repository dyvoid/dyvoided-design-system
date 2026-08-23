// ================================================================
// EVAL ONLY — dyvoided eval synchronization helper.
// NOT part of the dyvoided design system. Remove this <script> tag
// when copying a template or specimen into your own project.
// ================================================================
// Reads theme + density + presence + identity seeds from URL query
// params so iframed specimens can be driven from the parent eval page
// (index.html) on file://, where cross-origin DOM access is blocked.
// Also listens for live postMessage state from the parent so the
// procedural rebrand and toggles update without an iframe reload.
(function () {
  function parseSeed(str) {
    if (!str) return null;
    var parts = String(str).split(',');
    if (parts.length === 3) return 'oklch(' + (+parts[0]) + '% ' + (+parts[1]) + ' ' + (+parts[2]) + ')';
    return str;
  }

  function applyState(s) {
    var d = document.documentElement.style;
    if (s.theme) document.body.setAttribute('data-theme', s.theme);
    if (s.density) {
      if (s.density === 'compact') document.documentElement.setAttribute('data-density', 'compact');
      else document.documentElement.removeAttribute('data-density');
    }
    if (s.presence) d.setProperty('--presence', s.presence);
    if (s.seeds) {
      if (s.seeds.primary)  d.setProperty('--primary-seed',  s.seeds.primary);
      if (s.seeds.accent1)  d.setProperty('--accent-1-seed', s.seeds.accent1);
      if (s.seeds.accent2)  d.setProperty('--accent-2-seed', s.seeds.accent2);
      if (s.seeds.accent3)  d.setProperty('--accent-3-seed', s.seeds.accent3);
    }
  }

  // Initial state from query params (covers direct opens + new tabs).
  var params = new URLSearchParams(location.search);
  var seeds = {};
  var p = parseSeed(params.get('primary'));  if (p) seeds.primary = p;
  var a1 = parseSeed(params.get('accent1')); if (a1) seeds.accent1 = a1;
  var a2 = parseSeed(params.get('accent2')); if (a2) seeds.accent2 = a2;
  var a3 = parseSeed(params.get('accent3')); if (a3) seeds.accent3 = a3;
  applyState({
    theme: params.get('theme'),
    density: params.get('density'),
    presence: params.get('presence'),
    seeds: Object.keys(seeds).length ? seeds : null
  });

  // Live updates from the parent eval page.
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'ds-state') applyState(e.data);
  });

  // Tell the parent we're ready so it can push the current state to
  // iframes that load after a rebrand has already happened.
  try { window.parent.postMessage({ type: 'ds-ready' }, '*'); } catch (_) {}
})();
