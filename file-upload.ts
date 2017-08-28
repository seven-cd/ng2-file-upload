import {NgModule} from '@angular/core';

import {FileSelectDirective} from './src/file-select.directive';
import {FileDropDirective} from './src/file-drop.directive';
import {ImagePreviewDirective} from './src/image-preview.directive';
import {FileUploaderService} from './src/file-uploader.service';

@NgModule({
    declarations : [
        FileSelectDirective,
        FileDropDirective,
        ImagePreviewDirective
    ],
    exports: [
        FileSelectDirective,
        FileDropDirective,
        ImagePreviewDirective
    ],
    providers : [
        FileUploaderService
    ]
})
export class FileUploadModule { }