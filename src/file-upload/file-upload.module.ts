import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FileSelectDirective} from './file-select.directive';
import {FileDropDirective} from './file-drop.directive';
import {ImagePreviewDirective} from './image-preview.directive';

@NgModule({
    imports: [CommonModule],
    declarations : [
        FileSelectDirective,
        FileDropDirective,
        ImagePreviewDirective
    ],
    exports: [
        FileSelectDirective,
        FileDropDirective,
        ImagePreviewDirective
    ]
})
export class FileUploadModule { }