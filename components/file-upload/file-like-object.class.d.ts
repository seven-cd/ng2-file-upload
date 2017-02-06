export declare class FileLikeObject {
    lastModifiedDate: any;
    size: any;
    type: string;
    name: string;
    title: string;
    constructor(fileOrInput: any);
    static stripExtension(name: string): string;
    _createFromFakePath(path: string): void;
    _createFromObject(object: {
        size: number;
        type: string;
        name: string;
    }): void;
}
