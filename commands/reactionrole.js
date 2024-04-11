const ids = require('../utils/id_enum')
const Discord = require('discord.js')
module.exports = {
    name: 'reactionrole',
    description: 'Role based on reactions.',
    async execute(message, args, HKRBot) {
        const channel = ids.CHANNEL.WELCOME;
        const year1 = message.guild.roles.cache.find(role => role.name === 'Year 1 Student');
        const year2 = message.guild.roles.cache.find(role => role.name === 'Year 2 Student');
        const year3 = message.guild.roles.cache.find(role => role.name === 'Year 3 Student');
        const teacher = message.guild.roles.cache.find(role => role.name === 'Teacher');

        const year1emoji = '1️⃣';
        const year2emoji = '2️⃣';
        const year3emoji = '3️⃣';
        const teacheremoji = '🇹';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a role!')
            .setDescription('Choosing the appropriate role will give you access to the right channels!\n\n'
                + `${year1emoji} for year 1 student\n`
                + `${year2emoji} for year 2 student\n`
                + `${year3emoji} for year 3 student\n`
                + `${teacheremoji} for teacher`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(year1emoji);
        messageEmbed.react(year2emoji);
        messageEmbed.react(year3emoji);
        messageEmbed.react(teacheremoji);


        HKRBot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === year1emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(year1);
                }
                if (reaction.emoji.name === year2emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(year2);
                }
                if (reaction.emoji.name === year3emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(year3);
                }
                if (reaction.emoji.name === teacheremoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(teacher);
                }
            } else {
                return;
            }
        });

        HKRBot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === year1emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(year1);
                }
                if (reaction.emoji.name === year2emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(year2);
                }
                if (reaction.emoji.name === year3emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(year3);
                }
                if (reaction.emoji.name === teacheremoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(teacher);
                }
            } else {
                return;
            }
        });

    }
}