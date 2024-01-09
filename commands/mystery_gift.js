const Discord = require("discord.js");

module.exports = {
  name: "mg",
  description: "Display available mystery gifts",

  execute(message, args) {
    const gifts = [
      {
        name: "MYSTERY_GIFT_MAGIKARP_SHINY",
        requirement: "Level 5, Special",
        price: "0",
        id: "1",
      },
      {
        name: "MYSTERY_GIFT_VICTINI",
        requirement: "Level 50, 7th Gym",
        price: "0",
        id: "2",
      },
      {
        name: "MYSTERY_GIFT_ROCKRUFF_OWNTEMPO_SHINY",
        requirement: "Level 10, 1st Gym",
        price: "0",
        id: "3",
      },
      {
        name: "MYSTERY_GIFT_MARSHADOW",
        requirement: "Level 40, 6th Gym",
        price: "0",
        id: "4",
      },
      {
        name: "MYSTERY_GIFT_ABOMASNOW_MEGA",
        requirement: "Level 40, 6th Gym",
        price: "0",
        id: "5",
      },
      {
        name: "MYSTERY_GIFT_BEEDRILL_MEGA",
        requirement: "Level 20, 3rd Gym",
        price: "0",
        id: "6",
      },
      {
        name: "MYSTERY_GIFT_FALINKS_SHINY",
        requirement: "Level 10, visit Petalburg",
        price: "1549",
        id: "7",
      },
      {
        name: "MYSTERY_GIFT_SKIDDO_SHINY",
        requirement: "Level 10, visit Petalburg",
        price: "1549",
        id: "8",
      },
      {
        name: "MYSTERY_GIFT_RARE_CANDY",
        requirement: "Rare Candy x99",
        price: "0",
        id: "9",
      },
      {
        name: "MYSTERY_GIFT_TAPUBULU",
        requirement: "Level 40, 6th Gym",
        price: "1999",
        id: "10",
      },
      {
        name: "MYSTERY_GIFT_TAPUKOKO",
        requirement: "Level 40, 6th Gym",
        price: "0",
        id: "11",
      },
      {
        name: "MYSTERY_GIFT_TAPUFINI",
        requirement: "Level 40, 6th Gym",
        price: "1999",
        id: "12",
      },
      {
        name: "MYSTERY_GIFT_TAPULELE",
        requirement: "Level 40, 6th Gym",
        price: "0",
        id: "13",
      },
      {
        name: "MYSTERY_GIFT_EONTICKET",
        requirement: "Catch the other Lati-twin",
        price: "0",
        id: "14",
      },
      {
        name: "MYSTERY_GIFT_MYSTICTICKET",
        requirement: "Level 50, 8th Gym",
        price: "0",
        id: "15",
      },
      {
        name: "MYSTERY_GIFT_CELEBI",
        requirement: "Level 30, 4th Gym",
        price: "0",
        id: "16",
      },
      {
        name: "MYSTERY_GIFT_TYPENULL",
        requirement: "Level 40, 6th Gym",
        price: "1999",
        id: "17",
      },
      {
        name: "MYSTERY_GIFT_SNEASEL_HISUI_SHINY",
        requirement: "Level 20, 2nd Gym",
        price: "1549",
        id: "18",
      },
      {
        name: "MYSTERY_GIFT_RAIKOU_SHINY",
        requirement: "Level 40, 6th Gym",
        price: "0",
        id: "19",
      },
      {
        name: "MYSTERY_GIFT_SANDY_SHOCKS_SHINY",
        requirement: "Level 40, 6th Gym",
        price: "2200",
        id: "20",
      },
      {
        name: "MYSTERY_GIFT_FLUTTER_MANE_SHINY",
        requirement: "Level 40, 6th Gym",
        price: "2200",
        id: "21",
      },
      {
        name: "MYSTERY_GIFT_SLITHER_WING_SHINY",
        requirement: "Level 40, 6th Gym",
        price: "2200",
        id: "22",
      },
      {
        name: "MYSTERY_GIFT_MEWTWO_MEGA_SHINY",
        requirement: "Level 50, 7th Gym",
        price: "3000",
        id: "23",
      },
      {
        name: "MYSTERY_GIFT_LOKIX_SHINY",
        requirement: "Level 20, 3rd Gym",
        price: "1549",
        id: "24",
      },
      {
        name: "MYSTERY_GIFT_BANETTE_MEGA",
        requirement: "Level 40, 6th Gym",
        price: "599",
        id: "25",
      },
    ];

    const embed = new Discord.MessageEmbed()
      .setTitle("Available Mystery Gifts")
      .setDescription("Choose a mystery gift:");

    gifts.forEach((gift) => {
      if (gift.price !== "0") {
        embed.addField(
          `${gift.id}. ${gift.name}`,
          `Requirement: ${gift.requirement}\nCredits: ${gift.price}`,
        )
        .setFooter(`use !redeem to redeem codes`);
      }
    });

    message.channel.send(embed);
  },
};
