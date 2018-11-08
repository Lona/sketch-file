module.exports = pages =>
  Object.assign(
    {
      document: {
        pageListHeight: 110,
      },
    },
    pages.reduce((prev, p, i) => {
      prev[p.id] = {
        scrollOrigin: '{26, 26}',
        zoomValue: 1,
      }
      return prev
    }, {}),
  )
