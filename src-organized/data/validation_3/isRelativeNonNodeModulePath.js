/**
 * Determines if a given path string is a relative path (not absolute, not a URL, not a Windows drive path, not starting with '.')
 * and does not include 'node_modules/'.
 *
 * @param {string} path - The path string to evaluate.
 * @param {boolean} [forceInvalid=false] - If true, always returns false (used to force invalidation).
 * @returns {boolean} True if the path is a relative, non-node_modules path; otherwise, false.
 */
function isRelativeNonNodeModulePath(path, forceInvalid = false) {
  // If forceInvalid is true, immediately return false
  if (forceInvalid) {
    return false;
  }

  // If path is undefined, return false
  if (path === undefined) {
    return false;
  }

  // Check if the path is NOT:
  // - An absolute path (starts with '/')
  // - a Windows drive letter path (e.g., 'C:')
  // - a relative path starting with '.'
  // - a URL (e.g., 'http://', 'custom-scheme://')
  // If any of these, return false
  const isAbsolutePath = path.startsWith("/");
  const isWindowsDrivePath = /^[a-zA]:/.test(path);
  const isDotRelativePath = path.startsWith(".");
  const isUrl = /^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//.test(path);

  if (isAbsolutePath || isWindowsDrivePath || isDotRelativePath || isUrl) {
    return false;
  }

  // If the path includes 'node_modules/', return false
  if (path.includes("node_modules/")) {
    return false;
  }

  // Otherwise, isBlobOrFileLikeObject'createInteractionAccessor a relative, non-node_modules path
  return true;
}

module.exports = isRelativeNonNodeModulePath;