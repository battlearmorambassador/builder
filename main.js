"use strict";

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