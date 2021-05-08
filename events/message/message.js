const { Collection } = require ('discord.js');
module.exports = async (client, message) => {
    if(message.channel.type === "dm" || message.author.bot || !message.content.startsWith(client.config.PREFIX)) return

    const args = message.content.slice(client.config.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if(!command) return;
    if(command.help.permission && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permission pour cette commande");
    if(command.help.args && !args.length) {
        let noArgsReplay = `il nous faut des arguments pour cette command , ${message.author}!`;
        if(command.help.usage) noArgsReplay += `\nVoici comment utiliser la commande: \`${client.config.PREFIX}${command.help.name} ${command.help.usage}\``;
        return message.channel.send(noArgsReplay);
    }
    if(command.help.isUserAdmin && !user) return message.reply("Il faut mentionner un utilisateur");
    if(command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("Tu ne peux pas utiliser cette commande sur cet utilisateur");
    if(!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cd || 5) * 1000
    if(tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
        if(timeNow < cdExpirationTime) {
            let timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\``);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    command.run(client, message, args);
}
