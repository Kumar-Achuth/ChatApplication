const request = require('request');

function get(url) {
    return new Promise((resolve, reject) => {

        let options = {
            url,
            headers: {
                'User-Agent': 'upgrade-angular'
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

module.exports = {
    get
}