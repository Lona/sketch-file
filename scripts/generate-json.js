const fs = require('fs')
const path = require('path')

const referenceFiles = require('@sketch-hq/sketch-reference-files').default

const map = referenceFiles.reduce((prev, x) => {
  x.sketchVersions.forEach(v => {
    prev[v] = x.document
  })
  return prev
}, {})

const typeMap = {
  118: 1,
  119: 1,
  120: 2,
  121: 3,
  123: 3,
}

fs.mkdirSync(path.join(__dirname, '../src/json'), { recursive: true })

fs.writeFileSync(
  path.join(__dirname, '../src/json/map.ts'),
  `export default ${JSON.stringify(map, null, '  ')}

export type VersionFileFormat1 = ${Object.keys(map)
    .filter(v => typeMap[map[v]] === 1)
    .map(v => `"${v}"`)
    .join(' | ')}
export type VersionFileFormat2 = ${Object.keys(map)
    .filter(v => typeMap[map[v]] === 2)
    .map(v => `"${v}"`)
    .join(' | ')}
export type VersionFileFormat3 = ${Object.keys(map)
    .filter(v => typeMap[map[v]] === 3)
    .map(v => `"${v}"`)
    .join(' | ')}
  `,
)

referenceFiles.forEach(x => {
  const template = x.files.find(f => f.id === 'empty')

  fs.mkdirSync(path.join(__dirname, `../src/json/${x.document}`), { recursive: true })

  fs.writeFileSync(
    path.join(__dirname, `../src/json/${x.document}/document.ts`),
    `import { FileFormat${typeMap[x.document] || 1} } from '@sketch-hq/sketch-file-format-ts'

export default (documentId: string): FileFormat${typeMap[x.document] ||
      1}.Document => (${JSON.stringify(template.data.document, null, '  ').replace(
      /"[0-9A-Z\d]{8}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{12}"/i,
      'documentId',
    )})`,
  )

  fs.writeFileSync(
    path.join(__dirname, `../src/json/${x.document}/meta.ts`),
    `import { FileFormat${typeMap[x.document] || 1} } from '@sketch-hq/sketch-file-format-ts'

export default (pageId: string): FileFormat${typeMap[x.document] || 1}.Meta => (${JSON.stringify(
      template.data.meta,
      null,
      '  ',
    )
      .replace(
        /"[0-9A-Z\d]{8}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{12}"/i,
        '[pageId]',
      )
      .replace(
        /"com.bohemiancoding.sketch3"/g,
        `FileFormat${typeMap[x.document] || 1}.BundleId.PublicRelease`,
      )
      .replace(/  "version"/g, `  // @ts-ignore\n  "version"`)
      .replace(/  "appVersion"/g, `  // @ts-ignore\n  "appVersion"`)})`,
  )

  fs.writeFileSync(
    path.join(__dirname, `../src/json/${x.document}/user.ts`),
    `import { FileFormat${typeMap[x.document] || 1} } from '@sketch-hq/sketch-file-format-ts'

export default (pageId: string): FileFormat${typeMap[x.document] || 1}.User => (${JSON.stringify(
      template.data.user,
      null,
      '  ',
    ).replace(
      /"[0-9A-Z\d]{8}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{12}"/i,
      '[pageId]',
    )})`,
  )

  fs.writeFileSync(
    path.join(__dirname, `../src/json/${x.document}/page.ts`),
    `import { FileFormat${typeMap[x.document] || 1} } from '@sketch-hq/sketch-file-format-ts'

export default (pageId: string): FileFormat${typeMap[x.document] || 1}.Page => (${JSON.stringify(
      template.data.pages[0],
      null,
      '  ',
    ).replace(
      /"[0-9A-Z\d]{8}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{4}-[0-9A-Z\d]{12}"/i,
      'pageId',
    )})`,
  )
})
