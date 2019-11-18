"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom_1 = __importDefault(require("seedrandom"));
var lut = [];
for (var i = 0; i < 256; i += 1) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function generateId(seed) {
    var d0 = ((seed ? seedrandom_1.default(seed + "0")() : Math.random()) * 0xffffffff) | 0;
    var d1 = ((seed ? seedrandom_1.default(seed + "1")() : Math.random()) * 0xffffffff) | 0;
    var d2 = ((seed ? seedrandom_1.default(seed + "2")() : Math.random()) * 0xffffffff) | 0;
    var d3 = ((seed ? seedrandom_1.default(seed + "3")() : Math.random()) * 0xffffffff) | 0;
    return lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] + "-" + lut[d1 & 0xff] + lut[(d1 >> 8) & 0xff] + "-" + lut[((d1 >> 16) & 0x0f) | 0x40] + lut[(d1 >> 24) & 0xff] + "-" + lut[(d2 & 0x3f) | 0x80] + lut[(d2 >> 8) & 0xff] + "-" + lut[(d2 >> 16) & 0xff] + lut[(d2 >> 24) & 0xff] + lut[d3 & 0xff] + lut[(d3 >> 8) & 0xff] + lut[(d3 >> 16) & 0xff] + lut[(d3 >> 24) & 0xff];
}
exports.generateId = generateId;
exports.default = generateId;
