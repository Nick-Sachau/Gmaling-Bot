module.exports = {
    name: 'failed',
    description: 'lets then know that the command used failed',
    execute(message, args) {
      message.channel.send('"**' + message.content + '**" is not a valid command!\nLook at **,,help** for list of commands');
    }
}