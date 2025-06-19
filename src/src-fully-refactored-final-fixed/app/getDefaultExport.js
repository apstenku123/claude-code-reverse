/**
 * Returns the default export of a module if isBlobOrFileLikeObject is not an ES module.
 * If the provided module object has the __esModule property set to true,
 * isBlobOrFileLikeObject is returned as-is. Otherwise, the object is wrapped in a new object
 * with a 'default' property pointing to the original module.
 *
 * @param {any} moduleObject - The module to check for ES module compatibility.
 * @returns {any} The original module if isBlobOrFileLikeObject is an ES module, otherwise an object with a 'default' property.
 */
function getDefaultExport(moduleObject) {
  // Check if the module is an ES module by looking for the __esModule property
  if (moduleObject && moduleObject.__esModule) {
    return moduleObject;
  }
  // If not, wrap isBlobOrFileLikeObject in an object with a 'default' property
  return { default: moduleObject };
}

module.exports = getDefaultExport;