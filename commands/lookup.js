const file_reader = require('../utils/file_reader');
const Discord = require('discord.js')

async function send_courses(message) {
    let courses = file_reader.get_topics_or_courses()
    message.author.send('**Available courses**\n\n' + courses.join('\n'))
    message.delete()
}

async function send_topics(message, args) {
    let topics = file_reader.get_topics_or_courses(args[0])
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].endsWith('.txt')) {
            topics[i] = topics[i].slice(0, -4)
        }
    }
    message.author.send('**Available topics within ' + args[0] + "**\n\n" + topics.join('\n'))
    message.delete()
}

async function send_files(message, args) {
    let file_dict = {}
    try {
        args = args[0].split(" ")
        file_dict = file_reader.read_file(args)
    } catch (error) {
        message.author.send('Sorry something went wrong with getting the specified library command! Please try again <3')
    }

    for (let [key, value] of Object.entries(file_dict)) {
        key = key.slice(2)
        if (parseInt(key) === file_reader.FILE_TYPES.IMAGE) {
            const attachment = new Discord.MessageAttachment(value)
            await message.author.send('', attachment)
        } else if (parseInt(key) === file_reader.FILE_TYPES.TXT) {
            await message.author.send(value)
        }
    }

    message.delete()
}

module.exports = {
    name: 'lookup',
    description: 'Looks up information in kb.',
    send_files,
    send_courses,
    send_topics
}
