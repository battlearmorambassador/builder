"use strict";
let ed = null;
function getAt(obj, path) {
  let c = obj;
  for (const p of path) {
    if (!isObj(c)) return undefined;
    c = c[p];
  }
  return c;
}
function hasAt(obj, path) {
  const par = getAt(obj, path.slice(0, -1));
  return isObj(par) && path[path.length - 1] in par;
}

function applyText(v, fn) {
  if (typeof v === "string") return fn(v);
  if (Array.isArray(v)) return v.map((x) => applyText(x, fn));
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, applyText(x, fn)]));
  return v;
}
function textFn(op) {
  if (op.kind === "r") return (s) => s.split(op.from).join(op.to);
  let re;
  try { re = new RegExp(op.from, "g"); } catch { return (s) => s; }
  return (s) => s.replace(re, op.to);
}

function applyOp(e, op) {
  const par = getAt(e, op.path.slice(0, -1));
  const k = op.path[op.path.length - 1];
  if (!isObj(par)) return;
  if (op.t === "set" || op.t === "addKey") par[k] = clone(op.v);
  else if (op.t === "del") { if (Array.isArray(par)) par.splice(+k, 1); else delete par[k]; }
  else if (op.t === "push" && Array.isArray(par[k])) par[k].push(clone(op.v));
  else if (op.t === "dup" && Array.isArray(par) && +k < par.length) par.splice(+k + 1, 0, clone(par[k]));
}
function replay(sn) {
  const s = ed.sides[sn];
  const base = clone(s.eff);
  for (const op of ed.text) {
    if (!op.from) continue;
    const f = textFn(op);
    for (const k of s.ownKeys) if (k in base) base[k] = applyText(base[k], f);
  }
  s.base = base;
  s.edit = clone(base);
  for (const op of ed.ops) if (op.side === sn) applyOp(s.edit, op);
}

function matchPath(here, there, path, exactLast) {
  const out = [];
  let a = here, b = there;
  for (let i = 0; i < path.length; i++) {
    const seg = path[i];
    if (Array.isArray(a) && isIdx(seg)) {
      if (!Array.isArray(b)) return null;
      let j = b.findIndex((x) => deepEq(x, a[+seg]));
      if (j < 0 && !exactLast && +seg < b.length) j = +seg;
      if (j < 0) return null;
      out.push(String(j));
      a = a[+seg];
      b = b[j];
    } else {
      if (!isObj(b) || !(seg in b)) return null;
      out.push(seg);
      a = isObj(a) ? a[seg] : undefined;
      b = b[seg];
    }
  }
  return out;
}

class Mixed {}

const realSides = () => Object.keys(ed.sides).filter((k) => k !== "all" && ed.sides[k]);
const makeSide = (path, t) => ({ path, own: t?.own || {}, eff: t?.data || {}, origin: t?.origin || {}, ownKeys: Object.keys(t?.own || {}) });

function pushOp(rec) {
  let last = null;
  for (let i = ed.ops.length - 1; i >= 0; i--) if (ed.ops[i].side === rec.side) { last = ed.ops[i]; break; }
  if (rec.t === "set" && !ed.inAction && !last?.aid && last && last.t === "set" && last.path.join(".") === rec.path.join(".")) last.v = clone(rec.v);
  else ed.ops.push(rec);
  applyOp(ed.sides[rec.side].edit, rec);
}

function merge(vals) {
  if (vals.every((x) => deepEq(x, vals[0]))) return clone(vals[0]);
  if (vals.every((x) => Array.isArray(x) && x.length === vals[0].length)) return vals[0].map((_, i) => merge(vals.map((x) => x[i])));
  if (vals.every((x) => isObj(x) && !Array.isArray(x)) && vals.every((x) => deepEq(Object.keys(x).sort(), Object.keys(vals[0]).sort())))
    return Object.fromEntries(Object.keys(vals[0]).map((k) => [k, merge(vals.map((x) => x[k]))]));
  return new Mixed();
}

function strip(v) {
  if (v instanceof Mixed) return undefined;
  if (Array.isArray(v)) {
    const out = v.map(strip);
    return out.includes(undefined) ? undefined : out;
  }
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, strip(x)]).filter(([, x]) => x !== undefined));
  return v;
}

const itemSides = () => realSides().filter((k) => k.startsWith("m"));

function rebuildAll() {
  const all = ed.sides.all, rs = itemSides().map((k) => ed.sides[k]);
  const shared = (pick) => Object.keys(pick(rs[0])).filter((k) => rs.every((r) => k in pick(r)));
  const build = (pick) => Object.fromEntries(shared(pick).map((k) => [k, strip(merge(rs.map((r) => pick(r)[k])))]).filter(([, v]) => v !== undefined));
  all.base = build((r) => r.base);
  all.edit = build((r) => r.edit);
  all.eff = all.base;
  all.ownKeys = Object.keys(all.base);
}

function recordAll(op) {
  const all = ed.sides.all;
  const k = op.path[0];
  for (const sn of realSides()) {
    const r = ed.sides[sn];
    const storeSide = sn.startsWith("s");
    if (storeSide && op.t === "addKey") continue;
    let path = op.t === "addKey" || op.path.length === 1 ? op.path : matchPath(all.edit, r.edit, op.path, op.t === "del" || op.t === "dup");
    if (!path) continue;
    if (storeSide && !hasAt(r.edit, path)) continue;
    if (storeSide && op.t === "set" && isObj(getAt(r.edit, path)) !== isObj(op.v)) continue;
    let o = { ...op, path };
    if (op.t === "del" && path.length === 1 && !r.ownKeys.includes(k)) {
      const cur = r.edit[k];
      if (!isObj(cur)) continue;
      o = { t: "set", path, v: Array.isArray(cur) ? [] : {} };
    }
    if (o.t === "set" && op.path.length > 1 && isObj(getAt(r.edit, path))) continue;
    if (o.t === "push") {
      const arr = getAt(r.edit, path);
      if (!Array.isArray(arr)) continue;
      const shownArr = getAt(all.edit, op.path);
      if (Array.isArray(shownArr) && shownArr.length && arr.length && deepEq(o.v, shownArr[shownArr.length - 1])) o = { ...o, v: clone(arr[arr.length - 1]) };
    }
    pushOp({ ...o, side: sn });
  }
  rebuildAll();
  return ["all"];
}

function record(sn, op) {
  if (sn === "all") return recordAll(op);
  const other = sn === "item" ? "store" : "item";
  const targets = [[sn, op.path]];
  const o = ed.sides[other];
  if (o && op.t !== "addKey") {
    const here = ed.sides[sn].edit;
    const mp = matchPath(here, o.edit, op.path, op.t === "del" || op.t === "dup");
    if (mp) {
      const there = getAt(o.edit, mp);
      if (op.t === "set" && hasAt(o.edit, mp) && !isObj(there)) targets.push([other, mp]);
      if (op.t === "push" && Array.isArray(there)) targets.push([other, mp]);
      if ((op.t === "del" || op.t === "dup") && hasAt(o.edit, mp)) targets.push([other, mp]);
    }
  }
  for (const [side, path] of targets) pushOp({ ...op, side, path });
  return targets.map(([side]) => side);
}

function resetKey(sn, k) {
  const targets = sn === "all" ? realSides() : [sn];
  ed.ops = ed.ops.filter((o) => !(targets.includes(o.side) && o.path[0] === k));
  ed.actions = (ed.actions || []).filter((a) => ed.ops.some((o) => o.aid === a.id));
  for (const t of targets) replay(t);
  if (ed.multi) rebuildAll();
  refresh();
}

