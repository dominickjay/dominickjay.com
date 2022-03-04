<template>
  <main>
    <div class="container">
        <section class="content credits">
            <h2 class="heading heading--two">{{ credits.title }}</h2>
            <p class="intro">{{ credits.intro }}</p>
            <nuxt-content :document="credits" />
        </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ $content }) {
    const credits = await $content('credits').fetch()
    return {
      credits,
      date: String
    }
  },
})
</script>

<style lang="scss" scoped>
    h2 {
        text-align: left;
        position: relative;
    }
    .intro {
      opacity: 0.65;
      font-size: var(--step-1);
    }
</style>