"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var ImagePreviewDirective = (function () {
    function ImagePreviewDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ImagePreviewDirective.prototype.ngOnChanges = function (changes) {
        var reader = new FileReader();
        var el = this.el;
        reader.onloadend = function (e) {
            el.nativeElement.style.backgroundImage = "url(" + reader.result + ")";
        };
        if (this.image) {
            return reader.readAsDataURL(this.image);
        }
    };
    return ImagePreviewDirective;
}());
ImagePreviewDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: 'div[imgPreview]' },] },
];
/** @nocollapse */
ImagePreviewDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef },
    { type: core_1.Renderer },
]; };
ImagePreviewDirective.propDecorators = {
    'image': [{ type: core_1.Input },]
};
exports.ImagePreviewDirective = ImagePreviewDirective;
