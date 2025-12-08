// js/project.js

let cards;          // 카드 목록
let currentIndex = 0; // 가운데 큰 카드의 인덱스

function updateCards() {
  const len = cards.length;
  if (len === 0) return;

  const leftIndex  = (currentIndex - 1 + len) % len; // 왼쪽 작은 카드
  const rightIndex = (currentIndex + 1) % len;       // 오른쪽 작은 카드

  cards.forEach((card, idx) => {
    // 먼저 전부 리셋
    card.classList.remove("center", "left-side", "right-side", "hidden");

    if (idx === currentIndex) {
      // 가운데 큰 카드
      card.classList.add("center");
    } else if (idx === leftIndex) {
      // 왼쪽에 살짝 보이는 카드
      card.classList.add("left-side");
    } else if (idx === rightIndex) {
      // 오른쪽에 살짝 보이는 카드
      card.classList.add("right-side");
    } else {
      // 그 외 카드들은 화면에서 숨김
      card.classList.add("hidden");
    }
  });
}

function nextProject() {
  const len = cards.length;
  if (len === 0) return;
  currentIndex = (currentIndex + 1) % len;
  updateCards();
}

function prevProject() {
  const len = cards.length;
  if (len === 0) return;
  currentIndex = (currentIndex - 1 + len) % len;
  updateCards();
}

// 페이지 로드 후 DOM 준비되면 실행
document.addEventListener("DOMContentLoaded", () => {
  cards = document.querySelectorAll(".project-card");
  currentIndex = 0; // 처음에는 0번(메인 프로젝트)을 가운데로
  updateCards();
});

// (선택) 키보드로도 조작하고 싶으면 같이 사용
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextProject();
  if (e.key === "ArrowLeft") prevProject();
});
