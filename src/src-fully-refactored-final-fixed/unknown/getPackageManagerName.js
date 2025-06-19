/**
 * Returns the name of the default package manager used by this CLI tool.
 *
 * @returns {string} The name of the package manager (e.g., 'npm').
 */
function getPackageManagerName() {
  // Currently, this CLI tool uses 'npm' as its package manager
  return "npm";
}

module.exports = getPackageManagerName;