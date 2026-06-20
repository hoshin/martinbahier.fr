// Toggle handler for the header's light/dark theme switcher.
// Kept as a static asset so it is covered by CSP `script-src 'self'`
// without needing inline-script hashes or 'unsafe-inline'.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
  });
})();
