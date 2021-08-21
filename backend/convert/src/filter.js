const isToday = require('./is-today');

module.exports = function (data) {
    return data
        .filter(item => isToday(item.timestamp))
        .shift();
}