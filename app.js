const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let lang = tg.initDataUnsafe.user.language_code || 'ru';
let currentTab = 'cases';

const TEXT = {
    ru: { cases: 'Кейсы', modes: 'Режимы', bonuses: 'Бонусы', profile: 'Профиль', sell_all: 'Продать всё', subscription: 'Подписка', support: 'Поддержка' },
    en: { cases: 'Cases', modes: 'Modes', bonuses: 'Bonuses', profile: 'Profile', sell_all: 'Sell All', subscription: 'Subscription', support: 'Support' }
};

function updateLang() {
    const buttons = document.querySelectorAll('#bottom-nav button');
    buttons[0].innerText = `💎 ${TEXT[lang].cases}`;
    buttons[1].innerText = `🎮 ${TEXT[lang].modes}`;
    buttons[2].innerText = `🎁 ${TEXT[lang].bonuses}`;
    buttons[3].innerText = `👤 ${TEXT[lang].profile}`;
    if (document.getElementById('sell-all')) {
        document.getElementById('sell-all').innerText = TEXT[lang].sell_all;
    }
    if (document.getElementById('sub-btn')) {
        document.getElementById('sub-btn').innerText = `🔔 ${TEXT[lang].subscription}`;
        document.getElementById('sup-btn').innerText = `📞 ${TEXT[lang].support}`;
    }
}

function fetchData(action, extra = {}, callback) {
    const data = { action, ...extra, lang };
    tg.sendData(JSON.stringify(data));
    // Для ответа от бота используй callback (пока симулируем, в реале добавь tg.onEvent)
    setTimeout(callback, 500);  // Симуляция задержки
}

function showTab(tab) {
    currentTab = tab;
    const content = document.getElementById('main-content');
    content.innerHTML = '';
    
    if (tab === 'cases') {
        const cases = [
            {id: 1, name: 'LOW CASE', img: 'https://your-link-to-low-case-image.png'},  // Замени на свои ссылки
            {id: 2, name: 'Gem Case', img: 'https://your-link-to-gem-case-image.png'},
            {id: 3, name: 'Core Case', img: 'https://your-link-to-core-case-image.png'},
            {id: 4, name: 'Genesis Case', img: 'https://your-link-to-genesis-case-image.png'},
            {id: 5, name: 'Bomb Case', img: 'https://your-link-to-bomb-case-image.png'}
        ];
        cases.forEach(c => {
            const div = document.createElement('div');
            div.innerHTML = `<img src="${c.img}" class="case-img" alt="${c.name}">
                             <button onclick="openCase(${c.id})">Open ${c.name}</button>`;
            content.appendChild(div);
        });
    } else if (tab === 'modes') {
        content.innerHTML = '<button onclick="upgradeItem()">⚡ Upgrade</button><button onclick="playSlots()">🎰 Slots</button>';
    } else if (tab === 'bonuses') {
        content.innerHTML = `<p>Реферальная ссылка: t.me/GetGift_bot?start=${tg.initDataUnsafe.user.id}</p>`;
    } else if (tab === 'profile') {
        content.innerHTML = `
            <button id="sub-btn">🔔 ${TEXT[lang].subscription}</button>
            <button id="sup-btn">📞 ${TEXT[lang].support}</button>
            <div id="lang-select">
                <button onclick="setLang('en')">ENG</button>
                <button onclick="setLang('ru')">RUS</button>
            </div>
            <div id="inventory">Loading inventory...</div>
            <button id="sell-all" onclick="sellAll()">${TEXT[lang].sell_all}</button>
        `;
        loadInventory();
    }
    updateLang();
}

function loadBalance() {
    fetchData('get_balance', {}, () => {
        // Симуляция: реальные данные из бота
        document.getElementById('gems').innerText = 0;  // Замени на реальные
        document.getElementById('tickets').innerText = 0;
    });
}

function loadLiveFeed() {
    fetchData('get_live_feed', {}, () => {
        document.getElementById('wins').innerText = '🧦 🍭 🚀 🌹 💎 ...';  // Замени на реальные
    });
}

function loadInventory() {
    fetchData('get_inventory', {}, () => {
        const inv = [];  // Симуляция
        const invDiv = document.getElementById('inventory');
        invDiv.innerHTML = '<ul>' + inv.map(item => `<li>${item.name} (${item.value_ton} TON)</li>`).join('') + '</ul>';
    });
}

function sellAll() {
    fetchData('sell_all', {}, loadInventory);
}

function setLang(newLang) {
    lang = newLang;
    fetchData('set_language', {lang: newLang}, () => showTab(currentTab));
}

function openCase(caseId) {
    fetchData('open_case', {case_id: caseId}, () => {
        // Анимация
        alert('Case opened!');  // Замени на реальную анимацию
        loadLiveFeed();  // Обнови LIVE
    });
}

function upgradeItem() {
    // Логика
}

function playSlots() {
    // Логика
}

// Init
loadBalance();
loadLiveFeed();
showTab('cases');
updateLang();
