<template>
  <main>
    <div class="container">
      {{ voting[0].likes }}
      {{ voting[0].loves }}
      {{ voting[0].dislikes }}
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	async asyncData({ $supabase }) {
		const { data } = await $supabase.from('voting').select('*')
		return { voting: data }
	},
})
</script>

<style lang="scss">
</style>
