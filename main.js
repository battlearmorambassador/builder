"use strict";
function route() {
  const hash = location.hash || "#/";
  const show = (id) => { for (const v of document.querySelectorAll(".view")) v.hidden = v.id !== id; };
  closeAddMenu();
  if (hash.startsWith("#/skin")) {
    const q = new URLSearchParams(hash.split("?")[1] || ""), p = q.get("p");
    if (!p?.startsWith("/Lotus/")) { location.hash = "#/eye"; return; }
    show("view-skin");
    window.scrollTo(0, 0);
    showSkin(p, q.get("as") === "suit");
  } else if (hash === "#/eye") {
    show("view-eye");
    $("#eye-path").focus();
  } else if (hash === "#/collection") {
    show("view-collection");
    showCollection();
  } else if (hash === "#/check") {
    show("view-check");
    $("#check-input").focus();
  } else if (hash === "#/pick" || hash === "#/pick/") {
    show("view-choose");
  } else if (hash.startsWith("#/pick")) {
    show("view-pick");
    showPicker(hash.split("/")[2]);
  } else if (hash.startsWith("#/edit")) {
    const q = new URLSearchParams(hash.split("?")[1] || "");
    const ps = q.getAll("p").filter((x) => x.startsWith("/Lotus/"));
    const eyeMode = q.get("eye"), eyeBase = q.get("base");
    const p = ps[0];
    if (!p) { location.hash = "#/pick/weapon"; return; }
    show("view-edit");
    window.scrollTo(0, 0);
    if (eyeMode === "asis" || (eyeMode === "new" && eyeBase?.startsWith("/Lotus/"))) showEditor(catOfPath(eyeBase || p), p, { mode: eyeMode, base: eyeMode === "new" ? eyeBase : null });
    else if (ps.length > 1) showMulti(CATS[q.get("c")] ? q.get("c") : catOfPath(p), [...new Set(ps)]);
    else showEditor(CATS[q.get("c")] ? q.get("c") : catOfPath(p), p);
  } else {
    show("view-home");
  }
}

for (const el of document.querySelectorAll("[data-text]")) el.textContent = T[el.dataset.text];
for (const el of document.querySelectorAll("[data-text-html]")) el.innerHTML = T[el.dataset.textHtml];
for (const el of document.querySelectorAll("[data-text-placeholder]")) el.placeholder = T[el.dataset.textPlaceholder];
initHome();
initEditor();
initBlank();
initEye();
initSkin();
initMulti();
initCheck();
$("#cats").addEventListener("click", (e) => { if (e.target.dataset.cat) location.hash = "#/pick/" + e.target.dataset.cat; });
$("#search").addEventListener("input", debounce(filterPicker, 120));
window.addEventListener("hashchange", route);
route();