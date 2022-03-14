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
    const posts = await $content('drafts').sortBy('date').fetch()
    return {
      posts
    }
  },
})
</script>
