<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.slug" class="post-list__item">
      <post :post="post"></post>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import { createClient } from '@supabase/supabase-js'

export default Vue.extend({
  props: {
    posts: {
      type: [Array, Object],
      default: null
    }
  },
  async asyncData () {
    const supabase = createClient(
      process.env.supabaseUrl,
      process.env.supabaseKey
    );
    const { data, error } = await supabase.from('voting').select('*');
    return {
      data,
      error
    }
  },
  data() {
    return {
      data: Object,
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
})
</script>

<style lang="scss" scoped>

.post-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

</style>
