---
title: 'Selecting all siblings with the :has() function'
description: "It's been tricky to get to all an elements siblings before, but with :has() it's simple!"
intro: "I was experimenting with the :has() function recently, and put together a quick demonstration of how to select all an elements siblings and style them. It ended up being picked by CodePen, so this post is demonstrating how that was put together."
pubDate: '2023-04-26'
tags:
  - css
---

{% caniuse "css-has" %}

As always, I'm going to start with support for this feature first. For once it's not just IE being the awkward one, as Firefox doesn't have support here for it - unless you enable it through the `layout.css.has-selector.enabled` flag anyway. So if you're on Firefox and want to see this demo in all its glory, you'll need this flag enabled or jump onto another browser.

<div class="fyi-block fyi-block--info fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
  <span class="fl-text-step-2 heading">Update - 23rd December, 2024</span>
  <p>This is now supported in all evergreen browsers, so need for an enabled flag to deal with this support - hooray!</p>
</div>


<div class="pull-quote pull-quote--left">

  It’s been notoriously difficult to select elements depending on their children

</div>

It's been notoriously difficult to select elements depending on their children (almost as hard as that one level on Crash Bandicoot when you have to ride a tiger down the Great Wall of China, or that level on Max Payne with the crying baby and the blood line path), or siblings that came before it. Super easy to say _"let's make this box red when it is an element following on from an element with a class of outline"_.

`.outline + .red`

<style>

  .box {
    flex: 1 0 30px;
    height: auto;
    aspect-ratio: 1;
    background-color: black;
  }

  .outline {
    background-color: white;
    border: 5px solid #010f0a;
  }

  #one-red-box .outline + .box,
  .outline + .box + .box + .box + .box {
    background-color: #e63946;
  }

  .box-row {
    display: flex;
    column-gap: 25px;
    margin-block: 20px;
    border: 5px solid #010f0a;
    padding: 15px;
  }

</style>

<div class="box-row" id="one-red-box">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
</div>

But how do we get the 3rd or 4th element away from that outlined box, and make it red? Keep on chaining selectors, like this `.outline + .box + .box + .box + .box`?

```css
.outline + .box,
.outline + .box + .box + .box + .box {
  background-color: #e63946;
}
```

<div class="box-row">
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

Yeah that did it too....but blimey it's awful isn't it. We also can't make the 1st box red if the third box our outlined box, based on the `.outline` class. There's no example I can think of that would demonstrate how it doesn't work - feel free to enlighten me and I'll add it to this post.

With this complication comes the perfect excuse to take `:has()` for a spin. We can use it to style our intended box red, when the element after it has the `.outline` class.

```css
  .box:has( + .outline) {
    background-color: #e63946;
  }
```

<style>
  #has-example-row .box:has( + .outline) {
    background-color: #e63946;
  }
</style>

<div class="box-row" id="has-example-row">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

So given that we've got access to previous siblings, we've got the ability to add states to them. Make that red box turn orange on hover? No problemo.

```css
.box:has( + .outline) {
  background-color: #e63946;
  transition: .3s ease-in-out background-color;
}

/* Apply this when our box is hovered AND
has the outline classed box next to it */
.box:hover:has( + .outline) {
  background-color: #ff5f1f;
}
```

<style>
  #has-example-row-2 .box:has( + .outline) {
    background-color: #e63946;
    transition: .3s ease-in-out background-color;
  }
  #has-example-row-2 .box:hover:has( + .outline) {
    background-color: #ff5f1f;
  }
</style>

<div class="box-row" id="has-example-row-2">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

What if we _flipped_ this, and have the red box go orange when the **outlined** box is hovered? With `:has()` it's easy enough.

```css
.box:has( + .outline) {
  background-color: #e63946;
  transition: .3s ease-in-out background-color;
}

/* Apply this when our box is hovered AND
has the outline classed box next to it */
.box:has( + .outline:hover) {
  background-color: #ff5f1f;
}
```
<style>
  #has-example-row-3 .box:has( + .outline) {
    background-color: #e63946;
    transition: .3s ease-in-out background-color;
  }
  #has-example-row-3 .box:has( + .outline:hover) {
    background-color: #ff5f1f;
  }
</style>

<div class="box-row" id="has-example-row-3">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

See where this is going? Now, we're going to move our selector from `.box` to the parent `.box-row` and use a `*` to select all the elements in the row, turning them orange.

<style>
  #has-example-row-4 > * {
    background-color: #ff5f1f;
  }
