module.exports = (docId, pages) => ({
  _class: 'document',
  do_objectID: docId,
  assets: {
    _class: 'assetCollection',
    colors: [],
    gradients: [],
    imageCollection: {
      _class: 'imageCollection',
      images: {},
    },
    images: [],
  },
  colorSpace: 0,
  currentPageIndex: 0,
  foreignLayerStyles: [],
  foreignSymbols: [],
  foreignTextStyles: [],
  layerStyles: {
    _class: 'sharedStyleContainer',
    objects: [],
  },
  layerSymbols: {
    _class: 'symbolContainer',
    objects: [],
  },
  layerTextStyles: {
    _class: 'sharedTextStyleContainer',
    objects: [],
  },
  pages: pages.map(p => ({
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${p.id}`,
  })),
})
