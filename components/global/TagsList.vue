<template>
  <div class="tags">
    <span class="heading heading--three">
      Topics
    </span>
    <div class="tag-list">
      <span v-for="tag in tags" :key="tag.name">
        <a v-if="tag.name" :href="'/tags/' + tag.slug">{{ tag.name }}</a>
        <a v-else :href="'/tags/' + tag">{{ tag }}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: [Object, Array],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

.tags {
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  align-content: center;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  margin-bottom: var(--space-s);
  & a {
    display: block;
    padding-block: 5px;
    padding-inline: var(--space-s);
    border: 2px solid var(--orange-300);
    font-size: var(--step-0);
    text-decoration: none;
    text-decoration-thickness: 1px;
    transition: var(--transition-property) var(--transition-timing) var(--transition-duration);
  }
  & span {
      transition: var(--transition-property) var(--transition-timing) var(--transition-duration);
    &:hover {
      transition: var(--transition-property) var(--transition-timing) var(--transition-duration);
    }
  }
  & span:hover {
    & a {
      background-color: var(--orange-300);
    }
  }
}

@media (max-width: 992px) {
  .tags {
    max-width: none;
    grid-column: 1 / 3;
  }
}
</style>
