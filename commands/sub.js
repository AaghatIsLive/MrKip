const fs = require("fs");
const Discord = require("discord.js");
const userData = require('../userData.json');

module.exports = {
  name: "removecredits",
  description: "Remove credits from a user",
  execute(message, args) {
    // Check if the user has admin permissions
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Only administrators can use this command.");
    }

    // Check if a user was mentioned or user ID provided
    let user = message.mentions.users.first();
    if (!user) {
      // If no mention, check for user ID
      const userID = args[0];
      if (!userID) {
        return message.channel.send(
          "Please mention a user or provide a valid user ID to remove credits.",
        );
      }
      // Fetch the user by ID
      user = message.client.users.cache.get(userID);
      if (!user) {
        return message.channel.send("User not found.");
      }
    }

    // Check if a valid amount of credits was provided
    const amount = parseInt(args[1]);
    if (isNaN(amount) || amount <= 0) {
      return message.channel.send(
        "Please provide a valid positive number for credits.",
      );
    }

    try {
      const userIndex = userData.users.findIndex((u) => u.userId === user.id);

      if (userIndex !== -1) {
        // Check if user has enough credits to remove
        if (userData.users[userIndex].credits < amount) {
          return message.channel.send("User doesn't have enough credits.");
        }

        // Remove credits from the user
        userData.users[userIndex].credits -= amount;
        fs.writeFileSync("userData.json", JSON.stringify(userData, null, 2));
        message.channel.send(
          `Successfully removed ${amount} credits from ${user.username}.`,
        );
      } else {
        message.channel.send("User data not found.");
      }
    } catch (err) {
      console.error(err);
      message.channel.send("Error reading or writing userData.");
    }
  },
};
