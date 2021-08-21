const Rss = require('./src/rss');
const Speech = require('./src/speech');
const Blob = require('../common/blob');
const filter = require('./src/filter');

module.exports = async function (context, timer) {
    const now = new Date(Date.now());
    const rss = Rss();
    const speech = Speech();
    const blob = await Blob();

    context.log('Function ran at ' + now.toISOString());
    
    if (timer.isPastDue)
    {
        context.log('Function running late');
    }

    context.log('Getting RSS data');

    const data = await rss.parse();

    if (!data) {
        throw new Error('No data found. Aborting');
    }

    context.log('Filtering data');

    const item = filter(data);

    if (!item) {
        throw new Error('Filter returned empty data. Aborting');
    }

    context.log('Converting content to audio');

    const audio = await speech.getAudio(item.content);

    if (!audio) {
        throw new Error('Audio returned empty. Aborting');
    }

    context.log('Uploading audio to storage account');

    const n = n => n < 10 ? '0' + n : n;

    await blob.upload(`${now.getFullYear()}-${n(now.getMonth() + 1)}-${n(now.getDate())}.wav`, audio, { title: item.title });
}