module.exports = {
    name: 'collect',
    description: 'will give you your daily coins',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;
        
        const {players} = m;

        for(player in players) {
            if(message.author.id == players[player].id) {
                if(players[player].hasOwnProperty('lastDateCollected') == false) {
                    let date = new Date(Date.now())
                    let lastDateCollected = date.getTime()
                    
                    let updatePerson =  {
                        name: players[player].name,
                        id: players[player].id,
                        coins: (players[player].coins + 200),
                        lastDateCollected: lastDateCollected
                    }
                    console.log(updatePerson)
                    players.splice(player, 1, updatePerson)
                }else if(players[player].hasOwnProperty('lastDateCollected') == true) {
                    let date = new Date(Date.now())
                    let newTimeCollected = date.getTime()
                    let seeTimeDiff = newTimeCollected - players[player].lastDateCollected;

                    if(seeTimeDiff >= 86400000) {
                        console.log('has been a day')
                    }else {
                        console.log(`has not been a whole day yet`)
                    }

                    console.log(seeTimeDiff)
                }
                break
            }
        }

        

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}