function replayAll() {
  for (const t of realSides()) replay(t);
  if (ed.multi) rebuildAll();
}

function diffNode(o, v, p, t) {
  if (!isObj(o) || !isObj(v)) {
    if (isObj(o) || isObj(v)) return false;
    if (o !== v) t.q.push([p, o, v]);
    return true;
  }
  if (Array.isArray(o) !== Array.isArray(v)) return false;
  if (Array.isArray(o)) {
    if (v.length < o.length) return false;
    for (let i = 0; i < o.length; i++) if (!diffNode(o[i], v[i], p + "." + i, t)) return false;
    for (let i = o.length; i < v.length; i++) t.a.push([p, v[i]]);
    return true;
  }
  const ok = Object.keys(o);
  if (ok.length !== Object.keys(v).length || ok.some((k) => !(k in v))) return false;
  for (const k of ok) if (!diffNode(o[k], v[k], p + "." + k, t)) return false;
  return true;
}

function sideLines(sn, parentOut = {}) {
  const s = ed.sides[sn];
  const { base, edit } = s;
  const pre = [], q = [], a = [], r = [];
  const toParent = (k) => {
    if (ed.eye) return false;
    const src = s.origin[k];
    if (s.ownKeys.includes(k) || !(k in base) || !isBaseType(src)) return false;
    const line = k + "=" + eeValue(edit[k]);
    const list = (parentOut[src] ||= []);
    if (!list.includes(line)) list.push(line);
    return true;
  };
  if (s.ownKeys.some((k) => !(k in edit))) {
    for (const k of Object.keys(edit)) {
      if (!s.ownKeys.includes(k) && deepEq(base[k], edit[k])) continue;
      if (!toParent(k)) pre.push(k + "=" + eeValue(edit[k]));
    }
    return ["$clear", ...pre];
  }
  const removals = new Set(ed.ops.filter((o) => o.side === sn && o.t === "del").map((o) => o.path[0]));
  for (const k of Object.keys(edit)) {
    const o = base[k], v = edit[k];
    if (k in base && deepEq(o, v)) continue;
    if (toParent(k)) continue;
    if (!s.ownKeys.includes(k) || !(k in base) || !isObj(o) || !isObj(v) || removals.has(k)) { pre.push(k + "=" + eeValue(v)); continue; }
    const t = { q: [], a: [] };
    if (diffNode(o, v, k, t) && !t.a.some(([, x]) => isObj(x)) && ![...t.q.map((x) => x[2]), ...t.a.map((x) => x[1])].some((x) => typeof x === "string" && x.includes("|"))) { q.push(...t.q); a.push(...t.a); }
    else pre.push(k + "=" + eeValue(v));
  }
  const raw = JSON.stringify(s.ownKeys.map((k) => base[k]));
  const groups = new Map();
  for (const [p, ov, nv] of q) {
    if (typeof ov !== "string" || typeof nv !== "string" || !ov || ov.includes("|")) continue;
    const g = ov + "\u0000" + nv;
    groups.set(g, (groups.get(g) || []).concat([p]));
  }
  for (const [g, ps] of groups) {
    const [ov, nv] = g.split("\u0000");
    if (ps.length > 1 && raw.split(ov).length - 1 === ps.length) {
      r.push(`r|${ov}|${nv}`);
      for (const p of ps) q.splice(q.findIndex((x) => x[0] === p), 1);
    }
  }
  return [
    ...pre,
    ...r,
    ...ed.text.filter((o) => o.from).map((o) => `${o.kind}|${o.from}|${o.to}`),
    ...q.map(([p, , nv]) => `q|${p}|${nv}`),
    ...a.map(([p, v]) => `a|${p}|${eeInline(v)}`),
  ];
}

function buildMulti() {
  const parentOut = {};
  const sides = realSides();
  const owners = new Map();
  for (const sn of sides) for (const l of sideLines(sn, parentOut)) {
    if (!owners.has(l)) owners.set(l, []);
    if (!owners.get(l).includes(sn)) owners.get(l).push(sn);
  }
  ed.sharedParents = Object.keys(parentOut);
  const blocks = new Map();
  for (const [l, who] of owners) {
    const key = who.join(",");
    if (!blocks.has(key)) blocks.set(key, { who, lines: [] });
    blocks.get(key).lines.push(l);
  }
  const ordered = [...blocks.values()].sort((a, b) => b.who.length - a.who.length);
  const heads = (who) => who.map((sn, i) => (i ? "&" : ">") + ed.sides[sn].path);
  return [
    ...ordered.map((b) => [heads(b.who), b.lines]),
    ...Object.entries(parentOut).map(([path, lines]) => [[">" + path], lines]),
  ];
}
const MANIFEST = "/Lotus/Types/Game/Store/ProductsManifest";
function buildEye() {
  const e = ed.eye, st = e.store;
  const out = ["# " + (ed.name || tail(ed.path))];
  const lines = sideLines("item");
  const inner = [];
  const block = (heads, body) => { if (inner.length) inner.push(""); inner.push(...heads, ...body.map(indent)); };
  if (e.mode === "new") block(["+" + ed.path + "|" + e.base], lines);
  if (!e.hasStore) {
    const body = [];
    if (st.category && !st.parent.startsWith("/Lotus/StoreItems/")) body.push("ProductCategory=" + st.category);
    const name = st.name.trim() || itemText("LocalizeTag"), desc = st.desc.trim() || itemText("LocalizeDescTag");
    if (name) body.push("LocalizeTag=" + eeStr(name));
    if (desc) body.push("LocalizeDescTag=" + eeStr(desc));
    if (st.icon.trim()) body.push("Icon=" + st.icon.trim());
    body.push("TypeName=" + ed.path);
    block(["+" + st.path + "|" + st.parent], body);
  }
  if (e.manifest) block([">" + MANIFEST], ["a|StoreItems|" + st.path]);
  const gated = inner.length && conditionExpr() !== "can_add_new_types()";
  out.push(...(gated ? ["$if can_add_new_types()", ...inner, "$endif"] : inner));
  if (e.unlock?.store.length) out.push("", ">" + st.path, ...e.unlock.store.map(indent));
  const own = e.unlock?.market ? ["MarketMode=MM_VISIBLE", ...lines.filter((l) => !l.startsWith("MarketMode="))] : lines;
  if (e.mode === "asis" && own.length) out.push("", ">" + ed.path, ...own.map(indent));
  return finish(out);
}
function finish(out) {
  const cond = conditionExpr();
  if (cond) out.splice(1, 0, "$if " + cond), out.push("$endif");
  return out.join("\n") + "\n";
}
function emitBlocks(out, blocks) {
  let any = false;
  for (const [heads, lines] of blocks) {
    if (!lines.length) continue;
    if (any) out.push("");
    any = true;
    out.push(...heads, ...lines.map(indent));
  }
  return any;
}
function buildPatch() {
  if (ed.eye) return buildEye();
  const out = ["# " + (ed.name || $("#target-name").textContent || tail(ed.path))];
  if (ed.multi) {
    if (!emitBlocks(out, buildMulti())) out.push(...ed.paths.map((p, i) => (i ? "&" : ">") + p));
    return finish(out);
  }
  const parentOut = {};
  const itemLines = sideLines("item", parentOut);
  const storeLines = ed.sides.store ? sideLines("store", parentOut) : [];
  const shared = [], itemOnly = [];
  for (const l of itemLines) {
    const i = storeLines.indexOf(l);
    if (i >= 0 && l !== "$clear") { shared.push(l); storeLines.splice(i, 1); }
    else itemOnly.push(l);
  }
  ed.sharedParents = Object.keys(parentOut);
  const blocks = [
    [[">" + ed.path, "&" + ed.sides.store?.path], shared],
    [[">" + ed.path], itemOnly],
    [[">" + ed.sides.store?.path], storeLines],
    ...Object.entries(parentOut).map(([path, lines]) => [[">" + path], lines]),
  ];
  if (!emitBlocks(out, blocks)) out.push(">" + ed.path);
  return finish(out);
}