</style>

<div class="box-row" id="has-example-row-4">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

Then we'll change it, using `:has()` on the parent element to check if any of the `.outline` classes are hovered. Then we can apply a style using `:not()`, passing the `:hover` state through. Effectively saying that in this block, any boxes that aren't hovered, should turn orange when our `.outline` class is hovered.

```css
#has-example-row-5:has( .outline:hover ) > *:not(:hover) {
  background-color: #ff5f1f;
}
```

<style>
  #has-example-row-5:has( .outline:hover ) > *:not(:hover) {
    background-color: #ff5f1f;
    transition: .3s ease-in-out background-color;
  }
</style>

<div class="box-row" id="has-example-row-5">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box outline"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

Almost there. Let's remove `.outline` from our statement, replacing it with another `*` selector. So now in this block, any boxes that aren't hovered, should turn orange when ~~our `.outline` class~~ any of our elements are hovered.

```css
#has-example-row-6:has( *:hover ) > *:not(:hover) {
  background-color: #ff5f1f;
}
```

<style>
  #has-example-row-6 > * {
    transition: .3s ease-in-out background-color;
  }

  #has-example-row-6:has( *:hover ) > *:not(:hover) {
    background-color: #ff5f1f;
  }
</style>

<div class="box-row" id="has-example-row-6">
  <div class="box "></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

We're so close, but only because the rest is not specifically `:has()` related. We're going to use `placeskull.com` to provide some images in our row blocks. Now we don't benefit from the background color, let's use `filter: blur(4px)` and apply that to the image at the end of our `:has()` statement. We'll also need `overflow: hidden` on the images parent div to prevent the blur from going over the edges - this keeps it nice and contained.

```css
#has-example-row-7 > * {
  transition: .3s ease-in-out all;
}

#has-example-row-7:has( *:hover ) > *:not(:hover) img {
  filter: blur(4px);
}
```

<style>
  #has-example-row-7 > * {
    overflow: hidden;
  }

  #has-example-row-7 > * img{
    transition: .3s ease-in-out all;
  }

  #has-example-row-7:has( *:hover ) > *:not(:hover) img {
    filter: blur(4px);
  }
</style>

<div class="box-row" id="has-example-row-7">
  <div class="box">
    <img src="https://placeskull.com/350/350" />
  </div>
  <div class="box">
    <img src="https://placeskull.com/350/350" />
  </div>
  <div class="box">
    <img src="https://placeskull.com/350/350" />
  </div>
  <div class="box">
    <img src="https://placeskull.com/350/350" />
  </div>
  <div class="box">
    <img src="https://placeskull.com/350/350" />
  </div>
</div>

Lastly, we'll put a `transform: scale()` on the image, and also add a background color to the images parent block to be able to cover the whitespace caused by the scale, and voila!

<style>
  .main-container {
    border: 5px solid #010f0a;
    padding: 20px;
    margin-block: 20px;
    position: relative;
  }

  .has-grid {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 1rem;
    place-content: center;
  }

  @media (max-width: 768px) {
    .has-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .cell {
    grid-column: span 2/span 2;
    overflow: hidden;
    background: black;
  }

  .cell img {
    width: 100%;
    transition: .65s cubic-bezier(0.680, -0.550, 0.265, 1.550) all;
  }

  .has-grid:has( > *:hover ) > *:not(:hover) img {
    filter: blur(4px);
    transform: scale(0.85);
  }

  .attribute {
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    margin-inline: auto;
    text-align: center;
    max-width: 750px;
    font-family: 'Erode', sans-serif;
  }

  .attribute a {
    font-weight: 500;
  }

  .helpful-hint {
    margin-block: 40px;
    font-size: 1.85rem;
    text-align: center;
    font-family: 'Erode', sans-serif;
  }
</style>

<div class="main-container">
	<div class="has-grid">
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
		<div class="cell">
			<img src="https://placeskull.com/350/350" />
		</div>
	</div>
</div>

If I end up revisiting this at any point, I'll probably look at refining the selector as it's quite long. Maybe that's the way it has to be to be able to achieve this, but maybe worth the trip. I'm a big fan of this - not only because it's my own work - and ended up implementing into my Weeknotes <a class="underline hover:no-underline" href="/tag/weeknotes/">posts</a> for my music choices for that week. If you want to see my other work on CodePen, you can follow me <a class="underline hover:no-underline" href="https://codepen.io/dominickjay217">here</a>.
