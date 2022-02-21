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
import getShareImage from '@jlengstorf/get-share-image'
import getSiteMeta from '~/utils/getSiteMeta.js'

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
  --code-block-background: #efefef;
  --aside-background: rgba(255, 255, 255, 0.15);
  --aside-border: var(--clr-fifth-dk);
  --aside-icon: var(--clr-fifth-dk);
}

@media (prefers-color-scheme: dark) {
  :root {
    --code-block-background: #000000;
  }

  :root:not([data-user-color-scheme]) {
    --code-block-background: #000000;
  }
}

[data-user-color-scheme='dark'] {
  --code-block-background: #000000;
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

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: var(--code-block-background);
  text-shadow: none;
}

.token.regex,
.token.important,
.token.variable {
  color: #bb8117;
}

.token.token.operator {
  background: none;
}

p + h2 {
  margin-top: 40px;
}

p > code {
  background: var(--code-block-background);
  padding: 2px 4px;
  font-weight: var(--fw-base-lg);
}

@media (prefers-color-scheme: dark) {
  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: var(--code-block-background);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #d4d0ab;
  }

  .token.punctuation {
    color: #fefefe;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ffa07a;
  }

  .token.boolean,
  .token.number {
    color: #00e0e0;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #abe338;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #00e0e0;
    background: none;
  }

  .token.atrule,
  .token.attr-value,
  .token.function {
    color: #ffd700;
  }

  .token.keyword {
    color: #00e0e0;
  }

  .token.regex,
  .token.important {
    color: #ffd700;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  @media screen and (-ms-high-contrast: active) {
    code[class*='language-'],
    pre[class*='language-'] {
      color: windowText;
      background: window;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: window;
    }

    .token.important {
      background: highlight;
      color: window;
      font-weight: normal;
    }

    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.selector {
      font-weight: bold;
    }

    .token.attr-value,
    .token.comment,
    .token.doctype,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.property,
    .token.string {
      color: highlight;
    }

    .token.attr-value,
    .token.url {
      font-weight: normal;
    }
  }
}

aside {
  position: relative;
  padding: 20px 40px;
  padding-left: 25px;
  margin: 40px 0;
  border-left: 15px solid;
  background-color: var(--aside-background);
  &.info {
    --aside-background: rgba(96, 146, 153, 0.15);
    border-left-color: var(--aside-border);
  }
  &.warning {
    --aside-background: rgba(234, 90, 79, 0.15);
    border-left-color: var(--clr-sixth);
  }
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
</style>
