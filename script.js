/* ===== Dark Mode Toggle ===== */
const themeToggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;
const applyTheme = (theme) => {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
/* ===== Typed Text Effect ===== */
const typedEl = document.getElementById("typed-eyebrow");
const typedPhrases = [
  "Senior Full-Stack Engineer",
  "Platform Builder",
  "Design System Engineer",
  "Performance Engineer",
  "Engineering Leader",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 60;
const deleteSpeed = 35;
const pauseAfterType = 2000;
const pauseAfterDelete = 400;
const typeEffect = () => {
  if (!typedEl) return;
  const currentPhrase = typedPhrases[phraseIndex];
  if (!isDeleting) {
    charIndex++;
    typedEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseAfterType);
      return;
    }
    setTimeout(typeEffect, typeSpeed);
  } else {
    charIndex--;
    typedEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      setTimeout(typeEffect, pauseAfterDelete);
      return;
    }
    setTimeout(typeEffect, deleteSpeed);
  }
};
if (typedEl) {
  const cursor = document.createElement("span");
  cursor.className = "typed-cursor";
  typedEl.after(cursor);
  setTimeout(typeEffect, 600);
}
/* ===== Counter Animation ===== */
const counterEls = document.querySelectorAll("[data-count]");
const animateCounter = (el) => {
  const target = parseInt(el.getAttribute("data-count"), 10);
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1800;
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);
counterEls.forEach((el) => counterObserver.observe(el));
/* ===== Scroll Reveal ===== */
const revealTargets = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      const staggerChildren = entry.target.querySelectorAll("[data-reveal-stagger]");
      staggerChildren.forEach((child, i) => {
        setTimeout(() => {
          child.classList.add("is-visible");
        }, i * 100);
      });
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealTargets.forEach((target) => revealObserver.observe(target));
/* Hero stagger items (not inside a data-reveal parent) */
const heroStagger = document.querySelectorAll(".hero [data-reveal-stagger]");
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const items = document.querySelectorAll(".hero [data-reveal-stagger]");
      items.forEach((child, i) => {
        setTimeout(() => child.classList.add("is-visible"), i * 120);
      });
      heroObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);
