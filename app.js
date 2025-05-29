// app.js – Interactive Portfolio Logic with Full Solitaire & Minesweeper
document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon-row .icon');
  const appWindows = document.querySelectorAll('.app-window');

  function openApp(id) {
    appWindows.forEach(win => win.classList.add('hidden'));
    document.getElementById('corkboard')?.classList.add('hidden');
    document.getElementById('whiteboard')?.classList.add('hidden');
    document.getElementById(id)?.classList.remove('hidden');
  }

  document.querySelectorAll('.app-close')
    .forEach(btn => btn.addEventListener('click', () => {
      btn.parentElement.classList.add('hidden');
    }));

  icons.forEach(icon =>
    icon.addEventListener('click', () => openApp(icon.dataset.target))
  );

  // Paint App
  const paintCanvas = document.getElementById('paint-canvas');
  if (paintCanvas) {
    const ctx = paintCanvas.getContext('2d');
    paintCanvas.width = paintCanvas.offsetWidth;
    paintCanvas.height = paintCanvas.offsetHeight;
    let drawing = false;
    paintCanvas.addEventListener('mousedown', () => drawing = true);
    paintCanvas.addEventListener('mouseup', () => drawing = false);
    paintCanvas.addEventListener('mousemove', e => {
      if (!drawing) return;
      const rect = paintCanvas.getBoundingClientRect();
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#008080';
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    });
  }

  // Solitaire App
  const solNew      = document.getElementById('sol-new');
  const drawBtn     = document.getElementById('draw-card');
  const cardWaste   = document.getElementById('card-waste');
  const cardDisplay = document.getElementById('card-display');
  let deck = [], waste = [];

  function createDeck() {
    const suits = ['♠','♥','♣','♦'];
    const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    return suits.flatMap(s => ranks.map(r => r + s));
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function newSolitaire() {
    deck = shuffle(createDeck());
    waste = [];
    cardWaste.innerHTML = '';
    cardDisplay.innerHTML = '';
  }
  function drawSolitaire() {
    if (deck.length === 0) {
      if (!waste.length) return;
      deck = waste.reverse();
      waste = [];
      cardWaste.innerHTML = '';
    }
    const card = deck.pop();
    waste.push(card);
    cardDisplay.innerHTML = `<div class="card">${card}</div>`;
    const span = document.createElement('span');
    span.className = 'card';
    span.textContent = card;
    cardWaste.appendChild(span);
  }
  if (solNew && drawBtn && cardWaste && cardDisplay) {
    solNew.addEventListener('click', newSolitaire);
    drawBtn.addEventListener('click', drawSolitaire);
    newSolitaire();
  }

  // Minesweeper App
  const msGrid = document.getElementById('ms-grid');
  const msNew  = document.getElementById('ms-new');
  if (msGrid && msNew) {
    const rows = 8, cols = 8, minesCount = 10;
    let grid = [];

    function initMinesweeper() {
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ mine:false, revealed:false, flagged:false, adjacent:0 }))
      );
      let placed = 0;
      while (placed < minesCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!grid[r][c].mine) { grid[r][c].mine = true; placed++; }
      }
      // Count adjacent mines
      grid.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (!cell.mine) {
            cell.adjacent = [...Array(3).keys()]
              .flatMap(dr => [...Array(3).keys()].map(dc => [dr-1,dc-1]))
              .filter(([dr,dc]) => (dr||dc))
              .reduce((sum, [dr,dc]) => {
                const nr = r+dr, nc = c+dc;
                return sum + ((nr>=0&&nr<rows&&nc>=0&&nc<cols&&grid[nr][nc].mine)?1:0);
              }, 0);
          }
        })
      );
      renderGrid();
    }

    function renderGrid() {
      msGrid.innerHTML = '';
      grid.forEach((row, r) =>
        row.forEach((cell, c) => {
          const div = document.createElement('div');
          div.className = 'ms-cell';
          div.dataset.row = r; div.dataset.col = c;
          if (cell.revealed) {
            div.classList.add('revealed');
            div.textContent = cell.mine ? '💣' : (cell.adjacent || '');
          }
          if (cell.flagged) div.textContent = '🚩';
          div.addEventListener('click', () => clickCell(r,c));
          div.addEventListener('contextmenu', e => { e.preventDefault(); flagCell(r,c); });
          msGrid.appendChild(div);
        })
      );
    }

    function clickCell(r,c) {
      const cell = grid[r][c];
      if (cell.flagged || cell.revealed) return;
      if (cell.mine) { alert('Game Over'); initMinesweeper(); return; }
      revealCell(r,c); renderGrid();
    }
    function revealCell(r,c) {
      if (r<0||r>=rows||c<0||c>=cols) return;
      const cell = grid[r][c];
      if (cell.revealed||cell.flagged) return;
      cell.revealed = true;
      if (!cell.adjacent) {
        for (let dr=-1; dr<=1; dr++) for (let dc=-1; dc<=1; dc++) {
          if (dr||dc) revealCell(r+dr,c+dc);
        }
      }
    }
    function flagCell(r,c) {
      if (!grid[r][c].revealed) grid[r][c].flagged = !grid[r][c].flagged;
      renderGrid();
    }

    msNew.addEventListener('click', initMinesweeper);
    initMinesweeper();
  }
});
