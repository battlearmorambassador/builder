"use strict";
async function avatarSuitPath(t, path) {
  const inv = t.data.InventoryControllerType;
  if (typeof inv === "string") {
    const it = await loadType(relTo(t.origin.InventoryControllerType || path, inv));
    const list = (it?.data.DefaultInv || []).map((x) => relTo(it.origin.DefaultInv, x));
    const found = list.find((x) => /^\/Lotus\/Powersuits\/|\/[^/]*Suit$/.test(x));
    if (found) return found;
  }
  const stem = path.replace(/(Tenno)?Avatar$/, "");
  for (const p of [stem + "Suit", stem + "SuitRemaster"]) {
    const st = await loadType(p).catch(() => null);
    if (st && [p, ...st.parents].some((x) => /PowerSuits\/PlayerPowerSuit$/.test(x))) return p;
  }
  return null;
}
const POWER_SUIT_STORE = "/Lotus/Types/Game/StoreItemSpecializations/PowerSuitStoreItem";
async function avatarLook(t, path, own, target) {
  const custom = own.data.DefaultCustomization || {}, at = own.origin.DefaultCustomization || target;
  const item = (slot) => (typeof custom[slot]?.ItemType === "string" ? relTo(at, custom[slot].ItemType) : "");
  const helmet = item("Helmet");
  let skin = item("BodySkin");
  if (!skin && helmet) skin = helmet.replace(/[^/]*$/, "") + tail(target).replace(/Suit$/, "") + T.skin;
  const st = skin ? await loadType(skin).catch(() => null) : null;
  if (!st || !t.data.Mesh) return null;
  const has = new Set((st.data.THIRD_PERSON_Attachment?.UpgradeAutoChildren || []).map((c) => tail(relTo(skin, c.Type))));
  const kids = childrenOf(t, path).filter((c) => !isFx(c.Type) && !has.has(tail(c.Type)));
  const head = kids.filter(isHeadPart);
  const over = st.data.UpgradeSkinOverride;
  return { skin, helmet, mesh: relTo(t.origin.Mesh || path, t.data.Mesh), meshItem: typeof over === "string" ? relTo(st.origin.UpgradeSkinOverride || skin, over) : "", head, body: kids.filter((c) => !head.includes(c)) };
}
const FLAG = atob("ZW5lbXlTdWl0cw==");
const extended = () => store.get(FLAG) === true;
const SUIT_BASE = "/Lotus/Types/Game/PowerSuits/PlayerPowerSuit";
const visual = (c) => !/Spawner|Trigger|Handler/i.test(tail(c.Type));
async function avatarDecos(t, path, bodyMesh = t.data.Mesh, headGiven = false) {
  const list = (x, at) => childrenOf(x, at).filter((c) => !isFx(c.Type));
  const file = (p) => tail(String(p || "")).toLowerCase(), folder = (p) => String(p).replace(/[^/]*$/, ""), body = folder(t.data.Mesh);
  const meshOf = async (type) => { const x = await loadType(type).catch(() => null); return x?.data.Mesh ? file(x.data.Mesh) : ""; };
  const own = [];
  for (const c of list(t, path).filter(visual)) if (!bodyMesh || (await meshOf(c.Type)) !== file(bodyMesh)) own.push(c);
  const seen = new Set(own.map((c) => c.Type)), hasHead = headGiven || /head/i.test(file(bodyMesh)) || own.some((c) => /Head/i.test(tail(c.Type)));
  const head = t.data.FacialMorphHeadAttachmentType;
  if (typeof head === "string" && head && !hasHead && t.origin.FacialMorphHeadAttachmentType === t.origin.Mesh) {
    const type = relTo(t.origin.FacialMorphHeadAttachmentType || path, head);
    if (!seen.has(type)) { seen.add(type); own.push({ LocalPosition: [0, 0, 0], LocalRotation: [0, 0, 0, 1], BoneName: "", Type: type, Chance: 255, RelativeToBounds: 0, Attach: 1, DestroyWithOwner: 1, DestroyParentOnDeath: 0, FadeOutOnDestruction: 0, Scale: 1 }); }
  }
  for (const parent of t.parents) {
    const p = await loadType(parent).catch(() => null);
    if (!p) continue;
    for (const c of list(p, parent).filter(visual)) if (!seen.has(c.Type) && folder(c.Type) === body) { seen.add(c.Type); own.push({ ...c, optional: true }); }
  }
  return own;
}
const decoOn = (c, i) => !!c.optional === sk.decoOff.has(i);
const DUMMY_ABILITY = "/Lotus/Powersuits/NpcPowersuits/NpcPowersuitAbilities/DummyAbility";
const abilityMeta = new Map();
function loadAbilityMeta(path) {
  if (!abilityMeta.has(path)) abilityMeta.set(path, loadType(path).then((a) => {
    const tag = a?.data.LocalizeTag || "";
    return { path, name: path === DUMMY_ABILITY ? T.emptySlot : stripTags(loc(tag) || (tag.startsWith("/") ? "" : tag) || tail(path).replace(/Ability$/, "")), icon: a?.data.Icon || "", hasDesc: path === DUMMY_ABILITY || !!(a?.data.LocalizeDescTag && loc(a.data.LocalizeDescTag)) };
  }, () => ({ path, name: tail(path), icon: "", hasDesc: true })));
  return abilityMeta.get(path);
}
async function refreshAbilities() {
  const mine = sk, metas = await Promise.all(sk.abilities.map(loadAbilityMeta));
  if (sk !== mine) return;
  sk.abilityRows = metas;
  sk.info.needDesc = metas.filter((a) => !a.hasDesc);
  drawAvatarSuitForm();
  renderSkin();
}
const isNpcAbility = (path) => path.includes("/NpcPowersuits/");
let npcAbilityList = null;
function npcAbilities() {
  npcAbilityList ||= loadCharacters().then(async (chars) => {
    const suits = [...new Set(chars.npcSuit.values())].filter((p) => p.includes("/NpcPowersuits/"));
    const found = await Promise.all(suits.map((p) => loadType(p).then((t) => (t?.data.AbilityTypes || []).filter((a) => typeof a === "string" && a).map((a) => relTo(t.origin.AbilityTypes || p, a)), () => [])));
    return [...new Set(found.flat())];
  });
  return npcAbilityList;
}
async function abilityChoices() {
  const w = await getJSON(`${PEP}/ExportWarframes.json`).catch(() => ({})), seen = new Set(), out = [], npc = extended();
  const add = (path, name) => { if (path && !seen.has(path) && (npc || !isNpcAbility(path))) { seen.add(path); out.push({ path, name }); } };
  for (const a of sk.info.abilities) add(a, (await loadAbilityMeta(a)).name);
  for (const x of Object.values(w)) for (const a of x.abilities || []) add(a.uniqueName, stripTags(loc(a.name) || tail(a.uniqueName)));
  if (npc) for (const a of await npcAbilities()) if (!seen.has(a)) add(a, (await loadAbilityMeta(a)).name);
  return out;
}
function abilityEditor() {
  const rows = sk.abilityRows || [], move = (i, d) => { const a = sk.abilities; [a[i], a[i + d]] = [a[i + d], a[i]]; refreshAbilities(); };
  const tool = (title, text, off, run) => h("button", { type: "button", title, disabled: off, onclick: (e) => { e.stopPropagation(); run(); } }, text);
  const list = h("div", { class: "ab-list" }, rows.flatMap((a, i) => {
    const icon = h("img", { class: "ab-icon", alt: "" }), open = sk.descOpen.has(a.path), canDesc = a.path !== DUMMY_ABILITY;
    if (a.icon) setIcon(icon, a.icon); else icon.style.visibility = "hidden";
    const flip = () => { if (!canDesc) return; open ? sk.descOpen.delete(a.path) : sk.descOpen.add(a.path); drawAvatarSuitForm(); };
    const row = h("div", { class: "ab-row" + (a.path === DUMMY_ABILITY ? " ab-empty" : "") + (canDesc ? " ab-click" : ""), onclick: flip },
      h("span", { class: "ab-tw" }, canDesc ? (open ? "▾" : "▸") : ""), h("span", { class: "ab-num" }, i + 1), icon, h("span", { class: "ab-name" }, a.name),
      h("span", { class: "ab-tools" }, tool(T.moveUp, "▲", i === 0, () => move(i, -1)), tool(T.moveDown, "▼", i === rows.length - 1, () => move(i, 1)), tool(T.remove, "✕", false, () => { sk.abilities.splice(i, 1); refreshAbilities(); })));
    if (!open) return [row];
    const input = h("input", { class: "input", spellcheck: "false", autocomplete: "off", placeholder: a.hasDesc ? T.abilityHasDesc : a.name });
    input.value = sk.abilityDesc.get(a.path) ?? (a.hasDesc ? "" : a.name);
    input.addEventListener("input", () => { sk.abilityDesc.set(a.path, input.value); renderSkin(); });
    return [row, h("div", { class: "ab-desc" }, h("span", { class: "label" }, T.description), input)];
  }));
  const full = sk.abilities.length >= 4, search = h("input", { class: "input", placeholder: T.addAbility, spellcheck: "false", autocomplete: "off", disabled: full });
  const wrap = h("div", { class: "path-w" }, search), byName = new Map();
  const box = h("div", { class: "ab-add" }, wrap, h("button", { class: "btn btn-ghost", type: "button", disabled: full, onclick: () => { sk.abilities.push(DUMMY_ABILITY); refreshAbilities(); } }, T.addEmptySlot));
  setTimeout(() => pathSearch(search, async () => namePaths(await abilityChoices(), byName)));
  search.addEventListener("change", () => {
    const v = search.value.trim(), path = byName.get(v.toLowerCase()) || (v.startsWith("/Lotus/") ? v : "");
    if (!path || sk.abilities.length >= 4) return;
    if (isNpcAbility(path) && !extended() && !sk.info.abilities.includes(path)) { search.value = ""; return; }
    sk.abilities.push(path); refreshAbilities();
  });
  return h("div", { class: "eye-field" }, h("span", { class: "label" }, T.abilities), list, box, h("p", { class: "muted small ab-note" }, T.abilitiesNote));
}
async function newSuitInfo(t, path, linked = null) {
  const d = t.data, mats = materialsOf(t, path);
  const chars = await loadCharacters(), npcSuit = linked || chars.npcSuit.get(path), st = npcSuit ? await loadType(npcSuit).catch(() => null) : null;
  let parentMesh = linked && st?.data.Mesh ? relTo(st.origin.Mesh || linked, st.data.Mesh) : "";
  let parentSlots = linked && st?.data.DefaultCustomization ? { ...st.data.DefaultCustomization } : null;
  const extraDecos = [];
  if (parentMesh && /head/i.test(tail(parentMesh)) && d.Mesh) {
    const headType = parentMesh.replace(/(_skel)?\.fbx$/i, "Deco");
    if (await loadType(headType).catch(() => null)) { extraDecos.push({ LocalPosition: [0, 0, 0], LocalRotation: [0, 0, 0, 1], BoneName: "", Type: headType, Chance: 255, RelativeToBounds: 0, Attach: 1, DestroyWithOwner: 1, DestroyParentOnDeath: 0, FadeOutOnDestruction: 0, Scale: 1 }); parentMesh = ""; }
  }
  if (parentSlots) for (const [slot, v] of Object.entries(parentSlots)) {
    const item = typeof v === "string" ? v : v?.ItemType;
    if (!slot.startsWith("TOSS_") || !item) continue;
    const it = await loadType(item).catch(() => null);
    const hands = Object.values(it?.data.GraphicsOverrides || {}).map((g) => g?.THIRD_PERSON_Attachment?.UpgradeAutoChildren || []).filter((l) => l.some((c) => c.Type));
    const own = (it?.data.THIRD_PERSON_Attachment?.UpgradeAutoChildren || []).filter((c) => c.Type);
    const picked = own.length ? own : hands.find((l) => l.some((c) => /Closed/.test(c.Type))) || hands.find((l) => l.some((c) => /Male/.test(c.Type) && !/Female/.test(c.Type))) || hands[0] || [];
    const kids = picked.filter((c) => c.Type).map((c) => ({ ...c, Type: relTo(it.origin.THIRD_PERSON_Attachment || it.origin.GraphicsOverrides || item, c.Type), ...(slot === "TOSS_HOOD" ? { forceAux: true } : {}) }));
    if (!kids.length) continue;
    extraDecos.push(...kids);
    parentSlots[slot] = { ...(typeof v === "object" ? v : {}), ItemType: "" };
  }
  const usesOperatorSlots = !!parentSlots && Object.keys(parentSlots).some((k) => k.startsWith("TOSS_"));
  if (usesOperatorSlots) parentSlots = null;
  const decos = [...extraDecos, ...(await avatarDecos(t, path, parentMesh || d.Mesh, extraDecos.some(isHeadPart)))];
  const abilities = (st?.data.AbilityTypes || []).filter((a) => typeof a === "string" && a).map((a) => relTo(st.origin.AbilityTypes || npcSuit, a));
  const name = stripTags(PLAYABLE.find((c) => c.path === path)?.name || loc(d.LocTag) || (linked && loc(st?.data.LocalizeTag)) || tail(path).replace(/Avatar$/, ""));
  return { kind: "suit", isNew: true, enemy: !linked, animController: typeof d.AnimControllerType === "string" ? relTo(t.origin.AnimControllerType || path, d.AnimControllerType) : "", base: (!usesOperatorSlots && linked) || SUIT_BASE, parentMesh, parentSlots, path, target: "/Lotus/Powersuits/Custom/" + tail(path).replace(/Avatar$/, "") + "Suit", mesh: relTo(t.origin.Mesh || path, d.Mesh), mats, decos, abilities, ownAbilities: [], abilityCount: abilities.length, hasStore: false, look: null, tag: "", name, icon: chars.portraits.get(name.toLowerCase()) || (/LargePortraits\//.test(st?.data.MiniMapLargeIcon || "") ? relTo(st.origin.MiniMapLargeIcon || npcSuit, st.data.MiniMapLargeIcon) : "") || chars.all.find((c) => c.path === path)?.icon || chars.all.find((c) => c.name === name && c.icon)?.icon || "" };
}
async function analyzeAvatarSuit(path) {
  const t = await loadType(path);
  if (!t) return { error: fmt(T.pathNotFound, path) };
  const suit = await avatarSuitPath(t, path);
  if (!suit && t.data.Mesh && extended()) return newSuitInfo(t, path);
  if (!suit) return { error: T.noSuit };
  if (!suit.startsWith("/Lotus/Powersuits/")) return newSuitInfo(t, path, suit);
  const st = await loadType(suit);
  if (!st) return { error: fmt(T.pathNotFound, suit) };
  const parent = st.parents[0];
  const target = parent?.startsWith("/Lotus/Powersuits/") && !/BaseSuit$/.test(parent) ? parent : suit;
  const own = target === suit ? st : await loadType(target);
  const full = (d, o) => (Array.isArray(d.AbilityTypes) ? d.AbilityTypes : []).map((a) => relTo(o.AbilityTypes || target, a));
  const abilities = full(st.data, st.origin), wanted = deepEq(abilities, full(own.data, own.origin)) ? [] : abilities;
  const hasStore = !!(await loadType(toStorePath(target)).catch(() => null)), chars = await loadCharacters();
  const look = await avatarLook(t, path, own, target);
  return { kind: "suit", path, target, look, abilities, ownAbilities: full(own.data, own.origin), abilityCount: abilities.length, hasStore, tag: own.data.LocalizeTag || st.data.LocalizeTag || "", name: stripTags(loc(own.data.LocalizeTag) || loc(st.data.LocalizeTag) || tail(target).replace(/Suit$/, "")), icon: chars.portraits.get(stripTags(loc(own.data.LocalizeTag) || loc(st.data.LocalizeTag) || tail(target).replace(/Suit$/, "")).toLowerCase()) || t.data.Icon || "" };
}
function drawAvatarSuitForm() {
  const info = sk.info;
  $("#skin-form").replaceChildren(...[
    skText("name", T.name), skText("desc", T.description),
    info.enemy ? h("p", { class: "muted small" }, atob("RVhQRVJJTUVOVEFMOiBhbGwgbW9kZWxzIHdpbGwgc2hvdyBpbiBnYW1lIGJ1dCBub3QgYWxsIG9mIHRoZW0gd2lsbCBmaXQgc3RhbmRhcmQgV2FyZnJhbWUgcHJvcG9ydGlvbnMu")) : null,
    abilityEditor(),
    info.animController && info.enemy ? skCheck(T.useAnimations, !!sk.enemyAnims, (v) => (sk.enemyAnims = v)) : null,
    info.look ? skCheck(T.useLook, sk.useLook, (v) => (sk.useLook = v)) : null,
    info.decos?.length ? field(T.attachments, h("div", { class: "deco-list" }, info.decos.map((c, i) => {
      return skCheck(partLabel(c.Type), decoOn(c, i), () => (sk.decoOff.has(i) ? sk.decoOff.delete(i) : sk.decoOff.add(i)));
    }))) : null].filter(Boolean));
}
const DECO_SLOTS = [["Face", "Aux", () => T.slotAuxiliary], ["Neckwear", "Syandana", () => T.slotSyandana]];
function auxBlocks(parts, key, label, who, target, icon) {
  const items = parts.map(({ c, slot }) => [partLabel(c.Type), tail(c.Type), [c], slot]);
  const used = DECO_SLOTS.filter(([slot]) => parts.some((p) => p.slot === slot));
  for (const [slot, , slotName] of used) {
    const group = parts.filter((p) => p.slot === slot).map((p) => p.c);
    if (group.length > 1) items.push([used.length > 1 ? label + " " + slotName() : label, "All", group, slot]);
  }
  const blocks = [], stores = [];
  for (const [name, part, list, slot] of items) {
    const path = SKIN_DIR + key + part + DECO_SLOTS.find((x) => x[0] === slot)[1], store = toStorePath(path);
    stores.push(store);
    blocks.push(customItem({ path, name, icon, who, fields: [["CompatibleSlots", [slot]], ["THIRD_PERSON_Attachment", { UpgradeAutoChildren: list }]] }));
    blocks.push(storeBlock(store, path, name, icon, target, [["CompatibleSlots", [slot]]]));
  }
  return { blocks, stores };
}
function abilityDescLines() {
  return (sk.abilityRows || []).filter((a) => a.path !== DUMMY_ABILITY).flatMap((a) => {
    const text = (sk.abilityDesc.get(a.path) ?? (a.hasDesc ? "" : a.name)).trim();
    return text ? [">" + a.path, indent("LocalizeDescTag=" + eeStr(text)), ""] : [];
  });
}
function buildAvatarSuit() {
  const info = sk.info, name = sk.name.trim() || info.name, desc = sk.desc.trim();
  const key = info.isNew ? name.replace(/[^A-Za-z0-9]/g, "") || tail(info.target).replace(/Suit$/, "") : "";
  const target = info.isNew ? "/Lotus/Powersuits/Custom/" + key + "Suit" : info.target, store = toStorePath(target);
  const out = ["# " + name, "$if can_add_new_types()"];
  const icon = info.icon && ["Icon", info.icon], decos = info.isNew ? (info.decos || []).filter(decoOn) : [];
  const isHead = isHeadPart;
  const taken = (slot) => { const v = info.parentSlots?.[slot]; return !!(v && (typeof v === "string" ? v : v.ItemType)); };
  const clean = ({ optional, forceAux, ...c }) => c;
  const heads = decos.filter((c) => isHead(c) && !c.forceAux);
  const main = taken("Helmet") ? null : heads.find((c) => /Head/i.test(tail(c.Type))) || heads[0] || null;
  const onBody = (c) => !c.forceAux && !c.BoneName && (!isHead(c) || (taken("Helmet") && /Head/i.test(tail(c.Type))));
  const withHelmet = main ? heads.filter((c) => c !== main && !/Helmet/i.test(tail(c.Type))) : [];
  const head = main ? [main, ...withHelmet].map(clean) : [];
  const used = new Set([main, ...withHelmet]);
  const bodyDecos = decos.filter((c) => !used.has(c) && onBody(c)).map(clean);
  const aux = taken("Face") ? [] : decos.filter((c) => !used.has(c) && !onBody(c) && (c.forceAux || c.BoneName || isHead(c))).map(clean);
  const owned = (path, label, slot, fields) => {
    out.push(...customItem({ path, name: label, icon: info.icon, who: [["Weapon", target], ["GenericCompatible", target]], fields: [slot && ["CompatibleSlots", [slot]], ...fields] }), "");
    out.push(...storeBlock(toStorePath(path), path, label, info.icon, target, [slot && ["CompatibleSlots", [slot]]]), "");
    return path;
  };
  const defaults = {}, extras = [];
  if (head.length) extras.push(defaults.Helmet = { ItemType: owned(SKIN_DIR + key + "Helmet", fmt(T.nameHelmet, name), "", [["THIRD_PERSON_Attachment", { UpgradeAutoChildren: head }]]) });
  const anim = info.animController && (!info.enemy || sk.enemyAnims) ? info.animController : "";
  if (bodyDecos.length || anim) {
    const variant = SKIN_DIR + key + "BodyVariant";
    out.push(...skinBlock(`+${variant}|/EE/Types/Game/WeaponSkin`, [["TpMeshOverride", info.parentMesh || info.mesh], !info.parentMesh && info.mats.length && ["TpMaterialOverrides", info.mats]]), "");
    extras.push(defaults.BodySkin = { ItemType: owned(SKIN_DIR + key + "Body", fmt(T.nameSkin, name), "BodySkin", [["UpgradeSkinOverride", variant], anim && ["AnimController", anim], ["OverrideAttachedFx", 1], ["AttachedFxOverrides", bodyDecos]]) });
  }
  if (aux.length) extras.push(defaults.Face = { ItemType: owned(SKIN_DIR + key + "Attachments", name + " " + T.attachments, "Face", [["THIRD_PERSON_Attachment", { UpgradeAutoChildren: aux }]]) });
  const slots = extras.length ? { ...(info.parentSlots || {}), ...defaults } : null;
  if (info.isNew) out.push(...skinBlock(`+${target}|${info.base || SUIT_BASE}`, [["LocalizeTag", name], desc && ["LocalizeDescTag", desc], icon, ["MarketMode", "MM_VISIBLE"], !info.parentMesh && ["Mesh", info.mesh], !info.parentMesh && info.mats.length && ["OverrideMaterials", info.mats], sk.abilities.length && ["AbilityTypes", sk.abilities], slots && ["DefaultCustomization", slots]]), "");
  if (!info.hasStore) out.push(...skinBlock(`+${store}|${POWER_SUIT_STORE}`, [["ProductCategory", "Suits"], ["LocalizeTag", name], desc && ["LocalizeDescTag", desc], icon, ["TypeName", target], ["ShowInMarket", 1], ["RegularPrice", 1]]), "");
  out.push(">" + MANIFEST, indent("a|StoreItems|" + store), ...extras.map((x) => indent("a|StoreItems|" + toStorePath(x.ItemType))), "$endif", "");
  out.push(...abilityDescLines());
  if (info.isNew) return out.join("\n") + "\n";
  const texts = [indent("LocalizeTag=" + eeStr(name)), ...(desc ? [indent("LocalizeDescTag=" + eeStr(desc))] : [])];
  if (info.hasStore) out.push(">" + store, indent("ShowInMarket=1"), indent("RegularPrice=1"), ...texts, "");
  out.push(">" + info.target, indent("MarketMode=MM_VISIBLE"), ...texts);
  if (!deepEq(sk.abilities, info.ownAbilities)) out.push(indent("AbilityTypes={" + sk.abilities.join(",") + "}"));
  const look = sk.useLook && info.look;
  if (look?.meshItem) out.push("", ...skinBlock(">" + look.meshItem, [["TpMeshOverride", look.mesh]]));
  if (look?.body.length) out.push("", ...skinBlock(">" + look.skin, [["OverrideAttachedFx", 1], ["AttachedFxOverrides", look.body]]));
  if (look?.helmet && look.head.length) out.push("", ...skinBlock(">" + look.helmet, [["THIRD_PERSON_Attachment", { UpgradeAutoChildren: look.head }]]));
  return out.join("\n") + "\n";
}
async function itemKind(path) {
  const t = await loadType(path);
  if (!t) return null;
  const chain = [path, ...t.parents];
  const character = chain.includes("/Lotus/Types/Player/TennoAvatar") || /^\/Lotus\/Types\/(Enemies|Friendly|Player)\//.test(path);
  const weapon = chain.some((p) => p.startsWith("/Lotus/Weapons/") || /LotusWeapon$/.test(p));
  return { character, suit: character ? (await avatarSuitPath(t, path).catch(() => null)) || (extended() && !!t.data.Mesh) : null, skin: weapon ? !!t.data.PickUpMesh : !!t.data.Mesh && !path.startsWith("/Lotus/Upgrades/") };
}