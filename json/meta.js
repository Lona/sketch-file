module.exports = pages => ({
  commit: '120f488f43e85cae5c74eeae99d970dcf7fe443d',
  pagesAndArtboards: pages.reduce((prev, p, i) => {
    prev[p.id] = {
      name: p.name || `Page ${i}`,
      artboards: {},
    }
    return prev
  }, {}),
  version: 105,
  fonts: [],
  compatibilityVersion: 99,
  app: 'com.bohemiancoding.sketch3',
  autosaved: 0,
  variant: 'NONAPPSTORE',
  created: {
    commit: '120f488f43e85cae5c74eeae99d970dcf7fe443d',
    appVersion: '51.2',
    build: 57519,
    app: 'com.bohemiancoding.sketch3',
    compatibilityVersion: 99,
    version: 105,
    variant: 'NONAPPSTORE',
  },
  saveHistory: ['NONAPPSTORE.57519'],
  appVersion: '51.2',
  build: 57519,
})
