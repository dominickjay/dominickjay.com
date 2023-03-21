---
title: 'line-clamp'
description: The -webkit-line-clamp CSS property allows limiting of the contents of a block to the specified number of lines.
date: Created
tags:
  - experiments
  - css
layout: experiments
---

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

<style>
  .card-example {
    width: fit-content;
    max-width: 50ch;
    height: fit-content;
    border: 2px solid black;
    margin-block: 20px;
  }
  .card-example .flow {
    padding-inline: 25px;
    padding-block: 30px;
  }

  .card-example .flow > * + * {
    margin-block-start: 1.5rem;
  }

  .card-example h3 {
    font-size: 30px;
    font-weight: bold;
    margin-top: 0;
  }

  .card-example img {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .clamped, /* OR */
  .card-example--clamped p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<div class="card-example">
  <img src="http://placeskull.com/550/350" alt="" width="550" height="350" />
  <div class="flow">
    <h3 class="heading">Card heading</h3>
    <p class="clamped">
      Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident
      non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure
      laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet
      ut reprehenderit.
    </p>
  </div>
</div>

<p class="ciu_embed" data-feature="css-line-clamp" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <picture>
    <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/css-line-clamp.webp">
    <source type="image/png" srcset="https://caniuse.bitsofco.de/image/css-line-clamp.png">
    <img src="https://caniuse.bitsofco.de/image/css-line-clamp.jpg" alt="Data on support for the css-line-clamp feature across the major browsers from caniuse.com">
  </picture>
</p>
