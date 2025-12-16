let currentEventIndex = 0;
let carouselTimer = null;

function renderEventsCarousel() {
  const track = document.getElementById("eventTrack");
  if (!track || !window.eventImages) return;

  track.innerHTML = "";

  window.eventImages.forEach((event) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const img = document.createElement("img");
    img.src = event.src;
    img.alt = event.title;

    const caption = document.createElement("div");
    caption.className = "carousel-caption";
    caption.innerHTML = `<strong>${event.title}</strong> · ${event.caption}`;

    slide.appendChild(img);
    slide.appendChild(caption);
    track.appendChild(slide);
  });
}

function updateCarouselPosition() {
  const track = document.getElementById("eventTrack");
  if (!track) return;

  const slidesCount = window.eventImages.length;
  if (currentEventIndex >= slidesCount) currentEventIndex = 0;
  if (currentEventIndex < 0) currentEventIndex = slidesCount - 1;

  const offset = -currentEventIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function startCarouselAutoPlay() {
  stopCarouselAutoPlay();
  carouselTimer = setInterval(() => {
    currentEventIndex++;
    updateCarouselPosition();
  }, 5000); // هر ۵ ثانیه
}

function stopCarouselAutoPlay() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function setupCarouselControls() {
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener("click", () => {
    currentEventIndex--;
    updateCarouselPosition();
    startCarouselAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    currentEventIndex++;
    updateCarouselPosition();
    startCarouselAutoPlay();
  });
}

window.initCarousel = function () {
  if (!window.eventImages || !window.eventImages.length) return;
  renderEventsCarousel();
  setupCarouselControls();
  updateCarouselPosition();
  startCarouselAutoPlay();
};
