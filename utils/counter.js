const fs = require('fs');

const commands = {
    LOOKUP: 'lookup',
    TC: 'tc',
    MAIL: 'mail',
    RUN: 'run'
}

function counter_inc(command) {
    fs.readFile('./utils/counters.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            var counters = {}
        } else {
            var counters = JSON.parse(data); //now it an object
        }

        if (counters[command] !== undefined) {
            counters[command]++;
        } else {
            counters[command] = 1;
        }
        json = JSON.stringify(counters); //convert it back to json
        fs.writeFile('./utils/counters.json', json, 'utf8', () => { }); // write it back 
    });
}

module.exports = {
    commands,
    counter_inc
}