# Vishnu Portfolio

Personal portfolio site for recruiter outreach, built as a fast static website and deployed with GitHub Pages.

Live URL: [https://gvvskvarma.github.io/vishnu-portfolio/](https://gvvskvarma.github.io/vishnu-portfolio/)

## What This Project Is

This portfolio is designed to communicate senior-level engineering impact quickly:

- Clear value proposition in the hero section
- Outcome-focused experience and impact highlights
- Skills grouped by delivery depth
- A dedicated Python expansion track to support backend/platform/AI-adjacent roles
- Mobile-first, accessible, lightweight UI

## Tech Stack

- **HTML5** for semantic page structure (`index.html`)
- **CSS3** for custom design system, responsive layout, and visual styling (`styles.css`)
- **Vanilla JavaScript (ES6+)** for scroll reveal animation and active navigation state (`script.js`)
- **GitHub Actions** for CI deployment
- **GitHub Pages** for static hosting

No frontend framework is used, by design, to keep the site fast and simple to maintain.

## Project Structure

```text
.
├── .github/workflows/deploy-pages.yml
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Features Implemented

- Sticky top navigation with section anchors
- Recruiter-focused hero section with key metrics
- Impact cards for high-value accomplishments
- Experience timeline
- Dedicated Python project-track section
- Skills matrix covering frontend/backend/cloud/testing
- Contact section with email, phone, and LinkedIn
- Scroll-in reveal animations using `IntersectionObserver`
- Responsive behavior for desktop/tablet/mobile

## How I Built This

1. Defined portfolio goal and recruiter audience (senior full-stack + Python growth narrative).
2. Extracted professional experience and achievements from resume source material.
3. Structured content into sections that map to recruiter decision points:
   - Value proposition
   - Proof of impact
   - Experience credibility
   - Technical depth
   - Contact CTA
4. Built a custom visual style using CSS variables (color, typography, spacing, surface, elevation).
5. Added lightweight JavaScript for motion and navigation feedback.
6. Tested locally with a static server.
7. Added GitHub Actions workflow to deploy to GitHub Pages on every push to `main`.

## Run Locally

From project root:

```bash
cd /Users/vishnuvarma/Desktop/Portfolio
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Stop server with `Ctrl + C`.

## Deployment (GitHub Pages + GitHub Actions)

Deployment workflow file:

- `.github/workflows/deploy-pages.yml`

Current pipeline behavior:

- Trigger: push to `main` (and manual `workflow_dispatch`)
- Steps:
  - Checkout repository
  - Configure GitHub Pages (`actions/configure-pages@v5`, `enablement: true`)
  - Upload site artifact
  - Deploy artifact to Pages

Required repository setting:

- In GitHub repo settings, `Pages` -> `Build and deployment` -> `Source: GitHub Actions`

After workflow success, site is served at:

- `https://gvvskvarma.github.io/vishnu-portfolio/`

## Update Workflow

For any content/style changes:

```bash
git add .
git commit -m "Describe the update"
git push origin main
```

GitHub Actions auto-deploys the new version.

## Future Enhancements

- Add real project case studies with links and screenshots
- Add downloadable PDF resume link (optional)
- Add favicon and social preview (`og:image`, Twitter card)
- Add analytics (privacy-friendly) for recruiter traffic insight
- Add custom domain and branded email CTA

