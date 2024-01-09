// Require necessary modules
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const userData = require("./userData.json");
const path = "./dailyCredits.json";
const logFilePath = "./creditsLog.txt";

// Log in to Discord using the provided token
client.login("YOUR DISCORD TOKEN"); // enter your token here. you should hide it read the discord.js guide to see how

const fs = require("fs");
client.commands = new Discord.Collection();

// Read command files from the 'commands' directory
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Load each command file and store them in a collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Event handler when the bot is ready
// example data from emerald crest
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Emerald Crest v2.0", { type: "PLAYING" });
});

// example data from emerald crest
const roleCredits = {
  "Pokémaster Prodigy": 80,
  "Pokédex Fanatic": 45,
  "Explorers": 30,
  "Shiny Hunter ✨": 45,
  "Hall of Fame": 30,
  "Moderators": 30,
  "Staff": 40,
  "Beta Testers": 20,
};

let creditsData = {};
try {
  creditsData = JSON.parse(fs.readFileSync(path, "utf8"));
} catch (err) {
  console.error("Error reading or parsing the credits file:", err);
}

function dailyCredits(guild) {
  const currentDate = new Date().toDateString();
  const lastDateCreditsGiven = creditsData.lastDate || null;
  if (lastDateCreditsGiven === currentDate) {
    return;
  }

  guild.members.cache.forEach((member) => {
    let totalCredits = 0;
    member.roles.cache.forEach((role) => {
      const roleName = role.name;
      if (roleCredits[roleName]) {
        totalCredits += roleCredits[roleName];
      }
    });

    const userIndex = userData.users.findIndex(
      (user) => user.userId === member.user.id,
    );

    if (userIndex !== -1) {
      userData.users[userIndex].credits += totalCredits;
      userData.users[userIndex].creditsEarned += totalCredits;
      const logMessage = `User ${member.user.tag} has been granted ${totalCredits} credits.\n User Balance: ${userData.users[userIndex].credits}\n`;
      try {
        fs.appendFileSync(logFilePath, logMessage);
      } catch (error) {
        console.error("Error appending log:", error);
      }
    }
  });

  creditsData.lastDate = currentDate;
  try {
    fs.writeFileSync(path, JSON.stringify(creditsData, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

function runDailyCredits(client) {
  const guildId = "965900074532081674";
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return;

  dailyCredits(guild);
}
// Define a Map to store event dates and whether reminders have been sent
eventRemindersSent = new Map();

try {
  const data = fs.readFileSync("eventReminders.json");

  if (data.length > 0) {
    eventRemindersSent = new Map(JSON.parse(data));
  }
} catch (err) {
  console.error("Error loading event reminders:", err);
}

// Function to save event reminders to the JSON file
function saveEventReminders() {
  fs.writeFileSync(
    "eventReminders.json",
    JSON.stringify([...eventRemindersSent]),
  );
}

const { MessageEmbed } = require("discord.js");

// Function to send a reminder once an event starts
async function sendEventStartReminder(event) {
  const [day, month, year, pokemon] = event;
  const eventDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
  const currentDate = new Date();
  // console.log(`currentdate` + currentDate + 'eventdate' + eventDate);
  if (
    eventDate.getDate() === currentDate.getDate() &&
    eventDate.getMonth() === currentDate.getMonth() &&
    eventDate.getYear() === currentDate.getYear()
  ) {
    const startEmbed = new MessageEmbed()
      .setTitle(`The spotlight event for ${pokemon} has started!`) // example data from emerald crest
      .setColor("#33FF57"); // Set the color of the embed

    const moderatorsChannel = client.channels.cache.find(
      (channel) => channel.name === "spotlight-events",
    );

    const roleId = '1179682211801333780'; // example data from emerald crest
    
    if (moderatorsChannel) {
      try {
        await moderatorsChannel.send(startEmbed);
        eventRemindersSent.set(event.toString(), true);
        moderatorsChannel.send("<@$1179682211801333780"); // example data from emerald crest
        console.log(`Role ID: ${roleId}`);
        saveEventReminders();
      } catch (error) {
        console.error("Error sending start reminder:", error);
      }
    }
  }
}

// Function to check for upcoming reminders
function checkReminders() {
  const reminders = JSON.parse(
    fs.readFileSync("reminders.json", "utf-8") || "[]",
  );
  const now = new Date();

  for (const reminder of reminders) {
    const reminderTime = new Date(reminder.reminderTime);

    if (now >= reminderTime) {
      const channel = client.channels.cache.get(reminder.channelId);

      if (channel) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Reminder")
          .setDescription(reminder.messageContent)
          .setColor("#FF5733")
          .setTimestamp(reminderTime);

        channel.send(embed);
      }

      // Remove the reminder from the list
      const updatedReminders = reminders.filter((r) => r !== reminder);
      fs.writeFileSync(
        "reminders.json",
        JSON.stringify(updatedReminders, null, 4),
      );
    }
  }
}

// Event handler for when a message is received
client.on("message", (message) => {
  // Check for reminders when the bot starts
  checkReminders();

  runDailyCredits(client);

  // Check for reminders every minute
  setInterval(checkReminders, 60000);
  let userIndex = userData.users.findIndex(
    (user) => user.username === message.author.username,
  );

  // Find or create the user in the userData
  if (userIndex === -1) {
    userData.users.push({
      username: message.author.username,
      userId: message.author.id,
      credits: 0,
      creditsEarned: 0,
      exp: 0,
      level: 1,
    });
    userIndex = userData.users.length - 1;
  }

  // Update credits and exp for the user
  if (!message.content.startsWith("!")) {
    const messageLength = message.content.length;
    const creditsEarned = messageLength * 0.05;
    const expEarned = messageLength * 0.05;

    userData.users[userIndex].credits += creditsEarned;
    userData.users[userIndex].exp += expEarned;

    userData.users[userIndex].creditsEarned += creditsEarned;

    if (userData.users[userIndex].exp >= 20) {
      userData.users[userIndex].level += 1;
      userData.users[userIndex].exp = 0;
    }

    // Save the updated user data to the JSON file
    saveUserData();
  }

  // Ignore messages that don't start with '!'
  if (!message.content.startsWith("!")) return;

  // Ignore messages from bots
  if (message.author.bot) return;

  // Split the message into arguments
  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  // If the command is not recognized, do nothing
  if (!client.commands.has(command)) return;

  // Check if the message is in the correct channel and the user has the required permissions
  if (
    message.channel.name !== "mr-kip" && // example data from emerald crest
    !message.member.hasPermission("ADMINISTRATOR") &&
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    userData.users[userIndex].credits <= 9
  ) {
    return message.reply(
      `\nBalance: $${userData.users[userIndex].credits.toFixed(
        2,
      )}\nYou don't have enough credits to use commands outside of https://discord.com/channels/965900074532081674/1069599346670174228 channel.`,
    );
  }

  var commandUsed = false;

  try {
    // Execute the command
    client.commands.get(command).execute(message, args);
    commandUsed = true;
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }

  if (
    message.channel.name !== "mr-kip" &&
    !message.member.hasPermission("ADMINISTRATOR") &&
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    commandUsed != false
  ) {
    userData.users[userIndex].credits -= 10;
    saveUserData();
  }

  // Check for event reminders every time a command is used
  upcomingEvents.forEach((event) => {
    // Check if a reminder has already been sent for this event
    if (!eventRemindersSent.has(event.toString())) {
      sendEventStartReminder(event);
    }
  });
});

function saveUserData() {
  fs.writeFileSync("userData.json", JSON.stringify(userData, null, 2));
}

// Parse the list of upcoming spotlight events
// example data from emerald crest
const upcomingEvents = [
  [27, 10, 2023, "MELTAN"],
  [29, 10, 2023, "DREEPY"],
  [31, 10, 2023, "GASTLY"],
  [31, 10, 2023, "HOOPA"],
  [1, 11, 2023, "GROOKEY"],
  [2, 11, 2023, "BUNEARY"],
  [5, 11, 2023, "PIPLUP"],
  [11, 11, 2023, "ABSOL"],
  [16, 11, 2023, "FIDOUGH"],
  [23, 11, 2023, "POOCHYENA"],
  [27, 11, 2023, "BASCULIN_WHITE_STRIPED"],
  [30, 11, 2023, "QUAXLY"],
  [2, 12, 2023, "CETODDLE"],
  [7, 12, 2023, "FRIGIBAX"],
  [12, 12, 2023, "VULPIX_ALOLAN"],
  [20, 12, 2023, "CRYOGONAL"],
  [25, 12, 2023, "IRON_BUNDLE"],
  [29, 12, 2023, "VANILLITE"],
  [1, 1, 2024, "MARSHADOW"],
];

const app = express();
const port = 4000;
// example data from emerald crest
app.get("/", (req, res) => {
  const page = `
<html>
  <head>
    <title>Mr. Kip is Online</title>
    <style>
      body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to right, #3494e6, #ec6ead);
        color: white;
        font-family: 'Arial', sans-serif;
      }
      h1 {
        font-size: 3em;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
      .container {
        text-align: center;
      }
      .green {
        color: #71de59;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Mr. Kip is <span class="green">O</span>nline</h1>
    </div>
  </body>
</html>`;

  res.send(page);
});

app.listen(port, () => {
  console.log(`Mr. Kip is listening at http://localhost:${port}`);
});
