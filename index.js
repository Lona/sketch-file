"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var jszip_1 = __importDefault(require("jszip"));
var generateId_1 = require("./generateId");
var map_1 = __importDefault(require("./json/map"));
function readFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(filePath, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function readAndParseFileInZip(zip, filePath) {
    return zip
        .file(filePath)
        .async('text')
        .then(JSON.parse);
}
exports.readSketchFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var data, zip, pagesPromises, imagesPromises, _a, document, meta, user, pages, images;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, readFile(filePath)];
            case 1:
                data = _b.sent();
                return [4 /*yield*/, jszip_1.default.loadAsync(data)];
            case 2:
                zip = _b.sent();
                pagesPromises = [];
                zip
                    .folder('pages')
                    .forEach(function (relativePath) {
                    return pagesPromises.push(readAndParseFileInZip(zip, "pages/" + relativePath));
                });
                imagesPromises = [];
                zip.folder('images').forEach(function (relativePath) {
                    return imagesPromises.push(zip
                        .file("images/" + relativePath)
                        .async('nodebuffer')
                        .then(function (buffer) { return ({
                        id: relativePath.replace('.png', ''),
                        buffer: buffer,
                    }); }));
                });
                return [4 /*yield*/, Promise.all([
                        readAndParseFileInZip(zip, 'document.json'),
                        readAndParseFileInZip(zip, 'meta.json'),
                        readAndParseFileInZip(zip, 'user.json'),
                        Promise.all(pagesPromises),
                        Promise.all(imagesPromises),
                    ])];
            case 3:
                _a = _b.sent(), document = _a[0], meta = _a[1], user = _a[2], pages = _a[3], images = _a[4];
                return [2 /*return*/, {
                        document: document,
                        meta: meta,
                        user: user,
                        pages: pages,
                        images: images.reduce(function (prev, i) {
                            prev[i.id] = i.buffer;
                            return prev;
                        }, {}),
                    }];
        }
    });
}); };
exports.createNewSketchFile = function (version) {
    var documentId = generateId_1.generateId();
    var pageId = generateId_1.generateId();
    var docVersion = map_1.default[version] || 118;
    return {
        document: require("./json/" + docVersion + "/document").default(documentId),
        meta: require("./json/" + docVersion + "/meta").default(pageId),
        user: require("./json/" + docVersion + "/user").default(pageId),
        pages: [require("./json/" + docVersion + "/page").default(pageId)],
        images: {},
    };
};
exports.writeSketchFile = function (_a, filePath) {
    var document = _a.document, meta = _a.meta, user = _a.user, pages = _a.pages, images = _a.images;
    var zip = new jszip_1.default();
    pages.forEach(function (p) { return zip.file("pages/" + p.do_objectID + ".json", JSON.stringify(p)); });
    document.pages = pages.map(function (page) { return ({
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImmutablePage',
        _ref: "pages/" + page.do_objectID,
    }); });
    zip.file('document.json', JSON.stringify(document));
    zip.file('meta.json', JSON.stringify(meta));
    zip.file('user.json', JSON.stringify(user));
    Object.keys(images).forEach(function (id) { return zip.file("images/" + id, images[id]); });
    return new Promise(function (resolve, reject) {
        zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs_1.default.createWriteStream(filePath))
            .on('finish', function () {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            resolve();
        })
            .on('error', reject);
    });
};
exports.generateId = generateId_1.generateId;
