<template>
  <section class="content topics">
    <div class="posts">
      <div class="sidebar">
        <span
          class="heading heading--three"
        >
          Tags: {{ $route.params.slug }}
        </span>
        <p>See the rest of my posts <a href="/articles">here</a>.</p>
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
  async asyncData ({ params, error, $content }) {
    try {
      const posts = await $content('articles', { deep: true })
        .where({ tags: { $contains: params.slug } })
        .fetch()
      return { posts }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found'
      })
    }
  }
})
</script>
