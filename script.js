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
