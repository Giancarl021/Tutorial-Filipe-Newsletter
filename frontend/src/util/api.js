const BASE_URL = 'https://tutorial-filipe-newsletter.azurewebsites.net';

export default function () {
    async function get(uri) {
        const response = await fetch(`${BASE_URL}/${uri}`);

        return await response.json();
    }

    async function getFile(uri) {
        const response = await fetch(`${BASE_URL}/${uri}`);

        return await response.blob();
    }

    async function list() {
        const items = await get('/api/list');

        return items;
    }

    async function downloadItem(date) {
        const blob = await getFile(`/api/get?date=${encodeURIComponent(date)}`);

        return blob;
    }

    return {
        list,
        downloadItem
    };
}