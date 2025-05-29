// Updated scripts.js to toggle printing class on folder panels
const tabs = document.querySelectorAll('.folder-nav .tab button');
tabs.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.textContent.trim().toLowerCase().replace(/ & | /g, '-');
    document.querySelectorAll('.folder-nav .tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.folder-page').forEach(page => page.style.display = 'none');
    button.parentElement.classList.add('active');
    const page = document.getElementById(target);
    if (page) page.style.display = 'block';
  });
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'block';
});

const printBtn = document.querySelector('.print-btn');
printBtn.addEventListener('click', () => {
  const printer = document.querySelector('.printer-widget img');
  printer.classList.add('printing');
  // Add printing class to current panel for tray animation
  const activePanel = document.querySelector('.folder-page[style*="block"] .folder-panel');
  if (activePanel) {
    activePanel.classList.add('printing');
    setTimeout(() => activePanel.classList.remove('printing'), 800);
  }
  setTimeout(() => printer.classList.remove('printing'), 1000);
  window.print();
});
