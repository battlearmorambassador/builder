"use strict";

const CATALOG = window.STAT_CATALOG || [];
const scalesWithRank = (o) => o === "ADD" || o === "ADD_BASE" || o === "STACKING_MULTIPLY" || o === "MULTIPLY";
const statRows = (t, d) => CATALOG.filter((r) => r.t === t && (d === undefined || r.d === d));
const usualRow = (t, d) => statRows(t, d).sort((a, b) => b.n - a.n)[0] || null;
const RANK_OF = { QA_NONE: 0, QA_LOW: 0, QA_MEDIUM: 3, QA_HIGH: 5, QA_VERY_HIGH: 10 };
const listedRank = (e) => (typeof e?.fusionLimit === "number" ? e.fusionLimit : Array.isArray(e?.levelStats) ? e.levelStats.length - 1 : null);
const modMaxRank = (sn = actionSide()) => {
  const s = ed.sides?.[sn], e = s?.edit;
  if (Number(e?.IsImmortal)) return 0;
  if (ed.multi) {
    const ranks = new Set(ed.paths.map((p) => listedRank(listCache[ed.cat]?.find((i) => i.path === p)?.raw)));
    if (ranks.size > 1) return null;
  }
  const listed = listedRank((ed.multi ? listCache[ed.cat]?.find((i) => i.path === ed.paths[0]) : ed.entry)?.raw);
  return listed != null && e?.FusionLimit === s?.base?.FusionLimit ? listed : RANK_OF[e?.FusionLimit] ?? listed;
};
const actionSide = () => (ed.multi ? "all" : "item");
let actionForm = null, changesOpen = false;

