const Discord = require('discord.js')
module.exports = {
    name: 'invite',
    description: 'invites users to private channels',
    async execute(message, args, HKRBot) {
        let guild = message.guild
        const channel = guild.channels.cache.find(channel => channel.name === args[2] && channel.type === 'voice')
        if (channel === undefined) {
            message.author.send('The channel you indicated does not exist.\nIf you are certain that is does, please contact an admin.')
        } else {
            let member = message.member
            if (channel.permissionOverwrites.get(member.id) != undefined) {
                if (channel.permissionOverwrites.get(member.id).allow.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
                    let invited = null
                    await guild.members.fetch().then(members => {
                        members.forEach(member => {
                            if (member.user.username === args[1].split('#')[0] && member.user.discriminator === args[1].split('#')[1]) {
                                invited = member
                            }
                        });
                    })
                    if (invited === null) {
                        message.author.send("I can't find who you are looking for. Make sure to use the appropriate discord tag\nExample ValereanDota#5927")
                    } else {
                        try {
                            channel.updateOverwrite(invited, {
                                VIEW_CHANNEL: true
                            })
                        } catch (e) {
                            message.author.send("I can't find who you are looking for. Make sure to use the appropriate discord tag\nExample ValereanDota#5927")
                        }
                    }


                } else {
                    message.channel.send('You do not have sufficient permissions to invite users to this channel.')
                }
            } else {
                message.author.send("I can't find who you are looking for. Make sure to use the appropriate discord tag\nExample ValereanDota#5927")
            }
        }
    }
}