---
title: "Let's React: Create React App"
description: 'A deep dive into Create React App - a tool for building single page applications'
intro: "For this post, we're going to do a deep dive into 'Create React App' (CRA). We'll look into what it is, what it's useful for, how to set it up and - after setting it up - what is created. Plus, advantages and disadvantages of its use and lastly, where you can take it next."
date: Created
tags:
  - react
  - writing

links:
  [
    {
      'title': 'Create react app docs',
      'target': 'https://create-react-app.dev',
    },
    {
      'title': 'React docs: create react app',
      'target': 'https://reactjs.org/docs/create-a-new-react-app.html#create-react-app',
    },
    {
      'title': 'Enabling server-side rendering in React for improved app performance',
      'target': 'https://blog.logrocket.com/why-you-should-render-react-on-the-server-side-a50507163b79/',
    },
    {
      'title': 'You Should Choose Vite Over CRA for React Apps, Here’s Why',
      'target': 'https://medium.com/codex/you-should-choose-vite-over-cra-for-react-apps-heres-why-47e2e7381d13',
    },
  ]
layout: 'layouts/post.njk'
---

## What is 'Create React App'?

So, what is it? 'Create React App' is a tool to create single-page React applications, and generates a project holding a skeleton structure of files and folders. According to the official [documentation](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) this setup allows the use of _"the latest JavaScript features, provides a nice developer experience, and optimizes your app for production"_.

## Setting up a project

Now we know _what_ it is, let's start using it.

<aside-block type="prerequisites" heading="Prerequisites" text="
      You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v`."></aside-block>

### Install the 'Create React App' package

Rather than installing the CRA packaging directly using `npm i create-react-app`, we are going to use `npx`. This is a tool that allows you to run packages without having a global or local installation. In a similar fashion to an `npm` command, we will use `npx create-react-app my-app` to get started. If you are using `yarn` like I do, use the command `yarn create-react-app learn-react`. To use `npx`, you will need to have npm 5.2+ or higher.

<aside-block type="info" heading="Using typescript? No problem" text="
      If you intend on using Typescript in your React project, just add `--template typescript` to the `create-react-app` command. We're sticking with 'regular' Javascript for this, but it doesn't differ too much."></aside-block>

Looking at our output in the folder directory, this is what we are given;

```txt
README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    reportWebVitals.js
    setupTests.js
