const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");

const prevButton = document.getElementById("hero-prev");
const nextButton = document.getElementById("hero-next");

let currentSlide = 0;
let autoPlayTimer = null;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startAutoPlay() {
  stopAutoPlay();

  autoPlayTimer = setInterval(() => {
    nextSlide();
}, 2300);
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
}

nextButton.addEventListener("click", () => {
  nextSlide();
  startAutoPlay();
});

prevButton.addEventListener("click", () => {
  previousSlide();
  startAutoPlay();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number(dot.dataset.slide);

    showSlide(slideIndex);
    startAutoPlay();
  });
});

const heroSection = document.querySelector(".hero");

heroSection.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

heroSection.addEventListener("mouseleave", () => {
  startAutoPlay();
});

showSlide(0);
startAutoPlay();
// Featured 3 x 2 切换
const featuredToggle = document.getElementById("featured-toggle");
const featuredPages = document.querySelectorAll(".featured-page");

let featuredPageIndex = 0;

function showFeaturedPage(index) {
  featuredPages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });

  if (featuredToggle) {
    featuredToggle.textContent =
      index === 0 ? "次を見る →" : "← 前を見る";
  }
}

if (featuredToggle && featuredPages.length === 2) {
  featuredToggle.addEventListener("click", () => {
    featuredPageIndex = featuredPageIndex === 0 ? 1 : 0;
    showFeaturedPage(featuredPageIndex);
  });
}

showFeaturedPage(0);
// =========================
// MINI SHOWCASE
// 中间大图 + 两侧小图
// =========================

const miniShowcaseItems = document.querySelectorAll(
  ".mini-showcase-item"
);

const miniShowcasePrev = document.querySelector(
  ".mini-showcase-prev"
);

const miniShowcaseNext = document.querySelector(
  ".mini-showcase-next"
);

let miniShowcaseIndex = 0;
let miniShowcaseTimer = null;
let miniShowcasePaused = false;

function updateMiniShowcase() {
  const total = miniShowcaseItems.length;

  miniShowcaseItems.forEach((item) => {
    item.classList.remove(
      "is-active",
      "is-prev",
      "is-next",
      "is-prev-2",
      "is-next-2"
    );
  });

  const activeIndex = miniShowcaseIndex;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prev2Index = (activeIndex - 2 + total) % total;
  const next2Index = (activeIndex + 2) % total;

  miniShowcaseItems[activeIndex].classList.add("is-active");
  miniShowcaseItems[prevIndex].classList.add("is-prev");
  miniShowcaseItems[nextIndex].classList.add("is-next");
  miniShowcaseItems[prev2Index].classList.add("is-prev-2");
  miniShowcaseItems[next2Index].classList.add("is-next-2");
}

function nextMiniShowcase() {
  miniShowcaseIndex =
    (miniShowcaseIndex + 1) % miniShowcaseItems.length;

  updateMiniShowcase();
}

function previousMiniShowcase() {
  miniShowcaseIndex =
    (miniShowcaseIndex - 1 + miniShowcaseItems.length) %
    miniShowcaseItems.length;

  updateMiniShowcase();
}

function startMiniShowcase() {
  stopMiniShowcase();

  miniShowcaseTimer = setInterval(() => {
    if (!miniShowcasePaused) {
      nextMiniShowcase();
    }
  }, 2800);
}

function stopMiniShowcase() {
  if (miniShowcaseTimer) {
    clearInterval(miniShowcaseTimer);
    miniShowcaseTimer = null;
  }
}

if (miniShowcaseItems.length === 6) {
  updateMiniShowcase();
  startMiniShowcase();

  miniShowcaseNext?.addEventListener("click", () => {
    nextMiniShowcase();
    startMiniShowcase();
  });

  miniShowcasePrev?.addEventListener("click", () => {
    previousMiniShowcase();
    startMiniShowcase();
  });

  miniShowcaseItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index === miniShowcaseIndex) {
        miniShowcasePaused = !miniShowcasePaused;
        return;
      }

      miniShowcaseIndex = index;
      miniShowcasePaused = false;

      updateMiniShowcase();
      startMiniShowcase();
    });
  });
}