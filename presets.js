let deepAssign = require('deep-assign');

const presets = {
  "DEFAULT": {
    html: true,
    css: true,
    js: true,
    images: true,
    exclude: []
  }
};

presets["PROD"] = presets["PRODUCTION"] = Object.assign(
  {}, presets["DEFAULT"],
  {
    html: true,
    css: true,
    js: true,
    images: true,
    exclude: [
      /.DS_store/gmi,
      /.git/gmi,
      /node_modules/gmi,
      /.*\.sass/gmi,
      /.*\.scss/gmi,
      /.*\.jsx/gmi,
      /.*\.vue/gmi,
      /.*\.map/gmi,
      /.*\.pug/gmi,
      /.*\.jade/gmi,
      /.sass-cache/gmi
    ]
  }
);

presets["DEV"] = presets["DEVELOPMENT"] = Object.assign(
  {}, presets["DEFAULT"],
  {
    html: false,
    css: false,
    js: false,
    images: false,
    exclude: []
  }
);



module.exports = presets;
