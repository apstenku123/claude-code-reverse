/**
 * Determines if a given path is a relative local path (not absolute, not a URL, not a Windows drive path, not a module path).
 *
 * @param {string} path - The path string to check.
 * @param {boolean} [isExplicit=false] - If true, always returns false (used to override detection).
 * @returns {boolean} True if the path is a relative local path, false otherwise.
 */
function isRelativeLocalPath(path, isExplicit = false) {
  // If isExplicit is true, always return false
  if (isExplicit) {
    return false;
  }

  // If path is undefined, return false
  if (path === undefined) {
    return false;
  }

  // Check if path is absolute (starts with '/')
  const isAbsolutePath = path.startsWith('/');

  // Check if path is a Windows drive letter path (e.g., 'C:/')
  const isWindowsDrivePath = /^[a-zA]:/.test(path);

  // Check if path is a relative path (starts with '.')
  const isRelativePath = path.startsWith('.');

  // Check if path is a URL (e.g., 'http://', 'https://', 'file://', etc.)
  const isUrl = /^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//.test(path);

  // Check if path includes 'node_modules/'
  const isNodeModule = path.includes('node_modules/');

  // Return true only if all checks are false
  return !isAbsolutePath && !isWindowsDrivePath && !isRelativePath && !isUrl && !isNodeModule;
}

module.exports = isRelativeLocalPath;