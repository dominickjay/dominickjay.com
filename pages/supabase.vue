<template>
  <main>
    <div class="container">
      {{ recipes }}
      {{ error }}
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { createClient } from '@supabase/supabase-js'

export default Vue.extend({
  async asyncData ({ $content }) {
    const posts = await $content('articles').limit(3).sortBy('date', 'desc').fetch()
    const tags = await $content('tags').fetch()
    const supabase = createClient('https://typhiugqpeglnunhjvcl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjczMjQwMiwiZXhwIjoxOTUyMzA4NDAyfQ._vSzwVzJR8EYZ_Dfl8eHBCdzOQxaP42sQcDEM8fZZ0Y')
    const { data, error } = await supabase.from('recipes').select('*')
    console.log(data);
    return {
      posts,
      tags,
      recipes: data,
      error
    }
  },
})
</script>

<style lang="scss">
</style>
