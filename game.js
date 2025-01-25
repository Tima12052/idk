// Получаем элементы игроков
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');

// Начальные позиции игроков
let player1 = { x: 100, y: 100 };
let player2 = { x: 300, y: 300 };

// Обновляем позицию игрока
function updatePlayerPosition() {
    player1Element.style.left = `${player1.x}px`;
    player1Element.style.top = `${player1.y}px`;

    player2Element.style.left = `${player2.x}px`;
    player2Element.style.top = `${player2.y}px`;
}

// Обработчики клавиш для управления игроками
document.addEventListener('keydown', (event) => {
    const step = 10; // Шаг перемещения

    // Управление первым игроком (WASD)
    if (event.key === 'w') player1.y -= step;
    if (event.key === 's') player1.y += step;
    if (event.key === 'a') player1.x -= step;
    if (event.key === 'd') player1.x += step;

    // Управление вторым игроком (стрелки)
    if (event.key === 'ArrowUp') player2.y -= step;
    if (event.key === 'ArrowDown') player2.y += step;
    if (event.key === 'ArrowLeft') player2.x -= step;
    if (event.key === 'ArrowRight') player2.x += step;

    // Обновляем позиции игроков
    updatePlayerPosition();
});

// Инициализация отображения игроков
updatePlayerPosition();
