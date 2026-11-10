"use strict";
const T = window.TEXT;
const fmt = (text, ...args) => text.replace(/\{(\d)\}/g, (m, i) => args[i]);
const fmtNodes = (text, ...args) => text.split(/(\{\d\})/).map((x) => (/^\{\d\}$/.test(x) ? args[x[1]] : x)).filter((x) => x !== "");
const BIN = "https://raw.githubusercontent.com/calamity-inc/warframe-packages-bin-data/senpai";
const PEP = "https://raw.githubusercontent.com/calamity-inc/warframe-public-export-plus/senpai";
const IMG = "https://browse.wf";
const CATS = {
  weapon: {
    exports: ["ExportWeapons"],
    sub: { LongGuns: T.primary, Pistols: T.secondary, Melee: T.melee, SpaceGuns: T.archGun, SpaceMelee: T.archMelee, SentinelWeapons: T.companion, OperatorAmps: T.operator, DrifterMelee: T.drifter, SpecialItems: T.other },
  },
  suit: {
    exports: ["ExportWarframes", "ExportSentinels"],
    sub: { Suits: T.warframe, SpaceSuits: T.archwing, MechSuits: T.necramech, Sentinels: T.sentinel, KubrowPets: T.companion, MoaPets: T.companion, SpecialItems: T.other },
  },
  upgrade: {
    exports: ["ExportUpgrades", "ExportArcanes"],
    sub: {},
  },
};
const LABELS = {
  LocalizeTag: T.name, LocalizeDescTag: T.description, LongDesc: T.codexDescription, Icon: "Icon",
  ArtifactPolarity: T.polarity, ArtifactSlots: T.polaritySlots, BaseDrain: T.baseDrain, FusionLimit: T.maxRank,
  Rarity: T.rarity, ItemCompatibility: T.compatibility, ItemCompatibilities: T.compatibilityList,
  IncompatibilityTags: T.incompatibility, CompatibilityTags: T.compatibilityTags, OmegaAttenuation: T.rivenDisposition,
  MaxHealthOverride: T.health, MaxShieldOverride: T.shields, ArmourRatingOverride: T.armor, MaxEnergy: T.maxEnergy,
  InitialEnergy: T.startingEnergy, MaxStaminaOverride: T.stamina, MovementSpeedMultiplier: T.sprintSpeed,
  AbilityTypes: T.abilities, PassiveAbilityLocTag: T.passiveDescription, MarketMode: T.marketVisibility,
  ExcludeFromCodex: T.hideFromCodex, RequiredLevel: T.masteryRequirement, PremiumPrice: T.platinumPrice,
  RegularPrice: T.creditPrice, SellingPrice: T.sellPrice, PrimeSellingPrice: T.ducatValue, Tradeable: T.tradeable,
  Giftable: T.giftable, ShowInMarket: T.showInMarket, SearchTags: T.searchTags, Upgrades: T.stats,
  ConditionalUpgrades: T.conditionalStats, UpgradeEntries: T.upgradeEntries, UpgradeChance: T.procChance,
  UpgradeDuration: T.effectDuration, ModSet: T.modSet, IsUtility: T.utilityMod, IsStarter: T.starterFlawed,
  CodexSecret: T.secretInCodex, AvailableOnPvp: T.availableInConclave, AvailableOnPve: T.availableInPve,
  ProductCategory: T.category, TypeName: T.itemType, DefaultUpgrades: T.defaultMods, DefaultSlottedUpgrades: T.defaultMods,
  DefaultWeapon: T.defaultWeapon, AdditionalItems: T.bundledItems, AmmoClipSize: T.magazineSize,
  CriticalChance: T.criticalChance, CriticalMultiplier: T.criticalMultiplier, Behaviors: T.behaviors,
  RecipeHelpText: T.recipeHelpText, UiName: T.uiName, IsPrime: T.isPrime, Diorama: T.diorama,
  DamageType: T.damageType, UpgradeType: T.stat, OperationType: T.applyMode, Value: T.value,
  DisplayAsPercent: T.showAsPerc, DisplayAsMultiplier: T.showAsMult, LocTag: T.statText, ValidType: T.onlyForType,
  ValidModifiers: T.when, SmallerIsBetter: T.lowerIsBetter,
  RoundTo: T.roundTo, ReverseValueSymbol: T.reverseSymbol, BuildPrice: T.buildPrice, BuildTime: T.buildTime,
  SkipBuildTimePrice: T.rushPrice, Ingredients: T.ingredients, ResultItem: T.resultItem,
  SymbolFilter: T.condition, ValidProcTypes: T.statusType, UpgradeObject: T.target, Quality: T.quality, Polarities: T.polarities, HudBuffIcon: T.buffIcon, StatusDescTag: T.statusDescription,
};
const humanize = (k) => k.replace(/^.*:/, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/_/g, " ").replace(/\s+/g, " ").trim().toLowerCase().replace(/^./, (c) => c.toUpperCase());
const HIDDEN = (k) => /DateAdded|^Default\w*Colou?r|^AdditionalItems$/i.test(k);
const ENUMS = window.ENUMS_DATA || {};

