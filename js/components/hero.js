import { inView, animate } from "motion"

inView("hero", ({ target }) => {
  animate(
    target.querySelectorAll(".symbol-pattern"),
    { opacity: 1, transform: "none" },
    { delay: 0.2, duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
  );
});