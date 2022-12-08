---
title: 'Just React: Deconstructing React Components'
description: 'Components all the way down'
intro: "In this post, we are going to look into React components, what they are, what types are available and how we can create them. We'll also quickly scale up a project using the CRA, and put together a custom component to see how it all clicks together."
date: Created
tags:
  - writing
  - react
layout: 'layouts/post.njk'
links:
  [
    {
      'title': 'Components and Props',
      'target': 'https://reactjs.org/docs/components-and-props.html',
    },
    {
      'title': 'How To Create Custom Components in React',
      'target': 'https://www.digitalocean.com/community/tutorials/how-to-create-custom-components-in-react'
    }
  ]
---

## Prerequisites

You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v` - this is in order to use the CRA effectively. We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - [Introducting JSX](https://reactjs.org/docs/introducing-jsx.html)

## What is it?

Let's get this out the way, what is a component? Digital Ocean's ["How To Create Custom Components in React"](https://www.digitalocean.com/community/tutorials/how-to-create-custom-components-in-react) article explains this quite well:

>...components are independent pieces of functionality that you can reuse in your application, and are the building blocks of all React applications. Often, they can be simple JavaScript functions and classes, but you use them as if they were customized HTML elements. Buttons, menus, and any other front-end page content can all be created as components.

In this site, I have a few different components. Here are the 3 primary ones that I use a lot of:

`<decorated-link post-title="This is a link component"></decorated-link>`
`<aside-block type="info" heading="And..." text="This is another that I use for displaying info, warnings and errors"></aside-block>`

These are all components with code that I can use again and again. In the case of the link and info block, additional data is passed in - which is why the text involved makes more sense in context to our article and demonstration. These inputs are called props and we will go into more detail [here](#passing-props).

## Types of components

While we now know the gist of components, it's time to go a bit deeper. There are a few different types of components, all with their own different purposes.

### Functional

First off is a functional component. This is a component that is a Javascript function that returns a React element in JSX, and can take in a **prop** if necessary. The below is an example of a simple functional component.

```jsx
function FavouriteBand(props) {
  return <p>My favourite band is {props.bandName}</p>
}
```

### Class

The second type of component is known as the class component, and is commonly used in React projects. These are ES6 classes that return JSX. The obvious differences in the markup is the addition of `extends React.Component`, which will identify it as a React component, and `render()` which is used to return the JSX markup. Here is an example of our functional component above, refactored to be a class component;

```jsx
  class FavoriteBand extends React.Component {
    render() {
      return <p>My favorite band is {this.props.name}</p> }
    }
  }
```

#### Differences between functional and class components

<div class="grid grid-cols-2 fl-my-l border-2 border-dashed">
  <div class="col-start-1 col-span-1 flex flex-col items-center fl-pb-s border-r-2 border-dashed">
    <span class="fl-p-s font-semibold border-b-2 border-dashed block w-full text-center bg-grey/[0.25]">Functional Components</span>
    <ul class="fl-px-s fl-pt-s flex !gap-y-[10px] items-stretch flex-col !list-none">
      <li>A functional component is just a plain JavaScript function that accepts props as an argument and returns a React element.</li>
      <li>There is no render method used in functional components.</li>
      <li>Also known as Stateless components as they simply accept data and display them in some form, that they are mainly responsible for rendering UI.</li>
      <li>React lifecycle methods (for example, componentDidMount) cannot be used in functional components.</li>
      <li>Hooks can be easily used in functional components.</li>
    </ul>
  </div>
  <div class="col-start-2 col-span-1 flex flex-col items-center fl-pb-s">
    <span class="fl-p-s font-semibold border-b-2 border-dashed block w-full text-center bg-grey/[0.25]">Class Components</span>
    <ul class="fl-px-s fl-pt-s flex !gap-y-[10px] items-stretch flex-col !list-none">
      <li>A class component requires you to extend from React. Component and create a render function which returns a React element.</li>
      <li>It must have the render() method returning HTML</li>
      <li>Also known as Stateful components because they implement logic and state.</li>
      <li>React lifecycle methods can be used inside class components (for example, componentDidMount).</li>
      <li>It requires different syntax inside a class component to implement hooks.</li>
      <li>Constructor are used as it needs to store state.</li>
    </ul>
  </div>
</div>

### High Order

A higher-order component, or HOC, is a bit different to the previous two components, instead they are a function that takes a component and returns a new component. They are an advanced method for reusing component logic and enhancing it. Commonly, HOC's are found in third-party React libraries - such as Redux's connect and Relay's createFragmentContainer.

<!-- ```jsx[FavoriteBandHOC.js]
  const enhancedFavoriteBand = FavoriteBand => {
    class favoriteBandHOC extends React.Component {
      getBandName() {
        console.log('The returned value is ' + this.props.bandName)
      }
      render() {
        return <FavoriteBand bandName="Deftones"/>
      }
    }
    return favoriteBandHOC
  }
``` -->

## Rendering a component

Previously, we only encountered React elements that represent DOM tags:

`const element = <div />;`

However, elements can also represent user-defined components:

`const element = <Welcome name="Sara" />;`

When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

### Passing props

## Component life cycle

[https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<diagram></diagram>

## Using the CLI

While the Create React App tool can help us with a skeleton setup of a project, it doesn't give us the ability to create new components when needed as it is build to be as non-opinionated as possible, allowing the developer to make other structural decisions such as grouping by feature or by file type. This is different to other languages like Angular - where `ng generate component component-name` is used - that have this functionality built it into its own CLI.

So what can we use? This topic seems like one with a few options, but it _does_ seem to come down to preference rather than best practice. If you use VSCode as an IDE, there is a Folder Templates plugin that can set up a component for you after a short manual process to setup the plugin. But if you want a CLI based solution we could use the `Generate React CLI` npm package.

<div class="fyi-block fyi-block--warning">
  <span class="heading">FYI</span>
  <p>This is not necessary, just as example to show how you <i>could</i> set it up if you wanted</p>
</div>

`npx generate-react-cli component Component`
