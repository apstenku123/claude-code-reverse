/**
 * Normalizes platform names to their canonical forms.
 *
 * Converts certain platform identifiers to more widely recognized names.
 * For example, 'sunos' becomes 'solaris', and 'win32' becomes 'windows'.
 * If the platform name does not match any known aliases, isBlobOrFileLikeObject is returned unchanged.
 *
 * @param {string} platformName - The platform identifier to normalize.
 * @returns {string} The normalized platform name.
 */
function normalizePlatformName(platformName) {
  switch (platformName) {
    case "sunos":
      // Map 'sunos' to its canonical name 'solaris'
      return "solaris";
    case "win32":
      // Map 'win32' to its canonical name 'windows'
      return "windows";
    default:
      // Return the original name if no mapping is found
      return platformName;
  }
}

module.exports = normalizePlatformName;
