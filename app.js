// app.js – Interactive Portfolio Logic

// Utility to show/hide panels
const definePanel = (id, show) => {
  const cork = document.getElementById('corkboard');
  const white = document.getElementById('whiteboard');
  if (id === 'case-studies') {
    white.classList.toggle('hidden', !show);
    cork.classList.add('hidden');
  } else {
    cork.classList.toggle('hidden', !show);
    white.classList.add('hidden');
  }
};

// Simulate printing: animate printer and then pin content
function simulatePrint(section) {
  const printer = document.querySelector('.printer-prop');
  printer.classList.add('printing');
  setTimeout(() => printer.classList.remove('printing'), 800);

  // After delay, create a sticky on corkboard
  setTimeout(() => createSticky(section), 600);
}

// Create a sticky note pinned to corkboard
function createSticky(section) {
  const cork = document.getElementById('corkboard');
  cork.classList.remove('hidden');
  
  const note = document.createElement('div');
  note.className = 'sticky-note';
  note.setAttribute('data-section', section);
  note.style.top = `${100 + Math.random() * 200}px`;
  note.style.left = `${150 + Math.random() * 400}px`;
  note.innerText = section.replace('-', ' ').toUpperCase();
  
  // Add pushpin
  const pin = document.createElement('img');
  pin.src = 'assets/pushpin-red.png';
  pin.className = 'pushpin';
  note.appendChild(pin);
  
  cork.appendChild(note);
  makeDraggable(note);
}

// Reset scene: clear notes and hide boards
function resetScene() {
  document.getElementById('corkboard').innerHTML = '';
  document.getElementById('corkboard').classList.add('hidden');
  document.getElementById('whiteboard').classList.add('hidden');
}

// Icon click handler
document.querySelectorAll('.icon-row .icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const section = icon.dataset.target;
    if (section === 'reset') {
      resetScene();
    } else {
      simulatePrint(section);
    }
  });
});

// Simple drag-and-drop for stickies
function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;
  el.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
  });
  document.addEventListener('mouseup', () => { isDragging = false; });
}

// Whiteboard sketch functionality
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sketch-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let drawing = false;

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#008080';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  });
});