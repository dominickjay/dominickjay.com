---
title: 'Investigating the color-mix property'
description: ""
intro: ""
pubDate: '2025-02-10'
tags:
  - css

draft: true
---
<style>

  .breakdown {
    display: flex;
    padding: 10px 16px;
    width: fit-content;
    height: fit-content;
    border: 2px solid black;
    margin-block: 20px;
    font-family: 'Erode', sans-serif;
  }

  .breakdown span {
    margin-inline: 5px;
    padding-inline: 5px;
  }

  .breakdown .colorspace {
    background-color: #e63946;
  }

  .breakdown .from-color {
    background-color: #ff5f1f;
  }

  .breakdown .to-color {
    background-color: #0ba95b;
  }

  .breakdown .percentage {
    background-color: #f38ba3;
  }

</style>

<div class="fyi-block fyi-block--warning fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
	<p>Reader beware - this feature is experimental, and not supported in most browsers! There's a bit below that is going through support and how to set it up to use it.</p>
</div>

We're going to toe the line of browser support with this one, so as usual, let's check out the support first.


{% imagePlaceholder "./src/assets/images/posts/caniuse-color-mix.png", "A screenshot from caniuse showing support for color-mix as of March, 2023", "Support for color-mix from caniuse as of March, 2023", "(min-width: 30em) 25vw, 25vw" %}

<div class="pull-quote pull-quote--left">

  It's a new property, so roll out to browsers will take a while. Despite this, we *can* use it in Firefox and Safari

</div>

Yuck, big thumbs down for support here. It's a new property, so roll out to browsers will take a while. Despite this, we *can* use it in Firefox and Safari - just needs a couple of things done first. It's also available for the latest version of Chrome (111-113+). Lets go through how to get it enabled in Firefox and Safari.

<details class="details">
  <summary>
    Enable it for Firefox
  </summary>
  <div> <!-- optional wrapper (for styling) -->

    In Firefox, go to `about:config` and use the search bar to find `layout.css.color-mix.enabled`, click the toggle button on the far right to enable it. Done!

  </div>
</details>

<details class="details">
  <summary>
    Enable it for Safari
  </summary>
  <div> <!-- optional wrapper (for styling) -->
    Likewise for Safari, you'll need <a href="https://developer.apple.com/safari/technology-preview">Safari Technology Preview</a> and head to the Develop tab->Experimental Features->CSS color-mix() and click it to enable it. Nice.
  </div>
</details>

Now we've got that enabled in the right places, we can start seeing the results when we use this in development.

The `color-mix()` function takes two color values into it, and passes back a mix of the two in a colorspace by a certain amount. Like our own B&Q (Home Depot for an American equivalent...maybe) paint mixing service, or kids loose with a bunch of paintbrushes and neon paint. So altogether, it takes 2 color values but also a percentage parameter as well, for example: `background-color: color-mix(in srgb, #34c9eb 40%, white)`.

<div class="breakdown">background-color: color-mix(in <span class="colorspace">srgb</span>, <span class="from-color">#34c9eb</span> <span class="percentage">40%</span>, <span class="to-color">white</span>)</div>

There's also quite a list of available colorspace options; `srgb`, `srgb-linear`, `lab`, `oklab`, `xyz`, `xyz-d50`, `xyz-d65`, `hsl`, `hwb`, `lch`, `oklch`. There is no default.

### what does it look like?

<style>

.color-mix-block {
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
