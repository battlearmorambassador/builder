"use strict";

const BIN = "https://raw.githubusercontent.com/calamity-inc/warframe-packages-bin-data/senpai";
const PEP = "https://raw.githubusercontent.com/calamity-inc/warframe-public-export-plus/senpai";
const IMG = "https://browse.wf";

const CATS = {
  weapon: {
    exports: ["ExportWeapons"],
    sub: { LongGuns: "Primary", Pistols: "Secondary", Melee: "Melee", SpaceGuns: "Arch-gun", SpaceMelee: "Arch-melee", SentinelWeapons: "Companion", OperatorAmps: "Operator", DrifterMelee: "Drifter", SpecialItems: "Other" },
  },
  suit: {
    exports: ["ExportWarframes", "ExportSentinels"],
    sub: { Suits: "Warframe", SpaceSuits: "Archwing", MechSuits: "Necramech", Sentinels: "Sentinel", KubrowPets: "Companion", MoaPets: "Companion", SpecialItems: "Other" },
  },
  upgrade: {
    exports: ["ExportUpgrades", "ExportArcanes"],
    sub: {},
  },
};

const LABELS = {
  LocalizeTag: "Name", LocalizeDescTag: "Description", LongDesc: "Codex description", Icon: "Icon",
  ArtifactPolarity: "Polarity", ArtifactSlots: "Polarity slots", BaseDrain: "Base drain", FusionLimit: "Max rank",
  Rarity: "Rarity", ItemCompatibility: "Compatible with", ItemCompatibilities: "Compatible with (list)",
  IncompatibilityTags: "Incompatible with", CompatibilityTags: "Compatibility tags", OmegaAttenuation: "Riven disposition",
  MaxHealthOverride: "Health", MaxShieldOverride: "Shields", ArmourRatingOverride: "Armor", MaxEnergy: "Max energy",
  InitialEnergy: "Starting energy", MaxStaminaOverride: "Stamina", MovementSpeedMultiplier: "Sprint speed",
  AbilityTypes: "Abilities", PassiveAbilityLocTag: "Passive description", MarketMode: "Market visibility",
  ExcludeFromCodex: "Hide from codex", RequiredLevel: "Mastery requirement", PremiumPrice: "Platinum price",
  RegularPrice: "Credit price", SellingPrice: "Sell price", PrimeSellingPrice: "Ducat value", Tradeable: "Tradeable",
  Giftable: "Giftable", ShowInMarket: "Show in market", SearchTags: "Search tags", Upgrades: "Stats",
  ConditionalUpgrades: "Conditional stats", UpgradeEntries: "Upgrade entries", UpgradeChance: "Proc chance",
  UpgradeDuration: "Effect duration", ModSet: "Mod set", IsUtility: "Utility mod", IsStarter: "Starter (flawed)",
  CodexSecret: "Secret in codex", AvailableOnPvp: "Available in Conclave", AvailableOnPve: "Available in PvE",
  ProductCategory: "Category", TypeName: "Item type", DefaultUpgrades: "Default mods", DefaultSlottedUpgrades: "Default mods",
  DefaultWeapon: "Default weapon", AdditionalItems: "Bundled items", AmmoClipSize: "Magazine size",
  CriticalChance: "Critical chance", CriticalMultiplier: "Critical multiplier", Behaviors: "Behaviors (firing, damage…)",
  RecipeHelpText: "Recipe help text", UiName: "UI name", IsPrime: "Is prime", Diorama: "Diorama",
  DamageType: "Damage type", UpgradeType: "Stat", OperationType: "How it applies", Value: "Value",
  DisplayAsPercent: "Show as %", DisplayAsMultiplier: "Show as ×", LocTag: "Stat text", ValidType: "Only for type",
  ValidModifiers: "Only with modifiers", ValidProcTypes: "Only with procs", SmallerIsBetter: "Lower is better",
  RoundTo: "Round to", ReverseValueSymbol: "Reverse +/−", BuildPrice: "Build price (credits)", BuildTime: "Build time (s)",
  SkipBuildTimePrice: "Rush price (platinum)", Ingredients: "Ingredients", ResultItem: "Result item",
  Quality: "Quality", Polarities: "Polarities", HudBuffIcon: "Buff icon", StatusDescTag: "Status description",
};
const humanize = (k) => k.replace(/^.*:/, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/_/g, " ").replace(/\s+/g, " ").trim().toLowerCase().replace(/^./, (c) => c.toUpperCase());
const HIDDEN = (k) => /DateAdded|^Default\w*Colou?r|^AdditionalItems$/i.test(k);
const ENUMS = window.ENUMS_DATA || {};

const OP_NAMES = {
  ADD: "Add (+)", ADD_BASE: "Add to base value", MULTIPLY: "Multiply (×)", STACKING_MULTIPLY: "Add percent (stacks)",
  SET: "Set to value", SET_BASE: "Set base value", SET_MAX: "Cap at most", SET_MIN: "Raise to at least",
};
const STAT_NAMES = {
  AVATAR_POWER_MAX: "Energy max", AVATAR_POWER_RATE: "Energy regen", AVATAR_ABILITY_STRENGTH: "Ability strength",
  AVATAR_ABILITY_DURATION: "Ability duration", AVATAR_ABILITY_EFFICIENCY: "Ability efficiency", AVATAR_ABILITY_RANGE: "Ability range",
  AVATAR_ARMOUR: "Armor", AVATAR_HEALTH_MAX: "Health", AVATAR_SHIELD_MAX: "Shield capacity", AVATAR_SHIELD_RECHARGE_RATE: "Shield recharge",
  AVATAR_SHIELD_RECHARGE_DELAY: "Shield recharge delay", AVATAR_OVERSHIELD_MAX: "Overshield max", AVATAR_SPRINT_SPEED: "Sprint speed",
  AVATAR_CASTING_SPEED: "Casting speed", AVATAR_PARKOUR_BOOST: "Bullet jump", AVATAR_AURA_STRENGTH: "Aura strength",
  AVATAR_STAMINA_MAX: "Stamina", AVATAR_DAMAGE_TAKEN: "Damage taken", AVATAR_MOVEMENT_SPEED: "Movement speed",
  WEAPON_CRIT_CHANCE: "Critical chance", WEAPON_CRIT_DAMAGE: "Critical damage", WEAPON_PROC_CHANCE: "Status chance",
  WEAPON_PROC_TIME: "Status duration", WEAPON_PROC_DAMAGE: "Status damage", WEAPON_FIRE_ITERATIONS: "Multishot",
  WEAPON_FIRE_RATE: "Fire rate / attack speed", WEAPON_CLIP_MAX: "Magazine capacity", WEAPON_AMMO_MAX: "Ammo max",
  WEAPON_RELOAD_SPEED: "Reload speed", WEAPON_DAMAGE_AMOUNT: "Damage", WEAPON_PERCENT_BASE_DAMAGE_ADDED: "Added damage (elemental / physical)",
  WEAPON_MELEE_DAMAGE: "Melee damage", WEAPON_PUNCTURE_DEPTH: "Punch through", WEAPON_RECOIL: "Recoil", WEAPON_SPREAD: "Accuracy (spread)",
  WEAPON_ZOOM: "Zoom", WEAPON_RANGE: "Range", WEAPON_HEADSHOT_MULTIPLIER: "Headshot damage", WEAPON_PROJECTILE_SPEED: "Projectile speed",
  WEAPON_CHARGE_RATE: "Charge rate", WEAPON_HOLSTER_RATE: "Holster speed", GAMEPLAY_FACTION_DAMAGE: "Faction damage",
  WEAPON_MELEE_COMBO_DURATION_BONUS: "Combo duration", WEAPON_MELEE_HEAVY_CHARGE_SPEED: "Heavy attack wind up", WEAPON_LIFE_STEAL: "Life steal",
  WEAPON_EXPLOSION_RADIUS: "Blast radius", WEAPON_NOISE_REDUCTION: "Noise reduction", WEAPON_MELEE_FINISHER_DAMAGE: "Finisher damage",
  WEAPON_MELEE_SLAM_DAMAGE_BONUS: "Slam damage", WEAPON_AMMO_CONSUME_RATE: "Ammo efficiency", NONE: "None",
};
const STAT_GROUPS = [
  ["Warframe: abilities", /^AVATAR_(ABILITY|CASTING|AURA|POWER_DAMAGE)/],
  ["Warframe: energy", /^AVATAR_(POWER|ENERGY|SPAWN_ENERGY)/],
  ["Warframe: survival", /^AVATAR_(HEALTH|HEAL|SHIELD|OVERSHIELD|ARMOUR|DAMAGE|BLEEDOUT|REVIVE|INJURY|KNOCKDOWN|HEAVY_LAND|PROC_IMMUNITY|NO_DEATH|EVADE|MELEE_DAMAGE_REDUCTION|ALLOW_HEALTH|RESPAWN)/],
  ["Warframe: movement", /^AVATAR_(SPRINT|JUMP|AIR|NUM_JUMPS|SLIDE|PARKOUR|DODGE|ACROBATIC|MOVEMENT|JOG|DASH|FALL|STAMINA)/],
  ["Companion", /^(AVATAR_SENTINEL|CSUT_)/],
  ["Warframe: other", /^AVATAR_/],
  ["Weapon: critical", /^WEAPON_(CRIT|DOUBLE_CRIT|NOCRIT|LOW_CRIT|VICTIM_CRIT)/],
  ["Weapon: status", /^WEAPON_(PROC|SLASH_PROC|FORCED_PROC|RANDOM_PROC|OVERHEAT_PROC)/],
  ["Weapon: melee", /^WEAPON_(MELEE|PARRY|CHANNELING)/],
  ["Weapon: projectile", /^WEAPON_(PROJECTILE|PUNCTURE|RICOCHET|REFLECTION|EXPLOSION|GRENADE|CORPSE)/],
  ["Weapon: firing and ammo", /^WEAPON_(FIRE|CLIP|AMMO|RELOAD|AUTO_RELOAD|CHARGE|ADD_CHARGE|RECOIL|SPREAD|ZOOM|HOLSTER|INFINITE_CLIP|CONVERT_AMMO|LOCK_TIME|RANGE|NOISE|HEALTH_PCT_FOR_FULL_CLIP)/],
  ["Weapon: damage", /^WEAPON_/],
  ["K-Drive", /^VEHICLE_/],
  ["Gameplay", /^GAMEPLAY_/],
  ["Other", /./],
];
const statName = (v) => STAT_NAMES[v] || humanize(v.replace(/^(AVATAR|WEAPON|VEHICLE|GAMEPLAY|SKILL|CSUT)_/, ""));
const labelOf = (k) => LABELS[k] || humanize(k);

