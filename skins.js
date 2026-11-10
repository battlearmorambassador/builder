"use strict";
async function analyzeCharacter(path) {
  const t = await loadType(path);
  if (!t) return { error: fmt(T.pathNotFound, path) };
  const d = t.data, at = (k) => t.origin[k] || path;
  if (!d.Mesh) return { error: T.noBody };
  const mats = materialsOf(t, path), children = childrenOf(t, path);
  let head = [];
  const helmetType = d.DefaultCustomization?.Helmet?.ItemType;
  if (helmetType) {
    const hp = relTo(at("DefaultCustomization"), helmetType);
    head = itemParts(await loadType(hp), hp);
  }
  if (!head.length) head = children.filter(isHeadPart);
  const parts = children.filter((c) => !head.includes(c));
  const color = d.DefaultEnergyColor || d.ScriptInstance?._newEnergyColor || null;
  const scriptColor = !d.DefaultEnergyColor && !!d.ScriptInstance?._newEnergyColor;
  let fix = null, note = "";
  if (mats[0] && rgbOf(color)) {
    const mt = await loadType(mats[0]);
    const glow = mt?.data["PS:EmissiveTintColorHi"];
    const own = !!mt && "PS:EmissiveTintColorHi" in mt.own;
    if (glow && hueOf(glow) !== hueOf(color)) {
      if (own && scriptColor) note = T.scriptColorNote;
      else fix = { material: mats[0], ...glowFrom(rgbOf(color)) };
    }
  }
  const name = loc(d.LocalizeTag) || loc(d.LocTag) || tail(path);
  return { path, name: stripTags(name), icon: d.Icon || "", mesh: d.Mesh, mats, head, parts, fix, note };
}
const WEAPON_ROOTS = { LotusLongGun: T.everyPrimaryWeapon, LotusPistol: T.everySecondaryWeapon, PlayerMeleeWeapon: T.everyMeleeWeapon };
const WEAPON_SKIN = "/Lotus/Types/Game/LotusWeaponCustomization";
async function analyzeWeapon(path) {
  const t = await loadType(path);
  if (!t) return { error: fmt(T.pathNotFound, path) };
  if (!t.data.PickUpMesh) return { error: T.noWeaponModel };
  const item = (await loadList("weapon").catch(() => [])).find((i) => i.path === path);
  return {
    kind: "weapon", path, name: item?.name || tail(path), icon: item?.icon || t.data.Icon || "",
    mesh: relTo(t.origin.PickUpMesh || path, t.data.PickUpMesh),
    root: t.parents.find((p) => tail(p) in WEAPON_ROOTS), category: item?.raw.productCategory,
  };
}
const skinStore = (path, type, name, extra = []) => storeBlock(path, type, name, sk.info.icon, sk.target, extra);
const skText = (key, label) => {
  const el = h("input", { class: "input", value: sk[key], spellcheck: "false", autocomplete: "off" });
  el.addEventListener("input", () => { sk[key] = el.value; renderSkin(); });
  return field(label, el);
};
const skCheck = (label, on, set) => {
  const box = h("input", { type: "checkbox", checked: on });
  box.addEventListener("change", () => { set(box.checked); renderSkin(); });
  return h("label", { class: "check" }, box, h("span", {}, label));
};
function skinNameField() {
  return skText("name", T.skinName);
}
function skinTargetField(label, target) {
  target.addEventListener("change", () => { sk.target = target.value; renderSkin(); });
  return field(label, target);
}
function drawWeaponSkinForm(weapons) {
  const info = sk.info;
  const opt = (value, label) => h("option", { value, selected: value === sk.target }, label);
  const target = h("select", { class: "input" },
    info.root ? opt(info.root, WEAPON_ROOTS[tail(info.root)]) : null,
    h("optgroup", { label: T.oneWeapon }, weapons.map((w) => opt(w.path, w.name))));
  $("#skin-form").replaceChildren(
    skinNameField(),
    skinTargetField(T.itemCompatibility, target));
}
const weaponSkinKey = (label) => label.replace(/[^A-Za-z0-9]/g, "") || "CustomWeaponSkin";
function drawSkinNote() {
  const note = $("#skin-note"), weapon = sk?.info?.kind === "weapon";
  note.hidden = !weapon;
  if (!weapon) return;
  note.replaceChildren(...fmtNodes(T.ownSkinNote, h("img", { class: "credit-icon", src: IMG + "/Lotus/Interface/Icons/StoreIcons/Currency/CreditsLarge.png", alt: "credit", onerror: hideBroken })));
}
function buildWeaponSkin() {
  const info = sk.info;
  const label = sk.name.trim() || fmt(T.nameSkin, info.name);
  const key = weaponSkinKey(label);
  const sp = SKIN_DIR + key, ssp = SKIN_STORE_DIR + key;
  const out = ["# " + label, "$if can_add_new_types()", "",
    ...skinBlock(`+${sp}|${WEAPON_SKIN}`, [["LocalizeTag", label], info.icon && ["Icon", info.icon], ["MarketMode", "MM_VISIBLE"], ["RegularPrice", 1], ["AvailableOnPvp", 1], ["Weapon", sk.target], ["THIRD_PERSON_MeshOverride", info.mesh]]), "",
    ...skinStore(ssp, sp, label), "",
    ">" + MANIFEST, indent("a|StoreItems|" + ssp), "$endif"];
  return out.join("\n") + "\n";
}
let sk = null;
async function showSkin(path, asSuit = false) {
  sk = { path, desc: "", useLook: true, info: null, name: "", target: ALL_SUITS, parts: "both", lockHelmet: true, picked: new Set(), decoOff: new Set(), abilityDesc: new Map(), descOpen: new Set(), slots: new Map() };
  $("#skin-title").textContent = tail(path);
  $("#skin-path").textContent = path;
  $("#skin-icon").removeAttribute("src");
  $("#skin-output").innerHTML = "";
  $("#skin-note").hidden = true;
  $("#skin-form").replaceChildren(h("div", { class: "empty" }, h("span", { class: "spinner" }), T.readingGameData));
  if (asSuit) {
    const info = await analyzeAvatarSuit(path).catch(() => ({ error: OFFLINE }));
    if (!sk || sk.path !== path) return;
    if (info.error) { $("#skin-form").replaceChildren(h("div", { class: "empty" }, info.error)); return; }
    sk.info = info;
    sk.name = info.name;
    sk.abilities = [...info.abilities];
    $("#skin-title").textContent = info.name;
    if (info.icon) setIcon($("#skin-icon"), info.icon);
    await refreshAbilities();
    return;
  }
  const weapon = path.startsWith("/Lotus/Weapons/");
  const [info, chars] = await Promise.all([(weapon ? analyzeWeapon(path) : analyzeCharacter(path)).catch(() => ({ error: OFFLINE })), loadCharacters(), loadDict().catch(() => null)]);
  if (!sk || sk.path !== path) return;
  if (info.error) { $("#skin-form").replaceChildren(h("div", { class: "empty" }, info.error)); return; }
  if (weapon) {
    sk.info = info;
    sk.name = fmt(T.nameSkin, info.name);
    sk.target = info.root || path;
    $("#skin-title").textContent = info.name;
    if (info.icon) setIcon($("#skin-icon"), info.icon);
    const all = await loadList("weapon").catch(() => []);
    if (!sk || sk.path !== path) return;
    drawWeaponSkinForm(all.filter((w) => w.raw.productCategory === info.category));
    renderSkin();
    return;
  }
  const known = chars.all.find((c) => c.path === path);
  info.name = known?.name || info.name;
  info.icon = known?.icon || info.icon;
  sk.info = info;
  sk.name = fmt(T.nameSkin, info.name);
  sk.parts = info.head.length ? "both" : "body";
  info.parts.forEach((c, i) => { if (!isFx(c.Type)) sk.picked.add(i); });
  $("#skin-title").textContent = info.name;
  if (info.icon) setIcon($("#skin-icon"), info.icon);
  drawSkinForm(chars.suits);
  renderSkin();
}
function drawSkinForm(suits) {
  const info = sk.info;
  const target = h("select", { class: "input" }, h("option", { value: ALL_SUITS }, T.everyWarframe), suits.map((s) => h("option", { value: s.path, selected: s.path === sk.target }, s.name)));
  const check = skCheck;
  const partName = (c) => {
    const what = partLabel(c.Type);
    const b = String(c.BoneName || ""), left = /_L\d_/.test(b), right = /_R\d_/.test(b);
    const where = /CHEST/.test(b) ? T.chest : /LEG|KNEE|THIGH|FOOT/.test(b) ? (left ? T.leftLeg : right ? T.rightLeg : T.leg) : /TWIST|ARM|SHOULDER|CLAVICLE|HAND/.test(b) ? (left ? T.leftArm : right ? T.rightArm : T.arm) : /SPINE|BACK/.test(b) ? T.back : /HEAD|NECK/.test(b) ? T.head : "";
    return where ? fmt(T.partPiece, where, what) : what;
  };
  const split = sk.parts === "split" || sk.parts === "attach", separable = (c) => !isFx(c.Type) && !!c.BoneName;
  const choices = (info.head.length ? [["body", T.bodyOnly], ["helmet", T.helmetOnly], ["both", T.bodyAndHelmet]] : [["body", T.bodyOnly]]).concat(info.parts.some(separable) ? [["split", T.splitAttachments], ["attach", T.attachmentsOnly]] : []);
  $("#skin-form").replaceChildren(...[
    skinNameField(),
    skText("desc", T.description),
    skinTargetField(T.itemCompatibility, target),
    h("div", { class: "skin-list" }, h("span", { class: "label" }, T.bodyPartsToInclude),
      choices.length > 1 ? choices.map(([v, l]) => {
        const r = h("input", { type: "radio", name: "skin-parts", value: v, checked: sk.parts === v });
        r.addEventListener("change", () => { sk.parts = v; drawSkinForm(suits); renderSkin(); });
        return h("label", { class: "check" }, r, h("span", {}, l));
      }) : h("span", { class: "muted small" }, T.noHelmetNote)),
    info.head.length && (sk.parts === "both" || split) ? check(T.lockHelmet, sk.lockHelmet, (v) => (sk.lockHelmet = v)) : null,
    info.parts.length && sk.parts !== "helmet" ? h("div", { class: "skin-list" }, h("span", { class: "label" }, T.attachments),
      info.parts.map((c, i) => {
        const row = check(isFx(c.Type) ? fmt(T.partEffect, partName(c)) : partName(c), sk.picked.has(i), (v) => (v ? sk.picked.add(i) : sk.picked.delete(i)));
        if (!split || !separable(c)) return row;
        const slot = h("select", { class: "input part-slot" }, DECO_SLOTS.map(([value, , name]) => h("option", { value }, name())));
        slot.value = sk.slots.get(i) || "Face";
        slot.addEventListener("change", () => { sk.slots.set(i, slot.value); renderSkin(); });
        return h("div", { class: "part-row" }, row, slot);
      })) : null,
    info.fix && sk.parts !== "helmet" && sk.parts !== "attach" ? h("p", { class: "muted small" }, fmtNodes(T.glowNote, h("code", {}, tail(info.fix.material)))) : null,
    info.note && sk.parts !== "helmet" && sk.parts !== "attach" ? h("p", { class: "warn" }, info.note) : null].filter(Boolean));
}
function buildSkin() {
  if (sk.info.kind === "weapon") return buildWeaponSkin();
  if (sk.info.kind === "suit") return buildAvatarSuit();
  const info = sk.info, all = sk.target === ALL_SUITS;
  const label = sk.name.trim() || fmt(T.nameSkin, info.name);
  const key = label.replace(/[^A-Za-z0-9]/g, "") || "CustomSkin";
  const vp = SKIN_DIR + key + "Variant", sp = SKIN_DIR + key, hp = SKIN_DIR + key + "Helmet";
  const ssp = SKIN_STORE_DIR + key, shp = SKIN_STORE_DIR + key + "Helmet";
  const who = all ? [["Weapon", ALL_SUITS], ["GenericCompatible", ALL_SUITS]] : [["Weapon", sk.target]];
  const body = sk.parts !== "helmet" && sk.parts !== "attach";
  const helmet = sk.parts !== "body" && sk.parts !== "attach" && info.head.length > 0;
  const blocks = body ? [skinBlock(`+${vp}|/EE/Types/Game/WeaponSkin`, [["TpMeshOverride", info.mesh], info.mats.length && ["TpMaterialOverrides", info.mats]])] : [];
  const helmetName = fmt(T.nameHelmet, label.replace(/\s*Skin$/i, ""));
  if (helmet) {
    blocks.push(customItem({ path: hp, name: helmetName, icon: info.icon, pre: [["ExcludeFromCodex", 0]], who, fields: [["THIRD_PERSON_Attachment", { UpgradeAutoChildren: info.head }]] }));
    blocks.push(skinStore(shp, hp, helmetName, [["ExcludeFromCodex", 0]]));
  }
  if (body) blocks.push(customItem({ path: sp, name: label, desc: sk.desc.trim(), icon: info.icon, who, fields: [["UpgradeSkinOverride", vp], ["CompatibleSlots", ["BodySkin"]], ["AllowUglyMode", 1], helmet && sk.lockHelmet && ["ForcedCustomizations", { Helmet: hp }], ["OverrideAttachedFx", 1], ["AttachedFxOverrides", info.parts.filter((c, i) => sk.picked.has(i) && !((sk.parts === "split" || sk.parts === "attach") && !isFx(c.Type) && c.BoneName))]] }));
  if (body) blocks.push(skinStore(ssp, sp, label, [["CompatibleSlots", ["BodySkin"]]]));
  const extra = sk.parts === "split" || sk.parts === "attach" ? auxBlocks(info.parts.map((c, i) => ({ c, slot: sk.slots.get(i) || "Face" })).filter((p, i) => sk.picked.has(i) && !isFx(p.c.Type) && p.c.BoneName), key, label.replace(/\s*Skin$/i, ""), who, sk.target, info.icon) : { blocks: [], stores: [] };
  blocks.push(...extra.blocks);
  blocks.push([">" + MANIFEST, ...(body ? [indent("a|StoreItems|" + ssp)] : []), ...(helmet ? [indent("a|StoreItems|" + shp)] : []), ...extra.stores.map((p) => indent("a|StoreItems|" + p))]);
  const out = ["# " + (body || !helmet ? label : helmetName), "$if can_add_new_types()"];
  blocks.forEach((b) => out.push("", ...b));
  out.push("$endif");
  if (info.fix && body) out.push("", ">" + info.fix.material, indent("PS:EmissiveTintColorLo=" + eeValue(info.fix.lo)), indent("PS:EmissiveTintColorHi=" + eeValue(info.fix.hi)));
  return out.join("\n") + "\n";
}
function renderSkin() {
  if (sk?.info) $("#skin-output").innerHTML = highlight(buildSkin());
  drawSkinNote();
}
function initSkin() {
  $("#skin-copy").onclick = () => { if (sk?.info) copyText(buildSkin()); };
  $("#skin-save").onclick = () => { if (sk?.info) saveText(sk.name || T.skin, buildSkin(), T.skin); };
}