const zikbot = require('../../functions/log')
module.exports = {
    run : async (client, message) => {

        let activity = client.user.presence.activities[0].name;

        await client.user.setActivity(client.commands.find(cmd => cmd.help.name).help.name);
        const msg = await message.channel.send('Ping!');
        msg.edit(
            `Pong!
            Latence du serveur : ${msg.createdTimestamp - message.createdTimestamp}ms
            Latence du bot : ${Math.round(client.ws.ping)}ms`
        )
        // zikbot.log( client, message, client.commands.find(cmd => cmd.help.name).help.name );
        await client.user.setActivity(activity);


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
