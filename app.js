const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');

client.on("ready", () => {
    console.log(`${chalk.green.dim('✓ ')} Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    const equalChannel = config.channels.find(el => el.id == message.channel.id);
    if (equalChannel) {
        if (!message.crosspostable) {
            console.log(chalk.red.dim('! ') + 'Something went wrong. Please ensure the bot has sufficient rights to perform this action.');
            return;
        }
        if (message.attachments.size === 0 && equalChannel.attachment_only) return;
        message.crosspost();
    }
});

client.login(config.token);