const ENUM_NAMES = {
  AP_ATTACK: "Madurai", AP_DEFENSE: "Vazarin", AP_TACTIC: "Naramon", AP_POWER: "Zenurik", AP_WARD: "Unairu",
  AP_PRECEPT: "Penjaga", AP_UMBRA: "Umbra", AP_ANY: "Any (Aura)", AP_FUSION: "Fusion", AP_UNIVERSAL: "Universal",
  DT_IMPACT: "Impact", DT_PUNCTURE: "Puncture", DT_SLASH: "Slash", DT_FIRE: "Heat", DT_FREEZE: "Cold",
  DT_ELECTRICITY: "Electricity", DT_POISON: "Toxin", DT_EXPLOSION: "Blast", DT_GAS: "Gas", DT_MAGNETIC: "Magnetic",
  DT_RADIATION: "Radiation", DT_VIRAL: "Viral", DT_CORROSIVE: "Corrosive", DT_FINISHER: "True", DT_RADIANT: "Void",
  DT_SENTIENT: "Tau", DT_ANY: "Any", COMMON: "Common", UNCOMMON: "Uncommon", RARE: "Rare", LEGENDARY: "Legendary",
  MM_HIDDEN: "Hidden", MM_VISIBLE: "Visible", ADD: "Add (+)", MULTIPLY: "Multiply (×)", STACKING_MULTIPLY: "Stacking add (+)",
  QA_NONE: "None", QA_LOW: "Low", QA_MEDIUM: "Medium", QA_HIGH: "High", QA_VERY_HIGH: "Very high",
};
const enumLabel = (v) => OP_NAMES[v] || ENUM_NAMES[v] || (v === "" ? "(none)" : /^[A-Z0-9_]+$/.test(v) ? humanize(v) : v);

const COMMON = {
  weapon: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactSlots", "RequiredLevel", "MarketMode", "ExcludeFromCodex"],
  suit: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactSlots", "MaxHealthOverride", "MaxShieldOverride", "ArmourRatingOverride", "MaxEnergy", "InitialEnergy", "MovementSpeedMultiplier", "AbilityTypes", "PassiveAbilityLocTag"],
  mod: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactPolarity", "BaseDrain", "FusionLimit", "Rarity", "ItemCompatibility", "IncompatibilityTags"],
  arcane: ["LocalizeTag", "LocalizeDescTag", "Icon", "Rarity", "FusionLimit", "ItemCompatibility"],
};

const $ = (s, el = document) => el.querySelector(s);
const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k in el && typeof v !== "string") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
  return el;
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (t.hidden = true), 1600);
}

const jsonCache = new Map();
function getJSON(url) {
  if (!jsonCache.has(url)) {
    jsonCache.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(r.status + " " + url);
      return r.json();
    }).catch((e) => { jsonCache.delete(url); throw e; }));
  }
  return jsonCache.get(url);
}

let DICT = null;
const loadDict = () => getJSON(PEP + "/dict.en.json").then((d) => (DICT = d));
const FIELDS = window.FIELDS_DATA || {};
const VERSIONS = window.VERSIONS_DATA || [];
const loc = (k) => (DICT && k && DICT[k]) || null;
const tail = (p) => p.split("/").pop();
const toStorePath = (p) => p.replace(/^\/Lotus\//, "/Lotus/StoreItems/");
const cleanName = (key, path) => (loc(key) || tail(path)).replace(/<[^>]+>\s*/g, "");
const hideBroken = (e) => (e.target.style.visibility = "hidden");

function eeInline(v) {
  if (Array.isArray(v)) return "{" + v.map(eeInline).join(",") + "}";
  if (v && typeof v === "object") return "{" + Object.entries(v).map(([k, x]) => k + "=" + eeInline(x)).join(",") + "}";
  if (typeof v === "number") return String(v);
  return eeStr(String(v));
}
const indent = (l) => l.replace(/^/gm, "    ");
function eeValue(v) {
  if (typeof v === "string" && /[|<]/.test(v)) return '"' + v.replace(/"/g, "'") + '"';
  if (!isObj(v)) return eeInline(v);
  const items = Array.isArray(v) ? v : Object.entries(v);
  if (!items.length) return "{}";
  if (Array.isArray(v) && !v.some(isObj)) return eeInline(v);
  const lines = Array.isArray(v) ? v.map(eeValue) : items.map(([k, x]) => k + "=" + eeValue(x));
  return "{\n" + lines.map(indent).join(Array.isArray(v) ? ",\n" : "\n") + "\n}";
}
function eeStr(s) {
  if (s === "") return '""';
  if (/[,{}="\n]/.test(s) || s !== s.trim()) return '"' + s.replace(/"/g, "'") + '"';
  return s;
}
const RELATIVE = /^[A-Za-z][A-Za-z0-9_]*[a-z][A-Za-z0-9_]*$/;
const NOT_PATH_KEY = /Loc|Desc|Tag|Name$|Text|Mesh|Anim|Sound|Script|Material/i;
async function absolutize(t, path) {
  if (!t) return t;
  const data = clone(t.data);
  const dir = (k) => { const o = t.origin[k] || path; return o.slice(0, o.lastIndexOf("/") + 1); };
  const found = new Map();
  const walk = (v, k, top) => {
    if (typeof v === "string") { if (RELATIVE.test(v) && !NOT_PATH_KEY.test(k)) found.set(dir(top) + v, null); }
    else if (Array.isArray(v)) v.forEach((x) => walk(x, k, top));
    else if (isObj(v)) for (const [kk, x] of Object.entries(v)) walk(x, kk, top);
  };
  for (const [k, v] of Object.entries(data)) walk(v, k, k);
  await Promise.all([...found.keys()].slice(0, 300).map((full) => getJSON(BIN + full + ".json").then(() => found.set(full, full), () => {})));
  const fix = (v, k, top) => {
    if (typeof v === "string") return RELATIVE.test(v) && !NOT_PATH_KEY.test(k) && found.get(dir(top) + v) ? dir(top) + v : v;
    if (Array.isArray(v)) return v.map((x) => fix(x, k, top));
    if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([kk, x]) => [kk, fix(x, kk, top)]));
    return v;
  };
  for (const k of Object.keys(data)) data[k] = fix(data[k], k, k);
  const own = Object.fromEntries(Object.keys(t.own).map((k) => [k, data[k]]));
  return { ...t, own, data };
}
async function loadType(path) {
  const chain = [];
  let cur = path;
  for (let depth = 0; cur && depth < 24; depth++) {
    let node;
    try { node = await getJSON(BIN + cur + ".json"); } catch { break; }
    chain.push({ path: cur, data: node.data || {} });
    const p = node.parent;
    if (!p) break;
    cur = p.startsWith("/") ? p : cur.slice(0, cur.lastIndexOf("/") + 1) + p;
  }
  if (!chain.length) return null;
  const effective = {};
  const origin = {};
  for (let i = chain.length - 1; i >= 0; i--) {
    Object.assign(effective, chain[i].data);
    for (const k in chain[i].data) origin[k] = chain[i].path;
  }
  return { own: chain[0].data, data: effective, origin, parents: chain.slice(1).map((c) => c.path) };
}

const listCache = {};
async function loadList(cat) {
  if (listCache[cat]) return listCache[cat];
  const def = CATS[cat];
  const [exports] = await Promise.all([Promise.all(def.exports.map((e) => getJSON(`${PEP}/${e}.json`))), loadDict()]);
  const items = [];
  exports.forEach((exp, i) => {
    const expName = def.exports[i];
    for (const [path, e] of Object.entries(exp)) {
      let sub;
      if (cat === "upgrade") sub = expName === "ExportArcanes" || path.includes("/CosmeticEnhancers/") ? "Arcanes" : "Mods";
      else sub = def.sub[e.productCategory] || "Other";
      const name = cleanName(e.name, path);
      const flag = e.isFrivolous ? "impostor" : e.isStarter ? "flawed" : null;
      items.push({ path, name, icon: e.icon, sub, cat, raw: e, flag, search: (name + " " + path + " " + (flag || "")).toLowerCase() });
    }
  });
  items.sort((a, b) => a.name.localeCompare(b.name));
  return (listCache[cat] = items);
}
const loadAllLists = () => Promise.all(Object.keys(CATS).map((c) => loadList(c).catch(() => []))).then((l) => l.flat());
function fieldGroup(cat, path) {
  if (path.startsWith("/Lotus/StoreItems/")) return "store";
  if (cat === "upgrade") return path.includes("/CosmeticEnhancers/") ? "arcane" : "mod";
  return CATS[cat] ? cat : null;
}

function catOfPath(p) {
  const q = p.replace(/^\/Lotus\/StoreItems\//, "/Lotus/");
  if (/\/(Powersuits|Sentinels)\//.test(q) || q.startsWith("/Lotus/Types/Sentinels/")) return "suit";
  if (q.startsWith("/Lotus/Weapons/")) return "weapon";
  if (q.startsWith("/Lotus/Upgrades/")) return "upgrade";
  return "any";
}

const CHOICES = [
  { cat: "suit", name: "Suit", sub: "Warframes, Archwings, Necramechs, companions", icon: "/Lotus/Interface/Icons/StoreIcons/Warframes/Excalibur.png" },
  { cat: "weapon", name: "Weapon", sub: "Primary, secondary, melee...", icon: "/Lotus/Interface/Icons/StoreIcons/Weapons/MeleeWeapons/Weapons/Nikana.png" },
  { cat: "upgrade", name: "Mods / Arcanes", sub: "Mods and Arcanes", icon: "/Lotus/Interface/Cards/Images/AvatarMods/AbilityDurationMod.png" },
  { href: "#/eye", name: "Sentient Builder", sub: "Add unobtainable or custom items", icon: "/Lotus/Interface/Graphics/AntiqueMods/SentientBackFrame.png" },
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
    label: "Impostor",
    text: "Exists in the game files but can't be officially obtained in game.",
    svg: '<svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true" stroke="#0b0b0b" stroke-width="1.4" stroke-linejoin="round"><rect x="4.3" y="11.5" width="5.4" height="12" rx="2.6" fill="#e2312b"/><path d="M8.6 11.2C8.6 6 11.6 3.2 16.4 3.2c4.9 0 8.2 2.4 8.2 6.8V23c0 2.4-.8 4.6-1.6 5.6h-4.2v-3.9c-1-.5-2.9-.5-3.9 0v3.9h-4.1c-.9-.9-1.5-3-1.6-5.4Z" fill="#e2312b"/><rect x="14.6" y="7.4" width="12.6" height="7.4" rx="3.7" fill="#b9c0c8"/></svg>',
  },
  flawed: {
    label: "Flawed",
    text: "Get yours from Iron Wake! Or... Use WebUI.",
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
  Object.keys(MOD_FLAGS).forEach((k, i) => {
    el.append(h("span", { class: "legend-item" }, flagIcon(k), MOD_FLAGS[k].label));
  });
}
const pick = { cat: null, sub: null, items: [], shown: 0, filtered: [], multi: false, chosen: new Set() };
function drawChosen() {
  const n = pick.chosen.size;
  $("#multi-bar").hidden = !pick.multi;
  $("#multi-count").textContent = n ? `${n} selected` : "Click items to select them";
  $("#multi-open").disabled = n < 2;
  $("#btn-multi").classList.toggle("on", pick.multi);
  $("#btn-multi").textContent = pick.multi ? "Cancel selection" : "Select multiple";
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
    $("#pick-status").innerHTML = '<span class="spinner"></span>Loading list from warframe-public-export-plus…';
    try {
      pick.items = await loadList(cat);
    } catch (e) {
      $("#pick-status").textContent = "Could not load the item list: " + e.message;
      return;
    }
    if (pick.cat !== cat) return;
    const subs = [...new Set(pick.items.map((i) => i.sub))];
    const order = Object.values(CATS[cat].sub).concat(["Mods", "Arcanes", "Other"]);
    subs.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    $("#subcats").replaceChildren(
      h("button", { class: "on", onclick: () => setSub(null) }, "All"),
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
  const q = $("#search").value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  pick.filtered = pick.items.filter((i) => (!pick.sub || i.sub === pick.sub) && q.every((w) => i.search.includes(w)));
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

let ed = null;

const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
const isObj = (v) => v !== null && typeof v === "object";
const isIdx = (p) => /^\d+$/.test(p);

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
  if (rec.t === "set" && last && last.t === "set" && last.path.join(".") === rec.path.join(".")) last.v = clone(rec.v);
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
    if (diffNode(o, v, k, t) && !t.a.some(([, x]) => isObj(x))) { q.push(...t.q); a.push(...t.a); }
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
  if (e.mode === "asis" && lines.length) out.push("", ">" + ed.path, ...lines.map(indent));
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
  const out = ["# " + ($("#target-name").textContent || tail(ed.path))];
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

const saveDraft = debounce(() => {
  if (ed) store.set("draft:" + (ed.multi ? "multi:" + ed.paths.join("|") : (ed.eye ? "eye:" + ed.eye.mode + ":" : "") + ed.path), {
    eye: ed.eye && { store: ed.eye.store, manifest: ed.eye.manifest }, name: ed.name, ops: ed.ops, text: ed.text, showStore: ed.showStore, cond: [$("#cond-on").checked, $("#cond-mode").value, $("#cond-ver").value] });
}, 400);

function renderOutput() {
  if (!ed?.sides) return;
  $("#output").innerHTML = highlight(buildPatch());
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

function locSearch(input, pick, maxLen) {
  const box = h("div", { class: "sugg", hidden: true });
  let items = [], sel = -1;
  const close = () => { box.hidden = true; sel = -1; };
  const mark = () => items.forEach((b, i) => b.classList.toggle("sel", i === sel));
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
    items = found.slice(0, 30).map(([, , k, v]) => h("button", { type: "button", onmousedown: (e) => { e.preventDefault(); pick(k); close(); } }, v));
    box.replaceChildren(...items);
    box.hidden = !items.length;
    sel = -1;
  }, 180));
  input.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = Math.max(0, Math.min(items.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1)));
      mark();
      items[sel]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && sel >= 0) {
      e.preventDefault();
      items[sel].dispatchEvent(new MouseEvent("mousedown"));
    } else if (e.key === "Escape") close();
  });
  input.addEventListener("blur", close);
  return box;
}
function leafWidget(sn, path, v, n, mirror = []) {
  const spec = leafSpec(sn, path);
  const key = path.filter((p) => !isIdx(p)).pop();
  const set = (nv) => {
    const sides = record(sn, { t: "set", path, v: nv });
    for (const mp of mirror) record(sn, { t: "set", path: mp, v: nv });
    for (const o of sides) if (o !== sn) syncSide(o);
    const s = ed.sides[sn];
    n.classList.toggle("mod", !hasAt(s.base, path) || !deepEq(getAt(s.base, path), nv));
    const l = n.querySelector(".loc");
    const inEl = n.querySelector("input");
    if (l) l.textContent = typeof nv === "string" && loc(nv) && inEl?.value !== loc(nv) ? "“" + loc(nv) + "”" : "";
    renderOutput();
  };
  if (spec?.t === "bool" && (v === 0 || v === 1)) {
    const sel = h("select", { class: "input mini" }, h("option", { value: "1", selected: v === 1 }, "Yes"), h("option", { value: "0", selected: v === 0 }, "No"));
    sel.addEventListener("change", () => set(+sel.value));
    return sel;
  }
  const textField = !isIdx(path[path.length - 1]) && /Loc|Desc|HelpText/.test(key || "");
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
      const x = t !== "" && !isNaN(Number(t)) ? Number(t) : t;
      set(x);
      show(x);
      if (maxIn && typeof x === "number" && document.activeElement !== maxIn) maxIn.value = fmtNum(statAt(x, stat, stat.max));
    });
    show(v);
    if (!stat) return inp;
    const wrap = h("span", { class: "w stat" }, inp);
    if (stat.additive && stat.max != null) {
      maxIn = h("input", { class: "input mini", type: "text", inputMode: "decimal", value: fmtNum(statAt(v, stat, stat.max)), title: "In-game value at max rank" });
      maxIn.addEventListener("input", () => {
        const t = Number(maxIn.value.trim());
        if (maxIn.value.trim() === "" || isNaN(t)) return;
        const raw = +(t / (stat.pct ? 100 : 1) / (stat.max + 1)).toPrecision(8);
        inp.value = String(raw);
        set(raw);
        show(raw);
      });
      wrap.append(h("span", { class: "eq" }, "or at max rank", maxIn, stat.pct ? "%" : ""));
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
    inp.placeholder = "Type a new text, or search an existing one";
    return h("span", { class: "w loc-w" }, inp, locSearch(inp, (k) => { inp.value = loc(k); set(k); }, /Desc/i.test(key || "") ? 200 : 40));
  }
  return inp;
}
function statInfo(sn, path) {
  if (path[path.length - 1] !== "Value") return null;
  const par = getAt(ed.sides[sn].edit, path.slice(0, -1));
  if (!isObj(par) || !("OperationType" in par)) return null;
  const e = ed.entry?.raw;
  const max = typeof e?.fusionLimit === "number" ? e.fusionLimit : Array.isArray(e?.levelStats) ? e.levelStats.length - 1 : null;
  const op = String(par.OperationType);
  return { op, max, pct: !!par.DisplayAsPercent, additive: op === "ADD" || op === "ADD_BASE" || op === "STACKING_MULTIPLY" };
}
const fmtNum = (x) => String(+x.toFixed(4));
const statAt = (v, st, rank) => (st.additive ? v * (rank + 1) : v) * (st.pct ? 100 : 1);
function statText(v, st) {
  const f = (rank) => {
    const x = statAt(v, st, rank);
    if (!st.additive) return "×" + fmtNum(v);
    return (x >= 0 ? "+" : "") + fmtNum(x) + (st.pct ? "%" : "");
  };
  if (!st.additive) return `In game: ${/^SET/.test(st.op) ? fmtNum(v) : f(0)} (${enumLabel(st.op).toLowerCase()})`;
  return st.max != null ? `In game: ${f(0)} at rank 0, ${f(st.max)} at rank ${st.max} (max)` : `In game: ${f(0)} per rank`;
}