const OP_NAMES = {
  STACKING_MULTIPLY: T.multiplicative, ADD: T.additive, MULTIPLY: T.multiply, ADD_BASE: T.addToBase,
  SET: T.setToValue, SET_BASE: T.setBaseValue, SET_MAX: T.capAtMost, SET_MIN: T.raiseToLeast,
};
const STAT_NAMES = {
  AVATAR_POWER_MAX: T.energyMax, AVATAR_POWER_RATE: T.energyRegen, AVATAR_ABILITY_STRENGTH: T.abilityStrength,
  AVATAR_ABILITY_DURATION: T.abilityDuration, AVATAR_ABILITY_EFFICIENCY: T.abilityEfficiency, AVATAR_ABILITY_RANGE: T.abilityRange,
  AVATAR_ARMOUR: T.armor, AVATAR_HEALTH_MAX: T.health, AVATAR_SHIELD_MAX: T.shieldCapacity, AVATAR_SHIELD_RECHARGE_RATE: T.shieldRecharge,
  AVATAR_SHIELD_RECHARGE_DELAY: T.shieldRechargeDelay, AVATAR_OVERSHIELD_MAX: T.overshieldMax, AVATAR_SPRINT_SPEED: T.sprintSpeed,
  AVATAR_CASTING_SPEED: T.castingSpeed, AVATAR_PARKOUR_BOOST: T.bulletJump, AVATAR_AURA_STRENGTH: T.auraStrength,
  AVATAR_STAMINA_MAX: T.stamina, AVATAR_DAMAGE_TAKEN: T.damageTaken, AVATAR_MOVEMENT_SPEED: T.movementSpeed,
  WEAPON_CRIT_CHANCE: T.criticalChance, WEAPON_CRIT_DAMAGE: T.criticalDamage, WEAPON_PROC_CHANCE: T.statusChance,
  WEAPON_PROC_TIME: T.statusDuration, WEAPON_PROC_DAMAGE: T.statusDamage, WEAPON_FIRE_ITERATIONS: T.multishot,
  WEAPON_FIRE_RATE: T.fireRateSpeed, WEAPON_CLIP_MAX: T.magazineCapacity, WEAPON_AMMO_MAX: T.ammoMax,
  WEAPON_RELOAD_SPEED: T.reloadSpeed, WEAPON_DAMAGE_AMOUNT: T.damage, WEAPON_PERCENT_BASE_DAMAGE_ADDED: T.addedDamage,
  WEAPON_MELEE_DAMAGE: T.meleeDamage, WEAPON_PUNCTURE_DEPTH: T.punchThrough, WEAPON_RECOIL: T.recoil, WEAPON_SPREAD: T.accuracySpread,
  WEAPON_ZOOM: T.zoom, WEAPON_RANGE: T.range, WEAPON_HEADSHOT_MULTIPLIER: T.headshotDamage, WEAPON_PROJECTILE_SPEED: T.projectileSpeed,
  WEAPON_CHARGE_RATE: T.chargeRate, WEAPON_HOLSTER_RATE: T.holsterSpeed, GAMEPLAY_FACTION_DAMAGE: T.factionDamage,
  WEAPON_MELEE_COMBO_DURATION_BONUS: T.comboDuration, WEAPON_MELEE_HEAVY_CHARGE_SPEED: T.heavyWindUp, WEAPON_LIFE_STEAL: T.lifeSteal,
  WEAPON_EXPLOSION_RADIUS: T.blastRadius, WEAPON_NOISE_REDUCTION: T.noiseReduction, WEAPON_MELEE_FINISHER_DAMAGE: T.finisherDamage,
  WEAPON_MELEE_SLAM_DAMAGE_BONUS: T.slamDamage, WEAPON_AMMO_CONSUME_RATE: T.ammoEfficiency, NONE: T.noneStat,
  AVATAR_PROC_TIME: T.statusDurationSelf, SKILL_RJ_BC_COOLDOWN: T.avionicsCooldown, WEAPON_DAMAGE_WEAKPOINT: T.weakPointDamage, WEAPON_AUTO_RELOAD_RATE: T.holsterReload, WEAPON_CRIT_CHANCE_BODY_PART: T.weakPointCrit,
};
const STAT_GROUPS = [
  [T.warframeAbilities, /^AVATAR_(ABILITY|CASTING|AURA|POWER_DAMAGE)/],
  [T.warframeEnergy, /^AVATAR_(POWER|ENERGY|SPAWN_ENERGY)/],
  [T.warframeSurvival, /^AVATAR_(HEALTH|HEAL|SHIELD|OVERSHIELD|ARMOUR|DAMAGE|BLEEDOUT|REVIVE|INJURY|KNOCKDOWN|HEAVY_LAND|PROC_IMMUNITY|NO_DEATH|EVADE|MELEE_DAMAGE_REDUCTION|ALLOW_HEALTH|RESPAWN)/],
  [T.warframeMovement, /^AVATAR_(SPRINT|JUMP|AIR|NUM_JUMPS|SLIDE|PARKOUR|DODGE|ACROBATIC|MOVEMENT|JOG|DASH|FALL|STAMINA)/],
  [T.companion, /^(AVATAR_SENTINEL|CSUT_)/],
  [T.warframeOther, /^AVATAR_/],
  [T.weaponCritical, /^WEAPON_(CRIT|DOUBLE_CRIT|NOCRIT|LOW_CRIT|VICTIM_CRIT)/],
  [T.weaponStatus, /^WEAPON_(PROC|SLASH_PROC|FORCED_PROC|RANDOM_PROC|OVERHEAT_PROC)/],
  [T.weaponMelee, /^WEAPON_(MELEE|PARRY|CHANNELING)/],
  [T.weaponProjectile, /^WEAPON_(PROJECTILE|PUNCTURE|RICOCHET|REFLECTION|EXPLOSION|GRENADE|CORPSE)/],
  [T.weaponFiringAmmo, /^WEAPON_(FIRE|CLIP|AMMO|RELOAD|AUTO_RELOAD|CHARGE|ADD_CHARGE|RECOIL|SPREAD|ZOOM|HOLSTER|INFINITE_CLIP|CONVERT_AMMO|LOCK_TIME|RANGE|NOISE|HEALTH_PCT_FOR_FULL_CLIP)/],
  [T.weaponDamage, /^WEAPON_/],
  [T.kDrive, /^VEHICLE_/],
  [T.gameplay, /^GAMEPLAY_/],
  [T.railjack, /^SKILL_RJ/],
  [T.other, /./],
  [T.specialEffects, /$^/],
];
const titleCase = (s) => s.replace(/(^|[\s(\/-])(?!(?:of|at|to|in|and|the|per|or|with)\b)([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\(S\)/g, "(s)");
const statName = (v) => window.STAT_LABELS?.[v] || (STAT_NAMES[v] ? titleCase(STAT_NAMES[v]) : "");
const labelOf = (k) => titleCase(LABELS[k] || humanize(k));

const ENUM_NAMES = {
  AP_ATTACK: T.madurai, AP_DEFENSE: T.vazarin, AP_TACTIC: T.naramon, AP_POWER: T.zenurik, AP_WARD: T.unairu,
  AP_PRECEPT: T.penjaga, AP_UMBRA: T.umbra, AP_ANY: T.anyPolarity, AP_FUSION: T.fusion, AP_UNIVERSAL: T.universal,
  DT_IMPACT: T.impact, DT_PUNCTURE: T.puncture, DT_SLASH: T.slash, DT_FIRE: T.heat, DT_FREEZE: T.cold,
  DT_ELECTRICITY: T.electricity, DT_POISON: T.toxin, DT_EXPLOSION: T.blast, DT_GAS: T.gas, DT_MAGNETIC: T.magnetic,
  DT_RADIATION: T.radiation, DT_VIRAL: T.viral, DT_CORROSIVE: T.corrosive, DT_FINISHER: T.true, DT_RADIANT: T.void,
  DT_SENTIENT: T.tau, DT_ANY: T.any, COMMON: "Common", UNCOMMON: "Uncommon", RARE: "Rare", LEGENDARY: "Legendary",
  MM_HIDDEN: T.hidden, MM_VISIBLE: T.visible, MM_EXCLUDED: T.excluded, MM_NONE: T.noneStat,
  QA_NONE: T.noneStat, QA_LOW: T.low, QA_MEDIUM: T.medium, QA_HIGH: T.high, QA_VERY_HIGH: T.veryHigh,
};
const enumLabel = (v) => OP_NAMES[v] || ENUM_NAMES[v] || (v === "" ? T.none : /^[A-Z0-9_]+$/.test(v) ? titleCase(humanize(v)) : v);

const COMMON = {
  weapon: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactSlots", "RequiredLevel", "MarketMode", "ExcludeFromCodex"],
  suit: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactSlots", "MaxHealthOverride", "MaxShieldOverride", "ArmourRatingOverride", "MaxEnergy", "InitialEnergy", "MovementSpeedMultiplier", "AbilityTypes", "PassiveAbilityLocTag"],
  mod: ["LocalizeTag", "LocalizeDescTag", "Icon", "ArtifactPolarity", "BaseDrain", "FusionLimit", T.rarity, "ItemCompatibility", "IncompatibilityTags"],
  arcane: ["LocalizeTag", "LocalizeDescTag", "Icon", T.rarity, "FusionLimit", "ItemCompatibility"],
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
  if (tag === "button" && attrs.title) el.setAttribute("aria-label", attrs.title);
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
  return el;
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch {} },
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
      if (!r.ok) throw Object.assign(new Error(r.status + " " + url), { status: r.status });
      return r.json();
    }).catch((e) => { jsonCache.delete(url); throw e; }));
  }
  return jsonCache.get(url);
}

