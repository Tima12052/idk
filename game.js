let currentPlayerId = null; // Идентификатор текущего пользователя
let players = {}; // Все игроки

const ws = new WebSocket('https://tima12052.github.io/idk/'); // Укажите адрес вашего WebSocket-сервера

// Обновляем позиции игроков
function updatePlayers() {
    Object.keys(players).forEach((id) => {
        let playerElement = document.getElementById(id);
        if (!playerElement) {
            // Создаём элемент для нового игрока
            playerElement = document.createElement('div');
            playerElement.id = id;
            playerElement.className = 'circle';
            document.getElementById('game-container').appendChild(playerElement);
        }
        const { x, y } = players[id];
        playerElement.style.left = `${x}px`;
        playerElement.style.top = `${y}px`;

        // Меняем цвет текущего игрока для наглядности
        playerElement.style.backgroundColor = id === currentPlayerId ? 'green' : 'red';
    });
}

// Отправляем позицию текущего игрока на сервер
function sendPlayerPosition() {
    if (currentPlayerId && players[currentPlayerId]) {
        ws.send(JSON.stringify({ id: currentPlayerId, position: players[currentPlayerId] }));
    }
}

// Обрабатываем сообщения от сервера
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Если это первое сообщение, устанавливаем ID текущего пользователя
    if (!currentPlayerId && data.currentPlayerId) {
        currentPlayerId = data.currentPlayerId;
        players[currentPlayerId] = { x: 100, y: 100 }; // Начальная позиция
    }

    // Обновляем данные всех игроков
    if (data.players) {
        players = data.players;
        updatePlayers();
    }
};

// Отправляем позицию игрока при нажатии клавиш
document.addEventListener('keydown', (event) => {
    const step = 10; // Шаг перемещения
    if (!currentPlayerId || !players[currentPlayerId]) return;

    // Управление WASD
    if (event.key === 'w') players[currentPlayerId].y -= step;
    if (event.key === 's') players[currentPlayerId].y += step;
    if (event.key === 'a') players[currentPlayerId].x -= step;
    if (event.key === 'd') players[currentPlayerId].x += step;

    sendPlayerPosition(); // Отправляем обновления на сервер
});
