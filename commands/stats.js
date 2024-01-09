const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Show user credits and balance.',
  execute(message, args) {
    try {
      const data = fs.readFileSync('userData.json', 'utf8');
      const userData = JSON.parse(data);
      const userIndex = userData.users.findIndex(user => user.userId === message.author.id);

      if (userIndex !== -1) {
        const user = userData.users[userIndex];
        const creditsUsed = user.creditsEarned - user.credits;
        const statsEmbed = new Discord.MessageEmbed()
          .setColor('PURPLE')
          .setTitle(`${user.username.toUpperCase()}'s stats`)
          .setDescription(`Username: ${user.username}\nLevel: ${user.level}\nBalance: ${user.credits.toFixed(2)}\nTotal Credits: ${user.creditsEarned.toFixed(2)}\nCredits Used: ${creditsUsed.toFixed(0)}`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setTimestamp();
        message.channel.send(statsEmbed);
      } else {
        message.channel.send('User data not found.');
      }
    } catch (err) {
      console.error(err);
      message.channel.send('Error reading userData.');
    }
  },
};