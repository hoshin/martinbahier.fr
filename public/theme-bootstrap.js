// Applies the persisted (or system-preferred) color theme before first paint
// to avoid a flash of unstyled content. Kept as a static asset so it loads
// under script-src 'self' with no hash maintenance.
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
