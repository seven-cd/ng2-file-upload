export default { 
    input: 'dist/index.js',
    output: {
        file: 'dist/bundles/file-upload.umd.js',
        name: 'ng.fileUpload',
        moduleName: 'ng.fileUpload',
        format: 'umd',
        sourceMap: false,
        globals: {
            '@angular/core': 'ng.core',
            '@angular/common': 'ng.common'
        },
        external: [ '@angular/core', '@angular/common' ]
    }
}