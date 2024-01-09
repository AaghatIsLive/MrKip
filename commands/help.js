const Discord = require("discord.js"); // Importing the Discord.js library

module.exports = {
  name: "help", // The name of the command
  description: "Lists all commands and their details", // Description of what the command does

  // Function that executes when the command is called
  execute(message, args) {
    const commandsPerPage = 10;
    const page = args.length > 0 ? parseInt(args[0]) : 1;

    let commands = message.client.commands.array(); // Get an array of all commands

    const totalPages = Math.ceil(commands.length / commandsPerPage);

    if (page < 1 || page > totalPages || isNaN(page)) {
      return message.reply(`Invalid page number. Please use a number between 1 and ${totalPages}.`);
    }

    const startIdx = (page - 1) * commandsPerPage;
    const endIdx = startIdx + commandsPerPage;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Help Menu - Page ${page}/${totalPages}`)
      .setColor(0x00ae86) // Set the embed color
      .setDescription(`Here's a list of commands for page ${page}:`)
      .setFooter(`Mr Kip v8.0 by Aaghat`); // Adding a footer

    // List commands for the current page
    for (let i = startIdx; i < endIdx && i < commands.length; i++) {
      const command = commands[i];
      if (command.name !== "seek") {
        // Exclude a specific command (if needed)
        embed.addField(command.name, command.description); // Add command name and description to the embed
      }
    }

    message.channel.send(embed); // Send the embed message
  },
};