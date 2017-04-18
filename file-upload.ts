export * from  './components/file-upload/file-select.directive';
export * from  './components/file-upload/file-drop.directive';
export * from  './components/file-upload/image-preview.directive';
export * from  './components/file-upload/file-uploader.class';

import {FileSelectDirective} from './components/file-upload/file-select.directive';
import {FileDropDirective} from './components/file-upload/file-drop.directive';
import {ImagePreviewDirective} from './components/file-upload/image-preview.directive';

export const FILE_UPLOAD_DIRECTIVES:[any] = [FileSelectDirective, FileDropDirective, ImagePreviewDirective];

export default {
    directives: [
        FILE_UPLOAD_DIRECTIVES
    ]
};
