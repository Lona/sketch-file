"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
exports.default = (function (pageId) {
    var _a;
    return ({
        "commit": "0181c02ffae4f4e24c433b7bb014e1093089547e",
        "pagesAndArtboards": (_a = {},
            _a[pageId] = {
                "name": "Page 1",
                "artboards": {}
            },
            _a),
        // @ts-ignore
        "version": 119,
        "fonts": [],
        "compatibilityVersion": 99,
        "app": sketch_file_format_ts_1.FileFormat1.BundleId.PublicRelease,
        "autosaved": 0,
        "variant": "NONAPPSTORE",
        "created": {
            "commit": "0181c02ffae4f4e24c433b7bb014e1093089547e",
            // @ts-ignore
            "appVersion": "57.1",
            "build": 83088,
            "app": sketch_file_format_ts_1.FileFormat1.BundleId.PublicRelease,
            "compatibilityVersion": 99,
            // @ts-ignore
            "version": 119,
            "variant": "NONAPPSTORE"
        },
        "saveHistory": [
            "NONAPPSTORE.83088"
        ],
        // @ts-ignore
        "appVersion": "57.1",
        "build": 83088
    });
});
