#!/usr/bin/env node

'use strict';

import meow from 'meow';
import autoDistTag from './src/auto-dist-tag.js';

const cli = meow(`
	Usage
	  $ auto-dist-tag [path]

	Options
	  --write, -w  Write calculated dist-tag to the package.json file
`, {
  importMeta: import.meta,
  flags: {
    write: {
      type: 'boolean',
      alias: 'w'
    }
  }
});

let cwd = cli.input[0] || process.cwd();

autoDistTag(cwd, cli.flags)
  .then(json => console.log(json));
