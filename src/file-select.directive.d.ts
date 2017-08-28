import { ElementRef } from '@angular/core';
import { FileUploaderService } from './file-uploader.service';
export declare class FileSelectDirective {
    uploader: FileUploaderService;
    private element;
    constructor(element: ElementRef);
    getOptions(): any;
    getFilters(): any;
    isEmptyAfterSelection(): boolean;
    onChange(): any;
}
