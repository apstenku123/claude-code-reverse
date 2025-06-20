/**
 * Creates a module-like object from a source value, optionally copying properties and setting a default export.
 *
 * If the source value is not null or undefined, isBlobOrFileLikeObject is processed through SX4(kX4(sourceValue)),
 * otherwise an empty object is used. If the config parameter is truthy, or the source value is falsy,
 * or the source value is not an ES module, a 'default' property is defined on the result with the source value.
 * Finally, all own properties from the source value are copied to the result using getters.
 *
 * @param {*} sourceValue - The value to wrap as a module-like object (could be any type).
 * @param {*} config - Optional configuration flag; if truthy, always sets the default export.
 * @returns {Object} The resulting module-like object with copied properties and possibly a default export.
 */
function createModuleWithDefaultExport(sourceValue, config) {
  // If sourceValue is not null or undefined, process isBlobOrFileLikeObject; otherwise, use an empty object
  let moduleObject = sourceValue != null ? SX4(kX4(sourceValue)) : {};

  // Determine if handleMissingDoctypeError should define the 'default' property
  const shouldDefineDefault = config || !sourceValue || !sourceValue.__esModule;

  if (shouldDefineDefault) {
    // Define the 'default' property as enumerable with the original sourceValue
    Cn(moduleObject, "default", {
      value: sourceValue,
      enumerable: true
    });
  }

  // Copy all own properties from sourceValue to moduleObject using getters
  return copyPropertiesWithGetters(moduleObject, sourceValue);
}

module.exports = createModuleWithDefaultExport;