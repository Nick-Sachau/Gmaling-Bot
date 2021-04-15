module.exports = {
    name: 'coins',
    description: 'will output how many coins you have',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        // let players = m.players;

        let {players} = m;

        for(player in players) {
            if(message.author.id == players[player].id) {
                message.channel.send('You have ' + players[player].coins + ' coins!');
                break;
            }else if(Number(player) + 1 == players.length) {
                message.channel.send('You have not signed up yet. Try using command signup to signup')
            }
        }
        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}