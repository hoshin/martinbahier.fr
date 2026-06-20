// Click handler for the "Print / Save as PDF" button on the CV pages.
// Wired via [data-print-cv] so any button on the page opts in by attribute.
// Kept as a static asset so it is covered by CSP `script-src 'self'`
// without needing inline-script hashes or 'unsafe-inline'.
(function () {
  var buttons = document.querySelectorAll('[data-print-cv]');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      window.print();
    });
  }
})();
