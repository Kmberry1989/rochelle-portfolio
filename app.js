// app.js – Interactive Portfolio Logic with Sitemap, Connections & Synthesized Printer Sound

document.addEventListener('DOMContentLoaded', () => {
  const icons         = document.querySelectorAll('.icon-row .icon');
  const appWindows    = document.querySelectorAll('.app-window');
  const sitemap       = document.getElementById('sitemap');
  const whiteboard    = document.getElementById('whiteboard');
  const outlineCanvas = document.getElementById('outline-canvas');
  const ctx           = outlineCanvas?.getContext('2d');
  const svg           = document.querySelector('.sitemap-lines');

  // Web Audio context for printer sound
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playPrinterSound(duration = 0.8) {
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3; // white noise
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    noise.connect(gainNode).connect(audioCtx.destination);
    noise.start();
    noise.stop(audioCtx.currentTime + duration);
  }

  const outlines = {
    'about-app': [
      'About Me',
      '- Creative Strategist',
      '- Digital Storyteller',
      '- Speaker & Coach'
    ],
    'paint-app': [
      'Digital Design',
      '- Social Media Graphics',
      '- Email Campaigns',
      '- Web Content'
    ],
    'pictures-app': [
      'Photography',
      '- Portfolio Galleries',
      '- Video Projects'
    ],
    'case-studies-app': [
      'Case Studies',
      '- Client Work',
      '- Results & Metrics'
    ],
    'documents-app': [
      'Contact',
      '- Email: rochelle.berry@example.com',
      '- LinkedIn: linkedin.com/in/rochelleberry',
      '- Phone: (123) 456-7890'
    ]
  };

  // Resize whiteboard canvas
  if (outlineCanvas) {
    outlineCanvas.width  = outlineCanvas.offsetWidth;
    outlineCanvas.height = outlineCanvas.offsetHeight;
  }

  // Hide all panels and lines
  function hideAll() {
    appWindows.forEach(w => w.classList.add('hidden'));
    whiteboard.classList.add('hidden');
    sitemap.style.display = 'none';
    if (svg) svg.innerHTML = '';
  }

  // Open an app or the whiteboard
  function openApp(id) {
    hideAll();
    if (id === 'whiteboard') {
      whiteboard.classList.remove('hidden');
    } else {
      document.getElementById(id)?.classList.remove('hidden');
    }
  }

  // Draw animated connections from clicked node
  function drawConnections(clicked) {
    if (!svg) return;
    svg.innerHTML = '';
    const nodes = document.querySelectorAll('.sitemap-node');
    const parentRect = sitemap.getBoundingClientRect();
    nodes.forEach(node => {
      if (node === clicked) return;
      const r1 = clicked.getBoundingClientRect();
      const r2 = node.getBoundingClientRect();
      const x1 = r1.left + r1.width/2  - parentRect.left;
      const y1 = r1.top  + r1.height/2 - parentRect.top;
      const x2 = r2.left + r2.width/2  - parentRect.left;
      const y2 = r2.top  + r2.height/2 - parentRect.top;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      svg.appendChild(line);
    });
  }

  // Desktop icons → open panels
  icons.forEach(icon =>
    icon.addEventListener('click', () => openApp(icon.dataset.target))
  );

  // Sitemap nodes → whiteboard outline + connections
  document.querySelectorAll('.sitemap-node').forEach(node => {
    node.addEventListener('click', () => {
      openApp('whiteboard');
      if (ctx) {
        ctx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);
        ctx.fillStyle = '#008080';
        ctx.font = '24px Montserrat';
        (outlines[node.dataset.section] || []).forEach((line, i) =>
          ctx.fillText(line, 40, 60 + i * 40)
        );
      }
      drawConnections(node);
    });
  });

  // Show sitemap initially
  sitemap.style.display = 'block';

  // Printer interaction
  const printerBtn = document.getElementById('printer-btn');
  if (printerBtn) {
    printerBtn.addEventListener('click', () => {
      printerBtn.classList.add('printing');
      playPrinterSound();
      setTimeout(() => printerBtn.classList.remove('printing'), 1000);

      // paper-eject animation (existing logic)...
    });
  }

  // (Paint, Solitaire, Minesweeper logic remains unchanged)
});
