import {NgModule} from '@angular/core';

import {FileSelectDirective} from './file-select.directive';
import {FileDropDirective} from './file-drop.directive';
import {ImagePreviewDirective} from './image-preview.directive';
import {FileUploaderService} from './file-uploader.service';

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
export class FileUploadModule {

}