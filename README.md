auto-dist-tag
===============================================================================

[![Build Status](https://travis-ci.org/Turbo87/auto-dist-tag.svg?branch=master)](https://travis-ci.org/Turbo87/auto-dist-tag)
[![npm](https://img.shields.io/npm/v/auto-dist-tag.svg)](https://www.npmjs.com/package/auto-dist-tag)

> Automatically rewrites the `publishConfig.tag` setting in your
> `package.json` file for you


Install
-------------------------------------------------------------------------------

```
npm install --global auto-dist-tag
```


Usage
-------------------------------------------------------------------------------

```
$ auto-dist-tag --help

  Usage
    $ auto-dist-tag [path]

  Options
    --write, -w  Write calculated dist-tag to the package.json file
```

`auto-dist-tag` will automatically figure out what the best
[`dist-tag`](https://docs.npmjs.com/cli/dist-tag) is based on the `version`
property in your `package.json` file and the previously published versions
unless you explicitly specify a tag yourself.

Have a look at our [tests](test/calc-dist-tag-test.js) to figure out what
tags to expect as output.


### Travis CI

If you are using [Travis CI](https://docs.travis-ci.com/user/deployment/npm/)
to automatically publish your package to npm you should add the following
snippet to your `.travis.yml` file:

```yaml
before_deploy:
  - npm install -g auto-dist-tag
  - auto-dist-tag --write
```


License
-------------------------------------------------------------------------------

This project is licensed under the [Apache License 2.0](LICENSE).
