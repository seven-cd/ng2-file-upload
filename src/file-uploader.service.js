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
var core_1 = require("@angular/core");
var file_like_object_class_1 = require('./file-like-object.class');
var file_item_class_1 = require('./file-item.class');
var file_type_class_1 = require('./file-type.class');
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploaderService = (function () {
    function FileUploaderService(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false
        };
        this.setOptions(options);
    }
    FileUploaderService.prototype.setUploadUrl = function (url) {
        this.options.url = url;
        if (this.queue.length) {
            this.queue.forEach(function (file) {
                file.url = url;
            });
        }
    };
    FileUploaderService.prototype.setAuthToken = function (authToken) {
        this.authToken = authToken;
    };
    FileUploaderService.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = options.authToken;
        this.autoUpload = options.autoUpload;
        this.options.filters.unshift({
            name: 'queueLimit',
            fn: this._queueLimitFilter
        });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({
                name: 'fileSize',
                fn: this._fileSizeFilter
            });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({
                name: 'fileType',
                fn: this._fileTypeFilter
            });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({
                name: 'mimeType',
                fn: this._mimeTypeFilter
            });
        }
    };
    FileUploaderService.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploaderService.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploaderService.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploaderService.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploaderService.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? '_xhr' : '_form';
        if (item && item.isUploading) {
            item[prop].abort();
        }
    };
    FileUploaderService.prototype.uploadAll = function (url) {
        if (url === void 0) { url = null; }
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(url); });
        items[0].upload();
    };
    FileUploaderService.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploaderService.prototype.getFailedUploads = function () {
        if (this.queue.length) {
            var failedUploads = this.queue.filter(function (file) {
                return file.isError === true;
            });
            return failedUploads;
        }
        else {
            return [];
        }
    };
    FileUploaderService.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploaderService.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploaderService.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploaderService.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploaderService.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploaderService.prototype.destroy = function () {
        return void 0;
        /*forEach(this._directives, (key) => {
         forEach(this._directives[key], (object) => {
         object.destroy();
         });
         });*/
    };
    FileUploaderService.prototype.onAfterAddingAll = function (fileItems) {
        return {
            fileItems: fileItems
        };
    };
    FileUploaderService.prototype.onBuildItemForm = function (fileItem, form) {
        return {
            fileItem: fileItem,
            form: form
        };
    };
    FileUploaderService.prototype.onAfterAddingFile = function (fileItem) {
        return {
            fileItem: fileItem
        };
    };
    FileUploaderService.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return {
            item: item,
            filter: filter,
            options: options
        };
    };
    FileUploaderService.prototype.onBeforeUploadItem = function (fileItem) {
        return {
            fileItem: fileItem
        };
    };
    FileUploaderService.prototype.onProgressItem = function (fileItem, progress) {
        return {
            fileItem: fileItem,
            progress: progress
        };
    };
    FileUploaderService.prototype.onProgressAll = function (progress) {
        return {
            progress: progress
        };
    };
    FileUploaderService.prototype.onSuccessItem = function (item, response, status, headers) {
        return {
            item: item,
            response: response,
            status: status,
            headers: headers
        };
    };
    FileUploaderService.prototype.onErrorItem = function (item, response, status, headers) {
        return {
            item: item,
            response: response,
            status: status,
            headers: headers
        };
    };
    FileUploaderService.prototype.onCancelItem = function (item, response, status, headers) {
        return {
            item: item,
            response: response,
            status: status,
            headers: headers
        };
    };
    FileUploaderService.prototype.onCompleteItem = function (item, response, status, headers) {
        return {
            item: item,
            response: response,
            status: status,
            headers: headers
        };
    };
    FileUploaderService.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploaderService.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploaderService.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploaderService.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploaderService.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploaderService.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploaderService.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploaderService.prototype._xhrTransport = function (item) {
        var _this = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var form = new FormData();
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        this._onBuildItemForm(item, form);
        form.append(item.alias, item._file, item.file.name);
        for (var key in item.file) {
            var prop = item.file[key];
            if (typeof prop !== 'function' && !item._file[key]) {
                form.append(key, prop);
            }
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        // todo
        /*item.headers.map((value, name) => {
         xhr.setRequestHeader(name, value);
         });*/
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader('Authorization', this.authToken);
        }
        xhr.send(form);
        this._render();
    };
    FileUploaderService.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploaderService.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploaderService.prototype._render = function () {
        return void 0;
        // todo: ?
    };
    // private _folderFilter(item:any):boolean {
    //   return !!(item.size || item.type);
    // }
    FileUploaderService.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploaderService.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploaderService.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /* tslint:disable */
    FileUploaderService.prototype._transformResponse = function (response, headers) {
        // todo: ?
        /*var headersGetter = this._headersGetter(headers);
         forEach($http.defaults.transformResponse, (transformFn) => {
         response = transformFn(response, headersGetter);
         });*/
        return response;
    };
    /* tslint:enable */
    FileUploaderService.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    /*private _iframeTransport(item:any) {
     // todo: implement it later
     }*/
    FileUploaderService.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploaderService.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploaderService.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploaderService.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploaderService.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploaderService.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /* tslint:disable */
    FileUploaderService.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /* tslint:enable */
    FileUploaderService.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    FileUploaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object])
    ], FileUploaderService);
    return FileUploaderService;
}());
exports.FileUploaderService = FileUploaderService;
