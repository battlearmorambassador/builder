"use strict";
function initEye() {
  const input = $("#eye-path"), np = $("#eye-newpath"), status = $("#eye-status");
  const byName = new Map();
  pathSearch(input, async () => {
    const [lists, customs, chars] = await Promise.all([loadAllLists(), loadCustoms(), loadCharacters()]);
    const seen = new Set();
    return namePaths(lists.concat(customs, PLAYABLE.map((c) => ({ path: c.path, name: c.name || cleanName(c.tag, c.path) })), chars.all.map((c) => ({ path: c.path, name: c.label || c.name }))).filter((i) => !seen.has(i.path) && seen.add(i.path)), byName);
  });
  const mode = () => document.querySelector('input[name="eye-mode"]:checked').value;
  const resolve = () => byName.get(input.value.trim().toLowerCase()) || normalizePath(input.value);
  const suggest = () => {
    const p = resolve();
    if (mode() === "new" && p && (!np.value || np.dataset.auto === "1")) { np.value = p + T.custom; np.dataset.auto = "1"; }
  };
  for (const r of document.querySelectorAll('input[name="eye-mode"]')) r.addEventListener("change", () => { $("#eye-new").hidden = mode() !== "new"; suggest(); });
  const radio = (v) => $(`input[name="eye-mode"][value="${v}"]`);
  const showMode = (v, on) => { radio(v).disabled = !on; radio(v).closest("label").hidden = !on; };
  let checkId = 0, lastItem = "";
  const batch = [];
  const pickFirst = () => {
    const current = document.querySelector('input[name="eye-mode"]:checked');
    if (!current || current.disabled) { const first = document.querySelector('input[name="eye-mode"]:not(:disabled)'); if (first) first.checked = true; }
  };
  const batchModes = (kind) => {
    const suit = batch.every((b) => b.kind.suit) && (!kind || !!kind.suit), skin = batch.every((b) => b.kind.skin) && (!kind || kind.skin);
    showMode("asis", false); showMode("new", false); showMode("suit", suit); showMode("skin", skin);
    $("#eye-new").hidden = true;
    pickFirst();
  };
  const drawBatch = () => {
    $("#eye-batch").hidden = !batch.length;
    $("#eye-batch").replaceChildren(...batch.map((b, i) => h("span", { class: "eye-chip" }, b.name, h("button", { type: "button", title: T.remove, onclick: () => { batch.splice(i, 1); drawBatch(); checkItem(); } }, "✕"))));
  };
  $("#eye-add").onclick = async () => {
    const p = resolve();
    if (!p || batch.some((b) => b.path === p)) return;
    const kind = await itemKind(p).catch(() => null);
    if (!kind || !(kind.suit || kind.skin)) return;
    batch.push({ path: p, name: input.value.trim() || tail(p), kind });
    input.value = "";
    drawBatch();
    checkItem();
  };
  const runBatch = async () => {
    const m = mode();
    if (m !== "suit" && m !== "skin") return;
    const list = [...batch], p = resolve();
    if (p && input.value.trim() && !list.some((b) => b.path === p)) list.push({ path: p, name: input.value.trim() });
    const files = [], failed = [], used = new Set();
    for (let i = 0; i < list.length; i++) {
      status.innerHTML = '<span class="spinner"></span>' + esc(fmt(T.batchBuilding, i + 1, list.length));
      await showSkin(list[i].path, m === "suit").catch(() => null);
      if (!sk?.info) { failed.push(list[i].name); continue; }
      const base = (sk.name.trim() || sk.info.name || tail(list[i].path)).replace(/[\\/:*?"<>|]/g, "").trim() || "Patch";
      let file = base + ".txt", n = 2;
      while (used.has(file.toLowerCase())) file = base + " " + n++ + ".txt";
      used.add(file.toLowerCase());
      files.push({ path: file, text: buildSkin() });
    }
    if (files.length) saveBlob(T.sentientBuilder + ".zip", zipFiles(files));
    status.textContent = fmt(T.batchDone, files.length) + (failed.length ? " " + fmt(T.batchSkipped, failed.join(", ")) : "");
  };
  const checkItem = async () => {
    const id = ++checkId, p = resolve();
    if (!input.value.trim() && batch.length) { checkId++; status.textContent = ""; $("#eye-choices").hidden = false; $("#eye-target").hidden = true; $("#eye-note").hidden = true; $("#eye-add").hidden = true; batchModes(null); return; }
    $("#eye-add").hidden = true;
    status.textContent = "";
    if (p) status.innerHTML = '<span class="spinner"></span>' + fmt(T.lookingUp, esc(p));
    let kind = null, failed = false;
    if (p) { try { kind = await itemKind(p); } catch { failed = true; } }
    if (id !== checkId) return;
    status.textContent = "";
    $("#eye-choices").hidden = !kind;
    if (!kind) { if (p && input.value.trim()) status.textContent = failed ? OFFLINE : T.noDataFound; return; }
    $("#eye-target").textContent = p;
    $("#eye-target").hidden = input.value.trim() === p;
    showMode("asis", !kind.character);
    showMode("new", !kind.character);
    showMode("suit", !!kind.suit);
    showMode("skin", kind.skin);
    $("#eye-note").hidden = !kind.character || !!kind.suit;
    $("#eye-note").textContent = T.characterNote;
    const current = document.querySelector('input[name="eye-mode"]:checked');
    if (!current || current.disabled || p !== lastItem) {
      const first = document.querySelector('input[name="eye-mode"]:not(:disabled)');
      if (first) first.checked = true;
    }
    lastItem = p;
    $("#eye-add").hidden = !(kind.suit || kind.skin);
    if (batch.length) batchModes(kind);
    if (!document.querySelector('input[name="eye-mode"]:not(:disabled)')) { $("#eye-choices").hidden = true; status.textContent = T.notAddable; return; }
    $("#eye-new").hidden = mode() !== "new";
    suggest();
  };
  const code = atob("YXJyb3d1cCxhcnJvd3VwLGFycm93ZG93bixhcnJvd2Rvd24sYXJyb3dsZWZ0LGFycm93cmlnaHQsYXJyb3dsZWZ0LGFycm93cmlnaHQsYixh").split(",");
  let codeAt = 0;
  input.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    codeAt = key === code[codeAt] ? codeAt + 1 : key === code[0] ? 1 : 0;
    if (codeAt > 8) e.preventDefault();
    if (codeAt < code.length) return;
    codeAt = 0;
    store.set(FLAG, !extended());
    checkItem().then(() => (status.textContent = extended() ? atob("RW5lbXkgc3VpdHMgdW5sb2NrZWQu") : atob("RW5lbXkgc3VpdHMgbG9ja2VkLg==")));
  });
  input.addEventListener("change", checkItem);
  input.addEventListener("input", debounce(() => { const v = input.value.trim(); if (!v || /^\/|^lotus\//i.test(v) || byName.has(v.toLowerCase())) checkItem(); else { checkId++; status.textContent = ""; $("#eye-choices").hidden = true; } }, 300));
  np.addEventListener("input", () => (np.dataset.auto = ""));
  $("#eye-form").onsubmit = async (e) => {
    e.preventDefault();
    if (batch.length) { runBatch(); return; }
    const target = resolve();
    if (!target) return;
    if ($("#eye-choices").hidden) { checkItem(); return; }
    status.innerHTML = '<span class="spinner"></span>' + fmt(T.lookingUp, esc(target));
    const lookup = (p) => loadType(p).then((t) => ({ t }), () => { status.textContent = OFFLINE; return null; });
    const found = await lookup(target);
    if (!found) return;
    if (!found.t) { status.textContent = fmt(T.pathNotFound, target); return; }
    if (mode() === "asis") { status.textContent = ""; location.hash = "#/edit?eye=asis&p=" + encodeURIComponent(target); return; }
    if (mode() === "skin") { status.textContent = ""; location.hash = "#/skin?p=" + encodeURIComponent(target); return; }
    if (mode() === "suit") { status.textContent = ""; location.hash = "#/skin?as=suit&p=" + encodeURIComponent(target); return; }
    const newPath = normalizePath(np.value);
    if (!newPath || newPath === target) { status.textContent = T.newItemNeedsPath; return; }
    const taken = await lookup(newPath);
    if (!taken) return;
    if (taken.t) { status.textContent = fmt(T.pathExists, newPath); return; }
    status.textContent = "";
    location.hash = "#/edit?eye=new&base=" + encodeURIComponent(target) + "&p=" + encodeURIComponent(newPath);
  };
}