function runAction(label, fn) {
  const id = (ed.nextAction = (ed.nextAction || 0) + 1);
  const start = ed.ops.length;
  ed.inAction = true;
  try { fn(); } finally { ed.inAction = false; }
  ed.ops.slice(start).forEach((o) => (o.aid = id));
  ed.actions = [...(ed.actions || []), { id, label }];
  ed.redo = [];
  actionForm = null;
  refresh();
}
function undoAction(id) {
  const at = ed.actions.findIndex((a) => a.id === id);
  if (at < 0) return;
  const opsOf = (i) => ed.ops.filter((o) => o.aid === i);
  const ids = new Set([id]), keys = new Set();
  const note = (i) => opsOf(i).forEach((o) => { if (o.t !== "set") keys.add(o.path[0]); });
  note(id);
  for (const a of ed.actions.slice(at + 1)) if (opsOf(a.id).some((o) => keys.has(o.path[0]))) { ids.add(a.id); note(a.id); }
  const first = ed.ops.findIndex((o) => o.aid === id);
  if (ed.ops.slice(first).some((o) => !o.aid && keys.has(o.path[0]))) { toast("Later edits in the Advanced editor depend on this change"); return; }
  const undone = ed.actions.filter((a) => ids.has(a.id)).map((action) => ({ action, ops: opsOf(action.id) }));
  ed.redo = [...(ed.redo || []), ...undone.reverse()];
  ed.ops = ed.ops.filter((o) => !ids.has(o.aid));
  ed.actions = ed.actions.filter((a) => !ids.has(a.id));
  actionForm = null;
  replayAll();
  refresh();
  if (ids.size > 1) toast("Also undid " + (ids.size - 1) + " later change" + (ids.size > 2 ? "s" : "") + " that depended on it");
}
function redoAction() {
  const r = ed.redo?.pop();
  if (!r) return;
  ed.ops.push(...r.ops);
  ed.actions = [...(ed.actions || []), r.action];
  actionForm = null;
  replayAll();
  refresh();
}
function undoAllActions() {
  const all = ed.actions.map((action) => ({ action, ops: ed.ops.filter((o) => o.aid === action.id) }));
  ed.redo = [...(ed.redo || []), ...all.reverse()];
  ed.ops = ed.ops.filter((o) => !o.aid);
  ed.actions = [];
  actionForm = null;
  replayAll();
  refresh();
}
const FACTIONS = [
  ["Grineer", "Grineer", "/Lotus/Language/Upgrades/WeaponFactionDamageGrineerDesc"], ["Corpus", "Corpus", "/Lotus/Language/Upgrades/WeaponFactionDamageCorpusDesc"],
  ["Infestation", "Infested", "/Lotus/Language/Upgrades/WeaponFactionDamageInfestedDesc"], ["Orokin", "Corrupted", "/Lotus/Language/Upgrades/WeaponFactionDamageCorruptedDesc"],
  ["MITW", "Murmur", "/Lotus/Language/Mods/WeaponFactionDamageMurmursDesc"], ["Sentient", "Sentient", "/Lotus/Language/Upgrades/WeaponFactionDamageSentientsDesc"],
  ["Techrot", "Techrot", "/Lotus/Language/Upgrades/WeaponFactionDamageTechrotDesc"], ["Scaldra", "Scaldra", "/Lotus/Language/Upgrades/WeaponFactionDamageScaldraDesc"],
];
const PROC_NAMES = { PT_BLEEDING: "Slash", PT_FRAILTY: "Puncture", PT_KNOCKBACK: "Impact", PT_POISONED: "Toxin", PT_CAUSTIC_BURN: "Corrosive", PT_IMMOLATION: "Heat", PT_CHILLED: "Cold", PT_MAGNETIZED: "Magnetic", PT_ASPHYXIATION: "Gas", PT_RAD_TOX: "Radiation", PT_STAGGERED: "Stagger", PT_BIG_STAGGER: "Heavy Stagger", PT_STUNNED: "Stun", PT_KNOCKED_DOWN: "Knockdown", PT_RAGDOLL: "Ragdoll" };
const procs = (...vals) => vals.map((v) => [v, PROC_NAMES[v]]);
const damages = (...vals) => vals.map((v) => [v, enumLabel(v)]);
const STAT_CHOICES = {
  GAMEPLAY_FACTION_DAMAGE: { label: "Faction", key: "SymbolFilter", options: FACTIONS },
  AVATAR_INJURY_BLOCK_CHANCE: { label: "Status Type", key: "SymbolFilter", options: procs("PT_BLEEDING", "PT_FRAILTY", "PT_KNOCKBACK", "PT_IMMOLATION", "PT_CHILLED", "PT_POISONED", "PT_CAUSTIC_BURN", "PT_ASPHYXIATION", "PT_MAGNETIZED", "PT_RAD_TOX", "PT_STAGGERED", "PT_BIG_STAGGER", "PT_STUNNED", "PT_KNOCKED_DOWN", "PT_RAGDOLL") },
  AVATAR_INJURY_ANIM_RATE: { label: "Status Type", key: "SymbolFilter", options: procs("PT_STAGGERED", "PT_BIG_STAGGER") },
  AVATAR_PROC_IMMUNITY_DURATION: { label: "Status Type", key: "SymbolFilter", options: procs("PT_BIG_STAGGER", "PT_RAGDOLL") },
  WEAPON_DAMAGE_PER_ACTIVE_PROC_STACK_ON_VICTIM: { label: "Status Type", key: "ValidProcTypes", list: true, options: procs("PT_CHILLED") },
  WEAPON_FORCED_PROC_CHANCE: { label: "Status Type", key: "ValidProcTypes", list: true, options: procs("PT_KNOCKED_DOWN") },
  WEAPON_DAMAGE_CONVERSION: { label: "Convert To", key: "SymbolFilter", options: damages("DT_IMPACT", "DT_PUNCTURE", "DT_SLASH", "DT_FIRE", "DT_ELECTRICITY", "DT_VIRAL") },
  WEAPON_DAMAGE_CONVERSION_POST_COALESCE: { label: "Convert To", key: "SymbolFilter", options: damages("DT_FIRE", "DT_FREEZE", "DT_ELECTRICITY", "DT_POISON") },
  AVATAR_STAMINA_COST_MULTIPLIER: { label: "Applies To", key: "SymbolFilter", options: [["", "Everything"], ["SLIDE_STAMINA", "Sliding"], ["HOVER_STAMINA", "Hovering"]] },
  WEAPON_PICKUP_SHOOT_BONUS: { label: "Pickup", key: "UpgradeObject", options: [["/Lotus/Types/PickUps/EnergyIncreaseSmall", "Energy"], ["/Lotus/Types/PickUps/HealthIncrease", "Health"]] },
};
const WHEN_NAMES = { PM_AIM: "When Aiming", PM_IN_AIR: "While Airborne", PM_AIRBORNE: "While Airborne", PM_BULLETJUMP: "During Bullet Jump", PM_DODGE: "While Dodging", PM_KNOCKDOWN: "When Knocked Down", PM_CLOAK: "While Invisible", PM_PARRY: "While Blocking", PM_HEAVY_MELEE: "On Heavy Attack", CC_SLIDING: "Slide Attacks", CC_GROUND_HEAVY: "Tennokai Attacks", CC_DOWNED_ENEMY: "Against Prone Enemies", PT_LIFT_HIT: "On Lifted Enemies" };
const whenName = (t, v) => (t === "WEAPON_ZOOM" && v === "PM_IN_AIR" ? "While Aim Gliding" : WHEN_NAMES[v]);
const whenOf = (u) => firstOf(u.ValidModifiers) || (/^CC_/.test(u.SymbolFilter || "") ? u.SymbolFilter : "") || (firstOf(u.ValidProcTypes) === "PT_LIFT_HIT" ? "PT_LIFT_HIT" : "");
const FIXED_FILTERS = { WEAPON_AUTO_RELOAD_RATE: "Holstered", WEAPON_CRIT_CHANCE_BODY_PART: "HEAD" };
const STAT_WHEN = {"AVATAR_INJURY_BLOCK_CHANCE": ["PM_AIM"], "WEAPON_CRIT_CHANCE": ["PM_HEAVY_MELEE", "PM_AIM", "CC_SLIDING"], "WEAPON_SPREAD": ["PM_AIM", "PM_AIRBORNE"], "WEAPON_RECOIL": ["PM_AIRBORNE"], "WEAPON_MELEE_DAMAGE": ["PM_HEAVY_MELEE", "CC_SLIDING", "CC_GROUND_HEAVY"], "WEAPON_SHIELD_PERCENT_ON_KILL": ["PM_HEAVY_MELEE"], "AVATAR_DAMAGE_TAKEN": ["PM_IN_AIR", "PM_KNOCKDOWN", "PM_DODGE", "PM_BULLETJUMP"], "WEAPON_MELEE_COMBO_GAIN_EXTRA_CHANCE": ["PM_PARRY"], "AVATAR_SLIDE_BOOST": ["PM_IN_AIR"], "WEAPON_PROC_CHANCE": ["PM_AIM", "CC_GROUND_HEAVY", "CC_DOWNED_ENEMY", "PT_LIFT_HIT"], "WEAPON_FIRE_RATE": ["PM_AIM", "PM_IN_AIR"], "WEAPON_CRIT_DAMAGE": ["PM_AIM"], "WEAPON_RANGE": ["PM_IN_AIR"], "WEAPON_ZOOM": ["PM_IN_AIR", "PM_AIM"], "WEAPON_DAMAGE_AMOUNT": ["PM_CLOAK", "PM_AIM"], "WEAPON_SNIPER_COMBO_DURATION_BONUS": ["PM_AIM"], "WEAPON_PROJECTILE_SPEED": ["PM_AIM"], "AVATAR_MOVEMENT_SPEED": ["PM_AIM"], "WEAPON_AMMO_CONSUME_RATE": ["PM_IN_AIR"], "WEAPON_LIFE_STEAL": ["PM_HEAVY_MELEE"], "WEAPON_MELEE_FINISHER_DAMAGE": ["CC_DOWNED_ENEMY"]};
const INTERNAL_STATS = new Set(["WEAPON_AUGMENT", "AVATAR_ABILITY_AUGMENT", "WEAPON_SYNDICATE_POWER", "SKILL_ABILITY_TACTICAL_EFFICIENCY"]);
const firstOf = (v) => (Array.isArray(v) ? v[0] : v);
function statChoices(cur = {}) {
  const main = h("select", { class: "input" }), when = h("select", { class: "input" });
  const mainWrap = field("Faction", main), whenWrap = field("When", when);
  const sync = (t) => {
    const c = STAT_CHOICES[t], ws = STAT_WHEN[t];
    mainWrap.hidden = !c || c.options.length < 2;
    whenWrap.hidden = !ws;
    if (c) {
      mainWrap.firstChild.textContent = c.label;
      main.replaceChildren(...c.options.map(([v, l]) => h("option", { value: v, selected: v === firstOf(cur[c.key]) }, l)));
    }
    if (ws) when.replaceChildren(h("option", { value: "" }, "Always"), ...ws.map((v) => h("option", { value: v, selected: v === whenOf(cur) }, whenName(t, v))));
  };
  const values = (t) => {
    const c = STAT_CHOICES[t], out = {};
    if (c) {
      out[c.key] = c.list ? [main.value] : main.value;
      const text = c.options.find((o) => o[0] === main.value)?.[2];
      if (text) Object.assign(out, { OverrideLocalization: 1, LocTag: text });
    }
    if (STAT_WHEN[t]) {
      const v = when.value;
      out.ValidModifiers = v.startsWith("PM_") ? [v] : [];
      if (STAT_WHEN[t].some((x) => x.startsWith("CC_"))) out.SymbolFilter = v.startsWith("CC_") ? v : "";
      if (STAT_WHEN[t].includes("PT_LIFT_HIT")) out.ValidProcTypes = v === "PT_LIFT_HIT" ? [v] : [];
    }
    return out;
  };
  return { wraps: [mainWrap, whenWrap], main, when, sync, values };
}
const showsPercent = (x, op = x?.OperationType) => !!x?.DisplayAsPercent || (!!x?.DisplayAsMultiplier && op === "STACKING_MULTIPLY");
function statLine(u) {
  const pct = showsPercent(u), max = modMaxRank(), added = u.UpgradeType === "WEAPON_PERCENT_BASE_DAMAGE_ADDED";
  const choice = STAT_CHOICES[u.UpgradeType], picked = choice?.options.find((o) => o[0] === (firstOf(u[choice.key]) ?? ""))?.[1], whenText = whenName(u.UpgradeType, whenOf(u));
  const base = added ? "Damage" : u.UpgradeType === "GAMEPLAY_FACTION_DAMAGE" && picked ? "Damage to " + picked : statName(String(u.UpgradeType)) + (picked ? " (" + picked + ")" : "");
  const name = base + (whenText ? " (" + whenText + ")" : "");
  const dmg = u.DamageType && u.DamageType !== "DT_ANY" ? enumLabel(u.DamageType) + " " : "";
  if (u.UpgradeType === "NONE" && !loc(u.LocTag)) return "Special Effect";
  if (u.UpgradeType === "NONE") return stripTags(loc(u.LocTag));
  if (typeof u.Value !== "number") return dmg + name;
  const scaled = scalesWithRank(u.OperationType) && max != null ? u.Value * (max + 1) : u.Value;
  const shown = String(+(scaled * (pct ? 100 : 1)).toFixed(1)) + (pct ? "%" : "");
  return (scaled >= 0 ? "+" : "") + shown + (dmg + name ? " " + (dmg + name).trim() : "") + (scalesWithRank(u.OperationType) ? (max ? " at max rank" : max == null ? " per rank" : "") : "");
}
function amountToValue(amount, op, pct) {
  const max = modMaxRank();
  return +(amount / (pct ? 100 : 1) / (scalesWithRank(op) && max != null ? max + 1 : 1)).toPrecision(8);
}
function valueToAmount(u) {
  const max = modMaxRank();
  return fmtNum(u.Value * (scalesWithRank(u.OperationType) && max != null ? max + 1 : 1) * (showsPercent(u) ? 100 : 1));
}
function amountText(op, pct) {
  const rank = modMaxRank();
  return (scalesWithRank(op) && rank ? "Amount at Max Rank" : scalesWithRank(op) && rank == null ? "Amount per Rank" : "Amount") + (pct ? " (%)" : "");
}
const statTemplate = (row) => ({ ...(row?.tpl || {}), ValidType: "", CheckTypeOnInstall: 0, ValidModifiers: [], InvalidModifiers: [], ValidPostures: [], ValidProcTypes: [], UpgradeObject: "", SymbolFilter: FIXED_FILTERS[row?.t] || "" });
const field = (label, input) => h("label", { class: "eye-field" }, h("span", { class: "label" }, titleCase(label)), input);
const closeForm = () => { actionForm = null; renderSides(); };
const formButtons = (text, onOk) => h("div", { class: "action-buttons" },
  h("button", { class: "btn btn-primary", type: "button", onclick: onOk }, text),
  h("button", { class: "btn btn-ghost", type: "button", onclick: closeForm }, "Cancel"));
