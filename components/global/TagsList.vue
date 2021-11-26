<template>
  <div class="tags">
    <span class="heading heading--three">
      Topics
    </span>
    <div class="tag-list">
      <span v-for="tag in tags" :key="tag.name">
        <a v-if="tag.name" :href="'tags/' + tag.slug">{{ tag.name }}</a>
        <a v-else :href="'tags/' + tag">{{ tag }}</a>
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

@media (prefers-color-scheme: dark) {
  .tag-list a {
    --clr-tag-text: var(--clr-base-dk);
  }

  *:not([data-user-color-scheme]) .tag-list a {
    --clr-tag-text: var(--clr-base-dk);
  }
}

[data-user-color-scheme='dark'] {
  --clr-tag-text: var(--clr-base-dk);
}

.tags {
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: var(--grid-gap);
  align-content: center;
  & .heading {
    color: var(--ff-color);
    -webkit-text-fill-color: unset;
    font-weight: 500;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--grid-gap);
  margin-bottom: var(--grid-gap);
  & a {
    --clr-tag-text: var(--clr-base-dk);
    display: block;
    padding-block: 5px;
    padding-inline: 10px;
    background-color: var(--clr-third-lt);
    color: var(--clr-tag-text);
    font-size: var(--step-0);
    text-decoration: none;
    text-decoration-thickness: 1px;
    font-weight: var(--fw-base-m);
    transition: var(--trn-default);
  }
  & span {
    transition: var(--trn-default);
    &:hover {
      transform: scale(1.05);
      transition: var(--trn-default);
    }
  }
  & span:hover {
    transform: scale(1.05);
    transition: var(--trn-default);
    & a {
      background-color: var(--clr-third);
      transition: var(--trn-default);
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
