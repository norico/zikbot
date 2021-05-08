const zikbot = require('../../functions/log')
module.exports = {
    run : async (client, message) => {

        await client.user.setActivity('Ping');
        message.delete()
        const msg = await message.channel.send('Ping!');
        msg.edit(
            `Pong!
            Latence du serveur : ${msg.createdTimestamp - message.createdTimestamp}ms
            Latence du bot : ${Math.round(client.ws.ping)}ms`
        )

        zikbot.getCommandName

        // zikbot.log( client, message, client.commands.find(cmd => cmd.help.name).help.name );

        await client.user.setActivity('Idle');


    }, help : {
        name : "ping",
        aliases : ['ping', 'Ping' , 'PING'],
        category : 'misc',
        description : 'Affiche le ping',
        cd : 10,
        usage : "!ping",
        isUserAdmin : false,
        permission : false,
        args : false
    }

}
