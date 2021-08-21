import 'bulma/css/bulma.min.css';
import './css/style.css';

import Api from './util/api';
import View from './util/view';

async function main() {
    const api = Api();
    const view = View();

    const items = await api.list();

    view.createList(items);
    view.bindEvents(api);
}

document.addEventListener('DOMContentLoaded', main);