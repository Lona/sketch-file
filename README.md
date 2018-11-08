# sketch-file

A Sketch file is a zip file containing a bunch of JSON files.

This package aims to make is easier to manipulate such a file.

## Installation

```bash
npm install sketch-file
```

## Usage

There are 4 different methods available:

- [`readSketchFile`](#readsketchfile)
- [`createNewSketchFile`](#createnewsketchfile)
- [`writeSketchFile`](#writesketchfile)
- [`generateId`](#generateid)

### `readSketchFile`

```js
(filePath: string) => Promise<{
  document: {},
  meta: {},
  user: {},
  pages: Array<{}>,
  images: {
    [id: string]: Buffer
  }
}>
```

### `createNewSketchFile`

```js
(documentId?: string, pages?: Array<{}>) => Promise<{
  document: {},
  meta: {},
  user: {},
  pages: Array<{}>,
  images: {
    [id: string]: Buffer
  }
}>
```

### `writeSketchFile`

```js
(sketchDocument: {
  document: {},
  meta: {},
  user: {},
  pages: Array<{}>,
  images: {
    [id: string]: Buffer
  }
}, filePath: string) => Promise<void>
```

### `generateId`

```js
;(seed?: string) => string
```
