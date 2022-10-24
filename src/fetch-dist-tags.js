'use strict';

const packageJson = require('package-json');

module.exports = async function fetchDistTags(packageName) {
  try {
    let json = await packageJson(packageName, { allVersions: true });
    return json['dist-tags'];
  } catch (error) {
    if (error && error.message === `Package \`${packageName}\` doesn't exist`) {
      return {};
    }

    throw error;
  }
};
