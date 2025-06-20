/**
 * Requires a module or dependency using the provided source object'createInteractionAccessor require method.
 *
 * @param {Object} sourceObject - The object that exposes a require method (e.g., a module loader).
 * @param {string} moduleName - The name or path of the module to require.
 * @returns {*} The required module or dependency as returned by sourceObject.require.
 */
function requireModuleFromSource(sourceObject, moduleName) {
  // Use the source object'createInteractionAccessor require method to load the specified module
  return sourceObject.require(moduleName);
}

module.exports = requireModuleFromSource;
