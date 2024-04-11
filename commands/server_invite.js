module.exports = {
    name: 'server_invite',
    description: 'creates server invite with infinite time',
    execute(message, args) {
        let invite = message.channel.createInvite({
            maxAge: 0,
            maxUses: 0
        }).then((invite) => {
            message.channel.send('Invite: ' + invite)
        }).catch(console.log)
    }
}