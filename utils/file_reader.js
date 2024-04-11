var fs = require('fs');

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const FILE_TYPES = {
    IMAGE: 1,
    TXT: 2
}

function get_topics_or_courses(course_name = '') {
    try {
        let real_path = fs.realpathSync('./kb_resources/' + course_name)
        return fs.readdirSync(real_path)
    } catch (error) {
        return ['The topic you specified cannot be found!']
    }
}

function read_file(args) {
    for (var i = 0; i < args.length; i++) {
        args[i] = args[i].toLowerCase();
    }
    let path = './kb_resources/' + args.join('/');
    let file_dict = {}

    try {
        var real_path = fs.realpathSync(path)
    } catch (error) {
        var real_path = fs.realpathSync(path + '.txt')
    }

    if (fs.statSync(real_path).isDirectory()) {
        let files = fs.readdirSync(real_path, { withFileTypes: true });
        let prefix1 = 0
        let prefix2 = 0
        files.forEach(file => {
            let prefix = alphabet[prefix1] + alphabet[prefix2]
            let file_path = real_path + "/" + file.name
            if (__is_file_image(file.name)) {
                file_dict[prefix + FILE_TYPES.IMAGE.toString()] = file_path
            } else {
                let data = fs.readFileSync(file_path).toString()
                file_dict[prefix + FILE_TYPES.TXT.toString()] = data
            }
            if (prefix2 = alphabet.length - 1) {
                prefix2 = 0
                prefix1++
            } else {
                prefix2++
            }

        });
    } else if (fs.statSync(real_path).isFile()) {
        let data = fs.readFileSync(real_path).toString()
        file_dict['aa' + FILE_TYPES.TXT] = data
    }

    return file_dict
}

function __is_file_image(name) {
    if (name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png')) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    read_file,
    get_topics_or_courses,
    FILE_TYPES
}
