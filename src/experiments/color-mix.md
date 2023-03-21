---
title: 'color-mix'
description: The color-mix() functional notation takes two color values and returns the result of mixing them in a given colorspace by a given amount.
date: Created
tags:
  - experiments
  - css
layout: experiments
featured: true
---


<style>

  @supports (background: color-mix(in srgb, red 50%, blue)) {
    .supports-block {
      display: block;
    }
  }

  .supports-block {
    display: none;
  }

  .color-mix-block {
    max-width: 80ch;
    padding-block: 1.5rem;
    padding-inline: 1rem;
    border: 4px solid #010f0a;
    background-color: #010f0a;
    color: #ffffff;
  }

  .color-mix-block span {
    padding: 1rem;
  }

  .color-mix-list {
    list-style: none;
    padding-block: 1.85rem;
    margin: 0;
  }

  .color-mix-list li {
    margin-block-end: 0.5rem;
  }

  .color-mix {
    color: color-mix(in srgb, #bfc3ca var(--percentage, 100%), red);
    font-size: 1.85rem;
    font-weight: 700;
    font-family: 'Erode', sans-serif;
    padding-inline-start: 1.25rem;
  }

  .percentage-0 {
    --percentage: 0%;
  }

  .percentage-25 {
    --percentage: 25%;
  }

  .percentage-50 {
    --percentage: 50%;
  }

  .percentage-75 {
    --percentage: 75%;
  }

  .percentage-100 {
    --percentage: 100%;
  }

</style>

<div class="fyi-block fyi-block--warning fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)] supports-block">
  <span class="fl-text-step-2 heading">This setting needs to be enabled</span>
	<p>so enable it</p>
</div>

<div class="color-mix-block">
  <span class="heading h3">Color Mix Results</span>
  <ol class="color-mix-list">
    <li>
      <p class="color-mix percentage-0">Text at 0%</p>
    </li>
    <li>
      <p class="color-mix percentage-25">Text at 25%</p>
    </li>
    <li>
      <p class="color-mix percentage-50">Text at 50%</p>
    </li>
    <li>
      <p class="color-mix percentage-75">Text at 75%</p>
    </li>
    <li>
      <p class="color-mix percentage-100">Text at 100%</p>
    </li>
  </ol>
</div>