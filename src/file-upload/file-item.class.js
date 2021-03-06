"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var file_like_object_class_1 = require("./file-like-object.class");
var file_details_class_1 = require("./file-details.class");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.alias = 'file';
        this.url = '/';
        this.method = 'POST';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this.fileDetails = new file_details_class_1.FileDetails(some);
        this._file = some;
        this.url = uploader.options.url;
        this._zone = new core_1.NgZone({
            enableLongStackTrace: false
        });
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, []);
            this.uploader._onErrorItem(this, '', 0, []);
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return {
            form: form
        };
    };
    FileItem.prototype.onProgress = function (progress) {
        return {
            progress: progress
        };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return {
            response: response,
            status: status,
            headers: headers
        };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return {
            response: response,
            status: status,
            headers: headers
        };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return {
            response: response,
            status: status,
            headers: headers
        };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return {
            response: response,
            status: status,
            headers: headers
        };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        var _this = this;
        this._zone.run(function () {
            _this.progress = progress;
        });
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload && status < 400) {
            this.remove();
        }
        else if (status >= 400 && response) {
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            this.errorMessage = response.message || response.data.message;
        }
    };
    FileItem.prototype._prepareToUploading = function (url) {
        if (url === void 0) { url = null; }
        this.index = this.index || ++this.uploader._nextIndex;
        this.url = url || this.url;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;
