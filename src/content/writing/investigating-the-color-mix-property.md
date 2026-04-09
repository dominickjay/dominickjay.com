---
title: 'Investigating the color-mix property'
description: ""
intro: ""
pubDate: '2025-02-10'
tags:
  - css
draft: true
growth: seedling
supported: bcd.css["types"].color.color-mix.__compat
---
<style>

  .breakdown {
    display: flex;
    padding: 10px 16px;
    width: fit-content;
    height: fit-content;
    border: 1px solid var(--color-dark);
    margin-block: 20px;
    font-family: var(--font-mono);
  }

  .breakdown span {
    margin-inline: 5px;
    padding-inline: 5px;
  }

  .breakdown .colorspace {
    background-color: color-mix(in srgb, #e63946 60%, white);
  }

  .breakdown .from-color {
    background-color: color-mix(in srgb, #ff5f1f 60%, white);
  }

  .breakdown .to-color {
    background-color: color-mix(in srgb, #0ba95b 60%, white);
  }

  .breakdown .percentage {
    background-color: color-mix(in srgb, #f38ba3 60%, white);
  }

</style>

The `color-mix()` function takes two color values into it, and passes back a mix of the two in a colorspace by a certain amount. Like our own B&Q (Home Depot for an American equivalent...maybe) paint mixing service, or kids loose with a bunch of paintbrushes and neon paint. So altogether, it takes 2 color values but also a percentage parameter as well, for example: `background-color: color-mix(in srgb, #34c9eb 40%, white)`.

<div class="breakdown">background-color: color-mix(in <span class="colorspace">srgb</span>, <span class="from-color">#34c9eb</span> <span class="percentage">40%</span>, <span class="to-color">white</span>)</div>

There's also quite a list of available colorspace options; `srgb`, `srgb-linear`, `lab`, `oklab`, `xyz`, `xyz-d50`, `xyz-d65`, `hsl`, `hwb`, `lch`, `oklch`. There is no default, and I have **no** idea what half of these are.

### What does it look like?

<style>

.color-mix-block {
  max-width: 80ch;
  padding-block: 2rem;
  padding-inline: 2rem;
  border: 1px solid var(--color-dark);
}

.color-mix-block ol {
  list-style: none;
  padding-inline-start: 0;
}

.color-mix-block li {
	list-style: none;
}

.color-mix {
  color: color-mix(in srgb, #16123f var(--percentage, 100%), white);
  font-size: 1.85rem;
  font-weight: 700;
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

<div class="color-mix-block gradient-background">
  <ol class="color-mix-block-list">
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
