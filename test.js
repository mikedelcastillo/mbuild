const fs = require('fs-extra');
const PRESETS = require('./presets');
const mbuild = require('./index');

fs.removeSync('test/prod');
fs.copySync('test/raw', 'test/prod');
fs.copySync('test/prod', 'test/dev');

mbuild('test/prod', PRESETS.PROD);
mbuild('test/dev', PRESETS.DEV);
