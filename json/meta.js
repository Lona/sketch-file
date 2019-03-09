module.exports = (pages, version) => ({
  commit: '120f488f43e85cae5c74eeae99d970dcf7fe443d',
  pagesAndArtboards: pages.reduce((prev, p, i) => {
    prev[p.id] = {
      name: p.name || `Page ${i}`,
      artboards: {},
    }
    return prev
  }, {}),
  version: version || 99,
  fonts: [],
  compatibilityVersion: version || 99,
  app: 'com.bohemiancoding.sketch3',
  autosaved: 0,
  variant: 'NONAPPSTORE',
  // the following don't really matter
  created: {
    commit: '120f488f43e85cae5c74eeae99d970dcf7fe443d',
    appVersion: '51.2',
    build: 57519,
    app: 'com.bohemiancoding.sketch3',
    compatibilityVersion: version || 99,
    version: version || 99,
    variant: 'NONAPPSTORE',
  },
  saveHistory: ['NONAPPSTORE.57519'],
  appVersion: '51.2',
  build: 57519,
})
