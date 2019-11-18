import fs from 'fs'
import jszip from 'jszip'

import { generateId as _generateId } from './generateId'
import map from './json/map'

import FileFormat from '@sketch-hq/sketch-file-format-ts'

function readFile(filePath: string) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

function readAndParseFileInZip<T extends {} = any>(zip: jszip, filePath: string): Promise<T> {
  return zip
    .file(filePath)
    .async('text')
    .then(JSON.parse)
}

export const readSketchFile = async (filePath: string) => {
  const data = await readFile(filePath)
  const zip = await jszip.loadAsync(data)

  const pagesPromises: Promise<FileFormat.Page>[] = []
  zip
    .folder('pages')
    .forEach(relativePath =>
      pagesPromises.push(readAndParseFileInZip(zip, `pages/${relativePath}`)),
    )

  const imagesPromises: Promise<{ id: string; buffer: Buffer }>[] = []
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
    readAndParseFileInZip<FileFormat.Document>(zip, 'document.json'),
    readAndParseFileInZip<FileFormat.Meta>(zip, 'meta.json'),
    readAndParseFileInZip<FileFormat.User>(zip, 'user.json'),
    Promise.all(pagesPromises),
    Promise.all(imagesPromises),
  ])

  return {
    document,
    meta,
    user,
    pages,
    images: images.reduce<{ [id: string]: Buffer }>((prev, i) => {
      prev[i.id] = i.buffer
      return prev
    }, {}),
  }
}

export const createNewSketchFile = (
  version?: string,
): {
  document: FileFormat.Document
  meta: FileFormat.Meta
  user: FileFormat.User
  pages: FileFormat.Page[]
  images: { [id: string]: Buffer }
} => {
  const documentId = _generateId()
  const pageId = _generateId()

  const docVersion = map[version] || 118

  return {
    document: require(`./json/${docVersion}/document`).default(documentId),
    meta: require(`./json/${docVersion}/meta`).default(pageId),
    user: require(`./json/${docVersion}/user`).default(pageId),
    pages: [require(`./json/${docVersion}/page`).default(pageId)],
    images: {},
  }
}

export const writeSketchFile = (
  {
    document,
    meta,
    user,
    pages,
    images,
  }: {
    document: FileFormat.Document
    meta: FileFormat.Meta
    user: FileFormat.User
    pages: FileFormat.Page[]
    images: { [id: string]: Buffer }
  },
  filePath: string,
) => {
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

  return new Promise<void>((resolve, reject) => {
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

export const generateId = _generateId
