<template>
  <main>
    <div class="container">
      <section class="content about">
        <div class="about-me-content">
          <p>Hey! I'm Dom <span class="wave-emoji"> 👋 </span></p>
          <p class="about-intro">
            I'm a <strong>Front-End Developer</strong> based out of Plymouth,
            UK. I specialise in creating digital solutions that are
            <strong>fun</strong> and <strong>creative</strong>. I don't like
            speaking about myself in the 3rd person.
          </p>
          <decoratedLink
            link-target="about"
            post-title="Learn more about me"
          ></decoratedLink>
        </div>
      </section>
      <section class="content">
        <div class="posts-wrapper">
          <div class="posts-recent">
            <h3 class="heading heading--three">Recently Published</h3>
            <postsList :posts="posts"></postsList>
            <decoratedLink
              link-target="articles"
              post-title="View all posts"
            ></decoratedLink>
          </div>
          <tagsList :tags="tags"></tagsList>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const posts = await $content('articles').limit(3).sortBy('date', 'desc').fetch()
    const tags = await $content('tags').fetch()
    return {
      posts,
      tags,
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: 'https://dominickjay.com/images/card-image.png',
        },
      ]
    }
  }
})
</script>

<style lang="scss">
:root {
  --all-posts-link: var(--gray-100);
  --all-posts-link-hover: var(--gray-900);
}

@media (prefers-color-scheme: dark) {
  :root {
    --all-posts-link: var(--gray-900);
    --all-posts-link-hover: var(--gray-100);
  }

  :root:not([data-user-color-scheme]) {
    --all-posts-link: var(--gray-900);
    --all-posts-link-hover: var(--gray-100);
  }
}

[data-user-color-scheme='dark'] {
  --all-posts-link: var(--gray-900);
  --all-posts-link-hover: var(--gray-100);
}

.about {
  padding: 60px 0;
  margin: 0 auto;
  text-align: left;
  font-weight: var(--fw-base-m);
  font-size: var(--step-1);
  display: flex;
  gap: var(--grid-gap);
  & > p:first-child {
    opacity: 0.85;
    text-align: left;
  }
}

.about-me-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--grid-gap);
}

.posts-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--grid-gap);
}

.posts-recent {
  grid-column: 1 / 3;
}

.posts-recent .heading {
  margin: 0;
  margin-bottom: 20px;
  -webkit-text-fill-color: unset;
  font-weight: 500;
}

@media (max-width: 992px) {
  .about {
    margin: 0 auto;
    padding: 40px 0;
    flex-direction: column;
    & div {
      width: 100%;
    }
    .generative-canvas svg {
      display: none;
    }
  }
  .posts-recent {
    grid-row: 2;
  }
}

@media (max-width: 640px) {
  .about {
    padding: 20px 0;
  }
}
</style>
