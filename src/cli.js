#!/usr/bin/env node

const mdLinks = require("./mdlinks.js");

const pathDir = process.argv[2];

mdLinks.mdlinks(pathDir);
 