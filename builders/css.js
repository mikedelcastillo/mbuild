const path = require('path');
const fs = require('fs-extra');
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const pretty = require('cssbeautify');
const CleanCSS = require('clean-css');

module.exports = (file, options) => {
  let pathParse = path.parse(file);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  let css = fs.readFileSync(file, "utf-8");

  if (options.css) { //Minify CSS
    css = postcss([
      autoprefixer({
        browsers: ["> 0%", "last 10000 versions"]
      })
    ]).process(css, {
      from: undefined,
      to: undefined,
      map: false
    }).css;

    css = new CleanCSS({inline: ['none']}).minify(css).styles;
  } else { //Prettify CSS
    css = pretty(css, {indent: '  '});
  }

  fs.writeFileSync(file, css);

}
