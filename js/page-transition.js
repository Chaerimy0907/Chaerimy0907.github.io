document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-fade-in");

  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http")
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || link.target === "_blank") {
        return;
      }

      e.preventDefault();

      const url = link.href;

      // 페이드 아웃 클래스 추가
      document.body.classList.remove("page-fade-in");
      document.body.classList.add("page-fade-out");

      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  });
});
