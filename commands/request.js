const ids = require('../utils/id_enum')
const Discord = require('discord.js')
module.exports = {
    name: 'request',
    description: 'Creates temporary private voice and text channels.',
    async execute(message, args, HKRBot) {
        this.gMessage = message
        this.gHKRBot = HKRBot
        this.gDiscord = Discord
        let guild = message.guild

        let channel_exists = await this.channelExists(guild, 't_' + args[1], args[2])
        if (channel_exists) {
            message.author.send('A channel with this name already exists.')
            return;
        }

        if (args[2] === 'text') {
            message.guild.channels.create('t' + '_' + args[1])
                .then(channel => {
                    this.channelCreate(channel)
                }).catch(console.error);

        } else if (args[2] === 'voice') {
            message.guild.channels.create('t' + '_' + args[1], { type: 'voice' })
                .then(channel => {
                    this.channelCreate(channel)
                }).catch(console.error);

        } else {
            message.guild.channels.create('t' + '_' + args[1])
                .then(channel => {
                    this.channelCreate(channel)
                }).catch(console.error);
            message.guild.channels.create('t' + '_' + args[1], { type: 'voice' })
                .then(channel => {
                    this.channelCreate(channel)
                }).catch(console.error);

        }


    },

    channelCreate(channel) {
        let category = this.gMessage.guild.channels.cache.get(ids.CATEGORY.PRIVATE);
        if (!category) throw new Error("Category channel does not exist");
        channel.setParent(category.id);
        channel.overwritePermissions([
            { type: 'member', id: this.gMessage.author.id, allow: [this.gDiscord.Permissions.FLAGS.CREATE_INSTANT_INVITE, this.gDiscord.Permissions.FLAGS.MANAGE_CHANNELS, this.gDiscord.Permissions.FLAGS.VIEW_CHANNEL, this.gDiscord.Permissions.FLAGS.MANAGE_ROLES] },
            { type: 'member', id: this.gHKRBot.user.id, allow: [this.gDiscord.Permissions.FLAGS.VIEW_CHANNEL] },
            { type: 'role', id: this.gMessage.guild.roles.everyone.id, deny: [this.gDiscord.Permissions.FLAGS.VIEW_CHANNEL] },])
    },

    async channelExists(guild, channel_name, channel_type) {
        var channel;
        if (channel_type === 'both') {
            channel = await guild.channels.cache.find(channel => channel.name === channel_name)
        } else {
            channel = await guild.channels.cache.find(channel => channel.name === channel_name && channel.type === channel_type)
        }

        if (channel === undefined) {
            return false;
        } else {
            return true;
        }
    }
}