```

For the project to build, these files must exist with exact filenames:

    public/index.html is the page template;
    src/index.js is the JavaScript entry point.

You can delete or rename the other files.

### After project setup

Run `yarn start` to open the project up on the default port of 3000 - and get started!

### Eject from CRA

The CRA has a distinct advantage of only having one dependency to manage - `react-scripts`. While it is great to only have to manage one dependency, and not have to deal with the underlying packages, sometime we need/want to. So what then? In this instance, the CRA team included a command `npm run eject`. This command takes all the configuration files and other dependencies such as webpack and Babel and copies them into your projects `package.json` file as seperate dependencies.

<div class="fyi-block fyi-block--warning">
  <span class="heading">Point of no return</span>
  <p>Running the `npm run eject` or `yarn eject` commands is irreversible, so make sure you choose wisely as to whether or not you want to run this command. There is an alternative however, which we will cover below, so don't be too trigger happy.</p>
</div>

#### Eject alternatives

Running eject isn't highly recommended however, as there are tools that can allow for overriding dependencies _without_ ejecting. CRACO for example, which stands for Create React App Configuration Override can override parts of the create-react-app tool while still allowing for the advantage of CRA's one dependecy to be taken advantage of.

## Advantages & Disadvantages

Ultimately, using the CRA tool seems like a great way forward to creating Single Page Applications in React, but surely there's some downsides? Let's run through some advantages and disadvantages of using this.

### Advantages

A great start to this is that there's **less to learn**, you don't need to find out the ins-and-outs to configure any of the build tools used such as Webpack or Babel, and there's also instant browser reload to help with development. There's also **only one dependency** so when it comes to the pieces that make up the CRA, we don't need to worry about versions being out-of-date, or not being compatible.

### Disadvantages

It's not all sunshine though, as always there are some downsides. The CRA does have a lot of dependencies stored in it that will be included regardless of it actually being used. Running the `eject` command on our previously installed CRA app, will result in a vastly different `package.json` file which you can see below. For context, I've removed the content around the dependencies section.

```json
{
  "dependencies": {
    "@babel/core": "7.12.3",
    "@pmmmwh/react-refresh-webpack-plugin": "0.4.3",
    "@svgr/webpack": "5.5.0",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@typescript-eslint/eslint-plugin": "^4.5.0",
    "@typescript-eslint/parser": "^4.5.0",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^26.6.0",
    "babel-loader": "8.1.0",
    "babel-plugin-named-asset-import": "^0.3.7",
    "babel-preset-react-app": "^10.0.0",
    "bfj": "^7.0.2",
    "camelcase": "^6.1.0",
    "case-sensitive-paths-webpack-plugin": "2.3.0",
    "css-loader": "4.3.0",
    "dotenv": "8.2.0",
    "dotenv-expand": "5.1.0",
    "eslint": "^7.11.0",
    "eslint-config-react-app": "^6.0.0",
    "eslint-plugin-flowtype": "^5.2.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jest": "^24.1.0",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.2.0",
    "eslint-plugin-testing-library": "^3.9.2",
    "eslint-webpack-plugin": "^2.5.2",
    "file-loader": "6.1.1",
    "fs-extra": "^9.0.1",
    "html-webpack-plugin": "4.5.0",
    "identity-obj-proxy": "3.0.0",
    "jest": "26.6.0",
    "jest-circus": "26.6.0",
    "jest-resolve": "26.6.0",
    "jest-watch-typeahead": "0.6.1",
    "mini-css-extract-plugin": "0.11.3",
    "optimize-css-assets-webpack-plugin": "5.0.4",
    "pnp-webpack-plugin": "1.6.4",
    "postcss-flexbugs-fixes": "4.2.1",
    "postcss-loader": "3.0.0",
    "postcss-normalize": "8.0.1",
    "postcss-preset-env": "6.7.0",
    "postcss-safe-parser": "5.0.2",
    "prompts": "2.4.0",
    "react": "^17.0.2",
    "react-app-polyfill": "^2.0.0",
    "react-dev-utils": "^11.0.3",
    "react-dom": "^17.0.2",
    "react-refresh": "^0.8.3",
    "resolve": "1.18.1",
    "resolve-url-loader": "^3.1.2",
    "sass-loader": "^10.0.5",
    "semver": "7.3.2",
    "style-loader": "1.3.0",
    "terser-webpack-plugin": "4.2.3",
    "ts-pnp": "1.2.0",
    "url-loader": "4.1.1",
    "web-vitals": "^1.0.1",
    "webpack": "4.44.2",
    "webpack-dev-server": "3.11.1",
    "webpack-manifest-plugin": "2.2.0",
    "workbox-webpack-plugin": "5.1.4"
  }
}
```

Let's compare this 'ejected' version to the one created by default upon running the tool;

```json
{
  "name": "create-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.0.0",
    "@testing-library/user-event": "^13.2.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

There is a huge difference in the amount of dependencies shown. So, all of this is brought into a project everytime CRA is used to build it. If you only use CSS, and not SASS...well you're getting the functionality to use SASS anyway. There is also a disadvantage when it comes to adding custom build configs, as ejecting the app would mean that you didn't have only one build dependency. Then again, we can resolve these issues CRA also uses Client Side Rendering by default, which means that the main javascript file in our built project will be downloaded first before any other assets. Also, development time can be slower than other tools, such as Vite, depending on the size of the project. Vite is built on top of esbuild whereas CRA is built on top of Webpack, and for comparison, esbuild continually builds projects much faster than CRA does. This is written about in more depth in [this](https://medium.com/codex/you-should-choose-vite-over-cra-for-react-apps-heres-why-47e2e7381d13) article by Can Durmus.
