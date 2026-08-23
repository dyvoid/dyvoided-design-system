// ================================================================
// EVAL ONLY — dyvoided eval synchronization helper.
// NOT part of the dyvoided design system. Remove this <script> tag
// when copying a template or specimen into your own project.
// ================================================================
// Reads theme + density + presence from URL query params so iframed
// specimens can be driven from the parent eval page (index.html) on
// file://, where cross-origin DOM access is blocked.
(function() {
  var params = new URLSearchParams(location.search);
  var theme = params.get('theme');
  var density = params.get('density');
  var presence = params.get('presence');
  if (theme) document.body.setAttribute('data-theme', theme);
  if (density) document.documentElement.setAttribute('data-density', density);
  if (presence) document.documentElement.style.setProperty('--presence', presence);
})();
