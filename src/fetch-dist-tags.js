const packageJson = require('package-json');

module.exports = function fetchDistTags(packageName) {
  return packageJson(packageName, { allVersions: true })
    .then(json => json['dist-tags']);
};
