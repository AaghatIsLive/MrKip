const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
// const fetch = require("node-fetch");

// Define the Pokémon evolutions data 
// example data from emerald crest
const pokemonEvolutions = {
  BULBASAUR: [{ method: "LEVEL", value: "16", target: "IVYSAUR" }],
  IVYSAUR: [{ method: "LEVEL", value: "32", target: "VENUSAUR" }],
  CHARMANDER: [{ method: "LEVEL", value: "16", target: "CHARMELEON" }],
  CHARMELEON: [{ method: "LEVEL", value: "36", target: "CHARIZARD" }],
  SQUIRTLE: [{ method: "LEVEL", value: "16", target: "WARTORTLE" }],
  WARTORTLE: [{ method: "LEVEL", value: "36", target: "BLASTOISE" }],
  CATERPIE: [{ method: "LEVEL", value: "7", target: "METAPOD" }],
  METAPOD: [{ method: "LEVEL", value: "10", target: "BUTTERFREE" }],
  WEEDLE: [{ method: "LEVEL", value: "7", target: "KAKUNA" }],
  KAKUNA: [{ method: "LEVEL", value: "10", target: "BEEDRILL" }],
  PIDGEY: [{ method: "LEVEL", value: "18", target: "PIDGEOTTO" }],
  PIDGEOTTO: [{ method: "LEVEL", value: "36", target: "PIDGEOT" }],
  RATTATA: [{ method: "LEVEL", value: "20", target: "RATICATE" }],
  SPEAROW: [{ method: "LEVEL", value: "20", target: "FEAROW" }],
  EKANS: [{ method: "LEVEL", value: "22", target: "ARBOK" }],
  PIKACHU: [
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "RAICHU" },
    { method: "MAPSEC", value: "MAPSEC_NEW_MAUVILLE", target: "RAICHU_ALOLA" },
  ],
  SANDSHREW: [{ method: "LEVEL", value: "22", target: "SANDSLASH" }],
  NIDORAN_F: [{ method: "LEVEL", value: "16", target: "NIDORINA" }],
  NIDORINA: [{ method: "ITEM", value: "ITEM_MOON_STONE", target: "NIDOQUEEN" }],
  NIDORAN_M: [{ method: "LEVEL", value: "16", target: "NIDORINO" }],
  NIDORINO: [{ method: "ITEM", value: "ITEM_MOON_STONE", target: "NIDOKING" }],
  CLEFAIRY: [{ method: "ITEM", value: "ITEM_MOON_STONE", target: "CLEFABLE" }],
  VULPIX: [{ method: "ITEM", value: "ITEM_FIRE_STONE", target: "NINETALES" }],
  JIGGLYPUFF: [
    { method: "ITEM", value: "ITEM_MOON_STONE", target: "WIGGLYTUFF" },
  ],
  ZUBAT: [{ method: "LEVEL", value: "22", target: "GOLBAT" }],
  GOLBAT: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "CROBAT" },
  ],
  ODDISH: [{ method: "LEVEL", value: "21", target: "GLOOM" }],
  GLOOM: [
    { method: "ITEM", value: "ITEM_LEAF_STONE", target: "VILEPLUME" },
    { method: "ITEM", value: "ITEM_SUN_STONE", target: "BELLOSSOM" },
  ],
  PARAS: [{ method: "LEVEL", value: "24", target: "PARASECT" }],
  VENONAT: [{ method: "LEVEL", value: "31", target: "VENOMOTH" }],
  DIGLETT: [{ method: "LEVEL", value: "26", target: "DUGTRIO" }],
  MEOWTH: [{ method: "LEVEL", value: "28", target: "PERSIAN" }],
  PSYDUCK: [{ method: "LEVEL", value: "33", target: "GOLDUCK" }],
  MANKEY: [{ method: "LEVEL", value: "28", target: "PRIMEAPE" }],
  GROWLITHE: [{ method: "ITEM", value: "ITEM_FIRE_STONE", target: "ARCANINE" }],
  GROWLITHE_HISUI: [
    { method: "ITEM", value: "ITEM_FIRE_STONE", target: "ARCANINE_HISUI" },
  ],
  POLIWAG: [{ method: "LEVEL", value: "25", target: "POLIWHIRL" }],
  POLIWHIRL: [
    { method: "ITEM", value: "ITEM_WATER_STONE", target: "POLIWRATH" },
    { method: "TRADE_ITEM", value: "ITEM_KINGS_ROCK", target: "POLITOED" },
    { method: "ITEM", value: "ITEM_KINGS_ROCK", target: "POLITOED" },
  ],
  ABRA: [{ method: "LEVEL", value: "16", target: "KADABRA" }],
  KADABRA: [
    { method: "TRADE", value: "0", target: "ALAKAZAM" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "ALAKAZAM" },
  ],
  MACHOP: [{ method: "LEVEL", value: "28", target: "MACHOKE" }],
  MACHOKE: [
    { method: "TRADE", value: "0", target: "MACHAMP" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "MACHAMP" },
  ],
  BELLSPROUT: [{ method: "LEVEL", value: "21", target: "WEEPINBELL" }],
  WEEPINBELL: [
    { method: "ITEM", value: "ITEM_LEAF_STONE", target: "VICTREEBEL" },
  ],
  TENTACOOL: [{ method: "LEVEL", value: "30", target: "TENTACRUEL" }],
  GEODUDE: [{ method: "LEVEL", value: "25", target: "GRAVELER" }],
  GRAVELER: [
    { method: "TRADE", value: "0", target: "GOLEM" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOLEM" },
  ],
  PONYTA: [{ method: "LEVEL", value: "40", target: "RAPIDASH" }],
  SLOWPOKE: [
    { method: "LEVEL", value: "37", target: "SLOWBRO" },
    { method: "TRADE_ITEM", value: "ITEM_KINGS_ROCK", target: "SLOWKING" },
    { method: "ITEM", value: "ITEM_KINGS_ROCK", target: "SLOWKING" },
  ],
  MAGNEMITE: [{ method: "LEVEL", value: "30", target: "MAGNETON" }],

  MAGNETON: [
    { method: "MAPSEC", value: "MAPSEC_NEW_MAUVILLE", target: "MAGNEZONE" },
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "MAGNEZONE" },
  ],

  DODUO: [{ method: "LEVEL", value: "31", target: "DODRIO" }],
  SEEL: [{ method: "LEVEL", value: "34", target: "DEWGONG" }],
  GRIMER: [{ method: "LEVEL", value: "38", target: "MUK" }],
  SHELLDER: [{ method: "ITEM", value: "ITEM_WATER_STONE", target: "CLOYSTER" }],
  GASTLY: [{ method: "LEVEL", value: "25", target: "HAUNTER" }],
  HAUNTER: [
    { method: "TRADE", value: "0", target: "GENGAR" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GENGAR" },
  ],
  ONIX: [
    { method: "TRADE_ITEM", value: "ITEM_METAL_COAT", target: "STEELIX" },
    { method: "ITEM", value: "ITEM_METAL_COAT", target: "STEELIX" },
  ],
  DROWZEE: [{ method: "LEVEL", value: "26", target: "HYPNO" }],
  KRABBY: [{ method: "LEVEL", value: "28", target: "KINGLER" }],
  VOLTORB: [{ method: "LEVEL", value: "30", target: "ELECTRODE" }],
  VOLTORB_HISUI: [
    { method: "ITEM", value: "ITEM_LEAF_STONE", target: "ELECTRODE_HISUI" },
  ],
  EXEGGCUTE: [
    { method: "ITEM", value: "ITEM_LEAF_STONE", target: "EXEGGUTOR" },
    {
      method: "SPECIFIC_MAP",
      value: "MAP_PETALBURG_WOODS",
      target: "EXEGGUTOR_ALOLA",
    },
  ],
  CUBONE: [
    { method: "LEVEL", value: "28", target: "MAROWAK" },
    { method: "LEVEL_NIGHT", value: "28", target: "MAROWAK_ALOLA" },
  ],

  LICKITUNG: [{ method: "MOVE", value: "MOVE_ROLLOUT", target: "LICKILICKY" }],

  KOFFING: [
    { method: "LEVEL", value: "35", target: "WEEZING" },
    { method: "LEVEL_NIGHT", value: "35", target: "WEEZING_GALAR" },
  ],
  RHYHORN: [{ method: "LEVEL", value: "42", target: "RHYDON" }],

  RHYDON: [
    { method: "TRADE_ITEM", value: "ITEM_PROTECTOR", target: "RHYPERIOR" },
    { method: "ITEM", value: "ITEM_PROTECTOR", target: "RHYPERIOR" },
  ],

  CHANSEY: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "BLISSEY" },
  ],

  TANGELA: [
    { method: "MOVE", value: "MOVE_ANCIENT_POWER", target: "TANGROWTH" },
  ],

  HORSEA: [{ method: "LEVEL", value: "32", target: "SEADRA" }],
  SEADRA: [
    { method: "TRADE_ITEM", value: "ITEM_DRAGON_SCALE", target: "KINGDRA" },
    { method: "ITEM", value: "ITEM_DRAGON_SCALE", target: "KINGDRA" },
  ],
  GOLDEEN: [{ method: "LEVEL", value: "33", target: "SEAKING" }],
  STARYU: [{ method: "ITEM", value: "ITEM_WATER_STONE", target: "STARMIE" }],
  SCYTHER: [
    { method: "TRADE_ITEM", value: "ITEM_METAL_COAT", target: "SCIZOR" },
    { method: "ITEM", value: "ITEM_BLACK_AUGURITE", target: "KLEAVOR" },
    { method: "ITEM", value: "ITEM_METAL_COAT", target: "SCIZOR" },
  ],

  ELECTABUZZ: [
    { method: "TRADE_ITEM", value: "ITEM_ELECTIRIZER", target: "ELECTIVIRE" },
    { method: "ITEM", value: "ITEM_ELECTIRIZER", target: "ELECTIVIRE" },
  ],
  MAGMAR: [
    { method: "TRADE_ITEM", value: "ITEM_MAGMARIZER", target: "MAGMORTAR" },
    { method: "ITEM", value: "ITEM_MAGMARIZER", target: "MAGMORTAR" },
  ],

  MAGIKARP: [{ method: "LEVEL", value: "20", target: "GYARADOS" }],
  EEVEE: [
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "JOLTEON" },
    { method: "ITEM", value: "ITEM_WATER_STONE", target: "VAPOREON" },
    { method: "ITEM", value: "ITEM_FIRE_STONE", target: "FLAREON" },
    { method: "FRIENDSHIP_DAY", value: "High Friendship", target: "ESPEON" },
    { method: "FRIENDSHIP_NIGHT", value: "High Friendship", target: "UMBREON" },

    { method: "SPECIFIC_MAP", value: "MAP_PETALBURG_WOODS", target: "LEAFEON" },
    { method: "ITEM", value: "ITEM_LEAF_STONE", target: "LEAFEON" },
    {
      method: "SPECIFIC_MAP",
      value: "MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM",
      target: "GLACEON",
    },
    { method: "ITEM", value: "ITEM_ICE_STONE", target: "GLACEON" },

    {
      method: "FRIENDSHIP_MOVE_TYPE",
      value: "High Friendship, Knowing FAIRY_TYPE MOVE",
      target: "SYLVEON",
    },
  ],
  PORYGON: [
    { method: "TRADE_ITEM", value: "ITEM_UPGRADE", target: "PORYGON2" },
    { method: "ITEM", value: "ITEM_UPGRADE", target: "PORYGON2" },
  ],
  OMANYTE: [{ method: "LEVEL", value: "40", target: "OMASTAR" }],
  KABUTO: [{ method: "LEVEL", value: "40", target: "KABUTOPS" }],
  DRATINI: [{ method: "LEVEL", value: "30", target: "DRAGONAIR" }],
  DRAGONAIR: [{ method: "LEVEL", value: "55", target: "DRAGONITE" }],
  CHIKORITA: [{ method: "LEVEL", value: "16", target: "BAYLEEF" }],
  BAYLEEF: [{ method: "LEVEL", value: "32", target: "MEGANIUM" }],
  CYNDAQUIL: [{ method: "LEVEL", value: "14", target: "QUILAVA" }],
  QUILAVA: [
    { method: "LEVEL", value: "36", target: "TYPHLOSION" },
    { method: "LEVEL_NIGHT", value: "36", target: "TYPHLOSION_HISUI" },
  ],
  TOTODILE: [{ method: "LEVEL", value: "18", target: "CROCONAW" }],
  CROCONAW: [{ method: "LEVEL", value: "30", target: "FERALIGATR" }],
  SENTRET: [{ method: "LEVEL", value: "15", target: "FURRET" }],
  HOOTHOOT: [{ method: "LEVEL", value: "20", target: "NOCTOWL" }],
  LEDYBA: [{ method: "LEVEL", value: "18", target: "LEDIAN" }],
  SPINARAK: [{ method: "LEVEL", value: "22", target: "ARIADOS" }],
  CHINCHOU: [{ method: "LEVEL", value: "27", target: "LANTURN" }],
  PICHU: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "PIKACHU" },
  ],
  CLEFFA: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "CLEFAIRY" },
  ],
  IGGLYBUFF: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "JIGGLYPUFF" },
  ],
  TOGEPI: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "TOGETIC" },
  ],

  TOGETIC: [{ method: "ITEM", value: "ITEM_SHINY_STONE", target: "TOGEKISS" }],

  NATU: [{ method: "LEVEL", value: "25", target: "XATU" }],
  MAREEP: [{ method: "LEVEL", value: "15", target: "FLAAFFY" }],
  FLAAFFY: [{ method: "LEVEL", value: "30", target: "AMPHAROS" }],
  MARILL: [{ method: "LEVEL", value: "18", target: "AZUMARILL" }],
  HOPPIP: [{ method: "LEVEL", value: "18", target: "SKIPLOOM" }],
  SKIPLOOM: [{ method: "LEVEL", value: "27", target: "JUMPLUFF" }],
  AIPOM: [{ method: "MOVE", value: "MOVE_DOUBLE_HIT", target: "AMBIPOM" }],
  SUNKERN: [{ method: "ITEM", value: "ITEM_SUN_STONE", target: "SUNFLORA" }],

  YANMA: [{ method: "MOVE", value: "MOVE_ANCIENT_POWER", target: "YANMEGA" }],

  WOOPER: [{ method: "LEVEL", value: "20", target: "QUAGSIRE" }],

  MURKROW: [{ method: "ITEM", value: "ITEM_DUSK_STONE", target: "HONCHKROW" }],
  MISDREAVUS: [
    { method: "ITEM", value: "ITEM_DUSK_STONE", target: "MISMAGIUS" },
  ],

  PINECO: [{ method: "LEVEL", value: "31", target: "FORRETRESS" }],

  GLIGAR: [
    { method: "ITEM_HOLD_NIGHT", value: "ITEM_RAZOR_FANG", target: "GLISCOR" },
    { method: "ITEM_NIGHT", value: "ITEM_RAZOR_FANG", target: "GLISCOR" },
  ],

  SNUBBULL: [{ method: "LEVEL", value: "23", target: "GRANBULL" }],

  SNEASEL: [
    { method: "ITEM_HOLD_NIGHT", value: "ITEM_RAZOR_CLAW", target: "WEAVILE" },
    { method: "ITEM_NIGHT", value: "ITEM_RAZOR_CLAW", target: "WEAVILE" },
  ],

  TEDDIURSA: [{ method: "LEVEL", value: "30", target: "URSARING" }],
  SLUGMA: [{ method: "LEVEL", value: "38", target: "MAGCARGO" }],
  SWINUB: [{ method: "LEVEL", value: "33", target: "PILOSWINE" }],

  PILOSWINE: [
    { method: "MOVE", value: "MOVE_ANCIENT_POWER", target: "MAMOSWINE" },
  ],

  REMORAID: [{ method: "LEVEL", value: "25", target: "OCTILLERY" }],
  HOUNDOUR: [{ method: "LEVEL", value: "24", target: "HOUNDOOM" }],
  PHANPY: [{ method: "LEVEL", value: "25", target: "DONPHAN" }],

  PORYGON2: [
    { method: "TRADE_ITEM", value: "ITEM_DUBIOUS_DISC", target: "PORYGON_Z" },
    { method: "ITEM", value: "ITEM_DUBIOUS_DISC", target: "PORYGON_Z" },
  ],

  TYROGUE: [
    { method: "LEVEL_ATK_LT_DEF", value: "20", target: "HITMONCHAN" },
    { method: "LEVEL_ATK_GT_DEF", value: "20", target: "HITMONLEE" },
    { method: "LEVEL_ATK_EQ_DEF", value: "20", target: "HITMONTOP" },
  ],
  SMOOCHUM: [{ method: "LEVEL", value: "30", target: "JYNX" }],
  ELEKID: [{ method: "LEVEL", value: "30", target: "ELECTABUZZ" }],
  MAGBY: [{ method: "LEVEL", value: "30", target: "MAGMAR" }],
  LARVITAR: [{ method: "LEVEL", value: "30", target: "PUPITAR" }],
  PUPITAR: [{ method: "LEVEL", value: "55", target: "TYRANITAR" }],
  TREECKO: [{ method: "LEVEL", value: "16", target: "GROVYLE" }],
  GROVYLE: [{ method: "LEVEL", value: "36", target: "SCEPTILE" }],
  TORCHIC: [{ method: "LEVEL", value: "16", target: "COMBUSKEN" }],
  COMBUSKEN: [{ method: "LEVEL", value: "36", target: "BLAZIKEN" }],
  MUDKIP: [{ method: "LEVEL", value: "16", target: "MARSHTOMP" }],
  MARSHTOMP: [{ method: "LEVEL", value: "36", target: "SWAMPERT" }],
  POOCHYENA: [{ method: "LEVEL", value: "18", target: "MIGHTYENA" }],
  ZIGZAGOON: [{ method: "LEVEL", value: "20", target: "LINOONE" }],
  WURMPLE: [
    { method: "LEVEL_SILCOON", value: "7", target: "SILCOON" },
    { method: "LEVEL_CASCOON", value: "7", target: "CASCOON" },
  ],
  SILCOON: [{ method: "LEVEL", value: "10", target: "BEAUTIFLY" }],
  CASCOON: [{ method: "LEVEL", value: "10", target: "DUSTOX" }],
  LOTAD: [{ method: "LEVEL", value: "14", target: "LOMBRE" }],
  LOMBRE: [{ method: "ITEM", value: "ITEM_WATER_STONE", target: "LUDICOLO" }],
  SEEDOT: [{ method: "LEVEL", value: "14", target: "NUZLEAF" }],
  NUZLEAF: [{ method: "ITEM", value: "ITEM_LEAF_STONE", target: "SHIFTRY" }],
  NINCADA: [
    { method: "LEVEL_NINJASK", value: "20", target: "NINJASK" },
    { method: "LEVEL_SHEDINJA", value: "20", target: "SHEDINJA" },
  ],
  TAILLOW: [{ method: "LEVEL", value: "22", target: "SWELLOW" }],
  SHROOMISH: [{ method: "LEVEL", value: "23", target: "BRELOOM" }],
  WINGULL: [{ method: "LEVEL", value: "25", target: "PELIPPER" }],
  SURSKIT: [{ method: "LEVEL", value: "22", target: "MASQUERAIN" }],
  WAILMER: [{ method: "LEVEL", value: "40", target: "WAILORD" }],
  SKITTY: [{ method: "ITEM", value: "ITEM_MOON_STONE", target: "DELCATTY" }],
  BALTOY: [{ method: "LEVEL", value: "36", target: "CLAYDOL" }],

  NOSEPASS: [
    { method: "MAPSEC", value: "MAPSEC_NEW_MAUVILLE", target: "PROBOPASS" },
  ],

  BARBOACH: [{ method: "LEVEL", value: "30", target: "WHISCASH" }],
  CORPHISH: [{ method: "LEVEL", value: "30", target: "CRAWDAUNT" }],
  FEEBAS: [
    { method: "BEAUTY", value: "170", target: "MILOTIC" },
    { method: "TRADE_ITEM", value: "ITEM_PRISM_SCALE", target: "MILOTIC" },
    { method: "ITEM", value: "ITEM_PRISM_SCALE", target: "MILOTIC" },
  ],
  CARVANHA: [{ method: "LEVEL", value: "30", target: "SHARPEDO" }],
  TRAPINCH: [{ method: "LEVEL", value: "35", target: "VIBRAVA" }],
  VIBRAVA: [{ method: "LEVEL", value: "45", target: "FLYGON" }],
  MAKUHITA: [{ method: "LEVEL", value: "24", target: "HARIYAMA" }],
  ELECTRIKE: [{ method: "LEVEL", value: "26", target: "MANECTRIC" }],
  NUMEL: [{ method: "LEVEL", value: "33", target: "CAMERUPT" }],
  SPHEAL: [{ method: "LEVEL", value: "32", target: "SEALEO" }],
  SEALEO: [{ method: "LEVEL", value: "44", target: "WALREIN" }],
  CACNEA: [{ method: "LEVEL", value: "32", target: "CACTURNE" }],
  SNORUNT: [
    { method: "LEVEL", value: "42", target: "GLALIE" },

    { method: "ITEM_FEMALE", value: "ITEM_DAWN_STONE", target: "FROSLASS" },
  ],
  AZURILL: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "MARILL" },
  ],
  SPOINK: [{ method: "LEVEL", value: "32", target: "GRUMPIG" }],
  MEDITITE: [{ method: "LEVEL", value: "37", target: "MEDICHAM" }],
  SWABLU: [{ method: "LEVEL", value: "35", target: "ALTARIA" }],
  WYNAUT: [{ method: "LEVEL", value: "15", target: "WOBBUFFET" }],
  DUSKULL: [{ method: "LEVEL", value: "37", target: "DUSCLOPS" }],

  DUSCLOPS: [
    { method: "TRADE_ITEM", value: "ITEM_REAPER_CLOTH", target: "DUSKNOIR" },
    { method: "ITEM", value: "ITEM_REAPER_CLOTH", target: "DUSKNOIR" },
  ],
  ROSELIA: [{ method: "ITEM", value: "ITEM_SHINY_STONE", target: "ROSERADE" }],

  SLAKOTH: [{ method: "LEVEL", value: "18", target: "VIGOROTH" }],
  VIGOROTH: [{ method: "LEVEL", value: "36", target: "SLAKING" }],
  GULPIN: [{ method: "LEVEL", value: "26", target: "SWALOT" }],
  WHISMUR: [{ method: "LEVEL", value: "20", target: "LOUDRED" }],
  LOUDRED: [{ method: "LEVEL", value: "40", target: "EXPLOUD" }],
  CLAMPERL: [
    { method: "TRADE_ITEM", value: "ITEM_DEEP_SEA_TOOTH", target: "HUNTAIL" },
    { method: "TRADE_ITEM", value: "ITEM_DEEP_SEA_SCALE", target: "GOREBYSS" },
    { method: "ITEM", value: "ITEM_DEEP_SEA_TOOTH", target: "HUNTAIL" },
    { method: "ITEM", value: "ITEM_DEEP_SEA_SCALE", target: "GOREBYSS" },
  ],
  SHUPPET: [{ method: "LEVEL", value: "37", target: "BANETTE" }],
  ARON: [{ method: "LEVEL", value: "32", target: "LAIRON" }],
  LAIRON: [{ method: "LEVEL", value: "42", target: "AGGRON" }],
  LILEEP: [{ method: "LEVEL", value: "40", target: "CRADILY" }],
  ANORITH: [{ method: "LEVEL", value: "40", target: "ARMALDO" }],
  RALTS: [{ method: "LEVEL", value: "20", target: "KIRLIA" }],
  KIRLIA: [
    { method: "LEVEL", value: "30", target: "GARDEVOIR" },

    { method: "ITEM_MALE", value: "ITEM_DAWN_STONE", target: "GALLADE" },
  ],
  BAGON: [{ method: "LEVEL", value: "30", target: "SHELGON" }],
  SHELGON: [{ method: "LEVEL", value: "50", target: "SALAMENCE" }],
  BELDUM: [{ method: "LEVEL", value: "20", target: "METANG" }],
  METANG: [{ method: "LEVEL", value: "45", target: "METAGROSS" }],

  TURTWIG: [{ method: "LEVEL", value: "18", target: "GROTLE" }],
  GROTLE: [{ method: "LEVEL", value: "32", target: "TORTERRA" }],
  CHIMCHAR: [{ method: "LEVEL", value: "14", target: "MONFERNO" }],
  MONFERNO: [{ method: "LEVEL", value: "36", target: "INFERNAPE" }],
  PIPLUP: [{ method: "LEVEL", value: "16", target: "PRINPLUP" }],
  PRINPLUP: [{ method: "LEVEL", value: "36", target: "EMPOLEON" }],
  STARLY: [{ method: "LEVEL", value: "14", target: "STARAVIA" }],
  STARAVIA: [{ method: "LEVEL", value: "34", target: "STARAPTOR" }],
  BIDOOF: [{ method: "LEVEL", value: "15", target: "BIBAREL" }],
  KRICKETOT: [{ method: "LEVEL", value: "10", target: "KRICKETUNE" }],
  SHINX: [{ method: "LEVEL", value: "15", target: "LUXIO" }],
  LUXIO: [{ method: "LEVEL", value: "30", target: "LUXRAY" }],
  BUDEW: [
    { method: "FRIENDSHIP_DAY", value: "High Friendship", target: "ROSELIA" },
  ],
  CRANIDOS: [{ method: "LEVEL", value: "30", target: "RAMPARDOS" }],
  SHIELDON: [{ method: "LEVEL", value: "30", target: "BASTIODON" }],
  BURMY: [
    { method: "LEVEL_FEMALE", value: "20", target: "WORMADAM" },
    { method: "LEVEL_MALE", value: "20", target: "MOTHIM" },
  ],
  COMBEE: [{ method: "LEVEL_FEMALE", value: "21", target: "VESPIQUEN" }],
  BUIZEL: [{ method: "LEVEL", value: "26", target: "FLOATZEL" }],
  CHERUBI: [{ method: "LEVEL", value: "25", target: "CHERRIM" }],
  SHELLOS: [{ method: "LEVEL", value: "30", target: "GASTRODON" }],
  DRIFLOON: [{ method: "LEVEL", value: "28", target: "DRIFBLIM" }],
  BUNEARY: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "LOPUNNY" },
  ],
  GLAMEOW: [{ method: "LEVEL", value: "38", target: "PURUGLY" }],
  CHINGLING: [
    {
      method: "FRIENDSHIP_NIGHT",
      value: "High Friendship",
      target: "CHIMECHO",
    },
  ],
  STUNKY: [{ method: "LEVEL", value: "34", target: "SKUNTANK" }],
  BRONZOR: [{ method: "LEVEL", value: "33", target: "BRONZONG" }],
  BONSLY: [{ method: "MOVE", value: "MOVE_MIMIC", target: "SUDOWOODO" }],
  MIME_JR: [
    { method: "MOVE", value: "MOVE_MIMIC", target: "MR_MIME" },
    { method: "LEVEL_NIGHT", value: "20", target: "MR_MIME_GALAR" },
  ],
  HAPPINY: [
    { method: "ITEM_HOLD_DAY", value: "ITEM_OVAL_STONE", target: "CHANSEY" },
    { method: "ITEM_DAY", value: "ITEM_OVAL_STONE", target: "CHANSEY" },
  ],
  GIBLE: [{ method: "LEVEL", value: "24", target: "GABITE" }],
  GABITE: [{ method: "LEVEL", value: "48", target: "GARCHOMP" }],
  MUNCHLAX: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "SNORLAX" },
  ],
  RIOLU: [
    { method: "FRIENDSHIP_DAY", value: "High Friendship", target: "LUCARIO" },
  ],
  HIPPOPOTAS: [{ method: "LEVEL", value: "34", target: "HIPPOWDON" }],
  SKORUPI: [{ method: "LEVEL", value: "40", target: "DRAPION" }],
  CROAGUNK: [{ method: "LEVEL", value: "37", target: "TOXICROAK" }],
  FINNEON: [{ method: "LEVEL", value: "31", target: "LUMINEON" }],
  MANTYKE: [
    { method: "SPECIFIC_MON_IN_PARTY", value: "REMORAID", target: "MANTINE" },
  ],
  SNOVER: [{ method: "LEVEL", value: "40", target: "ABOMASNOW" }],

  SNIVY: [{ method: "LEVEL", value: "17", target: "SERVINE" }],
  SERVINE: [{ method: "LEVEL", value: "36", target: "SERPERIOR" }],
  TEPIG: [{ method: "LEVEL", value: "17", target: "PIGNITE" }],
  PIGNITE: [{ method: "LEVEL", value: "36", target: "EMBOAR" }],
  OSHAWOTT: [{ method: "LEVEL", value: "17", target: "DEWOTT" }],
  DEWOTT: [
    { method: "LEVEL", value: "36", target: "SAMUROTT" },
    { method: "LEVEL_NIGHT", value: "36", target: "SAMUROTT_HISUI" },
  ],
  PATRAT: [{ method: "LEVEL", value: "20", target: "WATCHOG" }],
  LILLIPUP: [{ method: "LEVEL", value: "16", target: "HERDIER" }],
  HERDIER: [{ method: "LEVEL", value: "32", target: "STOUTLAND" }],
  PURRLOIN: [{ method: "LEVEL", value: "20", target: "LIEPARD" }],
  PANSAGE: [{ method: "ITEM", value: "ITEM_LEAF_STONE", target: "SIMISAGE" }],
  PANSEAR: [{ method: "ITEM", value: "ITEM_FIRE_STONE", target: "SIMISEAR" }],
  PANPOUR: [{ method: "ITEM", value: "ITEM_WATER_STONE", target: "SIMIPOUR" }],
  MUNNA: [{ method: "ITEM", value: "ITEM_MOON_STONE", target: "MUSHARNA" }],
  PIDOVE: [{ method: "LEVEL", value: "21", target: "TRANQUILL" }],
  TRANQUILL: [{ method: "LEVEL", value: "32", target: "UNFEZANT" }],
  BLITZLE: [{ method: "LEVEL", value: "27", target: "ZEBSTRIKA" }],
  ROGGENROLA: [{ method: "LEVEL", value: "25", target: "BOLDORE" }],
  BOLDORE: [
    { method: "TRADE", value: "0", target: "GIGALITH" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GIGALITH" },
  ],
  WOOBAT: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "SWOOBAT" },
  ],
  DRILBUR: [{ method: "LEVEL", value: "31", target: "EXCADRILL" }],
  TIMBURR: [{ method: "LEVEL", value: "25", target: "GURDURR" }],
  GURDURR: [
    { method: "TRADE", value: "0", target: "CONKELDURR" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "CONKELDURR" },
  ],
  TYMPOLE: [{ method: "LEVEL", value: "25", target: "PALPITOAD" }],
  PALPITOAD: [{ method: "LEVEL", value: "36", target: "SEISMITOAD" }],
  SEWADDLE: [{ method: "LEVEL", value: "20", target: "SWADLOON" }],
  SWADLOON: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "LEAVANNY" },
  ],
  VENIPEDE: [{ method: "LEVEL", value: "22", target: "WHIRLIPEDE" }],
  WHIRLIPEDE: [{ method: "LEVEL", value: "30", target: "SCOLIPEDE" }],
  COTTONEE: [{ method: "ITEM", value: "ITEM_SUN_STONE", target: "WHIMSICOTT" }],
  PETILIL: [
    { method: "ITEM", value: "ITEM_SUN_STONE", target: "LILLIGANT" },
    {
      method: "SPECIFIC_MAP",
      value: "MAP_ROUTE120",
      target: "LILLIGANT_HISUI",
    },
  ],
  SANDILE: [{ method: "LEVEL", value: "29", target: "KROKOROK" }],
  KROKOROK: [{ method: "LEVEL", value: "40", target: "KROOKODILE" }],
  DARUMAKA: [{ method: "LEVEL", value: "35", target: "DARMANITAN" }],
  DWEBBLE: [{ method: "LEVEL", value: "34", target: "CRUSTLE" }],
  SCRAGGY: [{ method: "LEVEL", value: "39", target: "SCRAFTY" }],
  YAMASK: [{ method: "LEVEL", value: "34", target: "COFAGRIGUS" }],
  TIRTOUGA: [{ method: "LEVEL", value: "37", target: "CARRACOSTA" }],
  ARCHEN: [{ method: "LEVEL", value: "37", target: "ARCHEOPS" }],
  TRUBBISH: [{ method: "LEVEL", value: "36", target: "GARBODOR" }],
  ZORUA: [{ method: "LEVEL", value: "30", target: "ZOROARK" }],
  ZORUA_HISUI: [{ method: "LEVEL", value: "30", target: "ZOROARK_HISUI" }],
  MINCCINO: [{ method: "ITEM", value: "ITEM_SHINY_STONE", target: "CINCCINO" }],
  GOTHITA: [{ method: "LEVEL", value: "32", target: "GOTHORITA" }],
  GOTHORITA: [{ method: "LEVEL", value: "41", target: "GOTHITELLE" }],
  SOLOSIS: [{ method: "LEVEL", value: "32", target: "DUOSION" }],
  DUOSION: [{ method: "LEVEL", value: "41", target: "REUNICLUS" }],
  DUCKLETT: [{ method: "LEVEL", value: "35", target: "SWANNA" }],
  VANILLITE: [{ method: "LEVEL", value: "35", target: "VANILLISH" }],
  VANILLISH: [{ method: "LEVEL", value: "47", target: "VANILLUXE" }],
  DEERLING: [{ method: "LEVEL", value: "34", target: "SAWSBUCK" }],
  KARRABLAST: [
    { method: "TRADE_SPECIFIC_MON", target: "SHELMET", target: "ESCAVALIER" },
  ],
  FOONGUS: [{ method: "LEVEL", value: "39", target: "AMOONGUSS" }],
  FRILLISH: [{ method: "LEVEL", value: "40", target: "JELLICENT" }],
  JOLTIK: [{ method: "LEVEL", value: "36", target: "GALVANTULA" }],
  FERROSEED: [{ method: "LEVEL", value: "40", target: "FERROTHORN" }],
  KLINK: [{ method: "LEVEL", value: "38", target: "KLANG" }],
  KLANG: [{ method: "LEVEL", value: "49", target: "KLINKLANG" }],
  TYNAMO: [{ method: "LEVEL", value: "39", target: "EELEKTRIK" }],
  EELEKTRIK: [
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "EELEKTROSS" },
  ],
  ELGYEM: [{ method: "LEVEL", value: "42", target: "BEHEEYEM" }],
  LITWICK: [{ method: "LEVEL", value: "41", target: "LAMPENT" }],
  LAMPENT: [{ method: "ITEM", value: "ITEM_DUSK_STONE", target: "CHANDELURE" }],
  AXEW: [{ method: "LEVEL", value: "38", target: "FRAXURE" }],
  FRAXURE: [{ method: "LEVEL", value: "48", target: "HAXORUS" }],
  CUBCHOO: [{ method: "LEVEL", value: "37", target: "BEARTIC" }],
  SHELMET: [
    { method: "TRADE_SPECIFIC_MON", target: "KARRABLAST", target: "ACCELGOR" },
  ],
  MIENFOO: [{ method: "LEVEL", value: "50", target: "MIENSHAO" }],
  GOLETT: [{ method: "LEVEL", value: "43", target: "GOLURK" }],
  PAWNIARD: [{ method: "LEVEL", value: "52", target: "BISHARP" }],
  BISHARP: [
    { method: "ITEM_HOLD", value: "ITEM_LEADERS_CREST", target: "KINGAMBIT" },
  ],
  RUFFLET: [
    { method: "LEVEL", value: "54", target: "BRAVIARY" },
    {
      method: "SPECIFIC_MAP",
      value: "MAP_MT_PYRE_SUMMIT",
      target: "BRAVIARY_HISUI",
    },
  ],
  VULLABY: [{ method: "LEVEL", value: "54", target: "MANDIBUZZ" }],
  DEINO: [{ method: "LEVEL", value: "50", target: "ZWEILOUS" }],
  ZWEILOUS: [{ method: "LEVEL", value: "64", target: "HYDREIGON" }],
  LARVESTA: [{ method: "LEVEL", value: "59", target: "VOLCARONA" }],

  CHESPIN: [{ method: "LEVEL", value: "16", target: "QUILLADIN" }],
  QUILLADIN: [{ method: "LEVEL", value: "36", target: "CHESNAUGHT" }],
  FENNEKIN: [{ method: "LEVEL", value: "16", target: "BRAIXEN" }],
  BRAIXEN: [{ method: "LEVEL", value: "36", target: "DELPHOX" }],
  FROAKIE: [{ method: "LEVEL", value: "16", target: "FROGADIER" }],
  FROGADIER: [{ method: "LEVEL", value: "36", target: "GRENINJA" }],
  BUNNELBY: [{ method: "LEVEL", value: "20", target: "DIGGERSBY" }],
  FLETCHLING: [{ method: "LEVEL", value: "17", target: "FLETCHINDER" }],
  FLETCHINDER: [{ method: "LEVEL", value: "35", target: "TALONFLAME" }],
  SCATTERBUG: [{ method: "LEVEL", value: "9", target: "SPEWPA" }],
  SPEWPA: [{ method: "LEVEL", value: "12", target: "VIVILLON" }],
  LITLEO: [{ method: "LEVEL", value: "35", target: "PYROAR" }],
  FLABEBE: [{ method: "LEVEL", value: "19", target: "FLOETTE" }],
  FLOETTE: [{ method: "ITEM", value: "ITEM_SHINY_STONE", target: "FLORGES" }],
  SKIDDO: [{ method: "LEVEL", value: "32", target: "GOGOAT" }],
  PANCHAM: [
    { method: "LEVEL_DARK_TYPE_MON_IN_PARTY", value: "32", target: "PANGORO" },
  ],
  ESPURR: [
    { method: "LEVEL_MALE", value: "25", target: "MEOWSTIC" },
    { method: "LEVEL_FEMALE", value: "25", target: "MEOWSTIC_FEMALE" },
  ],
  HONEDGE: [{ method: "LEVEL", value: "35", target: "DOUBLADE" }],
  DOUBLADE: [{ method: "ITEM", value: "ITEM_DUSK_STONE", target: "AEGISLASH" }],
  SPRITZEE: [
    { method: "TRADE_ITEM", value: "ITEM_SACHET", target: "AROMATISSE" },
    { method: "ITEM", value: "ITEM_SACHET", target: "AROMATISSE" },
  ],
  SWIRLIX: [
    { method: "TRADE_ITEM", value: "ITEM_WHIPPED_DREAM", target: "SLURPUFF" },
    { method: "ITEM", value: "ITEM_WHIPPED_DREAM", target: "SLURPUFF" },
  ],
  INKAY: [{ method: "LEVEL", value: "30", target: "MALAMAR" }],
  BINACLE: [{ method: "LEVEL", value: "39", target: "BARBARACLE" }],
  SKRELP: [{ method: "LEVEL", value: "48", target: "DRAGALGE" }],
  CLAUNCHER: [{ method: "LEVEL", value: "37", target: "CLAWITZER" }],
  HELIOPTILE: [
    { method: "ITEM", value: "ITEM_SUN_STONE", target: "HELIOLISK" },
  ],
  TYRUNT: [{ method: "LEVEL_DAY", value: "39", target: "TYRANTRUM" }],
  AMAURA: [{ method: "LEVEL_NIGHT", value: "39", target: "AURORUS" }],
  GOOMY: [
    { method: "LEVEL", value: "40", target: "SLIGGOO" },
    { method: "SPECIFIC_MAP", value: "MAP_ROUTE119", target: "SLIGGOO_HISUI" },
  ],
  SLIGGOO: [{ method: "LEVEL_RAIN", value: "50", target: "GOODRA" }],
  SLIGGOO_HISUI: [
    { method: "LEVEL_RAIN", value: "40", target: "GOODRA_HISUI" },
  ],
  PHANTUMP: [
    { method: "TRADE", value: "0", target: "TREVENANT" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "TREVENANT" },
  ],
  PUMPKABOO: [
    { method: "TRADE", value: "0", target: "GOURGEIST" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOURGEIST" },
  ],
  BERGMITE: [
    { method: "LEVEL", value: "37", target: "AVALUGG" },
    {
      method: "SPECIFIC_MAP",
      value: "MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM",
      target: "AVALUGG_HISUI",
    },
  ],
  NOIBAT: [{ method: "LEVEL", value: "48", target: "NOIVERN" }],

  ROWLET: [{ method: "LEVEL", value: "17", target: "DARTRIX" }],
  DARTRIX: [
    { method: "LEVEL", value: "34", target: "DECIDUEYE" },
    { method: "LEVEL_NIGHT", value: "34", target: "DECIDUEYE_HISUI" },
  ],
  LITTEN: [{ method: "LEVEL", value: "17", target: "TORRACAT" }],
  TORRACAT: [{ method: "LEVEL", value: "34", target: "INCINEROAR" }],
  POPPLIO: [{ method: "LEVEL", value: "17", target: "BRIONNE" }],
  BRIONNE: [{ method: "LEVEL", value: "34", target: "PRIMARINA" }],
  PIKIPEK: [{ method: "LEVEL", value: "14", target: "TRUMBEAK" }],
  TRUMBEAK: [{ method: "LEVEL", value: "28", target: "TOUCANNON" }],
  YUNGOOS: [{ method: "LEVEL_DAY", value: "20", target: "GUMSHOOS" }],
  GRUBBIN: [{ method: "LEVEL", value: "20", target: "CHARJABUG" }],
  CHARJABUG: [
    { method: "MAPSEC", value: "MAPSEC_NEW_MAUVILLE", target: "VIKAVOLT" },
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "VIKAVOLT" },
  ],
  CRABRAWLER: [
    {
      method: "SPECIFIC_MAP",
      value: "MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM",
      target: "CRABOMINABLE",
    },
  ],
  CUTIEFLY: [{ method: "LEVEL", value: "25", target: "RIBOMBEE" }],
  ROCKRUFF: [
    { method: "LEVEL_DAY", value: "25", target: "LYCANROC" },
    { method: "LEVEL_NIGHT", value: "25", target: "LYCANROC_MIDNIGHT" },
  ],
  MAREANIE: [{ method: "LEVEL", value: "38", target: "TOXAPEX" }],
  MUDBRAY: [{ method: "LEVEL", value: "30", target: "MUDSDALE" }],
  DEWPIDER: [{ method: "LEVEL", value: "22", target: "ARAQUANID" }],
  FOMANTIS: [{ method: "LEVEL_DAY", value: "34", target: "LURANTIS" }],
  MORELULL: [{ method: "LEVEL", value: "24", target: "SHIINOTIC" }],
  SALANDIT: [{ method: "LEVEL_FEMALE", value: "33", target: "SALAZZLE" }],
  STUFFUL: [{ method: "LEVEL", value: "27", target: "BEWEAR" }],
  BOUNSWEET: [{ method: "LEVEL", value: "18", target: "STEENEE" }],
  STEENEE: [{ method: "MOVE", value: "MOVE_STOMP", target: "TSAREENA" }],
  WIMPOD: [{ method: "LEVEL", value: "30", target: "GOLISOPOD" }],
  SANDYGAST: [{ method: "LEVEL", value: "42", target: "PALOSSAND" }],
  TYPE_NULL: [
    { method: "FRIENDSHIP", value: "High Friendship", target: "SILVALLY" },
  ],
  JANGMO_O: [{ method: "LEVEL", value: "35", target: "HAKAMO_O" }],
  HAKAMO_O: [{ method: "LEVEL", value: "45", target: "KOMMO_O" }],
  COSMOG: [{ method: "LEVEL", value: "43", target: "COSMOEM" }],
  COSMOEM: [
    { method: "LEVEL_DAY", value: "53", target: "SOLGALEO" },
    { method: "LEVEL_NIGHT", value: "53", target: "LUNALA" },
  ],
  POIPOLE: [
    { method: "MOVE", value: "MOVE_DRAGON_PULSE", target: "NAGANADEL" },
  ],
  MELTAN: [
    { method: "TRADE_ITEM", value: "ITEM_METAL_COAT", target: "MELMETAL" },
  ],

  GROOKEY: [{ method: "LEVEL", value: "16", target: "THWACKEY" }],
  THWACKEY: [{ method: "LEVEL", value: "35", target: "RILLABOOM" }],
  SCORBUNNY: [{ method: "LEVEL", value: "16", target: "RABOOT" }],
  RABOOT: [{ method: "LEVEL", value: "35", target: "CINDERACE" }],
  SOBBLE: [{ method: "LEVEL", value: "16", target: "DRIZZILE" }],
  DRIZZILE: [{ method: "LEVEL", value: "35", target: "INTELEON" }],
  SKWOVET: [{ method: "LEVEL", value: "24", target: "GREEDENT" }],
  ROOKIDEE: [{ method: "LEVEL", value: "18", target: "CORVISQUIRE" }],
  CORVISQUIRE: [{ method: "LEVEL", value: "38", target: "CORVIKNIGHT" }],
  BLIPBUG: [{ method: "LEVEL", value: "10", target: "DOTTLER" }],
  DOTTLER: [{ method: "LEVEL", value: "30", target: "ORBEETLE" }],
  NICKIT: [{ method: "LEVEL", value: "18", target: "THIEVUL" }],
  GOSSIFLEUR: [{ method: "LEVEL", value: "20", target: "ELDEGOSS" }],
  WOOLOO: [{ method: "LEVEL", value: "24", target: "DUBWOOL" }],
  CHEWTLE: [{ method: "LEVEL", value: "22", target: "DREDNAW" }],
  YAMPER: [{ method: "LEVEL", value: "25", target: "BOLTUND" }],
  ROLYCOLY: [{ method: "LEVEL", value: "18", target: "CARKOL" }],
  CARKOL: [{ method: "LEVEL", value: "34", target: "COALOSSAL" }],
  APPLIN: [
    { method: "ITEM", value: "ITEM_TART_APPLE", target: "FLAPPLE" },
    { method: "ITEM", value: "ITEM_SWEET_APPLE", target: "APPLETUN" },
  ],
  SILICOBRA: [{ method: "LEVEL", value: "36", target: "SANDACONDA" }],
  ARROKUDA: [{ method: "LEVEL", value: "26", target: "BARRASKEWDA" }],
  TOXEL: [
    { method: "LEVEL_NATURE_AMPED", value: "30", target: "TOXTRICITY" },
    {
      method: "LEVEL_NATURE_LOW_KEY",
      value: "30",
      target: "TOXTRICITY_LOW_KEY",
    },
  ],
  SIZZLIPEDE: [{ method: "LEVEL", value: "28", target: "CENTISKORCH" }],
  CLOBBOPUS: [{ method: "MOVE", value: "MOVE_TAUNT", target: "GRAPPLOCT" }],
  SINISTEA: [
    { method: "ITEM", value: "ITEM_CRACKED_POT", target: "POLTEAGEIST" },
  ],
  HATENNA: [{ method: "LEVEL", value: "32", target: "HATTREM" }],
  HATTREM: [{ method: "LEVEL", value: "42", target: "HATTERENE" }],
  IMPIDIMP: [{ method: "LEVEL", value: "32", target: "MORGREM" }],
  MORGREM: [{ method: "LEVEL", value: "42", target: "GRIMMSNARL" }],
  MILCERY: [
    { method: "LEVEL", value: "0", target: "ALCREMIE" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_RUBY_CREAM" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_MATCHA_CREAM" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_MINT_CREAM" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_LEMON_CREAM" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_SALTED_CREAM" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_RUBY_SWIRL" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_CARAMEL_SWIRL" },
    { method: "LEVEL", value: "0", target: "ALCREMIE_RAINBOW_SWIRL" },
  ],
  SNOM: [
    {
      method: "FRIENDSHIP_NIGHT",
      value: "High Friendship",
      target: "FROSMOTH",
    },
  ],
  CUFANT: [{ method: "LEVEL", value: "34", target: "COPPERAJAH" }],
  DREEPY: [{ method: "LEVEL", value: "50", target: "DRAKLOAK" }],
  DRAKLOAK: [{ method: "LEVEL", value: "60", target: "DRAGAPULT" }],
  KUBFU: [
    { method: "DARK_SCROLL", value: "0", target: "URSHIFU" },
    { method: "ITEM", value: "ITEM_SCROLL_OF_DARKNESS", target: "URSHIFU" },
    {
      method: "WATER_SCROLL",
      value: "0",
      target: "URSHIFU_RAPID_STRIKE_STYLE",
    },
    {
      method: "ITEM",
      value: "ITEM_SCROLL_OF_WATERS",
      target: "URSHIFU_RAPID_STRIKE_STYLE",
    },
  ],

  SPRIGATITO: [{ method: "LEVEL", value: "16", target: "FLORAGATO" }],
  FLORAGATO: [{ method: "LEVEL", value: "36", target: "MEOWSCARADA" }],
  FUECOCO: [{ method: "LEVEL", value: "16", target: "CROCALOR" }],
  CROCALOR: [{ method: "LEVEL", value: "36", target: "SKELEDIRGE" }],
  QUAXLY: [{ method: "LEVEL", value: "16", target: "QUAXWELL" }],
  QUAXWELL: [{ method: "LEVEL", value: "36", target: "QUAQUAVAL" }],
  LECHONK: [
    { method: "LEVEL_MALE", value: "18", target: "OINKOLOGNE" },
    { method: "LEVEL_FEMALE", value: "18", target: "OINKOLOGNE_FEMALE" },
  ],
  TAROUNTULA: [{ method: "LEVEL", value: "15", target: "SPIDOPS" }],
  NYMBLE: [{ method: "LEVEL", value: "24", target: "LOKIX" }],
  PAWMI: [{ method: "LEVEL", value: "18", target: "PAWMO" }],
  PAWMO: [{ method: "LEVEL", value: "28", target: "PAWMOT" }],
  TANDEMAUS: [
    { method: "LEVEL", value: "25", target: "MAUSHOLD" },
    { method: "LEVEL", value: "25", target: "MAUSHOLD_FAMILY_OF_THREE" },
  ],
  FIDOUGH: [{ method: "LEVEL", value: "26", target: "DACHSBUN" }],
  SMOLIV: [{ method: "LEVEL", value: "25", target: "DOLLIV" }],
  DOLLIV: [{ method: "LEVEL", value: "35", target: "ARBOLIVA" }],
  NACLI: [{ method: "LEVEL", value: "24", target: "NACLSTACK" }],
  NACLSTACK: [{ method: "LEVEL", value: "38", target: "GARGANACL" }],
  CHARCADET: [
    { method: "ITEM", value: "ITEM_AUSPICIOUS_ARMOR", target: "ARMAROUGE" },
    { method: "ITEM", value: "ITEM_MALICIOUS_ARMOR", target: "CERULEDGE" },
  ],
  TADBULB: [
    { method: "ITEM", value: "ITEM_THUNDER_STONE", target: "BELLIBOLT" },
  ],
  WATTREL: [{ method: "LEVEL", value: "25", target: "KILOWATTREL" }],
  MASCHIFF: [{ method: "LEVEL", value: "30", target: "MABOSSTIFF" }],
  SHROODLE: [{ method: "LEVEL", value: "28", target: "GRAFAIAI" }],
  BRAMBLIN: [{ method: "LEVEL", value: "28", target: "BRAMBLEGHAST" }],
  TOEDSCOOL: [{ method: "LEVEL", value: "30", target: "TOEDSCRUEL" }],
  CAPSAKID: [
    { method: "ITEM", value: "ITEM_FIRE_STONE", target: "SCOVILLAIN" },
  ],
  RELLOR: [{ method: "LEVEL", value: "28", target: "RABSCA" }],
  FLITTLE: [{ method: "LEVEL", value: "35", target: "ESPATHRA" }],
  TINKATINK: [{ method: "LEVEL", value: "24", target: "TINKATUFF" }],
  TINKATUFF: [{ method: "LEVEL", value: "38", target: "TINKATON" }],
  WIGLETT: [{ method: "LEVEL", value: "26", target: "WUGTRIO" }],
  FINIZEN: [{ method: "LEVEL", value: "38", target: "PALAFIN" }],
  VAROOM: [{ method: "LEVEL", value: "40", target: "REVAVROOM" }],
  GLIMMET: [{ method: "LEVEL", value: "35", target: "GLIMMORA" }],
  GREAVARD: [{ method: "LEVEL_NIGHT", value: "30", target: "HOUNDSTONE" }],
  CETODDLE: [{ method: "ITEM", value: "ITEM_ICE_STONE", target: "CETITAN" }],
  FRIGIBAX: [{ method: "LEVEL", value: "35", target: "ARCTIBAX" }],
  ARCTIBAX: [{ method: "LEVEL", value: "54", target: "BAXCALIBUR" }],
  GIMMIGHOUL: [{ method: "LEVEL", value: "42", target: "GHOLDENGO" }],

  RATTATA_ALOLA: [
    { method: "LEVEL_NIGHT", value: "20", target: "RATICATE_ALOLA" },
  ],
  SANDSHREW_ALOLA: [
    { method: "ITEM", value: "ITEM_ICE_STONE", target: "SANDSLASH_ALOLA" },
  ],
  VULPIX_ALOLA: [
    { method: "ITEM", value: "ITEM_ICE_STONE", target: "NINETALES_ALOLA" },
  ],
  DIGLETT_ALOLA: [{ method: "LEVEL", value: "26", target: "DUGTRIO_ALOLA" }],
  MEOWTH_ALOLA: [
    { method: "FRIENDSHIP", value: "28", target: "PERSIAN_ALOLA" },
  ],
  GEODUDE_ALOLA: [{ method: "LEVEL", value: "25", target: "GRAVELER_ALOLA" }],
  GRAVELER_ALOLA: [
    { method: "TRADE", value: "0", target: "GOLEM_ALOLA" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOLEM_ALOLA" },
  ],
  GRIMER_ALOLA: [{ method: "LEVEL", value: "38", target: "MUK_ALOLA" }],

  MEOWTH_GALAR: [{ method: "LEVEL", value: "28", target: "PERRSERKER" }],

  PONYTA_GALAR: [{ method: "LEVEL", value: "40", target: "RAPIDASH_GALAR" }],
  SLOWPOKE_GALAR: [
    { method: "ITEM", value: "ITEM_GALARICA_CUFF", target: "SLOWBRO_GALAR" },
    { method: "ITEM", value: "ITEM_GALARICA_WREATH", target: "SLOWKING_GALAR" },
  ],

  FARFETCHD_GALAR: [
    { method: "CRITICAL_HITS", value: "3", target: "SIRFETCHD" },
  ],
  MR_MIME_GALAR: [{ method: "LEVEL", value: "42", target: "MR_RIME" }],
  CORSOLA_GALAR: [{ method: "LEVEL", value: "38", target: "CURSOLA" }],
  ZIGZAGOON_GALAR: [{ method: "LEVEL", value: "20", target: "LINOONE_GALAR" }],
  LINOONE_GALAR: [{ method: "LEVEL_NIGHT", value: "35", target: "OBSTAGOON" }],
  DARUMAKA_GALAR: [
    { method: "ITEM", value: "ITEM_ICE_STONE", target: "DARMANITAN_GALAR" },
  ],
  YAMASK_GALAR: [
    { method: "SCRIPT_TRIGGER_DMG", value: "49", target: "RUNERIGUS" },
  ],

  ZIGZAGOON_GALAR: [{ method: "LEVEL", value: "20", target: "LINOONE_GALAR" }],
  DARUMAKA_GALAR: [
    { method: "ITEM", value: "ITEM_ICE_STONE", target: "DARMANITAN_GALAR" },
  ],

  BURMY_SANDY_CLOAK: [
    { method: "LEVEL_FEMALE", value: "20", target: "WORMADAM_SANDY_CLOAK" },
    { method: "LEVEL_MALE", value: "20", target: "MOTHIM" },
  ],
  BURMY_TRASH_CLOAK: [
    { method: "LEVEL_FEMALE", value: "20", target: "WORMADAM_TRASH_CLOAK" },
    { method: "LEVEL_MALE", value: "20", target: "MOTHIM" },
  ],
  SHELLOS_EAST_SEA: [
    { method: "LEVEL", value: "30", target: "GASTRODON_EAST_SEA" },
  ],

  DEERLING_SUMMER: [
    { method: "LEVEL", value: "34", target: "SAWSBUCK_SUMMER" },
  ],
  DEERLING_AUTUMN: [
    { method: "LEVEL", value: "34", target: "SAWSBUCK_AUTUMN" },
  ],
  DEERLING_WINTER: [
    { method: "LEVEL", value: "34", target: "SAWSBUCK_WINTER" },
  ],

  FLABEBE_YELLOW_FLOWER: [
    { method: "LEVEL", value: "19", target: "FLOETTE_YELLOW_FLOWER" },
  ],
  FLABEBE_ORANGE_FLOWER: [
    { method: "LEVEL", value: "19", target: "FLOETTE_ORANGE_FLOWER" },
  ],
  FLABEBE_BLUE_FLOWER: [
    { method: "LEVEL", value: "19", target: "FLOETTE_BLUE_FLOWER" },
  ],
  FLABEBE_WHITE_FLOWER: [
    { method: "LEVEL", value: "19", target: "FLOETTE_WHITE_FLOWER" },
  ],
  FLOETTE_YELLOW_FLOWER: [
    {
      method: "ITEM",
      value: "ITEM_SHINY_STONE",
      target: "FLORGES_YELLOW_FLOWER",
    },
  ],
  FLOETTE_ORANGE_FLOWER: [
    {
      method: "ITEM",
      value: "ITEM_SHINY_STONE",
      target: "FLORGES_ORANGE_FLOWER",
    },
  ],
  FLOETTE_BLUE_FLOWER: [
    {
      method: "ITEM",
      value: "ITEM_SHINY_STONE",
      target: "FLORGES_BLUE_FLOWER",
    },
  ],
  FLOETTE_WHITE_FLOWER: [
    {
      method: "ITEM",
      value: "ITEM_SHINY_STONE",
      target: "FLORGES_WHITE_FLOWER",
    },
  ],
  PUMPKABOO_SMALL: [
    { method: "TRADE", value: "0", target: "GOURGEIST_SMALL" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOURGEIST_SMALL" },
  ],
  PUMPKABOO_LARGE: [
    { method: "TRADE", value: "0", target: "GOURGEIST_LARGE" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOURGEIST_LARGE" },
  ],
  PUMPKABOO_SUPER: [
    { method: "TRADE", value: "0", target: "GOURGEIST_SUPER" },
    { method: "ITEM", value: "ITEM_LINKING_CORD", target: "GOURGEIST_SUPER" },
  ],

  ROCKRUFF_OWN_TEMPO: [
    { method: "LEVEL_DUSK", value: "25", target: "LYCANROC_DUSK" },
  ],

  SINISTEA_ANTIQUE: [
    {
      method: "ITEM",
      value: "ITEM_CHIPPED_POT",
      target: "POLTEAGEIST_ANTIQUE",
    },
  ],
  URSARING: [
    { method: "ITEM_NIGHT", value: "ITEM_PEAT_BLOCK", target: "URSALUNA" },
  ],
  STANTLER: [{ method: "LEVEL", value: "30", target: "WYRDEER" }],
  BASCULIN_WHITE_STRIPED: [
    { method: "LEVEL_MALE", value: "30", target: "BASCULEGION" },
    { method: "LEVEL_FEMALE", value: "30", target: "BASCULEGION_FEMALE" },
  ],
  QWILFISH_HISUI: [
    { method: "MOVE", value: "MOVE_BARB_BARRAGE", target: "OVERQWIL" },
  ],
  SNEASEL_HISUI: [
    { method: "ITEM_DAY", value: "ITEM_RAZOR_CLAW", target: "SNEASLER" },
    { method: "ITEM_HOLD_DAY", value: "ITEM_RAZOR_CLAW", target: "SNEASLER" },
  ],

  WOOPER_PALDEA: [{ method: "LEVEL", value: "20", target: "CLODSIRE" }],
  GIRAFARIG: [{ method: "MOVE", value: "MOVE_TWIN_BEAM", target: "FARIGIRAF" }],
  PRIMEAPE: [{ method: "LEVEL", value: "35", target: "ANNIHILAPE" }],
  DUNSPARCE: [
    { method: "MOVE", value: "MOVE_HYPER_DRILL", target: "DUDUNSPARCE" },
  ],
};

module.exports = {
  name: "evo", // The name of the command
  description: "Retrieve Pokémon evolutions", // Description of what the command does

  // Async function that executes when the command is called
  async execute(message, args) {
    const randomFooterPhrases = [
      "Night time starts at Midnight 🌙",
      "Day time starts at 12:00 PM 🌅",
    ];

    // Function to get a random footer phrase
    function getRandomFooter() {
      const randomIndex = Math.floor(
        Math.random() * randomFooterPhrases.length
      );
      return randomFooterPhrases[randomIndex];
    }

    // Check if a Pokémon name is provided as an argument
    if (args.length === 0) {
      // Creating an embed message to inform the user about the missing argument
      const embed = new Discord.MessageEmbed()
        .setColor("#FF0000") // Setting the embed color to red
        .setTitle("Pokémon Evolution Command") // Title of the embed
        .setDescription(
          "Please provide the name of a Pokémon to retrieve its evolutions."
        ) // Message body
        .setFooter(getRandomFooter()) // Adding the author's tag to the footer
        .setTimestamp(); // Adding a timestamp

      message.channel.send(embed); // Sending the embed message
      return;
    }

    const pokemonName = args[0].toLowerCase().replace(/_/g, "-"); // Convert Pokémon name to lowercase and replace underscores with hyphens

    try {
      // Fetch Pokémon data from the PokéAPI
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonData = await response.json();
      const pokemonName2 = args[0].toLowerCase().replace(/-/g, "_"); // Convert Pokémon name to lowercase and replace hyphens with underscores

      if (response.status === 200) {
        const evolutions = pokemonEvolutions[pokemonName2.toUpperCase()]; // Use uppercase name to look up evolutions
        const evolutionList = evolutions.map(
          (evolution) =>
            `**EvoType**: ${evolution.method}\n**Requirement**: ${evolution.value}\n**Evo**: ${evolution.target}`
        ); // Create a list of evolutions with details

        // Creating an embed message with the evolution information
        const embed = new Discord.MessageEmbed()
          .setTitle(`Evolutions of ${pokemonName}`)
          .setDescription(evolutionList.join("\n\n")) // Joining evolution details with newlines
          .setThumbnail(pokemonData.sprites.front_default) // Set Pokémon image from PokéAPI
          .setFooter(getRandomFooter())
          .setTimestamp(); // Adding a timestamp

        message.channel.send(embed); // Sending the embed message
      } else {
        // Creating an embed message to inform the user that the Pokémon was not found
        const embed = new Discord.MessageEmbed()
          .setColor("#FF0000") // Setting the embed color to red
          .setTitle("Pokémon Not Found!") // Title of the embed
          .setDescription(
            "Pokémon not found in the evolutions data or the Crest server."
          ) // Message body
          .setFooter(getRandomFooter())
          .setTimestamp(); // Adding a timestamp

        message.channel.send(embed); // Sending the embed message
      }
    } catch (error) {
      console.error("Error retrieving Pokémon data:", error); // Logging the error to the console

      // Creating an embed message to inform the user about the error
      const embed = new Discord.MessageEmbed()
        .setColor("#FF0000") // Setting the embed color to red
        .setTitle("Error") // Title of the embed
        .setDescription(
          "An error occurred while retrieving Pokémon data from the Crest server."
        ) // Message body
        .setFooter(getRandomFooter())
        .setTimestamp(); // Adding a timestamp

      message.channel.send(embed); // Sending the embed message
    }
  },
};
