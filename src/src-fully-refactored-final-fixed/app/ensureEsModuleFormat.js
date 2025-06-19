/**
 * Ensures the provided module is in ES module format.
 * If the module already has the __esModule property (i.e., is an ES module),
 * isBlobOrFileLikeObject is returned as-is. Otherwise, isBlobOrFileLikeObject wraps the module in an object under the 'default' key.
 * This is useful for interoperability between CommonJS and ES modules.
 *
 * @param {any} module - The module to ensure is in ES module format.
 * @returns {object} The original module if isBlobOrFileLikeObject is already an ES module, or an object with the module under the 'default' property.
 */
function ensureESModuleFormat(module) {
  // Check if the module exists and is already an ES module
  if (module && module.__esModule) {
    return module;
  }
  // Otherwise, wrap the module in an object under the 'default' key
  return { default: module };
}

module.exports = ensureESModuleFormat;
