const tg = Telegram.WebApp;
tg.ready();
tg.expand();
tg.setBackgroundColor(tg.themeParams.bg_color);

// Слушатель смены темы
tg.onEvent('themeChanged', () => { 
    document.body.style.background = tg.themeParams.bg_color; 
});

// Сохранение в локальном хранилище (новое в 2025)
tg.DeviceStorage.setItem('lastReward', 'NFT Prize', (err, success) => { 
    if (err) console.error(err); 
});

function openCase() {
    tg.HapticFeedback.impactOccurred('medium'); // Вибрация
    const caseEl = document.getElementById('case');
    const rewardEl = document.getElementById('reward');
    caseEl.classList.add('open');
    setTimeout(() => { 
        caseEl.style.display = 'none'; 
        rewardEl.style.display = 'block'; 
    }, 500);
    // Отправка данных обратно в бот (например, что выиграл)
    tg.sendData('case_opened:nft_fresh_socks');
}

// Полноэкранный режим для иммерсии (новое в 2025)
if (tg.isVersionAtLeast('8.0')) tg.requestFullscreen();