(function renderSubmission(){
  const out = document.getElementById('submission-data');
  const p = new URLSearchParams(window.location.search);
const fields = [
    ["First name", "firstName"],
    ["Last name", "lastName"],
    ["Email", "email"],
    ["Mobile phone", "mobile"],
    ["Organization", "organization"],
    ["Submitted at", "timestamp"]
  ];

  const frag = document.createDocumentFragment();
  fields.forEach(([label, key])=>{
    const val = p.get(key) || "—";
    const div = document.createElement('div');
    div.className = 'submission-field';
    div.innerHTML = `<strong>${label}:</strong> <span>${escapeHtml(val)}</span>`;
    frag.appendChild(div);
  });
  out.innerHTML = "";
  out.appendChild(frag);

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => (
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
    ));
  }
})();

(function footerInfo(){
  const c = document.getElementById('copyright');
  const m = document.getElementById('lastModified');
  if (c) c.textContent = `© ${new Date().getFullYear()} Andrea’s Chamber`;
  if (m) m.textContent = `Last modified: ${document.lastModified}`;
})();