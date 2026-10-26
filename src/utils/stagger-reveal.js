// Stagger reveal (post lists only; header nav handles its own)
export function initStaggerReveal() {
  document.querySelectorAll("main .feature-list").forEach((postList) => {
    const items = postList.querySelectorAll(".item");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = [...items].indexOf(e.target);
          setTimeout(() => e.target.classList.add("visible"), i * 26);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.05 },
    );
    items.forEach((el) => obs.observe(el));
  });
}
