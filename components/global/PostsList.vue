<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.slug" class="post-list__item">
      <div class="post">
        <time v-if="!isDrafts">
          <span>
            {{ formatDate(post.date) }}
          </span>
        </time>
        <nuxt-link v-if="!isDrafts" :to="post.path" class="title">
          {{ post.title }}
        </nuxt-link>
        <span v-else class="title">
          {{ post.title }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    posts: {
      type: [Array, Object],
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
  &-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
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
