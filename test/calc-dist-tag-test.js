'use strict';

const calcDistTag = require('../src/calc-dist-tag');

describe('calcDistTag()', function() {
  function test(version, distTags, expected) {
    it(`${version}, ${JSON.stringify(distTags)} -> ${expected}`, function() {
      expect(calcDistTag(version, distTags)).toEqual(expected);
    });
  }

  // stable release and no "latest" yet
  test('0.0.0', {}, 'latest');
  test('0.0.1', {}, 'latest');
  test('0.1.0', {}, 'latest');
  test('1.0.0', {}, 'latest');
  test('1.2.3', {}, 'latest');

  // prerelease and no "latest" yet
  test('0.0.0-alpha.0', {}, 'latest');
  test('0.0.0-beta.0', {}, 'latest');
  test('0.0.1-beta.0', {}, 'latest');
  test('0.1.0-beta.0', {}, 'latest');
  test('1.0.0-beta.0', {}, 'latest');
  test('1.2.3-beta.0', {}, 'latest');
  test('1.0.0-rc.0', {}, 'latest');
  test('1.0.0-0', {}, 'latest');

  // stable release and stable "latest"
  test('1.2.3', { latest: '0.0.0' }, 'latest');
  test('1.2.3', { latest: '0.0.1' }, 'latest');
  test('1.2.3', { latest: '0.1.0' }, 'latest');
  test('1.2.3', { latest: '1.0.0' }, 'latest');
  test('1.2.3', { latest: '1.2.2' }, 'latest');
  test('1.2.3', { latest: '1.2.3' }, 'latest');
  test('1.2.3', { latest: '1.2.4' }, 'old');
  test('1.2.3', { latest: '2.0.0' }, 'old');

  // stable release and prerelease "latest"
  test('1.2.3', { latest: '1.2.2-alpha.0' }, 'latest');
  test('1.2.3', { latest: '1.2.3-alpha.0' }, 'latest');
  test('1.2.3', { latest: '1.2.4-alpha.0' }, 'latest');
  test('1.2.3', { latest: '1.2.3-beta.0' }, 'latest');
  test('1.2.3', { latest: '1.2.3-rc.0' }, 'latest');
  test('1.2.3', { latest: '1.2.3-0' }, 'latest');

  // prerelease and stable "latest"
  test('0.0.0-alpha.0', { latest: '1.0.0' }, 'alpha');
  test('0.0.0-beta.0', { latest: '1.0.0' }, 'beta');
  test('0.0.1-beta.0', { latest: '1.0.0' }, 'beta');
  test('0.1.0-beta.0', { latest: '1.0.0' }, 'beta');
  test('1.0.0-beta.0', { latest: '1.0.0' }, 'beta');
  test('1.2.3-beta.0', { latest: '1.0.0' }, 'beta');
  test('1.0.0-rc.0', { latest: '1.0.0' }, 'rc');
  test('1.0.0-0', { latest: '1.0.0' }, 'prerelease');

  // prerelease, stable "latest" and prerelease identifier
  test('1.0.0-alpha.1', { latest: '0.0.0', alpha: '1.0.0-alpha.0' }, 'alpha');
  test('1.0.0-alpha.1', { latest: '0.0.0', alpha: '1.0.0-alpha.1' }, 'alpha');
  test('1.0.0-alpha.1', { latest: '0.0.0', alpha: '1.0.0-alpha.2' }, 'old');
  test('1.0.0-beta.1', { latest: '0.0.0', beta: '1.0.0-beta.0' }, 'beta');
  test('1.0.0-beta.1', { latest: '0.0.0', beta: '1.0.0-beta.1' }, 'beta');
  test('1.0.0-beta.1', { latest: '0.0.0', beta: '1.0.0-beta.2' }, 'old');
  test('1.0.0-beta.1', { latest: '0.0.0', alpha: '1.0.0-alpha.2' }, 'beta');
  test('1.0.0-1', { latest: '0.0.0', prerelease: '1.0.0-0' }, 'prerelease');
  test('1.0.0-1', { latest: '0.0.0', prerelease: '1.0.0-1' }, 'prerelease');
  test('1.0.0-1', { latest: '0.0.0', prerelease: '1.0.0-2' }, 'old');

  // prerelease and prerelease "latest"
  test('1.0.0-alpha.0', { latest: '1.0.0-beta.1' }, 'alpha');
  test('1.0.0-alpha.4', { latest: '1.0.0-beta.1' }, 'alpha');
  test('1.0.0-beta.0', { latest: '1.0.0-beta.1' }, 'beta');
  test('1.0.0-beta.1', { latest: '1.0.0-beta.1' }, 'latest');
  test('1.0.0-beta.2', { latest: '1.0.0-beta.1' }, 'latest');
  test('1.0.0-rc.0', { latest: '1.0.0-beta.1' }, 'latest');
  test('1.0.0-0', { latest: '1.0.0-alpha.0' }, 'prerelease');
  test('1.0.0-alpha.0', { latest: '1.0.0-0' }, 'latest');

  // prerelease, prerelease "latest" and prerelease identifier
  test('1.0.0-alpha.0', { latest: '1.0.0-beta.1', alpha: '1.0.0-alpha.1' }, 'old');
  test('1.0.0-alpha.4', { latest: '1.0.0-beta.1', alpha: '1.0.0-alpha.1' }, 'alpha');

  // real world: ember-cli
  test('2.12.3', { latest: '2.12.2', beta: '2.13.0-beta.4' }, 'latest');
  test('2.13.0', { latest: '2.12.3', beta: '2.13.0-beta.4' }, 'latest');
  test('2.14.0-beta.1', { latest: '2.13.0', beta: '2.13.0-beta.4' }, 'beta');

  // real world: ember-cli-eslint
  test('3.0.3', { latest: '3.0.2' }, 'latest');
  test('3.1.0-beta.1', { latest: '3.0.3' }, 'beta');
  test('3.1.0-beta.2', { latest: '3.0.3', beta: '3.1.0-beta.1' }, 'beta');
  test('3.1.0', { latest: '3.0.3', beta: '3.1.0-beta.2' }, 'latest');

  // real world: ember-cli-mocha
  test('0.12.0', { latest: '0.11.1' }, 'latest');
  test('0.13.0-beta.1', { latest: '0.12.0' }, 'beta');

  // real world: ember-mocha
  test('0.14.4', { latest: '0.14.3' }, 'latest');
  test('0.14.5-beta.1', { latest: '0.14.4' }, 'beta');

  // real world: ember-source
  test('3.0.0-beta+metadata-here', { latest: '2.18.0' }, 'beta');
  test('3.1.0-canary+metadata-here', { latest: '2.18.0' }, 'canary');
  test('2.18.0-release+build-metadata-here', { latest: '2.18.0' }, 'release');
  test('2.18.1+build-metadata-here', { latest: '2.18.0' }, 'latest');
});
