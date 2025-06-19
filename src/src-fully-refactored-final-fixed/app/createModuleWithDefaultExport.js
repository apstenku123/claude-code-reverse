/**
 * Creates a module-like object from a source value, ensuring a default export and copying properties as getters.
 *
 * @param {any} sourceValue - The value to wrap as a module (could be an object, function, or primitive).
 * @param {boolean} [shouldCopyProperties] - If true, copies properties from sourceValue to the module object as getters.
 * @param {object} [moduleObject] - Optional existing object to use as the module; if not provided, one is created.
 * @returns {object} The resulting module-like object with a default export and copied properties.
 */
function createModuleWithDefaultExport(sourceValue, shouldCopyProperties, moduleObject) {
  // If sourceValue is not null/undefined, create a shallow clone (via Kz4/wz4), else use empty object
  const baseModule = sourceValue != null ? Kz4(wz4(sourceValue)) : {};

  // If shouldCopyProperties is true, or sourceValue is falsy, or sourceValue is not an ES module,
  // define a 'default' property on the module object pointing to sourceValue
  if (
    shouldCopyProperties ||
    !sourceValue ||
    !sourceValue.__esModule
  ) {
    $n(baseModule, "default", {
      value: sourceValue,
      enumerable: true
    });
  }

  // Copy all own properties from sourceValue to baseModule as getters, skipping existing or excluded keys
  return copyMissingPropertiesWithGetters(baseModule, sourceValue);
}

module.exports = createModuleWithDefaultExport;