function conditionExpr() {
  if (!$("#cond-on").checked) return "";
  const mode = $("#cond-mode").value;
  const v = $("#cond-ver").value.trim();
  if (mode === "newtypes") return "can_add_new_types()";
  if ((mode === "from" || mode === "before") && v) return `compareversions(owf_get_build_version(), "${v}") ${mode === "from" ? ">=" : "<"} 0`;
  return "";
}

function highlight(text) {
  return text.split("\n").map((l) => {
    if (l.startsWith("#")) return `<span class="c">${esc(l)}</span>`;
    if (/^[>&]/.test(l)) return `<span class="h">${esc(l)}</span>`;
    if (/^\$(if|elseif|else|endif)\b/.test(l)) return `<span class="o">${esc(l)}</span>`;
    const m = l.match(/^(\s*)([rsqa]\||\$)(.*)$/);
    if (m) return esc(m[1]) + `<span class="o">${esc(m[2])}</span>` + esc(m[3]);
    return esc(l);
  }).join("\n");
}

let draftWarned = false;
const saveDraft = debounce(() => {
  if (!ed) return;
  const key = "draft:" + (ed.multi ? "multi:" + ed.paths.join("|") : (ed.eye ? "eye:" + ed.eye.mode + ":" : "") + ed.path);
  if (!ed.eye && !ed.ops.length && !ed.text.length && !$("#cond-on").checked && ed.name === ed.defaultName) { store.del(key); return; }
  const saved = store.set(key, { eye: ed.eye && { store: ed.eye.store, manifest: ed.eye.manifest }, name: ed.name, ops: ed.ops, text: ed.text, actions: ed.actions, nextAction: ed.nextAction, cond: [$("#cond-on").checked, $("#cond-mode").value, $("#cond-ver").value] });
  if (!saved && !draftWarned) { draftWarned = true; toast(T.storageFull); }
}, 400);

function drawSharedWarn() {
  const names = ed.sharedParents.map(tail), one = names.length === 1;
  $("#shared-warn").hidden = !ed.multi || !names.length;
  $("#shared-warn").textContent = one ? fmt(T.sharedOne, names[0]) : fmt(T.sharedMany, names.join(T.and));
}
function renderOutput() {
  if (!ed?.sides) return;
  ed.sharedParents = [];
  $("#output").innerHTML = highlight(buildPatch());
  drawSharedWarn();
  syncPreview();
  saveDraft();
}

function refresh() {
  renderSides();
  renderFr();
  renderOutput();
}

function leafSpec(sn, path) {
  if (ENUMS[path[path.length - 1]]) return { t: "string", enum: ENUMS[path[path.length - 1]] };
  const g = sn === "store" ? "store" : ed.group;
  const top = FIELDS[g]?.[path[0]] || FIELDS[sn === "store" ? ed.group : "store"]?.[path[0]];
  if (!top) return null;
  if (path.length === 1) return top;
  const leaf = path[path.length - 1];
  if (isIdx(leaf)) return path.length === 2 ? { t: top.it, enum: top.enum, sug: top.sug } : null;
  if (path.length === 3 && top.sub) return top.sub[leaf] || null;
  return null;
}

function defaultFor(spec) {
  if (!spec) return "";
  if (spec.t === "array") return [];
  if (spec.t === "object") return {};
  if (spec.t === "bool") return 1;
  if (spec.t === "int" || spec.t === "float") return 0;
  return spec.enum ? spec.enum[0] : "";
}

