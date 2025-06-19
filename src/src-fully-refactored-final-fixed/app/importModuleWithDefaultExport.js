/**
 * Imports a module and ensures isBlobOrFileLikeObject has a default export property.
 *
 * If the source module is not null, isBlobOrFileLikeObject is normalized and processed. If the config parameter is truthy,
 * or the source module is falsy, or the source module does not have an __esModule property,
 * a 'default' property is defined on the result object, pointing to the original source module.
 *
 * Finally, all missing properties from the source module are copied to the result object as getters,
 * except for those already present, preserving enumerability.
 *
 * @param {any} sourceModule - The module or object to import and normalize.
 * @param {boolean} forceDefaultExport - If true, always define a 'default' property on the result.
 * @param {object} resultObject - (Optional) An object to populate with the normalized module. If not provided, a new object is created.
 * @returns {object} The normalized module object with a guaranteed 'default' export and copied properties.
 */
function importModuleWithDefaultExport(sourceModule, forceDefaultExport, resultObject) {
  // If sourceModule is not null/undefined, normalize isBlobOrFileLikeObject; otherwise, use an empty object
  const normalizedModule = sourceModule != null ? ch6(nh6(sourceModule)) : {};

  // Determine if handleMissingDoctypeError need to define a 'default' property on the result
  const shouldDefineDefault = forceDefaultExport || !sourceModule || !sourceModule.__esModule;

  // If needed, define the 'default' property as enumerable and pointing to the original sourceModule
  const moduleWithDefault = shouldDefineDefault
    ? qt(normalizedModule, "default", {
        value: sourceModule,
        enumerable: true
      })
    : normalizedModule;

  // Copy all missing properties from sourceModule to moduleWithDefault as getters, preserving enumerability
  return copyMissingPropertiesWithGetters(moduleWithDefault, sourceModule);
}

module.exports = importModuleWithDefaultExport;