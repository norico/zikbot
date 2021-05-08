const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');
module.exports = {
    run : (client, message, args) => {
        if(!args.length) {
            const allcmd = new MessageEmbed()
                .setColor('RANDOM')
                .addField("List des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes. \nPour plus d'informations sur une commande tapé \`${client.config.PREFIX}help <command_name>\``)
            for(const category of categoryList) {
                allcmd.addField(`${category}`, `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(' ,')}`);
            }
            return message.channel.send(allcmd)
        } else {
            const command = client.commands.get(args[0])|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
            if(!command) return message.reply("cette commande n'éxiste pas !");
            const helpcmd = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${command.help.name}`)
                .addField("Description :", `${command.help.description} (cd : ${command.help.cd} secs)`)
                .addField("Utilisation :", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name}`,true)
            if(command.help.aliases.length > 1) helpcmd.addField("Alias : ", `${command.help.aliases.join(", ")}`, true)
            return message.channel.send(helpcmd);
        }
    }, help : {
        name : 'help',
        aliases: ['help', 'Help', 'HELP'],
        category: 'misc',
        description : 'Affiche l\'aide',
        cd : 5,
        usage : '',
        isUserAdmin : false,
        permission : false,
        args : false
    }
}