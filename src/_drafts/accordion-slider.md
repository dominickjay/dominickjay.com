---
title: 'Creating an accordion slider in CSS Grid and AlpineJS'
description: "We can use JS to expand/reduce the size of blocks, but we can also use the grid to our advantage"
intro: "I recently put together an accordion slider using a method commonly used from AlpineJS. Having recently found that you can animate grid columns, I rethought my approach here."
published: Created
updated: Last Modified
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
draft: true
---

I was working on a project recently that involved what I could only describe as a sideways accordion - I'm sure there's a better name for it.

Having worked out that it was _probably_ easier to use `flex` with a `gap` property, an set the width of the largest one using `flex: 1 0 #{SOME_WIDTH_AMOUNT}`, I could get at least halfway down the road.

```css
.static-example {
  display: flex;
  column-gap: 20px;
  margin-block: 20px;
  height: 500px;
}

.static-column {
  flex: 1 1 auto;
}

.static-column--2 {
  flex: 1 0 350px;
}
```

```html
<div class="static-example">
  <div class="static-column static-column--1">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--2">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--3">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
</div>
```

<style>
  .static-example {
    display: flex;
    column-gap: 20px;
    margin-block: 20px;
    height: 500px;
  }

  .static-example img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .static-example .column-image {
    height: 100%;
    width: 100%;
  }

  .static-column {
    flex: 1 1 auto;
  }

  .static-column--2,
  .opened {
    flex: 1 0 350px;
  }
</style>

<div class="static-example">
  <div class="static-column static-column--1">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--2">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--3">
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
</div>

So we've got a rough outline of what it should look like as an initial state. We need to be able to make the others the wider one - let's use some JS. For the project, like most at Series Eight, I was using AlpineJS. Using this approach, I set an initial value of `2` for the `open` variable in `x-data` on the parent, and then on each of the image containers, another set of `x-data` with appropriate values for each `id` variable.

After that, I used `@click="open = id"` to set the parent `open` variable as the clicked images `id` value. Lastly, we can use `:class="{'opened' : open}"` to add a class of `opened` to the container that's clicked, and remove it from the others.

<div
  class="static-example static-example--js"
  x-data="{
    open: 2,
    get open() {
        return this.open === this.id
    },
    set open(value) {
        this.open = value ? this.id : null
    }
  }"
>
  <div
    class="static-column static-column--1"
    x-data="{
      id: 1,
    }"
    :class="{
      'opened' : open
    }"
    @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div
    class="static-column static-column--2"
    x-data="{
      id: 2,
    }"
    :class="{
      'opened' : open
    }"
    @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div
    class="static-column static-column--3"
    x-data="{
      id: 3,
    }"
    :class="{
      'opened' : open
    }"
    @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
</div>

```diff-html

<div
  class="static-example static-example--js"
+ x-data="{
+   open: 2
+ }"
>
  <div class="static-column static-column--1"
+   x-data="{
+     id: 1,
+   }"
+   :class="{
+     'opened' : open
+   }"
+   @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--2"
+   x-data="{
+     id: 2,
+   }"
+   :class="{
+     'opened' : open
+   }"
+   @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
  <div class="static-column static-column--3"
+   x-data="{
+     id: 3,
+   }"
+   :class="{
+     'opened' : open
+   }"
+   @click="open = id"
  >
    <div class="column-image">
      <img src="https://placeskull.com/350/650" />
    </div>
  </div>
</div>
```


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
        'opened' : open
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
        'opened' : open
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
        'opened' : open
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
        'opened' : open
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
        'opened' : open
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
        'opened': open
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
