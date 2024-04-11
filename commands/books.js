const ids = require('../utils/id_enum')
module.exports = {
    name: 'books',
    description: 'Basic response for now.',
    async execute(message, args) {
        if (message.member.roles.cache.has(ids.ROLES.TEACHER)) { 
            return
        } else {
            message.author.send('You can check out https://1lib.sk/ and will most likely find the books there.')
            message.delete()
        }

    }
}