const fs = require('fs');

function log_add_with_time(log_file_name, entry) {
    const path = './logs/' + log_file_name

    time = get_time_stamp()
    spacer = '     :     '

    try {
        fs.appendFileSync(path, time + spacer + entry + '\n')
    } catch (err) {
        console.error(err)
    }
}

function get_time_stamp() {
    const options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit",
        second: "2-digit"
    }
    return new Date().toLocaleTimeString("en-se", options)
}

module.exports = {
    log_add_with_time
}