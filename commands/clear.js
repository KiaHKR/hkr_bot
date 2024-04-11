const ids = require('../utils/id_enum')
module.exports = {
    name: 'clear',
    description: 'Deletes number of messages in channel.',
    async execute(message, args) {

        if (!args[0]) return message.reply('Enter number of messages to delete.');
        if (isNaN(args[0])) return message.reply('Please enter a number.');
        if (args[0] < 1) return message.reply('Please enter a valid number.');
        if (message.member.roles.cache.has(ids.ROLES.ADMIN)) { 
            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
                message.author.send('Command executed.');
            })
        } else (message.reply('You have no such rights.'));
    }
}