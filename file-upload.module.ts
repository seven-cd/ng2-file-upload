import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FileSelectDirective} from './src/file-select.directive';
import {FileDropDirective} from './src/file-drop.directive';
import {ImagePreviewDirective} from './src/image-preview.directive';

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