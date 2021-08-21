const sdk = require('microsoft-cognitiveservices-speech-sdk');
const voice = process.env.VOICE;
const region = process.env.SPEECH_REGION;
const secret = process.env.CUSTOMCONNSTR_SPEECH_SECRET;

module.exports = function () {
    const config = sdk.SpeechConfig.fromSubscription(secret, region);

    config.speechSynthesisVoiceName = voice;

    const synthesizer = new sdk.SpeechSynthesizer(config);

    async function getAudio(text) {
        const result = await new Promise((resolve, reject) => {
            synthesizer.speakTextAsync(text, result => {
                const { audioData } = result;

                synthesizer.close();

                if (!audioData) {
                    return reject(result.errorDetails);
                }

                return resolve(Buffer.from(audioData));
            });
        });

        return result;
    }

    return {
        getAudio
    };
}