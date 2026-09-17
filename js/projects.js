/* Case-study deep links and user-initiated email copying. */
(() => {
  document.querySelectorAll('.copy-email').forEach(button => {
    const status = button.parentElement.querySelector('.copy-status');
    let reset;
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      button.disabled = true;
      clearTimeout(reset);
      const email = button.dataset.email;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch (_) { /* Local files or permission settings may require a fallback. */ }
      if (!copied) {
        const field = document.createElement('textarea');
        field.value = email;
        field.className = 'copy-fallback';
        field.readOnly = true;
        document.body.appendChild(field);
        field.focus({ preventScroll: true });
        field.select();
        try { copied = document.execCommand('copy'); } catch (_) {}
        field.remove();
        button.focus({ preventScroll: true });
      }
      button.disabled = false;
      button.textContent = copied ? 'Copied ✓' : 'Copy email ⧉';
      status.textContent = copied ? 'Email address copied.' : `Please copy manually: ${email}`;
      reset = setTimeout(() => { button.textContent = 'Copy email ⧉'; status.textContent = ''; }, copied ? 3500 : 12000);
    });
  });
})();
