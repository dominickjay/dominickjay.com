---
title: 'Grids all the way down'
description: "Grids in grids in grids...let's learn about subgrid"
date: Created
tags:
  - css
  - grid
  - writing
layout: post
draft: true
shareimage: "grids-way-down.jpg"
---

{% caniuse "css-subgrid" %}

CSS subgrid allows nested grid items to participate in the sizing of the tracks defined in their parent grid. This means that the tracks of a grid item can align with the tracks of the parent grid, resulting in a more flexible layout system.

Basic syntax

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
}

.subgrid {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
```
```html
<div class="grid">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="subgrid">
    <div class="item">Item 5_1</div>
    <div class="item">Item 5_2</div>
  </div>
</div>
```
