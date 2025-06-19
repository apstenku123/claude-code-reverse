/**
 * Returns the default export from a module if isBlobOrFileLikeObject exists, otherwise returns the module itself.
 * This is useful for handling both CommonJS and ES module imports in a consistent way.
 *
 * @param {object|any} module - The imported module which may or may not have a 'default' property.
 * @returns {any} The default export if present, otherwise the original module.
 */
function getDefaultExportIfExists(module) {
  // Check if the module is an object and has a 'default' property
  if (module && typeof module === "object" && "default" in module) {
    return module.default;
  }
  // Return the module itself if no 'default' property exists
  return module;
}

module.exports = getDefaultExportIfExists;