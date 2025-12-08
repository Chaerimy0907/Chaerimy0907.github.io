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

  const title = dataset.title || card.querySelector("h2")?.textContent || "";
  const team = dataset.team || "";
  const desc = dataset.desc || "";
  const skills = dataset.skills || "";
  const github = dataset.github || "";
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
      const card = e.target.closest(".project-card");
      if (!card) return;
      openModalFromCard(card);
    });
  }
});

// 키보드로 조작
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextProject();
  if (e.key === "ArrowLeft")  prevProject();
  if (e.key === "Escape")     closeModal();
});
