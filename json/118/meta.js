"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
exports.default = (function (pageId) {
    var _a;
    return ({
        "commit": "1b735aa8f66d3e13f8900ae7c369f355f0eb2d3a",
        "pagesAndArtboards": (_a = {},
            _a[pageId] = {
                "name": "Page 1",
                "artboards": {}
            },
            _a),
        // @ts-ignore
        "version": 118,
        "fonts": [],
        "compatibilityVersion": 99,
        "app": sketch_file_format_ts_1.FileFormat1.BundleId.PublicRelease,
        "autosaved": 0,
        "variant": "NONAPPSTORE",
        "created": {
            "commit": "1b735aa8f66d3e13f8900ae7c369f355f0eb2d3a",
            // @ts-ignore
            "appVersion": "55.1",
            "build": 78136,
            "app": sketch_file_format_ts_1.FileFormat1.BundleId.PublicRelease,
            "compatibilityVersion": 99,
            // @ts-ignore
            "version": 118,
            "variant": "NONAPPSTORE"
        },
        "saveHistory": [
            "NONAPPSTORE.78136"
        ],
        // @ts-ignore
        "appVersion": "55.1",
        "build": 78136
    });
});
