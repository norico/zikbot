const { MessageEmbed } = require('discord.js')
const { CHANNEL_LOG } = require('../../config');
module.exports = {
    run: (client, message, args, user) => {
        const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée.');
        user ? message.guild.member(user).unban(user,reason) : message.channel.send("L'utilisateur n'éxiste pas");
        const banEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#0F0')
            .setDescription(`**Action** : Unban\n**User** : ${user.username}\n**Reason** : ${reason}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL())
        client.channels.cache.get(CHANNEL_LOG).send(banEmbed);
    }, help : {
        name : 'unban',
        aliases : ['unban','Unban','UNBAN'],
        category : 'moderation',
        description : 'UbBan un utilisateur',
        usage : '<@user> [<reason>]',
        cd : 1,
        isUserAdmin : true,
        permission : true,
        args : false
    }
}