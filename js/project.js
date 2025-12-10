// js/project.js

let cards;          // 카드 목록
let currentIndex = 0; // 가운데 큰 카드의 인덱스

let modal;
let modalTitle;
let modalTeam;
let modalDesc;
let modalSkillsList;
let modalGithub;
let modalImage;
let modalDetail;

function updateCards() {
  const len = cards.length;
  if (len === 0) return;

  const leftIndex  = (currentIndex - 1 + len) % len; // 왼쪽 작은 카드
  const rightIndex = (currentIndex + 1) % len;       // 오른쪽 작은 카드

  cards.forEach((card, idx) => {
    // 먼저 전부 리셋
    card.classList.remove("center", "left-side", "right-side", "hidden");

    card.style.order = 99;

    if (idx === currentIndex) {
      // 가운데 큰 카드
      card.classList.add("center");
      card.style.order = 1;
    } else if (idx === leftIndex) {
      // 왼쪽에 살짝 보이는 카드
      card.classList.add("left-side");
      card.style.order = 0;
    } else if (idx === rightIndex) {
      // 오른쪽에 살짝 보이는 카드
      card.classList.add("right-side");
      card.style.order = 2;
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

// modal
function openModalFromCard(card) {
  if (!card || !modal) return;

  const dataset = card.dataset || {};

  const title   = dataset.title || card.querySelector("h2")?.textContent || "";
  const team    = dataset.team || "";
  const desc    = dataset.desc || "";
  const skills  = dataset.skills || "";
  const github  = dataset.github || "";
  const detail  = dataset.detail || "";
  const bgImage = card.querySelector(".project-image")?.style.backgroundImage || "";

  modalTitle.textContent = title;
  modalTeam.textContent = team;
  modalDesc.textContent = desc || card.querySelector(".project-desc")?.textContent || "";

  modalSkillsList.innerHTML = "";
  if (skills) {
    skills
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line.replace(/^-+\s*/, "");
        modalSkillsList.appendChild(li);
      });
  }

  if (github) {
    modalGithub.href = github;
    modalGithub.style.display = "inline-flex";
  } else {
    modalGithub.href = "#";
    modalGithub.style.display = "none";
  }

  if (modalDetail) {
    if (detail) {
      modalDetail.href = detail;
      modalDetail.style.display = "inline-flex";
    } else {
      modalDetail.href = "#";
      modalDetail.style.display = "none";
    }
  }

  if(bgImage) {
    modalImage.style.backgroundImage = bgImage;
  } else {
    modalImage.style.backgroundImage = "none";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  if (!modal) return;
  modal.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  cards = document.querySelectorAll(".project-card");
  currentIndex = 0;
  updateCards();

  modal           = document.getElementById("project-modal");
  modalTitle      = document.getElementById("modal-title");
  modalTeam       = document.getElementById("modal-team");
  modalDesc       = document.getElementById("modal-desc");
  modalSkillsList = document.getElementById("modal-skills-list");
  modalGithub     = document.getElementById("modal-github");
  modalImage      = document.querySelector(".project-modal-image");
  modalDetail     = document.getElementById("modal-detail");

  const closeBtn = document.querySelector(".project-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  const track = document.querySelector(".project-track");
  if (track) {
    track.addEventListener("click", (e) => {

      const quickBtn = e.target.closest(".project-quick-btn");
      if (quickBtn) {
        const card = quickBtn.closest(".project-card");
        if (!card) return;

        e.stopPropagation();
        openModalFromCard(card);
        return;
      }

      const card = e.target.closest(".project-card");
      if (!card) return;

      const detail = card.dataset.detail;
      if (detail) {
        window.location.href = detail;
      }
    });
  }
});

// 키보드로 조작
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextProject();
  if (e.key === "ArrowLeft")  prevProject();
  if (e.key === "Escape")     closeModal();
});

// =====================================
// DEV 단계 이미지 클릭 → 확대 모달
// =====================================
document.addEventListener("DOMContentLoaded", function () {
  const imgModal   = document.getElementById("imageModal");
  const imgModalImg = document.getElementById("modalImage");
  const imgCloseBtn = document.querySelector(".image-modal-close");

  if (!imgModal || !imgModalImg || !imgCloseBtn) return; // 모달 없으면 종료

  // dev-step 안의 이미지 블럭들
  const medias = document.querySelectorAll(".dev-step-media");

  medias.forEach((el) => {
    el.style.cursor = "zoom-in";

    el.addEventListener("click", () => {
      // background-image: url("...") 문자열 읽기
      const bg = window.getComputedStyle(el).backgroundImage;
      if (!bg || bg === "none") return;

      // url("...") 앞뒤 "" 제거
      const imgUrl = bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");

      imgModalImg.src = imgUrl;
      imgModal.classList.remove("hidden");
    });
  });

  // X 버튼으로 닫기
  imgCloseBtn.addEventListener("click", () => {
    imgModal.classList.add("hidden");
  });

  // 어두운 배경 클릭해도 닫기
  imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) {
      imgModal.classList.add("hidden");
    }
  });
});