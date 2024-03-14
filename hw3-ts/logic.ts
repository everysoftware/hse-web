type Player = 'X' | 'O';
type GameMode = 'computer' | '2 players';
type Cell = Player | null;
type Board = Cell[][];

class Game {
    private board: Board;
    private currentPlayer: Player;
    private gameMode: GameMode;

    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.currentPlayer = 'X';
        this.gameMode = '2 players';
        this.init();
    }

    private init() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                this.handleCellClick(e.target);
            });
        });

        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });

        const gameModeSelect = document.getElementById('game-mode') as HTMLSelectElement;
        gameModeSelect.addEventListener('change', (e) => {
            this.gameMode = e.target.value as GameMode;
            this.resetGame();
        });
    }

    private handleCellClick(target: EventTarget) {
        const cell = target as HTMLDivElement;
        if (cell.textContent || this.checkWin()) return;
        cell.textContent = this.currentPlayer;
        const [rowIndex, cellIndex] = this.getCellPosition(cell);
        this.board[rowIndex][cellIndex] = this.currentPlayer;
        if (this.checkWin()) {
            alert(`Победили ${this.currentPlayer}`);
        } else if (this.isDraw()) {
            alert('Ничья');
        } else {
            this.switchPlayer();
            if (this.gameMode === 'computer' && this.currentPlayer === 'O') {
                this.computerMove();
            }
        }
    }

    private getCellPosition(cell: HTMLDivElement): [number, number] {
        const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
        const rowIndex = Array.from(cell.parentElement.parentElement.children).indexOf(cell.parentElement);
        return [rowIndex, cellIndex];
    }

    private switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    private checkWin(): boolean {
        const winConditions = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a[0]][a[1]] === this.currentPlayer &&
                this.board[b[0]][b[1]] === this.currentPlayer &&
                this.board[c[0]][c[1]] === this.currentPlayer;
        });
    }

    private isDraw(): boolean {
        return this.board.every(row => row.every(cell => cell !== null));
    }

    private computerMove() {
        let cell;
        do {
            const rowIndex = Math.floor(Math.random() * 3);
            const cellIndex = Math.floor(Math.random() * 3);
            cell = document.querySelector(`.row:nth-child(${rowIndex + 1}) .cell:nth-child(${cellIndex + 1})`);
        } while (cell.textContent);
        cell.click();
    }

    private resetGame() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
}

new Game();