function statSelect(vals, v) {
  const groups = new Map(STAT_GROUPS.map(([g]) => [g, []]));
  for (const x of vals) groups.get(STAT_GROUPS.find(([, re]) => re.test(x))[0]).push(x);
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
    inArr && isObj(v) ? h("button", { class: "btn-x", title: "Duplicate", onclick: () => { record(sn, { t: "dup", path }); refresh(); } }, "⧉") : null,
    inherited && !isObj(v) ? null : h("button", {
      class: "btn-x", title: inherited ? "Empty this inherited value" : inArr ? "Remove item" : "Remove",
      onclick: () => {
        if (top && !exists) resetKey(sn, k);
        else if (inherited) { record(sn, { t: "set", path, v: Array.isArray(v) ? [] : {} }); refresh(); }
        else { record(sn, { t: "del", path }); refresh(); }
      },
    }, "×"));
  const label = keyLabel(path, k, inArr, v, restoreDot(sn, path));
  if (isObj(v)) {
    const narrow = !!flt && !nameHit(k);
    const open = ed.open.has(id) || (narrow && !ed.closed.has(id) && deepHit(k, v));
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
      h("span", { class: "sum", onclick: toggle }, count + (arr ? (count === 1 ? " item" : " items") : count === 1 ? " field" : " fields")),
      acts));
    if (open) {
      const kids = h("div", { class: "kids" }, Object.entries(v).filter(show).map(([kk, x]) => node(sn, [...path, kk], x, sub)));
      if (arr) kids.append(h("button", { class: "btn btn-ghost add-item", onclick: () => { record(sn, { t: "push", path, v: newItem(sn, path, v) }); refresh(); } }, "+ add item"));
      n.append(kids);
    }
    return n;
  }
  n.append(h("div", { class: "line" }, h("span", { class: "tw" }), label, leafWidget(sn, path, v, n), acts));
  n.append(h("div", { class: "loc" }, typeof v === "string" && loc(v) && !n.dataset.shown ? "“" + loc(v) + "”" : ""));
  return n;
}

