"use strict";
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
            console.log('File is not image!');
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
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                    _this.fileType = 'image';
                    _this.fileUrl = canvas.toDataURL('image/jpeg');
                };
                image.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(this.file);
    };
    return FileDetails;
}());
exports.FileDetails = FileDetails;
