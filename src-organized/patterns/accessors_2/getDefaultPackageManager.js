/**
 * Returns the default package manager name used by the application.
 *
 * @returns {string} The name of the default package manager.
 */
function getDefaultPackageManager() {
  // Currently, the default package manager is hardcoded as 'npm'.
  return "npm";
}

module.exports = getDefaultPackageManager;