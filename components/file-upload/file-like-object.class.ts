function isElement(node: any): boolean {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}

export class FileLikeObject {
    public lastModifiedDate: any;
    public size: any;
    public type: string;
    public name: string;
    public title: string;

    public constructor(fileOrInput: any) {
        let isInput = isElement(fileOrInput);
        let fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        let postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        let method = '_createFrom' + postfix;
        (this as any)[method](fakePathOrObject);
    }

    static stripExtension(name: string): string {
        let lastIdx = name.lastIndexOf('.');

        return lastIdx !== -1 ? name.slice(0, lastIdx) : name;
    }

    private _createFromFakePath(path: string): void {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
        this.title = FileLikeObject.stripExtension(this.name);
    }

    private _createFromObject(object: {
        size: number,
        type: string,
        name: string
    }): void {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
        this.title = FileLikeObject.stripExtension(this.name);
    }
}