function locSearch(input, choose, maxLen) {
  const box = h("div", { class: "sugg", hidden: true });
  const list = suggestBox(input, box);
  input.addEventListener("input", debounce(() => {
    const q = input.value.trim().toLowerCase();
    const seen = new Set();
    const found = [];
    if (DICT && q.length >= 2 && !q.startsWith("/")) {
      for (const k in DICT) {
        const v = DICT[k];
        if (typeof v !== "string" || v.includes("\n") || v.length > maxLen || seen.has(v)) continue;
        const l = v.toLowerCase();
        let i = l.indexOf(q);
        while (i > 0 && /\w/.test(l[i - 1])) i = l.indexOf(q, i + 1);
        if (i < 0) continue;
        seen.add(v);
        found.push([l === q ? 0 : i === 0 ? 1 : 2, v.length, k, v]);
      }
    }
    found.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    list.show(found.slice(0, 30).map(([, , k, v]) => h("button", { type: "button", onmousedown: (e) => { e.preventDefault(); choose(k); list.close(); } }, v)));
  }, 180));
  return box;
}
function leafWidget(sn, path, v, n) {
  const spec = leafSpec(sn, path);
  const key = path.filter((p) => !isIdx(p)).pop();
  const set = (nv) => {
    const sides = record(sn, { t: "set", path, v: nv });
    for (const o of sides) if (o !== sn) syncSide(o);
    const s = ed.sides[sn];
    n.classList.toggle("mod", !hasAt(s.base, path) || !deepEq(getAt(s.base, path), nv));
    const owner = getAt(s.edit, path.slice(0, -1)), title = n.parentElement?.closest(".node")?.querySelector(":scope > .line .nm");
    if (title && isObj(owner) && owner.UpgradeType) title.textContent = title.textContent.split(" ")[0] + " " + statLine(owner);
    const l = n.querySelector(".loc");
    const inEl = n.querySelector("input");
    if (l) l.textContent = typeof nv === "string" && loc(nv) && inEl?.value !== loc(nv) ? "“" + loc(nv) + "”" : "";
    renderOutput();
  };
  if (spec?.t === "bool" && (v === 0 || v === 1)) {
    const sel = h("select", { class: "input mini" }, h("option", { value: "1", selected: v === 1 }, T.yes), h("option", { value: "0", selected: v === 0 }, T.no));
    sel.addEventListener("change", () => set(+sel.value));
    return sel;
  }
  const textField = !isIdx(path[path.length - 1]) && /Loc|Desc|HelpText/.test(key || "");
  if (key === "ItemCompatibility" && path.length === 1 && typeof v === "string") {
    const sel = compatSelect(v, "input mini");
    sel.addEventListener("change", () => set(sel.value));
    return sel;
  }
  const stat = path.length > 2 ? getAt(ed.sides[sn].edit, path.slice(0, path.findIndex((x, i) => i > 0 && isIdx(path[i - 1]) ) )) : null;
  const choice = isObj(stat) ? STAT_CHOICES[stat.UpgradeType] : null;
  const named = key === choice?.key ? choice.options.map(([x, l]) => [x, l]) : key === "ValidModifiers" ? Object.entries(WHEN_NAMES).filter(([x]) => x.startsWith("PM_")) : key === "ValidProcTypes" ? Object.entries({ ...PROC_NAMES, PT_LIFT_HIT: WHEN_NAMES.PT_LIFT_HIT }) : key === "SymbolFilter" && /^CC_/.test(v) ? Object.entries(WHEN_NAMES).filter(([x]) => x.startsWith("CC_")) : null;
  if (named && typeof v === "string") {
    const sel = h("select", { class: "input mini" }, (named.some(([x]) => x === v) ? named : [[v, v], ...named]).map(([x, l]) => h("option", { value: x, selected: x === v }, l)));
    sel.addEventListener("change", () => {
      const text = key === choice?.key ? choice.options.find((o) => o[0] === sel.value)?.[2] : null;
      if (text) record(sn, { t: "set", path: [...path.slice(0, -1), "LocTag"], v: text });
      set(sel.value);
    });
    return sel;
  }
  if (spec?.enum && typeof v === "string" && !textField) {
    const vals = spec.enum.includes(v) ? spec.enum : [v, ...spec.enum];
    const sel = key === "UpgradeType" ? statSelect(vals, v) : h("select", { class: "input mini" }, vals.map((x) => h("option", { value: x, selected: x === v }, enumLabel(x))));
    sel.addEventListener("change", () => set(sel.value));
    return sel;
  }
  const inp = h("input", { class: "input mini", type: "text", value: String(v), spellcheck: "false", autocomplete: "off" });
  if (typeof v === "number") {
    inp.inputMode = "decimal";
    const stat = statInfo(sn, path);
    const game = stat ? h("div", { class: "game" }) : null;
    let maxIn = null;
    const show = (x) => { if (game) game.textContent = typeof x === "number" ? statText(x, stat) : ""; };
    inp.addEventListener("input", () => {
      const t = inp.value.trim();
      const valid = t !== "" && !isNaN(Number(t));
      inp.classList.toggle("bad", !valid);
      if (!valid) return;
      const x = Number(t);
      set(x);
      show(x);
      if (maxIn && typeof x === "number" && document.activeElement !== maxIn) maxIn.value = fmtNum(statAt(x, stat, stat.max));
    });
    show(v);
    if (!stat) return inp;
    const wrap = h("span", { class: "w stat" }, inp);
    if (stat.additive && stat.max != null) {
      maxIn = h("input", { class: "input mini", type: "text", inputMode: "decimal", value: fmtNum(statAt(v, stat, stat.max)), title: T.maxRankHint });
      maxIn.addEventListener("input", () => {
        const t = Number(maxIn.value.trim());
        if (maxIn.value.trim() === "" || isNaN(t)) return;
        const raw = +(t / (stat.pct ? 100 : 1) / (stat.max + 1)).toPrecision(8);
        inp.value = String(raw);
        set(raw);
        show(raw);
      });
      wrap.append(h("span", { class: "eq" }, T.orMaxRank, maxIn, stat.pct ? "%" : ""));
    }
    wrap.append(game);
    return wrap;
  }
  const orig = getAt(ed.sides[sn].base, path);
  const shown = textField && typeof v === "string" && loc(v) ? loc(v) : null;
  if (shown) {
    inp.value = shown;
    n.dataset.shown = "1";
  }
  inp.addEventListener("input", () => set(shown && typeof orig === "string" && loc(orig) === inp.value ? orig : inp.value));
  if (textField) {
    inp.placeholder = T.textFieldHint;
    return h("span", { class: "w loc-w" }, inp, locSearch(inp, (k) => { inp.value = loc(k); set(k); }, /Desc/i.test(key || "") ? 200 : 40));
  }
  return inp;
}
function statInfo(sn, path) {
  if (path[path.length - 1] !== "Value") return null;
  const par = getAt(ed.sides[sn].edit, path.slice(0, -1));
  if (!isObj(par) || !("OperationType" in par)) return null;
  const op = String(par.OperationType);
  return { op, max: modMaxRank(sn), pct: showsPercent(par, op), additive: scalesWithRank(op) };
}
const fmtNum = (x) => String(+x.toFixed(4));
const statAt = (v, st, rank) => (st.additive ? v * (rank + 1) : v) * (st.pct ? 100 : 1);
function statText(v, st) {
  const f = (rank) => {
    const x = statAt(v, st, rank);
    if (!st.additive) return "×" + fmtNum(v);
    return (x >= 0 ? "+" : "") + fmtNum(x) + (st.pct ? "%" : "");
  };
  if (!st.additive) return fmt(T.gameOp, /^SET/.test(st.op) ? fmtNum(v) : f(0), enumLabel(st.op).toLowerCase());
  return st.max != null ? fmt(T.gameRankRange, f(0), f(st.max), st.max) : fmt(T.gamePerRank, f(0));
}

const GENERAL_STATS = new Set(["WEAPON_MELEE_HEAVY_CHARGE_SPEED","WEAPON_DAMAGE_IF_VICTIM_PROC_ACTIVE","WEAPON_INIT_DAMAGE_MOD","WEAPON_PARRY_COUNTER_CHANCE_STAGGER"]);
const isSpecialStat = (t) => !GENERAL_STATS.has(t) && statName(t).split(" ").length >= 5;
function statSelect(vals, v) {
  const groups = new Map(STAT_GROUPS.map(([g]) => [g, []]));
  for (const x of vals.filter((y) => statName(y) || y === v)) groups.get(isSpecialStat(x) ? T.specialEffects : STAT_GROUPS.find(([, re]) => re.test(x))[0]).push(x);
  return h("select", { class: "input mini" }, [...groups].filter(([, xs]) => xs.length).map(([g, xs]) =>
    h("optgroup", { label: g }, xs.sort((a, b) => statName(a).localeCompare(statName(b))).map((x) => h("option", { value: x, selected: x === v }, statName(x))))));
}

function newItem(sn, path, arr) {
  if (arr.length) return clone(arr[arr.length - 1]);
  const spec = leafSpec(sn, [...path, "0"]);
  return spec?.enum ? spec.enum[0] : "";
}
let treeFilter = "";
const nameHit = (k) => !isIdx(k) && (k + " " + labelOf(k)).toLowerCase().includes(treeFilter);
const deepHit = (k, v) => nameHit(k) || (isObj(v) && Object.entries(v).some(([kk, x]) => deepHit(kk, x)));
function node(sn, path, v, flt = treeFilter) {
  const s = ed.sides[sn];
  const id = sn + "|" + path.join(".");
  const exists = hasAt(s.base, path);
  const changed = !exists || !deepEq(getAt(s.base, path), v);
  const k = path[path.length - 1];
  const top = path.length === 1;
  const inArr = !top && Array.isArray(getAt(s.edit, path.slice(0, -1)));
  const n = h("div", { class: "node" + (changed ? " mod" : "") + (top ? " top" : "") });
  const inherited = top && exists && !s.ownKeys.includes(k);
  const acts = h("span", { class: "acts" },
    inArr && isObj(v) ? h("button", { class: "btn-x", title: T.duplicate, onclick: () => { record(sn, { t: "dup", path }); refresh(); } }, "⧉") : null,
    inherited && !isObj(v) ? null : h("button", {
      class: "btn-x", title: inherited ? T.emptyInherited : inArr ? T.removeItem : T.remove,
      onclick: () => {
        if (top && !exists) resetKey(sn, k);
        else if (inherited) { record(sn, { t: "set", path, v: Array.isArray(v) ? [] : {} }); refresh(); }
        else { record(sn, { t: "del", path }); refresh(); }
      },
    }, "×"));
  const label = keyLabel(path, k, inArr, v, restoreDot(sn, path));
  if (isObj(v)) {
    const narrow = !!flt && !nameHit(k);
    const open = ed.open.has(id) || ((narrow && deepHit(k, v) || changedOnly) && !ed.closed.has(id));
    const arr = Array.isArray(v);
    const count = arr ? v.length : Object.keys(v).length;
    const toggle = () => {
      if (open) { ed.open.delete(id); ed.closed.add(id); } else { ed.open.add(id); ed.closed.delete(id); }
      n.replaceWith(node(sn, path, getAt(s.edit, path), flt));
    };
    const sub = narrow ? flt : "";
    const show = ([kk, x]) => !narrow || deepHit(kk, x);
    n.append(h("div", { class: "line" },
      h("button", { class: "tw", onclick: toggle }, open ? "▾" : "▸"),
      Object.assign(label, { onclick: toggle, className: "k click" }),
      h("span", { class: "sum", onclick: toggle }, v.UpgradeType ? "" : arr ? (count === 1 ? T.oneItem : fmt(T.countItems, count)) : count === 1 ? T.oneField : fmt(T.countFields, count)),
      acts));
    if (open) {
      const changedAt = (kk) => { const p = [...path, kk]; return !hasAt(s.base, p) || !deepEq(getAt(s.base, p), getAt(s.edit, p)); };
      const quiet = ([kk, x]) => !arr && !narrow && kk !== "Value" && !changedAt(kk) && (x === "" || x === 0 || (isObj(x) && !Object.keys(x).length));
      const entries = Object.entries(v).filter(show).filter(([kk]) => !changedOnly || changedAt(kk));
      const extra = changedOnly ? 0 : entries.filter(quiet).length, full = ed.full.has(id);
      const kids = h("div", { class: "kids" }, entries.filter((e) => full || changedOnly || !quiet(e)).map(([kk, x]) => node(sn, [...path, kk], x, sub)));
      if (extra) kids.append(h("button", { class: "more-fields", type: "button", onclick: () => { full ? ed.full.delete(id) : ed.full.add(id); n.replaceWith(node(sn, path, getAt(s.edit, path), flt)); } }, full ? T.hideEmptyFields : (extra === 1 ? T.showOneField : fmt(T.showFields, extra))));
      if (arr) kids.append(h("button", { class: "btn btn-ghost add-item", onclick: () => { record(sn, { t: "push", path, v: newItem(sn, path, v) }); refresh(); } }, T.addItem));
      n.append(kids);
    }
    return n;
  }
  n.append(h("div", { class: "line" }, h("span", { class: "tw" }), label, leafWidget(sn, path, v, n), acts));
  n.append(h("div", { class: "loc" }, typeof v === "string" && loc(v) && !n.dataset.shown ? "“" + loc(v) + "”" : ""));
  return n;
}

