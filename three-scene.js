/* Interactive.css – Revised for Static Office Background */

/* Global Hidden Helper */
.hidden { display: none !important; }

/* Office Background */
.office-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

/* Monitor Frame */
.monitor-prop {
  position: absolute;
  top: 5%; left: 5%;
  width: 90%; height: 85%;
  pointer-events: none;
}
.monitor-frame {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* Screen */
.screen {
  position: absolute;
  top: 10%; left: 7%;
  width: 86%; height: 76%;
  background: #fff;
  box-shadow: inset 0 0 0 2px #ccc;
  border-radius: 6px;
  overflow: hidden;
  z-index: 2;
}

/* Desktop Icons */
.icon-row {
  position: absolute;
  top: 20px; left: 20px;
  display: flex; gap: 12px;
  z-index: 4;
}
.icon {
  width: 64px; height: 64px;
  cursor: pointer;
  transition: transform 0.2s;
  user-select: none;
}
.icon:hover { transform: scale(1.1); }
.icon:active {
  transform: translateZ(20px) rotateX(15deg) scale(1.2);
  transition: transform 0.15s ease-out;
}

/* Sitemap & SVG lines */
/* (unchanged from previous) */

/* App Windows & Whiteboard */
/* (unchanged) */

/* Printer props & animations */
/* (unchanged) */
