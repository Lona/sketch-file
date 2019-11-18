"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
exports.default = (function (pageId) {
    var _a;
    return ({
        "commit": "4a0b8e173d74b7bf054eccaa58372f0a1d5afb52",
        "pagesAndArtboards": (_a = {},
            _a[pageId] = {
                "name": "Page 1",
                "artboards": {}
            },
            _a),
        // @ts-ignore
        "version": 121,
        "fonts": [],
        "compatibilityVersion": 99,
        "app": sketch_file_format_ts_1.FileFormat3.BundleId.PublicRelease,
        "autosaved": 0,
        "variant": "NONAPPSTORE",
        "created": {
            "commit": "4a0b8e173d74b7bf054eccaa58372f0a1d5afb52",
            // @ts-ignore
            "appVersion": "59",
            "build": 86127,
            "app": sketch_file_format_ts_1.FileFormat3.BundleId.PublicRelease,
            "compatibilityVersion": 99,
            // @ts-ignore
            "version": 121,
            "variant": "NONAPPSTORE"
        },
        "saveHistory": [
            "NONAPPSTORE.86127"
        ],
        // @ts-ignore
        "appVersion": "59",
        "build": 86127
    });
});
