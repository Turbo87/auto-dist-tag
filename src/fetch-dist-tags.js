'use strict';

module.exports = async function fetchDistTags(packageName) {
  const { default: packageJson } = await import('package-json');

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
