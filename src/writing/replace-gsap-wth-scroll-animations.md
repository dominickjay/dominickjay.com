---
title: 'Replacing GSAP with Scroll Animations'
description: ""
intro: ""
published: Created
updated: Last Modified
tags:
  - css
  - javascript
  - writing
layout: post
draft: true
links:
  [
    {
      'title': 'Animating CSS Grid (How To + Examples)',
      'target': 'https://css-tricks.com/animating-css-grid-how-to-examples/',
    },
  ]
#eleventyExcludeFromCollections: true
---


I was interested in picking up some new CSS tricks, and there’s been a lot of talk recently about scroll driven animations. Feeling inspired during a weekend away, I dug around on Codepen for some and came across this pen from [Ryan Mulligan](https://ryanmulligan.dev/) (hexagoncircle)

<p class="codepen" data-height="600" data-theme-id="light" data-default-tab="result" data-slug-hash="gOPMwvd" data-user="hexagoncircle" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hexagoncircle/pen/gOPMwvd">
  ScrollTrigger - Highlight Text</a> by Ryan Mulligan (<a href="https://codepen.io/hexagoncircle">@hexagoncircle</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

After playing around with it and digging into the source code, pretty instantly found out it was a GSAP demo rather than scroll driven animations. Ah well, it's still lovely, and this post is in **no** way assuming that I can do one better. But then I wondered how tricky it would be to take this original demo and refactor it to not depend on the GSAP library anymore, and instead bring in those sweet scroll driven animations that I was so keen to figure out.

{% imagePlaceholder "./src/assets/images/posts/caniuse-animation-timeline.png", "A screenshot from caniuse showing support for animation-timeline as of November, 2023", "Support for color-mix from caniuse as of November, 2023", "(min-width: 30em) 25vw, 25vw" %}

## The original

Let's start by breaking down Ryan's demo a bit. There’s very little functional magic actually in the HTML - although it's very pretty markup! We've got a header element containing options; dark mode & some underlining styles (background, underlined etc). The bulk of the content is in a main element, as expected, with some content wrapped in a mark element with a class of text-highlight. Easy stuff, apart from…what’s a mark element and what’s the point of it semantically?

> The **`<mark>`** [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) element represents text which is **marked** or **highlighted** for reference or notation purposes due to the marked passage's relevance in the enclosing context.
>

So, to rip a use case out of the mdn docs;

**“When used in a quotation (`[<q>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)`) or block quote (`[<blockquote>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)`), it generally indicates text which is of special interest but is not marked in the original source material, or material which needs special scrutiny even though the original author didn't think it was of particular importance. Think of this like using a highlighter pen in a book to mark passages that you find of interest.”**

Pretty interesting, that’s one for the next project if needs be then.


<div class="pull-quote pull-quote--right">

  bulk of the content is in a main element, as expected, with some content wrapped in a mark element with a class of text-highlight. Easy stuff, apart from…what’s a mark element

</div>

Outside of the setup, the real meat of the demo comes from the styles for the various animations on scroll. For the purpose of keeping this focused, those styles increase the size of a background color across the element, that being setup as a pseudo-underline rather than using ‘text-decoration: underline’. The dropdown values are used as part of an attribute on the `body` element, which allows us to style it like this;

```css
:root {
  --bg-color-highlight: hsl(60, 90%, 50%);
}

.dark-mode {
  --bg-color-highlight: hsl(238, 70%, 40%);
}

[data-highlight="background"] & {
  background-image: linear-gradient(
    var(--bg-color-highlight),
    var(--bg-color-highlight)
  );
}

[data-highlight="half"] & {
  --line-size: 0.5em;
  background-image: linear-gradient(
    transparent calc(100% - var(--line-size)),
    var(--bg-color-highlight) var(--line-size)
  );
}

[data-highlight="underline"] & {
  --line-size: 0.15em;
  background-image: linear-gradient(
    transparent calc(100% - var(--line-size)),
    var(--color-text) var(--line-size)
  );
}
```

On the Javascript side, we've got the event listeners for the dropdown change and the dark-mode. Excluding them, we’re left with this chunk of GSAP.

```jsx

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".text-highlight").forEach((highlight) => {
  ScrollTrigger.create({
    trigger: highlight,
    start: "-100px center",
    onEnter: () => highlight.classList.add("active")
  });
});
```

To my understanding, this block does this;

- Registers the [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) plugin
- Uses GSAP's `toArray` function, to create an array of elements that has the `text-highlight` class on them
- On each item in the array, a `ScrollTrigger` that;
  - Uses the element as the trigger here, so each element will have its animation triggered independently from each other.
  - Starts the animation when it’s -100px from the center of the viewport.
  - Has a callback function ‘onEnter’ that adds an active class to that specific element.

So effectively, you scroll and as each mark element gets *just* 🤏 beyond the center of the viewport, the active class gets applied and BAM that sweet animation goes off. Nice! This is a real cool demo and looks ace. So let’s rip it down and rebuild it.

## The rework

The most notable thing here is that by using CSS scroll driven animations you can ditch a whole bunch of JS. That GSAP library? Out the window, saving KBs in the process. Let’s keep the dark mode/css options though in our rebuild.

```js
const highlight = document.getElementById("highlight-style");
const mode = document.getElementById("mode");

const setHighlightStyle = (value) =>
  document.body.setAttribute("data-highlight", value);

mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);

highlight.addEventListener("change", (e) => setHighlightStyle(e.target.value));

setHighlightStyle(highlight.value);

```

For the HTML nothing needs to change here for this, which is great. Thanks Ryan!

The CSS - given how we’re relying on it more now without the Javascript providing the animations - needs some tweaking. To the mark element that has the `text-highlight` class, we can add this:

```css
@keyframes highlight {
  to {
    color: var(--color-text-highlight);
    background-size: 100% 100%;
  }
}

@supports (animation-range: cover) {
  .text-highlight {
    view-timeline-name: --highlight;
    animation: highlight linear both;
    animation-timeline: --highlight;
  }
}
```

and remove this, as we're no longer adding an `active` class to any elements:

```css
  &.active {
    color: var(--color-text-highlight);
    background-size: 100% 100%;
  }
```

<div class="pull-quote pull-quote--left">

  by using CSS scroll driven animations you can ditch a whole bunch of JS. That GSAP library? Out the window, saving KBs in the process

</div>

90% of the way there I reckon. This starts the underlining/highlighting animation the moment the element comes into view, which isn’t exactly what we want here. Instead, we need it to trigger -100px from the center or, *at the very least,* the center itself. Scanning the docs it looks like this we could do this - `animation-range: entry 0% entry 100%;` - but that seems like it starts it way too soon. A great tool to work with for finding out the correct values here is [https://scroll-driven-animations.style](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=cover&range-start-percentage=0&range-end-name=cover&range-end-percentage=50&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes), a super helpful visualizer for this. Tinkering around with it, we can change `animation-range: entry 0% entry 100%;` to `animation-range: cover 0% cover 60%`, so the highlighting effect starts when it appears in the bottom of the viewport, and finishes when it's 60% of the way up the screen.

Bingo.

<p class="codepen" data-height="600" data-theme-id="light" data-default-tab="result" data-slug-hash="ExrEdLX" data-user="dominickjay217" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/dominickjay217/pen/ExrEdLX">
  Scroll driven animations - Highlight Text</a> by Dom Jay (<a href="https://codepen.io/dominickjay217">@dominickjay217</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Resources

[https://scroll-driven-animations.style/](https://scroll-driven-animations.style/)
[https://developer.chrome.com/articles/scroll-driven-animations](https://developer.chrome.com/articles/scroll-driven-animations/)
[https://codepen.io/hexagoncircle/pen/gOPMwvd](https://codepen.io/hexagoncircle/pen/gOPMwvd)
[https://codepen.io/dominickjay217/pen/ExrEdLX](https://codepen.io/dominickjay217/pen/ExrEdLX)
[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
[https://gsap.com/docs/v3/Plugins/ScrollTrigger/](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
[https://scroll-driven-animations.style](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=cover&range-start-percentage=0&range-end-name=cover&range-end-percentage=50&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes)
[https://ryanmulligan.dev/](https://ryanmulligan.dev/)
