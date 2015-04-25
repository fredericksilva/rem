#!/usr/bin/env node
var child_process = require('child_process');
var path = require('path');
child_process.execFileSync(path.join(__dirname, './node_modules/.bin/coffee'),
  [path.join(__dirname, './podfile.coffee')].concat(process.argv.slice(2)), {
    stdio: [process.stdin, process.stdout, process.stderr],
    encoding: 'utf8',
  });
