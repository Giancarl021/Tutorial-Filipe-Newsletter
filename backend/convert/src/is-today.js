module.exports = function (isoDate) {
    const now = new Date(Date.now()).toISOString();

    const today = now.split('T').shift();
    const compare = isoDate.split('T').shift();

    return today === compare;
}