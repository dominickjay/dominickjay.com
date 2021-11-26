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

</style>
