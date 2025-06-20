/**
 * Parses a semantic version string and extracts its components.
 *
 * @param {string} versionString - The semantic version string to parse (e.g., '1.2.3-alpha+build').
 * @returns {Object} An object containing the major, minor, patch, prerelease, and buildmetadata fields.
 *   - major: {number|undefined} The major version number, or undefined if not present.
 *   - minor: {number|undefined} The minor version number, or undefined if not present.
 *   - patch: {number|undefined} The patch version number, or undefined if not present.
 *   - prerelease: {string|undefined} The prerelease identifier, if present.
 *   - buildmetadata: {string|undefined} The build metadata, if present.
 */
function parseSemverString(versionString) {
  // om2 is assumed to be a RegExp that matches semantic version strings
  // Example: /^(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?(?:\+([\w.-]+))?$/
  const match = versionString.match(om2) || [];

  // Extract version components from the regex match
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = parseInt(match[3], 10);
  const prerelease = match[4];
  const buildmetadata = match[5];

  return {
    major: isNaN(major) ? undefined : major,
    minor: isNaN(minor) ? undefined : minor,
    patch: isNaN(patch) ? undefined : patch,
    prerelease: prerelease,
    buildmetadata: buildmetadata
  };
}

module.exports = parseSemverString;