if (heroStagger.length > 0) {
  heroObserver.observe(heroStagger[0]);
}
/* ===== Mobile Hamburger Menu ===== */
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-open");
    primaryNav.classList.toggle("is-open");
  });
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      primaryNav.classList.remove("is-open");
    });
  });
}
/* ===== Active Navigation ===== */
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
    link.classList.toggle("is-active", isActive);
    link.style.color = isActive ? "var(--primary)" : "";
  });
};
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);
/* ===== Back to Top ===== */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  const toggleBackToTop = () => {
    const show = window.scrollY > 600;
    backToTop.hidden = !show;
    backToTop.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* ===== Resume Modal ===== */
const resumeModal = document.getElementById("resume-modal");
const resumeOpenButtons = document.querySelectorAll("[data-open-resume-modal]");
const resumeCloseButtons = document.querySelectorAll("[data-close-resume-modal]");
const resumeNextInput = document.getElementById("resume-next-url");
const resumeForm = document.getElementById("resume-request-form");
const resumeSuccess = document.getElementById("resume-success");
const firstResumeInput = document.getElementById("requester-name");
const resumeFormBanner = document.getElementById("resume-form-banner");
const getValidationMessage = (field) => {
  if (!field) return "Quick check: a required field is missing.";
  if (field.id === "requester-name") {
    return "Quick check: please share your name so I know who to send the resume to.";
  }
  if (field.id === "requester-email") {
    if (field.validity.typeMismatch) {
      return "The email looks slightly off. One valid email address and we are good to go.";
    }
    return "I need your email to deliver the resume. Telepathy is still in beta.";
  }
  if (field.id === "requester-company") {
    return "Please add your company name so I can route this request properly.";
  }
  if (field.id === "requester-role") {
    return "Please include the role title. It helps me send the most relevant resume version.";
  }
  return `Quick check: the ${field.name || "required"} field needs attention.`;
};
const setFormBanner = (message) => {
  if (!resumeFormBanner) return;
  resumeFormBanner.textContent = message;
  resumeFormBanner.hidden = false;
};
const clearFormBanner = () => {
  if (!resumeFormBanner) return;
  resumeFormBanner.hidden = true;
  resumeFormBanner.textContent = "";
};
const clearFieldMisses = () => {
  if (!resumeForm) return;
  resumeForm.querySelectorAll(".field-missed").forEach((el) => {
    el.classList.remove("field-missed");
    el.removeAttribute("aria-invalid");
  });
};
const openResumeModal = () => {
  if (!resumeModal) return;
  resumeModal.hidden = false;
  document.body.style.overflow = "hidden";
  clearFormBanner();
  clearFieldMisses();
  if (firstResumeInput) firstResumeInput.focus();
};
const closeResumeModal = () => {
  if (!resumeModal) return;
  resumeModal.hidden = true;
  document.body.style.overflow = "";
};
resumeOpenButtons.forEach((btn) => {
  btn.addEventListener("click", openResumeModal);
});
resumeCloseButtons.forEach((btn) => {
  btn.addEventListener("click", closeResumeModal);
});
if (resumeModal) {
  resumeModal.addEventListener("click", (event) => {
    if (event.target === resumeModal) closeResumeModal();
  });
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeResumeModal();
});
if (resumeNextInput) {
  const cleanUrl = `${window.location.origin}${window.location.pathname}?resume=requested`;
  resumeNextInput.value = cleanUrl;
}
if (resumeForm) {
  resumeForm.addEventListener("submit", (event) => {
    clearFieldMisses();
    clearFormBanner();
    if (!resumeForm.checkValidity()) {
      event.preventDefault();
      resumeForm.reportValidity();
      const firstInvalidField = resumeForm.querySelector(":invalid");
      if (firstInvalidField) {
        firstInvalidField.classList.add("field-missed");
        firstInvalidField.setAttribute("aria-invalid", "true");
        setFormBanner(getValidationMessage(firstInvalidField));
      }
      return;
    }
    closeResumeModal();
  });
  resumeForm
    .querySelectorAll("input, textarea")
    .forEach((field) => {
      field.addEventListener("input", () => {
        if (field.validity.valid) {
          field.classList.remove("field-missed");
          field.removeAttribute("aria-invalid");
        }
      });
    });
}
const params = new URLSearchParams(window.location.search);
if (params.get("resume") === "requested" && resumeSuccess) {
  resumeSuccess.hidden = false;
  history.replaceState({}, "", window.location.pathname);
}

/* ===== Card tilt on hover =====
   The tilt transform is driven by JS per animation frame, so we do NOT
   put a CSS transition on `transform` while the cursor is over the card
   (that fights the rAF updates and produces a jiggery feel). The smooth
   snap-back on mouseleave is opt-in via the `.is-untilting` class.
   Skipped entirely on touch / no-hover devices and when the user prefers
   reduced motion. */
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const tiltEnabled = () => !motionQuery.matches && hoverQuery.matches;

const TILT_MAX = 5; /* degrees — subtle enough to read as polish, not a parlor trick */
const tiltCards = document.querySelectorAll(".card");
tiltCards.forEach((card) => {
  let raf = 0;
  let untiltTimer = 0;
  const onEnter = () => {
    if (!tiltEnabled()) return;
    clearTimeout(untiltTimer);
    card.classList.remove("is-untilting");
  };
  const onMove = (event) => {
    if (!tiltEnabled()) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * TILT_MAX * 2;
    const ry = (px - 0.5) * TILT_MAX * 2;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf);
    card.classList.add("is-untilting");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    /* Drop the class after the ease completes so the next hover is clean. */
    untiltTimer = window.setTimeout(() => {
      card.classList.remove("is-untilting");
    }, 500);
  };
  card.addEventListener("mouseenter", onEnter);
  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);
});
