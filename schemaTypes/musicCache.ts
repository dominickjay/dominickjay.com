import { defineField, defineType } from 'sanity'

export const musicCache = defineType({
  name: 'musicCache',
  title: 'Music Cache',
  type: 'document',
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'topTracksJson',
      title: 'Top Tracks JSON',
      type: 'text',
      description: 'Raw JSON from Last.fm user.getTopTracks',
    }),
    defineField({
      name: 'recentArtistsJson',
      title: 'Recent Artists JSON',
      type: 'text',
      description: 'Raw JSON from Last.fm user.getTopArtists',
    }),
  ],
})
