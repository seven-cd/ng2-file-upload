import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: 'div[imgPreview]' })

export class ImagePreviewDirective implements OnChanges {

    @Input() image: any;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: SimpleChanges) {

        let reader = new FileReader();
        let el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.style.backgroundImage = `url(${reader.result})`;
        };

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }

    }

}