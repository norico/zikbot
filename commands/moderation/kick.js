const { MessageEmbed } = require('discord.js');
const { CHANNEL_LOG } = require('../../config');
module.exports = {
    run: (client, message, args, user) => {
        const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée.');
        user ? message.guild.member(user).kick(reason) : message.channel.send("L'utilisateur n'éxiste pas");
        const kickEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#F00')
            .setDescription(`**Action** : Kick\n**User** : ${user.username}\n**Reason** : ${reason}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL())
        client.channels.cache.get(CHANNEL_LOG).send(kickEmbed);
    }, help : {
        name : 'kick',
        aliases : ['kick','Kick','KICK'],
        category : 'moderation',
        description : 'kick un utilisateur',
        usage : '<@user> [<reason>]',
        cd : 1,
        isUserAdmin : false,
        permission : true,
        args : false
    }
}