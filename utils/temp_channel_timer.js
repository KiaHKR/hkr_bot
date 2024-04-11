async function channelCheck() {
    if (new Date().getDay().toString() === '7') {
        let home = await HKRBot.channels.fetch(ids.CATEGORY.PRIVATE)
        let children = home.children
        children.delete(ids.CHANNEL.REQUEST)
        children.forEach((children) => children.send("If this channel is unactive, please go ahead and delete it."))
    } else { return }
}

module.exports = {
    channelCheck
}