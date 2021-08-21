const removeAccents = require('remove-accents');
const Parser = require('rss-parser');
const format = require('./format');

const parser = new Parser();

const BASE_URL = process.env.RSS_URL;

module.exports = function () {
    async function parse() {
        const feed = await parser.parseURL(BASE_URL);

        return feed.items.map(item => ({
            title: removeAccents(item.title).replace(/['"“”‘’„”«»]/g, ''),
            timestamp: item.isoDate,
            content: format(item.content)
        }));
    }

    return {
        parse
    };
}