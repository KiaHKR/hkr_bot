const Discord = require('discord.js')
const fs = require('fs')
const { spawn } = require('child_process')
const log = require('../utils/write_to_log')

async function execute(message, HKRBot) {
    log.log_add_with_time('run_log', message.author.username)

    code_snippet = retrieve_code_snippet(message);
    file_name = message.id + ".py"

    if (code_snippet === undefined || code_snippet === '') {
        message.reply("I couldn't find any code snippet in your message. Please try again.")
        return
    } else if (!code_allowed(code_snippet)) {
        message.reply("you've imported an illegal module. Please try again without this module.")
        return
    }

    input_arr = code_has_input(code_snippet)
    if (input_arr !== null) {
        for (const i of input_arr) {
            code_snippet = await get_user_input(message, i, code_snippet)
        }
        if (!code_snippet) return
    }

    fs.writeFileSync(file_name, code_snippet, 'utf8')

    exec_python_code(message)
}

function exec_python_code(message) {
    const python = spawn('python', ['-u', file_name])
    let dataToSend = ""
    let errorToSend = ""


    python.stdout.on('data', function (data) {
        dataToSend += data.toString()
    })

    python.stderr.on('data', function (data) {
        errorToSend = data.toString()
    })

    python.on('close', (code) => {
        if (errorToSend !== "") {
            message.reply(format_response(errorToSend.trimLeft(), code))
        } else if (dataToSend !== "") {
            message.reply(format_response(dataToSend, code))
        }

        fs.unlinkSync(file_name)
        python.kill()
    })

    setTimeout(() => {
        errorToSend = 'Your code ran for too long, consider checking if you might have an infinite loop in the code!'
        python.kill()
    }, 20 * 1000)
}

function code_has_input(code_snippet) {
    const re = /input\((.*?[^\)])\)/g
    return code_snippet.match(re)
}

async function get_user_input(message, input_prompt, code_snippet) {
    return new Promise(async (resolve, reject) => {
        const filter = m => m.author.id === message.author.id
        message.reply("reply to this message with an input for the following request " + '```' + input_prompt + '```').then((input_prompt_message) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
                .then(m => {
                    reply_message = m.first()
                    code_snippet = code_snippet.replace(input_prompt, '"' + reply_message.content + '"')
                    m.delete()
                    input_prompt_message.delete()
                    resolve(code_snippet)
                })
                .catch(collected => {
                    message.reply('the request timed out, please try again!')
                    input_prompt_message.delete()
                    resolve(false)
                })
        })

    })
}

function code_allowed(code_snippet) {
    const banned_words = ['os', 'open', 'glob']
    const code_set = new Set(code_snippet.split(/\s|\(|\)/g))
    const intersection = new Set(banned_words.filter(x => code_set.has(x)))
    return intersection.size == 0 ? true : false
}

function format_response(text, returncode) {
    return `your code has completed with returncode [${returncode}]\`\`\`\n${text}\`\`\``
}

function retrieve_code_snippet(message) {
    try {
        const re = /`{3}([\s\S]|\n)*?`{3}/g;
        const match = message.content.match(re).join('').replace(/`{3}(python)?/g, '');
        return match
    } catch (err) {
        return
    }
}

module.exports = {
    name: 'run',
    execute
}