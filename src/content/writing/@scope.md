---
title: '@scope'
description: 'Preventing CSS tantrums and sibling rivalry. - A super quick insight into the @scope property'
pubDate: '2025-02-15'
tags:
  - css
supported: bcd.css["at-rules"].scope.__compat
layout: BlogPost

---

As a parent of two, I've found writing CSS can be a bit like having toddlers (or really, kids in general), sometimes they throw tantrums and affect things they really shouldn't *at all*. You tell them to only use the red pens and then somehow, blue pen appears in a suddenly unexpected place ie sofa, wall, bed, toys, anything anywhere really (bonus points to them if it's something you haven't actually seen and/or won't see again for 6-12 months).

While myself - as a human, adult parent - can *cough* attempt to *cough* wrangle those pens into the right places and ensure that it's all good and only being used in the right place, it turns out that CSS is not an human, adult parent. It's like the metaphorical cool uncle that just lets the kids do anything they want with minimal control. The rules are loose.

*Enter @scope*

@scope is *the* closest thing I've seen recently that really puts CSS styles in their place. Like actually.

<div class="blockquote-container">

> At-rules are CSS statements that instruct CSS how to behave. They begin with an at-sign, @, followed by an identifier. They include everything from the at-keyword up to the next semicolon, ; , or the next CSS block, whichever comes first.
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


<div class="">
  <picture class="">
    <source srcset="http://placeskull.com/200" media="(max-width: 600px)" />
    <source srcset="http://placeskull.com/200" media="(max-width: 1200px)" />
    <img
        class=""
        src="http://placeskull.com/200"
        alt="Descriptive alt text"
    />
  </picture>
  <div class="">
    <h3 class="">Card Title</h3>
    <p class="">Amet aute minim eiusmod tempor do minim eu. Eu officia amet consequat et esse pariatur Lorem proident aliqua reprehenderit esse elit. Eiusmod laborum fugiat irure culpa adipisicing velit. In consequat adipisicing ea consequat aute elit elit. Do proident veniam commodo voluptate adipisicing ullamco et ut aliqua fugiat id veniam do. Aliquip non incididunt ipsum occaecat cillum est consequat consectetur cillum. Dolore in excepteur veniam adipisicing pariatur Lorem.</p>
    <a class="" href="#">Learn More</a>
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

@scope (.card-scoped) {

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
        aspect-ratio: 1;
    }

    h3 {
        font-size: 24px;
        letter-spacing: -0.04em;
        line-height: 140%;
        text-align: center;
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

@scope (.card-scoped) {

    /* Scoped variable only */
    --color-dark: grey;

    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: 1px solid var(--color-dark, #000);
    max-width: fit-content;

    h3 {
        font-size: 24px;
        letter-spacing: -0.04em;
        line-height: 140%;
        text-align: center;
    }

    /* Because this is scoped, the aspect-ratio here will only
    show on image's within the .card selector */
    img {
        aspect-ratio: 1;
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

<style>
/* We're setting some global img styles here */
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

@scope .card-scoped {

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

<div class="card-scoped">
  <picture class="">
    <source srcset="http://placeskull.com/200" media="(max-width: 600px)" />
    <source srcset="http://placeskull.com/200" media="(max-width: 1200px)" />
    <img
        class=""
        src="http://placeskull.com/200"
        alt="Descriptive alt text"
    />
  </picture>
  <div class="">
    <h3 class="">Card Title</h3>
    <p class="">Amet aute minim eiusmod tempor do minim eu. Eu officia amet consequat et esse pariatur Lorem proident aliqua reprehenderit esse elit. Eiusmod laborum fugiat irure culpa adipisicing velit. In consequat adipisicing ea consequat aute elit elit. Do proident veniam commodo voluptate adipisicing ullamco et ut aliqua fugiat id veniam do. Aliquip non incididunt ipsum occaecat cillum est consequat consectetur cillum. Dolore in excepteur veniam adipisicing pariatur Lorem.</p>
    <a class="" href="#">Learn More</a>
  </div>
</div>

## Browser Support and Progressive Enhancement

As with any new CSS feature, browser support is crucial to consider. Currently, `@scope` is supported in Chrome 118+, Firefox 120+, and Safari 17.2+. For browsers that don't support it, you'll need a fallback strategy.

<div class="browser-support-table">
  <table>
    <caption>Browser Support for @scope</caption>
    <thead>
      <tr>
        <th scope="col">Browser</th>
        <th scope="col">Version</th>
        <th scope="col">Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Chrome</th>
        <td>118+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Firefox</th>
        <td>-</td>
        <td><span class="support-no">No</span></td>
      </tr>
      <tr>
        <th scope="row">Safari</th>
        <td>17.2+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Edge</th>
        <td>118+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Opera</th>
        <td>104+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
    </tbody>
  </table>
</div>

The most straightforward approach is to use feature queries with `@supports`:

```css
/* Fallback styles using BEM or other naming conventions */
.card {
    /* Your fallback styles here */
}

/* Modern browsers get the scoped version */
@supports (selector(@scope)) {
    @scope (.card) {
        /* Your scoped styles here */
    }
}
```

## Advanced Scoping Techniques

### Multiple Selectors

You can scope multiple selectors together, which is particularly useful for shared component styles:

```css
@scope (.card, .article) {
    /* These styles apply to both .card and .article */
    img {
        aspect-ratio: 16/9;
    }

    h3 {
        font-size: 1.5rem;
    }
}
```

### Pseudo-classes and States

`@scope` works seamlessly with pseudo-classes, allowing you to scope interactive states:

```css
@scope (.card) {
    /* Base styles */
    background: white;

    /* Hover state */
    &:hover {
        background: #f5f5f5;
        transform: translateY(-2px);
    }

    /* Focus state for accessibility */
    &:focus-within {
        outline: 2px solid blue;
    }
}
```

### Media Queries

Media queries can be used within scoped styles to create responsive components:

```css
@scope (.card) {
    display: grid;
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 2fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: 1fr 3fr;
    }
}
```

## CSS Variables and Inheritance

Scoped CSS variables follow a specific inheritance pattern:

```css
:root {
    --color-primary: blue;
}

@scope (.card) {
    /* Override global variable within scope */
    --color-primary: red;

    /* Use the scoped variable */
    border: 2px solid var(--color-primary);

    /* Nested scopes inherit from parent scope */
    .card__header {
        color: var(--color-primary); /* Uses red from parent scope */
    }
}
```

## Performance and Specificity

`@scope` affects CSS specificity in a unique way. It creates a new specificity layer that's more specific than regular CSS but less specific than `!important`. This can help reduce the need for overly specific selectors while maintaining predictable style application.

```css
/* This has higher specificity than regular CSS */
@scope (.card) {
    .title { /* Specificity: .card .title */
        color: blue;
    }
}

/* But lower than !important */
.title {
    color: red !important; /* This wins */
}
```

## Common Pitfalls to Avoid

1. **Over-nesting**: While `@scope` allows nesting, deep nesting can make styles harder to maintain:
```css
/* Avoid this */
@scope (.card) {
    .content {
        .header {
            .title {
                /* Too deep! */
            }
        }
    }
}
```

2. **Global Style Leakage**: Remember that styles inside `@scope` can still affect global elements if not properly scoped:
```css
/* This affects ALL buttons on the page */
@scope (.card) {
    button {
        /* Global effect! */
    }
}

/* Better: scope to the card's buttons only */
@scope (.card) {
    :scope button {
        /* Only affects buttons within .card */
    }
}
```
