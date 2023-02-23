---
title: 'Truncating text with line-clamp'
description: 'Hiding the overflow of content can sometimes work, but the line-clamp property can be more efficient, and look nicer!'
intro: "There's a couple of different ways to nicely hide overflowing content, but using the `line-clamp` property is a great way forwards for it, so let's check it out."
date: Created
tags:
  - css
  - writing
layout: post
links:
  [
    {
      'title': 'Can I Use',
      'target': 'https://caniuse.com/?search=line-clamp',
    },
    {
      'title': 'line-clamp',
      'target': 'https://css-tricks.com/almanac/properties/l/line-clamp',
    },
  ]
---

Let's take a general card layout, we've all seen this before right? Standard image (provided by [placeskull.com](placeskull.com)), heading and text content. I'm leaving out a link, because how that is placed is a _whole_ other thing.

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

  .card-example--truncate {
    width: auto;
  }

  .card-example--truncate p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
      .card-example--mh {
        max-height: 375px;
      }
  }

  @media (max-width: 395px) {
      .card-example--mh {
        max-height: 335px;
      }
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

{% imagePlaceholder "./src/assets/images/posts/line-clamp-card-grid.png", "A row of cards with long content", "Our generic cards with longer than needed text on them." %}

Yuck. So we need to trim it down, make it look a bit more visually pleasing to the user right? We could just add a `max-height` to the cards, with an `overflow: hidden` on the `p` tag....maybe? Chuck in a few media queries to adjust for smaller screen sizes?

<div class="card-example card-example--mh">
  <img src='http://placeskull.com/550/350' alt='' width="550" height="350" />
  <div class="flow">
    <h3 class="heading">Card heading</h3>
    <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit.</p>
  </div>
</div>

Well that looks terrible, and also ignores any padding that might around the content (hint: there is). We need to be able to trim the text off nicely, which is where `line-clamp` comes in. Hooray!

Using this property allows any text to be cut off, with the end of the visible text be replaced with an ellipses. There's a few ways of doing this already _kind of_, using JS (there's even a handy (?) npm script to help [line-clamp](https://www.npmjs.com/package/line-clamp) ), [Clamp.js](https://github.com/josephschmitt/Clamp.js) or the `text-overflow` property, as shown below.

<div class="card-example card-example--truncate">
  <img src='http://placeskull.com/550/350' alt='' width="550" height="350" />
  <div class="flow">
    <h3 class="heading">Card heading</h3>
    <p>Laborum sint laborum nostrud est. Est exercitation et occaecat ut proident non voluptate et. Laborum non id voluptate tempor ea anim anim eu irure laborum velit labore ullamco. Non ipsum labore consequat adipisicing amet ut reprehenderit.</p>
  </div>
</div>

To break this down quickly, there's three properties being used to get this solution - `overflow: hidden`, `text-overflow: ellipsis` and `white-space: nowrap`. `white-space: nowrap` puts all the text on one line, disregarding the boundaries of the box, `text-overflow: ellipsis` puts the familiar '...' at the end of the text that is visible, and `overflow: hidden`...well...hides the overflow of the content. Due to this, it only works if you want one line of text, no more. Not ideal.

{% caniuse "css-line-clamp" %}

If you take a look at the above, currently `line-clamp` is supported in pretty much every major browser - except for that pesky IE - as long as we use it along with `display: -webkit-box` and a prefix of `-webkit-`. So we can use it like this:

```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
```

Let's throw this onto the `p` tag that's used here (could also be a modifier on the parent block class if you're familiar with BEM)

```css
.clamped, /* OR */
  .card-example--clamped p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

```html
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
```

We've got our `display: -webkit-box` that we need, and `-webkit-line-clamp: 3` to set how many lines we want to keep visible. We still need `overflow: hidden` otherwise we'll get a mix of a clamped line with an ellipses and also overflowing content. We've also got this mystery `-webkit-box-orient: vertical`, which I'm unfamiliar with - but it does appear to be deprecated and there's a recommendation to not use it. Hopefully in the future, ~when~ if this gets implemented properly, the `display: -webkit-box` and `-webkit-box-orient: vertical` can be dropped, as well as the prefix on `line-clamp`. But for now, let's take a final look at our card.

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

Sweet 🤘 - that's one client bug ticket in Trello that can go straight to Done.
