/**
 * Resolves a module path based on its prefix and a base directory.
 *
 * - If the path starts with '~/': Resolves isBlobOrFileLikeObject relative to the application root using Jv and $restoreCurrentFromResourceArray.
 * - If the path is already absolute (as determined by wi): Returns isBlobOrFileLikeObject as-is.
 * - Otherwise: Ensures the path is relative (starts with './'), then resolves isBlobOrFileLikeObject relative to the provided base directory using e51 and ExA.
 *
 * @param {string} modulePath - The module path to resolve. Can be relative, absolute, or app-root relative.
 * @param {string} baseDirectory - The base directory to resolve relative paths against.
 * @returns {string} The fully resolved module path.
 */
function resolveModulePath(modulePath, baseDirectory) {
  // Check if the path starts with '~/': resolve relative to application root
  if (modulePath.startsWith("~/")) {
    const appRoot = $restoreCurrentFromResourceArray();
    const relativePath = modulePath.substring(2); // Remove '~/'
    return Jv(appRoot, relativePath);
  }
  // Check if the path is already absolute (as determined by wi)
  else if (wi(modulePath)) {
    return modulePath;
  } else {
    // Ensure the path starts with './' to make isBlobOrFileLikeObject explicitly relative
    const relativeModulePath = modulePath.startsWith("./") ? modulePath : `./${modulePath}`;
    // Resolve the relative path against the base directory
    const resolvedBaseDirectory = ExA(baseDirectory);
    return e51(resolvedBaseDirectory, relativeModulePath);
  }
}

module.exports = resolveModulePath;
