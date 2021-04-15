module.exports = {
    name: 'winJackpot',
    description: 'will put winnings in upon win',
    execute(message, args, client, jackpotTotal) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        const {players} = m;

        for(player in players) {
            if(message.author.id == players[player].id) {
                players[player].coins += jackpotTotal;
            }
        }

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}