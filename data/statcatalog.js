window.STAT_CATALOG = [
  {
    "t": "AVATAR_ABILITY_AUGMENT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 220,
    "loc": "/Lotus/Language/Items/StealthArchwingGravInstabilityAugmentDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "AUGMENT_ONE",
      "UpgradeObject": "/Lotus/Powersuits/Archwing/ArchwingAbilities/GravitationalInstabilityAbility",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Powersuits/Archwing/ArchwingAbilities/GravitationalInstability.lua",
        "Function": "GetAugmentDescriptionInfo",
        "_creationEffect": "",
        "_deathEffect": "",
        "_deathEffectWater": "",
        "_blackholeEffect": "",
        "_activateAnim": ""
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_ABILITY_DURATION",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 16,
    "loc": "/Lotus/Language/Upgrades/AvatarAbilityDurationModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_EFFICIENCY",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 12,
    "loc": "/Lotus/Language/Upgrades/AvatarAbilityEfficiencyModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_ENERGY_TO_OVERSHIELD",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/WarframeAugurSetDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          1,
          0
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_ABILITY_ENERGY_TO_SHIELD",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.0099999998,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_OPERATOR_ULTIMATE_CHARGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_OPERATOR_ULTIMATE_INITIAL_CHARGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Upgrades/CosmeticEnhancers/Utility/UltimateInitialChargeLoc.lua",
        "Function": "GetDescription",
        "_upgradeValue": 1500,
        "_upgradeValuePerFusionLevel": 1500
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_RANGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 9,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ABILITY_STRENGTH",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 21,
    "loc": "/Lotus/Language/Upgrades/AvatarAbilityStrengthModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ACROBATIC_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_AIR_JUMP_HEIGHT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_ARMOUR",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 14,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ARMOUR",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 7,
    "loc": "/Lotus/Language/Upgrades/AvatarFlatArmourModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ARMOUR",
    "d": "DT_ANY",
    "o": "ADD_BASE",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_AURA_EFFECTIVENESS_ON_ME",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_AURA_STRENGTH",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_BLEEDOUT_MODIFIER",
    "d": "DT_ANY",
    "o": "MULTIPLY",
    "n": 2,
    "loc": "/Lotus/Language/Upgrades/AvatarBleedoutRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_CASTING_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_POWER_MULTIPLIER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_REDUCTION_DURING_REVIVE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/AvatarDamageReductionDuringReviveModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_ANY",
    "o": "MULTIPLY",
    "n": 13,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_AIRBORNE"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_POISON",
    "o": "MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_SENTIENT",
    "o": "MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_RADIATION",
    "o": "MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_FREEZE",
    "o": "MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_FIRE",
    "o": "MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_ELECTRICITY",
    "o": "MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_PHYSICAL",
    "o": "MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DAMAGE_TAKEN",
    "d": "DT_EXPLOSION",
    "o": "MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_DASH_DISTANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Focus/ProjectionStretchDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DASH_RADIUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/VoidDashRadius",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_DODGE_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_ENEMY_RADAR",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 8,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ENERGY_ON_FULL_SHIELD_REGEN",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_ENERGY_SPAWN_PERCENT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_ENERGY_TO_OVERSHIELDS_ON_SPAWN",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/EnergyToOvershields.lua",
        "Function": "GetDescriptionInfo"
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_EVADE_NPC_BULLET",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_EXPLOSION_DAMAGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_EXPLOSION_RADIUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_FALL_IMPACT_AMOUNT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_FALL_IMPACT_RADIUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_FULL_ENERGY_EFFECT_RANGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_HACK_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_HEALTH_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 17,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_HEALTH_MAX",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 4,
    "loc": "/Lotus/Language/Upgrades/AvatarFlatHealthModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_HEALTH_MAX",
    "d": "DT_ANY",
    "o": "ADD_BASE",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_HEAL_PERCENT_MAX_HEALTH",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "/Lotus/Language/Upgrades/HealthRegeneration",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_HEAL_RATE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 7,
    "loc": "/Lotus/Language/Upgrades/HealthRegen",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_HEAVY_LAND_RESIST_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/CatModDescription.lua",
        "Function": "GetDescriptionInfo",
        "_baseValue": 0,
        "_perLevelValues": [
          25,
          50,
          75,
          100
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.050000001,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_INJURY_ANIM_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "PT_STAGGERED",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_INJURY_BLOCK_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 34,
    "loc": "/Lotus/Language/Upgrades/PoisonProcResist",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "PT_POISONED",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_JUMP_HEIGHT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_KNOCKDOWN_RECOVERY_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_LOOT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_LOOT_RADAR",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 5,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_MARKED_DAMAGE_AMOUNT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_MELEE_DAMAGE_TO_JUMP_KICK",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_MOVEMENT_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 6,
    "loc": "/Lotus/Language/Upgrades/AvatarMovementSpeedModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_NO_DEATH_PENALTY",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "/Lotus/Language/Arcanes/NoPenaltyOnDeathDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Upgrades/CosmeticEnhancers/OperatorAmps/DamageConversion.lua",
        "Function": "GetNoDeathPenaltyDescription",
        "_value": [
          0.17,
          0.34,
          0.50999999,
          0.68000001,
          0.85000002,
          1.02
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_NPC_HIT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_OVERSHIELD_MAX",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetEmptyDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PARKOUR_BOOST",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 27,
    "loc": "/Lotus/Language/Upgrades/AvatarParkourBoostModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_FIRE",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_POISON",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_SLASH",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_PUNCTURE",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_IMPACT",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_FREEZE",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_ELECTRICITY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_POISON",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_FREEZE",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PARKOUR_DAMAGE_ADDED",
    "d": "DT_ELECTRICITY",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PARKOUR_GLIDE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 12,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_GLIDE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "/Lotus/Language/Upgrades/AvatarParkourGlideNoPercentModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PARKOUR_GRAVITY",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PICKUP_BONUS_AMOUNT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_POWER_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 9,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_POWER_RATE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 7,
    "loc": "/Lotus/Language/Upgrades/AvatarPowerRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_POWER_RATE",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/AvatarPowerRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_POWER_RATE",
    "d": "DT_ANY",
    "o": "MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          1
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PROC_IMMUNITY_DURATION",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "PT_BIG_STAGGER",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_PROC_REFLECT_AMPLIFICATION",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PROC_REFLECT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1,
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_PROC_TIME",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_REHACK_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_RESPAWN_TIME",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_REVENGE_DAMAGE_AMOUNT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_REVENGE_DAMAGE_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_REVIVE_ASSIST",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Types/Sentinels/SentinelAbilities/SentinelRevivePlayer.lua",
        "Function": "GetDescriptionInfo",
        "_castFX": "",
        "_companionRevivePenalty": 15
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_REVIVE_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SENTINEL_ARMOUR_LINK",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SENTINEL_CRIT_LINK",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SENTINEL_HEALTH_LINK",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SENTINEL_PACK_LEADER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SENTINEL_PACK_LEADER_OVERGUARD_CAP",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SENTINEL_PACK_LEADER_REVERSE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SENTINEL_SHIELD_LINK",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SENTINEL_STATUS_LINK",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SHIELD_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 12,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SHIELD_MAX",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SHIELD_MAX",
    "d": "DT_ANY",
    "o": "ADD_BASE",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SHIELD_RECHARGE_DELAY",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 8,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SHIELD_RECHARGE_DELAY",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SHIELD_RECHARGE_PERCENT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/AvatarShieldRechargeRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SHIELD_RECHARGE_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 9,
    "loc": "/Lotus/Language/Upgrades/AvatarShieldRechargeRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_SLIDE_BOOST",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 23,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_IN_AIR"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SLIDE_FRICTION",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 15,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SLIDE_FRICTION",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SPAWN_ENERGY",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SPRINT_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 13,
    "loc": "/Lotus/Language/Upgrades/AvatarSprintSpeedPercentModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_STAMINA_COST_MULTIPLIER",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "SLIDE_STAMINA",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_STAMINA_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_STAMINA_RECHARGE_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "AVATAR_SUCCESS_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "AVATAR_TIME_LIMIT_INCREASE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "GAMEPLAY_FACTION_DAMAGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 96,
    "loc": "/Lotus/Language/Upgrades/WeaponFactionDamageInfestedDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "Infestation",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 1,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.0099999998,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "GAMEPLAY_FREE_REVIVE_COUNT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 71,
    "loc": "/Lotus/Language/Upgrades/CosmeticEnhancerBonusRevive",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "GAMEPLAY_PICKUP_AMOUNT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 6,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/PickUps/HealthIncreaseItemPvP",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "GAMEPLAY_POWER_TO_HEALTH_ON_DEATH",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "SKILL_ABILITY_TACTICAL_EFFICIENCY",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "CatabolystCritOnKillMod_BuffReductionOnMiss",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/CatabolystCritOnKillMod.lua",
        "Function": "GetLocValues",
        "_minEnemyHitsForBuff": 3,
        "_buffMax": 3,
        "_buffCritLevels": [
          0.050000001,
          0.1,
          0.15000001,
          0.2,
          0.25,
          0.30000001
        ],
        "_buffReductionOnMissLevels": [
          0.050000001,
          0.1,
          0.15000001,
          0.2,
          0.25,
          0.30000001
        ],
        "_weaponType": "",
        "_hudBuffType": ""
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "VEHICLE_DOUBLE_JUMP_HEIGHT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_FALL_RESIST_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_FALL_SPEED",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_JUMP_CHARGE_TIME",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 1,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_JUMP_HEIGHT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_MAGNETISM",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_SCORE_MULTIPLIER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_SPEED_ALT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "VEHICLE_SPRINT_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_AIMED_SHOT_DAMAGE_BONUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_AMMO_CONSUME_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 8,
    "loc": "/Lotus/Language/Upgrades/AmpAmmoEfficiency",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AMMO_CONSUME_RATE",
    "d": "DT_ANY",
    "o": "SET",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AMMO_CONSUME_RATE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_IN_AIR"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AMMO_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 17,
    "loc": "/Lotus/Language/Upgrades/WeaponMaxAmmoModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AMMO_RETRIEVED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "/Lotus/Weapons/Ammo/RifleAmmoEx",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AUGMENT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "TetherMine",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/PentaTetherMine.lua",
        "Function": "GetLoc",
        "_triggerType": "",
        "_faction": ""
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_AUTO_RELOAD_RATE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 7,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "Holstered",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_BODYSHOT_MULTIPLIER",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_CHARGE_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 3,
    "loc": "/Lotus/Language/Upgrades/OperatorAmmoRegenDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CLIP_MAX",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 37,
    "loc": "/Lotus/Language/Upgrades/WeaponClipMaxModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_CLIP_MAX",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_CONVERT_AMMO",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 10,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/AmmoMutationMod.lua",
        "Function": "GetDescriptionInfo"
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CRIT_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 53,
    "loc": "/Lotus/Language/Upgrades/WeaponCritChance",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CRIT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/WeaponCritChance",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.0099999998,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CRIT_CHANCE_BODY_PART",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/CritChanceOnHeadshots",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "HEAD",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CRIT_CHANCE_WEAKPOINT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 8,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_CRIT_DAMAGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 36,
    "loc": "/Lotus/Language/Upgrades/WeaponCritDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "/Lotus/Weapons/Tenno/LotusLongGun",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.0049999999,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_AMOUNT",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 62,
    "loc": "/Lotus/Language/Upgrades/WeaponDamageModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Pistol/LotusPistol",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_AMOUNT_TO_OVERGUARD",
    "d": "DT_ANY",
    "o": "MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Arcanes/OverguardDamageDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 1,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_CONVERSION",
    "d": "DT_RADIANT",
    "o": "ADD",
    "n": 4,
    "loc": "/Lotus/Language/Arcanes/VoidToElectricDamageDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "DT_ELECTRICITY",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "DamageConversion.lua",
        "Function": "GetDescription",
        "_value": [
          0.23999999,
          0.47999999,
          0.72000003,
          0.98000002
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_CONVERSION",
    "d": "DT_PHYSICAL",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "DT_SLASH",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_CONVERSION_POST_COALESCE",
    "d": "DT_BASE_ELEMENTAL",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "DT_POISON",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_CONVERSION_POST_COALESCE",
    "d": "DT_COMPOUND_ELEMENTAL",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "DT_POISON",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_IF_VICTIM_PROC_ACTIVE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_OVER_DISTANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_OVER_DISTANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ProjectileDamageOverDistance.lua",
        "Function": "GetDescriptionInfo"
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_PER_ACTIVE_PROC_STACK_ON_VICTIM",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/DamagePerFreezeStack",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [
        "PT_CHILLED"
      ],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_DAMAGE_TYPE_BIAS",
    "d": "DT_SLASH",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_TYPE_BIAS",
    "d": "DT_PUNCTURE",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_TYPE_BIAS",
    "d": "DT_IMPACT",
    "o": "ADD",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_DAMAGE_WEAKPOINT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 8,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_EXPLOSION_RADIUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 6,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_EXPLOSION_RADIUS",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "SPOROTHRIX_EXPLOSIVE_BARBS",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/SporothrixExplosiveBarbMod.lua",
        "Function": "GetLocValues",
        "_punchThrough": 3,
        "_barbsRadius": 4,
        "_statusChanceLevels": [
          0.25,
          0.30000001,
          0.34999999,
          0.40000001,
          0.44999999,
          0.5
        ],
        "_modProjectileType": "",
        "_kuvaVariant": "",
        "_kuvaProjectileType": "",
        "_shouldSpawnFxOnHit": 1
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_EXPLOSION_RADIUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_EXTRA_SCAN_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_FIRE_ITERATIONS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 28,
    "loc": "/Lotus/Language/Upgrades/WeaponMultishotModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "/Lotus/Weapons/Tenno/LotusLongGun",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.001,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_FIRE_RATE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 73,
    "loc": "/Lotus/Language/Upgrades/FireRateModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Pistol/LotusPistol",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_FORCED_PROC_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [
        "PT_KNOCKED_DOWN"
      ],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_GORE_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_GRENADE_STICKY",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          1
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_HEADSHOT_MULTIPLIER",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 5,
    "loc": "/Lotus/Language/Upgrades/SniperHeadshotMultiplierModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_HEALTH_ON_HIT_ENEMY_WITH_PROC",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_HEALTH_PCT_FOR_FULL_CLIP",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_INIT_DAMAGE_MOD",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Rifle/LotusSniperRifle",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_LAST_DAMAGE_MOD",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_LIFE_STEAL",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 4,
    "loc": "/Lotus/Language/Upgrades/LifeSteal",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MARK_TARGET",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_ARMOR_REDUCTION",
    "d": "DT_IMPACT",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          1
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_ARMOR_REDUCTION",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Melee/LotusDagger",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_AUTOTARGET_MAXIMUM_ANGLE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_AUTOTARGET_RANGE_BONUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/Enemies/Orokin/Entrati/EntratiTech/NechroTech/AbilitySword/NechroTechSwordWeapon",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_AUTOTARGET_SPEED_BONUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_CHANCE_FROM_DOT",
    "d": "DT_CINEMATIC",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_DURATION_BONUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 10,
    "loc": "/Lotus/Language/Upgrades/ComboDurationSimpleModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Melee/PlayerMeleeWeapon",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_DURATION_BONUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_GAIN_EXTRA_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 10,
    "loc": "/Lotus/Language/Upgrades/MeleeComboGainExtraChanceOnLifted",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_GAIN_MISS_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_INITIAL_BONUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 5,
    "loc": "/Lotus/Language/Upgrades/ComboInitialBonusModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_COMBO_USAGE_EFFICIENCY",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 7,
    "loc": "/Lotus/Language/Upgrades/WeaponMeleeComboUsageEfficiency",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_DAMAGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 30,
    "loc": "/Lotus/Language/Upgrades/MeleeDamageBuffDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_DAMAGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/MeleeDamageBuffDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_MELEE_FINISHER_DAMAGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 5,
    "loc": "/Lotus/Language/Upgrades/WeaponMeleeFinisherDmgModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_HEAVY_CHARGE_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 6,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_HEAVY_EMPOWERED_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "FocusedAttack.lua",
        "Function": "GetDescription",
        "_perfectHeavyAttackProcChance": 0.125,
        "_heavyAttackCritDamage": 0.079999998
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.0099999998,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_MELEE_SLAM_DAMAGE_BONUS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 4,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/Game/LotusMeleeWeapon",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_NOCRIT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_NOCRIT_DAMAGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_NOISE_REDUCTION",
    "d": "DT_ANY",
    "o": "MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          1
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_NULLIFIER_BUBBLE_POP_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_OVERHEAT_PROC_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PARRY_ANGLE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PARRY_ANGLE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PARRY_COUNTER_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PARRY_COUNTER_CHANCE_STAGGER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/Game/LotusMeleeWeapon",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PARRY_COUNTER_CHANCE_STUN",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/Game/LotusMeleeWeapon",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PARRY_DAMAGE_BLOCKED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PARRY_DAMAGE_REFLECTED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PARRY_EFFECTIVENESS",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_SLASH",
    "o": "STACKING_MULTIPLY",
    "n": 31,
    "loc": "/Lotus/Language/Upgrades/WeaponSlashDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_PUNCTURE",
    "o": "STACKING_MULTIPLY",
    "n": 31,
    "loc": "/Lotus/Language/Upgrades/WeaponPunctureDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_IMPACT",
    "o": "STACKING_MULTIPLY",
    "n": 30,
    "loc": "/Lotus/Language/Upgrades/WeaponImpactDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_POISON",
    "o": "ADD",
    "n": 29,
    "loc": "/Lotus/Language/Upgrades/WeaponPoisonDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_FREEZE",
    "o": "ADD",
    "n": 29,
    "loc": "/Lotus/Language/Upgrades/WeaponFreezeDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_ELECTRICITY",
    "o": "ADD",
    "n": 29,
    "loc": "/Lotus/Language/Upgrades/WeaponElectricityDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_FIRE",
    "o": "ADD",
    "n": 28,
    "loc": "/Lotus/Language/Upgrades/WeaponFireDamage",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_MAGNETIC",
    "o": "ADD",
    "n": 15,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_RADIATION",
    "o": "ADD",
    "n": 14,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_VIRAL",
    "o": "ADD",
    "n": 9,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_GAS",
    "o": "ADD",
    "n": 8,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_CORROSIVE",
    "o": "ADD",
    "n": 7,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED",
    "d": "DT_EXPLOSION",
    "o": "ADD",
    "n": 7,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED_POST_COALESCE",
    "d": "DT_FIRE",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/WeaponFireDamage",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED_POST_COALESCE",
    "d": "DT_ELECTRICITY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/WeaponElectricityDamage",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_DAMAGE_ADDED_POST_COALESCE",
    "d": "DT_FREEZE",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/WeaponFreezeDamage",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_PUNCTURE",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_ELECTRICITY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_FIRE",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_FREEZE",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_SLASH",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_IMPACT",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_MAGNETIC",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_RADIATION",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PERCENT_BASE_INNATE_DAMAGE_ADDED",
    "d": "DT_POISON",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": []
    }
  },
  {
    "t": "WEAPON_PICKUP_SHOOT_BONUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "/Lotus/Types/PickUps/HealthIncrease",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_POWER_DAMAGE_BLOCK",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Types/Game/LotusMeleeWeapon",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_POWER_DAMAGE_MAX",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_POWER_DAMAGE_MULTIPLIER",
    "d": "DT_ANY",
    "o": "SET",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROC_CHANCE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 83,
    "loc": "/Lotus/Language/Upgrades/StatusChance",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROC_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PROC_DAMAGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 14,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROC_ON_PROC_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/ExtraProcDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "/Lotus/Weapons/Tenno/Pistol/LotusPistol",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROC_SELF_CC_REDUCTION_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROC_TIME",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 16,
    "loc": "/Lotus/Language/Upgrades/WeaponProcTimeModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PROJECTILE_BOUNCES",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0,
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROJECTILE_ELASTICITY",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROJECTILE_EXPLOSION_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 5,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PROJECTILE_LINGERING_AOE_DAMAGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          1,
          0,
          1
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROJECTILE_LINGERING_AOE_DURATION",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROJECTILE_LINGERING_AOE_RADIUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0,
          0
        ],
        "_absoluteValue": [
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PROJECTILE_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 19,
    "loc": "/Lotus/Language/Upgrades/WeaponProjectileSpeedModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_PUNCTURE_DEPTH",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 24,
    "loc": "/Lotus/Language/Upgrades/WeaponPunctureDepthModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_PUNCTURE_DEPTH",
    "d": "DT_ANY",
    "o": "SET",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_RANGE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 13,
    "loc": "/Lotus/Language/Upgrades/WeaponRangeModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_RANGE",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_RECOIL",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 24,
    "loc": "/Lotus/Language/Upgrades/WeaponRecoilModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_REFLECTION_EXPLOSION_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 2,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_REFLECTION_MODIFIER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 3,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_RELOAD_SPEED",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 44,
    "loc": "/Lotus/Language/Upgrades/WeaponReloadSpeedModDesc",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Tenno/Rifle/LotusSniperRifle",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_SHIELD_PERCENT_ON_KILL",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "/Lotus/Language/Upgrades/HeavyAttackKillRestoreShieldDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_HEAVY_MELEE"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_SLASH_PROC_ON_CRIT_CHANCE",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_SNIPER_COMBO_DURATION_BONUS",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_AIM"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_SPREAD",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 45,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "/Lotus/Weapons/Corpus/LongGuns/CrpShotgun/CrpShotgun",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 0,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_SPREAD",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 12,
    "loc": "/Lotus/Language/Upgrades/WeaponAccuracyAirborne",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [
        "PM_AIRBORNE"
      ],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 1,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_SYNDICATE_POWER",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 25,
    "loc": "",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "/Lotus/Syndicates/NewLokaSyndicate",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND"
    }
  },
  {
    "t": "WEAPON_TARGET_AMOUNT",
    "d": "DT_ANY",
    "o": "ADD",
    "n": 1,
    "loc": "",
    "tpl": {
      "AutoType": 0,
      "ValidType": "",
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": "/Lotus/Scripts/Mods/ModDescriptionStats.lua",
        "Function": "GetDescriptionInfo",
        "_displayAsPercent": [
          0
        ],
        "_absoluteValue": [
          0,
          0
        ],
        "_maxDecimals": [
          -1
        ],
        "_addPlusses": [
          0
        ],
        "_multiplyDown": [
          0
        ]
      },
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  },
  {
    "t": "WEAPON_ZOOM",
    "d": "DT_ANY",
    "o": "STACKING_MULTIPLY",
    "n": 12,
    "loc": "/Lotus/Language/Upgrades/WeaponZoomModDesc",
    "tpl": {
      "AutoType": 1,
      "ValidType": "",
      "CheckTypeOnInstall": 0,
      "SymbolFilter": "",
      "UpgradeObject": "",
      "ValidPostures": [],
      "ValidModifiers": [],
      "InvalidModifiers": [],
      "ValidProcTypes": [],
      "OverrideLocalization": 1,
      "LocKeyWordScript": {
        "Script": ""
      },
      "DisplayAsMultiplier": 0,
      "DisplayAsPercent": 1,
      "ReverseValueSymbol": 0,
      "SmallerIsBetter": 0,
      "RoundTo": 0.1,
      "RoundingMode": "RM_ROUND",
      "AllowConditionalLocMerge": 0
    }
  }
];

window.STAT_LABELS = {
  "GAMEPLAY_FREE_REVIVE_COUNT": "1 Arcane Revive",
  "WEAPON_PROC_CHANCE": "Status Chance",
  "WEAPON_DAMAGE_AMOUNT": "Damage",
  "WEAPON_FIRE_RATE": "Fire Rate",
  "WEAPON_RELOAD_SPEED": "Reload Speed",
  "WEAPON_CLIP_MAX": "Magazine Capacity",
  "WEAPON_CRIT_CHANCE": "Critical Chance",
  "AVATAR_PARKOUR_BOOST": "Mobility",
  "WEAPON_CRIT_DAMAGE": "Critical Damage",
  "WEAPON_FIRE_ITERATIONS": "Multishot",
  "WEAPON_MELEE_DAMAGE": "Melee Damage",
  "AVATAR_HEALTH_MAX": "Health",
  "AVATAR_ARMOUR": "Armor",
  "AVATAR_ABILITY_STRENGTH": "Ability Strength",
  "WEAPON_PUNCTURE_DEPTH": "Punch Through",
  "WEAPON_RECOIL": "Weapon Recoil",
  "AVATAR_ABILITY_DURATION": "Ability Duration",
  "AVATAR_SHIELD_MAX": "Shield Capacity",
  "AVATAR_PARKOUR_GLIDE": "Aim Glide/Wall Latch Duration",
  "WEAPON_PROJECTILE_SPEED": "Projectile Speed",
  "AVATAR_SPRINT_SPEED": "Sprint Speed",
  "WEAPON_SPREAD": "Accuracy",
  "AVATAR_ABILITY_EFFICIENCY": "Ability Efficiency",
  "WEAPON_CONVERT_AMMO": "Converts Secondary ammo pickups to of Ammo Pick Up",
  "WEAPON_AMMO_MAX": "Ammo Maximum",
  "AVATAR_POWER_RATE": "Energy Rate",
  "WEAPON_MELEE_COMBO_DURATION_BONUS": "Combo Duration",
  "AVATAR_SHIELD_RECHARGE_RATE": "Shield Recharge",
  "AVATAR_ABILITY_RANGE": "Ability Range",
  "WEAPON_RANGE": "Beam Range",
  "WEAPON_PROC_TIME": "Status Duration",
  "AVATAR_SHIELD_RECHARGE_DELAY": "Shield Recharge Delay",
  "AVATAR_POWER_MAX": "Energy Max",
  "AVATAR_ENEMY_RADAR": "Enemy Radar",
  "WEAPON_PROC_DAMAGE": "Status Damage",
  "WEAPON_EXPLOSION_RADIUS": "Blast Range",
  "AVATAR_SLIDE_BOOST": "Slide",
  "GAMEPLAY_PICKUP_AMOUNT": "From Health Orbs",
  "WEAPON_MELEE_COMBO_GAIN_EXTRA_CHANCE": "Additional Combo Count Chance on Lifted enemies",
  "WEAPON_HEADSHOT_MULTIPLIER": "Headshot Multiplier",
  "AVATAR_HEAL_RATE": "Health Regen/s",
  "AVATAR_LOOT_RADAR": "Loot Radar",
  "WEAPON_PROJECTILE_EXPLOSION_CHANCE": "Chance to Explode (Use with Caution)",
  "WEAPON_MELEE_COMBO_USAGE_EFFICIENCY": "Heavy Attack Efficiency",
  "AVATAR_MOVEMENT_SPEED": "Speed",
  "AVATAR_DAMAGE_POWER_MULTIPLIER": "Convert of Damage on Health to Energy",
  "AVATAR_CASTING_SPEED": "Casting Speed",
  "AVATAR_SLIDE_FRICTION": "Friction",
  "WEAPON_MELEE_HEAVY_CHARGE_SPEED": "Heavy Attack Wind Up Speed",
  "WEAPON_AMMO_RETRIEVED": "Squad receives Sniper Rifle Ammo Recovery",
  "WEAPON_LIFE_STEAL": "Life Steal",
  "WEAPON_AMMO_CONSUME_RATE": "Amp Ammo Efficiency",
  "AVATAR_TIME_LIMIT_INCREASE": "Hacking",
  "WEAPON_NOISE_REDUCTION": "Reduces the chance an enemy will hear gunfire",
  "AVATAR_PARKOUR_GRAVITY": "Gravity while Aim Gliding",
  "GAMEPLAY_POWER_TO_HEALTH_ON_DEATH": "Drains Energy to stop Lethal Damage with +Efficiency",
  "WEAPON_ZOOM": "Zoom",
  "WEAPON_DAMAGE_WEAKPOINT": "Weak Point Damage",
  "WEAPON_CRIT_CHANCE_WEAKPOINT": "Weak Point Critical Chance",
  "WEAPON_MARK_TARGET": "Reveals target on Minimap for",
  "WEAPON_MELEE_COMBO_INITIAL_BONUS": "Initial Combo",
  "WEAPON_REFLECTION_MODIFIER": "Bounce",
  "AVATAR_HEAL_PERCENT_MAX_HEALTH": "Health Regeneration/s",
  "WEAPON_CHARGE_RATE": "Amp Energy Regeneration",
  "AVATAR_BLEEDOUT_MODIFIER": "Bleedout Rate",
  "AVATAR_ABILITY_OPERATOR_ULTIMATE_INITIAL_CHARGE": "Tauron Strike Initial Charge",
  "AVATAR_PICKUP_BONUS_AMOUNT": "Health pickups give Energy",
  "WEAPON_PARRY_COUNTER_CHANCE": "Chance to open enemies to Finisher Attacks after Warframe blocks Melee",
  "AVATAR_KNOCKDOWN_RECOVERY_SPEED": "Faster Knockdown Recovery",
  "AVATAR_FALL_IMPACT_RADIUS": "Create seismic shockwaves from heavy landings, dealing Damage and knocking foes off their feet",
  "AVATAR_LOOT_CHANCE": "Chance to unlock locked lockers",
  "WEAPON_PROJECTILE_BOUNCES": "Flak now bounces up to and travels faster",
  "AVATAR_SENTINEL_PACK_LEADER": "Health per hit",
  "WEAPON_DAMAGE_IF_VICTIM_PROC_ACTIVE": "Melee Damage per Status Type affecting the target",
  "WEAPON_GRENADE_STICKY": "Grenades have chance to stick to surfaces",
  "WEAPON_INIT_DAMAGE_MOD": "Damage on first shot in Magazine",
  "WEAPON_PICKUP_SHOOT_BONUS": "Shoot Health Orbs to obtain them with extra effect",
  "WEAPON_DAMAGE_OVER_DISTANCE": "Increase damage",
  "WEAPON_MELEE_AUTOTARGET_RANGE_BONUS": "Lock onto targets within , but reduces blocking effectiveness",
  "WEAPON_MELEE_SLAM_DAMAGE_BONUS": "Slam Attack Damage",
  "AVATAR_JUMP_HEIGHT": "Jump Height",
  "WEAPON_MELEE_FINISHER_DAMAGE": "Finisher Damage",
  "WEAPON_REFLECTION_EXPLOSION_CHANCE": "Chance to explode on Bounce (Disables Punch Through)",
  "AVATAR_REVIVE_ASSIST": "Sentinel incapacitates itself to revive its downed owner to health and shields in",
  "WEAPON_DAMAGE_AMOUNT_TO_OVERGUARD": "Deals Extra Damage to Overguard",
  "AVATAR_DASH_RADIUS": "Void Sling Radius",
  "AVATAR_NO_DEATH_PENALTY": "Chance to negate Transference Static",
  "AVATAR_DAMAGE_REDUCTION_DURING_REVIVE": "Damage Taken During Revive",
  "WEAPON_PROC_ON_PROC_CHANCE": "Chance to trigger a second random Status Effect",
  "AVATAR_ABILITY_OPERATOR_ULTIMATE_CHARGE": "Tauron Strike Charge Rate",
  "AVATAR_MELEE_DAMAGE_TO_JUMP_KICK": "Of Melee Damage converted to Impact Damage on Jump Kick, knocking down nearby enemies on kill",
  "AVATAR_HEAVY_LAND_RESIST_CHANCE": "Falling is less likely to result in a hard landing",
  "AVATAR_ENERGY_SPAWN_PERCENT": "Maximum Energy is filled on Spawn",
  "AVATAR_REVENGE_DAMAGE_CHANCE": "Chance to deal Electrical Damage when shield struck by melee enemies",
  "AVATAR_REVENGE_DAMAGE_AMOUNT": "Electricity",
  "AVATAR_PROC_TIME": "Status Duration on Self",
  "WEAPON_PARRY_COUNTER_CHANCE_STAGGER": "Chance to Stagger on Block",
  "WEAPON_PARRY_COUNTER_CHANCE_STUN": "Chance to Stun on Block",
  "WEAPON_AIMED_SHOT_DAMAGE_BONUS": "Damage when Aiming",
  "WEAPON_NULLIFIER_BUBBLE_POP_CHANCE": "Each Miter blade has a chance to immediately destroy a Nullifier field",
  "WEAPON_LAST_DAMAGE_MOD": "Bonus Damage on final shot",
  "AVATAR_AIR_JUMP_HEIGHT": "Increase Double Jump strength",
  "AVATAR_MARKED_DAMAGE_AMOUNT": "Squad deals extra Damage against a Marked Enemy",
  "AVATAR_SENTINEL_STATUS_LINK": "Primary Weapon Status Chance added to Companion",
  "WEAPON_SLASH_PROC_ON_CRIT_CHANCE": "Chance to apply on Critical",
  "AVATAR_SENTINEL_CRIT_LINK": "Primary Weapon Critical Chance added to Companion",
  "AVATAR_SENTINEL_PACK_LEADER_REVERSE": "Warframe healed for Companion Damage dealt",
  "AVATAR_EXPLOSION_DAMAGE": "Explodes when incapacitated, dealing Blast Damage in a radius and knocking down nearby enemies",
  "AVATAR_SENTINEL_SHIELD_LINK": "Increase Shield by of Warframe's Max Shield",
  "AVATAR_SENTINEL_HEALTH_LINK": "Increase Health by of Warframe's Max Health",
  "AVATAR_SENTINEL_ARMOUR_LINK": "Increase Max Armor by of Warframe's Armor",
  "WEAPON_NOCRIT_DAMAGE": "Non-Critical hits deal damage",
  "AVATAR_RESPAWN_TIME": "Companion Recovery Time",
  "WEAPON_PROC_SELF_CC_REDUCTION_CHANCE": "Chance to reduce the Stagger effect from self-imposed Radial Attacks",
  "WEAPON_PROJECTILE_LINGERING_AOE_DAMAGE": "Rockets disperse napalm, inflicting damage over across of the explosion area",
  "WEAPON_BODYSHOT_MULTIPLIER": "Bodyshot Damage",
  "AVATAR_ENERGY_TO_OVERSHIELDS_ON_SPAWN": "Converts up to 50 Energy to Overshields at a rate",
  "AVATAR_SPAWN_ENERGY": "Energy",
  "AVATAR_ENERGY_ON_FULL_SHIELD_REGEN": "Gain energy, upon replenishing shields completely after they have been deactivated",
  "AVATAR_FULL_ENERGY_EFFECT_RANGE": "Exposes enemies at maximum Energy Capacity within",
  "WEAPON_PARRY_EFFECTIVENESS": "Damage Block",
  "WEAPON_POWER_DAMAGE_BLOCK": "Blocking reduces damage taken from enemy abilities",
  "AVATAR_AURA_STRENGTH": "Squad benefits more from Auras",
  "AVATAR_AURA_EFFECTIVENESS_ON_ME": "You benefit an additional from Auras",
  "AVATAR_EVADE_NPC_BULLET": "Enemy Accuracy when targeting Warframe",
  "AVATAR_ABILITY_ENERGY_TO_OVERSHIELD": "Energy spent on abilities is converted to Shields",
  "AVATAR_STAMINA_RECHARGE_RATE": "Engine Replenish",
  "AVATAR_STAMINA_MAX": "Engine Max",
  "AVATAR_STAMINA_COST_MULTIPLIER": "Engine Efficiency",
  "WEAPON_POWER_DAMAGE_MULTIPLIER": "Converts of Energy used to up to Bonus Damage on next Melee Attack",
  "WEAPON_HEALTH_ON_HIT_ENEMY_WITH_PROC": "Restores Health per Status Type affecting the target",
  "WEAPON_PARRY_ANGLE": "Parry Angle",
  "VEHICLE_SPRINT_SPEED": "K-Drive Boost Speed",
  "VEHICLE_SPEED": "K-Drive Speed",
  "VEHICLE_SCORE_MULTIPLIER": "K-Drive Point Multiplier to Trick Score",
  "VEHICLE_JUMP_HEIGHT": "K-Drive Jump Height",
  "VEHICLE_JUMP_CHARGE_TIME": "K-Drive Jump Charge Time",
  "VEHICLE_SPEED_ALT": "K-Drive Grind Speed",
  "VEHICLE_MAGNETISM": "K-Drive Grind Magnetism",
  "VEHICLE_FALL_SPEED": "K-Drive Velocity when falling",
  "VEHICLE_FALL_RESIST_CHANCE": "K-Drive Chance to Resist Falls",
  "VEHICLE_DOUBLE_JUMP_HEIGHT": "K-Drive Double Jump Height",
  "AVATAR_REVIVE_SPEED": "Revive Speed",
  "AVATAR_ACROBATIC_SPEED": "Dodge Speed",
  "WEAPON_GORE_CHANCE": "Gore Chance",
  "AVATAR_REHACK_CHANCE": "Retry on Hacking failure",
  "AVATAR_HACK_CHANCE": "Chance to auto complete Hacking",
  "AVATAR_NPC_HIT_CHANCE": "Enemy Corpus lose Accuracy",
  "AVATAR_ABILITY_ENERGY_TO_SHIELD": "Squad converts of Energy spent to Shields while Overshields are inactive",
  "AVATAR_DASH_DISTANCE": "Increases maximum Void Sling distance",
  "WEAPON_MELEE_HEAVY_EMPOWERED_CHANCE": "Enables Tennokai",
  "AVATAR_SUCCESS_CHANCE": "Success Chance",
  "WEAPON_TARGET_AMOUNT": "Strikes additional enemies and increases Attack Range",
  "AVATAR_PROC_REFLECT_CHANCE": "Adarza Kavat has a chance to reflect damage back to an enemy, amplifying it",
  "WEAPON_MELEE_ARMOR_REDUCTION": "Impact Damage reduces enemy Armor by",
  "WEAPON_MELEE_COMBO_CHANCE_FROM_DOT": "Chance to increase Melee Combo Counter when Slash Status deals damage",
  "WEAPON_SHIELD_PERCENT_ON_KILL": "Heavy Attack kills restore of max Shields",
  "AVATAR_INJURY_BLOCK_CHANCE": "Chance to Resist",
  "AVATAR_INJURY_ANIM_RATE": "Faster Recovery",
  "AVATAR_PROC_IMMUNITY_DURATION": "Immunity Duration",
  "WEAPON_DAMAGE_PER_ACTIVE_PROC_STACK_ON_VICTIM": "Damage per Status",
  "WEAPON_DAMAGE_CONVERSION": "Converted Damage",
  "WEAPON_DAMAGE_CONVERSION_POST_COALESCE": "Converted Claw Damage",
  "WEAPON_DAMAGE_TYPE_BIAS": "Damage Converted",
  "AVATAR_PARKOUR_DAMAGE_ADDED": "on Bullet Jump",
  "WEAPON_PERCENT_BASE_DAMAGE_ADDED_POST_COALESCE": "Claw Damage"
};
