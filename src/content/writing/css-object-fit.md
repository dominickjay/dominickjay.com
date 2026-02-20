---
title: 'CSS Object-Fit Property'
description: 'A super quick insight into the object-fit property'
pubDate: '2021-10-20'
supported: bcd.css["properties"].object-fit.__compat
tags:
  - css

---

## Let's get into it

By using the object-fit property, we can define how an element responds to its parent containers height and width. This property is mainly used alongside images and videos, and can let us have further control over how it allows an inline image to be displayed.

<style>
	.object-fit-example {
		max-inline-size: 800px;
		max-block-size: 600px;
		border: 1px solid var(--color-dark);
	}
	
	.object-fit-example picture {
		block-size: 100%;
		inline-size: 100%;
	}
	
	.object-fit-example img {
		object-position: center;
		object-fit: var(--fit, cover);
		width: 100%;
		height: 100%;
	}
</style>

```
.object-fit-example {
	max-inline-size: 800px;
	max-block-size: 600px;
	border: 1px solid var(--color-dark);
}

.object-fit-example picture {
	block-size: 100%;
	inline-size: 100%;
}

.object-fit-example img {
	object-position: center;
	object-fit: cover;
	width: 100%;
	height: 100%;
}
```

<div class="object-fit-example">
	<picture>
		<source media="(min-width: 750px)" srcset="https://picsum.photos/800/600">
		<img src="https://picsum.photos/400/300" alt="A placeholder image for use with our Object Fit blog post">
	</picture>
</div>

Looking at the example above, the inline image can be adjusted to the size of it's parent container - try resizing the window - it will always fit the box. There are a number of values that can be used to set `object-fit`.

## What values can be used?

There are 5 values that can be used for this property; `fill`, `contain`, `cover`, `scale-down`and `none`.

### Fill

Similar to background-size, the content is sized to completely fill the content box of the element, regardless of the height and width. If the aspect ratio of the content does not match the aspect ratio of the element, then it will stretch to fit. The image below is horrifically stretched to really show this style.

<div class="object-fit-example" style="--fit: fill;">
	<picture>
		<source media="(min-width: 750px)" srcset="https://picsum.photos/25/800">
		<img src="https://picsum.photos/25/300" alt="A placeholder image for use with our Object Fit blog post">
	</picture>
</div>

### Contain

When using `contain`, the content scales to keep its aspect ratio while also fitting within the boundaries of the elements content box. Using this can make the object display gaps vertically or horizontally.

The entire object is made to fill the box, while preserving its aspect ratio, so the object will be "letterboxed" if its aspect ratio does not match the aspect ratio of the box.

<div class="object-fit-example" style="--fit: contain;">
	<picture>
		<source media="(min-width: 750px)" srcset="https://picsum.photos/300/800">
		<img src="https://picsum.photos/100/300" alt="A placeholder image for use with our Object Fit blog post">
	</picture>
</div>

### Cover

This is using `cover`, which is what we are using at the top of this post, however, it will not "letterbox" the object to keep it's aspect ratio. Instead it will continue to expand the content to fit the content box, often cropping the content as a result.

<div class="object-fit-example" style="--fit: cover;">
	<picture>
		<source media="(min-width: 750px)" srcset="https://picsum.photos/600/800">
		<img src="https://picsum.photos/200/300" alt="A placeholder image for use with our Object Fit blog post">
	</picture>
</div>


### Scale-Down

`scale-down` chooses the smallest object size between the results of `none` and `contain` being used.

### None

For `none`, the width and height of the content box is ignored by the object, which will maintain it's original size.

## Practical Examples

### Responsive Images with Picture Element

`object-fit` works particularly well with the `<picture>` element for responsive images:

```html
<picture>
  <source srcset="large.jpg" media="(min-width: 1200px)">
  <source srcset="medium.jpg" media="(min-width: 768px)">
  <img src="small.jpg" alt="Description" class="responsive-image">
</picture>

<style>
.responsive-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}
</style>
```

### Working with Different Aspect Ratios

Here's how `object-fit` handles different aspect ratios:

<p class="codepen" data-height="614" data-theme-id="dark" data-slug-hash="bGrNKRX" data-user="dominickjay217" style="height: 614px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/dominickjay217/pen/bGrNKRX">
Object-Fit Example #1</a> by Dom Jay (<a href="https://codepen.io/dominickjay217">@dominickjay217</a>)
on <a href="https://codepen.io">CodePen</a>.</span></p>

## Performance Considerations

When using `object-fit` with large images, consider these tips:

1. Always specify both `width` and `height` attributes on your images to prevent layout shifts
2. Use appropriate image formats and compression
3. Consider using `loading="lazy"` for images below the fold
4. Use `srcset` and `sizes` attributes for responsive images

## Support?

Support is excellent across all modern browsers. Since IE11 has been officially retired by Microsoft, you can safely use `object-fit` without any fallbacks.

So, what are you waiting for? Go try it out!

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<div class="further-reading relative p-[var(--space-m)] border flex flex-col gap-y-[var(--space-s)] hover:bg-[var(--color-dark)]/25 transition-colors duration-500 ease-in-out">
	<h3 class="h3">Want to learn more about this topic?</h3>
	<a class="box-link" href="/writing/mastering-image-ratios-object-fit/">Mastering Image Ratios with Object-Fit</a>
</div>
