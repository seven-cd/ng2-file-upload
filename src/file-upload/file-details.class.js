"use strict";
exports.__esModule = true;
var FileDetails = (function () {
    function FileDetails(file) {
        this.file = file;
        this.getFileDetails();
    }
    FileDetails.prototype.getFileDetails = function () {
        var imageType = /image.*/;
        var videoType = /video.*/;
        var isImage = this.file.type.match(imageType);
        var isVideo = this.file.type.match(videoType);
        if (isImage) {
            this.fileType = 'image';
        }
        else if (isVideo) {
            this.fileType = 'video';
            this.fileUrl = '';
        }
        else {
            this.fileType = 'file';
            this.fileUrl = '';
        }
    };
    return FileDetails;
}());
exports.FileDetails = FileDetails;
