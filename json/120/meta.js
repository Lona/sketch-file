"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sketch_file_format_ts_1 = require("@sketch-hq/sketch-file-format-ts");
exports.default = (function (pageId) {
    var _a;
    return ({
        "commit": "32d82bc13ec208b5231884cb572bf6df9cd04b38",
        "pagesAndArtboards": (_a = {},
            _a[pageId] = {
                "name": "Page 1",
                "artboards": {}
            },
            _a),
        // @ts-ignore
        "version": 120,
        "fonts": [],
        "compatibilityVersion": 99,
        "app": sketch_file_format_ts_1.FileFormat2.BundleId.PublicRelease,
        "autosaved": 0,
        "variant": "NONAPPSTORE",
        "created": {
            "commit": "32d82bc13ec208b5231884cb572bf6df9cd04b38",
            // @ts-ignore
            "appVersion": "58",
            "build": 84663,
            "app": sketch_file_format_ts_1.FileFormat2.BundleId.PublicRelease,
            "compatibilityVersion": 99,
            // @ts-ignore
            "version": 120,
            "variant": "NONAPPSTORE"
        },
        "saveHistory": [
            "NONAPPSTORE.84663"
        ],
        // @ts-ignore
        "appVersion": "58",
        "build": 84663
    });
});
