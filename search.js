"use strict";
function suggestBox(input, box) {
  let items = [], sel = -1;
  const close = () => { box.hidden = true; sel = -1; };
  const show = (list) => { items = list; box.replaceChildren(...items); box.hidden = !items.length; sel = -1; };
  input.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = Math.max(0, Math.min(items.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1)));
      items.forEach((b, i) => b.classList.toggle("sel", i === sel));
      items[sel]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && sel >= 0) {
      e.preventDefault();
      items[sel].dispatchEvent(new MouseEvent("mousedown"));
    } else if (e.key === "Escape") close();
  });
  input.addEventListener("blur", close);
  return { show, close };
}
function namePaths(items, byName) {
  const count = new Map();
  for (const i of items) count.set(i.name.toLowerCase(), (count.get(i.name.toLowerCase()) || 0) + 1);
  const named = items.map((i) => ({ path: i.path, flag: i.flag, shown: i.name, name: count.get(i.name.toLowerCase()) > 1 ? i.name + " (" + tail(i.path) + ")" : i.name }));
  for (const i of named) byName.set(i.name.toLowerCase(), i.path);
  return named;
}
const plain = (s) => s.toLowerCase().replace(/[^a-z0-9/]+/g, " ").trim();
function pathSearch(input, load) {
  const box = h("div", { class: "sugg path-sugg", hidden: true });
  input.after(box);
  const list = suggestBox(input, box);
  let data = null, search = 0, ranked = [], shown = 0;
  const choose = (i) => { search++; input.value = i.name; list.close(); input.dispatchEvent(new Event("change")); };
  const row = (i) => h("button", { type: "button", onmousedown: (e) => { e.preventDefault(); choose(i); } }, h("span", { class: "pn" }, i.shown || i.name, i.flag ? flagIcon(i.flag) : null), h("span", { class: "pp" }, i.path.replace(/^\/Lotus\//, "")));
  const draw = (count) => { const top = box.scrollTop; shown = Math.min(count, ranked.length); list.show(ranked.slice(0, shown).map(row)); box.scrollTop = top; };
  box.addEventListener("wheel", (e) => {
    if (e.deltaY <= 0 || shown >= ranked.length) return;
    if (box.scrollTop + box.clientHeight >= box.scrollHeight - 2) draw(shown + 12);
  }, { passive: true });
  input.addEventListener("focus", async () => { data ||= await load(); });
  input.addEventListener("input", debounce(async () => {
    const id = ++search, q = input.value.trim().toLowerCase(), qn = plain(q), words = qn.split(" ").filter(Boolean);
    data ||= await load();
    if (id !== search) return;
    const hits = q.length < 2 ? [] : data.map((i) => {
      const n = plain(i.name), at = n.indexOf(qn);
      const rank = n === qn ? 0 : at === 0 ? 1 : at > 0 ? 2 : words.every((w) => n.includes(w)) ? 3 : (i.path + " " + (i.shown || "")).toLowerCase().includes(q) ? 4 : -1;
      return [rank, i];
    }).filter(([r]) => r >= 0).sort((a, b) => a[0] - b[0] || a[1].name.length - b[1].name.length).map(([, i]) => i);
    const done = hits.length === 1 && [hits[0].name.toLowerCase(), hits[0].path.toLowerCase()].includes(q);
    ranked = done ? [] : hits;
    box.scrollTop = 0;
    draw(12);
  }, 120));
}