let DICT = null;
const loadDict = () => getJSON(PEP + "/dict.en.json").then((d) => { for (const c of PLAYABLE) if (c.name) d[c.tag] ||= c.name; DICT = d; });
const FIELDS = window.FIELDS_DATA || {};
const VERSION_SOURCE = "https://raw.githubusercontent.com/spaceninjaserver/about.openwf.io/main/versions.php";
async function loadBuilds() {
  const php = await (await fetch(VERSION_SOURCE)).text(), builds = new Map();
  for (const m of php.matchAll(/"(\d{4}(?:\.\d{2}){4})(?:\/[^"]*)?"(?:\s*\/\*[^*]*\*\/)?\s*=>\s*"([^"]+)"/g)) builds.set(m[1], m[2]);
  for (const row of php.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const cells = [...row[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((x) => x[1].replace(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<[^>]+>/g, "").trim());
    if (/^\d{4}(\.\d{2}){4}$/.test(cells[0] || "") && !builds.has(cells[0])) builds.set(cells[0], (cells[1] || "").replace(/^\D+/, ""));
  }
  return [...builds].sort((a, b) => b[0].localeCompare(a[0]));
}
const loc = (k) => (DICT && k && DICT[k]) || null;
const tail = (p) => p.split("/").pop();
const toStorePath = (p) => p.replace(/^\/Lotus\//, "/Lotus/StoreItems/");
const stripTags = (s) => s.replace(/<[^>]+>\s*/g, "");
const cleanName = (key, path) => stripTags(loc(key) || tail(path));
const isArcanePath = (p) => p.includes("/CosmeticEnhancers/") && !p.includes("/Peculiars/");
const OFFLINE = T.offline;
const hideBroken = (e) => (e.target.style.visibility = "hidden");
const setIcon = (el, icon) => { el.style.visibility = ""; el.onerror = hideBroken; el.src = IMG + icon; };
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast(T.copied); } catch { toast(T.copyFailed); }
}
function saveText(name, text, fallback) {
  const safe = name.replace(/[\\/:*?"<>|]+/g, "_").trim() || fallback;
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  h("a", { href: url, download: safe + ".txt" }).click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast(fmt(T.savedFile, safe + ".txt"));
}

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
const missingTypes = new Set();
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
  const paths = [...found.keys()].filter((full) => !missingTypes.has(full));
  for (let i = 0; i < paths.length; i += 40) await Promise.all(paths.slice(i, i + 40).map((full) => getJSON(BIN + full + ".json").then(() => found.set(full, full), () => missingTypes.add(full))));
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
    try { node = await getJSON(BIN + cur + ".json"); } catch (e) { if (e.status === 404) break; throw e; }
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
      if (cat === "upgrade") sub = expName === "ExportArcanes" || isArcanePath(path) ? T.arcanes : T.mods;
      else sub = def.sub[e.productCategory] || T.other;
      const name = cleanName(e.name, path);
      const flag = e.isFrivolous ? "impostor" : e.isStarter ? "flawed" : null;
      items.push({ path, name, icon: e.icon, sub, cat, raw: e, flag });
    }
  });
  items.sort((a, b) => a.name.localeCompare(b.name));
  return (listCache[cat] = items);
}
const loadAllLists = () => Promise.all(Object.keys(CATS).map((c) => loadList(c).catch(() => []))).then((l) => l.flat());
const loadCompatLists = () => Promise.all([loadTextIcons(), ...["suit", "weapon", "upgrade"].map((c) => loadList(c).catch(() => []))]);
function fieldGroup(cat, path) {
  if (path.startsWith("/Lotus/StoreItems/")) return "store";
  if (cat === "upgrade") return isArcanePath(path) ? "arcane" : "mod";
  return CATS[cat] ? cat : null;
}

