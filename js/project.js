// js/project.js

// 카드 목록
const cards = document.querySelectorAll(".project-card");
let currentIndex = 0; // 지금 가운데에 올 카드 인덱스

// 위치 적용 함수
function updateCards() {
  const last = cards.length - 1;
  const prev = (currentIndex - 1 + cards.length) % cards.length;
  const next = (currentIndex + 1) % cards.length;

  cards.forEach((card, idx) => {
    // 먼저 상태 초기화
    card.classList.remove("center", "left-side", "right-side");

    if (idx === currentIndex) {
      card.classList.add("center");        // 가운데 큰 카드
    } else if (idx === prev) {
      card.classList.add("left-side");     // 왼쪽에 살짝 보이는 카드
    } else if (idx === next) {
      card.classList.add("right-side");    // 오른쪽에 살짝 보이는 카드
    }
    // 나머지 카드가 더 생기면(4개 이상) 걔네는 아무 클래스도 안 가지게 됨
  });
}

// 오른쪽 화살표 → 다음 카드
function nextProject() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
}

// 왼쪽 화살표 → 이전 카드
function prevProject() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextProject();
  if (e.key === "ArrowLeft") prevProject();
});

// 페이지 처음 로드될 때 한 번 적용
document.addEventListener("DOMContentLoaded", updateCards);
