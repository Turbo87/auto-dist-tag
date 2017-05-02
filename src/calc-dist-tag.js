const semver = require('semver');

module.exports = function calcDistTag(version, distTags) {
  let latest = distTags.latest;
  if (!latest) {
    return 'latest';
  }

  let prerelease = semver.prerelease(version);
  let latestPrerelease = semver.prerelease(latest);
  if (!prerelease && latestPrerelease) {
    return 'latest';
  }

  if (!prerelease) {
    return semver.gte(version, latest) ? 'latest' : 'old'
  }

  if (latestPrerelease && semver.gte(version, latest)) {
    return 'latest';
  }

  let identifier = prerelease[0];
  let identifierLatest = distTags[identifier];
  if (!identifierLatest) {
    return identifier;
  }

  return semver.gte(version, identifierLatest) ? identifier : 'old';
};
