# ng2-file-upload

## Usage

2. `ng2-file-upload` exports 3 directives: `fileSelect`, `fileDrop` and `imgPreview`.

## API for `fileSelect`

  ```html
  <input type="file"
        fileSelect
        [uploader]="uploader"
        multiple>
  ```

### Properties

  - `uploader` - uploader object.

## API for `fileDrop`

  ```html
  <div class="drop-zone"
    fileDrop
    (fileOver)="fileOver($event)"
    [uploader]="uploader">
  </div>
  ``` 

### Properties

  - `uploader` - uploader object.

## API for `imgPreview`

  ```html
  <div class="img-preview"
    imgPreview 
    [image]="item?._file">
  </div>
  ```
`imgPreview` set the background image url on element.

### Properties

  - `image` - File added to uploader's queue

### SystemJS Configutation

  In order to use this module inside your Angular project, set the SystemJS config:

```
  ng2-file-upload: {
      main: 'file-upload.module.js',
      defaultExtension: 'js'
  }
```