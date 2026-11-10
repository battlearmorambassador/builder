"use strict";
function braceDepth(str) {
  let d = 0, q = false;
  for (const c of str) {
    if (c === '"') q = !q;
    else if (!q && c === "{") d++;
    else if (!q && c === "}") d--;
  }
  return d;
}
const ONE_LINE_OBJECT = /\{[^{}]*=[^{}]*\}/;
const ONE_LINE_MESSAGE = T.checkOneLineObject;
function parsePatchText(text) {
  const diags = [];
  const add = (line, sev, msg) => diags.push({ line, sev, msg });
  const patches = [];
  let patch = null, amp = false;
  const blocks = [];
  const close = () => {
    if (patch && patch.depth > 0) add(patch.depthLine, "error", T.checkUnclosedBrace);
  };
  const start = (ln) => {
    close();
    patch = { line: ln, keys: [], keyLines: [], prefix: [], q: [], a: [], r: [], s: [], flags: [], newType: null, depth: 0, depthLine: 0, inCond: blocks.length > 0 };
    patches.push(patch);
  };
  const addKeys = (str, ln) => {
    for (const k of str.split("&")) {
      const key = k.trim();
      if (!key) continue;
      if (!key.startsWith("/")) add(ln, "error", fmt(T.checkInvalidPath, esc(key)));
      else if (/\s/.test(key)) add(ln, "warning", fmt(T.checkPathSpaces, esc(key)));
      patch.keys.push(key);
      patch.keyLines.push(ln);
    }
  };
  const inScope = (ln, instr) => {
    if (!patch || !patch.keys.length) {
      add(ln, "error", T.checkOutsidePatch);
      return false;
    }
    if (instr && patch.newType) {
      add(ln, "warning", T.checkNewTypeInstructions);
      return false;
    }
    return true;
  };
  const condCheck = (ln, cond) => {
    if (!cond.trim()) { add(ln, "error", T.checkConditionEmpty); return; }
    if (/\bcan_add_new_types\b(?!\s*\()/.test(cond)) add(ln, "error", T.checkNeedsParens);
    if (/(^|[^"\d.])\d{4}\.\d{2}\.\d{2}/.test(cond)) add(ln, "error", T.checkQuoteBuild);
    const allowed = new Set(["can_add_new_types", "compareversions", "owf_get_build_version", "and", "or", "not", "true", "false", "nil"]);
    const names = (cond.replace(/"[^"]*"/g, "").match(/[A-Za-z_]\w*/g) || []).filter((n) => !allowed.has(n));
    if (names.length) add(ln, "error", fmt(T.checkUnknownName, esc(names.join(", "))));
    for (const m of cond.matchAll(/"([^"]*)"/g)) if (!/^\d{4}(\.\d{2}){4}$/.test(m[1])) add(ln, "warning", fmt(T.checkBadBuild, esc(m[1])));
    let d = 0;
    for (const c of cond) { if (c === "(") d++; if (c === ")" && --d < 0) break; }
    if (d !== 0) add(ln, "error", T.checkParentheses);
    if (/compareversions\s*\([^)]*\)\s*$/.test(cond)) add(ln, "warning", T.checkCompareResult);
  };

  text.split("\n").forEach((rawLine, i) => {
    const ln = i + 1;
    const line = rawLine.replace(/\r$/, "");
    const t = line.trim();
    if (t === "$if" || t.startsWith("$if ")) { condCheck(ln, t.slice(4)); blocks.push({ ln, hasElse: false }); return; }
    if (t === "$elseif" || t.startsWith("$elseif ")) {
      if (!blocks.length) add(ln, "error", T.checkStrayElseif);
      else { if (blocks.at(-1).hasElse) add(ln, "warning", T.checkElseifAfterElse); condCheck(ln, t.slice(8)); }
      return;
    }
    if (t.startsWith("$else")) {
      if (t !== "$else") add(ln, "warning", fmt(T.checkUnknownDirective, esc(t)));
      if (!blocks.length) add(ln, "error", T.checkStrayElse);
      else { if (blocks.at(-1).hasElse) add(ln, "warning", T.checkDuplicateElse); blocks.at(-1).hasElse = true; }
      return;
    }
    if (t.startsWith("$endif")) {
      if (!blocks.length) add(ln, "error", T.checkStrayEndif);
      else blocks.pop();
      return;
    }
    if (line.startsWith("/")) {
      if (patch && patch.depth > 0) add(ln, "error", T.checkSlashLine);
      if (amp) amp = false;
      else {
        add(ln, "warning", fmt(T.checkSlashDeprecated, esc(t)));
        start(ln);
      }
      let l = t;
      if (l.endsWith("&")) { amp = true; l = l.slice(0, -1); }
      addKeys(l, ln);
      return;
    }
    amp = false;
    if (t.startsWith("&")) {
      if (!patch) { add(ln, "error", T.checkAmpFollow); start(ln); }
      amp = true;
      let l = t.slice(1).trim();
      if (l.endsWith("&")) l = l.slice(0, -1);
      addKeys(l, ln);
    } else if (t.startsWith(">")) {
      start(ln);
      let l = t.slice(1).trim();
      if (l.endsWith("&")) { amp = true; l = l.slice(0, -1); }
      if (!l.trim() && !amp) add(ln, "error", T.checkPathAfterGt);
      addKeys(l, ln);
    } else if (t.startsWith("+")) {
      start(ln);
      const sep = t.indexOf("|", 1);
      if (sep < 0) { add(ln, "error", T.checkNeedsParent); return; }
      const path = t.slice(1, sep).trim(), parent = t.slice(sep + 1).trim();
      patch.newType = { path, parent, line: ln };
      addKeys(path, ln);
      if (!parent.startsWith("/")) add(ln, "error", T.checkParentPath);
    } else if (/^[rsqa]\|/.test(t)) {
      const kind = t[0];
      const sep = t.indexOf("|", 2);
      const what = { r: "find|replace", s: "regex|replacement", q: "path|value", a: "path|value" }[kind];
      if (sep < 0) { add(ln, "error", fmt(T.checkMalformed, kind, what)); return; }
      if (!inScope(ln, true)) return;
      const a = t.slice(2, sep), b = t.slice(sep + 1).replace(/\|+$/, "");
      if (!a) add(ln, "error", kind === "r" ? T.searchEmpty : kind === "s" ? T.regexEmpty : T.pathEmpty);
      if (kind === "s") {
        try { new RegExp(a.replace(/^\(\?[a-z]+\)/, "")); } catch (e) { add(ln, "error", fmt(T.invalidRegexMsg, esc(e.message))); }
      }
      if ((kind === "q" || kind === "a") && /\s/.test(a)) add(ln, "warning", T.checkFieldSpaces);
      if (kind === "q" && b === "") add(ln, "warning", T.checkValueEmpty);
      if (kind === "a" && braceDepth(b) !== 0) add(ln, "error", T.checkBraces);
      if (kind === "r" && a === b) add(ln, "info", T.checkReplacementChangesNothing);
      patch[kind].push({ ln, a, b });
    } else if (t.startsWith("$")) {
      if (!inScope(ln, true)) return;
      for (const f of t.slice(1).split(";")) {
        if (f === "clear" || f === "debug") patch.flags.push(f);
        else add(ln, "warning", fmt(T.checkUnknownFlag, esc(f)));
      }
    } else if (t && !t.startsWith("#")) {
      if (!inScope(ln, false)) return;
      if (patch.depth > 0) {
        if (patch.newType && ONE_LINE_OBJECT.test(t)) add(ln, "error", ONE_LINE_MESSAGE);
        if (t.startsWith("{") && patch.prevVal?.endsWith("}")) add(ln, "error", T.checkMissingComma);
        patch.prevVal = t;
        patch.depth += braceDepth(t);
        if (patch.depth < 0) add(ln, "error", T.checkExtraBrace);
        return;
      }
      const eq = t.indexOf("=");
      if (eq < 1) { add(ln, "warning", T.checkRawLine); return; }
      const key = t.slice(0, eq).trim(), val = t.slice(eq + 1).trim();
      if (patch.prefix.some((x) => x.key === key)) add(ln, "warning", fmt(T.checkSetTwice, esc(key)));
      if (val === "") add(ln, "warning", fmt(T.checkEmptyValue, esc(key)));
      if (patch.newType && ONE_LINE_OBJECT.test(val)) add(ln, "error", ONE_LINE_MESSAGE);
      const d = braceDepth(val);
      if (d < 0) add(ln, "error", T.checkExtraBrace);
      if (d > 0) { patch.depth = d; patch.depthLine = ln; }
      patch.prefix.push({ ln, key, val });
    }
  });
  close();
  for (const b of blocks) add(b.ln, "error", T.checkMissingEndif);
  if (!patches.some((p) => p.keys.length) && text.trim()) add(1, "error", T.checkNoPatchFound);
  for (const p of patches) {
    const empty = !p.prefix.length && !p.q.length && !p.a.length && !p.r.length && !p.s.length && !p.flags.length;
    if (p.keys.length && empty && !p.newType && !p.inCond) add(p.line, "info", T.checkEmptyPatch);
    if (p.flags.includes("clear") && !p.prefix.length) add(p.line, "warning", T.checkClearEmpty);
  }
  return { patches, diags };
}

function eeText(obj) {
  const val = (v) => {
    if (Array.isArray(v)) return v.length ? "{\n" + v.map(val).join(",\n") + "\n}" : "{}";
    if (v && typeof v === "object") return "{\n" + Object.entries(v).map(([k, x]) => k + "=" + val(x) + "\n").join("") + "}";
    return v === "" ? '""' : String(v);
  };
  return Object.entries(obj).map(([k, v]) => k + "=" + val(v) + "\n").join("");
}

async function verifyPatch(parsed) {
  const diags = [];
  const add = (line, sev, msg) => diags.push({ line, sev, msg });
  const uses = new Map();
  for (const p of parsed.patches) p.keys.forEach((k, i) => {
    if (!k.startsWith("/")) return;
    if (!uses.has(k)) uses.set(k, []);
    uses.get(k).push({ p, ln: p.keyLines[i] });
  });
  const newTypes = new Set(parsed.patches.filter((p) => p.newType).map((p) => p.newType.path));
  await Promise.all(parsed.patches.filter((p) => p.newType?.parent.startsWith("/") && !newTypes.has(p.newType.parent)).map(async (p) => {
    if (!(await loadType(p.newType.parent))) add(p.newType.line, "error", fmt(T.checkMissingParent, esc(p.newType.parent)));
  }));
  await Promise.all([...uses].map(async ([path, list]) => {
    const t = await loadType(path);
    if (!t) {
      if (!newTypes.has(path)) add(list[0].ln, "error", fmt(T.checkMissingPath, esc(path)));
      return;
    }
    if (newTypes.has(path)) add(list[0].ln, "warning", fmt(T.checkTypeExists, esc(tail(path))));
    const own = t.own, raw = eeText(own), name = esc(path.startsWith("/Lotus/StoreItems/") ? fmt(T.storeItemName, tail(path)) : tail(path));
    if (!Object.keys(t.data).length) {
      if (list.some(({ p }) => p.q.length || p.a.length || p.r.length || p.s.length)) add(list[0].ln, "info", fmt(T.checkNoFields, name));
      return;
    }
    for (const { p } of list) {
      for (const q of p.q) {
        const v = getAt(own, q.a.split("."));
        if (v === undefined) add(q.ln, "error", fmt(getAt(t.data, q.a.split(".")) !== undefined ? T.notInItemInherited : T.notInItem, esc(q.a), name));
        else if (isObj(v)) add(q.ln, "error", fmt(T.checkNotScalar, esc(q.a), name));
        else if (typeof v === "number" && (q.b.trim() === "" || isNaN(Number(q.b)))) add(q.ln, "error", fmt(T.checkNotNumber, esc(q.a), esc(q.b)));
      }
      for (const a of p.a) {
        const v = getAt(own, a.a.split("."));
        if (!Array.isArray(v)) add(a.ln, "error", fmt(v === undefined ? T.notListMissing : T.notListIn, esc(a.a), name));
        else if (v.length) {
          const want = isObj(v[0]) ? "object" : typeof v[0];
          const got = a.b.startsWith("{") ? "object" : /^[-+]?(\d+\.?\d*|\.\d+)$/.test(a.b) ? "number" : "string";
          if (want !== got) add(a.ln, "error", fmt(T.itemsMismatch, esc(a.a), { object: T.objects, string: T.strings, number: T.numbers }[want], { object: T.anObject, string: T.aString, number: T.aNumber }[got]));
        }
      }
      for (const r of p.r) if (r.a && !raw.includes(r.a)) add(r.ln, "warning", fmt(T.checkReplaceNoMatch, esc(r.a), name));
      for (const x of p.s) {
        const m = x.a.match(/^\(\?([a-z]+)\)/);
        let re = null;
        try { re = new RegExp(m ? x.a.slice(m[0].length) : x.a, (m ? m[1].replace(/[^ims]/g, "") : "")); } catch {}
        if (re && !re.test(raw)) add(x.ln, "warning", fmt(T.checkRegexNoMatch, esc(x.a), name));
      }
      for (const pr of p.prefix) {
        if (!(pr.key in t.data)) add(pr.ln, "info", fmt(T.checkWillAdd, esc(pr.key), name));
      }
    }
  }));
  return diags;
}

function pathList(p) {
  const keys = p.keys.map((k) => (p.newType && k === p.newType.path ? "+ " : "") + k);
  const el = h("span", { class: "rpath" });
  if (keys.length <= 3) {
    el.append(keys.join("  &  "));
    return el;
  }
  const full = h("span", { class: "rfull", hidden: true }, keys.map((k) => h("span", {}, k)));
  const more = h("button", { class: "rmore", type: "button", onclick: (e) => {
    e.stopPropagation();
    full.hidden = !full.hidden;
    more.textContent = full.hidden ? fmt(T.morePaths, keys.length - 1) : T.showLess;
  } }, fmt(T.morePaths, keys.length - 1));
  el.append(h("span", {}, keys[0]), " ", more, full);
  return el;
}
function initCheck() {
  const ta = $("#check-input"), gutter = $("#check-gutter");
  let run = 0;
  let patches = [];
  const draw = (diags, pending) => {
    const lines = ta.value.split("\n").length;
    const bad = new Set(diags.filter((d) => d.sev === "error").map((d) => d.line));
    gutter.innerHTML = Array.from({ length: lines }, (_, i) => (bad.has(i + 1) ? `<span class="bad">${i + 1}</span>` : i + 1)).join("\n");
    const order = { error: 0, warning: 1, info: 2 };
    diags.sort((a, b) => order[a.sev] - order[b.sev] || a.line - b.line);
    const n = (s) => diags.filter((d) => d.sev === s).length;
    const e = n("error"), w = n("warning");
    $("#check-summary").innerHTML = pending ? '<span class="spinner"></span>' + T.checkingGameData : ta.value.trim() ? `${e} error${e === 1 ? "" : "s"}, ${w} warning${w === 1 ? "" : "s"}` : "";
    const res = $("#check-results");
    if (!ta.value.trim()) { res.replaceChildren(h("div", { class: "ok" }, T.pasteHint)); return; }
    if (!diags.length && !pending) { res.replaceChildren(h("div", { class: "ok" }, T.noProblemsFound)); return; }
    const blocks = patches.filter((p) => p.keys.length).sort((a, b) => a.line - b.line);
    const owner = (line) => { let o = null; for (const p of blocks) if (p.line <= line) o = p; return o; };
    const groups = new Map([[null, []], ...blocks.map((p) => [p, []])]);
    const seen = new Set();
    for (const d of diags) if (!seen.has(d.line + d.msg) && seen.add(d.line + d.msg)) groups.get(owner(d.line)).push(d);
    const item = (d) => {
      const msg = h("span", { class: "msg" });
      msg.innerHTML = d.msg;
      return h("div", { class: "res " + d.sev, onclick: () => goLine(d.line) },
        h("span", { class: "ln" }, fmt(T.lineN, d.line)), h("span", { class: "sev" }, { error: T.error, warning: T.warning, info: T.note }[d.sev]), msg);
    };
    const count = (ds) => {
      const e = ds.filter((d) => d.sev === "error").length, w = ds.filter((d) => d.sev === "warning").length;
      return !ds.length ? T.noProblems : [e && `${e} error${e === 1 ? "" : "s"}`, w && `${w} warning${w === 1 ? "" : "s"}`, !e && !w && T.notesOnly].filter(Boolean).join(", ");
    };
    res.replaceChildren(...[...groups].filter(([, ds]) => ds.length).map(([p, ds]) => {
      const worst = ds.some((d) => d.sev === "error") ? "error" : ds.some((d) => d.sev === "warning") ? "warning" : "clean";
      return h("div", { class: "rgroup " + worst },
        h("div", { class: "rhead", onclick: () => p && goLine(p.line) },
          p ? pathList(p) : h("span", { class: "rpath" }, T.general),
          h("span", { class: "rcount" }, count(ds))),
        ds.map(item));
    }));
  };
  const goLine = (line) => {
    const parts = ta.value.split("\n");
    const start = parts.slice(0, line - 1).join("\n").length + (line > 1 ? 1 : 0);
    ta.focus();
    ta.setSelectionRange(start, start + parts[line - 1].length);
    ta.scrollTop = Math.max(0, (line - 4) * parseFloat(getComputedStyle(ta).lineHeight));
  };
  const check = debounce(async () => {
    const id = ++run;
    const parsed = parsePatchText(ta.value);
    patches = parsed.patches;
    if (!parsed.patches.length) { draw(parsed.diags, false); return; }
    draw(parsed.diags.slice(), true);
    let online = [];
    try { online = await verifyPatch(parsed); } catch { online = [{ line: 1, sev: "warning", msg: OFFLINE }]; }
    if (id === run) draw([...parsed.diags, ...online], false);
  }, 450);
  ta.addEventListener("input", check);
  ta.addEventListener("scroll", () => { gutter.scrollTop = ta.scrollTop; });
  ta.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end");
    check();
  });
  const load = (file) => file?.text().then((t) => { ta.value = t; ta.scrollTop = 0; check(); });
  $("#check-file").addEventListener("change", (e) => load(e.target.files[0]));
  const zone = ta.closest(".pane");
  const isFile = (e) => [...(e.dataTransfer?.types || [])].includes("Files");
  window.addEventListener("dragover", (e) => { if (isFile(e)) e.preventDefault(); });
  window.addEventListener("drop", (e) => { if (isFile(e)) e.preventDefault(); });
  zone.addEventListener("dragover", (e) => { if (!isFile(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; zone.classList.add("drop"); });
  zone.addEventListener("dragleave", (e) => { if (!zone.contains(e.relatedTarget)) zone.classList.remove("drop"); });
  zone.addEventListener("drop", (e) => {
    if (!isFile(e)) return;
    e.preventDefault();
    e.stopPropagation();
    zone.classList.remove("drop");
    load(e.dataTransfer.files[0]);
  });
  draw([], false);
}