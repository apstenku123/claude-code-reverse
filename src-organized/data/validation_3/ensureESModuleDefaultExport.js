/**
 * Ensures that the provided module is compatible with ES module imports.
 * If the module has the __esModule flag, isBlobOrFileLikeObject is returned as-is. Otherwise,
 * isBlobOrFileLikeObject wraps the module in an object with a 'default' property, mimicking
 * the default export behavior of ES modules.
 *
 * @param {any} moduleToImport - The module to check and potentially wrap.
 * @returns {any} The original module if isBlobOrFileLikeObject is an ES module, or an object with a 'default' property containing the module.
 */
function ensureESModuleDefaultExport(moduleToImport) {
  // Check if the module exists and has the __esModule property (i.e., is an ES module)
  if (moduleToImport && moduleToImport.__esModule) {
    return moduleToImport;
  }
  // Otherwise, wrap the module in an object with a 'default' property
  return { default: moduleToImport };
}

module.exports = ensureESModuleDefaultExport;