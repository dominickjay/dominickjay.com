const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%·—";
const FRAMES = 14;
const INTERVAL_MS = 38;

/**
 * Scrambles an element's text content, resolving
 * character by character back to the original.
 * Reads the target text from data-scramble or textContent.
 *
 * @param {HTMLElement} el
 */
export function scramble(el) {
  if (el._busy) return;
  el._busy = true;
  const original =
    el.dataset.scramble ?? (el.dataset.scramble = el.textContent ?? "");

  let frame = 0;
  const id = setInterval(() => {
    el.textContent = [...original]
      .map((char, i) =>
        frame / FRAMES > i / original.length
          ? char
          : CHARS[Math.floor(Math.random() * CHARS.length)],
      )
      .join("");
    if (++frame > FRAMES) {
      clearInterval(id);
      el.textContent = original;
      el._busy = false;
    }
  }, INTERVAL_MS);
}

/**
 * Wires up scramble behaviour on all elements with [data-scramble].
 * - Locks container dimensions before any scramble runs to prevent
 *   layout reflow in Safari during animation.
 * - Runs once on load for elements inside [data-scramble-on-load]
 * - Runs on mouseenter for all [data-scramble] elements
 *
 * Call once after DOMContentLoaded.
 */
export function initScramble() {
  // Lock the container dimensions before any scramble runs.
  // A single offsetWidth read here prevents Safari from reflowing
  // the surrounding layout on every frame of the animation.
  document.querySelectorAll("[data-scramble]").forEach((container) => {
    container.style.width = container.offsetWidth + 60 + "px";
    // container.style.height = container.offsetHeight + "px";
  });

  const targets = document.querySelectorAll("[data-scramble]");
  targets.forEach((el) => {
    el.addEventListener("mouseenter", () => scramble(el));
    el.addEventListener("touchstart", () => scramble(el));
  });

  document
    .querySelectorAll("[data-scramble-on-load] [data-scramble]")
    .forEach((el) => scramble(el));
}
