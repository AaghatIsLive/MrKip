const axios = require('axios'); // Importing the Axios library for making HTTP requests
const Discord = require('discord.js'); // Importing the Discord.js library
const jsonData = require('../wild.json'); // Importing the JSON data containing Pokémon encounters

const validSpecies = [
  'BULBASAUR',
  'CHARMANDER',
  'SQUIRTLE',
  'CATERPIE',
  'WEEDLE',
  'PIDGEY',
  'RATTATA',
  'SPEAROW',
  'EKANS',
  'SANDSHREW',
  'NIDORAN-F',
  'NIDORAN-M',
  'VULPIX',
  'ZUBAT',
  'ODDISH',
  'PARAS',
  'VENONAT',
  'DIGLETT',
  'MEOWTH',
  'PSYDUCK',
  'MANKEY',
  'GROWLITHE',
  'POLIWAG',
  'ABRA',
  'MACHOP',
  'BELLSPROUT',
  'TENTACOOL',
  'GEODUDE',
  'PONYTA',
  'SLOWPOKE',
  'MAGNEMITE',
  'FARFETCHD',
  'DODUO',
  'SEEL',
  'GRIMER',
  'SHELLDER',
  'GASTLY',
  'ONIX',
  'DROWZEE',
  'KRABBY',
  'VOLTORB',
  'EXEGGCUTE',
  'CUBONE',
  'LICKITUNG',
  'KOFFING',
  'RHYHORN',
  'CHANSEY',
  'TANGELA',
  'KANGASKHAN',
  'HORSEA',
  'GOLDEEN',
  'STARYU',
  'MR_MIME',
  'SCYTHER',
  'PINSIR',
  'TAUROS',
  'MAGIKARP',
  'LAPRAS',
  'DITTO',
  'EEVEE',
  'PORYGON',
  'OMANYTE',
  'KABUTO',
  'AERODACTYL',
  'DRATINI',
  'CHIKORITA',
  'TOTODILE',
  'SENTRET',
  'HOOTHOOT',
  'LEDYBA',
  'SPINARAK',
  'CHINCHOU',
  'PICHU',
  'CLEFFA',
  'IGGLYBUFF',
  'TOGEPI',
  'NATU',
  'MAREEP',
  'SUDOWOODO',
  'HOPPIP',
  'AIPOM',
  'SUNKERN',
  'YANMA',
  'WOOPER',
  'MURKROW',
  'MISDREAVUS',
  'UNOWN',
  'GIRAFARIG',
  'PINECO',
  'DUNSPARCE',
  'GLIGAR',
  'SNUBBULL',
  'QWILFISH',
  'SHUCKLE',
  'HERACROSS',
  'SNEASEL',
  'TEDDIURSA',
  'SLUGMA',
  'SWINUB',
  'CORSOLA',
  'REMORAID',
  'DELIBIRD',
  'MANTINE',
  'SKARMORY',
  'HOUNDOUR',
  'PHANPY',
  'STANTLER',
  'SMEARGLE',
  'TYROGUE',
  'SMOOCHUM',
  'ELEKID',
  'MAGBY',
  'MILTANK',
  'LARVITAR',
  'TREECKO',
  'TORCHIC',
  'MUDKIP',
  'POOCHYENA',
  'ZIGZAGOON',
  'WURMPLE',
  'LOTAD',
  'SEEDOT',
  'NINCADA',
  'TAILLOW',
  'SHROOMISH',
  'SPINDA',
  'WINGULL',
  'SURSKIT',
  'WAILMER',
  'SKITTY',
  'KECLEON',
  'BALTOY',
  'NOSEPASS',
  'TORKOAL',
  'SABLEYE',
  'BARBOACH',
  'LUVDISC',
  'CORPHISH',
  'FEEBAS',
  'CARVANHA',
  'TRAPINCH',
  'MAKUHITA',
  'ELECTRIKE',
  'NUMEL',
  'SPHEAL',
  'CACNEA',
  'SNORUNT',
  'LUNATONE',
  'SOLROCK',
  'AZURILL',
  'SPOINK',
  'PLUSLE',
  'MINUN',
  'MAWILE',
  'MEDITITE',
  'SWABLU',
  'WYNAUT',
  'DUSKULL',
  'ROSELIA',
  'SLAKOTH',
  'GULPIN',
  'TROPIUS',
  'WHISMUR',
  'CLAMPERL',
  'ABSOL',
  'SHUPPET',
  'SEVIPER',
  'ZANGOOSE',
  'RELICANTH',
  'ARON',
  'CASTFORM',
  'VOLBEAT',
  'ILLUMISE',
  'LILEEP',
  'ANORITH',
  'RALTS',
  'BAGON',
  'BELDUM',
  'CHIMECHO',
  'TURTWIG',
  'CHIMCHAR',
  'PIPLUP',
  'STARLY',
  'BIDOOF',
  'KRICKETOT',
  'SHINX',
  'BUDEW',
  'CRANIDOS',
  'SHIELDON',
  'BURMY',
  'COMBEE',
  'PACHIRISU',
  'BUIZEL',
  'CHERUBI',
  'SHELLOS',
  'DRIFLOON',
  'BUNEARY',
  'GLAMEOW',
  'CHINGLING',
  'STUNKY',
  'BRONZOR',
  'BONSLY',
  'MIME_JR',
  'HAPPINY',
  'CHATOT',
  'SPIRITOMB',
  'GIBLE',
  'MUNCHLAX',
  'RIOLU',
  'HIPPOPOTAS',
  'SKORUPI',
  'CROAGUNK',
  'CARNIVINE',
  'FINNEON',
  'MANTYKE',
  'SNOVER',
  'ROTOM',
  'SNIVY',
  'TEPIG',
  'OSHAWOTT',
  'PATRAT',
  'LILLIPUP',
  'PURRLOIN',
  'PANSAGE',
  'PANSEAR',
  'PANPOUR',
  'MUNNA',
  'PIDOVE',
  'BLITZLE',
  'ROGGENROLA',
  'WOOBAT',
  'DRILBUR',
  'AUDINO',
  'TIMBURR',
  'TYMPOLE',
  'THROH',
  'SAWK',
  'SEWADDLE',
  'VENIPEDE',
  'COTTONEE',
  'PETILIL',
  'BASCULIN',
  'SANDILE',
  'DARUMAKA',
  'MARACTUS',
  'DWEBBLE',
  'SCRAGGY',
  'SIGILYPH',
  'YAMASK',
  'TIRTOUGA',
  'ARCHEN',
  'TRUBBISH',
  'ZORUA',
  'MINCCINO',
  'GOTHITA',
  'SOLOSIS',
  'DUCKLETT',
  'VANILLITE',
  'DEERLING',
  'EMOLGA',
  'KARRABLAST',
  'FOONGUS',
  'FRILLISH',
  'ALOMOMOLA',
  'JOLTIK',
  'FERROSEED',
  'KLINK',
  'TYNAMO',
  'ELGYEM',
  'LITWICK',
  'AXEW',
  'CUBCHOO',
  'CRYOGONAL',
  'SHELMET',
  'STUNFISK',
  'MIENFOO',
  'DRUDDIGON',
  'GOLETT',
  'PAWNIARD',
  'BOUFFALANT',
  'RUFFLET',
  'VULLABY',
  'HEATMOR',
  'DURANT',
  'DEINO',
  'LARVESTA',
  'CHESPIN',
  'FENNEKIN',
  'FROAKIE',
  'BUNNELBY',
  'FLETCHLING',
  'SCATTERBUG',
  'LITLEO',
  'FLABEBE',
  'SKIDDO',
  'PANCHAM',
  'FURFROU',
  'ESPURR',
  'HONEDGE',
  'SPRITZEE',
  'SWIRLIX',
  'INKAY',
  'BINACLE',
  'SKRELP',
  'CLAUNCHER',
  'HELIOPTILE',
  'TYRUNT',
  'AMAURA',
  'HAWLUCHA',
  'DEDENNE',
  'CARBINK',
  'GOOMY',
  'KLEFKI',
  'PHANTUMP',
  'PUMPKABOO',
  'BERGMITE',
  'NOIBAT',
  'ROWLET',
  'LITTEN',
  'POPPLIO',
  'PIKIPEK',
  'YUNGOOS',
  'GRUBBIN',
  'CRABRAWLER',
  'ORICORIO',
  'CUTIEFLY',
  'ROCKRUFF',
  'WISHIWASHI',
  'MAREANIE',
  'MUDBRAY',
  'DEWPIDER',
  'FOMANTIS',
  'MORELULL',
  'SALANDIT',
  'STUFFUL',
  'BOUNSWEET',
  'COMFEY',
  'PASSIMIAN',
  'WIMPOD',
  'SANDYGAST',
  'PYUKUMUKU',
  'MINIOR',
  'KOMALA',
  'TURTONATOR',
  'TOGEDEMARU',
  'MIMIKYU',
  'BRUXISH',
  'DRAMPA',
  'DHELMISE',
  'JANGMO-O',
  'MELTAN',
  'GROOKEY',
  'SCORBUNNY',
  'SOBBLE',
  'SKWOVET',
  'ROOKIDEE',
  'BLIPBUG',
  'NICKIT',
  'GOSSIFLEUR',
  'WOOLOO',
  'CHEWTLE',
  'YAMPER',
  'ROLYCOLY',
  'APPLIN',
  'SILICOBRA',
  'CRAMORANT',
  'ARROKUDA',
  'TOXEL',
  'SIZZLIPEDE',
  'CLOBBOPUS',
  'SINISTEA',
  'HATENNA',
  'IMPIDIMP',
  'MILCERY',
  'FALINKS',
  'PINCURCHIN',
  'SNOM',
  'EISCUE',
  'INDEEDEE',
  'MORPEKO',
  'CUFANT',
  'DRACOZOLT',
  'ARCTOZOLT',
  'DRACOVISH',
  'ARCTOVISH',
  'DURALUDON',
  'DREEPY',
  'RATTATA_ALOLAN',
  'SANDSHREW_ALOLAN',
  'VULPIX_ALOLAN',
  'DIGLETT_ALOLAN',
  'MEOWTH_ALOLAN',
  'GEODUDE_ALOLAN',
  'GRIMER_ALOLAN',
  'MEOWTH_GALARIAN',
  'PONYTA_GALARIAN',
  'SLOWPOKE_GALARIAN',
  'FARFETCHD_GALARIAN',
  'MR_MIME_GALARIAN',
  'CORSOLA_GALARIAN',
  'ZIGZAGOON_GALARIAN',
  'DARUMAKA_GALARIAN',
  'YAMASK_GALARIAN',
  'STUNFISK_GALARIAN',
  'GROWLITHE_HISUIAN',
  'VOLTORB_HISUIAN',
  'QWILFISH_HISUIAN',
  'SNEASEL_HISUIAN',
  'ZORUA_HISUIAN',
  'BURMY_SANDY_CLOAK',
  'BURMY_TRASH_CLOAK',
  'SHELLOS_EAST_SEA',
  'BASCULIN_BLUE_STRIPED',
  'BASCULIN_WHITE_STRIPED',
  'DEERLING_SUMMER',
  'DEERLING_AUTUMN',
  'DEERLING_WINTER',
  'FLABEBE_YELLOW_FLOWER',
  'FLABEBE_ORANGE_FLOWER',
  'FLABEBE_BLUE_FLOWER',
  'FLABEBE_WHITE_FLOWER',
  'MEOWSTIC_FEMALE',
  'PUMPKABOO_SMALL',
  'PUMPKABOO_LARGE',
  'PUMPKABOO_SUPER',
  'ORICORIO_POM_POM',
  'ORICORIO_PAU',
  'ORICORIO_SENSU',
  'ROCKRUFF_OWN_TEMPO',
  'MINIOR_METEOR_ORANGE',
  'MINIOR_METEOR_YELLOW',
  'MINIOR_METEOR_GREEN',
  'MINIOR_METEOR_BLUE',
  'MINIOR_METEOR_INDIGO',
  'MINIOR_METEOR_VIOLET',
  'SINISTEA_ANTIQUE',
  'INDEEDEE_FEMALE',
  'VICTINI',
  'JIRACHI',
  'CELEBI',
  'SPRIGATITO',
  'FUECOCO',
  'QUAXLY',
  'NYMBLE',
  'PAWMI',
  'TAROUNTULA',
  'TANDEMAUS',
  'FIDOUGH',
  'SMOLIV',
  'WATTREL',
  'MASCHIFF',
  'SHROODLE',
  'BRAMBLIN',
  'TOEDSCOOL',
  'KLAWF',
  'CAPSAKID',
  'RELLOR',
  'FLITTLE',
  'TINKATINK',
  'WIGLETT',
  'BOMBIRDIER',
  'FINIZEN',
  'WOOPER_PALDEAN',
  'CYCLIZAR',
  'ORTHWORM',
  'GLIMMET',
  'GREAVARD',
  'VELUZA',
  'DONDOZO',
  'TATSUGIRI',
  'TATSUGIRI_DROOPY',
  'TATSUGIRI_STRETCHY',
  'GIMMIGHOUL',
  'GIMMIGHOUL_ROAMING',
  'FRIGIBAX',
  'TAUROS_PALDEAN_AQUA_BREED',
  'TAUROS_PALDEAN_BLAZE_BREED',
  'FLUTTER-MANE',
  'SANDY-SHOCKS',
  'SLITHER-WING',
];

