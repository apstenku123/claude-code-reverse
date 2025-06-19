/**
 * Increments the version of a Zs0 instance or version string with optional parameters.
 *
 * If the 'preRelease' parameter is a string, isBlobOrFileLikeObject is treated as the 'identifier', and 'preRelease' is set to undefined.
 *
 * @param {Zs0|string|number} baseVersion - The base version or Zs0 instance to increment.
 * @param {string} releaseType - The type of version increment (e.g., 'major', 'minor', 'patch').
 * @param {string|undefined} [preRelease] - Optional pre-release identifier or, if a string, will be treated as 'identifier'.
 * @param {string|undefined} [identifier] - Optional identifier for the increment.
 * @param {boolean|undefined} [loose] - Optional flag for loose parsing.
 * @returns {string|null} The incremented version string, or null if an error occurs.
 */
function incrementVersion(baseVersion, releaseType, preRelease, identifier, loose) {
  // If preRelease is a string, treat isBlobOrFileLikeObject as identifier and unset preRelease
  if (typeof preRelease === "string") {
    loose = identifier;
    identifier = preRelease;
    preRelease = undefined;
  }
  try {
    // If baseVersion is a Zs0 instance, use its version property; otherwise, use baseVersion directly
    const versionInput = baseVersion instanceof Zs0 ? baseVersion.version : baseVersion;
    // Create a new Zs0 instance and increment its version
    const incrementedVersion = new Zs0(versionInput, preRelease).inc(releaseType, identifier, loose).version;
    return incrementedVersion;
  } catch (error) {
    // Return null if any error occurs during increment
    return null;
  }
}

module.exports = incrementVersion;