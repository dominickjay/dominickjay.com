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
        <span class="heading heading--three">I've also written posts here</span>
        <div class="external-posts">
          <div v-for="externalPost in externalPosts.experience" :key="externalPost">
            <a :href="externalPost.link">{{ externalPost.title }}</a> <strong>- <span>{{ externalPost.publishedAt }}</span></strong>
          </div>
        </div>
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
    const externalPosts = await $content('external-posts').fetch()
    const tags = await $content('tags').fetch()
    return {
      posts,
      externalPosts,
      tags,
      date: String
    }
  },
})
</script>

<style lang="scss">

.external-posts {
  display: flex;
  flex-direction: column;
  gap: var(--grid-gap);
  & div {
    padding-block: 10px;
    padding-inline: 10px;
  }
  & a {
    padding-right: 5px;
    font-weight: var(--fw-base-m);
    font-size: var(--step-0);
    margin-bottom: 10px;
    position: relative;
  }
  & strong {
    font-size: var(--step-0);
    opacity: 0.75;
  }
}

@media (max-width: 640px) {
  .external-posts {
    & div {
      padding-inline: 0;
      padding-block: 10px;
    }
  }
}

</style>
