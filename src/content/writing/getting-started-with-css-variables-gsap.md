---
title: 'Getting Started with CSS Variables in GSAP in 5 Minutes'
description: "Dive into the exciting world of GSAP's latest feature - direct CSS variable animation! No more workarounds, just pure animation magic."
pubDate: '2024-06-12'
draft: true
tags:
  - js
  - css
  - CSSentials
  - ByteSize
---

## Key Benefits

- **The Wait is Over!** GSAP has officially added direct animation of CSS variables (custom properties). This simplifies your animation workflows significantly.
- **No More Indirect Manipulation:** Previously, animating CSS variables often involved animating a JavaScript variable and then manually updating the CSS variable. GSAP now lets you target them directly.
- **Cleaner and More Intuitive Code:** Say goodbye to onUpdate callbacks just for CSS variables. Your animation code becomes more readable and maintainable.
- **Seamless Integration:** This update bridges the gap between GSAP's powerful animation capabilities and the flexibility of CSS variables for styling.
- **Unlock New Possibilities:** Easily animate themes, dynamic styles, and complex visual effects driven by CSS variables with the full power of GSAP.
- **Performance Considerations:** While GSAP is performant, remember that animating complex CSS properties (including variables that affect many elements) can still have performance implications. Test your animations!

## Examples

### Basic Color Change

```html
<style>
  :root {
    --bg-color: lightblue;
  }
  .box {
    width: 100px;
    height: 100px;
    background-color: var(--bg-color);
  }
</style>

<div class="box"></div>

<script>
  gsap.to(".box", {
    "--bg-color": "lightcoral",
    duration: 1,
    yoyo: true,
    repeat: -1
  });
</script>
```

### Animating a Gradient

```html
<style>
  :root {
    --gradient-start: #ff6b6b;
    --gradient-end: #4ecdc4;
  }
  .gradient-box {
    width: 200px;
    height: 100px;
    background-image: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  }
</style>

<div class="gradient-box"></div>

<script>
  gsap.to(":root", { // Animating the root element to change the variables
    "--gradient-start": "#a8dadc",
    "--gradient-end": "#457b9d",
    duration: 2,
    yoyo: true,
    repeat: -1
  });
</script>
```

### Animating a Custom Property Affecting Size

```html
<style>
  :root {
    --scale-factor: 1;
  }
  .scaled-box {
    width: calc(100px * var(--scale-factor));
    height: calc(100px * var(--scale-factor));
    background-color: lightgreen;
    transform-origin: center;
  }
</style>

<div class="scaled-box"></div>

<script>
  gsap.to(".scaled-box", {
    "--scale-factor": 1.5,
    duration: 0.75,
    yoyo: true,
    repeat: -1
  });
</script>
```

## Key Takeaway

This direct animation feature simplifies common tasks and opens up more creative possibilities for web animation by leveraging the power of both GSAP and CSS variables. Start exploring this new feature today and take your animations to the next level!
