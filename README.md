auto-dist-tag
===============================================================================

Automatically rewrites the `publishConfig.tag` setting in your
`package.json` for you


## Installation

Add the following snippet to your `.travis.yml` file:

```yaml
before_deploy:
  - npm install -g auto-dist-tag
  - auto-dist-tag
```


## Usage

`auto-dist-tag` will automatically figure out what the best `dist-tag` is based
on the `version` property in your `package.json` file and the previously
published versions unless you explicitly specify a tag yourself.


License
-------------------------------------------------------------------------------

This project is licensed under the [Apache License 2.0](LICENSE).
