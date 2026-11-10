"use strict";
const CHOICES = [
  { cat: "suit", name: "Suit", sub: T.tileSuitDesc, icon: "/Lotus/Interface/Icons/StoreIcons/Warframes/Excalibur.png" },
  { cat: "weapon", name: "Weapon", sub: T.tileWeaponDesc, icon: "/Lotus/Interface/Icons/StoreIcons/Weapons/MeleeWeapons/Weapons/Nikana.png" },
  { cat: "upgrade", name: T.modsArcanes, sub: T.tileModDesc, icon: "/Lotus/Interface/Cards/Images/AvatarMods/AbilityDurationMod.png" },
  { href: "#/eye", name: T.sentientBuilder, sub: T.tileSentientDesc, icon: "/Lotus/Interface/Graphics/AntiqueMods/SentientBackFrame.png" },
];

function initHome() {
  $("#btn-start").onclick = () => (location.hash = "#/pick");
  $("#btn-check").onclick = () => (location.hash = "#/check");
  $("#choose").replaceChildren(...CHOICES.map((c) => h("a", { class: "choice", href: c.href || "#/pick/" + c.cat },
    c.icon ? h("img", { src: IMG + c.icon, alt: "", onerror: hideBroken }) : null,
    h("span", { class: "nm" }, c.name), c.sub ? h("span", { class: "muted small" }, c.sub) : null)));
}
const MOD_FLAGS = {
  impostor: {
    label: T.impostor,
    text: T.impostorDesc,
    svg: '<svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true" stroke="#0b0b0b" stroke-width="1.4" stroke-linejoin="round"><rect x="4.3" y="11.5" width="5.4" height="12" rx="2.6" fill="#e2312b"/><path d="M8.6 11.2C8.6 6 11.6 3.2 16.4 3.2c4.9 0 8.2 2.4 8.2 6.8V23c0 2.4-.8 4.6-1.6 5.6h-4.2v-3.9c-1-.5-2.9-.5-3.9 0v3.9h-4.1c-.9-.9-1.5-3-1.6-5.4Z" fill="#e2312b"/><rect x="14.6" y="7.4" width="12.6" height="7.4" rx="3.7" fill="#b9c0c8"/></svg>',
  },
  flawed: {
    label: T.flawed,
    text: T.flawedDesc,
    svg: `<img src="${IMG}/Lotus/Interface/Icons/Antivirus/Broken.png" width="20" height="20" alt="" loading="lazy">`,
  },
};
function flagIcon(flag) {
  const el = h("span", { class: "mod-flag " + flag, title: MOD_FLAGS[flag].label });
  el.innerHTML = MOD_FLAGS[flag].svg;
  return el;
}
function modBadge(flag) {
  const f = MOD_FLAGS[flag];
  const el = h("span", { class: "tip mod-flag " + flag, tabindex: "0" });
  el.innerHTML = f.svg + `<span class="tip-box" role="tooltip"><strong>${f.label}</strong><br>${esc(f.text)}</span>`;
  return el;
}

function drawLegend(cat) {
  const el = $("#pick-legend");
  el.hidden = cat !== "upgrade";
  if (el.hidden || el.childElementCount) return;
  Object.keys(MOD_FLAGS).forEach((k) => {
    el.append(h("span", { class: "legend-item" }, flagIcon(k), MOD_FLAGS[k].label));
  });
}
const pick = { cat: null, sub: null, items: [], shown: 0, filtered: [], multi: false, chosen: new Set() };
function drawChosen() {
  const n = pick.chosen.size;
  $("#multi-bar").hidden = !pick.multi;
  $("#multi-count").textContent = n ? `${n} selected` : T.selectHint;
  $("#multi-open").disabled = n < 2;
  $("#btn-multi").classList.toggle("on", pick.multi);
  $("#btn-multi").textContent = pick.multi ? T.cancelSelection : T.selectMultiple;
}

function initMulti() {
  $("#btn-multi").onclick = () => {
    pick.multi = !pick.multi;
    if (!pick.multi) pick.chosen.clear();
    for (const c of document.querySelectorAll("#grid .card")) c.classList.toggle("picked", pick.chosen.has(c.dataset.path));
    drawChosen();
  };
  $("#multi-clear").onclick = () => {
    pick.chosen.clear();
    for (const c of document.querySelectorAll("#grid .card.picked")) c.classList.remove("picked");
    drawChosen();
  };
  $("#multi-open").onclick = () => {
    if (pick.chosen.size < 2) return;
    location.hash = "#/edit?c=" + pick.cat + [...pick.chosen].map((p) => "&p=" + encodeURIComponent(p)).join("");
  };
}
const PAGE = 180;

