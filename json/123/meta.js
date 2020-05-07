"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
exports.default = (function (pageId) {
    var _a;
    return ({
        "commit": "6896e2bfdb0a2a03f745e4054a8c5fc58565f9f1",
        "pagesAndArtboards": (_a = {},
            _a[pageId] = {
                "name": "Page 1",
                "artboards": {}
            },
            _a),
        // @ts-ignore
        "version": 123,
        "fonts": [],
        "compatibilityVersion": 99,
        "app": sketch_file_format_ts_1.FileFormat3.BundleId.PublicRelease,
        "autosaved": 0,
        "variant": "NONAPPSTORE",
        "created": {
            "commit": "6896e2bfdb0a2a03f745e4054a8c5fc58565f9f1",
            // @ts-ignore
            "appVersion": "63.1",
            "build": 92452,
            "app": sketch_file_format_ts_1.FileFormat3.BundleId.PublicRelease,
            "compatibilityVersion": 99,
            // @ts-ignore
            "version": 123,
            "variant": "NONAPPSTORE"
        },
        "saveHistory": [
            "NONAPPSTORE.92452"
        ],
        // @ts-ignore
        "appVersion": "63.1",
        "build": 92452
    });
});
