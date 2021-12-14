<template>
  <div class="post">
    <nuxt-link v-if="!isDrafts" :to="post.path" class="title">
      {{ post.title }}
    </nuxt-link>
    <span v-else class="title">
      {{ post.title }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    post: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      result: Number,
      likes: Number,
      dislikes: Number,
      loves: Number
    }
  },
  computed: {
    isDrafts () {
      return this.$route.name === 'drafts'
    }
  },
 async created() {
  },
  methods: {
    async saveResult(title: any, result: any) {
      await this.$supabase
        .from('voting')
        .insert([
            { post_title: title, result }
        ])
    }
  }
})
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
  &:hover .options,
  &:focus .options {
    opacity: 1;
    filter: grayscale(0);
  }
}

.status {
    font-weight: var(--fw-base);
}

.options {
  opacity: 0.25;
  display: flex;
  filter: grayscale(1);
  gap: 10px;
  transition: var(--trn-default);
  & button {
    background: transparent;
    border: 0;
    display: flex;
    gap: 5px;
    cursor: pointer;
    &:hover {
      &::before {
        transform: scale(1.05);
      }
    }
    &.love::before {
      content: "💓";
    }
    &.like::before {
      content: "👍";
    }
    &.dislike::before {
      content: "👎";
    }
  }
}

@media (max-width: 640px) {
  .post {
    padding: 10px 0;
  }
}
</style>
