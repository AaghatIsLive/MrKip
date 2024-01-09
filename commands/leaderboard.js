const userData = require('../userData.json');

module.exports = {
    name: 'leaderboard',
    description: 'Displays the top 10 users on the leaderboard',
    execute(message, args) {
        const excludedUserID = 'YOUR_BOT_ID_HERE'; // your bot id

        // Sort users by credits in descending order
        const sortedUsers = userData.users
            .filter(user => user.userId !== excludedUserID) // Filter out the excluded user
            .sort((a, b) => b.credits - a.credits)
            .slice(0, 10);

        // Create a leaderboard embed
        const leaderboardEmbed = {
            color: 0xFFA500,
            title: '🏆 Top 10 Members 🏆',
            fields: [],
            timestamp: new Date(),
        };

        // Iterate through the top 10 sorted users (excluding the specific user) and add them to the embed
        sortedUsers.forEach((user, index) => {
            leaderboardEmbed.fields.push({
                name: `${index + 1}. ${user.username.toUpperCase()}`,
                value: `**Credits:** ${user.credits.toFixed(2)}`,
                inline: false,
            });
        });

        // Send the leaderboard as an embed
        message.channel.send({ embed: leaderboardEmbed });
    },
};
