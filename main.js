"use strict";

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