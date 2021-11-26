<template>
  <main>
    <div class="container">
      <section class="content now">
        <nuxt-content :document="nowPage" />
        <strong>My most recently played song/podcast</strong> episode is
        <strong v-if="artist" class="track track__name">{{ track }}</strong>
        by <strong v-if="track" class="track track__artist">{{ artist }}</strong>
        <p>This page is inspired by Derek Sivers
          <a href="https://nownownow.com/">Now project</a>.
        </p>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ $content }) {
    const nowPage = await $content('now-page').fetch()
    return {
      nowPage
    }
  },
  data () {
    return {
      artist: String,
      track: String
    }
  },
  async created () {
  // GET request using fetch with async/await
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&api_key=' + process.env.lastFm + '&format=json')
    const data = await response.json()
    this.artist = data.recenttracks.track[0].artist['#text']
    this.track = data.recenttracks.track[0].name
  }
})
</script>

<style lang="scss">

.now strong {
    font-size: var(--step-1);
    background: none;
}

</style>
