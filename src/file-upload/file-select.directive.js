"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return void 0;
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        // if(!this.uploader.isHTML5) this.destroy();
        this.uploader.addToQueue(files, options, filters);
        if (this.isEmptyAfterSelection()) {
            // todo
            // this.element.nativeElement.properties.value = '';
            /*this.element.nativeElement
             .replaceWith(this.element = this.element.nativeElement.clone(true)); // IE fix*/
        }
    };
    return FileSelectDirective;
}());
FileSelectDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[fileSelect]' },] },
];
/** @nocollapse */
FileSelectDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef },
]; };
FileSelectDirective.propDecorators = {
    'uploader': [{ type: core_1.Input },],
    'onChange': [{ type: core_1.HostListener, args: ['change',] },]
};
exports.FileSelectDirective = FileSelectDirective;
;
