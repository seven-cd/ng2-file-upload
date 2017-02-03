# ng2-file-upload

## Quick start

1. A recommended way to install ***ng2-file-upload*** is through npm package manager using the following command:

  `npm i ng2-file-upload --save`

  Alternatively, you can download it in a ZIP file.

2. Currently `ng2-file-upload` contains two directives: `angular-file-select` and `angular-file-drop`. `angular-file-select` is used for 'file-input' field of form and `angular-file-drop` is used for area that will be used for dropping of file or files.

## API for `fileSelect`

### Properties

  - `uploader` - (`FileUploader`)

## API for `fileDrop`

### Properties

  - `uploader` - (`FileUploader`) - uploader object.

  Parameters that supported by this object:

  1. `url` - URL of File Uploader's route
  2. `authToken` - Auth token that will be applied as 'Authorization' header during file send.

### Events

  - `fileOver` - it fires during 'over' and 'out' events for Drop Area; returns `boolean`: `true` if file is over Drop Area, `false` in case of out.
