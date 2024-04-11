const {getGames} = require('epic-free-games')
const ids = require('./id_enum')


async function freeCheck(HKRBot) {
    getGames("GB", true).then(res => {
        
        let message = "Currently, the following games are free on the Epic Store for a limited time : ";
        const gamingChannel = HKRBot.guilds.cache.get(ids.SERVER.GUILD).channels.cache.get(ids.CHANNEL.GAMES)
        gamingChannel.send(message)
        res.currentGames.forEach(game => {
            gamingChannel.send(game.title),
            gamingChannel.send(game.keyImages[0].url) 
        })
    }).catch(err => {
        console.log(err)
    });
       }

module.exports = {
    freeCheck
}