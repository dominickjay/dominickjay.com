---
title: 'Controlling Content Flow with reading-order'
description: "Ever wondered how users navigate your content, even when the visual layout is complex? Let's dive into the CSS reading-order property and discover how it gives you control."
intro: ""
pubDate: 'June 16 2025'
tags:
  - css

draft: true
---

## The Accessibility Gap: When Visual Order Betrays Logical Order

For a long time, developers have been able to put together the strangest of layouts that have come from the dark corners of the design team - with very little pushback. Properties like `flex-direction`, `grid-template-areas` and the `order` property have given us a monumental amount of control when dealing with the visual presentation of the elements on the screen, and we can rearrange content to adapt to different screen sizes and user preference with little effort.

Sometimes however, that ability comes with a sidestep of accessibility and performance concerns  *[Extra note: add also - pride - to this].*, and that really isn't acceptable at all. We would warn that a layout *might* affect accessibility, but in some cases it can largely met with a shrug, depending on how much the team cares about providing accessible solutions in the first place. In my current position at [Series Eight](//serieseight.com), accessibility concerns are met with a lot of discussion and push back to find a better path - so the prior 'shrug' example is not a reflection of how our projects are dealt with there. The main challenge has been that while we can change how elements look on the screen, their true order in the DOM is the 'golden truth'.

If we have for example, a layout that is 3 elements (A, B and C) in that order in the DOM, and we've used CSS to reorder them differently (let's say; C, A and B). We would have this;

<style>
    .reading-order-example {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        container: reading-order-example / inline-size;
    }

    @container reading-order-example (max-width: 560px) {
        article {
            width: 100%;
        }
    }



    .reading-order-example article,
    .reading-order-example a {
        border: 1px solid;
        padding: 8px;
        flex-grow: 1;
    }

    .reading-order-example a {
        background-color: var(--color-dark);
        color: var(--color-light);
        cursor: pointer;
    }

    .reading-order-example a:focus-within {
        outline: 1px solid var(--color-dark);
        outline-offset: 2px;
    }

    .reading-order-example a:hover {
        opacity: 0.85;
    }

    .reading-order-example .item--1 {
        order: 2;
    }

    .reading-order-example .item--2 {
        order: 3;
    }

    .reading-order-example .item--3 {
        order: 1;
    }

</style>

<div class="reading-order-example">
    <article class="item item--1">
        <span>Item A</span>
    </article>
    <article class="item item--2">
        <span>Item B</span>
    </article>
    <article class="item item--3">
        <span>Item C</span>
    </article>
</div>


What's the correct order? Visually, yes that is correct - it's done what we want it to do in that specific order. However, for a user navigating the site through the use of a screen reader or a keyboard, this might be counterintuitive. Typically screen readers such as NVDA, JAWS or Voiceover traverse the DOM and read out the content as it is set there, disregarding any extra information that might be in place to reorder it, announcing 'Item A', 'Item B' and 'Item C' in that order. If we use the `tab` key to traverse the DOM, it will once again follow the DOM order, rather than our re-ordered items. If we were to have a submit button or a link as the element for 'Item C' and 'Item A' it will become jarring as the tab order does not reflect the visual order that we see on screen. Understand that might be confusing, so let's visualise that a bit better with an expanded version of our example above. Try using the `tab` key on this page to navigate through this section below, and notice that the focus outline is applied to 'Item A' before 'Item C'.

<div class="reading-order-example">
    <a href="#" class="item item--1">Item A</a>
    <article class="item item--2">
        <span>Item B</span>
    </article>
    <a href="#" class="item item--3">Item C</a>
</div>

The issue of 'how do we make both sides true' has been somewhat of a persistent pain point. There is either an outcome where visual design flexibility is put aside in favor of accessibility, or we over engineer a solution to look to sync the DOM with the visual order, leading to some complex and fragile solutions. Even worse, the difference between visual order and DOM order isn't just an massive inconvience, it also directly goes against web accessibility principles, specifically these two key guidlines;

