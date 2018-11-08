const seedrandom = require('seedrandom')

const lut = []
for (let i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16)
}
// Hack (http://stackoverflow.com/a/21963136)
module.exports = function generateId(seed) {
  const d0 = ((seed ? seedrandom(`${seed}0`)() : Math.random()) * 0xffffffff) | 0
  const d1 = ((seed ? seedrandom(`${seed}1`)() : Math.random()) * 0xffffffff) | 0
  const d2 = ((seed ? seedrandom(`${seed}2`)() : Math.random()) * 0xffffffff) | 0
  const d3 = ((seed ? seedrandom(`${seed}3`)() : Math.random()) * 0xffffffff) | 0
  return `${lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff]}-${lut[d1 & 0xff]}${lut[(d1 >> 8) & 0xff]}-${
    lut[((d1 >> 16) & 0x0f) | 0x40]
  }${lut[(d1 >> 24) & 0xff]}-${lut[(d2 & 0x3f) | 0x80]}${lut[(d2 >> 8) & 0xff]}-${
    lut[(d2 >> 16) & 0xff]
  }${lut[(d2 >> 24) & 0xff]}${lut[d3 & 0xff]}${lut[(d3 >> 8) & 0xff]}${lut[(d3 >> 16) & 0xff]}${
    lut[(d3 >> 24) & 0xff]
  }`
}
