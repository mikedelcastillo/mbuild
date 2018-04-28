const path = require('path');
const fs = require('fs-extra');

const JSONFormatter = require("json-fmt");

module.exports = (arg1, options, isFile = true) => {
  let pathParse = path.parse(arg1);
  let filename = pathParse.base;
  let directory = pathParse.dir;
  let extension = pathParse.ext;

  let js = isFile ? fs.readFileSync(arg1, "utf-8") : arg1;

  if(options.html){ //Minify JS
    let fmt = new JSONFormatter(JSONFormatter.MINI);
    fmt.append(js);
    js = fmt.flush();
  } else{ //Prettify JS
    let fmt = new JSONFormatter(JSONFormatter.PRETTY);
    fmt.append(js);
    js = fmt.flush();
  }

  if(isFile){
    fs.writeFileSync(arg1, js);
  } else {
    return js;
  }
}