function catOfPath(p) {
  const q = p.replace(/^\/Lotus\/StoreItems\//, "/Lotus/");
  if (/\/(Powersuits|Sentinels)\//.test(q) || q.startsWith("/Lotus/Types/Sentinels/")) return "suit";
  if (q.startsWith("/Lotus/Weapons/")) return "weapon";
  if (q.startsWith("/Lotus/Upgrades/")) return "upgrade";
  return "any";
}

const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
const isObj = (v) => v !== null && typeof v === "object";
const isIdx = (p) => /^\d+$/.test(p);

function normalizePath(raw) {
  let p = raw.trim().replace(/\\/g, "/").replace(/\.json$/i, "");
  if (!p) return "";
  if (!p.startsWith("/")) p = "/" + p;
  if (!p.startsWith("/Lotus/")) p = "/Lotus" + p;
  return p;
}
const ALL_SUITS = "/Lotus/Types/Game/PowerSuit";
const SKIN_DIR = "/Lotus/Upgrades/Skins/Custom/";
const SKIN_STORE_DIR = "/Lotus/StoreItems/Upgrades/Skins/Custom/";
const CUSTOMIZATION = "/Lotus/Types/Game/LotusWarframeCustomization";
const CUSTOMIZATION_STORE = "/Lotus/Types/Game/StoreItemSpecializations/LotusSuitCustomizationStoreItem";
let charsPromise = null;
function senderPortraits(data) {
  const found = new Map();
  const walk = (v) => {
    if (!isObj(v)) return;
    if (!Array.isArray(v) && typeof v.sender === "string" && typeof v.icon === "string") {
      const name = stripTags(loc(v.sender) || "").toLowerCase();
      if (name && !found.has(name)) found.set(name, v.icon);
    }
    Object.values(v).forEach(walk);
  };
  walk(data);
  return found;
}
function loadCharacters() {
  if (!charsPromise) charsPromise = Promise.all([getJSON(`${PEP}/ExportWarframes.json`), getJSON(`${PEP}/ExportEnemies.json`), getJSON(`${PEP}/ExportKeys.json`).catch(() => ({})), loadDict()]).then(([w, e, keys]) => {
    const suits = Object.entries(w).map(([path, x]) => ({ path, name: cleanName(x.name, path), icon: x.icon, suit: x.productCategory === "Suits" }));
    const npcs = Object.entries(e.avatars || {}).map(([path, x]) => ({ path, name: cleanName(x.name, path), icon: x.icon }));
    const seen = new Map();
    for (const c of npcs) seen.set(c.name, (seen.get(c.name) || 0) + 1);
    for (const c of npcs) c.label = seen.get(c.name) > 1 ? c.name + " (" + tail(c.path) + ")" : c.name;
    const npcSuit = new Map();
    for (const a of Object.values(e.agents || {})) {
      const suit = (a.items || []).map((i) => i.type).find((x) => /Suit$/i.test(x));
      if (suit) for (const v of Object.values(a.avatarTypes || {})) if (!npcSuit.has(v)) npcSuit.set(v, suit);
    }
    return { suits: suits.filter((s) => s.suit).sort((a, b) => a.name.localeCompare(b.name)), all: suits.concat(npcs), npcSuit, portraits: senderPortraits(keys) };
  }).catch(() => ({ suits: [], all: [], npcSuit: new Map(), portraits: new Map() }));
  return charsPromise;
}
const relTo = (base, v) => (typeof v === "string" && v && !v.startsWith("/") ? base.slice(0, base.lastIndexOf("/") + 1) + v : v);
const isHeadPart = (c) => /Head|Helmet|Mask/i.test(tail(c.Type));
const childrenOf = (t, path, key = "AutoSimChildren") => (t.data[key] || []).map((c) => ({ ...c, Type: relTo(t.origin[key] || path, c.Type) }));
const itemParts = (it, path) => (it?.data.THIRD_PERSON_Attachment?.UpgradeAutoChildren || []).map((c) => ({ ...c, Type: relTo(it.origin.THIRD_PERSON_Attachment || path, c.Type) }));
const materialsOf = (t, path) => { const k = t.data.OverrideMaterials ? "OverrideMaterials" : "OverrideMaterial"; return [].concat(t.data[k] || []).map((m) => relTo(t.origin[k] || path, m)); };
const partLabel = (type) => tail(type).replace(/(Skeletal)?Cloth$|Attachment$|Deco$/, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
const isFx = (type) => /\/(Fx|Sounds)\//.test(type) || /Smoke|Spark|Glow|Trail|Fx|Handler$/i.test(tail(type));
const rgbOf = (c) => (Array.isArray(c) && c.length >= 3 ? c.slice(0, 3).map(Number) : null);
const hueOf = (c) => { const v = rgbOf(c); return v ? v.indexOf(Math.max(...v)) : -1; };
const glowFrom = (rgb) => {
  const m = Math.max(...rgb) || 1, hi = rgb.map((x) => +(x / m).toFixed(4));
  return { hi: [...hi, 1], lo: [...hi.map((x) => +(x * 0.2).toFixed(4)), 1] };
};
const skinFields = (fields) => fields.filter(Boolean).map(([k, v]) => indent(k + "=" + (typeof v === "string" && v.startsWith("/") ? v : eeValue(v))));
const skinBlock = (head, fields) => [head, ...skinFields(fields)];
const customItem = ({ path, name, desc, icon, pre = [], who, fields = [] }) => skinBlock(`+${path}|${CUSTOMIZATION}`, [["LocalizeTag", name], desc && ["LocalizeDescTag", desc], icon && ["Icon", icon], ["AlwaysAvailable", 1], ["AvailableOnPvp", 1], ["MarketMode", "MM_VISIBLE"], ["RegularPrice", 1], ...pre, ...who, ...fields]);
const storeBlock = (store, type, name, icon, target, extra = []) => skinBlock(`+${store}|${CUSTOMIZATION_STORE}`, [["ProductCategory", "WeaponSkins"], ["LocalizeTag", name], icon && ["Icon", icon], ["TypeName", type], ["Compatible", target], ["AlwaysAvailable", 1], ["ShowInMarket", 1], ["RegularPrice", 1], ["Giftable", 0], ["AvailableOnPvp", 1], ...extra]);
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1; return n >>> 0; });
const crc32 = (bytes) => { let c = 0xffffffff; for (const b of bytes) c = CRC_TABLE[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function zipFiles(files) {
  const enc = new TextEncoder(), parts = [], central = [];
  const header = (sig, extra, crc, size, name) => {
    const b = new DataView(new ArrayBuffer(extra + 26 + 4));
    let o = 0;
    b.setUint32(o, sig, true); o += 4;
    if (extra) { b.setUint16(o, 20, true); o += 2; }
    b.setUint16(o, 20, true); b.setUint16(o + 2, 0x0800, true); b.setUint16(o + 4, 0, true); b.setUint16(o + 6, 0, true); b.setUint16(o + 8, 0x21, true);
    b.setUint32(o + 10, crc, true); b.setUint32(o + 14, size, true); b.setUint32(o + 18, size, true); b.setUint16(o + 22, name.length, true);
    return b;
  };
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.path), data = enc.encode(f.text), crc = crc32(data);
    const local = header(0x04034b50, 0, crc, data.length, name);
    parts.push(local, name, data);
    const tail = new DataView(new ArrayBuffer(14));
    tail.setUint32(10, offset, true);
    central.push(header(0x02014b50, 2, crc, data.length, name), tail, name);
    offset += local.byteLength + name.length + data.length;
  }
  const size = central.reduce((n, p) => n + p.byteLength, 0), end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, size, true); end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], { type: "application/zip" });
}
function saveBlob(name, blob) {
  const url = URL.createObjectURL(blob), a = h("a", { href: url, download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}