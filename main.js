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
// Featured 01–04 / 05–08 切换
const featuredToggle = document.getElementById("featured-toggle");
const featuredImages = document.querySelectorAll(".featured-image");

let showingSecondFeaturedGroup = false;

const featuredGroup1 = [
  "assets/featured/featured-01.jpg",
  "assets/featured/featured-02.jpg",
  "assets/featured/featured-03.jpg",
  "assets/featured/featured-04.jpg"
];

const featuredGroup2 = [
  "assets/featured/featured-05.jpg",
  "assets/featured/featured-06.jpg",
  "assets/featured/featured-07.jpg",
  "assets/featured/featured-08.jpg"
];

let featuredSwitching = false;

if (featuredToggle && featuredImages.length === 4) {
  featuredToggle.addEventListener("click", () => {
    if (featuredSwitching) return;

    featuredSwitching = true;

    showingSecondFeaturedGroup = !showingSecondFeaturedGroup;

    const activeGroup = showingSecondFeaturedGroup
      ? featuredGroup2
      : featuredGroup1;

    let finishedCount = 0;

    featuredImages.forEach((img, index) => {
      const nextImg = new Image();

      nextImg.src = activeGroup[index];
      nextImg.className = "featured-image featured-image-next";

      const card = img.closest(".featured-card");

      nextImg.onload = () => {
        card.appendChild(nextImg);

        // 强制浏览器先显示 opacity: 0
        nextImg.getBoundingClientRect();

        // 新图片慢慢覆盖旧图片
        nextImg.style.opacity = "1";

        setTimeout(() => {
          // 此时新图片已经完全盖住旧图片
          img.src = activeGroup[index];

          const finishSwap = () => {
            if (nextImg.parentNode) {
              nextImg.remove();
            }

            finishedCount++;

            if (finishedCount === featuredImages.length) {
              featuredSwitching = false;
            }
          };

          if (img.complete) {
            finishSwap();
          } else {
            img.onload = finishSwap;
          }
        }, 800);
      };
    });

    featuredToggle.textContent = showingSecondFeaturedGroup
      ? "戻る ←"
      : "すべて見る →";
  });
}
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