function restoreAt(sn, path) {
  if (path.length === 1) { resetKey(sn, path[0]); return; }
  const base = ed.sides[sn].base;
  record(sn, hasAt(base, path) ? { t: "set", path, v: clone(getAt(base, path)) } : { t: "del", path });
  refresh();
}
const restoreDot = (sn, path) => h("button", { class: "dot-btn", type: "button", title: T.restoreValue, onclick: (e) => { e.stopPropagation(); restoreAt(sn, path); } });
function keyLabel(path, k, inArr, v, dot) {
  const el = h("span", { class: "k", title: path.join(".") }, dot);
  if (inArr) {
    const what = isObj(v) ? (v.UpgradeType ? statLine(v) : v.ItemType ? tail(String(v.ItemType)) : null) : null;
    el.append(h("span", { class: "nm" }, "#" + (+k + 1) + (what ? " " + what : "")));
    return el;
  }
  el.append(h("span", { class: "nm" }, labelOf(k)));
  return el;
}

const isBaseType = (p) => !!p && /Base\w*$/.test(tail(p)) && !p.startsWith("/Lotus/Types/") && !p.startsWith("/EE/");

function warnTip(text) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.setAttribute("width", "15");
  icon.setAttribute("height", "15");
  icon.innerHTML = '<path fill="currentColor" d="M8 1.2 15.3 14H.7L8 1.2Zm0 4.1c-.5 0-.8.4-.8.8l.2 3.9c0 .3.3.6.6.6s.6-.3.6-.6l.2-3.9c0-.4-.3-.8-.8-.8Zm0 6.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z"/>';
  return h("span", { class: "tip", tabindex: "0", onclick: (e) => e.preventDefault() }, icon, h("span", { class: "tip-box", role: "tooltip" }, text));
}

