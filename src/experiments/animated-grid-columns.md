---
title: 'animated grid columns'
description: The offset-path CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.
date: Created
tags:
  - experiments
  - css
layout: experiments
---

<style>

  .animated-grid {
    flex: 1 1 auto;
    display: grid;
    gap: 1rem;
    height: 450px;
    transition: .75s ease-in-out;
  }

  .animated-grid__column {
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

  .animated-grid__column img {
    position: absolute;
    right: 0;
    left: 0;
    width: 200px;
    object-fit: cover;
    bottom: 0;
    top: 0;
    height: 100%;
  }

  .animated-grid:has(.animated-grid__column--1.open) {
    grid-template-columns: 2fr 0.5fr 0.5fr;
  }

  .animated-grid:has(.animated-grid__column--2.open) {
    grid-template-columns: 0.5fr 2fr 0.5fr;
  }

  .animated-grid:has(.animated-grid__column--3.open) {
    grid-template-columns: 0.5fr 0.5fr 2fr;
  }

  .column-content {
    width: 225px;
  }

  .animated-grid__column .intro {
    margin-top: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 300;
  }

  .attribute {
    position: relative;
    margin-inline: auto;
    text-align: center;
    max-width: 750px;
    font-weight: 300;
  }

  .attribute a {
    font-weight: 500;
  }

  .heading {
    font-size: 1.85rem;
  }
</style>

<div class="relative">
  <div class="animated-grid" x-data="{
    open: 2
  }">
		<div
      class="animated-grid__column animated-grid__column--1"
      x-data="{
        id: 1,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
			<div class="column-content">
				<span class="h3 heading">Heading</span>
        <div class="intro">Labore culpa anim eiusmod aute ut consectetur anim velit dolore fugiat. Irure commodo ad aute aliqua. Elit adipisicing velit deserunt sunt est nisi. Cillum enim ex incididunt ut fugiat officia ad commodo deserunt velit amet id cupidatat consequat. Id magna qui velit esse occaecat sunt esse ad consectetur sint aliquip laboris esse.</div>
			</div>
			<div class="column-image">
				<img src="https://placeskull.com/350/650" />
			</div>
		</div>
		<div
      class="animated-grid__column animated-grid__column--2"
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
        <div class="intro">Labore culpa anim eiusmod aute ut consectetur anim velit dolore fugiat. Irure commodo ad aute aliqua. Elit adipisicing velit deserunt sunt est nisi. Cillum enim ex incididunt ut fugiat officia ad commodo deserunt velit amet id cupidatat consequat. Id magna qui velit esse occaecat sunt esse ad consectetur sint aliquip laboris esse.</div>
			</div>
			<div class="column-image">
				<img src="https://placeskull.com/350/650" />
			</div>
		</div>
		<div
      class="animated-grid__column animated-grid__column--3"
      x-data="{
        id: 3,
      }"
      :class="{
        'open': id == open
      }"
      @click="open = id"
    >
			<div class="column-content">
				<span class="h3 heading">Heading</span>
        <div class="intro">Labore culpa anim eiusmod aute ut consectetur anim velit dolore fugiat. Irure commodo ad aute aliqua. Elit adipisicing velit deserunt sunt est nisi. Cillum enim ex incididunt ut fugiat officia ad commodo deserunt velit amet id cupidatat consequat. Id magna qui velit esse occaecat sunt esse ad consectetur sint aliquip laboris esse.</div>
			</div>
			<div class="column-image">
				<img src="https://placeskull.com/350/650" />
			</div>
		</div>
	</div>
	<p class="attribute">Skull images from <a href="placeskull.com">placeskull.com</a></p>
</div>
