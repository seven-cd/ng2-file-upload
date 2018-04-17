export default { 
    entry: '..dist/index.js',
    dest: '../dist/bundles/file-upload.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.fileUpload',
    globals: {
        '@angular/core': 'ng.core'
      }
}