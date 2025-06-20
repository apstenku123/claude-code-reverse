/**
 * Determines if a given path string is an absolute path, a Windows drive path, a relative path, a URL, or contains 'node_modules/'.
 * Returns false if any of these conditions are met, unless the override flag is set to true.
 *
 * @param {string} path - The path string to evaluate.
 * @param {boolean} [override=false] - If true, always returns false regardless of path value.
 * @returns {boolean} True if the path is a 'normal' path (not absolute, not a URL, not node_modules, etc.), false otherwise.
 */
function isAbsoluteOrSpecialPath(path, override = false) {
  // If override is true, always return false
  if (override) {
    return false;
  }

  // If path is undefined, return false
  if (path === undefined) {
    return false;
  }

  // Check if path starts with '/' (Unix absolute path)
  const isUnixAbsolute = path.startsWith('/');

  // Check if path matches Windows drive letter (e.g., 'C:')
  const isWindowsDrive = /^[a-zA]:/.test(path);

  // Check if path starts with '.' (relative path)
  const isRelative = path.startsWith('.');

  // Check if path is a URL (e.g., 'http://', 'https://', etc.)
  const isUrl = /^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//.test(path);

  // Check if path contains 'node_modules/'
  const containsNodeModules = path.includes('node_modules/');

  // If any of the above are true, return false
  if (
    isUnixAbsolute ||
    isWindowsDrive ||
    isRelative ||
    isUrl ||
    containsNodeModules
  ) {
    return false;
  }

  // Otherwise, return true
  return true;
}

module.exports = isAbsoluteOrSpecialPath;