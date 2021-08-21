const { convert } = require('html-to-text');

module.exports = function (content) {
    const text = convert(content, {
        wordwrap: false
    });

    const filteredText = text
        .replace(/\n/g, ' ')
        .replace(/^Filipe\sDeschamps\sNewsletter\s?/, '')
        .replace(/\s*:*\s*Link\s(patrocinado|afiliado)/gi, '.')
        .replace(/Cancelar\sinscrição.*$/, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g, '')
        .replace(/\s\s+/g, ' ')
        .trim();

    return filteredText;
}