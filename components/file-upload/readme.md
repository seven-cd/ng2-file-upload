### Usage
```typescript
import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload/file-upload';
```

### Annotations
```typescript
// class FileSelectDirective
@Directive({ selector: '[fileSelect]' })
```

```typescript
// class FileDropDirective
@Directive({ selector: '[fileDrop]' })
```

## FileSelect API

### Properties

  - `uploader` - (`FileUploader`) - uploader object. See using in [demo](https://github.com/valor-software/ng2-file-upload/blob/master/demo/components/file-upload/simple-demo.ts)

  Parameters that supported by this object:

  1. `url` - URL of File Uploader's route
  2. `authToken` - auth token that will be applied as 'Authorization' header during file send.

## FileDrop API

### Properties

  - `uploader` - (`FileUploader`) - uploader object.

### Events

  - `fileOver` - it fires during 'over' and 'out' events for Drop Area; returns `boolean`: `true` if file is over Drop Area, `false` in case of out.