/**
 * Returns the module itself if isBlobOrFileLikeObject is an ES module, otherwise wraps isBlobOrFileLikeObject in a default property.
 * This is commonly used to ensure compatibility between CommonJS and ES module imports.
 *
 * @param {any} moduleObject - The imported module object to check and possibly wrap.
 * @returns {any} The module object itself if isBlobOrFileLikeObject is an ES module, otherwise an object with a default property containing the module.
 */
function getModuleDefaultExport(moduleObject) {
  // Check if the module exists and has the __esModule flag (ES module)
  if (moduleObject && moduleObject.__esModule) {
    return moduleObject;
  }
  // Otherwise, wrap the module in an object with a default property
  return { default: moduleObject };
}

module.exports = getModuleDefaultExport;