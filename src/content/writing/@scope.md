---
title: '@scope'
description: 'Preventing CSS tantrums and sibling rivalry. - A super quick insight into the @scope property'
pubDate: '2025-02-15'
tags:
  - css
draft: true
---

As a parent of two, I've found writing CSS can be a bit like having toddlers (or really, kids in general), sometimes they throw tantrums and affect things they really shouldn't *at all*. You tell them to only use the red pens and then somehow, blue pen appears in a suddenly unexpected place ie sofa, wall, bed, toys, anything anywhere really (bonus points to them if it's something you haven't actually seen and/or won't see again for 6-12 months).

While myself - as a human, adult parent - can *cough* attempt to *cough* wrangle those pens into the right places and ensure that it's all good and only being used in the right place, it turns out that CSS is not an human, adult parent. It's like the metaphorical cool uncle that just lets the kids do anything they want with minimal control. The rules are loose.

*Enter @scope*

@scope is *the* closest thing I've seen recently that really puts CSS styles in their place. Like actually.

## Enough with the analogies, what is it?

Okay okay. @scope is a CSS [at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/At-rule) that effectively limits the reach of your CSS styles to a specific part of your HTML. Now, this has been doable in other ways - mainly naming conventions (like good ol' BEM), or CSS-in-JS solutions - but this is **native in the browser**. Beautiful.

<div class="blockquote-container">

> At-rules are CSS statements that instruct CSS how to behave. They begin with an at-sign, @ (U+0040 COMMERCIAL AT), followed by an identifier. They include everything from the at-keyword up to the next semicolon, ; (U+003B SEMICOLON), or the next CSS block, whichever comes first.
> Mozilla

</div>

A big problem that @scope can fix with CSS, that _totally_ hasn't happened to me at all not even once, is CSS 'leaking'. You tie up a new button style in a new page for a new part of a project, and lo and behold, suddenly *all* the buttons across the site have that random `border-radius` or hover state. Yuck! Last time on the parenting analogy, but this is where the coloring pens come in.

*Enter @scope (again)*

## How it works

Let's get to the code. How do we set this up so that completely-made-up scenario doesn't even become a reality. Firstly, you use the `@scope` at-rule, following by your selector of choice - let's drag the infamous card example out here.

```css
@scope .card {}
```

Well...that's kind of it, right? We've it set it up. Nothing more to do here, apart from adding in our styles *within* those lovely braces on the `.card`. Anything inside this 'scoped' card is exclusive just to that class name. This allows us to use more generic CSS selectors, ditching the specific class/IDs like `.image` in favor of just the `img` tag. Let's do a comparison between a basic card layout using both the `BEM` naming convention and `@scope`.

### Our example card markup

```html
<div class="card">
  <picture class="card__image-container">
    <source srcset="http://placeskull.com/200" media="(max-width: 600px)" />
    <source srcset="http://placeskull.com/200" media="(max-width: 1200px)" />
    <img
        class="card__image"
        src="http://placeskull.com/200"
        alt="Descriptive alt text"
    />
  </picture>
  <div class="card__content">
    <h3 class="card__heading">Card Title</h3>
    <p class="card__text">First line of paragraph text.</p>
    <a class="card__link" href="#">Learn More</a>
  </div>
</div>
```

This just gives us this beautifully unstyled masterpiece.


<div class="card">
  <picture class="card__image-container">
    <source srcset="http://placeskull.com/200" media="(max-width: 600px)" />
    <source srcset="http://placeskull.com/200" media="(max-width: 1200px)" />
    <img
        class="card__image"
        src="http://placeskull.com/200"
        alt="Descriptive alt text"
    />
  </picture>
  <div class="card__content">
    <h3 class="card__heading">Card Title</h3>
    <p class="card__text">Amet aute minim eiusmod tempor do minim eu. Eu officia amet consequat et esse pariatur Lorem proident aliqua reprehenderit esse elit. Eiusmod laborum fugiat irure culpa adipisicing velit. In consequat adipisicing ea consequat aute elit elit. Do proident veniam commodo voluptate adipisicing ullamco et ut aliqua fugiat id veniam do. Aliquip non incididunt ipsum occaecat cillum est consequat consectetur cillum. Dolore in excepteur veniam adipisicing pariatur Lorem.</p>
    <a class="card__link" href="#">Learn More</a>
  </div>
</div>

### Styling our card using BEM

<style>
.card {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: 1px solid var(--color-dark, #000);
    max-width: fit-content;
}

.card__image {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
}

.card__content {
    padding-block-end: 16px;
    padding-inline: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}

.card__heading {
    font-size: 24px;
    letter-spacing: -0.04em;
    line-height: 140%;
}

.card__text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__link {
    margin-inline-start: auto;
    margin-block-start: 8px;
}
</style>

```css
.card {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: 1px solid var(--color-dark, #000);
    max-width: fit-content;
}

.card__image {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
}

.card__content {
    padding-block-end: 16px;
    padding-inline: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}

.card__heading {
    font-size: 24px;
    letter-spacing: -0.04em;
    line-height: 140%;
}

.card__text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card__link {
    margin-inline-start: auto;
    margin-block-start: 8px;
}
```

### Styling our card using @scope

```css

/* We're setting some global img styles here */
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

@scope .card {

    /* Scoped variable only */
    --color-dark: grey;

    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: 1px solid var(--color-dark, #000);
    max-width: fit-content;

    /* Because this is scoped, the aspect-ratio here will only
    show on image's within the .card selector */
    img {
        aspect-ratio: 16 / 9;
    }

    h3 {
        font-size: 24px;
        letter-spacing: -0.04em;
        line-height: 140%;
    }

    p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    a {
        margin-inline-start: auto;
        margin-block-start: 8px;
    }

    > div {
        padding-block-end: 16px;
        padding-inline: 16px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
    }


}
```

<style>
/* We're setting some global img styles here */
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

@scope .card {

    /* Scoped variable only */
    --color-dark: grey;

    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: 1px solid var(--color-dark, #000);
    max-width: fit-content;

    /* Because this is scoped, the aspect-ratio here will only
    show on image's within the .card selector */
    img {
        aspect-ratio: 16 / 9;
    }

    p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    a {
        margin-inline-start: auto;
        margin-block-start: 8px;
    }

    > div {
        padding-block-end: 16px;
        padding-inline: 16px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
    }


}
</style>
