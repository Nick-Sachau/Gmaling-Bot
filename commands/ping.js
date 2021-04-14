module.exports = {
    name: 'ping',
    description: 'Pings bot',
    execute(message, args) {
      let x = Math.ceil(Math.random() * 10)
      if(args.length == 0) {
        message.channel.send('You must input a number **1** to **10**')
      }
      else if(args[0] > 10) {
        message.channel.send('your number must be **1** to **10**')
      }else if(x == args[0]) {
        message.channel.send('**You win**');
      }else {
        message.channel.send('Pong');
      }
    }
  }