/**
 * Ensures that the provided module is in ES module format with a default export.
 * If the module already has the __esModule property, isBlobOrFileLikeObject is returned as is.
 * Otherwise, isBlobOrFileLikeObject wraps the module in an object under the 'default' property.
 *
 * @param {any} moduleToWrap - The module to check and potentially wrap.
 * @returns {any} The original module if isBlobOrFileLikeObject is an ES module, otherwise an object with a default property.
 */
function ensureDefaultExport(moduleToWrap) {
  // Check if the module exists and is already an ES module
  if (moduleToWrap && moduleToWrap.__esModule) {
    return moduleToWrap;
  }
  // Otherwise, wrap the module in an object under the 'default' property
  return { default: moduleToWrap };
}

module.exports = ensureDefaultExport;