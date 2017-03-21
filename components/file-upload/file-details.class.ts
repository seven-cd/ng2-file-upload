export class FileDetails {
    public fileType:string;
    public fileUrl:string;

    private file:any;

    public constructor(file:any) {
        this.file = file;
        this.getFileDetails();
    }

    private getFileDetails():void {
        let imageType = /image.*/;
        let videoType = /video.*/;
        let isImage = this.file.type.match(imageType);
        let isVideo = this.file.type.match(videoType);

        if(isImage) {
            this.getImageDetails();
        } else if (isVideo) {
            this.fileType = 'video';
            this.fileUrl = '';
        } else {
            this.fileType = 'file';
            this.fileUrl = '';
        }
    }

    private getImageDetails():void {
        // a seed img element for the FileReader
        let img = document.createElement('img');

        // get an image file from the user
        // this uses drag/drop, but you could substitute file-browsing
        let reader = new FileReader();

        reader.onload = ((image:any) => {
            return (e:any) => {
                image.onload= () => {
                    let canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        width = image.width,
                        height = image.height;

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);
                    this.fileType = 'image';
                    this.fileUrl = canvas.toDataURL('image/png');
                };
                image.src = e.target.result;
            };
        })(img);

        reader.readAsDataURL(this.file);
    }
}
