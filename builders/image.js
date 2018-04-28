const path = require('path');
const fs = require('fs-extra');

const imagemin = require('imagemin')
const jpegtran = require('imagemin-jpegtran')
const pngquant = require('imagemin-pngquant')
const optipng = require('imagemin-optipng')
const jpegrecompress = require('imagemin-jpeg-recompress')

module.exports = (file, options) => {
  let pathParse = path.parse(file);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  if (options.images) { //Compress image
    imagemin([file], directory, {
      use: [
        jpegtran(),
        jpegrecompress(),
        optipng({
          optimizationLevel: 3
        }),
        pngquant()
      ]
    }).then(function(files){
      files[0].path;
    });
  }
}
