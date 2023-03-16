---
title: 'Creating an accordion slider in CSS Grid and AlpineJS'
description: "We can use JS to expand/reduce the size of blocks, but we can also use the grid to our advantage"
intro: "I recently put together an accordion slider using a method commonly used from AlpineJS. Having recently found that you can animate grid columns, I rethought my approach here."
date: Created
tags:
  - css
  - javascript
  - writing
layout: post
links:
  [
    {
      'title': 'Animating CSS Grid (How To + Examples)',
      'target': 'https://css-tricks.com/animating-css-grid-how-to-examples/',
    },
  ]
# eleventyExcludeFromCollections: true
---

<style>

.grid {
  flex: 1 1 auto;
  display: grid;
  gap: 1rem;
  height: 450px;
  transition: .75s ease-in-out;
}

.grid__column {
  background: white;
  transition: 300ms;
  border: 10px solid #010f0a;
  display: flex;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  padding-inline: 20px;
  padding-block: 20px;
  cursor: pointer;
}

.grid__column img {
  position: absolute;
  right: 0;
  left: 0;
  width: 200px;
  object-fit: cover;
  bottom: 0;
  top: 0;
  height: 100%;
}

.grid:has(.grid__column--1.open) {
  grid-template-columns: 2fr 0.5fr 0.5fr;
}

.grid:has(.grid__column--2.open) {
  grid-template-columns: 0.5fr 2fr 0.5fr;
}

.grid:has(.grid__column--3.open) {
  grid-template-columns: 0.5fr 0.5fr 2fr;
}

.column-content {
  width: 225px;
}

.grid__column .intro {
  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<div class="main">
  <div class="grid" x-data="{
    open: 2
  }">
    <div
      class="grid__column grid__column--1"
      x-data="{
        id: 1,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content"></div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
    <div
      class="grid__column grid__column--2"
      x-data="{
        id: 2,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content">
        <span class="h3 heading">Heading</span>
        <div class="intro">Labore culpa anim eiusmod aute ut consectetur...</div>
      </div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
    <div
      class="grid__column grid__column--3"
      x-data="{
        id: 3,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content">
        Hello
      </div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
  </div>
</div>

```css

.grid {
  flex: 1 1 auto;
  display: grid;
  gap: 1rem;
  height: 450px;
  transition: .75s ease-in-out;
}

.grid__column {
  background: white;
  transition: 300ms;
  border: 10px solid #010f0a;
  display: flex;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  padding-inline: 20px;
  padding-block: 20px;
  cursor: pointer;
}

.grid__column img {
  position: absolute;
  right: 0;
  left: 0;
  width: 200px;
  object-fit: cover;
  bottom: 0;
  top: 0;
  height: 100%;
}

.grid:has(.grid__column--1.open) {
  grid-template-columns: 2fr 0.5fr 0.5fr;
}

.grid:has(.grid__column--2.open) {
  grid-template-columns: 0.5fr 2fr 0.5fr;
}

.grid:has(.grid__column--3.open) {
  grid-template-columns: 0.5fr 0.5fr 2fr;
}

.column-content {
  width: 225px;
}

.grid__column .intro {
  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

```html
<div class="main">
  <div
    class="grid"
    x-data="{
      open: 2
    }"
  >
    <div
      class="grid__column grid__column--1"
      x-data="{
        id: 1,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content"></div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
    <div
      class="grid__column grid__column--2"
      x-data="{
        id: 2,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content">
        <span class="h3 heading">Heading</span>
        <div class="intro">Labore culpa anim eiusmod...</div>
      </div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
    <div
      class="grid__column grid__column--3"
      x-data="{
        id: 3,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
      <div class="column-content">
        Hello
      </div>
      <div class="column-image">
       <img src="https://placeskull.com/350/650" />
      </div>
    </div>
  </div>
</div>
```