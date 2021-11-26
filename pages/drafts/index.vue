<template>
  <section class="content blog">
    <div class="posts posts--drafts">
      <div class="sidebar">
        <h2
          class="heading heading--two"
        >
          What's Coming Up?
        </h2>
        <p>
          I write about technologies that I'm currently diving into, my development on this site, setups and goals. In these posts, I go through problems, solutions and how I am - infact - not Batman.
        </p>
        <p>See all of my <strong>{{ posts.length }}</strong> posts <a href="/articles">here</a>.</p>
      </div>
      <div class="posts-wrapper">
        <postsList :posts="posts"></postsList>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'blog',
  async asyncData ({ $content }) {
    const posts = await $content('drafts').sortBy('date', 'desc').fetch()

    return {
      posts
    }
  },
})
</script>

<style lang="scss">

.posts {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: var(--grid-gap);
}

@media (max-width: 992px) {
  .posts .posts-wrapper {
    grid-row: 2;
  }
}

@media (max-width: 640px) {

  .posts .posts-wrapper {
    margin-top: 0;
  }

  .sidebar {
    grid-column: 1 / -1;
    top: 0;
    position: relative;
  }

}

</style>
