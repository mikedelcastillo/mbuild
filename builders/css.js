const path = require('path');
const fs = require('fs-extra');
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const pretty = require('cssbeautify');
const CleanCSS = require('clean-css');

module.exports = (arg1, options, isFile = true) => {
  let pathParse = path.parse(arg1);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  let css = isFile ? fs.readFileSync(arg1, "utf-8") : arg1;

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

  if(isFile){
    fs.writeFileSync(arg1, css);
  } else {
    return css;
  }

}
