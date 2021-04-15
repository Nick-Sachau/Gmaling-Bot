module.exports = {
    name: 'signup',
    description: 'Signup for being able to keep track of coins and stuff',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/players.json';
        var m = JSON.parse(fs.readFileSync(name).toString());
        var originalJSON = m;

        let newPlayer = {
            name: message.author.username,
            id: message.author.id,
            coins: 500
        }

        message.channel.send('You have successfully signed up')

        m.players.push(newPlayer)

        fs.writeFileSync(name, JSON.stringify(originalJSON));
    }
}