function restoreAt(sn, path, mirror = []) {
  if (path.length === 1) { resetKey(sn, path[0]); return; }
  for (const p of [path, ...mirror]) {
    const base = ed.sides[sn].base;
    record(sn, hasAt(base, p) ? { t: "set", path: p, v: clone(getAt(base, p)) } : { t: "del", path: p });
  }
  refresh();
}
const restoreDot = (sn, path, mirror) => h("button", { class: "dot-btn", type: "button", title: "Restore the original value", onclick: (e) => { e.stopPropagation(); restoreAt(sn, path, mirror); } });
function keyLabel(path, k, inArr, v, dot) {
  const el = h("span", { class: "k", title: path.join(".") }, dot);
  if (inArr) {
    const what = isObj(v) ? (v.UpgradeType ? statName(String(v.UpgradeType)) : v.ItemType ? tail(String(v.ItemType)) : null) : null;
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

function renderSide(sn) {
  const s = ed.sides[sn];
  const filter = (treeFilter = $("#key-filter").value.trim().toLowerCase());
  const match = (k) => !filter || deepHit(k, s.edit[k]);
  const keys = Object.keys(s.edit).filter((k) => !HIDDEN(k));
  const pinned = (k) => ed.eye?.mode === "new" && sn === "item" && (k === "LocalizeTag" || k === "LocalizeDescTag");
  const own = keys.filter((k) => s.ownKeys.includes(k) || !(k in s.base) || pinned(k)).sort((a, b) => pinned(b) - pinned(a));
  const inherited = keys.filter((k) => !own.includes(k));
  const removed = s.ownKeys.filter((k) => !(k in s.edit));
  const removedInh = Object.keys(s.base).filter((k) => !s.ownKeys.includes(k) && !(k in s.edit) && !HIDDEN(k));
  const removedRow = (k) => h("div", { class: "node top removed" }, h("div", { class: "line" },
    h("span", { class: "tw" }), h("span", { class: "k" }, labelOf(k)), h("span", { class: "sum" }, s.ownKeys.includes(k) ? "removed, the patch will use $clear" : "removed"),
    h("span", { class: "acts" }, h("button", { class: "btn-x", title: "Restore", onclick: () => resetKey(sn, k) }, "↺︎"))));
  const addWrap = h("div", { class: "add-wrap" });
  addWrap.append(h("button", { class: "btn", onclick: (e) => { e.stopPropagation(); openAddMenu(sn, addWrap); } }, "+ Add field"));
  return h("div", { class: "sec", "data-side": sn },
    h("div", { class: "sec-head" },
      h("div", {}, h("div", { class: "sec-title" }, sn === "all" ? `Shared metadata of ${realSides().length} items` : sn === "item" ? "Item" : "StoreItem"),
        sn === "all" ? h("div", { class: "muted small" }, "Only values that are identical in every item are shown. Changes apply to all of them, and to their StoreItems wherever the same value exists.") : sn === "store" ? h("code", { class: "muted small" }, s.path) : null),
      addWrap),
    h("div", { class: "tree" },
      own.filter(match).map((k) => node(sn, [k], s.edit[k])),
      removed.filter((k) => !filter || nameHit(k)).map(removedRow)),
    [...new Set([...inherited, ...removedInh].map((k) => s.origin[k]))].reverse().map((src) => {
      const ks = inherited.filter((k) => s.origin[k] === src);
      const gone = removedInh.filter((k) => s.origin[k] === src && (!filter || nameHit(k)));
      const gid = sn + "|" + src;
      const shown = ks.filter(match);
      if (filter && !shown.length && !gone.length) return null;
      return h("details", { class: "inh", open: filter ? true : ed.inhOpen.has(gid), ontoggle: (e) => { if (!filter) e.target.open ? ed.inhOpen.add(gid) : ed.inhOpen.delete(gid); } },
        h("summary", {}, h("span", {}, `${ed.eye?.mode === "new" ? "Copied" : "Inherited"} from ${tail(src || "parent type")} (${ks.length})`), isBaseType(src) ? warnTip(`You also need to edit this parent type (${tail(src)}) for some changes to take effect.`) : null),
        h("div", { class: "tree" }, shown.map((k) => node(sn, [k], s.edit[k])), gone.map(removedRow)));
    }),
    !keys.length && !removed.length ? h("div", { class: "empty" }, "No metadata found for this type.") : null);
}
const BASIC_GROUPS = new Set(["mod", "arcane", "suit", "weapon"]);
const isAdvanced = () => !!store.get("advancedEditor");
const useBasic = () => !isAdvanced() && BASIC_GROUPS.has(ed.group);
const findKey = (obj, prefix) => (isObj(obj) ? Object.keys(obj).find((k) => k.startsWith(prefix) && isObj(obj[k])) : undefined);
function basicLayout(e) {
  const general = [["Name", ["LocalizeTag"]], ["Description", ["LocalizeDescTag"]], ["Icon", ["Icon"]]];
  const slots = () => Array.isArray(e.ArtifactSlots) && groups.push(["Polarity slots", e.ArtifactSlots.map((_, i) => ["Slot " + (i + 1), ["ArtifactSlots", String(i)]])]);
  const clean = (list) => list.filter(Boolean);
  const groups = [];
  if (ed.group === "mod" || ed.group === "arcane") {
    general.push(["Rarity", ["Rarity"]]);
    if (ed.group === "mod") general.push(["Polarity", ["ArtifactPolarity"]], ["Base drain", ["BaseDrain"]]);
    general.push(["Max rank", ["FusionLimit"]], ["Compatible with", ["ItemCompatibility"]]);
    if (ed.group === "arcane") general.push(["Effect duration (s)", ["UpgradeDuration"]]);
    (Array.isArray(e.Upgrades) ? e.Upgrades : []).forEach((u, i) => {
      if (!isObj(u)) return;
      const at = (k) => ["Upgrades", String(i), k];
      groups.push(["Stat " + (i + 1) + (u.UpgradeType ? ": " + statName(String(u.UpgradeType)) : ""),
        [["Stat", at("UpgradeType")], "DamageType" in u && (u.DamageType !== "DT_ANY" || /DAMAGE_ADDED|PROC|ELEMENT|RESIST/.test(String(u.UpgradeType))) && ["Damage type", at("DamageType")], ["How it applies", at("OperationType")], ["Value per rank", at("Value")], ["Stat text", at("LocTag")]].filter(Boolean)]);
    });
  } else if (ed.group === "suit") {
    general.push(["Passive description", ["PassiveAbilityLocTag"]], ["Health", ["MaxHealthOverride"]], ["Shields", ["MaxShieldOverride"]], ["Armor", ["ArmourRatingOverride"]], ["Max energy", ["MaxEnergy"]], ["Starting energy", ["InitialEnergy"]], ["Sprint speed", ["MovementSpeedMultiplier"]]);
    slots();
    if (Array.isArray(e.AbilityTypes)) groups.push(["Abilities", e.AbilityTypes.map((_, i) => ["Ability " + (i + 1), ["AbilityTypes", String(i)]])]);
  } else if (ed.group === "weapon") {
    const gun = Number(e.AmmoClipSize) > 0;
    general.push(gun && ["Magazine size", ["AmmoClipSize"]], ["Mastery requirement", ["RequiredLevel"]]);
    const modes = (Array.isArray(e.Behaviors) ? e.Behaviors : []).slice(0, e.AlternateFireDisabled ? 1 : undefined);
    const STATS = [["Damage", "impact:", ["AttackData", "Amount"]], ["Status chance (1 = 100%)", "impact:", ["AttackData", "ProcChance"]], ["Critical chance (1 = 100%)", "impact:", ["criticalHitChance"]], ["Critical multiplier", "impact:", ["criticalHitDamageMultiplier"]], ["Multishot", "fire:", ["fireIterations"]], [gun ? "Fire rate" : "Attack speed", "state:", ["fireRate"]], ["Reload time (s)", "state:", ["reloadTime"]]];
    const shared = [], per = modes.map(() => []);
    for (const [label, prefix, rest] of STATS.filter(([l]) => gun || !/^(Multishot|Reload)/.test(l))) {
      const paths = modes.map((b, i) => { const k = findKey(b, prefix); return k && hasAt(b[k], rest) ? ["Behaviors", String(i), k, ...rest] : null; });
      const found = paths.filter(Boolean);
      if (!found.length) continue;
      if (found.every((p) => getAt(e, p) === getAt(e, found[0]))) shared.push([label, found[0], found.slice(1)]);
      else paths.forEach((p, i) => p && per[i].push([label, p]));
    }
    if (shared.length) groups.push(["Stats", shared]);
    slots();
    per.forEach((rows, i) => rows.length && groups.push([i === 0 ? "Main attack" : i === 1 ? "Alternate fire" : "Attack " + (i + 1), rows]));
  }
  return [["General", clean(general)], ...groups];
}
function basicRow(sn, label, path, mirror) {
  const s = ed.sides[sn];
  const text = path.length === 1 && /^Localize(Desc)?Tag$/.test(path[0]);
  if (!hasAt(s.edit, path) && !text) return null;
  const v = hasAt(s.edit, path) ? getAt(s.edit, path) : "";
  if (isObj(v)) return null;
  const changed = !hasAt(s.base, path) ? v !== "" : !deepEq(getAt(s.base, path), v);
  const n = h("div", { class: "node top" + (changed ? " mod" : "") });
  n.append(h("div", { class: "line" }, h("span", { class: "tw" }), h("span", { class: "k", title: path.join(".") }, restoreDot(sn, path, mirror), h("span", { class: "nm" }, label)), leafWidget(sn, path, v, n, mirror), h("span", { class: "acts" })));
  n.append(h("div", { class: "loc" }, typeof v === "string" && loc(v) && !n.dataset.shown ? "“" + loc(v) + "”" : ""));
  return n;
}
function renderBasic(sn) {
  const e = ed.sides[sn].edit;
  const secs = basicLayout(e).map(([title, rows]) => {
    const els = rows.map(([label, path, mirror]) => basicRow(sn, label, path, mirror)).filter(Boolean);
    return els.length ? h("div", { class: "basic-group" }, h("div", { class: "sec-title" }, title), h("div", { class: "tree" }, els)) : null;
  }).filter(Boolean);
  return h("div", { class: "sec", "data-side": sn },
    h("p", { class: "muted small basic-note" }, "The basic editor shows the most common fields. Tick Advanced editor to see and edit everything."),
    secs.length ? secs : h("div", { class: "empty" }, "Nothing to edit here in the basic editor. Switch to the advanced editor to see every field."));
}
const syncSide = debounce((sn) => {
  const el = document.querySelector(`#sides .sec[data-side="${sn}"]`);
  if (el && !el.contains(document.activeElement)) el.replaceWith(useBasic() ? renderBasic(sn) : renderSide(sn));
}, 150);

function renderSides() {
  const basic = useBasic();
  $("#view-edit").classList.toggle("basic", basic);
  $("#adv-toggle").checked = isAdvanced();
  $("#adv-toggle").closest("label").hidden = !BASIC_GROUPS.has(ed.group);
  if (basic) { $("#sides").replaceChildren(renderBasic(ed.multi ? "all" : "item")); return; }
  if (ed.multi) { $("#sides").replaceChildren(renderSide("all")); return; }
  $("#sides").replaceChildren(renderSide("item"), ed.showStore && ed.sides.store ? renderSide("store") : "");
}
function renderFr() {
  $("#fr-list").replaceChildren(...ed.text.map((op, i) => h("div", { class: "chip" },
    h("code", {}, `${op.kind}|${op.from}|${op.to}`),
    h("button", { class: "btn-x", title: "Remove", onclick: () => { ed.text.splice(i, 1); replayAll(); refresh(); } }, "×"))));
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
  return [["Common", common], ["Known fields", known.sort((a, b) => labelOf(a).localeCompare(labelOf(b)))], ["Already set", set]];
}
function drawAddMenu() {
  const q = addSearch.value.trim();
  const ql = q.toLowerCase();
  addList.replaceChildren();
  let n = 0, exact = false;
  for (const [grp, keys] of addOptions()) {
    const isSet = grp === "Already set";
    if (isSet && !ql) continue;
    const f = keys.filter((k) => !ql || (labelOf(k) + " " + k).toLowerCase().includes(ql));
    if (!f.length) continue;
    if (f.some((k) => k.toLowerCase() === ql || labelOf(k).toLowerCase() === ql)) exact = true;
    addList.append(h("div", { class: "grp" }, grp));
    for (const k of f.slice(0, 400)) addList.append(h("button", { class: n++ === 0 ? "sel" : "", onclick: () => (isSet ? jumpToField(k) : pickField(k)) }, h("span", {}, labelOf(k)), isSet ? h("span", {}, "go to field") : null));
  }
  if (q && !exact && /^[A-Za-z_][\w:]*$/.test(q)) {
    addList.append(h("div", { class: "grp" }, "Custom"), h("button", { class: n ? "" : "sel", onclick: () => pickField(q) }, h("span", {}, labelOf(q)), h("span", {}, "new field")));
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
  ed = { name: "", showStore: false, sides: null, ops: [], text: [], open: new Set(), closed: new Set(), inhOpen: new Set(), ...state };
  $("#eye-panel").hidden = true;
  $("#target-icon").removeAttribute("src");
  $("#parent-warn").hidden = true;
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
  restoreCond(draft.cond);
}
async function showEditor(cat, path, eye = null) {
  resetEditor({ cat, path, eye, group: fieldGroup(cat, eye?.base || path) }, "Loading metadata from warframe-packages-bin-data…");
  $("#store-opt").hidden = !!eye;
  $("#target-path").textContent = path;
  $("#store-path").textContent = "";
  $("#target-name").textContent = tail(path);
  $("#also-store").checked = false;
  $("#also-store").disabled = true;
  const draft = store.get("draft:" + (eye ? "eye:" + eye.mode + ":" : "") + path);
  const src = eye?.base || path;
  let item, storeItem;
  try {
    [item, storeItem] = await Promise.all([loadType(src), eye ? null : loadType(toStorePath(path)), loadDict().catch(() => null)]);
  } catch (e) {
    $("#sides").replaceChildren(h("div", { class: "empty" }, "Could not load metadata: " + e.message));
    return;
  }
  if (!ed || ed.path !== path) return;
  [item, storeItem] = await Promise.all([absolutize(item, src), absolutize(storeItem, toStorePath(path))]);
  if (!ed || ed.path !== path) return;
  if (eye?.mode === "new" && item) item = { ...item, own: {}, parents: [], origin: Object.fromEntries(Object.keys(item.data).map((k) => [k, src])) };
  ed.sides = { item: makeSide(path, item), store: storeItem ? makeSide(toStorePath(path), storeItem) : null };
  if (eye) {
    const own = await loadType(toStorePath(src));
    const kind = catOfPath(src);
    const g = eye.mode === "new" && own ? { parent: toStorePath(src), category: "" } : await guessStore(src, kind);
    const d = eye.mode === "asis" ? item?.data || {} : {};
    eye.hasStore = eye.mode === "asis" && !!own;
    eye.manifest = true;
    eye.store = { path: toStorePath(path), parent: g.parent, category: g.category, name: d.LocalizeTag || "", desc: d.LocalizeDescTag || "", icon: d.Icon || "" };
    if (draft?.eye) Object.assign(eye.store, draft.eye.store), (eye.manifest = draft.eye.manifest);
    drawEyePanel();
  }

  if (CATS[cat]) try { ed.entry = (await loadList(cat)).find((i) => i.path === src); } catch {}
  const name = eye?.mode === "new" ? tail(path) : ed.entry?.name || loc(ed.sides.item.eff.LocalizeTag) || tail(path);
  $("#target-name").textContent = name;
  const icon = ed.entry?.icon || ed.sides.item.eff.Icon;
  if (icon) {
    $("#target-icon").style.visibility = "";
    $("#target-icon").onerror = hideBroken;
    $("#target-icon").src = IMG + icon;
  }
  $("#also-store").disabled = !ed.sides.store;
  ed.showStore = !!ed.sides.store;
  $("#also-store").checked = ed.showStore;
  $("#store-path").textContent = ed.sides.store ? ed.sides.store.path : "(no StoreItem for this type)";
  const base = eye ? null : (item?.parents || []).find(isBaseType);
  $("#parent-warn").replaceChildren(...(base ? [
    "You also need to edit the parent type (", h("a", { href: "#/edit?c=" + cat + "&p=" + encodeURIComponent(base) }, tail(base)), ") for some changes to take effect.",
  ] : []));
  $("#parent-warn").hidden = !base;
  if (!item) toast("No metadata found for this path in bin-data");
  if (eye?.mode === "new") $("#target-path").textContent = path + "  (new, based on " + src + ")";

  ed.name = draft?.name ?? name;
  $("#patch-name").value = ed.name;
  restoreDraft(draft);
  if (draft && "showStore" in draft) ed.showStore = !!(draft.showStore && ed.sides.store);
  $("#also-store").checked = ed.showStore;
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
    ? h("select", { class: "input mini" }, opts.options.map((o) => h("option", { value: o, selected: o === value }, o || "(none)")))
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
  const same = (what) => (isNew ? "Same as the item " + what : "Plain text or /Lotus/Language/… key");
  el.replaceChildren(
    isNew ? h("p", { class: "muted small" }, "Only ", h("code", {}, tail(ed.path)), " is created and edited. ", h("code", {}, tail(e.base)), " stays as it is.") : null,
    e.hasStore
      ? h("p", { class: "muted small" }, "This item already has a StoreItem, so only the store entry is added.")
      : h("details", { class: "eye-more" }, h("summary", {}, "StoreItem settings"),
          h("div", { class: "eye-grid" },
            eyeField("StoreItem path", st.path, (v) => (st.path = v.trim())),
            eyeField("Parent StoreItem type", st.parent, (v) => (st.parent = v.trim())),
            st.parent.startsWith("/Lotus/StoreItems/") ? h("span", { class: "muted small eye-note" }, "Category is inherited from the parent StoreItem.") : eyeField("Category", st.category, (v) => (st.category = v), { options: cats }),
            eyeField("Store name", st.name, (v) => (st.name = v), { placeholder: same("name") }),
            eyeField("Store description", st.desc, (v) => (st.desc = v), { placeholder: same("description") }),
            eyeField("Store icon", st.icon, (v) => (st.icon = v), { placeholder: "/Lotus/Interface/Icons/…" }))),
    h("label", { class: "check" }, Object.assign(h("input", { type: "checkbox", checked: e.manifest }), { onchange: (ev) => { e.manifest = ev.target.checked; renderOutput(); } }), h("span", {}, "Add it to the in-game store")));
}
async function showMulti(cat, paths) {
  resetEditor({ cat, path: paths[0], paths, multi: true, group: fieldGroup(cat, paths[0]) }, "Loading metadata for " + paths.length + " items…");
  $("#target-icon").style.visibility = "hidden";
  $("#store-opt").hidden = true;
  $("#target-name").textContent = paths.length + " items";
  $("#target-path").textContent = paths.join("  &  ");
  const draft = store.get("draft:multi:" + paths.join("|"));
  let types, stores;
  try {
    await loadDict().catch(() => null);
    types = await Promise.all(paths.map(async (p) => absolutize(await loadType(p), p)));
    stores = await Promise.all(paths.map(async (p) => (p.startsWith("/Lotus/StoreItems/") ? null : absolutize(await loadType(toStorePath(p)), toStorePath(p)))));
  } catch (e) {
    $("#sides").replaceChildren(h("div", { class: "empty" }, "Could not load metadata: " + e.message));
    return;
  }
  if (!ed || ed.paths !== paths) return;
  const missing = paths.filter((_, i) => !types[i]);
  if (missing.length) toast("Not found in bin-data: " + missing.map(tail).join(", "));
  ed.sides = {};
  paths.forEach((p, i) => {
    ed.sides["m" + i] = makeSide(p, types[i]);
    if (stores[i]) ed.sides["s" + i] = makeSide(toStorePath(p), stores[i]);
  });
  ed.sides.all = { path: "", origin: {}, ownKeys: [] };
  const byPath = new Map((await loadAllLists()).map((i) => [i.path, i.name]));
  const names = paths.map((p) => byPath.get(p) || tail(p));
  $("#target-name").textContent = names.length > 3 ? `${names.slice(0, 3).join(", ")} and ${names.length - 3} more` : names.join(", ");
  ed.name = draft?.name ?? names.join(", ");
  $("#patch-name").value = ed.name;
  restoreDraft(draft);
  replayAll();
  refresh();
}
function syncCond() {
  const on = $("#cond-on").checked;
  $("#cond-opts").hidden = !on;
  $("#cond-ver").hidden = !on || $("#cond-mode").value === "newtypes";
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
  $("#cond-ver-list").append(...VERSIONS.map((x) => h("option", { value: x.v }, x.l)));
  $("#cond-mode").addEventListener("change", () => { syncCond(); renderOutput(); });
  $("#cond-on").addEventListener("change", () => { syncCond(); renderOutput(); });
  $("#cond-ver").addEventListener("input", renderOutput);
  $("#also-store").addEventListener("change", (e) => { if (ed.multi) return; ed.showStore = e.target.checked && !!ed.sides?.store; renderSides(); saveDraft(); });
  $("#key-filter").addEventListener("input", debounce(() => { if (!ed?.sides) return; ed.closed.clear(); renderSides(); }, 120));
  $("#adv-toggle").addEventListener("change", (e) => { store.set("advancedEditor", e.target.checked); if (ed?.sides) renderSides(); });
  $("#btn-fr").onclick = () => { $("#fr").hidden = !$("#fr").hidden; if (!$("#fr").hidden) $("#fr-from").focus(); };
  $("#fr-add").onclick = () => {
    const from = $("#fr-from").value, to = $("#fr-to").value;
    if (!from || !ed?.sides) return;
    const kind = $("#fr-regex").checked ? "s" : "r";
    if (kind === "r" && from.includes("|")) { toast("The search text cannot contain |"); return; }
    if (kind === "s") { try { new RegExp(from); } catch { toast("Invalid regex"); return; } }
    ed.text.push({ kind, from, to });
    $("#fr-from").value = $("#fr-to").value = "";
    replayAll();
    refresh();
  };
  $("#btn-copy").onclick = async () => {
    try { await navigator.clipboard.writeText(buildPatch()); toast("Copied"); } catch { toast("Copy failed"); }
  };
  $("#btn-save").onclick = () => {
    if (!ed?.sides) return;
    const name = (ed.name || tail(ed.path)).replace(/[\\/:*?"<>|]+/g, "_").trim() || "Untitled";
    const url = URL.createObjectURL(new Blob([buildPatch()], { type: "text/plain" }));
    h("a", { href: url, download: name + ".txt" }).click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast("Saved " + name + ".txt");
  };
}
function namePaths(items, byName) {
  const count = new Map();
  for (const i of items) count.set(i.name.toLowerCase(), (count.get(i.name.toLowerCase()) || 0) + 1);
  const named = items.map((i) => ({ path: i.path, flag: i.flag, shown: i.name, name: count.get(i.name.toLowerCase()) > 1 ? i.name + " (" + tail(i.path) + ")" : i.name }));
  for (const i of named) byName.set(i.name.toLowerCase(), i.path);
  return named;
}
function pathSearch(input, load) {
  const box = h("div", { class: "sugg path-sugg", hidden: true });
  input.after(box);
  let data = null, items = [], sel = -1;
  const close = () => { box.hidden = true; sel = -1; };
  const mark = () => items.forEach((b, i) => b.classList.toggle("sel", i === sel));
  const pick = (i) => { input.value = i.name; close(); input.dispatchEvent(new Event("change")); };
  input.addEventListener("focus", async () => { data ||= await load(); });
  input.addEventListener("input", debounce(async () => {
    const q = input.value.trim().toLowerCase();
    data ||= await load();
    const hits = q.length < 2 ? [] : data.map((i) => {
      const n = i.name.toLowerCase(), at = n.indexOf(q);
      const rank = n === q ? 0 : at === 0 ? 1 : at > 0 ? 2 : i.path.toLowerCase().includes(q) ? 3 : -1;
      return [rank, i];
    }).filter(([r]) => r >= 0).sort((a, b) => a[0] - b[0] || a[1].name.length - b[1].name.length).slice(0, 12);
    items = hits.map(([, i]) => h("button", { type: "button", onmousedown: (e) => { e.preventDefault(); pick(i); } }, h("span", { class: "pn" }, i.shown || i.name, i.flag ? flagIcon(i.flag) : null), h("span", { class: "pp" }, i.path.replace(/^\/Lotus\//, ""))));
    box.replaceChildren(...items);
    box.hidden = !items.length;
    sel = -1;
  }, 120));
  input.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = Math.max(0, Math.min(items.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1)));
      mark();
      items[sel]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && sel >= 0) {
      e.preventDefault();
      items[sel].dispatchEvent(new MouseEvent("mousedown"));
    } else if (e.key === "Escape") close();
  });
  input.addEventListener("blur", close);
}
function initEye() {
  const input = $("#eye-path"), np = $("#eye-newpath"), status = $("#eye-status");
  const byName = new Map();
  pathSearch(input, async () => {
    const [lists, customs, chars] = await Promise.all([loadAllLists(), loadCustoms(), loadCharacters()]);
    const seen = new Set();
    return namePaths(lists.concat(customs, chars.all.map((c) => ({ path: c.path, name: c.label || c.name }))).filter((i) => !seen.has(i.path) && seen.add(i.path)), byName);
  });
  const mode = () => document.querySelector('input[name="eye-mode"]:checked').value;
  const resolve = () => byName.get(input.value.trim().toLowerCase()) || normalizePath(input.value);
  const suggest = () => {
    const p = resolve();
    if (mode() === "new" && p && (!np.value || np.dataset.auto === "1")) { np.value = p + "Custom"; np.dataset.auto = "1"; }
  };
  for (const r of document.querySelectorAll('input[name="eye-mode"]')) r.addEventListener("change", () => { $("#eye-new").hidden = mode() !== "new"; suggest(); });
  input.addEventListener("change", suggest);
  np.addEventListener("input", () => (np.dataset.auto = ""));
  $("#eye-form").onsubmit = async (e) => {
    e.preventDefault();
    const target = resolve();
    if (!target) return;
    status.innerHTML = '<span class="spinner"></span>Looking up ' + esc(target) + "…";
    if (!(await loadType(target))) { status.textContent = target + " was not found in warframe-packages-bin-data."; return; }
    if (mode() === "asis") { status.textContent = ""; location.hash = "#/edit?eye=asis&p=" + encodeURIComponent(target); return; }
    if (mode() === "skin") { status.textContent = ""; location.hash = "#/skin?p=" + encodeURIComponent(target); return; }
    const newPath = normalizePath(np.value);
    if (!newPath || newPath === target) { status.textContent = "Give the new item its own path."; return; }
    if (await loadType(newPath)) { status.textContent = newPath + " already exists. Pick another path, or use \"Make it obtainable as it is\"."; return; }
    status.textContent = "";
    location.hash = "#/edit?eye=new&base=" + encodeURIComponent(target) + "&p=" + encodeURIComponent(newPath);
  };
}
function normalizePath(raw) {
  let p = raw.trim().replace(/\\/g, "/").replace(/\.json$/i, "");
  if (!p) return "";
  if (!p.startsWith("/")) p = "/" + p;
  if (!p.startsWith("/Lotus/")) p = "/Lotus" + p;
  return p;
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
function braceDepth(str) {
  let d = 0, q = false;
  for (const c of str) {
    if (c === '"') q = !q;
    else if (!q && c === "{") d++;
    else if (!q && c === "}") d--;
  }
  return d;
}
function parsePatchText(text) {
  const diags = [];
  const add = (line, sev, msg) => diags.push({ line, sev, msg });
  const patches = [];
  let patch = null, amp = false;
  const blocks = [];
  const close = () => {
    if (patch && patch.depth > 0) add(patch.depthLine, "error", "A { opened here is never closed.");
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
      if (!key.startsWith("/")) add(ln, "error", `<code>${esc(key)}</code> is not a valid path. Paths start with /Lotus/.`);
      else if (/\s/.test(key)) add(ln, "warning", `The path <code>${esc(key)}</code> contains spaces.`);
      patch.keys.push(key);
      patch.keyLines.push(ln);
    }
  };
  const inScope = (ln, instr) => {
    if (!patch || !patch.keys.length) {
      add(ln, "error", "This line is not inside a patch. Start one with <code>&gt;/Lotus/…</code> first.");
      return false;
    }
    if (instr && patch.newType) {
      add(ln, "warning", "Instructions are ignored in a new type (+) patch. Only Key=Value lines are used.");
      return false;
    }
    return true;
  };
  const condCheck = (ln, cond) => {
    if (!cond.trim()) { add(ln, "error", "This condition is empty."); return; }
    if (/\bcan_add_new_types\b(?!\s*\()/.test(cond)) add(ln, "error", "<code>can_add_new_types</code> needs parentheses: <code>can_add_new_types()</code>. Without them the condition is always true.");
    if (/(^|[^"\d.])\d{4}\.\d{2}\.\d{2}/.test(cond)) add(ln, "error", "Build versions must be quoted and compared with compareversions(), e.g. <code>compareversions(owf_get_build_version(), \"2021.12.15.00.15\") &gt;= 0</code>.");
    const allowed = new Set(["can_add_new_types", "compareversions", "owf_get_build_version", "and", "or", "not", "true", "false", "nil"]);
    const names = (cond.replace(/"[^"]*"/g, "").match(/[A-Za-z_]\w*/g) || []).filter((n) => !allowed.has(n));
    if (names.length) add(ln, "error", `Unknown name in the condition: <code>${esc(names.join(", "))}</code>. Only can_add_new_types(), compareversions() and owf_get_build_version() are available.`);
    for (const m of cond.matchAll(/"([^"]*)"/g)) if (!/^\d{4}(\.\d{2}){4}$/.test(m[1])) add(ln, "warning", `<code>${esc(m[1])}</code> does not look like a build version (YYYY.MM.DD.HH.MM).`);
    let d = 0;
    for (const c of cond) { if (c === "(") d++; if (c === ")" && --d < 0) break; }
    if (d !== 0) add(ln, "error", "The parentheses in this condition are not balanced.");
    if (/compareversions\s*\([^)]*\)\s*$/.test(cond)) add(ln, "warning", "compareversions() returns a number. Compare it, e.g. <code>&gt;= 0</code>.");
  };

  text.split("\n").forEach((rawLine, i) => {
    const ln = i + 1;
    const line = rawLine.replace(/\r$/, "");
    const t = line.trim();
    if (t === "$if" || t.startsWith("$if ")) { condCheck(ln, t.slice(4)); blocks.push({ ln, hasElse: false }); return; }
    if (t === "$elseif" || t.startsWith("$elseif ")) {
      if (!blocks.length) add(ln, "error", "$elseif without a matching $if.");
      else { if (blocks.at(-1).hasElse) add(ln, "warning", "$elseif after $else is never reached."); condCheck(ln, t.slice(8)); }
      return;
    }
    if (t.startsWith("$else")) {
      if (t !== "$else") add(ln, "warning", `Unknown directive <code>${esc(t)}</code>, it is read as $else.`);
      if (!blocks.length) add(ln, "error", "$else without a matching $if.");
      else { if (blocks.at(-1).hasElse) add(ln, "warning", "This block already has an $else."); blocks.at(-1).hasElse = true; }
      return;
    }
    if (t.startsWith("$endif")) {
      if (!blocks.length) add(ln, "error", "$endif without a matching $if.");
      else blocks.pop();
      return;
    }
    if (line.startsWith("/")) {
      if (patch && patch.depth > 0) add(ln, "error", "This line starts with / so OpenWF reads it as a new path, not as part of the value above. Indent it.");
      if (amp) amp = false;
      else {
        add(ln, "warning", "Starting a patch with / is deprecated. Use <code>&gt;" + esc(t) + "</code>, or indent the line if it belongs to the patch above.");
        start(ln);
      }
      let l = t;
      if (l.endsWith("&")) { amp = true; l = l.slice(0, -1); }
      addKeys(l, ln);
      return;
    }
    amp = false;
    if (t.startsWith("&")) {
      if (!patch) { add(ln, "error", "A line starting with & must follow a &gt; line."); start(ln); }
      amp = true;
      let l = t.slice(1).trim();
      if (l.endsWith("&")) l = l.slice(0, -1);
      addKeys(l, ln);
    } else if (t.startsWith(">")) {
      start(ln);
      let l = t.slice(1).trim();
      if (l.endsWith("&")) { amp = true; l = l.slice(0, -1); }
      if (!l.trim() && !amp) add(ln, "error", "&gt; must be followed by a path.");
      addKeys(l, ln);
    } else if (t.startsWith("+")) {
      start(ln);
      const sep = t.indexOf("|", 1);
      if (sep < 0) { add(ln, "error", "A new type needs a parent: <code>+/Lotus/Path|/Lotus/ParentPath</code>."); return; }
      const path = t.slice(1, sep).trim(), parent = t.slice(sep + 1).trim();
      patch.newType = { path, parent, line: ln };
      addKeys(path, ln);
      if (!parent.startsWith("/")) add(ln, "error", "The parent type must be a full path starting with /.");
    } else if (/^[rsqa]\|/.test(t)) {
      const kind = t[0];
      const sep = t.indexOf("|", 2);
      const what = { r: "find|replace", s: "regex|replacement", q: "path|value", a: "path|value" }[kind];
      if (sep < 0) { add(ln, "error", `Malformed line. Expected <code>${kind}|${what}</code>.`); return; }
      if (!inScope(ln, true)) return;
      const a = t.slice(2, sep), b = t.slice(sep + 1).replace(/\|+$/, "");
      if (!a) add(ln, "error", `The ${kind === "r" ? "search text" : kind === "s" ? "regex" : "path"} is empty.`);
      if (kind === "s") {
        try { new RegExp(a.replace(/^\(\?[a-z]+\)/, "")); } catch (e) { add(ln, "error", "Invalid regex: " + esc(e.message)); }
      }
      if ((kind === "q" || kind === "a") && /\s/.test(a)) add(ln, "warning", "This path contains spaces.");
      if (kind === "q" && b === "") add(ln, "warning", "The value is empty.");
      if (kind === "a" && braceDepth(b) !== 0) add(ln, "error", "The braces in this value are not balanced.");
      if (kind === "r" && a === b) add(ln, "info", "This replacement changes nothing.");
      patch[kind].push({ ln, a, b });
    } else if (t.startsWith("$")) {
      if (!inScope(ln, true)) return;
      for (const f of t.slice(1).split(";")) {
        if (f === "clear" || f === "debug") patch.flags.push(f);
        else add(ln, "warning", `Unknown flag <code>${esc(f)}</code>. Known flags: clear, debug.`);
      }
    } else if (t && !t.startsWith("#")) {
      if (!inScope(ln, false)) return;
      if (patch.depth > 0) {
        if (t.startsWith("{") && patch.prevVal?.endsWith("}")) add(ln, "error", "A comma is missing after the <code>}</code> on the line above. List entries must be separated by <code>},</code> or the game can softlock.");
        patch.prevVal = t;
        patch.depth += braceDepth(t);
        if (patch.depth < 0) add(ln, "error", "There are more } than {.");
        return;
      }
      const eq = t.indexOf("=");
      if (eq < 1) { add(ln, "warning", "This line is added to the metadata as it is. Expected <code>Key=Value</code>."); return; }
      const key = t.slice(0, eq).trim(), val = t.slice(eq + 1).trim();
      if (patch.prefix.some((x) => x.key === key)) add(ln, "warning", `<code>${esc(key)}</code> is set twice in this patch. Only the first one is used.`);
      if (val === "") add(ln, "warning", `<code>${esc(key)}</code> is given an empty value.`);
      const d = braceDepth(val);
      if (d < 0) add(ln, "error", "There are more } than {.");
      if (d > 0) { patch.depth = d; patch.depthLine = ln; }
      patch.prefix.push({ ln, key, val });
    }
  });
  close();
  for (const b of blocks) add(b.ln, "error", "$if without a matching $endif.");
  if (!patches.some((p) => p.keys.length) && text.trim()) add(1, "error", "No patch found. A patch starts with <code>&gt;/Lotus/…</code>.");
  for (const p of patches) {
    const empty = !p.prefix.length && !p.q.length && !p.a.length && !p.r.length && !p.s.length && !p.flags.length;
    if (p.keys.length && empty && !p.newType && !p.inCond) add(p.line, "info", "This patch has no instructions.");
    if (p.flags.includes("clear") && !p.prefix.length) add(p.line, "warning", "$clear with no Key=Value lines leaves this type empty.");
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
  await Promise.all([...uses].map(async ([path, list]) => {
    const t = await loadType(path);
    if (!t) {
      if (!newTypes.has(path)) add(list[0].ln, "error", `<code>${esc(path)}</code> does not exist in the game data. Check the spelling and capitals.`);
      return;
    }
    if (newTypes.has(path)) add(list[0].ln, "warning", `<code>${esc(tail(path))}</code> already exists, so the + line will not create it.`);
    const own = t.own, raw = eeText(own), name = esc(tail(path) + (path.startsWith("/Lotus/StoreItems/") ? " (StoreItem)" : ""));
    if (!Object.keys(t.data).length) {
      if (list.some(({ p }) => p.q.length || p.a.length || p.r.length || p.s.length)) add(list[0].ln, "info", `The game data has no fields for ${name}, so its lines can't be checked here.`);
      return;
    }
    for (const { p } of list) {
      for (const q of p.q) {
        const v = getAt(own, q.a.split("."));
        if (v === undefined) add(q.ln, "error", `<code>${esc(q.a)}</code> does not exist in ${name}${getAt(t.data, q.a.split(".")) !== undefined ? " itself (it is inherited from a parent type, use a Key=Value line instead)" : ""}.`);
        else if (isObj(v)) add(q.ln, "error", `<code>${esc(q.a)}</code> is a list or object in ${name}, q| can only set a single value.`);
        else if (typeof v === "number" && (q.b.trim() === "" || isNaN(Number(q.b)))) add(q.ln, "error", `<code>${esc(q.a)}</code> is a number, but the value <code>${esc(q.b)}</code> is not.`);
      }
      for (const a of p.a) {
        const v = getAt(own, a.a.split("."));
        if (!Array.isArray(v)) add(a.ln, "error", `<code>${esc(a.a)}</code> is not a list in ${name}${v === undefined ? " (it does not exist there)" : ""}.`);
        else if (v.length) {
          const want = isObj(v[0]) ? "object" : typeof v[0];
          const got = a.b.startsWith("{") ? "object" : /^[-+]?(\d+\.?\d*|\.\d+)$/.test(a.b) ? "number" : "string";
          if (want !== got) add(a.ln, "error", `The items of <code>${esc(a.a)}</code> are ${want === "object" ? "objects" : want + "s"}, but this value is ${got === "object" ? "an object" : "a " + got}.`);
        }
      }
      for (const r of p.r) if (r.a && !raw.includes(r.a)) add(r.ln, "warning", `<code>${esc(r.a)}</code> was not found in ${name}, this replacement does nothing.`);
      for (const x of p.s) {
        const m = x.a.match(/^\(\?([a-z]+)\)/);
        let re = null;
        try { re = new RegExp(m ? x.a.slice(m[0].length) : x.a, (m ? m[1].replace(/[^ims]/g, "") : "")); } catch {}
        if (re && !re.test(raw)) add(x.ln, "warning", `<code>${esc(x.a)}</code> matches nothing in ${name}, this substitution does nothing.`);
      }
      for (const pr of p.prefix) {
        if (!(pr.key in t.data)) add(pr.ln, "info", `<code>${esc(pr.key)}</code> is not set on ${name} yet, it will be added.`);
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
    more.textContent = full.hidden ? `+ ${keys.length - 1} more paths` : "Show less";
  } }, `+ ${keys.length - 1} more paths`);
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
    $("#check-summary").innerHTML = pending ? '<span class="spinner"></span>Checking game data…' : ta.value.trim() ? `${e} error${e === 1 ? "" : "s"}, ${w} warning${w === 1 ? "" : "s"}` : "";
    const res = $("#check-results");
    if (!ta.value.trim()) { res.replaceChildren(h("div", { class: "ok" }, "Paste a patch to check it.")); return; }
    if (!diags.length && !pending) { res.replaceChildren(h("div", { class: "ok" }, "No problems found.")); return; }
    const blocks = patches.filter((p) => p.keys.length).sort((a, b) => a.line - b.line);
    const owner = (line) => { let o = null; for (const p of blocks) if (p.line <= line) o = p; return o; };
    const groups = new Map([[null, []], ...blocks.map((p) => [p, []])]);
    const seen = new Set();
    for (const d of diags) if (!seen.has(d.line + d.msg) && seen.add(d.line + d.msg)) groups.get(owner(d.line)).push(d);
    const item = (d) => {
      const msg = h("span", { class: "msg" });
      msg.innerHTML = d.msg;
      return h("div", { class: "res " + d.sev, onclick: () => goLine(d.line) },
        h("span", { class: "ln" }, "Line " + d.line), h("span", { class: "sev" }, { error: "Error", warning: "Warning", info: "Note" }[d.sev]), msg);
    };
    const count = (ds) => {
      const e = ds.filter((d) => d.sev === "error").length, w = ds.filter((d) => d.sev === "warning").length;
      return !ds.length ? "No problems" : [e && `${e} error${e === 1 ? "" : "s"}`, w && `${w} warning${w === 1 ? "" : "s"}`, !e && !w && "Notes only"].filter(Boolean).join(", ");
    };
    res.replaceChildren(...[...groups].filter(([, ds]) => ds.length).map(([p, ds]) => {
      const worst = ds.some((d) => d.sev === "error") ? "error" : ds.some((d) => d.sev === "warning") ? "warning" : "clean";
      return h("div", { class: "rgroup " + worst },
        h("div", { class: "rhead", onclick: () => p && goLine(p.line) },
          p ? pathList(p) : h("span", { class: "rpath" }, "General"),
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
    try { online = await verifyPatch(parsed); } catch (e) { online = [{ line: 1, sev: "warning", msg: "Could not reach the game data: " + esc(e.message) }]; }
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
const ALL_SUITS = "/Lotus/Types/Game/PowerSuit";
const SKIN_DIR = "/Lotus/Upgrades/Skins/Custom/";
const SKIN_STORE_DIR = "/Lotus/StoreItems/Upgrades/Skins/Custom/";
const CUSTOMIZATION = "/Lotus/Types/Game/LotusWarframeCustomization";
const CUSTOMIZATION_STORE = "/Lotus/Types/Game/StoreItemSpecializations/LotusSuitCustomizationStoreItem";
let charsPromise = null;
function loadCharacters() {
  if (!charsPromise) charsPromise = Promise.all([getJSON(`${PEP}/ExportWarframes.json`), getJSON(`${PEP}/ExportEnemies.json`), loadDict()]).then(([w, e]) => {
    const suits = Object.entries(w).map(([path, x]) => ({ path, name: cleanName(x.name, path), icon: x.icon, suit: x.productCategory === "Suits" }));
    const npcs = Object.entries(e.avatars || {}).map(([path, x]) => ({ path, name: cleanName(x.name, path), icon: x.icon }));
    const seen = new Map();
    for (const c of npcs) seen.set(c.name, (seen.get(c.name) || 0) + 1);
    for (const c of npcs) c.label = seen.get(c.name) > 1 ? c.name + " (" + tail(c.path) + ")" : c.name;
    return { suits: suits.filter((s) => s.suit).sort((a, b) => a.name.localeCompare(b.name)), all: suits.concat(npcs) };
  }).catch(() => ({ suits: [], all: [] }));
  return charsPromise;
}
const relTo = (base, v) => (typeof v === "string" && v && !v.startsWith("/") ? base.slice(0, base.lastIndexOf("/") + 1) + v : v);
const isFx = (type) => /\/Fx\//.test(type) || /Smoke|Spark|Glow|Trail|Fx/i.test(tail(type));
const rgbOf = (c) => (Array.isArray(c) && c.length >= 3 ? c.slice(0, 3).map(Number) : null);
const hueOf = (c) => { const v = rgbOf(c); return v ? v.indexOf(Math.max(...v)) : -1; };
const glowFrom = (rgb) => {
  const m = Math.max(...rgb) || 1, hi = rgb.map((x) => +(x / m).toFixed(4));
  return { hi: [...hi, 1], lo: [...hi.map((x) => +(x * 0.2).toFixed(4)), 1] };
};
async function analyzeCharacter(path) {
  const t = await loadType(path);
  if (!t) return { error: path + " was not found in warframe-packages-bin-data." };
  const d = t.data, at = (k) => t.origin[k] || path;
  if (!d.Mesh) return { error: "This character has no body of its own, so it can't be turned into a skin." };
  const matKey = d.OverrideMaterials ? "OverrideMaterials" : "OverrideMaterial";
  const mats = (d[matKey] || []).map((m) => relTo(at(matKey), m));
  const children = (d.AutoSimChildren || []).map((c) => ({ ...c, Type: relTo(at("AutoSimChildren"), c.Type) }));
  let head = [];
  const helmetType = d.DefaultCustomization?.Helmet?.ItemType;
  if (helmetType) {
    const hp = relTo(at("DefaultCustomization"), helmetType);
    const ht = await loadType(hp);
    const kids = ht?.data.THIRD_PERSON_Attachment?.UpgradeAutoChildren || [];
    head = kids.map((c) => ({ ...c, Type: relTo(ht.origin.THIRD_PERSON_Attachment || hp, c.Type) }));
  }
  if (!head.length) head = children.filter((c) => /Helmet|Head|Mask/i.test(tail(c.Type)));
  const parts = children.filter((c) => !head.includes(c));
  const color = d.DefaultEnergyColor || d.ScriptInstance?._newEnergyColor || null;
  const scriptColor = !d.DefaultEnergyColor && !!d.ScriptInstance?._newEnergyColor;
  let fix = null, note = "";
  if (mats[0] && rgbOf(color)) {
    const mt = await loadType(mats[0]);
    const glow = mt?.data["PS:EmissiveTintColorHi"];
    const own = !!mt && "PS:EmissiveTintColorHi" in mt.own;
    if (glow && hueOf(glow) !== hueOf(color)) {
      if (own && scriptColor) note = "Its energy colour is set by a fight script, not by its material, so the skin keeps the material's own glow colour.";
      else fix = { material: mats[0], ...glowFrom(rgbOf(color)) };
    }
  }
  const name = loc(d.LocalizeTag) || loc(d.LocTag) || tail(path);
  return { path, name: name.replace(/<[^>]+>\s*/g, ""), icon: d.Icon || "", mesh: d.Mesh, mats, head, parts, fix, note };
}
let sk = null;
async function showSkin(path) {
  sk = { path, info: null, name: "", target: ALL_SUITS, helmet: true, picked: new Set() };
  $("#skin-title").textContent = tail(path);
  $("#skin-path").textContent = path;
  $("#skin-icon").removeAttribute("src");
  $("#skin-output").innerHTML = "";
  $("#skin-form").replaceChildren(h("div", { class: "empty" }, h("span", { class: "spinner" }), "Reading the character from warframe-packages-bin-data…"));
  const [info, chars] = await Promise.all([analyzeCharacter(path), loadCharacters(), loadDict().catch(() => null)]);
  if (!sk || sk.path !== path) return;
  if (info.error) { $("#skin-form").replaceChildren(h("div", { class: "empty" }, info.error)); return; }
  const known = chars.all.find((c) => c.path === path);
  info.name = known?.name || info.name;
  info.icon = known?.icon || info.icon;
  sk.info = info;
  sk.name = info.name + " Skin";
  sk.helmet = info.head.length > 0;
  info.parts.forEach((c, i) => { if (!isFx(c.Type)) sk.picked.add(i); });
  $("#skin-title").textContent = info.name;
  if (info.icon) { $("#skin-icon").style.visibility = ""; $("#skin-icon").onerror = hideBroken; $("#skin-icon").src = IMG + info.icon; }
  drawSkinForm(chars.suits);
  renderSkin();
}
function drawSkinForm(suits) {
  const info = sk.info;
  const name = h("input", { class: "input", value: sk.name, spellcheck: "false", autocomplete: "off" });
  name.addEventListener("input", () => { sk.name = name.value; renderSkin(); });
  const target = h("select", { class: "input" }, h("option", { value: ALL_SUITS }, "Every Warframe"), suits.map((s) => h("option", { value: s.path }, s.name)));
  target.addEventListener("change", () => { sk.target = target.value; renderSkin(); });
  const check = (label, on, set) => {
    const box = h("input", { type: "checkbox", checked: on });
    box.addEventListener("change", () => { set(box.checked); renderSkin(); });
    return h("label", { class: "check" }, box, h("span", {}, label));
  };
  const partName = (c) => {
    const what = humanize(tail(c.Type).replace(/(Deco|NPC|Cloth)+$/g, ""));
    const b = String(c.BoneName || ""), side = /_L\d_/.test(b) ? "Left " : /_R\d_/.test(b) ? "Right " : "";
    const where = /CHEST/.test(b) ? "Chest" : /LEG|KNEE|THIGH|FOOT/.test(b) ? side + "leg" : /TWIST|ARM|SHOULDER|CLAVICLE|HAND/.test(b) ? side + "arm" : /SPINE|BACK/.test(b) ? "Back" : /HEAD|NECK/.test(b) ? "Head" : "";
    return where ? where.charAt(0).toUpperCase() + where.slice(1) + " piece (" + what + ")" : what;
  };
  $("#skin-form").replaceChildren(...[
    h("label", { class: "eye-field" }, h("span", { class: "label" }, "Skin name"), name),
    h("label", { class: "eye-field" }, h("span", { class: "label" }, "Who can wear it"), target),
    h("div", { class: "skin-list" }, h("span", { class: "label" }, "Head"),
      info.head.length ? check("Include the " + info.name + " helmet", sk.helmet, (v) => (sk.helmet = v)) : h("span", { class: "muted small" }, "This character has no separate head piece.")),
    info.parts.length ? h("div", { class: "skin-list" }, h("span", { class: "label" }, "Attachments"),
      info.parts.map((c, i) => check(partName(c) + (isFx(c.Type) ? " (effect)" : ""), sk.picked.has(i), (v) => (v ? sk.picked.add(i) : sk.picked.delete(i))))) : null,
    info.fix ? h("p", { class: "muted small" }, "The body material inherits a different glow colour, so the patch also sets the right one on ", h("code", {}, tail(info.fix.material)), ". Only things that use this material are affected.") : null,
    info.note ? h("p", { class: "warn" }, info.note) : null].filter(Boolean));
}
function buildSkin() {
  const info = sk.info, all = sk.target === ALL_SUITS;
  const label = sk.name.trim() || info.name + " Skin";
  const key = label.replace(/[^A-Za-z0-9]/g, "") || "CustomSkin";
  const vp = SKIN_DIR + key + "Variant", sp = SKIN_DIR + key, hp = SKIN_DIR + key + "Helmet";
  const ssp = SKIN_STORE_DIR + key, shp = SKIN_STORE_DIR + key + "Helmet";
  const who = all ? [["Weapon", ALL_SUITS], ["GenericCompatible", ALL_SUITS]] : [["Weapon", sk.target]];
  const block = (head, fields) => [head, ...fields.filter(Boolean).map(([k, v]) => indent(k + "=" + (typeof v === "string" && v.startsWith("/") ? v : eeValue(v))))];
  const store = (path, type, name, extra = []) => block(`+${path}|${CUSTOMIZATION_STORE}`, [["ProductCategory", "WeaponSkins"], ["LocalizeTag", name], info.icon && ["Icon", info.icon], ["TypeName", type], ["Compatible", sk.target], ["AlwaysAvailable", 1], ["ShowInMarket", 0], ["Giftable", 0], ["AvailableOnPvp", 1], ...extra]);
  const blocks = [block(`+${vp}|/EE/Types/Game/WeaponSkin`, [["TpMeshOverride", info.mesh], info.mats.length && ["TpMaterialOverrides", info.mats]])];
  const helmet = sk.helmet && info.head.length > 0;
  const helmetName = label.replace(/\s*Skin$/i, "") + " Helmet";
  if (helmet) {
    blocks.push(block(`+${hp}|${CUSTOMIZATION}`, [["LocalizeTag", helmetName], info.icon && ["Icon", info.icon], ["AlwaysAvailable", 1], ["AvailableOnPvp", 1], ["ExcludeFromCodex", 0], ...who, ["THIRD_PERSON_Attachment", { UpgradeAutoChildren: info.head }]]));
    blocks.push(store(shp, hp, helmetName, [["ExcludeFromCodex", 0]]));
  }
  blocks.push(block(`+${sp}|${CUSTOMIZATION}`, [["LocalizeTag", label], info.icon && ["Icon", info.icon], ["AlwaysAvailable", 1], ["AvailableOnPvp", 1], ...who, ["UpgradeSkinOverride", vp], ["CompatibleSlots", ["BodySkin"]], ["AllowUglyMode", 1], helmet && ["ForcedCustomizations", { Helmet: hp }], ["OverrideAttachedFx", 1], ["AttachedFxOverrides", info.parts.filter((_, i) => sk.picked.has(i))]]));
  blocks.push(store(ssp, sp, label, [["CompatibleSlots", ["BodySkin"]]]));
  blocks.push([">" + MANIFEST, indent("a|StoreItems|" + ssp), ...(helmet ? [indent("a|StoreItems|" + shp)] : [])]);
  const out = ["# " + label, "$if can_add_new_types()"];
  blocks.forEach((b) => out.push("", ...b));
  out.push("$endif");
  if (info.fix) out.push("", ">" + info.fix.material, indent("PS:EmissiveTintColorLo=" + eeValue(info.fix.lo)), indent("PS:EmissiveTintColorHi=" + eeValue(info.fix.hi)));
  return out.join("\n") + "\n";
}
function renderSkin() {
  if (sk?.info) $("#skin-output").innerHTML = highlight(buildSkin());
}
function initSkin() {
  $("#skin-copy").onclick = async () => {
    if (!sk?.info) return;
    try { await navigator.clipboard.writeText(buildSkin()); toast("Copied"); } catch { toast("Copy failed"); }
  };
  $("#skin-save").onclick = () => {
    if (!sk?.info) return;
    const name = (sk.name || "Skin").replace(/[\\/:*?"<>|]+/g, "_").trim() || "Skin";
    const url = URL.createObjectURL(new Blob([buildSkin()], { type: "text/plain" }));
    h("a", { href: url, download: name + ".txt" }).click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast("Saved " + name + ".txt");
  };
}
function route() {
  const hash = location.hash || "#/";
  const show = (id) => { for (const v of document.querySelectorAll(".view")) v.hidden = v.id !== id; };
  closeAddMenu();
  if (hash.startsWith("#/skin")) {
    const p = new URLSearchParams(hash.split("?")[1] || "").get("p");
    if (!p?.startsWith("/Lotus/")) { location.hash = "#/eye"; return; }
    show("view-skin");
    window.scrollTo(0, 0);
    showSkin(p);
  } else if (hash === "#/eye") {
    show("view-eye");
    $("#eye-path").focus();
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