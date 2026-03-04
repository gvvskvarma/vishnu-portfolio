const revealTargets = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((target) => observer.observe(target));

const navLinks = document.querySelectorAll("header nav a");
const sections = [...document.querySelectorAll("main section[id]")];

const updateActiveNav = () => {
  const y = window.scrollY + 130;
  let activeId = "";

  for (const section of sections) {
    if (y >= section.offsetTop) activeId = section.id;
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.style.color = isActive ? "var(--primary)" : "var(--muted)";
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);
