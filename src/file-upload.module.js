"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_select_directive_1 = require("./file-select.directive");
var file_drop_directive_1 = require("./file-drop.directive");
var image_preview_directive_1 = require("./image-preview.directive");
var file_uploader_service_1 = require("./file-uploader.service");
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
        })
    ], FileUploadModule);
    return FileUploadModule;
}());
exports.FileUploadModule = FileUploadModule;
