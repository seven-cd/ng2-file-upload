import {NgModule} from '@angular/core';

import {FileSelectDirective} from './components/file-upload/file-select.directive';
import {FileDropDirective} from './components/file-upload/file-drop.directive';
import {ImagePreviewDirective} from './components/file-upload/image-preview.directive';
import {FileUploader} from './components/file-upload/file-uploader.class';

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
        FileUploader
    ]
})
export class FileUploadModule { }