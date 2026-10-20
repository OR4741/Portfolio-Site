const topButton = document.querySelector(".top-button");
const cover = document.querySelector(".cover");
const scrollNav = document.querySelector(".scroll-nav");
const contentsNavs = [...document.querySelectorAll(".contents-nav")];
const chapterSections = [...document.querySelectorAll(".chapter[id]")];
const scrollNavLinks = [...scrollNav.querySelectorAll(".chapter-link")];
const greetingGuide = document.querySelector(".cover-guide--greeting");

function updateTopButton() {
  topButton.classList.toggle("is-visible", window.scrollY > 600);
}

async function revealPortfolio() {
  const lineDrawn = new Promise((resolve) => {
    greetingGuide.addEventListener("animationend", resolve, { once: true });
  });

  await Promise.all([document.fonts.ready, lineDrawn]);
  document.querySelector("main").inert = false;
  document.documentElement.classList.remove("is-loading");
}

document.querySelector("main").inert = true;
revealPortfolio();

function updateScrollNav() {
  const isVisible = cover.getBoundingClientRect().bottom <= 0;
  scrollNav.classList.toggle("is-visible", isVisible);
  scrollNav.setAttribute("aria-hidden", String(!isVisible));
  scrollNav.inert = !isVisible;
}

function updateActiveChapter() {
  const activationLine = window.innerHeight * 0.35;
  let activeSection = null;

  for (const [index, contentsNav] of contentsNavs.entries()) {
    if (contentsNav.getBoundingClientRect().top > activationLine) break;
    activeSection = chapterSections[index];
  }

  for (const link of scrollNavLinks) {
    link.classList.toggle("is-active", link.hash === `#${activeSection?.id}`);
  }
}

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  updateTopButton();
  updateScrollNav();
  updateActiveChapter();
}, { passive: true });
window.addEventListener("resize", updateActiveChapter);
updateTopButton();
updateScrollNav();
updateActiveChapter();
