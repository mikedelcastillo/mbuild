const path = require('path');
const fs = require('fs-extra');

const babel = require("babel-core");
const uglify = require('uglify-js');
const beautify = require('js-beautify').js_beautify;

module.exports = (arg1, options, isFile = true) => {
  let pathParse = path.parse(arg1);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  let js = isFile ? fs.readFileSync(arg1, "utf-8") : arg1;

  if(options.html){ //Minify JS
    js = babel.transform(js, {
      "presets": [
        [require.resolve('babel-preset-es2015'), {
          loose: true,
          modules: false
        }]]
    }).code;

    js = uglify.minify(js).code;
  } else{ //Prettify JS
    js = beautify(js, { indent_size: 2 })
  }

  if(isFile){
    fs.writeFileSync(arg1, js);
  } else {
    return js;
  }
}
