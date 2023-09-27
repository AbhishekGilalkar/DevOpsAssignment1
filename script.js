const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const selectedCell = e.target;

    if (selectedCell.textContent !== '') return;

    selectedCell.textContent = currentPlayer;
    selectedCell.style.pointerEvents = 'none';

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        resetBoard();
    } else if ([...cells].every(cell => cell.textContent !== '')) {
        alert('It\'s a draw!');
        resetBoard();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    currentPlayer = 'X';
}
