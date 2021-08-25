export default function () {
    const $list = document.querySelector('#list');
    const $audio = document.querySelector('audio');
    const $modal = document.querySelector('#modal');

    function createList(items) {
        const html = items.reverse().reduce((acc, item) => acc + `
            <li>
                <h1 class="title">${item.title}</h1>
                <h2 class="subtitle">${item.date}</h2>
                <button class="button is-link" data-date="${item.date}">Tocar</button>
            </li>
        `, '');
        
        $list.innerHTML = html;
    }

    function bindEvents(api) {
        const $buttons = [ ...document.querySelectorAll('#list > li > button') ];

        for (const $button of $buttons) {
            $button.onclick = async function () {
                $modal.classList.add('is-active');

                const date = this.getAttribute('data-date');

                const blob = await api.downloadItem(date);

                const url = URL.createObjectURL(blob);

                $audio.src = url;

                $modal.classList.remove('is-active');

                $audio.play();
            }
        }
    }

    return {
        createList,
        bindEvents
    };
}