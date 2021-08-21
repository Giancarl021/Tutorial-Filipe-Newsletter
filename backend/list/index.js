const Blob = require('../common/blob');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request');

    const blob = await Blob();

    context.log('Listing blobs');

    const list = await blob.list();

    context.log('Mapping blob data');

    const responseBody = list.map(item => ({
        title: item.metadata.title,
        date: item.name.replace(/\.(.*)$/, ''),
        filename: item.name
    }));

    context.log('Sending response')

    context.res = {
        body: responseBody
    };

    context.done();
}