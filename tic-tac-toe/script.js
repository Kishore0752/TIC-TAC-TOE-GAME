const board = document.getElementById('board')
const message = document.getElementById('message')
const reset = document.getElementById('reset')
let cells = []
let current = 'X'
let gameOver = false
function createBoard() {
    board.innerHTML = ''
    cells = []
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.dataset.index = i
        cell.onclick = handleMove
        board.appendChild(cell)
        cells.push(cell)
    }
    message.innerHTML = `Turn: <span style="color:#ff3e6c;font-size:1.3em;">${current}</span>`
    gameOver = false
}
function handleMove(e) {
    if (gameOver) return
    const cell = e.target
    if (cell.textContent) return
    cell.textContent = current
    const winLine = checkWin()
    if (winLine) {
        winLine.forEach(i => {
            cells[i].style.background = '#43a047'
            cells[i].style.color = '#fff'
            cells[i].style.transform = 'scale(1.15) rotate(-8deg)'
            cells[i].style.boxShadow = '0 0 20px 6px #43a04799'
        })
        message.innerHTML = `<span style="font-size:2.2em;color:#43a047;">🎉 ${current} Wins! 🎉</span>`
        gameOver = true
        return
    }
    if (cells.every(c => c.textContent)) {
        message.innerHTML = '<span style="font-size:2em;color:#ff3e6c;">🤝 Draw! 🤝</span>'
        gameOver = true
        return
    }
    current = current === 'X' ? 'O' : 'X'
    message.innerHTML = `Turn: <span style="color:#ff3e6c;font-size:1.3em;">${current}</span>`
}
function checkWin() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    for (let line of wins) {
        const [a,b,c] = line
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return line
        }
    }
    return null
}
reset.onclick = () => {
    current = 'X'
    createBoard()
}
createBoard()
