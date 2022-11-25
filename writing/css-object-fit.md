---
title: 'CSS Object-Fit Property'
description: 'A super quick insight into the object-fit property'
date: 2021-10-20
tags:
  - css
  - writing
layout: 'layouts/post.njk'
links:
  [
    {
      'title': 'MDN: object-fit',
      'target': 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
    },
    {
      'title': 'CSS Tricks: object-fit',
      'target': 'https://css-tricks.com/almanac/properties/o/object-fit/',
    },
  ]
---

## Let's get into it

By using the object-fit property, we can define how an element responds to its parent containers height and width. This property is mainly used alongside images and videos, and can let us have further control over how it allows an inline image to be displayed.

<p class="codepen" data-height="537" data-theme-id="dark" data-slug-hash="zYdxjQB" data-user="dominickjay217" style="height: 537px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/dominickjay217/pen/zYdxjQB">
Object-Fit Example #1</a> by Dom Jay (<a href="https://codepen.io/dominickjay217">@dominickjay217</a>)on <a href="https://codepen.io">CodePen</a>.</span></p>

Looking at the example above, the inline image can be adjusted to the size of it's parent container. There are a number of values that can be used to set `object-fit`.

## What values can be used?

There are 5 values that can be used for this property; `fill`, `contain`, `cover`, `scale-down`and `none`.

### Fill

Similar to background-size, the content is sized to completely fill the content box of the element, regardless of the height and width. If the aspect ratio of the content does not match the aspect ratio of the element, then it will stretch to fit.

### Contain

When using `contain`, the content scales to keep its aspect ration while also fitting within the boundaries of the elements content box. Using this can make the object display gaps vertically or horizontally

The entire object is made to fill the box, while preserving its aspect ratio, so the object will be "letterboxed" if its aspect ratio does not match the aspect ratio of the box.

### Cover

This one is similar to `contain`, however, it will not "letterbox" the object to keep it's aspect ratio. Instead it will continue to expand the content to fit the content box, often cropping the content as a result.

### Scale-Down

`scale-down` chooses the smallest object size between the results of `none` and `contain` being used.

### None

For `none`, the width and height of the content box is ignored by the object, which will maintain it's original size.

<p class="codepen" data-height="614" data-theme-id="dark" data-slug-hash="bGrNKRX" data-user="dominickjay217" style="height: 614px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/dominickjay217/pen/bGrNKRX">
Object-Fit Example #1</a> by Dom Jay (<a href="https://codepen.io/dominickjay217">@dominickjay217</a>)
on <a href="https://codepen.io">CodePen</a>.</span></p>

These values can also be used alongside the [[CSS Object Position]] property.

## Support?

Support is **very** good, with - typically - IE 11 being the outcast.

!["Can I use" support tables for the object-fit property](/images/can-i-use-object-fit.png)

_Source:_ [CanIUse](https://caniuse.com/object-fit 'CanIUse link for CSS3 object-fit')

So, what are you waiting for? Go try it out!

<div>

![Do It Now Gif](/images/gifs/do-it-now.gif)

</div>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
