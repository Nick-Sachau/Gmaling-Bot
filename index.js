const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./token.json');
const prefix = '..';

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs
.readdirSync('./commands')
.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
  
    if (command === 'ping') {
      client.commands.get('ping').execute(message, args);
    }else {
      client.commands.get('failed').execute(message, args);
    }
  });
  
  client.login(token);