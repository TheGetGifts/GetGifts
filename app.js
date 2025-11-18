const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const lang = tg.initDataUnsafe.user.language_code || 'en';

// Кнопка открытия кейса
document.getElementById('open-case').addEventListener('click', () => {
    // Отправь запрос в backend via tg.sendData({action: 'open_case', case: 1})
    tg.sendData(JSON.stringify({action: 'open_case', case_id: 1}));
    // Анимация: покажи спиннер или рулетку
    document.getElementById('animation').innerHTML = '<img src="spinner.gif">';  // Добавь GIF анимации
});

// Для слотов: аналогично, анимация вращения

// Апгрейд: список инвентаря из backend, кнопки upgrade

// Локализация: if (lang === 'ru') { document.title = 'Открыть кейс'; }

// Обработка данных от бота (в backend используй bot.on('web_app_data'))
// В backend добавь handler для web_app_data