// project.js

let currentIndex = 0;
const cards = document.querySelectorAll(".project-card");

function updateCards() {
  const last = cards.length - 1;
  const prev = (currentIndex - 1 + cards.length) % cards.length;
  const next = (currentIndex + 1) % cards.length;

  cards.forEach((card, idx) => {
    card.classList.remove("center", "left-side", "right-side");
    if (idx === currentIndex) {
      card.classList.add("center");
    } else if (idx === prev) {
      card.classList.add("left-side");
    } else if (idx === next) {
      card.classList.add("right-side");
    }
  });
}

function nextProject() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
}

function prevProject() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
}

// 처음 로드될 때 상태 한 번 맞추기
updateCards();
