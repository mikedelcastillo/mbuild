#!/usr/bin/env node

const path = require('path');
const [,,...args] = process.argv;
const mbuild = require('./index');
const PRESETS = require('./presets');
const fs = require('fs-extra');


let input = path.join(process.cwd(), args[0]) || false;
let output = "";
let options = {};


if(!input){
  console.log("What the fuck!");
  process.exit();
}

let pathParse = path.parse(input);
let filename = pathParse.base;
let directory = pathParse.dir;
let extension = pathParse.ext;

output = path.join(
  directory,
  `${filename}-build-${new Date().getTime()}${extension}`
);

options = PRESETS[args[1]] || PRESETS.DEFAULT;

console.log("Creating a copy...");
fs.copySync(input, output);
mbuild(output, options);