let changedOnly = false;
function expandAll() {
  const walk = (sn, path, v) => {
    if (!isObj(v)) return;
    if (path.length) ed.open.add(sn + "|" + path.join("."));
    for (const [k, x] of Object.entries(v)) walk(sn, [...path, k], x);
  };
  ed.closed.clear();
  for (const sn of Object.keys(ed.sides)) {
    if (!ed.sides[sn]?.edit || (ed.multi && sn !== "all")) continue;
    walk(sn, [], ed.sides[sn].edit);
    for (const src of Object.values(ed.sides[sn].origin || {})) ed.inhOpen.add(sn + "|" + src);
  }
  renderSides();
}
function collapseAll() {
  ed.open.clear();
  ed.closed.clear();
  ed.inhOpen.clear();
  renderSides();
}
function renderSide(sn) {
  const s = ed.sides[sn];
  const filter = (treeFilter = $("#key-filter").value.trim().toLowerCase());
  const match = (k) => (!filter || deepHit(k, s.edit[k])) && (!changedOnly || !(k in s.base) || !deepEq(s.base[k], s.edit[k]));
  const keys = Object.keys(s.edit).filter((k) => !HIDDEN(k));
  const pinned = (k) => ed.eye?.mode === "new" && sn === "item" && (k === "LocalizeTag" || k === "LocalizeDescTag");
  const own = keys.filter((k) => s.ownKeys.includes(k) || !(k in s.base) || pinned(k)).sort((a, b) => pinned(b) - pinned(a));
  const inherited = keys.filter((k) => !own.includes(k));
  const removed = s.ownKeys.filter((k) => !(k in s.edit));
  const removedInh = Object.keys(s.base).filter((k) => !s.ownKeys.includes(k) && !(k in s.edit) && !HIDDEN(k));
  const removedRow = (k) => h("div", { class: "node top removed" }, h("div", { class: "line" },
    h("span", { class: "tw" }), h("span", { class: "k" }, labelOf(k)), h("span", { class: "sum" }, "removed"),
    h("span", { class: "acts" }, h("button", { class: "btn-x", title: T.restore, onclick: () => resetKey(sn, k) }, "↺︎"))));
  const addWrap = h("div", { class: "add-wrap" });
  addWrap.append(h("button", { class: "btn", onclick: (e) => { e.stopPropagation(); openAddMenu(sn, addWrap); } }, T.addField));
  return h("div", { class: "sec", "data-side": sn },
    h("div", { class: "sec-head" },
      h("div", {}, h("div", { class: "sec-title" }, sn === "all" ? fmt(T.sharedMetadata, realSides().length) : sn === "item" ? T.item : T.storeItem),
        sn === "all" ? h("div", { class: "muted small" }, T.sharedMetadataHint) : sn === "store" ? h("code", { class: "muted small" }, s.path) : null),
      addWrap),
    h("div", { class: "tree" },
      own.filter(match).map((k) => node(sn, [k], s.edit[k])),
      removed.filter((k) => !filter || nameHit(k)).map(removedRow)),
    [...new Set([...inherited, ...removedInh].map((k) => s.origin[k]))].reverse().map((src) => {
      const ks = inherited.filter((k) => s.origin[k] === src);
      const gone = removedInh.filter((k) => s.origin[k] === src && (!filter || nameHit(k)));
      const gid = sn + "|" + src;
      const shown = ks.filter(match);
      if ((filter || changedOnly) && !shown.length && !gone.length) return null;
      return h("details", { class: "inh", open: filter || changedOnly ? true : ed.inhOpen.has(gid), ontoggle: (e) => { if (!filter && !changedOnly) e.target.open ? ed.inhOpen.add(gid) : ed.inhOpen.delete(gid); } },
        h("summary", {}, h("span", {}, `${ed.eye?.mode === "new" ? "Copied" : "Inherited"} from ${tail(src || "parent type")} (${ks.length})`), isBaseType(src) ? warnTip(fmt(T.parentEditHint, tail(src))) : null),
        h("div", { class: "tree" }, shown.map((k) => node(sn, [k], s.edit[k])), gone.map(removedRow)));
    }),
    !keys.length && !removed.length ? h("div", { class: "empty" }, T.noMetadataFound) : null,
    changedOnly && keys.length && !keys.some(match) && !removed.length && !removedInh.length ? h("div", { class: "empty" }, T.noChangesYet) : null);
}
const BASIC_GROUPS = new Set(["mod", "arcane", "suit", "weapon"]);
const isAdvanced = () => !!store.get("advancedEditor");
const useBasic = () => !isAdvanced() && BASIC_GROUPS.has(ed.group);
const findKey = (obj, prefix) => (isObj(obj) ? Object.keys(obj).find((k) => k.startsWith(prefix) && isObj(obj[k])) : undefined);
function basicLayout(e) {
  const general = [[T.name, ["LocalizeTag"]], [T.description, ["LocalizeDescTag"]], ["Icon", ["Icon"]]];
  const slots = () => Array.isArray(e.ArtifactSlots) && groups.push([T.polaritySlots, e.ArtifactSlots.map((_, i) => [fmt(T.slotN, i + 1), ["ArtifactSlots", String(i)]])]);
  const clean = (list) => list.filter(Boolean);
  const groups = [];
  if (ed.group === "suit") {
    general.push([T.passiveDescription, ["PassiveAbilityLocTag"]], [T.health, ["MaxHealthOverride"]], [T.shields, ["MaxShieldOverride"]], [T.armor, ["ArmourRatingOverride"]], [T.maxEnergy, ["MaxEnergy"]], [T.startingEnergy, ["InitialEnergy"]], [T.sprintSpeed, ["MovementSpeedMultiplier"]]);
    slots();
    if (Array.isArray(e.AbilityTypes)) groups.push([T.abilities, e.AbilityTypes.map((_, i) => [fmt(T.abilityN, i + 1), ["AbilityTypes", String(i)]])]);
  } else if (ed.group === "weapon") {
    const gun = Number(e.AmmoClipSize) > 0;
    general.push(gun && [T.magazineSize, ["AmmoClipSize"]], [T.masteryRequirement, ["RequiredLevel"]]);
    const modes = (Array.isArray(e.Behaviors) ? e.Behaviors : []).slice(0, e.AlternateFireDisabled ? 1 : undefined);
    const STATS = [[T.damage, "impact:", ["AttackData", T.amount]], [T.statusChanceFraction, "impact:", ["AttackData", "ProcChance"]], [T.critChanceFraction, "impact:", ["criticalHitChance"]], [T.criticalMultiplier, "impact:", ["criticalHitDamageMultiplier"]], [T.multishot, "fire:", ["fireIterations"]], [gun ? T.fireRate : T.attackSpeed, "state:", ["fireRate"]], [T.reloadTime, "state:", ["reloadTime"]]];
    const shared = [], per = modes.map(() => []);
    for (const [label, prefix, rest] of STATS.filter(([l]) => gun || !/^(Multishot|Reload)/.test(l))) {
      const paths = modes.map((b, i) => { const k = findKey(b, prefix); return k && hasAt(b[k], rest) ? ["Behaviors", String(i), k, ...rest] : null; });
      const found = paths.filter(Boolean);
      if (!found.length) continue;
      if (found.every((p) => getAt(e, p) === getAt(e, found[0]))) shared.push([label, found[0], found.slice(1)]);
      else paths.forEach((p, i) => p && per[i].push([label, p]));
    }
    if (shared.length) groups.push([T.stats, shared]);
    slots();
    per.forEach((rows, i) => rows.length && groups.push([i === 0 ? T.mainAttack : i === 1 ? T.alternateFire : fmt(T.attackN, i + 1), rows]));
  }
  return [[T.general, clean(general)], ...groups];
}
const renderBasic = (sn) => (ed.group === "mod" || ed.group === "arcane" ? renderActions(sn) : renderItemActions(sn));
const syncSide = debounce((sn) => {
  const el = document.querySelector(`#sides .sec[data-side="${sn}"]`);
  if (el && !el.contains(document.activeElement)) el.replaceWith(useBasic() ? renderBasic(sn) : renderSide(sn));
}, 150);

function renderSides() {
  syncPreview();
  const basic = useBasic();
  $("#view-edit").classList.toggle("basic", basic);
  $("#adv-toggle").checked = isAdvanced();
  $("#adv-toggle").closest("label").hidden = !BASIC_GROUPS.has(ed.group);
  if (basic) {
    const rules = ed.text.length;
    $("#sides").replaceChildren(rules ? h("p", { class: "muted small basic-note" }, rules === 1 ? T.oneRule : fmt(T.countRules, rules)) : "", renderBasic(ed.multi ? "all" : "item"));
    focusActionForm();
    return;
  }
  if (ed.multi) { $("#sides").replaceChildren(renderSide("all")); return; }
  $("#sides").replaceChildren(renderSide("item"), ed.sides.store ? renderSide("store") : "");
}
function renderFr() {
  $("#fr-list").replaceChildren(...ed.text.map((op, i) => h("div", { class: "chip" },
    h("code", {}, `${op.kind}|${op.from}|${op.to}`),
    h("button", { class: "btn-x", title: T.remove, onclick: () => { ed.text.splice(i, 1); replayAll(); refresh(); } }, "×"))));
  if (ed.text.length) $("#fr").hidden = false;
}
let addSide = "item";
const addMenu = $("#add-menu"), addSearch = $("#add-search"), addList = $("#add-list");
function addOptions() {
  const s = ed.sides[addSide];
  const g = addSide === "store" ? "store" : ed.group;
  const fields = FIELDS[g] || {};
  const missing = (k) => !(k in s.edit);
  const common = (addSide === "store" ? [] : COMMON[ed.group] || []).filter((k) => k in fields && missing(k));
  const known = Object.keys(fields).filter((k) => missing(k) && !common.includes(k) && !HIDDEN(k));
  const set = Object.keys(s.edit).filter((k) => !HIDDEN(k));
  return [["Common", common], [T.knownFields, known.sort((a, b) => labelOf(a).localeCompare(labelOf(b)))], [T.alreadySet, set]];
}
function drawAddMenu() {
  const q = addSearch.value.trim();
  const ql = q.toLowerCase();
  addList.replaceChildren();
  let n = 0, exact = false;
  for (const [grp, keys] of addOptions()) {
    const isSet = grp === T.alreadySet;
    if (isSet && !ql) continue;
    const f = keys.filter((k) => !ql || (labelOf(k) + " " + k).toLowerCase().includes(ql));
    if (!f.length) continue;
    if (f.some((k) => k.toLowerCase() === ql || labelOf(k).toLowerCase() === ql)) exact = true;
    addList.append(h("div", { class: "grp" }, grp));
    for (const k of f.slice(0, 400)) addList.append(h("button", { class: n++ === 0 ? "sel" : "", onclick: () => (isSet ? jumpToField(k) : pickField(k)) }, h("span", {}, labelOf(k)), isSet ? h("span", {}, T.goToField) : null));
  }
  if (q && !exact && /^[A-Za-z_][\w:]*$/.test(q)) {
    addList.append(h("div", { class: "grp" }, T.custom), h("button", { class: n ? "" : "sel", onclick: () => pickField(q) }, h("span", {}, labelOf(q)), h("span", {}, T.newField)));
  }
}

