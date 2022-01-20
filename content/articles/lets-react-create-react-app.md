---
title: 'Just React: Create React App'
description: 'A deep dive into Create React App - a tool for building single page applications'
tags:
  - react

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
  ]
---

## Intro

For this post, we're going to do a deep dive into 'Create React App' (CRA). We'll look into what it is, what it's useful for, how to set it up and - after setting it up - what is created. Plus, advantages and disadvantages of its use and lastly, where you can take it next.

## What is 'Create React App'?

So, what is it? 'Create React App' is a tool to create single-page React applications, and generates a project holding a skeleton structure of files and folders. According to the official [documentation](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) this setup allows the use of _"the latest JavaScript features, provides a nice developer experience, and optimizes your app for production"_.

## Setting up a project

Now we know _what_ it is, let's start using it.

<aside class="warning">

**Prerequisites**

You will need to have the following versions of Node & npm installed; Node >= 14.0.0, npm >= 5.6. You can check what versions you have of each by using `node -v` and `npm -v`.

</aside>

### Install the 'Create React App' package

Install the CRA package with `npm i create-react-app` or `yarn add create-react-app`. For this post, I am using my preferred choice of package manager, which is Yarn.

Create a new project using CRA, using the command `yarn create-react-app learn-react`

<aside class="info">

**Using typescript? No problem**

If you intend on using Typescript in your React project, just add `--template typescript` to the `create-react-app` command. We're sticking with "regular" Javascript for this, but it doesn't differ too much.

</aside>

```
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

### Eject from CRA

running `npm run eject` - an irreversible command used to copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) into your project as dependencies in package.json. Technically, the distinction between dependencies and development dependencies is pretty arbitrary for front-end apps that produce static bundles.

Allows for extra configuration from what is delivered "out of the box"

See also [next-steps](#next-steps)

### What is created here?

Let's understand what's given to us here:

#### node_modules

The node_modules directory is a collection of subdirectories and files that could be compared to a cache for the external libraries/modules that the project depends on. The libraries that are inside this directory are downloaded when the `yarn` or `npm install` command is ran, which uses the `package.json` file to determine what needs to be collected. This folder is not traditionally pushed to a repository, due to the `package.json` file referencing everything that is needed for the project anyway.

#### public

The public directory consists of a `robots.txt` file, the relevant favicon images for use in the project, `index.html` and `manifest.json` files. I think it's safe to assume we all know what the images do, and the `robots.txt` file is, so let's see what the the other are used for in this context.

##### index.html

Note the use of `%PUBLIC_URL%` in this file. `%PUBLIC_URL%` is used as a placeholder for the public folder, and will be replaced during the build.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

##### manifest.json

The `manifest.json` file is used to deliver information to the browser from your site when the user is on a mobile device or desktop. It is normally required by Chrome to allow the 'Add to Home Screen' prompt to be enabled. This isn't directly related to React, but it's definetely helpful as part of a skeleton structure.

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

##### robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
```

#### src

##### app.css & index.css

This seems relatively straightforward - the `index.css` file contains _global_ styles for the project, whereas the `app.css` file contains the styles relevant for the App component that is created in `app.js`

<aside class="info">

A component is a _JavaScript class or function that optionally accepts inputs i.e. properties(props) and returns a React element that describes how a section of the UI (User Interface) should appear_. We'll dig into this in a later post.

</aside>

##### app.js & index.js

##### app.test.js

##### reportWebVitals.js

##### setupTests.js

#### root

##### package.json

```json
{
  "name": "learn-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
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

Comparing this to the `package.json` shown in our **What is created here** section above, there is a huge difference in the amount of dependencies shown. So, all of this is brought into a project everytime CRA is used to build it. If you only use CSS, and not SASS...well you're getting the functionality to use SASS anyway.

- Difficult to add custom build configs. One way to add custom configs is to eject the app, but then it overrides the Only one build dependency advantage. The other way is you can use packages like customize-cra or react-app-rewired but then they have limited capabilities.

## Next Steps

[Customizing create-react-app: How to Make Your Own Template](https://auth0.com/blog/how-to-configure-create-react-app/)
