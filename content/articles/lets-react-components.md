---
title: 'Just React: Components'
description: 'A deep dive into React components'
date: 2022-02-18
tags:
  - react

links:
  [
    {
      'title': 'Components and Props',
      'target': 'https://reactjs.org/docs/components-and-props.html',
    },
  ]
---

1. Quick desc of components
1. Types of components
   1. Functional
   1. Class
   1. High Order
1. Life cycle
1. Creating a component with the cli
1. Rendering a component
   1. Passing props
1. UI Patterns
   1. Compound components
   1. Controlled components
   1. Recursive components
1. Styling
   1. Styled components

## Introduction

In this post, we are going to look into React components, what they are, what types are available and how we can create them. We'll then quickly scale up a project using the CRA, and put together a custom component to see how it all clicks together.

<aside class="prerequisites">

<div class="aside__content">

**Prerequisites**

- You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v` - this is in order to use the CRA effectively
- We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

</div>

</aside>

<aside class="info">

<svg class="aside__icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 1.895a18.107 18.107 0 1 0 18.107 18.107A18.128 18.128 0 0 0 20 1.895Zm0 32.639a14.532 14.532 0 1 1 14.532-14.532A14.548 14.548 0 0 1 20 34.534Z" fill="#222"/><path d="M19.215 14.693a2.42 2.42 0 1 0 0-4.842 2.42 2.42 0 0 0 0 4.842ZM17.63 16.86a1.44 1.44 0 0 0 .252 2.856h.142v7.971h-.77a1.231 1.231 0 0 0-1.23 1.231 1.231 1.231 0 0 0 1.23 1.232h5.492a1.232 1.232 0 0 0 1.232-1.232 1.231 1.231 0 0 0-1.232-1.23h-.761V17.511a1.243 1.243 0 0 0-1.484-1.219c-1.242.246-2.821.559-2.87.567Z" fill="#222"/></svg>

<div class="aside__content">

**Prerequisites**

- You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v` - this is in order to use the CRA effectively
- We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

</div>

</aside>

<aside class="warning">

<svg class="aside__icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M39.534 33.577 23.978 2.466a4.445 4.445 0 0 0-7.955 0L.467 33.576a4.39 4.39 0 0 0 .2 4.312A4.445 4.445 0 0 0 4.445 40h31.111a4.432 4.432 0 0 0 3.778-2.11 4.371 4.371 0 0 0 .2-4.312Zm-19.533 1.978a3.334 3.334 0 1 1 0-6.668 3.334 3.334 0 0 1 0 6.668Zm2.177-10.68a2.222 2.222 0 0 1-4.355 0l-2.2-11.111A2.22 2.22 0 0 1 17.8 11.11h4.406a2.221 2.221 0 0 1 2.178 2.654l-2.207 11.11Z" /></g><defs><clipPath id="a"><path d="M0 0h40v40H0z"/></clipPath></defs></svg>

<div class="aside__content">

**Prerequisites**

- You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v` - this is in order to use the CRA effectively
- We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

</div>

</aside>

<aside class="error">

<svg class="aside__icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M39.534 33.577 23.978 2.466a4.445 4.445 0 0 0-7.955 0L.467 33.576a4.39 4.39 0 0 0 .2 4.312A4.445 4.445 0 0 0 4.445 40h31.111a4.432 4.432 0 0 0 3.778-2.11 4.371 4.371 0 0 0 .2-4.312Zm-19.533 1.978a3.334 3.334 0 1 1 0-6.668 3.334 3.334 0 0 1 0 6.668Zm2.177-10.68a2.222 2.222 0 0 1-4.355 0l-2.2-11.111A2.22 2.22 0 0 1 17.8 11.11h4.406a2.221 2.221 0 0 1 2.178 2.654l-2.207 11.11Z" /></g><defs><clipPath id="a"><path d="M0 0h40v40H0z"/></clipPath></defs></svg>

<div class="aside__content">

**Prerequisites**

- You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v` - this is in order to use the CRA effectively
- We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

</div>

</aside>

## What is it?

So, what is a component?

_Components are independent pieces of functionality that you can reuse in your application, and are the building blocks of all React applications. Often, they can be simple JavaScript functions and classes, but you use them as if they were customized HTML elements. Buttons, menus, and any other front-end page content can all be created as components. Components can also contain state information and display markdown._

## Types of components

### Functional

### Class

### High Order

## Component life cycle

## Using the CLI

## Rendering a component

### Passing props

## UI Patterns

### Compound components

### Controlled components

### Recursive components

## Styling

### Styled components
