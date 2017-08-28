"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var file_select_directive_1 = require('./src/file-select.directive');
var file_drop_directive_1 = require('./src/file-drop.directive');
var image_preview_directive_1 = require('./src/image-preview.directive');
var file_uploader_service_1 = require('./src/file-uploader.service');
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    FileUploadModule = __decorate([
        core_1.NgModule({
            declarations: [
                file_select_directive_1.FileSelectDirective,
                file_drop_directive_1.FileDropDirective,
                image_preview_directive_1.ImagePreviewDirective
            ],
            exports: [
                file_select_directive_1.FileSelectDirective,
                file_drop_directive_1.FileDropDirective,
                image_preview_directive_1.ImagePreviewDirective
            ],
            providers: [
                file_uploader_service_1.FileUploaderService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FileUploadModule);
    return FileUploadModule;
}());
exports.FileUploadModule = FileUploadModule;
