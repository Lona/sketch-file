/// <reference types="node" />
import { generateId as _generateId } from './generateId';
import FileFormat from '@sketch-hq/sketch-file-format-ts';
export declare const readSketchFile: (filePath: string) => Promise<{
    document: FileFormat.Document;
    meta: FileFormat.Meta;
    user: FileFormat.User;
    pages: FileFormat.Page[];
    images: {
        [id: string]: Buffer;
    };
}>;
export declare const createNewSketchFile: (version?: string) => {
    document: FileFormat.Document;
    meta: FileFormat.Meta;
    user: FileFormat.User;
    pages: FileFormat.Page[];
    images: {
        [id: string]: Buffer;
    };
};
export declare const writeSketchFile: ({ document, meta, user, pages, images, }: {
    document: FileFormat.Document;
    meta: FileFormat.Meta;
    user: FileFormat.User;
    pages: FileFormat.Page[];
    images: {
        [id: string]: Buffer;
    };
}, filePath: string) => Promise<void>;
export declare const generateId: typeof _generateId;
