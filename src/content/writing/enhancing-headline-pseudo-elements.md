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
  <span class="fyi-block__title">Text Stroke</span>
  <p>The `-webkit-text-stroke` we use here is a non-standard CSS property that creates a stroke - or outline - around the text. It's a shorthand property that combines `-webkite-text-stroke-width` and `-webkite-text-stroke-color`. However, it is **only** available on Webkit-based browsers e.g. Safari and older versions of Chrome</p>
</div>

## Blend Modes and Isolation

In the CodePen demo, we're using two additional properties that affect how our text layers interact:

```css
.demo {
    isolation: isolate;
}

.demo::before {
    mix-blend-mode: luminosity;
}
```

The `isolation: isolate` property creates a new stacking context for our element. This is important because:

1. It prevents the pseudo-element from blending with elements outside its parent
2. It ensures the blend mode only affects the relationship between the main text and its pseudo-element
3. It can improve performance by limiting the scope of blend mode calculations

The `mix-blend-mode: luminosity` property then controls how the pseudo-element blends with the main text. In this case, it's creating a more subtle, integrated effect between the two text layers.

Without `isolation: isolate`, the blend mode might interact with other elements on the page, potentially creating unexpected visual results. While you might not notice a difference in this specific demo (especially on a white/paler background), it's a good practice to include it when working with blend modes to ensure consistent behavior across different contexts.

<p class="demo demo-pseudo step-2 pseudo-step-1 pseudo-step-2" data-text="leave it better than you found it">leave it better than you found it</p>

As far as our original demo goes, that's how this was put together. Of course, there's alternative approaches to this, which we'll cover next.

## Alternative Approaches

While our pseudo-element approach works well, there are several other ways to achieve similar effects. Let's explore some alternatives:

### SVG Approach
SVG provides more control over text effects and better browser support. Here's how we could achieve a similar effect:

```html
<svg class="text-effect" viewBox="0 0 800 200">
  <text x="50%" y="50%" text-anchor="middle" class="text-front">leave it better than you found it</text>
  <text x="50%" y="50%" text-anchor="middle" class="text-back">leave it better than you found it</text>
</svg>
```

<style>
    .text-effect {
        width: 100%;
        height: auto;
        font-family: "Poppins", sans-serif;
        font-size: 100px;
        line-height: 1.25;
        position: relative;
    }

    .text-back {
        fill: #FCB733;
        opacity: 0.7;
        transform: translate(-4px, -4px);
        stroke: #000;
    }

    .text-front {
        fill: #FC4A1A;
    }
</style>

<svg class="text-effect" viewBox="0 0 800 200">
  <text x="50%" y="50%" text-anchor="middle" class="text-front">leave it better than you found it</text>
  <text x="50%" y="50%" text-anchor="middle" class="text-back">leave it better than you found it</text>
</svg>

```css
.text-effect {
  width: 100%;
  height: auto;
}

.text-back {
    fill: #FCB733;
    opacity: 0.7;
    transform: translate(-4px, -4px);
    stroke: #000;
}

.text-front {
  fill: #FC4A1A;
}
```

So we can see *immediately* that this just won't work, not unless we want to force new text elements onto new lines to simulate the line breaks. I'm sure there's a good use case for doing this as an SVG, possibly as a logo with that effect, but in terms of something a bit more dynamic - like a heading on a page - the trade off between browser support and basic expectations here just isn't worth it.

### Text Shadow Only Solution
If you want to avoid pseudo-elements entirely, you can use multiple text shadows:

```css
.text-shadow-effect {
  color: #FC4A1A;
  text-shadow:
    -7px -7px 0 #FCB733,
    -7px -7px 2px rgba(0,0,0,0.2);
}
```

<style>
    .text-shadow-effect {
        font-family: "Poppins", sans-serif;
        font-size: 100px;
        line-height: 1.25;
        position: relative;
        color: #FC4A1A;
        text-shadow:
            -7px -7px 0 #FCB733,
            -7px -7px 2px rgba(0,0,0,0.2);
    }
</style>

<p class="text-shadow-effect">Leave it better than you found it</p>

## Interactive Examples

Let's make our text effect more dynamic with some interactive elements:

### Hover Effect
```css
.interactive-demo {
  transition: transform 0.3s ease;
}

.interactive-demo:hover {
  transform: translateY(-5px);
}

.interactive-demo:hover::before {
  transform: translate(-12px, -12px);
  opacity: 0.5;
}
```

### Animation
```css
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.animated-demo {
  animation: float 3s ease-in-out infinite;
}

.animated-demo::before {
  animation: float 3s ease-in-out infinite;
  animation-delay: 0.1s;
}
```

## Code Optimization

Let's make our code more maintainable and reusable:

### CSS Custom Properties
```css
:root {
  --text-primary: #FC4A1A;
  --text-secondary: #FCB733;
  --text-offset: -7px;
  --text-opacity: 0.7;
  --text-stroke: 1.5px #203140;
}

.optimized-demo {
  color: var(--text-primary);
  position: relative;
}

.optimized-demo::before {
  content: attr(data-text);
  position: absolute;
  top: var(--text-offset);
  left: var(--text-offset);
  color: var(--text-secondary);
  opacity: var(--text-opacity);
  -webkit-text-stroke: var(--text-stroke);
}
```

### Modular Approach
Break down the effect into reusable classes:

```css
.text-effect {
  position: relative;
}

.text-effect--offset::before {
  content: attr(data-text);
  position: absolute;
  top: var(--text-offset);
  left: var(--text-offset);
}

.text-effect--color::before {
  color: var(--text-secondary);
  opacity: var(--text-opacity);
}

.text-effect--stroke::before {
  -webkit-text-stroke: var(--text-stroke);
}
```

Usage:
```html
<p class="text-effect text-effect--offset text-effect--color text-effect--stroke"
   data-text="leave it better than you found it">
  leave it better than you found it
</p>
```

This modular approach makes it easier to:
- Mix and match effects
- Maintain the code
- Add new variations
- Debug issues
- Reuse across different projects
