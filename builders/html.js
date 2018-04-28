const path = require('path');
const minify = require('html-minifier').minify;
const fs = require('fs-extra');
const pretty = require('pretty');

module.exports = (file, options) => {
  let pathParse = path.parse(file);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  let html = fs.readFileSync(file, "utf-8");

  if(options.html){ //Minify HTML
    html = minify(html, {
      collapseWhitespace: true,
      conservativeCollapse: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    });
  } else{ //Prettify HTML
    html = pretty(html, {ocd: true});
  }

  fs.writeFileSync(file, html);
}
