---
title: 'Some color-mix title'
description: ""
intro: ""
date: Created
tags:
  - css
  - writing
layout: post
links:
  [
    {
      'title': 'Animating CSS Grid (How To + Examples)',
      'target': 'https://css-tricks.com/animating-css-grid-how-to-examples/',
    },
  ]
# eleventyExcludeFromCollections: true
---

<div class="fyi-block fyi-block--warning fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
	<p>Reader beware - this feature is experimental, and not supported in most browsers! There's a bit below that is going through support and how to set it up to use it. If you want to skip it, <a href="#skip-setup">here you go</a>.</p>
</div>

We're going to toe the line of browser support with this one, so as usual, let's check out the support first.

{% imagePlaceholder "./src/assets/images/posts/caniuse-color-mix.png", "A screenshot from caniuse showing support for color-mix as of March, 2023", "Support for color-mix from caniuse as of March, 2023", "(min-width: 30em) 25vw, 25vw" %}

Yuck, big thumbs down for support here. It's a new property, so roll out to browsers will take a while. Despite this, we *can* use it in Firefox and Safari - just needs a couple of things done first. It's also available for the latest version of Chrome (111-113+). Lets go through how to get it enabled in Firefox and Safari.

In Firefox, go to `about:config` and use the search bar to find `layout.css.color-mix.enabled`, click the toggle button on the far right to enable it. Done!

Likewise for Safari, you'll need [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) and head to the Develop tab->Experimental Features->CSS color-mix() and click it to enable it. Nice.

<strong id="skip-setup">So, after all that, what is it?</strong>

The **`color-mix()`** functional notation takes two `[color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)` values and returns the result of mixing them in a given colorspace by a given amount.

### how do I use it?

The `color-mix` property passes in 3 parameters; a colorspace, color and percentage e.g. `background-color: color-mix(in srgb, #34c9eb 40%, white)`

**Info**

Here is a full list of the available colorspace options; `srgb`, `srgb-linear`, `lab`, `oklab`, `xyz`, `xyz-d50`, `xyz-d65`, `hsl`, `hwb`, `lch`, `oklch`. There is no default.

### what does it look like?

<style>

.color-mix-block {
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 12;
  max-width: 80ch;
  padding-block: 2rem;
  padding-inline: 2rem;
  background-color: rgba(255, 95, 31, 0.85);
  border: 10px solid #010f0a;
}

.color-mix-block ol {
  list-style: none;
  margin-top: 2rem;
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

<div class="color-mix-block">
  <span class="h3 heading">Color Mix Results</span>
  <ol>
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