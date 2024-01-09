const Discord = require("discord.js"); // Importing the Discord.js library

module.exports = {
  name: "mute", // The name of the command
  description: "Mute a member in the server", // Description of what the command does

  execute(message, args) {
    try {
      const user = message.mentions.users.first(); // Extracting the mentioned user from the message
      if (!user) return message.reply("You need to mention a user to mute them!"); // Handling case where no user is mentioned

      const member = message.guild.member(user); // Getting the member object associated with the mentioned user
      if (!member) return message.reply("This user isn't in this server"); // Handling case where user is not in the server

      if (!message.member.permissions.has("MUTE_MEMBERS"))
        // Checking if the author has permission to mute members
        return message.reply("You don't have permission to mute members!"); // Handling case where author doesn't have permission

      const duration = args[1]; // Extracting the mute duration from arguments
      if (!duration || isNaN(duration)) return message.reply("Please provide a valid mute duration in seconds!");

      const reason = args.slice(2).join(" ") || "No reason provided"; // Extracting mute reason from arguments or using a default if not provided

      // Creating an embed message to notify about the mute
      const mutedEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000") // Setting the embed color to red
        .setTitle(`${user.tag} has been muted for ${duration} seconds`) // Title of the embed
        .addFields(
          { name: "Reason", value: reason }, // Adding a field for the reason
          { name: "Muted by", value: message.author.tag }, // Adding a field for the author
        )
        .setTimestamp(); // Adding a timestamp

      message.channel.send(mutedEmbed); // Sending the embed message

      const mutedRoleID = "1038651080969560115"; // Replace "MutedRoleID" with the actual ID of your muted role

      // Check if the member is already muted
      if (member.roles.cache.has(mutedRoleID)) {
        return message.reply(`${user.tag} is already muted.`);
      }

      // Muting the member
      member.roles.add(mutedRoleID); // Add the muted role

      // Disable sending messages in the channel
      message.channel.permissionOverwrites.set([
        {
          id: mutedRoleID,
          deny: ["SEND_MESSAGES"],
        },
      ]);

      // Setting a timeout to automatically remove the muted role and allow sending messages after the specified duration
      setTimeout(() => {
        // Remove the muted role
        member.roles.remove(mutedRoleID);
        // Allow sending messages in the channel
        message.channel.permissionOverwrites.set([]);
        message.channel.send(`${user.tag} has been unmuted after ${duration} seconds.`);
      }, duration * 1000);
    } catch (error) {
      console.error("Error executing mute command:", error);
      message.reply("There was an error trying to execute that command. Please try again later.");
    }
  },
};