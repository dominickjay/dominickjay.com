<template>
  <div class="body">
    <HeaderBar />
    <nuxt />
    <Spacer />
    <FooterBar />
  </div>
</template>

<script>
export default {
}
</script>

<style>

@font-face {
  font-family: var(--display);
  src: url("/fonts/Faune-DisplayBlack.otf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: var(--sans-serif);
  src: url("/fonts/Faune-TextRegular.otf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: var(--code);
  src: url("/fonts/CascadiaMono-Regular.otf") format("truetype");
  font-display: swap;
}

:root {

  --gray-100: #f9f9f9;
  --gray-200: #c3c3c3;
  --gray-300: #8e8e8e;
  --gray-400: #585858;
  --gray-500: #222222;
  --blue-100: #b9dcdf;
  --blue-200: #88bdc8;
  --blue-300: #9dced2;
  --blue-400: #3f6982;
  --blue-500: #283e51;
  --orange-100: #feb171;
  --orange-200: #fea65d;
  --orange-300: #fe9948;
  --orange-400: #fe9b49;
  --orange-500: #fe8420;
  --red-100: #ef8881;
  --red-200: #ed776f;
  --red-300: #ea665c;
  --red-400: #e8554a;
  --red-500: #e54438;

  --font-weight-300: 300;
  --font-weight-500: 500;
  --font-weight-700: 700;
  --font-weight-900: 900;
  --line-height: 1.8;

  --padding: 20px;
  --grid-gap: 20px;

  --space-2xs: clamp(0.56rem, calc(0.65rem + -0.10vw), 0.63rem);
  --space-xs: clamp(0.88rem, calc(0.96rem + -0.10vw), 0.94rem);
  --space-s: clamp(1.13rem, calc(1.29rem + -0.21vw), 1.25rem);
  --space-m: clamp(1.69rem, calc(1.94rem + -0.31vw), 1.88rem);
  --space-l: clamp(2.25rem, calc(2.58rem + -0.42vw), 2.50rem);
  --space-xl: clamp(3.38rem, calc(3.88rem + -0.62vw), 3.75rem);
  --space-2xl: clamp(4.50rem, calc(5.17rem + -0.83vw), 5.00rem);

  /* One-up pairs */
  --space-2xs-xs: clamp(0.63rem, calc(0.54rem + 0.42vw), 0.88rem);
  --space-xs-s: clamp(0.94rem, calc(0.88rem + 0.31vw), 1.13rem);
  --space-s-m: clamp(1.25rem, calc(1.10rem + 0.73vw), 1.69rem);
  --space-m-l: clamp(1.88rem, calc(1.75rem + 0.63vw), 2.25rem);
  --space-l-xl: clamp(2.50rem, calc(2.21rem + 1.46vw), 3.38rem);
  --space-xl-2xl: clamp(3.75rem, calc(3.50rem + 1.25vw), 4.50rem);

  /* Custom pairs */
  --space-s-l: clamp(1.25rem, calc(0.92rem + 1.67vw), 2.25rem);

  --transition-duration: .25s;
  --transition-timing: ease-in-out;
  --transition-property: all;

  --sans-serif: 'Faune';
  --display: 'Faune DB';
  --code: 'CascadiaMono', ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
          "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono",
          "Droid Sans Mono", "Courier New", monospace;

  --container: 1280px;

  --color-mode: 'light';

  --step--1: clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem);
  --step-0: clamp(1.00rem, calc(0.96rem + 0.21vw), 1.13rem);
  --step-1: clamp(1.20rem, calc(1.13rem + 0.34vw), 1.41rem);
  --step-2: clamp(1.44rem, calc(1.33rem + 0.53vw), 1.76rem);
  --step-3: clamp(1.73rem, calc(1.57rem + 0.78vw), 2.20rem);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-mode: 'dark';
  }

  :root:not([data-user-color-scheme]) {
    --color-mode: 'dark';
  }
}

[data-user-color-scheme='dark'] {
  --color-mode: 'dark';
}

@media screen and (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

body {
  font-size: var(--step-0);
  line-height: var(--line-height);
  font-weight: var(--font-weight-500);
  font-family: var(--sans-serif);
  color: var(--gray-500);
  background-color: var(--gray-100);
}

b,
strong {
  font-family: var(--display);
  letter-spacing: 0.5px;
}

strong {
  font-weight: var(--font-weight-500);
  font-size: var(--step-1);
  position: relative;
  line-height: 1;
}

a,
button {
  font-family: var(--sans-serif);
  color: var(--gray-500);
  text-decoration: none;
}

a:hover,
button:hover {
  text-decoration: none;
}

a:not([class]),
a[class=""],
button:not([class]) {
  text-decoration: underline;
  text-decoration-color: var(--red-500);
  text-decoration-thickness: 2px;
  transition: .2s ease-out text-decoration-color;
}

a:not([class]):hover,
a[class=""]:hover,
button:hover {
  text-decoration-color: var(--red-500);
}

main {
  position: relative;
  margin-block-end: var(--space-l);
}

@media (max-width: 640px) {
  ul:not([class]) {
    padding-inline-start: var(--space-m);
  }
}

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding-inline: var(--space-l);
}

.heading {
  font-family: var(--display);
  letter-spacing: -0.5px;
  color: var(--blue-500);
}

.heading--two {
  font-size: var(--step-4);
  text-align: center;
}

.heading--three {
  font-size: var(--step-3);
}

.content {
  padding: 40px 0;
  margin-bottom: 40px;
}

.content:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .content {
    padding-block: var(--padding);
  }
}

</style>
