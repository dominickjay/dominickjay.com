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

## Introduction

In this post, we are going to look into React components, what they are, what types are available and how we can create them. We'll then quickly scale up a project using the CRA, and put together a custom component to see how it all clicks together.

<aside-block type="prerequisites" heading="Prerequisites" text="
      <ul>
        <li>You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using <code>`node -v`</code> and <code>`npm -v`</code> - this is in order to use the CRA effectively</li>
        <li>We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - <a href='https://reactjs.org/docs/introducing-jsx.html'>Introducing JSX</a></li>
      </ul>"></aside-block>


## What is it?

So, what is a component?

_Components are independent pieces of functionality that you can reuse in your application, and are the building blocks of all React applications. Often, they can be simple JavaScript functions and classes, but you use them as if they were customized HTML elements. Buttons, menus, and any other front-end page content can all be created as components. Components can also contain state information and display markdown._

## Types of components

### Functional

A functional component is basically a JavaScript/ES6 function that returns a React element (JSX). According to React's official docs, the function below is a valid functional component:

Alternatively, you can also create a functional component with the arrow function definition:

This function is a valid React component because it accepts a single “props” (which stands for properties) object argument with data and returns a React element. — reactjs.org

To be able to use a component later, you need to first export it so you can import it somewhere else:

After importing it, you can call the component like in this example:

So a Functional Component in React:

- is a JavaScript/ES6 function
- must return a React element (JSX)
- always starts with a capital letter (naming convention)
- takes props as a parameter if necessary

### Class

The second type of component is the class component. Class components are ES6 classes that return JSX. Below, you see our same Welcome function, this time as a class component:

`js class Welcome extends React.Component { render() { return <h1>Hello, {this.props.name}</h1> } }`

A Class Component:

- is an ES6 class, will be a component once it ‘extends’ a React component.
- takes Props (in the constructor) if needed
- must have a render( ) method for returning JSX

Different from functional components, class components must have an additional render( ) method for returning JSX.

### High Order

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

Concretely, a higher-order component is a function that takes a component and returns a new component.

const EnhancedComponent = higherOrderComponent(WrappedComponent);

Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

HOCs are common in third-party React libraries, such as Redux’s connect and Relay’s createFragmentContainer.

In this document, we’ll discuss why higher-order components are useful, and how to write your own.

## Component life cycle

[https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Using the CLI

`npx generate-react-cli component MyComponent`

## Rendering a component

Previously, we only encountered React elements that represent DOM tags:

`const element = <div />;`

However, elements can also represent user-defined components:

`const element = <Welcome name="Sara" />;`

When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

### Passing props

## UI Patterns

### Compound components

Compound components can be said to be a pattern that encloses the state and the behavior of a group of components but still gives the rendering control of its variable parts back to the external user.

From the definition above, taking note of the keywords: state and behavior. This helps us understand that compound component deal with state (i.e. how state behaves across a component which is enclosed by an external user being the parent of the component).

The objective of compound components is to provide a more expressive and flexible API for communication between the parent and the child components.

### Controlled components

### Recursive components

## Styling

### Styled components

````

```

```

```

```
````
