module.exports = {
    name: 'dice',
    description: 'Rolls dice and who ever gets the highest number wins cash',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        let players = m.players

        let playerCoins;

        if(args.length == 1) {

            for(player in players) {
                if(message.author.id == players[player].id) {
                    playerCoins = players[player].coins
                }
            }

            if(playerCoins >= Number(args[0])) {
                let playerRoll
                let botRoll = Math.ceil(Math.random()*12);
                let percentage = Math.ceil(Math.random()*4);
                let jackpotTotal = m.jackpot
                let jackpot = Math.floor(Math.random()*1000) + 1
                if(jackpot == 500) {
                    playerCoins += jackpot;
                    m.jackpot = m.jackpot / 2;

                    printJackpot()
                }else if(percentage == 1) {
                    playerRoll = Math.ceil(Math.random()*(12 - botRoll)) + botRoll;

                    printRoll()
                }else {
                    playerRoll = Math.ceil(Math.random()*(botRoll - 1)) + 1;

                    printRoll()
                }

                function printRoll() {
                    message.channel.send('Rolling...');
                    setTimeout(function() {
                        let x = client.channels.cache.get('832101118783389696')
                        let lastMessageID = x.lastMessageID;
                        
                        client.channels.cache.get('832101118783389696').messages.delete(lastMessageID);
                        setTimeout(function() {
                            message.channel.send('you rolled ' + playerRoll + '/12');
    
                            setTimeout(function() {
                                message.channel.send('Now I roll...')
                                let x2 = client.channels.cache.get('832101118783389696')
                                setTimeout(function() {
                                    let lastMessageID2 = x2.lastMessageID;
                                    client.channels.cache.get('832101118783389696').messages.delete(lastMessageID2);
                                    setTimeout(function() {
                                        message.channel.send('I rolled ' + botRoll + '/12');
                                        if(botRoll == playerRoll) {
                                            message.channel.send('Tie. Try again')
                                        }else if(playerRoll > botRoll) {
                                            let coins = Number(args[0]);
                                            client.commands.get('win').execute(message, args, client, coins);
                                            message.channel.send('Winner. you won ' + args[0] + ' coins!')
                                        }else if(botRoll > playerRoll) {
                                            let coins = Number(args[0]);
                                            client.commands.get('lose').execute(message, args, client, coins);
                                            message.channel.send('You lost. Try again next time')
                                        }
                                    }, 10);
                                }, 300);
                            }, 1000);
                        }, 5);
                    }, 1000);
                }

                function printJackpot() {
                    message.channel.send('You won the jackpot of ' + jackpotTotal + ' coins');

                    const {players} = m;

                    for(player in players) {
                        if(message.author.id == players[player].id) {
                            players[player].coins += jackpotTotal;
                        }
                    }
                }
            }else {
                message.channel.send('You do not have enough coins')
            }
        }else {
            message.channel.send('You must enter a bet');
        }

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}