// scripts.js - Updated for 3D print simulation

// Tab navigation logic (unchanged)
const tabs = document.querySelectorAll('.folder-nav .tab button');
tabs.forEach(button => {
  button.addEventListener('click', () => {
    // Deactivate all tabs
    document.querySelectorAll('.folder-nav .tab').forEach(tab => tab.classList.remove('active'));
    // Hide all sections
    document.querySelectorAll('.folder-page').forEach(page => page.style.display = 'none');
    // Activate clicked tab
    button.parentElement.classList.add('active');
    // Show section
    const key = button.textContent.trim().toLowerCase().replace(/ & | /g, '-');
    const target = document.getElementById(key);
    if (target) target.style.display = 'block';
  });
});

// Show home by default
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'block';
});

// Print simulation elements
document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.querySelector('.print-btn');
  const closePrintBtn = document.querySelector('.close-print');
  const printOverlay = document.querySelector('.print-overlay');
  const printerProp = document.querySelector('.printer-prop img');
  const printSheet = document.querySelector('.print-sheet');

  printBtn.addEventListener('click', () => {
    // Dim scene
    document.body.classList.add('printing');
    // Animate printer
    printerProp.classList.add('printing');
    // Slide out paper overlay
    printOverlay.classList.add('visible');
    // Populate print-sheet with active content
    const activePanel = document.querySelector('.folder-page[style*="block"]');
    if (activePanel) {
      printSheet.innerHTML = activePanel.innerHTML;
    }
    // Reset printer animation
    setTimeout(() => printerProp.classList.remove('printing'), 1200);
  });

  closePrintBtn.addEventListener('click', () => {
    // Hide paper overlay
    printOverlay.classList.remove('visible');
    // Restore scene
    document.body.classList.remove('printing');
  });
});
