#!/usr/bin/env node

'use strict';

const meow = require('meow');
const autoDistTag = require('./src/auto-dist-tag');

const cli = meow(`
	Usage
	  $ auto-dist-tag [path]

	Options
	  --write, -w  Write calculated dist-tag to the package.json file
`);

let cwd = cli.input[0] || process.cwd();

autoDistTag(cwd, cli.flags)
  .then(json => console.log(json));
