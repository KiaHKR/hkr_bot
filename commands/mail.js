const Discord = require('discord.js');
const fs = require('fs');

async function lookup(message, args) {
    fs.readFile('./json/mails.json', 'utf8', function readFileCallback(err, data) {
        let mails = JSON.parse(data)
        for (let [key, value] of Object.entries(mails)) {
            if (key.toLowerCase().includes(args[0].toLowerCase())) {
                message.channel.send('Here is the e-mail for ' + key + ': ' + value);
            }
        } message.delete();


    })
}

module.exports = {
    name: "mail",
    lookup
}