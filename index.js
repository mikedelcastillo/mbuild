const PRESETS = require('./presets');
const fs = require('fs-extra');
const readdir = require("recursive-readdir-sync");
const path = require('path');

const mbuild = (
  root,
  options = PRESETS.DEFAULT
) => {
  let files = readdir(root);
  files.forEach(file => {
    let exclude = false;

    options.exclude.forEach(regex => {
      if(file.match(regex)){
        return exclude = true;
      }
    });

    if(exclude) return fs.removeSync(file)

    let pathParse = path.parse(file);
    let extension = pathParse.ext;

    if(extension.match(/html|htm|svg|xml|php|xhtml/gmi)){
      require('./builders/html')(file, options);
    }

    if(extension.match(/css/gmi)){
      require('./builders/css')(file, options);
    }

    if(extension.match(/jpg|jpeg|png|gif/gmi)){
      require('./builders/image')(file, options);
    }
  });
};


module.exports = mbuild;