// Command to get the location of a Pokémon
module.exports = {
  name: 'loc', // The name of the command
  description: 'Get the location of a Pokémon', // Description of what the command does

  // Async function that executes when the command is called
  async execute(message, args) {
    // Check if a Pokémon name is provided
    if (!args.length) {
      return message.reply('Please provide a Pokémon name.'); // Handle case where no Pokémon name is provided
    }

    const pokemonName = args[0].toLowerCase(); // Convert the provided Pokémon name to lowercase

    // Find all encounters for the given Pokémon
    const encounters = jsonData.wild_encounter_groups[0].encounters.filter(encounter => {
      const environments = [];

      // Check if the Pokémon is found in different encounter types (land, water, etc.)
      if (encounter.land_mons?.mons.some(pokemon => pokemon.species.toLowerCase().replace('species_', '') === pokemonName)) {
        environments.push('Land');
      }
      if (encounter.water_mons?.mons.some(pokemon => pokemon.species.toLowerCase().replace('species_', '') === pokemonName)) {
        environments.push('Water');
      }
      if (encounter.rock_smash_mons?.mons.some(pokemon => pokemon.species.toLowerCase().replace('species_', '') === pokemonName)) {
        environments.push('Rock Smash');
      }
      if (encounter.fishing_mons?.mons.some(pokemon => pokemon.species.toLowerCase().replace('species_', '') === pokemonName)) {
        environments.push('Fishing');
      }
      if (encounter.hidden_mons?.mons.some(pokemon => pokemon.species.toLowerCase().replace('species_', '') === pokemonName)) {
        environments.push('Hidden');
      }

      encounter.environments = environments; // Add environments to the encounter object
      return environments.length > 0; // Return encounters with at least one environment
    });

    // If Pokémon encounters are found, send the locations and other details
    if (encounters.length > 0) {
      const pokemonData = encounters.map(encounter => {
        const location = encounter.base_label.replace('g', ''); // Get the location label
        const baseLabel = encounter.base_label;
        const pokemon = encounter.land_mons?.mons.find(pokemon =>
          pokemon.species.toLowerCase().replace('species_', '') === pokemonName
        ) || encounter.water_mons?.mons.find(pokemon =>
          pokemon.species.toLowerCase().replace('species_', '') === pokemonName
        ) || encounter.rock_smash_mons?.mons.find(pokemon =>
          pokemon.species.toLowerCase().replace('species_', '') === pokemonName
        ) || encounter.fishing_mons?.mons.find(pokemon =>
          pokemon.species.toLowerCase().replace('species_', '') === pokemonName
        ) || encounter.hidden_mons?.mons.find(pokemon =>
          pokemon.species.toLowerCase().replace('species_', '') === pokemonName
        ); // Get the specific Pokémon details

        const minLevel = pokemon.min_level; // Get the minimum level
        const maxLevel = pokemon.max_level; // Get the maximum level
        const environments = encounter.environments; // Get the environments where the Pokémon can be found

        return {
          location,
          baseLabel,
          minLevel,
          maxLevel,
          environments,
        };
      });

      // Fetch the Pokémon details from the PokéAPI
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // Make a request to the PokéAPI
        const pokemonImageURL = response.data.sprites.front_default; // Get the URL for the Pokémon image

        const embed = new Discord.MessageEmbed() // Create a Discord embed message
          .setTitle(`${pokemonName.toUpperCase()}`) // Set the title of the embed
          .setDescription(`**${pokemonName}** can be found in the following locations:`); // Set the description

        const maxFields = 25;
        let fieldCount = 0;

        pokemonData.forEach(pokemon => {
            if (fieldCount < maxFields) {
                embed.addField(
                    `Location: ${pokemon.location}`,
                    `Level Range: ${pokemon.minLevel || 'Unknown'} - ${pokemon.maxLevel || 'Unknown'}\nEnvironment: ${pokemon.environments.join(', ')}`
                );
                fieldCount++;
            }
        });
        embed.setDescription('[Download Encounter Doc](<https://cdn.discordapp.com/attachments/1040638131646500864/1168065193390120970/WildEncounters.txt?ex=6550687b&is=653df37b&hm=f06ffa534cf4989d07ae86def0fc6b0c726a2a3e4f372c9981bf9102b16577c4&>)') // Add a link to download encounter document

        embed.setThumbnail(pokemonImageURL) // Set the thumbnail image of the Pokémon
        embed.setFooter('Mr. Kip v8.0 by Aaghat'); // Add a footer to the embed

        return message.channel.send(embed); // Send the embed message
      } catch (error) {
        console.error('Error fetching Pokémon details:', error); // Log an error if there's an issue fetching Pokémon details
        return message.reply(`Failed to fetch details for Pokémon "${pokemonName}".`); // Notify about the failure
      }
    }

    // If Pokémon is not found, send an error message
    if (validSpecies.map(species => species.toLowerCase()).includes(pokemonName)) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // Make a request to the PokéAPI
      const pokemonImageURL = response.data.sprites.front_default; // Get the URL for the Pokémon image
      const wonderTradeEmbed = new Discord.MessageEmbed()
        .setTitle(`${pokemonName.toUpperCase()}`)
        .setThumbnail(pokemonImageURL)
        .setDescription(`[Download Wonder Trade List](<https://cdn.discordapp.com/attachments/1177807544119459872/1181488528673214494/wonder_trade.txt?ex=65813df0&is=656ec8f0&hm=0aa77e01fb5aaa6747f0de9b5587fd1942b0fd4e8426f170d154799090495519&>)\nAvailable only through **Wonder Trade**`)
        .setFooter(`Wonder Trade unlocks after 2 badges!`)
        .setTimestamp();
      message.channel.send(wonderTradeEmbed)

    } else {
      return message.reply("```Pokemon not found in game data```"); // Notify that the Pokémon is not found
    }
  },
};