async function showPicker(cat) {
  if (!CATS[cat]) cat = "weapon";
  drawLegend(cat);
  for (const b of $("#cats").children) b.classList.toggle("on", b.dataset.cat === cat);
  if (pick.cat !== cat) {
    pick.cat = cat;
    pick.chosen.clear();
    drawChosen();
    pick.sub = null;
    $("#grid").replaceChildren();
    $("#subcats").replaceChildren();
    $("#pick-status").innerHTML = '<span class="spinner"></span>' + T.loadingItems;
    try {
      pick.items = await loadList(cat);
    } catch (e) {
      $("#pick-status").textContent = OFFLINE;
      pick.cat = null;
      return;
    }
    if (pick.cat !== cat) return;
    const subs = [...new Set(pick.items.map((i) => i.sub))];
    const order = Object.values(CATS[cat].sub).concat([T.mods, T.arcanes, T.other]);
    subs.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    $("#subcats").replaceChildren(
      h("button", { class: "on", onclick: () => setSub(null) }, T.all),
      ...subs.map((s) => h("button", { "data-sub": s, onclick: () => setSub(s) }, s)),
    );
  }
  filterPicker();
  $("#search").focus();
}

function setSub(s) {
  pick.sub = s;
  for (const b of $("#subcats").children) b.classList.toggle("on", (b.dataset.sub || null) === s);
  filterPicker();
}

function filterPicker() {
  const raw = $("#search").value.trim().toLowerCase(), byPath = raw.includes("/"), q = (byPath ? raw : plain(raw)).split(/\s+/).filter(Boolean);
  pick.filtered = pick.items.filter((i) => (!pick.sub || i.sub === pick.sub) && q.every((w) => (byPath ? i.path.toLowerCase() : plain(i.name + " " + (i.flag || ""))).includes(w)));
  pick.shown = 0;
  $("#grid").replaceChildren();
  morePicker();
}

function morePicker() {
  const grid = $("#grid");
  $(".more", grid)?.remove();
  const next = pick.filtered.slice(pick.shown, pick.shown + PAGE);
  pick.shown += next.length;
  grid.append(...next.map((it) =>
    h("button", { class: "card" + (pick.chosen.has(it.path) ? " picked" : ""), "data-path": it.path, onclick: (e) => {
      if (!pick.multi) { location.hash = "#/edit?c=" + it.cat + "&p=" + encodeURIComponent(it.path); return; }
      pick.chosen.has(it.path) ? pick.chosen.delete(it.path) : pick.chosen.add(it.path);
      e.currentTarget.classList.toggle("picked", pick.chosen.has(it.path));
      drawChosen();
    } },
      it.icon ? h("img", { src: IMG + it.icon, loading: "lazy", alt: "", onerror: hideBroken }) : h("img", { alt: "" }),
      h("span", { class: "nm" }, it.name),
      it.flag ? modBadge(it.flag) : null,
    )));
  $("#pick-status").textContent = `${pick.filtered.length} item${pick.filtered.length === 1 ? "" : "s"}`;
  if (pick.shown < pick.filtered.length) {
    const sentinel = h("div", { class: "more", style: "grid-column:1/-1;height:1px" });
    grid.append(sentinel);
    new IntersectionObserver((ents, obs) => {
      if (ents[0].isIntersecting) { obs.disconnect(); morePicker(); }
    }, { rootMargin: "600px" }).observe(sentinel);
  }
}

function initBlank() {
  const form = $("#blank-form"), input = $("#blank-path");
  const byName = new Map();
  pathSearch(input, async () => namePaths(await loadAllLists(), byName));
  $("#btn-blank").onclick = () => {
    form.hidden = !form.hidden;
    if (!form.hidden) input.focus();
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const typed = input.value.trim();
    const parts = byName.has(typed.toLowerCase()) ? [typed] : typed.split(/[\s,&]+/).filter(Boolean);
    const paths = [...new Set(parts.map((x) => byName.get(x.toLowerCase()) || normalizePath(x)).filter(Boolean))];
    if (!paths.length) return;
    location.hash = "#/edit?c=" + catOfPath(paths[0]) + paths.map((p) => "&p=" + encodeURIComponent(p)).join("");
  };
}