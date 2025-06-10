---
title: 'Enhancing a headline with pseudo-elements'
description: "I've had this demo kicking around in the dusty corners of my Codepen account for a while, let's see how it's put together"
intro: ""
pubDate: 'February 10 2025'
tags:
  - css

draft: true
---

<link
  rel="preload"
  href="/fonts/Poppins-Bold.woff"
  as="font"
  type="font/woff"
  crossorigin
/>

## Where we are currently with this

As you can see below, this is our final piece, we've only (currently) got 2 `p` tags - one for each line. Refreshing my memory on this piece as I write it, it looks like it's split across 2 lines (and two `p` tags) as we won't be able to wrap it particularly well as one line. Let's see if we can improve that and make it a bit nicer semantically.

<p class="codepen" data-height="401.35418701171875" data-theme-id="light" data-default-tab="result" data-slug-hash="oNwyrKd" data-user="dominickjay217" style="height: 401.35418701171875px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/dominickjay217/pen/oNwyrKd">
  Pseudo elements with opacity and positioning</a> by Dom Jay (<a href="https://codepen.io/dominickjay217">@dominickjay217</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Now

So we're going to start with our main bit of content, right? Without that, the whole things kind of pointless!

```<p>leave it better than you found it</p>```

<p data-text="leave it better than you found it">leave it better than you found it</p>

I'll style this up with the font I've got in this project atm.

<style>
    .demo {
        font-family: "Poppins", sans-serif;
        font-size: 100px;
        line-height: 1.25;
        position: relative;
    }

    .demo.demo-pseudo::before {
        content: attr(data-text);
    }

    .pseudo-step-1::before {
        content: attr(data-text);
        position: absolute;
        top: -7px;
        left: -7px;
    }

    .step-2 {
        color: #FC4A1A;
    }

    .step-2::before {
        color: #FCB733;
        opacity: 0.7;
    }

    .pseudo-step-2::before {
        text-shadow:
            0 1px 0 #ccc,
            0 2px 0 #ccc,
            0 3px 0 transparent,
            0 4px 0 transparent,
            0 6px 6px rgba(76, 116, 121, 0.4);
            -webkit-text-stroke: 1.5px #203140;
    }
</style>

<p class="demo demo-pseudo">leave it better than you found it</p>

Next, we're going to add a data attribute of `data-text` to our text, and add the **exact. same. text** to it. This is absolutely vital, even the smallest change will result in the layout being broken - and, why would you want this effect, but with different text anyways?

<p class="demo" data-text="leave it better than you found it">leave it better than you found it</p>

So currently, we don't see any change here, right? Or at least, you shouldn't do. You'll see it present if you inspect the markup in your browser console, but nothing shows up on screen. Yet.

Next, we're going to assign this data attribute content inside a pseudo-element of `before` on our text.

```
    p::before {
        content: attr(data-text);
    }
```

<p class="demo demo-pseudo" data-text="leave it better than you found it">leave it better than you found it</p>

After assigning the data-attribute content to the `before` pseudo element, we can see that now the contents of the `data-text` attribute are shown before the contents of our `p` tag. We want it to sit behind our text though, and offset slightly up and to the left. Let's adjust this by setting the `before` content to an `absolute` position, and assigning some `top` and `left` properties, ensuring also that we remember to assign our `p` tag a `relative` position to ensure the `absolute`-ly positioned content doesn't float away.

```
    p::before {
        content: attr(data-text);
        position: absolute;
        top: -7px;
        left: -7px;
    }
```

<p class="demo demo-pseudo pseudo-step-1" data-text="leave it better than you found it">leave it better than you found it</p>

We can see this starting to come together now, we've got our repeated text positioned in the right place to where we want it. But given that it's all the same color, it's a bit difficult to look and distinguish one from the other, so we'll add some different colors to the `p` tag and the `before` content. We've also got a bit of opacity on the `before` content, so let's apply that.

```
    p {
        color: #FC4A1A;
    }

    p::before {
        color: #FCB733;
        opacity: 0.7;
    }
```

Almost there, but the colors along with the opacity are a bit hard on my eyes - almost look like it's out of focus. Let's apply a `stroke` around the `before` content, and also a small `text-shadow` just to push it out a bit into the foreground.

<div class="fyi-block fyi-block--warning">
  <span class="heading">Text Stroke</span>
  <p>The `-webkit-text-stroke` we use here is a non-standard CSS property that creates a stroke - or outline - around the text. It's a shorthand property that combines `-webkite-text-stroke-width` and `-webkite-text-stroke-color`. However, it is **only** available on Webkit-based browsers e.g. Safari and older versions of Chrome</p>
</div>

<p class="demo demo-pseudo step-2 pseudo-step-1 pseudo-step-2" data-text="leave it better than you found it">leave it better than you found it</p>



## Resources

[https://scroll-driven-animations.style/](https://scroll-driven-animations.style/)
[https://developer.chrome.com/articles/scroll-driven-animations](https://developer.chrome.com/articles/scroll-driven-animations/)
[https://codepen.io/hexagoncircle/pen/gOPMwvd](https://codepen.io/hexagoncircle/pen/gOPMwvd)
[https://codepen.io/dominickjay217/pen/ExrEdLX](https://codepen.io/dominickjay217/pen/ExrEdLX)
[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
[https://gsap.com/docs/v3/Plugins/ScrollTrigger/](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
[https://scroll-driven-animations.style](https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=cover&range-start-percentage=0&range-end-name=cover&range-end-percentage=50&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=none&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes)
[https://ryanmulligan.dev/](https://ryanmulligan.dev/)
[https://ryanmulligan.dev/blog/scroll-driven-animations/](https://ryanmulligan.dev/blog/scroll-driven-animations/)
[https://developer.chrome.com/articles/scroll-driven-animations/](https://developer.chrome.com/articles/scroll-driven-animations/)
[https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/)
