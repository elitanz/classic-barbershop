// Classic Barbershop — nav, mobile menu, scroll reveal

const SCROLL_SOLID_THRESHOLD = 40;
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function updateNav() {
  nav.classList.toggle("solid", window.scrollY > SCROLL_SOLID_THRESHOLD);
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", link.getAttribute("href"));
    }
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add("visible", "instant");
  } else {
    revealObserver.observe(el);
  }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => console.error("Image failed to load:", img.src));
});
