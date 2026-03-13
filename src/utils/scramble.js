const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%·—";
const FRAMES = 14;
const INTERVAL_MS = 38;

/**
 * Scrambles an element's text content, resolving
 * character by character back to the original.
 * Reads the target text from data-scramble-text or textContent.
 *
 * @param {HTMLElement} el
 */
export function scramble(el) {
  if (el._busy) return;
  el._busy = true;

  const original =
    el.dataset.scramble ??
    (el.dataset.scramble = el.textContent ?? "");

  // Reserve exactly the space the word already occupies
  el.style.display = "inline-block";
  el.style.minWidth = el.offsetWidth + "px";

  let frame = 0;

  const id = setInterval(() => {
    el.textContent = [...original]
      .map((char, i) =>
        frame / FRAMES > i / original.length
          ? char
          : CHARS[Math.floor(Math.random() * CHARS.length)]
      )
      .join("");

    if (++frame > FRAMES) {
      clearInterval(id);
      el.textContent = original;
      el.style.minWidth = "";
      el._busy = false;
    }
  }, INTERVAL_MS);
}

/**
 * Wires up scramble behaviour on all elements with [data-scramble].
 * - Runs once on load for elements inside [data-scramble-on-load]
 * - Runs on mouseenter for all [data-scramble] elements
 *
 * Call once after DOMContentLoaded.
 */
export function initScramble() {
  const targets = document.querySelectorAll("[data-scramble]");

  targets.forEach((el) => {
    el.addEventListener("mouseenter", () => scramble(el));
  });

  document
    .querySelectorAll("[data-scramble-on-load] [data-scramble]")
    .forEach((el) => scramble(el));
}
