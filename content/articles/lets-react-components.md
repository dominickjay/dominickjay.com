---
title: 'Just React: Components'
description: 'Components all the way down'
date: 2022-02-18
tags:
  - react

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

## Introduction

In this post, we are going to look into React components, what they are, what types are available and how we can create them. We'll also quickly scale up a project using the CRA, and put together a custom component to see how it all clicks together.

<aside-block type="prerequisites" heading="Prerequisites" text="
      <ul>
        <li>You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using <code>`node -v`</code> and <code>`npm -v`</code> - this is in order to use the CRA effectively</li>
        <li>We will be using JSX, so some knowledge of that would be helpful. Here's a page from the official React docs - <a href='https://reactjs.org/docs/introducing-jsx.html'>Introducing JSX</a></li>
      </ul>"></aside-block>


## What is it?

Let's get this out the way, what is a component?

Digital Ocean's ["How To Create Custom Components in React"](https://www.digitalocean.com/community/tutorials/how-to-create-custom-components-in-react) article explains this quite well:

<div class="blockquote">

_...components are independent pieces of functionality that you can reuse in your application, and are the building blocks of all React applications. Often, they can be simple JavaScript functions and classes, but you use them as if they were customized HTML elements. Buttons, menus, and any other front-end page content can all be created as components._

</div>

In this site, I have a few different components. Here are the 3 primary ones that I use a lot of:

<decorated-link post-title="This is a link component"></decorated-link>

<aside-block type="info" heading="And..." text="This is another that I use for displaying info, warnings and errors"></aside-block>

<div class="spacer-example">

  __And this is another...__
  <spacer></spacer>

</div>

These are all components with code that I can use again and again. In the case of the link and info block, additional data is passed in - which is why the text involved makes more sense in context to our article and demonstration. These inputs are called props and we will go into more detail [here](#passing-props).

## Types of components

While we now know the gist of components, it's time to go a bit deeper. There are a few different types of components, all with their own different purposes.

### Functional

First off is a functional component. This is a component that is a Javascript function that returns a React element. The below is an example of a simple functional component.

```jsx[FavoriteBand.js]
function FavouriteBand(props) {
  return <p>My favourite band is {props.bandName}</p>
}
```

After importing it using `import FavoriteBand from './FavoriteBand'`, you can call the component like in this example:

```jsx[App.js]
const element = <FavouriteBand name="Deftones" />;
```

So a Functional Component in React:

- is a JavaScript/ES6 function
- must return a React element (JSX)
- always starts with a capital letter (naming convention)
- takes props as a parameter if necessary

### Class

The second type of component is known as the class component, and is commonly used in React projects. These are ES6 classes that return JSX. The obvious differences in the markup is the addition of `extends React.Component`, which will identify it as a React component, and `render()` which is used to return the JSX markup. Here is an example of our functional component above, refactored to be a class component;

```jsx{1, 2}[FavoriteBand.js]
  class FavoriteBand extends React.Component {
    render() {
      return <p>My favorite band is {this.props.name}</p> }
    }
  }
```

#### Differences between functional and class components

**DO AS A DIAGRAM OR SOMETHING**

https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/?ref=rp

### High Order

A higher-order component, or HOC, is a bit different to the previous two components, instead they are a function that takes a component and returns a new component. They are an advanced method for reusing component logic and enhancing it.

```jsx[FavoriteBandHOC.js]
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
```

**HOCs are common in third-party React libraries, such as Redux’s connect and Relay’s createFragmentContainer.**

## Component life cycle

[https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<diagram></diagram>

## Using the CLI

While the Create React App tool can help us with a skeleton setup of a project, it doesn't give us the ability to create new components when needed as it is build to be as non-opinionated as possible, allowing the developer to make other structural decisions such as grouping by feature or by file type. This is different to other languages like Angular - where `ng generate component component-name` is used - that have this functionality built it into its own CLI.

So what can we use? This topic seems like one with a few options, but it _does_ seem to come down to preference rather than best practice. If you use VSCode as an IDE, there is a Folder Templates plugin that can set up a component for you after a short manual process to setup the plugin. But if you want a CLI based solution we could use the `Generate React CLI` npm package.

<aside-block type="warning" heading="FYI" text="This is not necessary, just as example to show how you <i>could</i> set it up if you wanted"></aside-block>

<code class="language-bash">npx generate-react-cli component Component</code>

## Rendering a component

Previously, we only encountered React elements that represent DOM tags:

`const element = <div />;`

However, elements can also represent user-defined components:

`const element = <Welcome name="Sara" />;`

When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

### Passing props

React Props are like function arguments in JavaScript and attributes in HTML.

To send props into a component, use the same syntax as HTML attributes:
Example

Add a "brand" attribute to the Car element:

`const myelement = <Car brand="Ford" />;`


The component receives the argument as a props object:
Example

Use the brand attribute in the component:

```jsx
function Car(props) {
  return <h2>I am a { props.brand }!</h2>;
}
```


## UI Patterns

### Compound components

Compound components can be said to be a pattern that encloses the state and the behavior of a group of components but still gives the rendering control of its variable parts back to the external user.

From the definition above, taking note of the keywords: state and behavior. This helps us understand that compound component deal with state (i.e. how state behaves across a component which is enclosed by an external user being the parent of the component).

The objective of compound components is to provide a more expressive and flexible API for communication between the parent and the child components.

### Controlled components

Controlled components in React are those in which form data is handled by the component’s state.

Forms are used to store information in a document section. The information from this form is typically sent to a server to perform an action. This data is held by form input elements and control elements, such as input, select, textarea, etc., which maintain and control their states or values.

What do I mean by that?

Each form element contains a value. The value may be typed (input, textarea) or selected (checkbox, select, radiobutton, etc) by the user or browser. When the element’s value is changed (triggered by the act of typing or selecting), it is updated accordingly.

You can get the value of an element using the .value property in its HTMLElement instance. You can also use the .value property to set values in the form elements.

Now we can use state in our component to hold or manage the values of the elements in a form element.

#### Controlled vs Uncontrolled


- Controlled components are predictable because the state of the form elements is handled by the component
- Uncontrolled components are not predictable because, during the lifecycle of a component, the form elements can lose their reference and may be changed/affected by other sources
- Controlled components enable you to effectively employ form validation to your forms. It doesn’t matter what changes the form elements. Their values are safe in our local states, so that’s where we perform our validation
- With controlled components, you are very much in control of your form elements’ values. You can dictate how they go and what can and cannot be inserted


### Recursive components

## Styling

### Styled components

Styled Components is a modern tool used to generate components out of the most basic HTML elements, which also allows you to write your custom CSS styles for them in JavaScript by making use of the tagged template literals feature.

Styled Components gets rid of the mapping between components and styles, so, when declaring your CSS, what you're actually doing is creating a regular React component that has its own styles attached.
