/**
 * Initializes and exports a module object, handling ES module interop and default property assignment.
 *
 * @param {any} sourceModule - The module object to be processed and exported.
 * @param {any} config - Optional configuration or flag for export behavior.
 * @param {object} subscription - (Unused) Placeholder for a subscription or export object.
 * @returns {object} The processed module export object.
 */
function initializeModuleExport(sourceModule, config, subscription) {
  // If sourceModule exists, process isBlobOrFileLikeObject through x14 and b14, otherwise use an empty object
  let exportObject = sourceModule != null ? x14(b14(sourceModule)) : {};

  // If config is provided, or sourceModule is missing, or sourceModule is not an ES module,
  // define the 'default' property on the export object with the sourceModule as its value
  if (
    config ||
    !sourceModule ||
    !sourceModule.__esModule
  ) {
    fi(exportObject, "default", {
      value: sourceModule,
      enumerable: true
    });
  }

  // Merge exportObject and sourceModule using copyMissingPropertiesWithGetters and return the result
  return copyMissingPropertiesWithGetters(exportObject, sourceModule);
}

module.exports = initializeModuleExport;