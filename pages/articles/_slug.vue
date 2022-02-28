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

<script lang>
import Prism from 'prismjs'
import getShareImage from '@jlengstorf/get-share-image'
import getSiteMeta from '~/utils/getSiteMeta.js'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

export default {
  async asyncData({ $content, params }) {
    const { year, month, slug } = params

    const article = await $content('articles', year, month, slug).fetch()

    const socialImage = getShareImage({
      title: article.title,
      tagline: article.tags,
      cloudName: 'dominickjay217',
      imagePublicID: 'post-template',
      textAreaWidth: '850',
      titleColor: '203140',
      titleBottomOffset: '300',
      titleLeftOffset: '220',
      titleFont: 'Hackney.ttf',
      titleExtraConfig: '_bold',
      titleFontSize: '100',
      taglineFont: 'Hackney.ttf',
      taglineFontSize: '45',
      taglineLeftOffset: '225',
      taglineTopOffset: '450',
    })

    return {
      article,
      socialImage,
    }
  },
  data() {
    return {
      tags: this.article,
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Dominick Jay' },
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://dominickjay.com/articles/${this.$route.params.slug}`,
        },
      ],
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
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `https://dominickjay.com/articles/${this.$route.params.slug}`,
        mainImage: this.socialImage,
      }
      return getSiteMeta(metaData)
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
:root {
  --blog-gradient: var(--heading-gradient);
}

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

h2 {
  font-family: var(--ff-heading);
  font-weight: 400;
}

.post {
  color: var(--ff-color);
  .heading {
    margin-top: 0;
    font-weight: 900;
    line-height: 1.6;
  }
  .subheading {
    margin-block: 20px;
    display: block;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.4;
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
      content: '0' counter(section);
      position: absolute;
      font-weight: var(--fw-base-lg);
      opacity: 0.5;
      font-size: var(--step--1);
      left: -25px;
      top: 2px;
    }
  }
  h3 {
    font-weight: var(--fw-base-lg);
  }
}

iframe,
img {
  margin: 40px auto;
}

p + h2 {
  margin-top: 40px;
}

p > code {
  background: var(--code-block-background);
  padding: 0 4px 2px;
  font-weight: var(--fw-base-lg);
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
  & h2 {
    font-size: var(--step-1);
  }
  & a {
    font-size: calc(var(--step-0) * 1.05);
    font-family: var(--ff-heading-tb);
    line-height: 1;
    &.nuxt-link-active {
      text-decoration: underline;
      text-decoration-color: var(--clr-links-active);
      text-decoration-thickness: 2px;
    }
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
  .nuxt-content-container > .nuxt-content {
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

</style>
