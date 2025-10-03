(function setTimestamp(){
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();
})();

(function footerInfo(){
  const c = document.getElementById('copyright');
  const m = document.getElementById('lastModified');
  if (c) c.textContent = `© ${new Date().getFullYear()} Andrea’s Chamber`;
  if (m) m.textContent = `Last modified: ${document.lastModified}`;
})();

(function wireModals(){
  const openers = document.querySelectorAll('[data-open]');
  const closers = document.querySelectorAll('[data-close]');
  openers.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-open');
      const dlg = document.getElementById(id);
      if (dlg && !dlg.open) dlg.showModal();
    });
  });
  closers.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const dlg = btn.closest('dialog');
      if (dlg && dlg.open) dlg.close();
    });
  });
  document.querySelectorAll('dialog').forEach(dlg=>{
    dlg.addEventListener('click', (e)=>{
      const rect = dlg.getBoundingClientRect();
      const inside = (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      );
      if (!inside) dlg.close();
    });
  });
})();
