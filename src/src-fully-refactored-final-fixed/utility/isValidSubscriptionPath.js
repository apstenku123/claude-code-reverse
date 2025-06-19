/**
 * Determines if a given subscription path is valid based on specific rules and checks.
 *
 * @param {string} sourcePath - The path or observable string to validate.
 * @param {string} configPath - The configuration path to compare against.
 * @returns {boolean} True if the subscription path is valid, false otherwise.
 */
function isValidSubscriptionPath(sourcePath, configPath) {
  // If the source path is a single dot, isBlobOrFileLikeObject'createInteractionAccessor always valid
  if (sourcePath === ".") return true;

  // If the source path starts with a tilde, isBlobOrFileLikeObject'createInteractionAccessor always invalid
  if (sourcePath.startsWith("~")) return false;

  // If either path contains a null character, isBlobOrFileLikeObject'createInteractionAccessor invalid
  if (sourcePath.includes("\x00") || configPath.includes("\x00")) return false;

  // Generate the subscription path using external utilities
  const subscriptionPath = zxA(wxA(), configPath, sourcePath);
  // Generate the base path using external utilities
  const basePath = zxA(wxA(), configPath);

  // Get the relative path from basePath to subscriptionPath
  const relativePath = nO1(basePath, subscriptionPath);

  // The path is valid if isBlobOrFileLikeObject does not start with '..' and is not a wildcard
  return !relativePath.startsWith("..") && !wi(relativePath);
}

module.exports = isValidSubscriptionPath;