<template>
  <div
    v-if="isHome"
    class="hero"
  >
    <span class="hero__fact">
      <div class="hero__heading">
        <p data-hero-heading="Leave it better">Leave it better</p>
        <p data-hero-heading="Than you found it">Than you found it</p>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    isHome () {
      return this.$route.name === 'index'
    }
  },
}
</script>

<style lang="scss">

.hero {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--space-m);
    align-items: center;
    position: relative;
    padding-block-start: var(--space-l);
    padding-block-end: var(--space-m);
    margin: 0;
    width: 100%;
    &__heading {
        font-size: 6rem;
        text-transform: lowercase;
        line-height: 0.25;
        color: var(--blue-400);
        & p {
            position: relative;
            margin: 0;
            line-height: 1;
            font-weight: var(--font-weight-900);
            font-family: var(--display);
        }
        & p::before {
            content: attr(data-hero-heading);
            position: absolute;
            top: -5px;
            left: -5px;
            color: var(--blue-300);
            text-shadow: 0 1px 0 #ccc, 0 0px 0 #ccc, 0 2px 0 #ccc, 0 2px 0 #ccc, 0 2px 0 #ccc, 0 6px 0 transparent, 0 4px 0 transparent, 0 3px 0 transparent, 0 4px 0 transparent, 0 6px 6px rgba(#4c7479, 0.4);
            -webkit-text-stroke: 1px var(--blue-500);
            opacity: 0.85;
        }
    }

}

@media (max-width: 1100px) {
  .hero {
    padding-block: var(--space-l);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 0;
  }
}

@media (max-width: 640px) {
    .hero__heading p {
        padding: 0;
        font-size: 3rem;
        &::before {
            width: 100%;
        }
    }
}

</style>
