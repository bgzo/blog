(function () {
  var COPY_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

  var CHECK_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function getCodeText(highlight) {
    var codeEl = highlight.querySelector('code');
    return codeEl ? codeEl.innerText : (highlight.querySelector('pre') || highlight).innerText;
  }

  function copyToClipboard(text, btn) {
    var spanEl = btn.querySelector('span');

    function onSuccess() {
      btn.innerHTML = CHECK_SVG + '<span>Copied!</span>';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.innerHTML = COPY_SVG + '<span>Copy</span>';
        btn.classList.remove('copied');
      }, 2000);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
        fallbackCopy(text, onSuccess);
      });
    } else {
      fallbackCopy(text, onSuccess);
    }
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) {}
    document.body.removeChild(ta);
  }

  function init() {
    document.querySelectorAll('div.highlighter-rouge').forEach(function (wrapper) {
      var highlight = wrapper.querySelector('div.highlight');
      if (!highlight) return;

      // Detect language from class like "language-python"
      var langClass = Array.prototype.find.call(wrapper.classList, function (c) {
        return c.startsWith('language-');
      });
      var lang = langClass ? langClass.replace('language-', '') : '';

      // Build header bar
      var header = document.createElement('div');
      header.className = 'code-header';

      var langLabel = document.createElement('span');
      langLabel.className = 'code-lang';
      langLabel.textContent = lang || '';
      header.appendChild(langLabel);

      var copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      copyBtn.innerHTML = COPY_SVG + '<span>Copy</span>';
      copyBtn.addEventListener('click', function () {
        copyToClipboard(getCodeText(highlight), copyBtn);
      });
      header.appendChild(copyBtn);

      highlight.insertBefore(header, highlight.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
