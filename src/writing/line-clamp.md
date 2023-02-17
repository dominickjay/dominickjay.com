---
title: 'Truncating text with line-clamp'
description: 'Hiding the overflow of content can sometimes work, but the line-clamp property can be more efficient, and look nicer!'
date: Created
tags:
  - css
  - writing
layout: post
links: []
---

Let's take a general card layout, we've all seen this before right? Standard image, heading and text content. I'm leaving out a link, because how that is placed is a _whole_ other thing.

<style>
  .card-example {
    width: fit-content;
    max-width: 50ch;
    height: fit-content;
    border: 2px solid black;
    margin-block: 20px;
  }

  .card-example--thin {
    max-width: 24ch;
  }

  .card-example--mh {
    height: 100%;
    max-height: 405px;
    overflow: hidden;
  }

  .card-grid {
    column-gap: 40px;
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

  .card-example .clamped {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<div class="card-example">
  <img src='http://placeskull.com/550/350' alt='' width="550" height="350" />
  <div class="flow">
    <h3 class="heading">Card heading</h3>
    <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit.</p>
  </div>
</div>

You've got the markup done to the design, but haven't accounted for the huge amount of text that the client will undoubtedly drop into only _some_ of them.

<div class="flex flex-wrap card-grid">
  <div class="card-example card-example--thin">
    <img src='http://placeskull.com/550/350' alt=''/>
    <div class="flow">
      <h3 class="heading">Card heading</h3>
      <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit. Lorem labore magna.</p>
    </div>
  </div>
  <div class="card-example card-example--thin">
    <img src='http://placeskull.com/550/350' alt=''/>
    <div class="flow">
      <h3 class="heading">Card heading</h3>
      <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit. Lorem labore magna.</p>
    </div>
  </div>
  <div class="card-example card-example--thin">
    <img src='http://placeskull.com/550/350' alt=''/>
    <div class="flow">
      <h3 class="heading">Card heading</h3>
      <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit. Lorem labore magna.</p>
    </div>
  </div>
</div>

Yuck. So we need to trim it down, make it look a bit more visually pleasing to the user right? We could just add a `max-height` to the cards, with an `overflow: hidden` on the `p` tag....maybe?

<div class="card-example card-example--mh">
  <img src='http://placeskull.com/550/350' alt='' width="550" height="350" />
  <div class="flow">
    <h3 class="heading">Card heading</h3>
    <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit.</p>
  </div>
</div>

Well that looks terrible, and also ignores any padding that might around the content (hint: there is.). We need to be able to trim the text off nicely. Which is where `line-clamp` comes in. Hooray!

Using this property allows any text to be cut off, with the end of the visible text be replaced with an ellipses.
