const Discord = require('discord.js');
const fs = require('fs');
const epicF = require('./utils/epic_check')
const counter = require('./utils/counter')
const ids = require('./utils/id_enum')
const temp_channel_timer = require('./utils/temp_channel_timer')
const kb_lookup = require('./commands/lookup')
const HKRBot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const prefix = '!';

HKRBot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    HKRBot.commands.set(command.name, command);
}

HKRBot.once('ready', () => {
    HKRBot.commands.get('reactionlisten').execute(HKRBot);
    HKRBot.commands.get('gameslisten').execute(HKRBot);
    setInterval(() => epicF.freeCheck(HKRBot), 345600000)
    console.log('Bot online.');
    setInterval(() => temp_channel_timer.channelCheck(), 172800000);
})

HKRBot.on('guildMemberAdd', guildMember => {
    try {
        guildMember.guild.members.cache.get(guildMember.id).send('Welcome to the HKR Software Development server.\nPlease start by changing your name in the server to your real name, reading through the welcome-and-rules channel and selecting a role.\nTo change your nickname, simply right click on your profile on the right side of your screen and click on Change Nickname.\nIdeally, we would also recommend adding a picture of yourself so other students and teacher can identify you, but this is totally optional.')
    } catch (DiscordAPIError) {
        return
    }
})

HKRBot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let command = null;
    let args = null;

    if (message.content.startsWith(prefix + 'run')) {
        counter.counter_inc(counter.commands.RUN)
        HKRBot.commands.get('run').execute(message, HKRBot)
        return
    }

    if (message.content.includes(' ')) {
        command = message.content.slice(prefix.length).substr(0, message.content.indexOf(' ') - 1).toLowerCase()
        args = message.content.slice(prefix.length).substr(message.content.indexOf(' ')).split(':')

    } else {
        args = message.content.slice(prefix.length).split(/ +/);
        command = args.shift().toLowerCase();
    }

    try {
        if (message.guild.id === ids.SERVER.GUILD) { 
            switch (command) {
                case 'books':
                    HKRBot.commands.get('books').execute(message, args);
                    break;
                case 'clear':
                    HKRBot.commands.get('clear').execute(message, args);
                    break;
                case 'hkr':
                    HKRBot.commands.get('hkr').execute(message, args);
                    break;
                case 'reactionrole':
                    HKRBot.commands.get('reactionrole').execute(message, args, HKRBot);
                    break;
                case 'bot':
                    HKRBot.commands.get('bot').execute(message, args);
                    break;
                case 'tc':
                    counter.counter_inc(counter.commands.TC)
                    if (args[0] === 'request') {
                        HKRBot.commands.get('request').execute(message, args, HKRBot)
                    } else if (args[0] === 'invite') {
                        HKRBot.commands.get('invite').execute(message, args, HKRBot)
                    } else if (args[0] === 'kick') {
                        HKRBot.commands.get('kick').execute(message, args, HKRBot)
                    }
                    break;
                case 'lookup':
                    counter.counter_inc(counter.commands.LOOKUP)
                    if (args.length == 0) {
                        kb_lookup.send_courses(message)
                    } else if (args[0].split(" ").length == 1) {
                        kb_lookup.send_topics(message, args)
                    } else if (args[0].split(" ").length == 2) {
                        kb_lookup.send_files(message, args)
                    }
                    break;
                case 'mail':
                    counter.counter_inc(counter.commands.MAIL)
                    HKRBot.commands.get('mail').lookup(message, args)
                    break;
            }
        }
    } catch (TypeError) {
        return;
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }

})


HKRBot.login(ids.SERVER.LOGIN);