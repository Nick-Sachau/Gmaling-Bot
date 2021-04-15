module.exports = {
    name: 'lose',
    description: 'will take out the coins if they lost',
    execute(message, args, client, coins) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        const players = m.players;

        for(player in players) {
            if(message.author.id == players[player].id) {
                players[player].coins -= coins;
                m.jackpot += coins;
            }
        }

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}