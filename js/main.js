// Плавное появление блоков при скролле.
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }
}

// Лёгкая интерактивность: плавное открытие пунктов FAQ.
document.querySelectorAll(".faq__item").forEach((item) => {
  const summary = item.querySelector("summary");
  if (!summary) return;

  summary.addEventListener("click", (event) => {
    // Закрываем остальные пункты — аккордеон ведёт себя предсказуемо.
    if (!item.open) {
      document.querySelectorAll(".faq__item[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
    event.preventDefault();

    const content = item.querySelector("p");
    if (!content) {
      item.open = !item.open;
      return;
    }

    if (item.open) {
      const animateClose = content.animate(
        [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-6px)" }],
        { duration: 180, easing: "ease-in" }
      );
      animateClose.onfinish = () => {
        item.open = false;
      };
    } else {
      item.open = true;
      content.animate(
        [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 220, easing: "ease-out" }
      );
    }
  });
});
