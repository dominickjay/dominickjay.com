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

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;0,900;1,300;1,500;1,700;1,900&display=swap');

@font-face {
  font-family: var(--ff-alt-alpha);
  src: url("/fonts/Hackney.ttf")  format("truetype");
  font-display: swap;
}

@font-face {
  font-family: var(--ff-heading);
  src: url("/fonts/Faune-DisplayBlack.otf")  format("truetype");
  font-display: swap;
}

@font-face {
  font-family: var(--ff-heading-tb);
  src: url("/fonts/Faune-TextBold.otf")  format("truetype");
  font-display: swap;
}

:root {

  --clr-base:    #f9f9f9;
  --clr-base-dk: #222222;
  --clr-primary: #9dced2;
  --clr-secondary: #283e51;
  --clr-third: #fe9948;
  --clr-third-lt: #fcb276;
  --clr-third-dk: #fe7d15;
  --clr-fifth: #568389;
  --clr-fifth-lt: #609299;
  --clr-fifth-dk: #4c7479;
  --clr-sixth-lt: #f47a71;
  --clr-sixth: #E85A4F;

  --trn-default: .25s ease-in-out all;
  --base-background: var(--clr-base);
  --ff-color: var(--clr-base-dk);
  --strong-color: var(--clr-base-dk);
  --clr-links: var(--clr-base-dk);
  --clr-links-active: var(--clr-sixth);
  --ff-base: 'Poppins', helvetica, arial, sans-serif;
  --ff-alt-alpha: 'Hackney';
  --ff-heading: 'Faune';
  --ff-heading-tb: 'Faune TB';
  --fw-base: 300;
  --fw-base-m: 500;
  --fw-base-lg: 700;
  --fw-base-xl: 900;
  --ff-lh: 1.8;
  --color-mode: 'light';
  --container-width: 1280px;
  --grid-gap: 20px;
  --padding-df: 20px;
  --padding-tb: var(--padding-df) 0;
  --padding-lr: 0 var(--padding-df);
  --heading-gradient: linear-gradient(to bottom, var(--clr-fifth-lt) 0%, var(--clr-base-dk) 90%);
  --fluid-min-width: 320;
  --fluid-max-width: 1024;
  --fluid-screen: 100vw;
  --fluid-bp: calc(
    (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
      (var(--fluid-max-width) - var(--fluid-min-width))
  );
  --f--1-min: 13.33;
  --f--1-max: 12.80;
  --step--1: calc(var(--f--1-min)/16*1rem + (var(--f--1-max) - var(--f--1-min))*var(--fluid-bp));
  --f-0-min: 16.00;
  --f-0-max: 16.00;
  --step-0: calc(
    ((var(--f-0-min) / 16) * 1rem) + (var(--f-0-max) - var(--f-0-min)) *
      var(--fluid-bp)
  );
  --f-1-min: 19.20;
  --f-1-max: 20.00;
  --step-1: calc(
    ((var(--f-1-min) / 16) * 1rem) + (var(--f-1-max) - var(--f-1-min)) *
      var(--fluid-bp)
  );
  --f-2-min: 23.04;
  --f-2-max: 25.00;
  --step-2: calc(
    ((var(--f-2-min) / 16) * 1rem) + (var(--f-2-max) - var(--f-2-min)) *
      var(--fluid-bp)
  );
  --f-3-min: 27.65;
  --f-3-max: 31.25;
  --step-3: calc(
    ((var(--f-3-min) / 16) * 1rem) + (var(--f-3-max) - var(--f-3-min)) *
      var(--fluid-bp)
  );
  --f-4-min: 33.18;
  --f-4-max: 39.06;
  --step-4: calc(
    ((var(--f-4-min) / 16) * 1rem) + (var(--f-4-max) - var(--f-4-min)) *
      var(--fluid-bp)
  );
  --f-5-min: 39.81;
  --f-5-max: 48.83;
  --step-5: calc(
    ((var(--f-5-min) / 16) * 1rem) + (var(--f-5-max) - var(--f-5-min)) *
      var(--fluid-bp)
  );
}

@media screen and (min-width: 1140px) {
  :root {
    --fluid-screen: calc(var(--fluid-max-width) * 1px);
  }
}

@media screen and (min-width: 1024px) {
  :root {
    --fluid-screen: calc(var(--fluid-max-width) * 1px);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-mode: 'dark';
    --base-background: var(--clr-base-dk);
    --ff-color: var(--clr-base);
    --clr-links: var(--clr-base);
    --heading-gradient: linear-gradient(to bottom, var(--clr-third-dk) 0%, var(--clr-base) 90%);
  }

  :root:not([data-user-color-scheme]) {
    --color-mode: 'dark';
    --base-background: var(--clr-base-dk);
    --ff-color: var(--clr-base);
    --clr-links: var(--clr-base);
    --heading-gradient: linear-gradient(to bottom, var(--clr-third-dk) 0%, var(--clr-base) 90%);
  }
}

[data-user-color-scheme='dark'] {
  --color-mode: 'dark';
  --base-background: var(--clr-base-dk);
  --ff-color: var(--clr-base);
  --clr-links: var(--clr-base);
  --heading-gradient: linear-gradient(to bottom, var(--clr-third-dk) 0%, var(--clr-base) 90%);
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
  line-height: var(--ff-lh);
  font-weight: var(--fw-base);
  font-family: var(--ff-base);
  color: var(--ff-color);
  background-color: var(--base-background);
}

b,
strong {
  font-family: var(--ff-heading);
  letter-spacing: 0.5px;
}

strong {
  font-weight: var(--fw-base);
  font-size: var(--step-1);
  position: relative;
  line-height: 1;
}

a,
button {
  font-family: var(--ff-base);
  color: var(--ff-color);
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
  text-decoration-color: var(--clr-links);
  text-decoration-thickness: 2px;
  transition: .2s ease-out text-decoration-color;
}

a:not([class]):hover,
a[class=""]:hover,
button:hover {
  text-decoration-color: var(--clr-links-active);
}

main {
  position: relative;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  ul:not([class]) {
    padding-left: 20px;
  }
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 40px;
}

.heading {
  font-family: var(--ff-heading);
  letter-spacing: -0.5px;
  background-image: var(--heading-gradient);
  background-clip: text;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
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
    padding: 20px 0;
  }
}

</style>
