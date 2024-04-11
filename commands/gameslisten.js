const ids = require('../utils/id_enum')
module.exports = {
    name: 'gameslisten',
    description: 'Role based on games.',

    async execute(HKRBot) {

        const channel = await HKRBot.channels.fetch(ids.CHANNEL.GAMES);
        const message = await channel.messages.fetch(ids.MESSAGE.GAMES);
        const lol = message.guild.roles.cache.find(role => role.name === 'League Of Legends');
        const apex = message.guild.roles.cache.find(role => role.name === 'Apex Legends');
        const dota = message.guild.roles.cache.find(role => role.name === 'Dota 2');
        const codmp = message.guild.roles.cache.find(role => role.name === 'Call Of Duty MP');
        const codwz = message.guild.roles.cache.find(role => role.name === 'Call Of Duty Warzone');
        const valorant = message.guild.roles.cache.find(role => role.name === 'Valorant');
        const pubg = message.guild.roles.cache.find(role => role.name === 'PUBG');
        const gtav = message.guild.roles.cache.find(role => role.name === 'GTA V');
        const csgo = message.guild.roles.cache.find(role => role.name === 'CS GO');
        const wow = message.guild.roles.cache.find(role => role.name === 'World of Warcraft');
        const ow = message.guild.roles.cache.find(role => role.name === 'Overwatch');
        const rl = message.guild.roles.cache.find(role => role.name === 'Rocket League');
        const fort = message.guild.roles.cache.find(role => role.name === 'Fortnite');



        const lolemoji = '🇱';
        const apexemoji = '🇦';
        const dotaemoji = '🇩';
        const codmpemoji = '🇨';
        const codwzemoji = '🇼';
        const valorantemoji = '🇻';
        const pubgemoji = '🇵';
        const gtavemoji = '🇬';
        const csgoemoji = '🏳️';
        const wowemoji = '🪓';
        const owemoji = '🇴';
        const rlemoji = '🇷';
        const fortemoji = '🇫';

        HKRBot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === lolemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(lol);
                } if (reaction.emoji.name === apexemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(apex);
                } if (reaction.emoji.name === dotaemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(dota);
                } if (reaction.emoji.name === codmpemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(codmp);
                } if (reaction.emoji.name === codwzemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(codwz);
                } if (reaction.emoji.name === valorantemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(valorant);
                } if (reaction.emoji.name === pubgemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pubg);
                } if (reaction.emoji.name === gtavemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(gtav);
                } if (reaction.emoji.name === csgoemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(csgo);
                } if (reaction.emoji.name === wowemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(wow);
                } if (reaction.emoji.name === owemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ow);
                } if (reaction.emoji.name === rlemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(rl);
                } if (reaction.emoji.name === fortemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fort);
                } else {
                    return;
                }
            }
        })
            ;

        HKRBot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === lolemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(lol);
                } if (reaction.emoji.name === apexemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(apex);
                } if (reaction.emoji.name === dotaemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(dota);
                } if (reaction.emoji.name === codmpemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(codmp);
                } if (reaction.emoji.name === codwzemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(codwz);
                } if (reaction.emoji.name === valorantemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(valorant);
                } if (reaction.emoji.name === pubgemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pubg);
                } if (reaction.emoji.name === gtavemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(gtav);
                } if (reaction.emoji.name === csgoemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(csgo);
                } if (reaction.emoji.name === wowemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(wow);
                } if (reaction.emoji.name === owemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ow);
                } if (reaction.emoji.name === rlemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(rl);
                } if (reaction.emoji.name === fortemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fort);
                }
            } else {
                return;
            }
        });

    }
}
