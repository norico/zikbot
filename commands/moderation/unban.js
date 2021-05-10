const { MessageEmbed } = require('discord.js')
const { CHANNEL_LOG } = require('../../config');
module.exports = {
    run: (client, message, args) => {
        const user = args[0]
        user ? message.guild.members.unban(user) : message.channel.send("L'utilisateur n'éxiste pas");
        const unbanEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#0F0')
            .setDescription(`**Action** : Unban\n**User** : ${user.username}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL())
        client.channels.cache.get(CHANNEL_LOG).send(unbanEmbed);
        client.channels.cache.ger(CHANNEL_LOG.send(`${user} a été unban`))
    }, help : {
        name : 'unban',
        aliases : ['unban','Unban','UNBAN'],
        category : 'moderation',
        description : 'UbBan un utilisateur',
        usage : '<user_id>',
        cd : 1,
        isUserAdmin : true,
        permission : true,
        args : false
    }
}