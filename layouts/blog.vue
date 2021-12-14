<template>
  <div class="body">
    <HeaderBar />
    <main>
      <div class="container">
        <nuxt />
      </div>
    </main>
    <Spacer />
    <FooterBar />
  </div>
</template>

<style lang="scss">

.blog-posts {
  list-style: none;
  padding-left: 0;
  width: 100%;
}

.blog .heading {
  display: inline-block;
  text-align: left;
}

.posts {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: var(--grid-gap);
}

.posts .posts-wrapper {
  margin-top: 82px;
}

@media (max-width: 992px) {
  .posts .posts-wrapper {
    grid-row: 2;
    margin-top: 0;
  }
}

</style>
