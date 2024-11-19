// ==UserScript==
// @name        search-for-actions
// @namespace   dozory
// @include     http://game.dozory.ru/*
// @version     1.10
// @grant       none
// @run-at      document-end
// ==/UserScript==

// Создаем строку поиска
function createSearchBox() {
    const table = document.getElementById('act_tbl');
    if (!table) return;

    // Проверяем, нет ли уже созданного поиска
    if (document.getElementById('search_box')) return;

    // Контейнер для строки поиска
    const searchBoxContainer = document.createElement('div');
    searchBoxContainer.style.marginBottom = '2px';

    // Поле ввода
    const searchBox = document.createElement('input');
    searchBox.id = 'search_box';
    searchBox.type = 'text';
    searchBox.placeholder = 'Поиск действий...';
    searchBox.style.width = '100%';
    searchBox.style.fontSize = '9pt';
    searchBox.style.padding = '5px';
   searchBox.style.border = '2px solid #ddd';
    searchBox.style.borderRadius = '6px';
    searchBox.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    searchBox.style.boxSizing = 'border-box';

    searchBox.addEventListener('input', () => {
        const filter = searchBox.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const actionName = row.cells[1].textContent.toLowerCase();
            if (actionName.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    searchBoxContainer.appendChild(searchBox);
    table.parentElement.insertBefore(searchBoxContainer, table);
}

// Отображаем строку поиска только при открытии окна
function checkAndAddSearchBox() {
    const table = document.getElementById('act_tbl');
    if (table && table.style.display !== 'none') {
        createSearchBox();
    }
}

// Следим за изменением DOM (например, когда окно открывается)
const observer = new MutationObserver(() => {
    checkAndAddSearchBox();
});

// Начинаем наблюдение за изменениями в теле документа
observer.observe(document.body, { childList: true, subtree: true });

// Если таблица уже открыта, добавляем строку поиска сразу
checkAndAddSearchBox();
