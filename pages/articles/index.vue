<template>
  <section class="content blog">
    <div class="posts">
      <div class="sidebar">
        <h2
          class="heading heading--two"
        >
          What's New?
        </h2>
        <p>
          I write about technologies that I'm currently diving into, my development on this site, setups and goals. In these <strong>{{ posts.length }}</strong> posts, I go through problems, solutions and how I am - infact - not Batman.
        </p>
        <tagsList :tags="tags"></tagsList>
        <p>See what posts I'm thinking of writing about <a href="/drafts">here</a>.</p>
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
    const posts = await $content('articles').sortBy('date', 'desc').fetch()
    const tags = await $content('tags').fetch()
    return {
      posts,
      tags,
      date: String
    }
  },
})
</script>

<style lang="scss">

</style>
