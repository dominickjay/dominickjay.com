export default async () =>
  await fetch(
    'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=86a5b41a85035739e32c576f027c4765&format=json'
  )