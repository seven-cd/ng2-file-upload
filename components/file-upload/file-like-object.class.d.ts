export declare class FileLikeObject {
    lastModifiedDate: any;
    size: any;
    type: string;
    name: string;
    title: string;
    constructor(fileOrInput: any);
    static stripExtension(name: string): string;
    private _createFromFakePath(path);
    private _createFromObject(object);
}
