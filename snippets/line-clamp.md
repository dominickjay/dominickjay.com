---
title: 'line-clamp'
description: The -webkit-line-clamp CSS property allows limiting of the contents of a block to the specified number of lines.
date: Created
tags:
  - snippets
  - css
layout: 'layouts/snippet.njk'
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
  .line-clamp p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<div class="line-clamp w-[850px] border-2 border-dashed border-black fl-p-m">
  <p>Death once had a near-Chuck-Norris experience. Chuck Norris can kill two stones with one bird. On New Year’s Eve, Chuck Norris promised that he’d lose 20 pounds. The next morning he shaved his chest and smiled as he realized that he’d lost 30. Chuck Norris invented airplanes because he was tired of being the only person that could fly. Some kids pee their name in the snow. Chuck Norris can pee his name into concrete.
  </p>
</div>

<p class="ciu_embed" data-feature="css-line-clamp" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <picture>
    <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/css-line-clamp.webp">
    <source type="image/png" srcset="https://caniuse.bitsofco.de/image/css-line-clamp.png">
    <img src="https://caniuse.bitsofco.de/image/css-line-clamp.jpg" alt="Data on support for the css-line-clamp feature across the major browsers from caniuse.com">
  </picture>
</p>