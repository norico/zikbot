const { MessageEmbed } = require ('discord.js');
const { CHANNEL_LOG } = require('../../config');
module.exports = {
    run : async (client, message, args) => {
        if(isNaN(args[0]) || (args[0] < 1) || (args[0] > 100)) return message.reply('il faut spécifier un nombre entre 1 et 100');
        const msgs = await message.channel.messages.fetch({
            limit: Math.min(args[0], 100),
            before: message.id
        });
        let timeStamp = msgs.map(t => t.createdTimestamp);
        timeStamp.forEach(() => {
            const time = timeStamp + 1209600000
            if(time > Date.now()) return message.reply("tu ne peux pas clean ces messages car il y a des messages trop vieux");
        })
        message.delete();
        await message.channel.bulkDelete(msgs);
        const purgeEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#FF0000')
            .setDescription(`**Action**: Purge\n**Nbrs de messages**: ${timeStamp.length}\n**Salon**: ${message.channel}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
        client.channels.cache.get(CHANNEL_LOG).send(purgeEmbed)
    } , help : {
        name : "purge",
        aliases : ['purge','clean'],
        category : 'moderation',
        description : 'clear les messages ( pas plus vieux de 14jours )',
        cd : 1,
        usage : "<Nbr_msg>",
        isUserAdmin : false,
        permission : true,
        args : true
    }
}