/* Shared accessible, in-page case study and document viewer. No network dependency. */
(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'portfolio-viewer';
  dialog.setAttribute('aria-labelledby', 'viewer-title');
  dialog.innerHTML = `<header class="viewer-header"><div><p class="viewer-label"></p><h2 id="viewer-title"></h2></div><button class="viewer-close" type="button" aria-label="Close preview" autofocus>Close <span aria-hidden="true">×</span></button></header><div class="viewer-tools" hidden><span class="viewer-page-count"></span><button type="button" class="viewer-zoom" aria-pressed="false">Zoom in</button><a class="viewer-download" download>Download original ↓</a></div><div class="viewer-body" tabindex="0"></div>`;
  document.body.append(dialog);
  const body = dialog.querySelector('.viewer-body');
  const toolbar = dialog.querySelector('.viewer-tools');
  const zoom = dialog.querySelector('.viewer-zoom');
  let origin, savedY = 0, closing = false, closeTimer;
  function finishClose() {
    clearTimeout(closeTimer);
    dialog.close();
    dialog.classList.remove('is-closing');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.documentElement.classList.remove('viewer-open');
    window.scrollTo({top: savedY, behavior: 'instant'});
    origin?.focus({preventScroll:true});
    body.replaceChildren();
    closing = false;
  }
  function close() {
    if (closing || !dialog.open) return;
    closing = true;
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(finishClose, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170);
  }
  function open(trigger, label, title, documents = false) {
    if (dialog.open) return false;
    origin = trigger;
    savedY = window.scrollY;
    body.replaceChildren();
    body.classList.remove('is-zoomed');
    zoom.textContent = 'Zoom in';
    zoom.setAttribute('aria-pressed','false');
    dialog.querySelector('.viewer-label').textContent = label;
    dialog.querySelector('h2').textContent = title;
    toolbar.hidden = !documents;
    dialog.classList.toggle('document-viewer',documents);
    document.documentElement.classList.add('viewer-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedY}px`;
    document.body.style.width = '100%';
    dialog.showModal();
    body.scrollTop = 0;
    return true;
  }
  dialog.querySelector('.viewer-close').addEventListener('click',close);
  dialog.addEventListener('cancel',e => {e.preventDefault();close();});
  let backdropStart = false;
  dialog.addEventListener('pointerdown',e => {backdropStart = e.target === dialog;});
  dialog.addEventListener('click',e => {if(e.target === dialog && backdropStart) close();});
  zoom.addEventListener('click',() => {
    const expanded = body.classList.toggle('is-zoomed');
    zoom.textContent = expanded ? 'Fit to screen' : 'Zoom in';
    zoom.setAttribute('aria-pressed',String(expanded));
  });
  document.querySelectorAll('.case-study').forEach(details => {
    const summary = details.querySelector('summary');
    const card = details.closest('.project-card') || details.parentElement;
    details.open = false;
    summary.setAttribute('aria-haspopup','dialog');
    summary.addEventListener('click',e => {
      e.preventDefault();
      if(open(summary,'Project case study',card.querySelector('h3,h2')?.textContent.trim() || 'Case study')) {
        const content = details.querySelector('dl').cloneNode(true);
        content.className = 'viewer-study';
        body.append(content);
      }
    });
  });
  function linkedStudy() {
    let id; try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const summary = document.getElementById(id)?.querySelector('.case-study summary');
    if(summary) summary.click();
  }
  window.addEventListener('hashchange',linkedStudy);
  if(location.hash) requestAnimationFrame(linkedStudy);
  document.querySelectorAll('a[data-document-viewer]').forEach(link => {
    link.setAttribute('aria-haspopup','dialog');
    link.addEventListener('click',e => {
      e.preventDefault();
      const path = decodeURIComponent(link.getAttribute('href'));
      const title = path === 'BinKaiff_Resume.pdf' ? 'Bin Kaiff · Résumé' : path.includes('codveda') ? 'Codveda · Internship letter' : path.includes('nkmotors') ? 'NK Motors · Experience letter' : link.closest('article')?.querySelector('h2, h3')?.textContent.replace(/\s+/g,' ').trim() || 'Document';
      if(!open(link,'Document preview',title,true)) return;
      const pages = window.portfolioDocumentPreviews[path] || (/\.(jpg|jpeg|png|webp)$/i.test(path) ? [path] : []);
      const download = dialog.querySelector('.viewer-download');
      download.href = link.href;
      download.hidden = false;
      zoom.hidden = false;
      dialog.querySelector('.viewer-page-count').textContent = `${pages.length} ${pages.length === 1 ? 'page' : 'pages'}`;
      function unavailable() {
        body.replaceChildren();
        const message = document.createElement('p');
        message.className = 'viewer-empty';
        message.textContent = 'Document preview not available yet. Please contact me for a copy.';
        body.append(message);
        download.hidden = true;
        zoom.hidden = true;
        dialog.querySelector('.viewer-page-count').textContent = 'Preview unavailable';
      }
      if(link.dataset.previewUnavailable || !pages.length) return unavailable();
      pages.forEach((src,i) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${title} — page ${i+1}`;
        img.loading = i ? 'lazy' : 'eager';
        img.addEventListener('error',unavailable,{once:true});
        const caption = document.createElement('figcaption');
        caption.textContent = `Page ${i+1} of ${pages.length}`;
        figure.append(img,caption);
        body.append(figure);
      });
    });
  });
})();
