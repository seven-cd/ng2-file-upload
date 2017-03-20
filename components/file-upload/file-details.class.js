"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileDetails = (function () {
    function FileDetails(file) {
        this.file = file;
        this.getFileDetails();
    }
    FileDetails.prototype.getFileDetails = function () {
        var imageType = /image.*/;
        var imageExist = this.file.type.match(imageType);
        if (!imageExist) {
            this.fileType = 'file';
            this.fileUrl = '';
        }
        else {
            this.getImageDetails();
        }
    };
    FileDetails.prototype.getImageDetails = function () {
        var _this = this;
        // a seed img element for the FileReader
        var img = document.createElement('img');
        // get an image file from the user
        // this uses drag/drop, but you could substitute file-browsing
        var reader = new FileReader();
        reader.onload = (function (image) {
            return function (e) {
                image.onload = function () {
                    var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), width = image.width, height = image.height;
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);
                    _this.fileType = 'image';
                    _this.fileUrl = canvas.toDataURL('image/png');
                };
                image.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(this.file);
    };
    return FileDetails;
}());
exports.FileDetails = FileDetails;
