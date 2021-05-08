const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require('./utils/loader');
const client = new Client({partials : ['MESSAGE', 'CHANNEL', 'REACTION']});
client.config = require('./config');

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN).then( ()=>{
    console.log('Connected')
})
