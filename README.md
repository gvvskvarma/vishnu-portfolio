# Vishnu Portfolio

Personal portfolio site for Vishnu Vardhan Gottumukkala — Senior Full-Stack Engineer. Built as a fast, visually polished static website and deployed with GitHub Pages.

Live URL: [https://gvvskvarma.github.io/vishnu-portfolio/](https://gvvskvarma.github.io/vishnu-portfolio/)

## What This Project Is

A recruiter-focused portfolio designed to communicate 8+ years of senior-level engineering impact at a glance:

- Animated hero section with typed role titles, gradient text, and counter metrics
- Selected achievements highlighting architecture ownership, performance, and mentorship
- Detailed project case studies for Comcast Developer Portal, Global App Platform, and IBIS
- Experience timeline with duration badges and animated connecting line
- Skills matrix with interactive tech chips across 6 categories
- Education section (M.S. Computer Science, B.Tech ECE)
- Dark mode toggle with system preference detection
- Resume request modal with form validation and email delivery
- Contact section with email, phone, and LinkedIn

## Tech Stack

- **HTML5** — semantic page structure (`index.html`)
- **CSS3** — custom design system with CSS variables, dark mode, gradient animations, noise texture overlay, staggered reveal animations, responsive layout (`styles.css`)
- **Vanilla JavaScript (ES6+)** — typed text effect, counter animation, dark mode toggle, staggered scroll reveals, IntersectionObserver, active navigation (`script.js`)
- **GitHub Actions** — CI deployment
- **GitHub Pages** — static hosting

No frontend framework, by design — keeps the site fast, dependency-free, and simple to maintain.

## Project Structure

```text
.
├── .github/workflows/deploy-pages.yml
├── assets/social/
│   └── portfolio-thumbnail.png
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Visual Features

| Feature | Implementation |
|---------|---------------|
| Animated gradient headline | CSS `background-clip: text` with shifting gradient keyframes |
| Typed text effect | JavaScript character-by-character typing with phrase cycling |
| Counter animation | `requestAnimationFrame` with eased counting on scroll intersection |
| Dark mode | `data-theme` attribute with CSS variables, localStorage persistence, system preference fallback |
| Noise texture overlay | Inline SVG `feTurbulence` filter as CSS background |
| Staggered card reveals | `IntersectionObserver` + sequential `setTimeout` per child |
| Card hover effects | `translateY` + `box-shadow` + `border-color` transitions |
| Timeline pulse | CSS `@keyframes` ring animation on the current role dot |
| Tech chips | Mono-spaced pill components with accent background |
| Background blobs | Fixed radial gradients with opacity transitions between themes |

## Sections

1. **Hero** — value proposition, typed role titles, CTA buttons, animated counter metrics
2. **Achievements** — 4 cards: Technical Ownership, Performance at Scale, Engineering Standards, Mentorship
3. **Projects** — 3 detailed case studies: Developer Portal (full-width), Global App Platform, IBIS
4. **Experience** — timeline: Comcast (Sep 2020–Present), Tower Hill Insurance (Jan 2018–Sep 2020)
5. **Skills** — 6 categories with tech chips: Frontend, Backend & APIs, Databases, Cloud & DevOps, Testing & Quality, Practices & Tools
6. **Education** — M.S. Computer Science (NIU), B.Tech ECE (GITAM University)
7. **Contact** — email, phone, LinkedIn, resume request modal

## Run Locally

From project root:

```bash
npx serve -l 3000 .
```

Or:

```bash
python3 -m http.server 8000
```

Open `http://localhost:3000` (or `http://localhost:8000`).

## Deployment (GitHub Pages + GitHub Actions)

Workflow file: `.github/workflows/deploy-pages.yml`

- **Trigger:** push to `main` (and manual `workflow_dispatch`)
- **Steps:** checkout → configure Pages → upload artifact → deploy
- **Required setting:** GitHub repo → Settings → Pages → Source: GitHub Actions

Live at: `https://gvvskvarma.github.io/vishnu-portfolio/`

## Update Workflow

```bash
git add .
git commit -m "Describe the update"
git push origin main
```

GitHub Actions auto-deploys the new version.
