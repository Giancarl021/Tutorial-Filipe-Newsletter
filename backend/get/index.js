const Blob = require('../common/blob');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { date } = req.query;
    const blob = await Blob();

    context.log('Validating date');

    if (!date) {
        context.log('Invalid date');
        context.res = {
            status: 400,
            body: {
                error: 'Invalid date'
            }
        };
        return context.done();
    }

    context.log('Getting file');

    const file = await blob.download(`${date}.wav`);

    if (!file) {
        context.log('Blob does not exist');
        context.res = {
            status: 400,
            body: {
                error: 'This date does not exist in the archive'
            }
        };
        return context.done();  
    }

    context.log('Sending file');

    context.res = {
        body: file,
        headers: {
            'Content-Disposition': `attachment; filename=${date}.wav`,
            'Content-Type': 'audio/wav',
            'Content-Length': file.length,
            'Content-Range': `bytes 0-${file.length}/${file.length}`,
            'Access-Control-Expose-Headers': 'Content-Disposition, Content-Type, Content-Length, Content-Range'
        }
    }

    context.done();
}