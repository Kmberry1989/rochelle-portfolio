# Rochelle Berry Portfolio

This project implements an office-themed interactive portfolio inspired by jesse-zhou.com, rendered as a virtual desk with manila-folder navigation and print-ready pages.

## Project Structure

```
/ (root)
│
├── index.html       # Main HTML scaffolding with folder nav and sections
├── styles.css       # Core styling: desk background, folder tabs, panels
├── scripts.js       # Tab switching, print handling
│
├── assets/          # All images and media
│   ├── desk-background.jpg   # High-res wood desk image
│   ├── printer-icon.png      # Printer icon PNG
│   ├── headshot.jpg          # Professional headshot
│   ├── icon-camera.png       # Skill icon
│   ├── icon-pencil.png       # Skill icon
│   ├── icon-globe.png        # Skill icon
│   └── icon-email.png        # Email icon
│   └── icon-linkedin.png     # LinkedIn icon
│   └── [project mockups...]  # Social media, web, email previews
│
└── README.md        # Project overview and setup instructions
```

## Setup & Preview

1. Clone or download the repository.
2. Ensure the `assets` folder contains all required images (see structure above).
3. Open `index.html` in your browser (no server required).
4. Click folder tabs to navigate; use the printer widget to print pages.

## Customization

* **Content:** Replace placeholder text in each section (`.bio-text`, `.carousel`, etc.) with your copy and media.
* **Colors & Typography:** Edit variables in `styles.css` to adjust palette or fonts.
* **Assets:** Swap in real mockups under `assets` (e.g., social-media-phone.png).
* **Responsive:** Tweak the mobile drawer icon or add more breakpoints in `styles.css`.

## Next Steps

* Add smooth paper-slide animations when opening folders.
* Integrate a lightweight CSS sprite for manila-folder tabs for performance.
* Hook up the “View My Work” and “Get In Touch” buttons to scroll or modal overlays.
* Export print stylesheet (`print.css`) to fine-tune page prints.
* Deploy to Netlify or GitHub Pages for live hosting.

---

Feel free to adjust or expand this guide as needed. Happy building!
