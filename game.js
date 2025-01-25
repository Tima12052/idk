// Подключаем сокет
const socket = io('https://your-server-url.com'); // Укажите URL вашего сервера

// Получаем элемент игрока
const playerElement = document.getElementById('player');
let player = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

// Отображение игрока на экране
function updatePlayerPosition() {
    playerElement.style.left = `${player.x}px`;
    playerElement.style.top = `${player.y}px`;
}

// Обработчики клавиш для управления
document.addEventListener('keydown', (event) => {
    const step = 10;

    if (event.key === 'w') player.y -= step;
    if (event.key === 's') player.y += step;
    if (event.key === 'a') player.x -= step;
    if (event.key === 'd') player.x += step;

    // Отправляем позицию игрока на сервер
    socket.emit('move', player);
    updatePlayerPosition();
});

// Отправка начальной позиции на сервер
socket.emit('move', player);

// Получение позиции других игроков с сервера
socket.on('players', (players) => {
    document.querySelectorAll('.other-player').forEach(el => el.remove());

    players.forEach(p => {
        if (!document.getElementById(p.id)) {
            const otherPlayerElement = document.createElement('div');
            otherPlayerElement.classList.add('circle', 'other-player');
            otherPlayerElement.style.backgroundColor = 'blue';
            otherPlayerElement.id = p.id;
            document.getElementById('game-container').appendChild(otherPlayerElement);
        }

        const otherPlayer = document.getElementById(p.id);
        otherPlayer.style.left = `${p.x}px`;
        otherPlayer.style.top = `${p.y}px`;
    });
});

// Инициализация отображения собственного игрока
updatePlayerPosition();
