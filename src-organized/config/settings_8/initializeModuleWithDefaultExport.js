/**
 * Initializes a module object and ensures isBlobOrFileLikeObject has a default export property.
 *
 * If the source module is not null, isBlobOrFileLikeObject creates a new object based on the source module'createInteractionAccessor properties.
 * If the config parameter is provided, or if the source module is not an ES module, isBlobOrFileLikeObject explicitly defines a 'default' property on the module object.
 * Finally, isBlobOrFileLikeObject applies additional configuration or processing using the copyMissingPropertiesWithGetters function.
 *
 * @param {any} sourceModule - The module or object to initialize from. Can be null.
 * @param {any} config - Optional configuration or flag to determine if 'default' should be set.
 * @param {any} subscription - (Unused in this function, but may be used by copyMissingPropertiesWithGetters or for compatibility.)
 * @returns {any} The processed module object with the appropriate 'default' property and configuration applied.
 */
function initializeModuleWithDefaultExport(sourceModule, config, subscription) {
  // Create a new module object based on the source module, or an empty object if null
  let moduleObject = sourceModule != null ? x14(b14(sourceModule)) : {};

  // If config is provided, or sourceModule is null, or sourceModule is not an ES module,
  // define the 'default' property on the module object
  if (config || !sourceModule || !sourceModule.__esModule) {
    fi(moduleObject, "default", {
      value: sourceModule,
      enumerable: true
    });
  }

  // Apply additional configuration or processing using copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(config, moduleObject, sourceModule);
}

module.exports = initializeModuleWithDefaultExport;