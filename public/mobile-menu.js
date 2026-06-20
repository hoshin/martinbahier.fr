// Toggle handler for the small-viewport navigation menu.
// Kept as a static asset so it is covered by CSP `script-src 'self'`
// without needing inline-script hashes or 'unsafe-inline'.
(function () {
  var btn = document.getElementById('mobile-menu-button');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('hidden');
  });
})();
