"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var file_select_directive_1 = require("./file-select.directive");
var file_drop_directive_1 = require("./file-drop.directive");
var image_preview_directive_1 = require("./image-preview.directive");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [
                    file_select_directive_1.FileSelectDirective,
                    file_drop_directive_1.FileDropDirective,
                    image_preview_directive_1.ImagePreviewDirective
                ],
                exports: [
                    file_select_directive_1.FileSelectDirective,
                    file_drop_directive_1.FileDropDirective,
                    image_preview_directive_1.ImagePreviewDirective
                ]
            },] },
];
/** @nocollapse */
FileUploadModule.ctorParameters = function () { return []; };
exports.FileUploadModule = FileUploadModule;
