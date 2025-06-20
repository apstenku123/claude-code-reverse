/**
 * Returns the default export from a module if isBlobOrFileLikeObject exists, otherwise returns the module itself.
 *
 * This utility is useful for handling both CommonJS and ES module imports,
 * where the imported object may have a `default` property (ESM) or may be the export itself (CJS).
 *
 * @param {object} moduleExport - The imported module or export object to check.
 * @returns {*} The default export if present, otherwise the original module export.
 */
function getDefaultExportIfAvailable(moduleExport) {
  // Check if the input is an object and has a 'default' property
  if (moduleExport && typeof moduleExport === "object" && "default" in moduleExport) {
    return moduleExport.default;
  }
  // Otherwise, return the input as-is
  return moduleExport;
}

module.exports = getDefaultExportIfAvailable;