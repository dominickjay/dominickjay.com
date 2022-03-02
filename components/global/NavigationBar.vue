<template>
  <ul class="navigation">
    <li class="navigation__item">
      <nuxt-link class="navigation__link" to="/about">About</nuxt-link>
    </li>
    <li class="navigation__item">
      <nuxt-link class="navigation__link" to="/articles">Articles</nuxt-link>
    </li>
  </ul>
</template>

<script>
</script>

<style lang="scss" scoped>

.navigation {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: var(--space-m);
  list-style: none;
  position: relative;
  z-index: 2;
  &__item {
    margin-inline: var(--space-xs);
    position: relative;
  }
  &__link {
    padding-inline: var(--space-m);
    padding-top: var(--space-s);
    font-family: var(--sans-serif);
    font-size: var(--step-1);
    font-weight: var(--font-weight-700);
    letter-spacing: -0.5px;
    border-top: 5px solid transparent;
    transition: var(--transition-property) var(--transition-timing) var(--transition-duration);
    &:hover,
    &.nuxt-link-active {
      border-top: 5px solid var(--red-500);
    }
  }
}

@media (max-width: 992px) {
  .navigation {
    margin-block: var(--space-2xs);
    padding-inline: var(--padding);
  }
}

@media (max-width: 640px) {
  .navigation {
    width: 100%;
    padding: 0;
    justify-content: flex-start;
    margin-block-end: var(--space-l);
  }

  .navigation__item {
    margin-inline-end: var(--space-m);
  }

  .navigation__link {
    padding-inline-start: 5px;
  }
}

</style>