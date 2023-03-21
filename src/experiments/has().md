---
title: 'has()'
description: The functional :has() CSS pseudo-class represents an element if any of the relative selectors that are passed as an argument match at least one element when anchored against this element. This pseudo-class presents a way of selecting a parent element or a previous sibling element with respect to a reference element by taking a relative selector list as an argument.
date: Created
tags:
  - experiments
  - css
---

<style>
  .main-container {
    width: clamp(16rem,93vw,75rem);
    margin: 0 auto;
    padding-bottom: 40px;
    position: relative;
  }

  .has-grid {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 1rem;
    place-content: center;
  }

  @media (max-width: 768px) {
    .has-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .cell {
    grid-column: span 2/span 2;
    overflow: hidden;
    background: black;
  }

  .cell img {
    width: 100%;
    transition: .65s cubic-bezier(0.680, -0.550, 0.265, 1.550) all;
  }

  .has-grid:has( > *:hover ) > *:not(:hover) img {
    filter: blur(4px);
    transform: scale(0.85);
  }

  .attribute {
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    margin-inline: auto;
    text-align: center;
    max-width: 750px;
    font-family: 'Erode', sans-serif;
  }

  .attribute a {
    font-weight: 500;
  }

  .helpful-hint {
    margin-block: 40px;
    font-size: 1.85rem;
    text-align: center;
    font-family: 'Erode', sans-serif;
  }
</style>

<div class="main-container">
	<p class="helpful-hint heading">Hover the skull images to see the effect</p>
	<div class="has-grid">
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
	</div>
  <p class="attribute heading">Skull images from <a href="placeskull.com">placeskull.com</a></p>
</div>