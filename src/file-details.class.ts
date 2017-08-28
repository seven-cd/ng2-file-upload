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
            this.fileType = 'image';
        } else if (isVideo) {
            this.fileType = 'video';
            this.fileUrl = '';
        } else {
            this.fileType = 'file';
            this.fileUrl = '';
        }
    }
}
