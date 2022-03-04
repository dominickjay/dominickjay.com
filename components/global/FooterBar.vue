<template>
  <footer class="footer">
    <div class="footer__container">
      <p>© 2015 - 2021 Dominick Jay</p>
      <ul class="footer__links">
        <li class="footer__link">
          <a target="_blank" href="//twitter.com/dominickjay217">Twitter</a>
        </li>
        <li class="footer__link">
          <a target="_blank" href="//linkedin.com/in/dominickjay">Linkedin</a>
        </li>
        <li class="footer__link">
          <a target="_blank" href="//codepen.io/dominickjay217">Codepen</a>
        </li>
        <li class="footer__link">
          <a target="_blank" href="//github.com/dominickjay">Github</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>

.footer {
  padding: var(--space-m);
  padding-block-start: var(--space-xl);
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & p {
    font-size: var(--step--1);
    font-weight: var(--font-weight-500);
    text-align: center;
    padding-right: 7px;
  }
  & ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
    & li {
      &::before {
        content: "/";
        position: relative;
        top: 1px;
      }
    }
    & a {
      padding-inline: 7px;
      font-size: var(--step--1);
    }
  }
}

@media (max-width: 992px) {
  .footer__container {
    flex-direction: column;
  }
  .footer__link:first-child::before {
    content: none;
  }
}
</style>
