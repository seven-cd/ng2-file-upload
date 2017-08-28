import { ElementRef, Renderer, OnChanges, SimpleChanges } from '@angular/core';
export declare class ImagePreviewDirective implements OnChanges {
    private el;
    private renderer;
    image: any;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnChanges(changes: SimpleChanges): void;
}
