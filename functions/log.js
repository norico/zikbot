const { CHANNEL_LOG } = require('../config')

const log = (client, message, command)=>{
    client.channels.cache.get( CHANNEL_LOG ).send(`${message.author.username} exec ${command}` );
}


module.exports = {
    log
}
