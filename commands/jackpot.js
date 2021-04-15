module.exports = {
    name: 'jackpot',
    description: 'will output the jackpot',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        let jackpot = m.jackpot

        message.channel.send(jackpot)

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}