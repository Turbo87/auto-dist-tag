'use strict';

const semver = require('semver');
const debug = require('debug')('auto-dist-tag');

module.exports = function calcDistTag(version, distTags) {
  debug(`version: ${version}`);
  debug(`distTags: ${JSON.stringify(distTags)}`);

  let latest = distTags.latest;
  if (!latest) {
    debug(`-> "latest" (no previous "latest" found)`);
    return 'latest';
  }

  let prerelease = semver.prerelease(version);
  let latestPrerelease = semver.prerelease(latest);

  debug(`prerelease: ${JSON.stringify(prerelease)}`);
  debug(`latestPrerelease: ${JSON.stringify(latestPrerelease)}`);

  if (latestPrerelease && (!prerelease || semver.gte(version, latest))) {
    debug(`-> "latest" (previous "latest" was prerelease, new version is not a prerelease or newer)`);
    return 'latest';
  }

  if (!prerelease) {
    if (semver.gte(version, latest)) {
      debug(`-> "latest" (new version is newer than or equal to previous "latest")`);
      return 'latest'
    } else {
      debug(`-> "old" (new version is older than "latest")`);
      return 'old'
    }
  }

  let identifier = prerelease[0];
  if (isNumeric(identifier)) {
    identifier = 'prerelease';
  }
  debug(`identifier: ${identifier}`);

  let identifierLatest = distTags[identifier];
  if (!identifierLatest) {
    debug(`-> "${identifier}" ("${identifier}" does not exist yet)`);
    return identifier;
  }

  if (semver.gte(version, identifierLatest)) {
    debug(`-> "${identifier}" (new version is newer than or equal to previous "${identifier}")`);
    return identifier;
  } else {
    debug(`-> "old" (new version is older than "${identifier}")`);
    return 'old';
  }
};

function isNumeric(num) {
  return !isNaN(num);
}