[WCAG 1.3.2: Meaningful Sequence (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) - "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined."

[WCAG 2.4.3: Focus Order (Level A)](https://www.w3.org/WAI/WCAG20/Understanding/focus-order) - "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability."

Keeping in mind both of these primary accessibility principles, we can surely conclude that a consistent and predictable experience of all users should be the number 1 goal. Breaking this, if it wasn't clear enough by now which hopefully it is, can lead to confusion, frustration and ultimately exclusion.

Now we've got our goal and understand why a difference between visual and logical order is actually pretty reductive in terms of the user experience, let's see how CSS has started to provide the solution. The twin properties `reading-flow` and `reading-order`. Cue fanfare.

## Understanding the Core Concepts: reading-flow and reading-order

<div class="browser-support-table">
  <table>
    <caption>Browser Support for reading-flow and reading-order</caption>
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
        <td>123+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Firefox</th>
        <td>Not yet</td>
        <td><span class="support-no">No</span></td>
      </tr>
      <tr>
        <th scope="row">Safari</th>
        <td>Not yet</td>
        <td><span class="support-no">No</span></td>
      </tr>
      <tr>
        <th scope="row">Edge</th>
        <td>123+</td>
        <td><span class="support-yes">Yes</span></td>
      </tr>
      <tr>
        <th scope="row">Opera</th>
        <td>Not yet</td>
        <td><span class="support-no">No</span></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="fyi-block fyi-block--warning">
	<p>Currently, `reading-flow` is supported in Chrome 123+ and Edge 123+. For other browsers, you'll need to wait for implementation or provide alternative solutions. You can track the implementation status in the <a href="https://drafts.csswg.org/css-display-4/#reading-flow">CSS Display Module Level 4 specification</a>. If you're not using those browsers, then demos in this post won't work, so you might have to switch to a browser that •does• have support, or visualise with your mind's eye.</p>
</div>

These properties are designed specifically to allow for control over the accessibility tree's sequence. This way, we can allow for content that is presented the way our design is put together, and also meets the accessibility principles that we outlined above.

### reading-flow (on the container):

So, what is `reading-flow`? This property controls how the browser determines the default reading order of children that are with a `flex`, `grid` or block container. There are seperate applicable values that can be used on this property, depending on whether the container has one of those `display` properties set. These values are;

- normal (default): Follows DOM order.
- flex-visual: Prioritizes the visual order of flex items.
- flex-flow: Follows the logical flow of flex items (e.g., flex-direction: row-reverse would reverse the reading order).
- grid-rows: Reads grid items row by row.
- grid-columns: Reads grid items column by column.
- grid-order: Follows the explicit order values on grid items.
- source-order: Explicitly forces DOM order, even in grid/flex.

### reading-order (on the items):

So if we have `reading-flow` to do this, what does `reading-order` do differently? Well `reading-order` provides an integer value - similar to how `order` is used - that allows a manual override of the reading order of individual items that are inside a `reading-flow` container. The lower the value, the higher the priority of reading order. If `reading-flow` is not set on the parent then any `reading-order` values set are not taken into account, and is also disregarded if the `reading-flow` container is set to `normal` or `source-order`.

## Best Practices and Considerations

When using these properties, it's best to not overuse it. For accessibility, the default DOM order is always the best - referring back to our 'golden truth' comment earlier. If there was to be a recommendation, it would be to only use this when there's a justified reason for the reordering of elements and if the design absolutely couldn't be achieved without that reordering occurring - after all, it's an enhancement to solve specific layout challenges.

When we look at the browser support table earlier, there's really not a lot of support here currently (as of June 2025 that is). As far as fallback's go, we should probably consider; a prioritisation of semantic HTML and embracing progressive enhancement. Testing the site thoroughly with assistive technologies should be at the forefront too, as without them, we're effectively just giving it a half-baked check that it should work by just looking at the code and the visuals on the screen. If we can test it visually, we should probably test it with screen readers too.
