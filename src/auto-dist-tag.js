const fs = require('fs-extra');
const pkgUp = require('pkg-up');
const getDistTags = require('./fetch-dist-tags');
const calcDistTag = require('./calc-dist-tag');

module.exports = function autoDistTag(cwd) {
  let pkgPath, pkg;

  return pkgUp(cwd)
    .then(_pkgPath => (pkgPath = _pkgPath))
    .then(() => fs.readJson(pkgPath))
    .then(_pkg => (pkg = _pkg))
    .then(() => getDistTags(pkg.name))
    .then(distTags => calcDistTag(pkg.version, distTags));
};
