<template>
  <div class="post">
    <time v-if="article">
      <span>
        {{ formatDate(article.date) }}
      </span>
    </time>
    <div class="post-content">
      <span v-if="article" class="title">
        <nuxt-link :to="article.path">
          {{ article.title }}
        </nuxt-link>
      </span>
      <span v-else class="title">
        {{ draft.title }}
        <span class="status"> - {{ draft.status }} </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    draft: {
      type: Object,
      default: null
    },
    article: {
      type: Object,
      default: null
    }
  },
  computed: {
    isDrafts () {
      return this.$route.name === 'drafts'
    }
  },
  methods: {
    formatDate (date) {
      const options = { day: 'numeric', month: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  font-size: var(--step-0);
  display: flex;
  gap: var(--grid-gap);
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 10px;
  padding-right: 40px;
  text-align: left;
  overflow: hidden;
  & .title {
    font-weight: var(--fw-base-m);
    flex: 1;
    font-size: var(--step-0);
    margin-bottom: 10px;
    position: relative;
  }
  & a.title {
    text-decoration: underline;
    text-decoration-color: var(--clr-links);
    text-decoration-thickness: 2px;
    transition: .2s ease-out text-decoration-color;
    &:hover {
      text-decoration-color: var(--clr-links-active);
    }
  }
}

time {
  text-align: right;
  display: flex;
  font-family: var(--ff-alt);
  font-size: var(--step-0);
  font-weight: var(--fw-base-lg);
  opacity: 0.75;
}

.status {
    font-weight: var(--fw-base);
}

@media (max-width: 640px) {
  .post {
    padding: 10px 0;
  }
}
</style>
