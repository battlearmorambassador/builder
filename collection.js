"use strict";
const COLLECTION_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? "http://127.0.0.1:8016" : "";
const COLLECTION_REMOTE = "https://raw.githubusercontent.com/battlearmorambassador/eternalism/main";
const collectionOpen = new Set();
let collectionText = "", collectionFrom = "", collectionTimer = 0;
async function fetchCollection() {
  for (const from of [COLLECTION_LOCAL, COLLECTION_REMOTE]) {
    if (!from) continue;
    try {
      const r = await fetch(from + "/collection.json", { cache: "no-store" });
      if (r.ok) return [from, await r.text()];
    } catch {}
  }
  return null;
}
const collectionPicked = new Set();
const patchesIn = (n) => (n.type === "patch" ? [n] : n.children.flatMap(patchesIn));
const collectionFile = (path) => collectionFrom + (collectionFrom === COLLECTION_LOCAL ? "/files/" : "/") + path.split("/").map(encodeURIComponent).join("/");
async function downloadCollection(nodes, name) {
  const seen = new Set(), patches = nodes.flatMap(patchesIn).filter((p) => !seen.has(p.path) && seen.add(p.path));
  if (!patches.length) return;
  $("#collection-status").textContent = "";
  try {
    const files = await Promise.all(patches.map(async (p) => {
      const r = await fetch(collectionFile(p.path), { cache: "no-store" });
      if (!r.ok) throw new Error(p.path);
      return { path: p.path, text: await r.text() };
    }));
    if (files.length === 1 && nodes[0].type === "patch") saveBlob(tail(files[0].path), new Blob([files[0].text], { type: "text/plain" }));
    else saveBlob(name + ".zip", zipFiles(files));
  } catch { $("#collection-status").textContent = OFFLINE; }
}
function collectionTools(n) {
  const pick = h("input", { type: "checkbox", class: "col-pick", title: T.select, onclick: (e) => e.stopPropagation() });
  const paths = patchesIn(n).map((p) => p.path), count = paths.filter((p) => collectionPicked.has(p)).length;
  pick.checked = paths.length > 0 && count === paths.length;
  pick.indeterminate = count > 0 && count < paths.length;
  pick.disabled = !paths.length;
  pick.addEventListener("change", () => { for (const p of paths) pick.checked ? collectionPicked.add(p) : collectionPicked.delete(p); drawCollection(); });
  return [pick, h("button", { class: "col-get", type: "button", title: T.download, onclick: (e) => { e.stopPropagation(); downloadCollection([n], n.name); } }, "↓")];
}
function collectionRows(nodes, depth) {
  return nodes.flatMap((n) => {
    const pad = { style: "padding-left:" + (depth * 22 + 8) + "px" }, open = collectionOpen.has(n.path), [pick, get] = collectionTools(n);
    if (n.type === "patch") return [h("div", { class: "col-row", ...pad }, h("span", { class: "col-tw" }), pick, h("a", { class: "col-name", href: collectionFile(n.path), target: "_blank", rel: "noopener" }, n.name), h("span", { class: "col-desc" }, n.desc), get)];
    const flip = () => { open ? collectionOpen.delete(n.path) : collectionOpen.add(n.path); drawCollection(); };
    return [h("div", { class: "col-row col-folder", ...pad, onclick: flip }, h("span", { class: "col-tw" }, open ? "▾" : "▸"), pick, h("span", { class: "col-name" }, n.name), open ? null : h("span", { class: "col-desc" }, n.desc), patchesIn(n).length ? get : null), ...(open ? collectionRows(n.children, depth + 1) : [])];
  });
}
function collectionNodes(nodes) {
  return nodes.flatMap(patchesIn).filter((p) => collectionPicked.has(p.path));
}
function drawCollection() {
  const tree = JSON.parse(collectionText).tree, picked = collectionNodes(tree), count = picked.length;
  $("#collection-tree").classList.toggle("picking", picked.length > 0);
  $("#collection-tree").replaceChildren(...(tree.length ? collectionRows(tree, 0) : [h("p", { class: "muted" }, T.collectionEmpty)]));
  $("#collection-bar").hidden = !picked.length;
  $("#collection-bar").replaceChildren(
    h("button", { class: "btn", type: "button", onclick: () => downloadCollection(picked, T.patchCollection) }, fmt(T.downloadSelected, count)),
    h("button", { class: "btn btn-ghost", type: "button", onclick: () => { collectionPicked.clear(); drawCollection(); } }, T.clearSelection));
}
async function updateCollection() {
  const got = await fetchCollection();
  if (!got) { if (!collectionText) $("#collection-tree").replaceChildren(h("p", { class: "muted" }, T.collectionEmpty)); return; }
  if (got[1] === collectionText) return;
  [collectionFrom, collectionText] = got;
  drawCollection();
}
function showCollection() {
  updateCollection();
  clearInterval(collectionTimer);
  if (COLLECTION_LOCAL) collectionTimer = setInterval(() => { if (location.hash === "#/collection") updateCollection(); else clearInterval(collectionTimer); }, 2000);
}