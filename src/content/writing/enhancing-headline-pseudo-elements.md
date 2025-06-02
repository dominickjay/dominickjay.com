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
  href="/fonts/RocherColorGX.woff2"
  as="font"
  type="font/woff2"
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
        font-size: 100px;
        line-height: 1.25;
    }
</style>

<p class="demo">leave it better than you found it</p>

Next, we're going to add a data attribute of `data-text` to our text, and add the **exact. same. text** to it. This is absolutely vital, even the smallest change will result in the layout being broken - and, why would you want this effect, but with different text anyways?

<p class="demo" data-text="leave it better than you found it">leave it better than you found it</p>

So currently, we don't see any change here, right? Or at least, you shouldn't do. You'll see it present if you inspect the markup in your browser console, but nothing shows up on screen. Yet.

Next, we're going to assign this data attribute content inside a pseudo-element of `before` on our text.

```
    .demo::before {
        content: attr(data-text);
    }
```



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
