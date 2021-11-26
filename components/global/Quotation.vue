<template>
  <div class="blockquote">
    <p>{{ quote }}</p>
    <a :href="target">{{ link }}</a>
  </div>

</template>

<script>
export default {
  props: {
    target: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    quote: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

.blockquote {
  margin-block: 2em;
  padding-block: 3em;
  padding-inline: 4em;
  background-color: var(--clr-third-lt);
  & p {
    font-size: var(--step-2);
    margin: 0 0 20px;
  }
  & a {
    position: relative;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: block;
      height: 2px;
      width: 40px;
      background-color: #E85A4F;
      position: relative;
      margin-right: 20px;
    }
  }
}

</style>
