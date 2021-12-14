---
title: 'Just react: create-react-app'
description: "One of my personal goals for 2022 is to write more about React. Let's get started"
date: 2022-01-01
tags:
  - React

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

What are we going to learn:

1. What is create-react-app?
1. What is it useful for?
1. How do we set this up?
1. After setup, what is created?

## What is create-react-app?

## Setting up a project

### Prerequisites

You’ll need to have Node >= 14.0.0 and npm >= 5.6 on your machine

### Install create-react-app

Install create-react-app with `npm i create-react-app` or `yarn add create-react-app`. For this post, I am using my preferred choice of package manager, which is Yarn.

Create a new project using CRA, using the command `yarn create-react-app learn-react`

![](/images/blog/learn-react-create-react-app/project-layout.png)

### What is created here?

let's understand what's given to us here:

#### node_modules

node_modules is a

#### public

excluding favicons

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
