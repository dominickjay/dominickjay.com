<template>
  <main>
    <div class="container">
      <section class="content post">
        <article class="blogpost__content">
          <h2 class="heading heading--two">
            {{ article.title }}
          </h2>
          <strong class="subheading">
            {{ article.description }}
          </strong>
          <span class="reading-time"
            >Estimated reading time:<span>{{ readingTime }} min</span></span
          >
          <tagsList :tags="article.tags"></tagsList>
          <div class="content-wrapper">
            <ul class="toc">
              <h2>Table of Contents</h2>
              <li
                v-for="link of article.toc"
                :key="link.id"
                :class="{
                  toc2: link.depth === 2,
                  toc3: link.depth === 3,
                  toc4: link.depth === 4,
                  toc5: link.depth === 5,
                }"
              >
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
            <nuxt-content :document="article" />
            <div v-if="article.links" class="resources">
              <h2>Resources</h2>
              <p>
                Hopefully this was helpful, but if you would like to know more
                about this, you might want to take a look at these links;
              </p>
              <ul class="links-list">
                <li
                  v-for="link in article.links"
                  :key="link.title"
                  class="links-list-item"
                >
                  <a :href="link.target" target="_blank">{{ link.title }}</a>
                </li>
              </ul>
            </div>
            <time>
              Published at:
              <strong>{{
                formatDate(article.date)
              }}</strong>
            </time>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

export default {
  async asyncData({ $content, params }) {
    const { year, month, slug } = params

    const article = await $content('articles', year, month, slug).fetch()

    return {
      article,
    }
  },
  data() {
    return {
      tags: this.article,
    }
  },
  head() {
    return {
      meta:  [
      {
        hid:  "og:type",
        property:  "og:type",
        content:  "article"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: this.article.title
      },
      {
        hid: "og:description",
        property: "og:description",
        content: this.article.description
      },
      {
        hid: "og:image",
        property: "og:image",
        content: this.ogImageUrl
      },
      {
        property: "og:image:width",
        content: "1200"
      },
      {
        property: "og:image:height",
        content: "630"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: this.article.title
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: this.article.description
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: this.ogImageUrl
      }
      ]
    }
  },
  computed: {
    readingTime() {
      let minutes = 0
      const contentString = JSON.stringify(this.article)
      const words = contentString.split(' ').length
      const wordsPerMinute = 200
      minutes = Math.ceil(words / wordsPerMinute)
      return minutes
    },
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {
    formatDate(articleDate) {
      return new Date(articleDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style lang="scss">

.reading-time {
  font-weight: var(--fw-base-lg);
  margin-block: 1em;
  display: flex;
  justify-content: center;
  & span {
    font-weight: var(--fw-base);
    padding-inline: 10px;
  }
}

time {
  display: block;
  margin-bottom: 10px;
  opacity: 0.85;
  & strong {
    font-size: var(--step-0);
  }
}

img[src*='#gif'] {
  max-width: 350px;
}

h2,
h3 {
  font-family: var(--display);
  font-weight: var(--font-weight-300);
}

.post {
  color: var(--ff-color);
  .subheading {
    margin-block: 20px;
    display: block;
    text-align: center;
  }
  .resources {
    padding-block: 20px;
  }
  ol {
    counter-reset: section;
    list-style: none;
    margin-bottom: 1rem;
    margin-left: 0;
    & > li ol {
      margin-bottom: 0;
    }
    & li {
      position: relative;
      margin-left: 25px;
    }
    & li::before {
      counter-increment: section;
      content: counter(section);
      position: absolute;
      font-weight: var(--fw-base-lg);
      opacity: 0.5;
      font-size: var(--step--1);
      left: -25px;
      top: 2px;
    }
  }
}

iframe,
img {
  margin: 40px auto;
}

p + h2 {
  margin-top: 40px;
}

.toc {
  position: sticky;
  margin: 0;
  margin-top: -10px;
  top: 20px;
  list-style: none;
  flex: 1 1 auto;
  min-width: 250px;
  float: right;
  & h2,
  & h3 {
    font-size: var(--step-1);
    font-family: var(--display);
  }
  & a {
    font-size: var(--step-0);
    font-weight: var(--font-weight-300);
  }
  & li {
    padding-left: 5px;
    margin-bottom: 10px;
    &.toc3 {
      padding-left: 25px;
    }
  }
}

.post .nuxt-content-container,
.post .nuxt-content,
.resources {
  position: relative;
  max-width: calc(100% - 350px);
}

.post .nuxt-content-container > .nuxt-content {
  max-width: none;
}

.post .nuxt-content-container ul:not([class]) {
  margin: 1em 0;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  & li {
    margin: 0 0 20px;
  }
}

@media (max-width: 992px) {
  .post .nuxt-content-container,
  .post .nuxt-content,
  .nuxt-content-container > .nuxt-content,
  .resources {
    max-width: none;
  }

  .toc {
    float: none;
    width: 100%;
    padding-left: 0;
    margin-block: 20px;
    position: relative;
    top: 0;
  }
}

code[class*="language-"],
pre[class*="language-"] code {
  font-family: var(--code);
  line-height: var(--line-height);
  color: var(--gray-900);
  text-shadow: none;
  padding: var(--space-l);
  display: block;
}

code {
  font-family: var(--code);
  line-height: var(--line-height);
  color: var(--gray-900);
  background: #F1F6F7;
}

pre[class*="language-"] {
  padding: 0;
  width: 100%;
  display: block;
}

:not(pre) > code[class*="language-"], pre[class*="language-"] {
  background: #F1F6F7;
}

.line-highlight {
  border-left: 10px solid var(--red-100);
  background: rgba(244, 122, 113, 0.25);
  line-height: var(--line-height);
  margin-top: 0.7em;
}

.token.tag {
  color: #6773e3;
}

.token.selector, .token.attr-value, .token.string, .token.char, .token.builtin, .token.inserted {
  color: var(--red-100);
}

.token.property {
  color: var(--orange-500);
}

.token.atrule, .token.attr-name, .token.keyword {
  color: var(--red-500);
}

.token.comment, .token.prolog, .token.doctype, .token.cdata {
  color: grey;
}

.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
  background: none;
}

@media (prefers-color-scheme: dark) {
  code,
  code[class*="language-"],
  pre[class*="language-"] {
    background: hsl(210deg, 30%, 12%);
    color: var(--gray-100);
  }
}

[data-user-color-scheme='dark'] {
  code,
  code[class*="language-"],
  pre[class*="language-"] {
    background: hsl(210deg, 30%, 12%);
    color: var(--gray-100);
  }
}

</style>
