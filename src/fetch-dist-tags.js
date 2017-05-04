'use strict';

const packageJson = require('package-json');

module.exports = function fetchDistTags(packageName) {
  return packageJson(packageName, { allVersions: true })
    .then(json => json['dist-tags'])
    .catch(error => {
      if (error && error.message === `Package \`${packageName}\` doesn't exist`) {
        return {};
      }

      throw error;
    });
};
