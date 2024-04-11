const ids = require('../utils/id_enum')
module.exports = {
    name: 'reactionlisten',
    description: 'Role based on reactions.',

    async execute(HKRBot) {

        const channel = await HKRBot.channels.fetch(ids.CHANNEL.WELCOME)
        const message = await channel.messages.fetch(ids.MESSAGE.WELCOME) 
        const year1 = message.guild.roles.cache.find(role => role.name === 'Year 1 Student');
        const year2 = message.guild.roles.cache.find(role => role.name === 'Year 2 Student');
        const year3 = message.guild.roles.cache.find(role => role.name === 'Year 3 Student');
        const teacher = message.guild.roles.cache.find(role => role.name === 'Teacher');
        const unibuddy = message.guild.roles.cache.find(role => role.name === 'Unibuddy')

        const year1emoji = '1️⃣';
        const year2emoji = '2️⃣';
        const year3emoji = '3️⃣';
        const teacheremoji = '🇹';



        HKRBot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === year1emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(year1);
                    await reaction.message.guild.members.cache.get(user.id).roles.add(unibuddy);
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
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(unibuddy);
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