function pickField(k) {
  closeAddMenu();
  const g = addSide === "store" ? "store" : ed.group;
  record(addSide, { t: "addKey", path: [k], v: defaultFor(FIELDS[g]?.[k]) });
  ed.open.add(addSide + "|" + k);
  refresh();
  focusField(k);
}
function jumpToField(k) {
  closeAddMenu();
  const s = ed.sides[addSide];
  if (!s.ownKeys.includes(k) && k in s.base) ed.inhOpen.add(addSide + "|" + s.origin[k]);
  $("#key-filter").value = "";
  renderSides();
  focusField(k);
}
function focusField(k) {
  const el = [...document.querySelectorAll("#sides .node.top .k")].find((x) => x.title === k);
  el?.scrollIntoView({ block: "center" });
  el?.closest(".node")?.querySelector("input,select")?.focus();
}

function openAddMenu(sn, wrap) {
  addSide = sn;
  wrap.append(addMenu);
  addMenu.hidden = false;
  addSearch.value = "";
  drawAddMenu();
  addSearch.focus();
}
function closeAddMenu() { addMenu.hidden = true; }
function resetEditor(state, loading) {
  actionForm = null;
  previewKey = null;
  $("#card-preview").replaceChildren();
  ed = { name: "", sides: null, ops: [], text: [], actions: [], redo: [], full: new Set(), open: new Set(), closed: new Set(), inhOpen: new Set(), ...state };
  $("#eye-panel").hidden = true;
  $("#target-icon").removeAttribute("src");
  $("#parent-warn").hidden = true;
  $("#shared-warn").hidden = true;
  $("#sides").replaceChildren(h("div", { class: "empty" }, h("span", { class: "spinner" }), loading));
  $("#fr").hidden = true;
  $("#fr-list").replaceChildren();
  $("#key-filter").value = "";
  $("#output").innerHTML = "";
  restoreCond(null);
}
function restoreCond(cond) {
  [$("#cond-on").checked, $("#cond-mode").value, $("#cond-ver").value] = cond?.length === 3 ? cond : [false, "from", ""];
  syncCond();
}
function restoreDraft(draft) {
  if (!draft) return;
  ed.ops = (draft.ops || []).filter((o) => ed.sides[o.side]);
  ed.text = draft.text || [];
  ed.actions = draft.actions || [];
  ed.nextAction = draft.nextAction || 0;
  restoreCond(draft.cond);
  if (ed.ops.length || ed.text.length) toast(T.draftRestored);
}
async function showEditor(cat, path, eye = null) {
  resetEditor({ cat, path, eye, group: fieldGroup(cat, eye?.base || path) }, T.loadingMetadata);
  const mine = ed;
  $("#target-path").textContent = path;
  $("#target-name").textContent = tail(path);
  const draft = store.get("draft:" + (eye ? "eye:" + eye.mode + ":" : "") + path);
  const src = eye?.base || path;
  let item, storeItem;
  try {
    [item, storeItem] = await Promise.all([loadType(src), eye ? null : loadType(toStorePath(path)), loadDict().catch(() => null)]);
  } catch {
    $("#sides").replaceChildren(h("div", { class: "empty" }, OFFLINE));
    return;
  }
  if (ed !== mine) return;
  [item, storeItem] = await Promise.all([absolutize(item, src), absolutize(storeItem, toStorePath(path))]);
  if (ed !== mine) return;
  if (eye?.mode === "new" && item) item = { ...item, own: {}, parents: [], origin: Object.fromEntries(Object.keys(item.data).map((k) => [k, src])) };
  ed.sides = { item: makeSide(path, item), store: storeItem ? makeSide(toStorePath(path), storeItem) : null };
  if (eye) {
    const own = await loadType(toStorePath(src)).catch(() => null);
    const kind = catOfPath(src);
    const g = eye.mode === "new" && own ? { parent: toStorePath(src), category: "" } : await guessStore(src, kind);
    if (ed !== mine) return;
    const d = eye.mode === "asis" ? item?.data || {} : {};
    eye.hasStore = eye.mode === "asis" && !!own;
    const hidden = own?.data.ShowInMarket === 0;
    eye.unlock = { market: eye.mode === "asis" && /^MM_(EXCLUDED|HIDDEN)$/.test(d.MarketMode || ""), store: eye.hasStore ? [hidden && "ShowInMarket=1", hidden && !own.data.RegularPrice && "RegularPrice=1", own.data.ExcludeFromManifest && "ExcludeFromManifest=0"].filter(Boolean) : [] };
    eye.manifest = true;
    eye.store = { path: toStorePath(path), parent: g.parent, category: g.category, name: d.LocalizeTag || "", desc: d.LocalizeDescTag || "", icon: d.Icon || "" };
    if (draft?.eye) Object.assign(eye.store, draft.eye.store), (eye.manifest = draft.eye.manifest);
    drawEyePanel();
  }

  let entry;
  if (CATS[cat]) try { entry = (await loadList(cat)).find((i) => i.path === src); } catch {}
  if (ed.group === "mod" || ed.group === "arcane") await loadCompatLists();
  if (ed !== mine) return;
  ed.entry = entry;
  const name = eye?.mode === "new" ? tail(path) : ed.entry?.name || loc(ed.sides.item.eff.LocalizeTag) || tail(path);
  $("#target-name").textContent = name;
  const icon = ed.entry?.icon || ed.sides.item.eff.Icon;
  if (icon) setIcon($("#target-icon"), icon);
  const base = eye ? null : (item?.parents || []).find(isBaseType);
  $("#parent-warn").replaceChildren(...(base ? fmtNodes(ed.group === "suit" ? T.parentWarnSuit : T.parentWarn, h("a", { href: "#/edit?c=" + cat + "&p=" + encodeURIComponent(base) }, tail(base)), tail(base)) : []));
  $("#parent-warn").hidden = !base;
  if (!item) toast(T.noMetadataPath);
  if (eye?.mode === "new") $("#target-path").textContent = fmt(T.copyPath, path, src);

  ed.defaultName = name;
  ed.name = draft?.name ?? name;
  $("#patch-name").value = ed.name;
  restoreDraft(draft);
  replayAll();
  refresh();
}
async function guessStore(target, kind) {
  if (kind === "suit") return { parent: "/Lotus/Types/Game/StoreItemSpecializations/PowerSuitStoreItem", category: "Suits" };
  if (kind === "weapon") {
    let category = "LongGuns";
    try { category = (await loadList("weapon")).find((i) => i.path === target)?.raw.productCategory || category; } catch {}
    return { parent: "/Lotus/Types/Game/StoreItemSpecializations/LotusWeaponStoreItem", category };
  }
  if (/\/(Skins|Accessory)\//.test(target) || (await loadCustoms()).some((c) => c.path === target))
    return { parent: "/Lotus/Types/Game/StoreItemSpecializations/LotusSuitCustomizationStoreItem", category: "WeaponSkins" };
  return { parent: "/Lotus/Types/Game/StoreItems/AutoStoreItem", category: "" };
}

let customsPromise = null;
function loadCustoms() {
  if (!customsPromise) customsPromise = Promise.all([getJSON(`${PEP}/ExportCustoms.json`), loadDict()]).then(([c]) =>
    Object.entries(c).map(([path, e]) => ({ path, name: cleanName(e.name, path), icon: e.icon }))).catch(() => []);
  return customsPromise;
}

function eyeField(label, value, onInput, opts = {}) {
  const input = opts.options
    ? h("select", { class: "input mini" }, opts.options.map((o) => h("option", { value: o, selected: o === value }, o || T.none)))
    : h("input", { class: "input mini", value, spellcheck: "false", autocomplete: "off", placeholder: opts.placeholder || "" });
  input.addEventListener(opts.options ? "change" : "input", () => { onInput(input.value); renderOutput(); });
  return h("label", { class: "eye-field" }, h("span", { class: "label" }, label), input);
}
function itemText(key) {
  const s = ed.sides.item, v = s.edit?.[key];
  return typeof v === "string" && !deepEq(v, s.eff[key]) ? v : "";
}
function drawEyePanel() {
  const e = ed.eye, st = e.store, el = $("#eye-panel");
  el.hidden = false;
  const cats = [...new Set(["", st.category, ...(FIELDS.store?.ProductCategory?.enum || [])])];
  const isNew = e.mode === "new";
  const same = (what) => (isNew ? fmt(T.sameAsItem, what) : T.textKeyHint);
  el.replaceChildren(...[
    isNew ? h("p", { class: "muted small" }, fmtNodes(T.copyNote, h("code", {}, tail(ed.path)), h("code", {}, tail(e.base)))) : null,
    e.hasStore
      ? h("p", { class: "muted small" }, T.hasStoreItem)
      : h("details", { class: "eye-more" }, h("summary", {}, T.storeItemSettings),
          h("div", { class: "eye-grid" },
            eyeField(T.storeItemPath, st.path, (v) => (st.path = v.trim())),
            eyeField(T.storeParent, st.parent, (v) => (st.parent = v.trim())),
            st.parent.startsWith("/Lotus/StoreItems/") ? h("span", { class: "muted small eye-note" }, T.storeCategoryInherited) : eyeField(T.category, st.category, (v) => (st.category = v), { options: cats }),
            eyeField(T.storeName, st.name, (v) => (st.name = v), { placeholder: same("name") }),
            eyeField(T.storeDescription, st.desc, (v) => (st.desc = v), { placeholder: same("description") }),
            eyeField(T.storeIcon, st.icon, (v) => (st.icon = v), { placeholder: "/Lotus/Interface/Icons/…" }))),
    h("label", { class: "check" }, Object.assign(h("input", { type: "checkbox", checked: e.manifest }), { onchange: (ev) => { e.manifest = ev.target.checked; renderOutput(); } }), h("span", {}, T.addToMarket))].filter(Boolean));
}
async function showMulti(cat, paths) {
  resetEditor({ cat, path: paths[0], paths, multi: true, group: fieldGroup(cat, paths[0]) }, fmt(T.loadingItems, paths.length));
  $("#target-icon").style.visibility = "hidden";
  $("#target-name").textContent = fmt(T.countItems, paths.length);
  $("#target-path").textContent = paths.join("  &  ");
  const draft = store.get("draft:multi:" + paths.join("|"));
  let types, stores;
  try {
    await loadDict().catch(() => null);
    types = await Promise.all(paths.map(async (p) => absolutize(await loadType(p), p)));
    stores = await Promise.all(paths.map(async (p) => (p.startsWith("/Lotus/StoreItems/") ? null : absolutize(await loadType(toStorePath(p)), toStorePath(p)))));
  } catch {
    $("#sides").replaceChildren(h("div", { class: "empty" }, OFFLINE));
    return;
  }
  if (!ed || ed.paths !== paths) return;
  const missing = paths.filter((_, i) => !types[i]);
  if (missing.length) toast(fmt(T.notFoundList, missing.map(tail).join(", ")));
  ed.sides = {};
  paths.forEach((p, i) => {
    ed.sides["m" + i] = makeSide(p, types[i]);
    if (stores[i]) ed.sides["s" + i] = makeSide(toStorePath(p), stores[i]);
  });
  ed.sides.all = { path: "", origin: {}, ownKeys: [] };
  const byPath = new Map((await loadAllLists()).map((i) => [i.path, i.name]));
  await loadCompatLists();
  if (!ed || ed.paths !== paths) return;
  const names = paths.map((p) => byPath.get(p) || tail(p));
  $("#target-name").textContent = names.length > 3 ? `${names.slice(0, 3).join(", ")} and ${names.length - 3} more` : names.join(", ");
  ed.defaultName = names.join(", ");
  ed.name = draft?.name ?? ed.defaultName;
  $("#patch-name").value = ed.name;
  restoreDraft(draft);
  replayAll();
  refresh();
}
function syncCond() {
  const on = $("#cond-on").checked;
  $("#cond-opts").hidden = !on;
  const noVersion = $("#cond-mode").value === "newtypes";
  $("#cond-ver").hidden = !on || noVersion;
  $("#cond-warn").hidden = !on || noVersion || !!$("#cond-ver").value.trim();
}

function initEditor() {
  addMenu.onclick = (e) => e.stopPropagation();
  document.addEventListener("click", closeAddMenu);
  addSearch.addEventListener("input", drawAddMenu);
  addSearch.addEventListener("keydown", (e) => {
    const btns = [...addList.querySelectorAll("button")];
    const i = btns.findIndex((b) => b.classList.contains("sel"));
    if (e.key === "Escape") closeAddMenu();
    else if (e.key === "Enter") { e.preventDefault(); btns[i]?.click(); }
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const j = Math.max(0, Math.min(btns.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)));
      btns[i]?.classList.remove("sel");
      btns[j]?.classList.add("sel");
      btns[j]?.scrollIntoView({ block: "nearest" });
    }
  });
  $("#patch-name").addEventListener("input", (e) => { ed.name = e.target.value; renderOutput(); });
  pathSearch($("#cond-ver"), () => loadBuilds().then((list) => list.map(([v, l]) => ({ name: v, shown: l, path: v }))).catch(() => []));
  $("#cond-mode").addEventListener("change", () => { syncCond(); renderOutput(); });
  $("#cond-on").addEventListener("change", () => { syncCond(); renderOutput(); });
  for (const type of ["input", "change"]) $("#cond-ver").addEventListener(type, () => { syncCond(); renderOutput(); });
  $("#key-filter").addEventListener("input", debounce(() => { if (!ed?.sides) return; ed.closed.clear(); renderSides(); }, 120));
  $("#adv-toggle").addEventListener("change", (e) => { store.set("advancedEditor", e.target.checked); if (ed?.sides) renderSides(); });
  $("#changed-only").addEventListener("change", (e) => { changedOnly = e.target.checked; if (ed?.sides) { ed.closed.clear(); renderSides(); } });
  $("#btn-expand").onclick = () => { if (ed?.sides) expandAll(); };
  $("#btn-collapse").onclick = () => { if (ed?.sides) collapseAll(); };
  $("#btn-fr").onclick = () => { $("#fr").hidden = !$("#fr").hidden; if (!$("#fr").hidden) $("#fr-from").focus(); };
  $("#fr-add").onclick = () => {
    const from = $("#fr-from").value, to = $("#fr-to").value;
    if (!from || !ed?.sides) return;
    const kind = $("#fr-regex").checked ? "s" : "r";
    if (kind === "r" && from.includes("|")) { toast(T.searchNoPipe); return; }
    if (kind === "s") { try { new RegExp(from); } catch { toast(T.invalidRegex); return; } }
    ed.text.push({ kind, from, to });
    $("#fr-from").value = $("#fr-to").value = "";
    replayAll();
    refresh();
  };
  $("#btn-reset").onclick = () => {
    if (!ed?.sides || !confirm(T.resetConfirm)) return;
    ed.ops = [];
    ed.text = [];
    ed.actions = [];
    ed.redo = [];
    actionForm = null;
    replayAll();
    refresh();
  };
  $("#btn-copy").onclick = () => copyText(buildPatch());
  $("#btn-save").onclick = () => { if (ed?.sides) saveText(ed.name || tail(ed.path), buildPatch(), T.untitled); };
}