const actionBox = (...kids) => h("div", { class: "action-form", onkeydown: (e) => {
  if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
  e.preventDefault();
  e.currentTarget.querySelector(".btn-primary")?.click();
} }, ...kids);
function focusActionForm() {
  if (!actionForm) return;
  const el = $("#sides .action-form input[inputmode]") || $("#sides .action-form input");
  el?.focus();
  el?.select();
}

function addStatForm(sn) {
  const stats = [...new Set(CATALOG.map((r) => r.t))].filter((t) => !INTERNAL_STATS.has(t) && statName(t));
  const stat = statSelect(stats, usualRow("WEAPON_PERCENT_BASE_DAMAGE_ADDED") ? "WEAPON_PERCENT_BASE_DAMAGE_ADDED" : stats[0]);
  stat.classList.remove("mini");
  const damage = h("select", { class: "input" }), how = h("select", { class: "input" });
  const amount = h("input", { class: "input", inputMode: "decimal", placeholder: "e.g. 90", autocomplete: "off" });
  const choices = statChoices(), howWrap = field("How it applies", how);
  const damageWrap = field("Damage type", damage), amountLabel = h("span", { class: "label" }), preview = h("p", { class: "muted small" }), warn = h("p", { class: "warn", hidden: true });
  const chosen = () => {
    const t = stat.value, d = damageWrap.hidden ? "DT_ANY" : damage.value, o = how.value;
    return { t, d, o, exact: CATALOG.find((r) => r.t === t && r.d === d && r.o === o), usual: usualRow(t, d) || usualRow(t) };
  };
  const update = () => {
    const { o, exact, usual } = chosen(), pct = showsPercent((exact || usual)?.tpl, o);
    amountLabel.textContent = amountText(o, pct);
    const n = Number(amount.value);
    preview.textContent = amount.value.trim() && !isNaN(n) ? "In game: " + statLine({ UpgradeType: stat.value, DamageType: chosen().d, OperationType: o, DisplayAsPercent: pct, ...choices.values(stat.value), Value: amountToValue(n, o, pct) }) : "";
    const notes = [];
    if (!(exact?.loc || usual?.loc)) notes.push("No card text exists for this combination, so the mod card may not show this line.");
    warn.textContent = notes.join(" ");
    warn.hidden = !notes.length;
  };
  const fillHow = () => {
    const d = damageWrap.hidden ? "DT_ANY" : damage.value, rows = statRows(stat.value, d).sort((a, b) => b.n - a.n), seen = rows.map((r) => r.o);
    howWrap.hidden = new Set(seen).size < 2;
    how.replaceChildren(...[...new Set(seen)].map((o, i) => h("option", { value: o }, enumLabel(o) + (i === 0 ? " (usual)" : ""))));
    update();
  };
  const fillDamage = () => {
    const ds = [...new Set(statRows(stat.value).map((r) => r.d))].sort((a, b) => (b === "DT_ANY") - (a === "DT_ANY"));
    damageWrap.hidden = !ds.some((d) => d !== "DT_ANY");
    damage.replaceChildren(...ds.map((d) => h("option", { value: d }, enumLabel(d))));
    choices.sync(stat.value);
    fillHow();
  };
  stat.addEventListener("change", fillDamage);
  damage.addEventListener("change", fillHow);
  how.addEventListener("change", update);
  choices.main.addEventListener("change", update);
  choices.when.addEventListener("change", update);
  amount.addEventListener("input", update);
  fillDamage();
  return actionBox(h("div", { class: "sec-title" }, "Add a stat"),
    field("Stat", stat), choices.wraps, damageWrap, howWrap, h("label", { class: "eye-field" }, amountLabel, amount), preview, warn,
    formButtons("Add stat", () => {
      const { t, d, o, exact, usual } = chosen(), n = Number(amount.value);
      if (!amount.value.trim() || isNaN(n)) { toast("Enter an amount"); return; }
      const src = exact || usual, pct = showsPercent(src?.tpl, o), text = exact?.loc || usual?.loc || "";
      const entry = { UpgradeType: t, OperationType: o, Value: amountToValue(n, o, pct), DamageType: d, ...statTemplate(src), ...(text ? { OverrideLocalization: 1, LocTag: text } : {}), ...choices.values(t) };
      const list = ed.sides[sn].edit.Upgrades;
      runAction("Add " + statLine(entry), () => record(sn, Array.isArray(list) ? { t: "push", path: ["Upgrades"], v: entry } : { t: "addKey", path: ["Upgrades"], v: [entry] }));
    }));
}
function changeStatForm(sn, i) {
  const u = ed.sides[sn].edit.Upgrades[i], pct = showsPercent(u), was = String(u.UpgradeType), wasDamage = u.DamageType || "DT_ANY";
  const stat = statSelect([...new Set([was, ...CATALOG.map((r) => r.t).filter((t) => !INTERNAL_STATS.has(t) && statName(t))])], was);
  stat.classList.remove("mini");
  const damage = h("select", { class: "input" }), damageWrap = field("Damage type", damage);
  const choices = statChoices(u);
  const amount = h("input", { class: "input", inputMode: "decimal", value: valueToAmount(u), autocomplete: "off" });
  const fillDamage = () => {
    const ds = [...new Set([...(stat.value === was ? [wasDamage] : []), ...statRows(stat.value).map((r) => r.d)])].filter(Boolean).sort((a, b) => (b === "DT_ANY") - (a === "DT_ANY"));
    damageWrap.hidden = !ds.some((d) => d !== "DT_ANY");
    damage.replaceChildren(...ds.map((d) => h("option", { value: d, selected: d === wasDamage }, enumLabel(d))));
    choices.sync(stat.value);
  };
  stat.addEventListener("change", fillDamage);
  fillDamage();
  return actionBox(h("div", { class: "sec-title" }, statName(was) ? "Change " + statName(was) : "Change stat"),
    field("Stat", stat), choices.wraps, damageWrap, field(amountText(u.OperationType, pct), amount),
    formButtons("Change stat", () => {
      const n = Number(amount.value), t = stat.value, d = damageWrap.hidden ? "DT_ANY" : damage.value;
      if (!amount.value.trim() || isNaN(n)) { toast("Enter an amount"); return; }
      const picks = choices.values(t), samePicks = Object.entries(picks).every(([k, v]) => JSON.stringify(v) === JSON.stringify(u[k] ?? (Array.isArray(v) ? [] : "")));
      if (t === was && d === wasDamage && samePicks) {
        const v = amountToValue(n, u.OperationType, pct);
        runAction("Change to " + statLine({ ...u, Value: v }), () => record(sn, { t: "set", path: ["Upgrades", String(i), "Value"], v }));
        return;
      }
      const row = CATALOG.find((r) => r.t === t && r.d === d && r.o === u.OperationType) || usualRow(t, d) || usualRow(t), rowPct = row ? showsPercent(row.tpl, u.OperationType) : pct;
      const next = { ...u, UpgradeType: t, DamageType: d, DisplayAsPercent: row?.tpl.DisplayAsPercent ?? u.DisplayAsPercent ?? 0, DisplayAsMultiplier: row?.tpl.DisplayAsMultiplier ?? u.DisplayAsMultiplier ?? 0, Value: amountToValue(n, u.OperationType, rowPct), OverrideLocalization: row?.loc ? 1 : 0, LocTag: row?.loc || "", SymbolFilter: FIXED_FILTERS[t] || "", UpgradeObject: "", ValidProcTypes: [], ValidModifiers: [], ...picks };
      runAction("Change to " + statLine(next), () => Object.keys(next).filter((k) => JSON.stringify(next[k]) !== JSON.stringify(u[k] ?? (Array.isArray(next[k]) ? [] : ""))).forEach((k) => record(sn, { t: "set", path: ["Upgrades", String(i), k], v: next[k] })));
    }));
}
const enumSelect = (vals, cur) => h("select", { class: "input" }, cur == null ? h("option", { value: "" }, "(none)") : null, [...new Set([cur, ...vals])].filter(Boolean).map((v) => h("option", { value: v, selected: v === cur }, enumLabel(v))));
function infoForm(sn) {
  const e = ed.sides[sn].edit;
  const name = h("input", { class: "input", value: loc(e.LocalizeTag) || e.LocalizeTag || "", autocomplete: "off", spellcheck: "false" });
  const desc = h("input", { class: "input", value: loc(e.LocalizeDescTag) || e.LocalizeDescTag || "", autocomplete: "off", spellcheck: "false" });
  const rarity = enumSelect(["COMMON", "UNCOMMON", "RARE", "LEGENDARY"], e.Rarity);
  const isMod = ed.group === "mod";
  const pol = isMod ? enumSelect(Object.keys(ENUM_NAMES).filter((k) => k.startsWith("AP_")), e.ArtifactPolarity) : null;
  const drain = isMod ? enumSelect(FIELDS.mod?.BaseDrain?.enum || [], e.BaseDrain) : null;
  const groups = compatGroups(), curCompat = e.ItemCompatibility || "";
  const main = new Set(MAIN_COMPAT.map(([k]) => k));
  const compatOption = (v) => h("option", { value: v, selected: v === curCompat }, groups.get(v) || tail(v));
  const rest = [...new Set([curCompat, ...groups.keys()])].filter((v) => v && !main.has(v)).sort((a, b) => (groups.get(a) || tail(a)).localeCompare(groups.get(b) || tail(b)));
  const compat = h("select", { class: "input" }, h("optgroup", { label: "Main groups" }, MAIN_COMPAT.map(([k]) => compatOption(k))), h("optgroup", { label: "Specific" }, rest.map(compatOption)));
  const curType = modType(e);
  const type = h("select", { class: "input" }, MOD_TYPES.map(([v, l]) => h("option", { value: v, selected: v === curType }, v ? l : builtInType(ed.path) || l)));
  const oldName = name.value, oldDesc = desc.value;
  return actionBox(h("div", { class: "sec-title" }, "Change info"),
    field("Name", name), field("Description", desc), field("Rarity", rarity), pol ? field("Polarity", pol) : null, drain ? field("Base drain", drain) : null,
    isMod ? field("Compatible with", compat) : null, isMod ? field("Mod type", type) : null,
    formButtons("Apply", () => {
      const n = name.value.trim(), d = desc.value.trim(), edits = [];
      if (n && n !== oldName) edits.push(["LocalizeTag", n, "Name: " + n]);
      if (d !== oldDesc) edits.push(["LocalizeDescTag", d, "Description changed"]);
      if (rarity.value && rarity.value !== e.Rarity) edits.push(["Rarity", rarity.value, "Rarity: " + enumLabel(rarity.value)]);
      if (pol?.value && pol.value !== e.ArtifactPolarity) edits.push(["ArtifactPolarity", pol.value, "Polarity: " + enumLabel(pol.value)]);
      if (drain?.value && drain.value !== e.BaseDrain) edits.push(["BaseDrain", drain.value, "Base drain: " + enumLabel(drain.value)]);
      if (isMod && compat.value !== curCompat) edits.push(["ItemCompatibility", compat.value, "Compatible with: " + (groups.get(compat.value) || tail(compat.value))]);
      if (isMod && type.value !== curType) {
        if (curType) edits.push([curType, 0, ""]);
        if (type.value) edits.push([type.value, 1, ""]);
        edits.push(null);
      }
      const typeChanged = edits.includes(null), list = edits.filter(Boolean);
      if (typeChanged) list.at(-1)[2] = "Mod type: " + type.selectedOptions[0].textContent;
      if (!list.length) { closeForm(); return; }
      runAction(list.map((x) => x[2]).filter(Boolean).join(", "), () => list.forEach(([k, v]) => record(sn, { t: "set", path: [k], v })));
    }));
}
const outTabs = { basic: "preview", advanced: "output" };
const outMode = () => (isAdvanced() ? "advanced" : "basic");
let previewKey = null, previewQueued = false;
const previewEdit = () => (ed?.group === "mod" || ed?.group === "arcane" ? ed.sides?.[actionSide()]?.edit : null);
function fitCard() {
  const card = $("#card-preview .mod-card"), body = card?.querySelector(".mod-body");
  if (body) card.style.setProperty("--mod-extra", Math.max(0, Math.ceil(body.offsetHeight - (parseFloat(getComputedStyle(body).minHeight) || 0))) + "px");
}
function drawCard() {
  const e = previewEdit();
  if (!e || $("#card-preview").hidden) return;
  const key = JSON.stringify([e, ed.path, modMaxRank()]);
  if (key === previewKey) return;
  previewKey = key;
  $("#card-preview").replaceChildren(modCard(e));
  fitCard();
}
function syncPreview() {
  if (!previewEdit()) { setOutTab(null); return; }
  if (!$("#action-info").childElementCount) $("#action-info").replaceChildren(usualValues());
  setOutTab(outTabs[outMode()]);
  if (previewQueued) return;
  previewQueued = true;
  queueMicrotask(() => { previewQueued = false; drawCard(); });
}
function setOutTab(tab) {
  const on = !!tab;
  $("#out-tabs").hidden = !on;
  $("#out-title").hidden = on;
  $("#out-tabs").prepend($(`#out-tabs [data-tab="${isAdvanced() ? "output" : "preview"}"]`));
  for (const b of $("#out-tabs").children) b.classList.toggle("on", b.dataset.tab === tab);
  $("#card-preview").hidden = tab !== "preview";
  $("#action-info").hidden = !on;
  $("#output").hidden = tab === "preview";
  $("#btn-copy").hidden = tab === "preview";
}
const POLARITY_ICONS = { AP_ATTACK: "Triangle", AP_DEFENSE: "Point", AP_TACTIC: "Circle", AP_POWER: "Mark", AP_PRECEPT: "Precept", AP_ANY: "Aura", AP_WARD: "Ward", AP_UMBRA: "Umbra", AP_UNIVERSAL: "Universal" };
const DRAIN_STEPS = { QA_NONE: 0, QA_LOW: 1, QA_MEDIUM: 2, QA_HIGH: 3, QA_VERY_HIGH: 4 };
function cardDrain(e) {
  const raw = ed.entry?.raw, rank = modMaxRank();
  if (typeof raw?.baseDrain !== "number" || rank == null) return null;
  const was = ed.sides[actionSide()].base.BaseDrain;
  return raw.baseDrain + rank + ((DRAIN_STEPS[e.BaseDrain] ?? 0) - (DRAIN_STEPS[was] ?? 0)) * 2;
}
const CARD_STYLES = window.CARD_STYLES || {};
const CARD_LABELS = [
  [/\/Mods\/Immortal\/Antivirus/, "Antivirus"], [/\/Mods\/Immortal\//, "Immortal"], [/Grimoire|\/Tome/, "Grimoire"], [/\/Kahl/, "Kahl"],
  [/\/DataSpike\/Potency\//, "Potency"], [/\/Mods\/Randomized\//, "Omega"],
];
const TEXT_COLORS = { Common: "#dda085", Uncommon: "#e4e4e4", Rare: "#fdebbd", Omega: "#ac83d5" };
const MAIN_COMPAT = [
  ["/Lotus/Types/Game/PowerSuits/PlayerPowerSuit", "Warframe"], ["/Lotus/Types/Game/Pets/PetPowerSuit", "Companion"], ["/Lotus/Types/Game/SentinelPowerSuit", "Sentinel"],
  ["/Lotus/Types/Game/KubrowPet/KubrowPetPowerSuit", "Kubrow"], ["/Lotus/Types/Game/CatbrowPet/CatbrowPetPowerSuit", "Kavat"], ["/Lotus/Types/Game/Pets/RoboticPetPowerSuit", "Robotic Companion"],
  ["/Lotus/Types/Game/LotusWeapon", "Any Weapon"], ["/Lotus/Weapons/Tenno/LotusLongGun", "Primary"], ["/Lotus/Weapons/Tenno/Pistol/LotusPistol", "Secondary"], ["/Lotus/Types/Game/LotusMeleeWeapon", "Melee"],
  ["/Lotus/Types/Game/FlightJetPackItems/PlayerFlightJetPackItem", "Archwing"], ["/Lotus/Powersuits/EntratiMech/BaseMechSuit", "Necramech"], ["/Lotus/Types/Vehicles/Hoverboard/HoverboardSuit", "K-Drive"],
  ["/Lotus/Powersuits/Operator/OperatorSuit", "Operator"], ["/Lotus/Types/Game/CrewShip/CrewShip", "Railjack"],
];
const MOD_TYPES = [["", "Standard"], ["IsAmalgam", "Amalgam"], ["IsGalvanized", "Galvanized"], ["IsGrimoire", "Grimoire"], ["IsImmortal", "Immortal"]];
let compatCache = null, compatSource = null;
function compatGroups() {
  if (compatCache && compatSource === listCache.upgrade) return compatCache;
  const groups = new Map(MAIN_COMPAT);
  for (const i of listCache.upgrade || []) if (i.raw.compat && i.raw.compatName && !groups.has(i.raw.compat)) groups.set(i.raw.compat, i.raw.compatName);
  compatSource = listCache.upgrade;
  return (compatCache = groups);
}
const builtInType = (path) => (/\/Kahl\//.test(path) ? "Kahl" : /\/Immortal\/Antivirus/.test(path) ? "Antivirus" : "");
const modType = (e) => MOD_TYPES.find(([k]) => k && Number(e[k]))?.[0] || "";
function cardLabel(path, rarity, e) {
  const flagged = e && modType(e);
  if (flagged) return flagged.slice(2);
  const m = CARD_LABELS.find(([re]) => re.test(path));
  if (m) return m[1];
  const label = ENUM_NAMES[rarity] || "Common";
  if (/\/Mods\/Railjack\//.test(path)) return "Avionics" + (label === "Legendary" ? "Rare" : label);
  if (/\/Mods\/Antiques\//.test(path)) return rarity === "COMMON" ? "AntiquesSilver" : rarity === "UNCOMMON" ? "AntiquesRed" : "AntiquesBlue";
  return label;
}
const ICON_TINTS = { Common: [0.8, 0.5, 0.2], Uncommon: [0.4, 0.7, 1.5], Rare: [1.5, 1.2, 0.4], Legendary: [0.6, 1.3, 1.5], Omega: [0.67, 0.514, 0.835], Amalgam: [0.6, 0.3, 0.3] };
const opaqueCache = new Map(), opaqueDone = new Map();
async function decodeOpaque(url) {
  const b = new Uint8Array(await (await fetch(url)).arrayBuffer()), v = new DataView(b.buffer);
  let p = 8, w = 0, hh = 0, depth = 0, type = 0, interlaced = 0;
  const parts = [];
  while (p < b.length) {
    const len = v.getUint32(p), t = String.fromCharCode(b[p + 4], b[p + 5], b[p + 6], b[p + 7]);
    if (t === "IHDR") { w = v.getUint32(p + 8); hh = v.getUint32(p + 12); depth = b[p + 16]; type = b[p + 17]; interlaced = b[p + 20]; }
    if (t === "IDAT") parts.push(b.subarray(p + 8, p + 8 + len));
    p += 12 + len;
  }
  if (depth !== 8 || interlaced || (type !== 6 && type !== 2)) throw new Error("unsupported");
  const raw = new Uint8Array(await new Response(new Blob(parts).stream().pipeThrough(new DecompressionStream("deflate"))).arrayBuffer());
  const bpp = type === 6 ? 4 : 3, stride = w * bpp, out = new ImageData(w, hh);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < hh; y++) {
    const f = raw[y * (stride + 1)], row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? row[i - bpp] : 0, u = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
      if (f === 1) row[i] += a;
      else if (f === 2) row[i] += u;
      else if (f === 3) row[i] += (a + u) >> 1;
      else if (f === 4) {
        const q = a + u - c, pa = Math.abs(q - a), pb = Math.abs(q - u), pc = Math.abs(q - c);
        row[i] += pa <= pb && pa <= pc ? a : pb <= pc ? u : c;
      }
    }
    prev = row;
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      out.data[o] = row[x * bpp]; out.data[o + 1] = row[x * bpp + 1]; out.data[o + 2] = row[x * bpp + 2]; out.data[o + 3] = 255;
    }
  }
  return out;
}
function cardIcon(url) {
  const c = h("canvas", { class: "mod-art" });
  const paint = (d) => { c.width = d.width; c.height = d.height; c.getContext("2d").putImageData(d, 0, 0); };
  if (opaqueDone.has(url)) { paint(opaqueDone.get(url)); return c; }
  if (!opaqueCache.has(url)) opaqueCache.set(url, decodeOpaque(url));
  opaqueCache.get(url).then((d) => { opaqueDone.set(url, d); paint(d); }).catch(() => {
    const img = new Image();
    img.onload = () => { c.width = img.width; c.height = img.height; c.getContext("2d").drawImage(img, 0, 0); };
    img.src = url;
  });
  return c;
}
const CARD_RAILS = { Common: "#9a6a42", Uncommon: "#b4bcc8", Rare: "#c9a24a", Legendary: "#d8e8f0", Amalgam: "#b9bcc2", Omega: "#8a70b0", Galvanized: "#c8c8d0", Kahl: "#a0623a", Grimoire: "#c9a24a" };
const LIGHT_STYLES = new Set(["Common", "Uncommon", "Rare", "Legendary", "Omega", "Amalgam", "Galvanized", "Kahl"]);
const CARD_ASSETS = "https://battlearmorambassador.github.io/mimimimg/cards/";
const cardArt = (n) => CARD_ASSETS + String(n).padStart(3, "0") + ".png";
const artMissing = (ev) => { ev.target.style.visibility = "hidden"; ev.target.closest(".mod-card")?.classList.add("mod-plain"); };
function cardPiece(r, cls, oy, moves) {
  return r ? h("img", { class: cls, src: cardArt(r[0]), alt: "", onerror: artMissing, style: `left:${128 + r[1]}px;top:calc(${oy + r[2]}px${moves ? " + var(--mod-extra, 0px)" : ""});width:${r[3]}px;height:${r[4]}px` }) : null;
}
function cardBack(r) {
  if (!r) return null;
  const src = cardArt(r[0]);
  return [h("img", { src, alt: "", hidden: true, onerror: artMissing }), h("div", { class: "mod-bg", style: `left:${128 + r[1]}px;top:${184 + r[2]}px;width:${r[3]}px;border-image-source:url(${src})` })];
}
function cardStatText(u) {
  const text = loc(u.LocTag);
  if (!text || (u.OverrideLocalization === 0)) return statLine(u).replace(/ (at max rank|per rank)$/, "");
  const max = modMaxRank(), v = typeof u.Value === "number" ? u.Value * (scalesWithRank(u.OperationType) && max != null ? max + 1 : 1) * (showsPercent(u) ? 100 : 1) : 0;
  return stripTags(text.replace(/\|val\|/gi, (v >= 0 ? "+" : "") + fmtNum(v)));
}
function modCard(e) {
  const rank = modMaxRank(), drain = cardDrain(e), raw = ed.entry?.raw;
  const icon = e.Icon || ed.entry?.icon, stats = (Array.isArray(e.Upgrades) ? e.Upgrades : []).filter(isObj);
  const text = (k) => loc(k) || (typeof k === "string" && !k.startsWith("/") ? k : "");
  const tag = String(compatGroups().get(e.ItemCompatibility) || raw?.compatName || tail(String(e.ItemCompatibility || ""))).replace(/^Lotus/, "");
  const label = cardLabel(ed.eye?.base || ed.path, String(e.Rarity || "COMMON"), e), style = CARD_STYLES[label] || CARD_STYLES.Common || {};
  const glow = (ICON_TINTS[label] || [1, 1, 1]).map((c) => Math.round(Math.min(1, c / 1.5) * 255)).join(",");
  const stone = label === "Immortal";
  const rune = /\/Mods\/Immortal\//.test(ed.eye?.base || ed.path);
  const lights = LIGHT_STYLES.has(label) ? CARD_ASSETS + "lights-" + label + ".png" : null;
  return h("div", { class: "mod-card mod-" + label.toLowerCase() + (stone ? " mod-stone" : ""), style: "--mod-text:" + (TEXT_COLORS[label] || "#fff") + ";--mod-rail:" + (CARD_RAILS[label] || "#9aa") + ";--mod-glow:" + glow },
    h("div", { class: "mod-clip" }, cardBack(style.bg), icon ? (rune ? h("img", { class: "mod-art", src: IMG + icon, alt: "", onerror: hideBroken }) : cardIcon(IMG + icon)) : null, rune ? null : h("div", { class: "mod-glow" })),
    stone ? null : h("i", { class: "mod-rail mod-rail-left" }), stone ? null : h("i", { class: "mod-rail mod-rail-right" }),
    h("div", { class: "mod-body" },
      h("div", { class: "mod-name" }, text(e.LocalizeTag) || tail(ed.path)),
      text(e.LocalizeDescTag) ? h("div", { class: "mod-desc" }, stripTags(text(e.LocalizeDescTag))) : null,
      stats.map((u) => h("div", { class: "mod-stat" }, cardStatText(u)))),
    stone ? null : h("img", { class: "mod-tagbg", src: cardArt(86), alt: "", onerror: artMissing }),
    tag ? h("div", { class: "mod-tag" }, tag.toUpperCase()) : null,
    cardPiece(style.bottom, "mod-piece mod-piece-bottom", 254, true),
    cardPiece(style.top, "mod-piece mod-piece-top", -16),
    lights ? ["", " mod-lights-flip"].flatMap((flip) => ["mod-lights-top", "mod-lights-end"].map((part) => h("img", { class: "mod-lights " + part + flip, src: lights, alt: "", onerror: artMissing }))) : null,
    !stone && (drain != null || POLARITY_ICONS[e.ArtifactPolarity]) ? h("div", { class: "mod-top" }, drain != null ? String(drain) : null, POLARITY_ICONS[e.ArtifactPolarity] ? h("img", { src: IMG + "/Lotus/Interface/Polarity" + POLARITY_ICONS[e.ArtifactPolarity] + ".png", alt: enumLabel(e.ArtifactPolarity), title: enumLabel(e.ArtifactPolarity), onerror: hideBroken }) : null) : null,
    stone ? h("div", { class: "mod-stone-rank" }, h("img", { src: cardArt(132), alt: "", onerror: artMissing, style: "left:64px;top:calc(284px + var(--mod-extra, 0px));width:128px;height:16px" }), [-42.3, -16.3, 10].map((x) => h("img", { src: cardArt(184), alt: "", onerror: artMissing, style: `left:${128 + x}px;top:calc(276px + var(--mod-extra, 0px));width:32px;height:32px` }))) : null,
    !stone && rank != null ? h("div", { class: "mod-rank" }, Array.from({ length: rank }, (_, n) => h("img", { src: cardArt(90), alt: "", onerror: artMissing, style: `left:${128 + (-rank * 0.5 + n + 0.5) * 13 - 16}px` }))) : null);
}
function usualValues() {
  const rows = new Map();
  for (const r of CATALOG) {
    const key = r.t + "|" + r.d, cur = rows.get(key);
    if (!cur || r.n > cur.n) rows.set(key, r);
  }
  const top = [...rows.values()].filter((r) => r.n >= 5 && !INTERNAL_STATS.has(r.t) && statName(r.t)).sort((a, b) => statName(a.t).localeCompare(statName(b.t)) || a.d.localeCompare(b.d));
  return h("details", { class: "action-info" }, h("summary", {}, "Information"),
    h("p", { class: "muted small" }, "How the game normally applies each stat."),
    h("div", { class: "action-info-list" }, top.map((r) => h("div", {}, h("span", {}, (r.d !== "DT_ANY" ? enumLabel(r.d) + " " : "") + (r.t === "WEAPON_PERCENT_BASE_DAMAGE_ADDED" ? "Damage" : statName(r.t))), h("span", { class: "muted" }, enumLabel(r.o))))));
}
function statValue(u) {
  const m = statLine(u).match(/^(.*) (at max rank|per rank)$/);
  return m ? h("span", {}, m[1], h("small", { class: "muted" }, m[2])) : h("span", {}, statLine(u));
}
function changesBar() {
  const changes = ed.actions || [], redo = ed.redo || [];
  if (!changes.length && !redo.length) return null;
  return h("div", { class: "action-undo" }, h("details", { open: changesOpen, ontoggle: (ev) => (changesOpen = ev.target.open) },
      h("summary", { class: "muted small" }, changes.length === 1 ? "1 change" : changes.length + " changes"),
      h("div", { class: "action-log" }, changes.map((a) => h("div", {}, h("span", {}, a.label), h("button", { class: "btn-x", type: "button", title: "Undo this change", onclick: () => undoAction(a.id) }, "×"))))),
    changes.length ? h("button", { class: "btn btn-ghost", type: "button", title: changes.at(-1).label, onclick: () => undoAction(changes.at(-1).id) }, "Undo") : null,
    redo.length ? h("button", { class: "btn btn-ghost", type: "button", title: redo.at(-1).action.label, onclick: redoAction }, "Redo") : null,
    changes.length ? h("button", { class: "btn btn-ghost", type: "button", onclick: undoAllActions }, "Undo all") : null);
}
const INFO_KEYS = new Set(["LocalizeTag", "LocalizeDescTag", "PassiveAbilityLocTag"]);
const ITEM_TITLES = { stats: "Change stats", abilities: "Change abilities", slots: "Change polarity slots", info: "Change info" };
function itemIntents(e) {
  const layout = basicLayout(e), general = layout[0][1];
  const usable = (r) => hasAt(e, r[1]) && !isObj(getAt(e, r[1]));
  const group = (title) => (layout.find(([t]) => t === title)?.[1] || []).filter(usable);
  const stats = general.filter((r) => !INFO_KEYS.has(r[1][0]) && r[1][0] !== "Icon");
  for (const [title, rows] of layout.slice(1)) {
    if (title === "Polarity slots" || title === "Abilities") continue;
    stats.push(...rows.map((r) => (title === "Stats" ? r : [title + ": " + r[0], r[1], r[2]])));
  }
  return { stats: stats.filter(usable), abilities: group("Abilities"), slots: group("Polarity slots"), info: general.filter((r) => INFO_KEYS.has(r[1][0])) };
}
const abilityPath = (sn, v) => (String(v).startsWith("/") ? v : relTo(ed.sides[sn].origin?.AbilityTypes || ed.path, v));
function abilityNames() {
  const names = new Map();
  for (const i of listCache.suit || []) for (const a of i.raw.abilities || []) if (a.uniqueName && !names.has(a.uniqueName)) names.set(a.uniqueName, stripTags(loc(a.name) || tail(a.uniqueName)));
  return names;
}
function itemInput(sn, kind, path, names) {
  const v = getAt(ed.sides[sn].edit, path);
  if (kind === "slots") return enumSelect(Object.keys(ENUM_NAMES).filter((k) => k.startsWith("AP_")), v);
  if (kind === "abilities") {
    const cur = abilityPath(sn, v), rest = [...names].filter(([p]) => p !== cur).sort((a, b) => a[1].localeCompare(b[1]));
    return h("select", { class: "input" }, [[cur, names.get(cur) || tail(cur)], ...rest].map(([p, n]) => h("option", { value: p, selected: p === cur }, n)));
  }
  if (typeof v === "number") return h("input", { class: "input", inputMode: "decimal", value: String(v), autocomplete: "off" });
  return h("input", { class: "input", value: loc(v) || v || "", autocomplete: "off", spellcheck: "false" });
}
function itemForm(sn, kind) {
  const e = ed.sides[sn].edit, names = kind === "abilities" ? abilityNames() : null;
  const inputs = itemIntents(e)[kind].map(([label, path, mirror]) => {
    const el = itemInput(sn, kind, path, names);
    return { label, path, mirror: mirror || [], el, old: el.value, number: typeof getAt(e, path) === "number" };
  });
  return actionBox(h("div", { class: "sec-title" }, ITEM_TITLES[kind]), inputs.map((x) => field(x.label, x.el)),
    formButtons("Apply", () => {
      const bad = inputs.find((x) => x.number && (!x.el.value.trim() || isNaN(Number(x.el.value))));
      if (bad) { toast("Enter a number for " + titleCase(bad.label)); return; }
      const changed = inputs.filter((x) => (x.number ? Number(x.el.value) !== Number(x.old) : x.el.value !== x.old));
      if (!changed.length) { closeForm(); return; }
      const shown = (x) => (x.el.tagName === "SELECT" ? x.el.selectedOptions[0].textContent : x.el.value);
      const label = changed.length > 3 ? changed.length + " values changed" : changed.map((x) => titleCase(x.label) + ": " + shown(x)).join(", ");
      runAction(label, () => {
        if (kind === "abilities") { record(sn, { t: "set", path: ["AbilityTypes"], v: inputs.map((x) => x.el.value) }); return; }
        for (const x of changed) for (const path of [x.path, ...x.mirror]) record(sn, { t: "set", path, v: x.number ? Number(x.el.value) : x.el.value });
      });
    }));
}
function renderItemActions(sn) {
  const e = ed.sides[sn].edit, it = itemIntents(e);
  const open = (kind) => () => { actionForm = { kind: "item", item: kind }; renderSides(); };
  const row = (label, value) => h("div", { class: "action-stat action-value" }, h("span", {}, titleCase(label)), h("span", { class: "muted" }, value));
  const names = it.abilities.length ? abilityNames() : null;
  return h("div", { class: "sec actions-view", "data-side": sn },
    actionForm?.kind === "item" ? itemForm(sn, actionForm.item)
      : h("div", { class: "action-list" }, h("div", { class: "sec-title" }, "What do you want to do?"),
        h("div", { class: "action-row" }, Object.keys(ITEM_TITLES).map((k) => (it[k].length ? h("button", { class: "btn", type: "button", onclick: open(k) }, ITEM_TITLES[k]) : null)))),
    h("div", { class: "action-summary" }, h("div", { class: "sec-title" }, "Current stats"),
      it.stats.length ? null : h("div", { class: "muted small" }, "This item has no stats to show here."),
      it.stats.map(([label, path]) => row(label, String(getAt(e, path)))),
      it.abilities.map(([label, path]) => { const p = abilityPath(sn, getAt(e, path)); return row(label, names.get(p) || tail(p)); }),
      it.slots.length ? row("Polarity slots", it.slots.map(([, path]) => enumLabel(getAt(e, path))).join(", ")) : null),
    changesBar());
}
function renderActions(sn) {
  const e = ed.sides[sn].edit, stats = Array.isArray(e.Upgrades) ? e.Upgrades : [];
  if (actionForm?.kind === "change" && !isObj(stats[actionForm.i])) actionForm = null;
  const open = (form) => () => { actionForm = form; renderSides(); };
  const choice = (title, form) => h("button", { class: "btn", type: "button", onclick: open(form) }, title);
  return h("div", { class: "sec actions-view", "data-side": sn },
    actionForm?.kind === "add" ? addStatForm(sn) : actionForm?.kind === "change" ? changeStatForm(sn, actionForm.i) : actionForm?.kind === "info" ? infoForm(sn)
      : h("div", { class: "action-list" }, h("div", { class: "sec-title" }, "What do you want to do?"),
        h("div", { class: "action-row" }, choice("Add a stat", { kind: "add" }), choice("Change info", { kind: "info" }))),
    h("div", { class: "action-summary" },
      h("div", { class: "sec-title" }, "Current stats"),
      stats.length ? null : h("div", { class: "muted small" }, "This item has no stats yet."),
      stats.map((u, i) => (isObj(u) ? h("div", { class: "action-stat" }, statValue(u),
        typeof u.Value === "number" ? h("button", { class: "btn btn-ghost", type: "button", onclick: open({ kind: "change", i }) }, "Change") : null,
        h("button", { class: "btn btn-ghost", type: "button", onclick: () => runAction("Remove " + statLine(u), () => record(sn, { t: "del", path: ["Upgrades", String(i)] })) }, "Remove")) : null))),
    changesBar());
}
$("#out-tabs").addEventListener("click", (e) => { if (e.target.dataset.tab) { outTabs[outMode()] = e.target.dataset.tab; syncPreview(); } });
document.fonts?.ready.then(fitCard);