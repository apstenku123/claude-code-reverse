/**
 * Retrieves the prerelease identifiers from a version object, if available.
 *
 * @param {string} versionString - The version string to parse (e.g., '1.0.0-beta.1').
 * @param {object} options - Optional configuration for parsing the version string.
 * @returns {Array|null} An array of prerelease identifiers if present, otherwise null.
 */
function getPrereleaseIdentifiers(versionString, options) {
  // Parse the version string using the external xM6 function
  const parsedVersion = xM6(versionString, options);
  // If the parsed version exists and has prerelease identifiers, return them; otherwise, return null
  return parsedVersion && parsedVersion.prerelease.length ? parsedVersion.prerelease : null;
}

module.exports = getPrereleaseIdentifiers;
