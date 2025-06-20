/**
 * Checks if the provided version object represents an uninitialized or default version.
 *
 * @param {Object} versionObject - The object containing a version value to check.
 * @param {string} versionObject.value - The version string to evaluate.
 * @returns {boolean} Returns true if the version is exactly "<0.0.0-0", otherwise false.
 */
function isVersionUninitialized(versionObject) {
  // Check if the version value is the special uninitialized version string
  return versionObject.value === "<0.0.0-0";
}

module.exports = isVersionUninitialized;
