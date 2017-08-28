import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploaderService } from './file-uploader.service';
export declare class FileDropDirective {
    uploader: FileUploaderService;
    fileOver: EventEmitter<any>;
    onFileDrop: EventEmitter<File[]>;
    private element;
    constructor(element: ElementRef);
    getOptions(): any;
    getFilters(): any;
    onDrop(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): any;
    private _getTransfer(event);
    private _preventAndStop(event);
    private _haveFiles(types);
}
