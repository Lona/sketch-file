const fs = require('fs')
const jszip = require('jszip')

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

function readAndParseFileInZip(zip, filePath) {
  return zip
    .file(filePath)
    .async('string')
    .then(JSON.parse)
}

module.exports.readSketchFile = async filePath => {
  const data = await readFile(filePath)
  const zip = await jszip.loadAsync(data)

  const pagesPromises = []
  zip
    .folder('pages')
    .forEach(relativePath =>
      pagesPromises.push(readAndParseFileInZip(zip, `pages/${relativePath}`)),
    )

  const imagesPromises = []
  zip.folder('images').forEach(relativePath =>
    imagesPromises.push(
      zip
        .file(`images/${relativePath}`)
        .async('nodebuffer')
        .then(buffer => ({
          id: relativePath.replace('.png', ''),
          buffer,
        })),
    ),
  )

  const [document, meta, user, pages, images] = await Promise.all([
    readAndParseFileInZip(zip, 'document.json'),
    readAndParseFileInZip(zip, 'meta.json'),
    readAndParseFileInZip(zip, 'user.json'),
    Promise.all(pagesPromises),
    Promise.all(imagesPromises),
  ])

  return {
    document,
    meta,
    user,
    pages,
    images: images.reduce((prev, i) => {
      prev[i.id] = i.buffer
      return prev
    }, {}),
  }
}

module.exports.createNewSketchFile = (documentId, pages, version) => {
  if (!documentId) {
    documentId = require('./generateId')()
  }
  if (!pages) {
    pages = [
      {
        id: require('./generateId')(),
      },
    ]
  }

  return {
    document: require('./json/document')(documentId, pages),
    meta: require('./json/meta')(pages, version),
    user: require('./json/user')(pages),
    pages: pages.map((p, i) => require('./json/page')(p, i)),
    images: {},
  }
}

module.exports.writeSketchFile = ({ document, meta, user, pages, images }, filePath) => {
  const zip = new jszip()
  pages.forEach(p => zip.file(`pages/${p.do_objectID}.json`, JSON.stringify(p)))
  document.pages = pages.map(page => ({
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${page.do_objectID}`,
  }))
  zip.file('document.json', JSON.stringify(document))
  zip.file('meta.json', JSON.stringify(meta))
  zip.file('user.json', JSON.stringify(user))
  Object.keys(images).forEach(id => zip.file(`images/${id}`, images[id]))

  return new Promise((resolve, reject) => {
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
        resolve()
      })
      .on('error', reject)
  })
}

module.exports.generateId = require('./generateId')
