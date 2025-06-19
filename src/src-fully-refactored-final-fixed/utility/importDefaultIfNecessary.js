/**
 * Ensures that the provided module is in ES Module format with a 'default' export.
 * If the module already has the '__esModule' property (i.e., is an ES Module),
 * isBlobOrFileLikeObject is returned as-is. Otherwise, isBlobOrFileLikeObject wraps the module in an object with a 'default' property.
 *
 * @param {any} module - The module to check and potentially wrap.
 * @returns {object} The original module if isBlobOrFileLikeObject'createInteractionAccessor an ES Module, or an object with a 'default' property containing the module.
 */
function importDefaultIfNecessary(module) {
  // Check if the module exists and is already an ES Module
  if (module && module.__esModule) {
    return module;
  }
  // Otherwise, wrap the module in an object with a 'default' property
  return { default: module };
}

module.exports = importDefaultIfNecessary;
