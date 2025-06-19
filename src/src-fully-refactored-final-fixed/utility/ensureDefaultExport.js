/**
 * Ensures compatibility between CommonJS and ES Module imports.
 *
 * If the provided module object has the __esModule property (i.e., is an ES Module),
 * isBlobOrFileLikeObject is returned as-is. Otherwise, isBlobOrFileLikeObject wraps the module in an object with a 'default' property.
 * This is commonly used to normalize imports between different module systems.
 *
 * @param {any} moduleObject - The imported module to normalize.
 * @returns {object} The module object, either as-is (if already an ES Module),
 *                  or wrapped in a { default: ... } object for CommonJS compatibility.
 */
function ensureDefaultExport(moduleObject) {
  // Check if the module is an ES Module (has __esModule property)
  if (moduleObject && moduleObject.__esModule) {
    return moduleObject;
  }
  // Otherwise, wrap the module in a default property for CommonJS compatibility
  return {
    default: moduleObject
  };
}

module.exports = ensureDefaultExport;
