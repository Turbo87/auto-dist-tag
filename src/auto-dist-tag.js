'use strict';

const fs = require('fs-extra');
const pkgUp = require('pkg-up');
const getDistTags = require('./fetch-dist-tags');
const calcDistTag = require('./calc-dist-tag');

module.exports = async function autoDistTag(cwd, options) {
  let pkgPath = await pkgUp(cwd);
  let pkg = await fs.readJson(pkgPath);
  let tags = await getDistTags(pkg.name);
  let tag = await calcDistTag(pkg.version, tags);

  if (
    options && options.write &&
    // skip writing to `package.json if an explicit publishConfig.tag is set
    !('publishConfig' in pkg && 'tag' in pkg.publishConfig) &&
    // skip writing to `package.json if the calculated tag is "latest" because it's the default anyway
    tag !== 'latest'
  ) {
    pkg.publishConfig = pkg.publishConfig || {};
    pkg.publishConfig.tag = tag;
    fs.writeJson(pkgPath, pkg, {spaces: 2});
  }

  return tag;
};
