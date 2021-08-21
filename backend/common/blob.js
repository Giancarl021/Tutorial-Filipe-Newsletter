const { ClientSecretCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');

const account = process.env.STORAGE_ACCOUNT;
const containerName = process.env.STORAGE_CONTAINER_NAME;

module.exports = async function () {
    const credential = new ClientSecretCredential(
        process.env.TENANT_ID,
        process.env.CLIENT_ID,
        process.env.CUSTOMCONNSTR_CLIENT_SECRET
    );

    const client = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        credential
    );

    const container = client.getContainerClient(containerName); 

    await container.createIfNotExists();

    async function upload(filepath, data, metadata = {}) {
        const blob = container.getBlockBlobClient(filepath);

        await blob.upload(data, data.length, { metadata });
    }

    async function list() {
        const data = [];
        const iterator = await container.listBlobsFlat({
            includeMetadata: true
        });

        for await (const blob of iterator) {
            data.push({
                name: blob.name,
                metadata: blob.metadata
            });
        }

        return data;
    }

    async function download(filepath) {
        const blob = await container.getBlockBlobClient(filepath);

        if (!await blob.exists()) {
            return null;
        }

        const data = await blob.downloadToBuffer();

        return data;
    }

    return {
        upload,
        list,
        download
    };
}